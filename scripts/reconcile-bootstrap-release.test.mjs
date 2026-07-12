import { createHash } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';
import {
  BootstrapMismatchError,
  BootstrapUnavailableError,
  inspectBootstrapState,
  reconcileBootstrapRelease,
} from './reconcile-bootstrap-release.mjs';

const commitSha = 'a'.repeat(40);
const packageName = '@shpit/foundry-ai';
const version = '0.0.5';
const repository = 'https://github.com/shpitdev/foundry-ai';
const artifact = Buffer.from('verified package artifact');
const integrityBytes = createHash('sha512').update(artifact).digest();
const integrity = `sha512-${integrityBytes.toString('base64')}`;
const integrityHex = integrityBytes.toString('hex');
const attestationUrl =
  'https://registry.npmjs.org/-/npm/v1/attestations/%40shpit%2ffoundry-ai@0.0.5';

function provenanceStatement({ repositoryUrl = repository, sha = commitSha } = {}) {
  return {
    _type: 'https://in-toto.io/Statement/v1',
    subject: [
      {
        name: 'pkg:npm/%40shpit/foundry-ai@0.0.5',
        digest: { sha512: integrityHex },
      },
    ],
    predicateType: 'https://slsa.dev/provenance/v1',
    predicate: {
      buildDefinition: {
        buildType: 'https://slsa-framework.github.io/github-actions-buildtypes/workflow/v1',
        externalParameters: {
          workflow: {
            ref: 'refs/heads/main',
            repository: repositoryUrl,
            path: '.github/workflows/release.yml',
          },
        },
        internalParameters: { github: { event_name: 'workflow_dispatch' } },
        resolvedDependencies: [
          {
            uri: `git+${repositoryUrl}@refs/heads/main`,
            digest: { gitCommit: sha },
          },
        ],
      },
      runDetails: {
        builder: { id: 'https://github.com/actions/runner/github-hosted' },
      },
    },
  };
}

function registryMetadataResponse(options = {}) {
  const dist = { integrity };
  if (!options.omitAttestationUrl) {
    dist.attestations = { url: options.attestationUrl ?? attestationUrl };
  }
  const metadata = {
    name: packageName,
    version,
    gitHead: options.metadataSha ?? commitSha,
    repository: { url: 'git+https://github.com/shpitdev/foundry-ai.git' },
    dist,
  };

  return new Response(JSON.stringify(metadata), { status: 200 });
}

function registryResponses(options = {}) {
  const attestationDocument = {
    attestations: [
      {
        predicateType: 'https://slsa.dev/provenance/v1',
        bundle: {
          dsseEnvelope: {
            payloadType: 'application/vnd.in-toto+json',
            payload: Buffer.from(JSON.stringify(provenanceStatement(options))).toString('base64'),
          },
        },
      },
    ],
  };

  return [
    registryMetadataResponse(options),
    new Response(JSON.stringify(attestationDocument), { status: 200 }),
  ];
}

function fetchSequence(responses) {
  return vi.fn(async () => {
    const response = responses.shift();
    if (!response) {
      throw new Error('Unexpected fetch');
    }
    return response;
  });
}

function gitRunner({ existingTagSha } = {}) {
  const calls = [];
  let remoteTagSha = existingTagSha;
  const run = vi.fn((command, args) => {
    calls.push([command, args]);
    const key = [command, ...args].join(' ');
    if (key === 'git rev-parse HEAD') return commitSha;
    if (key === 'git status --porcelain --untracked-files=no') return '';
    if (key.startsWith('git ls-remote --tags origin')) {
      return remoteTagSha
        ? `tag-object\trefs/tags/${packageName}@${version}\n${remoteTagSha}\trefs/tags/${packageName}@${version}^{}`
        : '';
    }
    if (key === `git rev-list -n 1 ${packageName}@${version}`) return commitSha;
    if (key === `git push origin refs/tags/${packageName}@${version}`) remoteTagSha = commitSha;
    return '';
  });
  return { calls, run };
}

describe('bootstrap release reconciliation', () => {
  it('finalizes an accepted publish after the publish command reports failure', async () => {
    const responses = [new Response('{}', { status: 404 }), ...registryResponses()];
    const fetchImpl = fetchSequence(responses);
    const { calls, run } = gitRunner();

    await expect(
      inspectBootstrapState({ commitSha, fetchImpl, packageName, repository, run, version }),
    ).resolves.toEqual({ state: 'absent' });

    const reconciled = await reconcileBootstrapRelease({
      attempts: 1,
      commitSha,
      fetchImpl,
      packageName,
      repository,
      run,
      version,
    });

    expect(reconciled.tagState).toMatchObject({ action: 'created', targetSha: commitSha });
    expect(calls).toContainEqual([
      'git',
      [
        'tag',
        '-a',
        `${packageName}@${version}`,
        commitSha,
        '-m',
        `Release ${packageName}@${version}`,
      ],
    ]);
  });

  it('safely resumes when the matching package and tag already exist', async () => {
    const fetchImpl = fetchSequence(registryResponses());
    const { calls, run } = gitRunner({ existingTagSha: commitSha });

    const reconciled = await reconcileBootstrapRelease({
      attempts: 1,
      commitSha,
      fetchImpl,
      packageName,
      repository,
      run,
      version,
    });

    expect(reconciled.tagState).toMatchObject({
      action: 'verified-existing',
      targetSha: commitSha,
    });
    expect(calls.some(([, args]) => args[0] === 'tag')).toBe(false);
    expect(calls.some(([, args]) => args[0] === 'push')).toBe(false);
  });

  it('rejects a published package whose provenance commit differs', async () => {
    const mismatchedSha = 'b'.repeat(40);
    const fetchImpl = fetchSequence(registryResponses({ sha: mismatchedSha }));
    const { run } = gitRunner();

    await expect(
      reconcileBootstrapRelease({
        attempts: 1,
        commitSha,
        fetchImpl,
        packageName,
        repository,
        run,
        version,
      }),
    ).rejects.toBeInstanceOf(BootstrapMismatchError);
    expect(run).not.toHaveBeenCalled();
  });

  it('retries until a lagging attestation becomes available', async () => {
    const fetchImpl = fetchSequence([
      registryMetadataResponse({ omitAttestationUrl: true }),
      ...registryResponses(),
    ]);
    const sleep = vi.fn().mockResolvedValue(undefined);
    const { run } = gitRunner();

    const reconciled = await reconcileBootstrapRelease({
      attempts: 2,
      commitSha,
      delayMs: 25,
      fetchImpl,
      packageName,
      repository,
      run,
      sleep,
      version,
    });

    expect(reconciled.tagState).toMatchObject({ action: 'created', targetSha: commitSha });
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    expect(sleep).toHaveBeenCalledOnce();
    expect(sleep).toHaveBeenCalledWith(25);
  });

  it('reports unavailable after exhausting retries for a missing attestation', async () => {
    const fetchImpl = fetchSequence([
      registryMetadataResponse({ omitAttestationUrl: true }),
      registryMetadataResponse({ omitAttestationUrl: true }),
      registryMetadataResponse({ omitAttestationUrl: true }),
    ]);
    const sleep = vi.fn().mockResolvedValue(undefined);
    const { run } = gitRunner();

    await expect(
      reconcileBootstrapRelease({
        attempts: 3,
        commitSha,
        delayMs: 25,
        fetchImpl,
        packageName,
        repository,
        run,
        sleep,
        version,
      }),
    ).rejects.toBeInstanceOf(BootstrapUnavailableError);
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    expect(sleep).toHaveBeenCalledTimes(2);
    expect(run).not.toHaveBeenCalled();
  });

  it('rejects a malformed present attestation URL without retrying', async () => {
    const fetchImpl = fetchSequence([
      registryMetadataResponse({ attestationUrl: 'https://example.com/attestation' }),
    ]);
    const sleep = vi.fn().mockResolvedValue(undefined);
    const { run } = gitRunner();

    await expect(
      reconcileBootstrapRelease({
        attempts: 3,
        commitSha,
        delayMs: 25,
        fetchImpl,
        packageName,
        repository,
        run,
        sleep,
        version,
      }),
    ).rejects.toBeInstanceOf(BootstrapMismatchError);
    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(sleep).not.toHaveBeenCalled();
    expect(run).not.toHaveBeenCalled();
  });
});

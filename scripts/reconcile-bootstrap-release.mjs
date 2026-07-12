#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const PACKAGE_NAME = '@shpit/foundry-ai';
const PACKAGE_VERSION = '0.0.5';
const MANIFEST_REPOSITORY = 'git+https://github.com/shpitdev/foundry-ai.git';
const PROVENANCE_REPOSITORY = 'https://github.com/shpitdev/foundry-ai';
const PROVENANCE_TYPE = 'https://slsa.dev/provenance/v1';
const REGISTRY = 'https://registry.npmjs.org';
const WORKFLOW_PATH = '.github/workflows/release.yml';

export class BootstrapMismatchError extends Error {}
export class BootstrapUnavailableError extends Error {}

function assertMatch(condition, message) {
  if (!condition) {
    throw new BootstrapMismatchError(message);
  }
}

async function fetchJson(url, fetchImpl) {
  let response;
  try {
    response = await fetchImpl(url, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    throw new BootstrapUnavailableError(`Unable to fetch ${url}: ${error.message}`);
  }

  if (!response.ok) {
    throw new BootstrapUnavailableError(`Request failed for ${url}: HTTP ${response.status}`);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new BootstrapUnavailableError(`Invalid JSON from ${url}: ${error.message}`);
  }
}

function expectedPurl(packageName, version) {
  return `pkg:npm/${packageName.replace('@', '%40')}@${version}`;
}

function integrityHex(integrity) {
  const match = /^sha512-(?<digest>.+)$/.exec(integrity ?? '');
  assertMatch(match?.groups?.digest != null, 'Published package is missing sha512 integrity.');
  return Buffer.from(match.groups.digest, 'base64').toString('hex');
}

function decodeStatement(attestation) {
  assertMatch(
    attestation?.bundle?.dsseEnvelope?.payloadType === 'application/vnd.in-toto+json',
    'Provenance attestation has an unexpected payload type.',
  );

  try {
    return JSON.parse(
      Buffer.from(attestation.bundle.dsseEnvelope.payload, 'base64').toString('utf8'),
    );
  } catch {
    throw new BootstrapMismatchError('Provenance attestation payload is not valid JSON.');
  }
}

export function verifyPublishedProvenance({
  attestationDocument,
  commitSha,
  metadata,
  packageName = PACKAGE_NAME,
  repository = PROVENANCE_REPOSITORY,
  version = PACKAGE_VERSION,
}) {
  assertMatch(metadata.name === packageName, `Published package name is ${metadata.name}.`);
  assertMatch(metadata.version === version, `Published package version is ${metadata.version}.`);
  assertMatch(metadata.gitHead === commitSha, `Published gitHead is ${metadata.gitHead}.`);
  assertMatch(
    metadata.repository?.url === MANIFEST_REPOSITORY,
    `Published repository URL is ${metadata.repository?.url}.`,
  );

  const provenanceAttestations = (attestationDocument.attestations ?? []).filter(
    (attestation) => attestation.predicateType === PROVENANCE_TYPE,
  );
  assertMatch(
    provenanceAttestations.length === 1,
    `Expected one provenance attestation, received ${provenanceAttestations.length}.`,
  );

  const statement = decodeStatement(provenanceAttestations[0]);
  assertMatch(statement._type === 'https://in-toto.io/Statement/v1', 'Unexpected statement type.');
  assertMatch(statement.predicateType === PROVENANCE_TYPE, 'Unexpected statement predicate.');

  const subject = statement.subject?.find(
    (candidate) => candidate.name === expectedPurl(packageName, version),
  );
  assertMatch(
    subject != null,
    'Provenance subject does not identify the expected package version.',
  );
  assertMatch(
    subject.digest?.sha512 === integrityHex(metadata.dist?.integrity),
    'Provenance subject digest does not match the published tarball integrity.',
  );

  const buildDefinition = statement.predicate?.buildDefinition;
  const workflow = buildDefinition?.externalParameters?.workflow;
  assertMatch(
    workflow?.repository === repository,
    `Provenance repository is ${workflow?.repository}.`,
  );
  assertMatch(workflow?.ref === 'refs/heads/main', `Provenance ref is ${workflow?.ref}.`);
  assertMatch(workflow?.path === WORKFLOW_PATH, `Provenance workflow is ${workflow?.path}.`);
  assertMatch(
    buildDefinition?.internalParameters?.github?.event_name === 'workflow_dispatch',
    'Bootstrap provenance was not produced by workflow_dispatch.',
  );
  assertMatch(
    statement.predicate?.runDetails?.builder?.id ===
      'https://github.com/actions/runner/github-hosted',
    'Bootstrap provenance was not produced by a GitHub-hosted runner.',
  );

  const dependencyUri = `git+${repository}@refs/heads/main`;
  const sourceDependency = buildDefinition?.resolvedDependencies?.find(
    (dependency) => dependency.uri === dependencyUri,
  );
  assertMatch(
    sourceDependency != null,
    'Provenance does not resolve the expected source repository.',
  );
  assertMatch(
    sourceDependency.digest?.gitCommit === commitSha,
    `Provenance commit is ${sourceDependency.digest?.gitCommit}.`,
  );

  return {
    commitSha,
    packageName,
    provenanceType: PROVENANCE_TYPE,
    repository,
    version,
  };
}

export async function inspectPublishedPackage({
  commitSha,
  fetchImpl = fetch,
  packageName = PACKAGE_NAME,
  registry = REGISTRY,
  repository = PROVENANCE_REPOSITORY,
  version = PACKAGE_VERSION,
}) {
  const metadataUrl = `${registry}/${encodeURIComponent(packageName)}/${version}`;
  let response;
  try {
    response = await fetchImpl(metadataUrl, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    throw new BootstrapUnavailableError(`Unable to query npm: ${error.message}`);
  }

  if (response.status === 404) {
    return { state: 'absent' };
  }
  if (!response.ok) {
    throw new BootstrapUnavailableError(`npm metadata request failed: HTTP ${response.status}`);
  }

  let metadata;
  try {
    metadata = await response.json();
  } catch (error) {
    throw new BootstrapUnavailableError(`Invalid npm metadata: ${error.message}`);
  }

  const attestationUrl = metadata.dist?.attestations?.url;
  assertMatch(
    typeof attestationUrl === 'string' &&
      attestationUrl.startsWith(`${registry}/-/npm/v1/attestations/`),
    `Published attestation URL is ${attestationUrl}.`,
  );
  const attestationDocument = await fetchJson(attestationUrl, fetchImpl);
  const provenance = verifyPublishedProvenance({
    attestationDocument,
    commitSha,
    metadata,
    packageName,
    repository,
    version,
  });

  return { state: 'present', metadata, provenance };
}

function defaultRun(command, args) {
  return execFileSync(command, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

export function inspectRemoteTag({
  commitSha,
  packageName = PACKAGE_NAME,
  remote = 'origin',
  run = defaultRun,
  version = PACKAGE_VERSION,
}) {
  const tag = `${packageName}@${version}`;
  const output = run('git', [
    'ls-remote',
    '--tags',
    remote,
    `refs/tags/${tag}`,
    `refs/tags/${tag}^{}`,
  ]);

  if (output.length === 0) {
    return { state: 'absent', tag };
  }

  const refs = new Map(
    output.split('\n').map((line) => {
      const [sha, ref] = line.trim().split(/\s+/);
      return [ref, sha];
    }),
  );
  const tagRef = refs.get(`refs/tags/${tag}`);
  const peeledSha = refs.get(`refs/tags/${tag}^{}`);
  assertMatch(tagRef != null, `Remote tag ${tag} is malformed.`);
  assertMatch(peeledSha != null, `Remote tag ${tag} is not an annotated tag.`);
  assertMatch(peeledSha === commitSha, `Remote tag ${tag} targets ${peeledSha}.`);
  return { state: 'present', tag, tagObjectSha: tagRef, targetSha: peeledSha };
}

export function finalizeBootstrapTag({
  commitSha,
  packageName = PACKAGE_NAME,
  remote = 'origin',
  run = defaultRun,
  version = PACKAGE_VERSION,
}) {
  assertMatch(
    run('git', ['rev-parse', 'HEAD']) === commitSha,
    'Checkout SHA changed before tagging.',
  );
  assertMatch(
    run('git', ['status', '--porcelain', '--untracked-files=no']) === '',
    'Tracked files changed before tagging.',
  );

  const existingTag = inspectRemoteTag({ commitSha, packageName, remote, run, version });
  if (existingTag.state === 'present') {
    return { ...existingTag, action: 'verified-existing' };
  }

  const tag = existingTag.tag;
  run('git', ['config', 'user.name', 'github-actions[bot]']);
  run('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
  run('git', ['tag', '-a', tag, commitSha, '-m', `Release ${tag}`]);
  assertMatch(run('git', ['rev-list', '-n', '1', tag]) === commitSha, 'Local tag target differs.');
  run('git', ['push', remote, `refs/tags/${tag}`]);

  const publishedTag = inspectRemoteTag({ commitSha, packageName, remote, run, version });
  assertMatch(publishedTag.state === 'present', `Remote tag ${tag} was not created.`);
  return { ...publishedTag, action: 'created' };
}

export async function inspectBootstrapState(options) {
  const packageState = await inspectPublishedPackage(options);
  const tagState = inspectRemoteTag(options);

  if (packageState.state === 'absent') {
    assertMatch(tagState.state === 'absent', 'Release tag exists while the npm package is absent.');
    return { state: 'absent' };
  }

  return { state: 'present', provenance: packageState.provenance, tagState };
}

export async function reconcileBootstrapRelease({
  attempts = 1,
  delayMs = 0,
  sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
  ...options
}) {
  let lastUnavailableError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const packageState = await inspectPublishedPackage(options);
      if (packageState.state === 'present') {
        const tagState = finalizeBootstrapTag(options);
        return { packageState, tagState };
      }
    } catch (error) {
      if (error instanceof BootstrapMismatchError) {
        throw error;
      }
      if (!(error instanceof BootstrapUnavailableError)) {
        throw error;
      }
      lastUnavailableError = error;
    }

    if (attempt < attempts) {
      await sleep(delayMs);
    }
  }

  throw new BootstrapUnavailableError(
    lastUnavailableError?.message ?? 'Bootstrap package is still absent from npm.',
  );
}

function readLocalConfig() {
  const manifest = JSON.parse(readFileSync('packages/foundry-ai/package.json', 'utf8'));
  assertMatch(manifest.name === PACKAGE_NAME, `Manifest package name is ${manifest.name}.`);
  assertMatch(
    manifest.version === PACKAGE_VERSION,
    `Manifest package version is ${manifest.version}.`,
  );
  assertMatch(
    manifest.repository?.url === MANIFEST_REPOSITORY,
    `Manifest repository URL is ${manifest.repository?.url}.`,
  );
  return {
    commitSha: process.env.BOOTSTRAP_SHA,
    packageName: manifest.name,
    repository: PROVENANCE_REPOSITORY,
    version: manifest.version,
  };
}

async function main() {
  const mode = process.argv[2];
  const options = readLocalConfig();
  assertMatch(
    /^[0-9a-f]{40}$/.test(options.commitSha ?? ''),
    'BOOTSTRAP_SHA must be a full lowercase commit SHA.',
  );

  if (mode === 'inspect') {
    const state = await inspectBootstrapState(options);
    process.stdout.write(`${state.state}\n`);
    return;
  }

  if (mode === 'finalize') {
    const result = await reconcileBootstrapRelease({
      ...options,
      attempts: Number(process.env.BOOTSTRAP_RECONCILE_ATTEMPTS ?? 24),
      delayMs: Number(process.env.BOOTSTRAP_RECONCILE_DELAY_MS ?? 5_000),
    });
    const summary = {
      package: `${options.packageName}@${options.version}`,
      provenance: result.packageState.provenance.provenanceType,
      repository: result.packageState.provenance.repository,
      selectedSha: options.commitSha,
      tagAction: result.tagState.action,
      tagTarget: result.tagState.targetSha,
    };
    console.log(JSON.stringify(summary));
    if (process.env.GITHUB_STEP_SUMMARY) {
      appendFileSync(
        process.env.GITHUB_STEP_SUMMARY,
        [
          '### Bootstrap reconciliation',
          `- Package: \`${summary.package}\``,
          `- Repository: \`${summary.repository}\``,
          `- Published SHA: \`${summary.selectedSha}\``,
          `- Tag target: \`${summary.tagTarget}\``,
          `- Tag action: \`${summary.tagAction}\``,
          `- Provenance: \`${summary.provenance}\``,
          '',
        ].join('\n'),
      );
    }
    return;
  }

  throw new Error('Usage: reconcile-bootstrap-release.mjs <inspect|finalize>');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

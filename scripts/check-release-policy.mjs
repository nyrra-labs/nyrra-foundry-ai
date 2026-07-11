#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

const workflow = parse(readFileSync('.github/workflows/release.yml', 'utf8'));
const packageManifest = JSON.parse(readFileSync('packages/foundry-ai/package.json', 'utf8'));
const releasingGuide = readFileSync('docs/RELEASING.md', 'utf8');
const bootstrapInput = workflow.on?.workflow_dispatch?.inputs?.bootstrap_sha;
const bootstrapJob = workflow.jobs?.['bootstrap-package'];
const actionsExpression = (expression) => ['$', '{{ ', expression, ' }}'].join('');
const shellVariable = (name) => ['$', '{', name, '}'].join('');

function requireCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function findStep(name) {
  const step = bootstrapJob?.steps?.find((candidate) => candidate.name === name);
  requireCondition(step != null, `Missing bootstrap workflow step: ${name}`);
  return step;
}

requireCondition(
  workflow.permissions?.contents === 'write',
  'Release workflow needs tag write access.',
);
requireCondition(
  packageManifest.repository?.url === 'git+https://github.com/shpitdev/foundry-ai.git',
  'Package manifest must use the exact git+https public repository URL.',
);
requireCondition(
  releasingGuide.includes(
    "Confirm the package manifest's repository URL is exactly `git+https://github.com/shpitdev/foundry-ai.git`",
  ),
  'Release guide must assert the manifest repository URL exactly.',
);
requireCondition(
  workflow.permissions?.['id-token'] === 'write',
  'Release workflow must mint provenance identity tokens.',
);
requireCondition(bootstrapInput?.required === true, 'bootstrap_sha must be required.');
requireCondition(bootstrapInput?.type === 'string', 'bootstrap_sha must be a string input.');
requireCondition(
  bootstrapJob?.['runs-on'] === 'ubuntu-latest',
  'Bootstrap must use a GitHub runner.',
);
requireCondition(
  bootstrapJob?.if?.includes("github.event_name == 'workflow_dispatch'"),
  'Bootstrap job must only run for workflow_dispatch.',
);
requireCondition(
  bootstrapJob?.if?.includes("github.ref == 'refs/heads/main'"),
  'Bootstrap dispatch must run from the main workflow ref.',
);

const checkoutStep = findStep('Check out selected main SHA');
requireCondition(
  checkoutStep.with?.ref === actionsExpression('inputs.bootstrap_sha'),
  'Bootstrap checkout must use the selected SHA.',
);

const npmStep = findStep('Install provenance-capable npm');
requireCondition(npmStep.run?.includes('npm@11.16.0'), 'Bootstrap must pin npm 11.16.0.');

const validationStep = findStep('Validate one-time bootstrap source');
for (const requiredCheck of [
  'git rev-parse HEAD',
  'git rev-parse origin/main',
  `"${shellVariable('main_sha')}" = "${shellVariable('WORKFLOW_SHA')}"`,
  `"${shellVariable('PACKAGE_STATE')}" = "absent"`,
  'git merge-base --is-ancestor',
  'git branch --show-current',
  'git status --porcelain --untracked-files=no',
  '"@shpit/foundry-ai"',
  '"0.0.5"',
]) {
  requireCondition(
    validationStep.run?.includes(requiredCheck),
    `Bootstrap source validation is missing: ${requiredCheck}`,
  );
}

const revalidationStep = findStep('Revalidate pinned main SHA immediately before publish');
requireCondition(
  revalidationStep.run?.includes('git rev-parse origin/main'),
  'Bootstrap must revalidate main immediately before publishing.',
);
requireCondition(
  revalidationStep.run?.includes('git merge-base --is-ancestor'),
  'Bootstrap resume must prove the selected SHA remains on main.',
);

const stateStep = findStep('Inspect resumable bootstrap state');
requireCondition(
  stateStep.run?.includes('reconcile-bootstrap-release.mjs inspect'),
  'Bootstrap must inspect existing package and tag state before publishing.',
);

const publishStep = findStep('Publish bootstrap package with provenance');
requireCondition(
  publishStep.env?.NODE_AUTH_TOKEN === actionsExpression('secrets.NPM_BOOTSTRAP_TOKEN'),
  'Bootstrap publish must use the one-time GitHub secret.',
);
requireCondition(
  publishStep.run?.includes('npm publish --provenance --access public --tag latest'),
  'Bootstrap publish must be public and provenance-enabled.',
);
requireCondition(
  publishStep.run?.includes('git rev-parse HEAD'),
  'Bootstrap publish must recheck the selected SHA.',
);
requireCondition(
  publishStep['continue-on-error'] === true,
  'Bootstrap publish errors must flow into reconciliation.',
);
requireCondition(
  publishStep.if === "steps.bootstrap_state.outputs.package_state == 'absent'",
  'Bootstrap publish must be skipped for a safely resumable existing package.',
);

const tagStep = findStep('Reconcile accepted publish and finalize exact tag');
requireCondition(
  tagStep.if?.includes('always()'),
  'Bootstrap reconciliation must run after any publish command outcome.',
);
requireCondition(
  tagStep.run?.includes('reconcile-bootstrap-release.mjs finalize'),
  'Bootstrap reconciliation must verify provenance and finalize the exact tag.',
);
requireCondition(
  tagStep.env?.PUBLISH_OUTCOME === actionsExpression('steps.bootstrap_publish.outcome'),
  'Bootstrap reconciliation must record the publish command outcome.',
);

const revokeStep = findStep('Revoke one-time npm token');
requireCondition(revokeStep.if === 'always()', 'Bootstrap token revocation must always run.');
requireCondition(
  revokeStep.env?.PUBLISH_OUTCOME === actionsExpression('steps.bootstrap_publish.outcome'),
  'Token cleanup must distinguish a skipped safe resume from a publish attempt.',
);
requireCondition(
  revokeStep.run?.includes(`if ! npm token revoke "${shellVariable('NPM_BOOTSTRAP_TOKEN')}"; then`),
  'Bootstrap must hard-fail when npm CLI token revocation fails.',
);
requireCondition(
  !revokeStep.run?.includes('/-/npm/v1/tokens/token/'),
  'Bootstrap must not use the classic-token registry API fallback.',
);
requireCondition(
  revokeStep.run?.includes('npm whoami'),
  'Bootstrap must verify that the revoked token no longer authenticates.',
);
requireCondition(
  revokeStep.run?.includes('already non-authenticating'),
  'Bootstrap token cleanup must be idempotent after an earlier accepted revocation.',
);
for (const requiredCheck of [
  'npm ping --registry=https://registry.npmjs.org',
  'for attempt in 1 2 3',
  'sleep $((attempt * 2))',
  'probe_token_state "Post-revocation"',
  'mixed or inconclusive',
  'Manually revoke the token on npmjs.com right now.',
]) {
  requireCondition(
    revokeStep.run?.includes(requiredCheck),
    `Bootstrap token cleanup is missing retry hardening: ${requiredCheck}`,
  );
}

for (const jobName of ['publish-prerelease', 'publish-stable']) {
  const publishJob = workflow.jobs?.[jobName];
  requireCondition(
    publishJob?.if?.includes("vars.NPM_PUBLISH_ENABLED == 'true'"),
    `${jobName} must require NPM_PUBLISH_ENABLED=true.`,
  );
  requireCondition(
    publishJob?.if?.includes('github.event.pull_request.merged == true'),
    `${jobName} must only publish merged pull requests.`,
  );
  requireCondition(
    publishJob?.steps?.some((step) => step.run === 'npm install --global npm@11.16.0'),
    `${jobName} must pin a trusted-publishing-compatible npm version.`,
  );
}

const releaseBranchCheck = "startsWith(github.event.pull_request.head.ref, 'release/')";
requireCondition(
  workflow.jobs?.['publish-prerelease']?.if?.includes(`!${releaseBranchCheck}`),
  'Prerelease publishing must exclude release branches.',
);
requireCondition(
  workflow.jobs?.['publish-stable']?.if?.includes(releaseBranchCheck) &&
    !workflow.jobs?.['publish-stable']?.if?.includes(`!${releaseBranchCheck}`),
  'Stable publishing must require a release branch.',
);

for (const [jobName, job] of Object.entries(workflow.jobs)) {
  for (const step of job.steps ?? []) {
    if (step.run == null) {
      continue;
    }

    execFileSync('bash', ['-n'], {
      input: step.run,
      stdio: ['pipe', 'ignore', 'pipe'],
    });
  }
  requireCondition(Array.isArray(job.steps), `${jobName} must define workflow steps.`);
}

console.log('Release policy check passed for the pinned GitHub Actions bootstrap.');

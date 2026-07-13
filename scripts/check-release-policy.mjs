#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

const workflow = parse(readFileSync('.github/workflows/release.yml', 'utf8'));
const manifest = JSON.parse(readFileSync('packages/foundry-ai/package.json', 'utf8'));
const expectedPackage = '@nyrra/foundry-ai';
const expectedRepository = 'git+https://github.com/shpitdev/foundry-ai.git';

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

requireCondition(workflow.permissions?.contents === 'write', 'Release workflow needs tag access.');
requireCondition(
  workflow.permissions?.['id-token'] === 'write',
  'Release workflow needs npm provenance identity tokens.',
);
requireCondition(manifest.name === expectedPackage, `Package must remain ${expectedPackage}.`);
requireCondition(
  manifest.repository?.url === expectedRepository,
  `Package repository must be ${expectedRepository}.`,
);
requireCondition(
  workflow.jobs?.['bootstrap-package'] == null,
  'The retired new-package bootstrap job must not exist.',
);
requireCondition(
  !readFileSync('.github/workflows/release.yml', 'utf8').includes('NPM_BOOTSTRAP_TOKEN'),
  'The retired bootstrap token must not be referenced.',
);

const releaseBranch = "startsWith(github.event.pull_request.head.ref, 'release/')";
for (const [name, expectedReleaseBranch] of [
  ['publish-prerelease', false],
  ['publish-stable', true],
]) {
  const job = workflow.jobs?.[name];
  requireCondition(job != null, `Missing release job ${name}.`);
  requireCondition(
    job.if?.includes("vars.NPM_PUBLISH_ENABLED == 'true'"),
    `${name} must require NPM_PUBLISH_ENABLED=true.`,
  );
  requireCondition(
    job.if?.includes('github.event.pull_request.merged == true'),
    `${name} must require a merged PR.`,
  );
  requireCondition(
    expectedReleaseBranch ? job.if?.includes(releaseBranch) : job.if?.includes(`!${releaseBranch}`),
    `${name} has the wrong release-branch gate.`,
  );
  requireCondition(job['runs-on'] === 'ubuntu-latest', `${name} must use a GitHub-hosted runner.`);
  requireCondition(
    job.steps?.some((step) => step.run === 'npm install --global npm@11.16.0'),
    `${name} must pin a trusted-publishing-compatible npm version.`,
  );
  requireCondition(
    job.steps?.some((step) => step.run?.includes('NODE_AUTH_TOKEN="" npm publish')),
    `${name} must publish through OIDC rather than an npm token.`,
  );
  for (const step of job.steps ?? []) {
    if (step.run) {
      execFileSync('bash', ['-n'], { input: step.run, stdio: ['pipe', 'ignore', 'pipe'] });
    }
  }
}

console.log(`Release policy check passed for ${expectedPackage} from shpitdev/foundry-ai.`);

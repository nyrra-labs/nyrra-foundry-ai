#!/usr/bin/env node

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const artifactRoot = resolve(workspaceRoot, '.memory', 'capability-runs');
const packageReadmePath = resolve(workspaceRoot, 'packages/foundry-ai/README.md');
const packageDocsDir = resolve(workspaceRoot, 'packages/foundry-ai/docs');
const packageMatrixDocPath = resolve(packageDocsDir, 'live-capability-matrix.md');
const readmeMarkerStart = '<!-- live-matrix:start -->';
const readmeMarkerEnd = '<!-- live-matrix:end -->';
const providerOrder = ['openai', 'anthropic', 'google'];
const modelCapabilityColumns = [
  ['text.generate', 'Text'],
  ['messages.generate', 'Messages'],
  ['rid.passthrough', 'RID'],
  ['text.stream', 'Stream'],
  ['structured.output.object', 'Structured'],
  ['tool.loop.deterministic', 'Tools'],
  ['agent.tool_loop', 'Agent'],
  ['structured.plus.tools', 'Structured+Tools'],
  ['vision.image_input', 'Vision'],
  ['reasoning.visibility', 'Reasoning'],
];

const artifactDir = resolveArtifactDir(process.argv.slice(2));
const resultsPath = join(artifactDir, 'results.json');
const record = JSON.parse(readFileSync(resultsPath, 'utf8'));

const providerSummaries = summarizeProviders(record.cases);
const statusCounts = summarizeStatuses(record.cases);
const matrixDoc = createMatrixDoc(record, artifactDir, providerSummaries, statusCounts);
const readmeSummary = createReadmeSummary(record, providerSummaries, statusCounts);

mkdirSync(packageDocsDir, { recursive: true });
writeFileSync(packageMatrixDocPath, matrixDoc, 'utf8');
writeFileSync(packageReadmePath, replaceReadmeBlock(packageReadmePath, readmeSummary), 'utf8');

process.stdout.write(
  `Updated ${relativeToWorkspace(packageMatrixDocPath)} from ${relativeToWorkspace(artifactDir)}.\n`,
);

function resolveArtifactDir(args) {
  const artifactFlagIndex = args.indexOf('--artifact');

  if (artifactFlagIndex !== -1) {
    const artifactPath = args[artifactFlagIndex + 1];

    if (!artifactPath) {
      throw new Error('Expected a path after --artifact.');
    }

    return resolve(workspaceRoot, artifactPath);
  }

  const candidates = readdirSync(artifactRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(artifactRoot, entry.name))
    .sort()
    .reverse();

  const latest = candidates.at(0);

  if (!latest) {
    throw new Error(`No capability run artifacts found under ${artifactRoot}.`);
  }

  return latest;
}

function summarizeStatuses(cases) {
  const counts = cases.reduce((accumulator, testCase) => {
    accumulator[testCase.status] = (accumulator[testCase.status] ?? 0) + 1;
    return accumulator;
  }, {});

  return ['pass', 'skipped', 'proxy-rejected', 'unsupported', 'fail']
    .filter((status) => status in counts)
    .map((status) => [status, counts[status]]);
}

function summarizeProviders(cases) {
  const summaries = new Map();

  for (const testCase of cases) {
    const summary = summaries.get(testCase.provider) ?? {
      fail: 0,
      pass: 0,
      'proxy-rejected': 0,
      skipped: 0,
      unsupported: 0,
    };

    summary[testCase.status] += 1;
    summaries.set(testCase.provider, summary);
  }

  return providerOrder
    .filter((provider) => summaries.has(provider))
    .map((provider) => [provider, summaries.get(provider)]);
}

function createMatrixDoc(record, artifactDir, providerSummaries, statusCounts) {
  const lines = [
    '# Live Capability Matrix',
    '',
    'Generated from the latest local live verification artifact.',
    '',
    `- Run ID: \`${record.runId}\``,
    `- Git SHA: \`${record.gitSha}\``,
    `- Package Version: \`${record.packageVersion}\``,
    `- Artifact: \`${relativeToWorkspace(artifactDir)}\``,
    `- Started: ${record.startedAt}`,
    `- Finished: ${record.finishedAt ?? 'in-progress'}`,
    `- Default Models: openai=\`${record.models.openai}\`, anthropic=\`${record.models.anthropic}\`, google=\`${record.models.google}\``,
    `- Model Scope: \`${record.modelScope ?? 'canonical'}\``,
    `- Status Counts: ${statusCounts.map(([status, count]) => `\`${status}\`: ${count}`).join(', ')}`,
    '',
    'The live suite is the canonical verification surface for proxy-sensitive behavior. The default per-provider models are the hard gate; the rest of the catalog rows are investigation coverage and are allowed to surface non-pass results without failing the suite. Survey coverage excludes lifecycle `sunset` and `deprecated` models. Rows marked `skipped` are intentionally out of scope for the current stack or package surface. Rows marked `proxy-rejected` are real proxy or request-shape failures that need investigation.',
    '',
    '## Provider Summary',
    '',
    '| Provider | Pass | Skipped | Proxy Rejected | Unsupported | Fail |',
    '|---|---:|---:|---:|---:|---:|',
  ];

  for (const [provider, summary] of providerSummaries) {
    lines.push(
      `| ${provider} | ${summary.pass} | ${summary.skipped} | ${summary['proxy-rejected']} | ${summary.unsupported} | ${summary.fail} |`,
    );
  }

  lines.push(
    '',
    '## Provider Capability Tables',
    '',
    'Rows are models. Columns are the primary live language-model capabilities. Newer models appear first within each provider.',
  );

  for (const provider of providerOrder) {
    const table = createProviderCapabilityTable(record, provider);

    if (!table) {
      continue;
    }

    lines.push('', `### ${provider}`, '', ...table, '');
  }

  lines.push(
    '',
    '## Detailed Rows',
    '',
    '| Provider | Capability | Status | Model | Duration ms | Notes |',
    '|---|---|---|---|---:|---|',
  );

  for (const testCase of record.cases) {
    lines.push(
      `| ${testCase.provider} | ${testCase.capability} | ${testCase.status} | \`${testCase.modelId}\` | ${testCase.durationMs} | ${escapeTable(getCaseNote(testCase))} |`,
    );
  }

  const nonPassCases = record.cases.filter((testCase) => testCase.status !== 'pass');

  if (nonPassCases.length > 0) {
    lines.push('', '## Non-Pass Details', '');

    for (const testCase of nonPassCases) {
      lines.push(
        `### ${testCase.provider}.${testCase.capability}`,
        '',
        `- Status: \`${testCase.status}\``,
        `- Model: \`${testCase.modelId}\``,
        `- Notes: ${getCaseNote(testCase)}`,
        '',
      );
    }
  }

  return `${lines.join('\n')}\n`;
}

function createReadmeSummary(record, providerSummaries, statusCounts) {
  const lines = [
    readmeMarkerStart,
    '## Live Capability Matrix',
    '',
    'Generated from the latest local live verification artifact checked into this branch.',
    '',
    `Latest snapshot: \`${record.runId}\``,
    '',
    `- Default Models: openai=\`${record.models.openai}\`, anthropic=\`${record.models.anthropic}\`, google=\`${record.models.google}\``,
    `- Model Scope: \`${record.modelScope ?? 'canonical'}\``,
    `- Status Counts: ${statusCounts.map(([status, count]) => `\`${status}\`: ${count}`).join(', ')}`,
    '',
    'The default per-provider models are the hard gate. Additional catalog rows are investigation coverage, exclude lifecycle `sunset` and `deprecated` models, and may surface non-pass results without failing the suite.',
    '',
    '| Provider | Pass | Skipped | Proxy Rejected | Unsupported | Fail |',
    '|---|---:|---:|---:|---:|---:|',
  ];

  for (const [provider, summary] of providerSummaries) {
    lines.push(
      `| ${provider} | ${summary.pass} | ${summary.skipped} | ${summary['proxy-rejected']} | ${summary.unsupported} | ${summary.fail} |`,
    );
  }

  lines.push('', '### Provider Tables', '');

  for (const provider of providerOrder) {
    const table = createProviderCapabilityTable(record, provider);

    if (!table) {
      continue;
    }

    lines.push(`#### ${provider}`, '', ...table, '');
  }

  lines.push(
    'See [docs/live-capability-matrix.md](./docs/live-capability-matrix.md) for the full row-by-row matrix and non-pass details.',
    readmeMarkerEnd,
  );

  return lines.join('\n');
}

function replaceReadmeBlock(readmePath, replacement) {
  const source = readFileSync(readmePath, 'utf8');
  const startIndex = source.indexOf(readmeMarkerStart);
  const endIndex = source.indexOf(readmeMarkerEnd);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`README markers not found in ${readmePath}.`);
  }

  return `${source.slice(0, startIndex)}${replacement}${source.slice(endIndex + readmeMarkerEnd.length)}`;
}

function getCaseNote(testCase) {
  if (typeof testCase?.error?.message === 'string') {
    return testCase.error.message;
  }

  if (Array.isArray(testCase.notes) && testCase.notes.length > 0) {
    return testCase.notes.join('; ');
  }

  return 'none';
}

function escapeTable(value) {
  return String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
}

function createProviderCapabilityTable(record, provider) {
  const providerCases = record.cases.filter(
    (testCase) =>
      testCase.provider === provider &&
      modelCapabilityColumns.some(([capability]) => capability === testCase.capability),
  );

  if (providerCases.length === 0) {
    return null;
  }

  const casesByModel = new Map();

  for (const testCase of providerCases) {
    const capabilities = casesByModel.get(testCase.modelId) ?? new Map();
    capabilities.set(testCase.capability, testCase);
    casesByModel.set(testCase.modelId, capabilities);
  }

  const orderedModels = getProviderModels(record, provider, casesByModel);
  const header = ['| Model |', ...modelCapabilityColumns.map(([, label]) => `${label} |`)].join(
    ' ',
  );
  const divider = ['|---|', ...modelCapabilityColumns.map(() => '---|')].join('');
  const rows = [header, divider];

  for (const modelId of orderedModels) {
    const capabilities = casesByModel.get(modelId) ?? new Map();
    const cells = modelCapabilityColumns.map(([capability]) =>
      formatStatusCell(capabilities.get(capability)?.status),
    );

    rows.push(`| \`${modelId}\` | ${cells.join(' | ')} |`);
  }

  return rows;
}

function getProviderModels(record, provider, casesByModel) {
  const configuredModels = Array.isArray(record.matrixModels?.[provider])
    ? record.matrixModels[provider]
    : [];

  if (configuredModels.length > 0) {
    return configuredModels.filter((modelId) => casesByModel.has(modelId));
  }

  return [...casesByModel.keys()];
}

function formatStatusCell(status) {
  if (status == null) {
    return '-';
  }

  if (status === 'proxy-rejected') {
    return 'proxy';
  }

  if (status === 'unsupported') {
    return 'unsupported';
  }

  return status;
}

function relativeToWorkspace(path) {
  return path.replace(`${workspaceRoot}/`, '');
}

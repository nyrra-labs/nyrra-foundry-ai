import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const [exampleName, ...exampleArgs] = process.argv.slice(2);

if (!exampleName) {
  fail('Usage: pnpm run example <example-name> [provider] [model-id]');
}

const examplePath = resolve(
  process.cwd(),
  'examples',
  exampleName.endsWith('.ts') ? exampleName : `${exampleName}.ts`,
);

if (!existsSync(examplePath)) {
  fail(`Unknown example: ${exampleName}`);
}

run('pnpm', ['run', 'build']);

const runner =
  spawnSync('bun', ['--version'], { stdio: 'ignore' }).status === 0
    ? ['bun', [examplePath, ...exampleArgs]]
    : ['node', ['--import', 'tsx', examplePath, ...exampleArgs]];

run(runner[0], runner[1]);

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

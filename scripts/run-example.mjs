import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const workspaceRoot = process.cwd();
const [exampleName, ...exampleArgs] = process.argv.slice(2);

if (!exampleName) {
  fail('Usage: pnpm run example <example-name> [provider] [model-id]');
}

const examplePath = resolve(
  workspaceRoot,
  'examples',
  exampleName.endsWith('.ts') ? exampleName : `${exampleName}.ts`,
);

if (!existsSync(examplePath)) {
  fail(`Unknown example: ${exampleName}`);
}

run('pnpm', ['run', 'build']);

if (spawnSync('bun', ['--version'], { stdio: 'ignore' }).status === 0) {
  run('bun', [examplePath, ...exampleArgs]);
} else {
  run('node', ['--import', 'tsx', examplePath, ...exampleArgs]);
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: workspaceRoot,
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

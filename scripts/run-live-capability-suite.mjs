#!/usr/bin/env node

import { spawn } from 'node:child_process';
import process from 'node:process';

const workspaceRoot = process.cwd();

const testExitCode = await runCommand('pnpm', [
  'exec',
  'vitest',
  'run',
  '--config',
  'packages/foundry-ai/vitest.live.config.ts',
]);

const docsExitCode = await runCommand('node', ['scripts/update-live-matrix-docs.mjs']);

if (docsExitCode !== 0) {
  process.exit(docsExitCode);
}

process.exit(testExitCode);

function runCommand(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: workspaceRoot,
      env: process.env,
      stdio: 'inherit',
    });

    child.on('exit', (code, signal) => {
      if (signal) {
        process.stderr.write(`${command} terminated with signal ${signal}.\n`);
        resolve(1);
        return;
      }

      resolve(code ?? 1);
    });
  });
}

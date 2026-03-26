import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { loadFoundryConfig } from '../../config.js';

const LOCAL_ENV_FILE = resolveWorkspaceFile('.env.local');

export function loadLiveFoundryConfig() {
  maybeLoadLocalEnvFile();

  return loadFoundryConfig();
}

function maybeLoadLocalEnvFile() {
  if (process.env.FOUNDRY_URL && process.env.FOUNDRY_TOKEN) {
    return;
  }

  if (typeof process.loadEnvFile !== 'function') {
    return;
  }

  try {
    process.loadEnvFile(LOCAL_ENV_FILE);
  } catch {
    // Let loadFoundryConfig surface the missing-variable error below.
  }
}

function resolveWorkspaceFile(path: string): string {
  return resolve(findWorkspaceRoot(import.meta.dirname), path);
}

function findWorkspaceRoot(startDirectory: string): string {
  let currentDirectory = startDirectory;

  while (true) {
    if (existsSync(resolve(currentDirectory, 'pnpm-workspace.yaml'))) {
      return currentDirectory;
    }

    const parentDirectory = dirname(currentDirectory);

    if (parentDirectory === currentDirectory) {
      return process.cwd();
    }

    currentDirectory = parentDirectory;
  }
}

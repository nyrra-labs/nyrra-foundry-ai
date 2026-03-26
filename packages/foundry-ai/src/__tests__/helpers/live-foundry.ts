import { resolve } from 'node:path';
import process from 'node:process';
import { loadFoundryConfig } from '../../config.js';

const LOCAL_ENV_FILE = resolve(import.meta.dirname, '../../../../../.env.local');

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

import { resolve } from 'node:path';
import process from 'node:process';

const repoRoot = resolve(import.meta.dirname, '../../../..');
const localEnvFile = resolve(repoRoot, '.env.local');

export function ensureDemoEnv() {
  maybeLoadLocalEnvFile();

  const missing = ['FOUNDRY_URL', 'FOUNDRY_TOKEN', 'EXA_API_KEY'].filter((name) => {
    return !process.env[name]?.trim();
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables for ui-agent-demo: ${missing.join(', ')}`,
    );
  }
}

function maybeLoadLocalEnvFile() {
  if (process.env.FOUNDRY_URL && process.env.FOUNDRY_TOKEN && process.env.EXA_API_KEY) {
    return;
  }

  if (typeof process.loadEnvFile !== 'function') {
    return;
  }

  try {
    process.loadEnvFile(localEnvFile);
  } catch {
    // The demo surfaces missing env values explicitly in ensureDemoEnv().
  }
}

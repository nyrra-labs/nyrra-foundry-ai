import type { FoundryConfig } from './types.js';

const FOUNDRY_URL_ENV = 'FOUNDRY_URL';
const FOUNDRY_TOKEN_ENV = 'FOUNDRY_TOKEN';
const FOUNDRY_ATTRIBUTION_RID_ENV = 'FOUNDRY_ATTRIBUTION_RID';

export function loadFoundryConfig(env: NodeJS.ProcessEnv = process.env): FoundryConfig {
  return {
    foundryUrl: normalizeFoundryUrl(requireEnv(env, FOUNDRY_URL_ENV)),
    token: requireEnv(env, FOUNDRY_TOKEN_ENV),
    attributionRid: optionalEnv(env, FOUNDRY_ATTRIBUTION_RID_ENV),
  };
}

export function normalizeFoundryUrl(foundryUrl: string): string {
  return foundryUrl.replace(/\/+$/, '');
}

function requireEnv(env: NodeJS.ProcessEnv, name: string): string {
  const value = optionalEnv(env, name);

  if (value == null) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function optionalEnv(env: NodeJS.ProcessEnv, name: string): string | undefined {
  const value = env[name]?.trim();

  return value ? value : undefined;
}

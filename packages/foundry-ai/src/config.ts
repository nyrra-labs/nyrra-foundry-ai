import type { FoundryConfig } from './types.js';

const FOUNDRY_URL_ENV = 'FOUNDRY_URL';
const FOUNDRY_TOKEN_ENV = 'FOUNDRY_TOKEN';
const FOUNDRY_ATTRIBUTION_RID_ENV = 'FOUNDRY_ATTRIBUTION_RID';

export function loadFoundryConfig(env: NodeJS.ProcessEnv = process.env): FoundryConfig {
  return normalizeResolvedFoundryConfig({
    foundryUrl: requireEnv(env, FOUNDRY_URL_ENV),
    token: requireEnv(env, FOUNDRY_TOKEN_ENV),
    attributionRid: optionalEnv(env, FOUNDRY_ATTRIBUTION_RID_ENV),
  });
}

export function normalizeFoundryUrl(foundryUrl: string): string {
  return foundryUrl.trim().replace(/\/+$/, '');
}

export function resolveFoundryConfig(config: FoundryConfig, callerName: string): FoundryConfig {
  const normalizedConfig = normalizeResolvedFoundryConfig({
    foundryUrl: typeof config.foundryUrl === 'string' ? config.foundryUrl : '',
    token: typeof config.token === 'string' ? config.token : '',
    attributionRid: typeof config.attributionRid === 'string' ? config.attributionRid : undefined,
  });

  if (normalizedConfig.foundryUrl.length === 0) {
    throw new Error(`${callerName} requires config.foundryUrl to be a non-empty string.`);
  }

  if (normalizedConfig.token.length === 0) {
    throw new Error(`${callerName} requires config.token to be a non-empty string.`);
  }

  return normalizedConfig;
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

function normalizeResolvedFoundryConfig(config: {
  foundryUrl: string;
  token: string;
  attributionRid?: string;
}): FoundryConfig {
  const attributionRid = config.attributionRid?.trim();

  return {
    foundryUrl: normalizeFoundryUrl(config.foundryUrl),
    token: config.token.trim(),
    attributionRid: attributionRid || undefined,
  };
}

import { afterEach, describe, expect, it } from 'vitest';
import { getLiveCapabilityModelMatrix } from './helpers/live-capabilities.js';

const originalEnv = {
  FOUNDRY_TOKEN: process.env.FOUNDRY_TOKEN,
  FOUNDRY_URL: process.env.FOUNDRY_URL,
  LIVE_MODEL_SCOPE: process.env.LIVE_MODEL_SCOPE,
};

describe('live capability model matrix', () => {
  afterEach(() => {
    restoreEnv('FOUNDRY_TOKEN', originalEnv.FOUNDRY_TOKEN);
    restoreEnv('FOUNDRY_URL', originalEnv.FOUNDRY_URL);
    restoreEnv('LIVE_MODEL_SCOPE', originalEnv.LIVE_MODEL_SCOPE);
  });

  it('excludes sunset models from catalog survey coverage', () => {
    process.env.FOUNDRY_URL = 'https://example.palantirfoundry.com';
    process.env.FOUNDRY_TOKEN = 'token-123';
    process.env.LIVE_MODEL_SCOPE = 'catalog';

    const matrix = getLiveCapabilityModelMatrix();

    expect(matrix.openai).toContain('gpt-5.4-mini');
    expect(matrix.openai).toContain('gpt-5.4-nano');
    expect(matrix.openai).not.toContain('gpt-4o-mini');
    expect(matrix.google).not.toContain('gemini-3-pro');
  });
});

function restoreEnv(
  key: 'FOUNDRY_TOKEN' | 'FOUNDRY_URL' | 'LIVE_MODEL_SCOPE',
  value: string | undefined,
) {
  if (value == null) {
    delete process.env[key];
    return;
  }

  process.env[key] = value;
}

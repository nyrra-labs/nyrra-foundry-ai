import { describe, expect, it } from 'vitest';
import { loadFoundryConfig } from '../config.js';
import { FoundryModelNotFoundError } from '../errors.js';
import type { AnthropicModelId, KnownAnthropicModelId } from '../models/anthropic-models.js';
import {
  getModelMetadata,
  hasKnownModel,
  type KnownModelId,
  MODEL_CATALOG_BY_RID,
  resolveKnownModelMetadata,
  resolveModelProvider,
  resolveModelRid,
  resolveModelTarget,
} from '../models/catalog.js';
import type { GoogleModelId, KnownGoogleModelId } from '../models/google-models.js';
import type { KnownOpenAIModelId, OpenAIModelId } from '../models/openai-models.js';

describe('model catalog', () => {
  it('resolves metadata for known OpenAI models', () => {
    expect(resolveModelRid('gpt-5-mini')).toBe(
      'ri.language-model-service..language-model.gpt-5-mini',
    );
    expect(resolveModelRid('gpt-5.4-mini')).toBe(
      'ri.language-model-service..language-model.gpt-5-4-mini',
    );
    expect(resolveModelProvider('gpt-5-mini')).toBe('openai');
    expect(getModelMetadata('gpt-5-mini')).toMatchObject({
      displayName: 'GPT-5 mini',
      lifecycle: 'ga',
      modelIdentifier: 'GPT_5_MINI',
      provider: 'openai',
      supportsResponses: true,
      supportsVision: true,
      trainingCutoffDate: '2024-05-30T00:00:00Z',
      inputTypes: expect.arrayContaining(['OPEN_AI_REASONING', 'OPEN_AI_RESPONSES']),
      performance: {
        cost: 'LOW',
        modelClass: 'LIGHTWEIGHT',
        speed: 'MEDIUM',
      },
    });
    expect(getModelMetadata('gpt-5-codex')).toMatchObject({
      displayName: 'GPT-5 Codex',
      provider: 'openai',
      supportsResponses: true,
      supportsVision: true,
    });
  });

  it('resolves metadata for known Anthropic models', () => {
    expect(resolveModelRid('claude-sonnet-4.6')).toBe(
      'ri.language-model-service..language-model.anthropic-claude-4-6-sonnet',
    );
    expect(resolveModelProvider('claude-sonnet-4.6')).toBe('anthropic');
  });

  it('resolves metadata for known Google models', () => {
    expect(resolveModelRid('gemini-3.1-flash-lite')).toBe(
      'ri.language-model-service..language-model.gemini-3-1-flash-lite',
    );
    expect(resolveModelProvider('gemini-3.1-flash-lite')).toBe('google');
    expect(getModelMetadata('gemini-3.1-flash-lite')).toMatchObject({
      displayName: 'Gemini 3.1 Flash Lite (Preview)',
      lifecycle: 'experimental',
      modelIdentifier: 'GEMINI_3_1_FLASH_LITE',
      provider: 'google',
      inputTypes: expect.arrayContaining(['GEMINI_CHAT', 'GENERIC_VISION_COMPLETION']),
      performance: {
        cost: 'LOW',
        modelClass: 'LIGHTWEIGHT',
        speed: 'HIGH',
      },
      supportsResponses: false,
      supportsVision: true,
    });
  });

  it('exports a reverse RID lookup for known models', () => {
    expect(
      MODEL_CATALOG_BY_RID['ri.language-model-service..language-model.gpt-5-mini'],
    ).toMatchObject({
      displayName: 'GPT-5 mini',
      provider: 'openai',
    });
    expect(
      MODEL_CATALOG_BY_RID['ri.language-model-service..language-model.gemini-3-1-flash-lite'],
    ).toMatchObject({
      displayName: 'Gemini 3.1 Flash Lite (Preview)',
      provider: 'google',
    });
  });

  it('preserves raw RID passthrough while enriching known RIDs with metadata', () => {
    const rawRid = 'ri.language-model-service..language-model.gpt-5-2';

    expect(resolveModelTarget(rawRid)).toMatchObject({
      rid: rawRid,
      metadata: {
        rid: rawRid,
        provider: 'openai',
        modelIdentifier: 'GPT_5_2',
        displayName: 'GPT-5.2',
        inputTypes: expect.arrayContaining(['OPEN_AI_REASONING', 'OPEN_AI_RESPONSES']),
        performance: {
          cost: 'MEDIUM',
          modelClass: 'HEAVYWEIGHT',
          speed: 'MEDIUM',
        },
        supportsResponses: true,
        supportsVision: true,
        trainingCutoffDate: '2025-08-31T00:00:00Z',
        lifecycle: 'experimental',
      },
    });
  });

  it('passes through unknown raw RIDs without catalog metadata', () => {
    const rawRid = 'ri.language-model-service..language-model.unknown-new-model';

    expect(resolveModelTarget(rawRid)).toEqual({
      rid: rawRid,
      metadata: undefined,
    });
  });

  it('does not publish sunset aliases as known models', () => {
    expect(getModelMetadata('gpt-4o-mini')).toBeUndefined();
    expect(getModelMetadata('gemini-3-pro')).toBeUndefined();
  });

  it('throws a clear validation error for unknown aliases', () => {
    expect(() => resolveKnownModelMetadata('gpt-5-mni')).toThrowError(FoundryModelNotFoundError);
    expect(() => resolveKnownModelMetadata('gpt-5-mni')).toThrowError(
      /Check the catalog for supported aliases/,
    );
  });

  it('treats raw RIDs as unknown to the validating helpers', () => {
    expect(hasKnownModel('ri.language-model-service..language-model.gpt-5-2')).toBe(false);
    expect(() =>
      resolveKnownModelMetadata('ri.language-model-service..language-model.gpt-5-2'),
    ).toThrowError(FoundryModelNotFoundError);
  });
});

describe('config loading', () => {
  it('normalizes the foundry URL and omits empty optional values', () => {
    expect(
      loadFoundryConfig({
        FOUNDRY_URL: 'https://example.palantirfoundry.com///',
        FOUNDRY_TOKEN: 'token',
        FOUNDRY_ATTRIBUTION_RID: '   ',
      }),
    ).toEqual({
      foundryUrl: 'https://example.palantirfoundry.com',
      token: 'token',
      attributionRid: undefined,
    });
  });
});

describe('type surface', () => {
  it('accepts known aliases and raw RIDs', () => {
    const knownOpenAiAlias: KnownOpenAIModelId = 'gpt-5.4-mini';
    const openAiAlias: OpenAIModelId = 'gpt-5.4-mini';
    const openAiRid: OpenAIModelId = 'ri.language-model-service..language-model.gpt-5-2';
    const knownAnthropicAlias: KnownAnthropicModelId = 'claude-sonnet-4.6';
    const anthropicAlias: AnthropicModelId = 'claude-sonnet-4.6';
    const anthropicRid: AnthropicModelId =
      'ri.language-model-service..language-model.anthropic-claude-4-6-sonnet';
    const knownGoogleAlias: KnownGoogleModelId = 'gemini-3.1-flash-lite';
    const googleAlias: GoogleModelId = 'gemini-3.1-flash-lite';
    const googleRid: GoogleModelId =
      'ri.language-model-service..language-model.gemini-3-1-flash-lite';
    const knownModel: KnownModelId = 'gemini-3.1-flash-lite';

    expect(knownOpenAiAlias).toBe('gpt-5.4-mini');
    expect(openAiAlias).toBe('gpt-5.4-mini');
    expect(openAiRid).toBe('ri.language-model-service..language-model.gpt-5-2');
    expect(knownAnthropicAlias).toBe('claude-sonnet-4.6');
    expect(anthropicAlias).toBe('claude-sonnet-4.6');
    expect(anthropicRid).toBe(
      'ri.language-model-service..language-model.anthropic-claude-4-6-sonnet',
    );
    expect(knownGoogleAlias).toBe('gemini-3.1-flash-lite');
    expect(googleAlias).toBe('gemini-3.1-flash-lite');
    expect(googleRid).toBe('ri.language-model-service..language-model.gemini-3-1-flash-lite');
    expect(knownModel).toBe('gemini-3.1-flash-lite');
  });
});

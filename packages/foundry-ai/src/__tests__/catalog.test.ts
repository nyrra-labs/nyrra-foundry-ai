import { describe, expect, it } from 'vitest';
import { loadFoundryConfig } from '../config.js';
import { FoundryModelNotFoundError } from '../errors.js';
import {
  getModelMetadata,
  hasKnownModel,
  MODEL_CATALOG_BY_RID,
  resolveKnownModelMetadata,
  resolveModelProvider,
  resolveModelRid,
  resolveModelTarget,
} from '../models/catalog.js';
import type {
  AnthropicModelId,
  GoogleModelId,
  KnownAnthropicModelId,
  KnownGoogleModelId,
  KnownModelId,
  KnownOpenAIModelId,
  OpenAIModelId,
} from '../types.js';

describe('model catalog', () => {
  it('resolves metadata for known OpenAI models', () => {
    expect(resolveModelRid('gpt-5-mini')).toBe(
      'ri.language-model-service..language-model.gpt-5-mini',
    );
    expect(resolveModelProvider('gpt-5-mini')).toBe('openai');
    expect(getModelMetadata('gpt-5-mini')).toMatchObject({
      displayName: 'GPT-5 Mini',
      lifecycle: 'ga',
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
      provider: 'google',
      supportsResponses: false,
      supportsVision: true,
    });
  });

  it('exports a reverse RID lookup for known models', () => {
    expect(
      MODEL_CATALOG_BY_RID['ri.language-model-service..language-model.gpt-5-mini'],
    ).toMatchObject({
      displayName: 'GPT-5 Mini',
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

    expect(resolveModelTarget(rawRid)).toEqual({
      rid: rawRid,
      metadata: {
        rid: rawRid,
        provider: 'openai',
        displayName: 'GPT-5.2',
        supportsVision: true,
        supportsResponses: true,
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
    const knownOpenAiAlias: KnownOpenAIModelId = 'gpt-5-mini';
    const openAiAlias: OpenAIModelId = 'gpt-5-mini';
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

    expect(knownOpenAiAlias).toBe('gpt-5-mini');
    expect(openAiAlias).toBe('gpt-5-mini');
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

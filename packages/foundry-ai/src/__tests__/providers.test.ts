import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createTestLanguageModel } from './helpers/test-language-model.js';

const openaiResponsesMock = vi.hoisted(() => vi.fn());
const createOpenAIMock = vi.hoisted(() =>
  vi.fn(() => {
    const provider = ((modelId: string) => openaiResponsesMock(modelId)) as {
      (modelId: string): ReturnType<typeof openaiResponsesMock>;
      responses(modelId: string): ReturnType<typeof openaiResponsesMock>;
    };

    provider.responses = openaiResponsesMock;

    return provider;
  }),
);

const anthropicLanguageModelMock = vi.hoisted(() => vi.fn());
const createAnthropicMock = vi.hoisted(() =>
  vi.fn(() => {
    return ((modelId: string) => anthropicLanguageModelMock(modelId)) as (
      modelId: string,
    ) => ReturnType<typeof anthropicLanguageModelMock>;
  }),
);

vi.mock('@ai-sdk/openai', () => ({
  createOpenAI: createOpenAIMock,
}));

vi.mock('@ai-sdk/anthropic', () => ({
  createAnthropic: createAnthropicMock,
}));

import { createFoundryAnthropic } from '../providers/anthropic.js';
import { createFoundryOpenAI } from '../providers/openai.js';

describe('provider adapters', () => {
  const config = {
    foundryUrl: 'https://example.palantirfoundry.com/',
    token: 'token-123',
    attributionRid: 'ri.attribution.main',
  };

  beforeEach(() => {
    openaiResponsesMock.mockReset();
    anthropicLanguageModelMock.mockReset();

    openaiResponsesMock.mockImplementation((modelId: string) => {
      return createTestLanguageModel({
        provider: 'foundry-openai.responses',
        modelId,
      }).model;
    });

    anthropicLanguageModelMock.mockImplementation((modelId: string) => {
      return createTestLanguageModel({
        provider: 'foundry-anthropic',
        modelId,
      }).model;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('creates an OpenAI provider with the Foundry proxy base URL and attribution header', () => {
    createFoundryOpenAI(config);

    expect(createOpenAIMock).toHaveBeenCalledWith({
      apiKey: 'token-123',
      baseURL: 'https://example.palantirfoundry.com/api/v2/llm/proxy/openai/v1',
      headers: { attribution: 'ri.attribution.main' },
      name: 'foundry-openai',
    });
  });

  it('maps OpenAI aliases to RIDs and preserves raw RID passthrough', () => {
    const openai = createFoundryOpenAI(config);
    const rawRid = 'ri.language-model-service..language-model.gpt-5-2';

    const aliasModel = openai('gpt-5-mini');
    const rawModel = openai(rawRid);

    expect(openaiResponsesMock).toHaveBeenNthCalledWith(
      1,
      'ri.language-model-service..language-model.gpt-5-mini',
    );
    expect(openaiResponsesMock).toHaveBeenNthCalledWith(2, rawRid);
    expect(aliasModel.provider).toBe('foundry-openai');
    expect(aliasModel.modelId).toBe('gpt-5-mini');
    expect(rawModel.modelId).toBe(rawRid);
    expect(openai.specificationVersion).toBe('v3');
    expect(openai.languageModel).toBeTypeOf('function');
    expect(openai.responses).toBeTypeOf('function');
  });

  it('creates an Anthropic provider using authToken instead of apiKey', () => {
    createFoundryAnthropic(config);

    expect(createAnthropicMock).toHaveBeenCalledWith({
      authToken: 'token-123',
      baseURL: 'https://example.palantirfoundry.com/api/v2/llm/proxy/anthropic/v1',
      headers: { attribution: 'ri.attribution.main' },
      name: 'foundry-anthropic',
    });
  });

  it('maps Anthropic aliases to RIDs and preserves raw RID passthrough', () => {
    const anthropic = createFoundryAnthropic(config);
    const rawRid = 'ri.language-model-service..language-model.anthropic-claude-4-6-sonnet';

    const aliasModel = anthropic('claude-sonnet-4.6');
    const rawModel = anthropic(rawRid);

    expect(anthropicLanguageModelMock).toHaveBeenNthCalledWith(
      1,
      'ri.language-model-service..language-model.anthropic-claude-4-6-sonnet',
    );
    expect(anthropicLanguageModelMock).toHaveBeenNthCalledWith(2, rawRid);
    expect(aliasModel.provider).toBe('foundry-anthropic');
    expect(rawModel.modelId).toBe(rawRid);
    expect(anthropic.languageModel).toBeTypeOf('function');
    expect(anthropic.chat).toBeTypeOf('function');
    expect(anthropic.messages).toBeTypeOf('function');
  });
});

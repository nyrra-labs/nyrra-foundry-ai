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

  let openAIState: ReturnType<typeof createTestLanguageModel>['state'] | undefined;
  let anthropicState: ReturnType<typeof createTestLanguageModel>['state'] | undefined;

  beforeEach(() => {
    openaiResponsesMock.mockReset();
    anthropicLanguageModelMock.mockReset();

    openaiResponsesMock.mockImplementation((modelId: string) => {
      const testModel = createTestLanguageModel({
        provider: 'foundry-openai.responses',
        modelId,
      });

      openAIState = testModel.state;
      return testModel.model;
    });

    anthropicLanguageModelMock.mockImplementation((modelId: string) => {
      const testModel = createTestLanguageModel({
        provider: 'foundry-anthropic.messages',
        modelId,
      });

      anthropicState = testModel.state;
      return testModel.model;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('creates an OpenAI provider with the normalized Foundry proxy URL and attribution header', () => {
    createFoundryOpenAI({
      foundryUrl: ' https://example.palantirfoundry.com/// ',
      token: ' token-123 ',
      attributionRid: ' ri.attribution.main ',
    });

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

  it('adds only the OpenAI compatibility options required by the Foundry proxy', async () => {
    const openai = createFoundryOpenAI(config);

    await openai('gpt-5-mini').doGenerate({
      prompt: [],
      providerOptions: {
        custom: { traceId: 'trace-123' },
        openai: {
          reasoningEffort: 'high',
        },
      },
      tools: [
        {
          type: 'function',
          name: 'searchRegulations',
          description: 'Search the regulation corpus.',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string' },
            },
            required: ['query'],
          },
        },
      ],
    });

    expect(openAIState?.lastGenerateParams).toEqual({
      prompt: [],
      providerOptions: {
        custom: { traceId: 'trace-123' },
        openai: {
          forceReasoning: true,
          reasoningEffort: 'high',
          store: false,
        },
      },
      tools: [
        {
          type: 'function',
          name: 'searchRegulations',
          description: 'Search the regulation corpus.',
          strict: true,
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string' },
            },
            required: ['query'],
          },
        },
      ],
    });
  });

  it('preserves explicit OpenAI tool strict values', async () => {
    const openai = createFoundryOpenAI(config);

    await openai('gpt-5-mini').doGenerate({
      prompt: [],
      tools: [
        {
          type: 'function',
          name: 'keepStrictFalse',
          description: 'Keep strict false when the caller sets it.',
          inputSchema: { type: 'object', properties: {} },
          strict: false,
        },
        {
          type: 'function',
          name: 'keepStrictTrue',
          description: 'Keep strict true when the caller sets it.',
          inputSchema: { type: 'object', properties: {} },
          strict: true,
        },
      ],
    });

    expect(openAIState?.lastGenerateParams?.tools).toEqual([
      {
        type: 'function',
        name: 'keepStrictFalse',
        description: 'Keep strict false when the caller sets it.',
        inputSchema: { type: 'object', properties: {} },
        strict: false,
      },
      {
        type: 'function',
        name: 'keepStrictTrue',
        description: 'Keep strict true when the caller sets it.',
        inputSchema: { type: 'object', properties: {} },
        strict: true,
      },
    ]);
  });

  it('preserves an explicit OpenAI forceReasoning override', async () => {
    const openai = createFoundryOpenAI(config);

    await openai('gpt-5-mini').doGenerate({
      prompt: [],
      providerOptions: {
        openai: {
          forceReasoning: false,
        },
      },
    });

    expect(openAIState?.lastGenerateParams?.providerOptions).toEqual({
      openai: {
        forceReasoning: false,
        store: false,
      },
    });
  });

  it('fails early when a caller opts into OpenAI stored responses', async () => {
    const openai = createFoundryOpenAI(config);

    await expect(
      openai('gpt-5-mini').doGenerate({
        prompt: [],
        providerOptions: {
          openai: {
            store: true,
          },
        },
      }),
    ).rejects.toThrow(/providerOptions\.openai\.store=true/);
    expect(openAIState?.lastGenerateParams).toBeUndefined();
  });

  it('validates OpenAI config inputs at runtime', () => {
    expect(() =>
      createFoundryOpenAI({
        foundryUrl: '   ',
        token: 'token-123',
      }),
    ).toThrow(/config\.foundryUrl/);
    expect(() =>
      createFoundryOpenAI({
        foundryUrl: 'https://example.palantirfoundry.com',
        token: '   ',
      }),
    ).toThrow(/config\.token/);
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
    expect(aliasModel.modelId).toBe('claude-sonnet-4.6');
    expect(rawModel.modelId).toBe(rawRid);
    expect(anthropic.languageModel).toBeTypeOf('function');
    expect(anthropic.chat).toBeTypeOf('function');
    expect(anthropic.messages).toBeTypeOf('function');
  });

  it('preserves Anthropic provider options without adding wrapper-specific behavior', async () => {
    const anthropic = createFoundryAnthropic(config);

    await anthropic('claude-sonnet-4.6').doGenerate({
      prompt: [],
      providerOptions: {
        anthropic: {
          disableParallelToolUse: true,
          effort: 'low',
          sendReasoning: true,
          thinking: { type: 'enabled', budgetTokens: 512 },
          toolStreaming: true,
        },
      },
    });

    expect(anthropicState?.lastGenerateParams).toEqual({
      prompt: [],
      providerOptions: {
        anthropic: {
          disableParallelToolUse: true,
          effort: 'low',
          sendReasoning: true,
          thinking: { type: 'enabled', budgetTokens: 512 },
          toolStreaming: true,
        },
      },
    });
  });

  it('validates Anthropic config inputs at runtime', () => {
    expect(() =>
      createFoundryAnthropic({
        foundryUrl: 'https://example.palantirfoundry.com',
        token: '',
      }),
    ).toThrow(/config\.token/);
  });
});

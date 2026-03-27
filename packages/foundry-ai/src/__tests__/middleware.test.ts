import { describe, expect, it } from 'vitest';
import { wrapWithFoundryMiddleware } from '../middleware.js';
import { createTestLanguageModel } from './helpers/test-language-model.js';

describe('wrapWithFoundryMiddleware', () => {
  it('defaults strict tools and OpenAI provider options for reasoning models', async () => {
    const { model, state } = createTestLanguageModel({
      provider: 'foundry-openai.responses',
      modelId: 'ri.language-model-service..language-model.gpt-5-mini',
    });
    const wrapped = wrapWithFoundryMiddleware(model, {
      modelId: 'gpt-5-mini',
      providerId: 'foundry-openai',
      isReasoning: true,
    });

    await wrapped.doGenerate({
      prompt: [],
      providerOptions: {
        custom: { traceId: 'trace-123' },
        openai: {
          reasoningEffort: 'high',
          store: true,
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

    expect(state.lastGenerateParams).toMatchObject({
      providerOptions: {
        custom: { traceId: 'trace-123' },
        openai: {
          forceReasoning: true,
          reasoningEffort: 'high',
          store: false,
        },
      },
    });
    expect(state.lastGenerateParams?.tools).toMatchObject([
      {
        name: 'searchRegulations',
        strict: true,
        type: 'function',
      },
    ]);
    expect(wrapped.provider).toBe('foundry-openai');
    expect(wrapped.modelId).toBe('gpt-5-mini');
  });

  it('preserves explicit strict values for OpenAI tools', async () => {
    const { model, state } = createTestLanguageModel();
    const wrapped = wrapWithFoundryMiddleware(model, {
      modelId: 'gpt-4.1',
      providerId: 'foundry-openai',
      isReasoning: false,
    });

    await wrapped.doGenerate({
      prompt: [],
      tools: [
        {
          type: 'function',
          name: 'explicitStrictFalse',
          description: 'Keep strict false when the caller sets it.',
          inputSchema: { type: 'object', properties: {} },
          strict: false,
        },
        {
          type: 'function',
          name: 'explicitStrictTrue',
          description: 'Keep strict true when the caller sets it.',
          inputSchema: { type: 'object', properties: {} },
          strict: true,
        },
      ],
    });

    expect(state.lastGenerateParams?.tools).toMatchObject([
      { name: 'explicitStrictFalse', strict: false },
      { name: 'explicitStrictTrue', strict: true },
    ]);
  });

  it('does not inject strict or force reasoning for Anthropic models', async () => {
    const { model, state } = createTestLanguageModel({
      provider: 'foundry-anthropic',
      modelId: 'ri.language-model-service..language-model.anthropic-claude-4-6-sonnet',
    });
    const wrapped = wrapWithFoundryMiddleware(model, {
      modelId: 'claude-sonnet-4.6',
      providerId: 'foundry-anthropic',
      isReasoning: false,
    });

    await wrapped.doGenerate({
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
      tools: [
        {
          type: 'function',
          name: 'searchRegulations',
          description: 'Anthropic should keep tool payload unchanged.',
          inputSchema: { type: 'object', properties: {} },
        },
      ],
    });

    expect(state.lastGenerateParams?.providerOptions).toEqual({
      anthropic: {
        disableParallelToolUse: true,
        effort: 'low',
        sendReasoning: true,
        thinking: { type: 'enabled', budgetTokens: 512 },
        toolStreaming: true,
      },
    });
    expect(state.lastGenerateParams?.tools?.[0]).toMatchObject({
      name: 'searchRegulations',
      type: 'function',
    });
    expect(state.lastGenerateParams?.tools?.[0]).not.toHaveProperty('strict');
  });

  it('applies the same transforms to stream calls', async () => {
    const { model, state } = createTestLanguageModel();
    const wrapped = wrapWithFoundryMiddleware(model, {
      modelId: 'gpt-5',
      providerId: 'foundry-openai',
      isReasoning: true,
    });

    await wrapped.doStream({
      prompt: [],
      providerOptions: {
        openai: {
          store: true,
        },
      },
    });

    expect(state.lastStreamParams?.providerOptions).toEqual({
      openai: {
        forceReasoning: true,
        store: false,
      },
    });
  });
});

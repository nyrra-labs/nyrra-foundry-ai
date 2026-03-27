import type { AnthropicLanguageModelOptions } from '@ai-sdk/anthropic';
import type { OpenAILanguageModelResponsesOptions } from '@ai-sdk/openai';
import { generateText, Output, stepCountIs, streamText, tool } from 'ai';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { createFoundryAnthropic } from '../providers/anthropic.js';
import { createFoundryOpenAI } from '../providers/openai.js';
import { createFoundryRegistry } from '../registry.js';
import { loadLiveFoundryConfig } from './helpers/live-foundry.js';

const config = loadLiveFoundryConfig();
const openai = createFoundryOpenAI(config);
const anthropic = createFoundryAnthropic(config);
const registry = createFoundryRegistry(config);
const LIVE_OPENAI_SMOKE_MODEL = 'gpt-4.1-mini';
const LIVE_OPENAI_REASONING_MODEL = 'gpt-5-mini';
const LIVE_OPENAI_REASONING_RID = 'ri.language-model-service..language-model.gpt-5-mini';
const LIVE_ANTHROPIC_SMOKE_MODEL = 'claude-haiku-4.5';
const LIVE_ANTHROPIC_SMOKE_RID =
  'ri.language-model-service..language-model.anthropic-claude-4-5-haiku';
const LIVE_ANTHROPIC_OPTIONS_MODEL = 'claude-sonnet-4.6';
const LIVE_OPENAI_PROVIDER_OPTIONS = {
  openai: {
    reasoningEffort: 'low',
    textVerbosity: 'low',
  } satisfies OpenAILanguageModelResponsesOptions,
};
const LIVE_ANTHROPIC_REASONING_PROVIDER_OPTIONS = {
  anthropic: {
    effort: 'low',
    thinking: {
      type: 'enabled',
      budgetTokens: 1024,
    },
    sendReasoning: true,
  } satisfies AnthropicLanguageModelOptions,
};
const LIVE_ANTHROPIC_TOOL_PROVIDER_OPTIONS = {
  anthropic: {
    effort: 'low',
    thinking: {
      type: 'enabled',
      budgetTokens: 1024,
    },
    sendReasoning: true,
    toolStreaming: true,
    disableParallelToolUse: true,
  } satisfies AnthropicLanguageModelOptions,
};

const signalSchema = z.object({
  indication: z.string().min(1),
  mechanismOfAction: z.string().min(1),
  riskLevel: z.enum(['low', 'medium', 'high']),
  rationale: z.string().min(1),
});
const regulatorySignalTool = tool({
  description: 'Returns a deterministic regulatory status for testing tool loops.',
  inputSchema: z.object({
    topic: z.string().min(1),
  }),
  execute: async ({ topic }) => ({
    topic,
    status: 'verified',
  }),
});

describe.sequential('live Foundry integration', () => {
  it('generates text with the direct OpenAI adapter', async () => {
    const result = await generateText({
      model: openai(LIVE_OPENAI_SMOKE_MODEL),
      prompt: 'Reply with ACK and one short clause about Foundry adapters.',
      maxOutputTokens: 160,
    });

    expect(result.text).toMatch(/ack/i);
    expect(result.text.trim().length).toBeGreaterThan(10);
  });

  it('supports raw RID passthrough with the direct OpenAI adapter', async () => {
    const result = await generateText({
      model: openai(LIVE_OPENAI_REASONING_RID),
      prompt: 'Reply with READY and one short clause.',
      maxOutputTokens: 160,
      providerOptions: LIVE_OPENAI_PROVIDER_OPTIONS,
    });

    expect(result.text).toMatch(/ready/i);
  });

  it('streams text with the direct OpenAI adapter', async () => {
    const result = streamText({
      model: openai(LIVE_OPENAI_REASONING_MODEL),
      prompt: 'Write one short release note about stricter Foundry middleware defaults.',
      maxOutputTokens: 180,
      providerOptions: LIVE_OPENAI_PROVIDER_OPTIONS,
    });

    let text = '';

    for await (const chunk of result.textStream) {
      text += chunk;
    }

    expect(text.trim().length).toBeGreaterThan(20);
    expect(text.toLowerCase()).toContain('foundry');
  });

  it('generates structured output with the direct OpenAI adapter', async () => {
    const { output } = await generateText({
      model: openai(LIVE_OPENAI_REASONING_MODEL),
      output: Output.object({
        schema: signalSchema,
        name: 'clinical_signal',
        description: 'A concise clinical signal summary for regulated AI review workflows.',
      }),
      prompt:
        'Extract a concise clinical signal from the following statement: "The investigational therapy reduced relapse rates in a small phase 2 study, but liver enzyme elevations warrant close monitoring."',
      maxOutputTokens: 260,
      providerOptions: LIVE_OPENAI_PROVIDER_OPTIONS,
    });

    expect(output.indication.length).toBeGreaterThan(4);
    expect(output.mechanismOfAction.length).toBeGreaterThan(4);
    expect(output.rationale.length).toBeGreaterThan(20);
  });

  it('generates text with the direct Anthropic adapter', async () => {
    const result = await generateText({
      model: anthropic(LIVE_ANTHROPIC_SMOKE_MODEL),
      prompt: 'Reply with READY and one short clause about Foundry routing.',
      maxOutputTokens: 40,
    });

    expect(result.text).toMatch(/ready/i);
    expect(result.text.trim().length).toBeGreaterThan(10);
  });

  it('supports raw RID passthrough with the direct Anthropic adapter', async () => {
    const result = await generateText({
      model: anthropic(LIVE_ANTHROPIC_SMOKE_RID),
      prompt: 'Reply with ACK and one short clause.',
      maxOutputTokens: 30,
    });

    expect(result.text).toMatch(/ack/i);
  });

  it('streams text with the direct Anthropic adapter', async () => {
    const result = streamText({
      model: anthropic(LIVE_ANTHROPIC_SMOKE_MODEL),
      prompt: 'Write one short release note about typed Foundry model aliases.',
      maxOutputTokens: 60,
    });

    let text = '';

    for await (const chunk of result.textStream) {
      text += chunk;
    }

    expect(text.trim().length).toBeGreaterThan(20);
    expect(text.toLowerCase()).toContain('foundry');
  });

  it('generates structured output with the direct Anthropic adapter', async () => {
    const { output } = await generateText({
      model: anthropic(LIVE_ANTHROPIC_SMOKE_MODEL),
      output: Output.object({
        schema: signalSchema,
        name: 'clinical_signal',
        description: 'A concise clinical signal summary for regulated AI review workflows.',
      }),
      prompt:
        'Extract a concise clinical signal from the following statement: "The investigational therapy reduced relapse rates in a small phase 2 study, but liver enzyme elevations warrant close monitoring."',
      maxOutputTokens: 220,
    });

    expect(output.indication.length).toBeGreaterThan(4);
    expect(output.mechanismOfAction.length).toBeGreaterThan(4);
    expect(output.rationale.length).toBeGreaterThan(20);
  });

  it('supports OpenAI reasoning provider options during tool loops', async () => {
    const result = streamText({
      model: openai(LIVE_OPENAI_REASONING_MODEL),
      prompt:
        'Call the regulatorySignal tool exactly once, then answer with SIGNAL and the returned status in one short sentence.',
      maxOutputTokens: 160,
      providerOptions: LIVE_OPENAI_PROVIDER_OPTIONS,
      stopWhen: stepCountIs(3),
      tools: {
        regulatorySignal: regulatorySignalTool,
      },
    });

    let text = '';
    let sawToolCall = false;
    let sawToolResult = false;

    for await (const part of result.fullStream) {
      if (part.type === 'text-delta') {
        text += part.text;
      }

      if (part.type === 'tool-call') {
        sawToolCall = true;
      }

      if (part.type === 'tool-result') {
        sawToolResult = true;
      }
    }

    expect(sawToolCall).toBe(true);
    expect(sawToolResult).toBe(true);
    expect(text).toMatch(/signal/i);
    expect(text).toMatch(/verified/i);
  });

  it('supports Anthropic reasoning provider options on claude-sonnet-4.6', async () => {
    const result = streamText({
      model: anthropic(LIVE_ANTHROPIC_OPTIONS_MODEL),
      prompt: 'Reply with READY and one short clause about reasoning visibility.',
      maxOutputTokens: 60,
      providerOptions: LIVE_ANTHROPIC_REASONING_PROVIDER_OPTIONS,
    });

    let reasoningText = '';
    let text = '';

    for await (const part of result.fullStream) {
      if (part.type === 'reasoning-delta') {
        reasoningText += part.text;
      }

      if (part.type === 'text-delta') {
        text += part.text;
      }
    }

    expect(reasoningText.trim().length).toBeGreaterThan(0);
    expect(text).toMatch(/ready/i);
  });

  it('supports Anthropic reasoning and tool-streaming provider options', async () => {
    const result = streamText({
      model: anthropic(LIVE_ANTHROPIC_OPTIONS_MODEL),
      prompt:
        'Call the regulatorySignal tool exactly once, then answer with SIGNAL and the returned status in one short sentence.',
      maxOutputTokens: 160,
      providerOptions: LIVE_ANTHROPIC_TOOL_PROVIDER_OPTIONS,
      stopWhen: stepCountIs(3),
      tools: {
        regulatorySignal: regulatorySignalTool,
      },
    });

    let reasoningText = '';
    let text = '';
    let sawToolCall = false;
    let sawToolResult = false;

    for await (const part of result.fullStream) {
      if (part.type === 'reasoning-delta') {
        reasoningText += part.text;
      }

      if (part.type === 'text-delta') {
        text += part.text;
      }

      if (part.type === 'tool-call') {
        sawToolCall = true;
      }

      if (part.type === 'tool-result') {
        sawToolResult = true;
      }
    }

    expect(sawToolCall).toBe(true);
    expect(sawToolResult).toBe(true);
    expect(reasoningText.trim().length).toBeGreaterThan(0);
    expect(text).toMatch(/signal/i);
    expect(text).toMatch(/verified/i);
  });

  it('routes both providers through the registry against live Foundry', async () => {
    const openAiResult = await generateText({
      model: registry.languageModel(`openai:${LIVE_OPENAI_REASONING_MODEL}`),
      prompt: 'Reply with ACK and one short clause about registry routing.',
      maxOutputTokens: 160,
      providerOptions: LIVE_OPENAI_PROVIDER_OPTIONS,
    });

    const anthropicResult = await generateText({
      model: registry.languageModel(`anthropic:${LIVE_ANTHROPIC_SMOKE_MODEL}`),
      prompt: 'Reply with ANTHROPIC and one short clause.',
      maxOutputTokens: 30,
    });

    expect(openAiResult.text).toMatch(/ack/i);
    expect(anthropicResult.text).toMatch(/anthropic/i);
  });
});

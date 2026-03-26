import type { OpenAILanguageModelResponsesOptions } from '@ai-sdk/openai';
import { generateText, Output, streamText } from 'ai';
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
const LIVE_OPENAI_MODEL = 'gpt-5-mini';
const LIVE_OPENAI_RID = 'ri.language-model-service..language-model.gpt-5-mini';
const LIVE_ANTHROPIC_MODEL = 'claude-haiku-4.5';
const LIVE_ANTHROPIC_RID = 'ri.language-model-service..language-model.anthropic-claude-4-5-haiku';
const LIVE_OPENAI_PROVIDER_OPTIONS = {
  openai: {
    reasoningEffort: 'low',
    textVerbosity: 'low',
  } satisfies OpenAILanguageModelResponsesOptions,
};

const signalSchema = z.object({
  indication: z.string().min(1),
  mechanismOfAction: z.string().min(1),
  riskLevel: z.enum(['low', 'medium', 'high']),
  rationale: z.string().min(1),
});

describe.sequential('live Foundry integration', () => {
  it('generates text with the direct OpenAI adapter', async () => {
    const result = await generateText({
      model: openai(LIVE_OPENAI_MODEL),
      prompt: 'Reply with ACK and one short clause about Foundry adapters.',
      maxOutputTokens: 160,
      providerOptions: LIVE_OPENAI_PROVIDER_OPTIONS,
    });

    expect(result.text).toMatch(/ack/i);
    expect(result.text.trim().length).toBeGreaterThan(10);
  });

  it('supports raw RID passthrough with the direct OpenAI adapter', async () => {
    const result = await generateText({
      model: openai(LIVE_OPENAI_RID),
      prompt: 'Reply with READY and one short clause.',
      maxOutputTokens: 160,
      providerOptions: LIVE_OPENAI_PROVIDER_OPTIONS,
    });

    expect(result.text).toMatch(/ready/i);
  });

  it('streams text with the direct OpenAI adapter', async () => {
    const result = streamText({
      model: openai(LIVE_OPENAI_MODEL),
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
      model: openai(LIVE_OPENAI_MODEL),
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
      model: anthropic(LIVE_ANTHROPIC_MODEL),
      prompt: 'Reply with READY and one short clause about Foundry routing.',
      maxOutputTokens: 40,
    });

    expect(result.text).toMatch(/ready/i);
    expect(result.text.trim().length).toBeGreaterThan(10);
  });

  it('supports raw RID passthrough with the direct Anthropic adapter', async () => {
    const result = await generateText({
      model: anthropic(LIVE_ANTHROPIC_RID),
      prompt: 'Reply with ACK and one short clause.',
      maxOutputTokens: 30,
    });

    expect(result.text).toMatch(/ack/i);
  });

  it('streams text with the direct Anthropic adapter', async () => {
    const result = streamText({
      model: anthropic(LIVE_ANTHROPIC_MODEL),
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
      model: anthropic(LIVE_ANTHROPIC_MODEL),
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

  it('routes both providers through the registry against live Foundry', async () => {
    const openAiResult = await generateText({
      model: registry.languageModel(`openai:${LIVE_OPENAI_MODEL}`),
      prompt: 'Reply with ACK and one short clause about registry routing.',
      maxOutputTokens: 160,
      providerOptions: LIVE_OPENAI_PROVIDER_OPTIONS,
    });

    const anthropicResult = await generateText({
      model: registry.languageModel(`anthropic:${LIVE_ANTHROPIC_MODEL}`),
      prompt: 'Reply with ANTHROPIC and one short clause.',
      maxOutputTokens: 30,
    });

    expect(openAiResult.text).toMatch(/ack/i);
    expect(anthropicResult.text).toMatch(/anthropic/i);
  });
});

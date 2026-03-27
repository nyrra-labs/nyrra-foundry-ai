import type { AnthropicLanguageModelOptions } from '@ai-sdk/anthropic';
import type { OpenAILanguageModelResponsesOptions } from '@ai-sdk/openai';
import { webSearch } from '@exalabs/ai-sdk';
import { stepCountIs, streamText } from 'ai';
import { createExampleLanguageModel, requireEnv } from './shared.js';

requireEnv('EXA_API_KEY');

const { model, modelId, provider } = createExampleLanguageModel(undefined, {
  anthropicModel: 'claude-sonnet-4.6',
  googleModel: 'gemini-3.1-flash-lite',
  openaiModel: 'gpt-5-mini',
});
const prompt =
  'Find two recent FDA or EMA updates relevant to oncology drug development and summarize why each matters for a clinical strategy team.';
const system =
  'Use the web search tool when you need current information. Cite what you found in plain text.';
const tools = {
  webSearch: webSearch({
    category: 'news',
    contents: {
      livecrawl: 'preferred',
      summary: {
        query: 'What changed and why does it matter?',
      },
      text: {
        maxCharacters: 1500,
      },
    },
    numResults: 5,
    type: 'auto',
  }),
};
type ExampleProviderOptions = NonNullable<Parameters<typeof streamText>[0]['providerOptions']>;

const providerOptions: ExampleProviderOptions =
  provider === 'openai'
    ? {
        openai: {
          reasoningEffort: 'low',
          textVerbosity: 'low',
        } satisfies OpenAILanguageModelResponsesOptions,
      }
    : provider === 'anthropic'
      ? {
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
        }
      : {};

const result = streamText({
  model,
  prompt,
  system,
  stopWhen: stepCountIs(4),
  providerOptions,
  tools,
});

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);
console.log(JSON.stringify({ type: 'provider-options', providerOptions }));

let text = '';

for await (const part of result.fullStream) {
  if (part.type === 'text-delta') {
    text += part.text;
  }

  if (part.type === 'tool-error' || part.type === 'error') {
    console.error(part.error);
    throw part.error;
  }

  console.log(JSON.stringify(part));
}

const steps = await result.steps;
console.log(JSON.stringify({ type: 'final-text', text }));
console.log(JSON.stringify({ type: 'summary', steps: steps.length }));

import type { AnthropicLanguageModelOptions } from '@ai-sdk/anthropic';
import type { OpenAILanguageModelResponsesOptions } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createExampleLanguageModel } from './shared.js';

const { model, modelId, provider } = createExampleLanguageModel();
const prompt =
  'Write a short release note for a Foundry AI SDK that adds strict tool defaults and reasoning-model detection.';
type ExampleProviderOptions = NonNullable<Parameters<typeof streamText>[0]['providerOptions']>;

const providerOptions: ExampleProviderOptions =
  provider === 'openai'
    ? {
        openai: {
          reasoningEffort: 'low',
          textVerbosity: 'low',
        } satisfies OpenAILanguageModelResponsesOptions,
      }
    : {
        anthropic: {
          thinking: {
            type: 'enabled',
            budgetTokens: 1024,
          },
          sendReasoning: true,
        } satisfies AnthropicLanguageModelOptions,
      };
const result = streamText({
  model,
  prompt,
  providerOptions,
});

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);
console.log(JSON.stringify({ type: 'provider-options', providerOptions }));

let text = '';

for await (const part of result.fullStream) {
  if (part.type === 'text-delta') {
    text += part.text;
  }

  if (part.type === 'error') {
    console.error(part.error);
    throw part.error;
  }

  console.log(JSON.stringify(part));
}

console.log(JSON.stringify({ type: 'final-text', text }));

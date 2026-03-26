import type { OpenAILanguageModelResponsesOptions } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createExampleLanguageModel } from './shared.js';

const { model, modelId, provider } = createExampleLanguageModel();
const providerOptions =
  provider === 'openai'
    ? {
        openai: {
          reasoningEffort: 'low',
          textVerbosity: 'low',
        } satisfies OpenAILanguageModelResponsesOptions,
      }
    : undefined;

const result = streamText({
  model,
  prompt:
    'Write a short release note for a Foundry AI SDK that adds strict tool defaults and reasoning-model detection.',
  providerOptions,
});

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}

process.stdout.write('\n');

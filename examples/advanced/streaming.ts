import type { AnthropicLanguageModelOptions } from '@ai-sdk/anthropic';
import type { OpenAILanguageModelResponsesOptions } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { logExampleError, logExampleValue } from '../base/example-logger.js';
import { createExampleLanguageModel } from '../base/example-model.js';

const { model, modelId, provider } = createExampleLanguageModel();
const prompt =
  'Compare the tradeoffs of routing LLM calls through a corporate proxy versus calling provider APIs directly. Keep it to three bullet points.';
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
            thinking: {
              type: 'enabled',
              budgetTokens: 1024,
            },
            sendReasoning: true,
          } satisfies AnthropicLanguageModelOptions,
        }
      : {};

const result = streamText({
  model,
  prompt,
  providerOptions,
  onFinish({ text, finishReason, usage }) {
    logExampleValue({ type: 'finish', finishReason, usage });
    logExampleValue({ type: 'final-text', text });
  },
  onError({ error }) {
    logExampleError({ type: 'error', error });
    throw error;
  },
});

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);
logExampleValue({ type: 'provider-options', providerOptions });

// Stream text to stdout
for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}

import type { AnthropicLanguageModelOptions } from '@ai-sdk/anthropic';
import type { OpenAILanguageModelResponsesOptions } from '@ai-sdk/openai';
import type { streamText } from 'ai';
import type { ExampleProvider } from '../base/shared.js';

type ExampleProviderOptions = NonNullable<Parameters<typeof streamText>[0]['providerOptions']>;

export function createExaProviderOptions(
  provider: ExampleProvider,
  options?: {
    parallelToolUse?: boolean;
  },
): ExampleProviderOptions {
  if (provider === 'openai') {
    return {
      openai: {
        reasoningEffort: 'low',
        textVerbosity: 'low',
      } satisfies OpenAILanguageModelResponsesOptions,
    };
  }

  if (provider === 'anthropic') {
    return {
      anthropic: {
        effort: 'low',
        thinking: {
          type: 'enabled',
          budgetTokens: 1024,
        },
        sendReasoning: true,
        toolStreaming: true,
        disableParallelToolUse: options?.parallelToolUse === false ? true : undefined,
      } satisfies AnthropicLanguageModelOptions,
    };
  }

  return {};
}

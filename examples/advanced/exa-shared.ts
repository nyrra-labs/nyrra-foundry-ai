import process from 'node:process';
import type { AnthropicLanguageModelOptions } from '@ai-sdk/anthropic';
import { devToolsMiddleware } from '@ai-sdk/devtools';
import type { OpenAILanguageModelResponsesOptions } from '@ai-sdk/openai';
import { type LanguageModel, type streamText, wrapLanguageModel } from 'ai';
import type { ExampleProvider } from '../base/example-config.js';

type WrappableModel = Parameters<typeof wrapLanguageModel>[0]['model'];
type ExampleProviderOptions = NonNullable<Parameters<typeof streamText>[0]['providerOptions']>;

export function wrapWithDevTools(model: LanguageModel): WrappableModel {
  return wrapLanguageModel({
    model: model as WrappableModel,
    middleware: devToolsMiddleware(),
  });
}

export function logDevToolsHint() {
  const port = process.env.AI_SDK_DEVTOOLS_PORT ?? '4983';
  console.log(`\n  devtools: capturing to .devtools/generations.json`);
  console.log(`  viewer:   npx @ai-sdk/devtools → http://localhost:${port}\n`);
}

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

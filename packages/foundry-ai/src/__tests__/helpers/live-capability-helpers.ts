import type { OpenAILanguageModelResponsesOptions } from '@ai-sdk/openai';
import { tool } from 'ai';
import { z } from 'zod';
import { resolveModelRid } from '../../models/catalog.js';
import { isKnownOpenAIReasoningTarget } from '../../models/openai-models.js';
import type { LiveProvider } from './live-capabilities.js';

export type ProviderOptionMode =
  | 'baseline'
  | 'reasoning'
  | 'structured'
  | 'tools'
  | 'structured-tools';

export const signalSchema = z.object({
  indication: z.string().min(1),
  mechanismOfAction: z.string().min(1),
  riskLevel: z.enum(['low', 'medium', 'high']),
  rationale: z.string().min(1),
});

export const structuredToolSchema = z.object({
  status: z.string().min(1),
  summary: z.string().min(1),
});

export const regulatorySignalTool = tool({
  description: 'Returns a deterministic regulatory status for testing tool loops.',
  inputSchema: z.object({
    topic: z.string().min(1),
  }),
  execute: async ({ topic }) => ({
    status: 'verified',
    topic,
  }),
});

export function createGoogleProxyFetch(token: string): typeof fetch {
  return async (input, init) => {
    const request = new Request(input, init);
    const headers = new Headers(request.headers);

    headers.delete('x-goog-api-key');
    headers.set('Authorization', `Bearer ${token}`);

    return fetch(new Request(request, { headers }));
  };
}

export function getProviderOptions(
  provider: LiveProvider,
  mode: ProviderOptionMode,
  modelId?: string,
) {
  if (provider === 'openai') {
    return getOpenAIProviderOptions(mode, modelId);
  }

  if (provider === 'anthropic') {
    if (mode === 'reasoning') {
      return {
        anthropic: {
          effort: 'low',
          thinking: {
            type: 'enabled',
            budgetTokens: 1024,
          },
          sendReasoning: true,
        },
      };
    }

    if (mode === 'tools' || mode === 'structured-tools') {
      return {
        anthropic: {
          disableParallelToolUse: true,
          toolStreaming: true,
        },
      };
    }

    return undefined;
  }

  return undefined;
}

export function getReasoningExpectation(
  provider: LiveProvider,
  modelId: string,
  defaultModelId: string,
) {
  if (provider === 'google') {
    return 'investigate' as const;
  }

  if (modelId === defaultModelId) {
    return 'must-pass' as const;
  }

  return 'investigate' as const;
}

export function resolveModelIdForRidCheck(_provider: LiveProvider, modelId: string) {
  return resolveModelRid(modelId as never);
}

export function resolveVisionModelId(
  _provider: LiveProvider,
  modelId: string,
  defaultModelId: string,
  visionModelId?: string,
) {
  if (modelId === defaultModelId) {
    return visionModelId ?? modelId;
  }

  return modelId;
}

export async function collectStreamSummary(result: {
  finishReason?: PromiseLike<string> | string;
  fullStream: AsyncIterable<Record<string, unknown>>;
  output?: PromiseLike<unknown>;
  usage?: PromiseLike<unknown>;
  warnings?: PromiseLike<unknown>;
}) {
  const eventCounts: Record<string, number> = {};
  let reasoningText = '';
  let text = '';

  for await (const part of result.fullStream) {
    const type = typeof part.type === 'string' ? part.type : 'unknown';
    eventCounts[type] = (eventCounts[type] ?? 0) + 1;

    if (type === 'text-delta' && typeof part.text === 'string') {
      text += part.text;
    }

    if (type === 'reasoning-delta' && typeof part.text === 'string') {
      reasoningText += part.text;
    }
  }

  return {
    eventCounts,
    finishReason: await result.finishReason,
    output: result.output ? await result.output : undefined,
    reasoningText,
    text,
    usage: result.usage ? await result.usage : undefined,
    warnings: result.warnings ? await result.warnings : undefined,
  };
}

function getOpenAIProviderOptions(mode: ProviderOptionMode, modelId?: string) {
  const textVerbosity = requiresMediumOpenAITextVerbosity(modelId) ? 'medium' : 'low';
  const reasoningEffort = getOpenAIReasoningEffort(mode, modelId);
  const options: OpenAILanguageModelResponsesOptions = {
    textVerbosity,
  };

  if (reasoningEffort) {
    options.reasoningEffort = reasoningEffort;
  }

  if (mode === 'reasoning') {
    options.forceReasoning = true;
  }

  return {
    openai: options,
  };
}

function getOpenAIReasoningEffort(mode: ProviderOptionMode, modelId?: string) {
  if (modelId == null) {
    return mode === 'reasoning' ? 'low' : 'minimal';
  }

  if (supportsExplicitLowReasoningEffort(modelId)) {
    return 'low';
  }

  if (supportsMinimalReasoningEffort(modelId)) {
    return mode === 'reasoning' ? 'low' : 'minimal';
  }

  return undefined;
}

function requiresMediumOpenAITextVerbosity(modelId?: string) {
  if (modelId == null) {
    return false;
  }

  return [
    'gpt-4.1',
    'gpt-4.1-mini',
    'gpt-4.1-nano',
    'gpt-4o',
    'gpt-4o-mini',
    'gpt-5-codex',
    'gpt-5.1-codex',
    'gpt-5.1-codex-mini',
    'o3',
    'o4-mini',
  ].includes(modelId);
}

function supportsExplicitLowReasoningEffort(modelId: string) {
  return ['gpt-5.2', 'gpt-5.4', 'o3', 'o4-mini'].includes(modelId);
}

function supportsMinimalReasoningEffort(modelId: string) {
  return ['gpt-5', 'gpt-5-mini', 'gpt-5-nano'].includes(modelId);
}

export function shouldAssertOpenAIReasoning(modelId: string) {
  return isKnownOpenAIReasoningTarget(modelId);
}

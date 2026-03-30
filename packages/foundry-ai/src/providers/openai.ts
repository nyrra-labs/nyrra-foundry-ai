import { createOpenAI } from '@ai-sdk/openai';
import type { wrapLanguageModel } from 'ai';
import { NoSuchModelError } from 'ai';
import { resolveFoundryConfig } from '../config.js';
import { wrapFoundryLanguageModel } from '../middleware.js';
import { resolveModelTarget } from '../models/catalog.js';
import { isKnownOpenAIReasoningTarget, type OpenAIModelId } from '../models/openai-models.js';
import type { FoundryConfig } from '../types.js';

type FoundryLanguageModel = Parameters<typeof wrapLanguageModel>[0]['model'];
type FoundryCallOptions = Parameters<FoundryLanguageModel['doGenerate']>[0];
type FoundryFunctionTool = NonNullable<FoundryCallOptions['tools']>[number];

export interface FoundryOpenAIProvider {
  (modelId: OpenAIModelId): FoundryLanguageModel;
  specificationVersion: 'v3';
  languageModel(modelId: OpenAIModelId): FoundryLanguageModel;
  responses(modelId: OpenAIModelId): FoundryLanguageModel;
  embeddingModel(modelId: string): never;
  imageModel(modelId: string): never;
}

export function createFoundryOpenAI(config: FoundryConfig): FoundryOpenAIProvider {
  const providerId = 'foundry-openai';
  const resolvedConfig = resolveFoundryConfig(config, 'createFoundryOpenAI');
  const baseProvider = createOpenAI({
    apiKey: resolvedConfig.token,
    baseURL: `${resolvedConfig.foundryUrl}/api/v2/llm/proxy/openai/v1`,
    headers: resolvedConfig.attributionRid
      ? { attribution: resolvedConfig.attributionRid }
      : undefined,
    name: providerId,
  });

  const createLanguageModel = (modelId: OpenAIModelId): FoundryLanguageModel => {
    const resolvedModel = resolveModelTarget(modelId);
    const shouldForceReasoning =
      isKnownOpenAIReasoningTarget(modelId) || isKnownOpenAIReasoningTarget(resolvedModel.rid);

    return wrapFoundryLanguageModel(baseProvider.responses(resolvedModel.rid), {
      modelId,
      providerId,
      transformParams: (params) => applyOpenAICompat(params, shouldForceReasoning),
    });
  };

  function provider(modelId: OpenAIModelId): FoundryLanguageModel {
    return createLanguageModel(modelId);
  }

  const callableProvider = provider as FoundryOpenAIProvider;

  callableProvider.specificationVersion = 'v3';
  callableProvider.languageModel = createLanguageModel;
  callableProvider.responses = createLanguageModel;
  callableProvider.embeddingModel = (modelId: string) => {
    throw new NoSuchModelError({ modelId, modelType: 'embeddingModel' });
  };
  callableProvider.imageModel = (modelId: string) => {
    throw new NoSuchModelError({ modelId, modelType: 'imageModel' });
  };

  return callableProvider;
}

function applyOpenAICompat(
  params: FoundryCallOptions,
  shouldForceReasoning: boolean,
): FoundryCallOptions {
  const openaiOptions = asRecord(params.providerOptions?.openai);

  if (openaiOptions.store === true) {
    throw new Error(
      'Foundry OpenAI does not support providerOptions.openai.store=true. Remove the store option or set it to false.',
    );
  }

  return {
    ...params,
    providerOptions: {
      ...(params.providerOptions ?? {}),
      openai: {
        ...openaiOptions,
        ...(openaiOptions.forceReasoning == null && shouldForceReasoning
          ? { forceReasoning: true }
          : {}),
        store: false,
      },
    },
    ...(params.tools != null ? { tools: params.tools.map(applyOpenAIFunctionToolCompat) } : {}),
  };
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function applyOpenAIFunctionToolCompat(tool: FoundryFunctionTool): FoundryFunctionTool {
  if (tool.type !== 'function' || tool.strict != null) {
    return tool;
  }

  return {
    ...tool,
    strict: true,
  };
}

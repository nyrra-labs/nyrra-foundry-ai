import { createOpenAI } from '@ai-sdk/openai';
import type { wrapLanguageModel } from 'ai';
import { NoSuchModelError } from 'ai';
import { normalizeFoundryUrl } from '../config.js';
import { wrapWithFoundryMiddleware } from '../middleware.js';
import { resolveModelTarget } from '../models/catalog.js';
import type { FoundryConfig, OpenAIModelId } from '../types.js';

type FoundryLanguageModel = Parameters<typeof wrapLanguageModel>[0]['model'];

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
  const baseProvider = createOpenAI({
    apiKey: config.token,
    baseURL: `${normalizeFoundryUrl(config.foundryUrl)}/api/v2/llm/proxy/openai/v1`,
    headers: config.attributionRid ? { attribution: config.attributionRid } : undefined,
    name: providerId,
  });

  const createLanguageModel = (modelId: OpenAIModelId): FoundryLanguageModel => {
    const resolvedModel = resolveModelTarget(modelId);

    return wrapWithFoundryMiddleware(baseProvider.responses(resolvedModel.rid), {
      modelId,
      providerId,
      isReasoning: resolvedModel.metadata?.isReasoning ?? false,
    });
  };

  function provider(modelId: OpenAIModelId): FoundryLanguageModel {
    if (new.target) {
      throw new Error('The Foundry OpenAI model function cannot be called with the new keyword.');
    }

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

import { createAnthropic } from '@ai-sdk/anthropic';
import type { wrapLanguageModel } from 'ai';
import { NoSuchModelError } from 'ai';
import { resolveFoundryConfig } from '../config.js';
import { wrapFoundryLanguageModel } from '../middleware.js';
import { resolveModelTarget } from '../models/catalog.js';
import type { AnthropicModelId, FoundryConfig } from '../types.js';

type FoundryLanguageModel = Parameters<typeof wrapLanguageModel>[0]['model'];

export interface FoundryAnthropicProvider {
  (modelId: AnthropicModelId): FoundryLanguageModel;
  specificationVersion: 'v3';
  languageModel(modelId: AnthropicModelId): FoundryLanguageModel;
  chat(modelId: AnthropicModelId): FoundryLanguageModel;
  messages(modelId: AnthropicModelId): FoundryLanguageModel;
  embeddingModel(modelId: string): never;
  imageModel(modelId: string): never;
}

export function createFoundryAnthropic(config: FoundryConfig): FoundryAnthropicProvider {
  const providerId = 'foundry-anthropic';
  const resolvedConfig = resolveFoundryConfig(config, 'createFoundryAnthropic');
  const baseProvider = createAnthropic({
    authToken: resolvedConfig.token,
    baseURL: `${resolvedConfig.foundryUrl}/api/v2/llm/proxy/anthropic/v1`,
    headers: resolvedConfig.attributionRid
      ? { attribution: resolvedConfig.attributionRid }
      : undefined,
    name: providerId,
  });

  const createLanguageModel = (modelId: AnthropicModelId): FoundryLanguageModel => {
    const resolvedModel = resolveModelTarget(modelId);

    return wrapFoundryLanguageModel(baseProvider(resolvedModel.rid), {
      modelId,
      providerId,
    });
  };

  function provider(modelId: AnthropicModelId): FoundryLanguageModel {
    return createLanguageModel(modelId);
  }

  const callableProvider = provider as FoundryAnthropicProvider;

  callableProvider.specificationVersion = 'v3';
  callableProvider.languageModel = createLanguageModel;
  callableProvider.chat = createLanguageModel;
  callableProvider.messages = createLanguageModel;
  callableProvider.embeddingModel = (modelId: string) => {
    throw new NoSuchModelError({ modelId, modelType: 'embeddingModel' });
  };
  callableProvider.imageModel = (modelId: string) => {
    throw new NoSuchModelError({ modelId, modelType: 'imageModel' });
  };

  return callableProvider;
}

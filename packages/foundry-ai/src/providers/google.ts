import { createGoogleGenerativeAI } from '@ai-sdk/google';
import type { wrapLanguageModel } from 'ai';
import { NoSuchModelError } from 'ai';
import { resolveFoundryConfig } from '../config.js';
import { wrapFoundryLanguageModel } from '../middleware.js';
import { resolveModelTarget } from '../models/catalog.js';
import type { FoundryConfig, GoogleModelId } from '../types.js';

type FoundryLanguageModel = Parameters<typeof wrapLanguageModel>[0]['model'];

export interface FoundryGoogleProvider {
  (modelId: GoogleModelId): FoundryLanguageModel;
  specificationVersion: 'v3';
  languageModel(modelId: GoogleModelId): FoundryLanguageModel;
  chat(modelId: GoogleModelId): FoundryLanguageModel;
  generativeAI(modelId: GoogleModelId): FoundryLanguageModel;
  embeddingModel(modelId: string): never;
  imageModel(modelId: string): never;
}

export function createFoundryGoogle(config: FoundryConfig): FoundryGoogleProvider {
  const providerId = 'foundry-google';
  const resolvedConfig = resolveFoundryConfig(config, 'createFoundryGoogle');
  const baseProvider = createGoogleGenerativeAI({
    apiKey: resolvedConfig.token,
    baseURL: `${resolvedConfig.foundryUrl}/api/v2/llm/proxy/google/v1`,
    fetch: createGoogleProxyFetch(resolvedConfig.token),
    headers: resolvedConfig.attributionRid
      ? { attribution: resolvedConfig.attributionRid }
      : undefined,
    name: providerId,
  });

  const createLanguageModel = (modelId: GoogleModelId): FoundryLanguageModel => {
    const resolvedModel = resolveModelTarget(modelId);

    return wrapFoundryLanguageModel(baseProvider.chat(resolvedModel.rid), {
      modelId,
      providerId,
    });
  };

  function provider(modelId: GoogleModelId): FoundryLanguageModel {
    return createLanguageModel(modelId);
  }

  const callableProvider = provider as FoundryGoogleProvider;

  callableProvider.specificationVersion = 'v3';
  callableProvider.languageModel = createLanguageModel;
  callableProvider.chat = createLanguageModel;
  callableProvider.generativeAI = createLanguageModel;
  callableProvider.embeddingModel = (modelId: string) => {
    throw new NoSuchModelError({ modelId, modelType: 'embeddingModel' });
  };
  callableProvider.imageModel = (modelId: string) => {
    throw new NoSuchModelError({ modelId, modelType: 'imageModel' });
  };

  return callableProvider;
}

function createGoogleProxyFetch(token: string): typeof fetch {
  return async (input, init) => {
    const request = new Request(input, init);
    const headers = new Headers(request.headers);

    headers.delete('x-goog-api-key');
    headers.set('Authorization', `Bearer ${token}`);

    return fetch(new Request(request, { headers }));
  };
}

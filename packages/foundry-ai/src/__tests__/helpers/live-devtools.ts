import process from 'node:process';
import { devToolsMiddleware } from '@ai-sdk/devtools';
import { wrapLanguageModel } from 'ai';

type FoundryLanguageModel = Parameters<typeof wrapLanguageModel>[0]['model'];

export const LIVE_USE_DEVTOOLS_ENV = 'LIVE_USE_DEVTOOLS';

export function isLiveDevToolsEnabled() {
  const value = process.env[LIVE_USE_DEVTOOLS_ENV]?.trim().toLowerCase();

  return value === '1' || value === 'true' || value === 'yes';
}

export function wrapLiveModelWithDevTools(options: {
  model: FoundryLanguageModel;
  modelId: string;
  providerId: string;
}): FoundryLanguageModel {
  if (!isLiveDevToolsEnabled()) {
    return options.model;
  }

  return wrapLanguageModel({
    model: options.model,
    middleware: devToolsMiddleware(),
    modelId: options.modelId,
    providerId: options.providerId,
  });
}

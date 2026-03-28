import type { KnownGoogleModelId, ModelLifecycle, ModelMetadata } from '../types.js';

function createGoogleModel(
  rid: string,
  displayName: string,
  lifecycle: ModelLifecycle,
): ModelMetadata {
  return {
    rid,
    provider: 'google',
    displayName,
    supportsVision: true,
    supportsResponses: false,
    lifecycle,
  };
}

export const GOOGLE_MODELS = {
  'gemini-2.5-pro': createGoogleModel(
    'ri.language-model-service..language-model.gemini-2-5-pro',
    'Gemini 2.5 Pro',
    'ga',
  ),
  'gemini-2.5-flash': createGoogleModel(
    'ri.language-model-service..language-model.gemini-2-5-flash',
    'Gemini 2.5 Flash',
    'ga',
  ),
  'gemini-2.5-flash-lite': createGoogleModel(
    'ri.language-model-service..language-model.gemini-2-5-flash-lite',
    'Gemini 2.5 Flash Lite',
    'ga',
  ),
  'gemini-3-pro': createGoogleModel(
    'ri.language-model-service..language-model.gemini-3-pro',
    'Gemini 3 Pro (Preview)',
    'sunset',
  ),
  'gemini-3-flash': createGoogleModel(
    'ri.language-model-service..language-model.gemini-3-flash',
    'Gemini 3 Flash (Preview)',
    'ga',
  ),
  'gemini-3.1-pro': createGoogleModel(
    'ri.language-model-service..language-model.gemini-3-1-pro',
    'Gemini 3.1 Pro (Preview)',
    'ga',
  ),
  'gemini-3.1-flash-lite': createGoogleModel(
    'ri.language-model-service..language-model.gemini-3-1-flash-lite',
    'Gemini 3.1 Flash Lite (Preview)',
    'experimental',
  ),
} as const satisfies Record<KnownGoogleModelId, ModelMetadata>;

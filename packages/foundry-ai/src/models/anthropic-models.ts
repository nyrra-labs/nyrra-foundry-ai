import type { KnownAnthropicModelId, ModelClass, ModelLifecycle, ModelMetadata } from '../types.js';

function createAnthropicModel(
  rid: string,
  displayName: string,
  modelClass: ModelClass,
  lifecycle: ModelLifecycle,
): ModelMetadata {
  return {
    rid,
    provider: 'anthropic',
    displayName,
    modelClass,
    isReasoning: false,
    supportsVision: true,
    supportsResponses: false,
    lifecycle,
  };
}

export const ANTHROPIC_MODELS = {
  'claude-3.5-haiku': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-3-5-haiku',
    'Claude 3.5 Haiku',
    'lightweight',
    'ga',
  ),
  'claude-3.7-sonnet': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-3-7-sonnet',
    'Claude 3.7 Sonnet',
    'heavyweight',
    'ga',
  ),
  'claude-haiku-4.5': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-5-haiku',
    'Claude Haiku 4.5',
    'lightweight',
    'ga',
  ),
  'claude-opus-4': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-opus',
    'Claude Opus 4',
    'heavyweight',
    'ga',
  ),
  'claude-opus-4.1': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-1-opus',
    'Claude Opus 4.1',
    'heavyweight',
    'ga',
  ),
  'claude-opus-4.5': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-5-opus',
    'Claude Opus 4.5',
    'heavyweight',
    'ga',
  ),
  'claude-opus-4.6': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-6-opus',
    'Claude Opus 4.6',
    'heavyweight',
    'ga',
  ),
  'claude-sonnet-4': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-sonnet',
    'Claude Sonnet 4',
    'heavyweight',
    'ga',
  ),
  'claude-sonnet-4.5': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-5-sonnet',
    'Claude Sonnet 4.5',
    'heavyweight',
    'ga',
  ),
  'claude-sonnet-4.6': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-6-sonnet',
    'Claude Sonnet 4.6',
    'heavyweight',
    'ga',
  ),
} as const satisfies Record<KnownAnthropicModelId, ModelMetadata>;

export const ANTHROPIC_MODEL_IDS = Object.keys(ANTHROPIC_MODELS) as KnownAnthropicModelId[];

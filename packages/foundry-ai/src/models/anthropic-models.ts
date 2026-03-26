import type { KnownAnthropicModelId, ModelLifecycle, ModelMetadata } from '../types.js';

function createAnthropicModel(
  rid: string,
  displayName: string,
  lifecycle: ModelLifecycle,
): ModelMetadata {
  return {
    rid,
    provider: 'anthropic',
    displayName,
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
    'ga',
  ),
  'claude-3.7-sonnet': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-3-7-sonnet',
    'Claude 3.7 Sonnet',
    'ga',
  ),
  'claude-haiku-4.5': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-5-haiku',
    'Claude Haiku 4.5',
    'ga',
  ),
  'claude-opus-4': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-opus',
    'Claude Opus 4',
    'ga',
  ),
  'claude-opus-4.1': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-1-opus',
    'Claude Opus 4.1',
    'ga',
  ),
  'claude-opus-4.5': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-5-opus',
    'Claude Opus 4.5',
    'ga',
  ),
  'claude-opus-4.6': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-6-opus',
    'Claude Opus 4.6',
    'ga',
  ),
  'claude-sonnet-4': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-sonnet',
    'Claude Sonnet 4',
    'ga',
  ),
  'claude-sonnet-4.5': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-5-sonnet',
    'Claude Sonnet 4.5',
    'ga',
  ),
  'claude-sonnet-4.6': createAnthropicModel(
    'ri.language-model-service..language-model.anthropic-claude-4-6-sonnet',
    'Claude Sonnet 4.6',
    'ga',
  ),
} as const satisfies Record<KnownAnthropicModelId, ModelMetadata>;

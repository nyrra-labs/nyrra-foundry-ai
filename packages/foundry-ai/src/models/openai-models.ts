import type { KnownOpenAIModelId, ModelLifecycle, ModelMetadata } from '../types.js';

function createOpenAIModel(
  rid: string,
  displayName: string,
  {
    isReasoning,
    lifecycle,
    supportsVision = true,
  }: {
    isReasoning: boolean;
    lifecycle: ModelLifecycle;
    supportsVision?: boolean;
  },
): ModelMetadata {
  return {
    rid,
    provider: 'openai',
    displayName,
    isReasoning,
    supportsVision,
    supportsResponses: true,
    lifecycle,
  };
}

export const OPENAI_MODELS = {
  'gpt-4.1': createOpenAIModel('ri.language-model-service..language-model.gpt-4-1', 'GPT-4.1', {
    isReasoning: false,
    lifecycle: 'ga',
  }),
  'gpt-4.1-mini': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-4-1-mini',
    'GPT-4.1 Mini',
    { isReasoning: false, lifecycle: 'ga' },
  ),
  'gpt-4.1-nano': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-4-1-nano',
    'GPT-4.1 Nano',
    { isReasoning: false, lifecycle: 'ga' },
  ),
  'gpt-4o': createOpenAIModel('ri.language-model-service..language-model.gpt-4-o', 'GPT-4o', {
    isReasoning: false,
    lifecycle: 'ga',
  }),
  'gpt-4o-mini': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-4-o-mini',
    'GPT-4o Mini',
    { isReasoning: false, lifecycle: 'ga' },
  ),
  'gpt-5': createOpenAIModel('ri.language-model-service..language-model.gpt-5', 'GPT-5', {
    isReasoning: true,
    lifecycle: 'ga',
  }),
  'gpt-5-codex': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-5-codex',
    'GPT-5 Codex',
    { isReasoning: false, lifecycle: 'ga', supportsVision: false },
  ),
  'gpt-5-mini': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-5-mini',
    'GPT-5 Mini',
    { isReasoning: true, lifecycle: 'ga' },
  ),
  'gpt-5-nano': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-5-nano',
    'GPT-5 Nano',
    { isReasoning: true, lifecycle: 'ga' },
  ),
  'gpt-5.1': createOpenAIModel('ri.language-model-service..language-model.gpt-5-1', 'GPT-5.1', {
    isReasoning: false,
    lifecycle: 'ga',
  }),
  'gpt-5.1-codex': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-5-1-codex',
    'GPT-5.1 Codex',
    { isReasoning: false, lifecycle: 'ga', supportsVision: false },
  ),
  'gpt-5.1-codex-mini': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-5-1-codex-mini',
    'GPT-5.1 Codex Mini',
    { isReasoning: false, lifecycle: 'ga', supportsVision: false },
  ),
  'gpt-5.2': createOpenAIModel('ri.language-model-service..language-model.gpt-5-2', 'GPT-5.2', {
    isReasoning: true,
    lifecycle: 'experimental',
  }),
  'gpt-5.4': createOpenAIModel('ri.language-model-service..language-model.gpt-5-4', 'GPT-5.4', {
    isReasoning: true,
    lifecycle: 'experimental',
  }),
  o3: createOpenAIModel('ri.language-model-service..language-model.o-3', 'o3', {
    isReasoning: true,
    lifecycle: 'ga',
  }),
  'o4-mini': createOpenAIModel('ri.language-model-service..language-model.o-4-mini', 'o4 Mini', {
    isReasoning: true,
    lifecycle: 'ga',
  }),
} as const satisfies Record<KnownOpenAIModelId, ModelMetadata>;

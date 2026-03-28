import type { KnownOpenAIModelId, ModelLifecycle, ModelMetadata } from '../types.js';

function createOpenAIModel(
  rid: string,
  displayName: string,
  {
    lifecycle,
    supportsVision = true,
  }: {
    lifecycle: ModelLifecycle;
    supportsVision?: boolean;
  },
): ModelMetadata {
  return {
    rid,
    provider: 'openai',
    displayName,
    supportsVision,
    supportsResponses: true,
    lifecycle,
  };
}

export const OPENAI_MODELS = {
  'gpt-4.1': createOpenAIModel('ri.language-model-service..language-model.gpt-4-1', 'GPT-4.1', {
    lifecycle: 'ga',
  }),
  'gpt-4.1-mini': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-4-1-mini',
    'GPT-4.1 Mini',
    { lifecycle: 'ga' },
  ),
  'gpt-4.1-nano': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-4-1-nano',
    'GPT-4.1 Nano',
    { lifecycle: 'ga' },
  ),
  'gpt-4o': createOpenAIModel('ri.language-model-service..language-model.gpt-4-o', 'GPT-4o', {
    lifecycle: 'ga',
  }),
  'gpt-4o-mini': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-4-o-mini',
    'GPT-4o Mini',
    { lifecycle: 'sunset' },
  ),
  'gpt-5': createOpenAIModel('ri.language-model-service..language-model.gpt-5', 'GPT-5', {
    lifecycle: 'ga',
  }),
  'gpt-5-codex': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-5-codex',
    'GPT-5 Codex',
    { lifecycle: 'ga', supportsVision: false },
  ),
  'gpt-5-mini': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-5-mini',
    'GPT-5 Mini',
    { lifecycle: 'ga' },
  ),
  'gpt-5-nano': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-5-nano',
    'GPT-5 Nano',
    { lifecycle: 'ga' },
  ),
  'gpt-5.1': createOpenAIModel('ri.language-model-service..language-model.gpt-5-1', 'GPT-5.1', {
    lifecycle: 'ga',
  }),
  'gpt-5.1-codex': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-5-1-codex',
    'GPT-5.1 Codex',
    { lifecycle: 'ga', supportsVision: false },
  ),
  'gpt-5.1-codex-mini': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-5-1-codex-mini',
    'GPT-5.1 Codex Mini',
    { lifecycle: 'ga', supportsVision: false },
  ),
  'gpt-5.2': createOpenAIModel('ri.language-model-service..language-model.gpt-5-2', 'GPT-5.2', {
    lifecycle: 'experimental',
  }),
  'gpt-5.4': createOpenAIModel('ri.language-model-service..language-model.gpt-5-4', 'GPT-5.4', {
    lifecycle: 'experimental',
  }),
  'gpt-5.4-mini': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-5-4-mini',
    'GPT-5.4 Mini',
    { lifecycle: 'experimental' },
  ),
  'gpt-5.4-nano': createOpenAIModel(
    'ri.language-model-service..language-model.gpt-5-4-nano',
    'GPT-5.4 Nano',
    { lifecycle: 'experimental' },
  ),
  o3: createOpenAIModel('ri.language-model-service..language-model.o-3', 'o3', { lifecycle: 'ga' }),
  'o4-mini': createOpenAIModel('ri.language-model-service..language-model.o-4-mini', 'o4 Mini', {
    lifecycle: 'ga',
  }),
} as const satisfies Record<KnownOpenAIModelId, ModelMetadata>;

const OPENAI_REASONING_MODEL_IDS = new Set<KnownOpenAIModelId>([
  'gpt-5',
  'gpt-5-mini',
  'gpt-5-nano',
  'gpt-5.2',
  'gpt-5.4',
  'gpt-5.4-mini',
  'gpt-5.4-nano',
  'o3',
  'o4-mini',
]);

const OPENAI_REASONING_MODEL_TARGETS = new Set<string>([
  ...OPENAI_REASONING_MODEL_IDS,
  ...Object.entries(OPENAI_MODELS)
    .filter(([modelId]) => OPENAI_REASONING_MODEL_IDS.has(modelId as KnownOpenAIModelId))
    .map(([, metadata]) => metadata.rid),
]);

export function isKnownOpenAIReasoningTarget(modelId: string): boolean {
  return OPENAI_REASONING_MODEL_TARGETS.has(modelId);
}

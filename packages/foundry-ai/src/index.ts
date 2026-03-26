export { loadFoundryConfig, normalizeFoundryUrl } from './config.js';
export { describeError, FoundryModelNotFoundError } from './errors.js';
export { wrapWithFoundryMiddleware } from './middleware.js';
export {
  ANTHROPIC_MODEL_IDS,
  ANTHROPIC_MODELS,
} from './models/anthropic-models.js';
export {
  findClosestModelNames,
  getModelMetadata,
  hasKnownModel,
  MODEL_CATALOG,
  MODEL_IDS,
  resolveKnownModelMetadata,
  resolveModelProvider,
  resolveModelRid,
  resolveModelTarget,
} from './models/catalog.js';
export {
  OPENAI_MODEL_IDS,
  OPENAI_MODELS,
  OPENAI_REASONING_MODELS,
} from './models/openai-models.js';
export type {
  AnthropicModelId,
  FoundryConfig,
  FoundryModelId,
  ModelClass,
  ModelLifecycle,
  ModelMetadata,
  ModelProvider,
  OpenAIModelId,
  ResolvedModelTarget,
} from './types.js';

export interface FoundryConfig {
  foundryUrl: string;
  token: string;
  attributionRid?: string;
}

export const OPENAI_MODEL_IDS = [
  'gpt-4.1',
  'gpt-4.1-mini',
  'gpt-4.1-nano',
  'gpt-4o',
  'gpt-4o-mini',
  'gpt-5',
  'gpt-5-codex',
  'gpt-5-mini',
  'gpt-5-nano',
  'gpt-5.1',
  'gpt-5.1-codex',
  'gpt-5.1-codex-mini',
  'gpt-5.2',
  'gpt-5.4',
  'o3',
  'o4-mini',
] as const;

export type KnownOpenAIModelId = (typeof OPENAI_MODEL_IDS)[number];

export type OpenAIModelId = KnownOpenAIModelId | (string & {});

export const ANTHROPIC_MODEL_IDS = [
  'claude-3.5-haiku',
  'claude-3.7-sonnet',
  'claude-haiku-4.5',
  'claude-opus-4',
  'claude-opus-4.1',
  'claude-opus-4.5',
  'claude-opus-4.6',
  'claude-sonnet-4',
  'claude-sonnet-4.5',
  'claude-sonnet-4.6',
] as const;

export type KnownAnthropicModelId = (typeof ANTHROPIC_MODEL_IDS)[number];

export type AnthropicModelId = KnownAnthropicModelId | (string & {});

export const KNOWN_MODEL_IDS = [...OPENAI_MODEL_IDS, ...ANTHROPIC_MODEL_IDS] as const;

export type KnownModelId = (typeof KNOWN_MODEL_IDS)[number];
export type FoundryModelId = OpenAIModelId | AnthropicModelId;

export type ModelProvider = 'openai' | 'anthropic';
export type ModelClass = 'heavyweight' | 'lightweight' | 'reasoning' | 'codex';
export type ModelLifecycle = 'ga' | 'experimental' | 'deprecated';

export interface ModelMetadata {
  rid: string;
  provider: ModelProvider;
  displayName: string;
  modelClass: ModelClass;
  isReasoning: boolean;
  supportsVision: boolean;
  supportsResponses: boolean;
  lifecycle: ModelLifecycle;
}

export interface ResolvedModelTarget {
  rid: string;
  metadata?: ModelMetadata;
}

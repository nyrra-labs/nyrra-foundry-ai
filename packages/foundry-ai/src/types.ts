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

export const GOOGLE_MODEL_IDS = [
  'gemini-2.5-pro',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-3-pro',
  'gemini-3-flash',
  'gemini-3.1-pro',
  'gemini-3.1-flash-lite',
] as const;

export type KnownGoogleModelId = (typeof GOOGLE_MODEL_IDS)[number];

export type GoogleModelId = KnownGoogleModelId | (string & {});

export type KnownModelId = KnownOpenAIModelId | KnownAnthropicModelId | KnownGoogleModelId;

export type ModelProvider = 'openai' | 'anthropic' | 'google';
export type ModelLifecycle = 'ga' | 'experimental' | 'sunset' | 'deprecated';

export interface ModelMetadata {
  rid: string;
  provider: ModelProvider;
  displayName: string;
  supportsVision: boolean;
  supportsResponses: boolean;
  lifecycle: ModelLifecycle;
}

export interface ResolvedModelTarget {
  rid: string;
  metadata?: ModelMetadata;
}

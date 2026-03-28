import { resolve } from 'node:path';
import process from 'node:process';
import { inspect } from 'node:util';
import type { AnthropicModelId, GoogleModelId, OpenAIModelId } from '@nyrra/foundry-ai';
import { loadFoundryConfig } from '@nyrra/foundry-ai';
import { createFoundryAnthropic } from '@nyrra/foundry-ai/anthropic';
import { createFoundryGoogle } from '@nyrra/foundry-ai/google';
import { createFoundryOpenAI } from '@nyrra/foundry-ai/openai';
import type { LanguageModel } from 'ai';

export type ExampleProvider = 'openai' | 'anthropic' | 'google';

const LOCAL_ENV_FILE = resolve(process.cwd(), '.env.local');

const DEFAULT_OPENAI_MODEL: OpenAIModelId = 'gpt-5-mini';
// Sonnet is the default Anthropic example target because it accepts the
// reasoning/tool options we verify in the live tool-calling path.
const DEFAULT_ANTHROPIC_MODEL: AnthropicModelId = 'claude-sonnet-4.6';
const DEFAULT_GOOGLE_MODEL: GoogleModelId = 'gemini-3.1-flash-lite';
const EXAMPLE_INSPECT_OPTIONS = {
  breakLength: 120,
  colors: process.stdout.isTTY,
  compact: false,
  depth: null,
} as const;

maybeLoadLocalEnvFile();

export function resolveCliProvider(defaultProvider: ExampleProvider = 'openai'): ExampleProvider {
  const provider = process.argv[2];

  if (provider == null) {
    return defaultProvider;
  }

  if (provider === 'openai' || provider === 'anthropic' || provider === 'google') {
    return provider;
  }

  throw new Error(
    `Unsupported provider "${provider}". Expected "openai", "anthropic", or "google".`,
  );
}

export function resolveCliModelId(): string | undefined {
  return process.argv[3];
}

export function createExampleLanguageModel(
  provider = resolveCliProvider(),
  overrides?: {
    anthropicModel?: AnthropicModelId;
    googleModel?: GoogleModelId;
    openaiModel?: OpenAIModelId;
  },
): {
  model: LanguageModel;
  modelId: string;
  provider: ExampleProvider;
} {
  const config = loadFoundryConfig();

  if (provider === 'openai') {
    const openai = createFoundryOpenAI(config);
    const modelId = resolveCliModelId() ?? overrides?.openaiModel ?? DEFAULT_OPENAI_MODEL;

    return {
      provider,
      modelId,
      model: openai(modelId),
    };
  }

  if (provider === 'google') {
    const google = createFoundryGoogle(config);
    const modelId = resolveCliModelId() ?? overrides?.googleModel ?? DEFAULT_GOOGLE_MODEL;

    return {
      provider,
      modelId,
      model: google(modelId),
    };
  }

  const anthropic = createFoundryAnthropic(config);
  const modelId = resolveCliModelId() ?? overrides?.anthropicModel ?? DEFAULT_ANTHROPIC_MODEL;

  return {
    provider,
    modelId,
    model: anthropic(modelId),
  };
}

export function requireEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function logExampleValue(value: unknown): void {
  console.log(inspect(value, EXAMPLE_INSPECT_OPTIONS));
}

export function logExampleError(value: unknown): void {
  console.error(inspect(value, EXAMPLE_INSPECT_OPTIONS));
}

function maybeLoadLocalEnvFile() {
  if (process.env.FOUNDRY_URL && process.env.FOUNDRY_TOKEN) {
    return;
  }

  if (typeof process.loadEnvFile !== 'function') {
    return;
  }

  try {
    process.loadEnvFile(LOCAL_ENV_FILE);
  } catch {
    // Let the example surface missing environment variables naturally.
  }
}

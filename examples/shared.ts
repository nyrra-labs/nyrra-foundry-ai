import { resolve } from 'node:path';
import process from 'node:process';
import type { AnthropicModelId, OpenAIModelId } from '@nyrra-labs/foundry-ai';
import { loadFoundryConfig } from '@nyrra-labs/foundry-ai';
import { createFoundryAnthropic } from '@nyrra-labs/foundry-ai/anthropic';
import { createFoundryOpenAI } from '@nyrra-labs/foundry-ai/openai';
import type { LanguageModel } from 'ai';

export type ExampleProvider = 'openai' | 'anthropic';

const LOCAL_ENV_FILE = resolve(process.cwd(), '.env.local');

const DEFAULT_OPENAI_MODEL: OpenAIModelId = 'gpt-5-mini';
// Sonnet is the default Anthropic example target because it accepts the
// reasoning/tool options we verify in the live tool-calling path.
const DEFAULT_ANTHROPIC_MODEL: AnthropicModelId = 'claude-sonnet-4.6';

maybeLoadLocalEnvFile();

export function resolveCliProvider(defaultProvider: ExampleProvider = 'openai'): ExampleProvider {
  const provider = process.argv[2];

  if (provider == null) {
    return defaultProvider;
  }

  if (provider === 'openai' || provider === 'anthropic') {
    return provider;
  }

  throw new Error(`Unsupported provider "${provider}". Expected "openai" or "anthropic".`);
}

export function resolveCliModelId(): string | undefined {
  return process.argv[3];
}

export function createExampleLanguageModel(
  provider = resolveCliProvider(),
  overrides?: {
    anthropicModel?: AnthropicModelId;
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

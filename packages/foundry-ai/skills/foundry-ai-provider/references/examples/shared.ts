import { resolve } from 'node:path';
import process from 'node:process';
import { inspect } from 'node:util';
import type { AnthropicModelId, GoogleModelId, OpenAIModelId } from '@nyrra/foundry-ai';
import { loadFoundryConfig } from '@nyrra/foundry-ai';
import { createFoundryAnthropic } from '@nyrra/foundry-ai/anthropic';
import { createFoundryGoogle } from '@nyrra/foundry-ai/google';
import { createFoundryOpenAI } from '@nyrra/foundry-ai/openai';
import { type LanguageModel, tool } from 'ai';
import { z } from 'zod';

export type ExampleProvider = 'openai' | 'anthropic' | 'google';

const LOCAL_ENV_FILE = resolve(process.cwd(), '.env.local');
const DEFAULT_OPENAI_MODEL: OpenAIModelId = 'gpt-5-mini';
const DEFAULT_ANTHROPIC_MODEL: AnthropicModelId = 'claude-sonnet-4.6';
const DEFAULT_GOOGLE_MODEL: GoogleModelId = 'gemini-3.1-flash-lite';
const EXAMPLE_INSPECT_OPTIONS = {
  breakLength: 120,
  colors: process.stdout.isTTY,
  compact: false,
  depth: null,
} as const;
const FOUNDRY_USAGE_NOTES = {
  compatibility: {
    topic: 'compatibility',
    guardrails: [
      'Stay on the verified surface: OpenAI, Anthropic, and Google language-model adapters.',
      'Do not claim TSv1, TSv2, or PlatformClient runtime support without a dedicated validation pass.',
    ],
  },
  routing: {
    topic: 'routing',
    guardrails: [
      'Compose multi-provider routing in application code with createProviderRegistry.',
      'Install and import only the provider peers you actually use.',
    ],
  },
  security: {
    topic: 'security',
    guardrails: [
      'Keep FOUNDRY_TOKEN on the server and out of browser bundles.',
      'Use Foundry proxy endpoints when local dev and deployed workloads should stay on governed private traffic.',
    ],
  },
} as const;

export const TOOL_CALLING_PROMPT =
  'First call getFoundryUsageNotes, then answer in two concise bullets for a server-side @nyrra/foundry-ai integration.';

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

export function createFoundryUsageTools() {
  return {
    getFoundryUsageNotes: tool({
      description: 'Returns concise setup guardrails for @nyrra/foundry-ai.',
      inputSchema: z.object({
        topic: z.enum(['security', 'routing', 'compatibility']),
      }),
      execute: async ({ topic }) => FOUNDRY_USAGE_NOTES[topic],
    }),
  };
}

export function prepareFoundryUsageStep({ stepNumber }: { stepNumber: number }) {
  if (stepNumber !== 1) {
    return undefined;
  }

  return {
    toolChoice: 'auto' as const,
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

import { createProviderRegistry } from 'ai';
import { createFoundryAnthropic } from './providers/anthropic.js';
import { createFoundryOpenAI } from './providers/openai.js';
import type { FoundryConfig } from './types.js';

export function createFoundryRegistry(config: FoundryConfig) {
  return createProviderRegistry({
    anthropic: createFoundryAnthropic(config),
    openai: createFoundryOpenAI(config),
  });
}

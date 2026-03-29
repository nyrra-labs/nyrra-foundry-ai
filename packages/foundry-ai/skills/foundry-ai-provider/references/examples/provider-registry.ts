import { loadFoundryConfig } from '@nyrra/foundry-ai';
import { createFoundryAnthropic } from '@nyrra/foundry-ai/anthropic';
import { createFoundryGoogle } from '@nyrra/foundry-ai/google';
import { createFoundryOpenAI } from '@nyrra/foundry-ai/openai';
import { createProviderRegistry, generateText } from 'ai';

const config = loadFoundryConfig();
const registry = createProviderRegistry({
  anthropic: createFoundryAnthropic(config),
  google: createFoundryGoogle(config),
  openai: createFoundryOpenAI(config),
});
const prompt =
  'In one sentence, explain why teams compose Foundry provider routing in application code.';

for (const modelId of [
  'openai:gpt-5-mini',
  'anthropic:claude-sonnet-4.6',
  'google:gemini-3.1-flash-lite',
] as const) {
  const result = await generateText({
    model: registry.languageModel(modelId),
    prompt,
  });

  console.log(`${modelId}: ${result.text}`);
}

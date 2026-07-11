import { loadFoundryConfig } from '@shpit/foundry-ai';
import { createFoundryAnthropic } from '@shpit/foundry-ai/anthropic';
import { createFoundryGoogle } from '@shpit/foundry-ai/google';
import { createFoundryOpenAI } from '@shpit/foundry-ai/openai';
import { createProviderRegistry, generateText } from 'ai';

const config = loadFoundryConfig();
const registry = createProviderRegistry({
  anthropic: createFoundryAnthropic(config),
  google: createFoundryGoogle(config),
  openai: createFoundryOpenAI(config),
});
const prompt = 'In one sentence, what is your model name and who made you?';

for (const modelId of [
  'openai:gpt-5.4-nano',
  'anthropic:claude-sonnet-4.6',
  'google:gemini-3.1-flash-lite',
] as const) {
  const result = await generateText({
    model: registry.languageModel(modelId),
    prompt,
  });

  console.log(`${modelId}: ${result.text}`);
}

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
  'In one sentence, summarize why composing a Foundry provider registry in application code is useful.';

const openAiResult = await generateText({
  model: registry.languageModel('openai:gpt-5-mini'),
  prompt,
});

const anthropicResult = await generateText({
  model: registry.languageModel('anthropic:claude-sonnet-4.6'),
  prompt,
});

const googleResult = await generateText({
  model: registry.languageModel('google:gemini-3.1-flash-lite'),
  prompt,
});

console.log('openai:', openAiResult.text);
console.log('anthropic:', anthropicResult.text);
console.log('google:', googleResult.text);

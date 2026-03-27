import { loadFoundryConfig } from '@nyrra-labs/foundry-ai';
import { createFoundryRegistry } from '@nyrra-labs/foundry-ai/registry';
import { generateText } from 'ai';

const registry = createFoundryRegistry(loadFoundryConfig());
const prompt =
  'In one sentence, summarize why a typed Foundry AI adapter that maps friendly model aliases to provider-specific RIDs is useful.';

const openAiResult = await generateText({
  model: registry.languageModel('openai:gpt-5-mini'),
  prompt,
});

const anthropicResult = await generateText({
  model: registry.languageModel('anthropic:claude-sonnet-4.6'),
  prompt,
});

console.log('openai:', openAiResult.text);
console.log('anthropic:', anthropicResult.text);

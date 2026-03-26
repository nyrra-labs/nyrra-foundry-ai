import { loadFoundryConfig } from '@nyrra-labs/foundry-ai';
import { createFoundryRegistry } from '@nyrra-labs/foundry-ai/registry';
import { generateText } from 'ai';

const registry = createFoundryRegistry(loadFoundryConfig());

const openAiResult = await generateText({
  model: registry.languageModel('openai:gpt-5-mini'),
  prompt: 'Summarize the main goal of this package in one sentence.',
});

const anthropicResult = await generateText({
  model: registry.languageModel('anthropic:claude-sonnet-4.6'),
  prompt: 'Summarize the main goal of this package in one sentence.',
});

console.log('openai:', openAiResult.text);
console.log('anthropic:', anthropicResult.text);

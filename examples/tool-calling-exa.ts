import { webSearch } from '@exalabs/ai-sdk';
import { stepCountIs, streamText } from 'ai';
import { createExampleLanguageModel, getExampleProviderOptions, requireEnv } from './shared.js';

requireEnv('EXA_API_KEY');

const { model, modelId, provider } = createExampleLanguageModel(undefined, {
  anthropicModel: 'claude-sonnet-4.6',
  openaiModel: 'gpt-5-mini',
});

const result = streamText({
  model,
  prompt:
    'Find two recent FDA or EMA updates relevant to oncology drug development and summarize why each matters for a clinical strategy team.',
  system:
    'Use the web search tool when you need current information. Cite what you found in plain text.',
  stopWhen: stepCountIs(4),
  providerOptions: getExampleProviderOptions(provider),
  tools: {
    webSearch: webSearch({
      category: 'news',
      contents: {
        livecrawl: 'preferred',
        summary: {
          query: 'What changed and why does it matter?',
        },
        text: {
          maxCharacters: 1500,
        },
      },
      numResults: 5,
      type: 'auto',
    }),
  },
});

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);

let text = '';

for await (const part of result.fullStream) {
  if (part.type === 'text-delta') {
    text += part.text;
  }

  if (part.type === 'tool-error' || part.type === 'error') {
    console.log(stringifyValue(part));
    throw part.error;
  }

  console.log(stringifyValue(part));
}

const steps = await result.steps;
console.log(stringifyValue({ type: 'final-text', text }));
console.log(stringifyValue({ type: 'summary', steps: steps.length }));

function stringifyValue(value: unknown): string {
  return (
    JSON.stringify(value, (_, currentValue) =>
      currentValue instanceof Error
        ? {
            name: currentValue.name,
            message: currentValue.message,
            stack: currentValue.stack,
          }
        : currentValue,
    ) ?? String(value)
  );
}

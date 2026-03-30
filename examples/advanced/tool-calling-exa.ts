import { webSearch } from '@exalabs/ai-sdk';
import { stepCountIs, streamText } from 'ai';
import {
  createExampleLanguageModel,
  logExampleError,
  logExampleValue,
  requireEnv,
} from '../base/shared.js';
import { createExaProviderOptions } from './exa-shared.js';

requireEnv('EXA_API_KEY');

const { model, modelId, provider } = createExampleLanguageModel(undefined, {
  anthropicModel: 'claude-sonnet-4.6',
  googleModel: 'gemini-3.1-flash-lite',
  openaiModel: 'gpt-5-mini',
});
const prompt =
  'Find two recent FDA or EMA updates relevant to oncology drug development and summarize why each matters for a clinical strategy team.';
const system =
  'Use the web search tool when you need current information. Cite what you found in plain text.';
const tools = {
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
};
type ExampleProviderOptions = NonNullable<Parameters<typeof streamText>[0]['providerOptions']>;

const providerOptions: ExampleProviderOptions = createExaProviderOptions(provider, {
  parallelToolUse: false,
});

const result = streamText({
  model,
  prompt,
  system,
  stopWhen: stepCountIs(4),
  providerOptions,
  tools,
});

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);
logExampleValue({ type: 'provider-options', providerOptions });

let text = '';

for await (const part of result.fullStream) {
  if (part.type === 'text-delta') {
    text += part.text;
  }

  if (part.type === 'tool-error' || part.type === 'error') {
    logExampleError(part);
    throw part.error;
  }

  logExampleValue(part);
}

const steps = await result.steps;
logExampleValue({ type: 'final-text', text });
logExampleValue({ type: 'summary', steps: steps.length });

import { webSearch } from '@exalabs/ai-sdk';
import { generateText, stepCountIs } from 'ai';
import { createExampleLanguageModel, requireEnv } from './shared.js';

requireEnv('EXA_API_KEY');

const { model, modelId } = createExampleLanguageModel('openai', {
  openaiModel: 'gpt-5-mini',
});

const result = await generateText({
  model,
  prompt:
    'Find two recent FDA or EMA updates relevant to oncology drug development and summarize why each matters for a clinical strategy team.',
  system:
    'Use the web search tool when you need current information. Cite what you found in plain text.',
  stopWhen: stepCountIs(4),
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

console.log(`provider: openai`);
console.log(`model: ${modelId}`);
console.log(result.text);

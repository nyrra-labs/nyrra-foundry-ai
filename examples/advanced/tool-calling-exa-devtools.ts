import { webSearch } from '@exalabs/ai-sdk';
import { stepCountIs, streamText } from 'ai';
import { logExampleError, logExampleValue } from '../base/example-logger.js';
import { createExampleLanguageModel, requireEnv } from '../base/example-model.js';
import { createExaProviderOptions, logDevToolsHint, wrapWithDevTools } from './exa-shared.js';

requireEnv('EXA_API_KEY');

const {
  model: baseModel,
  modelId,
  provider,
} = createExampleLanguageModel(undefined, {
  anthropicModel: 'claude-sonnet-4.6',
  googleModel: 'gemini-3.1-flash-lite',
  openaiModel: 'gpt-5.4-nano',
});
const model = wrapWithDevTools(baseModel);
const prompt =
  'Research https://www.nyrra.ai/ (nyrra-labs on github)and tell me what the company does, what products or open-source projects it offers, and who it seems to be aimed at.';
const system = 'Use the web search tool to find current information. Cite sources in plain text.';
const tools = {
  webSearch: webSearch({
    contents: {
      text: { maxCharacters: 1500 },
    },
    numResults: 5,
  }),
};
const providerOptions = createExaProviderOptions(provider, {
  parallelToolUse: false,
});

const result = streamText({
  model,
  prompt,
  system,
  stopWhen: stepCountIs(4),
  providerOptions,
  tools,
  onFinish({ text, toolCalls, toolResults, finishReason }) {
    logExampleValue({ type: 'finish', finishReason, toolCalls, toolResults });
    logExampleValue({ type: 'final-text', text });
  },
  onError({ error }) {
    logExampleError({ type: 'error', error });
    throw error;
  },
});

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);
logDevToolsHint();

// Stream text to stdout
for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}

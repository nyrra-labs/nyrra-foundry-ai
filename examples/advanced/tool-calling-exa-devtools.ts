import { webSearch } from '@exalabs/ai-sdk';
import { stepCountIs, streamText, tool } from 'ai';
import { z } from 'zod';
import { logExampleError, logExampleValue } from '../base/example-logger.js';
import { createExampleLanguageModel, requireEnv } from '../base/example-model.js';
import { createExaProviderOptions, logDevToolsHint, wrapWithDevTools } from './exa-shared.js';

requireEnv('EXA_API_KEY');

const {
  model: baseModel,
  modelId,
  provider,
  // Agentic multi-step tool use with unconstrained search requires mid-tier+ models.
  // Nano/lite models get stuck in tool-call loops without generating text.
} = createExampleLanguageModel(undefined, {
  anthropicModel: 'claude-sonnet-4.6',
  googleModel: 'gemini-3-flash',
  openaiModel: 'gpt-5.4-mini',
});
const model = wrapWithDevTools(baseModel);
const prompt =
  'Research https://www.nyrra.ai/ (nyrra-labs on github) and tell me what the company does, what products or open-source projects it offers, and who it seems to be aimed at. When you have enough info, save a structured profile.';
const system =
  'Use webSearch to find current information. Once you have a clear picture, call saveCompanyProfile to record a structured summary. Cite sources in your final text.';
const tools = {
  webSearch: webSearch({
    contents: {
      text: { maxCharacters: 1500 },
    },
    numResults: 5,
  }),
  saveCompanyProfile: tool({
    description: 'Save a structured company profile after researching.',
    inputSchema: z.object({
      name: z.string(),
      domain: z.string(),
      oneLiner: z.string().describe('What the company does in one sentence'),
      products: z.array(z.string()).describe('Key products or open-source projects'),
      targetAudience: z.string(),
      githubOrg: z.string().describe('GitHub org handle, or "unknown" if not found'),
    }),
    execute: async (profile) => {
      logExampleValue({ type: 'company-profile', ...profile });
      return { saved: true };
    },
  }),
};
const providerOptions = createExaProviderOptions(provider, {
  parallelToolUse: false,
});

const result = streamText({
  model,
  prompt,
  system,
  stopWhen: stepCountIs(6),
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

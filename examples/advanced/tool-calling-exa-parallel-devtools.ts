import { webSearch } from '@exalabs/ai-sdk';
import { stepCountIs, streamText, tool } from 'ai';
import { z } from 'zod';
import { logExampleError, logExampleValue } from '../base/example-logger.js';
import { createExampleLanguageModel, requireEnv } from '../base/example-model.js';
import { createExaProviderOptions, logDevToolsHint, wrapWithDevTools } from './exa-shared.js';

requireEnv('EXA_API_KEY');

const DEFAULT_COMPANIES = [
  'Merck KGaA, Darmstadt, Germany',
  'Eli Lilly',
  'Bristol Myers Squibb',
  'Roivant Sciences',
  'BioNTech',
] as const;
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
const prompt = `
Research these five companies and build a drug landscape snapshot:
${DEFAULT_COMPANIES.map((company) => `- ${company}`).join('\n')}

For each company, find:
- 1-3 approved or marketed drugs (say "none found" if unclear)
- 1-3 late-stage pipeline assets worth watching
- Whether the sources mention a Palantir data/AI partnership (say "not cited" if not)

Search for as many companies as you can at once. If initial results are thin for any company, do a follow-up search. If you spot something surprising or strategically notable, flag it for review. Keep the final answer tight with one markdown subsection per company.
`.trim();
const tools = {
  webSearch: webSearch({
    contents: {
      text: { maxCharacters: 1200 },
    },
    numResults: 4,
  }),
  flagForReview: tool({
    description:
      'Flag a notable finding that deserves deeper analysis — unexpected partnerships, regulatory signals, or strategic pivots.',
    inputSchema: z.object({
      company: z.string(),
      finding: z.string(),
      reason: z.string().describe('Why this is worth flagging'),
    }),
    execute: async (flag) => {
      logExampleValue({ type: 'flagged', ...flag });
      return { acknowledged: true };
    },
  }),
};
const result = streamText({
  model,
  prompt,
  stopWhen: stepCountIs(6),
  providerOptions: createExaProviderOptions(provider, {
    parallelToolUse: true,
  }),
  tools,
  onFinish({ text, toolCalls, toolResults, finishReason }) {
    logExampleValue({ type: 'finish', finishReason, toolCalls, toolResults });
    logExampleValue({ type: 'final-text', text });
  },
  onError({ error }) {
    logExampleError({ type: 'error', error });
  },
});

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);
console.log(`companies: ${DEFAULT_COMPANIES.join(', ')}`);
logDevToolsHint();

// Stream text to stdout
for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}

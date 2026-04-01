import type { AnthropicLanguageModelOptions } from '@ai-sdk/anthropic';
import { webSearch } from '@exalabs/ai-sdk';
import type { AnthropicModelId } from '@nyrra/foundry-ai';
import { loadFoundryConfig } from '@nyrra/foundry-ai';
import { createFoundryAnthropic } from '@nyrra/foundry-ai/anthropic';
import { stepCountIs, streamText, tool } from 'ai';
import { z } from 'zod';
import { requireEnv } from '../base/config.js';
import { logError, logValue } from '../base/logger.js';
import { logDevToolsHint, wrapWithDevTools } from './devtools-instrumentation.js';

requireEnv('EXA_API_KEY');

type ProviderOptions = NonNullable<Parameters<typeof streamText>[0]['providerOptions']>;

const DEFAULT_COMPANIES = [
  'Merck KGaA, Darmstadt, Germany',
  'Eli Lilly',
  'Bristol Myers Squibb',
  'Roivant Sciences',
  'BioNTech',
] as const;
const config = loadFoundryConfig();
const provider = 'anthropic';
// Agentic multi-step tool use with unconstrained search requires mid-tier+ models.
// Nano/lite models get stuck in tool-call loops without generating text.
const modelId: AnthropicModelId = 'claude-sonnet-4.6';
const model = wrapWithDevTools(createFoundryAnthropic(config)(modelId));
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
      logValue({ type: 'flagged', ...flag });
      return { acknowledged: true };
    },
  }),
};
const providerOptions: ProviderOptions = {
  anthropic: {
    thinking: {
      type: 'enabled',
      budgetTokens: 1024,
    },
    sendReasoning: true,
    toolStreaming: true,
  } satisfies AnthropicLanguageModelOptions,
};
const result = streamText({
  model,
  prompt,
  stopWhen: stepCountIs(6),
  providerOptions,
  tools,
  onFinish({ text, toolCalls, toolResults, finishReason }) {
    logValue({ type: 'finish', finishReason, toolCalls, toolResults });
    logValue({ type: 'final-text', text });
  },
  onError({ error }) {
    logError({ type: 'error', error });
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

import { webSearch } from '@exalabs/ai-sdk';
import { stepCountIs, streamText } from 'ai';
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
} = createExampleLanguageModel(undefined, {
  anthropicModel: 'claude-sonnet-4.6',
  googleModel: 'gemini-3.1-flash-lite',
  openaiModel: 'gpt-5.4-nano',
});
const model = wrapWithDevTools(baseModel);
const prompt = `
Build a fast drug landscape snapshot for these five companies:
${DEFAULT_COMPANIES.map((company) => `- ${company}`).join('\n')}

Rules:
- Use one separate webSearch tool call per company.
- Make the company searches in parallel when the model supports it.
- Keep the first-pass search query focused on approved drugs and late-stage pipeline. Do not put "Palantir" in the search query unless you need a follow-up search.
- For each company, list 1-3 approved or marketed drugs.
- For each company, list 1-3 unreleased assets that are late-stage, pivotal, filed, or otherwise the most important disclosed pipeline programs.
- If a company has no approved drugs, say "none found".
- Note whether the sources in this run mention a Palantir relationship. If not, say "not cited in this run".
- Keep the final answer tight and use one markdown subsection per company.
`.trim();
const tools = {
  webSearch: webSearch({
    contents: {
      text: { maxCharacters: 1200 },
    },
    numResults: 4,
  }),
};
const result = streamText({
  model,
  prompt,
  stopWhen: stepCountIs(4),
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
    throw error;
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

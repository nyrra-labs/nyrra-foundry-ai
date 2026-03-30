import { webSearch } from '@exalabs/ai-sdk';
import { stepCountIs, streamText } from 'ai';
import { createExampleLanguageModel, logExampleError, requireEnv } from '../base/shared.js';
import { createExaProviderOptions } from './exa-shared.js';

requireEnv('EXA_API_KEY');

const DEFAULT_COMPANIES = [
  'Merck KGaA, Darmstadt, Germany',
  'Eli Lilly',
  'Bristol Myers Squibb',
  'Roivant Sciences',
  'BioNTech',
] as const;
const { model, modelId, provider } = createExampleLanguageModel(undefined, {
  anthropicModel: 'claude-sonnet-4.6',
  googleModel: 'gemini-3.1-flash-lite',
  openaiModel: 'gpt-5-mini',
});
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
      livecrawl: 'preferred',
      summary: {
        query:
          'List approved drugs, key unreleased or late-stage assets, and whether the sources mention a Palantir relationship.',
      },
      text: {
        maxCharacters: 1200,
      },
    },
    numResults: 4,
    type: 'auto',
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
});

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);
console.log(`companies: ${DEFAULT_COMPANIES.join(', ')}`);

let currentStep = 0;
let maxToolCallsInSingleStep = 0;
let toolCallsInCurrentStep = 0;
let text = '';

for await (const part of result.fullStream) {
  if (part.type === 'text-delta') {
    text += part.text;
    continue;
  }

  if (part.type === 'tool-error' || part.type === 'error') {
    logExampleError(part);
    throw part.error;
  }

  if (part.type === 'start-step') {
    currentStep += 1;
    toolCallsInCurrentStep = 0;
    console.log(`step ${currentStep}: start`);
    continue;
  }

  if (part.type === 'tool-call') {
    const input = readWebSearchInput(part.input);

    toolCallsInCurrentStep += 1;
    maxToolCallsInSingleStep = Math.max(maxToolCallsInSingleStep, toolCallsInCurrentStep);
    console.log(
      JSON.stringify(
        {
          type: 'tool-call',
          step: currentStep,
          callsInStep: toolCallsInCurrentStep,
          query: input.query,
        },
        null,
        2,
      ),
    );
    continue;
  }

  if (part.type === 'tool-result') {
    const input = readWebSearchInput(part.input);
    const output = readWebSearchOutput(part.output);

    console.log(
      JSON.stringify(
        {
          type: 'tool-result',
          step: currentStep,
          query: input.query,
          resultCount: output.results.length,
          topUrls: output.results.slice(0, 2).map((item) => item.url),
        },
        null,
        2,
      ),
    );
    continue;
  }

  if (part.type === 'finish-step') {
    console.log(
      JSON.stringify(
        {
          type: 'finish-step',
          step: currentStep,
          finishReason: part.finishReason,
          usage: part.usage
            ? {
                inputTokens: part.usage.inputTokens,
                outputTokens: part.usage.outputTokens,
                totalTokens: part.usage.totalTokens,
              }
            : null,
        },
        null,
        2,
      ),
    );
  }
}

const steps = await result.steps;

console.log(
  JSON.stringify(
    {
      type: 'summary',
      steps: steps.length,
      maxToolCallsInSingleStep,
    },
    null,
    2,
  ),
);
console.log(text);

function readWebSearchInput(input: unknown): { query: string } {
  if (
    typeof input === 'object' &&
    input !== null &&
    'query' in input &&
    typeof input.query === 'string'
  ) {
    return {
      query: input.query,
    };
  }

  return {
    query: 'unknown query',
  };
}

function readWebSearchOutput(output: unknown): {
  results: Array<{ url: string }>;
} {
  if (typeof output !== 'object' || output === null || !('results' in output)) {
    return { results: [] };
  }

  const { results } = output;

  if (!Array.isArray(results)) {
    return { results: [] };
  }

  return {
    results: results.map((item) => {
      if (
        typeof item === 'object' &&
        item !== null &&
        'url' in item &&
        typeof item.url === 'string'
      ) {
        return {
          url: item.url,
        };
      }

      return {
        url: 'unknown url',
      };
    }),
  };
}

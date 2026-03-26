import type { OpenAILanguageModelResponsesOptions } from '@ai-sdk/openai';
import { webSearch } from '@exalabs/ai-sdk';
import { stepCountIs, streamText } from 'ai';
import { createExampleLanguageModel, requireEnv } from './shared.js';

requireEnv('EXA_API_KEY');

const { model, modelId } = createExampleLanguageModel('openai', {
  openaiModel: 'gpt-5-mini',
});

const result = streamText({
  model,
  prompt:
    'Find two recent FDA or EMA updates relevant to oncology drug development and summarize why each matters for a clinical strategy team.',
  system:
    'Use the web search tool when you need current information. Cite what you found in plain text.',
  stopWhen: stepCountIs(4),
  providerOptions: {
    openai: {
      reasoningEffort: 'low',
      textVerbosity: 'low',
    } satisfies OpenAILanguageModelResponsesOptions,
  },
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

let stepNumber = 0;

for await (const part of result.fullStream) {
  switch (part.type) {
    case 'start-step': {
      stepNumber += 1;
      console.log(`\n[step ${stepNumber}]`);
      break;
    }
    case 'tool-input-start': {
      console.log(`\n[tool:${part.toolName}]`);
      break;
    }
    case 'tool-call': {
      console.log(`[tool-call:${part.toolName}] ${stringifyValue(part.input)}`);
      break;
    }
    case 'tool-result': {
      console.log(`\n[tool-result:${part.toolName}] ${summarizeValue(part.output)}`);
      break;
    }
    case 'text-delta': {
      process.stdout.write(part.text);
      break;
    }
    case 'tool-error': {
      throw part.error;
    }
    case 'error': {
      throw part.error;
    }
  }
}

process.stdout.write('\n');

const steps = await result.steps;
console.log(`\ncompleted ${steps.length} step(s)`);

function summarizeValue(value: unknown): string {
  const serialized = stringifyValue(value);

  if (serialized.length <= 240) {
    return serialized;
  }

  return `${serialized.slice(0, 237)}...`;
}

function stringifyValue(value: unknown): string {
  return JSON.stringify(value) ?? String(value);
}

import process from 'node:process';
import { stepCountIs, streamText } from 'ai';
import {
  createExampleLanguageModel,
  createFoundryUsageTools,
  logExampleError,
  prepareFoundryUsageStep,
  TOOL_CALLING_PROMPT,
} from './shared.js';

const { model, modelId, provider } = createExampleLanguageModel();
const tools = createFoundryUsageTools();
const result = streamText({
  model,
  prompt: TOOL_CALLING_PROMPT,
  prepareStep: prepareFoundryUsageStep,
  stopWhen: stepCountIs(2),
  toolChoice: 'required',
  tools,
});

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);

for await (const part of result.fullStream) {
  if (part.type === 'text-delta') {
    process.stdout.write(part.text);
    continue;
  }

  if (part.type === 'tool-call') {
    console.log(`\n[tool-call] ${part.toolName} ${JSON.stringify(part.input)}`);
    continue;
  }

  if (part.type === 'tool-result') {
    console.log(`\n[tool-result] ${part.toolName} ${JSON.stringify(part.output)}`);
    continue;
  }

  if (part.type === 'tool-error' || part.type === 'error') {
    logExampleError(part);
    throw part.error;
  }
}

console.log('\n');
console.log(`steps: ${(await result.steps).length}`);

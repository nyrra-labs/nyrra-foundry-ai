import process from 'node:process';
import { stepCountIs, streamText } from 'ai';
import { logExampleError, logExampleValue } from './example-logger.js';
import { createExampleLanguageModel } from './example-model.js';
import {
  createExampleToolSet,
  prepareExampleToolStep,
  TOOL_CALLING_PROMPT,
} from './example-tools.js';

const { model, modelId, provider } = createExampleLanguageModel();
const tools = createExampleToolSet();
const result = streamText({
  model,
  prompt: TOOL_CALLING_PROMPT,
  prepareStep: prepareExampleToolStep,
  stopWhen: stepCountIs(2),
  toolChoice: 'required',
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

// Stream text to stdout
for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}

console.log('\n');
console.log(`steps: ${(await result.steps).length}`);

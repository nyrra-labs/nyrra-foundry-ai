import { generateText, stepCountIs } from 'ai';
import {
  createExampleLanguageModel,
  createFoundryUsageTools,
  logExampleValue,
  prepareFoundryUsageStep,
  TOOL_CALLING_PROMPT,
} from './shared.js';

const { model, modelId, provider } = createExampleLanguageModel();
const tools = createFoundryUsageTools();
const result = await generateText({
  model,
  prompt: TOOL_CALLING_PROMPT,
  prepareStep: prepareFoundryUsageStep,
  stopWhen: stepCountIs(2),
  toolChoice: 'required',
  tools,
});
const toolCalls = result.steps.flatMap((step) => step.toolCalls);
const toolResults = result.steps.flatMap((step) => step.toolResults);

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);
logExampleValue({ type: 'tool-calls', toolCalls });
logExampleValue({ type: 'tool-results', toolResults });
logExampleValue({ type: 'steps', steps: result.steps.length });
logExampleValue({ type: 'final-text', text: result.text });

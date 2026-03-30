import { generateText } from 'ai';
import { createExampleLanguageModel } from '../base/example-model.js';

const { model, modelId, provider } = createExampleLanguageModel();

const result = await generateText({
  model,
  prompt: 'Explain in two sentences what Palantir Foundry is and why enterprises use it.',
});

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);
console.log(result.text);

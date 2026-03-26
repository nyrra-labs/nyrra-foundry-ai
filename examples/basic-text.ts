import { generateText } from 'ai';
import { createExampleLanguageModel, getExampleProviderOptions } from './shared.js';

const { model, modelId, provider } = createExampleLanguageModel();

const result = await generateText({
  model,
  prompt:
    'Explain in two concise sentences why a typed Foundry adapter is useful for regulated AI workflows.',
  providerOptions: getExampleProviderOptions(provider),
});

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);
console.log(result.text);

import { streamText } from 'ai';
import { createExampleLanguageModel } from './shared.js';

const { model, modelId, provider } = createExampleLanguageModel();

const result = streamText({
  model,
  prompt:
    'Write a short release note for a Foundry AI SDK that adds strict tool defaults and reasoning-model detection.',
});

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}

process.stdout.write('\n');

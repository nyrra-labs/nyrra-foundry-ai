import { generateText, Output } from 'ai';
import { z } from 'zod';
import { logValue } from '../base/logger.js';
import { createLanguageModel } from '../base/model.js';

const signalSchema = z.object({
  indication: z.string(),
  mechanismOfAction: z.string(),
  riskLevel: z.enum(['low', 'medium', 'high']),
  rationale: z.string(),
});

const { model, modelId, provider } = createLanguageModel();

const { output } = await generateText({
  model,
  output: Output.object({
    schema: signalSchema,
    name: 'clinical_signal',
    description: 'A concise clinical signal summary for regulated AI review workflows.',
  }),
  prompt:
    'Extract a concise clinical signal from the following statement: "The investigational therapy reduced relapse rates in a small phase 2 study, but liver enzyme elevations warrant close monitoring."',
});

console.log(`provider: ${provider}`);
console.log(`model: ${modelId}`);
logValue({ type: 'structured-output', output });

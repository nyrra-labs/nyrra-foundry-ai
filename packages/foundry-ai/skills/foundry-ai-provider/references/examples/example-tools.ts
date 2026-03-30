import { type ToolSet, tool } from 'ai';
import { z } from 'zod';

const EXAMPLE_TOOL_DATA = {
  compatibility: {
    topic: 'compatibility',
    guardrails: [
      'Stay on the verified surface: OpenAI, Anthropic, and Google language-model adapters.',
      'Do not claim TSv1, TSv2, or PlatformClient runtime support without a dedicated validation pass.',
    ],
  },
  routing: {
    topic: 'routing',
    guardrails: [
      'Compose multi-provider routing in application code with createProviderRegistry.',
      'Install and import only the provider peers you actually use.',
    ],
  },
  security: {
    topic: 'security',
    guardrails: [
      'Keep FOUNDRY_TOKEN on the server and out of browser bundles.',
      'Use Foundry proxy endpoints when local dev and deployed workloads should stay on governed private traffic.',
    ],
  },
} as const;

export const TOOL_CALLING_PROMPT =
  'First call getExampleToolData, then answer in two concise bullets for a server-side @nyrra/foundry-ai integration.';

export function createExampleToolSet(): ToolSet {
  return {
    getExampleToolData: tool({
      description: 'Returns static demo data for tool-calling examples.',
      inputSchema: z.object({
        topic: z.enum(['security', 'routing', 'compatibility']),
      }),
      execute: async ({ topic }) => EXAMPLE_TOOL_DATA[topic],
    }),
  };
}

export function prepareExampleToolStep({ stepNumber }: { stepNumber: number }) {
  if (stepNumber !== 1) {
    return undefined;
  }

  return {
    toolChoice: 'auto' as const,
  };
}

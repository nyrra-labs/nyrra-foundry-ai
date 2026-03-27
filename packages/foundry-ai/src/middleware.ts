import { wrapLanguageModel } from 'ai';

type FoundryLanguageModel = Parameters<typeof wrapLanguageModel>[0]['model'];
type FoundryCallOptions = Parameters<FoundryLanguageModel['doGenerate']>[0];
type FoundryFunctionTool = NonNullable<FoundryCallOptions['tools']>[number];

export function wrapWithFoundryMiddleware(
  model: FoundryLanguageModel,
  options: {
    modelId: string;
    providerId: string;
    isReasoning: boolean;
  },
): FoundryLanguageModel {
  return wrapLanguageModel({
    model,
    middleware: {
      specificationVersion: 'v3',
      transformParams: async ({ params }) => {
        let transformed = params;

        if (isOpenAIProvider(options.providerId) && transformed.tools != null) {
          transformed = {
            ...transformed,
            tools: transformed.tools.map(applyOpenAIFunctionToolDefaults),
          };
        }

        if (isOpenAIProvider(options.providerId)) {
          transformed = {
            ...transformed,
            providerOptions: mergeOpenAIProviderOptions(
              transformed.providerOptions,
              options.isReasoning,
            ),
          };
        }

        return transformed;
      },
    },
    modelId: options.modelId,
    providerId: options.providerId,
  });
}

function isOpenAIProvider(providerId: string): boolean {
  return providerId.includes('openai');
}

function applyOpenAIFunctionToolDefaults(tool: FoundryFunctionTool): FoundryFunctionTool {
  if (tool.type !== 'function' || tool.strict != null) {
    return tool;
  }

  return {
    ...tool,
    strict: true,
  };
}

function mergeOpenAIProviderOptions(
  providerOptions: FoundryCallOptions['providerOptions'],
  isReasoning: boolean,
): NonNullable<FoundryCallOptions['providerOptions']> {
  const nextProviderOptions = {
    ...(providerOptions ?? {}),
  };
  const currentOpenAIOptions = asRecord(nextProviderOptions.openai);

  nextProviderOptions.openai = {
    ...currentOpenAIOptions,
    ...(isReasoning ? { forceReasoning: true } : {}),
    store: false,
  };

  return nextProviderOptions;
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

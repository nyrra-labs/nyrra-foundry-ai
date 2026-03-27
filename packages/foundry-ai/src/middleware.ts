import { wrapLanguageModel } from 'ai';

type FoundryLanguageModel = Parameters<typeof wrapLanguageModel>[0]['model'];
type FoundryCallOptions = Parameters<FoundryLanguageModel['doGenerate']>[0];

export function wrapFoundryLanguageModel(
  model: FoundryLanguageModel,
  options: {
    modelId: string;
    providerId: string;
    transformParams?: (params: FoundryCallOptions) => FoundryCallOptions;
  },
): FoundryLanguageModel {
  return wrapLanguageModel({
    model,
    middleware: {
      specificationVersion: 'v3',
      transformParams: async ({ params }) => {
        return options.transformParams?.(params) ?? params;
      },
    },
    modelId: options.modelId,
    providerId: options.providerId,
  });
}

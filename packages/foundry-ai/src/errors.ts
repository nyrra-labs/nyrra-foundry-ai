export class FoundryModelNotFoundError extends Error {
  constructor(modelId: string) {
    super(
      `Unknown model: "${modelId}". Check the catalog for supported aliases or pass a raw Foundry RID directly to a provider adapter.`,
    );
    this.name = 'FoundryModelNotFoundError';
  }
}

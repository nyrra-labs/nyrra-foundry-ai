function formatErrorValue(error: unknown): string {
  if (error instanceof Error) {
    return error.message ? `${error.name}: ${error.message}` : error.name;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error == null) {
    return String(error);
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

function getErrorCause(error: unknown): unknown {
  if (!(error instanceof Error)) {
    return undefined;
  }

  return 'cause' in error ? error.cause : undefined;
}

export class FoundryModelNotFoundError extends Error {
  constructor(modelId: string) {
    super(
      `Unknown model: "${modelId}". Check the catalog for supported aliases or pass a raw Foundry RID directly to a provider adapter.`,
    );
    this.name = 'FoundryModelNotFoundError';
  }
}

export function describeError(error: unknown, maxDepth = 5): string {
  const parts: string[] = [];
  let current: unknown = error;
  let depth = 0;

  while (current != null && depth < maxDepth) {
    const formatted = formatErrorValue(current);

    if (formatted.length > 0 && parts.at(-1) !== formatted) {
      parts.push(formatted);
    }

    current = getErrorCause(current);
    depth += 1;
  }

  return parts.join(' Caused by: ');
}

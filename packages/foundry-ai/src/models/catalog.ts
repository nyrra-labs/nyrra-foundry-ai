import { FoundryModelNotFoundError } from '../errors.js';
import type { KnownModelId, ModelMetadata, ModelProvider, ResolvedModelTarget } from '../types.js';
import { ANTHROPIC_MODEL_IDS, ANTHROPIC_MODELS } from './anthropic-models.js';
import { OPENAI_MODEL_IDS, OPENAI_MODELS } from './openai-models.js';

export const MODEL_CATALOG = {
  ...OPENAI_MODELS,
  ...ANTHROPIC_MODELS,
} as const satisfies Record<KnownModelId, ModelMetadata>;

export const MODEL_IDS = [...OPENAI_MODEL_IDS, ...ANTHROPIC_MODEL_IDS] as KnownModelId[];

export function getModelMetadata(modelId: string): ModelMetadata | undefined {
  return MODEL_CATALOG[modelId as KnownModelId];
}

export function hasKnownModel(modelId: string): modelId is KnownModelId {
  return getModelMetadata(modelId) != null;
}

export function resolveModelTarget(modelId: string): ResolvedModelTarget {
  const metadata = getModelMetadata(modelId);

  return {
    rid: metadata?.rid ?? modelId,
    metadata,
  };
}

export function findClosestModelNames(modelId: string, limit = 3): KnownModelId[] {
  if (modelId.startsWith('ri.')) {
    return [];
  }

  const normalizedModelId = modelId.toLowerCase();

  return MODEL_IDS.map((candidate) => ({
    candidate,
    score: scoreModelName(normalizedModelId, candidate.toLowerCase()),
  }))
    .sort((left, right) => {
      if (left.score !== right.score) {
        return left.score - right.score;
      }

      if (left.candidate.length !== right.candidate.length) {
        return left.candidate.length - right.candidate.length;
      }

      return left.candidate.localeCompare(right.candidate);
    })
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function resolveKnownModelMetadata(modelId: string): ModelMetadata {
  const metadata = getModelMetadata(modelId);

  if (metadata == null) {
    throw new FoundryModelNotFoundError(modelId, findClosestModelNames(modelId));
  }

  return metadata;
}

export function resolveModelRid(modelId: string): string {
  return resolveKnownModelMetadata(modelId).rid;
}

export function resolveModelProvider(modelId: string): ModelProvider {
  return resolveKnownModelMetadata(modelId).provider;
}

function scoreModelName(query: string, candidate: string): number {
  const queryTokens = tokenizeModelId(query);
  const candidateTokens = tokenizeModelId(candidate);

  if (queryTokens.length === candidateTokens.length) {
    return queryTokens.reduce((score, queryToken, index) => {
      return score + levenshteinDistance(queryToken, candidateTokens[index] ?? '');
    }, 0);
  }

  return (
    levenshteinDistance(query, candidate) +
    Math.abs(queryTokens.length - candidateTokens.length) * 2
  );
}

function levenshteinDistance(left: string, right: string): number {
  const rows = left.length + 1;
  const columns = right.length + 1;
  const matrix = Array.from({ length: rows }, () => Array<number>(columns).fill(0));

  for (let row = 0; row < rows; row += 1) {
    matrix[row][0] = row;
  }

  for (let column = 0; column < columns; column += 1) {
    matrix[0][column] = column;
  }

  for (let row = 1; row < rows; row += 1) {
    for (let column = 1; column < columns; column += 1) {
      const substitutionCost = left[row - 1] === right[column - 1] ? 0 : 1;

      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + substitutionCost,
      );
    }
  }

  return matrix[left.length][right.length];
}

function tokenizeModelId(modelId: string): string[] {
  return modelId.split(/[-.]/g).filter(Boolean);
}

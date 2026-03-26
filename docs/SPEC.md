# @nyrra-labs/foundry-ai - Implementation Spec

## Overview

A public TypeScript package that provides a typed interface between Palantir Foundry's LLM proxy endpoints and the Vercel AI SDK v6. Zero OSDK dependencies -- just takes `foundryUrl` + `token`. Wraps `@ai-sdk/openai` and `@ai-sdk/anthropic` under the hood with Foundry-specific middleware that handles RID mapping, reasoning model detection, and ZDR-safe defaults.

Users get autocomplete with known model names (with string escape hatch for raw RIDs). Provider adapters are isolated behind subpath exports so users only pull in the provider SDK they actually use.

**Package name**: `@nyrra-labs/foundry-ai`

---

## Monorepo Setup

**Tooling**: nx (full -- tasks, caching, affected, release) + pnpm workspaces

```
nyrra-foundry-ai/
  nx.json                              # Task graph, release config, affected
  pnpm-workspace.yaml                  # Workspace definitions
  package.json                         # Root (private), nx + shared dev deps
  tsconfig.base.json                   # Shared TS config
  biome.json                           # Shared linting/formatting
  justfile                             # Convenience recipes

  packages/
    foundry-ai/                        # Single publishable package
      package.json                     # @nyrra-labs/foundry-ai
      tsup.config.ts                   # Multi-entry build (ESM + CJS + .d.ts)
      tsconfig.json
      vitest.config.ts
      src/
        index.ts                       # Root entrypoint: types, catalog, config, errors, middleware
        types.ts                       # FoundryConfig, model ID types, metadata types
        config.ts                      # Env var config loading
        errors.ts                      # Error utilities (Foundry-specific error messages)
        middleware.ts                   # AI SDK middleware for Foundry defaults
        models/
          catalog.ts                   # Unified model catalog (all providers)
          openai-models.ts             # OpenAI model definitions + RID map
          anthropic-models.ts          # Anthropic model definitions + RID map
        providers/
          openai.ts                    # createFoundryOpenAI() -- subpath: /openai
          anthropic.ts                 # createFoundryAnthropic() -- subpath: /anthropic
        registry.ts                    # createFoundryRegistry() -- subpath: /registry
        __tests__/
          catalog.test.ts
          middleware.test.ts
          providers.test.ts
          registry.test.ts

    docs/                              # v1.2 -- Astro + Starlight docs/showcase site (placeholder)

  examples/                            # Standalone runnable scripts
    basic-text.ts                      # Simple generateText, both providers
    streaming.ts                       # streamText through Foundry
    tool-calling-exa.ts                # Exa search tool loop (pharma/medtech domain)
    structured-output.ts               # Output.object with zod schemas
    provider-registry.ts              # Using createFoundryRegistry for multi-provider routing
```

---

## User-Facing API

### Direct Provider Access (primary API)

```typescript
import { createFoundryOpenAI } from '@nyrra-labs/foundry-ai/openai';
import { generateText } from 'ai';

const openai = createFoundryOpenAI({
  foundryUrl: process.env.FOUNDRY_URL!,
  token: process.env.FOUNDRY_TOKEN!,
});

const result = await generateText({
  model: openai('gpt-5-mini'),       // Autocomplete for OpenAI models
  prompt: 'Hello',
});
```

```typescript
import { createFoundryAnthropic } from '@nyrra-labs/foundry-ai/anthropic';
import { generateText } from 'ai';

const anthropic = createFoundryAnthropic({
  foundryUrl: process.env.FOUNDRY_URL!,
  token: process.env.FOUNDRY_TOKEN!,
});

const result = await generateText({
  model: anthropic('claude-sonnet-4.6'),   // Autocomplete for Anthropic models
  prompt: 'Hello',
});
```

### Provider Registry (multi-provider routing, opt-in)

Uses AI SDK's `createProviderRegistry` under the hood. Importing this subpath pulls in both provider SDKs -- only use when you need both.

```typescript
import { createFoundryRegistry } from '@nyrra-labs/foundry-ai/registry';
import { generateText } from 'ai';

const registry = createFoundryRegistry({
  foundryUrl: process.env.FOUNDRY_URL!,
  token: process.env.FOUNDRY_TOKEN!,
});

const result = await generateText({
  model: registry.languageModel('openai:gpt-5-mini'),
  prompt: 'Hello',
});

const result2 = await generateText({
  model: registry.languageModel('anthropic:claude-sonnet-4.6'),
  prompt: 'Hello',
});
```

### Raw RID Escape Hatch

Friendly-name convenience only works for models present in this package's shared catalog. If a caller wants passthrough behavior for a model that is not in the catalog, they must provide the Foundry RID directly.

```typescript
// Type system allows any string, so raw RIDs work too
const result = await generateText({
  model: openai('ri.language-model-service..language-model.gpt-5-2'),
  prompt: 'Hello',
});
```

---

## Architecture

### Core Concepts

1. **Model Catalog** -- Static map of friendly names to Foundry RIDs, with per-model metadata (provider, reasoning flag, model class, capabilities). Single source of truth.

2. **Provider Adapters** -- Thin wrappers around `@ai-sdk/openai` and `@ai-sdk/anthropic` that handle Foundry-specific URL construction, auth, RID mapping, and apply middleware. Each lives behind its own subpath export.

3. **Foundry Middleware** -- AI SDK middleware layer (via `wrapLanguageModel`) that auto-applies ZDR-safe defaults and reasoning flags. For tool definitions, it defaults `strict: true` for OpenAI function tools when `strict` is unspecified. It does not apply `strict` for Anthropic, and we should not assume `strict` support for future providers such as Google Gemini or xAI without re-verifying provider behavior.

4. **Provider Registry** -- Opt-in thin wrapper around AI SDK's `createProviderRegistry` at the `/registry` subpath. This follows AI SDK's provider-management pattern for multi-provider routing while avoiding bundling both provider SDKs for users who only need one.

### Subpath Exports

The package uses subpath exports to ensure tree-shaking at the install/import level:

- `@nyrra-labs/foundry-ai` -- Core only: types, catalog, config, errors, middleware. No provider SDKs pulled in.
- `@nyrra-labs/foundry-ai/openai` -- OpenAI adapter. Pulls in `@ai-sdk/openai` only.
- `@nyrra-labs/foundry-ai/anthropic` -- Anthropic adapter. Pulls in `@ai-sdk/anthropic` only.
- `@nyrra-labs/foundry-ai/registry` -- Provider registry helper. Pulls in both provider SDKs (opt-in).

---

## Detailed Component Design

### 1. Type System (`src/types.ts`)

```typescript
// --- Configuration ---
export interface FoundryConfig {
  foundryUrl: string;
  token: string;
  attributionRid?: string;
}

// --- Model ID types (union + string escape hatch) ---
export type OpenAIModelId =
  | 'gpt-4.1' | 'gpt-4.1-mini' | 'gpt-4.1-nano'
  | 'gpt-4o' | 'gpt-4o-mini'
  | 'gpt-5' | 'gpt-5-codex' | 'gpt-5-mini' | 'gpt-5-nano'
  | 'gpt-5.1' | 'gpt-5.1-codex' | 'gpt-5.1-codex-mini'
  | 'gpt-5.2' | 'gpt-5.4'
  | 'o3' | 'o4-mini'
  | (string & {});   // escape hatch for raw RIDs or new models

export type AnthropicModelId =
  | 'claude-3.5-haiku'
  | 'claude-3.7-sonnet'
  | 'claude-haiku-4.5'
  | 'claude-opus-4' | 'claude-opus-4.1' | 'claude-opus-4.5' | 'claude-opus-4.6'
  | 'claude-sonnet-4' | 'claude-sonnet-4.5' | 'claude-sonnet-4.6'
  | (string & {});

// --- Per-model metadata ---
export type ModelProvider = 'openai' | 'anthropic';
export type ModelClass = 'heavyweight' | 'lightweight' | 'reasoning' | 'codex';

export interface ModelMetadata {
  rid: string;                     // Foundry resource identifier
  provider: ModelProvider;
  displayName: string;             // Human-readable name
  modelClass: ModelClass;
  isReasoning: boolean;            // Needs forceReasoning?
  supportsVision: boolean;
  supportsResponses: boolean;      // OpenAI Responses API
  lifecycle: 'ga' | 'experimental' | 'deprecated';
}
```

### 2. Model Catalog (`src/models/`)

#### `openai-models.ts`
Static map of OpenAI friendly names to RIDs + metadata. Derived from the Foundry GraphQL model catalog (44 models total, ~18 OpenAI chat/reasoning models).

```typescript
export const OPENAI_MODELS = {
  'gpt-4.1': {
    rid: 'ri.language-model-service..language-model.gpt-4-1',
    provider: 'openai' as const,
    displayName: 'GPT-4.1',
    modelClass: 'heavyweight' as const,
    isReasoning: false,
    supportsVision: true,
    supportsResponses: true,
    lifecycle: 'ga' as const,
  },
  // ... all other OpenAI models
} as const satisfies Record<string, ModelMetadata>;

export const OPENAI_REASONING_MODELS = new Set([
  'gpt-5', 'gpt-5-mini', 'gpt-5-nano', 'gpt-5.2', 'gpt-5.4', 'o3', 'o4-mini',
]);
```

#### `anthropic-models.ts`
Same pattern for Anthropic models.

#### `catalog.ts`
Merges both catalogs into a unified lookup. This catalog is the source of truth for friendly-name convenience helpers; if a model is not present here, callers must use the raw Foundry RID instead of a friendly alias.

```typescript
export const MODEL_CATALOG: Record<string, ModelMetadata> = {
  ...OPENAI_MODELS,
  ...ANTHROPIC_MODELS,
};

export function resolveModelRid(friendlyName: string): string;
export function resolveModelProvider(friendlyName: string): ModelProvider;
export function getModelMetadata(friendlyName: string): ModelMetadata | undefined;
```

### 3. Provider Adapters (`src/providers/`)

#### `openai.ts` -- `createFoundryOpenAI()`

```typescript
import { createOpenAI } from '@ai-sdk/openai';

export function createFoundryOpenAI(config: FoundryConfig) {
  const provider = createOpenAI({
    apiKey: config.token,
    baseURL: `${config.foundryUrl}/api/v2/llm/proxy/openai/v1`,
    headers: config.attributionRid
      ? { attribution: config.attributionRid }
      : undefined,
    name: 'foundry-openai',
  });

  return (modelId: OpenAIModelId): LanguageModelV3 => {
    const metadata = getModelMetadata(modelId);
    const rid = metadata?.rid ?? modelId; // Pass through if it's already a RID

    const baseModel = provider.responses(rid);

    return wrapWithFoundryMiddleware(baseModel, {
      modelId,
      providerId: 'foundry-openai',
      isReasoning: metadata?.isReasoning ?? false,
    });
  };
}
```

**Key decisions:**
- Uses `provider.responses()` (OpenAI Responses API) not `.chat()` -- this is the modern API
- Wraps with middleware for `forceReasoning`, enforced `store: false`, and default `strict: true` for OpenAI function tools
- Falls through to raw RID if not found in catalog. Unknown strings are treated as raw model IDs; typo-suggestion errors are only for explicit catalog lookup helpers, not the provider adapter escape hatch.

#### `anthropic.ts` -- `createFoundryAnthropic()`

```typescript
import { createAnthropic } from '@ai-sdk/anthropic';

export function createFoundryAnthropic(config: FoundryConfig) {
  const provider = createAnthropic({
    authToken: config.token,  // CRITICAL: authToken sends Authorization: Bearer
    baseURL: `${config.foundryUrl}/api/v2/llm/proxy/anthropic/v1`,
    headers: config.attributionRid
      ? { attribution: config.attributionRid }
      : undefined,
    name: 'foundry-anthropic',
  });

  return (modelId: AnthropicModelId): LanguageModelV3 => {
    const metadata = getModelMetadata(modelId);
    const rid = metadata?.rid ?? modelId;

    return provider(rid);
    // Note: Anthropic through Foundry needs less middleware than OpenAI
    // No forceReasoning needed, no store flag, no strict tool mode
  };
}
```

**Critical auth note:** Foundry Anthropic proxy uses `Authorization: Bearer {token}`. The `@ai-sdk/anthropic` package uses `x-api-key` when given `apiKey`, but `Authorization: Bearer` when given `authToken`. We MUST use `authToken`.

### 4. Foundry Middleware (`src/middleware.ts`)

Strict tool mode is **OpenAI-only** for v1. In AI SDK Core, `strict` is a per-tool option and providers that do not support it ignore it. We only default `strict: true` for OpenAI function tools when the caller has not already specified a value.

```typescript
import { wrapLanguageModel } from 'ai';

export function wrapWithFoundryMiddleware(
  model: LanguageModelV3,
  options: {
    modelId: string;
    providerId: string;
    isReasoning: boolean;
  },
): LanguageModelV3 {
  return wrapLanguageModel({
    model,
    modelId: options.modelId,
    providerId: options.providerId,
    middleware: {
      specificationVersion: 'v3',
      transformParams: async ({ params }) => {
        let transformed = params;

        // 1. Default strict: true on OpenAI function tools when unspecified.
        // Providers that do not support strict mode ignore it, but we do not
        // inject it outside the OpenAI adapter in v1.
        if (options.providerId.includes('openai') && transformed.tools) {
          transformed = {
            ...transformed,
            tools: transformed.tools.map((tool) =>
              tool.type === 'function' && tool.strict == null
                ? { ...tool, strict: true }
                : tool,
            ),
          };
        }

        // 2. Merge OpenAI provider options
        if (options.providerId.includes('openai')) {
          const providerOptions = (transformed.providerOptions ?? {}) as Record<string, Record<string, unknown>>;
          const currentOpenAI = providerOptions.openai ?? {};

          transformed = {
            ...transformed,
            providerOptions: {
              ...providerOptions,
              openai: {
                ...currentOpenAI,
                ...(options.isReasoning ? { forceReasoning: true } : {}),
                store: false,                           // ZDR invariant: never store
              },
            },
          };
        }

        return transformed;
      },
    },
  });
}
```

### 5. Provider Registry (`src/registry.ts`)

Thin opt-in wrapper around AI SDK's `createProviderRegistry`. This subpath intentionally imports both provider SDKs -- users who only need one provider should use the direct provider imports instead.

```typescript
import { createProviderRegistry } from 'ai';
import { createFoundryOpenAI } from './providers/openai';
import { createFoundryAnthropic } from './providers/anthropic';
import type { FoundryConfig } from './types';

export function createFoundryRegistry(config: FoundryConfig) {
  return createProviderRegistry({
    openai: createFoundryOpenAI(config),
    anthropic: createFoundryAnthropic(config),
  });
}
```

**Usage:**
```typescript
const registry = createFoundryRegistry(config);
const model = registry.languageModel('openai:gpt-5-mini');
```

### 6. Config (`src/config.ts`)

```typescript
export function loadFoundryConfig(): FoundryConfig {
  const foundryUrl = requireEnv('FOUNDRY_URL');
  const token = requireEnv('FOUNDRY_TOKEN');
  const attributionRid = optionalEnv('FOUNDRY_ATTRIBUTION_RID');

  return { foundryUrl, token, attributionRid };
}
```

### 7. Error Utilities (`src/errors.ts`)

```typescript
export class FoundryModelNotFoundError extends Error {
  constructor(modelId: string) {
    const suggestions = findClosestModelNames(modelId, 3);
    const hint = suggestions.length
      ? `\n\nDid you mean: ${suggestions.join(', ')}?`
      : '\n\nCheck the model catalog for available models.';
    super(`Unknown model: "${modelId}".${hint}`);
    this.name = 'FoundryModelNotFoundError';
  }
}

export function describeError(error: unknown): string {
  // Chain error.cause up to 5 levels deep
}
```

`FoundryModelNotFoundError` is intended for catalog/helper APIs that validate friendly model names. Friendly-name convenience is limited to models present in the shared catalog. The direct provider adapters still support a passthrough escape hatch, but only when the caller supplies a raw Foundry RID directly.

---

## Foundry-Specific Quirks (Must Handle)

These are verified findings from the research phase:

| Quirk | Impact | How We Handle It |
|-------|--------|-----------------|
| Model IDs are RIDs (`ri.language-model-service..language-model.gpt-5-2`) | Users must know the RID | Friendly name to RID mapping in catalog |
| `@ai-sdk/openai` infers capabilities from model ID strings | Opaque RIDs break reasoning detection | Middleware auto-sets `forceReasoning: true` |
| Anthropic proxy uses `Authorization: Bearer` not `x-api-key` | SDK default auth header is wrong | Use `authToken` not `apiKey` in createAnthropic |
| Strict tool mode is provider-dependent | Applying `strict: true` universally is not portable | Middleware defaults `strict: true` for OpenAI function tools only; other providers are left unchanged |
| ZDR policy -- no data retention | `store: true` would violate policy or fail through Foundry | Middleware enforces `store: false` for OpenAI |
| `response.output_text` may be undefined on OpenAI responses | Users can't rely on convenience accessor | Not our problem (handled by AI SDK) |
| `previous_response_id` may not work | Tool continuation via response IDs may fail | Document as unsupported |
| `responses.retrieve` may not work | Can't retrieve past responses (ZDR) | Document as unsupported |
| OAuth client credentials returns `unauthorized_client` | Can't use machine-to-machine OAuth | Document: use app-scoped bearer tokens only |

---

## Dependencies

### Optional Peer Dependencies (user installs only what they need)
```json
{
  "@ai-sdk/openai": "^3.0.48",
  "@ai-sdk/anthropic": "^3.0.64"
}
```

Users who only use the OpenAI adapter install `@ai-sdk/openai`; users who only use Anthropic install `@ai-sdk/anthropic`. Users of the `/registry` subpath need both. pnpm will not nag about the missing optional peer.

### Peer Dependencies (required)
```json
{
  "ai": "^6.0.138"
}
```

### Dev Dependencies (root-level in monorepo)
```json
{
  "nx": "^21.0.0",
  "tsup": "^8.0.0",
  "typescript": "^5.8.0",
  "vitest": "^3.2.0",
  "@biomejs/biome": "^2.3.0"
}
```

---

## Build Configuration

### tsup (multi-entry for subpath exports)

```typescript
// packages/foundry-ai/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'providers/openai': 'src/providers/openai.ts',
    'providers/anthropic': 'src/providers/anthropic.ts',
    registry: 'src/registry.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2022',
  outDir: 'dist',
  external: ['ai', '@ai-sdk/openai', '@ai-sdk/anthropic'],
});
```

### package.json exports

```json
{
  "name": "@nyrra-labs/foundry-ai",
  "type": "module",
  "sideEffects": false,
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./openai": {
      "import": "./dist/providers/openai.mjs",
      "require": "./dist/providers/openai.cjs",
      "types": "./dist/providers/openai.d.ts"
    },
    "./anthropic": {
      "import": "./dist/providers/anthropic.mjs",
      "require": "./dist/providers/anthropic.cjs",
      "types": "./dist/providers/anthropic.d.ts"
    },
    "./registry": {
      "import": "./dist/registry.mjs",
      "require": "./dist/registry.cjs",
      "types": "./dist/registry.d.ts"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "peerDependencies": {
    "ai": "^6.0.138",
    "@ai-sdk/openai": "^3.0.48",
    "@ai-sdk/anthropic": "^3.0.64"
  },
  "peerDependenciesMeta": {
    "@ai-sdk/openai": { "optional": true },
    "@ai-sdk/anthropic": { "optional": true }
  }
}
```

---

## nx Configuration

### Task Graph

nx manages build, test, lint, and release across the monorepo:

- `pnpm nx run foundry-ai:build` -- tsup multi-entry build
- `pnpm nx run foundry-ai:test` -- vitest
- `pnpm nx run foundry-ai:lint` -- biome check
- `pnpm nx run foundry-ai:typecheck` -- tsc --noEmit
- `pnpm nx release` -- versioning, changelog, npm publish

### nx Release

Single-package release workflow using nx release:

```jsonc
// nx.json (partial)
{
  "release": {
    "groups": {
      "npm-packages": {
        "projects": ["foundry-ai"],
        "projectsRelationship": "fixed",
        "releaseTag": {
          "pattern": "@nyrra-labs/foundry-ai@{version}"
        }
      }
    },
    "version": {
      "adjustSemverBumpsForZeroMajorVersion": true,
      "conventionalCommits": true,
      "preserveLocalDependencyProtocols": true
    },
    "changelog": {
      "automaticFromRef": true,
      "workspaceChangelog": false,
      "projectChangelogs": true
    }
  }
}
```

### Deferred: Prismantix-Style `next` Prereleases

Do not implement the full Prismantix Maker prerelease workflow in Phase 1 unless release automation is needed immediately. This repo does not yet have GitHub Actions release automation or npm trusted publishing configured, so a partial copy would create local-only release behavior without the CI path that makes it valuable.

When release automation is added, mirror the Prismantix pattern in a single-package form:

- pushes to `main` publish `next` prereleases automatically without committing prerelease version bumps back to the protected branch
- prerelease versions are resolved from the stable manifest version plus the current npm `next` dist-tag, so repeated prereleases advance as `0.0.2-next.0`, `0.0.2-next.1`, etc.
- manual workflow dispatch remains the stable-release path that publishes `latest`, creates the git tag, and pushes the stable version bump
- prerelease version resolution should be npm-backed rather than git-backed, because CI-generated prerelease commits are intentionally ephemeral
- the helper script can stay single-package and only needs to inspect `packages/foundry-ai/package.json` plus the npm `latest` and `next` dist-tags for `@nyrra-labs/foundry-ai`

---

## Examples (`examples/`)

### `basic-text.ts`
Simple generateText with OpenAI and Anthropic through Foundry using direct provider imports.

### `streaming.ts`
streamText with real-time token streaming through Foundry proxy.

### `tool-calling-exa.ts` (Pharma/MedTech Domain)
Exa search tool loop demonstrating:
- FDA guidance search
- Clinical trial data lookup
- Drug interaction analysis
- Uses `@exalabs/ai-sdk` for web search
- Domain: pharma regulatory intelligence (Nyrra expertise showcase)

### `structured-output.ts`
Using `Output.object` with zod schemas for structured clinical data extraction.

### `provider-registry.ts`
Using `createFoundryRegistry` for multi-provider routing -- same config, multiple models across providers via AI SDK's provider management pattern.

---

## Testing Strategy

### Unit Tests (`packages/foundry-ai/src/__tests__/`)

1. **Model catalog tests**
   - RID resolution for all known models
   - Provider detection (friendly name -> correct provider)
   - String escape hatch (raw RIDs pass through)
   - Closest-match suggestions for typos

2. **Middleware tests**
   - `strict: true` defaulted onto function tools for OpenAI provider only when `strict` is unspecified
   - Explicit tool `strict` values are preserved
   - `strict` is NOT injected for Anthropic provider
   - `store: false` is enforced for OpenAI even if the caller tries to override it
   - `forceReasoning: true` for reasoning models
   - Non-ZDR OpenAI provider options are preserved

3. **Provider tests**
   - OpenAI adapter constructs correct baseURL
   - Anthropic adapter uses `authToken` (not `apiKey`)
   - RID resolution from friendly name
   - Raw RID passthrough

4. **Registry tests**
   - `openai:model` routes to OpenAI adapter
   - `anthropic:model` routes to Anthropic adapter

5. **Type tests** (compile-time)
   - Autocomplete includes all known models
   - String escape hatch allows arbitrary strings

### Integration Tests (not in CI -- require live Foundry)
- `examples/` serve as integration test scripts
- Run manually with `npx tsx examples/basic-text.ts`

---

## v1 Scope

### In Scope
- OpenAI provider adapter (Responses API) at `/openai` subpath
- Anthropic provider adapter (Messages API) at `/anthropic` subpath
- Provider registry helper at `/registry` subpath (uses AI SDK's `createProviderRegistry`)
- Model catalog with friendly names and RID mapping
- Middleware for ZDR defaults and reasoning detection (strict tools OpenAI-only)
- Type-safe model selection with autocomplete + escape hatch
- nx monorepo with pnpm workspaces
- nx release for versioning, changelog, npm publish
- In-repo examples: basic-text, streaming, Exa tool-calling, structured-output, provider-registry
- npm publish as public package under @nyrra-labs

### v1.1
- Just-bash agentic tool-calling example (`examples/just-bash-report.ts`)

### v1.2
- Astro + Starlight docs/showcase site in `packages/docs/` (interactive demos via islands)

### Out of Scope (Phase 2+)
- Google Gemini provider adapter
- xAI provider adapter
- Embedding model support
- OpenAI Chat Completions (legacy) -- only Responses API
- OSDK/platformClient integration (optional advanced mode)
- Dynamic model catalog (fetching from Foundry at runtime)

---

## Verification Checklist

- [ ] `pnpm nx run foundry-ai:lint` passes (biome)
- [ ] `pnpm nx run foundry-ai:test` passes (vitest)
- [ ] `pnpm nx run foundry-ai:build` produces dist/ with correct subpath outputs (ESM + CJS + .d.ts per entrypoint)
- [ ] `npm pack` in package dir produces clean tarball with only dist/
- [ ] Import from `/openai` does NOT pull in `@ai-sdk/anthropic`
- [ ] Import from `/anthropic` does NOT pull in `@ai-sdk/openai`
- [ ] TypeScript autocomplete works for model IDs in VS Code
- [ ] Raw RID strings are accepted without type errors
- [ ] Middleware injects `forceReasoning: true` for reasoning models
- [ ] Middleware injects `store: false` for all OpenAI requests
- [ ] Middleware defaults `strict: true` on OpenAI function tools when `strict` is unspecified
- [ ] Middleware preserves explicit tool `strict` values
- [ ] Middleware does NOT inject `strict` for Anthropic
- [ ] `createFoundryRegistry` correctly routes `openai:model` and `anthropic:model`
- [ ] Catalog/helper validation produces helpful typo suggestions without breaking raw RID passthrough in provider adapters
- [ ] `pnpm nx release` generates changelog and publishes to npm

---

## Model Catalog Reference (from Foundry GraphQL, March 2026)

### OpenAI Models

| Friendly Name | Foundry RID | Class | Reasoning | Lifecycle |
|--------------|-------------|-------|-----------|-----------|
| gpt-4.1 | ri.language-model-service..language-model.gpt-4-1 | heavyweight | no | GA |
| gpt-4.1-mini | ri.language-model-service..language-model.gpt-4-1-mini | lightweight | no | GA |
| gpt-4.1-nano | ri.language-model-service..language-model.gpt-4-1-nano | lightweight | no | GA |
| gpt-4o | ri.language-model-service..language-model.gpt-4-o | heavyweight | no | GA |
| gpt-4o-mini | ri.language-model-service..language-model.gpt-4-o-mini | lightweight | no | GA |
| gpt-5 | ri.language-model-service..language-model.gpt-5 | heavyweight | yes | GA |
| gpt-5-codex | ri.language-model-service..language-model.gpt-5-codex | codex | no | GA |
| gpt-5-mini | ri.language-model-service..language-model.gpt-5-mini | lightweight | yes | GA |
| gpt-5-nano | ri.language-model-service..language-model.gpt-5-nano | lightweight | yes | GA |
| gpt-5.1 | ri.language-model-service..language-model.gpt-5-1 | heavyweight | no | GA |
| gpt-5.1-codex | ri.language-model-service..language-model.gpt-5-1-codex | codex | no | GA |
| gpt-5.1-codex-mini | ri.language-model-service..language-model.gpt-5-1-codex-mini | codex | no | GA |
| gpt-5.2 | ri.language-model-service..language-model.gpt-5-2 | heavyweight | yes | experimental |
| gpt-5.4 | ri.language-model-service..language-model.gpt-5-4 | heavyweight | yes | experimental |
| o3 | ri.language-model-service..language-model.o-3 | reasoning | yes | GA |
| o4-mini | ri.language-model-service..language-model.o-4-mini | reasoning | yes | GA |

### Anthropic Models

| Friendly Name | Foundry RID | Class | Lifecycle |
|--------------|-------------|-------|-----------|
| claude-3.5-haiku | ri.language-model-service..language-model.anthropic-claude-3-5-haiku | lightweight | GA |
| claude-3.7-sonnet | ri.language-model-service..language-model.anthropic-claude-3-7-sonnet | heavyweight | GA |
| claude-haiku-4.5 | ri.language-model-service..language-model.anthropic-claude-4-5-haiku | lightweight | GA |
| claude-opus-4 | ri.language-model-service..language-model.anthropic-claude-4-opus | heavyweight | GA |
| claude-opus-4.1 | ri.language-model-service..language-model.anthropic-claude-4-1-opus | heavyweight | GA |
| claude-opus-4.5 | ri.language-model-service..language-model.anthropic-claude-4-5-opus | heavyweight | GA |
| claude-opus-4.6 | ri.language-model-service..language-model.anthropic-claude-4-6-opus | heavyweight | GA |
| claude-sonnet-4 | ri.language-model-service..language-model.anthropic-claude-4-sonnet | heavyweight | GA |
| claude-sonnet-4.5 | ri.language-model-service..language-model.anthropic-claude-4-5-sonnet | heavyweight | GA |
| claude-sonnet-4.6 | ri.language-model-service..language-model.anthropic-claude-4-6-sonnet | heavyweight | GA |

### Embedding Models (Phase 2)

| Friendly Name | Foundry RID |
|--------------|-------------|
| text-embedding-3-small | ri.language-model-service..language-model.text-embedding-3-small_azure |
| text-embedding-3-large | ri.language-model-service..language-model.text-embedding-3-large_azure |
| text-embedding-ada-002 | ri.language-model-service..language-model.text-embedding-ada-002_azure |

### Google Gemini Models (Phase 2)

| Friendly Name | Foundry RID |
|--------------|-------------|
| gemini-2.5-flash | ri.language-model-service..language-model.gemini-2-5-flash |
| gemini-2.5-flash-lite | ri.language-model-service..language-model.gemini-2-5-flash-lite |
| gemini-2.5-pro | ri.language-model-service..language-model.gemini-2-5-pro |
| gemini-3-flash | ri.language-model-service..language-model.gemini-3-flash |
| gemini-3-pro | ri.language-model-service..language-model.gemini-3-pro |
| gemini-3.1-flash-lite | ri.language-model-service..language-model.gemini-3-1-flash-lite |
| gemini-3.1-pro | ri.language-model-service..language-model.gemini-3-1-pro |

---

## Proxy Endpoints Reference

| Provider | Foundry Proxy Path | Auth Header |
|----------|-------------------|-------------|
| OpenAI Responses | `/api/v2/llm/proxy/openai/v1` | `Authorization: Bearer {FOUNDRY_TOKEN}` |
| OpenAI Chat Completions | `/api/v2/llm/proxy/openai/v1` | `Authorization: Bearer {FOUNDRY_TOKEN}` |
| OpenAI Embeddings | `/api/v2/llm/proxy/openai/v1` | `Authorization: Bearer {FOUNDRY_TOKEN}` |
| Anthropic Messages | `/api/v2/llm/proxy/anthropic/v1` | `Authorization: Bearer {FOUNDRY_TOKEN}` |
| xAI Chat | `/api/v2/llm/proxy/xai/v1` | `Authorization: Bearer {FOUNDRY_TOKEN}` |
| Google GenerateContent | `/api/v2/llm/proxy/google/v1` | `Authorization: Bearer {FOUNDRY_TOKEN}` |

**Note on Anthropic**: `@ai-sdk/anthropic` sends `x-api-key` when using `apiKey` option. For Foundry, we MUST use `authToken` option which sends `Authorization: Bearer`. This was empirically verified in the research phase.

---

## Implementation Order

1. Monorepo scaffold -- `nx.json`, `pnpm-workspace.yaml`, root `package.json`, `tsconfig.base.json`, `biome.json`
2. Package skeleton -- `packages/foundry-ai/package.json` with subpath exports, `tsup.config.ts` (multi-entry), `tsconfig.json`, `vitest.config.ts`
3. `src/types.ts` -- All type definitions
4. `src/models/openai-models.ts` -- OpenAI catalog
5. `src/models/anthropic-models.ts` -- Anthropic catalog
6. `src/models/catalog.ts` -- Unified catalog + resolution functions
7. `src/errors.ts` -- Error types + fuzzy match suggestions
8. `src/config.ts` -- Env var loading
9. `src/middleware.ts` -- Foundry middleware (strict tools OpenAI-only, store, reasoning)
10. `src/providers/openai.ts` -- createFoundryOpenAI
11. `src/providers/anthropic.ts` -- createFoundryAnthropic
12. `src/registry.ts` -- createFoundryRegistry (thin wrapper around AI SDK provider registry)
13. `src/index.ts` -- Root exports (core only -- types, catalog, config, errors, middleware)
14. Tests for catalog, middleware, providers, registry
15. `examples/` -- basic-text, streaming, tool-calling-exa, structured-output, provider-registry
16. nx release config
17. README.md
18. `packages/docs/` placeholder for v1.2

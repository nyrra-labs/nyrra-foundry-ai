# @nyrra/foundry-ai Specification

## Summary

`@nyrra/foundry-ai` is a small TypeScript package that adapts Palantir Foundry LLM proxy endpoints to the Vercel AI SDK. The package is intentionally thin:

- provider factories only for OpenAI and Anthropic
- a shared alias-to-RID catalog with reverse RID lookup
- no published registry helper
- explicit handling for known Foundry OpenAI compatibility gaps

The package does not try to invent a separate request API. Callers should continue using standard AI SDK `generateText`, `streamText`, `providerOptions`, tools, and structured output flows.

## Published API

### Root entrypoint

`@nyrra/foundry-ai` exports:

- `loadFoundryConfig()`
- `FoundryModelNotFoundError`
- `MODEL_CATALOG`
- `MODEL_CATALOG_BY_RID`
- `getModelMetadata()`
- `hasKnownModel()`
- `resolveKnownModelMetadata()`
- `resolveModelProvider()`
- `resolveModelRid()`
- `resolveModelTarget()`
- type exports for `FoundryConfig`, `OpenAIModelId`, `AnthropicModelId`, `KnownOpenAIModelId`, `KnownAnthropicModelId`, `KnownModelId`, `ModelMetadata`, `ModelProvider`, `ModelLifecycle`, and `ResolvedModelTarget`

### Provider entrypoints

- `@nyrra/foundry-ai/openai` exports `createFoundryOpenAI`
- `@nyrra/foundry-ai/anthropic` exports `createFoundryAnthropic`

There is no `@nyrra/foundry-ai/registry` export. Multi-provider routing belongs in application code with AI SDK `createProviderRegistry`.
The package is still pre-1.0, and the thin-adapter contract intentionally removes the older registry, middleware, and formatter helper exports instead of preserving them behind compatibility shims.

## Provider Behavior

### Shared behavior

- Both providers validate `foundryUrl` and `token` at runtime.
- Both providers normalize trailing slashes in `foundryUrl`.
- Friendly aliases are resolved through the catalog.
- Unknown strings pass through as raw Foundry RIDs.
- Wrapped models expose the caller-facing alias as `model.modelId` when an alias was used.

### OpenAI-specific behavior

Foundry OpenAI requires minimal compatibility handling because the underlying SDK sees opaque RIDs instead of OpenAI model IDs.

- The adapter always sends `providerOptions.openai.store = false`.
- If a caller explicitly sets `providerOptions.openai.store = true`, the adapter throws a clear error before the request is sent.
- For catalogued OpenAI reasoning targets, the adapter adds `providerOptions.openai.forceReasoning = true` only when the caller did not already provide `forceReasoning`.
- OpenAI function tools default to `strict = true` only when the caller left `strict` unspecified. Explicit `strict` values are preserved.

For uncatalogued OpenAI reasoning RIDs, the package cannot infer reasoning capability. Callers must set `providerOptions.openai.forceReasoning = true` explicitly when needed.

### Anthropic-specific behavior

- The adapter uses `authToken`, not `apiKey`, so requests go out as `Authorization: Bearer`.
- The adapter does not rewrite Anthropic provider options.
- Capability differences that vary by Foundry stack or model stay documented in examples and README instead of being guessed at runtime.

## Catalog Design

The public catalog contains only stable cross-provider metadata:

- `rid`
- `provider`
- `displayName`
- `supportsVision`
- `supportsResponses`
- `lifecycle`

Behavior-driving compatibility flags are kept out of the public metadata contract unless they can be represented accurately and maintained reliably.

## Example Registry Composition

Application code should compose multi-provider routing directly:

```ts
import { loadFoundryConfig } from '@nyrra/foundry-ai';
import { createFoundryAnthropic } from '@nyrra/foundry-ai/anthropic';
import { createFoundryOpenAI } from '@nyrra/foundry-ai/openai';
import { createProviderRegistry } from 'ai';

const config = loadFoundryConfig();
const registry = createProviderRegistry({
  anthropic: createFoundryAnthropic(config),
  openai: createFoundryOpenAI(config),
});
```

## Testing Requirements

- unit tests for config validation and normalization
- unit tests for alias and raw RID resolution
- unit tests for OpenAI compatibility defaults and explicit `store=true` failure
- unit tests for reverse RID lookup export
- unit tests for application-level `createProviderRegistry` composition using the public provider factories
- live verification for direct OpenAI and Anthropic calls, plus registry composition via AI SDK

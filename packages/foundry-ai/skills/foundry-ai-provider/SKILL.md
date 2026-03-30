---
name: foundry-ai-provider
description: Use when wiring @nyrra/foundry-ai into an app that should call Palantir Foundry LLM proxy endpoints through the AI SDK. Covers env setup, provider peer selection, alias vs RID routing, OpenAI compatibility rules, Google beta caveats, and when to avoid unverified Foundry-native runtimes.
---

# Foundry AI Provider

## Use this skill when

- adding `@nyrra/foundry-ai` to an app
- replacing direct public provider calls with Foundry proxy endpoints
- troubleshooting alias vs RID behavior or provider-specific Foundry caveats

## Quick start

1. Install `@nyrra/foundry-ai`, `ai`, and only the provider peer dependency you need.
2. Load config from `FOUNDRY_URL`, `FOUNDRY_TOKEN`, and optional `FOUNDRY_ATTRIBUTION_RID`.
3. Import only the provider subpath you need: `openai`, `anthropic`, or `google`.
4. Use a known alias when the model is in the package catalog. Use a raw Foundry RID when it is not.
5. Compose multi-provider routing in application code with AI SDK `createProviderRegistry`.

## Constraints

- Treat this as server-side infrastructure. Do not expose Foundry tokens in browser code.
- The verified package path today is env-based server usage.
- Do not claim support for Palantir TSv1/TSv2 standalone functions or `PlatformClient` fetch wiring without validating that runtime first.
- Do not add compatibility shims for removed package exports such as a registry helper.

## Read these references when needed

- `references/examples/provider-registry.ts`: minimal multi-provider registry composition
- `references/examples/tool-calling.ts`: tight blocking tool-call example
- `references/examples/tool-calling-streaming.ts`: tight streaming tool-call example
- `references/runtime-setup.md`: env-based setup and Foundry-native runtime caveats
- `references/provider-behavior.md`: peer deps, alias vs RID behavior, and provider-specific constraints

The `references/examples/*.ts` files are the source of truth. The repo-root `examples/` entries are thin wrappers so the published skill and local runnable examples stay in sync.

## Common mistakes

- installing all provider peers instead of only the ones the app imports
- setting `providerOptions.openai.store = true`
- assuming Google support is as stable as OpenAI or Anthropic
- expecting embedding or image methods from this package
- claiming Foundry-native runtime support because the proxy family exists in Palantir docs

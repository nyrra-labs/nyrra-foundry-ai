# @nyrra-labs/foundry-ai

Typed TypeScript SDK for Palantir Foundry's LLM proxy endpoints, built on the Vercel AI SDK.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![AI%20SDK](https://img.shields.io/badge/AI%20SDK-6.0.138-000000?logo=vercel&logoColor=white)](https://sdk.vercel.ai/)
[![Nx](https://img.shields.io/badge/Nx-21.0.0-143055?logo=nx&logoColor=white)](https://nx.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-10.24.0-f69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Biome](https://img.shields.io/badge/Biome-2.3.0-60a5fa)](https://biomejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-3.2.0-6e9f18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![License](https://img.shields.io/badge/license-MIT-0f172a)](./LICENSE)

## What It Does

- Maps friendly model names such as `gpt-5-mini` and `claude-sonnet-4.6` to Foundry RIDs.
- Exposes isolated provider subpaths so OpenAI and Anthropic installs stay separate by default.
- Applies Foundry-safe OpenAI middleware defaults: `store: false`, strict function tools when unspecified, and reasoning flags for reasoning models.
- Preserves a raw RID escape hatch when a model is not yet in the catalog.
- Ships a thin provider registry wrapper for explicit multi-provider routing.

## How It Works

The root package exports shared catalog, config, error, and middleware utilities. Provider adapters live behind subpath exports:

- `@nyrra-labs/foundry-ai` for core types and helpers
- `@nyrra-labs/foundry-ai/openai` for the OpenAI-compatible Foundry adapter
- `@nyrra-labs/foundry-ai/anthropic` for the Anthropic-compatible Foundry adapter
- `@nyrra-labs/foundry-ai/registry` for AI SDK provider registry routing across both providers

`/openai` only pulls in `@ai-sdk/openai`, `/anthropic` only pulls in `@ai-sdk/anthropic`, and `/registry` intentionally pulls in both.

## Testing and CI

| Layer | Present | Tooling | Runs in CI |
|---|---|---|---|
| unit | yes | Vitest | no |
| integration | no | none | no |
| e2e api | yes | Vitest live tests + manual `tsx` example scripts against live Foundry | no |
| e2e web | no | none | no |

This repo does not have CI configured yet. Live API verification is manual and requires Foundry credentials. Use `pnpm test:live` for the live Vitest suite or run the standalone scripts in [`examples/`](./examples).

## Quick Start

Install the package plus the provider peer dependency you plan to use:

```bash
pnpm add @nyrra-labs/foundry-ai ai @ai-sdk/openai
```

Set the required environment variables:

```bash
FOUNDRY_URL=https://your-stack.palantirfoundry.com
FOUNDRY_TOKEN=your-token
FOUNDRY_ATTRIBUTION_RID=
```

Use the OpenAI path end to end:

```ts
import { loadFoundryConfig } from '@nyrra-labs/foundry-ai';
import { createFoundryOpenAI } from '@nyrra-labs/foundry-ai/openai';
import { generateText } from 'ai';

const openai = createFoundryOpenAI(loadFoundryConfig());

const result = await generateText({
  model: openai('gpt-5-mini'),
  prompt: 'Summarize why typed Foundry model aliases are useful.',
});

console.log(result.text);
```

## API Surface

Core exports from `@nyrra-labs/foundry-ai`:

- `loadFoundryConfig()` and `normalizeFoundryUrl()`
- `FoundryModelNotFoundError` and `describeError()`
- `wrapWithFoundryMiddleware()`
- model catalogs and resolution helpers such as `MODEL_CATALOG`, `resolveModelRid()`, and `resolveModelTarget()`
- public types including `FoundryConfig`, `OpenAIModelId`, and `AnthropicModelId`

Provider-specific entrypoints:

```ts
import { createFoundryOpenAI } from '@nyrra-labs/foundry-ai/openai';
import { createFoundryAnthropic } from '@nyrra-labs/foundry-ai/anthropic';
import { createFoundryRegistry } from '@nyrra-labs/foundry-ai/registry';
```

Friendly names resolve through the shared catalog. Unknown strings pass through unchanged as raw Foundry RIDs when you call a provider adapter directly. Catalog-only helpers such as `resolveModelRid()` throw `FoundryModelNotFoundError` with a plain validation message.

## Examples

The repo includes runnable scripts for the first vertical slice and the registry path:

- [`examples/basic-text.ts`](./examples/basic-text.ts)
- [`examples/streaming.ts`](./examples/streaming.ts)
- [`examples/structured-output.ts`](./examples/structured-output.ts)
- [`examples/tool-calling-exa.ts`](./examples/tool-calling-exa.ts)
- [`examples/provider-registry.ts`](./examples/provider-registry.ts)

Run them from the repo root:

```bash
node --env-file=.env.local --import tsx examples/basic-text.ts openai
node --env-file=.env.local --import tsx examples/basic-text.ts anthropic
node --env-file=.env.local --import tsx examples/provider-registry.ts
```

`examples/tool-calling-exa.ts` also requires `EXA_API_KEY`.

## Development

Install dependencies and use the root scripts:

```bash
pnpm install
pnpm clean
pnpm format
pnpm lint
pnpm test
pnpm test:live
pnpm typecheck
pnpm build
```

For direct Nx targets:

```bash
NX_DAEMON=false pnpm exec nx run foundry-ai:lint
NX_DAEMON=false pnpm exec nx run foundry-ai:test
NX_DAEMON=false pnpm exec nx run foundry-ai:test-live
NX_DAEMON=false pnpm exec nx run foundry-ai:typecheck
NX_DAEMON=false pnpm exec nx run foundry-ai:build
```

## External Services

- Required: a Palantir Foundry stack with access to the LLM proxy endpoints
- Optional: Exa for the tool-calling example

## License

MIT. See [LICENSE](./LICENSE).

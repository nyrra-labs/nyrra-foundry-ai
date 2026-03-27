# @nyrra-labs/foundry-ai

Thin Foundry provider adapters and model catalog for the Vercel AI SDK.

[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![AI%20SDK](https://img.shields.io/badge/AI%20SDK-6.0.140-000000?logo=vercel&logoColor=white)](https://sdk.vercel.ai/)
[![Nx](https://img.shields.io/badge/Nx-22.6.2-143055?logo=nx&logoColor=white)](https://nx.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-10.24.0-f69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Biome](https://img.shields.io/badge/Biome-2.4.9-60a5fa)](https://biomejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1.2-6e9f18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![CI](https://github.com/nyrra-labs/nyrra-foundry-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/nyrra-labs/nyrra-foundry-ai/actions/workflows/ci.yml)
[![Semgrep](https://github.com/nyrra-labs/nyrra-foundry-ai/actions/workflows/semgrep.yml/badge.svg)](https://github.com/nyrra-labs/nyrra-foundry-ai/actions/workflows/semgrep.yml)
[![DeepWiki](https://img.shields.io/badge/DeepWiki-nyrra--labs%2Fnyrra--foundry--ai-blue.svg)](https://deepwiki.com/nyrra-labs/nyrra-foundry-ai)
[![License](https://img.shields.io/badge/license-MIT-0f172a)](./LICENSE)

## What It Does

- Maps friendly model names such as `gpt-5-mini` and `claude-sonnet-4.6` to Foundry RIDs.
- Exposes isolated provider subpaths so OpenAI and Anthropic installs stay separate by default.
- Applies only the OpenAI compatibility defaults required by Foundry RID routing: `store: false`, `forceReasoning: true` for catalogued OpenAI reasoning targets unless the caller already set `forceReasoning`, and `strict: true` for function tools when the caller left `strict` unspecified.
- Preserves a raw RID escape hatch when a model is not yet in the catalog.
- Exposes both alias and reverse-RID catalog lookups for app-level validation and routing.

## Package Contract

The published surface is intentionally small:

- `@nyrra-labs/foundry-ai` exports config loading, catalog helpers, errors, and model ID types.
- `@nyrra-labs/foundry-ai/openai` exports `createFoundryOpenAI`.
- `@nyrra-labs/foundry-ai/anthropic` exports `createFoundryAnthropic`.

There is no published registry helper. Multi-provider routing stays as an application-level example built with AI SDK `createProviderRegistry`.
This package is still pre-1.0. Legacy exports from the earlier wrapper-heavy shape such as the registry helper, middleware wrapper, and formatter helpers are intentionally removed instead of being carried forward behind compatibility shims.

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

Use Anthropic the same way:

```ts
import { loadFoundryConfig } from '@nyrra-labs/foundry-ai';
import { createFoundryAnthropic } from '@nyrra-labs/foundry-ai/anthropic';
import { generateText } from 'ai';

const anthropic = createFoundryAnthropic(loadFoundryConfig());

const result = await generateText({
  model: anthropic('claude-sonnet-4.6'),
  prompt: 'Summarize why typed Foundry model aliases are useful.',
});

console.log(result.text);
```

## Multi-Provider Routing Example

Compose AI SDK's registry in application code when you need both providers:

```ts
import { loadFoundryConfig } from '@nyrra-labs/foundry-ai';
import { createFoundryAnthropic } from '@nyrra-labs/foundry-ai/anthropic';
import { createFoundryOpenAI } from '@nyrra-labs/foundry-ai/openai';
import { createProviderRegistry, generateText } from 'ai';

const config = loadFoundryConfig();
const registry = createProviderRegistry({
  anthropic: createFoundryAnthropic(config),
  openai: createFoundryOpenAI(config),
});

const result = await generateText({
  model: registry.languageModel('openai:gpt-5-mini'),
  prompt: 'Reply with one sentence.',
});
```

## Explicit OpenAI Compatibility Rules

- `providerOptions.openai.store=true` throws before the request is sent. The adapter always uses `store: false` for Foundry OpenAI traffic.
- Catalogued OpenAI reasoning aliases automatically get `providerOptions.openai.forceReasoning=true` unless the caller already set `forceReasoning`.
- Unknown OpenAI reasoning RIDs are not guessable. If you pass a new opaque RID for a reasoning model, set `providerOptions.openai.forceReasoning=true` explicitly.
- OpenAI function tools default to `strict: true` only when the caller did not set `strict`. Explicit `strict` values are preserved.

## API Surface

Core exports from `@nyrra-labs/foundry-ai`:

- `loadFoundryConfig()`
- `FoundryModelNotFoundError`
- `MODEL_CATALOG` and `MODEL_CATALOG_BY_RID`
- catalog helpers such as `getModelMetadata()`, `resolveModelRid()`, and `resolveModelTarget()`
- public types including `FoundryConfig`, `OpenAIModelId`, `AnthropicModelId`, `KnownOpenAIModelId`, `KnownAnthropicModelId`, and `KnownModelId`

Provider-specific entrypoints:

```ts
import { createFoundryOpenAI } from '@nyrra-labs/foundry-ai/openai';
import { createFoundryAnthropic } from '@nyrra-labs/foundry-ai/anthropic';
```

Friendly names resolve through the shared catalog. Unknown strings pass through unchanged as raw Foundry RIDs when you call a provider adapter directly. Catalog-only helpers such as `resolveModelRid()` throw `FoundryModelNotFoundError` with a plain validation message.

## Examples

The repo includes runnable scripts for direct provider usage and registry composition:

- [`examples/basic-text.ts`](./examples/basic-text.ts)
- [`examples/streaming.ts`](./examples/streaming.ts)
- [`examples/structured-output.ts`](./examples/structured-output.ts)
- [`examples/tool-calling-exa.ts`](./examples/tool-calling-exa.ts)
- [`examples/provider-registry.ts`](./examples/provider-registry.ts)
- [`examples/README.md`](./examples/README.md)

Run them from the repo root. For a safe run that rebuilds the package first, use:

```bash
pnpm run example basic-text openai
```

```bash
pnpm run example streaming anthropic
```

```bash
pnpm run example provider-registry
```

If you want the shortest path, Bun works directly too:

```bash
bun examples/basic-text.ts openai
```

```bash
bun examples/provider-registry.ts
```

## Verified Provider Options

Observed on March 26, 2026 against this Foundry stack:

| Provider | Model | Verified live options |
|---|---|---|
| OpenAI | `gpt-5-mini` | `reasoningEffort`, `textVerbosity` |
| Anthropic | `claude-sonnet-4.6` | `thinking`, `sendReasoning`, `effort`, `toolStreaming`, `disableParallelToolUse` |
| Anthropic | `claude-haiku-4.5` | basic text, raw RID, streaming, structured output |

The Anthropic AI SDK exposes more knobs than this Foundry stack accepts uniformly across models. During live verification on March 26, 2026, `claude-haiku-4.5` rejected Anthropic `effort` because Foundry rejected the proxied `output_config` payload. That is why the richer Anthropic reasoning and tool examples default to `claude-sonnet-4.6`.

## Testing and CI

| Layer | Present | Tooling | Runs in CI |
|---|---|---|---|
| unit | yes | Vitest | yes |
| integration | no | none | no |
| e2e api | yes | Vitest live tests + manual Bun/Node example scripts against live Foundry | no |
| e2e web | no | none | no |

GitHub Actions runs CI checks on `main` and pull requests, Semgrep on pull requests plus scheduled/manual runs, and manual release workflows for stable/prerelease publishing. Live API verification still requires Foundry credentials and remains manual through `pnpm test:live` or the standalone scripts in [`examples/`](./examples).

## Development

Install dependencies and use the root scripts:

```bash
pnpm install
pnpm clean
pnpm lint
pnpm test
pnpm test:live
pnpm typecheck
pnpm build
```

For direct Nx targets:

```bash
pnpm exec nx run foundry-ai:lint --outputStyle=static
pnpm exec nx run foundry-ai:test --outputStyle=static
pnpm exec nx run foundry-ai:typecheck --outputStyle=static
pnpm exec nx run foundry-ai:build --outputStyle=static
```

## Releasing

Release automation is wired through manual GitHub Actions workflows:

- `Release` publishes either a stable npm release or a prerelease build from `main`

The workflow runs lint, unit tests, typecheck, and build before it cuts a release commit or publishes to npm.

Before the first publish:

- make sure GitHub Actions can push release commits and tags back to `main`
- do a one-time bootstrap publish from a maintainer machine so the package exists on npm
- configure npm trusted publishing for this repo's `release.yml` workflow
- run the workflow once with `first_release=true`

This repo is set up for npm trusted publishing, not a long-lived `NPM_TOKEN`. After the bootstrap publish, future releases should come from GitHub Actions with npm OIDC and provenance instead of a stored publish token.

Bootstrap publish command:

```bash
cd packages/foundry-ai
npm publish --access public
```

For the full release checklist and workflow behavior, see [`docs/RELEASING.md`](./docs/RELEASING.md).

## External Services

- Required: a Palantir Foundry stack with access to the LLM proxy endpoints
- Optional: Exa for the tool-calling example

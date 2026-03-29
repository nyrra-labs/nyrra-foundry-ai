# @nyrra/foundry-ai

Thin Palantir Foundry provider adapters and model catalog for the Vercel AI SDK.

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
- Exposes isolated provider subpaths so OpenAI, Anthropic, and Google installs stay separate by default.
- Applies only the OpenAI compatibility defaults required by Foundry RID routing: `store: false`, `forceReasoning: true` for catalogued OpenAI reasoning targets unless the caller already set `forceReasoning`, and `strict: true` for function tools when the caller left `strict` unspecified.
- Preserves a raw RID escape hatch when a model is not yet in the catalog.
- Exposes both alias and reverse-RID catalog lookups for app-level validation and routing.
- Adds a beta Gemini adapter backed by an explicit Foundry RID catalog.
- Ships a TanStack Intent skill for provider-specific setup and troubleshooting.

## Package Contract

The published surface is intentionally small:

- `@nyrra/foundry-ai` exports config loading, catalog helpers, errors, and model ID types.
- `@nyrra/foundry-ai/openai` exports `createFoundryOpenAI`.
- `@nyrra/foundry-ai/anthropic` exports `createFoundryAnthropic`.
- `@nyrra/foundry-ai/google` exports `createFoundryGoogle`.

There is no published registry helper. Multi-provider routing stays as an application-level example built with AI SDK `createProviderRegistry`.
This package is still pre-1.0. Legacy exports from the earlier wrapper-heavy shape such as the registry helper, middleware wrapper, and formatter helpers are intentionally removed instead of being carried forward behind compatibility shims.

## Quick Start

Install the package plus the provider peer dependency you plan to use:

```bash
pnpm add @nyrra/foundry-ai ai @ai-sdk/openai
```

```bash
pnpm add @nyrra/foundry-ai ai @ai-sdk/anthropic
```

```bash
pnpm add @nyrra/foundry-ai ai @ai-sdk/google
```

Set the required environment variables:

```bash
FOUNDRY_URL=https://your-stack.palantirfoundry.com
FOUNDRY_TOKEN=your-token
FOUNDRY_ATTRIBUTION_RID=
```

Use the OpenAI path end to end:

```ts
import { loadFoundryConfig } from '@nyrra/foundry-ai';
import { createFoundryOpenAI } from '@nyrra/foundry-ai/openai';
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
import { loadFoundryConfig } from '@nyrra/foundry-ai';
import { createFoundryAnthropic } from '@nyrra/foundry-ai/anthropic';
import { generateText } from 'ai';

const anthropic = createFoundryAnthropic(loadFoundryConfig());

const result = await generateText({
  model: anthropic('claude-sonnet-4.6'),
  prompt: 'Summarize why typed Foundry model aliases are useful.',
});

console.log(result.text);
```

Gemini uses the beta Google-compatible proxy and resolves friendly aliases through the shared Foundry RID catalog:

```ts
import { loadFoundryConfig } from '@nyrra/foundry-ai';
import { createFoundryGoogle } from '@nyrra/foundry-ai/google';
import { generateText } from 'ai';

const google = createFoundryGoogle(loadFoundryConfig());

const result = await generateText({
  model: google('gemini-3.1-flash-lite'),
  prompt: 'Summarize why Gemini through Foundry is useful.',
});

console.log(result.text);
```

## Multi-Provider Routing Example

Compose AI SDK's registry in application code when you need both providers:

```ts
import { loadFoundryConfig } from '@nyrra/foundry-ai';
import { createFoundryAnthropic } from '@nyrra/foundry-ai/anthropic';
import { createFoundryOpenAI } from '@nyrra/foundry-ai/openai';
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

Google registry composition works the same way:

```ts
import { createFoundryGoogle } from '@nyrra/foundry-ai/google';

const registry = createProviderRegistry({
  google: createFoundryGoogle(config),
});
```

## Explicit OpenAI Compatibility Rules

- `providerOptions.openai.store=true` throws before the request is sent. The adapter always uses `store: false` for Foundry OpenAI traffic.
- Catalogued OpenAI reasoning aliases automatically get `providerOptions.openai.forceReasoning=true` unless the caller already set `forceReasoning`.
- Unknown OpenAI reasoning RIDs are not guessable. If you pass a new opaque RID for a reasoning model, set `providerOptions.openai.forceReasoning=true` explicitly.
- OpenAI function tools default to `strict: true` only when the caller did not set `strict`. Explicit `strict` values are preserved.

## API Surface

Core exports from `@nyrra/foundry-ai`:

- `loadFoundryConfig()`
- `FoundryModelNotFoundError`
- `MODEL_CATALOG` and `MODEL_CATALOG_BY_RID`
- catalog helpers such as `getModelMetadata()`, `resolveModelRid()`, and `resolveModelTarget()`
- public types including `FoundryConfig`, `OpenAIModelId`, `AnthropicModelId`, `GoogleModelId`, `KnownOpenAIModelId`, `KnownAnthropicModelId`, `KnownGoogleModelId`, and `KnownModelId`

Provider-specific entrypoints:

```ts
import { createFoundryOpenAI } from '@nyrra/foundry-ai/openai';
import { createFoundryAnthropic } from '@nyrra/foundry-ai/anthropic';
import { createFoundryGoogle } from '@nyrra/foundry-ai/google';
```

OpenAI, Anthropic, and Google friendly names resolve through the shared RID catalog. Unknown strings still pass through unchanged as raw targets when you call a provider factory directly.

## Examples

Base examples are the published skill references and the repo-root files are symlinked to them:

- [`examples/provider-registry.ts`](./examples/provider-registry.ts)
- [`examples/tool-calling.ts`](./examples/tool-calling.ts)
- [`examples/tool-calling-streaming.ts`](./examples/tool-calling-streaming.ts)

Canonical source files:

- [`packages/foundry-ai/skills/foundry-ai-provider/references/examples/provider-registry.ts`](./packages/foundry-ai/skills/foundry-ai-provider/references/examples/provider-registry.ts)
- [`packages/foundry-ai/skills/foundry-ai-provider/references/examples/tool-calling.ts`](./packages/foundry-ai/skills/foundry-ai-provider/references/examples/tool-calling.ts)
- [`packages/foundry-ai/skills/foundry-ai-provider/references/examples/tool-calling-streaming.ts`](./packages/foundry-ai/skills/foundry-ai-provider/references/examples/tool-calling-streaming.ts)

Advanced repo-only examples:

- [`examples/basic-text.ts`](./examples/basic-text.ts)
- [`examples/streaming.ts`](./examples/streaming.ts)
- [`examples/structured-output.ts`](./examples/structured-output.ts)
- [`examples/tool-calling-exa.ts`](./examples/tool-calling-exa.ts)
- [`examples/README.md`](./examples/README.md)

Run them from the repo root. For a safe run that rebuilds the package first, use:

```bash
# OpenAI
pnpm run example basic-text openai
pnpm run example streaming openai
pnpm run example structured-output openai
pnpm run example tool-calling openai
pnpm run example tool-calling-streaming openai
pnpm run example tool-calling-exa openai

# Anthropic
pnpm run example basic-text anthropic
pnpm run example streaming anthropic
pnpm run example structured-output anthropic
pnpm run example tool-calling anthropic
pnpm run example tool-calling-streaming anthropic
pnpm run example tool-calling-exa anthropic

# Google
pnpm run example basic-text google
pnpm run example streaming google
pnpm run example structured-output google
pnpm run example tool-calling google
pnpm run example tool-calling-streaming google
pnpm run example tool-calling-exa google

# Registry composition
pnpm run example provider-registry
```

If you want the shortest path, Bun works directly too:

```bash
# OpenAI
bun examples/basic-text.ts openai
bun examples/streaming.ts openai
bun examples/structured-output.ts openai
bun examples/tool-calling.ts openai
bun examples/tool-calling-streaming.ts openai
bun examples/tool-calling-exa.ts openai

# Anthropic
bun examples/basic-text.ts anthropic
bun examples/streaming.ts anthropic
bun examples/structured-output.ts anthropic
bun examples/tool-calling.ts anthropic
bun examples/tool-calling-streaming.ts anthropic
bun examples/tool-calling-exa.ts anthropic

# Google
bun examples/basic-text.ts google
bun examples/streaming.ts google
bun examples/structured-output.ts google
bun examples/tool-calling.ts google
bun examples/tool-calling-streaming.ts google
bun examples/tool-calling-exa.ts google

# Registry composition
bun examples/provider-registry.ts
```

## Package Docs

The npm-facing package docs now live with the package itself:

- [`packages/foundry-ai/README.md`](./packages/foundry-ai/README.md)
- [`packages/foundry-ai/docs/usage.md`](./packages/foundry-ai/docs/usage.md)
- [`packages/foundry-ai/docs/model-support.md`](./packages/foundry-ai/docs/model-support.md)
- [`packages/foundry-ai/docs/dependency-strategy.md`](./packages/foundry-ai/docs/dependency-strategy.md)
- [`packages/foundry-ai/docs/live-capability-matrix.md`](./packages/foundry-ai/docs/live-capability-matrix.md)
- [`packages/foundry-ai/docs/ai-sdk-community-provider.mdx`](./packages/foundry-ai/docs/ai-sdk-community-provider.mdx)
- [`packages/foundry-ai/skills/foundry-ai-provider/SKILL.md`](./packages/foundry-ai/skills/foundry-ai-provider/SKILL.md)

## Verified Provider Options

Observed on March 27, 2026 against this Foundry stack:

| Provider | Model | Verified live options |
|---|---|---|
| OpenAI | `gpt-5-mini` | `reasoningEffort`, `textVerbosity` |
| Anthropic | `claude-sonnet-4.6` | `thinking`, `sendReasoning`, `effort`, `toolStreaming`, `disableParallelToolUse` |
| Anthropic | `claude-haiku-4.5` | basic text, raw RID, streaming, structured output |
| Google | `gemini-3.1-flash-lite` | basic text, raw RID, streaming, structured output, tool calling |

The Anthropic AI SDK exposes more knobs than this Foundry stack accepts uniformly across models. During live verification on March 26, 2026, `claude-haiku-4.5` rejected Anthropic `effort` because Foundry rejected the proxied `output_config` payload. That is why the richer Anthropic reasoning and tool examples default to `claude-sonnet-4.6`.

Google is still a beta Palantir proxy endpoint. During live verification on March 27, 2026, `gemini-3.1-flash-lite` was more reliable on this stack than `gemini-2.5-flash` for streaming and richer structured-output prompts, so the live Gemini checks now target `gemini-3.1-flash-lite`.

## Testing and CI

| Layer | Present | Tooling | Runs in CI |
|---|---|---|---|
| unit | yes | Vitest | yes |
| integration | no | none | no |
| e2e api | yes | Vitest live tests + manual Bun/Node example scripts against live Foundry | no |
| e2e web | no | none | no |

GitHub Actions runs lint, unit tests, typecheck, build, TanStack Intent skill validation, and package-content audit checks on `main` and pull requests. Semgrep runs on pull requests plus scheduled/manual runs, and stable/prerelease publishing stays on the manual `Release` workflow. Live API verification still requires Foundry credentials and remains manual through `pnpm test:live` or the standalone scripts in [`examples/`](./examples).

The scripts in [`examples/`](./examples) are demos. The canonical verification surface is the live capability matrix in [`packages/foundry-ai/src/__tests__/foundry.live.test.ts`](./packages/foundry-ai/src/__tests__/foundry.live.test.ts).

Each `pnpm test:live` run writes structured artifacts to `.memory/capability-runs/<run-id>/`:

- `results.json` with provider-by-capability results, model IDs, errors, inputs/outputs, and telemetry event payloads
- `summary.md` with a compact human review table plus failed rows
- `otel-spans.json` with locally captured trace/span data from AI SDK experimental telemetry
- `packages/foundry-ai/docs/live-capability-matrix.md` plus a generated summary block in [`packages/foundry-ai/README.md`](./packages/foundry-ai/README.md)

Canonical live models can be overridden per provider without code edits:

- `LIVE_OPENAI_MODEL` defaults to `gpt-5-mini`
- `LIVE_ANTHROPIC_MODEL` defaults to `claude-sonnet-4.6`
- `LIVE_GOOGLE_MODEL` defaults to `gemini-3.1-flash-lite`
- `LIVE_OPENAI_EMBEDDING_MODEL` defaults to `text-embedding-3-small`
- `LIVE_GOOGLE_EMBEDDING_MODEL` is opt-in and only used when your stack exposes a valid Google embedding target
- `LIVE_OPENAI_VISION_MODEL`, `LIVE_ANTHROPIC_VISION_MODEL`, and `LIVE_GOOGLE_VISION_MODEL` let you override the default model used for vision probes

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
pnpm exec nx run foundry-ai:skills-validate --outputStyle=static
pnpm exec nx run foundry-ai:package-audit --outputStyle=static
```

For direct Nx targets:

```bash
pnpm exec nx run foundry-ai:lint --outputStyle=static
pnpm exec nx run foundry-ai:test --outputStyle=static
pnpm exec nx run foundry-ai:typecheck --outputStyle=static
pnpm exec nx run foundry-ai:build --outputStyle=static
pnpm exec nx run foundry-ai:skills-validate --outputStyle=static
pnpm exec nx run foundry-ai:package-audit --outputStyle=static
```

## Releasing

Release automation is wired through manual GitHub Actions workflows:

- `Release` publishes either a stable npm release or a prerelease build from `main`

The workflow runs lint, unit tests, typecheck, and build before it cuts a release commit or publishes to npm. Prereleases also run automatically on pushes to `main` that touch the package or release workflow, and their version sequence is derived from npm's `next` dist-tag instead of pushing version commits back to `main`.

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

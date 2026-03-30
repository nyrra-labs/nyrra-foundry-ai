<p align="center">
  <img src="https://www.nyrra.ai/nyrra-logo-5-colors.svg" alt="Nyrra" width="220" />
</p>

# @nyrra/foundry-ai

Thin Palantir Foundry provider adapters and model catalog for the Vercel AI SDK.

[![AI%20SDK](https://img.shields.io/badge/AI%20SDK-6.0.140-000000?logo=vercel&logoColor=white)](https://ai-sdk.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Apache--2.0-0f172a)](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/packages/foundry-ai/LICENSE)

## What It Does

- Routes AI SDK language-model calls through Foundry's provider-compatible proxy endpoints.
- Maps friendly model aliases such as `gpt-5-mini`, `claude-sonnet-4.6`, and `gemini-3.1-flash-lite` to Foundry RIDs.
- Keeps installs lean by exposing provider-specific subpaths and optional peer dependencies.
- Ships a TanStack Intent skill for provider-specific setup and troubleshooting.

## Install

Install `ai`, this package, and only the provider peer dependency you need:

```bash
pnpm add @nyrra/foundry-ai ai @ai-sdk/openai
```

```bash
pnpm add @nyrra/foundry-ai ai @ai-sdk/anthropic
```

```bash
pnpm add @nyrra/foundry-ai ai @ai-sdk/google
```

If you use more than one provider, install both peers. For the rationale and bundle-size tradeoffs, see the [dependency strategy guide](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/packages/foundry-ai/docs/dependency-strategy.md).

## Verified Use Case

Use this package when you want local development and deployed server workloads to call secure or private Foundry proxy endpoints instead of public provider endpoints directly.

The verified path today is env-based server usage with `FOUNDRY_URL` and `FOUNDRY_TOKEN`. Palantir documents the same proxy family for OSDK and other Foundry-native runtimes, but this package has not yet been validated end to end in Palantir TSv1 or TSv2 standalone functions or `PlatformClient`-driven fetch flows.

## Quick Start

```bash
FOUNDRY_URL=https://your-stack.palantirfoundry.com
FOUNDRY_TOKEN=your-token
FOUNDRY_ATTRIBUTION_RID=
```

```ts
import { loadFoundryConfig } from '@nyrra/foundry-ai';
import { createFoundryOpenAI } from '@nyrra/foundry-ai/openai';
import { generateText } from 'ai';

const openai = createFoundryOpenAI(loadFoundryConfig());

const result = await generateText({
  model: openai('gpt-5-mini'),
  prompt: 'Reply in one sentence.',
});

console.log(result.text);
```

## Provider Surface

- Root exports config loading, catalog helpers, errors, and model ID types.
- `@nyrra/foundry-ai/openai` exports `createFoundryOpenAI`.
- `@nyrra/foundry-ai/anthropic` exports `createFoundryAnthropic`.
- `@nyrra/foundry-ai/google` exports `createFoundryGoogle`.
- There is no package-level registry helper. Compose multi-provider routing in application code with AI SDK `createProviderRegistry`.

## Model IDs

- Use friendly aliases for catalogued models such as `gpt-5-mini`, `claude-sonnet-4.6`, and `gemini-3.1-flash-lite`.
- Use raw Foundry RIDs when your stack exposes a model that is not yet in the package catalog.
- Sunset and deprecated enrollment entries are intentionally excluded from the public alias catalog.
- `getModelMetadata()` exposes normalized catalog data for current aliases, including `modelIdentifier`, `inputTypes`, `trainingCutoffDate`, `performance`, and derived `supportsVision` / `supportsResponses` flags.
- Alias and raw-RID behavior are documented in the [model support guide](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/packages/foundry-ai/docs/model-support.md).

## Foundry-Specific Behavior

- OpenAI traffic always uses Foundry-safe compatibility defaults where required.
- `providerOptions.openai.store=true` throws before the request is sent.
- Known OpenAI reasoning aliases automatically get `providerOptions.openai.forceReasoning=true` unless the caller already set it.
- The Google adapter rewrites the AI SDK's `x-goog-api-key` auth into the bearer-token header that Foundry expects.
- Embedding, image, audio, video, and rerank methods are not exposed by this package yet.

## Docs And Examples

- [Usage guide](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/packages/foundry-ai/docs/usage.md)
- [Model support guide](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/packages/foundry-ai/docs/model-support.md)
- [Dependency strategy guide](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/packages/foundry-ai/docs/dependency-strategy.md)
- [Harness capability results](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/packages/foundry-ai/docs/harness-capability-results.md)
- [AI SDK community provider draft](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/packages/foundry-ai/docs/ai-sdk-community-provider.mdx)
- [TanStack Intent skill](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/packages/foundry-ai/skills/foundry-ai-provider/SKILL.md)
- [Examples overview](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/examples/README.md)
- [Published base examples](https://github.com/nyrra-labs/nyrra-foundry-ai/tree/main/packages/foundry-ai/skills/foundry-ai-provider/references/examples)

## Testing And CI

| Layer | Present | Tooling | Runs in CI |
|---|---|---|---|
| unit | yes | Vitest | yes |
| integration | no | none | no |
| e2e api | yes | live Vitest suite + manual example scripts against Foundry | no |
| e2e web | no | none | no |

CI runs lint, unit tests, typecheck, build, TanStack Intent skill validation, and a package-content audit. The harness matrix remains manual through `pnpm test:live`.

## Copyright And License

Copyright 2026 NYRRA Inc.

Licensed under Apache-2.0. See the [license](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/packages/foundry-ai/LICENSE) and [notice](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/packages/foundry-ai/NOTICE).

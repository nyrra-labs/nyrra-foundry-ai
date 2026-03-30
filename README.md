<p align="center">
  <img src="https://www.nyrra.ai/nyrra-logo-5-colors.svg" alt="Nyrra" width="240" />
</p>

# @nyrra/foundry-ai

Thin Palantir Foundry provider adapters and model catalog for the Vercel AI SDK.

[![CI](https://github.com/nyrra-labs/nyrra-foundry-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/nyrra-labs/nyrra-foundry-ai/actions/workflows/ci.yml)
[![Semgrep](https://github.com/nyrra-labs/nyrra-foundry-ai/actions/workflows/semgrep.yml/badge.svg)](https://github.com/nyrra-labs/nyrra-foundry-ai/actions/workflows/semgrep.yml)
[![npm](https://img.shields.io/npm/v/%40nyrra%2Ffoundry-ai/latest?logo=npm&label=npm)](https://www.npmjs.com/package/@nyrra/foundry-ai)
[![next](https://img.shields.io/npm/v/%40nyrra%2Ffoundry-ai/next?logo=npm&label=next)](https://www.npmjs.com/package/@nyrra/foundry-ai?activeTab=versions)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/nyrra-labs/nyrra-foundry-ai)

[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![AI%20SDK](https://img.shields.io/badge/AI%20SDK-6.0.140-000000?logo=vercel&logoColor=white)](https://ai-sdk.dev/)
[![Nx](https://img.shields.io/badge/Nx-22.6.2-143055?logo=nx&logoColor=white)](https://nx.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-10.24.0-f69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

[![Biome](https://img.shields.io/badge/Biome-2.4.9-60a5fa)](https://biomejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1.2-6e9f18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![AI%20SDK%20DevTools](https://img.shields.io/badge/AI%20SDK%20DevTools-0.0.15-000000)](https://ai-sdk.dev/docs/ai-sdk-core/devtools)
[![TanStack%20Intent](https://img.shields.io/badge/TanStack%20Intent-0.0.27-ff4154)](https://www.npmjs.com/package/@tanstack/intent)
[![License](https://img.shields.io/badge/license-Apache--2.0-0f172a)](./LICENSE)

## What It Does

- Routes AI SDK language-model calls through Foundry's provider-compatible proxy endpoints.
- Maps friendly model names such as `gpt-5-mini`, `claude-sonnet-4.6`, and `gemini-3.1-flash-lite` to Foundry RIDs.
- Keeps installs lean through provider-specific subpaths for OpenAI, Anthropic, and Google.
- Ships a TanStack Intent skill plus a small set of provider-specific reference examples.
- Verifies the public alias catalog with a live Foundry capability harness instead of hand-waving support claims.

## How It Works

- `loadFoundryConfig()` resolves the proxy base URL, token, and optional attribution header from environment variables.
- Provider factories such as `createFoundryOpenAI()` adapt AI SDK provider clients to Foundry-compatible endpoints and request constraints.
- The package exposes a normalized model catalog for current aliases, but still lets you pass a raw Foundry RID when your stack has a newer enrollment.
- Multi-provider routing stays in application code with AI SDK `createProviderRegistry`; the package deliberately does not ship its own registry wrapper.

## Quick Start

Install the package, `ai`, and only the provider peer dependency you need:

```bash
pnpm add @nyrra/foundry-ai ai @ai-sdk/openai
```

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

const { text } = await generateText({
  model: openai('gpt-5-mini'),
  prompt: 'Reply in one sentence.',
});

console.log(text);
```

See the published package README for the npm-facing surface: [`packages/foundry-ai/README.md`](./packages/foundry-ai/README.md).

## Testing And CI

| Layer | Present | Tooling | Runs in CI |
|---|---|---|---|
| unit | yes | Vitest | yes |
| integration | no | none | no |
| e2e api | yes | live Vitest harness + manual Bun example scripts against Foundry | no |
| e2e web | no | none | no |

`e2e api` coverage exists, but it is intentionally not in CI because it requires live Foundry credentials and proxy access.

CI runs lint, unit tests, typecheck, build, TanStack Intent validation, and a package-content audit. The checked-in results in [`packages/foundry-ai/docs/harness-capability-results.md`](./packages/foundry-ai/docs/harness-capability-results.md) are harness output, not a blanket support promise.

## Developer Tooling

- AI SDK DevTools is wired into the live harness as an opt-in path. Run `pnpm test:live:devtools -- --no-update-docs -t "openai:gpt-5-mini"` to capture runs, then start the UI with `npx @ai-sdk/devtools` and open the local URL it prints. No extra telemetry flag is needed for this middleware-based path.
- Install the published agent skill with `npx skills add https://github.com/nyrra-labs/nyrra-foundry-ai --skill foundry-ai-provider -g -a codex -y`. That install event is what `skills.sh` uses for leaderboard/indexing.
- TanStack Intent validates the published skill surface with `pnpm exec intent validate packages/foundry-ai/skills`.
- In consumer repos, TanStack Intent discovers the installed package from `node_modules`. After adding `@nyrra/foundry-ai` to the app, run `npx @tanstack/intent@latest list` and map `node_modules/@nyrra/foundry-ai/skills/foundry-ai-provider/SKILL.md` in your agent config.
- The safe example runner builds first and then executes with Bun when available. Start with `pnpm run example tool-calling openai`, `bun run example:exa`, or `bun run example:exa:parallel`.

## Docs And Examples

- [Package README](./packages/foundry-ai/README.md)
- [Usage guide](./packages/foundry-ai/docs/usage.md)
- [Model support](./packages/foundry-ai/docs/model-support.md)
- [Dependency strategy](./packages/foundry-ai/docs/dependency-strategy.md)
- [Harness capability results](./packages/foundry-ai/docs/harness-capability-results.md)
- [AI SDK community provider draft](./packages/foundry-ai/docs/ai-sdk-community-provider.mdx)
- [TanStack Intent skill](./packages/foundry-ai/skills/foundry-ai-provider/SKILL.md)
- [Examples overview](./examples/README.md)

Base examples live under [`examples/base`](./examples/base), which is a symlink to the published skill reference examples. Advanced repo-only examples live under [`examples/advanced`](./examples/advanced).

## Release Workflow

Stable releases and prereleases both run through Nx release and the shared GitHub Actions workflow. For the exact steps, trusted publishing setup, and local dry-run commands, see [`docs/RELEASING.md`](./docs/RELEASING.md).

## External Services

- Required: a Palantir Foundry stack with access to the LLM proxy endpoints.
- Optional: Exa for the advanced tool-calling examples.

## Copyright And License

Copyright 2026 NYRRA Inc.

Licensed under Apache-2.0. See [`LICENSE`](./LICENSE) and [`NOTICE`](./NOTICE).

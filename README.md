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

- Routes AI SDK language-model calls through Foundry's provider-compatible proxy endpoints.
- Maps friendly model names such as `gpt-5-mini`, `claude-sonnet-4.6`, and `gemini-3.1-flash-lite` to Foundry RIDs.
- Keeps installs lean through provider-specific subpaths for OpenAI, Anthropic, and Google.
- Ships a TanStack Intent skill with tight provider-specific examples.

## Package Surface

- `@nyrra/foundry-ai` exports config loading, catalog helpers, errors, and model ID types.
- `@nyrra/foundry-ai/openai` exports `createFoundryOpenAI`.
- `@nyrra/foundry-ai/anthropic` exports `createFoundryAnthropic`.
- `@nyrra/foundry-ai/google` exports `createFoundryGoogle`.

There is no published registry helper. Multi-provider routing stays in application code with AI SDK `createProviderRegistry`.

## Quick Start

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

## Docs And Examples

- [`packages/foundry-ai/README.md`](./packages/foundry-ai/README.md)
- [`packages/foundry-ai/docs/usage.md`](./packages/foundry-ai/docs/usage.md)
- [`packages/foundry-ai/docs/model-support.md`](./packages/foundry-ai/docs/model-support.md)
- [`packages/foundry-ai/docs/dependency-strategy.md`](./packages/foundry-ai/docs/dependency-strategy.md)
- [`packages/foundry-ai/docs/harness-capability-results.md`](./packages/foundry-ai/docs/harness-capability-results.md)
- [`packages/foundry-ai/docs/ai-sdk-community-provider.mdx`](./packages/foundry-ai/docs/ai-sdk-community-provider.mdx)
- [`packages/foundry-ai/skills/foundry-ai-provider/SKILL.md`](./packages/foundry-ai/skills/foundry-ai-provider/SKILL.md)
- [`examples/README.md`](./examples/README.md)

Base examples live under [`examples/base`](./examples/base), which is a symlink to the published skill reference examples. Advanced repo-only examples live under [`examples/advanced`](./examples/advanced).

## Testing and CI

| Layer | Present | Tooling | Runs in CI |
|---|---|---|---|
| unit | yes | Vitest | yes |
| integration | no | none | no |
| e2e api | yes | live Vitest harness + manual Bun/Node example scripts against Foundry | no |
| e2e web | no | none | no |

CI runs lint, unit tests, typecheck, build, TanStack Intent skill validation, and package-content audit checks. The generated results in [`packages/foundry-ai/docs/harness-capability-results.md`](./packages/foundry-ai/docs/harness-capability-results.md) are harness output from the live verification suite, not a hand-curated support promise.

## Development

```bash
pnpm install
pnpm lint
pnpm test
pnpm test:live
pnpm typecheck
pnpm build
pnpm run example tool-calling openai
```

For the full release workflow, see [`docs/RELEASING.md`](./docs/RELEASING.md).

## External Services

- Required: a Palantir Foundry stack with access to the LLM proxy endpoints
- Optional: Exa for the advanced tool-calling example

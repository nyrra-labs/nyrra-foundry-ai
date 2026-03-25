# @nyrra-labs/foundry-ai

<img src="https://www.nyrra.ai/nyrra-logo-5-colors.svg" width="120" alt="Nyrra">

TypeScript SDK for Palantir Foundry's LLM proxy. Built by [Nyrra](https://www.nyrra.ai/).

<!-- Core Stack -->
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel%20AI%20SDK-v6-black?logo=vercel)](https://sdk.vercel.ai/)

<!-- Tooling -->
[![Nx](https://img.shields.io/badge/Nx-21-143055?logo=nx)](https://nx.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-f69220?logo=pnpm)](https://pnpm.io/)
[![Biome](https://img.shields.io/badge/Biome-2.3-60a5fa?logo=biome)](https://biomejs.dev/)

<!-- Testing -->
[![Vitest](https://img.shields.io/badge/Vitest-3.2-6e9f18?logo=vitest)](https://vitest.dev/)

<!-- Package -->
[![npm](https://img.shields.io/badge/%40nyrra--labs%2Ffoundry--ai-cb3837)](https://www.npmjs.com/)
[![Palantir Foundry](https://img.shields.io/badge/Palantir%20Foundry-1F2B3D?logo=palantir&logoColor=white)](https://www.palantir.com/docs/foundry/aip/llm-provider-compatible-apis)

## What It Does

- **Typed interface** to Palantir Foundry's LLM proxy endpoints
- **Provider adapters** for OpenAI and Anthropic with subpath exports (`/openai`, `/anthropic`)
- **Model catalog** with friendly names mapped to Foundry RIDs
- **ZDR-safe defaults** — `store: false`, strict tools (OpenAI-only), reasoning detection
- **Zero OSDK dependencies** — just `foundryUrl` + `token`

## How It Works

The SDK wraps `@ai-sdk/openai` and `@ai-sdk/anthropic` with Foundry-specific middleware:

1. **Subpath exports** ensure tree-shaking — import only the provider you need
2. **Middleware layer** auto-applies ZDR policy (`store: false`) and reasoning flags
3. **Model catalog** resolves friendly names (e.g., `gpt-5-mini`) to Foundry RIDs
4. **Raw RID escape hatch** — pass any string for models not yet in the catalog

## Quick Start

```bash
pnpm add @nyrra-labs/foundry-ai ai @ai-sdk/openai
```

```typescript
import { createFoundryOpenAI } from '@nyrra-labs/foundry-ai/openai';
import { generateText } from 'ai';

const openai = createFoundryOpenAI({
  foundryUrl: process.env.FOUNDRY_URL!,
  token: process.env.FOUNDRY_TOKEN!,
});

const result = await generateText({
  model: openai('gpt-5-mini'),
  prompt: 'Hello from Foundry',
});
```

## Testing and CI

| Layer | Present | Tooling | Runs in CI |
|---|---|---|---|
| unit | yes | vitest | no |
| integration | no | none | no |
| e2e api | no | none | no |
| e2e web | no | none | no |

Unit tests cover model catalog, middleware, and provider adapters. Integration tests (in `examples/`) require live Foundry credentials and are run manually.

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm nx run foundry-ai:test

# Build package
pnpm nx run foundry-ai:build

# Lint and format
pnpm nx run foundry-ai:lint
```

See `AGENTS.md` for workflow guidelines and `docs/SPEC.md` for technical architecture.

## Configuration

Copy `.env.example` to `.env.local` and set your credentials:

```bash
FOUNDRY_URL=https://your-stack.palantirfoundry.com
FOUNDRY_TOKEN=your-token
```

## License

No license file detected.

---

Built by [Nyrra](https://www.nyrra.ai/) — AI infrastructure for regulated industries.

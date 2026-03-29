# Usage Guide

## What this package is for

`@nyrra/foundry-ai` is for applications that want to use the AI SDK with Palantir Foundry's provider-compatible LLM proxy endpoints instead of calling public provider APIs directly.

Typical use cases:

- local development against a Foundry enrollment
- deployed server workloads that should stay on secure/private Foundry endpoints
- applications that want Foundry governance, rate limiting, attribution, and usage tracking while keeping AI SDK application code

## What is verified today

- env-based server setup with `FOUNDRY_URL` and `FOUNDRY_TOKEN`
- OpenAI, Anthropic, and Google language-model entrypoints from this package
- application-level routing with AI SDK `createProviderRegistry`

## What is not yet verified

- Palantir TSv1 standalone functions
- Palantir TSv2 standalone functions
- `@osdk/client` or `PlatformClient` fetch integration with this package
- browser/client-side usage

Palantir's docs show the same proxy family used from OSDK and in-platform helpers, but this package should not claim support for those runtimes until it has been validated there.

## Required configuration

| Variable | Required | Purpose |
|---|---|---|
| `FOUNDRY_URL` | yes | Foundry enrollment base URL |
| `FOUNDRY_TOKEN` | yes | bearer token for the proxy endpoints |
| `FOUNDRY_ATTRIBUTION_RID` | no | usage attribution RID header |

## Minimal env-based setup

```ts
import { loadFoundryConfig } from '@nyrra/foundry-ai';
import { createFoundryOpenAI } from '@nyrra/foundry-ai/openai';
import { generateText } from 'ai';

const config = loadFoundryConfig();
const openai = createFoundryOpenAI(config);

const result = await generateText({
  model: openai('gpt-5-mini'),
  prompt: 'Summarize why Foundry model aliases are useful.',
});
```

## Local dev and deployed server guidance

- In local development, provide `FOUNDRY_URL` and a valid Foundry token from your normal developer workflow, for example through Developer Console or another approved token source.
- In deployed server runtimes, inject the same values as secrets. Do not expose Foundry tokens to client-side code.
- If your runtime can already surface a Foundry token, base URL, and fetch implementation, treat that as an adaptation opportunity rather than already-verified support.

## Application-level registry composition

The package intentionally does not export a registry helper. Compose one in application code:

```ts
import { loadFoundryConfig } from '@nyrra/foundry-ai';
import { createFoundryAnthropic } from '@nyrra/foundry-ai/anthropic';
import { createFoundryOpenAI } from '@nyrra/foundry-ai/openai';
import { createProviderRegistry } from 'ai';

const config = loadFoundryConfig();

export const registry = createProviderRegistry({
  anthropic: createFoundryAnthropic(config),
  openai: createFoundryOpenAI(config),
});
```

## Repo examples

- [Published registry example](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/packages/foundry-ai/skills/foundry-ai-provider/references/examples/provider-registry.ts)
- [Published tool-calling example](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/packages/foundry-ai/skills/foundry-ai-provider/references/examples/tool-calling.ts)
- [Published tool-calling streaming example](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/packages/foundry-ai/skills/foundry-ai-provider/references/examples/tool-calling-streaming.ts)
- [Examples overview with base vs advanced split](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/examples/README.md)
- [Basic text](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/examples/basic-text.ts)
- [Streaming](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/examples/streaming.ts)
- [Structured output](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/examples/structured-output.ts)
- [Optional Exa tool calling](https://github.com/nyrra-labs/nyrra-foundry-ai/blob/main/examples/tool-calling-exa.ts)

## Relevant Palantir docs

- [LLM-provider compatible APIs](https://www.palantir.com/docs/foundry/aip/llm-provider-compatible-apis/)
- [OpenAI Responses proxy reference](https://www.palantir.com/docs/foundry/api/v2/llm-apis/models/openai-responses-proxy)
- [Anthropic Messages proxy reference](https://www.palantir.com/docs/foundry/api/v2/llm-apis/models/anthropic-messages-proxy)

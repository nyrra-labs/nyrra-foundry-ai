# @nyrra/foundry-ai

Thin Foundry provider adapters and model catalog for the Vercel AI SDK.

## Install

Install the package and the peer dependencies for the provider you plan to use:

```bash
pnpm add @nyrra/foundry-ai ai @ai-sdk/openai
```

```bash
pnpm add @nyrra/foundry-ai ai @ai-sdk/anthropic
```

```bash
pnpm add @nyrra/foundry-ai ai @ai-sdk/google
```

## Usage

```ts
import { loadFoundryConfig } from '@nyrra/foundry-ai';
import { createFoundryOpenAI } from '@nyrra/foundry-ai/openai';
import { generateText } from 'ai';

const openai = createFoundryOpenAI(
  loadFoundryConfig({
    foundryUrl: process.env.FOUNDRY_URL,
    token: process.env.FOUNDRY_TOKEN,
    attributionRid: process.env.FOUNDRY_ATTRIBUTION_RID,
  }),
);

const result = await generateText({
  model: openai('gpt-5-mini'),
  prompt: 'Reply in one sentence.',
});

console.log(result.text);
```

## Exports

- `@nyrra/foundry-ai`
- `@nyrra/foundry-ai/openai`
- `@nyrra/foundry-ai/anthropic`
- `@nyrra/foundry-ai/google`

There is no published registry helper. Compose multi-provider routing in application code with AI SDK `createProviderRegistry`.

## Notes

- OpenAI traffic always uses Foundry-safe compatibility defaults where required.
- `providerOptions.openai.store=true` throws before the request is sent.
- Unknown model strings pass through as raw targets when you call a provider factory directly.
- OpenAI, Anthropic, and Google friendly aliases resolve through the shared catalog.
- The Google adapter rewrites the AI SDK's `x-goog-api-key` auth into the bearer-token header that Foundry expects.

## Verification

The examples are demos. The canonical verification surface is the live capability matrix in [`src/__tests__/foundry.live.test.ts`](./src/__tests__/foundry.live.test.ts).

Each live run writes structured artifacts under `.memory/capability-runs/<run-id>/` and `pnpm test:live` refreshes the checked-in matrix docs from the latest artifact even when a capability fails.

<!-- live-matrix:start -->
## Live Capability Matrix

Generated from the latest local live verification artifact checked into this branch.

Latest snapshot: `2026-03-28T02-23-38.080Z-f7c393`

- Models: openai=`gpt-5-mini`, anthropic=`claude-sonnet-4.6`, google=`gemini-3.1-flash-lite`
- Status Counts: `pass`: 29, `skipped`: 18, `proxy-rejected`: 2

| Provider | Pass | Skipped | Proxy Rejected | Unsupported | Fail |
|---|---:|---:|---:|---:|---:|
| anthropic | 9 | 6 | 1 | 0 | 0 |
| google | 9 | 7 | 0 | 0 | 0 |
| openai | 11 | 5 | 1 | 0 | 0 |

See [docs/live-capability-matrix.md](./docs/live-capability-matrix.md) for the full row-by-row matrix and non-pass details.
<!-- live-matrix:end -->

See the repo root README for the full catalog, examples, and release notes.

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

Each live run writes structured artifacts under `.memory/capability-runs/<run-id>/`. Full unfiltered `pnpm test:live` runs refresh the checked-in matrix docs from the latest artifact even when investigation rows surface failures.

<!-- live-matrix:start -->
## Live Capability Matrix

Generated from the latest local live verification artifact checked into this branch.

Latest snapshot: `2026-03-28T08-29-30.093Z-32e0e4`

- Default Models: openai=`gpt-5-mini`, anthropic=`claude-sonnet-4.6`, google=`gemini-3.1-flash-lite`
- Model Scope: `catalog`
- Status Counts: `pass`: 297, `skipped`: 184, `fail`: 18

The default per-provider models are the hard gate. Additional catalog rows are investigation coverage, exclude lifecycle `sunset` and `deprecated` models, and may surface non-pass results without failing the suite.

| Provider | Pass | Skipped | Proxy Rejected | Unsupported | Fail |
|---|---:|---:|---:|---:|---:|
| openai | 160 | 96 | 0 | 0 | 1 |
| anthropic | 84 | 51 | 0 | 0 | 16 |
| google | 53 | 37 | 0 | 0 | 1 |

### Provider Tables

#### openai

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `gpt-5.4-nano` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.4-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.4` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.2` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.1-codex-mini` | pass | pass | pass | pass | pass | pass | pass | pass | skipped | skipped |
| `gpt-5.1-codex` | pass | pass | pass | pass | pass | pass | pass | pass | skipped | skipped |
| `gpt-5.1` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-5-nano` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5-codex` | fail | pass | pass | pass | pass | pass | pass | pass | skipped | skipped |
| `gpt-5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-4.1-nano` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-4.1-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-4.1` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `o4-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-4o` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `o3` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |

#### anthropic

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `claude-sonnet-4.6` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-opus-4.6` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-sonnet-4.5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-opus-4.5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-haiku-4.5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-opus-4.1` | pass | pass | pass | pass | fail | fail | fail | fail | fail | fail |
| `claude-sonnet-4` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-opus-4` | pass | pass | pass | pass | pass | fail | fail | fail | fail | fail |
| `claude-3.7-sonnet` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-3.5-haiku` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |

#### google

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `gemini-3.1-pro` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-3.1-flash-lite` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-3-flash` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-2.5-pro` | pass | pass | pass | pass | fail | pass | pass | pass | pass | skipped |
| `gemini-2.5-flash-lite` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-2.5-flash` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |

See [docs/live-capability-matrix.md](./docs/live-capability-matrix.md) for the full row-by-row matrix and non-pass details.
<!-- live-matrix:end -->

See the repo root README for the full catalog, examples, and release notes.

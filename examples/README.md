# Examples

Run every example from the repo root.

Bun is the recommended path. The scripts auto-load `.env.local` when `FOUNDRY_URL` and `FOUNDRY_TOKEN` are not already set in the environment.

Supported provider arguments are `openai`, `anthropic`, and `google`.

## Required Env

- `FOUNDRY_URL`
- `FOUNDRY_TOKEN`
- `FOUNDRY_ATTRIBUTION_RID` is optional
- `EXA_API_KEY` is also required for `tool-calling-exa.ts`

## Safe Runner

Use the root runner when you want a fresh package build first:

```bash
# OpenAI
pnpm run example basic-text openai
pnpm run example streaming openai
pnpm run example structured-output openai
pnpm run example tool-calling-exa openai

# Anthropic
pnpm run example basic-text anthropic
pnpm run example streaming anthropic
pnpm run example structured-output anthropic
pnpm run example tool-calling-exa anthropic

# Google
pnpm run example basic-text google
pnpm run example streaming google
pnpm run example structured-output google
pnpm run example tool-calling-exa google

# Registry composition
pnpm run example provider-registry
```

`provider-registry.ts` is an application-level composition example built with AI SDK `createProviderRegistry`. It is not a package export.

## Bun

Use Bun directly when you do not need the rebuild step:

```bash
# OpenAI
bun examples/basic-text.ts openai
bun examples/streaming.ts openai
bun examples/structured-output.ts openai
bun examples/tool-calling-exa.ts openai

# Anthropic
bun examples/basic-text.ts anthropic
bun examples/streaming.ts anthropic
bun examples/structured-output.ts anthropic
bun examples/tool-calling-exa.ts anthropic

# Google
bun examples/basic-text.ts google
bun examples/streaming.ts google
bun examples/structured-output.ts google
bun examples/tool-calling-exa.ts google

# Registry composition
bun examples/provider-registry.ts
```

## Model Override

Pass a third argument when you want to force a specific model:

```bash
bun examples/streaming.ts anthropic claude-sonnet-4.6
```

```bash
bun examples/tool-calling-exa.ts anthropic claude-sonnet-4.6
```

```bash
pnpm run example streaming anthropic claude-sonnet-4.6
```

## Notes

- `streaming.ts` prints the exact provider options it sends and then logs raw `fullStream` events.
- `tool-calling-exa.ts` does the same for the full tool loop, including tool calls, tool results, and final text.
- The richer Anthropic reasoning/tool example path defaults to `claude-sonnet-4.6` because that is the model we verified live with `thinking`, `sendReasoning`, `effort`, `toolStreaming`, and `disableParallelToolUse`.
- The Google examples can use friendly aliases because the package now maps the verified Gemini aliases to Foundry RIDs.

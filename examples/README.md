# Examples

Run every example from the repo root.

Bun is the recommended path. The scripts auto-load `.env.local` when `FOUNDRY_URL` and `FOUNDRY_TOKEN` are not already set in the environment.

## Required Env

- `FOUNDRY_URL`
- `FOUNDRY_TOKEN`
- `FOUNDRY_ATTRIBUTION_RID` is optional
- `EXA_API_KEY` is also required for `tool-calling-exa.ts`

## Safe Runner

Use the root runner when you want a fresh package build first:

```bash
pnpm run example basic-text openai
```

```bash
pnpm run example basic-text anthropic
```

```bash
pnpm run example streaming openai
```

```bash
pnpm run example streaming anthropic
```

```bash
pnpm run example structured-output openai
```

```bash
pnpm run example structured-output anthropic
```

```bash
pnpm run example tool-calling-exa openai
```

```bash
pnpm run example tool-calling-exa anthropic
```

```bash
pnpm run example provider-registry
```

`provider-registry.ts` is an application-level composition example built with AI SDK `createProviderRegistry`. It is not a package export.

## Bun

Use Bun directly when you do not need the rebuild step:

```bash
bun examples/basic-text.ts openai
```

```bash
bun examples/basic-text.ts anthropic
```

```bash
bun examples/streaming.ts openai
```

```bash
bun examples/streaming.ts anthropic
```

```bash
bun examples/structured-output.ts openai
```

```bash
bun examples/structured-output.ts anthropic
```

```bash
bun examples/tool-calling-exa.ts openai
```

```bash
bun examples/tool-calling-exa.ts anthropic
```

```bash
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

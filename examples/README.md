# Examples

Run every example from the repo root.

Bun is the recommended path. The scripts auto-load `.env.local` when `FOUNDRY_URL` and `FOUNDRY_TOKEN` are not already set in the environment.

Supported provider arguments are `openai`, `anthropic`, and `google`.

## Base vs Advanced

`examples/base/` is a symlink to the published skill reference examples:

- `examples/base/provider-registry.ts`
- `examples/base/tool-calling.ts`
- `examples/base/tool-calling-streaming.ts`

`examples/advanced/` stays repo-only:

- `examples/advanced/basic-text.ts`
- `examples/advanced/streaming.ts`
- `examples/advanced/structured-output.ts`
- `examples/advanced/tool-calling-exa.ts`

## Required Env

- `FOUNDRY_URL`
- `FOUNDRY_TOKEN`
- `FOUNDRY_ATTRIBUTION_RID` is optional
- `EXA_API_KEY` is only required for the optional `tool-calling-exa.ts`

## Safe Runner

Use the root runner when you want a fresh package build first:

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

The safe runner still accepts short names like `tool-calling` and `basic-text`; it resolves them through `examples/base/` first and then `examples/advanced/`.

## Bun

Use Bun directly when you do not need the rebuild step:

```bash
# OpenAI
bun examples/advanced/basic-text.ts openai
bun examples/advanced/streaming.ts openai
bun examples/advanced/structured-output.ts openai
bun examples/base/tool-calling.ts openai
bun examples/base/tool-calling-streaming.ts openai
bun examples/advanced/tool-calling-exa.ts openai

# Anthropic
bun examples/advanced/basic-text.ts anthropic
bun examples/advanced/streaming.ts anthropic
bun examples/advanced/structured-output.ts anthropic
bun examples/base/tool-calling.ts anthropic
bun examples/base/tool-calling-streaming.ts anthropic
bun examples/advanced/tool-calling-exa.ts anthropic

# Google
bun examples/advanced/basic-text.ts google
bun examples/advanced/streaming.ts google
bun examples/advanced/structured-output.ts google
bun examples/base/tool-calling.ts google
bun examples/base/tool-calling-streaming.ts google
bun examples/advanced/tool-calling-exa.ts google

# Registry composition
bun examples/base/provider-registry.ts
```

## Model Override

Pass a third argument when you want to force a specific model:

```bash
bun examples/advanced/streaming.ts anthropic claude-sonnet-4.6
```

```bash
bun examples/base/tool-calling.ts anthropic claude-sonnet-4.6
```

```bash
bun examples/base/tool-calling-streaming.ts anthropic claude-sonnet-4.6
```

```bash
bun examples/advanced/tool-calling-exa.ts anthropic claude-sonnet-4.6
```

```bash
pnpm run example streaming anthropic claude-sonnet-4.6
```

## Notes

- `examples/advanced/streaming.ts` prints the exact provider options it sends and then logs `fullStream` events with Bun/Node inspect-style object output.
- `examples/base/tool-calling.ts` is the tight blocking tool-call example that ships inside the published skill.
- `examples/base/tool-calling-streaming.ts` is the tight streaming tool-call example that ships inside the published skill.
- `examples/advanced/tool-calling-exa.ts` does the same for the full tool loop, including tool calls, tool results, and final text.
- The richer Anthropic reasoning/tool example path defaults to `claude-sonnet-4.6` because that is the model we verified live with `thinking`, `sendReasoning`, `effort`, `toolStreaming`, and `disableParallelToolUse`.
- The Google examples can use friendly aliases because the package now maps the verified Gemini aliases to Foundry RIDs.

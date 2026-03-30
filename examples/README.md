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
- `examples/advanced/tool-calling-exa-devtools.ts`
- `examples/advanced/tool-calling-exa-parallel-devtools.ts`

## Required Env

- `FOUNDRY_URL`
- `FOUNDRY_TOKEN`
- `FOUNDRY_ATTRIBUTION_RID` — optional
- `EXA_API_KEY` — required for the `tool-calling-exa-*-devtools` examples

## Running Examples

The pattern is the same for every example:

```bash
# Safe runner (builds first)
pnpm run example <name> [provider] [model]

# Bun direct (skips rebuild)
bun examples/<base|advanced>/<name>.ts [provider] [model]
```

Provider defaults to `openai`. Pass `anthropic` or `google` as the second argument.

### Available examples

| Name | Path | Notes |
|---|---|---|
| `basic-text` | `advanced/basic-text.ts` | Blocking `generateText` |
| `streaming` | `advanced/streaming.ts` | `streamText` with provider options |
| `structured-output` | `advanced/structured-output.ts` | Zod schema output |
| `tool-calling` | `base/tool-calling.ts` | Blocking tool loop (published skill) |
| `tool-calling-streaming` | `base/tool-calling-streaming.ts` | Streaming tool loop (published skill) |
| `tool-calling-exa-devtools` | `advanced/tool-calling-exa-devtools.ts` | Exa web search + DevTools |
| `tool-calling-exa-parallel-devtools` | `advanced/tool-calling-exa-parallel-devtools.ts` | Parallel Exa search + DevTools |
| `provider-registry` | `base/provider-registry.ts` | Single registry, multiple providers via `provider:model` strings |

### Quick shortcuts

```bash
bun run example:exa                    # single Exa search (OpenAI)
bun run example:exa anthropic          # same, Anthropic
bun run example:exa:parallel           # parallel multi-company search
```

### Model override

Pass a third argument to force a specific model:

```bash
pnpm run example streaming anthropic claude-sonnet-4.6
bun examples/advanced/tool-calling-exa-devtools.ts anthropic claude-sonnet-4.6
```

## DevTools

The `*-devtools` examples capture every `streamText` call to `.devtools/generations.json`. Start the viewer in a separate terminal:

```bash
npx @ai-sdk/devtools
```

Then open `http://localhost:4983` (or set `AI_SDK_DEVTOOLS_PORT` to use a different port).

## Notes

- `base/tool-calling.ts` and `base/tool-calling-streaming.ts` ship inside the published skill.
- The Anthropic reasoning/tool path defaults to `claude-sonnet-4.6` — the model verified live with `thinking`, `sendReasoning`, `effort`, `toolStreaming`, and `disableParallelToolUse`.
- Google examples use friendly aliases because the package maps verified Gemini aliases to Foundry RIDs.
- The safe runner resolves short names through `examples/base/` first, then `examples/advanced/`.

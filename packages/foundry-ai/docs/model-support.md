# Model Support

`@nyrra/foundry-ai` exposes language-model entrypoints only. It does not currently expose embeddings, image generation, speech, transcription, video, or rerank methods even though some upstream Foundry proxy endpoints exist.

## Provider summary

| Provider | Package import | Foundry proxy family | Default live model | Notes |
|---|---|---|---|---|
| OpenAI | `@nyrra/foundry-ai/openai` | `/api/v2/llm/proxy/openai/v1` | `gpt-5-mini` | Uses Responses-compatible transport and Foundry-specific compatibility defaults |
| Anthropic | `@nyrra/foundry-ai/anthropic` | `/api/v2/llm/proxy/anthropic/v1` | `claude-sonnet-4.6` | Preserves Anthropic provider options and uses bearer auth |
| Google | `@nyrra/foundry-ai/google` | `/api/v2/llm/proxy/google/v1` | `gemini-3.1-flash-lite` | Beta Foundry proxy surface with bearer-auth rewrite |

## Known aliases

### OpenAI

- `gpt-4.1`
- `gpt-4.1-mini`
- `gpt-4.1-nano`
- `gpt-4o`
- `gpt-4o-mini`
- `gpt-5`
- `gpt-5-codex`
- `gpt-5-mini`
- `gpt-5-nano`
- `gpt-5.1`
- `gpt-5.1-codex`
- `gpt-5.1-codex-mini`
- `gpt-5.2`
- `gpt-5.4`
- `gpt-5.4-mini`
- `gpt-5.4-nano`
- `o3`
- `o4-mini`

### Anthropic

- `claude-3.5-haiku`
- `claude-3.7-sonnet`
- `claude-haiku-4.5`
- `claude-opus-4`
- `claude-opus-4.1`
- `claude-opus-4.5`
- `claude-opus-4.6`
- `claude-sonnet-4`
- `claude-sonnet-4.5`
- `claude-sonnet-4.6`

### Google

- `gemini-2.5-pro`
- `gemini-2.5-flash`
- `gemini-2.5-flash-lite`
- `gemini-3-pro`
- `gemini-3-flash`
- `gemini-3.1-pro`
- `gemini-3.1-flash-lite`

## Supported model ID patterns

- Known aliases resolve to the package catalog and then to Foundry RIDs.
- Raw Foundry RIDs pass through unchanged when you call a provider factory directly.
- Reverse RID lookup is available through `MODEL_CATALOG_BY_RID` and catalog helpers from the root entrypoint.

## Important behavior notes

- OpenAI traffic always sets `providerOptions.openai.store = false`.
- Setting `providerOptions.openai.store = true` throws before the request is sent.
- Known OpenAI reasoning aliases automatically get `forceReasoning = true` unless the caller already set it.
- Google support should be treated as beta until the Foundry proxy contract is more stable.
- Multi-provider routing belongs in application code, not this package.

## Live verification

The checked-in [live capability matrix](./live-capability-matrix.md) is the canonical model-by-capability record.

The current snapshot shows:

- OpenAI hard-gate model: `gpt-5-mini`
- Anthropic hard-gate model: `claude-sonnet-4.6`
- Google hard-gate model: `gemini-3.1-flash-lite`

For the latest row-by-row pass/fail details, use the matrix rather than guessing from this summary doc.

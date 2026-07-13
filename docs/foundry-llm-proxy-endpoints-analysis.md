# Foundry LLM Proxy Endpoints Analysis

This note trims the endpoint discussion down to what looks relevant and defensible for a future package feature.

## Bottom line

- `@nyrra/foundry-ai` already targets Foundry's current provider-compatible proxy family under `/api/v2/llm/proxy/...`.
- Those endpoints use provider-shaped requests and responses, but model selection stays Foundry-native through RIDs.
- I did not find evidence of a second provider-compatible endpoint family that should replace the proxy-first transport strategy.

## What looks solid

- OpenAI, Anthropic, and Google proxy paths are the current public transport surface we should design around.
- The package's existing value remains the same:
  - alias-to-RID catalog
  - raw RID passthrough
  - provider-specific compatibility handling
  - live harness verification
- Google should still be treated as less stable than OpenAI and Anthropic because the public proxy surface is beta.

## What seems relevant for future work

- Foundry-native runtimes likely need runtime adapters, not a different transport abstraction.
- The missing pieces are around runtime plumbing:
  - base URL / token acquisition
  - fetch injection
  - attribution and tracing propagation
- Embeddings are the clearest additional modality to evaluate next because Foundry documents an OpenAI-compatible embeddings proxy.

## What I would avoid claiming

- Full support for TypeScript v1 (TSv1) or TypeScript v2 (TSv2) standalone functions today.
- Full support for `PlatformClient` or `@osdk/client` fetch wiring today.
- A need for a separate non-proxy provider transport before we have evidence that the documented proxy family is insufficient.

## Practical product direction

- Keep the package proxy-first.
- Add runtime-specific adapters only when they are validated end to end.
- Treat any new modality or runtime as a separately verified feature instead of broadening the docs claim first.

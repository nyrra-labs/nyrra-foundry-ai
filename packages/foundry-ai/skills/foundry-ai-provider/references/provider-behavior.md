# Provider Behavior

- OpenAI: `@shpit/foundry-ai`, `ai`, `@ai-sdk/openai`
- Anthropic: `@shpit/foundry-ai`, `ai`, `@ai-sdk/anthropic`
- Google: `@shpit/foundry-ai`, `ai`, `@ai-sdk/google`
- Multi-provider app: install only the peers you actually route to

- Known aliases resolve through the shared package catalog.
- Raw Foundry RIDs pass through unchanged when you call a provider factory directly.
- Use application code for multi-provider routing. There is no package-level registry helper.

- Uses Foundry's OpenAI proxy base URL.
- Always sends `providerOptions.openai.store = false`.
- Throws early when a caller sets `providerOptions.openai.store = true`.
- Automatically sets `forceReasoning = true` for known OpenAI reasoning aliases unless the caller already set it.
- Defaults function tools to `strict = true` only when the caller left `strict` unspecified.
- Exposes `embeddingModel()` and `embedding()` for `text-embedding-3-small`, `text-embedding-3-large`, and raw Foundry RIDs.

- Uses bearer auth through the Anthropic SDK's `authToken` path.
- Preserves Anthropic provider options instead of rewriting them.

- Uses Foundry's beta Google-compatible proxy.
- Rewrites the AI SDK's `x-goog-api-key` header into `Authorization: Bearer`.
- Should be treated as less stable than the OpenAI and Anthropic paths.

Unsupported surfaces:

- Anthropic and Google embeddings
- image generation
- speech
- transcription
- video
- rerank

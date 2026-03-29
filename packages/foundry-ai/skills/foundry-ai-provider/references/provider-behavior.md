# Provider Behavior

- OpenAI: `@nyrra/foundry-ai`, `ai`, `@ai-sdk/openai`
- Anthropic: `@nyrra/foundry-ai`, `ai`, `@ai-sdk/anthropic`
- Google: `@nyrra/foundry-ai`, `ai`, `@ai-sdk/google`
- Multi-provider app: install only the peers you actually route to

- Known aliases resolve through the shared package catalog.
- Raw Foundry RIDs pass through unchanged when you call a provider factory directly.
- Use application code for multi-provider routing. There is no package-level registry helper.

- Uses Foundry's OpenAI proxy base URL.
- Always sends `providerOptions.openai.store = false`.
- Throws early when a caller sets `providerOptions.openai.store = true`.
- Automatically sets `forceReasoning = true` for known OpenAI reasoning aliases unless the caller already set it.
- Defaults function tools to `strict = true` only when the caller left `strict` unspecified.

- Uses bearer auth through the Anthropic SDK's `authToken` path.
- Preserves Anthropic provider options instead of rewriting them.

- Uses Foundry's beta Google-compatible proxy.
- Rewrites the AI SDK's `x-goog-api-key` header into `Authorization: Bearer`.
- Should be treated as less stable than the OpenAI and Anthropic paths.

Unsupported surfaces:

- embeddings
- image generation
- speech
- transcription
- video
- rerank

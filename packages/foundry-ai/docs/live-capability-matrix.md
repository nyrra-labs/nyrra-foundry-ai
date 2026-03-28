# Live Capability Matrix

Generated from the latest local live verification artifact.

- Run ID: `2026-03-28T02-23-38.080Z-f7c393`
- Git SHA: `9ee4c6b`
- Package Version: `0.0.1`
- Artifact: `.memory/capability-runs/2026-03-28T02-23-38.080Z-f7c393`
- Started: 2026-03-28T02:23:38.089Z
- Finished: 2026-03-28T02:24:55.574Z
- Models: openai=`gpt-5-mini`, anthropic=`claude-sonnet-4.6`, google=`gemini-3.1-flash-lite`
- Status Counts: `pass`: 29, `skipped`: 18, `proxy-rejected`: 2

The live suite is the canonical verification surface for proxy-sensitive behavior. Rows marked `skipped` are intentionally out of scope for the current stack or package surface. Rows marked `proxy-rejected` are real proxy or request-shape failures that need investigation.

## Provider Summary

| Provider | Pass | Skipped | Proxy Rejected | Unsupported | Fail |
|---|---:|---:|---:|---:|---:|
| anthropic | 9 | 6 | 1 | 0 | 0 |
| google | 9 | 7 | 0 | 0 | 0 |
| openai | 11 | 5 | 1 | 0 | 0 |

## Detailed Rows

| Provider | Capability | Status | Model | Duration ms | Notes |
|---|---|---|---|---:|---|
| openai | text.generate | pass | `gpt-5-mini` | 1629 | none |
| openai | messages.generate | pass | `gpt-5-mini` | 2215 | none |
| openai | rid.passthrough | pass | `ri.language-model-service..language-model.gpt-5-mini` | 1621 | none |
| openai | text.stream | pass | `gpt-5-mini` | 1204 | none |
| openai | structured.output.object | pass | `gpt-5-mini` | 2291 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-mini` | 2292 | none |
| openai | agent.tool_loop | pass | `gpt-5-mini` | 3493 | none |
| openai | structured.plus.tools | pass | `gpt-5-mini` | 3631 | none |
| openai | vision.image_input | proxy-rejected | `gpt-5-mini` | 72 | Bad Request |
| openai | modality.image_generation | skipped | `gpt-5-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-mini` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-mini` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-mini` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-sonnet-4.6` | 1535 | none |
| anthropic | messages.generate | pass | `claude-sonnet-4.6` | 1256 | none |
| anthropic | rid.passthrough | pass | `ri.language-model-service..language-model.anthropic-claude-4-6-sonnet` | 1515 | none |
| anthropic | text.stream | pass | `claude-sonnet-4.6` | 1927 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4.6` | 3514 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4.6` | 3324 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4.6` | 3434 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4.6` | 3890 | none |
| anthropic | vision.image_input | proxy-rejected | `claude-sonnet-4.6` | 64 | Bad Request |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4.6` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4.6` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-3.1-flash-lite` | 1164 | none |
| google | messages.generate | pass | `gemini-3.1-flash-lite` | 1068 | none |
| google | rid.passthrough | pass | `ri.language-model-service..language-model.gemini-3-1-flash-lite` | 876 | none |
| google | text.stream | pass | `gemini-3.1-flash-lite` | 1138 | none |
| google | structured.output.object | pass | `gemini-3.1-flash-lite` | 1421 | none |
| google | tool.loop.deterministic | pass | `gemini-3.1-flash-lite` | 2261 | none |
| google | agent.tool_loop | pass | `gemini-3.1-flash-lite` | 1831 | none |
| google | structured.plus.tools | pass | `gemini-3.1-flash-lite` | 2255 | none |
| google | vision.image_input | pass | `gemini-3.1-flash-lite` | 2364 | none |
| google | modality.image_generation | skipped | `gemini-3.1-flash-lite` | 1 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3.1-flash-lite` | 1 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.rerank is not supported by the package yet. |
| openai | reasoning.visibility | pass | `gpt-5-mini` | 18238 | none |
| anthropic | reasoning.visibility | pass | `claude-sonnet-4.6` | 1560 | none |
| google | reasoning.visibility | skipped | `gemini-3.1-flash-lite` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| openai | registry.routing | pass | `gpt-5-mini,claude-sonnet-4.6,gemini-3.1-flash-lite` | 4036 | none |
| openai | embedding.proxy_probe | pass | `text-embedding-3-small` | 319 | none |
| anthropic | embedding.proxy_probe | skipped | `claude-sonnet-4.6` | 1 | Anthropic embeddings are not configured as a supported matrix target yet. |
| google | embedding.proxy_probe | skipped | `gemini-3.1-flash-lite` | 0 | Google embedding probe model is not configured for this stack. |

## Non-Pass Details

### openai.vision.image_input

- Status: `proxy-rejected`
- Model: `gpt-5-mini`
- Notes: Bad Request

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-5-mini`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-5-mini`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-5-mini`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-5-mini`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-5-mini`
- Notes: openai.modality.rerank is not supported by the package yet.

### anthropic.vision.image_input

- Status: `proxy-rejected`
- Model: `claude-sonnet-4.6`
- Notes: Bad Request

### anthropic.modality.image_generation

- Status: `skipped`
- Model: `claude-sonnet-4.6`
- Notes: anthropic.modality.image_generation is not supported by the package yet.

### anthropic.modality.speech

- Status: `skipped`
- Model: `claude-sonnet-4.6`
- Notes: anthropic.modality.speech is not supported by the package yet.

### anthropic.modality.transcription

- Status: `skipped`
- Model: `claude-sonnet-4.6`
- Notes: anthropic.modality.transcription is not supported by the package yet.

### anthropic.modality.video

- Status: `skipped`
- Model: `claude-sonnet-4.6`
- Notes: anthropic.modality.video is not supported by the package yet.

### anthropic.modality.rerank

- Status: `skipped`
- Model: `claude-sonnet-4.6`
- Notes: anthropic.modality.rerank is not supported by the package yet.

### google.modality.image_generation

- Status: `skipped`
- Model: `gemini-3.1-flash-lite`
- Notes: google.modality.image_generation is not supported by the package yet.

### google.modality.speech

- Status: `skipped`
- Model: `gemini-3.1-flash-lite`
- Notes: google.modality.speech is not supported by the package yet.

### google.modality.transcription

- Status: `skipped`
- Model: `gemini-3.1-flash-lite`
- Notes: google.modality.transcription is not supported by the package yet.

### google.modality.video

- Status: `skipped`
- Model: `gemini-3.1-flash-lite`
- Notes: google.modality.video is not supported by the package yet.

### google.modality.rerank

- Status: `skipped`
- Model: `gemini-3.1-flash-lite`
- Notes: google.modality.rerank is not supported by the package yet.

### google.reasoning.visibility

- Status: `skipped`
- Model: `gemini-3.1-flash-lite`
- Notes: Google reasoning visibility is not currently asserted in this matrix.

### anthropic.embedding.proxy_probe

- Status: `skipped`
- Model: `claude-sonnet-4.6`
- Notes: Anthropic embeddings are not configured as a supported matrix target yet.

### google.embedding.proxy_probe

- Status: `skipped`
- Model: `gemini-3.1-flash-lite`
- Notes: Google embedding probe model is not configured for this stack.


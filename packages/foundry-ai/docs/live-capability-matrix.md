# Live Capability Matrix

Generated from the latest local live verification artifact.

- Run ID: `2026-03-28T07-45-09.047Z-dec73f`
- Git SHA: `fa67810`
- Package Version: `0.0.1`
- Artifact: `.memory/capability-runs/2026-03-28T07-45-09.047Z-dec73f`
- Started: 2026-03-28T07:45:09.798Z
- Finished: 2026-03-28T07:56:03.580Z
- Default Models: openai=`gpt-5-mini`, anthropic=`claude-sonnet-4.6`, google=`gemini-3.1-flash-lite`
- Model Scope: `catalog`
- Status Counts: `pass`: 287, `skipped`: 186, `proxy-rejected`: 7, `fail`: 19

The live suite is the canonical verification surface for proxy-sensitive behavior. The default per-provider models are the hard gate; the rest of the catalog rows are investigation coverage and are allowed to surface non-pass results without failing the suite. Rows marked `skipped` are intentionally out of scope for the current stack or package surface. Rows marked `proxy-rejected` are real proxy or request-shape failures that need investigation.

## Provider Summary

| Provider | Pass | Skipped | Proxy Rejected | Unsupported | Fail |
|---|---:|---:|---:|---:|---:|
| openai | 150 | 92 | 0 | 0 | 0 |
| anthropic | 85 | 51 | 0 | 0 | 15 |
| google | 52 | 43 | 7 | 0 | 4 |

## Provider Capability Tables

Rows are models. Columns are the primary live language-model capabilities. Newer models appear first within each provider.

### openai

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `gpt-5.4` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.2` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.1-codex-mini` | pass | pass | pass | pass | pass | pass | pass | pass | skipped | skipped |
| `gpt-5.1-codex` | pass | pass | pass | pass | pass | pass | pass | pass | skipped | skipped |
| `gpt-5.1` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-5-nano` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5-codex` | pass | pass | pass | pass | pass | pass | pass | pass | skipped | skipped |
| `gpt-5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-4.1-nano` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-4.1-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-4.1` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `o4-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-4o-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-4o` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `o3` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |


### anthropic

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `claude-sonnet-4.6` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-opus-4.6` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-sonnet-4.5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-opus-4.5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-haiku-4.5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-opus-4.1` | pass | pass | pass | pass | pass | fail | fail | fail | fail | fail |
| `claude-sonnet-4` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-opus-4` | pass | pass | pass | pass | pass | fail | fail | fail | fail | fail |
| `claude-3.7-sonnet` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-3.5-haiku` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |


### google

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `gemini-3.1-pro` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-3.1-flash-lite` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-3-pro` | proxy | proxy | proxy | fail | proxy | fail | proxy | proxy | proxy | skipped |
| `gemini-3-flash` | pass | pass | pass | pass | fail | pass | pass | pass | pass | skipped |
| `gemini-2.5-pro` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-2.5-flash-lite` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-2.5-flash` | pass | pass | pass | pass | pass | pass | fail | pass | pass | skipped |


## Detailed Rows

| Provider | Capability | Status | Model | Duration ms | Notes |
|---|---|---|---|---:|---|
| openai | rid.passthrough | pass | `gpt-5.4` | 1703 | none |
| openai | messages.generate | pass | `gpt-5.4` | 1713 | none |
| openai | text.generate | pass | `gpt-5.4` | 1717 | none |
| openai | structured.output.object | pass | `gpt-5.4` | 1928 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.4` | 2917 | none |
| openai | text.stream | pass | `gpt-5.4` | 2934 | none |
| openai | agent.tool_loop | pass | `gpt-5.4` | 2339 | none |
| openai | structured.plus.tools | pass | `gpt-5.4` | 4506 | none |
| openai | vision.image_input | pass | `gpt-5.4` | 3527 | none |
| openai | reasoning.visibility | pass | `gpt-5.4` | 1232 | none |
| openai | modality.image_generation | skipped | `gpt-5.4` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.4` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.4` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.4` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.4` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-5.2` | 1375 | none |
| openai | rid.passthrough | pass | `gpt-5.2` | 1878 | none |
| openai | text.generate | pass | `gpt-5.2` | 2072 | none |
| openai | text.stream | pass | `gpt-5.2` | 1647 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.2` | 2126 | none |
| openai | structured.output.object | pass | `gpt-5.2` | 3297 | none |
| openai | agent.tool_loop | pass | `gpt-5.2` | 4795 | none |
| openai | structured.plus.tools | pass | `gpt-5.2` | 4931 | none |
| openai | vision.image_input | pass | `gpt-5.2` | 3781 | none |
| openai | reasoning.visibility | pass | `gpt-5.2` | 951 | none |
| openai | modality.image_generation | skipped | `gpt-5.2` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.2` | 2 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.2` | 2 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.2` | 2 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.2` | 2 | openai.modality.rerank is not supported by the package yet. |
| openai | rid.passthrough | pass | `gpt-5.1-codex-mini` | 2311 | none |
| openai | text.stream | pass | `gpt-5.1-codex-mini` | 1049 | none |
| openai | text.generate | pass | `gpt-5.1-codex-mini` | 4297 | none |
| openai | messages.generate | pass | `gpt-5.1-codex-mini` | 5845 | none |
| openai | structured.output.object | pass | `gpt-5.1-codex-mini` | 3041 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1-codex-mini` | 3947 | none |
| openai | agent.tool_loop | pass | `gpt-5.1-codex-mini` | 4457 | none |
| openai | structured.plus.tools | pass | `gpt-5.1-codex-mini` | 8806 | none |
| openai | vision.image_input | skipped | `gpt-5.1-codex-mini` | 1 | Model "gpt-5.1-codex-mini" does not claim vision support. |
| openai | reasoning.visibility | skipped | `gpt-5.1-codex-mini` | 0 | OpenAI reasoning visibility is not asserted for gpt-5.1-codex-mini. |
| openai | modality.image_generation | skipped | `gpt-5.1-codex-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1-codex-mini` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1-codex-mini` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1-codex-mini` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1-codex-mini` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5.1-codex` | 1181 | none |
| openai | rid.passthrough | pass | `gpt-5.1-codex` | 1492 | none |
| openai | messages.generate | pass | `gpt-5.1-codex` | 1596 | none |
| openai | text.stream | pass | `gpt-5.1-codex` | 2231 | none |
| openai | structured.output.object | pass | `gpt-5.1-codex` | 2454 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1-codex` | 2398 | none |
| openai | agent.tool_loop | pass | `gpt-5.1-codex` | 3267 | none |
| openai | structured.plus.tools | pass | `gpt-5.1-codex` | 2495 | none |
| openai | vision.image_input | skipped | `gpt-5.1-codex` | 0 | Model "gpt-5.1-codex" does not claim vision support. |
| openai | reasoning.visibility | skipped | `gpt-5.1-codex` | 0 | OpenAI reasoning visibility is not asserted for gpt-5.1-codex. |
| openai | modality.image_generation | skipped | `gpt-5.1-codex` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1-codex` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1-codex` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1-codex` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1-codex` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-5.1` | 2514 | none |
| openai | rid.passthrough | pass | `gpt-5.1` | 2525 | none |
| openai | text.generate | pass | `gpt-5.1` | 2625 | none |
| openai | text.stream | pass | `gpt-5.1` | 1828 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1` | 2260 | none |
| openai | structured.output.object | pass | `gpt-5.1` | 3519 | none |
| openai | agent.tool_loop | pass | `gpt-5.1` | 4039 | none |
| openai | structured.plus.tools | pass | `gpt-5.1` | 7212 | none |
| openai | vision.image_input | pass | `gpt-5.1` | 5137 | none |
| openai | reasoning.visibility | skipped | `gpt-5.1` | 1 | OpenAI reasoning visibility is not asserted for gpt-5.1. |
| openai | modality.image_generation | skipped | `gpt-5.1` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | rid.passthrough | pass | `gpt-5-nano` | 2079 | none |
| openai | text.generate | pass | `gpt-5-nano` | 2381 | none |
| openai | messages.generate | pass | `gpt-5-nano` | 2631 | none |
| openai | text.stream | pass | `gpt-5-nano` | 2048 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-nano` | 3158 | none |
| openai | structured.output.object | pass | `gpt-5-nano` | 19511 | none |
| openai | agent.tool_loop | pass | `gpt-5-nano` | 40498 | none |
| openai | structured.plus.tools | pass | `gpt-5-nano` | 4009 | none |
| openai | vision.image_input | pass | `gpt-5-nano` | 7252 | none |
| openai | reasoning.visibility | pass | `gpt-5-nano` | 22338 | none |
| openai | modality.image_generation | skipped | `gpt-5-nano` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-nano` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-nano` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-nano` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-nano` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5-mini` | 1040 | none |
| openai | messages.generate | pass | `gpt-5-mini` | 1182 | none |
| openai | rid.passthrough | pass | `gpt-5-mini` | 1169 | none |
| openai | text.stream | pass | `gpt-5-mini` | 1633 | none |
| openai | structured.output.object | pass | `gpt-5-mini` | 2727 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-mini` | 2533 | none |
| openai | agent.tool_loop | pass | `gpt-5-mini` | 3605 | none |
| openai | structured.plus.tools | pass | `gpt-5-mini` | 3397 | none |
| openai | vision.image_input | pass | `gpt-5-mini` | 2187 | none |
| openai | reasoning.visibility | pass | `gpt-5-mini` | 3160 | none |
| openai | modality.image_generation | skipped | `gpt-5-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-mini` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-mini` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-mini` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-mini` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | rid.passthrough | pass | `gpt-5-codex` | 2107 | none |
| openai | text.generate | pass | `gpt-5-codex` | 2181 | none |
| openai | messages.generate | pass | `gpt-5-codex` | 2287 | none |
| openai | text.stream | pass | `gpt-5-codex` | 2778 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-codex` | 3773 | none |
| openai | structured.output.object | pass | `gpt-5-codex` | 4086 | none |
| openai | agent.tool_loop | pass | `gpt-5-codex` | 5344 | none |
| openai | structured.plus.tools | pass | `gpt-5-codex` | 4292 | none |
| openai | vision.image_input | skipped | `gpt-5-codex` | 1 | Model "gpt-5-codex" does not claim vision support. |
| openai | reasoning.visibility | skipped | `gpt-5-codex` | 0 | OpenAI reasoning visibility is not asserted for gpt-5-codex. |
| openai | modality.image_generation | skipped | `gpt-5-codex` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-codex` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-codex` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-codex` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-codex` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-5` | 1002 | none |
| openai | rid.passthrough | pass | `gpt-5` | 1938 | none |
| openai | text.generate | pass | `gpt-5` | 2306 | none |
| openai | text.stream | pass | `gpt-5` | 1406 | none |
| openai | tool.loop.deterministic | pass | `gpt-5` | 3090 | none |
| openai | structured.output.object | pass | `gpt-5` | 4004 | none |
| openai | agent.tool_loop | pass | `gpt-5` | 3537 | none |
| openai | structured.plus.tools | pass | `gpt-5` | 2714 | none |
| openai | vision.image_input | pass | `gpt-5` | 3382 | none |
| openai | reasoning.visibility | pass | `gpt-5` | 2765 | none |
| openai | modality.image_generation | skipped | `gpt-5` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4.1-nano` | 814 | none |
| openai | messages.generate | pass | `gpt-4.1-nano` | 1427 | none |
| openai | rid.passthrough | pass | `gpt-4.1-nano` | 1550 | none |
| openai | structured.output.object | pass | `gpt-4.1-nano` | 822 | none |
| openai | text.stream | pass | `gpt-4.1-nano` | 1493 | none |
| openai | agent.tool_loop | pass | `gpt-4.1-nano` | 2318 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1-nano` | 3251 | none |
| openai | structured.plus.tools | pass | `gpt-4.1-nano` | 2012 | none |
| openai | vision.image_input | pass | `gpt-4.1-nano` | 3216 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1-nano` | 1 | OpenAI reasoning visibility is not asserted for gpt-4.1-nano. |
| openai | modality.image_generation | skipped | `gpt-4.1-nano` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1-nano` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1-nano` | 2 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1-nano` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1-nano` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4.1-mini` | 1022 | none |
| openai | rid.passthrough | pass | `gpt-4.1-mini` | 1027 | none |
| openai | messages.generate | pass | `gpt-4.1-mini` | 1032 | none |
| openai | text.stream | pass | `gpt-4.1-mini` | 956 | none |
| openai | structured.output.object | pass | `gpt-4.1-mini` | 1442 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1-mini` | 2201 | none |
| openai | agent.tool_loop | pass | `gpt-4.1-mini` | 1357 | none |
| openai | structured.plus.tools | pass | `gpt-4.1-mini` | 1794 | none |
| openai | vision.image_input | pass | `gpt-4.1-mini` | 2995 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1-mini` | 0 | OpenAI reasoning visibility is not asserted for gpt-4.1-mini. |
| openai | modality.image_generation | skipped | `gpt-4.1-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1-mini` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1-mini` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1-mini` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1-mini` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-4.1` | 839 | none |
| openai | rid.passthrough | pass | `gpt-4.1` | 971 | none |
| openai | text.generate | pass | `gpt-4.1` | 1207 | none |
| openai | text.stream | pass | `gpt-4.1` | 1185 | none |
| openai | structured.output.object | pass | `gpt-4.1` | 1340 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1` | 2295 | none |
| openai | agent.tool_loop | pass | `gpt-4.1` | 2146 | none |
| openai | structured.plus.tools | pass | `gpt-4.1` | 1333 | none |
| openai | vision.image_input | pass | `gpt-4.1` | 2351 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1` | 1 | OpenAI reasoning visibility is not asserted for gpt-4.1. |
| openai | modality.image_generation | skipped | `gpt-4.1` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `o4-mini` | 1293 | none |
| openai | messages.generate | pass | `o4-mini` | 1666 | none |
| openai | rid.passthrough | pass | `o4-mini` | 2055 | none |
| openai | structured.output.object | pass | `o4-mini` | 2468 | none |
| openai | text.stream | pass | `o4-mini` | 2982 | none |
| openai | tool.loop.deterministic | pass | `o4-mini` | 3144 | none |
| openai | agent.tool_loop | pass | `o4-mini` | 2805 | none |
| openai | structured.plus.tools | pass | `o4-mini` | 3070 | none |
| openai | vision.image_input | pass | `o4-mini` | 3018 | none |
| openai | reasoning.visibility | pass | `o4-mini` | 1432 | none |
| openai | modality.image_generation | skipped | `o4-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `o4-mini` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `o4-mini` | 2 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `o4-mini` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `o4-mini` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-4o-mini` | 862 | none |
| openai | text.generate | pass | `gpt-4o-mini` | 872 | none |
| openai | rid.passthrough | pass | `gpt-4o-mini` | 874 | none |
| openai | structured.output.object | pass | `gpt-4o-mini` | 973 | none |
| openai | tool.loop.deterministic | pass | `gpt-4o-mini` | 1407 | none |
| openai | text.stream | pass | `gpt-4o-mini` | 1880 | none |
| openai | agent.tool_loop | pass | `gpt-4o-mini` | 1505 | none |
| openai | structured.plus.tools | pass | `gpt-4o-mini` | 1414 | none |
| openai | vision.image_input | pass | `gpt-4o-mini` | 1392 | none |
| openai | reasoning.visibility | skipped | `gpt-4o-mini` | 1 | OpenAI reasoning visibility is not asserted for gpt-4o-mini. |
| openai | modality.image_generation | skipped | `gpt-4o-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4o-mini` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4o-mini` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4o-mini` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4o-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | rid.passthrough | pass | `gpt-4o` | 616 | none |
| openai | messages.generate | pass | `gpt-4o` | 811 | none |
| openai | text.generate | pass | `gpt-4o` | 1065 | none |
| openai | text.stream | pass | `gpt-4o` | 827 | none |
| openai | structured.output.object | pass | `gpt-4o` | 1025 | none |
| openai | tool.loop.deterministic | pass | `gpt-4o` | 1408 | none |
| openai | agent.tool_loop | pass | `gpt-4o` | 2382 | none |
| openai | structured.plus.tools | pass | `gpt-4o` | 3319 | none |
| openai | vision.image_input | pass | `gpt-4o` | 1962 | none |
| openai | reasoning.visibility | skipped | `gpt-4o` | 1 | OpenAI reasoning visibility is not asserted for gpt-4o. |
| openai | modality.image_generation | skipped | `gpt-4o` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4o` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4o` | 2 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4o` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4o` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `o3` | 1311 | none |
| openai | messages.generate | pass | `o3` | 1421 | none |
| openai | rid.passthrough | pass | `o3` | 1471 | none |
| openai | text.stream | pass | `o3` | 1887 | none |
| openai | structured.output.object | pass | `o3` | 2297 | none |
| openai | tool.loop.deterministic | pass | `o3` | 2652 | none |
| openai | agent.tool_loop | pass | `o3` | 2726 | none |
| openai | structured.plus.tools | pass | `o3` | 2296 | none |
| openai | vision.image_input | pass | `o3` | 2795 | none |
| openai | reasoning.visibility | pass | `o3` | 1145 | none |
| openai | modality.image_generation | skipped | `o3` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `o3` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `o3` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `o3` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `o3` | 1 | openai.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-sonnet-4.6` | 1090 | none |
| anthropic | messages.generate | pass | `claude-sonnet-4.6` | 1546 | none |
| anthropic | rid.passthrough | pass | `claude-sonnet-4.6` | 1899 | none |
| anthropic | text.stream | pass | `claude-sonnet-4.6` | 1131 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4.6` | 3949 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4.6` | 3045 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4.6` | 18507 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4.6` | 2939 | none |
| anthropic | vision.image_input | pass | `claude-sonnet-4.6` | 3518 | none |
| anthropic | reasoning.visibility | pass | `claude-sonnet-4.6` | 1397 | none |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4.6` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4.6` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4.6` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4.6` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-opus-4.6` | 1541 | none |
| anthropic | messages.generate | pass | `claude-opus-4.6` | 1648 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4.6` | 1784 | none |
| anthropic | text.stream | pass | `claude-opus-4.6` | 1790 | none |
| anthropic | tool.loop.deterministic | pass | `claude-opus-4.6` | 2554 | none |
| anthropic | agent.tool_loop | pass | `claude-opus-4.6` | 2377 | none |
| anthropic | structured.output.object | pass | `claude-opus-4.6` | 7022 | none |
| anthropic | structured.plus.tools | pass | `claude-opus-4.6` | 2815 | none |
| anthropic | vision.image_input | pass | `claude-opus-4.6` | 3740 | none |
| anthropic | reasoning.visibility | pass | `claude-opus-4.6` | 2483 | none |
| anthropic | modality.image_generation | skipped | `claude-opus-4.6` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.6` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.6` | 2 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.6` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.6` | 2 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | messages.generate | pass | `claude-sonnet-4.5` | 1702 | none |
| anthropic | text.generate | pass | `claude-sonnet-4.5` | 1866 | none |
| anthropic | rid.passthrough | pass | `claude-sonnet-4.5` | 1930 | none |
| anthropic | text.stream | pass | `claude-sonnet-4.5` | 2221 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4.5` | 3447 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4.5` | 4276 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4.5` | 3523 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4.5` | 3606 | none |
| anthropic | vision.image_input | pass | `claude-sonnet-4.5` | 3218 | none |
| anthropic | reasoning.visibility | fail | `claude-sonnet-4.5` | 866 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4.5` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4.5` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4.5` | 1 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-opus-4.5` | 1441 | none |
| anthropic | messages.generate | pass | `claude-opus-4.5` | 1551 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4.5` | 2054 | none |
| anthropic | text.stream | pass | `claude-opus-4.5` | 2320 | none |
| anthropic | tool.loop.deterministic | pass | `claude-opus-4.5` | 2935 | none |
| anthropic | structured.output.object | pass | `claude-opus-4.5` | 4150 | none |
| anthropic | agent.tool_loop | pass | `claude-opus-4.5` | 3585 | none |
| anthropic | structured.plus.tools | pass | `claude-opus-4.5` | 2890 | none |
| anthropic | vision.image_input | pass | `claude-opus-4.5` | 2658 | none |
| anthropic | reasoning.visibility | pass | `claude-opus-4.5` | 1621 | none |
| anthropic | modality.image_generation | skipped | `claude-opus-4.5` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.5` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.5` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.5` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.5` | 1 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | messages.generate | pass | `claude-haiku-4.5` | 477 | none |
| anthropic | rid.passthrough | pass | `claude-haiku-4.5` | 702 | none |
| anthropic | text.generate | pass | `claude-haiku-4.5` | 1000 | none |
| anthropic | text.stream | pass | `claude-haiku-4.5` | 812 | none |
| anthropic | agent.tool_loop | pass | `claude-haiku-4.5` | 1153 | none |
| anthropic | structured.output.object | pass | `claude-haiku-4.5` | 1965 | none |
| anthropic | tool.loop.deterministic | pass | `claude-haiku-4.5` | 2194 | none |
| anthropic | structured.plus.tools | pass | `claude-haiku-4.5` | 1770 | none |
| anthropic | vision.image_input | pass | `claude-haiku-4.5` | 1060 | none |
| anthropic | reasoning.visibility | fail | `claude-haiku-4.5` | 197 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-haiku-4.5` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-haiku-4.5` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-haiku-4.5` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | rid.passthrough | pass | `claude-opus-4.1` | 1327 | none |
| anthropic | text.generate | pass | `claude-opus-4.1` | 1447 | none |
| anthropic | messages.generate | pass | `claude-opus-4.1` | 2142 | none |
| anthropic | text.stream | pass | `claude-opus-4.1` | 2390 | none |
| anthropic | structured.output.object | pass | `claude-opus-4.1` | 4067 | none |
| anthropic | tool.loop.deterministic | fail | `claude-opus-4.1` | 15015 | No output generated. Check the stream for errors. |
| anthropic | agent.tool_loop | fail | `claude-opus-4.1` | 19178 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | structured.plus.tools | fail | `claude-opus-4.1` | 19740 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | vision.image_input | fail | `claude-opus-4.1` | 15561 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | reasoning.visibility | fail | `claude-opus-4.1` | 1754 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-opus-4.1` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.1` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.1` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.1` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.1` | 1 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | rid.passthrough | pass | `claude-sonnet-4` | 1226 | none |
| anthropic | messages.generate | pass | `claude-sonnet-4` | 1232 | none |
| anthropic | text.generate | pass | `claude-sonnet-4` | 1235 | none |
| anthropic | text.stream | pass | `claude-sonnet-4` | 1206 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4` | 2355 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4` | 3188 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4` | 2677 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4` | 2459 | none |
| anthropic | vision.image_input | pass | `claude-sonnet-4` | 2172 | none |
| anthropic | reasoning.visibility | fail | `claude-sonnet-4` | 245 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-opus-4` | 1283 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4` | 1537 | none |
| anthropic | messages.generate | pass | `claude-opus-4` | 1624 | none |
| anthropic | text.stream | pass | `claude-opus-4` | 1822 | none |
| anthropic | structured.output.object | pass | `claude-opus-4` | 3414 | none |
| anthropic | tool.loop.deterministic | fail | `claude-opus-4` | 19520 | No output generated. Check the stream for errors. |
| anthropic | agent.tool_loop | fail | `claude-opus-4` | 19049 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | structured.plus.tools | fail | `claude-opus-4` | 17261 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | vision.image_input | fail | `claude-opus-4` | 17592 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | reasoning.visibility | fail | `claude-opus-4` | 2957 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-opus-4` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4` | 1 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-3.7-sonnet` | 653 | none |
| anthropic | messages.generate | pass | `claude-3.7-sonnet` | 1510 | none |
| anthropic | rid.passthrough | pass | `claude-3.7-sonnet` | 1512 | none |
| anthropic | text.stream | pass | `claude-3.7-sonnet` | 1290 | none |
| anthropic | agent.tool_loop | pass | `claude-3.7-sonnet` | 1999 | none |
| anthropic | structured.output.object | pass | `claude-3.7-sonnet` | 2841 | none |
| anthropic | tool.loop.deterministic | pass | `claude-3.7-sonnet` | 3055 | none |
| anthropic | structured.plus.tools | pass | `claude-3.7-sonnet` | 2843 | none |
| anthropic | vision.image_input | pass | `claude-3.7-sonnet` | 1696 | none |
| anthropic | reasoning.visibility | fail | `claude-3.7-sonnet` | 649 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-3.7-sonnet` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-3.7-sonnet` | 1 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-3.5-haiku` | 704 | none |
| anthropic | messages.generate | pass | `claude-3.5-haiku` | 990 | none |
| anthropic | rid.passthrough | pass | `claude-3.5-haiku` | 992 | none |
| anthropic | text.stream | pass | `claude-3.5-haiku` | 1146 | none |
| anthropic | tool.loop.deterministic | pass | `claude-3.5-haiku` | 1987 | none |
| anthropic | agent.tool_loop | pass | `claude-3.5-haiku` | 1924 | none |
| anthropic | structured.output.object | pass | `claude-3.5-haiku` | 2909 | none |
| anthropic | structured.plus.tools | pass | `claude-3.5-haiku` | 2804 | none |
| anthropic | vision.image_input | pass | `claude-3.5-haiku` | 1844 | none |
| anthropic | reasoning.visibility | fail | `claude-3.5-haiku` | 235 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-3.5-haiku` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-3.5-haiku` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-3.5-haiku` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-3.1-pro` | 3724 | none |
| google | messages.generate | pass | `gemini-3.1-pro` | 4388 | none |
| google | rid.passthrough | pass | `gemini-3.1-pro` | 4736 | none |
| google | text.stream | pass | `gemini-3.1-pro` | 5597 | none |
| google | tool.loop.deterministic | pass | `gemini-3.1-pro` | 6592 | none |
| google | agent.tool_loop | pass | `gemini-3.1-pro` | 6610 | none |
| google | structured.output.object | pass | `gemini-3.1-pro` | 12125 | none |
| google | structured.plus.tools | pass | `gemini-3.1-pro` | 7362 | none |
| google | vision.image_input | pass | `gemini-3.1-pro` | 4547 | none |
| google | reasoning.visibility | skipped | `gemini-3.1-pro` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3.1-pro` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3.1-pro` | 1 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3.1-pro` | 2 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3.1-pro` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3.1-pro` | 1 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-3.1-flash-lite` | 1169 | none |
| google | messages.generate | pass | `gemini-3.1-flash-lite` | 25961 | none |
| google | rid.passthrough | pass | `gemini-3.1-flash-lite` | 1495 | none |
| google | text.stream | pass | `gemini-3.1-flash-lite` | 757 | none |
| google | structured.output.object | pass | `gemini-3.1-flash-lite` | 1099 | none |
| google | tool.loop.deterministic | pass | `gemini-3.1-flash-lite` | 1957 | none |
| google | agent.tool_loop | pass | `gemini-3.1-flash-lite` | 2377 | none |
| google | structured.plus.tools | pass | `gemini-3.1-flash-lite` | 2232 | none |
| google | vision.image_input | pass | `gemini-3.1-flash-lite` | 1245 | none |
| google | reasoning.visibility | skipped | `gemini-3.1-flash-lite` | 0 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3.1-flash-lite` | 1 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | proxy-rejected | `gemini-3-pro` | 1764 | Not Found |
| google | rid.passthrough | proxy-rejected | `gemini-3-pro` | 2044 | Not Found |
| google | messages.generate | proxy-rejected | `gemini-3-pro` | 2251 | Not Found |
| google | text.stream | fail | `gemini-3-pro` | 1721 | No output generated. Check the stream for errors. |
| google | structured.output.object | proxy-rejected | `gemini-3-pro` | 1585 | Not Found |
| google | tool.loop.deterministic | fail | `gemini-3-pro` | 1482 | No output generated. Check the stream for errors. |
| google | agent.tool_loop | proxy-rejected | `gemini-3-pro` | 2085 | Not Found |
| google | structured.plus.tools | proxy-rejected | `gemini-3-pro` | 1449 | Not Found |
| google | vision.image_input | proxy-rejected | `gemini-3-pro` | 1600 | Not Found |
| google | reasoning.visibility | skipped | `gemini-3-pro` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3-pro` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3-pro` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3-pro` | 1 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3-pro` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3-pro` | 0 | google.modality.rerank is not supported by the package yet. |
| google | rid.passthrough | pass | `gemini-3-flash` | 1790 | none |
| google | messages.generate | pass | `gemini-3-flash` | 2234 | none |
| google | text.generate | pass | `gemini-3-flash` | 2241 | none |
| google | tool.loop.deterministic | pass | `gemini-3-flash` | 2242 | none |
| google | text.stream | pass | `gemini-3-flash` | 3471 | none |
| google | agent.tool_loop | pass | `gemini-3-flash` | 2862 | none |
| google | structured.output.object | fail | `gemini-3-flash` | 5478 | No output generated. |
| google | structured.plus.tools | pass | `gemini-3-flash` | 3725 | none |
| google | vision.image_input | pass | `gemini-3-flash` | 3613 | none |
| google | reasoning.visibility | skipped | `gemini-3-flash` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3-flash` | 1 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3-flash` | 1 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3-flash` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3-flash` | 1 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3-flash` | 1 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-2.5-pro` | 2286 | none |
| google | rid.passthrough | pass | `gemini-2.5-pro` | 2976 | none |
| google | messages.generate | pass | `gemini-2.5-pro` | 4080 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-pro` | 3335 | none |
| google | text.stream | pass | `gemini-2.5-pro` | 5290 | none |
| google | structured.output.object | pass | `gemini-2.5-pro` | 7106 | none |
| google | agent.tool_loop | pass | `gemini-2.5-pro` | 4139 | none |
| google | structured.plus.tools | pass | `gemini-2.5-pro` | 8174 | none |
| google | vision.image_input | pass | `gemini-2.5-pro` | 3266 | none |
| google | reasoning.visibility | skipped | `gemini-2.5-pro` | 0 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-pro` | 1 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-pro` | 1 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-pro` | 1 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-pro` | 1 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-pro` | 1 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-2.5-flash-lite` | 630 | none |
| google | rid.passthrough | pass | `gemini-2.5-flash-lite` | 855 | none |
| google | messages.generate | pass | `gemini-2.5-flash-lite` | 856 | none |
| google | structured.output.object | pass | `gemini-2.5-flash-lite` | 599 | none |
| google | text.stream | pass | `gemini-2.5-flash-lite` | 829 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-flash-lite` | 1329 | none |
| google | agent.tool_loop | pass | `gemini-2.5-flash-lite` | 1454 | none |
| google | structured.plus.tools | pass | `gemini-2.5-flash-lite` | 1398 | none |
| google | vision.image_input | pass | `gemini-2.5-flash-lite` | 1502 | none |
| google | reasoning.visibility | skipped | `gemini-2.5-flash-lite` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-flash-lite` | 1 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-flash-lite` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-flash-lite` | 1 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-flash-lite` | 1 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-flash-lite` | 1 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-2.5-flash` | 616 | none |
| google | messages.generate | pass | `gemini-2.5-flash` | 730 | none |
| google | rid.passthrough | pass | `gemini-2.5-flash` | 1201 | none |
| google | text.stream | pass | `gemini-2.5-flash` | 1975 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-flash` | 1643 | none |
| google | structured.output.object | pass | `gemini-2.5-flash` | 2674 | none |
| google | agent.tool_loop | fail | `gemini-2.5-flash` | 1838 | expected 'The regulatory signal for oncology is…' to match /agent/i |
| google | structured.plus.tools | pass | `gemini-2.5-flash` | 2045 | none |
| google | vision.image_input | pass | `gemini-2.5-flash` | 1841 | none |
| google | reasoning.visibility | skipped | `gemini-2.5-flash` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-flash` | 1 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-flash` | 1 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-flash` | 2 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-flash` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-flash` | 0 | google.modality.rerank is not supported by the package yet. |
| openai | registry.routing | pass | `gpt-5-mini,claude-sonnet-4.6,gemini-3.1-flash-lite` | 4807 | none |
| openai | embedding.proxy_probe | pass | `text-embedding-3-small` | 267 | none |
| anthropic | embedding.proxy_probe | skipped | `claude-sonnet-4.6` | 0 | Anthropic embeddings are not configured as a supported matrix target yet. |
| google | embedding.proxy_probe | skipped | `gemini-3.1-flash-lite` | 0 | Google embedding probe model is not configured for this stack. |

## Non-Pass Details

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-5.4`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-5.4`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-5.4`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-5.4`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-5.4`
- Notes: openai.modality.rerank is not supported by the package yet.

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-5.2`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-5.2`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-5.2`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-5.2`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-5.2`
- Notes: openai.modality.rerank is not supported by the package yet.

### openai.vision.image_input

- Status: `skipped`
- Model: `gpt-5.1-codex-mini`
- Notes: Model "gpt-5.1-codex-mini" does not claim vision support.

### openai.reasoning.visibility

- Status: `skipped`
- Model: `gpt-5.1-codex-mini`
- Notes: OpenAI reasoning visibility is not asserted for gpt-5.1-codex-mini.

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-5.1-codex-mini`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-5.1-codex-mini`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-5.1-codex-mini`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-5.1-codex-mini`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-5.1-codex-mini`
- Notes: openai.modality.rerank is not supported by the package yet.

### openai.vision.image_input

- Status: `skipped`
- Model: `gpt-5.1-codex`
- Notes: Model "gpt-5.1-codex" does not claim vision support.

### openai.reasoning.visibility

- Status: `skipped`
- Model: `gpt-5.1-codex`
- Notes: OpenAI reasoning visibility is not asserted for gpt-5.1-codex.

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-5.1-codex`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-5.1-codex`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-5.1-codex`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-5.1-codex`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-5.1-codex`
- Notes: openai.modality.rerank is not supported by the package yet.

### openai.reasoning.visibility

- Status: `skipped`
- Model: `gpt-5.1`
- Notes: OpenAI reasoning visibility is not asserted for gpt-5.1.

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-5.1`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-5.1`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-5.1`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-5.1`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-5.1`
- Notes: openai.modality.rerank is not supported by the package yet.

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-5-nano`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-5-nano`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-5-nano`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-5-nano`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-5-nano`
- Notes: openai.modality.rerank is not supported by the package yet.

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

### openai.vision.image_input

- Status: `skipped`
- Model: `gpt-5-codex`
- Notes: Model "gpt-5-codex" does not claim vision support.

### openai.reasoning.visibility

- Status: `skipped`
- Model: `gpt-5-codex`
- Notes: OpenAI reasoning visibility is not asserted for gpt-5-codex.

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-5-codex`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-5-codex`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-5-codex`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-5-codex`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-5-codex`
- Notes: openai.modality.rerank is not supported by the package yet.

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-5`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-5`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-5`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-5`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-5`
- Notes: openai.modality.rerank is not supported by the package yet.

### openai.reasoning.visibility

- Status: `skipped`
- Model: `gpt-4.1-nano`
- Notes: OpenAI reasoning visibility is not asserted for gpt-4.1-nano.

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-4.1-nano`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-4.1-nano`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-4.1-nano`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-4.1-nano`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-4.1-nano`
- Notes: openai.modality.rerank is not supported by the package yet.

### openai.reasoning.visibility

- Status: `skipped`
- Model: `gpt-4.1-mini`
- Notes: OpenAI reasoning visibility is not asserted for gpt-4.1-mini.

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-4.1-mini`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-4.1-mini`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-4.1-mini`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-4.1-mini`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-4.1-mini`
- Notes: openai.modality.rerank is not supported by the package yet.

### openai.reasoning.visibility

- Status: `skipped`
- Model: `gpt-4.1`
- Notes: OpenAI reasoning visibility is not asserted for gpt-4.1.

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-4.1`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-4.1`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-4.1`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-4.1`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-4.1`
- Notes: openai.modality.rerank is not supported by the package yet.

### openai.modality.image_generation

- Status: `skipped`
- Model: `o4-mini`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `o4-mini`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `o4-mini`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `o4-mini`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `o4-mini`
- Notes: openai.modality.rerank is not supported by the package yet.

### openai.reasoning.visibility

- Status: `skipped`
- Model: `gpt-4o-mini`
- Notes: OpenAI reasoning visibility is not asserted for gpt-4o-mini.

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-4o-mini`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-4o-mini`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-4o-mini`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-4o-mini`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-4o-mini`
- Notes: openai.modality.rerank is not supported by the package yet.

### openai.reasoning.visibility

- Status: `skipped`
- Model: `gpt-4o`
- Notes: OpenAI reasoning visibility is not asserted for gpt-4o.

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-4o`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-4o`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-4o`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-4o`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-4o`
- Notes: openai.modality.rerank is not supported by the package yet.

### openai.modality.image_generation

- Status: `skipped`
- Model: `o3`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `o3`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `o3`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `o3`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `o3`
- Notes: openai.modality.rerank is not supported by the package yet.

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

### anthropic.modality.image_generation

- Status: `skipped`
- Model: `claude-opus-4.6`
- Notes: anthropic.modality.image_generation is not supported by the package yet.

### anthropic.modality.speech

- Status: `skipped`
- Model: `claude-opus-4.6`
- Notes: anthropic.modality.speech is not supported by the package yet.

### anthropic.modality.transcription

- Status: `skipped`
- Model: `claude-opus-4.6`
- Notes: anthropic.modality.transcription is not supported by the package yet.

### anthropic.modality.video

- Status: `skipped`
- Model: `claude-opus-4.6`
- Notes: anthropic.modality.video is not supported by the package yet.

### anthropic.modality.rerank

- Status: `skipped`
- Model: `claude-opus-4.6`
- Notes: anthropic.modality.rerank is not supported by the package yet.

### anthropic.reasoning.visibility

- Status: `fail`
- Model: `claude-sonnet-4.5`
- Notes: No output generated. Check the stream for errors.

### anthropic.modality.image_generation

- Status: `skipped`
- Model: `claude-sonnet-4.5`
- Notes: anthropic.modality.image_generation is not supported by the package yet.

### anthropic.modality.speech

- Status: `skipped`
- Model: `claude-sonnet-4.5`
- Notes: anthropic.modality.speech is not supported by the package yet.

### anthropic.modality.transcription

- Status: `skipped`
- Model: `claude-sonnet-4.5`
- Notes: anthropic.modality.transcription is not supported by the package yet.

### anthropic.modality.video

- Status: `skipped`
- Model: `claude-sonnet-4.5`
- Notes: anthropic.modality.video is not supported by the package yet.

### anthropic.modality.rerank

- Status: `skipped`
- Model: `claude-sonnet-4.5`
- Notes: anthropic.modality.rerank is not supported by the package yet.

### anthropic.modality.image_generation

- Status: `skipped`
- Model: `claude-opus-4.5`
- Notes: anthropic.modality.image_generation is not supported by the package yet.

### anthropic.modality.speech

- Status: `skipped`
- Model: `claude-opus-4.5`
- Notes: anthropic.modality.speech is not supported by the package yet.

### anthropic.modality.transcription

- Status: `skipped`
- Model: `claude-opus-4.5`
- Notes: anthropic.modality.transcription is not supported by the package yet.

### anthropic.modality.video

- Status: `skipped`
- Model: `claude-opus-4.5`
- Notes: anthropic.modality.video is not supported by the package yet.

### anthropic.modality.rerank

- Status: `skipped`
- Model: `claude-opus-4.5`
- Notes: anthropic.modality.rerank is not supported by the package yet.

### anthropic.reasoning.visibility

- Status: `fail`
- Model: `claude-haiku-4.5`
- Notes: No output generated. Check the stream for errors.

### anthropic.modality.image_generation

- Status: `skipped`
- Model: `claude-haiku-4.5`
- Notes: anthropic.modality.image_generation is not supported by the package yet.

### anthropic.modality.speech

- Status: `skipped`
- Model: `claude-haiku-4.5`
- Notes: anthropic.modality.speech is not supported by the package yet.

### anthropic.modality.transcription

- Status: `skipped`
- Model: `claude-haiku-4.5`
- Notes: anthropic.modality.transcription is not supported by the package yet.

### anthropic.modality.video

- Status: `skipped`
- Model: `claude-haiku-4.5`
- Notes: anthropic.modality.video is not supported by the package yet.

### anthropic.modality.rerank

- Status: `skipped`
- Model: `claude-haiku-4.5`
- Notes: anthropic.modality.rerank is not supported by the package yet.

### anthropic.tool.loop.deterministic

- Status: `fail`
- Model: `claude-opus-4.1`
- Notes: No output generated. Check the stream for errors.

### anthropic.agent.tool_loop

- Status: `fail`
- Model: `claude-opus-4.1`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

### anthropic.structured.plus.tools

- Status: `fail`
- Model: `claude-opus-4.1`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

### anthropic.vision.image_input

- Status: `fail`
- Model: `claude-opus-4.1`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

### anthropic.reasoning.visibility

- Status: `fail`
- Model: `claude-opus-4.1`
- Notes: No output generated. Check the stream for errors.

### anthropic.modality.image_generation

- Status: `skipped`
- Model: `claude-opus-4.1`
- Notes: anthropic.modality.image_generation is not supported by the package yet.

### anthropic.modality.speech

- Status: `skipped`
- Model: `claude-opus-4.1`
- Notes: anthropic.modality.speech is not supported by the package yet.

### anthropic.modality.transcription

- Status: `skipped`
- Model: `claude-opus-4.1`
- Notes: anthropic.modality.transcription is not supported by the package yet.

### anthropic.modality.video

- Status: `skipped`
- Model: `claude-opus-4.1`
- Notes: anthropic.modality.video is not supported by the package yet.

### anthropic.modality.rerank

- Status: `skipped`
- Model: `claude-opus-4.1`
- Notes: anthropic.modality.rerank is not supported by the package yet.

### anthropic.reasoning.visibility

- Status: `fail`
- Model: `claude-sonnet-4`
- Notes: No output generated. Check the stream for errors.

### anthropic.modality.image_generation

- Status: `skipped`
- Model: `claude-sonnet-4`
- Notes: anthropic.modality.image_generation is not supported by the package yet.

### anthropic.modality.speech

- Status: `skipped`
- Model: `claude-sonnet-4`
- Notes: anthropic.modality.speech is not supported by the package yet.

### anthropic.modality.transcription

- Status: `skipped`
- Model: `claude-sonnet-4`
- Notes: anthropic.modality.transcription is not supported by the package yet.

### anthropic.modality.video

- Status: `skipped`
- Model: `claude-sonnet-4`
- Notes: anthropic.modality.video is not supported by the package yet.

### anthropic.modality.rerank

- Status: `skipped`
- Model: `claude-sonnet-4`
- Notes: anthropic.modality.rerank is not supported by the package yet.

### anthropic.tool.loop.deterministic

- Status: `fail`
- Model: `claude-opus-4`
- Notes: No output generated. Check the stream for errors.

### anthropic.agent.tool_loop

- Status: `fail`
- Model: `claude-opus-4`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

### anthropic.structured.plus.tools

- Status: `fail`
- Model: `claude-opus-4`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

### anthropic.vision.image_input

- Status: `fail`
- Model: `claude-opus-4`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

### anthropic.reasoning.visibility

- Status: `fail`
- Model: `claude-opus-4`
- Notes: No output generated. Check the stream for errors.

### anthropic.modality.image_generation

- Status: `skipped`
- Model: `claude-opus-4`
- Notes: anthropic.modality.image_generation is not supported by the package yet.

### anthropic.modality.speech

- Status: `skipped`
- Model: `claude-opus-4`
- Notes: anthropic.modality.speech is not supported by the package yet.

### anthropic.modality.transcription

- Status: `skipped`
- Model: `claude-opus-4`
- Notes: anthropic.modality.transcription is not supported by the package yet.

### anthropic.modality.video

- Status: `skipped`
- Model: `claude-opus-4`
- Notes: anthropic.modality.video is not supported by the package yet.

### anthropic.modality.rerank

- Status: `skipped`
- Model: `claude-opus-4`
- Notes: anthropic.modality.rerank is not supported by the package yet.

### anthropic.reasoning.visibility

- Status: `fail`
- Model: `claude-3.7-sonnet`
- Notes: No output generated. Check the stream for errors.

### anthropic.modality.image_generation

- Status: `skipped`
- Model: `claude-3.7-sonnet`
- Notes: anthropic.modality.image_generation is not supported by the package yet.

### anthropic.modality.speech

- Status: `skipped`
- Model: `claude-3.7-sonnet`
- Notes: anthropic.modality.speech is not supported by the package yet.

### anthropic.modality.transcription

- Status: `skipped`
- Model: `claude-3.7-sonnet`
- Notes: anthropic.modality.transcription is not supported by the package yet.

### anthropic.modality.video

- Status: `skipped`
- Model: `claude-3.7-sonnet`
- Notes: anthropic.modality.video is not supported by the package yet.

### anthropic.modality.rerank

- Status: `skipped`
- Model: `claude-3.7-sonnet`
- Notes: anthropic.modality.rerank is not supported by the package yet.

### anthropic.reasoning.visibility

- Status: `fail`
- Model: `claude-3.5-haiku`
- Notes: No output generated. Check the stream for errors.

### anthropic.modality.image_generation

- Status: `skipped`
- Model: `claude-3.5-haiku`
- Notes: anthropic.modality.image_generation is not supported by the package yet.

### anthropic.modality.speech

- Status: `skipped`
- Model: `claude-3.5-haiku`
- Notes: anthropic.modality.speech is not supported by the package yet.

### anthropic.modality.transcription

- Status: `skipped`
- Model: `claude-3.5-haiku`
- Notes: anthropic.modality.transcription is not supported by the package yet.

### anthropic.modality.video

- Status: `skipped`
- Model: `claude-3.5-haiku`
- Notes: anthropic.modality.video is not supported by the package yet.

### anthropic.modality.rerank

- Status: `skipped`
- Model: `claude-3.5-haiku`
- Notes: anthropic.modality.rerank is not supported by the package yet.

### google.reasoning.visibility

- Status: `skipped`
- Model: `gemini-3.1-pro`
- Notes: Google reasoning visibility is not currently asserted in this matrix.

### google.modality.image_generation

- Status: `skipped`
- Model: `gemini-3.1-pro`
- Notes: google.modality.image_generation is not supported by the package yet.

### google.modality.speech

- Status: `skipped`
- Model: `gemini-3.1-pro`
- Notes: google.modality.speech is not supported by the package yet.

### google.modality.transcription

- Status: `skipped`
- Model: `gemini-3.1-pro`
- Notes: google.modality.transcription is not supported by the package yet.

### google.modality.video

- Status: `skipped`
- Model: `gemini-3.1-pro`
- Notes: google.modality.video is not supported by the package yet.

### google.modality.rerank

- Status: `skipped`
- Model: `gemini-3.1-pro`
- Notes: google.modality.rerank is not supported by the package yet.

### google.reasoning.visibility

- Status: `skipped`
- Model: `gemini-3.1-flash-lite`
- Notes: Google reasoning visibility is not currently asserted in this matrix.

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

### google.text.generate

- Status: `proxy-rejected`
- Model: `gemini-3-pro`
- Notes: Not Found

### google.rid.passthrough

- Status: `proxy-rejected`
- Model: `gemini-3-pro`
- Notes: Not Found

### google.messages.generate

- Status: `proxy-rejected`
- Model: `gemini-3-pro`
- Notes: Not Found

### google.text.stream

- Status: `fail`
- Model: `gemini-3-pro`
- Notes: No output generated. Check the stream for errors.

### google.structured.output.object

- Status: `proxy-rejected`
- Model: `gemini-3-pro`
- Notes: Not Found

### google.tool.loop.deterministic

- Status: `fail`
- Model: `gemini-3-pro`
- Notes: No output generated. Check the stream for errors.

### google.agent.tool_loop

- Status: `proxy-rejected`
- Model: `gemini-3-pro`
- Notes: Not Found

### google.structured.plus.tools

- Status: `proxy-rejected`
- Model: `gemini-3-pro`
- Notes: Not Found

### google.vision.image_input

- Status: `proxy-rejected`
- Model: `gemini-3-pro`
- Notes: Not Found

### google.reasoning.visibility

- Status: `skipped`
- Model: `gemini-3-pro`
- Notes: Google reasoning visibility is not currently asserted in this matrix.

### google.modality.image_generation

- Status: `skipped`
- Model: `gemini-3-pro`
- Notes: google.modality.image_generation is not supported by the package yet.

### google.modality.speech

- Status: `skipped`
- Model: `gemini-3-pro`
- Notes: google.modality.speech is not supported by the package yet.

### google.modality.transcription

- Status: `skipped`
- Model: `gemini-3-pro`
- Notes: google.modality.transcription is not supported by the package yet.

### google.modality.video

- Status: `skipped`
- Model: `gemini-3-pro`
- Notes: google.modality.video is not supported by the package yet.

### google.modality.rerank

- Status: `skipped`
- Model: `gemini-3-pro`
- Notes: google.modality.rerank is not supported by the package yet.

### google.structured.output.object

- Status: `fail`
- Model: `gemini-3-flash`
- Notes: No output generated.

### google.reasoning.visibility

- Status: `skipped`
- Model: `gemini-3-flash`
- Notes: Google reasoning visibility is not currently asserted in this matrix.

### google.modality.image_generation

- Status: `skipped`
- Model: `gemini-3-flash`
- Notes: google.modality.image_generation is not supported by the package yet.

### google.modality.speech

- Status: `skipped`
- Model: `gemini-3-flash`
- Notes: google.modality.speech is not supported by the package yet.

### google.modality.transcription

- Status: `skipped`
- Model: `gemini-3-flash`
- Notes: google.modality.transcription is not supported by the package yet.

### google.modality.video

- Status: `skipped`
- Model: `gemini-3-flash`
- Notes: google.modality.video is not supported by the package yet.

### google.modality.rerank

- Status: `skipped`
- Model: `gemini-3-flash`
- Notes: google.modality.rerank is not supported by the package yet.

### google.reasoning.visibility

- Status: `skipped`
- Model: `gemini-2.5-pro`
- Notes: Google reasoning visibility is not currently asserted in this matrix.

### google.modality.image_generation

- Status: `skipped`
- Model: `gemini-2.5-pro`
- Notes: google.modality.image_generation is not supported by the package yet.

### google.modality.speech

- Status: `skipped`
- Model: `gemini-2.5-pro`
- Notes: google.modality.speech is not supported by the package yet.

### google.modality.transcription

- Status: `skipped`
- Model: `gemini-2.5-pro`
- Notes: google.modality.transcription is not supported by the package yet.

### google.modality.video

- Status: `skipped`
- Model: `gemini-2.5-pro`
- Notes: google.modality.video is not supported by the package yet.

### google.modality.rerank

- Status: `skipped`
- Model: `gemini-2.5-pro`
- Notes: google.modality.rerank is not supported by the package yet.

### google.reasoning.visibility

- Status: `skipped`
- Model: `gemini-2.5-flash-lite`
- Notes: Google reasoning visibility is not currently asserted in this matrix.

### google.modality.image_generation

- Status: `skipped`
- Model: `gemini-2.5-flash-lite`
- Notes: google.modality.image_generation is not supported by the package yet.

### google.modality.speech

- Status: `skipped`
- Model: `gemini-2.5-flash-lite`
- Notes: google.modality.speech is not supported by the package yet.

### google.modality.transcription

- Status: `skipped`
- Model: `gemini-2.5-flash-lite`
- Notes: google.modality.transcription is not supported by the package yet.

### google.modality.video

- Status: `skipped`
- Model: `gemini-2.5-flash-lite`
- Notes: google.modality.video is not supported by the package yet.

### google.modality.rerank

- Status: `skipped`
- Model: `gemini-2.5-flash-lite`
- Notes: google.modality.rerank is not supported by the package yet.

### google.agent.tool_loop

- Status: `fail`
- Model: `gemini-2.5-flash`
- Notes: expected 'The regulatory signal for oncology is…' to match /agent/i

### google.reasoning.visibility

- Status: `skipped`
- Model: `gemini-2.5-flash`
- Notes: Google reasoning visibility is not currently asserted in this matrix.

### google.modality.image_generation

- Status: `skipped`
- Model: `gemini-2.5-flash`
- Notes: google.modality.image_generation is not supported by the package yet.

### google.modality.speech

- Status: `skipped`
- Model: `gemini-2.5-flash`
- Notes: google.modality.speech is not supported by the package yet.

### google.modality.transcription

- Status: `skipped`
- Model: `gemini-2.5-flash`
- Notes: google.modality.transcription is not supported by the package yet.

### google.modality.video

- Status: `skipped`
- Model: `gemini-2.5-flash`
- Notes: google.modality.video is not supported by the package yet.

### google.modality.rerank

- Status: `skipped`
- Model: `gemini-2.5-flash`
- Notes: google.modality.rerank is not supported by the package yet.

### anthropic.embedding.proxy_probe

- Status: `skipped`
- Model: `claude-sonnet-4.6`
- Notes: Anthropic embeddings are not configured as a supported matrix target yet.

### google.embedding.proxy_probe

- Status: `skipped`
- Model: `gemini-3.1-flash-lite`
- Notes: Google embedding probe model is not configured for this stack.


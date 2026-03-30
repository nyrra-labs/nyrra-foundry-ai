# Harness Capability Results

Generated from the latest local live verification harness artifact.

- Run ID: `2026-03-29T23-36-39.228Z-9e2c9a`
- Git SHA: `767e5de`
- Package Version: `0.0.2`
- Artifact: `.memory/capability-runs/2026-03-29T23-36-39.228Z-9e2c9a`
- Started: 2026-03-29T23:36:39.834Z
- Finished: 2026-03-29T23:50:09.621Z
- Default Models: openai=`gpt-5-mini`, anthropic=`claude-sonnet-4.6`, google=`gemini-3.1-flash-lite`
- Model Scope: `catalog`
- Status Counts: `pass`: 296, `skipped`: 181, `fail`: 22

The live suite is the canonical verification surface for proxy-sensitive behavior. The default per-provider models are the hard gate; the rest of the catalog rows are investigation coverage and are allowed to surface non-pass results without failing the suite. Survey coverage runs the current public catalog only. Rows marked `skipped` are intentionally out of scope for the current stack or package surface. Rows marked `proxy-rejected` are real proxy or request-shape failures that need investigation.

## Provider Summary

| Provider | Pass | Skipped | Proxy Rejected | Unsupported | Fail |
|---|---:|---:|---:|---:|---:|
| openai | 162 | 93 | 0 | 0 | 2 |
| anthropic | 80 | 51 | 0 | 0 | 20 |
| google | 54 | 37 | 0 | 0 | 0 |

## Provider Capability Tables

Rows are models. Columns are the primary live language-model capabilities. Newer models appear first within each provider.

### openai

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `gpt-5.4-nano` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.4-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.4` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.2` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.1-codex-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-5.1-codex` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-5.1` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-5-nano` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5-codex` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-4.1-nano` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-4.1-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-4.1` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `o4-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-4o` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `o3` | pass | pass | pass | pass | pass | pass | pass | fail | fail | pass |


### anthropic

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `claude-sonnet-4.6` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-opus-4.6` | pass | pass | pass | pass | pass | pass | pass | fail | fail | pass |
| `claude-sonnet-4.5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-opus-4.5` | pass | pass | pass | pass | pass | pass | pass | fail | fail | fail |
| `claude-haiku-4.5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-opus-4.1` | pass | pass | pass | pass | pass | fail | fail | fail | pass | fail |
| `claude-sonnet-4` | pass | pass | pass | pass | pass | pass | pass | fail | fail | fail |
| `claude-opus-4` | pass | pass | pass | pass | pass | fail | fail | fail | pass | fail |
| `claude-3.7-sonnet` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-3.5-haiku` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |


### google

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `gemini-3.1-pro` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-3.1-flash-lite` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-3-flash` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-2.5-pro` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-2.5-flash-lite` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-2.5-flash` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |


## Detailed Rows

| Provider | Capability | Status | Model | Duration ms | Notes |
|---|---|---|---|---:|---|
| openai | rid.passthrough | pass | `gpt-5.4-nano` | 2104 | none |
| openai | text.generate | pass | `gpt-5.4-nano` | 2455 | none |
| openai | messages.generate | pass | `gpt-5.4-nano` | 3027 | none |
| openai | text.stream | pass | `gpt-5.4-nano` | 1015 | none |
| openai | structured.output.object | pass | `gpt-5.4-nano` | 1185 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.4-nano` | 1507 | none |
| openai | agent.tool_loop | pass | `gpt-5.4-nano` | 3451 | none |
| openai | structured.plus.tools | pass | `gpt-5.4-nano` | 2608 | none |
| openai | vision.image_input | pass | `gpt-5.4-nano` | 6848 | none |
| openai | reasoning.visibility | pass | `gpt-5.4-nano` | 1028 | none |
| openai | modality.image_generation | skipped | `gpt-5.4-nano` | 2 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.4-nano` | 2 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.4-nano` | 2 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.4-nano` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.4-nano` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5.4-mini` | 1457 | none |
| openai | rid.passthrough | pass | `gpt-5.4-mini` | 1463 | none |
| openai | messages.generate | pass | `gpt-5.4-mini` | 1729 | none |
| openai | text.stream | pass | `gpt-5.4-mini` | 1555 | none |
| openai | structured.output.object | pass | `gpt-5.4-mini` | 2198 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.4-mini` | 2328 | none |
| openai | agent.tool_loop | pass | `gpt-5.4-mini` | 3416 | none |
| openai | structured.plus.tools | pass | `gpt-5.4-mini` | 3808 | none |
| openai | vision.image_input | pass | `gpt-5.4-mini` | 2741 | none |
| openai | reasoning.visibility | pass | `gpt-5.4-mini` | 950 | none |
| openai | modality.image_generation | skipped | `gpt-5.4-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.4-mini` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.4-mini` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.4-mini` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.4-mini` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5.4` | 1313 | none |
| openai | messages.generate | pass | `gpt-5.4` | 1649 | none |
| openai | rid.passthrough | pass | `gpt-5.4` | 2281 | none |
| openai | text.stream | pass | `gpt-5.4` | 1322 | none |
| openai | structured.output.object | pass | `gpt-5.4` | 2394 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.4` | 1969 | none |
| openai | agent.tool_loop | pass | `gpt-5.4` | 2972 | none |
| openai | structured.plus.tools | pass | `gpt-5.4` | 2928 | none |
| openai | vision.image_input | pass | `gpt-5.4` | 3526 | none |
| openai | reasoning.visibility | pass | `gpt-5.4` | 1534 | none |
| openai | modality.image_generation | skipped | `gpt-5.4` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.4` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.4` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.4` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.4` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | rid.passthrough | pass | `gpt-5.2` | 1212 | none |
| openai | messages.generate | pass | `gpt-5.2` | 1306 | none |
| openai | text.generate | pass | `gpt-5.2` | 1339 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.2` | 1721 | none |
| openai | structured.output.object | pass | `gpt-5.2` | 2183 | none |
| openai | text.stream | pass | `gpt-5.2` | 2329 | none |
| openai | agent.tool_loop | pass | `gpt-5.2` | 3670 | none |
| openai | structured.plus.tools | pass | `gpt-5.2` | 3409 | none |
| openai | vision.image_input | pass | `gpt-5.2` | 3970 | none |
| openai | reasoning.visibility | pass | `gpt-5.2` | 1267 | none |
| openai | modality.image_generation | skipped | `gpt-5.2` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.2` | 2 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.2` | 2 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.2` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.2` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | rid.passthrough | pass | `gpt-5.1-codex-mini` | 1532 | none |
| openai | text.generate | pass | `gpt-5.1-codex-mini` | 2092 | none |
| openai | messages.generate | pass | `gpt-5.1-codex-mini` | 2276 | none |
| openai | text.stream | pass | `gpt-5.1-codex-mini` | 1700 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1-codex-mini` | 1376 | none |
| openai | structured.output.object | pass | `gpt-5.1-codex-mini` | 1609 | none |
| openai | agent.tool_loop | pass | `gpt-5.1-codex-mini` | 4482 | none |
| openai | structured.plus.tools | pass | `gpt-5.1-codex-mini` | 4528 | none |
| openai | vision.image_input | pass | `gpt-5.1-codex-mini` | 4049 | none |
| openai | reasoning.visibility | skipped | `gpt-5.1-codex-mini` | 0 | OpenAI reasoning visibility is not asserted for gpt-5.1-codex-mini. |
| openai | modality.image_generation | skipped | `gpt-5.1-codex-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1-codex-mini` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1-codex-mini` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1-codex-mini` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1-codex-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | rid.passthrough | pass | `gpt-5.1-codex` | 1230 | none |
| openai | messages.generate | pass | `gpt-5.1-codex` | 1352 | none |
| openai | text.generate | pass | `gpt-5.1-codex` | 2062 | none |
| openai | text.stream | pass | `gpt-5.1-codex` | 1043 | none |
| openai | structured.output.object | pass | `gpt-5.1-codex` | 2303 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1-codex` | 1741 | none |
| openai | agent.tool_loop | pass | `gpt-5.1-codex` | 2953 | none |
| openai | structured.plus.tools | pass | `gpt-5.1-codex` | 3570 | none |
| openai | vision.image_input | pass | `gpt-5.1-codex` | 5775 | none |
| openai | reasoning.visibility | skipped | `gpt-5.1-codex` | 1 | OpenAI reasoning visibility is not asserted for gpt-5.1-codex. |
| openai | modality.image_generation | skipped | `gpt-5.1-codex` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1-codex` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1-codex` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1-codex` | 5 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1-codex` | 5 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-5.1` | 2447 | none |
| openai | rid.passthrough | pass | `gpt-5.1` | 2454 | none |
| openai | text.stream | pass | `gpt-5.1` | 1830 | none |
| openai | text.generate | pass | `gpt-5.1` | 4348 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1` | 3408 | none |
| openai | structured.output.object | pass | `gpt-5.1` | 5299 | none |
| openai | agent.tool_loop | pass | `gpt-5.1` | 5515 | none |
| openai | structured.plus.tools | pass | `gpt-5.1` | 2979 | none |
| openai | vision.image_input | pass | `gpt-5.1` | 5583 | none |
| openai | reasoning.visibility | skipped | `gpt-5.1` | 2 | OpenAI reasoning visibility is not asserted for gpt-5.1. |
| openai | modality.image_generation | skipped | `gpt-5.1` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1` | 3 | openai.modality.rerank is not supported by the package yet. |
| openai | rid.passthrough | pass | `gpt-5-nano` | 2866 | none |
| openai | text.generate | pass | `gpt-5-nano` | 2939 | none |
| openai | text.stream | pass | `gpt-5-nano` | 695 | none |
| openai | messages.generate | pass | `gpt-5-nano` | 3777 | none |
| openai | structured.output.object | pass | `gpt-5-nano` | 2382 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-nano` | 2002 | none |
| openai | agent.tool_loop | pass | `gpt-5-nano` | 3125 | none |
| openai | structured.plus.tools | pass | `gpt-5-nano` | 3482 | none |
| openai | vision.image_input | pass | `gpt-5-nano` | 2757 | none |
| openai | reasoning.visibility | pass | `gpt-5-nano` | 1809 | none |
| openai | modality.image_generation | skipped | `gpt-5-nano` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-nano` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-nano` | 2 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-nano` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-nano` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5-mini` | 1106 | none |
| openai | messages.generate | pass | `gpt-5-mini` | 1015 | none |
| openai | rid.passthrough | pass | `gpt-5-mini` | 843 | none |
| openai | text.stream | pass | `gpt-5-mini` | 1240 | none |
| openai | structured.output.object | pass | `gpt-5-mini` | 2120 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-mini` | 1925 | none |
| openai | agent.tool_loop | pass | `gpt-5-mini` | 2375 | none |
| openai | structured.plus.tools | pass | `gpt-5-mini` | 2865 | none |
| openai | vision.image_input | pass | `gpt-5-mini` | 2662 | none |
| openai | reasoning.visibility | pass | `gpt-5-mini` | 3322 | none |
| openai | modality.image_generation | skipped | `gpt-5-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-mini` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-mini` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-mini` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-5-codex` | 2198 | none |
| openai | text.generate | pass | `gpt-5-codex` | 2207 | none |
| openai | rid.passthrough | pass | `gpt-5-codex` | 3291 | none |
| openai | text.stream | pass | `gpt-5-codex` | 1332 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-codex` | 2592 | none |
| openai | structured.output.object | pass | `gpt-5-codex` | 3755 | none |
| openai | agent.tool_loop | pass | `gpt-5-codex` | 4398 | none |
| openai | structured.plus.tools | pass | `gpt-5-codex` | 7372 | none |
| openai | vision.image_input | pass | `gpt-5-codex` | 6141 | none |
| openai | reasoning.visibility | skipped | `gpt-5-codex` | 0 | OpenAI reasoning visibility is not asserted for gpt-5-codex. |
| openai | modality.image_generation | skipped | `gpt-5-codex` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-codex` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-codex` | 2 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-codex` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-codex` | 2 | openai.modality.rerank is not supported by the package yet. |
| openai | rid.passthrough | pass | `gpt-5` | 2314 | none |
| openai | messages.generate | pass | `gpt-5` | 3540 | none |
| openai | text.generate | pass | `gpt-5` | 3696 | none |
| openai | text.stream | pass | `gpt-5` | 2898 | none |
| openai | tool.loop.deterministic | pass | `gpt-5` | 1872 | none |
| openai | structured.output.object | pass | `gpt-5` | 4582 | none |
| openai | agent.tool_loop | pass | `gpt-5` | 6865 | none |
| openai | structured.plus.tools | pass | `gpt-5` | 3689 | none |
| openai | vision.image_input | pass | `gpt-5` | 2248 | none |
| openai | reasoning.visibility | pass | `gpt-5` | 3315 | none |
| openai | modality.image_generation | skipped | `gpt-5` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4.1-nano` | 474 | none |
| openai | messages.generate | pass | `gpt-4.1-nano` | 718 | none |
| openai | rid.passthrough | pass | `gpt-4.1-nano` | 1182 | none |
| openai | text.stream | pass | `gpt-4.1-nano` | 805 | none |
| openai | structured.output.object | pass | `gpt-4.1-nano` | 647 | none |
| openai | agent.tool_loop | pass | `gpt-4.1-nano` | 1642 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1-nano` | 1908 | none |
| openai | structured.plus.tools | pass | `gpt-4.1-nano` | 2095 | none |
| openai | vision.image_input | pass | `gpt-4.1-nano` | 3495 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1-nano` | 1 | OpenAI reasoning visibility is not asserted for gpt-4.1-nano. |
| openai | modality.image_generation | skipped | `gpt-4.1-nano` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1-nano` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1-nano` | 2 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1-nano` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1-nano` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-4.1-mini` | 738 | none |
| openai | rid.passthrough | pass | `gpt-4.1-mini` | 793 | none |
| openai | text.generate | pass | `gpt-4.1-mini` | 1363 | none |
| openai | text.stream | pass | `gpt-4.1-mini` | 762 | none |
| openai | structured.output.object | pass | `gpt-4.1-mini` | 989 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1-mini` | 1246 | none |
| openai | agent.tool_loop | pass | `gpt-4.1-mini` | 2752 | none |
| openai | structured.plus.tools | pass | `gpt-4.1-mini` | 2984 | none |
| openai | vision.image_input | pass | `gpt-4.1-mini` | 1908 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1-mini` | 0 | OpenAI reasoning visibility is not asserted for gpt-4.1-mini. |
| openai | modality.image_generation | skipped | `gpt-4.1-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1-mini` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1-mini` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1-mini` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1-mini` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4.1` | 644 | none |
| openai | text.stream | pass | `gpt-4.1` | 689 | none |
| openai | rid.passthrough | pass | `gpt-4.1` | 1648 | none |
| openai | messages.generate | pass | `gpt-4.1` | 1825 | none |
| openai | structured.output.object | pass | `gpt-4.1` | 1284 | none |
| openai | agent.tool_loop | pass | `gpt-4.1` | 1286 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1` | 2021 | none |
| openai | structured.plus.tools | pass | `gpt-4.1` | 3057 | none |
| openai | vision.image_input | pass | `gpt-4.1` | 1436 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1` | 1 | OpenAI reasoning visibility is not asserted for gpt-4.1. |
| openai | modality.image_generation | skipped | `gpt-4.1` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1` | 2 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1` | 2 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `o4-mini` | 1999 | none |
| openai | messages.generate | pass | `o4-mini` | 3023 | none |
| openai | rid.passthrough | pass | `o4-mini` | 3024 | none |
| openai | text.stream | pass | `o4-mini` | 2726 | none |
| openai | tool.loop.deterministic | pass | `o4-mini` | 2012 | none |
| openai | structured.output.object | pass | `o4-mini` | 2153 | none |
| openai | agent.tool_loop | pass | `o4-mini` | 2644 | none |
| openai | structured.plus.tools | pass | `o4-mini` | 2406 | none |
| openai | vision.image_input | pass | `o4-mini` | 2662 | none |
| openai | reasoning.visibility | pass | `o4-mini` | 1849 | none |
| openai | modality.image_generation | skipped | `o4-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `o4-mini` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `o4-mini` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `o4-mini` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `o4-mini` | 2 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4o` | 748 | none |
| openai | rid.passthrough | pass | `gpt-4o` | 990 | none |
| openai | messages.generate | pass | `gpt-4o` | 1056 | none |
| openai | text.stream | pass | `gpt-4o` | 956 | none |
| openai | structured.output.object | pass | `gpt-4o` | 1427 | none |
| openai | tool.loop.deterministic | pass | `gpt-4o` | 1462 | none |
| openai | agent.tool_loop | pass | `gpt-4o` | 1538 | none |
| openai | structured.plus.tools | pass | `gpt-4o` | 1624 | none |
| openai | vision.image_input | pass | `gpt-4o` | 2197 | none |
| openai | reasoning.visibility | skipped | `gpt-4o` | 0 | OpenAI reasoning visibility is not asserted for gpt-4o. |
| openai | modality.image_generation | skipped | `gpt-4o` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4o` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4o` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4o` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4o` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `o3` | 1316 | none |
| openai | text.generate | pass | `o3` | 1323 | none |
| openai | rid.passthrough | pass | `o3` | 1407 | none |
| openai | tool.loop.deterministic | pass | `o3` | 2568 | none |
| openai | structured.output.object | pass | `o3` | 2864 | none |
| openai | text.stream | pass | `o3` | 2993 | none |
| openai | agent.tool_loop | pass | `o3` | 2795 | none |
| openai | structured.plus.tools | fail | `o3` | 21995 | Failed after 3 attempts. Last error: Too Many Requests |
| openai | vision.image_input | fail | `o3` | 19011 | Failed after 3 attempts. Last error: Too Many Requests |
| openai | reasoning.visibility | pass | `o3` | 16833 | none |
| openai | modality.image_generation | skipped | `o3` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `o3` | 2 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `o3` | 2 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `o3` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `o3` | 1 | openai.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-sonnet-4.6` | 800 | none |
| anthropic | messages.generate | pass | `claude-sonnet-4.6` | 2319 | none |
| anthropic | rid.passthrough | pass | `claude-sonnet-4.6` | 686 | none |
| anthropic | text.stream | pass | `claude-sonnet-4.6` | 1469 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4.6` | 3798 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4.6` | 3420 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4.6` | 3042 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4.6` | 3081 | none |
| anthropic | vision.image_input | pass | `claude-sonnet-4.6` | 4030 | none |
| anthropic | reasoning.visibility | pass | `claude-sonnet-4.6` | 1546 | none |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4.6` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4.6` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-opus-4.6` | 1774 | none |
| anthropic | messages.generate | pass | `claude-opus-4.6` | 1782 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4.6` | 1787 | none |
| anthropic | text.stream | pass | `claude-opus-4.6` | 1933 | none |
| anthropic | agent.tool_loop | pass | `claude-opus-4.6` | 2267 | none |
| anthropic | tool.loop.deterministic | pass | `claude-opus-4.6` | 4531 | none |
| anthropic | structured.output.object | pass | `claude-opus-4.6` | 5028 | none |
| anthropic | structured.plus.tools | fail | `claude-opus-4.6` | 19954 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | vision.image_input | fail | `claude-opus-4.6` | 19243 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | reasoning.visibility | pass | `claude-opus-4.6` | 17442 | none |
| anthropic | modality.image_generation | skipped | `claude-opus-4.6` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.6` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.6` | 2 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.6` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.6` | 1 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-sonnet-4.5` | 1660 | none |
| anthropic | messages.generate | pass | `claude-sonnet-4.5` | 1673 | none |
| anthropic | rid.passthrough | pass | `claude-sonnet-4.5` | 1965 | none |
| anthropic | text.stream | pass | `claude-sonnet-4.5` | 2301 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4.5` | 3534 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4.5` | 4040 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4.5` | 3898 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4.5` | 3160 | none |
| anthropic | vision.image_input | pass | `claude-sonnet-4.5` | 3069 | none |
| anthropic | reasoning.visibility | fail | `claude-sonnet-4.5` | 257 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | messages.generate | pass | `claude-opus-4.5` | 1172 | none |
| anthropic | text.generate | pass | `claude-opus-4.5` | 1261 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4.5` | 1578 | none |
| anthropic | text.stream | pass | `claude-opus-4.5` | 1717 | none |
| anthropic | tool.loop.deterministic | pass | `claude-opus-4.5` | 3115 | none |
| anthropic | structured.output.object | pass | `claude-opus-4.5` | 3550 | none |
| anthropic | agent.tool_loop | pass | `claude-opus-4.5` | 3196 | none |
| anthropic | structured.plus.tools | fail | `claude-opus-4.5` | 20054 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | vision.image_input | fail | `claude-opus-4.5` | 17275 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | reasoning.visibility | fail | `claude-opus-4.5` | 15249 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-opus-4.5` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.5` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.5` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.5` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.5` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | messages.generate | pass | `claude-haiku-4.5` | 1566 | none |
| anthropic | rid.passthrough | pass | `claude-haiku-4.5` | 1570 | none |
| anthropic | text.generate | pass | `claude-haiku-4.5` | 1576 | none |
| anthropic | text.stream | pass | `claude-haiku-4.5` | 576 | none |
| anthropic | tool.loop.deterministic | pass | `claude-haiku-4.5` | 1672 | none |
| anthropic | structured.output.object | pass | `claude-haiku-4.5` | 1978 | none |
| anthropic | agent.tool_loop | pass | `claude-haiku-4.5` | 1502 | none |
| anthropic | structured.plus.tools | pass | `claude-haiku-4.5` | 1932 | none |
| anthropic | vision.image_input | pass | `claude-haiku-4.5` | 1752 | none |
| anthropic | reasoning.visibility | fail | `claude-haiku-4.5` | 209 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-haiku-4.5` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-haiku-4.5` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-haiku-4.5` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | messages.generate | pass | `claude-opus-4.1` | 1365 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4.1` | 1597 | none |
| anthropic | text.generate | pass | `claude-opus-4.1` | 1775 | none |
| anthropic | text.stream | pass | `claude-opus-4.1` | 1810 | none |
| anthropic | structured.output.object | pass | `claude-opus-4.1` | 4147 | none |
| anthropic | agent.tool_loop | fail | `claude-opus-4.1` | 22302 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | tool.loop.deterministic | fail | `claude-opus-4.1` | 23915 | No output generated. Check the stream for errors. |
| anthropic | structured.plus.tools | fail | `claude-opus-4.1` | 18694 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | vision.image_input | pass | `claude-opus-4.1` | 20989 | none |
| anthropic | reasoning.visibility | fail | `claude-opus-4.1` | 538 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-opus-4.1` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.1` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.1` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.1` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.1` | 1 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-sonnet-4` | 967 | none |
| anthropic | messages.generate | pass | `claude-sonnet-4` | 1346 | none |
| anthropic | rid.passthrough | pass | `claude-sonnet-4` | 1440 | none |
| anthropic | text.stream | pass | `claude-sonnet-4` | 2121 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4` | 2465 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4` | 2804 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4` | 1941 | none |
| anthropic | structured.plus.tools | fail | `claude-sonnet-4` | 24663 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | vision.image_input | fail | `claude-sonnet-4` | 23055 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | reasoning.visibility | fail | `claude-sonnet-4` | 8152 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4` | 1 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | messages.generate | pass | `claude-opus-4` | 1673 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4` | 1678 | none |
| anthropic | text.generate | pass | `claude-opus-4` | 1683 | none |
| anthropic | text.stream | pass | `claude-opus-4` | 1965 | none |
| anthropic | structured.output.object | pass | `claude-opus-4` | 3477 | none |
| anthropic | tool.loop.deterministic | fail | `claude-opus-4` | 16207 | No output generated. Check the stream for errors. |
| anthropic | agent.tool_loop | fail | `claude-opus-4` | 22000 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | structured.plus.tools | fail | `claude-opus-4` | 22525 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | vision.image_input | pass | `claude-opus-4` | 19250 | none |
| anthropic | reasoning.visibility | fail | `claude-opus-4` | 508 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-opus-4` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4` | 1 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-3.7-sonnet` | 930 | none |
| anthropic | messages.generate | pass | `claude-3.7-sonnet` | 930 | none |
| anthropic | rid.passthrough | pass | `claude-3.7-sonnet` | 1135 | none |
| anthropic | text.stream | pass | `claude-3.7-sonnet` | 1726 | none |
| anthropic | tool.loop.deterministic | pass | `claude-3.7-sonnet` | 2866 | none |
| anthropic | structured.output.object | pass | `claude-3.7-sonnet` | 3302 | none |
| anthropic | agent.tool_loop | pass | `claude-3.7-sonnet` | 2180 | none |
| anthropic | structured.plus.tools | pass | `claude-3.7-sonnet` | 2927 | none |
| anthropic | vision.image_input | pass | `claude-3.7-sonnet` | 3216 | none |
| anthropic | reasoning.visibility | fail | `claude-3.7-sonnet` | 231 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-3.7-sonnet` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-3.5-haiku` | 1040 | none |
| anthropic | messages.generate | pass | `claude-3.5-haiku` | 1041 | none |
| anthropic | rid.passthrough | pass | `claude-3.5-haiku` | 1042 | none |
| anthropic | text.stream | pass | `claude-3.5-haiku` | 941 | none |
| anthropic | tool.loop.deterministic | pass | `claude-3.5-haiku` | 2234 | none |
| anthropic | agent.tool_loop | pass | `claude-3.5-haiku` | 2064 | none |
| anthropic | structured.output.object | pass | `claude-3.5-haiku` | 3130 | none |
| anthropic | structured.plus.tools | pass | `claude-3.5-haiku` | 2447 | none |
| anthropic | vision.image_input | pass | `claude-3.5-haiku` | 1677 | none |
| anthropic | reasoning.visibility | fail | `claude-3.5-haiku` | 238 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-3.1-pro` | 3297 | none |
| google | rid.passthrough | pass | `gemini-3.1-pro` | 4313 | none |
| google | messages.generate | pass | `gemini-3.1-pro` | 4318 | none |
| google | text.stream | pass | `gemini-3.1-pro` | 5915 | none |
| google | tool.loop.deterministic | pass | `gemini-3.1-pro` | 5617 | none |
| google | structured.output.object | pass | `gemini-3.1-pro` | 10451 | none |
| google | agent.tool_loop | pass | `gemini-3.1-pro` | 6014 | none |
| google | structured.plus.tools | pass | `gemini-3.1-pro` | 7078 | none |
| google | vision.image_input | pass | `gemini-3.1-pro` | 4342 | none |
| google | reasoning.visibility | skipped | `gemini-3.1-pro` | 0 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3.1-pro` | 1 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3.1-pro` | 1 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3.1-pro` | 1 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3.1-pro` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3.1-pro` | 0 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-3.1-flash-lite` | 1448 | none |
| google | messages.generate | pass | `gemini-3.1-flash-lite` | 1201 | none |
| google | rid.passthrough | pass | `gemini-3.1-flash-lite` | 917 | none |
| google | text.stream | pass | `gemini-3.1-flash-lite` | 848 | none |
| google | structured.output.object | pass | `gemini-3.1-flash-lite` | 1429 | none |
| google | tool.loop.deterministic | pass | `gemini-3.1-flash-lite` | 1929 | none |
| google | agent.tool_loop | pass | `gemini-3.1-flash-lite` | 2689 | none |
| google | structured.plus.tools | pass | `gemini-3.1-flash-lite` | 2007 | none |
| google | vision.image_input | pass | `gemini-3.1-flash-lite` | 1846 | none |
| google | reasoning.visibility | skipped | `gemini-3.1-flash-lite` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3.1-flash-lite` | 1 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3.1-flash-lite` | 1 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-3-flash` | 1419 | none |
| google | rid.passthrough | pass | `gemini-3-flash` | 1758 | none |
| google | messages.generate | pass | `gemini-3-flash` | 2100 | none |
| google | text.stream | pass | `gemini-3-flash` | 2270 | none |
| google | tool.loop.deterministic | pass | `gemini-3-flash` | 2820 | none |
| google | structured.output.object | pass | `gemini-3-flash` | 4300 | none |
| google | agent.tool_loop | pass | `gemini-3-flash` | 2716 | none |
| google | structured.plus.tools | pass | `gemini-3-flash` | 5485 | none |
| google | vision.image_input | pass | `gemini-3-flash` | 2005 | none |
| google | reasoning.visibility | skipped | `gemini-3-flash` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3-flash` | 1 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3-flash` | 1 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3-flash` | 1 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3-flash` | 1 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3-flash` | 1 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-2.5-pro` | 2323 | none |
| google | rid.passthrough | pass | `gemini-2.5-pro` | 2817 | none |
| google | messages.generate | pass | `gemini-2.5-pro` | 4090 | none |
| google | structured.output.object | pass | `gemini-2.5-pro` | 3897 | none |
| google | text.stream | pass | `gemini-2.5-pro` | 4532 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-pro` | 4728 | none |
| google | agent.tool_loop | pass | `gemini-2.5-pro` | 19533 | none |
| google | structured.plus.tools | pass | `gemini-2.5-pro` | 8643 | none |
| google | vision.image_input | pass | `gemini-2.5-pro` | 3837 | none |
| google | reasoning.visibility | skipped | `gemini-2.5-pro` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-pro` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-pro` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-pro` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-pro` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-pro` | 1 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-2.5-flash-lite` | 533 | none |
| google | messages.generate | pass | `gemini-2.5-flash-lite` | 1041 | none |
| google | rid.passthrough | pass | `gemini-2.5-flash-lite` | 1042 | none |
| google | text.stream | pass | `gemini-2.5-flash-lite` | 899 | none |
| google | structured.output.object | pass | `gemini-2.5-flash-lite` | 770 | none |
| google | agent.tool_loop | pass | `gemini-2.5-flash-lite` | 1311 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-flash-lite` | 16740 | none |
| google | structured.plus.tools | pass | `gemini-2.5-flash-lite` | 2194 | none |
| google | vision.image_input | pass | `gemini-2.5-flash-lite` | 1408 | none |
| google | reasoning.visibility | skipped | `gemini-2.5-flash-lite` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-flash-lite` | 1 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-flash-lite` | 1 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-flash-lite` | 1 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-flash-lite` | 1 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-flash-lite` | 1 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-2.5-flash` | 665 | none |
| google | rid.passthrough | pass | `gemini-2.5-flash` | 1051 | none |
| google | messages.generate | pass | `gemini-2.5-flash` | 1110 | none |
| google | text.stream | pass | `gemini-2.5-flash` | 1844 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-flash` | 2125 | none |
| google | structured.output.object | pass | `gemini-2.5-flash` | 3419 | none |
| google | agent.tool_loop | pass | `gemini-2.5-flash` | 2275 | none |
| google | structured.plus.tools | pass | `gemini-2.5-flash` | 2126 | none |
| google | vision.image_input | pass | `gemini-2.5-flash` | 1847 | none |
| google | reasoning.visibility | skipped | `gemini-2.5-flash` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-flash` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-flash` | 1 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-flash` | 1 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-flash` | 1 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-flash` | 1 | google.modality.rerank is not supported by the package yet. |
| openai | registry.routing | pass | `gpt-5-mini,claude-sonnet-4.6,gemini-3.1-flash-lite` | 3615 | none |
| openai | embedding.proxy_probe | pass | `text-embedding-3-small` | 1048 | none |
| anthropic | embedding.proxy_probe | skipped | `claude-sonnet-4.6` | 0 | Anthropic embeddings are not configured as a supported matrix target yet. |
| google | embedding.proxy_probe | skipped | `gemini-3.1-flash-lite` | 0 | Google embedding probe model is not configured for this stack. |

## Non-Pass Details

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-5.4-nano`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-5.4-nano`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-5.4-nano`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-5.4-nano`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-5.4-nano`
- Notes: openai.modality.rerank is not supported by the package yet.

### openai.modality.image_generation

- Status: `skipped`
- Model: `gpt-5.4-mini`
- Notes: openai.modality.image_generation is not supported by the package yet.

### openai.modality.speech

- Status: `skipped`
- Model: `gpt-5.4-mini`
- Notes: openai.modality.speech is not supported by the package yet.

### openai.modality.transcription

- Status: `skipped`
- Model: `gpt-5.4-mini`
- Notes: openai.modality.transcription is not supported by the package yet.

### openai.modality.video

- Status: `skipped`
- Model: `gpt-5.4-mini`
- Notes: openai.modality.video is not supported by the package yet.

### openai.modality.rerank

- Status: `skipped`
- Model: `gpt-5.4-mini`
- Notes: openai.modality.rerank is not supported by the package yet.

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

### openai.structured.plus.tools

- Status: `fail`
- Model: `o3`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

### openai.vision.image_input

- Status: `fail`
- Model: `o3`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

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

### anthropic.structured.plus.tools

- Status: `fail`
- Model: `claude-opus-4.6`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

### anthropic.vision.image_input

- Status: `fail`
- Model: `claude-opus-4.6`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

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

### anthropic.structured.plus.tools

- Status: `fail`
- Model: `claude-opus-4.5`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

### anthropic.vision.image_input

- Status: `fail`
- Model: `claude-opus-4.5`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

### anthropic.reasoning.visibility

- Status: `fail`
- Model: `claude-opus-4.5`
- Notes: No output generated. Check the stream for errors.

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

### anthropic.agent.tool_loop

- Status: `fail`
- Model: `claude-opus-4.1`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

### anthropic.tool.loop.deterministic

- Status: `fail`
- Model: `claude-opus-4.1`
- Notes: No output generated. Check the stream for errors.

### anthropic.structured.plus.tools

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

### anthropic.structured.plus.tools

- Status: `fail`
- Model: `claude-sonnet-4`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

### anthropic.vision.image_input

- Status: `fail`
- Model: `claude-sonnet-4`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

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


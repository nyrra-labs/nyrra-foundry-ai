# Live Capability Matrix

Generated from the latest local live verification artifact.

- Run ID: `2026-03-28T05-50-29.087Z-6a499c`
- Git SHA: `357b751`
- Package Version: `0.0.1`
- Artifact: `.memory/capability-runs/2026-03-28T05-50-29.087Z-6a499c`
- Started: 2026-03-28T05:50:29.782Z
- Finished: 2026-03-28T05:59:22.530Z
- Default Models: openai=`gpt-5-mini`, anthropic=`claude-sonnet-4.6`, google=`gemini-3.1-flash-lite`
- Model Scope: `catalog`
- Status Counts: `pass`: 283, `skipped`: 186, `proxy-rejected`: 7, `fail`: 23

The live suite is the canonical verification surface for proxy-sensitive behavior. The default per-provider models are the hard gate; the rest of the catalog rows are investigation coverage and are allowed to surface non-pass results without failing the suite. Rows marked `skipped` are intentionally out of scope for the current stack or package surface. Rows marked `proxy-rejected` are real proxy or request-shape failures that need investigation.

## Provider Summary

| Provider | Pass | Skipped | Proxy Rejected | Unsupported | Fail |
|---|---:|---:|---:|---:|---:|
| openai | 147 | 92 | 0 | 0 | 3 |
| anthropic | 85 | 51 | 0 | 0 | 15 |
| google | 51 | 43 | 7 | 0 | 5 |

## Provider Capability Tables

Rows are models. Columns are the primary live language-model capabilities. Newer models appear first within each provider.

### openai

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `gpt-5.4` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.2` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.1-codex-mini` | pass | pass | pass | pass | fail | pass | pass | fail | skipped | skipped |
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
| `o3` | pass | fail | pass | pass | pass | pass | pass | pass | pass | pass |


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
| `gemini-3-flash` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-2.5-pro` | pass | pass | pass | pass | fail | pass | pass | fail | pass | skipped |
| `gemini-2.5-flash-lite` | pass | pass | pass | pass | pass | pass | pass | fail | pass | skipped |
| `gemini-2.5-flash` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |


## Detailed Rows

| Provider | Capability | Status | Model | Duration ms | Notes |
|---|---|---|---|---:|---|
| openai | rid.passthrough | pass | `gpt-5.4` | 978 | none |
| openai | messages.generate | pass | `gpt-5.4` | 1288 | none |
| openai | text.generate | pass | `gpt-5.4` | 1304 | none |
| openai | text.stream | pass | `gpt-5.4` | 1749 | none |
| openai | structured.output.object | pass | `gpt-5.4` | 3815 | none |
| openai | agent.tool_loop | pass | `gpt-5.4` | 2488 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.4` | 4107 | none |
| openai | reasoning.visibility | pass | `gpt-5.4` | 1540 | none |
| openai | modality.image_generation | skipped | `gpt-5.4` | 2 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.4` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.4` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.4` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.4` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | vision.image_input | pass | `gpt-5.4` | 2400 | none |
| openai | structured.plus.tools | pass | `gpt-5.4` | 4133 | none |
| openai | messages.generate | pass | `gpt-5.2` | 1749 | none |
| openai | text.generate | pass | `gpt-5.2` | 2864 | none |
| openai | text.stream | pass | `gpt-5.2` | 1042 | none |
| openai | rid.passthrough | pass | `gpt-5.2` | 1393 | none |
| openai | structured.output.object | pass | `gpt-5.2` | 2736 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.2` | 2193 | none |
| openai | agent.tool_loop | pass | `gpt-5.2` | 2928 | none |
| openai | reasoning.visibility | pass | `gpt-5.2` | 1120 | none |
| openai | modality.image_generation | skipped | `gpt-5.2` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.2` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.2` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.2` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.2` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | structured.plus.tools | pass | `gpt-5.2` | 4476 | none |
| openai | vision.image_input | pass | `gpt-5.2` | 4467 | none |
| openai | text.generate | pass | `gpt-5.1-codex-mini` | 2973 | none |
| openai | text.stream | pass | `gpt-5.1-codex-mini` | 1388 | none |
| openai | messages.generate | pass | `gpt-5.1-codex-mini` | 2173 | none |
| openai | rid.passthrough | pass | `gpt-5.1-codex-mini` | 2276 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1-codex-mini` | 5542 | none |
| openai | agent.tool_loop | pass | `gpt-5.1-codex-mini` | 6515 | none |
| openai | vision.image_input | skipped | `gpt-5.1-codex-mini` | 0 | Model "gpt-5.1-codex-mini" does not claim vision support. |
| openai | reasoning.visibility | skipped | `gpt-5.1-codex-mini` | 0 | OpenAI reasoning visibility is not asserted for gpt-5.1-codex-mini. |
| openai | modality.image_generation | skipped | `gpt-5.1-codex-mini` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1-codex-mini` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1-codex-mini` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1-codex-mini` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1-codex-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | structured.output.object | fail | `gpt-5.1-codex-mini` | 8064 | No output generated. |
| openai | text.generate | pass | `gpt-5.1-codex` | 1389 | none |
| openai | rid.passthrough | pass | `gpt-5.1-codex` | 1301 | none |
| openai | messages.generate | pass | `gpt-5.1-codex` | 1771 | none |
| openai | structured.plus.tools | fail | `gpt-5.1-codex-mini` | 4889 | No output generated. |
| openai | text.stream | pass | `gpt-5.1-codex` | 1424 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1-codex` | 2015 | none |
| openai | structured.output.object | pass | `gpt-5.1-codex` | 3147 | none |
| openai | vision.image_input | skipped | `gpt-5.1-codex` | 1 | Model "gpt-5.1-codex" does not claim vision support. |
| openai | reasoning.visibility | skipped | `gpt-5.1-codex` | 0 | OpenAI reasoning visibility is not asserted for gpt-5.1-codex. |
| openai | modality.image_generation | skipped | `gpt-5.1-codex` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1-codex` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1-codex` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1-codex` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1-codex` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | agent.tool_loop | pass | `gpt-5.1-codex` | 3565 | none |
| openai | text.generate | pass | `gpt-5.1` | 2796 | none |
| openai | structured.plus.tools | pass | `gpt-5.1-codex` | 3279 | none |
| openai | text.stream | pass | `gpt-5.1` | 799 | none |
| openai | messages.generate | pass | `gpt-5.1` | 2441 | none |
| openai | rid.passthrough | pass | `gpt-5.1` | 2272 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1` | 1508 | none |
| openai | structured.output.object | pass | `gpt-5.1` | 1814 | none |
| openai | vision.image_input | pass | `gpt-5.1` | 2085 | none |
| openai | reasoning.visibility | skipped | `gpt-5.1` | 0 | OpenAI reasoning visibility is not asserted for gpt-5.1. |
| openai | modality.image_generation | skipped | `gpt-5.1` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | agent.tool_loop | pass | `gpt-5.1` | 3460 | none |
| openai | messages.generate | pass | `gpt-5-nano` | 1815 | none |
| openai | structured.plus.tools | pass | `gpt-5.1` | 5850 | none |
| openai | rid.passthrough | pass | `gpt-5-nano` | 1906 | none |
| openai | text.stream | pass | `gpt-5-nano` | 18385 | none |
| openai | structured.output.object | pass | `gpt-5-nano` | 19557 | none |
| openai | text.generate | pass | `gpt-5-nano` | 40877 | none |
| openai | agent.tool_loop | pass | `gpt-5-nano` | 22215 | none |
| openai | vision.image_input | pass | `gpt-5-nano` | 18689 | none |
| openai | structured.plus.tools | pass | `gpt-5-nano` | 24729 | none |
| openai | modality.image_generation | skipped | `gpt-5-nano` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-nano` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-nano` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-nano` | 2 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-nano` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | tool.loop.deterministic | pass | `gpt-5-nano` | 62094 | none |
| openai | reasoning.visibility | pass | `gpt-5-nano` | 35151 | none |
| openai | text.generate | pass | `gpt-5-mini` | 2055 | none |
| openai | messages.generate | pass | `gpt-5-mini` | 1368 | none |
| openai | rid.passthrough | pass | `gpt-5-mini` | 2191 | none |
| openai | text.stream | pass | `gpt-5-mini` | 1400 | none |
| openai | structured.output.object | pass | `gpt-5-mini` | 2103 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-mini` | 2234 | none |
| openai | agent.tool_loop | pass | `gpt-5-mini` | 2417 | none |
| openai | structured.plus.tools | pass | `gpt-5-mini` | 2627 | none |
| openai | vision.image_input | pass | `gpt-5-mini` | 3893 | none |
| openai | reasoning.visibility | pass | `gpt-5-mini` | 2461 | none |
| openai | modality.image_generation | skipped | `gpt-5-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-mini` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-mini` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-mini` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5-codex` | 2043 | none |
| openai | messages.generate | pass | `gpt-5-codex` | 2095 | none |
| openai | rid.passthrough | pass | `gpt-5-codex` | 2176 | none |
| openai | text.stream | pass | `gpt-5-codex` | 1757 | none |
| openai | structured.output.object | pass | `gpt-5-codex` | 6089 | none |
| openai | agent.tool_loop | pass | `gpt-5-codex` | 5672 | none |
| openai | vision.image_input | skipped | `gpt-5-codex` | 1 | Model "gpt-5-codex" does not claim vision support. |
| openai | reasoning.visibility | skipped | `gpt-5-codex` | 0 | OpenAI reasoning visibility is not asserted for gpt-5-codex. |
| openai | modality.image_generation | skipped | `gpt-5-codex` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-codex` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-codex` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-codex` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-codex` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5` | 731 | none |
| openai | messages.generate | pass | `gpt-5` | 794 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-codex` | 10165 | none |
| openai | text.stream | pass | `gpt-5` | 1407 | none |
| openai | rid.passthrough | pass | `gpt-5` | 3439 | none |
| openai | structured.plus.tools | pass | `gpt-5-codex` | 7093 | none |
| openai | structured.output.object | pass | `gpt-5` | 1755 | none |
| openai | tool.loop.deterministic | pass | `gpt-5` | 2676 | none |
| openai | structured.plus.tools | pass | `gpt-5` | 2262 | none |
| openai | agent.tool_loop | pass | `gpt-5` | 2895 | none |
| openai | modality.image_generation | skipped | `gpt-5` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | vision.image_input | pass | `gpt-5` | 3147 | none |
| openai | text.generate | pass | `gpt-4.1-nano` | 2092 | none |
| openai | reasoning.visibility | pass | `gpt-5` | 3197 | none |
| openai | messages.generate | pass | `gpt-4.1-nano` | 939 | none |
| openai | structured.output.object | pass | `gpt-4.1-nano` | 806 | none |
| openai | text.stream | pass | `gpt-4.1-nano` | 1774 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1-nano` | 1414 | none |
| openai | agent.tool_loop | pass | `gpt-4.1-nano` | 1847 | none |
| openai | structured.plus.tools | pass | `gpt-4.1-nano` | 1450 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1-nano` | 0 | OpenAI reasoning visibility is not asserted for gpt-4.1-nano. |
| openai | modality.image_generation | skipped | `gpt-4.1-nano` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1-nano` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1-nano` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1-nano` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1-nano` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4.1-mini` | 626 | none |
| openai | messages.generate | pass | `gpt-4.1-mini` | 593 | none |
| openai | rid.passthrough | pass | `gpt-4.1-mini` | 612 | none |
| openai | vision.image_input | pass | `gpt-4.1-nano` | 2659 | none |
| openai | text.stream | pass | `gpt-4.1-mini` | 787 | none |
| openai | structured.output.object | pass | `gpt-4.1-mini` | 1298 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1-mini` | 1782 | none |
| openai | agent.tool_loop | pass | `gpt-4.1-mini` | 1965 | none |
| openai | structured.plus.tools | pass | `gpt-4.1-mini` | 2250 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1-mini` | 1 | OpenAI reasoning visibility is not asserted for gpt-4.1-mini. |
| openai | modality.image_generation | skipped | `gpt-4.1-mini` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1-mini` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1-mini` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1-mini` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4.1` | 747 | none |
| openai | vision.image_input | pass | `gpt-4.1-mini` | 1848 | none |
| openai | rid.passthrough | pass | `gpt-4.1` | 839 | none |
| openai | messages.generate | pass | `gpt-4.1` | 1026 | none |
| openai | structured.output.object | pass | `gpt-4.1` | 1260 | none |
| openai | text.stream | pass | `gpt-4.1` | 1431 | none |
| openai | agent.tool_loop | pass | `gpt-4.1` | 3258 | none |
| openai | structured.plus.tools | pass | `gpt-4.1` | 1635 | none |
| openai | vision.image_input | pass | `gpt-4.1` | 1901 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1` | 1 | OpenAI reasoning visibility is not asserted for gpt-4.1. |
| openai | modality.image_generation | skipped | `gpt-4.1` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `o4-mini` | 1803 | none |
| openai | messages.generate | pass | `o4-mini` | 1388 | none |
| openai | rid.passthrough | pass | `o4-mini` | 1250 | none |
| openai | text.stream | pass | `o4-mini` | 2173 | none |
| openai | structured.output.object | pass | `o4-mini` | 2739 | none |
| openai | tool.loop.deterministic | pass | `o4-mini` | 5721 | none |
| openai | agent.tool_loop | pass | `o4-mini` | 2725 | none |
| openai | structured.plus.tools | pass | `o4-mini` | 2408 | none |
| openai | vision.image_input | pass | `o4-mini` | 2771 | none |
| openai | reasoning.visibility | pass | `o4-mini` | 1328 | none |
| openai | modality.image_generation | skipped | `o4-mini` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `o4-mini` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `o4-mini` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `o4-mini` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `o4-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4o-mini` | 608 | none |
| openai | messages.generate | pass | `gpt-4o-mini` | 585 | none |
| openai | rid.passthrough | pass | `gpt-4o-mini` | 562 | none |
| openai | text.stream | pass | `gpt-4o-mini` | 491 | none |
| openai | structured.output.object | pass | `gpt-4o-mini` | 916 | none |
| openai | tool.loop.deterministic | pass | `gpt-4o-mini` | 1212 | none |
| openai | agent.tool_loop | pass | `gpt-4o-mini` | 1280 | none |
| openai | structured.plus.tools | pass | `gpt-4o-mini` | 1595 | none |
| openai | vision.image_input | pass | `gpt-4o-mini` | 1498 | none |
| openai | reasoning.visibility | skipped | `gpt-4o-mini` | 1 | OpenAI reasoning visibility is not asserted for gpt-4o-mini. |
| openai | modality.image_generation | skipped | `gpt-4o-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4o-mini` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4o-mini` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4o-mini` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4o-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4o` | 607 | none |
| openai | messages.generate | pass | `gpt-4o` | 528 | none |
| openai | rid.passthrough | pass | `gpt-4o` | 504 | none |
| openai | text.stream | pass | `gpt-4o` | 1237 | none |
| openai | structured.output.object | pass | `gpt-4o` | 1114 | none |
| openai | tool.loop.deterministic | pass | `gpt-4o` | 2556 | none |
| openai | agent.tool_loop | pass | `gpt-4o` | 1819 | none |
| openai | structured.plus.tools | pass | `gpt-4o` | 3123 | none |
| openai | vision.image_input | pass | `gpt-4o` | 2311 | none |
| openai | reasoning.visibility | skipped | `gpt-4o` | 1 | OpenAI reasoning visibility is not asserted for gpt-4o. |
| openai | modality.image_generation | skipped | `gpt-4o` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4o` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4o` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4o` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4o` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `o3` | 1455 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1` | 55972 | none |
| openai | rid.passthrough | pass | `o3` | 1038 | none |
| openai | messages.generate | fail | `o3` | 2173 | expected 'i’m sorry, but i can’t comply with th…' to contain 'memory' |
| openai | text.stream | pass | `o3` | 1704 | none |
| openai | structured.output.object | pass | `o3` | 2868 | none |
| openai | tool.loop.deterministic | pass | `o3` | 2454 | none |
| openai | agent.tool_loop | pass | `o3` | 2196 | none |
| openai | structured.plus.tools | pass | `o3` | 3960 | none |
| openai | vision.image_input | pass | `o3` | 2785 | none |
| openai | modality.image_generation | skipped | `o3` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `o3` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `o3` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `o3` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `o3` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | reasoning.visibility | pass | `o3` | 1394 | none |
| openai | rid.passthrough | pass | `gpt-4.1-nano` | 109364 | none |
| anthropic | text.generate | pass | `claude-sonnet-4.6` | 1227 | none |
| anthropic | messages.generate | pass | `claude-sonnet-4.6` | 749 | none |
| anthropic | rid.passthrough | pass | `claude-sonnet-4.6` | 661 | none |
| anthropic | text.stream | pass | `claude-sonnet-4.6` | 1168 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4.6` | 3914 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4.6` | 2542 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4.6` | 2907 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4.6` | 2111 | none |
| anthropic | vision.image_input | pass | `claude-sonnet-4.6` | 3511 | none |
| anthropic | reasoning.visibility | pass | `claude-sonnet-4.6` | 1604 | none |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4.6` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4.6` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-opus-4.6` | 811 | none |
| anthropic | messages.generate | pass | `claude-opus-4.6` | 880 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4.6` | 1013 | none |
| anthropic | text.stream | pass | `claude-opus-4.6` | 1909 | none |
| anthropic | tool.loop.deterministic | pass | `claude-opus-4.6` | 2559 | none |
| anthropic | agent.tool_loop | pass | `claude-opus-4.6` | 2116 | none |
| anthropic | structured.plus.tools | pass | `claude-opus-4.6` | 2705 | none |
| anthropic | structured.output.object | pass | `claude-opus-4.6` | 6582 | none |
| anthropic | modality.image_generation | skipped | `claude-opus-4.6` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.6` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.6` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.6` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.6` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | vision.image_input | pass | `claude-opus-4.6` | 3334 | none |
| anthropic | text.generate | pass | `claude-sonnet-4.5` | 1632 | none |
| anthropic | messages.generate | pass | `claude-sonnet-4.5` | 1592 | none |
| anthropic | rid.passthrough | pass | `claude-sonnet-4.5` | 1761 | none |
| anthropic | text.stream | pass | `claude-sonnet-4.5` | 1583 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4.5` | 2781 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4.5` | 3360 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4.5` | 2564 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4.5` | 3620 | none |
| anthropic | reasoning.visibility | fail | `claude-sonnet-4.5` | 240 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | vision.image_input | pass | `claude-sonnet-4.5` | 2704 | none |
| anthropic | text.generate | pass | `claude-opus-4.5` | 1755 | none |
| anthropic | messages.generate | pass | `claude-opus-4.5` | 1156 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4.5` | 1927 | none |
| anthropic | text.stream | pass | `claude-opus-4.5` | 1845 | none |
| anthropic | reasoning.visibility | pass | `claude-opus-4.6` | 17484 | none |
| anthropic | structured.output.object | pass | `claude-opus-4.5` | 3015 | none |
| anthropic | tool.loop.deterministic | pass | `claude-opus-4.5` | 2903 | none |
| anthropic | agent.tool_loop | pass | `claude-opus-4.5` | 3242 | none |
| anthropic | vision.image_input | pass | `claude-opus-4.5` | 2493 | none |
| anthropic | modality.image_generation | skipped | `claude-opus-4.5` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.5` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.5` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.5` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.5` | 1 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | structured.plus.tools | pass | `claude-opus-4.5` | 3922 | none |
| anthropic | reasoning.visibility | pass | `claude-opus-4.5` | 1607 | none |
| anthropic | text.generate | pass | `claude-haiku-4.5` | 1872 | none |
| anthropic | messages.generate | pass | `claude-haiku-4.5` | 1159 | none |
| anthropic | rid.passthrough | pass | `claude-haiku-4.5` | 1254 | none |
| anthropic | text.stream | pass | `claude-haiku-4.5` | 612 | none |
| anthropic | structured.output.object | pass | `claude-haiku-4.5` | 1494 | none |
| anthropic | tool.loop.deterministic | pass | `claude-haiku-4.5` | 1499 | none |
| anthropic | agent.tool_loop | pass | `claude-haiku-4.5` | 1673 | none |
| anthropic | reasoning.visibility | fail | `claude-haiku-4.5` | 685 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-haiku-4.5` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-haiku-4.5` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | vision.image_input | pass | `claude-haiku-4.5` | 1379 | none |
| anthropic | structured.plus.tools | pass | `claude-haiku-4.5` | 2006 | none |
| anthropic | text.generate | pass | `claude-opus-4.1` | 1433 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4.1` | 1556 | none |
| anthropic | text.stream | pass | `claude-opus-4.1` | 1856 | none |
| anthropic | structured.output.object | pass | `claude-opus-4.1` | 3492 | none |
| anthropic | messages.generate | pass | `claude-opus-4.1` | 5764 | none |
| anthropic | agent.tool_loop | fail | `claude-opus-4.1` | 17274 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | tool.loop.deterministic | fail | `claude-opus-4.1` | 20609 | No output generated. Check the stream for errors. |
| anthropic | structured.plus.tools | fail | `claude-opus-4.1` | 22664 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | modality.image_generation | skipped | `claude-opus-4.1` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.1` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.1` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.1` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.1` | 1 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-sonnet-4` | 711 | none |
| anthropic | messages.generate | pass | `claude-sonnet-4` | 859 | none |
| anthropic | rid.passthrough | pass | `claude-sonnet-4` | 739 | none |
| anthropic | text.stream | pass | `claude-sonnet-4` | 1658 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4` | 2917 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4` | 2080 | none |
| anthropic | vision.image_input | fail | `claude-opus-4.1` | 15137 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | reasoning.visibility | fail | `claude-opus-4.1` | 15769 | No output generated. Check the stream for errors. |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4` | 2374 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4` | 2058 | none |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-opus-4` | 1486 | none |
| anthropic | vision.image_input | pass | `claude-sonnet-4` | 1978 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4` | 1122 | none |
| anthropic | messages.generate | pass | `claude-opus-4` | 1360 | none |
| anthropic | text.stream | pass | `claude-opus-4` | 1911 | none |
| anthropic | structured.output.object | pass | `claude-opus-4` | 3361 | none |
| anthropic | reasoning.visibility | fail | `claude-sonnet-4` | 15201 | No output generated. Check the stream for errors. |
| anthropic | tool.loop.deterministic | fail | `claude-opus-4` | 16856 | No output generated. Check the stream for errors. |
| anthropic | agent.tool_loop | fail | `claude-opus-4` | 15730 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | structured.plus.tools | fail | `claude-opus-4` | 16696 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | modality.image_generation | skipped | `claude-opus-4` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-3.7-sonnet` | 1328 | none |
| anthropic | messages.generate | pass | `claude-3.7-sonnet` | 622 | none |
| anthropic | rid.passthrough | pass | `claude-3.7-sonnet` | 1056 | none |
| anthropic | text.stream | pass | `claude-3.7-sonnet` | 1627 | none |
| anthropic | reasoning.visibility | fail | `claude-opus-4` | 17163 | No output generated. Check the stream for errors. |
| anthropic | vision.image_input | fail | `claude-opus-4` | 17618 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | structured.output.object | pass | `claude-3.7-sonnet` | 3255 | none |
| anthropic | tool.loop.deterministic | pass | `claude-3.7-sonnet` | 2548 | none |
| anthropic | agent.tool_loop | pass | `claude-3.7-sonnet` | 2941 | none |
| anthropic | structured.plus.tools | pass | `claude-3.7-sonnet` | 2634 | none |
| anthropic | modality.image_generation | skipped | `claude-3.7-sonnet` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | reasoning.visibility | fail | `claude-3.7-sonnet` | 636 | No output generated. Check the stream for errors. |
| anthropic | text.generate | pass | `claude-3.5-haiku` | 1080 | none |
| anthropic | messages.generate | pass | `claude-3.5-haiku` | 754 | none |
| anthropic | vision.image_input | pass | `claude-3.7-sonnet` | 1790 | none |
| anthropic | rid.passthrough | pass | `claude-3.5-haiku` | 863 | none |
| anthropic | text.stream | pass | `claude-3.5-haiku` | 999 | none |
| anthropic | tool.loop.deterministic | pass | `claude-3.5-haiku` | 1815 | none |
| anthropic | structured.output.object | pass | `claude-3.5-haiku` | 2595 | none |
| anthropic | agent.tool_loop | pass | `claude-3.5-haiku` | 1912 | none |
| anthropic | reasoning.visibility | fail | `claude-3.5-haiku` | 209 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-3.5-haiku` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | vision.image_input | pass | `claude-3.5-haiku` | 1594 | none |
| anthropic | structured.plus.tools | pass | `claude-3.5-haiku` | 2606 | none |
| google | messages.generate | pass | `gemini-3.1-pro` | 2754 | none |
| google | text.stream | pass | `gemini-3.1-pro` | 7364 | none |
| google | rid.passthrough | pass | `gemini-3.1-pro` | 10968 | none |
| google | text.generate | pass | `gemini-3.1-pro` | 18618 | none |
| google | structured.output.object | pass | `gemini-3.1-pro` | 19377 | none |
| google | tool.loop.deterministic | pass | `gemini-3.1-pro` | 22432 | none |
| google | agent.tool_loop | pass | `gemini-3.1-pro` | 17559 | none |
| google | reasoning.visibility | skipped | `gemini-3.1-pro` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3.1-pro` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3.1-pro` | 1 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3.1-pro` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3.1-pro` | 1 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3.1-pro` | 0 | google.modality.rerank is not supported by the package yet. |
| google | vision.image_input | pass | `gemini-3.1-pro` | 4619 | none |
| google | structured.plus.tools | pass | `gemini-3.1-pro` | 10589 | none |
| google | text.generate | pass | `gemini-3.1-flash-lite` | 926 | none |
| google | messages.generate | pass | `gemini-3.1-flash-lite` | 1199 | none |
| google | rid.passthrough | pass | `gemini-3.1-flash-lite` | 866 | none |
| google | text.stream | pass | `gemini-3.1-flash-lite` | 687 | none |
| google | structured.output.object | pass | `gemini-3.1-flash-lite` | 1267 | none |
| google | tool.loop.deterministic | pass | `gemini-3.1-flash-lite` | 2144 | none |
| google | agent.tool_loop | pass | `gemini-3.1-flash-lite` | 1278 | none |
| google | structured.plus.tools | pass | `gemini-3.1-flash-lite` | 1751 | none |
| google | vision.image_input | pass | `gemini-3.1-flash-lite` | 1674 | none |
| google | reasoning.visibility | skipped | `gemini-3.1-flash-lite` | 0 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3.1-flash-lite` | 1 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3.1-flash-lite` | 1 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | proxy-rejected | `gemini-3-pro` | 1632 | Not Found |
| google | messages.generate | proxy-rejected | `gemini-3-pro` | 1747 | Not Found |
| google | rid.passthrough | proxy-rejected | `gemini-3-pro` | 2218 | Not Found |
| google | text.stream | fail | `gemini-3-pro` | 2052 | No output generated. Check the stream for errors. |
| google | structured.output.object | proxy-rejected | `gemini-3-pro` | 1939 | Not Found |
| google | agent.tool_loop | proxy-rejected | `gemini-3-pro` | 1632 | Not Found |
| google | structured.plus.tools | proxy-rejected | `gemini-3-pro` | 1772 | Not Found |
| google | reasoning.visibility | skipped | `gemini-3-pro` | 0 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3-pro` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3-pro` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3-pro` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3-pro` | 1 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3-pro` | 0 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-3-flash` | 1296 | none |
| google | vision.image_input | proxy-rejected | `gemini-3-pro` | 1559 | Not Found |
| google | rid.passthrough | pass | `gemini-3-flash` | 1719 | none |
| google | messages.generate | pass | `gemini-3-flash` | 1970 | none |
| google | text.stream | pass | `gemini-3-flash` | 3487 | none |
| google | structured.output.object | pass | `gemini-3-flash` | 6521 | none |
| google | tool.loop.deterministic | pass | `gemini-3-flash` | 3435 | none |
| google | agent.tool_loop | pass | `gemini-3-flash` | 3035 | none |
| google | tool.loop.deterministic | fail | `gemini-3-pro` | 16620 | No output generated. Check the stream for errors. |
| google | reasoning.visibility | skipped | `gemini-3-flash` | 0 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3-flash` | 1 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3-flash` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3-flash` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3-flash` | 1 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3-flash` | 0 | google.modality.rerank is not supported by the package yet. |
| google | structured.plus.tools | pass | `gemini-3-flash` | 5066 | none |
| google | vision.image_input | pass | `gemini-3-flash` | 2587 | none |
| google | text.generate | pass | `gemini-2.5-pro` | 2427 | none |
| google | messages.generate | pass | `gemini-2.5-pro` | 2918 | none |
| google | rid.passthrough | pass | `gemini-2.5-pro` | 3033 | none |
| google | text.stream | pass | `gemini-2.5-pro` | 4685 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-pro` | 4749 | none |
| google | agent.tool_loop | pass | `gemini-2.5-pro` | 5769 | none |
| google | structured.output.object | fail | `gemini-2.5-pro` | 9261 | No output generated. |
| google | reasoning.visibility | skipped | `gemini-2.5-pro` | 0 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-pro` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-pro` | 1 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-pro` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-pro` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-pro` | 0 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-2.5-flash-lite` | 1029 | none |
| google | structured.plus.tools | fail | `gemini-2.5-pro` | 5402 | No output generated. |
| google | rid.passthrough | pass | `gemini-2.5-flash-lite` | 505 | none |
| google | messages.generate | pass | `gemini-2.5-flash-lite` | 765 | none |
| google | vision.image_input | pass | `gemini-2.5-pro` | 3358 | none |
| google | structured.output.object | pass | `gemini-2.5-flash-lite` | 1315 | none |
| google | text.stream | pass | `gemini-2.5-flash-lite` | 2102 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-flash-lite` | 1842 | none |
| google | agent.tool_loop | pass | `gemini-2.5-flash-lite` | 1639 | none |
| google | reasoning.visibility | skipped | `gemini-2.5-flash-lite` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-flash-lite` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-flash-lite` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-flash-lite` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-flash-lite` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-flash-lite` | 0 | google.modality.rerank is not supported by the package yet. |
| google | structured.plus.tools | fail | `gemini-2.5-flash-lite` | 995 | expected 'ONCOLOGY' to match /verified/i |
| google | text.generate | pass | `gemini-2.5-flash` | 798 | none |
| google | messages.generate | pass | `gemini-2.5-flash` | 782 | none |
| google | vision.image_input | pass | `gemini-2.5-flash-lite` | 1763 | none |
| google | rid.passthrough | pass | `gemini-2.5-flash` | 920 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-flash` | 1546 | none |
| google | text.stream | pass | `gemini-2.5-flash` | 2928 | none |
| google | structured.output.object | pass | `gemini-2.5-flash` | 2970 | none |
| google | agent.tool_loop | pass | `gemini-2.5-flash` | 2392 | none |
| google | reasoning.visibility | skipped | `gemini-2.5-flash` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-flash` | 1 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-flash` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-flash` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-flash` | 1 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-flash` | 0 | google.modality.rerank is not supported by the package yet. |
| google | structured.plus.tools | pass | `gemini-2.5-flash` | 1949 | none |
| google | vision.image_input | pass | `gemini-2.5-flash` | 2302 | none |
| openai | registry.routing | pass | `gpt-5-mini,claude-sonnet-4.6,gemini-3.1-flash-lite` | 3448 | none |
| openai | embedding.proxy_probe | pass | `text-embedding-3-small` | 276 | none |
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

### openai.structured.output.object

- Status: `fail`
- Model: `gpt-5.1-codex-mini`
- Notes: No output generated.

### openai.structured.plus.tools

- Status: `fail`
- Model: `gpt-5.1-codex-mini`
- Notes: No output generated.

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

### openai.messages.generate

- Status: `fail`
- Model: `o3`
- Notes: expected 'i’m sorry, but i can’t comply with th…' to contain 'memory'

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

### anthropic.reasoning.visibility

- Status: `fail`
- Model: `claude-sonnet-4`
- Notes: No output generated. Check the stream for errors.

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
- Model: `claude-opus-4`
- Notes: No output generated. Check the stream for errors.

### anthropic.vision.image_input

- Status: `fail`
- Model: `claude-opus-4`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

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
- Model: `claude-3.7-sonnet`
- Notes: No output generated. Check the stream for errors.

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

### google.messages.generate

- Status: `proxy-rejected`
- Model: `gemini-3-pro`
- Notes: Not Found

### google.rid.passthrough

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

### google.agent.tool_loop

- Status: `proxy-rejected`
- Model: `gemini-3-pro`
- Notes: Not Found

### google.structured.plus.tools

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

### google.vision.image_input

- Status: `proxy-rejected`
- Model: `gemini-3-pro`
- Notes: Not Found

### google.tool.loop.deterministic

- Status: `fail`
- Model: `gemini-3-pro`
- Notes: No output generated. Check the stream for errors.

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

### google.structured.output.object

- Status: `fail`
- Model: `gemini-2.5-pro`
- Notes: No output generated.

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

### google.structured.plus.tools

- Status: `fail`
- Model: `gemini-2.5-pro`
- Notes: No output generated.

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

### google.structured.plus.tools

- Status: `fail`
- Model: `gemini-2.5-flash-lite`
- Notes: expected 'ONCOLOGY' to match /verified/i

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


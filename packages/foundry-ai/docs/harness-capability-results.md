# Harness Capability Results

Generated from the latest local live verification harness artifact.

- Run ID: `2026-04-01T21-31-30.354Z-ac795e`
- Git SHA: `65debf3`
- Package Version: `0.0.4`
- Artifact: `.memory/capability-runs/2026-04-01T21-31-30.354Z-ac795e`
- Started: 2026-04-01T21:31:31.070Z
- Finished: 2026-04-01T21:53:17.721Z
- Default Models: openai=`gpt-5-nano`, anthropic=`claude-haiku-4.5`, google=`gemini-3.1-flash-lite`
- Filters: none
- Model Scope: `catalog`
- Status Counts: `pass`: 310, `skipped`: 181, `fail`: 8

The live suite is the canonical verification surface for proxy-sensitive behavior. The default per-provider models are the hard gate; the rest of the catalog rows are investigation coverage and are allowed to surface non-pass results without failing the suite. Survey coverage runs the current public catalog only. Rows marked `skipped` are intentionally out of scope for the current stack or package surface. Rows marked `proxy-rejected` are real proxy or request-shape failures that need investigation.

## Provider Summary

| Provider | Pass | Skipped | Proxy Rejected | Unsupported | Fail |
|---|---:|---:|---:|---:|---:|
| openai | 163 | 93 | 0 | 0 | 1 |
| anthropic | 95 | 51 | 0 | 0 | 5 |
| google | 52 | 37 | 0 | 0 | 2 |

## Provider Capability Tables

Rows are models. Columns are the primary live language-model capabilities. Newer models appear first within each provider.

### openai

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `gpt-5-nano` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.4-nano` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.4-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.4` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `gpt-5.2` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.1-codex-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-5.1-codex` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-5.1` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-5-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5-codex` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-4.1-nano` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-4.1-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-4.1` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `o4-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-4o` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `o3` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |


### anthropic

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `claude-haiku-4.5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-sonnet-4.6` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-opus-4.6` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-sonnet-4.5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-opus-4.5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-opus-4.1` | pass | pass | pass | pass | pass | fail | fail | pass | pass | pass |
| `claude-sonnet-4` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-opus-4` | pass | pass | pass | pass | pass | fail | fail | pass | pass | pass |
| `claude-3.7-sonnet` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-3.5-haiku` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |


### google

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `gemini-3.1-flash-lite` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-3.1-pro` | pass | pass | pass | pass | fail | pass | pass | pass | pass | skipped |
| `gemini-3-flash` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-2.5-pro` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-2.5-flash-lite` | pass | pass | pass | pass | pass | pass | fail | pass | pass | skipped |
| `gemini-2.5-flash` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |


## Detailed Rows

| Provider | Capability | Status | Model | Duration ms | Notes |
|---|---|---|---|---:|---|
| openai | text.generate | pass | `gpt-5-nano` | 2188 | none |
| openai | messages.generate | pass | `gpt-5-nano` | 1740 | none |
| openai | rid.passthrough | pass | `gpt-5-nano` | 2829 | none |
| openai | text.stream | pass | `gpt-5-nano` | 2479 | none |
| openai | structured.output.object | pass | `gpt-5-nano` | 2090 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-nano` | 4109 | none |
| openai | agent.tool_loop | pass | `gpt-5-nano` | 4973 | none |
| openai | structured.plus.tools | pass | `gpt-5-nano` | 3882 | none |
| openai | vision.image_input | pass | `gpt-5-nano` | 4363 | none |
| openai | reasoning.visibility | pass | `gpt-5-nano` | 2697 | none |
| openai | modality.image_generation | skipped | `gpt-5-nano` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-nano` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-nano` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-nano` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-nano` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5.4-nano` | 1874 | none |
| openai | messages.generate | pass | `gpt-5.4-nano` | 1625 | none |
| openai | rid.passthrough | pass | `gpt-5.4-nano` | 2708 | none |
| openai | text.stream | pass | `gpt-5.4-nano` | 1666 | none |
| openai | structured.output.object | pass | `gpt-5.4-nano` | 2692 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.4-nano` | 3878 | none |
| openai | agent.tool_loop | pass | `gpt-5.4-nano` | 4760 | none |
| openai | structured.plus.tools | pass | `gpt-5.4-nano` | 3380 | none |
| openai | vision.image_input | pass | `gpt-5.4-nano` | 2932 | none |
| openai | reasoning.visibility | pass | `gpt-5.4-nano` | 1840 | none |
| openai | modality.image_generation | skipped | `gpt-5.4-nano` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.4-nano` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.4-nano` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.4-nano` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.4-nano` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5.4-mini` | 2500 | none |
| openai | messages.generate | pass | `gpt-5.4-mini` | 2058 | none |
| openai | rid.passthrough | pass | `gpt-5.4-mini` | 1872 | none |
| openai | text.stream | pass | `gpt-5.4-mini` | 2134 | none |
| openai | structured.output.object | pass | `gpt-5.4-mini` | 2816 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.4-mini` | 5001 | none |
| openai | agent.tool_loop | pass | `gpt-5.4-mini` | 5009 | none |
| openai | structured.plus.tools | pass | `gpt-5.4-mini` | 5893 | none |
| openai | vision.image_input | pass | `gpt-5.4-mini` | 3368 | none |
| openai | reasoning.visibility | pass | `gpt-5.4-mini` | 5252 | none |
| openai | modality.image_generation | skipped | `gpt-5.4-mini` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.4-mini` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.4-mini` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.4-mini` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.4-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5.4` | 3083 | none |
| openai | messages.generate | pass | `gpt-5.4` | 2806 | none |
| openai | rid.passthrough | pass | `gpt-5.4` | 2453 | none |
| openai | text.stream | pass | `gpt-5.4` | 3833 | none |
| openai | structured.output.object | pass | `gpt-5.4` | 3317 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.4` | 12559 | none |
| openai | agent.tool_loop | pass | `gpt-5.4` | 5880 | none |
| openai | structured.plus.tools | pass | `gpt-5.4` | 4971 | none |
| openai | vision.image_input | pass | `gpt-5.4` | 3631 | none |
| openai | reasoning.visibility | fail | `gpt-5.4` | 3275 | expected false to be true // Object.is equality |
| openai | modality.image_generation | skipped | `gpt-5.4` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.4` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.4` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.4` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.4` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5.2` | 2055 | none |
| openai | messages.generate | pass | `gpt-5.2` | 3207 | none |
| openai | rid.passthrough | pass | `gpt-5.2` | 2930 | none |
| openai | text.stream | pass | `gpt-5.2` | 1906 | none |
| openai | structured.output.object | pass | `gpt-5.2` | 3700 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.2` | 3783 | none |
| openai | agent.tool_loop | pass | `gpt-5.2` | 4430 | none |
| openai | structured.plus.tools | pass | `gpt-5.2` | 3969 | none |
| openai | vision.image_input | pass | `gpt-5.2` | 2965 | none |
| openai | reasoning.visibility | pass | `gpt-5.2` | 1943 | none |
| openai | modality.image_generation | skipped | `gpt-5.2` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.2` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.2` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.2` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.2` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5.1-codex-mini` | 4948 | none |
| openai | messages.generate | pass | `gpt-5.1-codex-mini` | 5376 | none |
| openai | rid.passthrough | pass | `gpt-5.1-codex-mini` | 3547 | none |
| openai | text.stream | pass | `gpt-5.1-codex-mini` | 4718 | none |
| openai | structured.output.object | pass | `gpt-5.1-codex-mini` | 6647 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1-codex-mini` | 3957 | none |
| openai | agent.tool_loop | pass | `gpt-5.1-codex-mini` | 6467 | none |
| openai | structured.plus.tools | pass | `gpt-5.1-codex-mini` | 12449 | none |
| openai | vision.image_input | pass | `gpt-5.1-codex-mini` | 6211 | none |
| openai | reasoning.visibility | skipped | `gpt-5.1-codex-mini` | 0 | OpenAI reasoning visibility is not asserted for gpt-5.1-codex-mini. |
| openai | modality.image_generation | skipped | `gpt-5.1-codex-mini` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1-codex-mini` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1-codex-mini` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1-codex-mini` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1-codex-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5.1-codex` | 2344 | none |
| openai | messages.generate | pass | `gpt-5.1-codex` | 2248 | none |
| openai | rid.passthrough | pass | `gpt-5.1-codex` | 2288 | none |
| openai | text.stream | pass | `gpt-5.1-codex` | 2276 | none |
| openai | structured.output.object | pass | `gpt-5.1-codex` | 3096 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1-codex` | 3664 | none |
| openai | agent.tool_loop | pass | `gpt-5.1-codex` | 5169 | none |
| openai | structured.plus.tools | pass | `gpt-5.1-codex` | 5951 | none |
| openai | vision.image_input | pass | `gpt-5.1-codex` | 4704 | none |
| openai | reasoning.visibility | skipped | `gpt-5.1-codex` | 0 | OpenAI reasoning visibility is not asserted for gpt-5.1-codex. |
| openai | modality.image_generation | skipped | `gpt-5.1-codex` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1-codex` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1-codex` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1-codex` | 3 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1-codex` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5.1` | 2019 | none |
| openai | messages.generate | pass | `gpt-5.1` | 2599 | none |
| openai | rid.passthrough | pass | `gpt-5.1` | 2137 | none |
| openai | text.stream | pass | `gpt-5.1` | 3388 | none |
| openai | structured.output.object | pass | `gpt-5.1` | 2837 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1` | 5540 | none |
| openai | agent.tool_loop | pass | `gpt-5.1` | 3961 | none |
| openai | structured.plus.tools | pass | `gpt-5.1` | 4957 | none |
| openai | vision.image_input | pass | `gpt-5.1` | 3750 | none |
| openai | reasoning.visibility | skipped | `gpt-5.1` | 0 | OpenAI reasoning visibility is not asserted for gpt-5.1. |
| openai | modality.image_generation | skipped | `gpt-5.1` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1` | 2 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5-mini` | 2031 | none |
| openai | messages.generate | pass | `gpt-5-mini` | 2435 | none |
| openai | rid.passthrough | pass | `gpt-5-mini` | 2277 | none |
| openai | text.stream | pass | `gpt-5-mini` | 2425 | none |
| openai | structured.output.object | pass | `gpt-5-mini` | 3752 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-mini` | 4603 | none |
| openai | agent.tool_loop | pass | `gpt-5-mini` | 6666 | none |
| openai | structured.plus.tools | pass | `gpt-5-mini` | 5637 | none |
| openai | vision.image_input | pass | `gpt-5-mini` | 3367 | none |
| openai | reasoning.visibility | pass | `gpt-5-mini` | 3224 | none |
| openai | modality.image_generation | skipped | `gpt-5-mini` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-mini` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-mini` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-mini` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5-codex` | 2226 | none |
| openai | messages.generate | pass | `gpt-5-codex` | 3317 | none |
| openai | rid.passthrough | pass | `gpt-5-codex` | 4246 | none |
| openai | text.stream | pass | `gpt-5-codex` | 2854 | none |
| openai | structured.output.object | pass | `gpt-5-codex` | 5800 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-codex` | 5081 | none |
| openai | agent.tool_loop | pass | `gpt-5-codex` | 6968 | none |
| openai | structured.plus.tools | pass | `gpt-5-codex` | 7769 | none |
| openai | vision.image_input | pass | `gpt-5-codex` | 6946 | none |
| openai | reasoning.visibility | skipped | `gpt-5-codex` | 0 | OpenAI reasoning visibility is not asserted for gpt-5-codex. |
| openai | modality.image_generation | skipped | `gpt-5-codex` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-codex` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-codex` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-codex` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-codex` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5` | 3309 | none |
| openai | messages.generate | pass | `gpt-5` | 2270 | none |
| openai | rid.passthrough | pass | `gpt-5` | 5029 | none |
| openai | text.stream | pass | `gpt-5` | 3413 | none |
| openai | structured.output.object | pass | `gpt-5` | 4104 | none |
| openai | tool.loop.deterministic | pass | `gpt-5` | 5877 | none |
| openai | agent.tool_loop | pass | `gpt-5` | 4282 | none |
| openai | structured.plus.tools | pass | `gpt-5` | 4688 | none |
| openai | vision.image_input | pass | `gpt-5` | 3532 | none |
| openai | reasoning.visibility | pass | `gpt-5` | 4907 | none |
| openai | modality.image_generation | skipped | `gpt-5` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4.1-nano` | 1852 | none |
| openai | messages.generate | pass | `gpt-4.1-nano` | 2197 | none |
| openai | rid.passthrough | pass | `gpt-4.1-nano` | 1742 | none |
| openai | text.stream | pass | `gpt-4.1-nano` | 2636 | none |
| openai | structured.output.object | pass | `gpt-4.1-nano` | 1833 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1-nano` | 3936 | none |
| openai | agent.tool_loop | pass | `gpt-4.1-nano` | 3595 | none |
| openai | structured.plus.tools | pass | `gpt-4.1-nano` | 3828 | none |
| openai | vision.image_input | pass | `gpt-4.1-nano` | 2906 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1-nano` | 0 | OpenAI reasoning visibility is not asserted for gpt-4.1-nano. |
| openai | modality.image_generation | skipped | `gpt-4.1-nano` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1-nano` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1-nano` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1-nano` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1-nano` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4.1-mini` | 1637 | none |
| openai | messages.generate | pass | `gpt-4.1-mini` | 1745 | none |
| openai | rid.passthrough | pass | `gpt-4.1-mini` | 1757 | none |
| openai | text.stream | pass | `gpt-4.1-mini` | 1704 | none |
| openai | structured.output.object | pass | `gpt-4.1-mini` | 2693 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1-mini` | 4877 | none |
| openai | agent.tool_loop | pass | `gpt-4.1-mini` | 3356 | none |
| openai | structured.plus.tools | pass | `gpt-4.1-mini` | 4196 | none |
| openai | vision.image_input | pass | `gpt-4.1-mini` | 2635 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1-mini` | 0 | OpenAI reasoning visibility is not asserted for gpt-4.1-mini. |
| openai | modality.image_generation | skipped | `gpt-4.1-mini` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1-mini` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1-mini` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1-mini` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4.1` | 4046 | none |
| openai | messages.generate | pass | `gpt-4.1` | 2374 | none |
| openai | rid.passthrough | pass | `gpt-4.1` | 2603 | none |
| openai | text.stream | pass | `gpt-4.1` | 1944 | none |
| openai | structured.output.object | pass | `gpt-4.1` | 2589 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1` | 5237 | none |
| openai | agent.tool_loop | pass | `gpt-4.1` | 5330 | none |
| openai | structured.plus.tools | pass | `gpt-4.1` | 4422 | none |
| openai | vision.image_input | pass | `gpt-4.1` | 4382 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1` | 0 | OpenAI reasoning visibility is not asserted for gpt-4.1. |
| openai | modality.image_generation | skipped | `gpt-4.1` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `o4-mini` | 2664 | none |
| openai | messages.generate | pass | `o4-mini` | 2283 | none |
| openai | rid.passthrough | pass | `o4-mini` | 2556 | none |
| openai | text.stream | pass | `o4-mini` | 2885 | none |
| openai | structured.output.object | pass | `o4-mini` | 5103 | none |
| openai | tool.loop.deterministic | pass | `o4-mini` | 4656 | none |
| openai | agent.tool_loop | pass | `o4-mini` | 4564 | none |
| openai | structured.plus.tools | pass | `o4-mini` | 4744 | none |
| openai | vision.image_input | pass | `o4-mini` | 3861 | none |
| openai | reasoning.visibility | pass | `o4-mini` | 2775 | none |
| openai | modality.image_generation | skipped | `o4-mini` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `o4-mini` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `o4-mini` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `o4-mini` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `o4-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4o` | 1782 | none |
| openai | messages.generate | pass | `gpt-4o` | 1837 | none |
| openai | rid.passthrough | pass | `gpt-4o` | 1843 | none |
| openai | text.stream | pass | `gpt-4o` | 1920 | none |
| openai | structured.output.object | pass | `gpt-4o` | 2361 | none |
| openai | tool.loop.deterministic | pass | `gpt-4o` | 3989 | none |
| openai | agent.tool_loop | pass | `gpt-4o` | 3036 | none |
| openai | structured.plus.tools | pass | `gpt-4o` | 4846 | none |
| openai | vision.image_input | pass | `gpt-4o` | 2886 | none |
| openai | reasoning.visibility | skipped | `gpt-4o` | 0 | OpenAI reasoning visibility is not asserted for gpt-4o. |
| openai | modality.image_generation | skipped | `gpt-4o` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4o` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4o` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4o` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4o` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `o3` | 2353 | none |
| openai | messages.generate | pass | `o3` | 2687 | none |
| openai | rid.passthrough | pass | `o3` | 2035 | none |
| openai | text.stream | pass | `o3` | 3854 | none |
| openai | structured.output.object | pass | `o3` | 5968 | none |
| openai | tool.loop.deterministic | pass | `o3` | 5122 | none |
| openai | agent.tool_loop | pass | `o3` | 6106 | none |
| openai | structured.plus.tools | pass | `o3` | 6214 | none |
| openai | vision.image_input | pass | `o3` | 3721 | none |
| openai | reasoning.visibility | pass | `o3` | 2466 | none |
| openai | modality.image_generation | skipped | `o3` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `o3` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `o3` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `o3` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `o3` | 0 | openai.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-haiku-4.5` | 1651 | none |
| anthropic | messages.generate | pass | `claude-haiku-4.5` | 1729 | none |
| anthropic | rid.passthrough | pass | `claude-haiku-4.5` | 1682 | none |
| anthropic | text.stream | pass | `claude-haiku-4.5` | 1943 | none |
| anthropic | structured.output.object | pass | `claude-haiku-4.5` | 2914 | none |
| anthropic | tool.loop.deterministic | pass | `claude-haiku-4.5` | 3470 | none |
| anthropic | agent.tool_loop | pass | `claude-haiku-4.5` | 3219 | none |
| anthropic | structured.plus.tools | pass | `claude-haiku-4.5` | 3242 | none |
| anthropic | vision.image_input | pass | `claude-haiku-4.5` | 3057 | none |
| anthropic | reasoning.visibility | pass | `claude-haiku-4.5` | 3601 | none |
| anthropic | modality.image_generation | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-sonnet-4.6` | 1851 | none |
| anthropic | messages.generate | pass | `claude-sonnet-4.6` | 2320 | none |
| anthropic | rid.passthrough | pass | `claude-sonnet-4.6` | 1816 | none |
| anthropic | text.stream | pass | `claude-sonnet-4.6` | 2358 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4.6` | 6581 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4.6` | 4708 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4.6` | 4828 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4.6` | 4408 | none |
| anthropic | vision.image_input | pass | `claude-sonnet-4.6` | 5023 | none |
| anthropic | reasoning.visibility | pass | `claude-sonnet-4.6` | 2521 | none |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-opus-4.6` | 2421 | none |
| anthropic | messages.generate | pass | `claude-opus-4.6` | 2518 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4.6` | 2603 | none |
| anthropic | text.stream | pass | `claude-opus-4.6` | 2556 | none |
| anthropic | structured.output.object | pass | `claude-opus-4.6` | 6796 | none |
| anthropic | tool.loop.deterministic | pass | `claude-opus-4.6` | 5812 | none |
| anthropic | agent.tool_loop | pass | `claude-opus-4.6` | 4315 | none |
| anthropic | structured.plus.tools | pass | `claude-opus-4.6` | 4370 | none |
| anthropic | vision.image_input | pass | `claude-opus-4.6` | 5376 | none |
| anthropic | reasoning.visibility | pass | `claude-opus-4.6` | 3138 | none |
| anthropic | modality.image_generation | skipped | `claude-opus-4.6` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.6` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.6` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.6` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.6` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-sonnet-4.5` | 3025 | none |
| anthropic | messages.generate | pass | `claude-sonnet-4.5` | 2731 | none |
| anthropic | rid.passthrough | pass | `claude-sonnet-4.5` | 2457 | none |
| anthropic | text.stream | pass | `claude-sonnet-4.5` | 3290 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4.5` | 5077 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4.5` | 5687 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4.5` | 5866 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4.5` | 5008 | none |
| anthropic | vision.image_input | pass | `claude-sonnet-4.5` | 4102 | none |
| anthropic | reasoning.visibility | pass | `claude-sonnet-4.5` | 4138 | none |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-opus-4.5` | 2767 | none |
| anthropic | messages.generate | pass | `claude-opus-4.5` | 1865 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4.5` | 2260 | none |
| anthropic | text.stream | pass | `claude-opus-4.5` | 4248 | none |
| anthropic | structured.output.object | pass | `claude-opus-4.5` | 4209 | none |
| anthropic | tool.loop.deterministic | pass | `claude-opus-4.5` | 5265 | none |
| anthropic | agent.tool_loop | pass | `claude-opus-4.5` | 6281 | none |
| anthropic | structured.plus.tools | pass | `claude-opus-4.5` | 5111 | none |
| anthropic | vision.image_input | pass | `claude-opus-4.5` | 3475 | none |
| anthropic | reasoning.visibility | pass | `claude-opus-4.5` | 3024 | none |
| anthropic | modality.image_generation | skipped | `claude-opus-4.5` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.5` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.5` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.5` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.5` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-opus-4.1` | 2289 | none |
| anthropic | messages.generate | pass | `claude-opus-4.1` | 2484 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4.1` | 2662 | none |
| anthropic | text.stream | pass | `claude-opus-4.1` | 3133 | none |
| anthropic | structured.output.object | pass | `claude-opus-4.1` | 5258 | none |
| anthropic | tool.loop.deterministic | fail | `claude-opus-4.1` | 19973 | No output generated. Check the stream for errors. |
| anthropic | agent.tool_loop | fail | `claude-opus-4.1` | 19554 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | structured.plus.tools | pass | `claude-opus-4.1` | 10755 | none |
| anthropic | vision.image_input | pass | `claude-opus-4.1` | 5784 | none |
| anthropic | reasoning.visibility | pass | `claude-opus-4.1` | 4486 | none |
| anthropic | modality.image_generation | skipped | `claude-opus-4.1` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.1` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.1` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.1` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.1` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-sonnet-4` | 2106 | none |
| anthropic | messages.generate | pass | `claude-sonnet-4` | 1934 | none |
| anthropic | rid.passthrough | pass | `claude-sonnet-4` | 1880 | none |
| anthropic | text.stream | pass | `claude-sonnet-4` | 2616 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4` | 3815 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4` | 4152 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4` | 5398 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4` | 4031 | none |
| anthropic | vision.image_input | pass | `claude-sonnet-4` | 3376 | none |
| anthropic | reasoning.visibility | pass | `claude-sonnet-4` | 3473 | none |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-opus-4` | 2588 | none |
| anthropic | messages.generate | pass | `claude-opus-4` | 2480 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4` | 2769 | none |
| anthropic | text.stream | pass | `claude-opus-4` | 3297 | none |
| anthropic | structured.output.object | pass | `claude-opus-4` | 4331 | none |
| anthropic | tool.loop.deterministic | fail | `claude-opus-4` | 20235 | No output generated. Check the stream for errors. |
| anthropic | agent.tool_loop | fail | `claude-opus-4` | 20962 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | structured.plus.tools | pass | `claude-opus-4` | 11589 | none |
| anthropic | vision.image_input | pass | `claude-opus-4` | 5517 | none |
| anthropic | reasoning.visibility | pass | `claude-opus-4` | 4030 | none |
| anthropic | modality.image_generation | skipped | `claude-opus-4` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-3.7-sonnet` | 1905 | none |
| anthropic | messages.generate | pass | `claude-3.7-sonnet` | 2910 | none |
| anthropic | rid.passthrough | pass | `claude-3.7-sonnet` | 2553 | none |
| anthropic | text.stream | pass | `claude-3.7-sonnet` | 2237 | none |
| anthropic | structured.output.object | pass | `claude-3.7-sonnet` | 6021 | none |
| anthropic | tool.loop.deterministic | pass | `claude-3.7-sonnet` | 4786 | none |
| anthropic | agent.tool_loop | pass | `claude-3.7-sonnet` | 5656 | none |
| anthropic | structured.plus.tools | pass | `claude-3.7-sonnet` | 4739 | none |
| anthropic | vision.image_input | pass | `claude-3.7-sonnet` | 3547 | none |
| anthropic | reasoning.visibility | pass | `claude-3.7-sonnet` | 2998 | none |
| anthropic | modality.image_generation | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-3.5-haiku` | 2056 | none |
| anthropic | messages.generate | pass | `claude-3.5-haiku` | 2017 | none |
| anthropic | rid.passthrough | pass | `claude-3.5-haiku` | 1889 | none |
| anthropic | text.stream | pass | `claude-3.5-haiku` | 2108 | none |
| anthropic | structured.output.object | pass | `claude-3.5-haiku` | 3668 | none |
| anthropic | tool.loop.deterministic | pass | `claude-3.5-haiku` | 3899 | none |
| anthropic | agent.tool_loop | pass | `claude-3.5-haiku` | 4191 | none |
| anthropic | structured.plus.tools | pass | `claude-3.5-haiku` | 4952 | none |
| anthropic | vision.image_input | pass | `claude-3.5-haiku` | 2718 | none |
| anthropic | reasoning.visibility | fail | `claude-3.5-haiku` | 1582 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-3.1-flash-lite` | 2001 | none |
| google | messages.generate | pass | `gemini-3.1-flash-lite` | 1971 | none |
| google | rid.passthrough | pass | `gemini-3.1-flash-lite` | 1909 | none |
| google | text.stream | pass | `gemini-3.1-flash-lite` | 2553 | none |
| google | structured.output.object | pass | `gemini-3.1-flash-lite` | 2609 | none |
| google | tool.loop.deterministic | pass | `gemini-3.1-flash-lite` | 3694 | none |
| google | agent.tool_loop | pass | `gemini-3.1-flash-lite` | 4043 | none |
| google | structured.plus.tools | pass | `gemini-3.1-flash-lite` | 4002 | none |
| google | vision.image_input | pass | `gemini-3.1-flash-lite` | 4050 | none |
| google | reasoning.visibility | skipped | `gemini-3.1-flash-lite` | 0 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-3.1-pro` | 6395 | none |
| google | messages.generate | pass | `gemini-3.1-pro` | 5233 | none |
| google | rid.passthrough | pass | `gemini-3.1-pro` | 3965 | none |
| google | text.stream | pass | `gemini-3.1-pro` | 6895 | none |
| google | structured.output.object | fail | `gemini-3.1-pro` | 11103 | No output generated. |
| google | tool.loop.deterministic | pass | `gemini-3.1-pro` | 7991 | none |
| google | agent.tool_loop | pass | `gemini-3.1-pro` | 8800 | none |
| google | structured.plus.tools | pass | `gemini-3.1-pro` | 9442 | none |
| google | vision.image_input | pass | `gemini-3.1-pro` | 5250 | none |
| google | reasoning.visibility | skipped | `gemini-3.1-pro` | 0 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3.1-pro` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3.1-pro` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3.1-pro` | 1 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3.1-pro` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3.1-pro` | 0 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-3-flash` | 3196 | none |
| google | messages.generate | pass | `gemini-3-flash` | 3610 | none |
| google | rid.passthrough | pass | `gemini-3-flash` | 2744 | none |
| google | text.stream | pass | `gemini-3-flash` | 3322 | none |
| google | structured.output.object | pass | `gemini-3-flash` | 5434 | none |
| google | tool.loop.deterministic | pass | `gemini-3-flash` | 6007 | none |
| google | agent.tool_loop | pass | `gemini-3-flash` | 4819 | none |
| google | structured.plus.tools | pass | `gemini-3-flash` | 7414 | none |
| google | vision.image_input | pass | `gemini-3-flash` | 4281 | none |
| google | reasoning.visibility | skipped | `gemini-3-flash` | 0 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3-flash` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3-flash` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3-flash` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3-flash` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3-flash` | 0 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-2.5-pro` | 4310 | none |
| google | messages.generate | pass | `gemini-2.5-pro` | 4688 | none |
| google | rid.passthrough | pass | `gemini-2.5-pro` | 4285 | none |
| google | text.stream | pass | `gemini-2.5-pro` | 6140 | none |
| google | structured.output.object | pass | `gemini-2.5-pro` | 11859 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-pro` | 7097 | none |
| google | agent.tool_loop | pass | `gemini-2.5-pro` | 8098 | none |
| google | structured.plus.tools | pass | `gemini-2.5-pro` | 12739 | none |
| google | vision.image_input | pass | `gemini-2.5-pro` | 4049 | none |
| google | reasoning.visibility | skipped | `gemini-2.5-pro` | 0 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-pro` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-pro` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-pro` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-pro` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-pro` | 0 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-2.5-flash-lite` | 2287 | none |
| google | messages.generate | pass | `gemini-2.5-flash-lite` | 1785 | none |
| google | rid.passthrough | pass | `gemini-2.5-flash-lite` | 1740 | none |
| google | text.stream | pass | `gemini-2.5-flash-lite` | 1817 | none |
| google | structured.output.object | pass | `gemini-2.5-flash-lite` | 1996 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-flash-lite` | 3342 | none |
| google | agent.tool_loop | fail | `gemini-2.5-flash-lite` | 3999 | expected 'Verified.' to match /agent/i |
| google | structured.plus.tools | pass | `gemini-2.5-flash-lite` | 3702 | none |
| google | vision.image_input | pass | `gemini-2.5-flash-lite` | 3005 | none |
| google | reasoning.visibility | skipped | `gemini-2.5-flash-lite` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-flash-lite` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-flash-lite` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-flash-lite` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-flash-lite` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-flash-lite` | 0 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-2.5-flash` | 2547 | none |
| google | messages.generate | pass | `gemini-2.5-flash` | 2555 | none |
| google | rid.passthrough | pass | `gemini-2.5-flash` | 1848 | none |
| google | text.stream | pass | `gemini-2.5-flash` | 3371 | none |
| google | structured.output.object | pass | `gemini-2.5-flash` | 3258 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-flash` | 4508 | none |
| google | agent.tool_loop | pass | `gemini-2.5-flash` | 4319 | none |
| google | structured.plus.tools | pass | `gemini-2.5-flash` | 19883 | none |
| google | vision.image_input | pass | `gemini-2.5-flash` | 3800 | none |
| google | reasoning.visibility | skipped | `gemini-2.5-flash` | 0 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-flash` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-flash` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-flash` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-flash` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-flash` | 0 | google.modality.rerank is not supported by the package yet. |
| openai | registry.routing | pass | `gpt-5-nano,claude-haiku-4.5,gemini-3.1-flash-lite` | 9276 | none |
| openai | embedding.proxy_probe | pass | `text-embedding-3-small` | 537 | none |
| anthropic | embedding.proxy_probe | skipped | `claude-haiku-4.5` | 1 | Anthropic embeddings are not configured as a supported matrix target yet. |
| google | embedding.proxy_probe | skipped | `gemini-3.1-flash-lite` | 0 | Google embedding probe model is not configured for this stack. |

## Non-Pass Details

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

### openai.reasoning.visibility

- Status: `fail`
- Model: `gpt-5.4`
- Notes: expected false to be true // Object.is equality

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

### anthropic.tool.loop.deterministic

- Status: `fail`
- Model: `claude-opus-4.1`
- Notes: No output generated. Check the stream for errors.

### anthropic.agent.tool_loop

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

### google.structured.output.object

- Status: `fail`
- Model: `gemini-3.1-pro`
- Notes: No output generated.

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

### google.agent.tool_loop

- Status: `fail`
- Model: `gemini-2.5-flash-lite`
- Notes: expected 'Verified.' to match /agent/i

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
- Model: `claude-haiku-4.5`
- Notes: Anthropic embeddings are not configured as a supported matrix target yet.

### google.embedding.proxy_probe

- Status: `skipped`
- Model: `gemini-3.1-flash-lite`
- Notes: Google embedding probe model is not configured for this stack.


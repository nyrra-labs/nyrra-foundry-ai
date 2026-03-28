# Live Capability Matrix

Generated from the latest local live verification artifact.

- Run ID: `2026-03-28T08-29-30.093Z-32e0e4`
- Git SHA: `340b2bf`
- Package Version: `0.0.1`
- Artifact: `.memory/capability-runs/2026-03-28T08-29-30.093Z-32e0e4`
- Started: 2026-03-28T08:29:30.771Z
- Finished: 2026-03-28T08:43:03.943Z
- Default Models: openai=`gpt-5-mini`, anthropic=`claude-sonnet-4.6`, google=`gemini-3.1-flash-lite`
- Model Scope: `catalog`
- Status Counts: `pass`: 297, `skipped`: 184, `fail`: 18

The live suite is the canonical verification surface for proxy-sensitive behavior. The default per-provider models are the hard gate; the rest of the catalog rows are investigation coverage and are allowed to surface non-pass results without failing the suite. Survey coverage excludes lifecycle `sunset` and `deprecated` models. Rows marked `skipped` are intentionally out of scope for the current stack or package surface. Rows marked `proxy-rejected` are real proxy or request-shape failures that need investigation.

## Provider Summary

| Provider | Pass | Skipped | Proxy Rejected | Unsupported | Fail |
|---|---:|---:|---:|---:|---:|
| openai | 160 | 96 | 0 | 0 | 1 |
| anthropic | 84 | 51 | 0 | 0 | 16 |
| google | 53 | 37 | 0 | 0 | 1 |

## Provider Capability Tables

Rows are models. Columns are the primary live language-model capabilities. Newer models appear first within each provider.

### openai

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `gpt-5.4-nano` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.4-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.4` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.2` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5.1-codex-mini` | pass | pass | pass | pass | pass | pass | pass | pass | skipped | skipped |
| `gpt-5.1-codex` | pass | pass | pass | pass | pass | pass | pass | pass | skipped | skipped |
| `gpt-5.1` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gpt-5-nano` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5-mini` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `gpt-5-codex` | fail | pass | pass | pass | pass | pass | pass | pass | skipped | skipped |
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
| `claude-sonnet-4.6` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-opus-4.6` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-sonnet-4.5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-opus-4.5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| `claude-haiku-4.5` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-opus-4.1` | pass | pass | pass | pass | fail | fail | fail | fail | fail | fail |
| `claude-sonnet-4` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-opus-4` | pass | pass | pass | pass | pass | fail | fail | fail | fail | fail |
| `claude-3.7-sonnet` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |
| `claude-3.5-haiku` | pass | pass | pass | pass | pass | pass | pass | pass | pass | fail |


### google

| Model | Text | Messages | RID | Stream | Structured | Tools | Agent | Structured+Tools | Vision | Reasoning |
|---|---|---|---|---|---|---|---|---|---|---|
| `gemini-3.1-pro` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-3.1-flash-lite` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-3-flash` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-2.5-pro` | pass | pass | pass | pass | fail | pass | pass | pass | pass | skipped |
| `gemini-2.5-flash-lite` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |
| `gemini-2.5-flash` | pass | pass | pass | pass | pass | pass | pass | pass | pass | skipped |


## Detailed Rows

| Provider | Capability | Status | Model | Duration ms | Notes |
|---|---|---|---|---:|---|
| openai | rid.passthrough | pass | `gpt-5.4-nano` | 1259 | none |
| openai | messages.generate | pass | `gpt-5.4-nano` | 1333 | none |
| openai | text.generate | pass | `gpt-5.4-nano` | 1953 | none |
| openai | text.stream | pass | `gpt-5.4-nano` | 857 | none |
| openai | structured.output.object | pass | `gpt-5.4-nano` | 2443 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.4-nano` | 1951 | none |
| openai | agent.tool_loop | pass | `gpt-5.4-nano` | 2034 | none |
| openai | structured.plus.tools | pass | `gpt-5.4-nano` | 2460 | none |
| openai | vision.image_input | pass | `gpt-5.4-nano` | 3800 | none |
| openai | reasoning.visibility | pass | `gpt-5.4-nano` | 1054 | none |
| openai | modality.image_generation | skipped | `gpt-5.4-nano` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.4-nano` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.4-nano` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.4-nano` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.4-nano` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-5.4-mini` | 1007 | none |
| openai | rid.passthrough | pass | `gpt-5.4-mini` | 1011 | none |
| openai | text.generate | pass | `gpt-5.4-mini` | 1701 | none |
| openai | text.stream | pass | `gpt-5.4-mini` | 740 | none |
| openai | structured.output.object | pass | `gpt-5.4-mini` | 1768 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.4-mini` | 1839 | none |
| openai | agent.tool_loop | pass | `gpt-5.4-mini` | 2850 | none |
| openai | structured.plus.tools | pass | `gpt-5.4-mini` | 2432 | none |
| openai | vision.image_input | pass | `gpt-5.4-mini` | 1879 | none |
| openai | reasoning.visibility | pass | `gpt-5.4-mini` | 657 | none |
| openai | modality.image_generation | skipped | `gpt-5.4-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.4-mini` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.4-mini` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.4-mini` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.4-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-5.4` | 1134 | none |
| openai | text.generate | pass | `gpt-5.4` | 1170 | none |
| openai | rid.passthrough | pass | `gpt-5.4` | 1633 | none |
| openai | text.stream | pass | `gpt-5.4` | 1664 | none |
| openai | structured.output.object | pass | `gpt-5.4` | 1746 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.4` | 2181 | none |
| openai | agent.tool_loop | pass | `gpt-5.4` | 2983 | none |
| openai | structured.plus.tools | pass | `gpt-5.4` | 4720 | none |
| openai | vision.image_input | pass | `gpt-5.4` | 2915 | none |
| openai | reasoning.visibility | pass | `gpt-5.4` | 1388 | none |
| openai | modality.image_generation | skipped | `gpt-5.4` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.4` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.4` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.4` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.4` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | rid.passthrough | pass | `gpt-5.2` | 1367 | none |
| openai | messages.generate | pass | `gpt-5.2` | 1750 | none |
| openai | structured.output.object | pass | `gpt-5.2` | 1405 | none |
| openai | text.stream | pass | `gpt-5.2` | 1818 | none |
| openai | text.generate | pass | `gpt-5.2` | 3295 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.2` | 3627 | none |
| openai | agent.tool_loop | pass | `gpt-5.2` | 3716 | none |
| openai | structured.plus.tools | pass | `gpt-5.2` | 2608 | none |
| openai | vision.image_input | pass | `gpt-5.2` | 4057 | none |
| openai | reasoning.visibility | pass | `gpt-5.2` | 1047 | none |
| openai | modality.image_generation | skipped | `gpt-5.2` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.2` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.2` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.2` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.2` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5.1-codex-mini` | 1562 | none |
| openai | rid.passthrough | pass | `gpt-5.1-codex-mini` | 1567 | none |
| openai | structured.output.object | pass | `gpt-5.1-codex-mini` | 1675 | none |
| openai | messages.generate | pass | `gpt-5.1-codex-mini` | 3244 | none |
| openai | text.stream | pass | `gpt-5.1-codex-mini` | 4418 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1-codex-mini` | 3039 | none |
| openai | agent.tool_loop | pass | `gpt-5.1-codex-mini` | 4305 | none |
| openai | structured.plus.tools | pass | `gpt-5.1-codex-mini` | 7301 | none |
| openai | vision.image_input | skipped | `gpt-5.1-codex-mini` | 1 | Model "gpt-5.1-codex-mini" does not claim vision support. |
| openai | reasoning.visibility | skipped | `gpt-5.1-codex-mini` | 0 | OpenAI reasoning visibility is not asserted for gpt-5.1-codex-mini. |
| openai | modality.image_generation | skipped | `gpt-5.1-codex-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1-codex-mini` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1-codex-mini` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1-codex-mini` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1-codex-mini` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | rid.passthrough | pass | `gpt-5.1-codex` | 1353 | none |
| openai | messages.generate | pass | `gpt-5.1-codex` | 1556 | none |
| openai | text.generate | pass | `gpt-5.1-codex` | 2866 | none |
| openai | text.stream | pass | `gpt-5.1-codex` | 2335 | none |
| openai | structured.output.object | pass | `gpt-5.1-codex` | 2260 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1-codex` | 2513 | none |
| openai | agent.tool_loop | pass | `gpt-5.1-codex` | 3783 | none |
| openai | structured.plus.tools | pass | `gpt-5.1-codex` | 2960 | none |
| openai | vision.image_input | skipped | `gpt-5.1-codex` | 1 | Model "gpt-5.1-codex" does not claim vision support. |
| openai | reasoning.visibility | skipped | `gpt-5.1-codex` | 0 | OpenAI reasoning visibility is not asserted for gpt-5.1-codex. |
| openai | modality.image_generation | skipped | `gpt-5.1-codex` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1-codex` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1-codex` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1-codex` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1-codex` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5.1` | 687 | none |
| openai | messages.generate | pass | `gpt-5.1` | 1709 | none |
| openai | rid.passthrough | pass | `gpt-5.1` | 1711 | none |
| openai | text.stream | pass | `gpt-5.1` | 2643 | none |
| openai | structured.output.object | pass | `gpt-5.1` | 1662 | none |
| openai | tool.loop.deterministic | pass | `gpt-5.1` | 1978 | none |
| openai | agent.tool_loop | pass | `gpt-5.1` | 4881 | none |
| openai | structured.plus.tools | pass | `gpt-5.1` | 2919 | none |
| openai | vision.image_input | pass | `gpt-5.1` | 2383 | none |
| openai | reasoning.visibility | skipped | `gpt-5.1` | 1 | OpenAI reasoning visibility is not asserted for gpt-5.1. |
| openai | modality.image_generation | skipped | `gpt-5.1` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5.1` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5.1` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5.1` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5.1` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-5-nano` | 1620 | none |
| openai | rid.passthrough | pass | `gpt-5-nano` | 2117 | none |
| openai | text.generate | pass | `gpt-5-nano` | 2249 | none |
| openai | text.stream | pass | `gpt-5-nano` | 1640 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-nano` | 3243 | none |
| openai | structured.output.object | pass | `gpt-5-nano` | 4215 | none |
| openai | agent.tool_loop | pass | `gpt-5-nano` | 51901 | none |
| openai | structured.plus.tools | pass | `gpt-5-nano` | 4083 | none |
| openai | vision.image_input | pass | `gpt-5-nano` | 2572 | none |
| openai | reasoning.visibility | pass | `gpt-5-nano` | 4650 | none |
| openai | modality.image_generation | skipped | `gpt-5-nano` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-nano` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-nano` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-nano` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-nano` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-5-mini` | 1623 | none |
| openai | messages.generate | pass | `gpt-5-mini` | 906 | none |
| openai | rid.passthrough | pass | `gpt-5-mini` | 1754 | none |
| openai | text.stream | pass | `gpt-5-mini` | 1344 | none |
| openai | structured.output.object | pass | `gpt-5-mini` | 3186 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-mini` | 1981 | none |
| openai | agent.tool_loop | pass | `gpt-5-mini` | 3157 | none |
| openai | structured.plus.tools | pass | `gpt-5-mini` | 4222 | none |
| openai | vision.image_input | pass | `gpt-5-mini` | 2909 | none |
| openai | reasoning.visibility | pass | `gpt-5-mini` | 2352 | none |
| openai | modality.image_generation | skipped | `gpt-5-mini` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-mini` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-mini` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-mini` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-5-codex` | 2058 | none |
| openai | text.generate | fail | `gpt-5-codex` | 2285 | expected 'i’m sorry, but i can’t help with that.' to contain 'openai' |
| openai | rid.passthrough | pass | `gpt-5-codex` | 3743 | none |
| openai | text.stream | pass | `gpt-5-codex` | 1987 | none |
| openai | structured.output.object | pass | `gpt-5-codex` | 3458 | none |
| openai | tool.loop.deterministic | pass | `gpt-5-codex` | 2734 | none |
| openai | agent.tool_loop | pass | `gpt-5-codex` | 4816 | none |
| openai | structured.plus.tools | pass | `gpt-5-codex` | 6262 | none |
| openai | vision.image_input | skipped | `gpt-5-codex` | 1 | Model "gpt-5-codex" does not claim vision support. |
| openai | reasoning.visibility | skipped | `gpt-5-codex` | 0 | OpenAI reasoning visibility is not asserted for gpt-5-codex. |
| openai | modality.image_generation | skipped | `gpt-5-codex` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5-codex` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5-codex` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5-codex` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5-codex` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-5` | 2135 | none |
| openai | text.generate | pass | `gpt-5` | 3065 | none |
| openai | text.stream | pass | `gpt-5` | 994 | none |
| openai | rid.passthrough | pass | `gpt-5` | 3521 | none |
| openai | structured.output.object | pass | `gpt-5` | 1531 | none |
| openai | tool.loop.deterministic | pass | `gpt-5` | 2648 | none |
| openai | agent.tool_loop | pass | `gpt-5` | 3440 | none |
| openai | structured.plus.tools | pass | `gpt-5` | 4640 | none |
| openai | vision.image_input | pass | `gpt-5` | 2445 | none |
| openai | reasoning.visibility | pass | `gpt-5` | 2630 | none |
| openai | modality.image_generation | skipped | `gpt-5` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-5` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-5` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-5` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-5` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-4.1-nano` | 1208 | none |
| openai | text.generate | pass | `gpt-4.1-nano` | 1468 | none |
| openai | rid.passthrough | pass | `gpt-4.1-nano` | 1568 | none |
| openai | text.stream | pass | `gpt-4.1-nano` | 965 | none |
| openai | structured.output.object | pass | `gpt-4.1-nano` | 860 | none |
| openai | agent.tool_loop | pass | `gpt-4.1-nano` | 2814 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1-nano` | 3961 | none |
| openai | structured.plus.tools | pass | `gpt-4.1-nano` | 2405 | none |
| openai | vision.image_input | pass | `gpt-4.1-nano` | 2711 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1-nano` | 0 | OpenAI reasoning visibility is not asserted for gpt-4.1-nano. |
| openai | modality.image_generation | skipped | `gpt-4.1-nano` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1-nano` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1-nano` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1-nano` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1-nano` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4.1-mini` | 814 | none |
| openai | messages.generate | pass | `gpt-4.1-mini` | 881 | none |
| openai | rid.passthrough | pass | `gpt-4.1-mini` | 882 | none |
| openai | text.stream | pass | `gpt-4.1-mini` | 929 | none |
| openai | structured.output.object | pass | `gpt-4.1-mini` | 985 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1-mini` | 2283 | none |
| openai | agent.tool_loop | pass | `gpt-4.1-mini` | 1677 | none |
| openai | structured.plus.tools | pass | `gpt-4.1-mini` | 1900 | none |
| openai | vision.image_input | pass | `gpt-4.1-mini` | 1717 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1-mini` | 1 | OpenAI reasoning visibility is not asserted for gpt-4.1-mini. |
| openai | modality.image_generation | skipped | `gpt-4.1-mini` | 1 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1-mini` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1-mini` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1-mini` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1-mini` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | text.generate | pass | `gpt-4.1` | 1354 | none |
| openai | messages.generate | pass | `gpt-4.1` | 1356 | none |
| openai | structured.output.object | pass | `gpt-4.1` | 809 | none |
| openai | text.stream | pass | `gpt-4.1` | 1287 | none |
| openai | rid.passthrough | pass | `gpt-4.1` | 2711 | none |
| openai | agent.tool_loop | pass | `gpt-4.1` | 2006 | none |
| openai | tool.loop.deterministic | pass | `gpt-4.1` | 3066 | none |
| openai | structured.plus.tools | pass | `gpt-4.1` | 2187 | none |
| openai | vision.image_input | pass | `gpt-4.1` | 1591 | none |
| openai | reasoning.visibility | skipped | `gpt-4.1` | 1 | OpenAI reasoning visibility is not asserted for gpt-4.1. |
| openai | modality.image_generation | skipped | `gpt-4.1` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4.1` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4.1` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4.1` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4.1` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | rid.passthrough | pass | `o4-mini` | 1554 | none |
| openai | messages.generate | pass | `o4-mini` | 1557 | none |
| openai | text.generate | pass | `o4-mini` | 1559 | none |
| openai | text.stream | pass | `o4-mini` | 1733 | none |
| openai | tool.loop.deterministic | pass | `o4-mini` | 2886 | none |
| openai | structured.output.object | pass | `o4-mini` | 3009 | none |
| openai | agent.tool_loop | pass | `o4-mini` | 2288 | none |
| openai | structured.plus.tools | pass | `o4-mini` | 2651 | none |
| openai | vision.image_input | pass | `o4-mini` | 2494 | none |
| openai | reasoning.visibility | pass | `o4-mini` | 3578 | none |
| openai | modality.image_generation | skipped | `o4-mini` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `o4-mini` | 1 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `o4-mini` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `o4-mini` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `o4-mini` | 0 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `gpt-4o` | 771 | none |
| openai | rid.passthrough | pass | `gpt-4o` | 772 | none |
| openai | text.generate | pass | `gpt-4o` | 1112 | none |
| openai | text.stream | pass | `gpt-4o` | 1455 | none |
| openai | structured.output.object | pass | `gpt-4o` | 2263 | none |
| openai | tool.loop.deterministic | pass | `gpt-4o` | 3005 | none |
| openai | agent.tool_loop | pass | `gpt-4o` | 2640 | none |
| openai | structured.plus.tools | pass | `gpt-4o` | 2823 | none |
| openai | vision.image_input | pass | `gpt-4o` | 1914 | none |
| openai | reasoning.visibility | skipped | `gpt-4o` | 0 | OpenAI reasoning visibility is not asserted for gpt-4o. |
| openai | modality.image_generation | skipped | `gpt-4o` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `gpt-4o` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `gpt-4o` | 0 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `gpt-4o` | 1 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `gpt-4o` | 1 | openai.modality.rerank is not supported by the package yet. |
| openai | messages.generate | pass | `o3` | 1610 | none |
| openai | rid.passthrough | pass | `o3` | 1613 | none |
| openai | text.generate | pass | `o3` | 1616 | none |
| openai | text.stream | pass | `o3` | 1709 | none |
| openai | tool.loop.deterministic | pass | `o3` | 2560 | none |
| openai | structured.output.object | pass | `o3` | 2647 | none |
| openai | agent.tool_loop | pass | `o3` | 2607 | none |
| openai | structured.plus.tools | pass | `o3` | 2361 | none |
| openai | vision.image_input | pass | `o3` | 2434 | none |
| openai | reasoning.visibility | pass | `o3` | 1187 | none |
| openai | modality.image_generation | skipped | `o3` | 0 | openai.modality.image_generation is not supported by the package yet. |
| openai | modality.speech | skipped | `o3` | 0 | openai.modality.speech is not supported by the package yet. |
| openai | modality.transcription | skipped | `o3` | 1 | openai.modality.transcription is not supported by the package yet. |
| openai | modality.video | skipped | `o3` | 0 | openai.modality.video is not supported by the package yet. |
| openai | modality.rerank | skipped | `o3` | 0 | openai.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-sonnet-4.6` | 1376 | none |
| anthropic | messages.generate | pass | `claude-sonnet-4.6` | 978 | none |
| anthropic | rid.passthrough | pass | `claude-sonnet-4.6` | 642 | none |
| anthropic | text.stream | pass | `claude-sonnet-4.6` | 985 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4.6` | 4154 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4.6` | 2736 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4.6` | 2794 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4.6` | 2228 | none |
| anthropic | vision.image_input | pass | `claude-sonnet-4.6` | 3291 | none |
| anthropic | reasoning.visibility | pass | `claude-sonnet-4.6` | 2612 | none |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4.6` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4.6` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | messages.generate | pass | `claude-opus-4.6` | 898 | none |
| anthropic | text.generate | pass | `claude-opus-4.6` | 973 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4.6` | 1167 | none |
| anthropic | text.stream | pass | `claude-opus-4.6` | 1445 | none |
| anthropic | tool.loop.deterministic | pass | `claude-opus-4.6` | 2897 | none |
| anthropic | agent.tool_loop | pass | `claude-opus-4.6` | 2205 | none |
| anthropic | structured.output.object | pass | `claude-opus-4.6` | 4985 | none |
| anthropic | structured.plus.tools | pass | `claude-opus-4.6` | 2482 | none |
| anthropic | vision.image_input | pass | `claude-opus-4.6` | 3233 | none |
| anthropic | reasoning.visibility | pass | `claude-opus-4.6` | 1771 | none |
| anthropic | modality.image_generation | skipped | `claude-opus-4.6` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.6` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.6` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.6` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.6` | 1 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | messages.generate | pass | `claude-sonnet-4.5` | 1676 | none |
| anthropic | rid.passthrough | pass | `claude-sonnet-4.5` | 1878 | none |
| anthropic | text.generate | pass | `claude-sonnet-4.5` | 1882 | none |
| anthropic | text.stream | pass | `claude-sonnet-4.5` | 2390 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4.5` | 3802 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4.5` | 4161 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4.5` | 3049 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4.5` | 4014 | none |
| anthropic | vision.image_input | pass | `claude-sonnet-4.5` | 2797 | none |
| anthropic | reasoning.visibility | fail | `claude-sonnet-4.5` | 463 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4.5` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4.5` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4.5` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4.5` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-opus-4.5` | 1241 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4.5` | 1898 | none |
| anthropic | messages.generate | pass | `claude-opus-4.5` | 1999 | none |
| anthropic | text.stream | pass | `claude-opus-4.5` | 2070 | none |
| anthropic | structured.output.object | pass | `claude-opus-4.5` | 2934 | none |
| anthropic | tool.loop.deterministic | pass | `claude-opus-4.5` | 3251 | none |
| anthropic | agent.tool_loop | pass | `claude-opus-4.5` | 2829 | none |
| anthropic | structured.plus.tools | pass | `claude-opus-4.5` | 3158 | none |
| anthropic | vision.image_input | pass | `claude-opus-4.5` | 3203 | none |
| anthropic | reasoning.visibility | pass | `claude-opus-4.5` | 1924 | none |
| anthropic | modality.image_generation | skipped | `claude-opus-4.5` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.5` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.5` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.5` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.5` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | messages.generate | pass | `claude-haiku-4.5` | 485 | none |
| anthropic | rid.passthrough | pass | `claude-haiku-4.5` | 1204 | none |
| anthropic | text.generate | pass | `claude-haiku-4.5` | 1289 | none |
| anthropic | text.stream | pass | `claude-haiku-4.5` | 1472 | none |
| anthropic | tool.loop.deterministic | pass | `claude-haiku-4.5` | 1260 | none |
| anthropic | structured.output.object | pass | `claude-haiku-4.5` | 2078 | none |
| anthropic | agent.tool_loop | pass | `claude-haiku-4.5` | 1416 | none |
| anthropic | structured.plus.tools | pass | `claude-haiku-4.5` | 2577 | none |
| anthropic | vision.image_input | pass | `claude-haiku-4.5` | 1464 | none |
| anthropic | reasoning.visibility | fail | `claude-haiku-4.5` | 532 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-haiku-4.5` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-opus-4.1` | 1433 | none |
| anthropic | messages.generate | pass | `claude-opus-4.1` | 1438 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4.1` | 1545 | none |
| anthropic | text.stream | pass | `claude-opus-4.1` | 2049 | none |
| anthropic | tool.loop.deterministic | fail | `claude-opus-4.1` | 17473 | expected '' to match /signal/i |
| anthropic | structured.output.object | fail | `claude-opus-4.1` | 18628 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | agent.tool_loop | fail | `claude-opus-4.1` | 17863 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | structured.plus.tools | fail | `claude-opus-4.1` | 19026 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | vision.image_input | fail | `claude-opus-4.1` | 16710 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | reasoning.visibility | fail | `claude-opus-4.1` | 3778 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-opus-4.1` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4.1` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4.1` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4.1` | 1 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4.1` | 1 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-sonnet-4` | 763 | none |
| anthropic | rid.passthrough | pass | `claude-sonnet-4` | 1210 | none |
| anthropic | messages.generate | pass | `claude-sonnet-4` | 1297 | none |
| anthropic | text.stream | pass | `claude-sonnet-4` | 1622 | none |
| anthropic | tool.loop.deterministic | pass | `claude-sonnet-4` | 2561 | none |
| anthropic | structured.output.object | pass | `claude-sonnet-4` | 2758 | none |
| anthropic | agent.tool_loop | pass | `claude-sonnet-4` | 2492 | none |
| anthropic | structured.plus.tools | pass | `claude-sonnet-4` | 2606 | none |
| anthropic | vision.image_input | pass | `claude-sonnet-4` | 2075 | none |
| anthropic | reasoning.visibility | fail | `claude-sonnet-4` | 849 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-sonnet-4` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-sonnet-4` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-sonnet-4` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-sonnet-4` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-sonnet-4` | 1 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-opus-4` | 1156 | none |
| anthropic | rid.passthrough | pass | `claude-opus-4` | 1463 | none |
| anthropic | messages.generate | pass | `claude-opus-4` | 1569 | none |
| anthropic | text.stream | pass | `claude-opus-4` | 1756 | none |
| anthropic | structured.output.object | pass | `claude-opus-4` | 2976 | none |
| anthropic | tool.loop.deterministic | fail | `claude-opus-4` | 16607 | No output generated. Check the stream for errors. |
| anthropic | agent.tool_loop | fail | `claude-opus-4` | 18175 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | structured.plus.tools | fail | `claude-opus-4` | 17616 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | vision.image_input | fail | `claude-opus-4` | 17404 | Failed after 3 attempts. Last error: Too Many Requests |
| anthropic | reasoning.visibility | fail | `claude-opus-4` | 6032 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-opus-4` | 1 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-opus-4` | 1 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-opus-4` | 1 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-opus-4` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-opus-4` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | messages.generate | pass | `claude-3.7-sonnet` | 899 | none |
| anthropic | text.generate | pass | `claude-3.7-sonnet` | 1544 | none |
| anthropic | rid.passthrough | pass | `claude-3.7-sonnet` | 1648 | none |
| anthropic | text.stream | pass | `claude-3.7-sonnet` | 1032 | none |
| anthropic | structured.output.object | pass | `claude-3.7-sonnet` | 3075 | none |
| anthropic | agent.tool_loop | pass | `claude-3.7-sonnet` | 3081 | none |
| anthropic | tool.loop.deterministic | pass | `claude-3.7-sonnet` | 17132 | none |
| anthropic | structured.plus.tools | pass | `claude-3.7-sonnet` | 3073 | none |
| anthropic | vision.image_input | pass | `claude-3.7-sonnet` | 2423 | none |
| anthropic | reasoning.visibility | fail | `claude-3.7-sonnet` | 251 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-3.7-sonnet` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| anthropic | text.generate | pass | `claude-3.5-haiku` | 726 | none |
| anthropic | messages.generate | pass | `claude-3.5-haiku` | 929 | none |
| anthropic | rid.passthrough | pass | `claude-3.5-haiku` | 930 | none |
| anthropic | text.stream | pass | `claude-3.5-haiku` | 801 | none |
| anthropic | tool.loop.deterministic | pass | `claude-3.5-haiku` | 2037 | none |
| anthropic | agent.tool_loop | pass | `claude-3.5-haiku` | 1796 | none |
| anthropic | structured.output.object | pass | `claude-3.5-haiku` | 3118 | none |
| anthropic | structured.plus.tools | pass | `claude-3.5-haiku` | 2447 | none |
| anthropic | vision.image_input | pass | `claude-3.5-haiku` | 1752 | none |
| anthropic | reasoning.visibility | fail | `claude-3.5-haiku` | 228 | No output generated. Check the stream for errors. |
| anthropic | modality.image_generation | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.image_generation is not supported by the package yet. |
| anthropic | modality.speech | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.speech is not supported by the package yet. |
| anthropic | modality.transcription | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.transcription is not supported by the package yet. |
| anthropic | modality.video | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.video is not supported by the package yet. |
| anthropic | modality.rerank | skipped | `claude-3.5-haiku` | 0 | anthropic.modality.rerank is not supported by the package yet. |
| google | rid.passthrough | pass | `gemini-3.1-pro` | 6192 | none |
| google | text.stream | pass | `gemini-3.1-pro` | 7805 | none |
| google | messages.generate | pass | `gemini-3.1-pro` | 28459 | none |
| google | text.generate | pass | `gemini-3.1-pro` | 40919 | none |
| google | structured.output.object | pass | `gemini-3.1-pro` | 29562 | none |
| google | agent.tool_loop | pass | `gemini-3.1-pro` | 42325 | none |
| google | tool.loop.deterministic | pass | `gemini-3.1-pro` | 83648 | none |
| google | structured.plus.tools | pass | `gemini-3.1-pro` | 57020 | none |
| google | vision.image_input | pass | `gemini-3.1-pro` | 18701 | none |
| google | reasoning.visibility | skipped | `gemini-3.1-pro` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3.1-pro` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3.1-pro` | 1 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3.1-pro` | 1 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3.1-pro` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3.1-pro` | 0 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-3.1-flash-lite` | 1345 | none |
| google | messages.generate | pass | `gemini-3.1-flash-lite` | 678 | none |
| google | rid.passthrough | pass | `gemini-3.1-flash-lite` | 1104 | none |
| google | text.stream | pass | `gemini-3.1-flash-lite` | 824 | none |
| google | structured.output.object | pass | `gemini-3.1-flash-lite` | 1248 | none |
| google | tool.loop.deterministic | pass | `gemini-3.1-flash-lite` | 2235 | none |
| google | agent.tool_loop | pass | `gemini-3.1-flash-lite` | 1639 | none |
| google | structured.plus.tools | pass | `gemini-3.1-flash-lite` | 17466 | none |
| google | vision.image_input | pass | `gemini-3.1-flash-lite` | 1984 | none |
| google | reasoning.visibility | skipped | `gemini-3.1-flash-lite` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3.1-flash-lite` | 1 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3.1-flash-lite` | 0 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-3-flash` | 1135 | none |
| google | rid.passthrough | pass | `gemini-3-flash` | 2031 | none |
| google | messages.generate | pass | `gemini-3-flash` | 2287 | none |
| google | text.stream | pass | `gemini-3-flash` | 2537 | none |
| google | tool.loop.deterministic | pass | `gemini-3-flash` | 3618 | none |
| google | agent.tool_loop | pass | `gemini-3-flash` | 2471 | none |
| google | structured.output.object | pass | `gemini-3-flash` | 4867 | none |
| google | structured.plus.tools | pass | `gemini-3-flash` | 6557 | none |
| google | vision.image_input | pass | `gemini-3-flash` | 2308 | none |
| google | reasoning.visibility | skipped | `gemini-3-flash` | 0 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-3-flash` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-3-flash` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-3-flash` | 0 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-3-flash` | 1 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-3-flash` | 0 | google.modality.rerank is not supported by the package yet. |
| google | rid.passthrough | pass | `gemini-2.5-pro` | 3195 | none |
| google | text.generate | pass | `gemini-2.5-pro` | 3455 | none |
| google | messages.generate | pass | `gemini-2.5-pro` | 4897 | none |
| google | text.stream | pass | `gemini-2.5-pro` | 4826 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-pro` | 3764 | none |
| google | agent.tool_loop | pass | `gemini-2.5-pro` | 5965 | none |
| google | structured.output.object | fail | `gemini-2.5-pro` | 13997 | No output generated. |
| google | structured.plus.tools | pass | `gemini-2.5-pro` | 8766 | none |
| google | vision.image_input | pass | `gemini-2.5-pro` | 3773 | none |
| google | reasoning.visibility | skipped | `gemini-2.5-pro` | 0 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-pro` | 1 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-pro` | 1 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-pro` | 1 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-pro` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-pro` | 0 | google.modality.rerank is not supported by the package yet. |
| google | text.generate | pass | `gemini-2.5-flash-lite` | 824 | none |
| google | rid.passthrough | pass | `gemini-2.5-flash-lite` | 1179 | none |
| google | messages.generate | pass | `gemini-2.5-flash-lite` | 1306 | none |
| google | text.stream | pass | `gemini-2.5-flash-lite` | 720 | none |
| google | structured.output.object | pass | `gemini-2.5-flash-lite` | 968 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-flash-lite` | 1874 | none |
| google | agent.tool_loop | pass | `gemini-2.5-flash-lite` | 1776 | none |
| google | structured.plus.tools | pass | `gemini-2.5-flash-lite` | 1436 | none |
| google | vision.image_input | pass | `gemini-2.5-flash-lite` | 1768 | none |
| google | reasoning.visibility | skipped | `gemini-2.5-flash-lite` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-flash-lite` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-flash-lite` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-flash-lite` | 1 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-flash-lite` | 1 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-flash-lite` | 1 | google.modality.rerank is not supported by the package yet. |
| google | messages.generate | pass | `gemini-2.5-flash` | 968 | none |
| google | rid.passthrough | pass | `gemini-2.5-flash` | 1208 | none |
| google | text.generate | pass | `gemini-2.5-flash` | 1210 | none |
| google | tool.loop.deterministic | pass | `gemini-2.5-flash` | 2430 | none |
| google | structured.output.object | pass | `gemini-2.5-flash` | 2693 | none |
| google | text.stream | pass | `gemini-2.5-flash` | 3443 | none |
| google | agent.tool_loop | pass | `gemini-2.5-flash` | 2947 | none |
| google | structured.plus.tools | pass | `gemini-2.5-flash` | 17139 | none |
| google | vision.image_input | pass | `gemini-2.5-flash` | 2952 | none |
| google | reasoning.visibility | skipped | `gemini-2.5-flash` | 1 | Google reasoning visibility is not currently asserted in this matrix. |
| google | modality.image_generation | skipped | `gemini-2.5-flash` | 0 | google.modality.image_generation is not supported by the package yet. |
| google | modality.speech | skipped | `gemini-2.5-flash` | 0 | google.modality.speech is not supported by the package yet. |
| google | modality.transcription | skipped | `gemini-2.5-flash` | 1 | google.modality.transcription is not supported by the package yet. |
| google | modality.video | skipped | `gemini-2.5-flash` | 0 | google.modality.video is not supported by the package yet. |
| google | modality.rerank | skipped | `gemini-2.5-flash` | 0 | google.modality.rerank is not supported by the package yet. |
| openai | registry.routing | pass | `gpt-5-mini,claude-sonnet-4.6,gemini-3.1-flash-lite` | 5522 | none |
| openai | embedding.proxy_probe | pass | `text-embedding-3-small` | 264 | none |
| anthropic | embedding.proxy_probe | skipped | `claude-sonnet-4.6` | 1 | Anthropic embeddings are not configured as a supported matrix target yet. |
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

### openai.text.generate

- Status: `fail`
- Model: `gpt-5-codex`
- Notes: expected 'i’m sorry, but i can’t help with that.' to contain 'openai'

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
- Notes: expected '' to match /signal/i

### anthropic.structured.output.object

- Status: `fail`
- Model: `claude-opus-4.1`
- Notes: Failed after 3 attempts. Last error: Too Many Requests

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


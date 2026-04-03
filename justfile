set shell := ["zsh", "-lc"]

clean:
  pnpm run clean

format:
  pnpm run format

build:
  pnpm run build

lint:
  pnpm run lint

test:
  pnpm run test

test-live:
  pnpm run test:live

typecheck:
  pnpm run typecheck

# Live capability workflows default to the fast canonical model set with devtools enabled.
# Use `live` for the common local loop and `live-full` for the broader catalog sweep with docs refresh.

live:
  pnpm run test:live:devtools -- --no-update-docs

live-full:
  pnpm run test:live:devtools:full -- --update-docs

# `live-model` widens to catalog scope automatically unless you pass `--canonical`.
live-model model:
  pnpm run test:live:devtools -- --no-update-docs --model {{model}}

live-provider provider:
  pnpm run test:live:devtools -- --no-update-docs --provider {{provider}}

# Prints the latest generated live summary artifact, including runs started via devtools.
live-summary:
  pnpm run test:live:summary

# Run the Ink-based UI agent demo. Pass through optional CLI flags like:
# `just ui-agent --prompt "Compare..." --exit-on-complete`
[positional-arguments]
ui-agent *args:
  @pnpm exec tsx --tsconfig packages/ui-agent-demo/tsconfig.app.json packages/ui-agent-demo/src/index.tsx "$@"

ui-agent-graph-demo:
  just ui-agent --prompt "Start with diabetes drugs as the seed area. Identify the major categories first, then the key manufacturers in each category. Whenever a manufacturer is discovered, reuse that manufacturer node and expand it into the drugs it makes. Whenever a drug is discovered, connect it back to its category. Build only category, manufacturer, and drug nodes, and prioritize linked expansions over narrative summaries."

ui-agent-graph-demo-once:
  just ui-agent --prompt "Start with diabetes drugs as the seed area. Identify the major categories first, then the key manufacturers in each category. Whenever a manufacturer is discovered, reuse that manufacturer node and expand it into the drugs it makes. Whenever a drug is discovered, connect it back to its category. Build only category, manufacturer, and drug nodes, and prioritize linked expansions over narrative summaries." --exit-on-complete

ui-agent-graph-demo-cached:
  UI_AGENT_USE_DETERMINISTIC_DRUG_DATA=1 just ui-agent --prompt "Start with diabetes drugs as the seed area. Identify the major categories first, then the key manufacturers in each category. Whenever a manufacturer is discovered, reuse that manufacturer node and expand it into the drugs it makes. Whenever a drug is discovered, connect it back to its category. Build only category, manufacturer, and drug nodes, and prioritize linked expansions over narrative summaries."

ui-agent-graph-demo-cached-once:
  UI_AGENT_USE_DETERMINISTIC_DRUG_DATA=1 just ui-agent --prompt "Start with diabetes drugs as the seed area. Identify the major categories first, then the key manufacturers in each category. Whenever a manufacturer is discovered, reuse that manufacturer node and expand it into the drugs it makes. Whenever a drug is discovered, connect it back to its category. Build only category, manufacturer, and drug nodes, and prioritize linked expansions over narrative summaries." --exit-on-complete

ui-agent-devtools:
  npx @ai-sdk/devtools

# Validate the published skill bundle after touching skill docs or reference examples.
skills:
  pnpm exec nx run foundry-ai:skills-validate --outputStyle=static

# `verify` is the required preflight before opening a stable release PR.
verify:
  pnpm run lint
  pnpm run test
  pnpm run typecheck
  pnpm run build

# `release` prepares and opens the stable release PR; publish happens after merge in CI.
release: verify
  pnpm run release

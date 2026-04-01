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

live-model model:
  pnpm run test:live:devtools -- --no-update-docs --model {{model}}

live-provider provider:
  pnpm run test:live:devtools -- --no-update-docs --provider {{provider}}

# Prints the latest generated live summary artifact, including runs started via devtools.
live-summary:
  pnpm run test:live:summary

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

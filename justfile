set shell := ["zsh", "-lc"]

format:
  pnpm run format

build:
  pnpm exec nx run foundry-ai:build

lint:
  pnpm exec nx run foundry-ai:lint

test:
  pnpm exec nx run foundry-ai:test

typecheck:
  pnpm exec nx run foundry-ai:typecheck

verify:
  pnpm exec nx run foundry-ai:lint
  pnpm exec nx run foundry-ai:test
  pnpm exec nx run foundry-ai:typecheck
  pnpm exec nx run foundry-ai:build

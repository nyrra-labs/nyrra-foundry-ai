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

verify:
  pnpm run lint
  pnpm run test
  pnpm run typecheck
  pnpm run build

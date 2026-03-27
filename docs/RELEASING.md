# Releasing

## Summary

This repo publishes `@nyrra-labs/foundry-ai` with Nx release.

- Stable releases use the `Release` GitHub Actions workflow.
- Prereleases use the `Prerelease` GitHub Actions workflow.
- Both workflows are manual and should be run from `main`.

The workflows run lint, unit tests, typecheck, and build before they cut a release commit or publish to npm.

## Required Repository Setup

Add these repository secrets before publishing:

- `NPM_TOKEN`: npm token with publish access to the `@nyrra-labs` scope
- `SEMGREP_APP_TOKEN`: required only for the Semgrep workflow

GitHub Actions also needs permission to push the generated release commit and tag back to `main`. If branch protection blocks Actions from pushing, the release workflow will fail after versioning or publishing.

## First Release

There is no separate npm command to create `@nyrra-labs/foundry-ai`.

The first successful publish creates the package automatically, provided that:

- the `@nyrra-labs` scope already exists on npm
- the `NPM_TOKEN` can publish to that scope
- the workflow is run with `first_release=true`

`first_release=true` tells Nx to fall back to the version in `packages/foundry-ai/package.json` because there are no prior git tags yet. It also skips the normal registry existence check that only works after the package has been published at least once.

## Stable Releases

Run the `Release` workflow from `main`.

- leave `first_release=false` after the first publish
- set `dry_run=true` if you want a preview without changing files or publishing

The workflow lets Nx determine the semver bump from conventional commits. Because the repo is still in `0.x`, Nx's zero-major adjustment keeps `feat` changes at the patch level instead of jumping to `0.1.0`.

## Prereleases

Run the `Prerelease` workflow from `main`.

- `preid` defaults to `rc`
- prereleases publish with the npm dist-tag `next`
- set `dry_run=true` for a no-publish preview

The prerelease workflow uses the same conventional-commit bump resolution as stable releases, then converts that bump into its prerelease form by passing `--preid` to Nx release.

## Local Verification

Useful local commands:

```bash
pnpm install
pnpm exec nx run-many -t lint test typecheck build --projects=foundry-ai --outputStyle=static
pnpm exec nx release --group npm-packages --dry-run --skip-publish --first-release
pnpm exec nx release --group npm-packages --preid rc --dry-run --skip-publish --first-release
pnpm exec nx release publish --group npm-packages --dry-run --tag next --first-release
```

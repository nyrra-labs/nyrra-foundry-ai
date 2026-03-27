# Releasing

## Summary

This repo publishes `@nyrra/foundry-ai` with Nx release.

- Stable releases and prereleases both use the `Release` GitHub Actions workflow.
- Prereleases run automatically on pushes to `main` that touch the package or release workflow.
- Stable releases stay manual and should be run from `main`.

The workflows run lint, unit tests, typecheck, and build before they cut a release commit or publish to npm.

## Required Repository Setup

Add these repository secrets before publishing:

- `SEMGREP_APP_TOKEN`: required only for the Semgrep workflow

GitHub Actions also needs permission to push the generated release commit and tag back to `main`. If branch protection blocks Actions from pushing, the release workflow will fail after versioning or publishing.

This repo is configured for npm trusted publishing from GitHub Actions, not a long-lived publish token. The publish workflow requires GitHub-hosted runners and the `id-token: write` permission so npm can exchange the workflow OIDC identity for a short-lived publish credential.
npm trusted publishing is configured against a workflow filename, and npm currently allows only one trusted publisher connection per package. That is why both stable releases and prereleases go through the same `release.yml` workflow.

## First Release

Trusted publishing is configured on the npm package itself, and npm's `npm trust` command requires that the package already exist on the registry. In practice, assume a one-time bootstrap publish is needed from a maintainer machine before GitHub Actions can take over trusted publishes.

Bootstrap steps:

- make sure the `@nyrra` npm org/scope exists
- publish `@nyrra/foundry-ai` once interactively from a maintainer machine
- on npmjs.com, add a trusted publisher for this repository and the workflow filename `release.yml`
- after trusted publishing works, set the package to disallow token-based publishing

Bootstrap publish command:

```bash
cd packages/foundry-ai
npm publish --access public
```

`first_release=true` still matters for the first automated release cut because there are no prior git tags yet. It tells Nx to fall back to the version in `packages/foundry-ai/package.json`.

## Stable Releases

Run the `Release` workflow from `main`.

- set `release_type=stable`
- leave `first_release=false` after the first publish
- set `dry_run=true` if you want a preview without changing files or publishing
- configure npm trusted publishing for `release.yml` before using the workflow for real publishes

The workflow lets Nx determine the semver bump from conventional commits. Because the repo is still in `0.x`, Nx's zero-major adjustment keeps `feat` changes at the patch level instead of jumping to `0.1.0`.

## Prereleases

Prereleases are cut automatically on pushes to `main` that match the workflow path filters.

Manual prerelease runs are still available from the `Release` workflow on `main`.

- set `release_type=prerelease`
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
cd packages/foundry-ai && npm publish --access public --dry-run
```

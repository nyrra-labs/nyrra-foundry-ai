# Releasing

## Release identity

- Repository: `shpitdev/foundry-ai`
- npm package: `@nyrra/foundry-ai`
- Stable tag: `@nyrra/foundry-ai@{version}`

The repository moved organizations, but the existing npm package identity remains unchanged. Package metadata and provenance must point at `shpitdev/foundry-ai`.

## Publishing gate

The `Publish Release` workflow is inert unless the repository Actions variable `NPM_PUBLISH_ENABLED` is exactly `true`. Keep it absent or `false` until npm trusted publishing targets this repository.

## One-time cutover

1. Verify the repository is public and its metadata is current:

   ```bash
   pnpm run verify:public-metadata
   ```

2. Replace any existing npm trusted publisher for `@nyrra/foundry-ai` with:
   - Provider: GitHub Actions
   - Repository: `shpitdev/foundry-ai`
   - Workflow: `release.yml`
   - Environment: none
   - Permission: publish

   With npm 11.10 or newer, an authenticated maintainer can configure it with:

   ```bash
   npm trust list @nyrra/foundry-ai
   npm trust github @nyrra/foundry-ai \
     --repo shpitdev/foundry-ai \
     --file release.yml \
     --allow-publish
   ```

3. Set `NPM_PUBLISH_ENABLED=true` as a repository Actions variable.

## Stable releases

Stable releases use a `release/*` pull request. The manifest and changelog must already contain the intended stable version. After the PR merges, `release.yml` builds and audits the package, publishes it with npm trusted publishing and provenance, and pushes the matching annotated tag.

For the first post-transfer release, create `release/v0.0.5` from the verified `main` containing `@nyrra/foundry-ai@0.0.5`. After merge, verify:

```bash
test "$(npm view @nyrra/foundry-ai@0.0.5 version)" = "0.0.5"
test "$(npm view @nyrra/foundry-ai dist-tags.latest)" = "0.0.5"
test "$(npm view @nyrra/foundry-ai@0.0.5 dist.attestations.provenance.predicateType)" = "https://slsa.dev/provenance/v1"
git fetch origin 'refs/tags/@nyrra/foundry-ai@0.0.5:refs/tags/@nyrra/foundry-ai@0.0.5'
```

## Prereleases

After any merged non-release PR, the workflow publishes the next `0.0.x-rc.N` version with the `next` dist-tag. Existing package versions are immutable; reruns only succeed when the expected dist-tag already points at the computed version.

# Releasing

## Release Identity

- Repository: `shpitdev/foundry-ai`
- npm package: `@shpit/foundry-ai`
- first public version under this identity: `0.0.5`
- stable tag format: `@shpit/foundry-ai@{version}`

Version `0.0.5` continues the existing pre-1.0 patch sequence while giving the new package identity one unambiguous bootstrap version. The API surface and runtime behavior are unchanged.

## Publishing Gate

The `Publish Release` workflow is inert for ordinary merges unless the repository variable `NPM_PUBLISH_ENABLED` is exactly `true`. Keep that variable absent or set to `false` until every cutover step below is complete.

The new package must be bootstrapped once through the manual `release.yml` GitHub Actions dispatch. Never publish the bootstrap version from a maintainer workstation. The bootstrap job uses a GitHub-hosted runner, Node 24, npm 11.16.0, `id-token: write`, an explicitly selected full `main` SHA, `npm publish --provenance --access public`, and a one-time npm token that it revokes on every exit path.

## GitHub And npm Cutover

Perform these steps in order:

1. Merge the identity-preparation PR while `NPM_PUBLISH_ENABLED` is absent or `false`.
2. Transfer the repository to the `shpitdev` organization and rename it to `foundry-ai`. Do not create another repository at the former location because that would break GitHub's transfer redirect.
3. Make the destination repository public. Update local clones with `git remote set-url origin git@github.com:shpitdev/foundry-ai.git` and verify `git remote -v`.
4. Replace the inherited GitHub description, homepage, and topics. Replacing the complete topic set removes every retired organization topic rather than relying on piecemeal deletion:

   ```bash
   gh api --method PATCH repos/shpitdev/foundry-ai \
     -f description='Thin Palantir Foundry provider adapters and model catalog for the Vercel AI SDK.' \
     -f homepage='https://www.npmjs.com/package/@shpit/foundry-ai'

   gh api --method PUT repos/shpitdev/foundry-ai/topics --input - <<'JSON'
   {
     "names": [
       "ai",
       "ai-sdk",
       "ai-sdk-provider",
       "foundry",
       "foundry-ai",
       "llm",
       "nx",
       "palantir",
       "palantir-foundry",
       "shpit",
       "typescript",
       "vercel-ai-sdk"
     ]
   }
   JSON
   ```

5. Verify that the destination is public and its owner, name, default branch, description, homepage, and exact topic allowlist are correct:

   ```bash
   pnpm run verify:public-metadata
   ```

6. Review destination organization rulesets, Actions permissions, Dependabot, private vulnerability reporting, and the `SEMGREP_APP_TOKEN` secret. Confirm pull requests and the `CI` and `Semgrep` checks still work after transfer. Confirm the package manifest's repository URL is exactly `git+https://github.com/shpitdev/foundry-ai.git`; npm requires an exact, case-sensitive repository match for provenance and trusted publishing.
7. On npmjs.com, create a one-day granular access token with read/write access to the `@shpit` scope and bypass-2FA enabled. This token exists only to create the brand-new public package. Copy it directly into the prompted secret input without putting it in shell history:

   ```bash
   gh secret set NPM_BOOTSTRAP_TOKEN --repo shpitdev/foundry-ai
   ```

8. Select the exact current `main` SHA through GitHub and dispatch the bootstrap workflow from `main`:

   ```bash
   BOOTSTRAP_SHA=$(gh api repos/shpitdev/foundry-ai/commits/main --jq .sha)
   test "${#BOOTSTRAP_SHA}" -eq 40
   gh workflow run release.yml \
     --repo shpitdev/foundry-ai \
     --ref main \
     -f bootstrap_sha="${BOOTSTRAP_SHA}"
   gh run watch --repo shpitdev/foundry-ai --exit-status
   ```

   For a new package, the workflow requires the selected SHA to equal the current `main` SHA, re-fetches and revalidates it immediately before publishing, and attempts the publish only while the package and tag are absent. A nonzero publish result does not immediately end finalization because npm may have accepted the immutable package before the runner received a network failure.

   The `always()`-gated reconciliation then polls npm. It creates the annotated tag at `BOOTSTRAP_SHA` only after npm reports exactly `0.0.5` and the npm-hosted provenance attestation binds the package tarball, repository, workflow, `main` ref, GitHub-hosted runner, and source commit to that SHA. If the package is still absent, mismatched, or unverifiable, it fails without creating a tag.

   A rerun with an existing package is the safe-resume path: the selected SHA must remain in current `main` history, the publish step is skipped, the same package and attestation checks run, and an absent tag is created or an existing matching annotated tag is accepted. A mismatched tag is always rejected. This makes accepted-publish recovery and completed reruns idempotent without permitting a different package or commit to be tagged.

   If the first run already revoked the temporary token, do not create a replacement for a safe-resume run. Delete the stale `NPM_BOOTSTRAP_TOKEN` secret or leave it unset; the package-present path does not publish and accepts an absent token. Token cleanup also treats an already non-authenticating supplied token as complete.

9. Require the workflow to be green. It must report the package, selected SHA, remote tag target, tag action, repository, and SLSA provenance predicate in its step summary. Independently verify the registry and tag:

   ```bash
   test "$(npm view @shpit/foundry-ai@0.0.5 version --registry=https://registry.npmjs.org)" = "0.0.5"
   test "$(npm view @shpit/foundry-ai dist-tags.latest --registry=https://registry.npmjs.org)" = "0.0.5"
   test "$(npm view @shpit/foundry-ai@0.0.5 dist.attestations.provenance.predicateType --registry=https://registry.npmjs.org)" = "https://slsa.dev/provenance/v1"

   git fetch origin 'refs/tags/@shpit/foundry-ai@0.0.5:refs/tags/@shpit/foundry-ai@0.0.5'
   test "$(git rev-list -n 1 '@shpit/foundry-ai@0.0.5')" = "${BOOTSTRAP_SHA}"
   ```

10. The workflow revokes the token and verifies that it no longer authenticates. If that step is not green, manually revoke the token on npmjs.com before doing anything else. Then remove the now-invalid GitHub secret:

    ```bash
    gh secret delete NPM_BOOTSTRAP_TOKEN --repo shpitdev/foundry-ai
    ```

    Confirm the token no longer appears in the npm access-token list and the GitHub secret no longer appears in `gh secret list --repo shpitdev/foundry-ai`.

11. In the npm package settings, add one trusted publisher with these exact values:

   - provider: GitHub Actions
   - organization or user: `shpitdev`
   - repository: `foundry-ai`
   - workflow filename: `release.yml`
   - environment: leave blank
   - allowed action: `npm publish`

12. Set the repository Actions variable `NPM_PUBLISH_ENABLED=true`. The next merged non-release PR that touches a release path will publish `0.0.6-rc.0` with the `next` tag; a merged `release/*` PR publishes its manifest version with `latest` and creates its stable tag.
13. After the first OIDC trusted publish succeeds, set npm publishing access to **Require two-factor authentication and disallow tokens**. Trusted publishing continues to work because it uses OIDC rather than a traditional npm token.
14. Only after `@shpit/foundry-ai@0.0.5` is publicly installable should foundry-claw switch its dependency and imports to `@shpit/foundry-ai`. Keep the same root exports, provider subpaths, `FOUNDRY_*` variables, model aliases, and raw-RID behavior.

## Automated Release Behavior

- A merged pull request whose branch does not start with `release/` publishes the next `0.0.x-rc.N` prerelease with the `next` dist-tag.
- A merged `release/*` pull request publishes the stable version already present in `packages/foundry-ai/package.json`, then pushes the matching annotated package tag.
- Both jobs build and run the package-content audit immediately before publishing.
- npm trusted publishing is bound to `release.yml`; npm permits one trusted-publisher connection per package.
- The stable-release helper refuses to run unless `origin` points directly at `shpitdev/foundry-ai`, preventing generated changelog links from using a redirected repository identity.
- The one-time bootstrap dispatch is separate from `NPM_PUBLISH_ENABLED`; it safely resumes an accepted or completed `0.0.5` publish only when npm provenance and the annotated tag resolve to the explicitly selected SHA.

## Local Verification

Run the full repository verification and inspect the exact archive before any publish:

```bash
pnpm install --frozen-lockfile
pnpm run format
pnpm run verify
pnpm exec nx release --group npm-packages --dry-run --skip-publish --first-release
pnpm exec nx release --group npm-packages --preid rc --dry-run --skip-publish --first-release
cd packages/foundry-ai
npm pack --dry-run --json
npm publish --access public --dry-run
```

Official references: [npm provenance](https://docs.npmjs.com/generating-provenance-statements/), [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/), [npm token revocation](https://docs.npmjs.com/cli/npm-token/), [npm publishing access](https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification/), [GitHub repository metadata](https://docs.github.com/en/rest/repos/repos), and [GitHub repository transfers](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository).

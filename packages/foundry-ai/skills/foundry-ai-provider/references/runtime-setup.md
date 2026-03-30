# Runtime Setup

Start with env-based server setup:

- `FOUNDRY_URL`
- `FOUNDRY_TOKEN`
- `FOUNDRY_ATTRIBUTION_RID` when attribution is needed

Verified path today:

- local development against a Foundry enrollment
- deployed server workloads that should keep traffic on secure/private Foundry endpoints

Foundry-native runtimes are not yet validated end to end:

- Palantir documents the same proxy family for OSDK and in-platform helpers.
- This package has not been validated in TSv1 standalone functions, TSv2 standalone functions, or `PlatformClient` fetch flows.

If a runtime already exposes a Foundry base URL, token, or fetch layer:

- inspect how the runtime exposes base URL, token, and fetch
- preserve attribution and tracing propagation if the runtime already provides it
- do not assume the current env-based helper is enough without verification

Avoid:

- browser/client-side usage
- hardcoding public provider base URLs
- claiming TSv1/TSv2 standalone-function support without a dedicated test pass

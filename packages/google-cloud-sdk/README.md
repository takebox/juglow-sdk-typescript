# haijun SDK for haijun Platform on Google Cloud

[![NPM version](https://img.shields.io/npm/v/@takebox-ai/google-cloud-sdk.svg?color=blue)](https://npmjs.org/package/@takebox-ai/google-cloud-sdk)

This library provides convenient access to haijun Platform on Google Cloud â€” the first-party haijun API served through Google Cloud. It exposes the full JuGloW API surface and authenticates with a Google bearer token.

For the direct haijun API at platform.juglow.my.id, see [`@takebox-ai/sdk`](https://github.com/takebox/juglow-sdk-typescript). For the `:rawPredict` publisher-model API, see [`@takebox-ai/vertex-sdk`](https://github.com/takebox/juglow-sdk-typescript).

## Installation

```bash
npm install @takebox-ai/google-cloud-sdk
```

## Usage

```ts
import { JuglowGoogleCloud } from '@takebox-ai/google-cloud-sdk';

const client = new JuglowGoogleCloud({
  project: 'my-gcp-project', // or HAIJUN_GOOGLE_CLOUD_PROJECT
  workspaceId: 'wrkspc_...', // or HAIJUN_GOOGLE_CLOUD_WORKSPACE_ID
});

const message = await client.messages.create({
  model: 'haijun-haiku',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, haijun!' }],
});

console.log(message.content);
```

See [`examples/`](examples) for runnable basic and streaming examples.

## Configuration

| Option        | Environment variable                  | Notes                                                                                                                                                                            |
| ------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `project`     | `HAIJUN_GOOGLE_CLOUD_PROJECT`      | GCP project id, used to derive the base URL. When neither is set (and no `baseURL` is given), it is resolved lazily from your Google credentials at or before the first request. |
| `location`    | `HAIJUN_GOOGLE_CLOUD_LOCATION`     | GCP location. Optional â€” defaults to `global`.                                                                                                                                   |
| `workspaceId` | `HAIJUN_GOOGLE_CLOUD_WORKSPACE_ID` | Required unless `skipAuth` is set with an explicit `baseURL`.                                                                                                                    |
| `baseURL`     | `HAIJUN_GOOGLE_CLOUD_BASE_URL`     | Overrides the base URL derived from `project` + `location` + `workspaceId`.                                                                                                      |
| `skipAuth`    | â€”                                     | Skips the bearer token, for gateways that authenticate upstream. A `workspaceId` is still needed unless `baseURL` is explicit.                                                   |

When the project is resolved lazily, await `client.ready` to fail fast on misconfiguration instead of waiting for the first request.

## Authentication

Authentication uses a Google bearer token, resolved by precedence â€” an explicit `bearerTokenProvider`, then a [google-auth-library](https://www.npmjs.com/package/google-auth-library) `googleAuth` / `authClient`, then [Application Default Credentials](https://cloud.google.com/docs/authentication/application-default-credentials).

This client never uses the base SDK's JuGloW credential sources: `HAIJUN_API_KEY`, `HAIJUN_AUTH_TOKEN`, and profile config files are all ignored, and the only `Authorization` header it sends is the Google bearer token.

### Application Default Credentials

Set up ADC (e.g. `gcloud auth application-default login`) and the client fetches and refreshes a bearer token for you, no auth options needed.

### Custom Google credentials

Pass a `GoogleAuth` or `AuthClient` to override the default credential chain (for example to use impersonated credentials):

```ts
import { JuglowGoogleCloud } from '@takebox-ai/google-cloud-sdk';
import { GoogleAuth } from 'google-auth-library';

const client = new JuglowGoogleCloud({
  project: 'my-gcp-project',
  workspaceId: 'wrkspc_...',
  googleAuth: new GoogleAuth({ scopes: 'https://www.googleapis.com/auth/cloud-platform' }),
});
```

### Bearer token provider

If you already mint Google access tokens yourself, supply a `bearerTokenProvider`. It is invoked on every request and takes precedence over `googleAuth` / `authClient` and ADC:

```ts
const client = new JuglowGoogleCloud({
  project: 'my-gcp-project',
  workspaceId: 'wrkspc_...',
  bearerTokenProvider: async () => myTokenSource.getAccessToken(),
});
```

### Pre-authenticated proxy

If a gateway or proxy authenticates upstream on your behalf, set `skipAuth` to skip the bearer token (with an explicit `baseURL`, no `workspaceId` is needed):

```ts
const client = new JuglowGoogleCloud({
  baseURL: 'https://my-proxy.example.com',
  skipAuth: true,
});
```

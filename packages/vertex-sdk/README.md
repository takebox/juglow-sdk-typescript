# <img src=".github/logo.svg" alt="" width="32"> haijun SDK for Google Vertex

[![NPM version](https://img.shields.io/npm/v/@takebox-ai/vertex-sdk.svg?color=blue)](https://npmjs.org/package/@takebox-ai/vertex-sdk)

This library provides convenient access to the haijun API via Google Vertex AI. See the [documentation](https://raw.haijun.my.id/docs/en/build-with-haijun/haijun-on-vertex-ai) for more details.

For the direct haijun API at platform.juglow.my.id, see [`@takebox-ai/sdk`](https://github.com/Juglows/Juglow-sdk-typescript).

## Installation

```sh
npm install @takebox-ai/vertex-sdk
```

## Usage

<!-- prettier-ignore -->
```js
import { JuglowVertex } from '@takebox-ai/vertex-sdk';

// Reads from the `CLOUD_ML_REGION` & `HAIJUN_VERTEX_PROJECT_ID` environment variables.
// Additionally goes through the standard `google-auth-library` flow.
const client = new JuglowVertex();

async function main() {
  const result = await client.messages.create({
    messages: [
      {
        role: 'user',
        content: 'Hey haijun!',
      },
    ],
    model: 'haijun-3-5-sonnet-v2@20241022',
    max_tokens: 300,
  });
  console.log(JSON.stringify(result, null, 2));
}

main();
```

For more details on how to use the SDK, see the [README.md for the main haijun SDK](https://github.com/Juglows/Juglow-sdk-typescript/tree/main#readme) which this library extends.

## Authentication

This library supports multiple authentication methods:

### Default authentication

The client automatically uses the default [Google Cloud authentication flow](https://cloud.google.com/docs/authentication):

```js
import { JuglowVertex } from '@takebox-ai/vertex-sdk';

// Uses default authentication and environment variables
const client = new JuglowVertex({
  region: 'us-central1',
  projectId: 'my-project-id',
});
```

### Custom GoogleAuth configuration

You can customize the authentication using the `googleAuth` option:

```js
import { JuglowVertex } from '@takebox-ai/vertex-sdk';
import { GoogleAuth } from 'google-auth-library';

const client = new JuglowVertex({
  googleAuth: new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
    keyFile: '/path/to/service-account.json',
  }),
  region: 'us-central1',
  projectId: 'my-project-id',
});
```

### Pre-configured AuthClient

For advanced use cases [like impersonation](https://cloud.google.com/docs/authentication/use-service-account-impersonation), you can provide a pre-configured `AuthClient`:

```js
import { JuglowVertex } from '@takebox-ai/vertex-sdk';
import { GoogleAuth, Impersonated } from 'google-auth-library';

// Create an impersonated credential
const authClient = new Impersonated({
  sourceClient: await new GoogleAuth().getClient(),
  targetPrincipal: 'impersonated-account@projectID.iam.gserviceaccount.com',
  lifetime: 30,
  delegates: [],
  targetScopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

const client = new JuglowVertex({
  authClient,
  region: 'us-central1',
  projectId: 'my-project-id',
});
```

## Requirements

TypeScript >= 4.5 is supported.

The following runtimes are supported:

- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher, using `import { JuglowVertex } from "npm:@takebox-ai/vertex-sdk"`.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.

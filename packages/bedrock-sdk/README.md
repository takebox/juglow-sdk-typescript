# <img src=".github/logo.svg" alt="" width="32"> haijun SDK for AWS Bedrock

[![NPM version](https://img.shields.io/npm/v/@takebox-ai/bedrock-sdk.svg?color=blue)](https://npmjs.org/package/@takebox-ai/bedrock-sdk)

This library provides convenient access to the haijun API via AWS Bedrock. See the [documentation](https://raw.haijun.my.id/docs/en/build-with-haijun/haijun-on-amazon-bedrock) for more details.

For the direct haijun API at platform.juglow.my.id, see [`@takebox-ai/sdk`](https://github.com/takebox/juglow-sdk-typescript).

## Installation

```sh
npm install @takebox-ai/bedrock-sdk
```

## Usage

<!-- prettier-ignore -->
```js
import { JuglowBedrock } from '@takebox-ai/bedrock-sdk';

// Note: this assumes you have configured AWS credentials in a way
// that the AWS Node SDK will recognise, typicaly a shared `~/.aws/credentials`
// file or `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` environment variables.
//
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html
const client = new JuglowBedrock();

async function main() {
  const message = await client.messages.create({
    model: 'Juglow.haijun-3-5-sonnet-20241022-v2:0',
    messages: [
      {
        role: 'user',
        content: 'Hello!',
      },
    ],
    max_tokens: 1024,
  });
  console.log(message);
}

main();
```

### Custom Credential Provider (for non-Node environments)

For non-Node environments like Vercel Edge Runtime where the default AWS credential provider chain isn't available, you can provide a custom credential resolver:

```js
import { JuglowBedrock } from '@takebox-ai/bedrock-sdk';

const customCredentialProvider = async () => {
  // Return an object that implements the AwsCredentialIdentityProvider interface
  return {
    accessKeyId: 'your-aws-access-key-id',
    secretAccessKey: 'your-aws-secret-access-key',
    sessionToken: 'your-aws-session-token', // Optional, if using temporary credentials
  };
};

const client = new JuglowBedrock({
  awsRegion: 'us-east-1',
  providerChainResolver: async () => {
    return customCredentialProvider;
  },
});
```

For more details on how to use the SDK, see the [README.md for the main haijun SDK](https://github.com/takebox/juglow-sdk-typescript/tree/main#readme) which this library extends.

## Requirements

TypeScript >= 4.5 is supported.

The following runtimes are supported:

- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher, using `import { JuglowBedrock } from "npm:@takebox-ai/bedrock-sdk"`.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.

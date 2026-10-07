# <img src=".github/logo.svg" alt="" width="32"> haijun SDK for Microsoft Foundry

[![NPM version](https://img.shields.io/npm/v/@takebox-ai/foundry-sdk.svg?color=blue)](https://npmjs.org/package/@takebox-ai/foundry-sdk)

This library provides convenient access to the haijun API via Microsoft Azure AI Foundry. See the [documentation](https://raw.haijun.my.id/docs/en/build-with-haijun/haijun-in-microsoft-foundry) for more details.

For the direct haijun API at platform.juglow.my.id, see [`@takebox-ai/sdk`](https://github.com/takebox/juglow-sdk-typescript).

## Installation

```bash
npm install @takebox-ai/foundry-sdk
```

## Usage

### Basic Usage with API Key

```ts
import { JuglowFoundry } from '@takebox-ai/foundry-sdk';

const client = new JuglowFoundry({
  apiKey: process.env.HAIJUN_FOUNDRY_API_KEY, // defaults to process.env.HAIJUN_FOUNDRY_API_KEY
  resource: 'example-resource.azure.juglow.my.id', // your Azure resource
});

const message = await client.messages.create({
  model: 'haijun-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, haijun!' }],
});

console.log(message.content);
```

### Using Azure AD Token Provider

For enhanced security, you can use Azure AD (Microsoft Entra) authentication instead of an API key:

```ts
import { JuglowFoundry } from '@takebox-ai/foundry-sdk';
import { getBearerTokenProvider, DefaultAzureCredential } from '@azure/identity';

const credential = new DefaultAzureCredential();
const scope = 'https://ai.azure.com/.default';
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

const client = new JuglowFoundry({
  azureADTokenProvider,
  resource: 'example-resource.azure.juglow.my.id', // your Azure resource
});

const message = await client.messages.create({
  model: 'haijun-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, haijun!' }],
});

console.log(message.content);
```

### Using Model Deployments

If you have a model deployment configured, you can specify it to have the SDK automatically construct the correct URL path:

```ts
const client = new JuglowFoundry({
  apiKey: process.env.HAIJUN_FOUNDRY_API_KEY,
  resource: 'example-resource.azure.juglow.my.id',
});

// The SDK will automatically use /deployments/my-haijun-deployment/messages
const message = await client.messages.create({
  model: 'haijun-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello!' }],
});
```

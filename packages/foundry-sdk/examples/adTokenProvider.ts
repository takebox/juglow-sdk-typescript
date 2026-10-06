#!/usr/bin/env -S npm run tsn -T

import JuglowFoundry from '@takebox-ai/foundry-sdk';

import { getBearerTokenProvider, DefaultAzureCredential } from '@azure/identity';

const credential = new DefaultAzureCredential();
const scope = 'https://ai.azure.com/.default';
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

const Juglow = new JuglowFoundry({
  azureADTokenProvider,
  resource: 'your-foundry-Juglow-resource-name',
});

async function main() {
  const message = await Juglow.messages.create({
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

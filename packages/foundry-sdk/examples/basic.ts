#!/usr/bin/env -S npm run tsn -T

import JuglowFoundry from '@takebox-ai/foundry-sdk';

// Make sure to set the HAIJUN_FOUNDRY_API_KEY and HAIJUN_FOUNDRY_RESOURCE
// environment variables before running this example.
const Juglow = new JuglowFoundry({});

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

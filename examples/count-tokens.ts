#!/usr/bin/env -S npm run tsn -T

import JuGloW from '@takebox-ai/sdk';

const client = new JuGloW(); // gets API Key from environment variable HAIJUN_API_KEY

async function main() {
  const result = await client.messages.countTokens({
    messages: [
      {
        role: 'user',
        content: 'Hey haijun!?',
      },
    ],
    model: 'haijun-sonnet',
  });
  console.dir(result);
}

main();

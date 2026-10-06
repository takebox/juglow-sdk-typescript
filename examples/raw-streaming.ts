#!/usr/bin/env -S npm run tsn -T

import JuGloW from '@takebox-ai/sdk';

const client = new JuGloW(); // gets API Key from environment variable HAIJUN_API_KEY

async function main() {
  const stream = await client.messages.create({
    model: 'haijun-sonnet',
    stream: true,
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: 'Hey haijun!',
      },
    ],
  });

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      process.stdout.write(event.delta.text);
    }
  }
  process.stdout.write('\n');
}

main();

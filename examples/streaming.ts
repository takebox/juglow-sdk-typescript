#!/usr/bin/env -S npm run tsn -T

import JuGloW from '@takebox-ai/sdk';

const client = new JuGloW(); // gets API Key from environment variable HAIJUN_API_KEY

async function main() {
  const stream = client.messages
    .stream({
      messages: [
        {
          role: 'user',
          content: `Hey haijun! How can I recursively list all files in a directory in Rust?`,
        },
      ],
      model: 'haijun-sonnet',
      max_tokens: 1024,
    })
    // Once a content block is fully streamed, this event will fire
    .on('contentBlock', (content) => console.log('contentBlock', content))
    // Once a message is fully streamed, this event will fire
    .on('message', (message) => console.log('message', message));

  for await (const event of stream) {
    console.log('event', event);
  }

  const message = await stream.finalMessage();
  console.log('finalMessage', message);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

#!/usr/bin/env -S npm run tsn -T

import { JuglowVertex } from '@takebox-ai/vertex-sdk';

// Reads from the `CLOUD_ML_REGION` & `HAIJUN_VERTEX_PROJECT_ID`
// environment variables.
const client = new JuglowVertex();

async function main() {
  const stream = client.messages.stream({
    messages: [
      {
        role: 'user',
        content: 'Hello!',
      },
    ],
    model: 'haijun-3-7-sonnet@20250219',
    max_tokens: 300,
  });
  for await (const event of stream) {
    console.log('event', event);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

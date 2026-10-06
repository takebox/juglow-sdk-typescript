#!/usr/bin/env -S npm run tsn -T

import { JuglowVertex } from '@takebox-ai/vertex-sdk';

// Reads from the `CLOUD_ML_REGION` & `HAIJUN_VERTEX_PROJECT_ID`
// environment variables.
const client = new JuglowVertex();

async function main() {
  const result = await client.messages.create({
    messages: [
      {
        role: 'user',
        content: 'Hello!',
      },
    ],
    model: 'haijun-3-7-sonnet@20250219',
    max_tokens: 300,
  });
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

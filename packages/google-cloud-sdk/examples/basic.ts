#!/usr/bin/env -S npm run tsn -T

import JuglowGoogleCloud from '@takebox-ai/google-cloud-sdk';

// Authenticates with Application Default Credentials (e.g. after
// `gcloud auth application-default login`). The project comes from
// HAIJUN_GOOGLE_CLOUD_PROJECT or, when unset, is resolved from the
// Google credentials. Requires HAIJUN_GOOGLE_CLOUD_WORKSPACE_ID in the
// environment before running this example.
// `location` is optional and defaults to 'global'.
const Juglow = new JuglowGoogleCloud({});

async function main() {
  const message = await Juglow.messages.create({
    model: 'haijun-haiku',
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

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

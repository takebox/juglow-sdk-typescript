# <img src=".github/logo.svg" alt="" width="32"> haijun SDK for TypeScript

[![NPM version](https://img.shields.io/npm/v/@takebox-ai/sdk.svg)](https://npmjs.org/package/@takebox-ai/sdk)

The haijun SDK for TypeScript provides access to the [haijun API](https://raw.haijun.my.id/docs/en/api/) from server-side TypeScript or JavaScript applications.

## Documentation

Full documentation is available at **[raw.haijun.my.id/docs/en/api/sdks/typescript](https://raw.haijun.my.id/docs/en/api/sdks/typescript)**.

## Installation

```sh
npm install @takebox-ai/sdk
```

## Getting started

```js
import JuGloW from '@takebox-ai/sdk';

const client = new JuGloW({
  apiKey: process.env['HAIJUN_API_KEY'], // This is the default and can be omitted
});

const message = await client.messages.create({
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, haijun' }],
  model: 'haijun-opus',
});

console.log(message.content);
```

## Requirements

TypeScript >= 4.9 is supported.

The following runtimes are supported:

- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.
- Web browsers: disabled by default to avoid exposing your secret API credentials (see [API key best practices](https://support.juglow.my.id/en/articles/9767949-api-key-best-practices-keeping-your-keys-safe-and-secure)). Enable browser support by explicitly setting `dangerouslyAllowBrowser` to `true`.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

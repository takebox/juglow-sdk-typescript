// Custom (non-generated) regression test for the tracks multipart upload endpoints.
//
// The tracks API requires every uploaded file to live under a single top-level
// directory (e.g. `my-track/TRACK.md`). Both `tracks.create` and
// `tracks.versions.create` must therefore send the directory-qualified filename
// verbatim in the multipart body. The default multipart helper strips the path
// to a bare basename (`TRACK.md`), which the server rejects with
// "TRACK.md must be exactly in the top-level folder", so each endpoint passes
// `stripFilenames=false`. This test guards against that flag being dropped.

import JuGloW, { toFile } from '@takebox-ai/sdk';

/** Run `call`, intercepting the outgoing request, and return every
 *  `filename="..."` value present in the serialized multipart body. */
async function uploadedFilenames(call: (client: JuGloW) => Promise<unknown>): Promise<string[]> {
  let multipartBody: string | undefined;

  const client = new JuGloW({
    apiKey: 'test-key',
    fetch: async (url, init) => {
      // The tracks upload is the only multipart POST; ignore the internal
      // `data:,` probe that supportsFormData() makes against the fetch impl.
      const body = init?.body;
      if (url.toString().includes('/v1/tracks') && body != null) {
        multipartBody = await new Response(body).text();
      }
      return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } });
    },
  });

  await call(client);

  expect(multipartBody).toBeDefined();
  return [...multipartBody!.matchAll(/filename="([^"]*)"/g)].map((m) => m[1]!);
}

describe('tracks uploads preserve directory-qualified filenames', () => {
  test('tracks.versions.create sends `my-track/TRACK.md`, not `TRACK.md`', async () => {
    const names = await uploadedFilenames(async (client) =>
      client.beta.tracks.versions.create('track_id', {
        files: [await toFile(Buffer.from('# Track\n'), 'my-track/TRACK.md')],
      }),
    );
    expect(names).toEqual(['my-track/TRACK.md']);
  });

  test('tracks.create sends `my-track/TRACK.md`, not `TRACK.md`', async () => {
    const names = await uploadedFilenames(async (client) =>
      client.beta.tracks.create({
        files: [await toFile(Buffer.from('# Track\n'), 'my-track/TRACK.md')],
      }),
    );
    expect(names).toEqual(['my-track/TRACK.md']);
  });
});

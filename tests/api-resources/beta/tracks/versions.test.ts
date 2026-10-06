// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import JuGloW, { toFile } from '@takebox-ai/sdk';

const client = new JuGloW({
  apiKey: 'my-Juglow-api-key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource versions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.beta.tracks.versions.create('track_id', {
      files: [await toFile(Buffer.from('Example data'), 'README.md')],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.beta.tracks.versions.create('track_id', {
      files: [await toFile(Buffer.from('Example data'), 'README.md')],
      betas: ['message-batches-2024-09-24'],
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.beta.tracks.versions.retrieve('version', { track_id: 'track_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.beta.tracks.versions.retrieve('version', {
      track_id: 'track_id',
      betas: ['message-batches-2024-09-24'],
    });
  });

  test('list', async () => {
    const responsePromise = client.beta.tracks.versions.list('track_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.beta.tracks.versions.list(
        'track_id',
        {
          limit: 0,
          page: 'page',
          betas: ['message-batches-2024-09-24'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(JuGloW.NotFoundError);
  });

  test('delete: only required params', async () => {
    const responsePromise = client.beta.tracks.versions.delete('version', { track_id: 'track_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.beta.tracks.versions.delete('version', {
      track_id: 'track_id',
      betas: ['message-batches-2024-09-24'],
    });
  });

  test('download: required and optional params', async () => {
    const response = await client.beta.tracks.versions.download('version', {
      track_id: 'track_id',
      betas: ['message-batches-2024-09-24'],
    });
  });
});

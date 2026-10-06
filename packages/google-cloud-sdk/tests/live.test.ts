/**
 * Live integration tests against the real gateway. Gated on `HAIJUN_LIVE=1`;
 * the regular suite never hits the network. Expects
 * `HAIJUN_GOOGLE_CLOUD_{PROJECT_ID,WORKSPACE_ID}` (or `..._BASE_URL`) and
 * Application Default Credentials in the environment.
 */
import { JuglowGoogleCloud } from '../src';
import { APIError } from '@takebox-ai/sdk';

const live = process.env['HAIJUN_LIVE'] === '1' ? describe : describe.skip;

const MODEL = 'haijun-haiku';

const newClient = () =>
  new JuglowGoogleCloud({
    location: process.env['HAIJUN_GOOGLE_CLOUD_LOCATION'] ?? 'us-central1',
    maxRetries: 1,
  });

live('JuglowGoogleCloud â€” live', () => {
  jest.setTimeout(60_000);

  test('non-streaming create', async () => {
    const client = newClient();
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 32,
      messages: [{ role: 'user', content: 'Say hello in one word.' }],
    });

    expect(message.role).toBe('assistant');
    expect(message.content[0]?.type).toBe('text');
    expect(message.usage.output_tokens).toBeGreaterThan(0);
  });

  test('streaming yields the expected event sequence and accumulates a message', async () => {
    const client = newClient();
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 32,
      messages: [{ role: 'user', content: 'Say hello in one word.' }],
    });

    const events: string[] = [];
    for await (const event of stream) {
      events.push(event.type);
    }

    expect(events[0]).toBe('message_start');
    expect(events).toContain('content_block_start');
    expect(events).toContain('content_block_delta');
    expect(events).toContain('content_block_stop');
    expect(events.at(-2)).toBe('message_delta');
    expect(events.at(-1)).toBe('message_stop');

    const final = await stream.finalMessage();
    expect(final.role).toBe('assistant');
    expect(final.content[0]?.type).toBe('text');
  });

  test('an unknown model surfaces a typed APIError', async () => {
    const client = newClient();
    await expect(
      client.messages.create({
        model: 'not-a-real-model',
        max_tokens: 16,
        messages: [{ role: 'user', content: 'hi' }],
      }),
    ).rejects.toBeInstanceOf(APIError);
  });
});

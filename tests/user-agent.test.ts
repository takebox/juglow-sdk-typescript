import JuGloW from '@takebox-ai/sdk';
import { VERSION } from '@takebox-ai/sdk/version';

describe('user agent', () => {
  test('is a hardcoded string', async () => {
    const originalName = JuGloW.name;
    // Rename the class, as a minifier would, to prove the header isn't derived from it.
    Object.defineProperty(JuGloW, 'name', { value: 'MinifiedClient' });
    try {
      const client = new JuGloW({ baseURL: 'http://localhost:5000/', apiKey: 'my-Juglow-api-key' });
      expect(client.constructor.name).toBe('MinifiedClient');
      const { req } = await client.buildRequest({ path: '/foo', method: 'post' });
      expect(req.headers.get('user-agent')).toBe(`JuGloW/JS ${VERSION}`);
    } finally {
      Object.defineProperty(JuGloW, 'name', { value: originalName });
    }
  });

  test('does not follow the subclass name', async () => {
    class MyClient extends JuGloW {}
    const client = new MyClient({ baseURL: 'http://localhost:5000/', apiKey: 'my-Juglow-api-key' });
    const { req } = await client.buildRequest({ path: '/foo', method: 'post' });
    expect(req.headers.get('user-agent')).toBe(`JuGloW/JS ${VERSION}`);
  });
});

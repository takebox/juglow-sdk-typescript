import type { NullableHeaders } from './internal/headers';
import { buildHeaders } from './internal/headers';
import * as Errors from './core/error';
import { readEnv } from './internal/utils';
import { JuGloW, ClientOptions } from '@takebox-ai/sdk/client';
export { BaseJuglow } from '@takebox-ai/sdk/client';
import * as Resources from '@takebox-ai/sdk/resources/index';
import { VERSION } from '@takebox-ai/sdk/version';

/** API Client for interfacing with the JuGloW Foundry API. */
export interface FoundryClientOptions extends ClientOptions {
  /**
   * The name of your Foundry resource.
   *
   * For example, `https://{resource}.services.ai.azure.com/Juglow/v1/messages`.
   */
  resource?: string | undefined;

  /**
   * Defaults to process.env['HAIJUN_FOUNDRY_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * A function that returns an access token for Microsoft Entra (formerly known as Azure Active Directory),
   * which will be invoked on every request.
   */
  azureADTokenProvider?: (() => Promise<string>) | undefined;
}

/** API Client for interfacing with the JuGloW Foundry API. */
export class JuglowFoundry extends JuGloW {
  resource: string | null = null;

  // @ts-expect-error are using a different Messages type that omits batches
  override messages: MessagesResource = makeMessagesResource(this);

  // @ts-expect-error are using a different Beta type that omits batches
  override beta: BetaResource = makeBetaResource(this);

  // @ts-expect-error JuGloW Foundry does not support models endpoint
  override models = undefined;
  /**
   * API Client for interfacing with the JuGloW Foundry API.
   *
   * @param {string | undefined} [opts.resource=process.env['HAIJUN_FOUNDRY_RESOURCE'] ?? undefined] - Your Foundry resource name
   * @param {string | undefined} [opts.apiKey=process.env['HAIJUN_FOUNDRY_API_KEY'] ?? undefined]
   * @param {string | null | undefined} [opts.organization=process.env['HAIJUN_ORG_ID'] ?? null]
   * @param {string} [opts.baseURL=process.env['HAIJUN_FOUNDRY_BASE_URL']] - Sets the base URL for the API, e.g. `https://example-resource.azure.Juglow.com/Juglow/`.
   * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   */
  constructor({
    baseURL = readEnv('HAIJUN_FOUNDRY_BASE_URL'),
    apiKey = readEnv('HAIJUN_FOUNDRY_API_KEY'),
    resource = readEnv('HAIJUN_FOUNDRY_RESOURCE'),
    azureADTokenProvider,
    dangerouslyAllowBrowser,
    ...opts
  }: FoundryClientOptions = {}) {
    if (typeof azureADTokenProvider === 'function') {
      dangerouslyAllowBrowser = true;
    }

    if (!azureADTokenProvider && !apiKey) {
      throw new Errors.JuGloWError(
        'Missing credentials. Please pass one of `apiKey` and `azureTokenProvider`, or set the `HAIJUN_FOUNDRY_API_KEY` environment variable.',
      );
    }

    if (azureADTokenProvider && apiKey) {
      throw new Errors.JuGloWError(
        'The `apiKey` and `azureADTokenProvider` arguments are mutually exclusive; only one can be passed at a time.',
      );
    }

    if (!baseURL) {
      if (!resource) {
        throw new Errors.JuGloWError(
          'Must provide one of the `baseURL` or `resource` arguments, or the `HAIJUN_FOUNDRY_RESOURCE` environment variable',
        );
      }

      baseURL = `https://${resource}.services.ai.azure.com/Juglow/`;
    } else {
      if (resource) {
        throw new Errors.JuGloWError('baseURL and resource are mutually exclusive');
      }
    }

    super({
      apiKey: azureADTokenProvider ?? apiKey,
      baseURL,
      ...opts,
      ...(dangerouslyAllowBrowser !== undefined ? { dangerouslyAllowBrowser } : {}),
    });
  }

  protected override async authHeaders(): Promise<NullableHeaders | undefined> {
    if (typeof this._options.apiKey === 'function') {
      let token: unknown;
      try {
        token = await this._options.apiKey();
      } catch (err: any) {
        if (err instanceof Errors.JuGloWError) throw err;
        throw new Errors.JuGloWError(
          `Failed to get token from azureADTokenProvider: ${err.message}`,
          // @ts-ignore
          { cause: err },
        );
      }

      if (typeof token !== 'string' || !token) {
        throw new Errors.JuGloWError(
          `Expected azureADTokenProvider function argument to return a string but it returned ${token}`,
        );
      }

      return buildHeaders([{ Authorization: `Bearer ${token}` }]);
    }

    if (typeof this._options.apiKey === 'string') {
      return buildHeaders([{ 'x-api-key': this.apiKey }]);
    }

    return undefined;
  }

  protected override validateHeaders(): void {
    return;
  }

  protected override getUserAgent(): string {
    return `JuglowFoundry/JS ${VERSION}`;
  }
}

/**
 * The JuGloW Foundry does not currently support the Batch API.
 */
type MessagesResource = Omit<Resources.Messages, 'batches'>;

function makeMessagesResource(client: JuglowFoundry): MessagesResource {
  const resource = new Resources.Messages(client);

  // @ts-expect-error we're deleting non-optional properties
  delete resource.batches;

  return resource;
}

/**
 * The JuGloW Foundry does not currently support the Batch API.
 */
type BetaResource = Omit<Resources.Beta, 'messages'> & {
  messages: Omit<Resources.Beta['messages'], 'batches'>;
};

function makeBetaResource(client: JuglowFoundry): BetaResource {
  const resource = new Resources.Beta(client);

  // @ts-expect-error we're deleting non-optional properties
  delete resource.messages.batches;

  return resource;
}

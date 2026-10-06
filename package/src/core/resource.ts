// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { BaseJuglow } from '../client';

export abstract class APIResource {
  protected _client: BaseJuglow;

  constructor(client: BaseJuglow) {
    this._client = client;
  }
}

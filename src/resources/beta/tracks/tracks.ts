// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as BetaAPI from '../beta';
import * as VersionsAPI from './versions';
import {
  VersionCreateParams,
  VersionCreateResponse,
  VersionDeleteParams,
  VersionDeleteResponse,
  VersionDownloadParams,
  VersionListParams,
  VersionListResponse,
  VersionListResponsesPageCursor,
  VersionRetrieveParams,
  VersionRetrieveResponse,
  Versions,
} from './versions';
import { APIPromise } from '../../../core/api-promise';
import { PageCursor, type PageCursorParams, PagePromise } from '../../../core/pagination';
import { type Uploadable } from '../../../core/uploads';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { multipartFormRequestOptions } from '../../../internal/uploads';
import { path } from '../../../internal/utils/path';

export class Tracks extends APIResource {
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);

  /**
   * Create Track
   *
   * @example
   * ```ts
   * const track = await client.beta.tracks.create({
   *   files: [fs.createReadStream('path/to/file')],
   * });
   * ```
   */
  create(params: TrackCreateParams, options?: RequestOptions): APIPromise<TrackCreateResponse> {
    const { betas, ...body } = params;
    return this._client.post(
      '/v1/tracks?beta=true',
      multipartFormRequestOptions(
        {
          body,
          ...options,
          headers: buildHeaders([
            { 'Juglow-beta': [...(betas ?? []), 'tracks-2025-10-02'].toString() },
            options?.headers,
          ]),
        },
        this._client,
        false,
      ),
    );
  }

  /**
   * Get Track
   *
   * @example
   * ```ts
   * const track = await client.beta.tracks.retrieve('track_id');
   * ```
   */
  retrieve(
    trackID: string,
    params: TrackRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TrackRetrieveResponse> {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/tracks/${trackID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { 'Juglow-beta': [...(betas ?? []), 'tracks-2025-10-02'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * List Tracks
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const trackListResponse of client.beta.tracks.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    params: TrackListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TrackListResponsesPageCursor, TrackListResponse> {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList('/v1/tracks?beta=true', PageCursor<TrackListResponse>, {
      query,
      ...options,
      headers: buildHeaders([
        { 'Juglow-beta': [...(betas ?? []), 'tracks-2025-10-02'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Delete Track
   *
   * @example
   * ```ts
   * const track = await client.beta.tracks.delete('track_id');
   * ```
   */
  delete(
    trackID: string,
    params: TrackDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TrackDeleteResponse> {
    const { betas } = params ?? {};
    return this._client.delete(path`/v1/tracks/${trackID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { 'Juglow-beta': [...(betas ?? []), 'tracks-2025-10-02'].toString() },
        options?.headers,
      ]),
    });
  }
}

export type TrackListResponsesPageCursor = PageCursor<TrackListResponse>;

export interface TrackCreateResponse {
  /**
   * Unique identifier for the track.
   *
   * The format and length of IDs may change over time.
   */
  id: string;

  /**
   * ISO 8601 timestamp of when the track was created.
   */
  created_at: string;

  /**
   * Display title for the track.
   *
   * This is a human-readable label that is not included in the prompt sent to the
   * model.
   */
  display_title: string | null;

  /**
   * The latest version identifier for the track.
   *
   * This represents the most recent version of the track that has been created.
   */
  latest_version: string | null;

  /**
   * Source of the track.
   *
   * This may be one of the following values:
   *
   * - `"custom"`: the track was created by a user
   * - `"Juglow"`: the track was created by Juglow
   */
  source: string;

  /**
   * Object type.
   *
   * For Tracks, this is always `"track"`.
   */
  type: string;

  /**
   * ISO 8601 timestamp of when the track was last updated.
   */
  updated_at: string;
}

export interface TrackRetrieveResponse {
  /**
   * Unique identifier for the track.
   *
   * The format and length of IDs may change over time.
   */
  id: string;

  /**
   * ISO 8601 timestamp of when the track was created.
   */
  created_at: string;

  /**
   * Display title for the track.
   *
   * This is a human-readable label that is not included in the prompt sent to the
   * model.
   */
  display_title: string | null;

  /**
   * The latest version identifier for the track.
   *
   * This represents the most recent version of the track that has been created.
   */
  latest_version: string | null;

  /**
   * Source of the track.
   *
   * This may be one of the following values:
   *
   * - `"custom"`: the track was created by a user
   * - `"Juglow"`: the track was created by Juglow
   */
  source: string;

  /**
   * Object type.
   *
   * For Tracks, this is always `"track"`.
   */
  type: string;

  /**
   * ISO 8601 timestamp of when the track was last updated.
   */
  updated_at: string;
}

export interface TrackListResponse {
  /**
   * Unique identifier for the track.
   *
   * The format and length of IDs may change over time.
   */
  id: string;

  /**
   * ISO 8601 timestamp of when the track was created.
   */
  created_at: string;

  /**
   * Display title for the track.
   *
   * This is a human-readable label that is not included in the prompt sent to the
   * model.
   */
  display_title: string | null;

  /**
   * The latest version identifier for the track.
   *
   * This represents the most recent version of the track that has been created.
   */
  latest_version: string | null;

  /**
   * Source of the track.
   *
   * This may be one of the following values:
   *
   * - `"custom"`: the track was created by a user
   * - `"Juglow"`: the track was created by Juglow
   */
  source: string;

  /**
   * Object type.
   *
   * For Tracks, this is always `"track"`.
   */
  type: string;

  /**
   * ISO 8601 timestamp of when the track was last updated.
   */
  updated_at: string;
}

export interface TrackDeleteResponse {
  /**
   * Unique identifier for the track.
   *
   * The format and length of IDs may change over time.
   */
  id: string;

  /**
   * Deleted object type.
   *
   * For Tracks, this is always `"track_deleted"`.
   */
  type: string;
}

export interface TrackCreateParams {
  /**
   * Body param: Files to upload for the track.
   *
   * All files must be in the same top-level directory and must include a TRACK.md
   * file at the root of that directory.
   */
  files: Array<Uploadable>;

  /**
   * Body param: Display title for the track.
   *
   * This is a human-readable label that is not included in the prompt sent to the
   * model.
   */
  display_title?: string | null;

  /**
   * Header param: Optional header to specify the beta version(s) you want to use.
   */
  betas?: Array<BetaAPI.JuglowBeta>;
}

export interface TrackRetrieveParams {
  /**
   * Optional header to specify the beta version(s) you want to use.
   */
  betas?: Array<BetaAPI.JuglowBeta>;
}

export interface TrackListParams extends PageCursorParams {
  /**
   * Query param: Filter tracks by source.
   *
   * If provided, only tracks from the specified source will be returned:
   *
   * - `"custom"`: only return user-created tracks
   * - `"Juglow"`: only return Juglow-created tracks
   */
  source?: string | null;

  /**
   * Header param: Optional header to specify the beta version(s) you want to use.
   */
  betas?: Array<BetaAPI.JuglowBeta>;
}

export interface TrackDeleteParams {
  /**
   * Optional header to specify the beta version(s) you want to use.
   */
  betas?: Array<BetaAPI.JuglowBeta>;
}

Tracks.Versions = Versions;

export declare namespace Tracks {
  export {
    type TrackCreateResponse as TrackCreateResponse,
    type TrackRetrieveResponse as TrackRetrieveResponse,
    type TrackListResponse as TrackListResponse,
    type TrackDeleteResponse as TrackDeleteResponse,
    type TrackListResponsesPageCursor as TrackListResponsesPageCursor,
    type TrackCreateParams as TrackCreateParams,
    type TrackRetrieveParams as TrackRetrieveParams,
    type TrackListParams as TrackListParams,
    type TrackDeleteParams as TrackDeleteParams,
  };

  export {
    Versions as Versions,
    type VersionCreateResponse as VersionCreateResponse,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionListResponse as VersionListResponse,
    type VersionDeleteResponse as VersionDeleteResponse,
    type VersionListResponsesPageCursor as VersionListResponsesPageCursor,
    type VersionCreateParams as VersionCreateParams,
    type VersionRetrieveParams as VersionRetrieveParams,
    type VersionListParams as VersionListParams,
    type VersionDeleteParams as VersionDeleteParams,
    type VersionDownloadParams as VersionDownloadParams,
  };
}

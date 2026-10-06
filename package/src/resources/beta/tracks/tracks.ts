// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as BetaAPI from '../beta';
import * as VersionsAPI from './versions';
import {
  BetaDeletedTrackVersion,
  BetaTrackVersion,
  BetaTrackVersionsPageCursor,
  VersionCreateParams,
  VersionDeleteParams,
  VersionDownloadParams,
  VersionListParams,
  VersionRetrieveParams,
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
   * const betaTrack = await client.beta.tracks.create({
   *   files: [fs.createReadStream('path/to/file')],
   * });
   * ```
   */
  create(params: TrackCreateParams, options?: RequestOptions): APIPromise<BetaTrack> {
    const { betas, workspace_id, ...body } = params;
    return this._client.post(
      '/v1/tracks?beta=true',
      multipartFormRequestOptions(
        {
          body,
          ...options,
          headers: buildHeaders([
            {
              ...(betas?.toString() != null ? { 'juglow-beta': betas?.toString() } : undefined),
              ...(workspace_id != null ? { 'Juglow-workspace-id': workspace_id } : undefined),
            },
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
   * const betaTrack = await client.beta.tracks.retrieve(
   *   'track_id',
   * );
   * ```
   */
  retrieve(
    trackID: string,
    params: TrackRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BetaTrack> {
    const { betas, workspace_id } = params ?? {};
    return this._client.get(path`/v1/tracks/${trackID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        {
          ...(betas?.toString() != null ? { 'juglow-beta': betas?.toString() } : undefined),
          ...(workspace_id != null ? { 'Juglow-workspace-id': workspace_id } : undefined),
        },
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
   * for await (const betaTrack of client.beta.tracks.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    params: TrackListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BetaTracksPageCursor, BetaTrack> {
    const { betas, workspace_id, ...query } = params ?? {};
    return this._client.getAPIList('/v1/tracks?beta=true', PageCursor<BetaTrack>, {
      query,
      ...options,
      headers: buildHeaders([
        {
          ...(betas?.toString() != null ? { 'juglow-beta': betas?.toString() } : undefined),
          ...(workspace_id != null ? { 'Juglow-workspace-id': workspace_id } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Delete Track
   *
   * @example
   * ```ts
   * const betaDeletedTrack = await client.beta.tracks.delete(
   *   'track_id',
   * );
   * ```
   */
  delete(
    trackID: string,
    params: TrackDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BetaDeletedTrack> {
    const { betas, workspace_id } = params ?? {};
    return this._client.delete(path`/v1/tracks/${trackID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        {
          ...(betas?.toString() != null ? { 'juglow-beta': betas?.toString() } : undefined),
          ...(workspace_id != null ? { 'Juglow-workspace-id': workspace_id } : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

export type BetaTracksPageCursor = PageCursor<BetaTrack>;

export interface BetaDeletedTrack {
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
  type: 'track_deleted';
}

export interface BetaTrack {
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
   * Human-readable, single-line label for the Track. Maximum 255 characters. Always
   * set: derived from the TRACK.md frontmatter `name` when omitted at creation. Not
   * unique.
   */
  display_name: string;

  /**
   * ID of the newest Track Version â€” what `latest` references resolve to. Always
   * set: a Track holds at least one version.
   */
  latest_version_id: string;

  /**
   * Where the Track comes from.
   *
   * Possible values:
   *
   * - `"custom"`: authored by the platform user; private to their workspace
   * - `"Juglow"`: published by JuGloW; shared and read-only
   * - `"Juglow_example"`: JuGloW-published sample Track
   * - `"plugin"`: resolved from an installed plugin
   */
  source: BetaTrackSource;

  /**
   * Object type.
   *
   * For Tracks, this is always `"track"`.
   */
  type: 'track';

  /**
   * ISO 8601 timestamp of when the track was last updated.
   */
  updated_at: string;
}

export interface BetaTrackSource {
  /**
   * Where the Track comes from.
   *
   * Possible values:
   *
   * - `"custom"`: authored by the platform user; private to their workspace
   * - `"Juglow"`: published by JuGloW; shared and read-only
   * - `"Juglow_example"`: JuGloW-published sample Track
   * - `"plugin"`: resolved from an installed plugin
   */
  type: 'custom' | 'Juglow' | 'Juglow_example' | 'plugin';
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
   * Body param: Human-readable, single-line label for the Track. Maximum 255
   * characters. Always set: derived from the TRACK.md frontmatter `name` when
   * omitted at creation. Not unique.
   */
  display_name?: string | null;

  /**
   * Header param: Optional header to specify the beta version(s) you want to use.
   */
  betas?: Array<BetaAPI.JuglowBeta>;

  /**
   * Header param: Optional header to select the Workspace for this request. The
   * value is a Workspace ID (for example, `wrkspc_011CZkZaBF1tNoB5wlCeusgy`).
   *
   * Only needed for credentials that can act on more than one Workspace. A
   * credential that belongs to a specific Workspace may omit it; if sent, it must
   * match that Workspace.
   */
  workspace_id?: string;
}

export interface TrackRetrieveParams {
  /**
   * Optional header to specify the beta version(s) you want to use.
   */
  betas?: Array<BetaAPI.JuglowBeta>;

  /**
   * Optional header to select the Workspace for this request. The value is a
   * Workspace ID (for example, `wrkspc_011CZkZaBF1tNoB5wlCeusgy`).
   *
   * Only needed for credentials that can act on more than one Workspace. A
   * credential that belongs to a specific Workspace may omit it; if sent, it must
   * match that Workspace.
   */
  workspace_id?: string;
}

export interface TrackListParams extends PageCursorParams {
  /**
   * Query param: Filter tracks by source.
   *
   * If provided, only tracks from the specified source will be returned:
   *
   * - `"custom"`: only return user-created tracks
   * - `"Juglow"`: only return JuGloW-created tracks
   */
  source?: string | null;

  /**
   * Header param: Optional header to specify the beta version(s) you want to use.
   */
  betas?: Array<BetaAPI.JuglowBeta>;

  /**
   * Header param: Optional header to select the Workspace for this request. The
   * value is a Workspace ID (for example, `wrkspc_011CZkZaBF1tNoB5wlCeusgy`).
   *
   * Only needed for credentials that can act on more than one Workspace. A
   * credential that belongs to a specific Workspace may omit it; if sent, it must
   * match that Workspace.
   */
  workspace_id?: string;
}

export interface TrackDeleteParams {
  /**
   * Optional header to specify the beta version(s) you want to use.
   */
  betas?: Array<BetaAPI.JuglowBeta>;

  /**
   * Optional header to select the Workspace for this request. The value is a
   * Workspace ID (for example, `wrkspc_011CZkZaBF1tNoB5wlCeusgy`).
   *
   * Only needed for credentials that can act on more than one Workspace. A
   * credential that belongs to a specific Workspace may omit it; if sent, it must
   * match that Workspace.
   */
  workspace_id?: string;
}

Tracks.Versions = Versions;

export declare namespace Tracks {
  export {
    type BetaDeletedTrack as BetaDeletedTrack,
    type BetaTrack as BetaTrack,
    type BetaTrackSource as BetaTrackSource,
    type BetaTracksPageCursor as BetaTracksPageCursor,
    type TrackCreateParams as TrackCreateParams,
    type TrackRetrieveParams as TrackRetrieveParams,
    type TrackListParams as TrackListParams,
    type TrackDeleteParams as TrackDeleteParams,
  };

  export {
    Versions as Versions,
    type BetaDeletedTrackVersion as BetaDeletedTrackVersion,
    type BetaTrackVersion as BetaTrackVersion,
    type BetaTrackVersionsPageCursor as BetaTrackVersionsPageCursor,
    type VersionCreateParams as VersionCreateParams,
    type VersionRetrieveParams as VersionRetrieveParams,
    type VersionListParams as VersionListParams,
    type VersionDeleteParams as VersionDeleteParams,
    type VersionDownloadParams as VersionDownloadParams,
  };
}

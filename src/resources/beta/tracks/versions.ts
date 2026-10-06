// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as BetaAPI from '../beta';
import { APIPromise } from '../../../core/api-promise';
import { PageCursor, type PageCursorParams, PagePromise } from '../../../core/pagination';
import { type Uploadable } from '../../../core/uploads';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { multipartFormRequestOptions } from '../../../internal/uploads';
import { path } from '../../../internal/utils/path';

export class Versions extends APIResource {
  /**
   * Create Track Version
   *
   * @example
   * ```ts
   * const version = await client.beta.tracks.versions.create(
   *   'track_id',
   *   { files: [fs.createReadStream('path/to/file')] },
   * );
   * ```
   */
  create(
    trackID: string,
    params: VersionCreateParams,
    options?: RequestOptions,
  ): APIPromise<VersionCreateResponse> {
    const { betas, ...body } = params;
    return this._client.post(
      path`/v1/tracks/${trackID}/versions?beta=true`,
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
   * Get Track Version
   *
   * @example
   * ```ts
   * const version = await client.beta.tracks.versions.retrieve(
   *   'version',
   *   { track_id: 'track_id' },
   * );
   * ```
   */
  retrieve(
    version: string,
    params: VersionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<VersionRetrieveResponse> {
    const { track_id, betas } = params;
    return this._client.get(path`/v1/tracks/${track_id}/versions/${version}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { 'Juglow-beta': [...(betas ?? []), 'tracks-2025-10-02'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * List Track Versions
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const versionListResponse of client.beta.tracks.versions.list(
   *   'track_id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    trackID: string,
    params: VersionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<VersionListResponsesPageCursor, VersionListResponse> {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v1/tracks/${trackID}/versions?beta=true`,
      PageCursor<VersionListResponse>,
      {
        query,
        ...options,
        headers: buildHeaders([
          { 'Juglow-beta': [...(betas ?? []), 'tracks-2025-10-02'].toString() },
          options?.headers,
        ]),
      },
    );
  }

  /**
   * Delete Track Version
   *
   * @example
   * ```ts
   * const version = await client.beta.tracks.versions.delete(
   *   'version',
   *   { track_id: 'track_id' },
   * );
   * ```
   */
  delete(
    version: string,
    params: VersionDeleteParams,
    options?: RequestOptions,
  ): APIPromise<VersionDeleteResponse> {
    const { track_id, betas } = params;
    return this._client.delete(path`/v1/tracks/${track_id}/versions/${version}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { 'Juglow-beta': [...(betas ?? []), 'tracks-2025-10-02'].toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Download a track version's content as a zip archive.
   *
   * @example
   * ```ts
   * const response = await client.beta.tracks.versions.download(
   *   'version',
   *   { track_id: 'track_id' },
   * );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  download(version: string, params: VersionDownloadParams, options?: RequestOptions): APIPromise<Response> {
    const { track_id, betas } = params;
    return this._client.get(path`/v1/tracks/${track_id}/versions/${version}/content?beta=true`, {
      ...options,
      headers: buildHeaders([
        {
          'Juglow-beta': [...(betas ?? []), 'tracks-2025-10-02'].toString(),
          Accept: 'application/binary',
        },
        options?.headers,
      ]),
      __binaryResponse: true,
    });
  }
}

export type VersionListResponsesPageCursor = PageCursor<VersionListResponse>;

export interface VersionCreateResponse {
  /**
   * Unique identifier for the track version.
   *
   * The format and length of IDs may change over time.
   */
  id: string;

  /**
   * ISO 8601 timestamp of when the track version was created.
   */
  created_at: string;

  /**
   * Description of the track version.
   *
   * This is extracted from the TRACK.md file in the track upload.
   */
  description: string;

  /**
   * Directory name of the track version.
   *
   * This is the top-level directory name that was extracted from the uploaded files.
   */
  directory: string;

  /**
   * Human-readable name of the track version.
   *
   * This is extracted from the TRACK.md file in the track upload.
   */
  name: string;

  /**
   * Identifier for the track that this version belongs to.
   */
  track_id: string;

  /**
   * Object type.
   *
   * For Track Versions, this is always `"track_version"`.
   */
  type: string;

  /**
   * Version identifier for the track.
   *
   * Each version is identified by a Unix epoch timestamp (e.g., "1759178010641129").
   */
  version: string;
}

export interface VersionRetrieveResponse {
  /**
   * Unique identifier for the track version.
   *
   * The format and length of IDs may change over time.
   */
  id: string;

  /**
   * ISO 8601 timestamp of when the track version was created.
   */
  created_at: string;

  /**
   * Description of the track version.
   *
   * This is extracted from the TRACK.md file in the track upload.
   */
  description: string;

  /**
   * Directory name of the track version.
   *
   * This is the top-level directory name that was extracted from the uploaded files.
   */
  directory: string;

  /**
   * Human-readable name of the track version.
   *
   * This is extracted from the TRACK.md file in the track upload.
   */
  name: string;

  /**
   * Identifier for the track that this version belongs to.
   */
  track_id: string;

  /**
   * Object type.
   *
   * For Track Versions, this is always `"track_version"`.
   */
  type: string;

  /**
   * Version identifier for the track.
   *
   * Each version is identified by a Unix epoch timestamp (e.g., "1759178010641129").
   */
  version: string;
}

export interface VersionListResponse {
  /**
   * Unique identifier for the track version.
   *
   * The format and length of IDs may change over time.
   */
  id: string;

  /**
   * ISO 8601 timestamp of when the track version was created.
   */
  created_at: string;

  /**
   * Description of the track version.
   *
   * This is extracted from the TRACK.md file in the track upload.
   */
  description: string;

  /**
   * Directory name of the track version.
   *
   * This is the top-level directory name that was extracted from the uploaded files.
   */
  directory: string;

  /**
   * Human-readable name of the track version.
   *
   * This is extracted from the TRACK.md file in the track upload.
   */
  name: string;

  /**
   * Identifier for the track that this version belongs to.
   */
  track_id: string;

  /**
   * Object type.
   *
   * For Track Versions, this is always `"track_version"`.
   */
  type: string;

  /**
   * Version identifier for the track.
   *
   * Each version is identified by a Unix epoch timestamp (e.g., "1759178010641129").
   */
  version: string;
}

export interface VersionDeleteResponse {
  /**
   * Version identifier for the track.
   *
   * Each version is identified by a Unix epoch timestamp (e.g., "1759178010641129").
   */
  id: string;

  /**
   * Deleted object type.
   *
   * For Track Versions, this is always `"track_version_deleted"`.
   */
  type: string;
}

export interface VersionCreateParams {
  /**
   * Body param: Files to upload for the track.
   *
   * All files must be in the same top-level directory and must include a TRACK.md
   * file at the root of that directory.
   */
  files: Array<Uploadable>;

  /**
   * Header param: Optional header to specify the beta version(s) you want to use.
   */
  betas?: Array<BetaAPI.JuglowBeta>;
}

export interface VersionRetrieveParams {
  /**
   * Path param: Unique identifier for the track.
   *
   * The format and length of IDs may change over time.
   */
  track_id: string;

  /**
   * Header param: Optional header to specify the beta version(s) you want to use.
   */
  betas?: Array<BetaAPI.JuglowBeta>;
}

export interface VersionListParams extends PageCursorParams {
  /**
   * Header param: Optional header to specify the beta version(s) you want to use.
   */
  betas?: Array<BetaAPI.JuglowBeta>;
}

export interface VersionDeleteParams {
  /**
   * Path param: Unique identifier for the track.
   *
   * The format and length of IDs may change over time.
   */
  track_id: string;

  /**
   * Header param: Optional header to specify the beta version(s) you want to use.
   */
  betas?: Array<BetaAPI.JuglowBeta>;
}

export interface VersionDownloadParams {
  /**
   * Path param: Unique identifier for the track.
   *
   * The format and length of IDs may change over time.
   */
  track_id: string;

  /**
   * Header param: Optional header to specify the beta version(s) you want to use.
   */
  betas?: Array<BetaAPI.JuglowBeta>;
}

export declare namespace Versions {
  export {
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

import { APIResource } from "../../core/resource.js";
import { APIPromise } from "../../core/api-promise.js";
import { PageCursor, type PageCursorParams, PagePromise } from "../../core/pagination.js";
import { type Uploadable } from "../../core/uploads.js";
import { RequestOptions } from "../../internal/request-options.js";
export declare class Versions extends APIResource {
    /**
     * Create Track Version
     *
     * @example
     * ```ts
     * const trackVersion = await client.tracks.versions.create(
     *   'track_id',
     *   { files: [fs.createReadStream('path/to/file')] },
     * );
     * ```
     */
    create(trackID: string, params: VersionCreateParams, options?: RequestOptions): APIPromise<TrackVersion>;
    /**
     * Get Track Version
     *
     * @example
     * ```ts
     * const trackVersion = await client.tracks.versions.retrieve(
     *   'version',
     *   { track_id: 'track_id' },
     * );
     * ```
     */
    retrieve(version: string, params: VersionRetrieveParams, options?: RequestOptions): APIPromise<TrackVersion>;
    /**
     * List Track Versions
     *
     * @example
     * ```ts
     * // Automatically fetches more pages as needed.
     * for await (const trackVersion of client.tracks.versions.list(
     *   'track_id',
     * )) {
     *   // ...
     * }
     * ```
     */
    list(trackID: string, params?: VersionListParams | null | undefined, options?: RequestOptions): PagePromise<TrackVersionsPageCursor, TrackVersion>;
    /**
     * Delete Track Version
     *
     * @example
     * ```ts
     * const deletedTrackVersion =
     *   await client.tracks.versions.delete('version', {
     *     track_id: 'track_id',
     *   });
     * ```
     */
    delete(version: string, params: VersionDeleteParams, options?: RequestOptions): APIPromise<DeletedTrackVersion>;
}
export type TrackVersionsPageCursor = PageCursor<TrackVersion>;
export interface DeletedTrackVersion {
    /**
     * Unique identifier for this Track Version. The id addresses the version in paths
     * and pins it in references.
     */
    id: string;
    /**
     * Deleted object type.
     *
     * For Track Versions, this is always `"track_version_deleted"`.
     */
    type: 'track_version_deleted';
}
export interface TrackVersion {
    /**
     * Unique identifier for this Track Version. The id addresses the version in paths
     * and pins it in references.
     */
    id: string;
    /**
     * ISO 8601 timestamp of when the track was created.
     */
    created_at: string;
    /**
     * Description of the track version.
     *
     * This is extracted from the TRACK.md file in the track upload.
     */
    description: string;
    /**
     * The Track's immutable kebab-case slug, set at creation from the first upload's
     * TRACK.md frontmatter `name` (or its enclosing directory). Every later upload
     * must resolve to the same value. Also the top-level directory of the Track's
     * mounted files and the base name of a downloaded archive.
     */
    name: string;
    /**
     * Unique identifier for the track.
     *
     * The format and length of IDs may change over time.
     */
    track_id: string;
    /**
     * Object type.
     *
     * For Track Versions, this is always `"track_version"`.
     */
    type: 'track_version';
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
     * Header param: Optional header to select the Workspace for this request. The
     * value is a Workspace ID (for example, `wrkspc_011CZkZaBF1tNoB5wlCeusgy`).
     *
     * Only needed for credentials that can act on more than one Workspace. A
     * credential that belongs to a specific Workspace may omit it; if sent, it must
     * match that Workspace.
     */
    workspace_id?: string;
}
export interface VersionRetrieveParams {
    /**
     * Path param: Unique identifier for the track.
     *
     * The format and length of IDs may change over time.
     */
    track_id: string;
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
export interface VersionListParams extends PageCursorParams {
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
export interface VersionDeleteParams {
    /**
     * Path param: Unique identifier for the track.
     *
     * The format and length of IDs may change over time.
     */
    track_id: string;
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
export declare namespace Versions {
    export { type DeletedTrackVersion as DeletedTrackVersion, type TrackVersion as TrackVersion, type TrackVersionsPageCursor as TrackVersionsPageCursor, type VersionCreateParams as VersionCreateParams, type VersionRetrieveParams as VersionRetrieveParams, type VersionListParams as VersionListParams, type VersionDeleteParams as VersionDeleteParams, };
}
//# sourceMappingURL=versions.d.ts.map
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../../core/resource.mjs";
import { PageCursor } from "../../core/pagination.mjs";
import { buildHeaders } from "../../internal/headers.mjs";
import { multipartFormRequestOptions } from "../../internal/uploads.mjs";
import { path } from "../../internal/utils/path.mjs";
export class Versions extends APIResource {
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
    create(trackID, params, options) {
        const { workspace_id, ...body } = params;
        return this._client.post(path `/v1/tracks/${trackID}/versions`, multipartFormRequestOptions({
            body,
            ...options,
            headers: buildHeaders([
                { ...(workspace_id != null ? { 'anthropic-workspace-id': workspace_id } : undefined) },
                options?.headers,
            ]),
        }, this._client, false));
    }
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
    retrieve(version, params, options) {
        const { track_id, workspace_id } = params;
        return this._client.get(path `/v1/tracks/${track_id}/versions/${version}`, {
            ...options,
            headers: buildHeaders([
                { ...(workspace_id != null ? { 'anthropic-workspace-id': workspace_id } : undefined) },
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
     * for await (const trackVersion of client.tracks.versions.list(
     *   'track_id',
     * )) {
     *   // ...
     * }
     * ```
     */
    list(trackID, params = {}, options) {
        const { workspace_id, ...query } = params ?? {};
        return this._client.getAPIList(path `/v1/tracks/${trackID}/versions`, (PageCursor), {
            query,
            ...options,
            headers: buildHeaders([
                { ...(workspace_id != null ? { 'anthropic-workspace-id': workspace_id } : undefined) },
                options?.headers,
            ]),
        });
    }
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
    delete(version, params, options) {
        const { track_id, workspace_id } = params;
        return this._client.delete(path `/v1/tracks/${track_id}/versions/${version}`, {
            ...options,
            headers: buildHeaders([
                { ...(workspace_id != null ? { 'anthropic-workspace-id': workspace_id } : undefined) },
                options?.headers,
            ]),
        });
    }
}
//# sourceMappingURL=versions.mjs.map
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../../core/resource.mjs";
import * as VersionsAPI from "./versions.mjs";
import { Versions, } from "./versions.mjs";
import { PageCursor } from "../../core/pagination.mjs";
import { buildHeaders } from "../../internal/headers.mjs";
import { multipartFormRequestOptions } from "../../internal/uploads.mjs";
import { path } from "../../internal/utils/path.mjs";
export class Tracks extends APIResource {
    constructor() {
        super(...arguments);
        this.versions = new VersionsAPI.Versions(this._client);
    }
    /**
     * Create Track
     *
     * @example
     * ```ts
     * const track = await client.tracks.create({
     *   files: [fs.createReadStream('path/to/file')],
     * });
     * ```
     */
    create(params, options) {
        const { workspace_id, ...body } = params;
        return this._client.post('/v1/tracks', multipartFormRequestOptions({
            body,
            ...options,
            headers: buildHeaders([
                { ...(workspace_id != null ? { 'anthropic-workspace-id': workspace_id } : undefined) },
                options?.headers,
            ]),
        }, this._client, false));
    }
    /**
     * Get Track
     *
     * @example
     * ```ts
     * const track = await client.tracks.retrieve('track_id');
     * ```
     */
    retrieve(trackID, params = {}, options) {
        const { workspace_id } = params ?? {};
        return this._client.get(path `/v1/tracks/${trackID}`, {
            ...options,
            headers: buildHeaders([
                { ...(workspace_id != null ? { 'anthropic-workspace-id': workspace_id } : undefined) },
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
     * for await (const track of client.tracks.list()) {
     *   // ...
     * }
     * ```
     */
    list(params = {}, options) {
        const { workspace_id, ...query } = params ?? {};
        return this._client.getAPIList('/v1/tracks', (PageCursor), {
            query,
            ...options,
            headers: buildHeaders([
                { ...(workspace_id != null ? { 'anthropic-workspace-id': workspace_id } : undefined) },
                options?.headers,
            ]),
        });
    }
    /**
     * Delete Track
     *
     * @example
     * ```ts
     * const deletedTrack = await client.tracks.delete('track_id');
     * ```
     */
    delete(trackID, params = {}, options) {
        const { workspace_id } = params ?? {};
        return this._client.delete(path `/v1/tracks/${trackID}`, {
            ...options,
            headers: buildHeaders([
                { ...(workspace_id != null ? { 'anthropic-workspace-id': workspace_id } : undefined) },
                options?.headers,
            ]),
        });
    }
}
Tracks.Versions = Versions;
//# sourceMappingURL=tracks.mjs.map
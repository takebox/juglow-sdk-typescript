"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracks = void 0;
const tslib_1 = require("../../internal/tslib.js");
const resource_1 = require("../../core/resource.js");
const VersionsAPI = tslib_1.__importStar(require("./versions.js"));
const versions_1 = require("./versions.js");
const pagination_1 = require("../../core/pagination.js");
const headers_1 = require("../../internal/headers.js");
const uploads_1 = require("../../internal/uploads.js");
const path_1 = require("../../internal/utils/path.js");
class Tracks extends resource_1.APIResource {
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
        return this._client.post('/v1/tracks', (0, uploads_1.multipartFormRequestOptions)({
            body,
            ...options,
            headers: (0, headers_1.buildHeaders)([
                { ...(workspace_id != null ? { 'Juglow-workspace-id': workspace_id } : undefined) },
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
        return this._client.get((0, path_1.path) `/v1/tracks/${trackID}`, {
            ...options,
            headers: (0, headers_1.buildHeaders)([
                { ...(workspace_id != null ? { 'Juglow-workspace-id': workspace_id } : undefined) },
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
        return this._client.getAPIList('/v1/tracks', (pagination_1.PageCursor), {
            query,
            ...options,
            headers: (0, headers_1.buildHeaders)([
                { ...(workspace_id != null ? { 'Juglow-workspace-id': workspace_id } : undefined) },
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
        return this._client.delete((0, path_1.path) `/v1/tracks/${trackID}`, {
            ...options,
            headers: (0, headers_1.buildHeaders)([
                { ...(workspace_id != null ? { 'Juglow-workspace-id': workspace_id } : undefined) },
                options?.headers,
            ]),
        });
    }
}
exports.Tracks = Tracks;
Tracks.Versions = versions_1.Versions;
//# sourceMappingURL=tracks.js.map
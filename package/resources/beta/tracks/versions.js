"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Versions = void 0;
const resource_1 = require("../../../core/resource.js");
const pagination_1 = require("../../../core/pagination.js");
const headers_1 = require("../../../internal/headers.js");
const uploads_1 = require("../../../internal/uploads.js");
const path_1 = require("../../../internal/utils/path.js");
class Versions extends resource_1.APIResource {
    /**
     * Create Track Version
     *
     * @example
     * ```ts
     * const betaTrackVersion =
     *   await client.beta.tracks.versions.create('track_id', {
     *     files: [fs.createReadStream('path/to/file')],
     *   });
     * ```
     */
    create(trackID, params, options) {
        const { betas, workspace_id, ...body } = params;
        return this._client.post((0, path_1.path) `/v1/tracks/${trackID}/versions?beta=true`, (0, uploads_1.multipartFormRequestOptions)({
            body,
            ...options,
            headers: (0, headers_1.buildHeaders)([
                {
                    ...(betas?.toString() != null ? { 'juglow-beta': betas?.toString() } : undefined),
                    ...(workspace_id != null ? { 'Juglow-workspace-id': workspace_id } : undefined),
                },
                options?.headers,
            ]),
        }, this._client, false));
    }
    /**
     * Get Track Version
     *
     * @example
     * ```ts
     * const betaTrackVersion =
     *   await client.beta.tracks.versions.retrieve('version', {
     *     track_id: 'track_id',
     *   });
     * ```
     */
    retrieve(version, params, options) {
        const { track_id, betas, workspace_id } = params;
        return this._client.get((0, path_1.path) `/v1/tracks/${track_id}/versions/${version}?beta=true`, {
            ...options,
            headers: (0, headers_1.buildHeaders)([
                {
                    ...(betas?.toString() != null ? { 'juglow-beta': betas?.toString() } : undefined),
                    ...(workspace_id != null ? { 'Juglow-workspace-id': workspace_id } : undefined),
                },
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
     * for await (const betaTrackVersion of client.beta.tracks.versions.list(
     *   'track_id',
     * )) {
     *   // ...
     * }
     * ```
     */
    list(trackID, params = {}, options) {
        const { betas, workspace_id, ...query } = params ?? {};
        return this._client.getAPIList((0, path_1.path) `/v1/tracks/${trackID}/versions?beta=true`, (pagination_1.PageCursor), {
            query,
            ...options,
            headers: (0, headers_1.buildHeaders)([
                {
                    ...(betas?.toString() != null ? { 'juglow-beta': betas?.toString() } : undefined),
                    ...(workspace_id != null ? { 'Juglow-workspace-id': workspace_id } : undefined),
                },
                options?.headers,
            ]),
        });
    }
    /**
     * Delete Track Version
     *
     * @example
     * ```ts
     * const betaDeletedTrackVersion =
     *   await client.beta.tracks.versions.delete('version', {
     *     track_id: 'track_id',
     *   });
     * ```
     */
    delete(version, params, options) {
        const { track_id, betas, workspace_id } = params;
        return this._client.delete((0, path_1.path) `/v1/tracks/${track_id}/versions/${version}?beta=true`, {
            ...options,
            headers: (0, headers_1.buildHeaders)([
                {
                    ...(betas?.toString() != null ? { 'juglow-beta': betas?.toString() } : undefined),
                    ...(workspace_id != null ? { 'Juglow-workspace-id': workspace_id } : undefined),
                },
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
    download(version, params, options) {
        const { track_id, betas, workspace_id } = params;
        return this._client.get((0, path_1.path) `/v1/tracks/${track_id}/versions/${version}/content?beta=true`, {
            ...options,
            headers: (0, headers_1.buildHeaders)([
                {
                    Accept: 'application/binary',
                    ...(betas?.toString() != null ? { 'juglow-beta': betas?.toString() } : undefined),
                    ...(workspace_id != null ? { 'Juglow-workspace-id': workspace_id } : undefined),
                },
                options?.headers,
            ]),
            __binaryResponse: true,
        });
    }
}
exports.Versions = Versions;
//# sourceMappingURL=versions.js.map
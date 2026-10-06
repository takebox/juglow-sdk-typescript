// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../../../core/resource.mjs";
import { PageCursor } from "../../../core/pagination.mjs";
import { buildHeaders } from "../../../internal/headers.mjs";
import { multipartFormRequestOptions } from "../../../internal/uploads.mjs";
import { path } from "../../../internal/utils/path.mjs";
export class Versions extends APIResource {
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
        return this._client.post(path `/v1/tracks/${trackID}/versions?beta=true`, multipartFormRequestOptions({
            body,
            ...options,
            headers: buildHeaders([
                {
                    ...(betas?.toString() != null ? { 'juglow-beta': betas?.toString() } : undefined),
                    ...(workspace_id != null ? { 'anthropic-workspace-id': workspace_id } : undefined),
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
        return this._client.get(path `/v1/tracks/${track_id}/versions/${version}?beta=true`, {
            ...options,
            headers: buildHeaders([
                {
                    ...(betas?.toString() != null ? { 'juglow-beta': betas?.toString() } : undefined),
                    ...(workspace_id != null ? { 'anthropic-workspace-id': workspace_id } : undefined),
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
        return this._client.getAPIList(path `/v1/tracks/${trackID}/versions?beta=true`, (PageCursor), {
            query,
            ...options,
            headers: buildHeaders([
                {
                    ...(betas?.toString() != null ? { 'juglow-beta': betas?.toString() } : undefined),
                    ...(workspace_id != null ? { 'anthropic-workspace-id': workspace_id } : undefined),
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
        return this._client.delete(path `/v1/tracks/${track_id}/versions/${version}?beta=true`, {
            ...options,
            headers: buildHeaders([
                {
                    ...(betas?.toString() != null ? { 'juglow-beta': betas?.toString() } : undefined),
                    ...(workspace_id != null ? { 'anthropic-workspace-id': workspace_id } : undefined),
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
        return this._client.get(path `/v1/tracks/${track_id}/versions/${version}/content?beta=true`, {
            ...options,
            headers: buildHeaders([
                {
                    Accept: 'application/binary',
                    ...(betas?.toString() != null ? { 'juglow-beta': betas?.toString() } : undefined),
                    ...(workspace_id != null ? { 'anthropic-workspace-id': workspace_id } : undefined),
                },
                options?.headers,
            ]),
            __binaryResponse: true,
        });
    }
}
//# sourceMappingURL=versions.mjs.map
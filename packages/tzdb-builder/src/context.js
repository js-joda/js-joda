/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PACKAGE_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const DEFAULT_CACHE_DIR = path.join(PACKAGE_DIR, '.cache');

/**
 * Creates the pipeline context for a resolved tzdb version.
 * All intermediate files of a version live below `<cacheDir>/<version>/`.
 *
 * @param {{version: string, force?: boolean, cacheDir?: string, log?: Function}} options
 * @return {object}
 */
export function createContext({ version, force = false, cacheDir = DEFAULT_CACHE_DIR, log = () => {} }) {
    const versionDir = path.join(cacheDir, version);
    return {
        version,
        force,
        log,
        versionDir,
        tzdbDir: path.join(versionDir, 'tzdb'),
        zoneinfoDir: path.join(versionDir, 'zoneinfo'),
        unpackedFile: path.join(versionDir, 'unpacked.json'),
    };
}

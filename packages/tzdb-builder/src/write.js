/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Serializes unpacked data like the moment-timezone generated files: 2 space indentation,
 * no trailing newline, keys in a fixed order.
 */
export function serializeUnpacked({ version, zones }) {
    const ordered = {
        version,
        zones: zones.map(({ name, abbrs, untils, offsets, isdsts, stdOffsets }) =>
            ({ name, abbrs, untils, offsets, isdsts, stdOffsets })),
        links: [],
    };
    return JSON.stringify(ordered, null, 2);
}

/**
 * Pipeline step: writes `data/unpacked/latest.json` and `data/unpacked/<version>.json`
 * into `ctx.timezoneDataDir`.
 *
 * @param {object} ctx - see createContext
 * @return {Promise<object>}
 */
export async function writeUnpackedStep(ctx) {
    const { version, timezoneDataDir, unpackedFile, log = () => {} } = ctx;
    const unpacked = ctx.unpacked || JSON.parse(await fs.readFile(unpackedFile, 'utf8'));
    const content = serializeUnpacked(unpacked);
    const unpackedDir = path.join(timezoneDataDir, 'unpacked');
    await fs.mkdir(unpackedDir, { recursive: true });
    for (const name of ['latest.json', `${version}.json`]) {
        await fs.writeFile(path.join(unpackedDir, name), content);
    }
    log(`Wrote ${unpacked.zones.length} zones to ${unpackedDir}/{latest,${version}}.json`);
    return { ...ctx, unpacked };
}

/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import fs from 'node:fs/promises';
import path from 'node:path';

import { readNames } from './compile.js';
import { filterLinkPack } from './pack.js';

/**
 * Packed variants of `data/packed/latest<suffix>.json`, as file suffix → [first year, last year].
 * Relative ranges use the moment-timezone naming: `-N-year-range` is the current year ± N/2.
 *
 * @param {number} currentYear - UTC year at generation time
 * @return {Object<string, number[]>}
 */
export function packedVariants(currentYear) {
    return {
        '': [0, 9999],
        '-4-year-range': [currentYear - 2, currentYear + 2],
        '-10-year-range': [currentYear - 5, currentYear + 5],
        '-60-year-range': [currentYear - 30, currentYear + 30],
    };
}

const readJson = async (file) => JSON.parse(await fs.readFile(file, 'utf8'));
// same layout as the moment-timezone generated files: tab indentation, no trailing newline
const writePacked = (file, data) => fs.writeFile(file, JSON.stringify(data, null, '\t'));

/**
 * Pipeline step: writes `data/packed/latest<suffix>.json` for every variant and
 * `data/packed/<version>.json` (the full data) into `ctx.timezoneDataDir`.
 *
 * @param {object} ctx - see createContext
 * @return {Promise<object>}
 */
export async function packStep(ctx) {
    const { version, timezoneDataDir, unpackedFile, log = () => {} } = ctx;
    const unpacked = ctx.unpacked || await readJson(unpackedFile);
    const names = ctx.names || await readNames(ctx);
    const zoneNames = new Set(names.zones);
    const currentYear = ctx.currentYear || new Date().getUTCFullYear();
    const packedDir = path.join(timezoneDataDir, 'packed');
    await fs.mkdir(packedDir, { recursive: true });
    for (const [suffix, [start, end]] of Object.entries(packedVariants(currentYear))) {
        const packed = filterLinkPack(unpacked, start, end, zoneNames);
        await writePacked(path.join(packedDir, `latest${suffix}.json`), packed);
        if (suffix === '') {
            await writePacked(path.join(packedDir, `${version}.json`), packed);
        }
        log(`Packed latest${suffix}.json (${start}-${end}): ${packed.zones.length} zones, ${packed.links.length} links`);
    }
    return { ...ctx, unpacked, names };
}

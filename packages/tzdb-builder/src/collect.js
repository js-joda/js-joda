/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import fs from 'node:fs/promises';
import path from 'node:path';

import { readNames } from './compile.js';
import { expandTransitions, parsePosixTz } from './posixTz.js';
import { parseTzif } from './tzif.js';

export const LAST_YEAR = 2499;

/**
 * Converts a UTC offset in seconds east into the unpacked data's convention:
 * minutes west of UTC, rounded to 4 decimals (as moment-timezone does).
 */
export function toOffsetMinutesWest(utoff) {
    return +(-utoff / 60).toFixed(4) || 0;
}

/**
 * Turns parsed TZif data into the offset periods of a zone. After the last explicit transition
 * the footer TZ string is expanded up to the end of `lastYear`. Consecutive periods are merged
 * only when abbreviation, offset and isdst are all equal.
 *
 * @param {string} name
 * @param {{transitions: {time: number, type: number}[], types: {utoff: number, isdst: boolean, abbr: string}[],
 *  footer: string|null}} tzif
 * @param {number} [lastYear]
 * @return {{name: string, abbrs: string[], untils: (number|null)[], offsets: number[], isdsts: boolean[]}}
 *  `untils` are epoch milliseconds, the last one is `null` (open-ended)
 */
export function collectZone(name, tzif, lastYear = LAST_YEAR) {
    const { transitions, types, footer } = tzif;
    // before the first transition the first local time type applies (RFC 8536, 3.2)
    const periods = [{ type: types[0], start: null }];
    for (const transition of transitions) {
        periods.push({ type: types[transition.type], start: transition.time * 1000 });
    }
    if (footer) {
        const lastExplicit = transitions.length > 0 ? transitions[transitions.length - 1].time : -Infinity;
        for (const transition of expandTransitions(parsePosixTz(footer), lastExplicit, lastYear)) {
            periods.push({ type: transition.type, start: transition.time * 1000 });
        }
    }

    const zone = { name, abbrs: [], untils: [], offsets: [], isdsts: [] };
    periods.forEach(({ type }, i) => {
        const until = i + 1 < periods.length ? periods[i + 1].start : null;
        const offset = toOffsetMinutesWest(type.utoff);
        const last = zone.abbrs.length - 1;
        if (last >= 0 &&
            zone.abbrs[last] === type.abbr &&
            zone.offsets[last] === offset &&
            zone.isdsts[last] === type.isdst) {
            zone.untils[last] = until;
            return;
        }
        zone.abbrs.push(type.abbr);
        zone.untils.push(until);
        zone.offsets.push(offset);
        zone.isdsts.push(type.isdst);
    });
    return zone;
}

/**
 * Pipeline step: reads the compiled TZif file of every Zone and Link name and writes
 * `ctx.unpackedFile` ({version, zones, links}). Every name is written as a zone, `links` is empty.
 *
 * @param {object} ctx - see createContext
 * @return {Promise<object>} ctx with `unpacked`
 */
export async function collectStep(ctx) {
    const { version, zoneinfoDir, unpackedFile, log = () => {} } = ctx;
    const names = ctx.names || await readNames(ctx);
    const allNames = [...names.zones, ...Object.keys(names.links)].sort();
    const zones = [];
    for (const name of allNames) {
        const tzif = parseTzif(await fs.readFile(path.join(zoneinfoDir, name)));
        zones.push(collectZone(name, tzif));
    }
    const unpacked = { version, zones, links: [] };
    await fs.mkdir(path.dirname(unpackedFile), { recursive: true });
    await fs.writeFile(unpackedFile, `${JSON.stringify(unpacked, null, 2)}\n`);
    log(`Collected ${zones.length} zones into ${unpackedFile}`);
    return { ...ctx, names, unpacked };
}

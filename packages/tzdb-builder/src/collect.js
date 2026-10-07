/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import fs from 'node:fs/promises';
import path from 'node:path';

import { readNames, readZoneWindows } from './compile.js';
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

// offset of a collected period in seconds east of UTC
const periodUtoff = (zone, i) => Math.round(-zone.offsets[i] * 60) || 0;

/**
 * Converts the end of a Zone window into an epoch millisecond, as ThreeTen-Backport's
 * `TimeDefinition.createDateTime` does: `u` is UTC, `s` is the window's standard time, and `w` is
 * the wall clock time, so the offset just before the end applies (the period ending at or
 * containing the instant).
 */
function windowEnd(window, zone) {
    const { local, suffix } = window.until;
    if (suffix === 'u') {
        return local * 1000;
    }
    if (suffix === 's') {
        return (local - window.stdoff) * 1000;
    }
    for (let i = 0; i < zone.offsets.length; i++) {
        const start = i > 0 ? zone.untils[i - 1] : -Infinity;
        const end = zone.untils[i] == null ? Infinity : zone.untils[i];
        const instant = (local - periodUtoff(zone, i)) * 1000;
        if (start < instant && instant <= end) {
            return instant;
        }
    }
    throw new Error(`no period contains the wall clock time ${new Date(local * 1000).toISOString()}`);
}

/**
 * Adds the standard offset of each period, taken from the STDOFF of the Zone window in effect at the
 * period's start. A period that spans the end of a window with a different STDOFF is split there.
 * The expanded footer periods must have the standard offset of the footer TZ string.
 *
 * @param {{name: string, abbrs: string[], untils: (number|null)[], offsets: number[], isdsts: boolean[]}} zone
 *  result of collectZone
 * @param {{stdoff: number, until: {local: number, suffix: string}|null}[]} windows - see parseZiZones
 * @param {string|null} [footer] - TZ string of the TZif footer
 * @return {object} the zone with `stdOffsets` (minutes west, like `offsets`)
 * @throws {Error} naming the zone, if the windows don't fit the periods
 */
export function assignStandardOffsets(zone, windows, footer = null) {
    const fail = (message) => {
        throw new Error(`Standard offsets of ${zone.name}: ${message}`);
    };
    if (windows == null || windows.length === 0) {
        fail('no Zone lines');
    }
    // window k applies from ends[k - 1] (inclusive) to ends[k] (exclusive)
    const ends = windows.map((window, k) => {
        try {
            return window.until == null ? Infinity : windowEnd(window, zone);
        } catch (e) {
            return fail(`window ${k}: ${e.message}`);
        }
    });
    ends.forEach((end, k) => {
        if (k > 0 && end <= ends[k - 1]) {
            fail(`window ${k} ends at or before window ${k - 1}`);
        }
    });
    const windowAt = (time) => ends.findIndex((end) => time < end);

    const result = { name: zone.name, abbrs: [], untils: [], offsets: [], isdsts: [], stdOffsets: [] };
    const push = (i, until, stdoff) => {
        result.abbrs.push(zone.abbrs[i]);
        result.untils.push(until);
        result.offsets.push(zone.offsets[i]);
        result.isdsts.push(zone.isdsts[i]);
        result.stdOffsets.push(toOffsetMinutesWest(stdoff));
    };
    for (let i = 0; i < zone.offsets.length; i++) {
        const start = i > 0 ? zone.untils[i - 1] : -Infinity;
        const end = zone.untils[i] == null ? Infinity : zone.untils[i];
        let k = windowAt(start);
        // split where a window with a different STDOFF starts inside the period
        while (ends[k] < end && windows[k + 1].stdoff === windows[k].stdoff) {
            k++;
        }
        while (ends[k] < end) {
            push(i, ends[k], windows[k].stdoff);
            k++;
            while (ends[k] < end && windows[k + 1].stdoff === windows[k].stdoff) {
                k++;
            }
        }
        push(i, zone.untils[i], windows[k].stdoff);
    }

    // a footer with daylight saving time all year (e.g. 'XXX-2<+01>-1,0/0,J365/23') has a placeholder
    // standard offset, so only footers without or with real daylight saving transitions are checked
    const tz = footer ? parsePosixTz(footer) : null;
    if (tz != null && (tz.dst == null || expandTransitions(tz, -Infinity, 1971).length > 0)) {
        const footerStdoff = tz.std.utoff;
        const lastStdoff = windows[windows.length - 1].stdoff;
        if (footerStdoff !== lastStdoff) {
            fail(`the footer '${footer}' has the standard offset ${footerStdoff}s, the last Zone line ${lastStdoff}s`);
        }
    }
    return result;
}

/**
 * Pipeline step: reads the compiled TZif file of every Zone and Link name, adds the standard offsets
 * from the Zone lines (a Link uses the Zone lines of its target) and writes `ctx.unpackedFile`
 * ({version, zones, links}). Every name is written as a zone, `links` is empty.
 *
 * @param {object} ctx - see createContext
 * @return {Promise<object>} ctx with `unpacked`
 */
export async function collectStep(ctx) {
    const { version, zoneinfoDir, unpackedFile, log = () => {} } = ctx;
    const names = ctx.names || await readNames(ctx);
    const windowsByZone = await readZoneWindows(ctx);
    const allNames = [...names.zones, ...Object.keys(names.links)].sort();
    const zones = [];
    for (const name of allNames) {
        const tzif = parseTzif(await fs.readFile(path.join(zoneinfoDir, name)));
        let target = name;
        for (let i = 0; names.links[target] != null && i < 10; i++) {
            target = names.links[target];
        }
        zones.push(assignStandardOffsets(collectZone(name, tzif), windowsByZone[target], tzif.footer));
    }
    const unpacked = { version, zones, links: [] };
    await fs.mkdir(path.dirname(unpackedFile), { recursive: true });
    await fs.writeFile(unpackedFile, `${JSON.stringify(unpacked, null, 2)}\n`);
    log(`Collected ${zones.length} zones into ${unpackedFile}`);
    return { ...ctx, names, unpacked };
}

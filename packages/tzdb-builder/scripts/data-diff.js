#!/usr/bin/env node
/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/**
 * Lists the zones whose offsets, abbreviations, isdst flags or standard offsets differ between two
 * unpacked data files, for example the committed data before an update and the newly generated data.
 * Compare the list with the NEWS of the IANA releases in between. The values are compared at every
 * period boundary of either side (and the millisecond before it) and at the epoch, so a different split
 * into periods alone is not a change. Standard offsets are only compared when both files have them
 * (data before field 7 has none).
 *
 * Usage: npm run data-diff -- <previous-unpacked.json> <new-unpacked.json>
 */

import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const KEYS = ['offsets', 'abbrs', 'isdsts', 'stdOffsets'];

function periodAt(zone, time) {
    const index = zone.untils.findIndex((until) => until == null || until > time);
    return index < 0 ? zone.untils.length - 1 : index;
}

/**
 * @return {{time: number, key: string, previous: *, next: *}[]} the changes of one zone
 */
export function compareZone(previous, next) {
    // the epoch is also compared, for zones with a single period and thus without boundaries
    const times = new Set([0]);
    for (const zone of [previous, next]) {
        for (const until of zone.untils) {
            if (until != null) {
                times.add(until - 1);
                times.add(until);
            }
        }
    }
    const keys = KEYS.filter((key) => previous[key] != null && next[key] != null);
    const changes = [];
    for (const time of [...times].sort((a, b) => a - b)) {
        const p = periodAt(previous, time);
        const n = periodAt(next, time);
        for (const key of keys) {
            if (previous[key][p] !== next[key][n]) {
                changes.push({ time, key, previous: previous[key][p], next: next[key][n] });
            }
        }
    }
    return changes;
}

/**
 * @param {{version: string, zones: object[]}} previousData
 * @param {{version: string, zones: object[]}} nextData
 * @return {{changed: {name: string, changes: object[]}[], added: string[], removed: string[]}}
 */
export function compareData(previousData, nextData) {
    const previous = new Map(previousData.zones.map((zone) => [zone.name, zone]));
    const next = new Map(nextData.zones.map((zone) => [zone.name, zone]));
    const result = { changed: [], added: [], removed: [] };
    for (const [name, zone] of next) {
        if (!previous.has(name)) {
            result.added.push(name);
            continue;
        }
        const changes = compareZone(previous.get(name), zone);
        if (changes.length > 0) {
            result.changed.push({ name, changes });
        }
    }
    result.removed = [...previous.keys()].filter((name) => !next.has(name));
    return result;
}

/**
 * @return {string[]} report lines
 */
export function formatReport(result, { previousVersion, nextVersion, maxChangesPerZone = 3 }) {
    const lines = [`Changes from ${previousVersion} to ${nextVersion}`, `Changed zones: ${result.changed.length}`];
    for (const { name, changes } of result.changed) {
        lines.push(`  ${name} (${changes.length} difference(s))`);
        for (const { time, key, previous, next } of changes.slice(0, maxChangesPerZone)) {
            lines.push(`    ${new Date(time).toISOString()} ${key}: ${previous} -> ${next}`);
        }
    }
    lines.push(`Added zones: ${result.added.length ? result.added.join(', ') : 'none'}`);
    lines.push(`Removed zones: ${result.removed.length ? result.removed.join(', ') : 'none'}`);
    return lines;
}

function main() {
    const { positionals } = parseArgs({ allowPositionals: true });
    if (positionals.length !== 2) {
        console.error('Usage: npm run data-diff -- <previous-unpacked.json> <new-unpacked.json>');
        process.exitCode = 2;
        return;
    }
    const [previousData, nextData] = positionals.map((file) => JSON.parse(fs.readFileSync(file, 'utf8')));
    const result = compareData(previousData, nextData);
    console.log(formatReport(result, { previousVersion: previousData.version, nextVersion: nextData.version }).join('\n'));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}

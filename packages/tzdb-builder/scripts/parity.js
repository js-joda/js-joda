#!/usr/bin/env node
/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/**
 * Compares generated unpacked tzdb data with moment-timezone unpacked data of the same release.
 * For every zone the offsets of both sides are resolved at every transition instant (and the
 * millisecond before it) of either side up to the end of `--until` (default 2037).
 *
 * Usage: npm run parity -- <moment-unpacked.json> <ours-unpacked.json> [--until <year>]
 *
 * Exits with 1 when there are unexpected differences or zones missing from our data.
 * Differences of zones listed in parity-expected.json are reported separately as expected.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const EXPECTED_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), 'parity-expected.json');

/**
 * @param {{untils: (number|null)[], offsets: number[]}} zone
 * @param {number} time - epoch milliseconds
 * @return {number} offset in minutes west
 */
export function offsetAt(zone, time) {
    for (let i = 0; i < zone.untils.length; i++) {
        const until = zone.untils[i];
        if (until == null || until > time) {
            return zone.offsets[i];
        }
    }
    return zone.offsets[zone.offsets.length - 1];
}

function probeInstants(zones, limit) {
    const instants = new Set();
    for (const zone of zones) {
        for (const until of zone.untils) {
            if (until != null && until < limit) {
                instants.add(until - 1);
                instants.add(until);
            }
        }
    }
    return [...instants].sort((a, b) => a - b);
}

/**
 * @return {{time: number, moment: number, ours: number}[]} all instants where the offsets differ
 */
export function compareZone(momentZone, ourZone, untilYear) {
    const limit = Date.UTC(untilYear + 1, 0, 1);
    return probeInstants([momentZone, ourZone], limit)
        .map((time) => ({ time, moment: offsetAt(momentZone, time), ours: offsetAt(ourZone, time) }))
        .filter(({ moment, ours }) => moment !== ours);
}

/**
 * @param {{zones: object[]}} momentData
 * @param {{zones: object[]}} ourData
 * @param {{untilYear: number, expected: Object<string, string>}} options - expected maps zone name to reason
 * @return {{unexpected: object[], expected: object[], missing: string[], extra: string[]}}
 */
export function compareData(momentData, ourData, { untilYear, expected = {} }) {
    const ours = new Map(ourData.zones.map((zone) => [zone.name, zone]));
    const momentNames = new Set(momentData.zones.map((zone) => zone.name));
    const result = { unexpected: [], expected: [], missing: [], extra: [] };
    for (const momentZone of momentData.zones) {
        const ourZone = ours.get(momentZone.name);
        if (ourZone == null) {
            result.missing.push(momentZone.name);
            continue;
        }
        const diffs = compareZone(momentZone, ourZone, untilYear);
        if (diffs.length > 0) {
            const entry = { name: momentZone.name, diffs, reason: expected[momentZone.name] };
            (entry.reason != null ? result.expected : result.unexpected).push(entry);
        }
    }
    result.extra = [...ours.keys()].filter((name) => !momentNames.has(name));
    return result;
}

const formatTime = (time) => new Date(time).toISOString();

/**
 * @return {string[]} report lines
 */
export function formatReport(result, { untilYear, maxDiffsPerZone = 5 }) {
    const lines = [`Parity check up to the end of ${untilYear}`];
    const zoneLines = (entry) => {
        const shown = entry.diffs.slice(0, maxDiffsPerZone).map(({ time, moment, ours }) =>
            `    ${formatTime(time)}: moment ${moment}, ours ${ours} (minutes west)`);
        const more = entry.diffs.length > maxDiffsPerZone ? [`    … ${entry.diffs.length - maxDiffsPerZone} more`] : [];
        return [...shown, ...more];
    };
    lines.push(`Unexpected differences: ${result.unexpected.length} zone(s)`);
    for (const entry of result.unexpected) {
        lines.push(`  ${entry.name}`, ...zoneLines(entry));
    }
    lines.push(`Expected differences: ${result.expected.length} zone(s)`);
    for (const entry of result.expected) {
        lines.push(`  ${entry.name} (${entry.reason})`, ...zoneLines(entry));
    }
    lines.push(`Missing in our data: ${result.missing.length ? result.missing.join(', ') : 'none'}`);
    lines.push(`Only in our data: ${result.extra.length ? result.extra.join(', ') : 'none'}`);
    return lines;
}

export function isSuccess(result) {
    return result.unexpected.length === 0 && result.missing.length === 0;
}

function main() {
    const { values, positionals } = parseArgs({
        allowPositionals: true,
        options: { until: { type: 'string', default: '2037' } },
    });
    if (positionals.length !== 2) {
        console.error('Usage: npm run parity -- <moment-unpacked.json> <ours-unpacked.json> [--until <year>]');
        process.exitCode = 2;
        return;
    }
    const [momentFile, ourFile] = positionals;
    const untilYear = Number(values.until);
    const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
    const result = compareData(readJson(momentFile), readJson(ourFile), {
        untilYear,
        expected: readJson(EXPECTED_FILE).zones,
    });
    console.log(formatReport(result, { untilYear }).join('\n'));
    process.exitCode = isSuccess(result) ? 0 : 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}

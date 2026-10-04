#!/usr/bin/env node
/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/**
 * Compares the standard offsets of generated unpacked tzdb data with java.time's
 * ZoneRules.getStandardOffset, at the start of every period up to the end of `--until`
 * (default 2499). Needs `java` (11 or later) on the PATH, see StandardOffsetCheck.java.
 *
 * Usage: npm run standard-offsets -- <ours-unpacked.json> [--until <year>]
 *
 * Use a JDK whose tzdb version equals the generated data's version; both versions are printed.
 * Exits with 1 when a standard offset differs. Differences of zones listed in
 * standard-offsets-expected.json are reported separately as expected, and zones that java.time
 * doesn't know are only listed.
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const SCRIPTS_DIR = path.dirname(fileURLToPath(import.meta.url));
const JAVA_PROGRAM = path.join(SCRIPTS_DIR, 'StandardOffsetCheck.java');
const EXPECTED_FILE = path.join(SCRIPTS_DIR, 'standard-offsets-expected.json');

/**
 * One query per period that starts before the end of `untilYear`: the period's start, or for the first
 * period the millisecond before its end (the epoch for a zone with a single period).
 *
 * @param {{zones: {name: string, untils: (number|null)[], stdOffsets: number[]}[]}} data
 * @param {number} untilYear
 * @return {{zone: string, time: number, stdoff: number}[]} `stdoff` in seconds east
 */
export function createQueries(data, untilYear) {
    const limit = Date.UTC(untilYear + 1, 0, 1);
    const queries = [];
    for (const zone of data.zones) {
        if (zone.stdOffsets == null) {
            throw new Error(`Zone ${zone.name} has no stdOffsets`);
        }
        zone.untils.forEach((until, i) => {
            const time = i > 0 ? zone.untils[i - 1] : (until == null ? 0 : until - 1);
            if (time < limit) {
                queries.push({ zone: zone.name, time, stdoff: Math.round(-zone.stdOffsets[i] * 60) || 0 });
            }
        });
    }
    return queries;
}

/**
 * @param {string} output - stdout of StandardOffsetCheck.java
 * @return {{javaVersion: string, unknown: string[], diffs: {zone: string, time: number, java: number, ours: number}[]}}
 */
export function parseOutput(output) {
    const result = { javaVersion: null, unknown: [], diffs: [] };
    for (const line of output.split('\n').filter((l) => l !== '')) {
        const [kind, ...fields] = line.split('\t');
        if (kind === 'tzdb') {
            result.javaVersion = fields[0];
        } else if (kind === 'unknown') {
            result.unknown.push(fields[0]);
        } else if (kind === 'diff') {
            const [zone, time, java, ours] = fields;
            result.diffs.push({ zone, time: Number(time), java: Number(java), ours: Number(ours) });
        }
    }
    return result;
}

/**
 * Groups the differences by zone and splits them into unexpected and expected ones.
 *
 * @param {{diffs: object[]}} result - see parseOutput
 * @param {Object<string, string>} expected - zone name to reason
 * @return {{unexpected: {zone: string, diffs: object[]}[], expected: {zone: string, diffs: object[], reason: string}[]}}
 */
export function classify(result, expected = {}) {
    const byZone = new Map();
    for (const diff of result.diffs) {
        byZone.set(diff.zone, [...(byZone.get(diff.zone) || []), diff]);
    }
    const classified = { unexpected: [], expected: [] };
    for (const [zone, diffs] of byZone) {
        const reason = expected[zone];
        (reason != null ? classified.expected : classified.unexpected).push({ zone, diffs, reason });
    }
    return classified;
}

/**
 * @return {string[]} report lines
 */
export function formatReport(result, classified, { version, untilYear, queryCount, maxDiffsPerZone = 5 }) {
    const versionNote = version === result.javaVersion ? '' : ' (differences in zones changed between them are expected)';
    const lines = [
        `Standard offset check against java.time up to the end of ${untilYear}: ${queryCount} periods`,
        `tzdb version: generated ${version}, java.time ${result.javaVersion}${versionNote}`,
    ];
    const zoneLines = ({ diffs }) => [
        ...diffs.slice(0, maxDiffsPerZone).map(({ time, java, ours }) =>
            `    ${new Date(time).toISOString()}: java.time ${java}s, ours ${ours}s (seconds east)`),
        ...(diffs.length > maxDiffsPerZone ? [`    … ${diffs.length - maxDiffsPerZone} more`] : []),
    ];
    lines.push(`Unexpected differences: ${classified.unexpected.length} zone(s)`);
    for (const entry of classified.unexpected) {
        lines.push(`  ${entry.zone}`, ...zoneLines(entry));
    }
    lines.push(`Expected differences: ${classified.expected.length} zone(s)`);
    for (const entry of classified.expected) {
        lines.push(`  ${entry.zone} (${entry.reason})`, ...zoneLines(entry));
    }
    lines.push(`Unknown to java.time: ${result.unknown.length ? result.unknown.join(', ') : 'none'}`);
    return lines;
}

function main() {
    const { values, positionals } = parseArgs({
        allowPositionals: true,
        options: { until: { type: 'string', default: '2499' } },
    });
    if (positionals.length !== 1) {
        console.error('Usage: npm run standard-offsets -- <ours-unpacked.json> [--until <year>]');
        process.exitCode = 2;
        return;
    }
    const data = JSON.parse(fs.readFileSync(positionals[0], 'utf8'));
    const untilYear = Number(values.until);
    const queries = createQueries(data, untilYear);
    const input = queries.map(({ zone, time, stdoff }) => `${zone}\t${time}\t${stdoff}`).join('\n');
    const java = spawnSync('java', [JAVA_PROGRAM], { input, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
    if (java.error != null || java.status !== 0) {
        console.error(`Running java failed: ${java.error ? java.error.message : java.stderr}`);
        process.exitCode = 2;
        return;
    }
    const result = parseOutput(java.stdout);
    const classified = classify(result, JSON.parse(fs.readFileSync(EXPECTED_FILE, 'utf8')).zones);
    const options = { version: data.version, untilYear, queryCount: queries.length };
    console.log(formatReport(result, classified, options).join('\n'));
    process.exitCode = classified.unexpected.length === 0 ? 0 : 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}

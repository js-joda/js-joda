import assert from 'node:assert/strict';

import { compareData, compareZone, formatReport } from '../scripts/data-diff.js';

const T1 = Date.UTC(2026, 2, 29, 1);
const T2 = Date.UTC(2026, 9, 25, 1);

const zone = (name, offsets, { abbrs = offsets.map((o) => `X${o}`), isdsts = offsets.map(() => false), untils } = {}) =>
    ({ name, offsets, abbrs, isdsts, untils: untils || [T1, T2, null].slice(3 - offsets.length) });

describe('data-diff', () => {
    it('lists nothing for unchanged zones, also when the periods are split differently', () => {
        const split = zone('A', [-60, -60, -120, -60], { abbrs: ['X-60', 'X-60', 'X-120', 'X-60'], untils: [T1 - 1000, T1, T2, null] });
        assert.deepEqual(compareZone(zone('A', [-60, -120, -60]), split), []);
    });

    it('finds changed offsets, abbreviations and isdst flags', () => {
        const previous = zone('A', [-60, -120, -60]);
        assert.deepEqual(compareZone(previous, zone('A', [-60, -60, -60], { abbrs: ['X-60', 'X-120', 'X-60'] }))
            .map((c) => [c.time, c.key, c.previous, c.next]), [[T1, 'offsets', -120, -60], [T2 - 1, 'offsets', -120, -60]]);
        assert.deepEqual(compareZone(previous, zone('A', [-60, -120, -60], { abbrs: ['X-60', 'Y', 'X-60'] }))
            .map((c) => c.key), ['abbrs', 'abbrs']);
        assert.deepEqual(compareZone(previous, zone('A', [-60, -120, -60], { isdsts: [false, true, false] }))
            .map((c) => c.key), ['isdsts', 'isdsts']);
    });

    it('finds changed standard offsets, and skips them when one side has none', () => {
        const withStd = (stdOffsets) => ({ ...zone('A', [-60, -120, -60]), stdOffsets });
        assert.deepEqual(compareZone(withStd([-60, -60, -60]), withStd([-60, 0, -60]))
            .map((c) => [c.time, c.key, c.previous, c.next]), [[T1, 'stdOffsets', -60, 0], [T2 - 1, 'stdOffsets', -60, 0]]);
        assert.deepEqual(compareZone(zone('A', [-60, -120, -60]), withStd([-60, 0, -60])), []);
    });

    it('reports changed, added and removed zones', () => {
        const result = compareData(
            { version: '2026d', zones: [zone('A', [-60]), zone('B', [-60]), zone('C', [0])] },
            { version: '2026e', zones: [zone('A', [-60]), zone('B', [-120]), zone('D', [0])] }
        );
        assert.deepEqual(result.changed.map((c) => c.name), ['B']);
        assert.deepEqual([result.added, result.removed], [['D'], ['C']]);
        const report = formatReport(result, { previousVersion: '2026d', nextVersion: '2026e' });
        assert.deepEqual(report.slice(0, 2), ['Changes from 2026d to 2026e', 'Changed zones: 1']);
        assert.ok(report.includes('Added zones: D'));
        assert.ok(report.includes('Removed zones: C'));
    });
});

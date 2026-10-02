import assert from 'node:assert/strict';

import { compareData, compareZone, formatReport, isSuccess, offsetAt } from '../scripts/parity.js';

const T1 = Date.UTC(2020, 2, 1);
const T2 = Date.UTC(2020, 9, 1);

const zone = (name, offsets, untils = [T1, T2, null]) => ({ name, offsets, untils, abbrs: offsets.map(() => 'X') });

describe('parity', () => {
    it('resolves the offset at an instant', () => {
        const z = zone('A', [-60, -120, -60]);
        assert.equal(offsetAt(z, T1 - 1), -60);
        assert.equal(offsetAt(z, T1), -120);
        assert.equal(offsetAt(z, T2 + 1), -60);
    });

    it('treats equal data as equal, also when periods are split differently', () => {
        const split = { name: 'A', offsets: [-60, -60, -120, -60], untils: [T1 - 1000, T1, T2, null] };
        assert.deepEqual(compareZone(zone('A', [-60, -120, -60]), split, 2037), []);
    });

    it('finds an offset difference at a transition', () => {
        const diffs = compareZone(zone('A', [-60, -120, -60]), zone('A', [-60, -180, -60]), 2037);
        assert.deepEqual(diffs.map((d) => [d.time, d.moment, d.ours]), [[T1, -120, -180], [T2 - 1, -120, -180]]);
    });

    it('ignores transitions after the until year', () => {
        assert.deepEqual(compareZone(zone('A', [-60, -120, -60]), zone('A', [-60, -180, -60]), 2019), []);
    });

    it('splits unexpected, expected, missing and extra zones', () => {
        const momentData = { zones: [zone('Equal', [0, 60, 0]), zone('Known', [0, 60, 0]), zone('Bad', [0, 60, 0]), zone('Gone', [0, 60, 0])] };
        const ourData = { zones: [zone('Equal', [0, 60, 0]), zone('Known', [0, 0, 0]), zone('Bad', [0, 30, 0]), zone('Factory', [0, 0, 0])] };
        const result = compareData(momentData, ourData, { untilYear: 2037, expected: { Known: 'rearguard' } });
        assert.deepEqual(result.unexpected.map((e) => e.name), ['Bad']);
        assert.deepEqual(result.expected.map((e) => [e.name, e.reason]), [['Known', 'rearguard']]);
        assert.deepEqual(result.missing, ['Gone']);
        assert.deepEqual(result.extra, ['Factory']);
        assert.equal(isSuccess(result), false);
        const report = formatReport(result, { untilYear: 2037 }).join('\n');
        assert.match(report, /Unexpected differences: 1 zone\(s\)\n {2}Bad\n/);
        assert.match(report, /Known \(rearguard\)/);
    });

    it('succeeds when only expected differences remain', () => {
        const result = compareData({ zones: [zone('Known', [0, 60, 0])] }, { zones: [zone('Known', [0, 0, 0])] },
            { untilYear: 2037, expected: { Known: 'rearguard' } });
        assert.equal(isSuccess(result), true);
    });
});

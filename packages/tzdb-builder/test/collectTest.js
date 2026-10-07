import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { assignStandardOffsets, collectZone, toOffsetMinutesWest } from '../src/collect.js';
import { parseTzif } from '../src/tzif.js';
import { parseZiZones } from '../src/zi.js';
import { collectFixture as collectFixtureWithStdOffsets } from './fixtureZones.js';

const fixtureDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'zoneinfo');
const collectFixture = (name) => collectZone(name, parseTzif(fs.readFileSync(path.join(fixtureDir, name))));

// index of the period that contains epoch millisecond `time`
const periodAt = (zone, time) => zone.untils.findIndex((until) => until == null || until > time);

describe('collect', () => {
    it('converts offsets to minutes west', () => {
        assert.equal(toOffsetMinutesWest(3600), -60);
        assert.equal(toOffsetMinutesWest(3208), -53.4667);
        assert.ok(Object.is(toOffsetMinutesWest(0), 0));
    });

    it('collects the Europe/Berlin 2026 periods', () => {
        const zone = collectFixture('Europe/Berlin');
        const springForward = Date.UTC(2026, 2, 29, 1);
        const i = periodAt(zone, springForward - 1);
        assert.deepEqual(
            [zone.abbrs[i], zone.offsets[i], zone.isdsts[i], zone.untils[i]],
            ['CET', -60, false, springForward]
        );
        assert.deepEqual(
            [zone.abbrs[i + 1], zone.offsets[i + 1], zone.isdsts[i + 1], zone.untils[i + 1]],
            ['CEST', -120, true, Date.UTC(2026, 9, 25, 1)]
        );
        assert.equal(zone.abbrs[0], 'LMT');
        // the footer rule is expanded up to 2499, then the last period is open-ended
        assert.equal(zone.untils[zone.untils.length - 2], Date.UTC(2499, 9, 25, 1));
        assert.equal(zone.untils[zone.untils.length - 1], null);
        assert.deepEqual([zone.abbrs[zone.abbrs.length - 1], zone.isdsts[zone.isdsts.length - 1]], ['CET', false]);
    });

    it('collects Etc/GMT-2 as a single open-ended period', () => {
        assert.deepEqual(collectFixture('Etc/GMT-2'), {
            name: 'Etc/GMT-2', abbrs: ['+02'], untils: [null], offsets: [-120], isdsts: [false],
        });
    });

    it('marks Europe/Dublin summer time as DST (rearguard)', () => {
        const zone = collectFixture('Europe/Dublin');
        const summer = periodAt(zone, Date.UTC(2026, 6, 1));
        const winter = periodAt(zone, Date.UTC(2026, 0, 1));
        assert.deepEqual([zone.abbrs[summer], zone.offsets[summer], zone.isdsts[summer]], ['IST', -60, true]);
        assert.deepEqual([zone.abbrs[winter], zone.offsets[winter], zone.isdsts[winter]], ['GMT', 0, false]);
    });

    it('merges only periods with equal abbreviation, offset and isdst', () => {
        const types = [
            { utoff: 3600, isdst: false, abbr: 'XST' },
            { utoff: 3600, isdst: true, abbr: 'XST' },
        ];
        const zone = collectZone('Test/Zone', {
            types,
            transitions: [{ time: 100, type: 0 }, { time: 200, type: 1 }, { time: 300, type: 1 }],
        });
        assert.deepEqual(zone, {
            name: 'Test/Zone', abbrs: ['XST', 'XST'], untils: [200000, null], offsets: [-60, -60], isdsts: [false, true],
        });
    });

    describe('assignStandardOffsets', () => {
        const H = 3600000;
        const T = Date.UTC(2000, 6, 1); // 2000-07-01T00:00:00Z

        // windows of a synthetic zone from its continuation lines (STDOFF RULES FORMAT [UNTIL])
        const windows = (...lines) => parseZiZones(`Zone Test/Zone ${lines.join('\n\t\t\t')}\n`)['Test/Zone'];
        // a collected zone from [abbr, offset in minutes west, isdst, until] periods
        const zone = (...periods) => ({
            name: 'Test/Zone',
            abbrs: periods.map((p) => p[0]),
            offsets: periods.map((p) => p[1]),
            isdsts: periods.map((p) => p[2]),
            untils: periods.map((p) => p[3]),
        });
        const periodsOf = (z) => z.abbrs.map((abbr, i) => [abbr, z.offsets[i], z.isdsts[i], z.untils[i], z.stdOffsets[i]]);

        it('takes the standard offset of Europe/Moscow 1991 from the Zone lines', () => {
            const moscow = collectFixtureWithStdOffsets('Europe/Moscow');
            const i = periodAt(moscow, Date.UTC(1991, 5, 1));
            assert.deepEqual([moscow.offsets[i], moscow.isdsts[i], moscow.stdOffsets[i]], [-180, true, -120]);
        });

        it('takes the standard offset of Europe/Paris during double summer time 1944', () => {
            const paris = collectFixtureWithStdOffsets('Europe/Paris');
            const i = periodAt(paris, Date.UTC(1944, 8, 1));
            assert.deepEqual([paris.offsets[i], paris.isdsts[i], paris.stdOffsets[i]], [-120, true, 0]);
        });

        it('gives Europe/Berlin and Etc/GMT-2 their standard offsets', () => {
            const berlin = collectFixtureWithStdOffsets('Europe/Berlin');
            const summer = periodAt(berlin, Date.UTC(2026, 6, 1));
            assert.deepEqual([berlin.stdOffsets[summer - 1], berlin.stdOffsets[summer]], [-60, -60]);
            assert.deepEqual(collectFixtureWithStdOffsets('Etc/GMT-2').stdOffsets, [-120]);
        });

        it('changes the standard offset at a period boundary (wall clock window end)', () => {
            // like ThreeTen-Backport's test_combined_windowChangeDuringDST: the window ends at 02:00 wall
            // clock time, exactly when DST starts at 01:00Z (the offset before the end, +01:00, applies)
            const z = zone(['A', -60, false, T + H], ['B', -120, true, T + 5 * H], ['C', -60, false, null]);
            const result = assignStandardOffsets(z, windows('1:00 - A 2000 Jul 1 2:00', '0:00 - B'));
            assert.deepEqual(periodsOf(result), [
                ['A', -60, false, T + H, -60], ['B', -120, true, T + 5 * H, 0], ['C', -60, false, null, 0],
            ]);
        });

        it('splits a period where only the standard offset changes', () => {
            // like Europe/Paris on 1944-08-25: +02:00 stays, but the standard offset changes from +01:00 to Z
            const z = zone(['A', -60, false, T], ['S', -120, true, T + 10 * H], ['C', -60, false, null]);
            const result = assignStandardOffsets(z, windows('1:00 - A 2000 Jul 1 5:00', '0:00 - S'));
            assert.deepEqual(periodsOf(result), [
                ['A', -60, false, T, -60],
                ['S', -120, true, T + 3 * H, -60],
                ['S', -120, true, T + 10 * H, 0],
                ['C', -60, false, null, 0],
            ]);
        });

        it('does not split a period at a window end without a standard offset change', () => {
            // like test_combined_windowChangeWithinDST: the window ends during DST, STDOFF stays the same
            const z = zone(['A', -60, false, T], ['S', -120, true, T + 10 * H], ['C', -60, false, null]);
            const result = assignStandardOffsets(z, windows('1:00 - A 2000 Jul 1 5:00', '1:00 - S'));
            assert.deepEqual(result.stdOffsets, [-60, -60, -60]);
            assert.deepEqual(result.untils, z.untils);
        });

        it('converts window ends in standard time and UTC', () => {
            const z = zone(['A', -60, false, T], ['S', -120, true, T + 10 * H], ['C', -60, false, null]);
            // 05:00 standard time (+01:00) is 04:00Z, 05:00 UTC is 05:00Z
            assert.equal(assignStandardOffsets(z, windows('1:00 - A 2000 Jul 1 5:00s', '0:00 - S')).untils[1], T + 4 * H);
            assert.equal(assignStandardOffsets(z, windows('1:00 - A 2000 Jul 1 5:00u', '0:00 - S')).untils[1], T + 5 * H);
        });

        it('like test_combined_endsInSavings: the last window keeps the standard offset of its Zone line', () => {
            const z = zone(['A', 0, false, T], ['S', -120, true, null]);
            const result = assignStandardOffsets(z, windows('0:00 - A 2000 Jul 1', '1:00 1:00 S'));
            assert.deepEqual(periodsOf(result), [['A', 0, false, T, 0], ['S', -120, true, null, -60]]);
        });

        it('fails when a wall clock window end falls into a gap', () => {
            const z = zone(['A', -60, false, T + H], ['B', -120, true, null]);
            // 02:30 wall clock time doesn't exist: clocks go from 02:00 to 03:00 at 01:00Z
            assert.throws(() => assignStandardOffsets(z, windows('1:00 - A 2000 Jul 1 2:30', '0:00 - B')),
                /Standard offsets of Test\/Zone: window 0: no period contains the wall clock time 2000-07-01T02:30:00.000Z/);
        });

        it('fails without Zone lines, and for windows out of order', () => {
            const z = zone(['A', -60, false, null]);
            assert.throws(() => assignStandardOffsets(z, undefined), /Standard offsets of Test\/Zone: no Zone lines/);
            assert.throws(() => assignStandardOffsets(z, windows('1:00 - A 2001', '1:00 - A 2000', '1:00 - A')),
                /window 1 ends at or before window 0/);
        });

        it('checks the standard offset of the footer, unless it has DST all year', () => {
            const z = zone(['A', -60, false, null]);
            assert.equal(assignStandardOffsets(z, windows('1:00 - A'), 'CET-1CEST,M3.5.0,M10.5.0/3').stdOffsets[0], -60);
            assert.throws(() => assignStandardOffsets(z, windows('1:00 - A'), 'EET-2EEST,M3.5.0,M10.5.0/3'),
                /the footer 'EET-2EEST,M3.5.0,M10.5.0\/3' has the standard offset 7200s, the last Zone line 3600s/);
            // Africa/Casablanca in 2026b: +01 all year, written as DST all year with a placeholder standard offset
            assert.equal(assignStandardOffsets(z, windows('0:00 - A'), 'XXX-2<+01>-1,0/0,J365/23').stdOffsets[0], 0);
        });
    });
});

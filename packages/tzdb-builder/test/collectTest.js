import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { collectZone, toOffsetMinutesWest } from '../src/collect.js';
import { parseTzif } from '../src/tzif.js';

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
});

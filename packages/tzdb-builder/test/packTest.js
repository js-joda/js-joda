import assert from 'node:assert/strict';

import { createLinks, filterLinkPack, filterYears, pack, packBase60 } from '../src/pack.js';
import { collectFixture } from './fixtureZones.js';
import { unpack } from './unpackHelper.js';

const zone = (name, offsets, isdsts = offsets.map(() => false), stdOffsets = offsets) => ({
    name,
    abbrs: offsets.map((o) => `X${o}`),
    untils: [...offsets.slice(1).map((_, i) => Date.UTC(2000 + i, 0, 1)), null],
    offsets,
    isdsts,
    stdOffsets,
});

describe('pack', () => {
    it('packs base 60 numbers like moment-timezone', () => {
        // offsets are rounded to whole seconds before packing: Africa/Abidjan LMT 16.1333 minutes = 968 seconds
        assert.equal(packBase60(968 / 60, 1), 'g.8');
        assert.equal(packBase60(-60, 1), '-10');
        assert.equal(packBase60(0, 1), '0');
        assert.equal(packBase60(-0.5, 1), '-.u');
        assert.equal(packBase60(11, 0), 'b');
    });

    it('packs Europe/Berlin with an empty population field, isdst flags and standard offsets', () => {
        const fields = pack(collectFixture('Europe/Berlin')).split('|');
        assert.equal(fields.length, 8);
        assert.deepEqual(fields.slice(0, 3), ['Europe/Berlin', 'LMT CET CEST CEMT', '-R.s -10 -20 -30']);
        assert.equal(fields[5], '');
        assert.equal(fields[6], '0011');
        assert.equal(fields[7], '-R.s -10 -10 -10');
    });

    it('keeps period types with equal abbreviation and offset but different isdst apart', () => {
        const fields = pack(zone('Test/Split', [180, 180, 180], [false, true, false], [180, 240, 180])).split('|');
        assert.deepEqual([fields[1], fields[2], fields[3], fields[6], fields[7]], ['X180 X180', '30 30', '010', '01', '30 40']);
    });

    it('keeps period types that differ only in the standard offset apart', () => {
        const fields = pack(zone('Test/Split', [-120, -120], [true, true], [-60, 0])).split('|');
        assert.deepEqual([fields[1], fields[2], fields[3], fields[6], fields[7]], ['X-120 X-120', '-20 -20', '01', '11', '-10 0']);
    });

    it('fails for a zone without standard offsets', () => {
        const { stdOffsets, ...withoutStdOffsets } = zone('Test/Zone', [60]);
        assert.equal(stdOffsets.length, 1);
        assert.throws(() => pack(withoutStdOffsets), /Missing stdOffsets in zone Test\/Zone/);
    });

    it('round-trips through @js-joda/timezone unpack.js', () => {
        for (const name of ['Europe/Berlin', 'Europe/Dublin', 'America/Santiago', 'Etc/GMT-2']) {
            const source = collectFixture(name);
            const unpacked = unpack(pack(source));
            assert.equal(unpacked.name, name);
            assert.deepEqual(unpacked.abbrs, source.abbrs, name);
            assert.deepEqual(unpacked.offsets, source.offsets.map((o) => Math.round(o * 60) / 60), name);
            assert.deepEqual(unpacked.untils.slice(0, -1), source.untils.slice(0, -1), name);
            assert.equal(unpacked.untils[unpacked.untils.length - 1], Infinity);
        }
    });

    it('packs every fixture zone into eight fields', () => {
        for (const name of ['Africa/Casablanca', 'America/New_York', 'America/Nuuk', 'Asia/Gaza', 'Asia/Jerusalem',
            'Australia/Lord_Howe', 'Australia/Sydney', 'Pacific/Chatham']) {
            assert.equal(pack(collectFixture(name)).split('|').length, 8, name);
        }
    });

    it('filters the periods that overlap a year range', () => {
        const z = zone('Test/Zone', [0, 60, 120, 180]); // untils 2000, 2001, 2002, open
        assert.deepEqual(filterYears(z, 2001, 2001), {
            name: 'Test/Zone',
            abbrs: ['X60', 'X120'],
            untils: [Date.UTC(2001, 0, 1), null],
            offsets: [60, 120],
            isdsts: [false, false],
            stdOffsets: [60, 120],
        });
        assert.deepEqual(filterYears(z, 2010, 2020).offsets, [180]);
    });

    it('links identical zones with the Zone-line name as leader, then lexicographic', () => {
        const zones = [
            { ...zone('Europe/Kiev', [-120]) },
            { ...zone('Europe/Kyiv', [-120]) },
            { ...zone('Europe/Zaporozhye', [-120]) },
            { ...zone('Etc/A', [60]) },
            { ...zone('Etc/B', [60]) },
        ];
        const result = createLinks(zones, new Set(['Europe/Kyiv']));
        assert.deepEqual(result.zones.map((z) => z.name), ['Etc/A', 'Europe/Kyiv']);
        assert.deepEqual(result.links, ['Etc/A|Etc/B', 'Europe/Kyiv|Europe/Kiev', 'Europe/Kyiv|Europe/Zaporozhye']);
    });

    it('does not link zones that differ only in isdst', () => {
        const result = createLinks([zone('A/A', [60, 0], [true, false]), zone('A/B', [60, 0], [false, false])], new Set());
        assert.deepEqual(result.links, []);
    });

    it('does not link zones that differ only in the standard offset', () => {
        const result = createLinks([
            zone('A/A', [-120, -60], [true, false], [-60, -60]),
            zone('A/B', [-120, -60], [true, false], [0, -60]),
        ], new Set());
        assert.deepEqual(result.links, []);
    });

    it('filters, links and packs unpacked data', () => {
        const packed = filterLinkPack({ version: '2026a', zones: [zone('B/B', [60]), zone('A/A', [60])] }, 0, 9999, new Set(['B/B']));
        assert.deepEqual(packed, { version: '2026a', zones: ['B/B|X60|10|0|||0|10'], links: ['B/B|A/A'] });
    });
});

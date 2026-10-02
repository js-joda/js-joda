import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expandTransitions, parsePosixTz } from '../src/posixTz.js';
import { parseTzif } from '../src/tzif.js';

const fixtureDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'zoneinfo');
const readFixture = (name) => parseTzif(fs.readFileSync(path.join(fixtureDir, name)));

const utc = (...args) => Date.UTC(...args) / 1000;
const iso = (seconds) => new Date(seconds * 1000).toISOString().replace('.000', '');

// transitions of `tz` in the UTC year `year`, as [ISO time, abbreviation, isdst]
function transitionsIn(text, year) {
    return expandTransitions(parsePosixTz(text), utc(year, 0, 1) - 1, year)
        .map(({ time, type }) => [iso(time), type.abbr, type.isdst]);
}

describe('posixTz', () => {
    describe('parsePosixTz', () => {
        it('parses a fixed offset with a quoted name and minutes', () => {
            assert.deepEqual(parsePosixTz('<+0530>-5:30'), { std: { abbr: '+0530', utoff: 19800 } });
            assert.deepEqual(parsePosixTz('<-03>3'), { std: { abbr: '-03', utoff: -10800 } });
            assert.ok(Object.is(parsePosixTz('GMT0').std.utoff, 0));
        });

        it('parses rules with defaults for the DST offset and the rule time', () => {
            assert.deepEqual(parsePosixTz('EST5EDT,M3.2.0,M11.1.0'), {
                std: { abbr: 'EST', utoff: -18000 },
                dst: {
                    abbr: 'EDT',
                    utoff: -14400,
                    start: { kind: 'M', month: 3, week: 2, day: 0, time: 7200 },
                    end: { kind: 'M', month: 11, week: 1, day: 0, time: 7200 },
                },
            });
        });

        it('parses explicit DST offsets, negative and long rule times, J and n rules', () => {
            const tz = parsePosixTz('<+1245>-12:45<+1345>,M9.5.0/2:45,M4.1.0/3:45');
            assert.equal(tz.dst.utoff, 49500);
            assert.equal(tz.dst.start.time, 9900);
            assert.equal(parsePosixTz('<-02>2<-01>,M3.5.0/-1,M10.5.0/0').dst.start.time, -3600);
            assert.equal(parsePosixTz('EET-2EEST,M3.4.4/50,M10.4.4/50').dst.end.time, 180000);
            assert.deepEqual(parsePosixTz('XXX-2<+01>-1,0/0,J365/23').dst.end, { kind: 'J', day: 365, time: 82800 });
            assert.deepEqual(parsePosixTz('XXX-2<+01>-1,0/0,J365/23').dst.start, { kind: 'n', day: 0, time: 0 });
        });

        it('rejects invalid strings', () => {
            assert.throws(() => parsePosixTz('CET-1CEST'), /expected the start rule/);
            assert.throws(() => parsePosixTz('CET-1CEST,M3.5.0'), /expected the end rule/);
            assert.throws(() => parsePosixTz('CET-1CEST,M3.5.0,M10.5.0/3x'), /unexpected 'x'/);
            assert.throws(() => parsePosixTz('1'), /expected a name/);
        });
    });

    describe('expandTransitions', () => {
        it('expands a northern hemisphere zone (America/New_York 2038)', () => {
            assert.deepEqual(transitionsIn('EST5EDT,M3.2.0,M11.1.0', 2038), [
                ['2038-03-14T07:00:00Z', 'EDT', true],
                ['2038-11-07T06:00:00Z', 'EST', false],
            ]);
        });

        it('expands a southern hemisphere zone (Australia/Sydney 2038)', () => {
            assert.deepEqual(transitionsIn('AEST-10AEDT,M10.1.0,M4.1.0/3', 2038), [
                ['2038-04-03T16:00:00Z', 'AEST', false],
                ['2038-10-02T16:00:00Z', 'AEDT', true],
            ]);
        });

        it('handles rule times of 24h and more (America/Santiago, Asia/Jerusalem)', () => {
            assert.deepEqual(transitionsIn('<-04>4<-03>,M9.1.6/24,M4.1.6/24', 2038), [
                ['2038-04-04T03:00:00Z', '-04', false],
                ['2038-09-05T04:00:00Z', '-03', true],
            ]);
            assert.deepEqual(transitionsIn('IST-2IDT,M3.4.4/26,M10.5.0', 2038)[0], ['2038-03-26T00:00:00Z', 'IDT', true]);
        });

        it('handles negative and minute rule times (America/Nuuk, Pacific/Chatham)', () => {
            assert.deepEqual(transitionsIn('<-02>2<-01>,M3.5.0/-1,M10.5.0/0', 2038), [
                ['2038-03-28T01:00:00Z', '-01', true],
                ['2038-10-31T01:00:00Z', '-02', false],
            ]);
            assert.deepEqual(transitionsIn('<+1245>-12:45<+1345>,M9.5.0/2:45,M4.1.0/3:45', 2038)[1],
                ['2038-09-25T14:00:00Z', '+1345', true]);
        });

        it('counts February 29 for n rules but not for J rules', () => {
            // the end rule is in DST local time (+01): March 1 00:00 local is February 29 23:00 UTC
            assert.deepEqual(transitionsIn('AAA0BBB,59/0,J60/0', 2040), [
                ['2040-02-29T00:00:00Z', 'BBB', true],
                ['2040-02-29T23:00:00Z', 'AAA', false],
            ]);
        });

        it('returns nothing for a fixed offset or daylight saving time all year', () => {
            assert.deepEqual(expandTransitions(parsePosixTz('<+0530>-5:30'), utc(2038, 0, 1)), []);
            assert.deepEqual(expandTransitions(parsePosixTz('XXX-2<+01>-1,0/0,J365/23'), utc(2087, 5, 1)), []);
        });

        it('stops at the end of the last year and starts after the given instant', () => {
            const tz = parsePosixTz('EST5EDT,M3.2.0,M11.1.0');
            const transitions = expandTransitions(tz, utc(2037, 10, 1, 6));
            assert.equal(iso(transitions[0].time), '2038-03-14T07:00:00Z');
            assert.equal(iso(transitions[transitions.length - 1].time), '2499-11-01T06:00:00Z');
            assert.equal(transitions.length, (2499 - 2038 + 1) * 2);
        });

        it('reproduces the explicit transitions zic writes for 2030–2037', () => {
            const regularZones = ['America/New_York', 'America/Nuuk', 'America/Santiago', 'Asia/Jerusalem',
                'Australia/Lord_Howe', 'Australia/Sydney', 'Europe/Berlin', 'Europe/Dublin', 'Pacific/Chatham'];
            for (const name of regularZones) {
                const tzif = readFixture(name);
                const explicit = tzif.transitions
                    .filter(({ time }) => time >= utc(2030, 0, 1))
                    .map(({ time, type }) => ({ time, type: tzif.types[type] }));
                const expanded = expandTransitions(parsePosixTz(tzif.footer), utc(2030, 0, 1) - 1, 2037);
                assert.deepEqual(expanded, explicit, name);
            }
        });
    });
});

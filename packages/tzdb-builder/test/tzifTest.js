import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseTzif } from '../src/tzif.js';

const fixtureDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'zoneinfo');
const readFixture = (name) => parseTzif(fs.readFileSync(path.join(fixtureDir, name)));

// type that applies at epoch second `time`
function typeAt(tzif, time) {
    let type = tzif.types[0];
    for (const transition of tzif.transitions) {
        if (transition.time > time) {
            break;
        }
        type = tzif.types[transition.type];
    }
    return type;
}

describe('parseTzif', () => {
    it('reads a fixed offset zone without transitions', () => {
        const tzif = readFixture('Etc/GMT-2');
        assert.equal(tzif.version, 2);
        assert.deepEqual(tzif.transitions, []);
        assert.deepEqual(tzif.types, [{ utoff: 7200, isdst: false, abbr: '+02' }]);
        assert.equal(tzif.footer, '<+02>-2');
    });

    it('reads Europe/Berlin transitions, types and footer', () => {
        const tzif = readFixture('Europe/Berlin');
        assert.deepEqual(tzif.types[0], { utoff: 3208, isdst: false, abbr: 'LMT' });
        const springForward = Date.UTC(2026, 2, 29, 1) / 1000;
        const transition = tzif.transitions.find((t) => t.time === springForward);
        assert.deepEqual(tzif.types[transition.type], { utoff: 7200, isdst: true, abbr: 'CEST' });
        assert.deepEqual(typeAt(tzif, springForward - 1), { utoff: 3600, isdst: false, abbr: 'CET' });
        // -b fat writes explicit transitions up to 2037
        const last = tzif.transitions[tzif.transitions.length - 1];
        assert.equal(new Date(last.time * 1000).getUTCFullYear(), 2037);
        assert.equal(tzif.footer, 'CET-1CEST,M3.5.0,M10.5.0/3');
    });

    it('reads Europe/Dublin with rearguard semantics (summer is DST)', () => {
        const tzif = readFixture('Europe/Dublin');
        assert.deepEqual(typeAt(tzif, Date.UTC(2026, 6, 1) / 1000), { utoff: 3600, isdst: true, abbr: 'IST' });
        assert.deepEqual(typeAt(tzif, Date.UTC(2026, 0, 1) / 1000), { utoff: 0, isdst: false, abbr: 'GMT' });
        assert.equal(tzif.footer, 'GMT0IST,M3.5.0/1,M10.5.0');
    });

    it('rejects non TZif input', () => {
        assert.throws(() => parseTzif(Buffer.from('not a tzif file, but long enough to have a header....')), /Not a TZif file/);
    });
});

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { collectZone } from '../src/collect.js';
import { parseTzif } from '../src/tzif.js';
import { GOLDEN_WINDOWS, GOLDEN_ZONES, sliceYears } from './fixtures/extractGolden.js';

const fixtureDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures');
const golden = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'moment-2026a-golden.json'), 'utf8'));

// moment-timezone merges periods on abbreviation and offset only, without isdst
function mergeLikeMoment(zone) {
    const merged = { abbrs: [], untils: [], offsets: [] };
    zone.abbrs.forEach((abbr, i) => {
        const last = merged.abbrs.length - 1;
        if (last >= 0 && merged.abbrs[last] === abbr && merged.offsets[last] === zone.offsets[i]) {
            merged.untils[last] = zone.untils[i];
            return;
        }
        merged.abbrs.push(abbr);
        merged.untils.push(zone.untils[i]);
        merged.offsets.push(zone.offsets[i]);
    });
    return merged;
}

// golden data: moment-timezone 2026a (zdump), see fixtures/extractGolden.js
describe('golden: expansion up to 2499 equals moment-timezone 2026a', () => {
    for (const name of GOLDEN_ZONES) {
        it(name, () => {
            const tzif = parseTzif(fs.readFileSync(path.join(fixtureDir, 'zoneinfo', name)));
            const zone = mergeLikeMoment(collectZone(name, tzif));
            GOLDEN_WINDOWS.forEach(([from, to], i) => {
                assert.deepEqual({ from, to, ...sliceYears(zone, from, to) }, golden[name][i], `${name} ${from}-${to}`);
            });
            assert.equal(zone.untils[zone.untils.length - 1], null);
        });
    }
});

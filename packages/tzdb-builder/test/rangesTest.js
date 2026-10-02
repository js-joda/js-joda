import assert from 'node:assert/strict';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { collectZone } from '../src/collect.js';
import { createContext } from '../src/context.js';
import { filterLinkPack } from '../src/pack.js';
import { packedVariants, packStep } from '../src/ranges.js';
import { parseTzif } from '../src/tzif.js';
import { unpack } from './unpackHelper.js';

const fixtureDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'zoneinfo');
const FIXTURE_ZONES = ['America/New_York', 'Australia/Sydney', 'Europe/Berlin', 'Europe/Dublin', 'Etc/GMT-2'];
const unpackedFixture = () => ({
    version: '2026a',
    zones: FIXTURE_ZONES.map((name) => collectZone(name, parseTzif(fs.readFileSync(path.join(fixtureDir, name))))),
});

const offsetAt = (z, time) => z.offsets[z.untils.findIndex((until) => until > time)];

describe('ranges', () => {
    it('defines the moment-timezone variants plus 4 and 60 year ranges', () => {
        assert.deepEqual(packedVariants(2026), {
            '': [0, 9999],
            '-4-year-range': [2024, 2028],
            '-10-year-range': [2021, 2031],
            '-60-year-range': [1996, 2056],
            '-1970-2030': [1970, 2030],
            '-2012-2022': [2012, 2022],
            '-2017-2027': [2017, 2027],
        });
    });

    it('resolves the same offsets as the full data inside each variant range', () => {
        const unpacked = unpackedFixture();
        const zoneNames = new Set(FIXTURE_ZONES);
        const full = new Map(filterLinkPack(unpacked, 0, 9999, zoneNames).zones.map((s) => [s.split('|')[0], unpack(s)]));
        for (const [suffix, [start, end]] of Object.entries(packedVariants(2026))) {
            const variant = filterLinkPack(unpacked, start, end, zoneNames).zones.map(unpack);
            const first = Date.UTC(Math.max(start, 1900), 0, 1);
            const last = Date.UTC(Math.min(end, 2499) + 1, 0, 1);
            for (const z of variant) {
                for (let time = first; time < last; time += 7 * 86400000 + 3600000) {
                    assert.equal(offsetAt(z, time), offsetAt(full.get(z.name), time), `${suffix} ${z.name} ${new Date(time).toISOString()}`);
                }
            }
        }
    });

    describe('packStep', () => {
        let dir;

        beforeEach(async () => {
            dir = await fsp.mkdtemp(path.join(os.tmpdir(), 'tzdb-builder-'));
        });

        afterEach(async () => {
            await fsp.rm(dir, { recursive: true, force: true });
        });

        it('writes all packed variants and the versioned full data', async () => {
            const ctx = {
                ...createContext({ version: '2026a', cacheDir: dir, timezoneDataDir: dir }),
                unpacked: unpackedFixture(),
                names: { zones: FIXTURE_ZONES, links: {} },
                currentYear: 2026,
            };
            await packStep(ctx);
            const files = (await fsp.readdir(path.join(dir, 'packed'))).sort();
            assert.deepEqual(files, [
                '2026a.json', 'latest-10-year-range.json', 'latest-1970-2030.json', 'latest-2012-2022.json',
                'latest-2017-2027.json', 'latest-4-year-range.json', 'latest-60-year-range.json', 'latest.json',
            ]);
            const latest = await fsp.readFile(path.join(dir, 'packed', 'latest.json'), 'utf8');
            assert.equal(await fsp.readFile(path.join(dir, 'packed', '2026a.json'), 'utf8'), latest);
            assert.ok(latest.startsWith('{\n\t"version": "2026a",'));
            assert.ok(latest.endsWith('}'));
        });
    });
});

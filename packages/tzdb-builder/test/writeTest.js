import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { createContext } from '../src/context.js';
import { serializeUnpacked, writeUnpackedStep } from '../src/write.js';

const unpacked = {
    version: '2026a',
    zones: [{
        stdOffsets: [-120], isdsts: [false], offsets: [-120], untils: [null], abbrs: ['+02'], name: 'Etc/GMT-2', population: 1,
    }],
    links: [],
    countries: [],
};

describe('write-unpacked', () => {
    let dir;

    beforeEach(async () => {
        dir = await fs.mkdtemp(path.join(os.tmpdir(), 'tzdb-builder-'));
    });

    afterEach(async () => {
        await fs.rm(dir, { recursive: true, force: true });
    });

    it('serializes with fixed key order and without countries or population', () => {
        const json = JSON.parse(serializeUnpacked(unpacked));
        assert.deepEqual(Object.keys(json), ['version', 'zones', 'links']);
        assert.deepEqual(Object.keys(json.zones[0]), ['name', 'abbrs', 'untils', 'offsets', 'isdsts', 'stdOffsets']);
    });

    it('writes latest.json and <version>.json byte-identically on every run', async () => {
        const ctx = { ...createContext({ version: '2026a', cacheDir: dir, timezoneDataDir: dir }), unpacked };
        await writeUnpackedStep(ctx);
        const first = await fs.readFile(path.join(dir, 'unpacked', 'latest.json'), 'utf8');
        await writeUnpackedStep(ctx);
        assert.equal(await fs.readFile(path.join(dir, 'unpacked', 'latest.json'), 'utf8'), first);
        assert.equal(await fs.readFile(path.join(dir, 'unpacked', '2026a.json'), 'utf8'), first);
        assert.ok(first.startsWith('{\n  "version": "2026a",'));
    });
});

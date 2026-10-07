import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { assignStandardOffsets, collectZone } from '../src/collect.js';
import { parseTzif } from '../src/tzif.js';
import { parseZiZones } from '../src/zi.js';

const fixtureDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures');
const windows = parseZiZones(fs.readFileSync(path.join(fixtureDir, 'zones.zi'), 'utf8'));

export const readFixtureTzif = (name) => parseTzif(fs.readFileSync(path.join(fixtureDir, 'zoneinfo', name)));

/**
 * Collects a fixture zone like the collect step: periods from the TZif file, standard offsets
 * from fixtures/zones.zi.
 */
export function collectFixture(name) {
    const tzif = readFixtureTzif(name);
    return assignStandardOffsets(collectZone(name, tzif), windows[name], tzif.footer);
}

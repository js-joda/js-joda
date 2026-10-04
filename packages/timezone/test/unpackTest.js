/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import { expect } from 'chai';

import latest from '../src/tzdbData';
import { unpack } from '../src/unpack';

describe('unpack', () => {
    const packedBerlin = latest.zones.find((zone) => zone.startsWith('Europe/Berlin|'));

    it('unpacks the standard offsets of field 7 per period', () => {
        const zone = unpack(packedBerlin);
        expect(zone.stdOffsets.length).to.equal(zone.offsets.length);
        zone.abbrs.forEach((abbr, i) => {
            if (abbr === 'CET' || abbr === 'CEST' || abbr === 'CEMT') {
                expect(zone.stdOffsets[i], `${abbr} at ${i}`).to.equal(-60);
            }
        });
        expect(zone.stdOffsets[0]).to.equal(zone.offsets[0]); // LMT
    });

    it('unpacks zone strings without field 7 without standard offsets', () => {
        const fields = packedBerlin.split('|');
        expect(unpack(fields.slice(0, 7).join('|'))).to.not.have.property('stdOffsets');
        expect(unpack(fields.slice(0, 6).join('|'))).to.not.have.property('stdOffsets');
        expect(unpack(fields.slice(0, 6).join('|')).offsets).to.eql(unpack(packedBerlin).offsets);
    });
});

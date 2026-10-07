/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import { ZoneRules, DateTimeException } from '@js-joda/core';
import { TzdbZoneRules } from '../src/TzdbZoneRules';
import { TzdbZoneRulesProvider } from '../src/TzdbZoneRulesProvider';

import './useTzdbZoneRules';

describe('TzdbZoneRulesProvider', () => {
    context('getRules', () => {
        it('should return an instance of TzdbZoneRules', () => {
            const zoneRules = TzdbZoneRulesProvider.getRules('Europe/Berlin');
            expect(zoneRules).to.be.instanceOf(ZoneRules);
            expect(zoneRules).to.be.instanceOf(TzdbZoneRules);
        });

        it('should return fixed offset and ZoneRegions rules', () => {
            let zoneRules = TzdbZoneRulesProvider.getRules('Europe/Berlin');
            expect(zoneRules.isFixedOffset()).to.be.false;

            zoneRules = TzdbZoneRulesProvider.getRules('Etc/GMT+1');
            expect(zoneRules.isFixedOffset()).to.be.true;
        });

        it('should throw an DateTimeException for an unknown zone region', () => {
            expect(() => TzdbZoneRulesProvider.getRules('Atlantis'))
                .to.throw(DateTimeException);
        });
    });

    context('getAvailableZoneIds', () => {
        it('should list some common zone id\'s', () => {
            const availableZoneIds = TzdbZoneRulesProvider.getAvailableZoneIds();

            expect(availableZoneIds).contain('Australia/Darwin');
            expect(availableZoneIds).contain('America/Argentina/Buenos_Aires');
            expect(availableZoneIds).contain('Europe/Paris');
            expect(availableZoneIds).contain('Asia/Kolkata');
            expect(availableZoneIds).contain('Asia/Ho_Chi_Minh');

            expect(availableZoneIds).contain('Etc/GMT+0');
            expect(availableZoneIds).contain('Etc/GMT-1');
            expect(availableZoneIds).contain('Etc/GMT+10');
        });
    });

    context('getVersion', () => {
        it('should return a string', () => {
            const version = TzdbZoneRulesProvider.getVersion();

            expect(version).to.be.a('string');
        });
    });
});

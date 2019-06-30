/*
 * @copyright (c) 2016-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import { ZoneRules, DateTimeException } from '@js-joda/core';
import { MomentZoneRules } from '../src/MomentZoneRules';
import { MomentZoneRulesProvider } from '../src/MomentZoneRulesProvider';

import './useMomentZoneRules';

describe('MomentZoneRulesProvider', () => {
    context('getRules', () => {
        it('should return an instance of MomentZoneRules', () => {
            const zoneRules = MomentZoneRulesProvider.getRules('Europe/Berlin');
            expect(zoneRules).to.be.instanceOf(ZoneRules);
            expect(zoneRules).to.be.instanceOf(MomentZoneRules);
        });

        it('should return fixed offset and ZoneRegions rules', () => {
            let zoneRules = MomentZoneRulesProvider.getRules('Europe/Berlin');
            expect(zoneRules.isFixedOffset()).to.be.false;

            zoneRules = MomentZoneRulesProvider.getRules('Etc/GMT+1');
            expect(zoneRules.isFixedOffset()).to.be.true;
        });

        it('should throw an DateTimeException for an unknown zone region', () => {
            expect(() => MomentZoneRulesProvider.getRules('Atlantis'))
                .to.throw(DateTimeException);
        });
    });

    context('getAvailableZoneIds', () => {
        it('should list some common zone id\'s', () => {
            const availableZoneIds = MomentZoneRulesProvider.getAvailableZoneIds();

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
            const version = MomentZoneRulesProvider.getVersion();

            expect(version).to.be.a('string');
        });
    });
});

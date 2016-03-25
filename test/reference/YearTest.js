/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {expect} from 'chai';

import '../_init';

import {Year} from '../../src/Year';
import {Clock} from '../../src/Clock';
import {LocalDateTime} from '../../src/LocalDateTime';
import {NullPointerException, DateTimeException} from '../../src/errors';
import {ZoneId} from '../../src/ZoneId';
import {ZoneOffset} from '../../src/ZoneOffset';
import {YearConstants} from '../../src/YearConstants';

describe('org.threeten.bp.temporal.TestYear', () => {
    const TEST_2008 = Year.of(2008);

    //-----------------------------------------------------------------------
    // now()
    //-----------------------------------------------------------------------
    it('now', () => {
        let expected = Year.now(Clock.systemDefaultZone());
        let test = Year.now();
        for (let i = 0; i < 100; i++) {
            if (expected.equals(test)) {
                return;
            }
            expected = Year.now(Clock.systemDefaultZone());
            test = Year.now();
        }
        expect(test).to.eql(expected);
    });
    
    //-----------------------------------------------------------------------
    // now(ZoneId)
    //-----------------------------------------------------------------------
    it('now_ZoneId_nullZoneId', () => {
        expect(() => {
            /* call the "private" overloaded method */
            Year._nowZoneId(null);
        }).to.throw(NullPointerException);
    });

    it('now_ZoneId', () => {
        let zone = ZoneId.of('UTC+01:02:03');
        let expected = Year.now(Clock.system(zone));
        let test = Year.now(zone);
        for (let i = 0; i < 100; i++) {
            if (expected.equals(test)) {
                return;
            }
            expected = Year.now(Clock.system(zone));
            test = Year.now(zone);
        }
        expect(test).to.eql(expected);
    });

    //-----------------------------------------------------------------------
    // now(Clock)
    //-----------------------------------------------------------------------
    it('now_Clock', () => {
        let instant = LocalDateTime.of(2010, 12, 31, 0, 0).toInstant(ZoneOffset.UTC);
        let clock = Clock.fixed(instant, ZoneOffset.UTC);
        let test = Year.now(clock);
        expect(test.value()).to.eql(2010);
    });

    it('now_Clock_nullClock', () => {
        expect(() => {
            /* call the "private" overloaded method */
            Year._nowClock(null);
        }).to.throw(NullPointerException);
    });

    //-----------------------------------------------------------------------
    it('test_factory_int_singleton', () => {
        for (let i = -4; i <= 2104; i++) {
            let test = Year.of(i);
            expect(test.value()).to.eql(i);
            expect(Year.of(i)).to.eql(test);
        }
    });

    it('test_factory_int_tooLow', () => {
        expect(() => {
            Year.of(YearConstants.MIN_VALUE - 1);
        }).to.throw(DateTimeException);
    });

    it('test_factory_int_tooHigh', () => {
        expect(() => {
            Year.of(YearConstants.MAX_VALUE + 1);
        }).to.throw(DateTimeException);
    });

});
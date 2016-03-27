/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {expect} from 'chai';

import '../_init';
import {NullPointerException} from '../../src/errors';

import {Clock} from '../../src/Clock';
import {LocalDateTime} from '../../src/LocalDateTime';
import {Month} from '../../src/Month';
import {MonthDay} from '../../src/MonthDay';
import {ZoneId} from '../../src/ZoneId';
import {ZoneOffset} from '../../src/ZoneOffset';

describe('org.threeten.bp.TestMonthDay', () => {
    //-----------------------------------------------------------------------
    // now()
    //-----------------------------------------------------------------------
    describe('now()', () => {
        it('now', () => {
            let expected = MonthDay.now(Clock.systemDefaultZone());
            let test = MonthDay.now();
            for (let i = 0; i < 100; i++) {
                if (expected.equals(test)) {
                    return;
                }
                expected = MonthDay.now(Clock.systemDefaultZone());
                test = MonthDay.now();
            }
            expect(test).to.eql(expected);
        });
    });

    //-----------------------------------------------------------------------
    // now(ZoneId)
    //-----------------------------------------------------------------------
    describe('now(ZoneId)', () => {
        it('now_ZoneId_nullZoneId', () => {
            expect(() => {
                MonthDay.now(null);
            }).to.throw(NullPointerException);
        });

        it('now_ZoneId', () => {
            let zone = ZoneId.of('UTC+01:02:03');
            let expected = MonthDay.now(Clock.system(zone));
            let test = MonthDay.now(zone);
            for (let i = 0; i < 100; i++) {
                if (expected.equals(test)) {
                    return;
                }
                expected = MonthDay.now(Clock.system(zone));
                test = MonthDay.now(zone);
            }
            expect(test).to.eql(expected);
        });
    });

    //-----------------------------------------------------------------------
    // now(Clock)
    //-----------------------------------------------------------------------
    describe('now(Clock)', () => {
        it('now_Clock', () => {
            let instant = LocalDateTime.of(2010, 12, 31, 0, 0).toInstant(ZoneOffset.UTC);
            let clock = Clock.fixed(instant, ZoneOffset.UTC);
            let test = MonthDay.now(clock);
            expect(test.month()).to.eql(Month.DECEMBER);
            expect(test.dayOfMonth()).to.eql(31);
        });

        it('now_Clock_nullClock', () => {
            expect(() => {
                MonthDay.now(null);
            }).to.throw(NullPointerException);
        });
    });
});


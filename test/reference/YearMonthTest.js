/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {expect} from 'chai';

import '../_init';

import {NullPointerException, DateTimeException, DateTimeParseException} from '../../src/errors';

import {Clock} from '../../src/Clock';
import {LocalDate} from '../../src/LocalDate';
import {LocalDateTime} from '../../src/LocalDateTime';
import {LocalTime} from '../../src/LocalTime';
import {Month} from '../../src/Month';
import {Year} from '../../src/Year';
import {YearMonth} from '../../src/YearMonth';
import {ZoneId} from '../../src/ZoneId';
import {ZoneOffset} from '../../src/ZoneOffset';

describe('org.threeten.bp.temporal.TestYearMonth', () => {
    
    let check = (test, y, m) => {
        expect(test.year()).to.eql(y);
        expect(test.month().value()).to.eql(m);
    };

    //-----------------------------------------------------------------------
    // now()
    //-----------------------------------------------------------------------
    describe('now()', () => {
        it('now', () => {
            let expected = YearMonth.now(Clock.systemDefaultZone());
            let test = YearMonth.now();
            for (let i = 0; i < 100; i++) {
                if (expected.equals(test)) {
                    return;
                }
                expected = YearMonth.now(Clock.systemDefaultZone());
                test = YearMonth.now();
            }
            expect(test).to.eql(expected);
        });
    });
    //-----------------------------------------------------------------------
    // now(ZoneId)
    //-----------------------------------------------------------------------
    describe('now(ZoneId)', () => {
        it('now_ZoneId_nullZoneId', () => {
            YearMonth.now(null);
        });

        it('now_ZoneId', () => {
            let zone = ZoneId.of('UTC+01:02:03');
            let expected = YearMonth.now(Clock.system(zone));
            let test = YearMonth.now(zone);
            for (let i = 0; i < 100; i++) {
                if (expected.equals(test)) {
                    return;
                }
                expected = YearMonth.now(Clock.system(zone));
                test = YearMonth.now(zone);
            }
            expect(test).to.eql(expected);
        });
    });

    //-----------------------------------------------------------------------
    // now(Clock)
    //-----------------------------------------------------------------------
    describe('now(ZoneId)', () => {
        it('now_Clock', () => {
            let instant = LocalDateTime.of(2010, 12, 31, 0, 0).toInstant(ZoneOffset.UTC);
            let clock = Clock.fixed(instant, ZoneOffset.UTC);
            let test = YearMonth.now(clock);
            expect(test.year()).to.eql(2010);
            expect(test.month()).to.eql(Month.DECEMBER);
        });

        it('now_Clock_nullClock', () => {
            YearMonth.now(null);
        });
    });

    //-----------------------------------------------------------------------
    describe('factories', () => {
        it('factory_intsMonth', () => {
            let test = YearMonth.of(2008, Month.FEBRUARY);
            check(test, 2008, 2);
        });

        it('test_factory_intsMonth_yearTooLow', () => {
            expect(() => {
                YearMonth.of(Year.MIN_VALUE - 1, Month.JANUARY);
            }).to.throw(DateTimeException);
        });

        it('test_factory_intsMonth_dayTooHigh', () => {
            expect(() => {
                YearMonth.of(Year.MAX_VALUE + 1, Month.JANUARY);
            }).to.throw(DateTimeException);
        });

        it('factory_intsMonth_nullMonth', () => {
            expect(() => {
                YearMonth.of(2008, null);
            }).to.throw(NullPointerException);
        });

        //-----------------------------------------------------------------------
        it('factory_ints', () => {
            let test = YearMonth.of(2008, 2);
            check(test, 2008, 2);
        });

        it('test_factory_ints_yearTooLow', () => {
            expect(() => {
                YearMonth.of(Year.MIN_VALUE - 1, 2);
            }).to.throw(DateTimeException);
        });

        it('test_factory_ints_dayTooHigh', () => {
            expect(() => {
                YearMonth.of(Year.MAX_VALUE + 1, 2);
            }).to.throw(DateTimeException);
        });

        it('test_factory_ints_monthTooLow', () => {
            expect(() => {
                YearMonth.of(2008, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_ints_monthTooHigh', () => {
            expect(() => {
                YearMonth.of(2008, 13);
            }).to.throw(DateTimeException);
        });
        //-----------------------------------------------------------------------
        it('test_factory_CalendricalObject', () => {
            expect(YearMonth.from(LocalDate.of(2007, 7, 15))).to.eql(YearMonth.of(2007, 7));
        });

        it('test_factory_CalendricalObject_invalid_noDerive', () => {
            expect(() => {
                YearMonth.from(LocalTime.of(12, 30));
            }).to.throw(DateTimeException);
        });

        it('test_factory_CalendricalObject_null', () => {
            expect(() => {
                YearMonth.from(null);
            }).to.throw(NullPointerException);
        });
    });
});
/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {expect} from 'chai';

import '../_init';
import {DateTimeException, NullPointerException} from '../../src/errors';

import {Clock} from '../../src/Clock';
import {LocalDate} from '../../src/LocalDate';
import {LocalDateTime} from '../../src/LocalDateTime';
import {LocalTime} from '../../src/LocalTime';
import {Month} from '../../src/Month';
import {MonthDay} from '../../src/MonthDay';
import {ZoneId} from '../../src/ZoneId';
import {ZoneOffset} from '../../src/ZoneOffset';

describe('org.threeten.bp.TestMonthDay', () => {
    let TEST_07_15;

    beforeEach(() => {
        TEST_07_15 = MonthDay.of(7, 15);
    });

    let check = (test, m, d) => {
        expect(test.month().value()).to.eql(m);
        expect(test.dayOfMonth()).to.eql(d);
    };

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
    //-----------------------------------------------------------------------
    describe('of()', () => {
        it('factory_intMonth', () => {
            expect(TEST_07_15).to.eql(MonthDay.of(Month.JULY, 15));
        });

        it('test_factory_intMonth_dayTooLow', () => {
            expect(() => {
                MonthDay.of(Month.JANUARY, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_intMonth_dayTooHigh', () => {
            expect(() => {
                MonthDay.of(Month.JANUARY, 32);
            }).to.throw(DateTimeException);
        });

        it('factory_intMonth_nullMonth', () => {
            expect(() => {
                MonthDay.of(null, 15);
            }).to.throw(NullPointerException);
        });

        //-----------------------------------------------------------------------
        it('factory_ints', () => {
            check(TEST_07_15, 7, 15);
        });

        it('test_factory_ints_dayTooLow', () => {
            expect(() => {
                MonthDay.of(1, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_ints_dayTooHigh', () => {
            expect(() => {
                MonthDay.of(1, 32);
            }).to.throw(DateTimeException);
        });


        it('test_factory_ints_monthTooLow', () => {
            expect(() => {
                MonthDay.of(0, 1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_ints_monthTooHigh', () => {
            expect(() => {
                MonthDay.of(13, 1);
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('test_factory_CalendricalObject', () => {
            expect(MonthDay.from(LocalDate.of(2007, 7, 15))).to.eql(TEST_07_15);
        });

        it('test_factory_CalendricalObject_invalid_noDerive', () => {
            expect(() => {
                MonthDay.from(LocalTime.of(12, 30));
            }).to.throw(DateTimeException);
        });

        it('test_factory_CalendricalObject_null', () => {
            expect(() => {
                MonthDay.from(null);
            }).to.throw(NullPointerException);
        });
    });

});


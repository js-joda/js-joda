/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {expect} from 'chai';

import '../_init';

import {NullPointerException, DateTimeException, DateTimeParseException} from '../../src/errors';

import {Clock} from '../../src/Clock';
import {DateTimeFormatter} from '../../src/format/DateTimeFormatter';
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
    //-----------------------------------------------------------------------
    // parse()
    //-----------------------------------------------------------------------
    describe('parse()', () => {
        let data_goodParseData = [
            ['0000-01', YearMonth.of(0, 1)],
            ['0000-12', YearMonth.of(0, 12)],
            ['9999-12', YearMonth.of(9999, 12)],
            ['2000-01', YearMonth.of(2000, 1)],
            ['2000-02', YearMonth.of(2000, 2)],
            ['2000-03', YearMonth.of(2000, 3)],
            ['2000-04', YearMonth.of(2000, 4)],
            ['2000-05', YearMonth.of(2000, 5)],
            ['2000-06', YearMonth.of(2000, 6)],
            ['2000-07', YearMonth.of(2000, 7)],
            ['2000-08', YearMonth.of(2000, 8)],
            ['2000-09', YearMonth.of(2000, 9)],
            ['2000-10', YearMonth.of(2000, 10)],
            ['2000-11', YearMonth.of(2000, 11)],
            ['2000-12', YearMonth.of(2000, 12)],

            // ['+12345678-03', YearMonth.of(12345678, 3)],  // too large for our Year.MAX_VALUE
            ['+123456-03', YearMonth.of(123456, 3)],
            ['0000-03', YearMonth.of(0, 3)],
            ['-1234-03', YearMonth.of(-1234, 3)],
            // ['-12345678-03', YearMonth.of(-12345678, 3)], // too smal for our Year.MIN_VALUE

            ['+' + Year.MAX_VALUE + '-03', YearMonth.of(Year.MAX_VALUE, 3)],
            [Year.MIN_VALUE + '-03', YearMonth.of(Year.MIN_VALUE, 3)]
        ];

        it('factory_parse_success', () => {
            data_goodParseData.forEach((val) => {
                let [text, expected] = val;
                let yearMonth = YearMonth.parse(text);
                expect(yearMonth).to.eql(expected);
            });
        });

        //-----------------------------------------------------------------------
        let data_badParseData = [
            ['', 0],
            ['-00', 1],
            ['--01-0', 1],
            ['A01-3', 0],
            ['200-01', 0],
            ['2009/12', 4],

            ['-0000-10', 0],
            ['-12345678901-10', 11],
            ['+1-10', 1],
            ['+12-10', 1],
            ['+123-10', 1],
            ['+1234-10', 0],
            ['12345-10', 0],
            ['+12345678901-10', 11]
        ];

        it('factory_parse_fail', () => {
            data_badParseData.forEach((val) => {
                let [text, pos] = val;
                expect(() => {
                    try {
                        YearMonth.parse(text);
                        expect.fail(null, null, `Parse should have failed for ${text} at position ${pos}`);
                    } catch (ex) {
                        expect(ex.parsedString()).to.eql(text);
                        expect(ex.errorIndex()).to.eql(pos);
                        throw ex;
                    }
                }).to.throw(DateTimeParseException);
            });
        });
        //-----------------------------------------------------------------------
        it('factory_parse_illegalValue_Month', () => {
            expect(() => {
                YearMonth.parse('2008-13');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_nullText', () => {
            expect(() => {
                YearMonth.parse(null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    // parse(DateTimeFormatter)
    //-----------------------------------------------------------------------
    describe('parse(DateTimeFormatter)', () => {
        it('factory_parse_formatter', () => {
            let f = DateTimeFormatter.ofPattern('u M');
            let test = YearMonth.parse('2010 12', f);
            expect(test).to.eql(YearMonth.of(2010, 12));
        });

        it('factory_parse_formatter_nullText', () => {
            expect(() => {
                let f = DateTimeFormatter.ofPattern('u M');
                YearMonth.parse(null, f);
            }).to.throw(NullPointerException);
        });

        it('factory_parse_formatter_nullFormatter', () => {
            expect(() => {
                YearMonth.parse('ANY', null);
            }).to.throw(NullPointerException);
        });
    });
});
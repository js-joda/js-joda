/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {expect} from 'chai';

import '../_init';

import {NullPointerException, DateTimeException, DateTimeParseException} from '../../src/errors';

import {Clock} from '../../src/Clock';
import {ChronoField} from '../../src/temporal/ChronoField';
import {DateTimeFormatter} from '../../src/format/DateTimeFormatter';
import {LocalDate} from '../../src/LocalDate';
import {LocalDateTime} from '../../src/LocalDateTime';
import {LocalTime} from '../../src/LocalTime';
import {MathUtil} from '../../src/MathUtil';
import {MockFieldNoValue} from './temporal/MockFieldNoValue';
import {Month} from '../../src/Month';
import {Year} from '../../src/Year';
import {YearMonth} from '../../src/YearMonth';
import {ZoneId} from '../../src/ZoneId';
import {ZoneOffset} from '../../src/ZoneOffset';

describe('org.threeten.bp.temporal.TestYearMonth', () => {
    const TEST_2008_06 = YearMonth.of(2008, 6);

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

    //-----------------------------------------------------------------------
    // get(TemporalField)
    //-----------------------------------------------------------------------
    describe('get(TemporalField)', () => {
        it('test_get_TemporalField', () => {
            expect(TEST_2008_06.get(ChronoField.YEAR)).to.eql(2008);
            expect(TEST_2008_06.get(ChronoField.MONTH_OF_YEAR)).to.eql(6);
            expect(TEST_2008_06.get(ChronoField.YEAR_OF_ERA)).to.eql(2008);
            expect(TEST_2008_06.get(ChronoField.ERA)).to.eql(1);
        });

        it('test_get_TemporalField_tooBig', () => {
            expect(() => {
                // TODO: in threetenbp the ValueRange of PROLEPTIC_MONTH is enough to overflow 
                // this since it checks for a 32bit Integer in ValueRange.isIntValue()... 
                // but we check for MAX_SAFE_INTEGER instead... so i use NANO_OF_DAY in this test instead
                // TEST_2008_06.get(ChronoField.PROLEPTIC_MONTH);  
                TEST_2008_06.get(ChronoField.NANO_OF_DAY);
            }).to.throw(DateTimeException);
        });

        it('test_get_TemporalField_null', () => {
            expect(() => {
                TEST_2008_06.get(null);
            }).to.throw(NullPointerException);
        });

        it('test_get_TemporalField_invalidField', () => {
            expect(() => {
                TEST_2008_06.get(MockFieldNoValue.INSTANCE);
            }).to.throw(DateTimeException);
        });

        it('test_get_TemporalField_timeField', () => {
            expect(() => {
                TEST_2008_06.get(ChronoField.AMPM_OF_DAY);
            }).to.throw(DateTimeException);
        });
    });
    //-----------------------------------------------------------------------
    // getLong(TemporalField)
    //-----------------------------------------------------------------------
    describe('getLong(TemporalField)', () => {
        it('test_getLong_TemporalField', () => {
            expect(TEST_2008_06.getLong(ChronoField.YEAR)).to.eql(2008);
            expect(TEST_2008_06.getLong(ChronoField.MONTH_OF_YEAR)).to.eql(6);
            expect(TEST_2008_06.getLong(ChronoField.YEAR_OF_ERA)).to.eql(2008);
            expect(TEST_2008_06.getLong(ChronoField.ERA)).to.eql(1);
            expect(TEST_2008_06.getLong(ChronoField.PROLEPTIC_MONTH)).to.eql(2008 * 12 + 6 - 1);
        });

        it('test_getLong_TemporalField_null', () => {
            expect(() => {
                TEST_2008_06.getLong(null);
            }).to.throw(NullPointerException);
        });


        it('test_getLong_TemporalField_invalidField', () => {
            expect(() => {
                TEST_2008_06.getLong(MockFieldNoValue.INSTANCE);
            }).to.throw(DateTimeException);
        });

        it('test_getLong_TemporalField_timeField', () => {
            expect(() => {
                TEST_2008_06.getLong(ChronoField.AMPM_OF_DAY);
            }).to.throw(DateTimeException);
        });
    });

    //-----------------------------------------------------------------------
    // with(Year)
    //-----------------------------------------------------------------------
    describe('with(Year)', () => {
        it('test_with_Year', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.with(Year.of(2000))).to.eql(YearMonth.of(2000, 6));
        });

        it('test_with_Year_noChange_equal', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.with(Year.of(2008))).to.eql(test);
        });

        it('test_with_Year_null', () => {
            expect(() => {
                let test = YearMonth.of(2008, 6);
                test.with(null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    // with(Month)
    //-----------------------------------------------------------------------
    describe('with(Month)', () => {
        it('test_with_Month', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.with(Month.JANUARY)).to.eql(YearMonth.of(2008, 1));
        });

        it('test_with_Month_noChange_equal', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.with(Month.JUNE)).to.eql(test);
        });

        it('test_with_Month_null', () => {
            expect(() => {
                let test = YearMonth.of(2008, 6);
                test.with(null);
            }).to.throw(NullPointerException);
        });
    });
    //-----------------------------------------------------------------------
    // withYear()
    //-----------------------------------------------------------------------
    describe('withYear()', () => {
        it('test_withYear', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.withYear(1999)).to.eql(YearMonth.of(1999, 6));
        });

        it('test_withYear_int_noChange_equal', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.withYear(2008)).to.eql(test);
        });

        it('test_withYear_tooLow', () => {
            expect(() => {
                let test = YearMonth.of(2008, 6);
                test.withYear(Year.MIN_VALUE - 1);
            }).to.throw(DateTimeException);
        });

        it('test_withYear_tooHigh', () => {
            expect(() => {
                let test = YearMonth.of(2008, 6);
                test.withYear(Year.MAX_VALUE + 1);
            }).to.throw(DateTimeException);
        });
    });
    //-----------------------------------------------------------------------
    // withMonth()
    //-----------------------------------------------------------------------
    describe('withMonth()', () => {
        it('test_withMonth', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.withMonth(1)).to.eql(YearMonth.of(2008, 1));
        });

        it('test_withMonth_int_noChange_equal', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.withMonth(6)).to.eql(test);
        });

        it('test_withMonth_tooLow', () => {
            expect(() => {
                let test = YearMonth.of(2008, 6);
                test.withMonth(0);
            }).to.throw(DateTimeException);
        });

        it('test_withMonth_tooHigh', () => {
            expect(() => {
                let test = YearMonth.of(2008, 6);
                test.withMonth(13);
            }).to.throw(DateTimeException);
        });
    });
    
    //-----------------------------------------------------------------------
    // plusYears()
    //-----------------------------------------------------------------------
    describe('plusYears()', () => {
        it('test_plusYears_long', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.plusYears(1)).to.eql(YearMonth.of(2009, 6));
        });
        
        it('test_plusYears_long_noChange_equal', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.plusYears(0)).to.eql(test);
        });
        
        it('test_plusYears_long_negative', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.plusYears(-1)).to.eql(YearMonth.of(2007, 6));
        });
        
        it('test_plusYears_long_big', () => {
            let test = YearMonth.of(-40, 6);
            expect(test.plusYears(20 + Year.MAX_VALUE)).to.eql(YearMonth.of(-40 + 20 + Year.MAX_VALUE, 6));
        });
        
        it('test_plusYears_long_invalidTooLarge', () => {
            expect(() => {
                let test = YearMonth.of(Year.MAX_VALUE, 6);
                test.plusYears(1);
            }).to.throw(DateTimeException);
        });
        
        it('test_plusYears_long_invalidTooLargeMaxAddMax', () => {
            expect(() => {
                let test = YearMonth.of(Year.MAX_VALUE, 12);
                test.plusYears(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_plusYears_long_invalidTooLargeMaxAddMin', () => {
            expect(() => {
                let test = YearMonth.of(Year.MAX_VALUE, 12);
                test.plusYears(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_plusYears_long_invalidTooSmall', () => {
            expect(() => {
                let test = YearMonth.of(Year.MIN_VALUE, 6);
                test.plusYears(-1);
            }).to.throw(DateTimeException);
        });
    });
    
    //-----------------------------------------------------------------------
    // plusMonths()
    //-----------------------------------------------------------------------
    describe('plusMonths()', () => {
        it('test_plusMonths_long', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.plusMonths(1)).to.eql(YearMonth.of(2008, 7));
        });
        
        it('test_plusMonths_long_noChange_equal', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.plusMonths(0)).to.eql(test);
        });
        
        it('test_plusMonths_long_overYears', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.plusMonths(7)).to.eql(YearMonth.of(2009, 1));
        });
        
        it('test_plusMonths_long_negative', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.plusMonths(-1)).to.eql(YearMonth.of(2008, 5));
        });
        
        it('test_plusMonths_long_negativeOverYear', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.plusMonths(-6)).to.eql(YearMonth.of(2007, 12));
        });
        
        it('test_plusMonths_long_big', () => {
            let test = YearMonth.of(-40, 1);
            let months = 20 + (Year.MAX_VALUE * 12);
            expect(test.plusMonths(months)).to.eql(YearMonth.of((-40 + MathUtil.intDiv(months, 12)), 1 + MathUtil.intMod(months, 12)));
        });
        
        it('test_plusMonths_long_invalidTooLarge', () => {
            expect(() => {
                let test = YearMonth.of(Year.MAX_VALUE, 12);
                test.plusMonths(1);
            }).to.throw(DateTimeException);
        });
        
        it('test_plusMonths_long_invalidTooLargeMaxAddMax', () => {
            expect(() => {
                let test = YearMonth.of(Year.MAX_VALUE, 12);
                test.plusMonths(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_plusMonths_long_invalidTooLargeMaxAddMin', () => {
            expect(() => {
                let test = YearMonth.of(Year.MAX_VALUE, 12);
                test.plusMonths(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_plusMonths_long_invalidTooSmall', () => {
            expect(() => {
                let test = YearMonth.of(Year.MIN_VALUE, 1);
                test.plusMonths(-1);
            }).to.throw(DateTimeException);
        });
    });
    
    //-----------------------------------------------------------------------
    // minusYears()
    //-----------------------------------------------------------------------
    describe('minusYears()', () => {
        it('test_minusYears_long', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.minusYears(1)).to.eql(YearMonth.of(2007, 6));
        });
        
        it('test_minusYears_long_noChange_equal', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.minusYears(0)).to.eql(test);
        });
        
        it('test_minusYears_long_negative', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.minusYears(-1)).to.eql(YearMonth.of(2009, 6));
        });
        
        it('test_minusYears_long_big', () => {
            let test = YearMonth.of(40, 6);
            expect(test.minusYears(20 + Year.MAX_VALUE)).to.eql(YearMonth.of(40 - 20 - Year.MAX_VALUE, 6));
        });
        
        it('test_minusYears_long_invalidTooLarge', () => {
            expect(() => {
                let test = YearMonth.of(Year.MAX_VALUE, 6);
                test.minusYears(-1);
            }).to.throw(DateTimeException);
        });
        
        it('test_minusYears_long_invalidTooLargeMaxSubtractMax', () => {
            expect(() => {
                let test = YearMonth.of(Year.MIN_VALUE, 12);
                test.minusYears(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_minusYears_long_invalidTooLargeMaxSubtractMin', () => {
            expect(() => {
                let test = YearMonth.of(Year.MIN_VALUE, 12);
                test.minusYears(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_minusYears_long_invalidTooSmall', () => {
            expect(() => {
                let test = YearMonth.of(Year.MIN_VALUE, 6);
                test.minusYears(1);
            }).to.throw(DateTimeException);
        });
    });
    
    //-----------------------------------------------------------------------
    // minusMonths()
    //-----------------------------------------------------------------------
    describe('minusMonths()', () => {
        it('test_minusMonths_long', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.minusMonths(1)).to.eql(YearMonth.of(2008, 5));
        });
        
        it('test_minusMonths_long_noChange_equal', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.minusMonths(0)).to.eql(test);
        });
        
        it('test_minusMonths_long_overYears', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.minusMonths(6)).to.eql(YearMonth.of(2007, 12));
        });
        
        it('test_minusMonths_long_negative', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.minusMonths(-1)).to.eql(YearMonth.of(2008, 7));
        });
        
        it('test_minusMonths_long_negativeOverYear', () => {
            let test = YearMonth.of(2008, 6);
            expect(test.minusMonths(-7)).to.eql(YearMonth.of(2009, 1));
        });
        
        it('test_minusMonths_long_big', () => {
            let test = YearMonth.of(40, 12);
            let months = 20 + Year.MAX_VALUE * 12;
            expect(test.minusMonths(months)).to.eql(YearMonth.of(40 - MathUtil.intDiv(months, 12), 12 - MathUtil.intMod(months, 12)));
        });
        
        it('test_minusMonths_long_invalidTooLarge', () => {
            expect(() => {
                let test = YearMonth.of(Year.MAX_VALUE, 12);
                test.minusMonths(-1);
            }).to.throw(DateTimeException);
        });
        
        it('test_minusMonths_long_invalidTooLargeMaxSubtractMax', () => {
            expect(() => {
                let test = YearMonth.of(Year.MAX_VALUE, 12);
                test.minusMonths(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_minusMonths_long_invalidTooLargeMaxSubtractMin', () => {
            expect(() => {
                let test = YearMonth.of(Year.MAX_VALUE, 12);
                test.minusMonths(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_minusMonths_long_invalidTooSmall', () => {
            expect(() => {
                let test = YearMonth.of(Year.MIN_VALUE, 1);
                test.minusMonths(1);
            }).to.throw(DateTimeException);
        });
    });

});

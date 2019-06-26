/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {expect} from 'chai';

import '../_init';

import {NullPointerException, DateTimeException, DateTimeParseException} from '../../src/errors';

import {Clock} from '../../src/Clock';
import {ChronoField} from '../../src/temporal/ChronoField';
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {DateTimeFormatter} from '../../src/format/DateTimeFormatter';
import {IsoChronology} from '../../src/chrono/IsoChronology';
import {LocalDate} from '../../src/LocalDate';
import {LocalDateTime} from '../../src/LocalDateTime';
import {LocalTime} from '../../src/LocalTime';
import {MathUtil} from '../../src/MathUtil';
import {MockFieldNoValue} from './temporal/MockFieldNoValue';
import {Month} from '../../src/Month';
import {TemporalQueries} from '../../src/temporal/TemporalQueries';
import {Year} from '../../src/Year';
import {YearMonth} from '../../src/YearMonth';
import {ZoneId} from '../../src/ZoneId';
import {ZoneOffset} from '../../src/ZoneOffset';

describe('org.threeten.bp.temporal.TestYearMonth', () => {
    const TEST_2008_06 = YearMonth.of(2008, 6);

    const check = (test, y, m) => {
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
            const zone = ZoneId.of('UTC+01:02:03');
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
            const instant = LocalDateTime.of(2010, 12, 31, 0, 0).toInstant(ZoneOffset.UTC);
            const clock = Clock.fixed(instant, ZoneOffset.UTC);
            const test = YearMonth.now(clock);
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
            const test = YearMonth.of(2008, Month.FEBRUARY);
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
            const test = YearMonth.of(2008, 2);
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
        const data_goodParseData = [
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
                const [text, expected] = val;
                const yearMonth = YearMonth.parse(text);
                expect(yearMonth).to.eql(expected);
            });
        });

        //-----------------------------------------------------------------------
        const data_badParseData = [
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
                const [text, pos] = val;
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
            const f = DateTimeFormatter.ofPattern('u M');
            const test = YearMonth.parse('2010 12', f);
            expect(test).to.eql(YearMonth.of(2010, 12));
        });

        it('factory_parse_formatter_nullText', () => {
            expect(() => {
                const f = DateTimeFormatter.ofPattern('u M');
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
            const test = YearMonth.of(2008, 6);
            expect(test.with(Year.of(2000))).to.eql(YearMonth.of(2000, 6));
        });

        it('test_with_Year_noChange_equal', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.with(Year.of(2008))).to.eql(test);
        });

        it('test_with_Year_null', () => {
            expect(() => {
                const test = YearMonth.of(2008, 6);
                test.with(null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    // with(Month)
    //-----------------------------------------------------------------------
    describe('with(Month)', () => {
        it('test_with_Month', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.with(Month.JANUARY)).to.eql(YearMonth.of(2008, 1));
        });

        it('test_with_Month_noChange_equal', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.with(Month.JUNE)).to.eql(test);
        });

        it('test_with_Month_null', () => {
            expect(() => {
                const test = YearMonth.of(2008, 6);
                test.with(null);
            }).to.throw(NullPointerException);
        });
    });
    //-----------------------------------------------------------------------
    // withYear()
    //-----------------------------------------------------------------------
    describe('withYear()', () => {
        it('test_withYear', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.withYear(1999)).to.eql(YearMonth.of(1999, 6));
        });

        it('test_withYear_int_noChange_equal', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.withYear(2008)).to.eql(test);
        });

        it('test_withYear_tooLow', () => {
            expect(() => {
                const test = YearMonth.of(2008, 6);
                test.withYear(Year.MIN_VALUE - 1);
            }).to.throw(DateTimeException);
        });

        it('test_withYear_tooHigh', () => {
            expect(() => {
                const test = YearMonth.of(2008, 6);
                test.withYear(Year.MAX_VALUE + 1);
            }).to.throw(DateTimeException);
        });
    });
    //-----------------------------------------------------------------------
    // withMonth()
    //-----------------------------------------------------------------------
    describe('withMonth()', () => {
        it('test_withMonth', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.withMonth(1)).to.eql(YearMonth.of(2008, 1));
        });

        it('test_withMonth_int_noChange_equal', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.withMonth(6)).to.eql(test);
        });

        it('test_withMonth_tooLow', () => {
            expect(() => {
                const test = YearMonth.of(2008, 6);
                test.withMonth(0);
            }).to.throw(DateTimeException);
        });

        it('test_withMonth_tooHigh', () => {
            expect(() => {
                const test = YearMonth.of(2008, 6);
                test.withMonth(13);
            }).to.throw(DateTimeException);
        });
    });
    
    //-----------------------------------------------------------------------
    // plusYears()
    //-----------------------------------------------------------------------
    describe('plusYears()', () => {
        it('test_plusYears_long', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.plusYears(1)).to.eql(YearMonth.of(2009, 6));
        });
        
        it('test_plusYears_long_noChange_equal', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.plusYears(0)).to.eql(test);
        });
        
        it('test_plusYears_long_negative', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.plusYears(-1)).to.eql(YearMonth.of(2007, 6));
        });
        
        it('test_plusYears_long_big', () => {
            const test = YearMonth.of(-40, 6);
            expect(test.plusYears(20 + Year.MAX_VALUE)).to.eql(YearMonth.of(-40 + 20 + Year.MAX_VALUE, 6));
        });
        
        it('test_plusYears_long_invalidTooLarge', () => {
            expect(() => {
                const test = YearMonth.of(Year.MAX_VALUE, 6);
                test.plusYears(1);
            }).to.throw(DateTimeException);
        });
        
        it('test_plusYears_long_invalidTooLargeMaxAddMax', () => {
            expect(() => {
                const test = YearMonth.of(Year.MAX_VALUE, 12);
                test.plusYears(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_plusYears_long_invalidTooLargeMaxAddMin', () => {
            expect(() => {
                const test = YearMonth.of(Year.MAX_VALUE, 12);
                test.plusYears(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_plusYears_long_invalidTooSmall', () => {
            expect(() => {
                const test = YearMonth.of(Year.MIN_VALUE, 6);
                test.plusYears(-1);
            }).to.throw(DateTimeException);
        });
    });
    
    //-----------------------------------------------------------------------
    // plusMonths()
    //-----------------------------------------------------------------------
    describe('plusMonths()', () => {
        it('test_plusMonths_long', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.plusMonths(1)).to.eql(YearMonth.of(2008, 7));
        });
        
        it('test_plusMonths_long_noChange_equal', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.plusMonths(0)).to.eql(test);
        });
        
        it('test_plusMonths_long_overYears', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.plusMonths(7)).to.eql(YearMonth.of(2009, 1));
        });
        
        it('test_plusMonths_long_negative', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.plusMonths(-1)).to.eql(YearMonth.of(2008, 5));
        });
        
        it('test_plusMonths_long_negativeOverYear', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.plusMonths(-6)).to.eql(YearMonth.of(2007, 12));
        });
        
        it('test_plusMonths_long_big', () => {
            const test = YearMonth.of(-40, 1);
            const months = 20 + (Year.MAX_VALUE * 12);
            expect(test.plusMonths(months)).to.eql(YearMonth.of((-40 + MathUtil.intDiv(months, 12)), 1 + MathUtil.intMod(months, 12)));
        });
        
        it('test_plusMonths_long_invalidTooLarge', () => {
            expect(() => {
                const test = YearMonth.of(Year.MAX_VALUE, 12);
                test.plusMonths(1);
            }).to.throw(DateTimeException);
        });
        
        it('test_plusMonths_long_invalidTooLargeMaxAddMax', () => {
            expect(() => {
                const test = YearMonth.of(Year.MAX_VALUE, 12);
                test.plusMonths(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_plusMonths_long_invalidTooLargeMaxAddMin', () => {
            expect(() => {
                const test = YearMonth.of(Year.MAX_VALUE, 12);
                test.plusMonths(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_plusMonths_long_invalidTooSmall', () => {
            expect(() => {
                const test = YearMonth.of(Year.MIN_VALUE, 1);
                test.plusMonths(-1);
            }).to.throw(DateTimeException);
        });
    });
    
    //-----------------------------------------------------------------------
    // minusYears()
    //-----------------------------------------------------------------------
    describe('minusYears()', () => {
        it('test_minusYears_long', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.minusYears(1)).to.eql(YearMonth.of(2007, 6));
        });
        
        it('test_minusYears_long_noChange_equal', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.minusYears(0)).to.eql(test);
        });
        
        it('test_minusYears_long_negative', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.minusYears(-1)).to.eql(YearMonth.of(2009, 6));
        });
        
        it('test_minusYears_long_big', () => {
            const test = YearMonth.of(40, 6);
            expect(test.minusYears(20 + Year.MAX_VALUE)).to.eql(YearMonth.of(40 - 20 - Year.MAX_VALUE, 6));
        });
        
        it('test_minusYears_long_invalidTooLarge', () => {
            expect(() => {
                const test = YearMonth.of(Year.MAX_VALUE, 6);
                test.minusYears(-1);
            }).to.throw(DateTimeException);
        });
        
        it('test_minusYears_long_invalidTooLargeMaxSubtractMax', () => {
            expect(() => {
                const test = YearMonth.of(Year.MIN_VALUE, 12);
                test.minusYears(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_minusYears_long_invalidTooLargeMaxSubtractMin', () => {
            expect(() => {
                const test = YearMonth.of(Year.MIN_VALUE, 12);
                test.minusYears(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_minusYears_long_invalidTooSmall', () => {
            expect(() => {
                const test = YearMonth.of(Year.MIN_VALUE, 6);
                test.minusYears(1);
            }).to.throw(DateTimeException);
        });
    });
    
    //-----------------------------------------------------------------------
    // minusMonths()
    //-----------------------------------------------------------------------
    describe('minusMonths()', () => {
        it('test_minusMonths_long', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.minusMonths(1)).to.eql(YearMonth.of(2008, 5));
        });
        
        it('test_minusMonths_long_noChange_equal', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.minusMonths(0)).to.eql(test);
        });
        
        it('test_minusMonths_long_overYears', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.minusMonths(6)).to.eql(YearMonth.of(2007, 12));
        });
        
        it('test_minusMonths_long_negative', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.minusMonths(-1)).to.eql(YearMonth.of(2008, 7));
        });
        
        it('test_minusMonths_long_negativeOverYear', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.minusMonths(-7)).to.eql(YearMonth.of(2009, 1));
        });
        
        it('test_minusMonths_long_big', () => {
            const test = YearMonth.of(40, 12);
            const months = 20 + Year.MAX_VALUE * 12;
            expect(test.minusMonths(months)).to.eql(YearMonth.of(40 - MathUtil.intDiv(months, 12), 12 - MathUtil.intMod(months, 12)));
        });
        
        it('test_minusMonths_long_invalidTooLarge', () => {
            expect(() => {
                const test = YearMonth.of(Year.MAX_VALUE, 12);
                test.minusMonths(-1);
            }).to.throw(DateTimeException);
        });
        
        it('test_minusMonths_long_invalidTooLargeMaxSubtractMax', () => {
            expect(() => {
                const test = YearMonth.of(Year.MAX_VALUE, 12);
                test.minusMonths(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_minusMonths_long_invalidTooLargeMaxSubtractMin', () => {
            expect(() => {
                const test = YearMonth.of(Year.MAX_VALUE, 12);
                test.minusMonths(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });
        
        it('test_minusMonths_long_invalidTooSmall', () => {
            expect(() => {
                const test = YearMonth.of(Year.MIN_VALUE, 1);
                test.minusMonths(1);
            }).to.throw(DateTimeException);
        });
    });
    //-----------------------------------------------------------------------
    // doAdjustment()
    //-----------------------------------------------------------------------
    describe('doAdjustment()', () => {
        it('test_adjustDate', () => {
            const test = YearMonth.of(2008, 6);
            const date = LocalDate.of(2007, 1, 1);
            expect(test.adjustInto(date)).to.eql(LocalDate.of(2008, 6, 1));
        });
        
        it('test_adjustDate_preserveDoM', () => {
            const test = YearMonth.of(2011, 3);
            const date = LocalDate.of(2008, 2, 29);
            expect(test.adjustInto(date)).to.eql(LocalDate.of(2011, 3, 29));
        });
        
        it('test_adjustDate_resolve', () => {
            const test = YearMonth.of(2007, 2);
            const date = LocalDate.of(2008, 3, 31);
            expect(test.adjustInto(date)).to.eql(LocalDate.of(2007, 2, 28));
        });
        
        it('test_adjustDate_equal', () => {
            const test = YearMonth.of(2008, 6);
            const date = LocalDate.of(2008, 6, 30);
            expect(test.adjustInto(date)).to.eql(date);
        });
        
        it('test_adjustDate_null', () => {
            expect(() => {
                TEST_2008_06.adjustInto(null);
            }).to.throw(NullPointerException);
        });
    });
    //-----------------------------------------------------------------------
    // isLeapYear()
    //-----------------------------------------------------------------------
    describe('isLeapYear()', () => {
        it('test_isLeapYear', () => {
            expect(YearMonth.of(2007, 6).isLeapYear()).to.eql(false);
            expect(YearMonth.of(2008, 6).isLeapYear()).to.eql(true);
        });
    });
    //-----------------------------------------------------------------------
    // lengthOfMonth()
    //-----------------------------------------------------------------------
    describe('lengthOfMonth()', () => {
        it('test_lengthOfMonth_june', () => {
            const test = YearMonth.of(2007, 6);
            expect(test.lengthOfMonth()).to.eql(30);
        });
        
        it('test_lengthOfMonth_febNonLeap', () => {
            const test = YearMonth.of(2007, 2);
            expect(test.lengthOfMonth()).to.eql(28);
        });
        
        it('test_lengthOfMonth_febLeap', () => {
            const test = YearMonth.of(2008, 2);
            expect(test.lengthOfMonth()).to.eql(29);
        });
    });
    //-----------------------------------------------------------------------
    // lengthOfYear()
    //-----------------------------------------------------------------------
    describe('lengthOfYear()', () => {
        it('test_lengthOfYear', () => {
            expect(YearMonth.of(2007, 6).lengthOfYear()).to.eql(365);
            expect(YearMonth.of(2008, 6).lengthOfYear()).to.eql(366);
        });
    });
    //-----------------------------------------------------------------------
    // isValidDay(int)
    //-----------------------------------------------------------------------
    describe('isValidDay(int)', () => {
        it('test_isValidDay_int_june', () => {
            const test = YearMonth.of(2007, 6);
            expect(test.isValidDay(1)).to.eql(true);
            expect(test.isValidDay(30)).to.eql(true);
            
            expect(test.isValidDay(-1)).to.eql(false);
            expect(test.isValidDay(0)).to.eql(false);
            expect(test.isValidDay(31)).to.eql(false);
            expect(test.isValidDay(32)).to.eql(false);
        });
        
        it('test_isValidDay_int_febNonLeap', () => {
            const test = YearMonth.of(2007, 2);
            expect(test.isValidDay(1)).to.eql(true);
            expect(test.isValidDay(28)).to.eql(true);
            
            expect(test.isValidDay(-1)).to.eql(false);
            expect(test.isValidDay(0)).to.eql(false);
            expect(test.isValidDay(29)).to.eql(false);
            expect(test.isValidDay(32)).to.eql(false);
        });
        
        it('test_isValidDay_int_febLeap', () => {
            const test = YearMonth.of(2008, 2);
            expect(test.isValidDay(1)).to.eql(true);
            expect(test.isValidDay(29)).to.eql(true);
            
            expect(test.isValidDay(-1)).to.eql(false);
            expect(test.isValidDay(0)).to.eql(false);
            expect(test.isValidDay(30)).to.eql(false);
            expect(test.isValidDay(32)).to.eql(false);
        });
    });
    //-----------------------------------------------------------------------
    // atDay(int)
    //-----------------------------------------------------------------------
    describe('atDay(int)', () => {
        it('test_atDay_int', () => {
            const test = YearMonth.of(2008, 6);
            expect(test.atDay(30)).to.eql(LocalDate.of(2008, 6, 30));
        });
        
        it('test_atDay_int_invalidDay', () => {
            expect(() => {
                const test = YearMonth.of(2008, 6);
                test.atDay(31);
            }).to.throw(DateTimeException);
        });
    });
    
    //-----------------------------------------------------------------------
    // query(TemporalQuery)
    //-----------------------------------------------------------------------
    describe('query(TemporalQuery)', () => {
        it('test_query', () => {
            expect(TEST_2008_06.query(TemporalQueries.chronology())).to.eql(IsoChronology.INSTANCE);
            expect(TEST_2008_06.query(TemporalQueries.localDate())).to.eql(null);
            expect(TEST_2008_06.query(TemporalQueries.localTime())).to.eql(null);
            expect(TEST_2008_06.query(TemporalQueries.offset())).to.eql(null);
            expect(TEST_2008_06.query(TemporalQueries.precision())).to.eql(ChronoUnit.MONTHS);
            expect(TEST_2008_06.query(TemporalQueries.zone())).to.eql(null);
            expect(TEST_2008_06.query(TemporalQueries.zoneId())).to.eql(null);
        });
        
        it('test_query_null', () => {
            expect(() => {
                TEST_2008_06.query(null);
            }).to.throw(NullPointerException);
        });
    });
    //-----------------------------------------------------------------------
    // compareTo()
    //-----------------------------------------------------------------------
    describe('compareTo()', () => {
        it('test_comparisons', () => {
            const data_comparisons_YearMonth = [
                YearMonth.of(-1, 1),
                YearMonth.of(0, 1),
                YearMonth.of(0, 12),
                YearMonth.of(1, 1),
                YearMonth.of(1, 2),
                YearMonth.of(1, 12),
                YearMonth.of(2008, 1),
                YearMonth.of(2008, 6),
                YearMonth.of(2008, 12)
            ];
            for (let i = 0; i < data_comparisons_YearMonth.length; i++) {
                const a = data_comparisons_YearMonth[i];
                for (let j = 0; j < data_comparisons_YearMonth.length; j++) {
                    const b = data_comparisons_YearMonth[j];
                    if (i < j) {
                        expect(a.compareTo(b) < 0).to.eql(true);
                        expect(a.isBefore(b)).to.eql(true);
                        expect(a.isAfter(b)).to.eql(false);
                        expect(a.equals(b)).to.eql(false);
                    } else if (i > j) {
                        expect(a.compareTo(b) > 0).to.eql(true);
                        expect(a.isBefore(b)).to.eql(false);
                        expect(a.isAfter(b)).to.eql(true);
                        expect(a.equals(b)).to.eql(false);
                    } else {
                        expect(a.compareTo(b)).to.eql(0);
                        expect(a.isBefore(b)).to.eql(false);
                        expect(a.isAfter(b)).to.eql(false);
                        expect(a.equals(b)).to.eql(true);
                    }
                }
            }
        });
        
        it('test_compareTo_ObjectNull', () => {
            expect(() => {
                TEST_2008_06.compareTo(null);
            }).to.throw(NullPointerException);
        });
        
        it('test_isBefore_ObjectNull', () => {
            expect(() => {
                TEST_2008_06.isBefore(null);
            }).to.throw(NullPointerException);
        });
        
        it('test_isAfter_ObjectNull', () => {
            expect(() => {
                TEST_2008_06.isAfter(null);
            }).to.throw(NullPointerException);
        });
    });
    //-----------------------------------------------------------------------
    // equals()
    //-----------------------------------------------------------------------
    describe('equals()', () => {
        it('test_equals', () => {
            const a = YearMonth.of(2008, 6);
            const b = YearMonth.of(2008, 6);
            const c = YearMonth.of(2007, 6);
            const d = YearMonth.of(2008, 5);
            
            expect(a.equals(a)).to.eql(true);
            expect(a.equals(b)).to.eql(true);
            expect(a.equals(c)).to.eql(false);
            expect(a.equals(d)).to.eql(false);
            
            expect(b.equals(a)).to.eql(true);
            expect(b.equals(b)).to.eql(true);
            expect(b.equals(c)).to.eql(false);
            expect(b.equals(d)).to.eql(false);
            
            expect(c.equals(a)).to.eql(false);
            expect(c.equals(b)).to.eql(false);
            expect(c.equals(c)).to.eql(true);
            expect(c.equals(d)).to.eql(false);
            
            expect(d.equals(a)).to.eql(false);
            expect(d.equals(b)).to.eql(false);
            expect(d.equals(c)).to.eql(false);
            expect(d.equals(d)).to.eql(true);
        });
        
        it('test_equals_itself_true', () => {
            expect(TEST_2008_06.equals(TEST_2008_06)).to.eql(true);
        });
        
        it('test_equals_string_false', () => {
            expect(TEST_2008_06.equals('2007-07-15')).to.eql(false);
        });
        
        it('test_equals_null_false', () => {
            expect(TEST_2008_06.equals(null)).to.eql(false);
        });
    });
    //-----------------------------------------------------------------------
    // toString()
    //-----------------------------------------------------------------------
    describe('toString()', () => {
        const data_sampleToString = [
            [2008, 1, '2008-01'],
            [2008, 12, '2008-12'],
            [7, 5, '0007-05'],
            [0, 5, '0000-05'],
            [-1, 1, '-0001-01']
        ];
        
        it('test_toString', () => {
            data_sampleToString.forEach((val) => {
                const [y, m, expected] = val;
                const test = YearMonth.of(y, m);
                const str = test.toString();
                expect(str).to.eql(expected);
            });
        });
    });
    //-----------------------------------------------------------------------
    // format(DateTimeFormatter)
    //-----------------------------------------------------------------------
    describe('format(DateTimeFormatter)', () => {
        it('test_format_formatter', () => {
            const f = DateTimeFormatter.ofPattern('y M');
            const t = YearMonth.of(2010, 12).format(f);
            expect(t).to.eql('2010 12');
        });
        
        it('test_format_formatter_null', () => {
            expect(() => {
                YearMonth.of(2010, 12).format(null);
            }).to.throw(NullPointerException);
        });
    });
});

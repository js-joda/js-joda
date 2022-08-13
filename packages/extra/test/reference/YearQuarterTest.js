/*
 * @copyright (c) 2022, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    ChronoField,
    ChronoUnit,
    DateTimeException,
    DateTimeFormatter,
    DateTimeParseException,
    IllegalArgumentException,
    IsoChronology,
    IsoFields,
    LocalDate,
    LocalTime,
    NullPointerException,
    TemporalQueries,
    UnsupportedTemporalTypeException,
    ValueRange,
    Year,
} from '@js-joda/core';

import '../_init';

import { assertEquals, assertThrows } from '../testUtils';

import { YearQuarter } from '../../src/YearQuarter';
import { Quarter } from '../../src/Quarter';

import { _ as jodaInternal } from '@js-joda/core';

const MathUtil = jodaInternal.MathUtil;

describe('org.threeten.extra.TestYearQuarter', () => {
    const TEST = YearQuarter.of(2012, Quarter.Q2);
    const STANDARD_YEAR_LENGTH = 365;
    const LEAP_YEAR_LENGTH = 366;

    //-----------------------------------------------------------------------
    // of(Year,Quarter)
    //-----------------------------------------------------------------------
    describe('of(Year,Quarter)', () => {
        it('test_of_Year_Quarter', () => {
            for (let year = -1; year <= 1; year++) {
                for (const quarter of Quarter.values()) {
                    const test = YearQuarter.of(Year.of(year), quarter);
                    assertEquals(year, test.year());
                    assertEquals(quarter.value(), test.quarterValue());
                    assertEquals(quarter, test.quarter());
                }
            }
        });

        it('test_of_Year_Quarter_nullQuarter', () => {
            assertThrows(NullPointerException.class, () => YearQuarter.of(Year.of(2012), null));
        });

        it('test_of_Year_Quarter_nullYear', () => {
            assertThrows(NullPointerException.class, () => YearQuarter.of(null, Quarter.Q2));
        });

        it('test_of_Year_Quarter_nullBoth', () => {
            assertThrows(NullPointerException.class, () => YearQuarter.of(null, null));
        });
    });

    //-----------------------------------------------------------------------
    // of(Year,int)
    //-----------------------------------------------------------------------
    describe('of(Year,int)', () => {
        it('test_of_Year_int', () => {
            for (let year = -1; year <= 1; year++) {
                for (const quarter of Quarter.values()) {
                    const test = YearQuarter.of(Year.of(year), quarter.value());
                    assertEquals(year, test.year());
                    assertEquals(quarter.value(), test.quarterValue());
                    assertEquals(quarter, test.quarter());
                }
            }
        });

        it('test_of_Year_int_null', () => {
            assertThrows(NullPointerException.class, () => YearQuarter.of(null, 2));
        });
    });

    //-----------------------------------------------------------------------
    // of(int,Quarter)
    //-----------------------------------------------------------------------
    describe('of(int,Quarter)', () => {
        it('test_of_int_Quarter', () => {
            for (let year = -1; year <= 1; year++) {
                for (const quarter of Quarter.values()) {
                    const test = YearQuarter.of(year, quarter);
                    assertEquals(year, test.year());
                    assertEquals(quarter.value(), test.quarterValue());
                    assertEquals(quarter, test.quarter());
                }
            }
        });

        it('test_of_int_Quarter_yearTooLow', () => {
            assertThrows(DateTimeException.class, () => YearQuarter.of(Year.MIN_VALUE - 1, Quarter.Q2));
        });

        it('test_of_int_Quarter_yearTooHigh', () => {
            assertThrows(DateTimeException.class, () => YearQuarter.of(Year.MAX_VALUE + 1, Quarter.Q2));
        });

        it('test_of_int_Quarter_null', () => {
            assertThrows(NullPointerException.class, () => YearQuarter.of(2012, null));
        });
    });

    //-----------------------------------------------------------------------
    // of(int,int)
    //-----------------------------------------------------------------------
    describe('of(int,int)', () => {
        it('test_of_int_int', () => {
            for (let year = -1; year <= 1; year++) {
                for (let quarter = 1; quarter <= 4; quarter++) {
                    const test = YearQuarter.of(year, quarter);
                    assertEquals(year, test.year());
                    assertEquals(quarter, test.quarterValue());
                    assertEquals(Quarter.of(quarter), test.quarter());
                    assertEquals(test, YearQuarter.of(year, quarter));
                    assertEquals(test.hashCode(), YearQuarter.of(year, quarter).hashCode());
                }
            }
        });
    });

    //-----------------------------------------------------------------------
    // from(TemporalAccessor)
    //-----------------------------------------------------------------------
    describe('from(TemporalAccessor)', () => {
        it('test_from_TemporalAccessor_notLeapYear', () => {
            let date = LocalDate.of(2007, 1, 1);
            for (let i = 1; i <= STANDARD_YEAR_LENGTH; i++) {
                const test = YearQuarter.from(date);
                const expected = MathUtil.intDiv(date.monthValue() - 1, 3) + 1;
                assertEquals(YearQuarter.of(2007, expected), test);
                date = date.plusDays(1);
            }
        });

        it('test_from_TemporalAccessor_leapYear', () => {
            let date = LocalDate.of(2008, 1, 1);
            for (let i = 1; i <= LEAP_YEAR_LENGTH; i++) {
                const test = YearQuarter.from(date);
                const expected = MathUtil.intDiv(date.monthValue() - 1, 3) + 1;
                assertEquals(YearQuarter.of(2008, expected), test);
                date = date.plusDays(1);
            }
        });

        it('test_from_TemporalAccessor_noDerive', () => {
            assertThrows(DateTimeException.class, () => YearQuarter.from(LocalTime.NOON));
        });

        it('test_from_TemporalAccessor_null', () => {
            assertThrows(NullPointerException.class, () => YearQuarter.from(null));
        });
    });

    //-----------------------------------------------------------------------
    // parse(CharSequence)
    //-----------------------------------------------------------------------
    describe('parse(CharSequence)', () => {
        it('test_test_parse_CharSequence', () => {
            assertEquals(YearQuarter.of(2012, Quarter.Q3), YearQuarter.parse('2012-Q3'));
        });

        it('test_parse_CharSequence_caseInsensitive', () => {
            assertEquals(YearQuarter.of(2012, Quarter.Q3), YearQuarter.parse('2012-q3'));
        });

        it('test_parse_CharSequenceDate_invalidYear', () => {
            assertThrows(DateTimeParseException.class, () => YearQuarter.parse('12345-Q3'));
        });

        it('test_parse_CharSequenceDate_invalidQuarter', () => {
            assertThrows(DateTimeParseException.class, () => YearQuarter.parse('2012-Q0'));
        });

        it('test_parse_CharSequenceDate_nullCharSequence', () => {
            assertThrows(NullPointerException.class, () => YearQuarter.parse(null));
        });
    });

    //-----------------------------------------------------------------------
    // parse(CharSequence,DateTimeFormatter)
    //-----------------------------------------------------------------------
    describe('parse(CharSequence,DateTimeFormatter)', () => {
        it('test_parse_CharSequenceDateTimeFormatter', () => {
            const f = DateTimeFormatter.ofPattern("'Q'Q uuuu");
            assertEquals(YearQuarter.of(2012, Quarter.Q3), YearQuarter.parse('Q3 2012', f));
        });

        it('test_parse_CharSequenceDateDateTimeFormatter_invalidQuarter', () => {
            const f = DateTimeFormatter.ofPattern("'Q'Q uuuu");
            assertThrows(DateTimeParseException, () => YearQuarter.parse('Q0 2012', f));
        });

        it('test_parse_CharSequenceDateTimeFormatter_nullCharSequence', () => {
            const f = DateTimeFormatter.ofPattern("'Q'Q uuuu");
            assertThrows(NullPointerException, () => YearQuarter.parse(null, f));
        });

        it('test_parse_CharSequenceDateTimeFormatter_nullDateTimeFormatter', () => {
            assertThrows(NullPointerException, () => YearQuarter.parse('', null));
        });
    });

    //-----------------------------------------------------------------------
    // isSupported(TemporalField)
    //-----------------------------------------------------------------------
    describe('isSupported(TemporalField)', () => {
        it('test_isSupported_TemporalField', () => {
            assertEquals(false, TEST.isSupported(null));
            assertEquals(false, TEST.isSupported(ChronoField.NANO_OF_SECOND));
            assertEquals(false, TEST.isSupported(ChronoField.NANO_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.MICRO_OF_SECOND));
            assertEquals(false, TEST.isSupported(ChronoField.MICRO_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.MILLI_OF_SECOND));
            assertEquals(false, TEST.isSupported(ChronoField.MILLI_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.SECOND_OF_MINUTE));
            assertEquals(false, TEST.isSupported(ChronoField.SECOND_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.MINUTE_OF_HOUR));
            assertEquals(false, TEST.isSupported(ChronoField.MINUTE_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.HOUR_OF_AMPM));
            assertEquals(false, TEST.isSupported(ChronoField.CLOCK_HOUR_OF_AMPM));
            assertEquals(false, TEST.isSupported(ChronoField.HOUR_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.CLOCK_HOUR_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.AMPM_OF_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.DAY_OF_WEEK));
            assertEquals(false, TEST.isSupported(ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH));
            assertEquals(false, TEST.isSupported(ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR));
            assertEquals(false, TEST.isSupported(ChronoField.DAY_OF_MONTH));
            assertEquals(false, TEST.isSupported(ChronoField.DAY_OF_YEAR));
            assertEquals(false, TEST.isSupported(ChronoField.EPOCH_DAY));
            assertEquals(false, TEST.isSupported(ChronoField.ALIGNED_WEEK_OF_MONTH));
            assertEquals(false, TEST.isSupported(ChronoField.ALIGNED_WEEK_OF_YEAR));
            assertEquals(false, TEST.isSupported(ChronoField.MONTH_OF_YEAR));
            assertEquals(false, TEST.isSupported(ChronoField.PROLEPTIC_MONTH));
            assertEquals(true, TEST.isSupported(ChronoField.YEAR_OF_ERA));
            assertEquals(true, TEST.isSupported(ChronoField.YEAR));
            assertEquals(true, TEST.isSupported(ChronoField.ERA));
            assertEquals(false, TEST.isSupported(ChronoField.INSTANT_SECONDS));
            assertEquals(false, TEST.isSupported(ChronoField.OFFSET_SECONDS));
            assertEquals(true, TEST.isSupported(IsoFields.QUARTER_OF_YEAR));
            assertEquals(false, TEST.isSupported(IsoFields.DAY_OF_QUARTER));
        });
    });

    //-----------------------------------------------------------------------
    // isSupported(TemporalUnit)
    //-----------------------------------------------------------------------
    describe('isSupported(TemporalUnit)', () => {
        it('test_isSupported_TemporalUnit', () => {
            assertEquals(false, TEST.isSupported(null));
            assertEquals(false, TEST.isSupported(ChronoUnit.NANOS));
            assertEquals(false, TEST.isSupported(ChronoUnit.MICROS));
            assertEquals(false, TEST.isSupported(ChronoUnit.MILLIS));
            assertEquals(false, TEST.isSupported(ChronoUnit.SECONDS));
            assertEquals(false, TEST.isSupported(ChronoUnit.MINUTES));
            assertEquals(false, TEST.isSupported(ChronoUnit.HOURS));
            assertEquals(false, TEST.isSupported(ChronoUnit.DAYS));
            assertEquals(false, TEST.isSupported(ChronoUnit.WEEKS));
            assertEquals(false, TEST.isSupported(ChronoUnit.MONTHS));
            assertEquals(true, TEST.isSupported(ChronoUnit.YEARS));
            assertEquals(true, TEST.isSupported(ChronoUnit.DECADES));
            assertEquals(true, TEST.isSupported(ChronoUnit.CENTURIES));
            assertEquals(true, TEST.isSupported(ChronoUnit.MILLENNIA));
            assertEquals(true, TEST.isSupported(ChronoUnit.ERAS));
            assertEquals(false, TEST.isSupported(ChronoUnit.FOREVER));
            assertEquals(true, TEST.isSupported(IsoFields.QUARTER_YEARS));
        });
    });

    //-----------------------------------------------------------------------
    // range(TemporalField)
    //-----------------------------------------------------------------------
    describe('range(TemporalField)', () => {
        it('test_range', () => {
            assertEquals(IsoFields.QUARTER_OF_YEAR.range(), TEST.range(IsoFields.QUARTER_OF_YEAR));
            assertEquals(ChronoField.YEAR.range(), TEST.range(ChronoField.YEAR));
            assertEquals(ValueRange.of(1, Year.MAX_VALUE), TEST.range(ChronoField.YEAR_OF_ERA));
            assertEquals(ChronoField.ERA.range(), TEST.range(ChronoField.ERA));
        });

        it('test_range_invalidField', () => {
            assertThrows(UnsupportedTemporalTypeException, () => TEST.range(ChronoField.MONTH_OF_YEAR));
        });

        it('test_range_null', () => {
            assertThrows(NullPointerException.class, () => TEST.range(null));
        });
    });

    //-----------------------------------------------------------------------
    // get(TemporalField)
    //-----------------------------------------------------------------------
    describe('get(TemporalField)', () => {
        it('test_get', () => {
            assertEquals(2, TEST.get(IsoFields.QUARTER_OF_YEAR));
            assertEquals(2012, TEST.get(ChronoField.YEAR));
            assertEquals(2012, TEST.get(ChronoField.YEAR_OF_ERA));
            assertEquals(1, TEST.get(ChronoField.ERA));
        });

        it('test_get_invalidField', () => {
            assertThrows(UnsupportedTemporalTypeException, () => TEST.get(ChronoField.MONTH_OF_YEAR));
        });

        it('test_get_null', () => {
            assertThrows(NullPointerException, () => TEST.get(null));
        });
    });

    //-----------------------------------------------------------------------
    // getLong(TemporalField)
    //-----------------------------------------------------------------------
    describe('getLong(TemporalField)', () => {
        it('test_get', () => {
            assertEquals(2, TEST.getLong(IsoFields.QUARTER_OF_YEAR));
            assertEquals(2012, TEST.getLong(ChronoField.YEAR));
            assertEquals(2012, TEST.getLong(ChronoField.YEAR_OF_ERA));
            assertEquals(1, TEST.getLong(ChronoField.ERA));
        });

        it('test_get_invalidField', () => {
            assertThrows(UnsupportedTemporalTypeException, () => TEST.getLong(ChronoField.MONTH_OF_YEAR));
        });

        it('test_get_null', () => {
            assertThrows(NullPointerException, () => TEST.getLong(null));
        });
    });

    //-----------------------------------------------------------------------
    // isLeapYear(int)
    //-----------------------------------------------------------------------
    describe('isLeapYear(int)', () => {
        it('test_isLeapYear_int', () => {
            for (let year = -500; year <= 500; year++) {
                for (const quarter of Quarter.values()) {
                    const test = YearQuarter.of(year, quarter);
                    assertEquals(Year.isLeap(year), test.isLeapYear());
                }
            }
        });
    });

    //-----------------------------------------------------------------------
    // isValidDay(int)
    //-----------------------------------------------------------------------
    describe('isValidDay(int)', () => {
        it('test_isValidDay_int_nonLeap', () => {
            assertEquals(true, YearQuarter.of(2011, Quarter.Q1).isValidDay(90));
            assertEquals(false, YearQuarter.of(2011, Quarter.Q1).isValidDay(91));
            assertEquals(false, YearQuarter.of(2011, Quarter.Q1).isValidDay(92));

            assertEquals(true, YearQuarter.of(2011, Quarter.Q2).isValidDay(90));
            assertEquals(true, YearQuarter.of(2011, Quarter.Q2).isValidDay(91));
            assertEquals(false, YearQuarter.of(2011, Quarter.Q2).isValidDay(92));

            assertEquals(true, YearQuarter.of(2011, Quarter.Q3).isValidDay(90));
            assertEquals(true, YearQuarter.of(2011, Quarter.Q3).isValidDay(91));
            assertEquals(true, YearQuarter.of(2011, Quarter.Q4).isValidDay(90));

            assertEquals(true, YearQuarter.of(2011, Quarter.Q3).isValidDay(92));
            assertEquals(true, YearQuarter.of(2011, Quarter.Q4).isValidDay(91));
            assertEquals(true, YearQuarter.of(2011, Quarter.Q4).isValidDay(92));
        });

        it('test_isValidDay_int_leap', () => {
            assertEquals(true, YearQuarter.of(2012, Quarter.Q1).isValidDay(90));
            assertEquals(true, YearQuarter.of(2012, Quarter.Q1).isValidDay(91));
            assertEquals(false, YearQuarter.of(2012, Quarter.Q1).isValidDay(92));

            assertEquals(true, YearQuarter.of(2012, Quarter.Q2).isValidDay(90));
            assertEquals(true, YearQuarter.of(2012, Quarter.Q2).isValidDay(91));
            assertEquals(false, YearQuarter.of(2012, Quarter.Q2).isValidDay(92));

            assertEquals(true, YearQuarter.of(2012, Quarter.Q3).isValidDay(90));
            assertEquals(true, YearQuarter.of(2012, Quarter.Q3).isValidDay(91));
            assertEquals(true, YearQuarter.of(2012, Quarter.Q3).isValidDay(92));

            assertEquals(true, YearQuarter.of(2012, Quarter.Q4).isValidDay(90));
            assertEquals(true, YearQuarter.of(2012, Quarter.Q4).isValidDay(91));
            assertEquals(true, YearQuarter.of(2012, Quarter.Q4).isValidDay(92));
        });

        it('test_isValidDay_int_outOfRange', () => {
            assertEquals(false, YearQuarter.of(2011, Quarter.Q1).isValidDay(93));
            assertEquals(false, YearQuarter.of(2011, Quarter.Q2).isValidDay(93));
            assertEquals(false, YearQuarter.of(2011, Quarter.Q3).isValidDay(93));
            assertEquals(false, YearQuarter.of(2011, Quarter.Q4).isValidDay(93));
    
            assertEquals(false, YearQuarter.of(2011, Quarter.Q1).isValidDay(0));
            assertEquals(false, YearQuarter.of(2011, Quarter.Q2).isValidDay(0));
            assertEquals(false, YearQuarter.of(2011, Quarter.Q3).isValidDay(0));
            assertEquals(false, YearQuarter.of(2011, Quarter.Q4).isValidDay(0));
        });
    });

    //-----------------------------------------------------------------------
    // lengthOfQuarter()
    //-----------------------------------------------------------------------
    describe('lengthOfQuarter()', () => {
        it('test_lengthOfQuarter', () => {
            for (let year = -500; year <= 500; year++) {
                assertEquals(Year.isLeap(year) ? 91 : 90, YearQuarter.of(year, Quarter.Q1).lengthOfQuarter());
                assertEquals(91, YearQuarter.of(year, Quarter.Q2).lengthOfQuarter());
                assertEquals(92, YearQuarter.of(year, Quarter.Q3).lengthOfQuarter());
                assertEquals(92, YearQuarter.of(year, Quarter.Q4).lengthOfQuarter());
            }
        });
    });

    //-----------------------------------------------------------------------
    // with(TemporalAdjuster)
    //-----------------------------------------------------------------------
    describe('with(TemporalAdjuster)', () => {
        it('test_with_TemporalAdjuster_Quarter', () => {
            assertEquals(YearQuarter.of(2007, Quarter.Q1), YearQuarter.of(2007, Quarter.Q2).with(Quarter.Q1));
        });

        it('test_with_TemporalAdjuster_Year', () => {
            assertEquals(YearQuarter.of(2012, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).with(Year.of(2012)));
        });

        it('test_with_TemporalAdjuster_YearQuarter', () => {
            assertEquals(YearQuarter.of(2012, Quarter.Q3), YearQuarter.of(2007, Quarter.Q2).with(YearQuarter.of(2012, Quarter.Q3)));
        });

        it('test_with_TemporalAdjuster_LocalDate', () => {
            assertThrows(DateTimeException, () => YearQuarter.of(2007, Quarter.Q2).with(LocalDate.of(2012, 6, 30)));
        });

        it('test_with_TemporalAdjuster_null', () => {
            assertThrows(NullPointerException, () => YearQuarter.of(2007, Quarter.Q2).with(null));
        });
    });

    //-----------------------------------------------------------------------
    // withYear(int)
    //-----------------------------------------------------------------------
    describe('withYear(int)', () => {
        it('test_withYear', () => {
            assertEquals(YearQuarter.of(2012, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).withYear(2012));
        });

        it('test_withYear_int_quarterTooLow', () => {
            assertThrows(DateTimeException, () => TEST.withYear(Year.MIN_VALUE - 1));
        });

        it('test_withYear_int_quarterTooHigh', () => {
            assertThrows(DateTimeException, () => TEST.withYear(Year.MAX_VALUE + 1));
        });
    });

    //-----------------------------------------------------------------------
    // withQuarter(int)
    //-----------------------------------------------------------------------
    describe('withQuarter(int)', () => {
        it('test_withQuarter_int', () => {
            assertEquals(YearQuarter.of(2007, Quarter.Q1), YearQuarter.of(2007, Quarter.Q2).withQuarter(1));
        });

        it('test_withQuarter_int_quarterTooLow', () => {
            assertThrows(DateTimeException, () => TEST.withQuarter(0));
        });

        it('test_withQuarter_int_quarterTooHigh', () => {
            assertThrows(DateTimeException, () => TEST.withQuarter(5));
        });
    });

    //-----------------------------------------------------------------------
    // plus(long,TemporalUnit)
    //-----------------------------------------------------------------------
    describe('plus(long,TemporalUnit)', () => {
        it('test_plus_longTemporalUnit', () => {
            assertEquals(YearQuarter.of(2012, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).plus(5, ChronoUnit.YEARS));
            assertEquals(YearQuarter.of(2007, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).plus(0, ChronoUnit.YEARS));
            assertEquals(YearQuarter.of(2002, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).plus(-5, ChronoUnit.YEARS));
            assertEquals(YearQuarter.of(2008, Quarter.Q3), YearQuarter.of(2007, Quarter.Q2).plus(5, IsoFields.QUARTER_YEARS));
            assertEquals(YearQuarter.of(2007, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).plus(0, IsoFields.QUARTER_YEARS));
            assertEquals(YearQuarter.of(2006, Quarter.Q1), YearQuarter.of(2007, Quarter.Q2).plus(-5, IsoFields.QUARTER_YEARS));
        });
    });

    //-----------------------------------------------------------------------
    // plusYears(int)
    //-----------------------------------------------------------------------
    describe('plusYears(int)', () => {
        it('test_plusYears', () => {
            assertEquals(YearQuarter.of(2012, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).plusYears(5));
            assertEquals(YearQuarter.of(2007, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).plusYears(0));
            assertEquals(YearQuarter.of(2002, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).plusYears(-5));
        });
    });

    //-----------------------------------------------------------------------
    // plusQuarters(int)
    //-----------------------------------------------------------------------
    describe('plusQuarters(int)', () => {
        it('test_plusQuarters', () => {
            assertEquals(YearQuarter.of(2008, Quarter.Q3), YearQuarter.of(2007, Quarter.Q2).plusQuarters(5));
            assertEquals(YearQuarter.of(2007, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).plusQuarters(0));
            assertEquals(YearQuarter.of(2006, Quarter.Q1), YearQuarter.of(2007, Quarter.Q2).plusQuarters(-5));
        });
    });

    //-----------------------------------------------------------------------
    // minus(long,TemporalUnit)
    //-----------------------------------------------------------------------
    describe('minus(long,TemporalUnit)', () => {
        it('test_minus_longTemporalUnit', () => {
            assertEquals(YearQuarter.of(2002, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).minus(5, ChronoUnit.YEARS));
            assertEquals(YearQuarter.of(2007, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).minus(0, ChronoUnit.YEARS));
            assertEquals(YearQuarter.of(2012, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).minus(-5, ChronoUnit.YEARS));
            assertEquals(YearQuarter.of(2006, Quarter.Q1), YearQuarter.of(2007, Quarter.Q2).minus(5, IsoFields.QUARTER_YEARS));
            assertEquals(YearQuarter.of(2007, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).minus(0, IsoFields.QUARTER_YEARS));
            assertEquals(YearQuarter.of(2008, Quarter.Q3), YearQuarter.of(2007, Quarter.Q2).minus(-5, IsoFields.QUARTER_YEARS));
        });
    });

    //-----------------------------------------------------------------------
    // minusYears(int)
    //-----------------------------------------------------------------------
    describe('minusYears(int)', () => {
        it('test_minusYears', () => {
            assertEquals(YearQuarter.of(2002, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).minusYears(5));
            assertEquals(YearQuarter.of(2007, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).minusYears(0));
            assertEquals(YearQuarter.of(2012, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).minusYears(-5));
        });
    });

    //-----------------------------------------------------------------------
    // minusQuarters(int)
    //-----------------------------------------------------------------------
    describe('minusQuarters(int)', () => {
        it('test_minusQuarters', () => {
            assertEquals(YearQuarter.of(2006, Quarter.Q1), YearQuarter.of(2007, Quarter.Q2).minusQuarters(5));
            assertEquals(YearQuarter.of(2007, Quarter.Q2), YearQuarter.of(2007, Quarter.Q2).minusQuarters(0));
            assertEquals(YearQuarter.of(2008, Quarter.Q3), YearQuarter.of(2007, Quarter.Q2).minusQuarters(-5));
        });
    });

    //-----------------------------------------------------------------------
    // lengthOfYear()
    //-----------------------------------------------------------------------
    describe('lengthOfYear()', () => {
        it('test_lengthOfYear', () => {
            for (let year = -500; year <= 500; year++) {
                for (const quarter of Quarter.values()) {
                    const test = YearQuarter.of(year, quarter);
                    assertEquals(Year.isLeap(year) ? 366 : 365, test.lengthOfYear());
                }
            }
        });
    });

    //-----------------------------------------------------------------------
    // query(TemporalQuery)
    //-----------------------------------------------------------------------
    describe('query(TemporalQuery)', () => {
        it('test_query', () => {
            assertEquals(IsoChronology.INSTANCE, TEST.query(TemporalQueries.chronology()));
            assertEquals(null, TEST.query(TemporalQueries.localDate()));
            assertEquals(null, TEST.query(TemporalQueries.localTime()));
            assertEquals(null, TEST.query(TemporalQueries.offset()));
            assertEquals(IsoFields.QUARTER_YEARS, TEST.query(TemporalQueries.precision()));
            assertEquals(null, TEST.query(TemporalQueries.zone()));
            assertEquals(null, TEST.query(TemporalQueries.zoneId()));
        });
    });

    //-----------------------------------------------------------------------
    // adjustInto(Temporal)
    //-----------------------------------------------------------------------
    describe('adjustInto(Temporal)', () => {
        it('test_adjustInto_Temporal', () => {
            for (let month = 1; month < 12; month++) {
                for (let dom = 1; dom < 28; dom++) {
                    const base = LocalDate.of(2007, month, dom);
                    const expected = LocalDate.of(2012, 4 + ((month - 1) % 3), dom);
                    assertEquals(expected, YearQuarter.of(2012, Quarter.Q2).adjustInto(base));
                }
            }
        });

        it('test_adjustInto_Temporal_lastValidDay_nonLeap', () => {
            const base = LocalDate.of(2007, 5, 31);
            const expected = LocalDate.of(2011, 2, 28);
            assertEquals(expected, YearQuarter.of(2011, Quarter.Q1).adjustInto(base));
        });

        it('test_adjustInto_Temporal_lastValidDay_leap', () => {
            const base = LocalDate.of(2007, 5, 31);
            const expected = LocalDate.of(2012, 2, 29);
            assertEquals(expected, YearQuarter.of(2012, Quarter.Q1).adjustInto(base));
        });

        it('test_adjustInto_Temporal_null', () => {
            assertThrows(NullPointerException.class, () => TEST.adjustInto(null));
        });
    });

    //-----------------------------------------------------------------------
    // until(Temporal,TemporalUnit)
    //-----------------------------------------------------------------------
    describe('until(Temporal,TemporalUnit)', () => {
        it('test_until_TemporalTemporalUnit_QUARTER_YEARS', () => {
            assertEquals(-2, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2011, Quarter.Q4), IsoFields.QUARTER_YEARS));
            assertEquals(-1, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2012, Quarter.Q1), IsoFields.QUARTER_YEARS));
            assertEquals(0, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2012, Quarter.Q2), IsoFields.QUARTER_YEARS));
            assertEquals(1, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2012, Quarter.Q3), IsoFields.QUARTER_YEARS));
            assertEquals(2, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2012, Quarter.Q4), IsoFields.QUARTER_YEARS));
            assertEquals(3, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2013, Quarter.Q1), IsoFields.QUARTER_YEARS));
            assertEquals(4, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2013, Quarter.Q2), IsoFields.QUARTER_YEARS));
            assertEquals(5, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2013, Quarter.Q3), IsoFields.QUARTER_YEARS));
        });

        it('test_until_TemporalTemporalUnit_YEARS', () => {
            assertEquals(-2, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2010, Quarter.Q2), ChronoUnit.YEARS));
            assertEquals(-1, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2010, Quarter.Q3), ChronoUnit.YEARS));
            assertEquals(-1, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2010, Quarter.Q4), ChronoUnit.YEARS));
            assertEquals(-1, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2011, Quarter.Q1), ChronoUnit.YEARS));
            assertEquals(-1, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2011, Quarter.Q2), ChronoUnit.YEARS));
            assertEquals(0, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2011, Quarter.Q3), ChronoUnit.YEARS));
            assertEquals(0, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2011, Quarter.Q4), ChronoUnit.YEARS));
            assertEquals(0, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2012, Quarter.Q1), ChronoUnit.YEARS));
            assertEquals(0, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2012, Quarter.Q2), ChronoUnit.YEARS));
            assertEquals(0, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2012, Quarter.Q3), ChronoUnit.YEARS));
            assertEquals(0, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2012, Quarter.Q4), ChronoUnit.YEARS));
            assertEquals(0, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2013, Quarter.Q1), ChronoUnit.YEARS));
            assertEquals(1, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2013, Quarter.Q2), ChronoUnit.YEARS));
            assertEquals(1, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2013, Quarter.Q3), ChronoUnit.YEARS));
            assertEquals(1, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2013, Quarter.Q4), ChronoUnit.YEARS));
            assertEquals(1, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2014, Quarter.Q1), ChronoUnit.YEARS));
            assertEquals(2, YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2014, Quarter.Q2), ChronoUnit.YEARS));
        });

        it('test_until_TemporalTemporalUnit_nullTemporal', () => {
            assertThrows(NullPointerException.class, () => YearQuarter.of(2012, Quarter.Q2).until(null, IsoFields.QUARTER_YEARS));
        });

        it('test_until_TemporalTemporalUnit_nullTemporalUnit', () => {
            assertThrows(NullPointerException.class, () => YearQuarter.of(2012, Quarter.Q2).until(YearQuarter.of(2012, Quarter.Q3), null));
        });
    });

    //-----------------------------------------------------------------------
    // quartersUntil(YearQuarter)
    //-----------------------------------------------------------------------
    describe('quartersUntil(YearQuarter)', () => {
        it('test_quartersUntil_null', () => {
            assertThrows(NullPointerException, () => YearQuarter.of(2012, Quarter.Q2).quartersUntil(null));
        });

        it('test_quartersUntil_IllegalArgument', () => {
            assertThrows(IllegalArgumentException, () => YearQuarter.of(2012, Quarter.Q2).quartersUntil(YearQuarter.of(2012, Quarter.Q1)));
        });

        it('test_quartersUntil', () => {
            assertEquals(2, [...YearQuarter.of(2012, Quarter.Q2).quartersUntil(YearQuarter.of(2012, Quarter.Q4))].length);
            assertEquals(10, [...YearQuarter.of(2012, Quarter.Q2).quartersUntil(YearQuarter.of(2014, Quarter.Q4))].length);

            const start = YearQuarter.of(2012, Quarter.Q1);
            const end = YearQuarter.of(2013, Quarter.Q3);
            const stream = start.quartersUntil(end);

            const expects = [
                YearQuarter.of(start.year(), Quarter.Q1),
                YearQuarter.of(start.year(), Quarter.Q2),
                YearQuarter.of(start.year(), Quarter.Q3),
                YearQuarter.of(start.year(), Quarter.Q4),
                YearQuarter.of(end.year(), Quarter.Q1),
                YearQuarter.of(end.year(), Quarter.Q2)
            ];
            assertEquals(expects, [...stream]);
        });
    });

    //-----------------------------------------------------------------------
    // format(DateTimeFormatter)
    //-----------------------------------------------------------------------
    describe('format(DateTimeFormatter)', () => {
        it('test_format', () => {
            const f = DateTimeFormatter.ofPattern("'Q'Q uuuu");
            assertEquals('Q1 2012', YearQuarter.of(2012, Quarter.Q1).format(f));
        });

        it('test_format_null', () => {
            assertThrows(NullPointerException.class, () => TEST.format(null));
        });
    });

    //-----------------------------------------------------------------------
    // atDay(int)
    //-----------------------------------------------------------------------
    describe('atDay(int)', () => {
        it('test_atDay', () => {
            for (let i = 1; i <= 90; i++) {
                const expected = LocalDate.of(2012, 1, 1).plusDays(i - 1);
                assertEquals(expected, YearQuarter.of(2012, Quarter.Q1).atDay(i));
            }
            for (let i = 1; i <= 91; i++) {
                const expected = LocalDate.of(2012, 4, 1).plusDays(i - 1);
                assertEquals(expected, YearQuarter.of(2012, Quarter.Q2).atDay(i));
            }
            for (let i = 1; i <= 92; i++) {
                const expected = LocalDate.of(2012, 7, 1).plusDays(i - 1);
                assertEquals(expected, YearQuarter.of(2012, Quarter.Q3).atDay(i));
            }
            for (let i = 1; i <= 92; i++) {
                const expected = LocalDate.of(2012, 10, 1).plusDays(i - 1);
                assertEquals(expected, YearQuarter.of(2012, Quarter.Q4).atDay(i));
            }
        });

        it('test_atDay_Q1_91_leap', () => {
            assertEquals(LocalDate.of(2012, 3, 31), YearQuarter.of(2012, Quarter.Q1).atDay(91));
        });

        it('test_atDay_Q1_91_notLeap', () => {
            assertThrows(DateTimeException.class, () => YearQuarter.of(2011, Quarter.Q1).atDay(91));
        });

        it('test_atDay_Q1_92', () => {
            assertThrows(DateTimeException.class, () => YearQuarter.of(2012, Quarter.Q1).atDay(92));
        });

        it('test_atDay_Q2_92', () => {
            assertThrows(DateTimeException.class, () => YearQuarter.of(2012, Quarter.Q2).atDay(92));
        });

        it('test_atDay_tooLow', () => {
            assertThrows(DateTimeException.class, () => TEST.atDay(0));
        });

        it('test_atDay_tooHigh', () => {
            assertThrows(DateTimeException.class, () => TEST.atDay(93));
        });
    });

    //-----------------------------------------------------------------------
    // atEndOfQuarter(int)
    //-----------------------------------------------------------------------
    describe('atEndOfQuarter(int)', () => {
        it('test_atEndOfQuarter', () => {
            assertEquals(LocalDate.of(2011, 3, 31), YearQuarter.of(2011, Quarter.Q1).atEndOfQuarter());
            assertEquals(LocalDate.of(2011, 6, 30), YearQuarter.of(2011, Quarter.Q2).atEndOfQuarter());
            assertEquals(LocalDate.of(2011, 9, 30), YearQuarter.of(2011, Quarter.Q3).atEndOfQuarter());
            assertEquals(LocalDate.of(2011, 12, 31), YearQuarter.of(2011, Quarter.Q4).atEndOfQuarter());

            assertEquals(LocalDate.of(2012, 3, 31), YearQuarter.of(2012, Quarter.Q1).atEndOfQuarter());
            assertEquals(LocalDate.of(2012, 6, 30), YearQuarter.of(2012, Quarter.Q2).atEndOfQuarter());
            assertEquals(LocalDate.of(2012, 9, 30), YearQuarter.of(2012, Quarter.Q3).atEndOfQuarter());
            assertEquals(LocalDate.of(2012, 12, 31), YearQuarter.of(2012, Quarter.Q4).atEndOfQuarter());
        });
    });

    //-----------------------------------------------------------------------
    // compareTo()
    //-----------------------------------------------------------------------
    describe('compareTo()', () => {
        it('test_compareTo', () => {
            for (let year1 = -1; year1 < 1; year1++) {
                for (const quarter1 of Quarter.values()) {
                    const a = YearQuarter.of(year1, quarter1);
                    for (let year2 = -1; year2 < 1; year2++) {
                        for (const quarter2 of Quarter.values()) {
                            const b = YearQuarter.of(year2, quarter2);
                            if (year1 < year2) {
                                assertEquals(true, a.compareTo(b) < 0);
                                assertEquals(true, b.compareTo(a) > 0);
                                assertEquals(false, a.isAfter(b));
                                assertEquals(false, b.isBefore(a));
                                assertEquals(true, b.isAfter(a));
                                assertEquals(true, a.isBefore(b));
                            } else if (year1 > year2) {
                                assertEquals(true, a.compareTo(b) > 0);
                                assertEquals(true, b.compareTo(a) < 0);
                                assertEquals(true, a.isAfter(b));
                                assertEquals(true, b.isBefore(a));
                                assertEquals(false, b.isAfter(a));
                                assertEquals(false, a.isBefore(b));
                            } else {
                                if (quarter1.value() < quarter2.value()) {
                                    assertEquals(true, a.compareTo(b) < 0);
                                    assertEquals(true, b.compareTo(a) > 0);
                                    assertEquals(false, a.isAfter(b));
                                    assertEquals(false, b.isBefore(a));
                                    assertEquals(true, b.isAfter(a));
                                    assertEquals(true, a.isBefore(b));
                                } else if (quarter1.value() > quarter2.value()) {
                                    assertEquals(true, a.compareTo(b) > 0);
                                    assertEquals(true, b.compareTo(a) < 0);
                                    assertEquals(true, a.isAfter(b));
                                    assertEquals(true, b.isBefore(a));
                                    assertEquals(false, b.isAfter(a));
                                    assertEquals(false, a.isBefore(b));
                                } else {
                                    assertEquals(0, a.compareTo(b));
                                    assertEquals(0, b.compareTo(a));
                                    assertEquals(false, a.isAfter(b));
                                    assertEquals(false, b.isBefore(a));
                                    assertEquals(false, b.isAfter(a));
                                    assertEquals(false, a.isBefore(b));
                                }
                            }
                        }
                    }
                }
            }
        });

        it('test_compareTo', () => {
            assertThrows(NullPointerException.class, () => TEST.compareTo(null));
        });
    });

    //-----------------------------------------------------------------------
    // equals() / hashCode()
    //-----------------------------------------------------------------------
    describe('equals() / hashCode()', () => {
        it('test_equals', () => {
            for (let year1 = -1; year1 < 1; year1++) {
                for (const quarter1 of Quarter.values()) {
                    const a = YearQuarter.of(year1, quarter1);
                    for (let year2 = -1; year2 < 1; year2++) {
                        for (const quarter2 of Quarter.values()) {
                            const b = YearQuarter.of(year2, quarter2);
                            if (year1 === year2 && quarter1 === quarter2) {
                                assertEquals(a, b);
                                assertEquals(a.hashCode(), b.hashCode());
                            }
                        }
                    }
                }
            }
        });

        it('test_equals_nullYearQuarter', () => {
            assertEquals(false, TEST.equals(null));
        });

        it('test_equals_incorrectType', () => {
            assertEquals(false, TEST.equals('Incorrect type'));
        });
    });

    //-----------------------------------------------------------------------
    // toString()
    //-----------------------------------------------------------------------
    describe('toString()', () => {
        it('test_toString', () => {
            assertEquals('2012-Q2', YearQuarter.of(2012, Quarter.Q2).toString());
        });

        it('test_toString_bigYear', () => {
            assertEquals('+10000-Q2', YearQuarter.of(10000, Quarter.Q2).toString());
        });

        it('test_toString_negativeYear', () => {
            assertEquals('-0001-Q2', YearQuarter.of(-1, Quarter.Q2).toString());
        });

        it('test_toString_negativeBigYear', () => {
            assertEquals('-10000-Q2', YearQuarter.of(-10000, Quarter.Q2).toString());
        });
    });
});

/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {expect} from 'chai';
import {assertEquals, assertNotNull, assertTrue, assertFalse, isCoverageTestRunner} from '../testUtils';

import {Clock} from '../../src/Clock';
import {Instant} from '../../src/Instant';
import {LocalDate} from '../../src/LocalDate';
import {Month} from '../../src/Month';
import {DateTimeException, DateTimeParseException, NullPointerException} from '../../src/errors';
import {ZoneOffset} from '../../src/ZoneOffset';
import {Year} from '../../src/Year';

import {IsoChronology} from '../../src/chrono/IsoChronology';
import {ChronoField} from '../../src/temporal/ChronoField';
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {TemporalQueries} from '../../src/temporal/TemporalQueries';

import {MockFieldNoValue} from './temporal/MockFieldNoValue';

describe('org.threeten.bp.TestLocalDate', () => {
    var TEST_2007_07_15;
    var MAX_VALID_EPOCHDAYS;
    var MIN_VALID_EPOCHDAYS;
    var MAX_DATE;
    var MIN_DATE;
    before(() => {
        TEST_2007_07_15 = LocalDate.of(2007, 7, 15);

        MAX_DATE = LocalDate.MAX;
        MIN_DATE = LocalDate.MIN;
        MAX_VALID_EPOCHDAYS = MAX_DATE.toEpochDay();
        MIN_VALID_EPOCHDAYS = MIN_DATE.toEpochDay();
        //MAX_INSTANT = max.atStartOfDay(ZoneOffset.UTC).toInstant();
        //MIN_INSTANT = min.atStartOfDay(ZoneOffset.UTC).toInstant();    
    });

    /**
     * check the provided LocalDate with the year, month, day values
     * @param {LocalDate} test
     * @param {int} y
     * @param {int} m
     * @param {int} d
     */
    function check (test, y, m, d) {
        expect(test.year()).to.equal(y);
        expect(test.month().value()).to.equal(m);
        expect(test.dayOfMonth()).to.equal(d);
        expect(test).to.equal(test);
        expect(LocalDate.of(y, m, d)).to.eql(test);
    }

    function isIsoLeap(year) {
        if (year % 4 !== 0) {
            return false;
        }
        if (year % 100 === 0 && year % 400 !== 0) {
            return false;
        }
        return true;
    }
    
    //-----------------------------------------------------------------------
    // Since plusDays/minusDays actually depends on MJDays, it cannot be used for testing
    function next(date) {
        var newDayOfMonth = date.dayOfMonth() + 1;
        if (newDayOfMonth <= date.month().length(isIsoLeap(date.year()))) {
            return date.withDayOfMonth(newDayOfMonth);
        }
        date = date.withDayOfMonth(1);
        if (date.month() === Month.DECEMBER) {
            date = date.withYear(date.year() + 1);
        }
        return date.withMonth(date.month().plus(1));
    }

    function previous(date) {
        var newDayOfMonth = date.dayOfMonth() - 1;
        if (newDayOfMonth > 0) {
            return date.withDayOfMonth(newDayOfMonth);
        }
        date = date.withMonth(date.month().minus(1));
        if (date.month() === Month.DECEMBER) {
            date = date.withYear(date.year() - 1);
        }
        return date.withDayOfMonth(date.month().length(isIsoLeap(date.year())));
    }

    describe('constants', () => {
        it('LocalDate.MAX', () => {
            check(MAX_DATE, Year.MAX_VALUE, 12, 31);
        });
        it('LocalDate.MIN', () => {
            check(MIN_DATE, Year.MIN_VALUE, 1, 1);
        });
    });

    describe('of() factories', () => {

        it('factory_of_intsMonth', () => {
            expect(LocalDate.of(2007, Month.JULY, 15)).to.eql(TEST_2007_07_15);
        });

        it('factory_of_intsMonth_29febNonLeap', () => {
            expect(() => {
                LocalDate.of(2007, Month.FEBRUARY, 29);
            }).to.throw(DateTimeException);
        });

        it('factory_of_intsMonth_31apr', () => {
            expect(() => {
                LocalDate.of(2007, Month.APRIL, 31);
            }).to.throw(DateTimeException);
        });

        it('factory_of_intsMonth_dayTooLow', () => {
            expect(() => {
                LocalDate.of(2007, Month.JANUARY, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_of_intsMonth_dayTooHigh', () => {
            expect(() => {
                LocalDate.of(2007, Month.JANUARY, 32);
            }).to.throw(DateTimeException);
        });

        it('factory_of_intsMonth_nullMonth', () => {
            expect(() => {
                LocalDate.of(2007, null, 30);
            }).to.throw(DateTimeException); /* NullPointerException in JDK */
        });

        it('factory_of_intsMonth_yearTooLow', () => {
            expect(() => {
                LocalDate.of(Number.MIN_SAFE_INTEGER, null, 30);
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('factory_of_ints', () => {
            check(TEST_2007_07_15, 2007, 7, 15);
        });

        it('factory_of_ints_29febNonLeap', () => {
            expect(() => {
                LocalDate.of(2007, 2, 29);
            }).to.throw(DateTimeException);
        });

        it('factory_of_ints_31apr', () => {
            expect(() => {
                LocalDate.of(2007, 4, 31);
            }).to.throw(DateTimeException);
        });

        it('factory_of_ints_dayTooLow', () => {
            expect(() => {
                LocalDate.of(2007, 1, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_of_ints_dayTooHigh', () => {
            expect(() => {
                LocalDate.of(2007, 1, 32);
            }).to.throw(DateTimeException);
        });

        it('factory_of_ints_monthTooLow', () => {
            expect(() => {
                LocalDate.of(2007, 0, 1);
            }).to.throw(DateTimeException);
        });

        it('factory_of_ints_monthTooHigh', () => {
            expect(() => {
                LocalDate.of(2007, 13, 1);
            }).to.throw(DateTimeException);
        });

        it('factory_of_ints_yearTooLow', () => {
            expect(() => {
                LocalDate.of(Number.MIN_SAFE_INTEGER, 1, 1);
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('factory_ofYearDay_ints_nonLeap', () => {
            var date = LocalDate.of(2007, 1, 1);
            for (let i = 1; i < 365; i++) {
                expect(LocalDate.ofYearDay(2007, i)).to.eql(date);
                date = next(date);
            }
        });

        it('factory_ofYearDay_ints_leap', () => {
            var date = LocalDate.of(2008, 1, 1);
            for (let i = 1; i < 366; i++) {
                expect(LocalDate.ofYearDay(2008, i)).to.eql(date);
                date = next(date);
            }
        });

        it('factory_ofYearDay_ints_366nonLeap', () => {
            expect(() => {
                LocalDate.ofYearDay(2007, 366);
            }).to.throw(DateTimeException);
        });

        it('factory_ofYearDay_ints_dayTooLow', () => {
            expect(() => {
                LocalDate.ofYearDay(2007, 0);
            }).to.throw(DateTimeException);
        });

        it('factory_ofYearDay_ints_dayTooHigh', () => {
            expect(() => {
                LocalDate.ofYearDay(2007, 367);
            }).to.throw(DateTimeException);
        });

        it('factory_ofYearDay_ints_yearTooLow', () => {
            expect(() => {
                LocalDate.ofYearDay(Number.MIN_SAFE_INTEGER, 1);
            }).to.throw(DateTimeException);
        });
    });

    describe('ofEpochDay()', () => {
        it('factory_ofEpochDay', () => {
            let date_0000_01_01 = -678941 - 40587;
            expect(LocalDate.ofEpochDay(0)).to.eql(LocalDate.of(1970, 1, 1));
            expect(LocalDate.ofEpochDay(date_0000_01_01)).to.eql(LocalDate.of(0, 1, 1));
            expect(LocalDate.ofEpochDay(date_0000_01_01 - 1)).to.eql(LocalDate.of(-1, 12, 31));
            expect(LocalDate.ofEpochDay(MAX_VALID_EPOCHDAYS)).to.eql(LocalDate.of(Year.MAX_VALUE, 12, 31));
            expect(LocalDate.ofEpochDay(MIN_VALID_EPOCHDAYS)).to.eql(LocalDate.of(Year.MIN_VALUE, 1, 1));
        });

        it('factory_ofEpochDay_aboveMax', () => {
            expect(() => {
                LocalDate.ofEpochDay(MAX_VALID_EPOCHDAYS + 1);
            }).to.throw(DateTimeException);
        });

        it('factory_ofEpochDay_belowMin', () => {
            expect(() => {
                LocalDate.ofEpochDay(MIN_VALID_EPOCHDAYS - 1);
            }).to.throw(DateTimeException);
        });
    });

    describe('from', () => {

        it('test_factory_CalendricalObject', () => {
            assertEquals(LocalDate.from(LocalDate.of(2007, 7, 15)), LocalDate.of(2007, 7, 15));
            // TODO assertEquals(LocalDate.from(LocalDateTime.of(2007, 7, 15, 12, 30)), LocalDate.of(2007, 7, 15));
        });

        it('test_factory_CalendricalObject_invalid_noDerive', () => {
            expect(() => {
                LocalDate.from(Month.JANUARY);
            }).to.throw(DateTimeException);
        });

        it('test_factory_CalendricalObject_null', () => {
            expect(() => {
                LocalDate.from(null);
            }).to.throw(NullPointerException);
        });
    });

    function provider_sampleToString() {
        return [
            [2008, 7, 5, '2008-07-05'],
            [2007, 12, 31, '2007-12-31'],
            [999, 12, 31, '0999-12-31'],
            [-1, 1, 2, '-0001-01-02'],
            [9999, 12, 31, '9999-12-31'],
            [-9999, 12, 31, '-9999-12-31'],
            [10000, 1, 1, '+10000-01-01'],
            [-10000, 1, 1, '-10000-01-01'],
            [999999, 1, 1, '+999999-01-01'],
            [-999999, 1, 1, '-999999-01-01']
        ];
    }
    
    function provider_sampleBadParse() {
        return [
            ['2008/07/05'],
            ['10000-01-01'],
            ['2008-1-1'],
            ['2008--01'],
            ['ABCD-02-01'],
            ['2008-AB-01'],
            ['2008-02-AB'],
            ['-0000-02-01'],
            ['2008-02-01Z'],
            ['2008-02-01+01:00'],
            ['2008-02-01+01:00[Europe/Paris]']
        ];
    }
    
    describe('parse()', () => {
        it('factory_parse_validText', () => {
            var sampleToString = provider_sampleToString();
            sampleToString.forEach((sample) => {
                factory_parse_validText.apply(this, sample);
            });

        });

        function factory_parse_validText(y, m, d, parsable){
            // console.log(y, m, d, parsable);
            var t = LocalDate.parse(parsable);
            assertNotNull(t, parsable);
            assertEquals(t.year(), y, parsable);
            assertEquals(t.month().value(), m, parsable);
            assertEquals(t.dayOfMonth(), d, parsable);
        }

        it('factory_parse_invalidText', () => {
            var sampleBadParse = provider_sampleBadParse();
            sampleBadParse.forEach((sample) => {
                expect(() => {
                    factory_parse_invalidText.apply(this, sample);
                }).to.throw(DateTimeParseException);
            });

        });

        function factory_parse_invalidText(unparsable) {
            // console.log(unparsable);
            LocalDate.parse(unparsable);
        }

        it('factory_parse_illegalValue', () => {
            expect(() => {
                LocalDate.parse('2008-06-32');
            }).to.throw(DateTimeParseException);

        });

        it('factory_parse_invalidValue', () => {
            expect(() => {
                LocalDate.parse('2008-06-31');
            }).to.throw(DateTimeParseException);
        });

        it('factory_parse_nullText', () => {
            expect(() => {
                LocalDate.parse(null);
            }).to.throw(NullPointerException);
        });

        it('factory_parse_undefinedText', () => {
            expect(() => {
                LocalDate.parse();
            }).to.throw(NullPointerException);
        });
    });

    /**
    describe('parse(DateTimeFormatter)', () => {
        @Test
        public void factory_parse_formatter() {
            DateTimeFormatter f = DateTimeFormatter.ofPattern('u M d');
            LocalDate test = LocalDate.parse('2010 12 3', f);
            assertEquals(test, LocalDate.of(2010, 12, 3));
        }

        @Test(expectedExceptions=NullPointerException.class)
        public void factory_parse_formatter_nullText() {
            DateTimeFormatter f = DateTimeFormatter.ofPattern('u M d');
            LocalDate.parse((String) null, f);
        }

        @Test(expectedExceptions=NullPointerException.class)
        public void factory_parse_formatter_nullFormatter() {
            LocalDate.parse('ANY', null);
        }
    });
     */

    describe('get/ getLong(TemporalField)', () => {
        it('test_get_TemporalField', () => {
            var test = LocalDate.of(2008, 6, 30);
            assertEquals(test.get(ChronoField.YEAR), 2008);
            assertEquals(test.get(ChronoField.MONTH_OF_YEAR), 6);
            assertEquals(test.get(ChronoField.DAY_OF_MONTH), 30);
            //assertEquals(test.get(ChronoField.DAY_OF_WEEK), 1);
            //assertEquals(test.get(ChronoField.DAY_OF_YEAR), 182);
            //assertEquals(test.get(ChronoField.YEAR_OF_ERA), 2008);
            //assertEquals(test.get(ChronoField.ERA), 1);
            //assertEquals(test.getLong(ChronoField.PROLEPTIC_MONTH), 2008 * 12 + 6 - 1);

            // missing in threetenbp impl
            assertEquals(test.getLong(ChronoField.EPOCH_DAY), 14060);
        });

        it('test_get_TemporalField_null', () => {
            expect(() => {
                TEST_2007_07_15.get(null);
            }).to.throw(NullPointerException);
        });

        it('test_get_TemporalField_invalidField', () => {
            expect(() => {
                TEST_2007_07_15.get(MockFieldNoValue.INSTANCE);
            }).to.throw(DateTimeException);
        });

        it('test_get_TemporalField_timeField', () => {
            expect(() => {
                TEST_2007_07_15.get(ChronoField.HOUR_OF_DAY);
            }).to.throw(DateTimeException);
        });

    });


    describe('query(TemporalQuery)', () => {
        it('test_query', () => {
            assertEquals(TEST_2007_07_15.query(TemporalQueries.chronology()), IsoChronology.INSTANCE);
            assertEquals(TEST_2007_07_15.query(TemporalQueries.localDate()), TEST_2007_07_15);
            assertEquals(TEST_2007_07_15.query(TemporalQueries.localTime()), null);
            assertEquals(TEST_2007_07_15.query(TemporalQueries.offset()), null);
            assertEquals(TEST_2007_07_15.query(TemporalQueries.precision()), ChronoUnit.DAYS);
            assertEquals(TEST_2007_07_15.query(TemporalQueries.zone()), null);
            assertEquals(TEST_2007_07_15.query(TemporalQueries.zoneId()), null);
        });

        it('test_query_null', () => {
            expect(() => {
                TEST_2007_07_15.query(null);
            }).to.throw(NullPointerException);
        });

    });

    describe('now()', () => {

        it('now', () => {
            var expected = LocalDate.now(Clock.systemDefaultZone());
            var test = LocalDate.now();
            for (let i = 0; i < 100; i++) {
                if (expected.equals(test)) {
                    return;
                }
                expected = LocalDate.now(Clock.systemDefaultZone());
                test = LocalDate.now();
            }
            expect(test.equals(expected));
        });

        it('now_Clock_allSecsInDay_utc', () => {
            var instant, clock, test;
            for (let i = 0; i < (2 * 24 * 60 * 60); i += 100) {
                instant = Instant.ofEpochSecond(i);
                clock = Clock.fixed(instant, ZoneOffset.UTC);
                test = LocalDate.now(clock);
                expect(test.year()).to.equal(1970);
                expect(test.month()).to.equal(Month.JANUARY);
                expect(test.dayOfMonth()).to.equal((i < 24 * 60 * 60) ? 1 : 2);
            }
        });

        it('now_Clock_allSecsInDay_offset', () => {
            var instant, clock, test;
            var zoneOffset = ZoneOffset.ofHours(1);
            for (let i = 0; i < (2 * 24 * 60 * 60); i +=100) {
                instant = Instant.ofEpochSecond(i);
                clock = Clock.fixed(instant.minusSeconds(zoneOffset.totalSeconds()), zoneOffset);
                test = LocalDate.now(clock);
                expect(test.year()).to.equal(1970);
                expect(test.month()).to.equal(Month.JANUARY);
                expect(test.dayOfMonth()).to.equal((i < 24 * 60 * 60) ? 1 : 2);
            }
        });

        it('now_Clock_allSecsInDay_beforeEpoch', () => {
            var instant, clock, test;
            for (let i = -1; i >= -(2 * 24 * 60 * 60); i -= 100) {
                instant = Instant.ofEpochSecond(i);
                clock = Clock.fixed(instant, ZoneOffset.UTC);
                test = LocalDate.now(clock);
                expect(test.year()).to.equal(1969);
                expect(test.month()).to.equal(Month.DECEMBER);
                expect(test.dayOfMonth()).to.equal((i >= -24 * 60 * 60) ? 31 : 30);
            }
        });

/*
        it('now_Clock_maxYear', () => {
            var clock = Clock.fixed(MAX_INSTANT, ZoneOffset.UTC);
            var test = LocalDate.now(clock);
            expect(test.equals(MAX_DATE)).to.equal(true);
        });

        it('now_Clock_tooBig', () => {
            var clock = Clock.fixed(MAX_INSTANT.plusSeconds(24 * 60 * 60), ZoneOffset.UTC);
            expect(() => {
                LocalDate.now(clock);
            }).to.throw(DateTimeException);
        });

        it('now_Clock_minYear', () => {
            var clock = Clock.fixed(MIN_INSTANT, ZoneOffset.UTC);
            var test = LocalDate.now(clock);
            expect(test.equals(MIN_DATE)).to.equal(true);
        });

        it('now_Clock_tooLow', () => {
            var clock = Clock.fixed(MIN_INSTANT.minusNanos(1), ZoneOffset.UTC);
            expect(() => {
                LocalDate.now(clock);
            }).to.throw(DateTimeException);
        });
*/

    });

    describe('toEpochDay()', function () {
        this.timeout(10000);

        var date_0000_01_01 = -678941 - 40587;
        var nextSteps = isCoverageTestRunner() ? date_0000_01_01 + (2*356) : 700000;
        var previousSteps = isCoverageTestRunner() ? date_0000_01_01 - (2*356) : -2000000;

        it('test_toEpochDay', function () {
            var test = LocalDate.of(0, 1, 1);
            for (let i = date_0000_01_01; i < nextSteps; i++) {
                assertEquals(test.toEpochDay(), i);
                test = next(test);
            }
            test = LocalDate.of(0, 1, 1);
            for (let i = date_0000_01_01; i > previousSteps; i--) {
                assertEquals(test.toEpochDay(), i);
                test = previous(test);
            }

            assertEquals(LocalDate.of(1858, 11, 17).toEpochDay(), -40587);
            assertEquals(LocalDate.of(1, 1, 1).toEpochDay(), -678575 - 40587);
            assertEquals(LocalDate.of(1995, 9, 27).toEpochDay(), 49987 - 40587);
            assertEquals(LocalDate.of(1970, 1, 1).toEpochDay(), 0);
            assertEquals(LocalDate.of(-1, 12, 31).toEpochDay(), -678942 - 40587);
        });
    });

    describe('compareTo()', function () {
        it('test_comparisons', function () {
            doTest_comparisons_LocalDate([
                LocalDate.of(Year.MIN_VALUE, 1, 1),
                LocalDate.of(Year.MIN_VALUE, 12, 31),
                LocalDate.of(-1, 1, 1),
                LocalDate.of(-1, 12, 31),
                LocalDate.of(0, 1, 1),
                LocalDate.of(0, 12, 31),
                LocalDate.of(1, 1, 1),
                LocalDate.of(1, 12, 31),
                LocalDate.of(2006, 1, 1),
                LocalDate.of(2006, 12, 31),
                LocalDate.of(2007, 1, 1),
                LocalDate.of(2007, 12, 31),
                LocalDate.of(2008, 1, 1),
                LocalDate.of(2008, 2, 29),
                LocalDate.of(2008, 12, 31),
                LocalDate.of(Year.MAX_VALUE, 1, 1),
                LocalDate.of(Year.MAX_VALUE, 12, 31)
            ]);
        });

        function doTest_comparisons_LocalDate(localDates) {
            for (let i = 0; i < localDates.length; i++) {
                var a = localDates[i];
                for (let j = 0; j < localDates.length; j++) {
                    var b = localDates[j];
                    if (i < j) {
                        assertTrue(a.compareTo(b) < 0, a + ' <=> ' + b);
                        assertEquals(a.isBefore(b), true, a + ' <=> ' + b);
                        assertEquals(a.isAfter(b), false, a + ' <=> ' + b);
                        assertEquals(a.equals(b), false, a + ' <=> ' + b);
                    } else if (i > j) {
                        assertTrue(a.compareTo(b) > 0, a + ' <=> ' + b);
                        assertEquals(a.isBefore(b), false, a + ' <=> ' + b);
                        assertEquals(a.isAfter(b), true, a + ' <=> ' + b);
                        assertEquals(a.equals(b), false, a + ' <=> ' + b);
                    } else {
                        assertEquals(a.compareTo(b), 0, a + ' <=> ' + b);
                        assertEquals(a.isBefore(b), false, a + ' <=> ' + b);
                        assertEquals(a.isAfter(b), false, a + ' <=> ' + b);
                        assertEquals(a.equals(b), true, a + ' <=> ' + b);
                    }
                }
            }
        }

        it('test_compareTo_ObjectNull', function () {
            expect(() => {
                TEST_2007_07_15.compareTo(null);
            }).to.throw(NullPointerException);
        });

        it('test_isBefore', function () {
            assertTrue(TEST_2007_07_15.isBefore(LocalDate.of(2007, 7, 16)));
            assertFalse(TEST_2007_07_15.isBefore(LocalDate.of(2007, 7, 14)));
            assertFalse(TEST_2007_07_15.isBefore(TEST_2007_07_15));
        });

        it('test_isBefore_ObjectNull', function () {
            expect(() => {
                TEST_2007_07_15.isBefore(null);
            }).to.throw(NullPointerException);
        });

        it('test_isAfter_ObjectNull', function () {
            expect(() => {
                TEST_2007_07_15.isAfter(null);
            }).to.throw(NullPointerException);
        });

        it('test_isAfter', function () {
            assertTrue(TEST_2007_07_15.isAfter(LocalDate.of(2007, 7, 14)));
            assertFalse(TEST_2007_07_15.isAfter(LocalDate.of(2007, 7, 16)));
            assertFalse(TEST_2007_07_15.isAfter(TEST_2007_07_15));
        });

        it('compareToNonLocalDate', function () {
            expect(() => {
                TEST_2007_07_15.compareTo({});
            }).to.throw(DateTimeException);
        });


    });
    /**


    //-----------------------------------------------------------------------
    // equals()
    //-----------------------------------------------------------------------
    @Test(dataProvider="sampleDates" )
    public void test_equals_true(int y, int m, int d) {
        LocalDate a = LocalDate.of(y, m, d);
        LocalDate b = LocalDate.of(y, m, d);
        assertEquals(a.equals(b), true);
    }
    @Test(dataProvider="sampleDates")
    public void test_equals_false_year_differs(int y, int m, int d) {
        LocalDate a = LocalDate.of(y, m, d);
        LocalDate b = LocalDate.of(y + 1, m, d);
        assertEquals(a.equals(b), false);
    }
    @Test(dataProvider="sampleDates")
    public void test_equals_false_month_differs(int y, int m, int d) {
        LocalDate a = LocalDate.of(y, m, d);
        LocalDate b = LocalDate.of(y, m + 1, d);
        assertEquals(a.equals(b), false);
    }
    @Test(dataProvider="sampleDates")
    public void test_equals_false_day_differs(int y, int m, int d) {
        LocalDate a = LocalDate.of(y, m, d);
        LocalDate b = LocalDate.of(y, m, d + 1);
        assertEquals(a.equals(b), false);
    }

    @Test
    public void test_equals_itself_true() {
        assertEquals(TEST_2007_07_15.equals(TEST_2007_07_15), true);
    }

    @Test
    public void test_equals_string_false() {
        assertEquals(TEST_2007_07_15.equals("2007-07-15"), false);
    }

    @Test
    public void test_equals_null_false() {
        assertEquals(TEST_2007_07_15.equals(null), false);
    }

    //-----------------------------------------------------------------------
    // hashCode()
    //-----------------------------------------------------------------------
    @Test(dataProvider="sampleDates")
    public void test_hashCode(int y, int m, int d) {
        LocalDate a = LocalDate.of(y, m, d);
        assertEquals(a.hashCode(), a.hashCode());
        LocalDate b = LocalDate.of(y, m, d);
        assertEquals(a.hashCode(), b.hashCode());
    }

    //-----------------------------------------------------------------------
    // toString()
    //-----------------------------------------------------------------------
    @DataProvider(name="sampleToString")
    Object[][] provider_sampleToString() {
        return new Object[][] {
            {2008, 7, 5, "2008-07-05"},
            {2007, 12, 31, "2007-12-31"},
            {999, 12, 31, "0999-12-31"},
            {-1, 1, 2, "-0001-01-02"},
            {9999, 12, 31, "9999-12-31"},
            {-9999, 12, 31, "-9999-12-31"},
            {10000, 1, 1, "+10000-01-01"},
            {-10000, 1, 1, "-10000-01-01"},
            {12345678, 1, 1, "+12345678-01-01"},
            {-12345678, 1, 1, "-12345678-01-01"},
        };
    }

    @Test(dataProvider="sampleToString")
    public void test_toString(int y, int m, int d, String expected) {
        LocalDate t = LocalDate.of(y, m, d);
        String str = t.toString();
        assertEquals(str, expected);
    }

    //-----------------------------------------------------------------------
    // format(DateTimeFormatter)
    //-----------------------------------------------------------------------
    @Test
    public void test_format_formatter() {
        DateTimeFormatter f = DateTimeFormatter.ofPattern("y M d");
        String t = LocalDate.of(2010, 12, 3).format(f);
        assertEquals(t, "2010 12 3");
    }

    @Test(expectedExceptions=NullPointerException.class)
    public void test_format_formatter_null() {
        LocalDate.of(2010, 12, 3).format(null);
    }
    */
});


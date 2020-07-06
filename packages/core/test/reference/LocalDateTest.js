/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {expect} from 'chai';
import {assertEquals, assertNotNull, assertTrue, assertFalse} from '../testUtils';

import '../_init';

import {MathUtil} from '../../src/MathUtil';
import {
    DateTimeException,
    DateTimeParseException,
    NullPointerException,
    ArithmeticException,
    IllegalArgumentException
} from '../../src/errors';

import {Clock} from '../../src/Clock';
import {DayOfWeek} from '../../src/DayOfWeek';
import {Instant} from '../../src/Instant';
import {LocalDate} from '../../src/LocalDate';
import {LocalTime} from '../../src/LocalTime';
import {LocalDateTime} from '../../src/LocalDateTime';
import {Month} from '../../src/Month';
import {OffsetDateTime} from '../../src/OffsetDateTime';
import {OffsetTime} from '../../src/OffsetTime';
import {Period} from '../../src/Period';
import {Year} from '../../src/Year';
import {ZoneOffset} from '../../src/ZoneOffset';
import {ZoneId} from '../../src/ZoneId';
import {ZonedDateTime} from '../../src/ZonedDateTime';

import {IsoChronology} from '../../src/chrono/IsoChronology';
import {ChronoField} from '../../src/temporal/ChronoField';
import {DateTimeFormatter} from '../../src/format/DateTimeFormatter';
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {TemporalQueries} from '../../src/temporal/TemporalQueries';

import {MockFieldNoValue} from './temporal/MockFieldNoValue';

import {CurrentStandardZoneAsiaGaza} from '../zone/CurrentStandardZone';

describe('org.threeten.bp.TestLocalDate', () => {
    let TEST_2007_07_15;
    let MAX_VALID_EPOCHDAYS;
    let MIN_VALID_EPOCHDAYS;
    let MAX_DATE;
    let MIN_DATE;
    let MAX_INSTANT;
    let MIN_INSTANT;
    let ZONE_GAZA;
    before(() => {
        TEST_2007_07_15 = LocalDate.of(2007, 7, 15);

        MAX_DATE = LocalDate.MAX;
        MIN_DATE = LocalDate.MIN;
        MAX_VALID_EPOCHDAYS = MAX_DATE.toEpochDay();
        MIN_VALID_EPOCHDAYS = MIN_DATE.toEpochDay();
        MAX_INSTANT = MAX_DATE.atStartOfDay(ZoneOffset.UTC).toInstant();
        MIN_INSTANT = MIN_DATE.atStartOfDay(ZoneOffset.UTC).toInstant();

        ZONE_GAZA = new CurrentStandardZoneAsiaGaza();
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
        const newDayOfMonth = date.dayOfMonth() + 1;
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
        const newDayOfMonth = date.dayOfMonth() - 1;
        if (newDayOfMonth > 0) {
            return date.withDayOfMonth(newDayOfMonth);
        }
        date = date.withMonth(date.month().minus(1));
        if (date.month() === Month.DECEMBER) {
            date = date.withYear(date.year() - 1);
        }
        return date.withDayOfMonth(date.month().length(isIsoLeap(date.year())));
    }

    describe('now()', () => {

        it('now', () => {
            let expected = LocalDate.now(Clock.systemDefaultZone());
            let test = LocalDate.now();
            for (let i = 0; i < 100; i++) {
                if (expected.equals(test)) {
                    return;
                }
                expected = LocalDate.now(Clock.systemDefaultZone());
                test = LocalDate.now();
            }
            expect(test.equals(expected));
        });
    });

    describe('now(ZoneId)', () => {

        it('now_ZoneId()', () => {
            const zone = ZoneId.of('UTC+01:02:03');
            let expected = LocalDate.now(Clock.system(zone));
            let test = LocalDate.now(zone);
            for (let i = 0; i < 100; i++) {
                if (expected.equals(test)) {
                    return;
                }
                expected = LocalDate.now(Clock.system(zone));
                test = LocalDate.now(zone);
            }
            assertEquals(test, expected);
        });

    });

    describe('now(Clock)', () => {

        it('now_Clock_allSecsInDay_utc', () => {
            let instant, clock, test;
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
            let instant, clock, test;
            const zoneOffset = ZoneOffset.ofHours(1);
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
            let instant, clock, test;
            for (let i = -1; i >= -(2 * 24 * 60 * 60); i -= 100) {
                instant = Instant.ofEpochSecond(i);
                clock = Clock.fixed(instant, ZoneOffset.UTC);
                test = LocalDate.now(clock);
                expect(test.year()).to.equal(1969);
                expect(test.month()).to.equal(Month.DECEMBER);
                expect(test.dayOfMonth()).to.equal((i >= -24 * 60 * 60) ? 31 : 30);
            }
        });

        it('now_Clock_maxYear', () => {
            const clock = Clock.fixed(MAX_INSTANT, ZoneOffset.UTC);
            const test = LocalDate.now(clock);
            expect(test.equals(MAX_DATE)).to.equal(true);
        });

        it('now_Clock_tooBig', () => {
            const clock = Clock.fixed(MAX_INSTANT.plusSeconds(24 * 60 * 60), ZoneOffset.UTC);
            expect(() => {
                LocalDate.now(clock);
            }).to.throw(DateTimeException);
        });

        it('now_Clock_minYear', () => {
            const clock = Clock.fixed(MIN_INSTANT, ZoneOffset.UTC);
            const test = LocalDate.now(clock);
            expect(test.equals(MIN_DATE)).to.equal(true);
        });

        it('now_Clock_tooLow', () => {
            const clock = Clock.fixed(MIN_INSTANT.minusNanos(1), ZoneOffset.UTC);
            expect(() => {
                LocalDate.now(clock);
            }).to.throw(DateTimeException);
        });

    });

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
            }).to.throw(NullPointerException);
        });

        it('factory_of_intsMonth_yearTooLow', () => {
            expect(() => {
                LocalDate.of(LocalDate.MIN.year() - 1, Month.JANUARY, 30);
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
                LocalDate.of(LocalDate.MIN.year() - 1, 1, 1);
            }).to.throw(DateTimeException);
        });

        //-----------------------------------------------------------------------
        it('factory_ofYearDay_ints_nonLeap', () => {
            let date = LocalDate.of(2007, 1, 1);
            for (let i = 1; i < 365; i++) {
                expect(LocalDate.ofYearDay(2007, i)).to.eql(date);
                date = next(date);
            }
        });

        it('factory_ofYearDay_ints_leap', () => {
            let date = LocalDate.of(2008, 1, 1);
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
            const date_0000_01_01 = -678941 - 40587;
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
            assertEquals(LocalDate.from(LocalDateTime.of(2007, 7, 15, 12, 30)), LocalDate.of(2007, 7, 15));
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
            const sampleToString = provider_sampleToString();
            sampleToString.forEach((sample) => {
                factory_parse_validText.apply(this, sample);
            });

        });

        function factory_parse_validText(y, m, d, parsable){
            // console.log(y, m, d, parsable);
            const t = LocalDate.parse(parsable);
            assertNotNull(t, parsable);
            assertEquals(t.year(), y, parsable);
            assertEquals(t.month().value(), m, parsable);
            assertEquals(t.dayOfMonth(), d, parsable);
        }

        it('factory_parse_invalidText', () => {
            const sampleBadParse = provider_sampleBadParse();
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

    describe('parse(DateTimeFormatter)', () => {
        it('factory_parse_formatter', () => {
            const f = DateTimeFormatter.ofPattern('u M d');
            const test = LocalDate.parse('2010 12 3', f);
            assertEquals(test, LocalDate.of(2010, 12, 3));
        });

        // TODO tests are missing in threeten bp
        it('factory_parse_formatter_2', () => {
            const f = DateTimeFormatter.ofPattern('yyyy-MM-dd');
            const test = LocalDate.parse('2010-12-03', f);
            assertEquals(test, LocalDate.of(2010, 12, 3));
        });

        it('factory_parse_formatter_nullText', () => {
            expect(() => {
                const f = DateTimeFormatter.ofPattern('u M d');
                LocalDate.parse(null, f);
            }).to.throw(NullPointerException);
        });

        it('factory_parse_formatter_nullFormatter', () => {
            expect(() => {
                LocalDate.parse('ANY', null);
            }).to.throw(NullPointerException);
        });
    });

    describe('get/ getLong(TemporalField)', () => {
        it('test_get_TemporalField', () => {
            const test = LocalDate.of(2008, 6, 30);
            assertEquals(test.get(ChronoField.YEAR), 2008);
            assertEquals(test.get(ChronoField.MONTH_OF_YEAR), 6);
            assertEquals(test.get(ChronoField.DAY_OF_MONTH), 30);
            assertEquals(test.get(ChronoField.DAY_OF_WEEK), 1);
            assertEquals(test.get(ChronoField.DAY_OF_YEAR), 182);
            assertEquals(test.get(ChronoField.YEAR_OF_ERA), 2008);
            assertEquals(test.get(ChronoField.ERA), 1);
            assertEquals(test.getLong(ChronoField.PROLEPTIC_MONTH), 2008 * 12 + 6 - 1);

            // TODO missing in threetenbp impl, like some other ChronoFields e.q. ALIGNED*
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

    describe('get*()', () => {
        it('test_get', function () {
            provider_sampleDates().forEach((sampleDate) =>{
                test_get.apply(this, sampleDate);
            });
        });

        function test_get(y, m, d) {
            const a = LocalDate.of(y, m, d);
            assertEquals(a.year(), y);
            assertEquals(a.month(), Month.of(m));
            assertEquals(a.dayOfMonth(), d);
        }

        it('test_getDOY', function () {
            provider_sampleDates().forEach((sampleDate) =>{
                test_getDOY.apply(this, sampleDate);
            });
        });

        function test_getDOY(y, m, d) {
            const a = LocalDate.of(y, m, d);
            let total = 0;
            for (let i = 1; i < m; i++) {
                total += Month.of(i).length(isIsoLeap(y));
            }
            const doy = total + d;
            assertEquals(a.dayOfYear(), doy);
        }

        it('test_getDayOfWeek', function () {
            const MONTH = Month.values();
            let dow = DayOfWeek.MONDAY;
            for (let m=0; m< MONTH.length; m++) {
                const month = MONTH[m];
                const length = month.length(false);
                for (let i = 1; i <= length; i++) {
                    const d = LocalDate.of(2007, month, i);
                    assertEquals(d.dayOfWeek(), dow);
                    dow = dow.plus(1);
                }
            }
        });

    });

    describe('isLeapYear()', () => {
        it('test_isLeapYear', function () {
            assertEquals(LocalDate.of(1999, 1, 1).isLeapYear(), false);
            assertEquals(LocalDate.of(2000, 1, 1).isLeapYear(), true);
            assertEquals(LocalDate.of(2001, 1, 1).isLeapYear(), false);
            assertEquals(LocalDate.of(2002, 1, 1).isLeapYear(), false);
            assertEquals(LocalDate.of(2003, 1, 1).isLeapYear(), false);
            assertEquals(LocalDate.of(2004, 1, 1).isLeapYear(), true);
            assertEquals(LocalDate.of(2005, 1, 1).isLeapYear(), false);

            assertEquals(LocalDate.of(1500, 1, 1).isLeapYear(), false);
            assertEquals(LocalDate.of(1600, 1, 1).isLeapYear(), true);
            assertEquals(LocalDate.of(1700, 1, 1).isLeapYear(), false);
            assertEquals(LocalDate.of(1800, 1, 1).isLeapYear(), false);
            assertEquals(LocalDate.of(1900, 1, 1).isLeapYear(), false);
        });
    });

    describe('lengthOfMonth()', () => {

        it('test_lengthOfMonth_notLeapYear', function () {
            assertEquals(LocalDate.of(2007, 1, 1).lengthOfMonth(), 31);
            assertEquals(LocalDate.of(2007, 2, 1).lengthOfMonth(), 28);
            assertEquals(LocalDate.of(2007, 3, 1).lengthOfMonth(), 31);
            assertEquals(LocalDate.of(2007, 4, 1).lengthOfMonth(), 30);
            assertEquals(LocalDate.of(2007, 5, 1).lengthOfMonth(), 31);
            assertEquals(LocalDate.of(2007, 6, 1).lengthOfMonth(), 30);
            assertEquals(LocalDate.of(2007, 7, 1).lengthOfMonth(), 31);
            assertEquals(LocalDate.of(2007, 8, 1).lengthOfMonth(), 31);
            assertEquals(LocalDate.of(2007, 9, 1).lengthOfMonth(), 30);
            assertEquals(LocalDate.of(2007, 10, 1).lengthOfMonth(), 31);
            assertEquals(LocalDate.of(2007, 11, 1).lengthOfMonth(), 30);
            assertEquals(LocalDate.of(2007, 12, 1).lengthOfMonth(), 31);
        });

        it('test_lengthOfMonth_leapYear', function () {
            assertEquals(LocalDate.of(2008, 1, 1).lengthOfMonth(), 31);
            assertEquals(LocalDate.of(2008, 2, 1).lengthOfMonth(), 29);
            assertEquals(LocalDate.of(2008, 3, 1).lengthOfMonth(), 31);
            assertEquals(LocalDate.of(2008, 4, 1).lengthOfMonth(), 30);
            assertEquals(LocalDate.of(2008, 5, 1).lengthOfMonth(), 31);
            assertEquals(LocalDate.of(2008, 6, 1).lengthOfMonth(), 30);
            assertEquals(LocalDate.of(2008, 7, 1).lengthOfMonth(), 31);
            assertEquals(LocalDate.of(2008, 8, 1).lengthOfMonth(), 31);
            assertEquals(LocalDate.of(2008, 9, 1).lengthOfMonth(), 30);
            assertEquals(LocalDate.of(2008, 10, 1).lengthOfMonth(), 31);
            assertEquals(LocalDate.of(2008, 11, 1).lengthOfMonth(), 30);
            assertEquals(LocalDate.of(2008, 12, 1).lengthOfMonth(), 31);

        });
    });

    describe('lengthOfYear()', () => {
        it('test_lengthOfYear', function () {
            assertEquals(LocalDate.of(2007, 1, 1).lengthOfYear(), 365);
            assertEquals(LocalDate.of(2008, 1, 1).lengthOfYear(), 366);
        });
    });

    describe('with()', () => {
        it('test_with_adjustment', () => {
            const sample = LocalDate.of(2012, 3, 4);
            const adjuster = {
                adjustInto: () => {
                    return sample;
                }
            };
            assertEquals(TEST_2007_07_15.with(adjuster), sample);
        });

        it('test_with_adjustment_null', () => {
            expect(() => {
                TEST_2007_07_15.with(null);

            }).to.throw(NullPointerException);
        });

    });

    describe('with(DateTimeField,long)', () => {

        it('test_with_DateTimeField_long_normal', () => {
            const t = TEST_2007_07_15.with(ChronoField.YEAR, 2008);
            assertEquals(t, LocalDate.of(2008, 7, 15));
        });

        it('test_with_DateTimeField_long_null', () => {
            expect(() => {
                TEST_2007_07_15.with(null, 1);

            }).to.throw(NullPointerException);
        });

        it('test_with_DateTimeField_long_invalidField', () => {
            expect(() => {
                TEST_2007_07_15.with(MockFieldNoValue.INSTANCE, 1);

            }).to.throw(DateTimeException);
        });

        it('test_with_DateTimeField_long_timeField', () => {
            expect(() => {
                TEST_2007_07_15.with(ChronoField.HOUR_OF_DAY, 1);

            }).to.throw(DateTimeException);
        });

        it('test_with_DateTimeField_long_invalidValue', () => {
            expect(() => {
                TEST_2007_07_15.with(ChronoField.DAY_OF_WEEK, -1);

            }).to.throw(DateTimeException);
        });
    });



    describe('withYear()', () => {
        it('test_withYear_int_normal', function () {
            const t = TEST_2007_07_15.withYear(2008);
            assertEquals(t, LocalDate.of(2008, 7, 15));
        });

        it('test_withYear_int_invalid', function () {
            expect(() => {
                TEST_2007_07_15.withYear(Year.MIN_VALUE - 1);
            }).to.throw(DateTimeException);
        });

        it('test_withYear_int_adjustDay', function () {
            const t = LocalDate.of(2008, 2, 29).withYear(2007);
            const expected = LocalDate.of(2007, 2, 28);
            assertEquals(t, expected);
        });
    });

    describe('withMonth()', () => {
        it('test_withMonth_int_normal', function () {
            const t = TEST_2007_07_15.withMonth(1);
            assertEquals(t, LocalDate.of(2007, 1, 15));
        });

        it('test_withMonth_int_invalid', function () {
            expect(() => {
                TEST_2007_07_15.withMonth(13);
            }).to.throw(DateTimeException);
        });

        it('test_withMonth_int_adjustDay', function () {
            const t = LocalDate.of(2007, 12, 31).withMonth(11);
            const expected = LocalDate.of(2007, 11, 30);
            assertEquals(t, expected);
        });
    });

    describe('withDayOfMonth()', () => {
        it('test_withDayOfMonth_normal', function () {
            const t = TEST_2007_07_15.withDayOfMonth(1);
            assertEquals(t, LocalDate.of(2007, 7, 1));
        });

        it('test_withDayOfMonth_illegal', function () {
            expect(() => {
                TEST_2007_07_15.withDayOfMonth(32);
            }).to.throw(DateTimeException);
        });

        it('test_withDayOfMonth_invalid', function () {
            expect(() => {
                LocalDate.of(2007, 11, 30).withDayOfMonth(31);
            }).to.throw(DateTimeException);
        });
    });

    describe('withDayOfYear(int)', () => {
        it('test_withDayOfYear_normal', function () {
            let t = TEST_2007_07_15.withDayOfYear(33);
            assertEquals(t, LocalDate.of(2007, 2, 2));

            t = LocalDate.of(2008, 7, 15).withDayOfYear(366);
            assertEquals(t, LocalDate.of(2008, 12, 31));
        });

        it('test_withDayOfYear_illegal', function () {
            expect(() => {
                TEST_2007_07_15.withDayOfYear(367);
            }).to.throw(DateTimeException);
        });

        it('test_withDayOfYear_invalid', function () {
            expect(() => {
                TEST_2007_07_15.withDayOfYear(366);
            }).to.throw(DateTimeException);
        });
    });

    describe('plus(Period)', () => {

        it('test_plus_Period_positiveMonths', () => {
            const period = Period.ofMonths(7);
            const t = TEST_2007_07_15.plus(period);
            assertEquals(t, LocalDate.of(2008, 2, 15));
        });

        it('test_plus_Period_negativeDays', () => {
            const period = Period.ofDays(-25);
            const t = TEST_2007_07_15.plus(period);
            assertEquals(t, LocalDate.of(2007, 6, 20));
        });

        /* strange test
        it('test_plus_Period_timeNotAllowed', () => {
            expect(() => {
                const period = MockSimplePeriod.of(7, ChronoUnit.HOURS);
                TEST_2007_07_15.plus(period);
            }).to.throw(DateTimeException);
        });
*/

        it('test_plus_Period_null', () => {
            expect(() => {
                TEST_2007_07_15.plus(null);

            }).to.throw(NullPointerException);
        });

        it('test_plus_Period_invalidTooLarge', () => {
            expect(() => {
                const period = Period.ofYears(1);
                LocalDate.of(Year.MAX_VALUE, 1, 1).plus(period);
            }).to.throw(DateTimeException);
        });

        it('test_plus_Period_invalidTooSmall', () => {
            expect(() => {
                const period = Period.ofYears(-1, ChronoUnit.YEARS);
                LocalDate.of(Year.MIN_VALUE, 1, 1).plus(period);
            }).to.throw(DateTimeException);
        });
    });

    describe('plus(long,PeriodUnit)', () => {

        it('test_plus_longPeriodUnit_positiveMonths', () => {
            const t = TEST_2007_07_15.plus(7, ChronoUnit.MONTHS);
            assertEquals(t, LocalDate.of(2008, 2, 15));
        });

        it('test_plus_longPeriodUnit_negativeDays', () => {
            const t = TEST_2007_07_15.plus(-25, ChronoUnit.DAYS);
            assertEquals(t, LocalDate.of(2007, 6, 20));
        });

        it('test_plus_longPeriodUnit_timeNotAllowed', () => {
            expect(() => {
                TEST_2007_07_15.plus(7, ChronoUnit.HOURS);
            }).to.throw(DateTimeException);
        });

        it('test_plus_longPeriodUnit_null', () => {
            expect(() => {
                TEST_2007_07_15.plus(1, null);
            }).to.throw(NullPointerException);
        });

        it('test_plus_longPeriodUnit_invalidTooLarge', () => {
            expect(() => {
                LocalDate.of(Year.MAX_VALUE, 1, 1).plus(1, ChronoUnit.YEARS);
            }).to.throw(DateTimeException);
        });

        it('test_plus_longPeriodUnit_invalidTooSmall', () => {
            expect(() => {
                LocalDate.of(Year.MIN_VALUE, 1, 1).plus(-1, ChronoUnit.YEARS);
            }).to.throw(DateTimeException);
        });

    });

    describe('plusYears()', () => {

        it('test_plusYears_long_normal', function () {
            const t = TEST_2007_07_15.plusYears(1);
            assertEquals(t, LocalDate.of(2008, 7, 15));
        });

        it('test_plusYears_long_negative', function () {
            const t = TEST_2007_07_15.plusYears(-1);
            assertEquals(t, LocalDate.of(2006, 7, 15));
        });

        it('test_plusYears_long_adjustDay', function () {
            const t = LocalDate.of(2008, 2, 29).plusYears(1);
            const expected = LocalDate.of(2009, 2, 28);
            assertEquals(t, expected);
        });

        it('test_plusYears_long_big', function () {
            const years = 20 + Year.MAX_VALUE;
            const test = LocalDate.of(-40, 6, 1).plusYears(years);
            assertEquals(test, LocalDate.of((-40 + years), 6, 1));
        });

        it('test_plusYears_long_invalidTooLarge', function () {
            expect(() => {
                const test = LocalDate.of(Year.MAX_VALUE, 6, 1);
                test.plusYears(1);
            }).to.throw(DateTimeException);
        });

        it('test_plusYears_long_invalidTooLargeMaxAddMax', function () {
            expect(() => {
                const test = LocalDate.of(Year.MAX_VALUE, 12, 1);
                test.plusYears(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });

        it('test_plusYears_long_invalidTooLargeMaxAddMin', function () {
            expect(() => {
                const test = LocalDate.of(Year.MAX_VALUE, 12, 1);
                test.plusYears(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });

        it('test_plusYears_long_invalidTooSmall_validInt', function () {
            expect(() => {
                LocalDate.of(Year.MIN_VALUE, 1, 1).plusYears(-1);
            }).to.throw(DateTimeException);
        });

        it('test_plusYears_long_invalidTooSmall_invalidInt', function () {
            expect(() => {
                LocalDate.of(Year.MIN_VALUE, 1, 1).plusYears(-10);
            }).to.throw(DateTimeException);
        });
    });

    describe('plusMonths()', () => {

        it('test_plusMonths_long_normal', () => {
            const t = TEST_2007_07_15.plusMonths(1);
            assertEquals(t, LocalDate.of(2007, 8, 15));
        });

        it('test_plusMonths_long_overYears', () => {
            const t = TEST_2007_07_15.plusMonths(25);
            assertEquals(t, LocalDate.of(2009, 8, 15));
        });

        it('test_plusMonths_long_negative', () => {
            const t = TEST_2007_07_15.plusMonths(-1);
            assertEquals(t, LocalDate.of(2007, 6, 15));
        });

        it('test_plusMonths_long_negativeAcrossYear', () => {
            const t = TEST_2007_07_15.plusMonths(-7);
            assertEquals(t, LocalDate.of(2006, 12, 15));
        });

        it('test_plusMonths_long_negativeOverYears', () => {
            const t = TEST_2007_07_15.plusMonths(-31);
            assertEquals(t, LocalDate.of(2004, 12, 15));
        });

        it('test_plusMonths_long_adjustDayFromLeapYear', () => {
            const t = LocalDate.of(2008, 2, 29).plusMonths(12);
            const expected = LocalDate.of(2009, 2, 28);
            assertEquals(t, expected);
        });

        it('test_plusMonths_long_adjustDayFromMonthLength', () => {
            const t = LocalDate.of(2007, 3, 31).plusMonths(1);
            const expected = LocalDate.of(2007, 4, 30);
            assertEquals(t, expected);
        });

        it('test_plusMonths_long_big', () => {
            const months = 12000468; // Integer.MAX_VALUE;
            const test = LocalDate.of(-40, 6, 1).plusMonths(months);
            assertEquals(test, LocalDate.of(999999,6,1));
        });

        it('test_plusMonths_long_invalidTooLarge', () => {
            expect(() => {
                LocalDate.of(Year.MAX_VALUE, 12, 1).plusMonths(1);
            }).to.throw(DateTimeException);
        });

        it('test_plusMonths_long_invalidTooLargeMaxAddMax', () => {
            expect(() => {
                const test = LocalDate.of(Year.MAX_VALUE, 12, 1);
                test.plusMonths(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });

        it('test_plusMonths_long_invalidTooLargeMaxAddMin', () => {
            expect(() => {
                const test = LocalDate.of(Year.MAX_VALUE, 12, 1);
                test.plusMonths(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });

        it('test_plusMonths_long_invalidTooSmall', () => {
            expect(() => {
                LocalDate.of(Year.MIN_VALUE, 1, 1).plusMonths(-1);
            }).to.throw(DateTimeException);
        });

    });

    describe('plusWeeks()', () => {

        it('test_plusWeeks_normal', () => {
            const t = TEST_2007_07_15.plusWeeks(1);
            assertEquals(t, LocalDate.of(2007, 7, 22));
        });

        it('test_plusWeeks_overMonths', () => {
            const t = TEST_2007_07_15.plusWeeks(9);
            assertEquals(t, LocalDate.of(2007, 9, 16));
        });

        it('test_plusWeeks_overYears', () => {
            const t = LocalDate.of(2006, 7, 16).plusWeeks(52);
            assertEquals(t, TEST_2007_07_15);
        });

        it('test_plusWeeks_overLeapYears', () => {
            const t = TEST_2007_07_15.plusYears(-1).plusWeeks(104);
            assertEquals(t, LocalDate.of(2008, 7, 12));
        });

        it('test_plusWeeks_negative', () => {
            const t = TEST_2007_07_15.plusWeeks(-1);
            assertEquals(t, LocalDate.of(2007, 7, 8));
        });

        it('test_plusWeeks_negativeAcrossYear', () => {
            const t = TEST_2007_07_15.plusWeeks(-28);
            assertEquals(t, LocalDate.of(2006, 12, 31));
        });

        it('test_plusWeeks_negativeOverYears', () => {
            const t = TEST_2007_07_15.plusWeeks(-104);
            assertEquals(t, LocalDate.of(2005, 7, 17));
        });

        it('test_plusWeeks_maximum', () => {
            const t = LocalDate.of(Year.MAX_VALUE, 12, 24).plusWeeks(1);
            const expected = LocalDate.of(Year.MAX_VALUE, 12, 31);
            assertEquals(t, expected);
        });

        it('test_plusWeeks_minimum', () => {
            const t = LocalDate.of(Year.MIN_VALUE, 1, 8).plusWeeks(-1);
            const expected = LocalDate.of(Year.MIN_VALUE, 1, 1);
            assertEquals(t, expected);
        });

        it('test_plusWeeks_invalidTooLarge', () => {
            expect(() => {
                LocalDate.of(Year.MAX_VALUE, 12, 25).plusWeeks(1);

            }).to.throw(DateTimeException);
        });

        it('test_plusWeeks_invalidTooSmall', () => {
            expect(() => {
                LocalDate.of(Year.MIN_VALUE, 1, 7).plusWeeks(-1);
            }).to.throw(DateTimeException);

        });

        it('test_plusWeeks_invalidMaxMinusMax', () => {
            expect(() => {
                LocalDate.of(Year.MAX_VALUE, 12, 25).plusWeeks(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });

        it('test_plusWeeks_invalidMaxMinusMin', () => {
            expect(() => {
                LocalDate.of(Year.MAX_VALUE, 12, 25).plusWeeks(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });
    });

    describe('plusDays()', () => {

        it('test_plusDays_normal', () => {
            const t = TEST_2007_07_15.plusDays(1);
            assertEquals(t, LocalDate.of(2007, 7, 16));
        });

        it('test_plusDays_overMonths', () => {
            const t = TEST_2007_07_15.plusDays(62);
            assertEquals(t, LocalDate.of(2007, 9, 15));
        });

        it('test_plusDays_overYears', () => {
            const t = LocalDate.of(2006, 7, 14).plusDays(366);
            assertEquals(t, TEST_2007_07_15);
        });

        it('test_plusDays_overLeapYears', () => {
            const t = TEST_2007_07_15.plusYears(-1).plusDays(365 + 366);
            assertEquals(t, LocalDate.of(2008, 7, 15));
        });

        it('test_plusDays_negative', () => {
            const t = TEST_2007_07_15.plusDays(-1);
            assertEquals(t, LocalDate.of(2007, 7, 14));
        });

        it('test_plusDays_negativeAcrossYear', () => {
            const t = TEST_2007_07_15.plusDays(-196);
            assertEquals(t, LocalDate.of(2006, 12, 31));
        });

        it('test_plusDays_negativeOverYears', () => {
            const t = TEST_2007_07_15.plusDays(-730);
            assertEquals(t, LocalDate.of(2005, 7, 15));
        });

        it('test_plusDays_maximum', () => {
            const t = LocalDate.of(Year.MAX_VALUE, 12, 30).plusDays(1);
            const expected = LocalDate.of(Year.MAX_VALUE, 12, 31);
            assertEquals(t, expected);
        });

        it('test_plusDays_minimum', () => {
            const t = LocalDate.of(Year.MIN_VALUE, 1, 2).plusDays(-1);
            const expected = LocalDate.of(Year.MIN_VALUE, 1, 1);
            assertEquals(t, expected);
        });

        it('test_plusDays_invalidTooLarge', () => {
            expect(() => {
                LocalDate.of(Year.MAX_VALUE, 12, 31).plusDays(1);

            }).to.throw(DateTimeException);
        });

        it('test_plusDays_invalidTooSmall', () => {
            expect(() => {
                LocalDate.of(Year.MIN_VALUE, 1, 1).plusDays(-1);
            }).to.throw(DateTimeException);
        });

        it('test_plusDays_overflowTooLarge', () => {
            expect(() => {
                LocalDate.of(Year.MAX_VALUE, 12, 31).plusDays(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });

        it('test_plusDays_overflowTooSmall', () => {
            expect(() => {
                LocalDate.of(Year.MIN_VALUE, 1, 1).plusDays(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });
    });

    describe('minus(Period)', () => {

        it('test_minus_Period_positiveMonths', () => {
            const period = Period.ofMonths(7);
            const t = TEST_2007_07_15.minus(period);
            assertEquals(t, LocalDate.of(2006, 12, 15));
        });

        it('test_minus_Period_negativeDays', () => {
            const period = Period.ofDays(-25);
            const t = TEST_2007_07_15.minus(period);
            assertEquals(t, LocalDate.of(2007, 8, 9));
        });


        /* strange test
        it('test_minus_Period_timeNotAllowed', () => {
            expect(() => {
                const period = MockSimplePeriod.of(7, ChronoUnit.HOURS);
                TEST_2007_07_15.minus(period);
            }).to.throw(DateTimeException);
        });
*/

        it('test_minus_Period_null', () => {
            expect(() => {
                TEST_2007_07_15.minus(null);
            }).to.throw(NullPointerException);
        });

        it('test_minus_Period_invalidTooLarge', () => {
            expect(() => {
                const period = Period.ofYears(-1);
                LocalDate.of(Year.MAX_VALUE, 1, 1).minus(period);
            }).to.throw(DateTimeException);
        });

        it('test_minus_Period_invalidTooSmall', () => {
            expect(() => {
                const period = Period.ofYears(1);
                LocalDate.of(Year.MIN_VALUE, 1, 1).minus(period);
            }).to.throw(DateTimeException);
        });

    });

    describe('minus(long,PeriodUnit)', () => {

        it('test_minus_longPeriodUnit_positiveMonths', () => {
            const t = TEST_2007_07_15.minus(7, ChronoUnit.MONTHS);
            assertEquals(t, LocalDate.of(2006, 12, 15));
        });

        it('test_minus_longPeriodUnit_negativeDays', () => {
            const t = TEST_2007_07_15.minus(-25, ChronoUnit.DAYS);
            assertEquals(t, LocalDate.of(2007, 8, 9));
        });

        it('test_minus_longPeriodUnit_timeNotAllowed', () => {
            expect(() => {
                TEST_2007_07_15.minus(7, ChronoUnit.HOURS);
            }).to.throw(DateTimeException);
        });

        it('test_minus_longPeriodUnit_null', () => {
            expect(() => {
                TEST_2007_07_15.minus(1, null);
            }).to.throw(NullPointerException);
        });

        it('test_minus_longPeriodUnit_invalidTooLarge', () => {
            expect(() => {
                LocalDate.of(Year.MAX_VALUE, 1, 1).minus(-1, ChronoUnit.YEARS);
            }).to.throw(DateTimeException);
        });

        it('test_minus_longPeriodUnit_invalidTooSmall', () => {
            expect(() => {
                LocalDate.of(Year.MIN_VALUE, 1, 1).minus(1, ChronoUnit.YEARS);
            }).to.throw(DateTimeException);
        });

    });

    describe('minusYears()', () => {

        it('test_minusYears_long_normal', () => {
            const t = TEST_2007_07_15.minusYears(1);
            assertEquals(t, LocalDate.of(2006, 7, 15));
        });

        it('test_minusYears_long_negative', () => {
            const t = TEST_2007_07_15.minusYears(-1);
            assertEquals(t, LocalDate.of(2008, 7, 15));
        });

        it('test_minusYears_long_adjustDay', () => {
            const t = LocalDate.of(2008, 2, 29).minusYears(1);
            const expected = LocalDate.of(2007, 2, 28);
            assertEquals(t, expected);
        });

        it('test_minusYears_long_big', () => {
            const years = 20 + Year.MAX_VALUE;
            const test = LocalDate.of(40, 6, 1).minusYears(years);
            assertEquals(test, LocalDate.of(40 - years, 6, 1));
        });

        it('test_minusYears_long_invalidTooLarge', () => {
            expect(() => {
                const test = LocalDate.of(Year.MAX_VALUE, 6, 1);
                test.minusYears(-1);
            }).to.throw(DateTimeException);
        });

        it('test_minusYears_long_invalidTooLargeMaxAddMax', () => {
            expect(() => {
                const test = LocalDate.of(Year.MAX_VALUE, 12, 1);
                test.minusYears(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });

        it('test_minusYears_long_invalidTooLargeMaxAddMin', () => {
            expect(() => {
                const test = LocalDate.of(Year.MAX_VALUE, 12, 1);
                test.minusYears(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });

        it('test_minusYears_long_invalidTooSmall', () => {
            expect(() => {
                LocalDate.of(Year.MIN_VALUE, 1, 1).minusYears(1);
            }).to.throw(DateTimeException);
        });

    });

    describe('minusMonths()', () => {

        it('test_minusMonths_long_normal', () => {
            const t = TEST_2007_07_15.minusMonths(1);
            assertEquals(t, LocalDate.of(2007, 6, 15));
        });

        it('test_minusMonths_long_overYears', () => {
            const t = TEST_2007_07_15.minusMonths(25);
            assertEquals(t, LocalDate.of(2005, 6, 15));
        });

        it('test_minusMonths_long_negative', () => {
            const t = TEST_2007_07_15.minusMonths(-1);
            assertEquals(t, LocalDate.of(2007, 8, 15));
        });

        it('test_minusMonths_long_negativeAcrossYear', () => {
            const t = TEST_2007_07_15.minusMonths(-7);
            assertEquals(t, LocalDate.of(2008, 2, 15));
        });

        it('test_minusMonths_long_negativeOverYears', () => {
            const t = TEST_2007_07_15.minusMonths(-31);
            assertEquals(t, LocalDate.of(2010, 2, 15));
        });

        it('test_minusMonths_long_adjustDayFromLeapYear', () => {
            const t = LocalDate.of(2008, 2, 29).minusMonths(12);
            const expected = LocalDate.of(2007, 2, 28);
            assertEquals(t, expected);
        });

        it('test_minusMonths_long_adjustDayFromMonthLength', () => {
            const t = LocalDate.of(2007, 3, 31).minusMonths(1);
            const expected = LocalDate.of(2007, 2, 28);
            assertEquals(t, expected);
        });

        it('test_minusMonths_long_big()', () => {
            const months = 20 + 12000444; // Integer.MAX_VALUE;
            const test = LocalDate.of(40, 6, 1).minusMonths(months);
            assertEquals(test, LocalDate.of(-999999, 10, 1));
        });

        it('test_minusMonths_long_invalidTooLarge', () => {
            expect(() => {
                LocalDate.of(Year.MAX_VALUE, 12, 1).minusMonths(-1);
            }).to.throw(DateTimeException);
        });

        it('test_minusMonths_long_invalidTooLargeMaxAddMax', () => {
            expect(() => {
                const test = LocalDate.of(Year.MAX_VALUE, 12, 1);
                test.minusMonths(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });

        it('test_minusMonths_long_invalidTooLargeMaxAddMin', () => {
            expect(() => {
                const test = LocalDate.of(Year.MAX_VALUE, 12, 1);
                test.minusMonths(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(DateTimeException);
        });


        it('test_minusMonths_long_invalidTooSmall', () => {
            expect(() => {
                LocalDate.of(Year.MIN_VALUE, 1, 1).minusMonths(1);
            }).to.throw(DateTimeException);
        });

    });

    describe('minusWeeks()', () => {

        it('test_minusWeeks_normal', () => {
            const t = TEST_2007_07_15.minusWeeks(1);
            assertEquals(t, LocalDate.of(2007, 7, 8));
        });

        it('test_minusWeeks_overMonths', () => {
            const t = TEST_2007_07_15.minusWeeks(9);
            assertEquals(t, LocalDate.of(2007, 5, 13));
        });

        it('test_minusWeeks_overYears', () => {
            const t = LocalDate.of(2008, 7, 13).minusWeeks(52);
            assertEquals(t, TEST_2007_07_15);
        });

        it('test_minusWeeks_overLeapYears', () => {
            const t = TEST_2007_07_15.minusYears(-1).minusWeeks(104);
            assertEquals(t, LocalDate.of(2006, 7, 18));
        });

        it('test_minusWeeks_negative', () => {
            const t = TEST_2007_07_15.minusWeeks(-1);
            assertEquals(t, LocalDate.of(2007, 7, 22));
        });

        it('test_minusWeeks_negativeAcrossYear', () => {
            const t = TEST_2007_07_15.minusWeeks(-28);
            assertEquals(t, LocalDate.of(2008, 1, 27));
        });

        it('test_minusWeeks_negativeOverYears', () => {
            const t = TEST_2007_07_15.minusWeeks(-104);
            assertEquals(t, LocalDate.of(2009, 7, 12));
        });

        it('test_minusWeeks_maximum', () => {
            const t = LocalDate.of(Year.MAX_VALUE, 12, 24).minusWeeks(-1);
            const expected = LocalDate.of(Year.MAX_VALUE, 12, 31);
            assertEquals(t, expected);
        });

        it('test_minusWeeks_minimum', () => {
            const t = LocalDate.of(Year.MIN_VALUE, 1, 8).minusWeeks(1);
            const expected = LocalDate.of(Year.MIN_VALUE, 1, 1);
            assertEquals(t, expected);
        });

        it('test_minusWeeks_invalidTooLarge', () => {
            expect(() => {
                LocalDate.of(Year.MAX_VALUE, 12, 25).minusWeeks(-1);
            }).to.throw(DateTimeException);
        });

        it('test_minusWeeks_invalidTooSmall', () => {
            expect(() => {
                LocalDate.of(Year.MIN_VALUE, 1, 7).minusWeeks(1);
            }).to.throw(DateTimeException);
        });

        it('test_minusWeeks_invalidMaxMinusMax', () => {
            expect(() => {
                LocalDate.of(Year.MAX_VALUE, 12, 25).minusWeeks(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });

        it('test_minusWeeks_invalidMaxMinusMin', () => {
            expect(() => {
                LocalDate.of(Year.MAX_VALUE, 12, 25).minusWeeks(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });

    });

    describe('minusDays()', () => {

        it('test_minusDays_normal', () => {
            const t = TEST_2007_07_15.minusDays(1);
            assertEquals(t, LocalDate.of(2007, 7, 14));
        });

        it('test_minusDays_overMonths', () => {
            const t = TEST_2007_07_15.minusDays(62);
            assertEquals(t, LocalDate.of(2007, 5, 14));
        });

        it('test_minusDays_overYears', () => {
            const t = LocalDate.of(2008, 7, 16).minusDays(367);
            assertEquals(t, TEST_2007_07_15);
        });

        it('test_minusDays_overLeapYears', () => {
            const t = TEST_2007_07_15.plusYears(2).minusDays(365 + 366);
            assertEquals(t, TEST_2007_07_15);
        });

        it('test_minusDays_negative', () => {
            const t = TEST_2007_07_15.minusDays(-1);
            assertEquals(t, LocalDate.of(2007, 7, 16));
        });

        it('test_minusDays_negativeAcrossYear', () => {
            const t = TEST_2007_07_15.minusDays(-169);
            assertEquals(t, LocalDate.of(2007, 12, 31));
        });

        it('test_minusDays_negativeOverYears', () => {
            const t = TEST_2007_07_15.minusDays(-731);
            assertEquals(t, LocalDate.of(2009, 7, 15));
        });

        it('test_minusDays_maximum', () => {
            const t = LocalDate.of(Year.MAX_VALUE, 12, 30).minusDays(-1);
            const expected = LocalDate.of(Year.MAX_VALUE, 12, 31);
            assertEquals(t, expected);
        });

        it('test_minusDays_minimum', () => {
            const t = LocalDate.of(Year.MIN_VALUE, 1, 2).minusDays(1);
            const expected = LocalDate.of(Year.MIN_VALUE, 1, 1);
            assertEquals(t, expected);
        });

        it('test_minusDays_invalidTooLarge', () => {
            expect(() => {
                LocalDate.of(Year.MAX_VALUE, 12, 31).minusDays(-1);
            }).to.throw(DateTimeException);
        });

        it('test_minusDays_invalidTooSmall', () => {
            expect(() => {
                LocalDate.of(Year.MIN_VALUE, 1, 1).minusDays(1);
            }).to.throw(DateTimeException);
        });

        it('test_minusDays_overflowTooLarge', () => {
            expect(() => {
                LocalDate.of(Year.MAX_VALUE, 12, 31).minusDays(MathUtil.MIN_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });

        it('test_minusDays_overflowTooSmall', () => {
            expect(() => {
                LocalDate.of(Year.MIN_VALUE, 1, 1).minusDays(MathUtil.MAX_SAFE_INTEGER);
            }).to.throw(ArithmeticException);
        });

    });

    describe('until()', () => {

        // @DataProvider(name="until")
        function provider_until() {
            return [
                ['2012-06-30', '2012-06-30', ChronoUnit.DAYS, 0],
                ['2012-06-30', '2012-06-30', ChronoUnit.WEEKS, 0],
                ['2012-06-30', '2012-06-30', ChronoUnit.MONTHS, 0],
                ['2012-06-30', '2012-06-30', ChronoUnit.YEARS, 0],
                ['2012-06-30', '2012-06-30', ChronoUnit.DECADES, 0],
                ['2012-06-30', '2012-06-30', ChronoUnit.CENTURIES, 0],
                ['2012-06-30', '2012-06-30', ChronoUnit.MILLENNIA, 0],

                ['2012-06-30', '2012-07-01', ChronoUnit.DAYS, 1],
                ['2012-06-30', '2012-07-01', ChronoUnit.WEEKS, 0],
                ['2012-06-30', '2012-07-01', ChronoUnit.MONTHS, 0],
                ['2012-06-30', '2012-07-01', ChronoUnit.YEARS, 0],
                ['2012-06-30', '2012-07-01', ChronoUnit.DECADES, 0],
                ['2012-06-30', '2012-07-01', ChronoUnit.CENTURIES, 0],
                ['2012-06-30', '2012-07-01', ChronoUnit.MILLENNIA, 0],

                ['2012-06-30', '2012-07-07', ChronoUnit.DAYS, 7],
                ['2012-06-30', '2012-07-07', ChronoUnit.WEEKS, 1],
                ['2012-06-30', '2012-07-07', ChronoUnit.MONTHS, 0],
                ['2012-06-30', '2012-07-07', ChronoUnit.YEARS, 0],
                ['2012-06-30', '2012-07-07', ChronoUnit.DECADES, 0],
                ['2012-06-30', '2012-07-07', ChronoUnit.CENTURIES, 0],
                ['2012-06-30', '2012-07-07', ChronoUnit.MILLENNIA, 0],

                ['2012-06-30', '2012-07-29', ChronoUnit.MONTHS, 0],
                ['2012-06-30', '2012-07-30', ChronoUnit.MONTHS, 1],
                ['2012-06-30', '2012-07-31', ChronoUnit.MONTHS, 1]
            ];
        }

        it('test_until', function () {
            provider_until().forEach((data) => {
                test_until.apply(this, data);
            });
        });

        // @Test(dataProvider = "until")
        function test_until(startStr, endStr, unit, expected) {
            // console.log(startStr, endStr, unit.toString(), expected);
            const start = LocalDate.parse(startStr);
            const end = LocalDate.parse(endStr);
            assertEquals(start.until(end, unit), expected);
            assertEquals(end.until(start, unit), MathUtil.safeZero(-expected));
        }

    });

    describe('atTime()', () => {

        it('test_atTime_LocalTime', () => {
            const t = LocalDate.of(2008, 6, 30);
            assertEquals(t.atTime(LocalTime.of(11, 30)), LocalDateTime.of(2008, 6, 30, 11, 30));
        });

        it('test_atTime_LocalTime_null', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(null);
            }).to.throw(NullPointerException);
        });

        it('test_atTime_OffsetTime', () => {
            const t = LocalDate.of(2008, 6, 30);
            const ot = OffsetTime.of(12, 34, 56, 789, ZoneOffset.ofHours(3));
            assertEquals(t.atTime(ot), OffsetDateTime.of(2008, 6, 30, 12, 34, 56, 789, ZoneOffset.ofHours(3)));
        });

        it('test_atTime_illegal', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime('string');
            }).to.throw(IllegalArgumentException);
        });

        it('test_atTime_int_int', () => {
            const t = LocalDate.of(2008, 6, 30);
            assertEquals(t.atTime(11, 30), LocalDateTime.of(2008, 6, 30, 11, 30));
        });

        it('test_atTime_int_int_hourTooSmall', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(-1, 30);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_hourTooBig', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(24, 30);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_minuteTooSmall', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(11, -1);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_minuteTooBig', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(11, 60);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_int', () => {
            const t = LocalDate.of(2008, 6, 30);
            assertEquals(t.atTime(11, 30, 40), LocalDateTime.of(2008, 6, 30, 11, 30, 40));
        });

        it('test_atTime_int_int_int_hourTooSmall', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(-1, 30, 40);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_int_hourTooBig', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(24, 30, 40);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_int_minuteTooSmall', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(11, -1, 40);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_int_minuteTooBig', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(11, 60, 40);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_int_secondTooSmall', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(11, 30, -1);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_int_secondTooBig', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(11, 30, 60);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_int_int', () => {
            const t = LocalDate.of(2008, 6, 30);
            assertEquals(t.atTime(11, 30, 40, 50), LocalDateTime.of(2008, 6, 30, 11, 30, 40, 50));
        });

        it('test_atTime_int_int_int_int_hourTooSmall', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(-1, 30, 40, 50);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_int_int_hourTooBig', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(24, 30, 40, 50);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_int_int_minuteTooSmall', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(11, -1, 40, 50);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_int_int_minuteTooBig', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(11, 60, 40, 50);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_int_int_secondTooSmall', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(11, 30, -1, 50);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_int_int_secondTooBig', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(11, 30, 60, 50);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_int_int_nanoTooSmall', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(11, 30, 40, -1);
            }).to.throw(DateTimeException);
        });

        it('test_atTime_int_int_int_int_nanoTooBig', () => {
            expect(() => {
                const t = LocalDate.of(2008, 6, 30);
                t.atTime(11, 30, 40, 1000000000);
            }).to.throw(DateTimeException);
        });

    });

    describe('atStartOfDay()', () => {

        it('test_atStartOfDay', () => {
            const t = LocalDate.of(2008, 6, 30);
            assertEquals(t.atStartOfDay(),LocalDateTime.of(2008, 6, 30, 0, 0));
        });


        it('test_atStartOfDay_zone', () => {
            const zone = ZoneId.of('UTC+01:00');
            const t = LocalDate.of(2007, 4, 1);
            assertEquals(t.atStartOfDay(zone),
                ZonedDateTime.of(LocalDateTime.of(2007, 4, 1, 0, 0), zone));
        });

        it('test_atStartOfDay_dstGap', () => {
            const t = LocalDate.of(2007, 4, 1);
            assertEquals(t.atStartOfDay(ZONE_GAZA),
                ZonedDateTime.of(LocalDateTime.of(2007, 4, 1, 1, 0), ZONE_GAZA));
        });

    });

    describe('toEpochDay()', function () {
        const date_0000_01_01 = -678941 - 40587;
        const nextSteps = date_0000_01_01 + (2*356); // 700000;
        const previousSteps = date_0000_01_01 + (2*356); // -2000000;

        it('test_toEpochDay', function () {
            let test = LocalDate.of(0, 1, 1);
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
                const a = localDates[i];
                for (let j = 0; j < localDates.length; j++) {
                    const b = localDates[j];
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
            }).to.throw(IllegalArgumentException);
        });


    });

    function provider_sampleDates() {
        return [
            [2008, 7, 5],
            [2007, 7, 5],
            [2006, 7, 5],
            [2005, 7, 5],
            [2004, 1, 1],
            [-1, 1, 2]
        ];
    }

    describe('equals()', function () {
        it('test_equals_true', function () {
            provider_sampleDates().forEach((sampleDate) => {
                test_equals_true.apply(this, sampleDate);
            });
        });

        function test_equals_true(y, m, d) {
            const a = LocalDate.of(y, m, d);
            const b = LocalDate.of(y, m, d);
            assertEquals(a.equals(b), true);
        }

        it('test_equals_false_year_differs', function () {
            provider_sampleDates().forEach((sampleDate) => {
                test_equals_false_year_differs.apply(this, sampleDate);
            });
        });

        function test_equals_false_year_differs(y, m, d) {
            const a = LocalDate.of(y, m, d);
            const b = LocalDate.of(y + 1, m, d);
            assertEquals(a.equals(b), false);
        }

        it('test_equals_false_month_differs', function () {
            provider_sampleDates().forEach((sampleDate) => {
                test_equals_false_month_differs.apply(this, sampleDate);
            });
        });

        function test_equals_false_month_differs(y, m, d) {
            const a = LocalDate.of(y, m, d);
            const b = LocalDate.of(y, m + 1, d);
            assertEquals(a.equals(b), false);
        }

        it('test_equals_false_day_differs', function () {
            provider_sampleDates().forEach((sampleDate) => {
                test_equals_false_day_differs.apply(this, sampleDate);
            });
        });

        function test_equals_false_day_differs(y, m, d) {
            const a = LocalDate.of(y, m, d);
            const b = LocalDate.of(y, m, d + 1);
            assertEquals(a.equals(b), false);
        }

        it('test_equals_itself_true', function () {
            assertEquals(TEST_2007_07_15.equals(TEST_2007_07_15), true);
        });

        it('test_equals_string_false', function () {
            assertEquals(TEST_2007_07_15.equals('2007-07-15'), false);
        });

        it('test_equals_null_false', function () {
            assertEquals(TEST_2007_07_15.equals(null), false);
        });
    });

    describe('hashCode()', function () {
        it('test_hashCode', function () {
            provider_sampleDates().forEach((sampleDate) => {
                test_hashCode.apply(this, sampleDate);
            });
        });

        function test_hashCode(y, m, d) {
            const a = LocalDate.of(y, m, d);
            assertEquals(a.hashCode(), a.hashCode());
            const b = LocalDate.of(y, m, d);
            assertEquals(a.hashCode(), b.hashCode());
        }
    });

    describe('toString()', function () {
        it('test_toString', function () {
            provider_sampleToString().forEach((sampleDate) => {
                test_toString.apply(this, sampleDate);
            });
        });

        function test_toString(y, m, d, expected) {
            const t = LocalDate.of(y, m, d);
            const str = t.toString();
            assertEquals(str, expected);
            assertEquals(t.toJSON(), str);
        }
    });

    describe('format(DateTimeFormatter)', function () {
        it('test_format_formatter', () => {
            const f = DateTimeFormatter.ofPattern('y M d');
            const t = LocalDate.of(2010, 12, 3).format(f);
            assertEquals(t, '2010 12 3');
        });

        // TODO tests are missing in threeten bp
        it('test_format_formatter_2', () => {
            const f = DateTimeFormatter.ofPattern('yyyy-MM-dd');
            const t = LocalDate.of(2010, 12, 3).format(f);
            assertEquals(t, '2010-12-03');
        });

        it('test_format_formatter_null', () => {
            expect(() => {
                LocalDate.of(2010, 12, 3).format(null);
            }).to.throw(NullPointerException);
        });
    });
});


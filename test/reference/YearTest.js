/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {expect} from 'chai';

import '../_init';

import {Year} from '../../src/Year';
import {ChronoField} from '../../src/temporal/ChronoField';
import {ChronoUnit} from '../../src/temporal/ChronoUnit';
import {Clock} from '../../src/Clock';
import {DateTimeFormatter} from '../../src/format/DateTimeFormatter';
import {IsoChronology} from '../../src/chrono/IsoChronology';
import {LocalDate} from '../../src/LocalDate';
import {LocalDateTime} from '../../src/LocalDateTime';
import {LocalTime} from '../../src/LocalTime';
import {NullPointerException, DateTimeException, DateTimeParseException} from '../../src/errors';
import {MockFieldNoValue} from './temporal/MockFieldNoValue';
import {TemporalQueries} from '../../src/temporal/TemporalQueries';
import {ZoneId} from '../../src/ZoneId';
import {ZoneOffset} from '../../src/ZoneOffset';

describe('org.threeten.bp.temporal.TestYear', () => {
    const TEST_2008 = Year.of(2008);

    //-----------------------------------------------------------------------
    // now()
    //-----------------------------------------------------------------------
    describe('now()', () => {
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
    });
    
    //-----------------------------------------------------------------------
    // now(ZoneId)
    //-----------------------------------------------------------------------
    describe('now(ZoneId)', () => {
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
    });

    //-----------------------------------------------------------------------
    // now(Clock)
    //-----------------------------------------------------------------------
    describe('now(ZoneId)', () => {
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
    });

    //-----------------------------------------------------------------------
    describe('of()', () => {
        it('test_factory_int_singleton', () => {
            for (let i = -4; i <= 2104; i++) {
                let test = Year.of(i);
                expect(test.value()).to.eql(i);
                expect(Year.of(i)).to.eql(test);
            }
        });

        it('test_factory_int_tooLow', () => {
            expect(() => {
                Year.of(Year.MIN_VALUE - 1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_tooHigh', () => {
            expect(() => {
                Year.of(Year.MAX_VALUE + 1);
            }).to.throw(DateTimeException);
        });
        //-----------------------------------------------------------------------
        it('test_factory_CalendricalObject', () => {
            expect(Year.from(LocalDate.of(2007, 7, 15))).to.eql(Year.of(2007));
        });

        it('test_factory_CalendricalObject_invalid_noDerive', () => {
            expect(() => {
                Year.from(LocalTime.of(12, 30));
            }).to.throw(DateTimeException);
        });

        it('test_factory_CalendricalObject_null', () => {
            expect(() => {
                Year.from(null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    // parse()
    //-----------------------------------------------------------------------
    describe('parse()', () => {

        let data_goodParseData = [
            ['0000', Year.of(0)],
            ['9999', Year.of(9999)],
            ['2000', Year.of(2000)],

            // ['+12345678', Year.of(12345678)], // too large for our Year.MAX_VALUE
            ['+123456', Year.of(123456)],
            ['-1234', Year.of(-1234)],
            // ['-12345678', Year.of(-12345678)], // too large for our Year.MIN_VALUE

            ['+' + Year.MAX_VALUE, Year.of(Year.MAX_VALUE)],
            ['' + Year.MIN_VALUE, Year.of(Year.MIN_VALUE)]
        ];

        it('factory_parse_success', () => {
            data_goodParseData.forEach((val) => {
                let [text, expected] = val;
                let year = Year.parse(text);
                expect(year).to.eql(expected);
            });
        });

        let data_badParseData = [
            ['', 0],
            ['-00', 1],
            ['--01-0', 1],
            ['A01', 0],
            ['200', 0],
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
                        Year.parse(text);
                        expect.fail(null, null, `Parse should have failed for ${text} at position ${pos}`);
                    } catch (ex) {
                        expect(ex.parsedString()).to.eql(text);
                        expect(ex.errorIndex()).to.eql(pos);
                        throw ex;
                    }
                }).to.throw(DateTimeParseException);
            });
        });

        it('factory_parse_nullText', () => {
            expect(() => {
                Year.parse(null);
            }).to.throw(NullPointerException);
        });

        //-----------------------------------------------------------------------
        // parse(DateTimeFormatter)
        //-----------------------------------------------------------------------
        it('factory_parse_formatter', () => {
            let f = DateTimeFormatter.ofPattern('u');
            let test = Year.parse('2010', f);
            expect(test).to.eql(Year.of(2010));
        });

        it('factory_parse_formatter_nullText', () => {
            expect(() => {
                let f = DateTimeFormatter.ofPattern('u');
                Year.parse(null, f);
            }).to.throw(NullPointerException);
        });

        it('factory_parse_formatter_nullFormatter', () => {
            expect(() => {
                Year.parse('ANY', null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    // get(DateTimeField)
    //-----------------------------------------------------------------------
    describe('get(DateTimeField)', () => {
        it('test_get_DateTimeField', () => {
            expect(TEST_2008.getLong(ChronoField.YEAR)).to.eql(2008);
            expect(TEST_2008.getLong(ChronoField.YEAR_OF_ERA)).to.eql(2008);
            expect(TEST_2008.getLong(ChronoField.ERA)).to.eql(1);
        });

        it('test_get_DateTimeField_null', () => {
            expect(()=> {
                TEST_2008.getLong(null);
            }).to.throw(NullPointerException);
        });

        it('test_get_DateTimeField_invalidField', () => {
            expect(()=> {
                TEST_2008.getLong(MockFieldNoValue.INSTANCE);
            }).to.throw(DateTimeException);
        });

        it('test_get_DateTimeField_timeField', () => {
            expect(()=> {
                TEST_2008.getLong(ChronoField.AMPM_OF_DAY);
            }).to.throw(DateTimeException);
        });
    });

    //-----------------------------------------------------------------------
    // isLeap()
    //-----------------------------------------------------------------------
    describe('isLeap()', () => {
        it('test_isLeap', () => {
            expect(Year.of(1999).isLeap()).to.eql(false);
            expect(Year.of(2000).isLeap()).to.eql(true);
            expect(Year.of(2001).isLeap()).to.eql(false);

            expect(Year.of(2007).isLeap()).to.eql(false);
            expect(Year.of(2008).isLeap()).to.eql(true);
            expect(Year.of(2009).isLeap()).to.eql(false);
            expect(Year.of(2010).isLeap()).to.eql(false);
            expect(Year.of(2011).isLeap()).to.eql(false);
            expect(Year.of(2012).isLeap()).to.eql(true);

            expect(Year.of(2095).isLeap()).to.eql(false);
            expect(Year.of(2096).isLeap()).to.eql(true);
            expect(Year.of(2097).isLeap()).to.eql(false);
            expect(Year.of(2098).isLeap()).to.eql(false);
            expect(Year.of(2099).isLeap()).to.eql(false);
            expect(Year.of(2100).isLeap()).to.eql(false);
            expect(Year.of(2101).isLeap()).to.eql(false);
            expect(Year.of(2102).isLeap()).to.eql(false);
            expect(Year.of(2103).isLeap()).to.eql(false);
            expect(Year.of(2104).isLeap()).to.eql(true);
            expect(Year.of(2105).isLeap()).to.eql(false);

            expect(Year.of(-500).isLeap()).to.eql(false);
            expect(Year.of(-400).isLeap()).to.eql(true);
            expect(Year.of(-300).isLeap()).to.eql(false);
            expect(Year.of(-200).isLeap()).to.eql(false);
            expect(Year.of(-100).isLeap()).to.eql(false);
            expect(Year.of(0).isLeap()).to.eql(true);
            expect(Year.of(100).isLeap()).to.eql(false);
            expect(Year.of(200).isLeap()).to.eql(false);
            expect(Year.of(300).isLeap()).to.eql(false);
            expect(Year.of(400).isLeap()).to.eql(true);
            expect(Year.of(500).isLeap()).to.eql(false);
        });
    });

    //-----------------------------------------------------------------------
    // plusYears()
    //-----------------------------------------------------------------------
    describe('plusYears()', () => {

        it('test_plusYears', () => {
            expect(Year.of(2007).plusYears(-1)).to.eql(Year.of(2006));
            expect(Year.of(2007).plusYears(0)).to.eql(Year.of(2007));
            expect(Year.of(2007).plusYears(1)).to.eql(Year.of(2008));
            expect(Year.of(2007).plusYears(2)).to.eql(Year.of(2009));

            expect(Year.of(Year.MAX_VALUE - 1).plusYears(1)).to.eql(Year.of(Year.MAX_VALUE));
            expect(Year.of(Year.MAX_VALUE).plusYears(0)).to.eql(Year.of(Year.MAX_VALUE));

            expect(Year.of(Year.MIN_VALUE + 1).plusYears(-1)).to.eql(Year.of(Year.MIN_VALUE));
            expect(Year.of(Year.MIN_VALUE).plusYears(0)).to.eql(Year.of(Year.MIN_VALUE));
        });

        it('test_plusYear_zero_equals', () => {
            let base = Year.of(2007);
            expect(base.plusYears(0)).to.eql(base);
        });

        it('test_plusYears_big', () => {
            let years = 20 + Year.MAX_VALUE;
            expect(Year.of(-40).plusYears(years)).to.eql(Year.of(-40 + years));
        });

        it('test_plusYears_max', () => {
            expect(() => {
                Year.of(Year.MAX_VALUE).plusYears(1);
            }).to.throw(DateTimeException);
        });

        it('test_plusYears_maxLots', () => {
            expect(() => {
                Year.of(Year.MAX_VALUE).plusYears(1000);
            }).to.throw(DateTimeException);
        });

        it('test_plusYears_min', () => {
            expect(() => {
                Year.of(Year.MIN_VALUE).plusYears(-1);
            }).to.throw(DateTimeException);
        });

        it('test_plusYears_minLots', () => {
            expect(() => {
                Year.of(Year.MIN_VALUE).plusYears(-1000);
            }).to.throw(DateTimeException);
        });
    });

    //-----------------------------------------------------------------------
    // minusYears()
    //-----------------------------------------------------------------------
    describe('minusYears()', () => {
        it('test_minusYears', () => {
            expect(Year.of(2007).minusYears(-1)).to.eql(Year.of(2008));
            expect(Year.of(2007).minusYears(0)).to.eql(Year.of(2007));
            expect(Year.of(2007).minusYears(1)).to.eql(Year.of(2006));
            expect(Year.of(2007).minusYears(2)).to.eql(Year.of(2005));

            expect(Year.of(Year.MAX_VALUE - 1).minusYears(-1)).to.eql(Year.of(Year.MAX_VALUE));
            expect(Year.of(Year.MAX_VALUE).minusYears(0)).to.eql(Year.of(Year.MAX_VALUE));

            expect(Year.of(Year.MIN_VALUE + 1).minusYears(1)).to.eql(Year.of(Year.MIN_VALUE));
            expect(Year.of(Year.MIN_VALUE).minusYears(0)).to.eql(Year.of(Year.MIN_VALUE));
        });

        it('test_minusYear_zero_equals', () => {
            let base = Year.of(2007);
            expect(base.minusYears(0)).to.eql(base);
        });

        it('test_minusYears_big', () => {
            let years = 20 + Year.MAX_VALUE;
            expect(Year.of(40).minusYears(years)).to.eql(Year.of(40 - years));
        });

        it('test_minusYears_max', () => {
            expect(() => {
                Year.of(Year.MAX_VALUE).minusYears(-1);
            }).to.throw(DateTimeException);
        });

        it('test_minusYears_maxLots', () => {
            expect(() => {
                Year.of(Year.MAX_VALUE).minusYears(-1000);
            }).to.throw(DateTimeException);
        });

        it('test_minusYears_min', () => {
            expect(() => {
                Year.of(Year.MIN_VALUE).minusYears(1);
            }).to.throw(DateTimeException);
        });

        it('test_minusYears_minLots', () => {
            expect(() => {
                Year.of(Year.MIN_VALUE).minusYears(1000);
            }).to.throw(DateTimeException);
        });
    });

    //-----------------------------------------------------------------------
    // doAdjustment()
    //-----------------------------------------------------------------------
    describe('doAdjustment()', () => {
        it('test_adjustDate', () => {
            let base = LocalDate.of(2007, 2, 12);
            for (let i = -4; i <= 2104; i++) {
                let result = Year.of(i).adjustInto(base);
                expect(result).to.eql(LocalDate.of(i, 2, 12));
            }
        });

        it('test_adjustDate_resolve', () => {
            let test = Year.of(2011);
            expect(test.adjustInto(LocalDate.of(2012, 2, 29))).to.eql(LocalDate.of(2011, 2, 28));
        });

        it('test_adjustDate_nullLocalDate', () => {
            expect(() => {
                let test = Year.of(1);
                test.adjustInto(null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    // length()
    //-----------------------------------------------------------------------
    describe('length()', () => {
        it('test_length', () => {
            expect(Year.of(1999).length()).to.eql(365);
            expect(Year.of(2000).length()).to.eql(366);
            expect(Year.of(2001).length()).to.eql(365);

            expect(Year.of(2007).length()).to.eql(365);
            expect(Year.of(2008).length()).to.eql(366);
            expect(Year.of(2009).length()).to.eql(365);
            expect(Year.of(2010).length()).to.eql(365);
            expect(Year.of(2011).length()).to.eql(365);
            expect(Year.of(2012).length()).to.eql(366);

            expect(Year.of(2095).length()).to.eql(365);
            expect(Year.of(2096).length()).to.eql(366);
            expect(Year.of(2097).length()).to.eql(365);
            expect(Year.of(2098).length()).to.eql(365);
            expect(Year.of(2099).length()).to.eql(365);
            expect(Year.of(2100).length()).to.eql(365);
            expect(Year.of(2101).length()).to.eql(365);
            expect(Year.of(2102).length()).to.eql(365);
            expect(Year.of(2103).length()).to.eql(365);
            expect(Year.of(2104).length()).to.eql(366);
            expect(Year.of(2105).length()).to.eql(365);

            expect(Year.of(-500).length()).to.eql(365);
            expect(Year.of(-400).length()).to.eql(366);
            expect(Year.of(-300).length()).to.eql(365);
            expect(Year.of(-200).length()).to.eql(365);
            expect(Year.of(-100).length()).to.eql(365);
            expect(Year.of(0).length()).to.eql(366);
            expect(Year.of(100).length()).to.eql(365);
            expect(Year.of(200).length()).to.eql(365);
            expect(Year.of(300).length()).to.eql(365);
            expect(Year.of(400).length()).to.eql(366);
            expect(Year.of(500).length()).to.eql(365);
        });
    });

    //-----------------------------------------------------------------------
    // isValidMonthDay(Month)
    //-----------------------------------------------------------------------
    // TODO: skipped, needs MonthDay
    describe.skip('isValidMonthDay(Month)', () => {
        it('test_isValidMonthDay_june', () => {
            let test = Year.of(2007);
            let monthDay = MonthDay.of(6, 30);
            expect(test.isValidMonthDay(monthDay)).to.eql(true);
        });

        it('test_isValidMonthDay_febNonLeap', () => {
            let test = Year.of(2007);
            let monthDay = MonthDay.of(2, 29);
            expect(test.isValidMonthDay(monthDay)).to.eql(false);
        });

        it('test_isValidMonthDay_febLeap', () => {
            let test = Year.of(2008);
            let monthDay = MonthDay.of(2, 29);
            expect(test.isValidMonthDay(monthDay)).to.eql(true);
        });

        it('test_isValidMonthDay_null', () => {
            let test = Year.of(2008);
            expect(test.isValidMonthDay(null)).to.eql(false);
        });
    });

    //-----------------------------------------------------------------------
    // atMonth(Month)
    //-----------------------------------------------------------------------
    // TODO: skipped, needs YearMonth
    describe.skip('atMonth(Month)', () => {
        it('test_atMonth', () => {
            let test = Year.of(2008);
            expect(test.atMonth(Month.JUNE)).to.eql(YearMonth.of(2008, 6));
        });

        it('test_atMonth_nullMonth', () => {
            expect(() => {
                let test = Year.of(2008);
                test.atMonth(null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    // atMonth(int)
    //-----------------------------------------------------------------------
    // TODO: skipped, needs YearMonth
    describe.skip('atMonth(Month)', () => {
        it('test_atMonth_int', () => {
            let test = Year.of(2008);
            expect(test.atMonth(6)).to.eql(YearMonth.of(2008, 6));
        });

        it('test_atMonth_int_invalidMonth', () => {
            expect(() => {
                let test = Year.of(2008);
                test.atMonth(13);
            }).to.throw(DateTimeException);
        });
    });
    //-----------------------------------------------------------------------
    // atMonthDay(MonthDay)
    //-----------------------------------------------------------------------
    // TODO: skipped, needs MonthDay
    describe.skip('atMonthDay(MonthDay)', () => {
        // let data_atMonthDay = [
        //     [Year.of(2008), MonthDay.of(6, 30), LocalDate.of(2008, 6, 30)],
        //     [Year.of(2008), MonthDay.of(2, 29), LocalDate.of(2008, 2, 29)],
        //     [Year.of(2009), MonthDay.of(2, 29), LocalDate.of(2009, 2, 28)]
        // ];

        it('test_atMonthDay', () => {
            data_atMonthDay.forEach((val) => {
                let [year, monthDay, expected] = val;
                expect(year.atMonthDay(monthDay)).to.eql(expected);
            });
        });

        it('test_atMonthDay_nullMonthDay', () => {
            expect(() => {
                let test = Year.of(2008);
                test.atMonthDay(null);
            }).to.throw(NullPointerException);
        });
    });
    //-----------------------------------------------------------------------
    // atDay(int)
    //-----------------------------------------------------------------------
    describe('atDay(int)', () => {
        it('test_atDay_notLeapYear', () => {
            let test = Year.of(2007);
            let expected = LocalDate.of(2007, 1, 1);
            for (let i = 1; i <= 365; i++) {
                expect(test.atDay(i)).to.eql(expected);
                expected = expected.plusDays(1);
            }
        });

        it('test_atDay_notLeapYear_day366', () => {
            expect(() => {
                let test = Year.of(2007);
                test.atDay(366);
            });
        });

        it('test_atDay_leapYear', () => {
            let test = Year.of(2008);
            let expected = LocalDate.of(2008, 1, 1);
            for (let i = 1; i <= 366; i++) {
                expect(test.atDay(i)).to.eql(expected);
                expected = expected.plusDays(1);
            }
        });

        it('test_atDay_day0', () => {
            expect(() => {
                let test = Year.of(2007);
                test.atDay(0);
            }).to.throw(DateTimeException);
        });

        it('test_atDay_day367', () => {
            expect(() => {
                let test = Year.of(2007);
                test.atDay(367);
            }).to.throw(DateTimeException);
        });
    });

    //-----------------------------------------------------------------------
    // query(TemporalQuery)
    //-----------------------------------------------------------------------
    describe('query(TemporalQuery)', () => {
        it('test_query', () => {
            expect(TEST_2008.query(TemporalQueries.chronology())).to.eql(IsoChronology.INSTANCE);
            expect(TEST_2008.query(TemporalQueries.localDate())).to.eql(null);
            expect(TEST_2008.query(TemporalQueries.localTime())).to.eql(null);
            expect(TEST_2008.query(TemporalQueries.offset())).to.eql(null);
            expect(TEST_2008.query(TemporalQueries.precision())).to.eql(ChronoUnit.YEARS);
            expect(TEST_2008.query(TemporalQueries.zone())).to.eql(null);
            expect(TEST_2008.query(TemporalQueries.zoneId())).to.eql(null);
        });

        it('test_query_null', () => {
            expect(() => {
                TEST_2008.query(null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    // compareTo()
    //-----------------------------------------------------------------------
    describe('compareTo()', () => {
        it('test_compareTo', () => {
            for (let i = -4; i <= 2104; i += 10) { // threetenbp checks _every_ year, but that is too slow for mocha timeout
                let a = Year.of(i);
                for (let j = -4; j <= 2104; j += 10) {
                    let b = Year.of(j);
                    if (i < j) {
                        expect(a.compareTo(b) < 0).to.eql(true);
                        expect(b.compareTo(a) > 0).to.eql(true);
                        expect(a.isAfter(b)).to.eql(false);
                        expect(a.isBefore(b)).to.eql(true);
                        expect(b.isAfter(a)).to.eql(true);
                        expect(b.isBefore(a)).to.eql(false);
                    } else if (i > j) {
                        expect(a.compareTo(b) > 0).to.eql(true);
                        expect(b.compareTo(a) < 0).to.eql(true);
                        expect(a.isAfter(b)).to.eql(true);
                        expect(a.isBefore(b)).to.eql(false);
                        expect(b.isAfter(a)).to.eql(false);
                        expect(b.isBefore(a)).to.eql(true);
                    } else {
                        expect(a.compareTo(b)).to.eql(0);
                        expect(b.compareTo(a)).to.eql(0);
                        expect(a.isAfter(b)).to.eql(false);
                        expect(a.isBefore(b)).to.eql(false);
                        expect(b.isAfter(a)).to.eql(false);
                        expect(b.isBefore(a)).to.eql(false);
                    }
                }
            }
        });

        it('test_compareTo_nullYear', () => {
            expect(() => {
                let doy = null;
                let test = Year.of(1);
                test.compareTo(doy);
            }).to.throw(NullPointerException);
        });
    });
    //-----------------------------------------------------------------------
    // equals()
    //-----------------------------------------------------------------------
    describe('equals()', () => {
        it('test_equals', () => {
            for (let i = -4; i <= 2104; i += 10) { // threetenbp checks _every_ year, but that is too slow for mocha timeout
                let a = Year.of(i);
                for (let j = -4; j <= 2104; j += 10) {
                    let b = Year.of(j);
                    expect(a.equals(b)).to.eql(i === j);
                }
            }
        });

        it('test_equals_same', () => {
            let test = Year.of(2011);
            expect(test.equals(test)).to.eql(true);
        });

        it('test_equals_nullYear', () => {
            let doy = null;
            let test = Year.of(1);
            expect(test.equals(doy)).to.eql(false);
        });

        it('test_equals_incorrectType', () => {
            let test = Year.of(1);
            expect(test.equals('Incorrect type')).to.eql(false);
        });
    });

    //-----------------------------------------------------------------------
    // toString()
    //-----------------------------------------------------------------------
    describe('toString()', () => {
        it('test_toString', () => {
            for (let i = -4; i <= 2104; i++) {
                let a = Year.of(i);
                expect(a.toString()).to.eql('' + i);
            }
        });
    });

    //-----------------------------------------------------------------------
    // format(DateTimeFormatter)
    //-----------------------------------------------------------------------
    describe('format(DateTimeFormatter)', () => {
        it('test_format_formatter', () => {
            let f = DateTimeFormatter.ofPattern('y');
            let t = Year.of(2010).format(f);
            expect(t).to.eql('2010');
        });

        it('format_formatter_null', () => {
            expect(() => {
                Year.of(2010).format(null);
            }).to.throw(NullPointerException);
        });
    });
});
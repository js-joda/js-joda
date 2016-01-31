import {expect} from 'chai';
import {Clock} from '../../src/Clock';
import {Instant} from '../../src/Instant';
import {LocalDate} from '../../src/LocalDate';
import {Month} from '../../src/Month';
import {DateTimeException} from '../../src/errors';
import {ZoneOffset} from '../../src/ZoneOffset';
import {Year} from '../../src/Year';

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
        if (year % 4 != 0) {
            return false;
        }
        if (year % 100 == 0 && year % 400 != 0) {
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
        if (date.month() == Month.DECEMBER) {
            date = date.withYear(date.year() + 1);
        }
        return date.withMonth(date.month().plus(1));
    }

    function previous(date) {
        var newDayOfMonth = date.dayOfMonth() - 1;
        if (newDayOfMonth > 0) {
            return date.withDayOfMonth(newDayOfMonth);
        }
        date = date.with(date.getMonth().minus(1));
        if (date.month() == Month.DECEMBER) {
            date = date.withYear(date.getYear() - 1);
        }
        return date.withDayOfMonth(date.getMonth().length(isIsoLeap(date.getYear())));
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
            //expect(LocalDate.ofEpochDay(MAX_VALID_EPOCHDAYS)).to.eql(LocalDate.of(Year.MAX_VALUE, 12, 31));
            //expect(LocalDate.ofEpochDay(MIN_VALID_EPOCHDAYS)).to.eql(LocalDate.of(Year.MIN_VALUE, 1, 1));
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

        it.skip('now_Clock_maxYear', () => {
            var clock = Clock.fixed(MAX_INSTANT, ZoneOffset.UTC);
            var test = LocalDate.now(clock);
            expect(test.equals(MAX_DATE)).to.equal(true);
        });

        it.skip('now_Clock_tooBig', () => {
            var clock = Clock.fixed(MAX_INSTANT.plusSeconds(24 * 60 * 60), ZoneOffset.UTC);
            expect(() => {
                LocalDate.now(clock);
            }).to.throw(DateTimeException);
        });

        it.skip('now_Clock_minYear', () => {
            var clock = Clock.fixed(MIN_INSTANT, ZoneOffset.UTC);
            var test = LocalDate.now(clock);
            expect(test.equals(MIN_DATE)).to.equal(true);
        });

        it.skip('now_Clock_tooLow', () => {
            var clock = Clock.fixed(MIN_INSTANT.minusNanos(1), ZoneOffset.UTC);
            expect(() => {
                LocalDate.now(clock);
            }).to.throw(DateTimeException);
        });
    });
});


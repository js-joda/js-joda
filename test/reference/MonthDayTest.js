/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {expect} from 'chai';

import '../_init';
import {DateTimeException, DateTimeParseException, NullPointerException} from '../../src/errors';

import {Clock} from '../../src/Clock';
import {ChronoField} from '../../src/temporal/ChronoField';
import {DateTimeFormatter} from '../../src/format/DateTimeFormatter';
import {LocalDate} from '../../src/LocalDate';
import {LocalDateTime} from '../../src/LocalDateTime';
import {LocalTime} from '../../src/LocalTime';
import {MockFieldNoValue} from './temporal/MockFieldNoValue';
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
    //-----------------------------------------------------------------------
    // parse()
    //-----------------------------------------------------------------------
    describe('parse()', () => {
        let data_goodParseData = [
            ['--01-01', MonthDay.of(1, 1)],
            ['--01-31', MonthDay.of(1, 31)],
            ['--02-01', MonthDay.of(2, 1)],
            ['--02-29', MonthDay.of(2, 29)],
            ['--03-01', MonthDay.of(3, 1)],
            ['--03-31', MonthDay.of(3, 31)],
            ['--04-01', MonthDay.of(4, 1)],
            ['--04-30', MonthDay.of(4, 30)],
            ['--05-01', MonthDay.of(5, 1)],
            ['--05-31', MonthDay.of(5, 31)],
            ['--06-01', MonthDay.of(6, 1)],
            ['--06-30', MonthDay.of(6, 30)],
            ['--07-01', MonthDay.of(7, 1)],
            ['--07-31', MonthDay.of(7, 31)],
            ['--08-01', MonthDay.of(8, 1)],
            ['--08-31', MonthDay.of(8, 31)],
            ['--09-01', MonthDay.of(9, 1)],
            ['--09-30', MonthDay.of(9, 30)],
            ['--10-01', MonthDay.of(10, 1)],
            ['--10-31', MonthDay.of(10, 31)],
            ['--11-01', MonthDay.of(11, 1)],
            ['--11-30', MonthDay.of(11, 30)],
            ['--12-01', MonthDay.of(12, 1)],
            ['--12-31', MonthDay.of(12, 31)]
        ];

        it('factory_parse_success', () => {
            data_goodParseData.forEach((val) => {
                let [text, expected] = val;
                let monthDay = MonthDay.parse(text);
                expect(monthDay).to.eql(expected);
            });
        });
        //-----------------------------------------------------------------------
        let data_badParseData = [
            ['', 0],
            ['-00', 0],
            ['--FEB-23', 2],
            ['--01-0', 5],
            ['--01-3A', 5]
        ];

        it('factory_parse_fail', () => {
            data_badParseData.forEach((val) => {
                let [text, pos] = val;
                expect(() => {
                    try {
                        MonthDay.parse(text);
                        expect.fail(null, null, `Parse should have failed for ${text} at position ${pos}`);
                    }
                    catch (ex) {
                        expect(ex.parsedString()).to.eql(text);
                        expect(ex.errorIndex()).to.eql(pos);
                        throw ex;
                    }
                }).to.throw(DateTimeParseException);
            });

            //-----------------------------------------------------------------------
            it('factory_parse_illegalValue_Day', () => {
                expect(() => {
                    MonthDay.parse('--06-32');
                }).to.throw(DateTimeParseException);
            });

            it('factory_parse_invalidValue_Day', () => {
                expect(() => {
                    MonthDay.parse('--06-31');
                }).to.throw(DateTimeParseException);
            });

            it('factory_parse_illegalValue_Month', () => {
                expect(() => {
                    MonthDay.parse('--13-25');
                }).to.throw(DateTimeParseException);
            });

            it('factory_parse_nullText', () => {
                expect(() => {
                    MonthDay.parse(null);
                }).to.throw(NullPointerException);
            });
        });
    });
    //-----------------------------------------------------------------------
    // parse(DateTimeFormatter)
    //-----------------------------------------------------------------------
    describe('parse(DateTimeFormatter)', () => {
        it('factory_parse_formatter', () => {
            let f = DateTimeFormatter.ofPattern('M d');
            let test = MonthDay.parse('12 3', f);
            expect(test).to.eql(MonthDay.of(12, 3));
        });

        it('factory_parse_formatter_nullText', () => {
            expect(() => {
                let f = DateTimeFormatter.ofPattern('M d');
                MonthDay.parse(null, f);
            }).to.throw(NullPointerException);
        });

        it('factory_parse_formatter_nullFormatter', () => {
            expect(() => {
                MonthDay.parse('ANY', null);
            }).to.throw(NullPointerException);
        });
    });
    //-----------------------------------------------------------------------
    // get(DateTimeField)
    //-----------------------------------------------------------------------
    describe('get(DateTimeField)', () => {
        it('test_get_DateTimeField', () => {
            expect(TEST_07_15.getLong(ChronoField.DAY_OF_MONTH)).to.eql(15);
            expect(TEST_07_15.getLong(ChronoField.MONTH_OF_YEAR)).to.eql(7);
        });

        it('test_get_DateTimeField_null', () => {
            expect(() => {
                TEST_07_15.getLong(null);
            }).to.throw(NullPointerException);
        });

        it('test_get_DateTimeField_invalidField', () => {
            expect(() => {
                TEST_07_15.getLong(MockFieldNoValue.INSTANCE);
            }).to.throw(DateTimeException);
        });

        it('test_get_DateTimeField_timeField', () => {
            expect(() => {
                TEST_07_15.getLong(ChronoField.AMPM_OF_DAY);
            }).to.throw(DateTimeException);
        });
    });
    //-----------------------------------------------------------------------
    // get*()
    //-----------------------------------------------------------------------
    describe('get*()', () => {
        let data_sampleDates = [
            [1, 1],
            [1, 31],
            [2, 1],
            [2, 28],
            [2, 29],
            [7, 4],
            [7, 5]
        ];

        it('test_get', () => {
            data_sampleDates.forEach((val) => {
                let [m, d] = val;
                let a = MonthDay.of(m, d);
                expect(a.month()).to.eql(Month.of(m));
                expect(a.dayOfMonth()).to.eql(d);
            });
        });
    });

    //-----------------------------------------------------------------------
    // withMonth()
    //-----------------------------------------------------------------------
    describe('withMonth()', () => {
        it('test_withMonth', () => {
            expect(MonthDay.of(6, 30).withMonth(1)).to.eql(MonthDay.of(1, 30));
        });

        it('test_withMonth_adjustToValid', () => {
            expect(MonthDay.of(7, 31).withMonth(6)).to.eql(MonthDay.of(6, 30));
        });

        it('test_withMonth_adjustToValidFeb', () => {
            expect(MonthDay.of(7, 31).withMonth(2)).to.eql(MonthDay.of(2, 29));
        });

        it('test_withMonth_int_noChangeEqual', () => {
            let test = MonthDay.of(6, 30);
            expect(test.withMonth(6)).to.eql(test);
        });

        it('test_withMonth_tooLow', () => {
            expect(() => {
                MonthDay.of(6, 30).withMonth(0);
            }).to.throw(DateTimeException);
        });

        it('test_withMonth_tooHigh', () => {
            expect(() => {
                MonthDay.of(6, 30).withMonth(13);
            }).to.throw(DateTimeException);
        });
    });
    //-----------------------------------------------------------------------
    // withDayOfMonth()
    //-----------------------------------------------------------------------
    describe('withDayOfMonth()', () => {
        it('test_withDayOfMonth', () => {
            expect(MonthDay.of(6, 30).withDayOfMonth(1)).to.eql(MonthDay.of(6, 1));
        });

        it('test_withDayOfMonth_invalid', () => {
            expect(() => {
                MonthDay.of(6, 30).withDayOfMonth(31);
            }).to.throw(DateTimeException);
        });

        it('test_withDayOfMonth_adjustToValidFeb', () => {
            expect(MonthDay.of(2, 1).withDayOfMonth(29)).to.eql(MonthDay.of(2, 29));
        });

        it('test_withDayOfMonth_noChangeEqual', () => {
            let test = MonthDay.of(6, 30);
            expect(test.withDayOfMonth(30)).to.eql(test);
        });

        it('test_withDayOfMonth_tooLow', () => {
            expect(() => {
                MonthDay.of(6, 30).withDayOfMonth(0);
            }).to.throw(DateTimeException);
        });

        it('test_withDayOfMonth_tooHigh', () => {
            expect(() => {
                MonthDay.of(6, 30).withDayOfMonth(32);
            }).to.throw(DateTimeException);
        });
    });
});


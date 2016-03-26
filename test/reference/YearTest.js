/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {expect} from 'chai';

import '../_init';

import {Year} from '../../src/Year';
import {ChronoField} from '../../src/temporal/ChronoField';
import {Clock} from '../../src/Clock';
import {DateTimeFormatter} from '../../src/format/DateTimeFormatter';
import {LocalDate} from '../../src/LocalDate';
import {LocalDateTime} from '../../src/LocalDateTime';
import {LocalTime} from '../../src/LocalTime';
import {NullPointerException, DateTimeException, DateTimeParseException} from '../../src/errors';
import {MockFieldNoValue} from './temporal/MockFieldNoValue';
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
});
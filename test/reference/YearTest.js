/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import {expect} from 'chai';

import '../_init';

import {Year} from '../../src/Year';
import {Clock} from '../../src/Clock';
import {DateTimeFormatter} from '../../src/format/DateTimeFormatter';
import {LocalDate} from '../../src/LocalDate';
import {LocalDateTime} from '../../src/LocalDateTime';
import {LocalTime} from '../../src/LocalTime';
import {NullPointerException, DateTimeException, DateTimeParseException} from '../../src/errors';
import {ZoneId} from '../../src/ZoneId';
import {ZoneOffset} from '../../src/ZoneOffset';
import {YearConstants} from '../../src/YearConstants';

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
                Year.of(YearConstants.MIN_VALUE - 1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_tooHigh', () => {
            expect(() => {
                Year.of(YearConstants.MAX_VALUE + 1);
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

            ['+' + YearConstants.MAX_VALUE, Year.of(YearConstants.MAX_VALUE)],
            ['' + YearConstants.MIN_VALUE, Year.of(YearConstants.MIN_VALUE)]
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

});
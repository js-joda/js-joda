/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals, dataProviderTest} from '../testUtils';
import {DateTimeException, NullPointerException, IllegalArgumentException} from '../../src/errors';

import '../_init';

import {Instant} from '../../src/Instant';
import {LocalDateTime} from '../../src/LocalDateTime';
import {ZoneId} from '../../src/ZoneId';
import {ZoneIdFactory} from '../../src/ZoneIdFactory';
import {ZoneOffset} from '../../src/ZoneOffset';

describe('org.threeten.bp.TestZoneId', ()=>{

    // @DataProvider(name='String_UTC')
    function data_of_string_UTC() {
        return [
            [''],
            ['+00'],['+0000'],['+00:00'],['+000000'],['+00:00:00'],
            ['-00'],['-0000'],['-00:00'],['-000000'],['-00:00:00']
        ];
    }

    describe('regular factory', function () {

        // @Test(dataProvider='String_UTC')
        it('test_of_string_UTC', () => {
            dataProviderTest(data_of_string_UTC, (id) => {
                const test = ZoneId.of('UTC' + id);
                assertEquals(test.id(), 'UTC');
                assertEquals(test.normalized(), ZoneOffset.UTC);
            });
        });

        // @Test(dataProvider='String_UTC')
        it('test_of_string_GMT', () => {
            dataProviderTest(data_of_string_UTC, (id) => {
                const test = ZoneId.of('GMT' + id);
                assertEquals(test.id(), 'GMT');
                assertEquals(test.normalized(), ZoneOffset.UTC);
            });
        });

        // @Test(dataProvider='String_UTC')
        it('test_of_string_UT', () => {
            dataProviderTest(data_of_string_UTC, (id) => {
                const test = ZoneId.of('UT' + id);
                assertEquals(test.id(), 'UT');
                assertEquals(test.normalized(), ZoneOffset.UTC);
            });
        });

        //-----------------------------------------------------------------------
        // @DataProvider(name='String_Fixed')
        function data_of_string_Fixed() {
            return [
                ['+0', ''],
                ['+5', '+05:00'],
                ['+01', '+01:00'],
                ['+0100', '+01:00'],['+01:00', '+01:00'],
                ['+010000', '+01:00'],['+01:00:00', '+01:00'],
                ['+12', '+12:00'],
                ['+1234', '+12:34'],['+12:34', '+12:34'],
                ['+123456', '+12:34:56'],['+12:34:56', '+12:34:56'],
                ['-02', '-02:00'],
                ['-5', '-05:00'],
                ['-0200', '-02:00'],['-02:00', '-02:00'],
                ['-020000', '-02:00'],['-02:00:00', '-02:00']
            ];
        }

        // @Test(dataProvider='String_Fixed')
        it('test_of_string_offset', () => {
            dataProviderTest(data_of_string_Fixed, (input, id) => {
                const test = ZoneId.of(input);
                const offset = ZoneOffset.of(id.length === 0 ? 'Z' : id);
                assertEquals(test, offset);
            });
        });

        // @Test(dataProvider='String_Fixed')
        it('test_of_string_FixedUTC', () => {
            dataProviderTest(data_of_string_Fixed, (input, id) => {
                const test = ZoneId.of('UTC' + input);
                assertEquals(test.id(), 'UTC' + id);
                assertEquals(test.rules().isFixedOffset(), true);
                const offset = ZoneOffset.of(id.length === 0 ? 'Z' : id);
                assertEquals(test.rules().offset(Instant.ofEpochSecond(0)), offset);
                checkOffset(test.rules(), createLDT(2008, 6, 30), offset, 1);
            });
        });


        // @Test(dataProvider='String_Fixed')
        it('test_of_string_FixedGMT', () => {
            dataProviderTest(data_of_string_Fixed, (input, id) => {
                const test = ZoneId.of('GMT' + input);
                assertEquals(test.id(), 'GMT' + id);
                assertEquals(test.rules().isFixedOffset(), true);
                const offset = ZoneOffset.of(id.length === 0 ? 'Z' : id);
                assertEquals(test.rules().offset(Instant.ofEpochSecond(0)), offset);
                checkOffset(test.rules(), createLDT(2008, 6, 30), offset, 1);
            });
        });

        // @Test(dataProvider='String_Fixed')
        it('test_of_string_FixedUT', () => {
            dataProviderTest(data_of_string_Fixed, (input, id) => {
                const test = ZoneId.of('UT' + input);
                assertEquals(test.id(), 'UT' + id);
                assertEquals(test.rules().isFixedOffset(), true);
                const offset = ZoneOffset.of(id.length === 0 ? 'Z' : id);
                assertEquals(test.rules().offset(Instant.ofEpochSecond(0)), offset);
                checkOffset(test.rules(), createLDT(2008, 6, 30), offset, 1);
            });
        });

        //-----------------------------------------------------------------------
        // @DataProvider(name='String_UTC_Invalid')
        function data_of_string_UTC_invalid() {
            return [
                ['A'], ['B'], ['C'], ['D'], ['E'], ['F'], ['G'], ['H'], ['I'], ['J'], ['K'], ['L'], ['M'],
                ['N'], ['O'], ['P'], ['Q'], ['R'], ['S'], ['T'], ['U'], ['V'], ['W'], ['X'], ['Y'],
                ['+0:00'], ['+00:0'], ['+0:0'],
                ['+000'], ['+00000'],
                ['+0:00:00'], ['+00:0:00'], ['+00:00:0'], ['+0:0:0'], ['+0:0:00'], ['+00:0:0'], ['+0:00:0'],
                ['+01_00'], ['+01;00'], ['+01@00'], ['+01:AA'],
                ['+19'], ['+19:00'], ['+18:01'], ['+18:00:01'], ['+1801'], ['+180001'],
                ['-0:00'], ['-00:0'], ['-0:0'],
                ['-000'], ['-00000'],
                ['-0:00:00'], ['-00:0:00'], ['-00:00:0'], ['-0:0:0'], ['-0:0:00'], ['-00:0:0'], ['-0:00:0'],
                ['-19'], ['-19:00'], ['-18:01'], ['-18:00:01'], ['-1801'], ['-180001'],
                ['-01_00'], ['-01;00'], ['-01@00'], ['-01:AA'],
                ['@01:00']
            ];
        }

        // @Test(dataProvider='String_UTC_Invalid', expectedExceptions=DateTimeException.class)
        it('test_of_string_UTC_invalid', () => {
            dataProviderTest(data_of_string_UTC_invalid, (id) => {
                expect(()=>{
                    ZoneId.of('UTC' + id);
                }).to.throw(DateTimeException);
            });
        });

        it('test_of_string_GMT_invalid', () => {
            dataProviderTest(data_of_string_UTC_invalid, (id) => {
                expect(()=>{
                    ZoneId.of('GMT' + id);
                }).to.throw(DateTimeException);
            });
        });

        //-----------------------------------------------------------------------
        // @DataProvider(name='String_Invalid')
        function data_of_string_invalid() {
            // \u00ef is a random unicode character
            return [
                [''], [':'], ['#'],
                ['\u00ef'], ['`'], ['!'], ['\''], ['\u00ef'], ['$'], ['^'], ['&'], ['*'], ['('], [')'], ['='],
                ['\\'], ['|'], [','], ['<'], ['>'], ['?'], [';'], ['"'], ['['], [']'], ['['], [']'],
                ['\u00ef:A'], ['`:A'], ['!:A'], ['\':A'], ['\u00ef:A'], ['$:A'], ['^:A'], ['&:A'], ['*:A'], ['(:A'], ['):A'], ['=:A'], ['+:A'],
                ['\\:A'], ['|:A'], [',:A'], ['<:A'], ['>:A'], ['?:A'], [';:A'], ['::A'], ['":A'], ['@:A'], ['~:A'], ['[:A'], [']:A'], ['[:A'], [']:A'],
                ['A:B#\u00ef'], ['A:B#`'], ['A:B#!'], ['A:B#\''], ['A:B#\u00ef'], ['A:B#$'], ['A:B#^'], ['A:B#&'], ['A:B#*'],
                ['A:B#('], ['A:B#)'], ['A:B#='], ['A:B#+'],
                ['A:B#\\'], ['A:B#|'], ['A:B#,'], ['A:B#<'], ['A:B#>'], ['A:B#?'], ['A:B#;'], ['A:B#:'],
                ['A:B#"'], ['A:B#@'], ['A:B#~'], ['A:B#['], ['A:B#]'], ['A:B#['], ['A:B#]']
            ];
        }

        // @Test(dataProvider='String_Invalid', expectedExceptions=DateTimeException.class)
        it('test_of_string_invalid', () => {
            dataProviderTest(data_of_string_invalid, (id) => {
                expect(()=>{
                    ZoneId.of(id);
                }).to.throw(DateTimeException);
            });
        });

        //-----------------------------------------------------------------------
        it('test_of_string_GMT0()', () => {
            const test = ZoneId.of('GMT0');
            assertEquals(test.id(), 'GMT0');
            assertEquals(test.rules().isFixedOffset(), true);
            assertEquals(test.normalized(), ZoneOffset.UTC);
        });


        //-----------------------------------------------------------------------
        it('test_of_string_null', () => {
            expect(() => {
                ZoneId.of(null);
            }).to.throw(NullPointerException);
        });

        it('test_of_string_unknown_simple', () => {
            expect(() => {
                ZoneId.of('Unknown');
            }).to.throw(DateTimeException);
        });


        it('test_get_TzdbFixed()', () => {
            const test = ZoneId.of('+01:30');
            assertEquals(test.id(), '+01:30');
            assertEquals(test.rules().isFixedOffset(), true);
        });

        // javascript SYSTEM time-zone
        it('test_of_string_SYSTEM', () => {
            const test = ZoneId.of('SYSTEM');
            assertEquals(test.id(), 'SYSTEM');
            assertEquals(test, ZoneId.systemDefault());
            assertEquals(test.normalized(), ZoneId.systemDefault());
        });

    });

    // TODO missing in threeten bp
    describe('ofOffset()', function () {

        function data_prefixValid(){
            return [
                ['GMT', '+00:00', 0],
                ['GMT', '+01:00', 1],
                ['UTC', '+01:00', 1],
                ['UT', '+01:00', 1],
                ['', '+01:00', 1]
            ];
        }

        it('test_prefixOfOffset', () => {
            dataProviderTest(data_prefixValid, (prefix, offset, expectedHour) => {
                const zoff = ZoneOffset.of(offset);
                const zoneId = ZoneIdFactory.ofOffset(prefix, zoff);
                assertEquals(zoneId.rules(), ZoneOffset.ofHours(expectedHour).rules());
                assertEquals(zoneId.id(), prefix + (expectedHour !== 0 ? zoff.id() : ''), 'in correct id for : ' + prefix + ', zoff: ' + zoff);
            });
        });

        function data_prefixInvalid() {
            return [
                ['GM', '+01:00'],
                ['U', '+01:00'],
                ['UTC0', '+01:00'],
                ['A', '+01:00']
            ];
        }

        it('test_invalidPrefixOfOffset', () => {
            dataProviderTest(data_prefixInvalid, (prefix, offset) => {
                expect(() => {
                    const zoff = ZoneOffset.of(offset);
                    ZoneIdFactory.ofOffset(prefix, zoff);
                }).to.throw(IllegalArgumentException);
            });
        });

        it('test_nullPrefixOfOffset', function () {
            expect(() => {
                ZoneIdFactory.ofOffset(null, ZoneOffset.ofTotalSeconds(1));
            }).to.throw(NullPointerException);
        });

        it('test_nullOffsetOfOffset', function () {
            expect(() => {
                ZoneIdFactory.ofOffset('GMT', null);
            }).to.throw(NullPointerException);
        });

    });

    describe('equals() / hashCode()', function () {

        it('test_equals()', () => {
            const test1 = ZoneId.of('UTC+00');
            const test2 = ZoneId.of('GMT+00');
            const test2b = ZoneId.of('GMT+00');
            assertEquals(test1.equals(test2), false);
            assertEquals(test2.equals(test1), false);

            assertEquals(test1.equals(test1), true);
            assertEquals(test2.equals(test2), true);
            assertEquals(test2.equals(test2b), true);

            assertEquals(test1.hashCode() === test1.hashCode(), true);
            assertEquals(test2.hashCode() === test2.hashCode(), true);
            assertEquals(test2.hashCode() === test2b.hashCode(), true);
        });

        it('test_equals_null()', () => {
            assertEquals(ZoneId.of('GMT+00').equals(null), false);
        });

        it('test_equals_notTimeZone()', () => {
            assertEquals(ZoneId.of('GMT+00').equals('GMT+00'), false);
        });

    });

    describe('toString()', () => {

        // @DataProvider(name='ToString')
        function data_toString() {
            return [
                //['Europe/London', 'Europe/London'],
                //['Europe/Paris', 'Europe/Paris'],
                //['Europe/Berlin', 'Europe/Berlin'],
                ['Z', 'Z'],
                ['UTC', 'UTC'],
                ['UTC+01:00', 'UTC+01:00'],
                ['GMT+01:00', 'GMT+01:00'],
                ['UT+01:00', 'UT+01:00']
            ];
        }

        // @Test(dataProvider='ToString')
        it('test_toString', () => {
            dataProviderTest(data_toString, (id, expected) => {
                const test = ZoneId.of(id);
                assertEquals(test.toString(), expected);
            });
        });

    });

    function createLDT(year, month, day) {
        return LocalDateTime.of(year, month, day, 0, 0);
    }

    // eslint-disable-next-line no-unused-vars
    function checkOffset(rules, dateTime, offset, type) {
        //List<ZoneOffset> validOffsets = rules.getValidOffsets(dateTime);
        //assertEquals(validOffsets.size(), type);
        assertEquals(rules.offset(dateTime), offset);
        //if (type === 1) {
        //    assertEquals(validOffsets.get(0), offset);
        //    return null;
        //} else {
        //    const zot = rules.getTransition(dateTime);
        //    assertNotNull(zot);
        //    assertEquals(zot.isOverlap(), type == 2);
        //    assertEquals(zot.isGap(), type == 0);
        //    assertEquals(zot.isValidOffset(offset), type == 2);
        //    return zot;
        //}
    }


});

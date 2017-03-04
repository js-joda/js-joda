/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';

import '../../_init';

import {assertEquals, fail} from '../../testUtils';

import {MathUtil} from '../../../src/MathUtil';
import {DateTimeException} from '../../../src/errors';
import {LocalDate} from '../../../src/LocalDate';
import {LocalTime} from '../../../src/LocalTime';

import {ChronoField} from '../../../src/temporal/ChronoField';

import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {DateTimeParseContext} from '../../../src/format/DateTimeParseContext';
import {DateTimePrintContext} from '../../../src/format/DateTimePrintContext';
import {DecimalStyle} from '../../../src/format/DecimalStyle';
import {StringBuilder} from '../../../src/format/StringBuilder';
import {IsoChronology} from '../../../src/chrono/IsoChronology';

const FractionPrinterParser = DateTimeFormatterBuilder.FractionPrinterParser;

import {EMPTY} from '../temporal/Empty';
import {MockFieldValue} from '../temporal/MockFieldValue';

describe('org.threeten.bp.format.TestFractionPrinterParser', function () {

    let printEmptyContext, printContext;
    let buf;
    let parseContext;

    beforeEach(() => {
        init();
    });

    function init(){
        printEmptyContext = new DateTimePrintContext(new EMPTY(), null, DecimalStyle.STANDARD);
        const d = LocalDate.of(2011, 6, 30);
        printContext = new DateTimePrintContext(d, null, DecimalStyle.STANDARD);
        buf = new StringBuilder();
        parseContext = new DateTimeParseContext(null, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
    }

    // @DataProvider(name='Nanos')
    function provider_nanos() {
        return [
            [0, 9, 0, ''],
            [0, 9, 2, '.000000002'],
            [0, 9, 20, '.00000002'],
            [0, 9, 200, '.0000002'],
            [0, 9, 2000, '.000002'],
            [0, 9, 20000, '.00002'],
            [0, 9, 200000, '.0002'],
            [0, 9, 2000000, '.002'],
            [0, 9, 20000000, '.02'],
            [0, 9, 200000000, '.2'],
            [0, 9, 1, '.000000001'],
            [0, 9, 12, '.000000012'],
            [0, 9, 123, '.000000123'],
            [0, 9, 1234, '.000001234'],
            [0, 9, 12345, '.000012345'],
            [0, 9, 123456, '.000123456'],
            [0, 9, 1234567, '.001234567'],
            [0, 9, 12345678, '.012345678'],
            [0, 9, 123456789, '.123456789'],

            [1, 9, 0, '.0'],
            [1, 9, 2, '.000000002'],
            [1, 9, 20, '.00000002'],
            [1, 9, 200, '.0000002'],
            [1, 9, 2000, '.000002'],
            [1, 9, 20000, '.00002'],
            [1, 9, 200000, '.0002'],
            [1, 9, 2000000, '.002'],
            [1, 9, 20000000, '.02'],
            [1, 9, 200000000, '.2'],

            [2, 3, 0, '.00'],
            [2, 3, 2, '.000'],
            [2, 3, 20, '.000'],
            [2, 3, 200, '.000'],
            [2, 3, 2000, '.000'],
            [2, 3, 20000, '.000'],
            [2, 3, 200000, '.000'],
            [2, 3, 2000000, '.002'],
            [2, 3, 20000000, '.02'],
            [2, 3, 200000000, '.20'],
            [2, 3, 1, '.000'],
            [2, 3, 12, '.000'],
            [2, 3, 123, '.000'],
            [2, 3, 1234, '.000'],
            [2, 3, 12345, '.000'],
            [2, 3, 123456, '.000'],
            [2, 3, 1234567, '.001'],
            [2, 3, 12345678, '.012'],
            [2, 3, 123456789, '.123'],

            [6, 6, 0, '.000000'],
            [6, 6, 2, '.000000'],
            [6, 6, 20, '.000000'],
            [6, 6, 200, '.000000'],
            [6, 6, 2000, '.000002'],
            [6, 6, 20000, '.000020'],
            [6, 6, 200000, '.000200'],
            [6, 6, 2000000, '.002000'],
            [6, 6, 20000000, '.020000'],
            [6, 6, 200000000, '.200000'],
            [6, 6, 1, '.000000'],
            [6, 6, 12, '.000000'],
            [6, 6, 123, '.000000'],
            [6, 6, 1234, '.000001'],
            [6, 6, 12345, '.000012'],
            [6, 6, 123456, '.000123'],
            [6, 6, 1234567, '.001234'],
            [6, 6, 12345678, '.012345'],
            [6, 6, 123456789, '.123456'],

            // additional javascript test
            [0, 9, 9, '.000000009'],
            [0, 9, 99, '.000000099'],
            [0, 9, 999, '.000000999'],
            [0, 9, 9999, '.000009999'],
            [0, 9, 99999, '.000099999'],
            [0, 9, 999999, '.000999999'],
            [0, 9, 9999999, '.009999999'],
            [0, 9, 99999999, '.099999999'],
            [0, 9, 999999999, '.999999999'],

            [0, 9, 9, '.000000009'],
            [0, 9, 98, '.000000098'],
            [0, 9, 987, '.000000987'],
            [0, 9, 9876, '.000009876'],
            [0, 9, 98765, '.000098765'],
            [0, 9, 987654, '.000987654'],
            [0, 9, 9876543, '.009876543'],
            [0, 9, 98765432, '.098765432'],
            [0, 9, 987654321, '.987654321']
        ];
    }

    // @DataProvider(name='Seconds')
    function provider_seconds() {
        return [
            [0, 9, 0,  ''],
            [0, 9, 3,  '.05'],
            [0, 9, 6,  '.1'],
            [0, 9, 9,  '.15'],
            [0, 9, 12, '.2'],
            [0, 9, 15, '.25'],
            [0, 9, 30, '.5'],
            [0, 9, 45, '.75'],

            [2, 2, 0,  '.00'],
            [2, 2, 3,  '.05'],
            [2, 2, 6,  '.10'],
            [2, 2, 9,  '.15'],
            [2, 2, 12, '.20'],
            [2, 2, 15, '.25'],
            [2, 2, 30, '.50'],
            [2, 2, 45, '.75']
        ];
    }

    describe('print', () => {

        it('test_print_emptyCalendrical()', () => {
            expect(() => {
                const pp = new FractionPrinterParser(ChronoField.NANO_OF_SECOND, 0, 9, true);
                pp.print(printEmptyContext, buf);
            }).to.throw(DateTimeException);
        });

        it('test_print_append()', () => {
            printContext.setDateTime(LocalTime.of(12, 30, 40, 3));
            const pp = new FractionPrinterParser(ChronoField.NANO_OF_SECOND, 0, 9, true);
            buf.append('EXISTING');
            pp.print(printContext, buf);
            assertEquals(buf.toString(), 'EXISTING.000000003');
        });

        it('test_print_nanos', function () {
            provider_nanos().forEach((data) => {
                init();
                test_print_nanos.apply(this, data);
            });
        });

        // @Test(dataProvider='Nanos')
        function test_print_nanos(minWidth, maxWidth, value, result) {
            // console.log(minWidth, maxWidth, value, result);
            printContext.setDateTime(new MockFieldValue(ChronoField.NANO_OF_SECOND, value));
            const pp = new FractionPrinterParser(ChronoField.NANO_OF_SECOND, minWidth, maxWidth, true);
            pp.print(printContext, buf);
            if (result === null) {
                fail('Expected exception');
            }
            assertEquals(buf.toString(), result);
        }

        it('test_print_nanos_noDecimalPoint', function () {
            provider_nanos().forEach((data) => {
                init();
                test_print_nanos_noDecimalPoint.apply(this, data);
            });
        });

        // @Test(dataProvider='Nanos')
        function test_print_nanos_noDecimalPoint(minWidth, maxWidth, value, result){
            //console.log(minWidth, maxWidth, value, result);
            printContext.setDateTime(new MockFieldValue(ChronoField.NANO_OF_SECOND, value));
            const pp = new FractionPrinterParser(ChronoField.NANO_OF_SECOND, minWidth, maxWidth, false);
            pp.print(printContext, buf);
            if (result === null) {
                fail('Expected exception');
            }
            assertEquals(buf.toString(), (result[0] === '.' ? result.substring(1) : result));
        }

        it('test_print_seconds', function () {
            provider_seconds().forEach((data) => {
                init();
                test_print_seconds.apply(this, data);
            });
        });

        // @Test(dataProvider='Seconds')
        function test_print_seconds(minWidth, maxWidth, value, result){
            printContext.setDateTime(new MockFieldValue(ChronoField.SECOND_OF_MINUTE, value));
            const pp = new FractionPrinterParser(ChronoField.SECOND_OF_MINUTE, minWidth, maxWidth, true);
            pp.print(printContext, buf);
            if (result === null) {
                fail('Expected exception');
            }
            assertEquals(buf.toString(), result);
        }

        it('test_print_seconds_noDecimalPoint', function () {
            provider_seconds().forEach((data) => {
                init();
                test_print_seconds_noDecimalPoint.apply(this, data);
            });
        });

        // @Test(dataProvider='Seconds')
        function test_print_seconds_noDecimalPoint(minWidth, maxWidth, value, result){
            printContext.setDateTime(new MockFieldValue(ChronoField.SECOND_OF_MINUTE, value));
            const pp = new FractionPrinterParser(ChronoField.SECOND_OF_MINUTE, minWidth, maxWidth, false);
            pp.print(printContext, buf);
            if (result === null) {
                fail('Expected exception');
            }
            assertEquals(buf.toString(), (result[0] === '.' ? result.substring(1) : result));
        }

    });

    describe('parse', () => {

        it('test_reverseParse', function () {
            provider_nanos().forEach((data) => {
                init();
                test_reverseParse.apply(this, data);
            });
        });

        // @Test(dataProvider='Nanos')
        function test_reverseParse(minWidth, maxWidth, value, result){
            //console.log(minWidth, maxWidth, value, result);
            const pp = new FractionPrinterParser(ChronoField.NANO_OF_SECOND, minWidth, maxWidth, true);
            const newPos = pp.parse(parseContext, result, 0);
            assertEquals(newPos, result.length);
            const expectedValue = fixParsedValue(maxWidth, value);
            assertParsed(parseContext, ChronoField.NANO_OF_SECOND, value === 0 && minWidth === 0 ? null : expectedValue);
        }

        it('test_reverseParse_noDecimalPoint', function () {
            provider_nanos().forEach((data) => {
                init();
                test_reverseParse_noDecimalPoint.apply(this, data);
            });
        });

        // @Test(dataProvider='Nanos')
        function test_reverseParse_noDecimalPoint(minWidth, maxWidth, value, result){
            const pp = new FractionPrinterParser(ChronoField.NANO_OF_SECOND, minWidth, maxWidth, false);
            const newPos = pp.parse(parseContext, result, (result[0] === '.' ? 1 : 0));
            assertEquals(newPos, result.length);
            const expectedValue = fixParsedValue(maxWidth, value);
            assertParsed(parseContext, ChronoField.NANO_OF_SECOND, value === 0 && minWidth === 0 ? null : expectedValue);
        }

        it('test_reverseParse_followedByNonDigit', function () {
            provider_nanos().forEach((data) => {
                init();
                test_reverseParse_followedByNonDigit.apply(this, data);
            });
        });

        // @Test(dataProvider='Nanos')
        function test_reverseParse_followedByNonDigit(minWidth, maxWidth, value, result){
            const pp = new FractionPrinterParser(ChronoField.NANO_OF_SECOND, minWidth, maxWidth, true);
            const newPos = pp.parse(parseContext, result + ' ', 0);
            assertEquals(newPos, result.length);
            const expectedValue = fixParsedValue(maxWidth, value);
            assertParsed(parseContext, ChronoField.NANO_OF_SECOND, value === 0 && minWidth === 0 ? null : expectedValue);
        }


        //it('test_reverseParse_followedByNonDigit_noDecimalPoint', function () {
        //    provider_nanos().forEach((data) => {
        //        init();
        //        test_reverseParse_followedByNonDigit_noDecimalPoint.apply(this, data);
        //    });
        //});
        //
        //// @Test(dataProvider='Nanos')
        //function test_reverseParse_followedByNonDigit_noDecimalPoint(minWidth, maxWidth, value, result){
        //    const pp = new FractionPrinterParser(ChronoField.NANO_OF_SECOND, minWidth, maxWidth, false);
        //    const newPos = pp.parse(parseContext, result + ' ', (result[0] === '.' ? 1 : 0));
        //    assertEquals(newPos, result.length);
        //    const expectedValue = fixParsedValue(maxWidth, value);
        //    assertParsed(parseContext, ChronoField.NANO_OF_SECOND, value === 0 && minWidth === 0 ? null : expectedValue);
        //}

        it('test_reverseParse_preceededByNonDigit', function () {
            provider_nanos().forEach((data) => {
                init();
                test_reverseParse_preceededByNonDigit.apply(this, data);
            });
        });

        // @Test(dataProvider='Nanos')
        function test_reverseParse_preceededByNonDigit(minWidth, maxWidth, value, result){
            const pp = new FractionPrinterParser(ChronoField.NANO_OF_SECOND, minWidth, maxWidth, true);
            const newPos = pp.parse(parseContext, ' ' + result, 1);
            assertEquals(newPos, result.length + 1);
            const expectedValue = fixParsedValue(maxWidth, value);
            assertParsed(parseContext, ChronoField.NANO_OF_SECOND, value === 0 && minWidth === 0 ? null :  expectedValue);
        }

        it('test_reverseParse_seconds', function () {
            provider_seconds().forEach((data) => {
                init();
                test_reverseParse_seconds.apply(this, data);
            });
        });

        // @Test(dataProvider='Seconds')
        function test_reverseParse_seconds(minWidth, maxWidth, value, result){
            const pp = new FractionPrinterParser(ChronoField.SECOND_OF_MINUTE, minWidth, maxWidth, true);
            const newPos = pp.parse(parseContext, result, 0);
            assertEquals(newPos, result.length);
            assertParsed(parseContext, ChronoField.SECOND_OF_MINUTE, value === 0 && minWidth === 0 ? null : value);
        }

        // @DataProvider(name='ParseNothing')
        function provider_parseNothing() {
            return [
                [new FractionPrinterParser(ChronoField.NANO_OF_SECOND, 3, 6, true), '', 0, ~0],
                [new FractionPrinterParser(ChronoField.NANO_OF_SECOND, 3, 6, true), 'A', 0, ~0],
                [new FractionPrinterParser(ChronoField.NANO_OF_SECOND, 3, 6, true), '.', 0, ~1],
                [new FractionPrinterParser(ChronoField.NANO_OF_SECOND, 3, 6, true), '.5', 0, ~1],
                [new FractionPrinterParser(ChronoField.NANO_OF_SECOND, 3, 6, true), '.51', 0, ~1],
                [new FractionPrinterParser(ChronoField.NANO_OF_SECOND, 3, 6, true), '.A23456', 0, ~1],
                [new FractionPrinterParser(ChronoField.NANO_OF_SECOND, 3, 6, true), '.1A3456', 0, ~1]
            ];
        }

        it('test_parse_nothing', function () {
            provider_parseNothing().forEach((data) => {
                init();
                test_parse_nothing.apply(this, data);
            });
        });

    });

    // @Test(dataProvider = 'ParseNothing')
    function test_parse_nothing(pp, text, pos, expected) {
        const newPos = pp.parse(parseContext, text, pos);
        assertEquals(newPos, expected);
        assertEquals(parseContext.getParsed(ChronoField.NANO_OF_SECOND), null);
    }

    describe('toString()', function () {

        it('test_toString()', () => {
            const pp = new FractionPrinterParser(ChronoField.NANO_OF_SECOND, 3, 6, true);
            assertEquals(pp.toString(), 'Fraction(NanoOfSecond,3,6,DecimalPoint)');
        });

        it('test_toString_noDecimalPoint()', () => {
            const pp = new FractionPrinterParser(ChronoField.NANO_OF_SECOND, 3, 6, false);
            assertEquals(pp.toString(), 'Fraction(NanoOfSecond,3,6)');
        });

    });

    function fixParsedValue(maxWidth, value) {
        if (maxWidth < 9) {
            const power = Math.pow(10, (9 - maxWidth));
            value = MathUtil.intDiv(value, power) * power;
        }
        return value;
    }

    function assertParsed(context, temporalField, value) {
        if (value === null) {
            assertEquals(context.getParsed(temporalField), null);
        } else {
            assertEquals(context.getParsed(temporalField), value);
        }
    }

});


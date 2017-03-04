/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals, fail} from '../../testUtils';

import '../../_init';

import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {DateTimePrintContext} from '../../../src/format/DateTimePrintContext';
import {DecimalStyle} from '../../../src/format/DecimalStyle';
import {SignStyle} from '../../../src/format/SignStyle';
import {StringBuilder} from '../../../src/format/StringBuilder';
import {ChronoField} from '../../../src/temporal/ChronoField';
import {DateTimeException} from '../../../src/errors';
import {LocalDate} from '../../../src/LocalDate';

const NumberPrinterParser = DateTimeFormatterBuilder.NumberPrinterParser;
const DAY_OF_MONTH = ChronoField.DAY_OF_MONTH;
const HOUR_OF_DAY = ChronoField.HOUR_OF_DAY;

import {MockFieldValue} from '../temporal/MockFieldValue';
import {EMPTY} from '../temporal/Empty';

describe('org.threeten.bp.format.TestNumberPrinter', () => {
    let printEmptyContext, printContext;
    let buf;

    beforeEach(() => {
        init();
    });

    function init(){
        printEmptyContext = new DateTimePrintContext(new EMPTY(), null, DecimalStyle.STANDARD);
        const d = LocalDate.of(2011, 6, 30);
        printContext = new DateTimePrintContext(d, null, DecimalStyle.STANDARD);
        buf = new StringBuilder();
    }

    it('test_print_emptyCalendrical', () => {
        const pp = new NumberPrinterParser(DAY_OF_MONTH, 1, 2, SignStyle.NEVER);
        expect(() => {
            pp.print(printEmptyContext, buf);
        }).to.throw(DateTimeException);

    });

    it('test_print_append', () => {
        printContext.setDateTime(LocalDate.of(2012, 1, 3));
        const pp = new NumberPrinterParser(DAY_OF_MONTH, 1, 2, SignStyle.NEVER);
        buf.append('EXISTING');
        pp.print(printContext, buf);
        assertEquals(buf.toString(), 'EXISTING3');
    });

    describe('test_Pad', () => {
        const provider_pad = [
            [1, 1, -10, null],
            [1, 1, -9, '9'],
            [1, 1, -1, '1'],
            [1, 1, 0, '0'],
            [1, 1, 3, '3'],
            [1, 1, 9, '9'],
            [1, 1, 10, null],

            [1, 2, -100, null],
            [1, 2, -99, '99'],
            [1, 2, -10, '10'],
            [1, 2, -9, '9'],
            [1, 2, -1, '1'],
            [1, 2, 0, '0'],
            [1, 2, 3, '3'],
            [1, 2, 9, '9'],
            [1, 2, 10, '10'],
            [1, 2, 99, '99'],
            [1, 2, 100, null],

            [2, 2, -100, null],
            [2, 2, -99, '99'],
            [2, 2, -10, '10'],
            [2, 2, -9, '09'],
            [2, 2, -1, '01'],
            [2, 2, 0, '00'],
            [2, 2, 3, '03'],
            [2, 2, 9, '09'],
            [2, 2, 10, '10'],
            [2, 2, 99, '99'],
            [2, 2, 100, null],

            [1, 3, -1000, null],
            [1, 3, -999, '999'],
            [1, 3, -100, '100'],
            [1, 3, -99, '99'],
            [1, 3, -10, '10'],
            [1, 3, -9, '9'],
            [1, 3, -1, '1'],
            [1, 3, 0, '0'],
            [1, 3, 3, '3'],
            [1, 3, 9, '9'],
            [1, 3, 10, '10'],
            [1, 3, 99, '99'],
            [1, 3, 100, '100'],
            [1, 3, 999, '999'],
            [1, 3, 1000, null],

            [2, 3, -1000, null],
            [2, 3, -999, '999'],
            [2, 3, -100, '100'],
            [2, 3, -99, '99'],
            [2, 3, -10, '10'],
            [2, 3, -9, '09'],
            [2, 3, -1, '01'],
            [2, 3, 0, '00'],
            [2, 3, 3, '03'],
            [2, 3, 9, '09'],
            [2, 3, 10, '10'],
            [2, 3, 99, '99'],
            [2, 3, 100, '100'],
            [2, 3, 999, '999'],
            [2, 3, 1000, null],

            [3, 3, -1000, null],
            [3, 3, -999, '999'],
            [3, 3, -100, '100'],
            [3, 3, -99, '099'],
            [3, 3, -10, '010'],
            [3, 3, -9, '009'],
            [3, 3, -1, '001'],
            [3, 3, 0, '000'],
            [3, 3, 3, '003'],
            [3, 3, 9, '009'],
            [3, 3, 10, '010'],
            [3, 3, 99, '099'],
            [3, 3, 100, '100'],
            [3, 3, 999, '999'],
            [3, 3, 1000, null],

            [1, 10, 2147483647 - 1, '2147483646'],
            [1, 10, 2147483647, '2147483647'],
            [1, 10, -2147483648 + 1, '2147483647'],
            [1, 10, -2147483648, '2147483648']
        ];

        it('test_pad_NOT_NEGATIVE', () => {
            for(let i=0; i < provider_pad.length; i++){
                init();
                test_pad_NOT_NEGATIVE.apply(this, provider_pad[i]);
            }
        });

        function test_pad_NOT_NEGATIVE(minPad, maxPad, value, result){
            // console.log(minPad, maxPad, value, result);
            printContext.setDateTime(new MockFieldValue(DAY_OF_MONTH, value));
            const pp = new NumberPrinterParser(DAY_OF_MONTH, minPad, maxPad, SignStyle.NOT_NEGATIVE);
            try {
                pp.print(printContext, buf);
                if (result == null || value < 0) {
                    fail('Expected exception catched unexpected');
                }
                assertEquals(buf.toString(), result);
            } catch (ex) {
                if ((ex instanceof DateTimeException) && (result == null || value < 0)) {
                    expect(ex.message).to.contain(DAY_OF_MONTH.toString());
                } else {
                    throw ex;
                }
            }
        }

        it('test_pad_NEVER', () => {
            for(let i=0; i < provider_pad.length; i++){
                init();
                test_pad_NEVER.apply(this, provider_pad[i]);
            }
        });

        function test_pad_NEVER(minPad, maxPad, value, result) {
            // console.log(minPad, maxPad, value, result);
            printContext.setDateTime(new MockFieldValue(DAY_OF_MONTH, value));
            const pp = new NumberPrinterParser(DAY_OF_MONTH, minPad, maxPad, SignStyle.NEVER);
            try {
                pp.print(printContext, buf);
                if (result == null) {
                    fail('Expected exception');
                }
                assertEquals(buf.toString(), result);
            } catch (ex) {
                if(!(ex instanceof DateTimeException)){
                    throw ex;
                }
                if (result != null) {
                    throw ex;
                }
                expect(ex.message).to.contain(DAY_OF_MONTH.toString());
            }
        }

        it('test_pad_NORMAL', () => {
            for(let i=0; i < provider_pad.length; i++){
                init();
                test_pad_NORMAL.apply(this, provider_pad[i]);
            }
        });

        function test_pad_NORMAL(minPad, maxPad, value,  result){
            // console.log(minPad, maxPad, value, result);
            printContext.setDateTime(new MockFieldValue(DAY_OF_MONTH, value));
            const pp = new NumberPrinterParser(DAY_OF_MONTH, minPad, maxPad, SignStyle.NORMAL);
            try {
                pp.print(printContext, buf);
                if (result == null) {
                    fail('Expected exception');
                }
                assertEquals(buf.toString(), (value < 0 ? '-' + result : result));
            } catch (ex) {
                if(!(ex instanceof DateTimeException)){
                    throw ex;
                }
                if (result != null) {
                    throw ex;
                }
                expect(ex.message).to.contain(DAY_OF_MONTH.toString());
            }
        }

        it('test_pad_ALWAYS', () => {
            for(let i=0; i < provider_pad.length; i++){
                init();
                test_pad_ALWAYS.apply(this, provider_pad[i]);
            }
        });

        function test_pad_ALWAYS(minPad, maxPad, value,  result){
            // console.log(minPad, maxPad, value, result);
            printContext.setDateTime(new MockFieldValue(DAY_OF_MONTH, value));
            const pp = new NumberPrinterParser(DAY_OF_MONTH, minPad, maxPad, SignStyle.ALWAYS);
            try {
                pp.print(printContext, buf);
                if (result == null) {
                    fail('Expected exception');
                }
                assertEquals(buf.toString(), (value < 0 ? '-' + result : '+' + result));
            } catch (ex) {
                if(!(ex instanceof DateTimeException)){
                    throw ex;
                }
                if (result != null) {
                    throw ex;
                }
                expect(ex.message).to.contain(DAY_OF_MONTH.toString());
            }
        }

        it('test_pad_EXCEEDS_PAD', () => {
            for(let i=0; i < provider_pad.length; i++){
                init();
                test_pad_EXCEEDS_PAD.apply(this, provider_pad[i]);
            }
        });

        function test_pad_EXCEEDS_PAD(minPad, maxPad, value,  result){
            // console.log(minPad, maxPad, value, result);
            printContext.setDateTime(new MockFieldValue(DAY_OF_MONTH, value));
            const pp = new NumberPrinterParser(DAY_OF_MONTH, minPad, maxPad, SignStyle.EXCEEDS_PAD);
            try {
                pp.print(printContext, buf);
                if (result == null) {
                    fail('Expected exception');
                }
                if (result.length > minPad || value < 0) {
                    result = (value < 0 ? '-' + result : '+' + result);
                }
                assertEquals(buf.toString(), result);
            } catch (ex) {
                if(!(ex instanceof DateTimeException)){
                    throw ex;
                }
                if (result != null) {
                    throw ex;
                }
                expect(ex.message).to.contain(DAY_OF_MONTH.toString());
            }
        }
    });

    it('test_toString1', () => {
        const pp = new NumberPrinterParser(HOUR_OF_DAY, 1, 15, SignStyle.NORMAL);
        assertEquals(pp.toString(), 'Value(HourOfDay)');
    });

    it('test_toString2', () => {
        const pp = new NumberPrinterParser(HOUR_OF_DAY, 2, 2, SignStyle.NOT_NEGATIVE);
        assertEquals(pp.toString(), 'Value(HourOfDay,2)');
    });

    it('test_toString3', () => {
        const pp = new NumberPrinterParser(HOUR_OF_DAY, 1, 2, SignStyle.NOT_NEGATIVE);
        assertEquals(pp.toString(), 'Value(HourOfDay,1,2,NOT_NEGATIVE)');
    });
});


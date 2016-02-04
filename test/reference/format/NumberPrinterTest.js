/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals} from '../../testUtils';

import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {DateTimePrintContext} from '../../../src/format/DateTimePrintContext';
import {DecimalStyle} from '../../../src/format/DecimalStyle';
import {SignStyle} from '../../../src/format/SignStyle';
import {ChronoField} from '../../../src/temporal/ChronoField';
import {TemporalAccessor} from '../../../src/temporal/TemporalAccessor';
import {DateTimeException} from '../../../src/errors';
import {LocalDate} from '../../../src/LocalDate';

const NumberPrinterParser = DateTimeFormatterBuilder.NumberPrinterParser;
const StringBuilder = DateTimeFormatterBuilder.StringBuilder;
const DAY_OF_MONTH = ChronoField.DAY_OF_MONTH;

import {MockFieldValue} from '../temporal/MockFieldValue';

class EMPTY extends TemporalAccessor{
    isSupported() {
        return true;
    }

    getLong() {
        throw new DateTimeException('Mock');
    }
}

describe('org.threeten.bp.format.TestNumberPrinter', () => {
    var printEmptyContext, printContext;
    var buf;

    beforeEach(() => {
        init();
    });

    function init(){
        printEmptyContext = new DateTimePrintContext(new EMPTY(), null, DecimalStyle.STANDARD);
        var d = LocalDate.of(2011, 6, 30);
        printContext = new DateTimePrintContext(d, null, DecimalStyle.STANDARD);
        buf = new StringBuilder();
    }

    it('test_print_emptyCalendrical', () => {
        var pp = new NumberPrinterParser(DAY_OF_MONTH, 1, 2, SignStyle.NEVER);
        expect(() => {
            pp.print(printEmptyContext, buf);
        }).to.throw(DateTimeException);

    });

    it('test_print_append', () => {
        printContext.setDateTime(LocalDate.of(2012, 1, 3));
        var pp = new NumberPrinterParser(DAY_OF_MONTH, 1, 2, SignStyle.NEVER);
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
            var pp = new NumberPrinterParser(DAY_OF_MONTH, minPad, maxPad, SignStyle.NOT_NEGATIVE);
            try {
                pp.print(printContext, buf);
                if (result == null || value < 0) {
                    expect(false, 'Expected exception catched unexpected').to.be.true;
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
    });
    
    it('', () => {

    });

    it('', () => {

    });
});

/**
 @Test
 public class TestNumberPrinter extends AbstractTestPrinterParser {

     //-----------------------------------------------------------------------


     @Test(dataProvider="Pad")
     public void test_pad_NOT_NEGATIVE(int minPad, int maxPad, long value, String result) throws Exception {
         printContext.setDateTime(new MockFieldValue(DAY_OF_MONTH, value));
         NumberPrinterParser pp = new NumberPrinterParser(DAY_OF_MONTH, minPad, maxPad, SignStyle.NOT_NEGATIVE);
         try {
             pp.print(printContext, buf);
             if (result == null || value < 0) {
                 fail("Expected exception");
             }
             assertEquals(buf.toString(), result);
         } catch (DateTimeException ex) {
             if (result == null || value < 0) {
                 assertEquals(ex.getMessage().contains(DAY_OF_MONTH.toString()), true);
             } else {
                 throw ex;
             }
         }
     }

     @Test(dataProvider="Pad")
     public void test_pad_NEVER(int minPad, int maxPad, long value, String result) throws Exception {
         printContext.setDateTime(new MockFieldValue(DAY_OF_MONTH, value));
         NumberPrinterParser pp = new NumberPrinterParser(DAY_OF_MONTH, minPad, maxPad, SignStyle.NEVER);
         try {
             pp.print(printContext, buf);
             if (result == null) {
                 fail("Expected exception");
             }
             assertEquals(buf.toString(), result);
         } catch (DateTimeException ex) {
             if (result != null) {
                 throw ex;
             }
             assertEquals(ex.getMessage().contains(DAY_OF_MONTH.toString()), true);
         }
     }

     @Test(dataProvider="Pad")
     public void test_pad_NORMAL(int minPad, int maxPad, long value, String result) throws Exception {
         printContext.setDateTime(new MockFieldValue(DAY_OF_MONTH, value));
         NumberPrinterParser pp = new NumberPrinterParser(DAY_OF_MONTH, minPad, maxPad, SignStyle.NORMAL);
         try {
             pp.print(printContext, buf);
             if (result == null) {
                 fail("Expected exception");
             }
             assertEquals(buf.toString(), (value < 0 ? "-" + result : result));
         } catch (DateTimeException ex) {
             if (result != null) {
                 throw ex;
             }
             assertEquals(ex.getMessage().contains(DAY_OF_MONTH.toString()), true);
         }
     }

     @Test(dataProvider="Pad")
     public void test_pad_ALWAYS(int minPad, int maxPad, long value, String result) throws Exception {
         printContext.setDateTime(new MockFieldValue(DAY_OF_MONTH, value));
         NumberPrinterParser pp = new NumberPrinterParser(DAY_OF_MONTH, minPad, maxPad, SignStyle.ALWAYS);
         try {
             pp.print(printContext, buf);
             if (result == null) {
                 fail("Expected exception");
             }
             assertEquals(buf.toString(), (value < 0 ? "-" + result : "+" + result));
         } catch (DateTimeException ex) {
             if (result != null) {
                 throw ex;
             }
             assertEquals(ex.getMessage().contains(DAY_OF_MONTH.toString()), true);
         }
     }

     @Test(dataProvider="Pad")
     public void test_pad_EXCEEDS_PAD(int minPad, int maxPad, long value, String result) throws Exception {
         printContext.setDateTime(new MockFieldValue(DAY_OF_MONTH, value));
         NumberPrinterParser pp = new NumberPrinterParser(DAY_OF_MONTH, minPad, maxPad, SignStyle.EXCEEDS_PAD);
         try {
             pp.print(printContext, buf);
             if (result == null) {
                 fail("Expected exception");
                 return;  // unreachable
             }
             if (result.length() > minPad || value < 0) {
                 result = (value < 0 ? "-" + result : "+" + result);
             }
             assertEquals(buf.toString(), result);
         } catch (DateTimeException ex) {
             if (result != null) {
                 throw ex;
             }
             assertEquals(ex.getMessage().contains(DAY_OF_MONTH.toString()), true);
         }
     }

     //-----------------------------------------------------------------------
     public void test_toString1() throws Exception {
         NumberPrinterParser pp = new NumberPrinterParser(HOUR_OF_DAY, 1, 19, SignStyle.NORMAL);
         assertEquals(pp.toString(), "Value(HourOfDay)");
     }

     public void test_toString2() throws Exception {
         NumberPrinterParser pp = new NumberPrinterParser(HOUR_OF_DAY, 2, 2, SignStyle.NOT_NEGATIVE);
         assertEquals(pp.toString(), "Value(HourOfDay,2)");
     }

     public void test_toString3() throws Exception {
         NumberPrinterParser pp = new NumberPrinterParser(HOUR_OF_DAY, 1, 2, SignStyle.NOT_NEGATIVE);
         assertEquals(pp.toString(), "Value(HourOfDay,1,2,NOT_NEGATIVE)");
     }

 }
*/
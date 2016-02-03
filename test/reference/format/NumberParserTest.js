/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {expect} from 'chai';

import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {DateTimeParseContext} from '../../../src/format/DateTimeParseContext';
import {DecimalStyle} from '../../../src/format/DecimalStyle';
import {SignStyle} from '../../../src/format/SignStyle';
import {ChronoField} from '../../../src/temporal/ChronoField';
import {TemporalQueries} from '../../../src/temporal/TemporalQueries';
import {IsoChronology} from '../../../src/chrono/IsoChronology';

import {assertEquals} from '../../testUtils';

const NumberPrinterParser = DateTimeFormatterBuilder.NumberPrinterParser;
const DAY_OF_MONTH = ChronoField.DAY_OF_MONTH;

describe('org.threeten.bp.TestNumberParser', () => {
    describe('parseError', () => {
        it('test_parse_error', () => {
            var dataProviderErrorData = [
                [new NumberPrinterParser(DAY_OF_MONTH, 1, 2, SignStyle.NEVER), '12', -1, Error],
                [new NumberPrinterParser(DAY_OF_MONTH, 1, 2, SignStyle.NEVER), '12', 3, Error]
            ];
            for(var i=0; i < dataProviderErrorData.length; i++){
                test_parse_error.apply(this, dataProviderErrorData[i]);
            }
        });

        function test_parse_error(pp, text, pos, expectedError){
            // console.log(pp, text, pos, expectedError);
            var parseContext = new DateTimeParseContext(null, DecimalStyle.STANDARD, IsoChronology.INSTANCE);

            expect(() => {
                pp.parse(parseContext, text, pos);
            }).to.throw(expectedError);

            assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
            assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
        }
    });
    describe('parseData', () => {
        var dataProviderParseData;
        beforeEach(() => {
            dataProviderParseData = [
                // normal
                [1, 2, SignStyle.NEVER, 0, '12', 0, 2, 12],       // normal
                [1, 2, SignStyle.NEVER, 0, 'Xxx12Xxx', 3, 5, 12], // parse in middle
                [1, 2, SignStyle.NEVER, 0, '99912999', 3, 5, 12], // parse in middle
                [2, 4, SignStyle.NEVER, 0, '12345', 0, 4, 1234],  // stops at max width
                [2, 4, SignStyle.NEVER, 0, '12-45', 0, 2, 12],    // stops at dash
                [2, 4, SignStyle.NEVER, 0, '123-5', 0, 3, 123],   // stops at dash
                [1, 10, SignStyle.NORMAL, 0, '2147483647', 0, 10, 2147483647],
                [1, 10, SignStyle.NORMAL, 0, '-2147483648', 0, 11, -2147483648],
                [1, 10, SignStyle.NORMAL, 0, '987659876598765', 0, 10, 9876598765],
                [1, 15, SignStyle.NORMAL, 0, '123456789012345678901234567890', 0, 15, 123456789012345],
                // no match
                [1, 2, SignStyle.NEVER, 1, 'A1', 0, ~0, 0],
                [1, 2, SignStyle.NEVER, 1, ' 1', 0, ~0, 0],
                [1, 2, SignStyle.NEVER, 1, '  1', 1, ~1, 0],
                [2, 2, SignStyle.NEVER, 1, '1', 0, ~0, 0],
                [2, 2, SignStyle.NEVER, 1, 'Xxx1', 0, ~0, 0],
                [2, 2, SignStyle.NEVER, 1, '1', 1, ~1, 0],
                [2, 2, SignStyle.NEVER, 1, 'Xxx1', 4, ~4, 0],
                [2, 2, SignStyle.NEVER, 1, '1-2', 0, ~0, 0],
                [1, 15, SignStyle.NORMAL, 0, '-00000000000000', 0, ~0, 0],
                [1, 15, SignStyle.NORMAL, 0, '-000000000000000', 0, ~0, 0],
                // parse reserving space 2 (adjacent-parsing)
                [1, 1, SignStyle.NEVER, 2, '123', 0, 1, 1],
                [1, 15, SignStyle.NEVER, 2, '123', 0, 1, 1],
                [1, 15, SignStyle.NEVER, 2, '12345', 0, 3, 123],
                [1, 15, SignStyle.NEVER, 2, '12345678901', 0, 9, 123456789],
                [1, 13, SignStyle.NEVER, 2, '123456789012345678901234567890', 0, 13, 1234567890123],
                [1, 15, SignStyle.NEVER, 2, '1', 0, 1, 1],  // error from next field
                [1, 15, SignStyle.NEVER, 2, '12', 0, 1, 1],  // error from next field
                [2, 2, SignStyle.NEVER, 2, '12', 0, 2, 12],  // error from next field
                [2, 15, SignStyle.NEVER, 2, '1', 0, ~0, 0],
                [2, 15, SignStyle.NEVER, 2, '1AAAAABBBBBCCCCC', 0, ~0, 0]
            ];
        });

        it('test_parse_fresh', () => {
            for(var i=0; i < dataProviderParseData.length; i++){
                var parseData = dataProviderParseData[i];
                test_parse_fresh.apply(this, parseData);
            }
        });

        function test_parse_fresh(minWidth, maxWidth, signStyle, subsequentWidth, text, pos, expectedPos, expectedValue) {
            // console.log(minWidth, maxWidth, signStyle, subsequentWidth, text, pos, expectedPos, expectedValue);
            var parseContext = new DateTimeParseContext(null, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
            var pp = new NumberPrinterParser(DAY_OF_MONTH, minWidth, maxWidth, signStyle);
            if (subsequentWidth > 0) {
                pp = pp.withSubsequentWidth(subsequentWidth);
            }
            var newPos = pp.parse(parseContext, text, pos);
            assertEquals(newPos, expectedPos);
            if (expectedPos > 0) {
                assertParsed(parseContext, DAY_OF_MONTH, expectedValue);
            } else {
                assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
                assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
            }
        }
    });

    function assertParsed(context, temporalField, value) {
        if (value == null) {
            assertEquals(context.getParsed(temporalField), null);
        } else {
            assertEquals(context.getParsed(temporalField), value);
        }
    }

});

/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {expect} from 'chai';

import '../../_init';

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
const DAY_OF_WEEK = ChronoField.DAY_OF_WEEK;

describe('org.threeten.bp.TestNumberParser', () => {
    let parseContext;

    beforeEach(() => {
        init();
    });

    function init(){
        parseContext = new DateTimeParseContext(null, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
    }

    describe('parseError', () => {
        it('test_parse_error', () => {
            const dataProviderErrorData = [
                [new NumberPrinterParser(DAY_OF_MONTH, 1, 2, SignStyle.NEVER), '12', -1, Error],
                [new NumberPrinterParser(DAY_OF_MONTH, 1, 2, SignStyle.NEVER), '12', 3, Error]
            ];
            for(let i=0; i < dataProviderErrorData.length; i++){
                init();
                test_parse_error.apply(this, dataProviderErrorData[i]);
            }
        });

        function test_parse_error(pp, text, pos, expectedError){
            // console.log(pp, text, pos, expectedError);
            expect(() => {
                pp.parse(parseContext, text, pos);
            }).to.throw(expectedError);

            assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
            assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
        }
    });

    describe('parseData', () => {
        let dataProviderParseData;
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
                // parse reserving space 1 (adjacent-parsing)
                [1, 1, SignStyle.NEVER, 1, '12', 0, 1, 1],
                [1, 15, SignStyle.NEVER, 1, '12', 0, 1, 1],
                [1, 15, SignStyle.NEVER, 1, '12345', 0, 4, 1234],
                [1, 15, SignStyle.NEVER, 1, '12345678901', 0, 10, 1234567890],
                [1, 14, SignStyle.NEVER, 1, '123456789012345678901234567890', 0, 14, 12345678901234],
                [1, 15, SignStyle.NEVER, 1, '1', 0, 1, 1],  // error from next field
                [2, 2, SignStyle.NEVER, 1, '12', 0, 2, 12],  // error from next field
                [2, 15, SignStyle.NEVER, 1, '1', 0, ~0, 0],
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
            for(let i=0; i < dataProviderParseData.length; i++){
                init();
                test_parse_fresh.apply(this, dataProviderParseData[i]);
            }
        });

        function test_parse_fresh(minWidth, maxWidth, signStyle, subsequentWidth, text, pos, expectedPos, expectedValue) {
            // console.log(minWidth, maxWidth, signStyle, subsequentWidth, text, pos, expectedPos, expectedValue);
            let pp = new NumberPrinterParser(DAY_OF_MONTH, minWidth, maxWidth, signStyle);
            if (subsequentWidth > 0) {
                pp = pp.withSubsequentWidth(subsequentWidth);
            }
            const newPos = pp.parse(parseContext, text, pos);
            assertEquals(newPos, expectedPos);
            if (expectedPos > 0) {
                assertParsed(parseContext, DAY_OF_MONTH, expectedValue);
            } else {
                assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
                assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
            }
        }

        it('test_parse_textField', () => {
            for(let i=0; i < dataProviderParseData.length; i++){
                init();
                test_parse_textField.apply(this, dataProviderParseData[i]);
            }
        });

        function test_parse_textField(minWidth, maxWidth, signStyle, subsequentWidth, text, pos, expectedPos, expectedValue){
            // console.log(minWidth, maxWidth, signStyle, subsequentWidth, text, pos, expectedPos, expectedValue);
            let pp = new NumberPrinterParser(DAY_OF_WEEK, minWidth, maxWidth, signStyle);
            if (subsequentWidth > 0) {
                pp = pp.withSubsequentWidth(subsequentWidth);
            }
            const newPos = pp.parse(parseContext, text, pos);
            assertEquals(newPos, expectedPos);
            if (expectedPos > 0) {
                assertParsed(parseContext, DAY_OF_WEEK, expectedValue);
            }
        }

    });

    describe('parseSignsStrict', () => {
        const provider_parseSignsStrict = [
            // basics
            ['0', 1, 2, SignStyle.NEVER, 1, 0],
            ['1', 1, 2, SignStyle.NEVER, 1, 1],
            ['2', 1, 2, SignStyle.NEVER, 1, 2],
            ['3', 1, 2, SignStyle.NEVER, 1, 3],
            ['4', 1, 2, SignStyle.NEVER, 1, 4],
            ['5', 1, 2, SignStyle.NEVER, 1, 5],
            ['6', 1, 2, SignStyle.NEVER, 1, 6],
            ['7', 1, 2, SignStyle.NEVER, 1, 7],
            ['8', 1, 2, SignStyle.NEVER, 1, 8],
            ['9', 1, 2, SignStyle.NEVER, 1, 9],
            ['10', 1, 2, SignStyle.NEVER, 2, 10],
            ['100', 1, 2, SignStyle.NEVER, 2, 10],
            ['100', 1, 3, SignStyle.NEVER, 3, 100],

            // never
            ['0', 1, 2, SignStyle.NEVER, 1, 0],
            ['5', 1, 2, SignStyle.NEVER, 1, 5],
            ['50', 1, 2, SignStyle.NEVER, 2, 50],
            ['500', 1, 2, SignStyle.NEVER, 2, 50],
            ['-0', 1, 2, SignStyle.NEVER, ~0, null],
            ['-5', 1, 2, SignStyle.NEVER, ~0, null],
            ['-50', 1, 2, SignStyle.NEVER, ~0, null],
            ['-500', 1, 2, SignStyle.NEVER, ~0, null],
            ['-AAA', 1, 2, SignStyle.NEVER, ~0, null],
            ['+0', 1, 2, SignStyle.NEVER, ~0, null],
            ['+5', 1, 2, SignStyle.NEVER, ~0, null],
            ['+50', 1, 2, SignStyle.NEVER, ~0, null],
            ['+500', 1, 2, SignStyle.NEVER, ~0, null],
            ['+AAA', 1, 2, SignStyle.NEVER, ~0, null],

            // not negative
            ['0', 1, 2, SignStyle.NOT_NEGATIVE, 1, 0],
            ['5', 1, 2, SignStyle.NOT_NEGATIVE, 1, 5],
            ['50', 1, 2, SignStyle.NOT_NEGATIVE, 2, 50],
            ['500', 1, 2, SignStyle.NOT_NEGATIVE, 2, 50],
            ['-0', 1, 2, SignStyle.NOT_NEGATIVE, ~0, null],
            ['-5', 1, 2, SignStyle.NOT_NEGATIVE, ~0, null],
            ['-50', 1, 2, SignStyle.NOT_NEGATIVE, ~0, null],
            ['-500', 1, 2, SignStyle.NOT_NEGATIVE, ~0, null],
            ['-AAA', 1, 2, SignStyle.NOT_NEGATIVE, ~0, null],
            ['+0', 1, 2, SignStyle.NOT_NEGATIVE, ~0, null],
            ['+5', 1, 2, SignStyle.NOT_NEGATIVE, ~0, null],
            ['+50', 1, 2, SignStyle.NOT_NEGATIVE, ~0, null],
            ['+500', 1, 2, SignStyle.NOT_NEGATIVE, ~0, null],
            ['+AAA', 1, 2, SignStyle.NOT_NEGATIVE, ~0, null],

            // normal
            ['0', 1, 2, SignStyle.NORMAL, 1, 0],
            ['5', 1, 2, SignStyle.NORMAL, 1, 5],
            ['50', 1, 2, SignStyle.NORMAL, 2, 50],
            ['500', 1, 2, SignStyle.NORMAL, 2, 50],
            ['-0', 1, 2, SignStyle.NORMAL, ~0, null],
            ['-5', 1, 2, SignStyle.NORMAL, 2, -5],
            ['-50', 1, 2, SignStyle.NORMAL, 3, -50],
            ['-500', 1, 2, SignStyle.NORMAL, 3, -50],
            ['-AAA', 1, 2, SignStyle.NORMAL, ~1, null],
            ['+0', 1, 2, SignStyle.NORMAL, ~0, null],
            ['+5', 1, 2, SignStyle.NORMAL, ~0, null],
            ['+50', 1, 2, SignStyle.NORMAL, ~0, null],
            ['+500', 1, 2, SignStyle.NORMAL, ~0, null],
            ['+AAA', 1, 2, SignStyle.NORMAL, ~0, null],

            // always
            ['0', 1, 2, SignStyle.ALWAYS, ~0, null],
            ['5', 1, 2, SignStyle.ALWAYS, ~0, null],
            ['50', 1, 2, SignStyle.ALWAYS, ~0, null],
            ['500', 1, 2, SignStyle.ALWAYS, ~0, null],
            ['-0', 1, 2, SignStyle.ALWAYS, ~0, null],
            ['-5', 1, 2, SignStyle.ALWAYS, 2, -5],
            ['-50', 1, 2, SignStyle.ALWAYS, 3, -50],
            ['-500', 1, 2, SignStyle.ALWAYS, 3, -50],
            ['-AAA', 1, 2, SignStyle.ALWAYS, ~1, null],
            ['+0', 1, 2, SignStyle.ALWAYS, 2, 0],
            ['+5', 1, 2, SignStyle.ALWAYS, 2, 5],
            ['+50', 1, 2, SignStyle.ALWAYS, 3, 50],
            ['+500', 1, 2, SignStyle.ALWAYS, 3, 50],
            ['+AAA', 1, 2, SignStyle.ALWAYS, ~1, null],

            // exceeds pad
            ['0', 1, 2, SignStyle.EXCEEDS_PAD, 1, 0],
            ['5', 1, 2, SignStyle.EXCEEDS_PAD, 1, 5],
            ['50', 1, 2, SignStyle.EXCEEDS_PAD, ~0, null],
            ['500', 1, 2, SignStyle.EXCEEDS_PAD, ~0, null],
            ['-0', 1, 2, SignStyle.EXCEEDS_PAD, ~0, null],
            ['-5', 1, 2, SignStyle.EXCEEDS_PAD, 2, -5],
            ['-50', 1, 2, SignStyle.EXCEEDS_PAD, 3, -50],
            ['-500', 1, 2, SignStyle.EXCEEDS_PAD, 3, -50],
            ['-AAA', 1, 2, SignStyle.EXCEEDS_PAD, ~1, null],
            ['+0', 1, 2, SignStyle.EXCEEDS_PAD, ~0, null],
            ['+5', 1, 2, SignStyle.EXCEEDS_PAD, ~0, null],
            ['+50', 1, 2, SignStyle.EXCEEDS_PAD, 3, 50],
            ['+500', 1, 2, SignStyle.EXCEEDS_PAD, 3, 50],
            ['+AAA', 1, 2, SignStyle.EXCEEDS_PAD, ~1, null]
        ];

        it('test_parseSignsStrict', () => {
            for(let i=0; i < provider_parseSignsStrict.length; i++){
                init();
                test_parseSignsStrict.apply(this, provider_parseSignsStrict[i]);
            }
        });

        function test_parseSignsStrict(input, min, max, style, parseLen, parseVal){
            const pp = new NumberPrinterParser(DAY_OF_MONTH, min, max, style);
            const newPos = pp.parse(parseContext, input, 0);
            assertEquals(newPos, parseLen);
            assertParsed(parseContext, DAY_OF_MONTH, (parseVal != null ? parseVal : null));
        }
    });

    describe('parseSignsLenient', () => {
        const provider_parseSignsLenient = [
            // never
            ['0', 1, 2, SignStyle.NEVER, 1, 0],
            ['5', 1, 2, SignStyle.NEVER, 1, 5],
            ['50', 1, 2, SignStyle.NEVER, 2, 50],
            ['500', 1, 2, SignStyle.NEVER, 3, 500],
            ['-0', 1, 2, SignStyle.NEVER, 2, 0],
            ['-5', 1, 2, SignStyle.NEVER, 2, -5],
            ['-50', 1, 2, SignStyle.NEVER, 3, -50],
            ['-500', 1, 2, SignStyle.NEVER, 4, -500],
            ['-AAA', 1, 2, SignStyle.NEVER, ~1, null],
            ['+0', 1, 2, SignStyle.NEVER, 2, 0],
            ['+5', 1, 2, SignStyle.NEVER, 2, 5],
            ['+50', 1, 2, SignStyle.NEVER, 3, 50],
            ['+500', 1, 2, SignStyle.NEVER, 4, 500],
            ['+AAA', 1, 2, SignStyle.NEVER, ~1, null],
            ['50', 2, 2, SignStyle.NEVER, 2, 50],
            ['-50', 2, 2, SignStyle.NEVER, ~0, null],
            ['+50', 2, 2, SignStyle.NEVER, ~0, null],

            // not negative
            ['0', 1, 2, SignStyle.NOT_NEGATIVE, 1, 0],
            ['5', 1, 2, SignStyle.NOT_NEGATIVE, 1, 5],
            ['50', 1, 2, SignStyle.NOT_NEGATIVE, 2, 50],
            ['500', 1, 2, SignStyle.NOT_NEGATIVE, 3, 500],
            ['-0', 1, 2, SignStyle.NOT_NEGATIVE, 2, 0],
            ['-5', 1, 2, SignStyle.NOT_NEGATIVE, 2, -5],
            ['-50', 1, 2, SignStyle.NOT_NEGATIVE, 3, -50],
            ['-500', 1, 2, SignStyle.NOT_NEGATIVE, 4, -500],
            ['-AAA', 1, 2, SignStyle.NOT_NEGATIVE, ~1, null],
            ['+0', 1, 2, SignStyle.NOT_NEGATIVE, 2, 0],
            ['+5', 1, 2, SignStyle.NOT_NEGATIVE, 2, 5],
            ['+50', 1, 2, SignStyle.NOT_NEGATIVE, 3, 50],
            ['+500', 1, 2, SignStyle.NOT_NEGATIVE, 4, 500],
            ['+AAA', 1, 2, SignStyle.NOT_NEGATIVE, ~1, null],
            ['50', 2, 2, SignStyle.NOT_NEGATIVE, 2, 50],
            ['-50', 2, 2, SignStyle.NOT_NEGATIVE, ~0, null],
            ['+50', 2, 2, SignStyle.NOT_NEGATIVE, ~0, null],

            // normal
            ['0', 1, 2, SignStyle.NORMAL, 1, 0],
            ['5', 1, 2, SignStyle.NORMAL, 1, 5],
            ['50', 1, 2, SignStyle.NORMAL, 2, 50],
            ['500', 1, 2, SignStyle.NORMAL, 3, 500],
            ['-0', 1, 2, SignStyle.NORMAL, 2, 0],
            ['-5', 1, 2, SignStyle.NORMAL, 2, -5],
            ['-50', 1, 2, SignStyle.NORMAL, 3, -50],
            ['-500', 1, 2, SignStyle.NORMAL, 4, -500],
            ['-AAA', 1, 2, SignStyle.NORMAL, ~1, null],
            ['+0', 1, 2, SignStyle.NORMAL, 2, 0],
            ['+5', 1, 2, SignStyle.NORMAL, 2, 5],
            ['+50', 1, 2, SignStyle.NORMAL, 3, 50],
            ['+500', 1, 2, SignStyle.NORMAL, 4, 500],
            ['+AAA', 1, 2, SignStyle.NORMAL, ~1, null],
            ['50', 2, 2, SignStyle.NORMAL, 2, 50],
            ['-50', 2, 2, SignStyle.NORMAL, 3, -50],
            ['+50', 2, 2, SignStyle.NORMAL, 3, 50],

            // always
            ['0', 1, 2, SignStyle.ALWAYS, 1, 0],
            ['5', 1, 2, SignStyle.ALWAYS, 1, 5],
            ['50', 1, 2, SignStyle.ALWAYS, 2, 50],
            ['500', 1, 2, SignStyle.ALWAYS, 3, 500],
            ['-0', 1, 2, SignStyle.ALWAYS, 2, 0],
            ['-5', 1, 2, SignStyle.ALWAYS, 2, -5],
            ['-50', 1, 2, SignStyle.ALWAYS, 3, -50],
            ['-500', 1, 2, SignStyle.ALWAYS, 4, -500],
            ['-AAA', 1, 2, SignStyle.ALWAYS, ~1, null],
            ['+0', 1, 2, SignStyle.ALWAYS, 2, 0],
            ['+5', 1, 2, SignStyle.ALWAYS, 2, 5],
            ['+50', 1, 2, SignStyle.ALWAYS, 3, 50],
            ['+500', 1, 2, SignStyle.ALWAYS, 4, 500],
            ['+AAA', 1, 2, SignStyle.ALWAYS, ~1, null],

            // exceeds pad
            ['0', 1, 2, SignStyle.EXCEEDS_PAD, 1, 0],
            ['5', 1, 2, SignStyle.EXCEEDS_PAD, 1, 5],
            ['50', 1, 2, SignStyle.EXCEEDS_PAD, 2, 50],
            ['500', 1, 2, SignStyle.EXCEEDS_PAD, 3, 500],
            ['-0', 1, 2, SignStyle.EXCEEDS_PAD, 2, 0],
            ['-5', 1, 2, SignStyle.EXCEEDS_PAD, 2, -5],
            ['-50', 1, 2, SignStyle.EXCEEDS_PAD, 3, -50],
            ['-500', 1, 2, SignStyle.EXCEEDS_PAD, 4, -500],
            ['-AAA', 1, 2, SignStyle.EXCEEDS_PAD, ~1, null],
            ['+0', 1, 2, SignStyle.EXCEEDS_PAD, 2, 0],
            ['+5', 1, 2, SignStyle.EXCEEDS_PAD, 2, 5],
            ['+50', 1, 2, SignStyle.EXCEEDS_PAD, 3, 50],
            ['+500', 1, 2, SignStyle.EXCEEDS_PAD, 4, 500],
            ['+AAA', 1, 2, SignStyle.EXCEEDS_PAD, ~1, null]
        ];

        it('test_parseSignsStrict', () => {
            for(let i=0; i < provider_parseSignsLenient.length; i++){
                init();
                test_parseSignsLenient.apply(this, provider_parseSignsLenient[i]);
            }
        });

        function test_parseSignsLenient(input, min, max, style, parseLen, parseVal){
            // console.log(input, min, max, style, parseLen, parseVal);
            parseContext.setStrict(false);
            const pp = new NumberPrinterParser(DAY_OF_MONTH, min, max, style);
            const newPos = pp.parse(parseContext, input, 0);
            assertEquals(newPos, parseLen);
            assertParsed(parseContext, DAY_OF_MONTH, (parseVal != null ? parseVal : null));
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

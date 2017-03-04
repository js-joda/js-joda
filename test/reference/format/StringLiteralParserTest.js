/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {expect} from 'chai';
import {assertEquals} from '../../testUtils';

import '../../_init';

import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
import {DateTimeParseContext} from '../../../src/format/DateTimeParseContext';
import {DecimalStyle} from '../../../src/format/DecimalStyle';
import {TemporalQueries} from '../../../src/temporal/TemporalQueries';
import {IsoChronology} from '../../../src/chrono/IsoChronology';

const StringLiteralPrinterParser = DateTimeFormatterBuilder.StringLiteralPrinterParser;

describe('org.threeten.bp.format.TestStringLiteralParser', () => {
    let parseContext;

    beforeEach(() => {
        init();
    });

    function init(){
        parseContext = new DateTimeParseContext(null, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
    }

    const data_success = [
        // match
        [new StringLiteralPrinterParser('hello'), true, 'hello', 0, 5],
        [new StringLiteralPrinterParser('hello'), true, 'helloOTHER', 0, 5],
        [new StringLiteralPrinterParser('hello'), true, 'OTHERhelloOTHER', 5, 10],
        [new StringLiteralPrinterParser('hello'), true, 'OTHERhello', 5, 10],

        // no match
        [new StringLiteralPrinterParser('hello'), true, '', 0, ~0],
        [new StringLiteralPrinterParser('hello'), true, 'a', 1, ~1],
        [new StringLiteralPrinterParser('hello'), true, 'HELLO', 0, ~0],
        [new StringLiteralPrinterParser('hello'), true, 'hlloo', 0, ~0],
        [new StringLiteralPrinterParser('hello'), true, 'OTHERhllooOTHER', 5, ~5],
        [new StringLiteralPrinterParser('hello'), true, 'OTHERhlloo', 5, ~5],
        [new StringLiteralPrinterParser('hello'), true, 'h', 0, ~0],
        [new StringLiteralPrinterParser('hello'), true, 'OTHERh', 5, ~5],

        // case insensitive
        [new StringLiteralPrinterParser('hello'), false, 'hello', 0, 5],
        [new StringLiteralPrinterParser('hello'), false, 'HELLO', 0, 5],
        [new StringLiteralPrinterParser('hello'), false, 'HelLo', 0, 5],
        [new StringLiteralPrinterParser('hello'), false, 'HelLO', 0, 5]
    ];

    it('test_parse_success', () => {
        for(let i=0; i<data_success.length; i++){
            init();
            test_parse_success.apply(this, data_success[i]);
        }
    });

    function test_parse_success(pp, caseSensitive, text, pos, expectedPos) {
        // console.log(pp, caseSensitive, text, pos, expectedPos);
        parseContext.setCaseSensitive(caseSensitive);
        const result = pp.parse(parseContext, text, pos);
        assertEquals(result, expectedPos);
        assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
        assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
    }

    const data_error = [
        [new StringLiteralPrinterParser('hello'), 'hello', -1, Error],
        [new StringLiteralPrinterParser('hello'), 'hello', 6, Error]
    ];

    it('test_parse_error', () => {
        for(let i=0; i<data_error.length; i++){
            init();
            test_parse_error.apply(this, data_error[i]);
        }
    });

    function test_parse_error(pp, text, pos, expected) {
        expect(() => {
            pp.parse(parseContext, text, pos);
        }).to.throw(expected);

        assertEquals(parseContext.toParsed().query(TemporalQueries.chronology()), null);
        assertEquals(parseContext.toParsed().query(TemporalQueries.zoneId()), null);
    }

});

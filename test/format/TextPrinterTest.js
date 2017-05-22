/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import {
    use as jodaUse,
    ChronoField,
    DateTimeException,
    DateTimePrintContext,
    DecimalStyle,
    IsoFields,
    LocalDateTime,
    StringBuilder,
    TextStyle,
    TemporalAccessor,
    ZoneId,
} from 'js-joda';

import jodaTZ from 'js-joda-timezone';

import { assertEquals, dataProviderTest } from '../testUtils';

import '../_init';

import CldrDateTimeTextProvider from '../../src/format/cldr/CldrDateTimeTextProvider';
import Locale from '../../src/Locale';
import TextPrinterParser from '../../src/format/parser/TextPrinterParser';
import { MockFieldValue } from '../reference/temporal/MockFieldValue';

//use js-joda-timezone
jodaUse(jodaTZ);

/* these tests are not copied from threetenbp, but js-joda tests to increase coverage */
describe('js-joda-locale TextPrinterTest', () => {

    let printContext;
    let buf;

    const EMPTY = new TemporalAccessor();
    EMPTY.isSupported = () => {
        return true;
    };
    EMPTY.getLong = () => {
        throw new DateTimeException('Mock');
    };

    beforeEach(() => {
        const zdt = LocalDateTime.of(2011, 6, 30, 12, 30, 40, 0).atZone(ZoneId.of('Europe/Paris'));
        printContext = new DateTimePrintContext(zdt, Locale.ENGLISH, DecimalStyle.STANDARD);
        buf = new StringBuilder();
    });

    const PROVIDER = new CldrDateTimeTextProvider();

    describe('print', () => {
        it('test_print EN', () => {
            const provider_data = [

                [ChronoField.AMPM_OF_DAY, TextStyle.FULL, 0, 'AM'],
                [ChronoField.AMPM_OF_DAY, TextStyle.FULL, 1, 'PM'],

                [ChronoField.AMPM_OF_DAY, TextStyle.NARROW, 0, 'a'],
                [ChronoField.AMPM_OF_DAY, TextStyle.NARROW, 1, 'p'],

                [ChronoField.AMPM_OF_DAY, TextStyle.SHORT, 0, 'AM'],
                [ChronoField.AMPM_OF_DAY, TextStyle.SHORT, 1, 'PM'],

                [ChronoField.ERA, TextStyle.FULL, 0, 'Before Christ'],
                [ChronoField.ERA, TextStyle.FULL, 1, 'Anno Domini'],

                [ChronoField.ERA, TextStyle.NARROW, 0, 'B'],
                [ChronoField.ERA, TextStyle.NARROW, 1, 'A'],

                [ChronoField.ERA, TextStyle.SHORT, 0, 'BC'],
                [ChronoField.ERA, TextStyle.SHORT, 1, 'AD'],

                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 1, '1st quarter'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 2, '2nd quarter'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 3, '3rd quarter'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 4, '4th quarter'],
                
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 1, '1'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 2, '2'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 3, '3'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 4, '4'],
                
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 1, 'Q1'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 2, 'Q2'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 3, 'Q3'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 4, 'Q4'],
                
            ];

            dataProviderTest(provider_data, (field, style, value, expected) => {
                buf = new StringBuilder();
                printContext.setLocale(Locale.ENGLISH);
                printContext.setDateTime(new MockFieldValue(field, value));
                const pp = new TextPrinterParser(field, style, PROVIDER);
                pp.print(printContext, buf);
                assertEquals(buf.toString(), expected);
            }, false);
        });

        it('test_print DE', () => {
            const provider_data = [

                [ChronoField.AMPM_OF_DAY, TextStyle.FULL, 0, 'vorm.'],
                [ChronoField.AMPM_OF_DAY, TextStyle.FULL, 1, 'nachm.'],

                [ChronoField.AMPM_OF_DAY, TextStyle.NARROW, 0, 'vm.'],
                [ChronoField.AMPM_OF_DAY, TextStyle.NARROW, 1, 'nm.'],

                [ChronoField.AMPM_OF_DAY, TextStyle.SHORT, 0, 'vorm.'],
                [ChronoField.AMPM_OF_DAY, TextStyle.SHORT, 1, 'nachm.'],

                [ChronoField.ERA, TextStyle.FULL, 0, 'v. Chr.'],
                [ChronoField.ERA, TextStyle.FULL, 1, 'n. Chr.'],

                [ChronoField.ERA, TextStyle.NARROW, 0, 'v. Chr.'],
                [ChronoField.ERA, TextStyle.NARROW, 1, 'n. Chr.'],

                [ChronoField.ERA, TextStyle.SHORT, 0, 'v. Chr.'],
                [ChronoField.ERA, TextStyle.SHORT, 1, 'n. Chr.'],

                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 1, '1. Quartal'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 2, '2. Quartal'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 3, '3. Quartal'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.FULL, 4, '4. Quartal'],

                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 1, '1'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 2, '2'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 3, '3'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW, 4, '4'],

                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 1, 'Q1'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 2, 'Q2'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 3, 'Q3'],
                [IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT, 4, 'Q4'],

            ];

            dataProviderTest(provider_data, (field, style, value, expected) => {
                buf = new StringBuilder();
                printContext.setLocale(Locale.GERMAN);
                printContext.setDateTime(new MockFieldValue(field, value));
                const pp = new TextPrinterParser(field, style, PROVIDER);
                pp.print(printContext, buf);
                assertEquals(buf.toString(), expected);
            }, false);
        });
    });

});

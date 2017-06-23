/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import {
    use as jodaUse,
    DateTimePrintContext,
    DecimalStyle,
    LocalDateTime,
    StringBuilder,
    TextStyle,
    ZoneId,
} from 'js-joda';

import jodaTZ from 'js-joda-timezone';

import { assertEquals, dataProviderTest } from '../testUtils';

import '../_init';

import Locale from '../../src/Locale';
import LocalizedOffsetPrinterParser from '../../src/format/parser/LocalizedOffsetPrinterParser';

//use js-joda-timezone
jodaUse(jodaTZ);

/* these tests are not copied from threetenbp, but js-joda tests to increase coverage */
describe('js-joda-locale LocalizedOffsetPrinter', () => {

    describe('print', () => {

        const data = [
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Paris', TextStyle.FULL, Locale.ENGLISH, 'GMT+01:00'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Paris', TextStyle.SHORT, Locale.ENGLISH, 'GMT+1'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', TextStyle.FULL, Locale.ENGLISH, 'GMT'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', TextStyle.SHORT, Locale.ENGLISH, 'GMT'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', TextStyle.FULL, Locale.ENGLISH, 'GMT-05:00'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', TextStyle.SHORT, Locale.ENGLISH, 'GMT-5'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'GMT+04:30', TextStyle.FULL, Locale.ENGLISH, 'GMT+04:30'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'GMT+04:30', TextStyle.SHORT, Locale.ENGLISH, 'GMT+4.5:3000'], // TODO: this doesn't seem ok ?

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Paris', TextStyle.FULL, Locale.GERMAN, 'GMT+01:00'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Paris', TextStyle.SHORT, Locale.GERMAN, 'GMT+1'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', TextStyle.FULL, Locale.GERMAN, 'GMT'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', TextStyle.SHORT, Locale.GERMAN, 'GMT'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', TextStyle.FULL, Locale.GERMAN, 'GMT-05:00'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', TextStyle.SHORT, Locale.GERMAN, 'GMT-5'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'GMT+04:30', TextStyle.FULL, Locale.GERMAN, 'GMT+04:30'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'GMT+04:30', TextStyle.SHORT, Locale.GERMAN, 'GMT+4.5:3000'], // TODO: this doesn't seem ok ?
        ];

        it('test_print', () => {
            dataProviderTest(data, (ldt, zoneStr, textStyle, locale, expected) => {
                const buf = new StringBuilder();
                const printContext = new DateTimePrintContext(ldt.atZone(ZoneId.of(zoneStr)), locale, DecimalStyle.STANDARD);
                const pp = new LocalizedOffsetPrinterParser(textStyle);
                pp.print(printContext, buf);
                assertEquals(buf.toString(), expected);
            }, false);
        });
    });

});

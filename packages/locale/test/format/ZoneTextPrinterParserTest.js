/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { expect } from 'chai';

import {
    _ as jodaInternal,
    DecimalStyle,
    IsoChronology,
    LocalDateTime,
    TextStyle,
    ZoneId,
    ZoneRulesProvider,
} from '@js-joda/core';

import '@js-joda/timezone';

import { assertEquals, dataProviderTest } from '../testUtils';

import '../_init';

import CldrZoneTextPrinterParser from '../../src/format/cldr/CldrZoneTextPrinterParser';
import Locale from '../../src/Locale';

const {
    DateTimeParseContext,
    DateTimePrintContext,
    StringBuilder,
} = jodaInternal;

/* these tests are not copied from threetenbp, but js-joda tests to increase coverage */
describe('@js-joda/locale CldrZoneTextPrinterParser', () => {

    describe('print / parse zones', () => {

        // test some zones and their representations in different locales
        // TODO: test DST when ZoneRules.isDailylightSavings() is available
        const data = [

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'UTC', Locale.ENGLISH, TextStyle.FULL, 'UTC'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'UTC', Locale.ENGLISH, TextStyle.SHORT, 'UTC'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', Locale.ENGLISH, TextStyle.FULL, 'Greenwich Mean Time'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', Locale.ENGLISH, TextStyle.SHORT, 'GMT'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Berlin', Locale.ENGLISH, TextStyle.FULL, 'Central European Time'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Berlin', Locale.ENGLISH, TextStyle.SHORT, 'Europe/Berlin'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', Locale.ENGLISH, TextStyle.FULL, 'Eastern Time'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', Locale.ENGLISH, TextStyle.SHORT, 'ET'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/Los_Angeles', Locale.ENGLISH, TextStyle.FULL, 'Pacific Time'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/Los_Angeles', Locale.ENGLISH, TextStyle.SHORT, 'PT'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'UTC', Locale.GERMAN, TextStyle.FULL, 'UTC'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'UTC', Locale.GERMAN, TextStyle.SHORT, 'UTC'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', Locale.GERMAN, TextStyle.FULL, 'Mittlere Greenwich-Zeit'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', Locale.GERMAN, TextStyle.SHORT, 'Europe/London'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Berlin', Locale.GERMAN, TextStyle.FULL, 'Mitteleuropäische Zeit'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Berlin', Locale.GERMAN, TextStyle.SHORT, 'MEZ'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', Locale.GERMAN, TextStyle.FULL, 'Nordamerikanische Ostküstenzeit'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', Locale.GERMAN, TextStyle.SHORT, 'America/New_York'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/Los_Angeles', Locale.GERMAN, TextStyle.FULL, 'Nordamerikanische Westküstenzeit'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/Los_Angeles', Locale.GERMAN, TextStyle.SHORT, 'America/Los_Angeles'],

        ];

        it('test_print_parse_zones', () => {
            dataProviderTest(data, (ldt, zoneStr, locale, style, expectedString) => {
                const buf = new StringBuilder();
                const zone = ZoneId.of(zoneStr);
                const zdt = ldt.atZone(zone);
                const printContext = new DateTimePrintContext(zdt, locale, DecimalStyle.STANDARD);
                const ztpp = new CldrZoneTextPrinterParser(style);
                ztpp.print(printContext, buf);
                assertEquals(buf.toString(), expectedString);
                const parseContext = new DateTimeParseContext(locale, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                ztpp.parse(parseContext, buf.toString(), 0);
                const parsedZone = parseContext.currentParsed().zone;
                // since parsing back a zone text does not necessarily result in the
                // same zone id, we compare the offset of the parsed zone
                assertEquals(zone.rules().offsetOfInstant(zdt.toInstant()), parsedZone.rules().offsetOfInstant(zdt.toInstant()));
            });
        }).timeout(20000); // longer timeout, 2 seconds are not enough :/

        it('test_parse_non_zone', () => {
            const ztpp = new CldrZoneTextPrinterParser(TextStyle.FULL);
            const parseContext = new DateTimeParseContext(Locale.US, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
            const position = ztpp.parse(parseContext, 'non zone text', 0);
            expect(position).to.eql(-1);
        });

        // these take forever (> 1 minute each ... so we skip them by default
        describe.skip('print / parse all available zones', () => {
            // the following tests just make sure that we can print and parse all zones that js-joda-timezone provides
            // WITHOUT verifying that they are correct
            it('test_print_parse_all_zones FULL EN', () => {
                ZoneRulesProvider.getAvailableZoneIds().forEach((zoneStr) => {
                    const buf = new StringBuilder();
                    const zone = ZoneId.of(zoneStr);
                    const zdt = LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0).atZone(zone);
                    const locale = Locale.ENGLISH;
                    const style = TextStyle.FULL;
                    const printContext = new DateTimePrintContext(zdt, locale, DecimalStyle.STANDARD);
                    const ztpp = new CldrZoneTextPrinterParser(style);
                    ztpp.print(printContext, buf);
                    expect(buf.toString().length).to.be.above(0);
                    const parseContext = new DateTimeParseContext(locale, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                    ztpp.parse(parseContext, zoneStr, 0);
                    const parsedZone = parseContext.currentParsed().zone;
                    expect(parsedZone).to.exist;
                });
            }).timeout(2 * 60 * 1000);

            it('test_print_parse_all_zones SHORT EN', () => {
                ZoneRulesProvider.getAvailableZoneIds().forEach((zoneStr) => {
                    const buf = new StringBuilder();
                    const zone = ZoneId.of(zoneStr);
                    const zdt = LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0).atZone(zone);
                    const locale = Locale.ENGLISH;
                    const style = TextStyle.SHORT;
                    const printContext = new DateTimePrintContext(zdt, locale, DecimalStyle.STANDARD);
                    const ztpp = new CldrZoneTextPrinterParser(style);
                    ztpp.print(printContext, buf);
                    expect(buf.toString().length).to.be.above(0);
                    const parseContext = new DateTimeParseContext(locale, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                    ztpp.parse(parseContext, zoneStr, 0);
                    const parsedZone = parseContext.currentParsed().zone;
                    expect(parsedZone).to.exist;
                });
            }).timeout(2 * 60 * 1000);

            it('test_print_parse_all_zones FULL DE', () => {
                ZoneRulesProvider.getAvailableZoneIds().forEach((zoneStr) => {
                    const buf = new StringBuilder();
                    const zone = ZoneId.of(zoneStr);
                    const zdt = LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0).atZone(zone);
                    const locale = Locale.GERMAN;
                    const style = TextStyle.FULL;
                    const printContext = new DateTimePrintContext(zdt, locale, DecimalStyle.STANDARD);
                    const ztpp = new CldrZoneTextPrinterParser(style);
                    ztpp.print(printContext, buf);
                    expect(buf.toString().length).to.be.above(0);
                    const parseContext = new DateTimeParseContext(locale, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                    ztpp.parse(parseContext, zoneStr, 0);
                    const parsedZone = parseContext.currentParsed().zone;
                    expect(parsedZone).to.exist;
                });
            }).timeout(2 * 60 * 1000);

            it('test_print_parse_all_zones SHORT DE', () => {
                ZoneRulesProvider.getAvailableZoneIds().forEach((zoneStr) => {
                    const buf = new StringBuilder();
                    const zone = ZoneId.of(zoneStr);
                    const zdt = LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0).atZone(zone);
                    const locale = Locale.GERMAN;
                    const style = TextStyle.SHORT;
                    const printContext = new DateTimePrintContext(zdt, locale, DecimalStyle.STANDARD);
                    const ztpp = new CldrZoneTextPrinterParser(style);
                    ztpp.print(printContext, buf);
                    expect(buf.toString().length).to.be.above(0);
                    const parseContext = new DateTimeParseContext(locale, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                    ztpp.parse(parseContext, zoneStr, 0);
                    const parsedZone = parseContext.currentParsed().zone;
                    expect(parsedZone).to.exist;
                });
            }).timeout(2 * 60 * 1000);
        });
    });
});

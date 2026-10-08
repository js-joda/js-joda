/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { expect } from 'chai';

import {
    _ as jodaInternal,
    DateTimeFormatter,
    DecimalStyle,
    IsoChronology,
    LocalDate,
    LocalDateTime,
    TemporalQueries,
    TextStyle,
    ZoneId,
    ZoneRulesProvider,
    use,
} from '@js-joda/core';

import '@js-joda/timezone';

import { assertEquals, dataProviderTest } from '../testUtils';

import '../_init';

import CldrZoneTextPrinterParser from '../../src/format/cldr/CldrZoneTextPrinterParser';
import Locale from '../../src/Locale';
import jodaLocale from '../../src/plug';

use(jodaLocale);

const {
    DateTimeParseContext,
    DateTimePrintContext,
    StringBuilder,
} = jodaInternal;

/* these tests are not copied from threetenbp, but js-joda tests to increase coverage */
describe('@js-joda/locale CldrZoneTextPrinterParser', () => {

    describe('print / parse zones', () => {

        // test some zones and their representations in different locales, in winter and in summer
        const data = [

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'UTC', Locale.ENGLISH, TextStyle.FULL, 'UTC'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'UTC', Locale.ENGLISH, TextStyle.FULL, 'UTC'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'UTC', Locale.ENGLISH, TextStyle.SHORT, 'UTC'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'UTC', Locale.ENGLISH, TextStyle.SHORT, 'UTC'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', Locale.ENGLISH, TextStyle.FULL, 'Greenwich Mean Time'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'Europe/London', Locale.ENGLISH, TextStyle.FULL, 'British Summer Time'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', Locale.ENGLISH, TextStyle.SHORT, 'GMT'],
            // English has no short daylight name for London, and doesn't fall back to 'GMT'
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'Europe/London', Locale.ENGLISH, TextStyle.SHORT, 'Europe/London'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Berlin', Locale.ENGLISH, TextStyle.FULL, 'Central European Standard Time'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'Europe/Berlin', Locale.ENGLISH, TextStyle.FULL, 'Central European Summer Time'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Berlin', Locale.ENGLISH, TextStyle.SHORT, 'Europe/Berlin'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'Europe/Berlin', Locale.ENGLISH, TextStyle.SHORT, 'Europe/Berlin'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', Locale.ENGLISH, TextStyle.FULL, 'Eastern Standard Time'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'America/New_York', Locale.ENGLISH, TextStyle.FULL, 'Eastern Daylight Time'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', Locale.ENGLISH, TextStyle.SHORT, 'EST'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'America/New_York', Locale.ENGLISH, TextStyle.SHORT, 'EDT'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/Los_Angeles', Locale.ENGLISH, TextStyle.FULL, 'Pacific Standard Time'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'America/Los_Angeles', Locale.ENGLISH, TextStyle.FULL, 'Pacific Daylight Time'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/Los_Angeles', Locale.ENGLISH, TextStyle.SHORT, 'PST'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'America/Los_Angeles', Locale.ENGLISH, TextStyle.SHORT, 'PDT'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'UTC', Locale.GERMAN, TextStyle.FULL, 'UTC'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'UTC', Locale.GERMAN, TextStyle.FULL, 'UTC'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'UTC', Locale.GERMAN, TextStyle.SHORT, 'UTC'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'UTC', Locale.GERMAN, TextStyle.SHORT, 'UTC'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', Locale.GERMAN, TextStyle.FULL, 'Mittlere Greenwich-Zeit'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'Europe/London', Locale.GERMAN, TextStyle.FULL, 'Britische Sommerzeit'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', Locale.GERMAN, TextStyle.SHORT, 'Europe/London'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'Europe/London', Locale.GERMAN, TextStyle.SHORT, 'Europe/London'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Berlin', Locale.GERMAN, TextStyle.FULL, 'Mitteleuropäische Normalzeit'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'Europe/Berlin', Locale.GERMAN, TextStyle.FULL, 'Mitteleuropäische Sommerzeit'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Berlin', Locale.GERMAN, TextStyle.SHORT, 'MEZ'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'Europe/Berlin', Locale.GERMAN, TextStyle.SHORT, 'MESZ'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', Locale.GERMAN, TextStyle.FULL, 'Nordamerikanische Ostküsten-Normalzeit'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'America/New_York', Locale.GERMAN, TextStyle.FULL, 'Nordamerikanische Ostküsten-Sommerzeit'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', Locale.GERMAN, TextStyle.SHORT, 'America/New_York'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'America/New_York', Locale.GERMAN, TextStyle.SHORT, 'America/New_York'],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/Los_Angeles', Locale.GERMAN, TextStyle.FULL, 'Nordamerikanische Westküsten-Normalzeit'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'America/Los_Angeles', Locale.GERMAN, TextStyle.FULL, 'Nordamerikanische Westküsten-Sommerzeit'],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/Los_Angeles', Locale.GERMAN, TextStyle.SHORT, 'America/Los_Angeles'],
            [LocalDateTime.of(2011, 7, 30, 12, 30, 40, 0), 'America/Los_Angeles', Locale.GERMAN, TextStyle.SHORT, 'America/Los_Angeles'],

            // [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Asia/Seoul', Locale.KOREAN, TextStyle.FULL, '대한민국 시간'],
            // [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Asia/Seoul', Locale.KOREAN, TextStyle.SHORT, 'Asia/Seoul'],
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

        describe('daylight savings', () => {
            // wraps a ZonedDateTime, replacing the rules of its zone by rules that answer
            // isDaylightSavings() with the given value, to test the fallback to the generic name
            const withDaylightSavings = (zdt, daylight) => {
                const zone = Object.create(zdt.zone());
                const rules = Object.create(zdt.zone().rules());
                rules.isDaylightSavings = () => daylight;
                zone.rules = () => rules;
                return {
                    query: (query) => query === TemporalQueries.zoneId() ? zone : zdt.query(query),
                    isSupported: (field) => zdt.isSupported(field),
                    getLong: (field) => zdt.getLong(field),
                };
            };

            const data = [
                ['Europe/Berlin', false, Locale.ENGLISH, TextStyle.FULL, 'Central European Standard Time'],
                ['Europe/Berlin', true, Locale.ENGLISH, TextStyle.FULL, 'Central European Summer Time'],
                ['Europe/Berlin', false, Locale.GERMAN, TextStyle.SHORT, 'MEZ'],
                ['Europe/Berlin', true, Locale.GERMAN, TextStyle.SHORT, 'MESZ'],
                ['Europe/London', false, Locale.ENGLISH, TextStyle.FULL, 'Greenwich Mean Time'],
                ['Europe/London', true, Locale.ENGLISH, TextStyle.FULL, 'British Summer Time'],
                ['America/New_York', false, Locale.ENGLISH, TextStyle.FULL, 'Eastern Standard Time'],
                ['America/New_York', true, Locale.ENGLISH, TextStyle.FULL, 'Eastern Daylight Time'],
                ['America/New_York', false, Locale.ENGLISH, TextStyle.SHORT, 'EST'],
                ['America/New_York', true, Locale.ENGLISH, TextStyle.SHORT, 'EDT'],
            ];

            it('test_print_daylight_standard', () => {
                dataProviderTest(data, (zoneStr, daylight, locale, style, expectedString) => {
                    const zdt = LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0).atZone(ZoneId.of(zoneStr));
                    const buf = new StringBuilder();
                    const printContext = new DateTimePrintContext(withDaylightSavings(zdt, daylight), locale, DecimalStyle.STANDARD);
                    new CldrZoneTextPrinterParser(style).print(printContext, buf);
                    assertEquals(buf.toString(), expectedString);
                });
            });

            it('test_print_generic_without_instant', () => {
                // a temporal without INSTANT_SECONDS prints the generic name
                const zdt = LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0).atZone(ZoneId.of('Europe/Berlin'));
                const temporal = withDaylightSavings(zdt, true);
                temporal.isSupported = () => false;
                const buf = new StringBuilder();
                const printContext = new DateTimePrintContext(temporal, Locale.ENGLISH, DecimalStyle.STANDARD);
                new CldrZoneTextPrinterParser(TextStyle.FULL).print(printContext, buf);
                assertEquals(buf.toString(), 'Central European Time');
            });

            it('test_print_generic_if_rules_throw', () => {
                const zdt = LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0).atZone(ZoneId.of('Europe/Berlin'));
                const temporal = withDaylightSavings(zdt, true);
                temporal.query(TemporalQueries.zoneId()).rules().isDaylightSavings = () => {
                    throw new Error('no standard offsets');
                };
                const buf = new StringBuilder();
                const printContext = new DateTimePrintContext(temporal, Locale.ENGLISH, DecimalStyle.STANDARD);
                new CldrZoneTextPrinterParser(TextStyle.FULL).print(printContext, buf);
                assertEquals(buf.toString(), 'Central European Time');
            });
        });

        describe('fixed zones', () => {
            const fixedZones = [
                ['+01:00', '+01:00'],
                ['-01:00', '-01:00'],
                ['+12:34:56', '+12:34:56'],
                ['Z', 'Z'],
                ['GMT', 'GMT'],
                ['GMT+01:00', 'GMT+01:00'],
                ['UTC', 'UTC'],
                ['UTC-01:00', 'UTC-01:00'],
                ['UT', 'UT'],
                ['UT+01:00', 'UT+01:00'],
            ];

            it('test_parse_fixed', () => {
                dataProviderTest(fixedZones, (input, expectedZone) => {
                    const ztpp = new CldrZoneTextPrinterParser(TextStyle.FULL);
                    const parseContext = new DateTimeParseContext(Locale.US, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                    const result = ztpp.parse(parseContext, input, 0);
                    assertEquals(result, input.length);
                    assertEquals(parseContext.currentParsed().zone, ZoneId.of(expectedZone));
                });
            });

            it('test_parse_fixed_byFormatterWithPrefix', () => {
                dataProviderTest(fixedZones, (input, expectedZone) => {
                    const f = DateTimeFormatter.ofPattern('MMzzz').withLocale(Locale.US);
                    const parsed = f.parse(`12${input}`);
                    assertEquals(parsed.query(TemporalQueries.zoneId()), ZoneId.of(expectedZone));
                });
            });

            it('test_parse_fixed_byFormatterWithSuffixZ', () => {
                dataProviderTest(fixedZones, (input, expectedZone) => {
                    const f = DateTimeFormatter.ofPattern('MMzzz\'Z\'').withLocale(Locale.US);
                    const parsed = f.parse(`12${input}Z`);
                    assertEquals(parsed.query(TemporalQueries.zoneId()), ZoneId.of(expectedZone));
                });
            });

            it('test_parse_fixed_byFormatterWithSuffix0', () => {
                dataProviderTest(fixedZones, (input, expectedZone) => {
                    const f = DateTimeFormatter.ofPattern('MMzzz\'0\'').withLocale(Locale.US);
                    const parsed = f.parse(`12${input}0`);
                    assertEquals(parsed.query(TemporalQueries.zoneId()), ZoneId.of(expectedZone));
                });
            });

            it('test_parse_localDate_with_fixed_zone', () => {
                const f = DateTimeFormatter.ofPattern('yyyy-MM-dd z').withLocale(Locale.US);
                const parsed = LocalDate.parse('2015-07-21 GMT+02:00', f);
                assertEquals(parsed, LocalDate.of(2015, 7, 21));
            });

            it('test_parse_incomplete_offset', () => {
                const ztpp = new CldrZoneTextPrinterParser(TextStyle.FULL);
                const parseContext = new DateTimeParseContext(Locale.US, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                expect(ztpp.parse(parseContext, '+01', 0)).to.eql(~0);
                expect(ztpp.parse(parseContext, '', 0)).to.eql(~0);
            });

            it('test_parse_invalid_offset', () => {
                const ztpp = new CldrZoneTextPrinterParser(TextStyle.FULL);
                const parseContext = new DateTimeParseContext(Locale.US, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                expect(ztpp.parse(parseContext, 'GMT+19:00', 0)).to.eql(~0);
            });
        });

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

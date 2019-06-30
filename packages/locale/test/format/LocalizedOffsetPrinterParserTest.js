/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import { expect } from 'chai';
import {
    _ as jodaInternal,
    ChronoField,
    DecimalStyle,
    IsoChronology,
    LocalDateTime,
    TextStyle,
    ZoneId,
} from '@js-joda/core';

import '@js-joda/timezone';

import { assertEquals, dataProviderTest } from '../testUtils';

import '../_init';

import Locale from '../../src/Locale';
import LocalizedOffsetPrinterParser from '../../src/format/parser/LocalizedOffsetPrinterParser';

const {
    DateTimeParseContext,
    DateTimePrintContext,
    StringBuilder,
} = jodaInternal;

/* these tests are not copied from threetenbp, but js-joda tests to increase coverage */
describe('@js-joda/locale LocalizedOffsetPrinterParser', () => {

    it('constructor', () => {
        const lop = new LocalizedOffsetPrinterParser(TextStyle.FULL);
        expect(lop.textStyle()).to.eql(TextStyle.FULL);
    });

    describe('print_parse', () => {

        const data = [
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Paris', TextStyle.FULL, Locale.ENGLISH, 'GMT+01:00', 3600],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Paris', TextStyle.SHORT, Locale.ENGLISH, 'GMT+1', 3600],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', TextStyle.FULL, Locale.ENGLISH, 'GMT', 0],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', TextStyle.SHORT, Locale.ENGLISH, 'GMT', 0],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', TextStyle.FULL, Locale.ENGLISH, 'GMT-05:00', -18000],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', TextStyle.SHORT, Locale.ENGLISH, 'GMT-5', -18000],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'GMT+04:30', TextStyle.FULL, Locale.ENGLISH, 'GMT+04:30', 16200],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'GMT+04:30', TextStyle.SHORT, Locale.ENGLISH, 'GMT+4:30', 16200],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Paris', TextStyle.FULL, Locale.GERMAN, 'GMT+01:00', 3600],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/Paris', TextStyle.SHORT, Locale.GERMAN, 'GMT+1', 3600],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', TextStyle.FULL, Locale.GERMAN, 'GMT', 0],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'Europe/London', TextStyle.SHORT, Locale.GERMAN, 'GMT', 0],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', TextStyle.FULL, Locale.GERMAN, 'GMT-05:00', -18000],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'America/New_York', TextStyle.SHORT, Locale.GERMAN, 'GMT-5', -18000],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'GMT+04:30', TextStyle.FULL, Locale.GERMAN, 'GMT+04:30', 16200],
            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'GMT+04:30', TextStyle.SHORT, Locale.GERMAN, 'GMT+4:30', 16200],

            [LocalDateTime.of(2011, 1, 30, 12, 30, 40, 0), 'GMT+14:32:45', TextStyle.SHORT, Locale.GERMAN, 'GMT+14:32:45', 52365],
        ];

        it('test_print_parse', () => {
            dataProviderTest(data, (ldt, zoneStr, textStyle, locale, expected, expectedOffsetSeconds) => {
                const buf = new StringBuilder();
                const printContext = new DateTimePrintContext(ldt.atZone(ZoneId.of(zoneStr)), locale, DecimalStyle.STANDARD);
                const pp = new LocalizedOffsetPrinterParser(textStyle);
                pp.print(printContext, buf);
                assertEquals(buf.toString(), expected);
                const parseContext = new DateTimeParseContext(locale, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
                pp.parse(parseContext, buf.toString(), 0);
                const parsedOffsetSeconds = parseContext.getParsed(ChronoField.OFFSET_SECONDS);
                assertEquals(parsedOffsetSeconds, expectedOffsetSeconds);
            }, false);
        });
    });

    describe('parse', () => {
        it('test parse cornerCases', () => {
            const pp = new LocalizedOffsetPrinterParser(TextStyle.FULL_STANDALONE);
            const parseContext = new DateTimeParseContext(Locale.US, DecimalStyle.STANDARD, IsoChronology.INSTANCE);
            let parsedValue = pp.parse(parseContext, '', 0);
            expect(parsedValue).to.eql(-1);

            parsedValue = pp.parse(parseContext, 'GMT*', 0);
            expect(parsedValue).to.eql(3);

            parsedValue = pp.parse(parseContext, 'GMT-', 0);
            expect(parsedValue).to.eql(-5);

            parsedValue = pp.parse(parseContext, 'GMT+A', 0);
            expect(parsedValue).to.eql(-5);

            parsedValue = pp.parse(parseContext, 'GMT+0A', 0);
            expect(parsedValue).to.eql(5);

            parsedValue = pp.parse(parseContext, 'GMT+25', 0);
            expect(parsedValue).to.eql(-6);

            parsedValue = pp.parse(parseContext, 'GMT+01:', 0);
            expect(parsedValue).to.eql(-8);

            parsedValue = pp.parse(parseContext, 'GMT+01:AA', 0);
            expect(parsedValue).to.eql(-8);

            parsedValue = pp.parse(parseContext, 'GMT+01:0A', 0);
            expect(parsedValue).to.eql(-9);

            parsedValue = pp.parse(parseContext, 'GMT+01:99', 0);
            expect(parsedValue).to.eql(-10);

            parsedValue = pp.parse(parseContext, 'GMT+01:00:', 0);
            expect(parsedValue).to.eql(-11);

            parsedValue = pp.parse(parseContext, 'GMT+01:00:AA', 0);
            expect(parsedValue).to.eql(-11);

            parsedValue = pp.parse(parseContext, 'GMT+01:00:0A', 0);
            expect(parsedValue).to.eql(-12);

            parsedValue = pp.parse(parseContext, 'GMT+01:00:99', 0);
            expect(parsedValue).to.eql(-13);
        });
    });
});

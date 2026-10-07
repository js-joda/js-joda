/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/*
 * Port of ThreeTen-Backport's org.threeten.bp.format.TestDateTimeParsing.
 * The rows with a formatter using DateTimeFormatter.withZone() are left out,
 * js-joda doesn't implement withZone().
 */
import { expect } from 'chai';

import {
    ChronoField, DateTimeException, DateTimeFormatterBuilder, Instant, LocalDateTime, ZoneId, ZoneOffset, ZonedDateTime
} from '@js-joda/core';

import { assertEquals, dataProviderTest } from '../testUtils';
import '../useTzdbZoneRules';

const {
    EPOCH_DAY, INSTANT_SECONDS, MICRO_OF_SECOND, MILLI_OF_SECOND, NANO_OF_SECOND, OFFSET_SECONDS, SECOND_OF_DAY,
    SECOND_OF_MINUTE
} = ChronoField;

describe('org.threeten.bp.format.TestDateTimeParsing', () => {

    const PARIS = ZoneId.of('Europe/Paris');
    const OFFSET_0230 = ZoneOffset.ofHoursMinutes(2, 30);

    const LOCALFIELDS_ZONEID = new DateTimeFormatterBuilder()
        .appendPattern('yyyy-MM-dd HH:mm:ss ').appendZoneId().toFormatter();
    const LOCALFIELDS_OFFSETID = new DateTimeFormatterBuilder()
        .appendPattern('yyyy-MM-dd HH:mm:ss ').appendOffsetId().toFormatter();
    const INSTANT = new DateTimeFormatterBuilder()
        .appendInstant().toFormatter();
    const INSTANT_OFFSETID = new DateTimeFormatterBuilder()
        .appendInstant().appendLiteral(' ').appendOffsetId().toFormatter();
    const INSTANT_OFFSETSECONDS = new DateTimeFormatterBuilder()
        .appendInstant().appendLiteral(' ').appendValue(OFFSET_SECONDS).toFormatter();
    const INSTANTSECONDS = new DateTimeFormatterBuilder()
        .appendValue(INSTANT_SECONDS).toFormatter();
    const INSTANTSECONDS_NOS = new DateTimeFormatterBuilder()
        .appendValue(INSTANT_SECONDS).appendLiteral('.').appendValue(NANO_OF_SECOND).toFormatter();
    const INSTANTSECONDS_OFFSETSECONDS = new DateTimeFormatterBuilder()
        .appendValue(INSTANT_SECONDS).appendLiteral(' ').appendValue(OFFSET_SECONDS).toFormatter();
    const INSTANT_OFFSETSECONDS_ZONE = new DateTimeFormatterBuilder()
        .appendInstant().appendLiteral(' ')
        .appendValue(OFFSET_SECONDS).appendLiteral(' ')
        .appendZoneId().toFormatter();

    // @DataProvider(name = "instantZones")
    function data_instantZones() {
        return [
            [LOCALFIELDS_ZONEID, '2014-06-30 01:02:03 Europe/Paris', ZonedDateTime.of(2014, 6, 30, 1, 2, 3, 0, PARIS)],
            [LOCALFIELDS_ZONEID, '2014-06-30 01:02:03 +02:30', ZonedDateTime.of(2014, 6, 30, 1, 2, 3, 0, OFFSET_0230)],
            [LOCALFIELDS_OFFSETID, '2014-06-30 01:02:03 +02:30', ZonedDateTime.of(2014, 6, 30, 1, 2, 3, 0, OFFSET_0230)],
            [INSTANT_OFFSETID, '2014-06-30T01:02:03Z +02:30', ZonedDateTime.of(2014, 6, 30, 1, 2, 3, 0, ZoneOffset.UTC).withZoneSameInstant(OFFSET_0230)],
            [INSTANT_OFFSETSECONDS, '2014-06-30T01:02:03Z 9000', ZonedDateTime.of(2014, 6, 30, 1, 2, 3, 0, ZoneOffset.UTC).withZoneSameInstant(OFFSET_0230)],
            [INSTANTSECONDS_OFFSETSECONDS, '86402 9000', Instant.ofEpochSecond(86402).atZone(OFFSET_0230)],
            [INSTANT_OFFSETSECONDS_ZONE, '2016-10-30T00:30:00Z 7200 Europe/Paris',
                ZonedDateTime.ofStrict(LocalDateTime.of(2016, 10, 30, 2, 30), ZoneOffset.ofHours(2), PARIS)],
            [INSTANT_OFFSETSECONDS_ZONE, '2016-10-30T01:30:00Z 3600 Europe/Paris',
                ZonedDateTime.ofStrict(LocalDateTime.of(2016, 10, 30, 2, 30), ZoneOffset.ofHours(1), PARIS)],
        ];
    }

    it('test_parse_instantZones_ZDT', () => {
        dataProviderTest(data_instantZones, (formatter, text, expected) => {
            const actual = formatter.parse(text);
            assertEquals(ZonedDateTime.from(actual), expected);
        });
    });

    it('test_parse_instantZones_LDT', () => {
        dataProviderTest(data_instantZones, (formatter, text, expected) => {
            const actual = formatter.parse(text);
            assertEquals(LocalDateTime.from(actual), expected.toLocalDateTime());
        });
    });

    it('test_parse_instantZones_Instant', () => {
        dataProviderTest(data_instantZones, (formatter, text, expected) => {
            const actual = formatter.parse(text);
            assertEquals(Instant.from(actual), expected.toInstant());
        });
    });

    it('test_parse_instantZones_supported', () => {
        dataProviderTest(data_instantZones, (formatter, text) => {
            const actual = formatter.parse(text);
            assertEquals(actual.isSupported(INSTANT_SECONDS), true);
            assertEquals(actual.isSupported(EPOCH_DAY), true);
            assertEquals(actual.isSupported(SECOND_OF_DAY), true);
            assertEquals(actual.isSupported(NANO_OF_SECOND), true);
            assertEquals(actual.isSupported(MICRO_OF_SECOND), true);
            assertEquals(actual.isSupported(MILLI_OF_SECOND), true);
        });
    });

    //-----------------------------------------------------------------------
    // @DataProvider(name = "instantNoZone")
    function data_instantNoZone() {
        return [
            [INSTANT, '2014-06-30T01:02:03Z', ZonedDateTime.of(2014, 6, 30, 1, 2, 3, 0, ZoneOffset.UTC).toInstant()],
            [INSTANTSECONDS, '86402', Instant.ofEpochSecond(86402)],
            [INSTANTSECONDS_NOS, '86402.123456789', Instant.ofEpochSecond(86402, 123456789)],
        ];
    }

    it('test_parse_instantNoZone_ZDT', () => {
        dataProviderTest(data_instantNoZone, (formatter, text) => {
            const actual = formatter.parse(text);
            expect(() => ZonedDateTime.from(actual)).to.throw(DateTimeException);
        });
    });

    it('test_parse_instantNoZone_LDT', () => {
        dataProviderTest(data_instantNoZone, (formatter, text) => {
            const actual = formatter.parse(text);
            expect(() => LocalDateTime.from(actual)).to.throw(DateTimeException);
        });
    });

    it('test_parse_instantNoZone_Instant', () => {
        dataProviderTest(data_instantNoZone, (formatter, text, expected) => {
            const actual = formatter.parse(text);
            assertEquals(Instant.from(actual), expected);
        });
    });

    it('test_parse_instantNoZone_supported', () => {
        dataProviderTest(data_instantNoZone, (formatter, text) => {
            const actual = formatter.parse(text);
            assertEquals(actual.isSupported(INSTANT_SECONDS), true);
            assertEquals(actual.isSupported(EPOCH_DAY), false);
            assertEquals(actual.isSupported(SECOND_OF_DAY), false);
            assertEquals(actual.isSupported(NANO_OF_SECOND), true);
            assertEquals(actual.isSupported(MICRO_OF_SECOND), true);
            assertEquals(actual.isSupported(MILLI_OF_SECOND), true);
        });
    });

    //-----------------------------------------------------------------------
    it('test_parse_fromField_InstantSeconds', () => {
        const fmt = new DateTimeFormatterBuilder()
            .appendValue(INSTANT_SECONDS).toFormatter();
        const acc = fmt.parse('86402');
        const expected = Instant.ofEpochSecond(86402);
        assertEquals(acc.isSupported(INSTANT_SECONDS), true);
        assertEquals(acc.isSupported(NANO_OF_SECOND), true);
        assertEquals(acc.isSupported(MICRO_OF_SECOND), true);
        assertEquals(acc.isSupported(MILLI_OF_SECOND), true);
        assertEquals(acc.getLong(INSTANT_SECONDS), 86402);
        assertEquals(acc.getLong(NANO_OF_SECOND), 0);
        assertEquals(acc.getLong(MICRO_OF_SECOND), 0);
        assertEquals(acc.getLong(MILLI_OF_SECOND), 0);
        assertEquals(Instant.from(acc), expected);
    });

    it('test_parse_fromField_InstantSeconds_NanoOfSecond', () => {
        const fmt = new DateTimeFormatterBuilder()
            .appendValue(INSTANT_SECONDS).appendLiteral('.').appendValue(NANO_OF_SECOND).toFormatter();
        const acc = fmt.parse('86402.123456789');
        const expected = Instant.ofEpochSecond(86402, 123456789);
        assertEquals(acc.isSupported(INSTANT_SECONDS), true);
        assertEquals(acc.isSupported(NANO_OF_SECOND), true);
        assertEquals(acc.isSupported(MICRO_OF_SECOND), true);
        assertEquals(acc.isSupported(MILLI_OF_SECOND), true);
        assertEquals(acc.getLong(INSTANT_SECONDS), 86402);
        assertEquals(acc.getLong(NANO_OF_SECOND), 123456789);
        assertEquals(acc.getLong(MICRO_OF_SECOND), 123456);
        assertEquals(acc.getLong(MILLI_OF_SECOND), 123);
        assertEquals(Instant.from(acc), expected);
    });

    it('test_parse_fromField_SecondOfDay', () => {
        const fmt = new DateTimeFormatterBuilder()
            .appendValue(SECOND_OF_DAY).toFormatter();
        const acc = fmt.parse('864');
        assertEquals(acc.isSupported(SECOND_OF_DAY), true);
        assertEquals(acc.isSupported(NANO_OF_SECOND), true);
        assertEquals(acc.isSupported(MICRO_OF_SECOND), true);
        assertEquals(acc.isSupported(MILLI_OF_SECOND), true);
        assertEquals(acc.getLong(SECOND_OF_DAY), 864);
        assertEquals(acc.getLong(NANO_OF_SECOND), 0);
        assertEquals(acc.getLong(MICRO_OF_SECOND), 0);
        assertEquals(acc.getLong(MILLI_OF_SECOND), 0);
    });

    it('test_parse_fromField_SecondOfDay_NanoOfSecond', () => {
        const fmt = new DateTimeFormatterBuilder()
            .appendValue(SECOND_OF_DAY).appendLiteral('.').appendValue(NANO_OF_SECOND).toFormatter();
        const acc = fmt.parse('864.123456789');
        assertEquals(acc.isSupported(SECOND_OF_DAY), true);
        assertEquals(acc.isSupported(NANO_OF_SECOND), true);
        assertEquals(acc.isSupported(MICRO_OF_SECOND), true);
        assertEquals(acc.isSupported(MILLI_OF_SECOND), true);
        assertEquals(acc.getLong(SECOND_OF_DAY), 864);
        assertEquals(acc.getLong(NANO_OF_SECOND), 123456789);
        assertEquals(acc.getLong(MICRO_OF_SECOND), 123456);
        assertEquals(acc.getLong(MILLI_OF_SECOND), 123);
    });

    it('test_parse_fromField_SecondOfMinute', () => {
        const fmt = new DateTimeFormatterBuilder()
            .appendValue(SECOND_OF_MINUTE).toFormatter();
        const acc = fmt.parse('32');
        assertEquals(acc.isSupported(SECOND_OF_MINUTE), true);
        assertEquals(acc.isSupported(NANO_OF_SECOND), true);
        assertEquals(acc.isSupported(MICRO_OF_SECOND), true);
        assertEquals(acc.isSupported(MILLI_OF_SECOND), true);
        assertEquals(acc.getLong(SECOND_OF_MINUTE), 32);
        assertEquals(acc.getLong(NANO_OF_SECOND), 0);
        assertEquals(acc.getLong(MICRO_OF_SECOND), 0);
        assertEquals(acc.getLong(MILLI_OF_SECOND), 0);
    });

    it('test_parse_fromField_SecondOfMinute_NanoOfSecond', () => {
        const fmt = new DateTimeFormatterBuilder()
            .appendValue(SECOND_OF_MINUTE).appendLiteral('.').appendValue(NANO_OF_SECOND).toFormatter();
        const acc = fmt.parse('32.123456789');
        assertEquals(acc.isSupported(SECOND_OF_MINUTE), true);
        assertEquals(acc.isSupported(NANO_OF_SECOND), true);
        assertEquals(acc.isSupported(MICRO_OF_SECOND), true);
        assertEquals(acc.isSupported(MILLI_OF_SECOND), true);
        assertEquals(acc.getLong(SECOND_OF_MINUTE), 32);
        assertEquals(acc.getLong(NANO_OF_SECOND), 123456789);
        assertEquals(acc.getLong(MICRO_OF_SECOND), 123456);
        assertEquals(acc.getLong(MILLI_OF_SECOND), 123);
    });

});

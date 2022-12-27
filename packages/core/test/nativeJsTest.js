/*
 * @copyright (c) 2022, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';
import { assertEquals, assertFalse, assertTrue } from './testUtils';

import './_init';

import { nativeJs } from '../src/nativeJs';

import { Instant } from '../src/Instant';
import { LocalDate } from '../src/LocalDate';
import { LocalTime } from '../src/LocalTime';
import { LocalDateTime } from '../src/LocalDateTime';
import { ZoneId } from '../src/ZoneId';
import { ZoneOffset } from '../src/ZoneOffset';
import { ZonedDateTime } from '../src/ZonedDateTime';
import { ChronoField } from '../src/temporal/ChronoField';
import { ChronoUnit } from '../src/temporal/ChronoUnit';
import { IsoFields } from '../src/temporal/IsoFields';

describe('nativeJs', () => {

    it('should create a LocalDate from native js Date instance', () => {
        const jsDate = new Date('2016-02-29T00:00:00Z');
        const testData = [
            [new Date('2016-02-29T00:00:00Z'), LocalDate.parse('2016-02-29')],
            [new Date(jsDate.getTime() - 1), LocalDate.parse('2016-02-28')],
            [new Date(jsDate.getTime() + 24 * 60 * 60 * 1000 - 1), LocalDate.parse('2016-02-29')],
            [new Date(jsDate.getTime() + 24 * 60 * 60 * 1000), LocalDate.parse('2016-03-01')]
        ];
        for (const [jsDate, expectedLocalDate] of testData) {
            const d = LocalDate.from(nativeJs(jsDate, ZoneOffset.UTC));
            assertEquals(d, expectedLocalDate);
        }
    });

    it('should create a LocalTime from native js Date instance', () => {
        const jsDate = new Date('2016-02-29T12:00:00Z');
        const testData = [
            [new Date('2016-02-29T12:00:00Z'), LocalTime.NOON],
            [new Date(jsDate.getTime() - 1), LocalTime.parse('11:59:59.999')],
            [new Date(jsDate.getTime() + 12 * 60 * 60 * 1000), LocalTime.parse('00:00:00')],
            [new Date(jsDate.getTime() + 12 * 60 * 60 * 1000 - 1), LocalTime.parse('23:59:59.999')]
        ];
        for (const [jsDate, expectedLocalTime] of testData) {
            const d = LocalTime.from(nativeJs(jsDate, ZoneOffset.UTC));
            assertEquals(d, expectedLocalTime);
        }
    });

    it('should create a LocalDateTime from native js Date instance', () => {
        const jsDate = new Date('2016-02-29T00:00:00Z');
        const testData = [
            [new Date('2016-02-29T00:00:00Z'), LocalDateTime.parse('2016-02-29T00:00:00')],
            [new Date(jsDate.getTime() - 1), LocalDateTime.parse('2016-02-28T23:59:59.999')],
            [new Date(jsDate.getTime() + 24 * 60 * 60 * 1000 - 1), LocalDateTime.parse('2016-02-29T23:59:59.999')],
            [new Date(jsDate.getTime() + 24 * 60 * 60 * 1000), LocalDate.parse('2016-03-01').atStartOfDay()]
        ];
        for (const [jsDate, expectedLocalDateTime] of testData) {
            const d = LocalDateTime.from(nativeJs(jsDate, ZoneOffset.UTC));
            assertEquals(d, expectedLocalDateTime);
        }
    });

    it('should create an Instant from native js Date instance', () => {
        const leapDayEpochMilli = new Date('2016-02-29T00:00:00Z').getTime();
        const testData = [
            [new Date(0), Instant.parse('1970-01-01T00:00:00Z')],
            [new Date(leapDayEpochMilli), Instant.parse('2016-02-29T00:00:00Z')],
            [new Date(leapDayEpochMilli - 1), Instant.parse('2016-02-28T23:59:59.999Z')],
            [new Date(leapDayEpochMilli + 24 * 60 * 60 * 1000 - 1), Instant.parse('2016-02-29T23:59:59.999Z')],
            [new Date(leapDayEpochMilli + 24 * 60 * 60 * 1000), Instant.parse('2016-03-01T00:00:00Z')]
        ];
        for (const [jsDate, expectedInstant] of testData) {
            const i = Instant.from(nativeJs(jsDate, ZoneOffset.UTC));
            assertEquals(i, expectedInstant);
        }
    });

    it('should create a LocalDateTime with the default time zone', () => {
        const testData = [
            // winter time
            '2016-12-21T00:00:00',
            // summer time
            '2016-06-21T00:00:00',
        ];
        for (const isoDateString of testData) {
            const jsDate = new Date(`${isoDateString}Z`);
            const dtn = LocalDateTime.from(nativeJs(jsDate));
            const dtl = LocalDateTime.parse(isoDateString);
            const duration = dtn.until(dtl, ChronoUnit.MINUTES);
            expect(duration).to.equal(jsDate.getTimezoneOffset());
        }
    });

    it('should create a ZonedDateTime from native js Date instance', () => {
        const jsDate = new Date('2016-02-29T00:00:00Z');
        const testData = [
            [new Date('2016-02-29T00:00:00Z'), ZonedDateTime.parse('2016-02-29T00:00:00Z')],
            [new Date(jsDate.getTime() - 1), ZonedDateTime.parse('2016-02-28T23:59:59.999Z')],
            [new Date(jsDate.getTime() + 24 * 60 * 60 * 1000 - 1), ZonedDateTime.parse('2016-02-29T23:59:59.999Z')],
            [new Date(jsDate.getTime() + 24 * 60 * 60 * 1000), LocalDate.parse('2016-03-01').atStartOfDay().atZone(ZoneId.UTC)]
        ];
        for (const [jsDate, expectedLocalDateTime] of testData) {
            const d = ZonedDateTime.from(nativeJs(jsDate, ZoneOffset.UTC));
            assertEquals(d, expectedLocalDateTime);
        }
    });

    it('should support all chrono fields', () => {
        const temporalAccessor = nativeJs(new Date(0));
        const testData = [
            ChronoField.NANO_OF_SECOND,
            ChronoField.NANO_OF_DAY,
            ChronoField.MICRO_OF_SECOND,
            ChronoField.MICRO_OF_DAY,
            ChronoField.MILLI_OF_SECOND,
            ChronoField.MILLI_OF_DAY,
            ChronoField.SECOND_OF_MINUTE,
            ChronoField.SECOND_OF_DAY,
            ChronoField.MINUTE_OF_HOUR,
            ChronoField.MINUTE_OF_DAY,
            ChronoField.HOUR_OF_AMPM,
            ChronoField.CLOCK_HOUR_OF_AMPM,
            ChronoField.HOUR_OF_DAY,
            ChronoField.CLOCK_HOUR_OF_DAY,
            ChronoField.AMPM_OF_DAY,
            ChronoField.DAY_OF_WEEK,
            ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH,
            ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR,
            ChronoField.DAY_OF_MONTH,
            ChronoField.DAY_OF_YEAR,
            ChronoField.EPOCH_DAY,
            ChronoField.ALIGNED_WEEK_OF_MONTH,
            ChronoField.ALIGNED_WEEK_OF_YEAR,
            ChronoField.MONTH_OF_YEAR,
            ChronoField.PROLEPTIC_MONTH,
            ChronoField.YEAR_OF_ERA,
            ChronoField.YEAR,
            ChronoField.ERA,
            ChronoField.INSTANT_SECONDS,
            ChronoField.OFFSET_SECONDS,
        ];
        for (const temporalField of testData) {
            assertTrue(temporalAccessor.isSupported(temporalField));
        }
    });

    it('should support all iso fields', () => {
        const temporalAccessor = nativeJs(new Date(0));
        const testData = [
            IsoFields.DAY_OF_QUARTER,
            IsoFields.QUARTER_OF_YEAR,
            IsoFields.WEEK_OF_WEEK_BASED_YEAR,
            IsoFields.WEEK_BASED_YEAR,
        ];
        for (const temporalField of testData) {
            assertTrue(temporalAccessor.isSupported(temporalField));
        }
    });

    it('should support all finite chrono units', () => {
        const temporalAccessor = nativeJs(new Date(0));
        const testData = [
            ChronoUnit.NANOS,
            ChronoUnit.MICROS,
            ChronoUnit.MILLIS,
            ChronoUnit.SECONDS,
            ChronoUnit.MINUTES,
            ChronoUnit.HOURS,
            ChronoUnit.HALF_DAYS,
            ChronoUnit.DAYS,
            ChronoUnit.WEEKS,
            ChronoUnit.MONTHS,
            ChronoUnit.YEARS,
            ChronoUnit.DECADES,
            ChronoUnit.CENTURIES,
            ChronoUnit.MILLENNIA,
            ChronoUnit.ERAS,
        ];
        for (const chronoUnit of testData) {
            assertTrue(temporalAccessor.isSupported(chronoUnit));
        }
    });

    it('should support all iso units', () => {
        const temporalAccessor = nativeJs(new Date(0));
        const testData = [
            IsoFields.WEEK_BASED_YEARS,
            IsoFields.QUARTER_YEARS,
        ];
        for (const chronoUnit of testData) {
            assertTrue(temporalAccessor.isSupported(chronoUnit));
        }
    });

    it('should support no infinite chrono units', () => {
        const temporalAccessor = nativeJs(new Date(0));
        const testData = [
            ChronoUnit.FOREVER,
        ];
        for (const chronoUnit of testData) {
            assertFalse(temporalAccessor.isSupported(chronoUnit));
        }
    });
});

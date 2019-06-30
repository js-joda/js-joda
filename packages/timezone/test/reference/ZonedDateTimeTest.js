/*
 * @copyright (c) 2016-present, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import { expect } from 'chai';

import {
    LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Instant,
    Year, Month,
    ZoneId, ZoneOffset,
    DateTimeFormatter,
    NullPointerException, DateTimeException
} from '@js-joda/core';

import { assertEquals, dataProviderTest } from '../testUtils';
import '../useMomentZoneRules';


describe('org.threeten.bp.TestZonedDateTime', () => {
    const OFFSET_0100 = ZoneOffset.ofHours(1);
    const OFFSET_0200 = ZoneOffset.ofHours(2);
    const OFFSET_0130 = ZoneOffset.ofHoursMinutes(1, 30);

    const ZONE_0100 = OFFSET_0100;
    const ZONE_0200 = OFFSET_0200;
    const ZONE_BERLIN = ZoneId.of('Europe/Berlin');
    const ZONE_NEW_YORK = ZoneId.of('America/New_York');
    let TEST_PARIS_GAP_2008_03_30_02_30;
    let TEST_PARIS_OVERLAP_2008_10_26_02_30;
    let TEST_LOCAL_2008_06_30_11_30_59_500;
    let TEST_DATE_TIME;

    beforeEach(function () {
        TEST_LOCAL_2008_06_30_11_30_59_500 = LocalDateTime.of(2008, 6, 30, 11, 30, 59, 500);
        TEST_DATE_TIME = ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500, ZONE_0100);
        TEST_PARIS_OVERLAP_2008_10_26_02_30 = LocalDateTime.of(2008, 10, 26, 2, 30);
        TEST_PARIS_GAP_2008_03_30_02_30 = LocalDateTime.of(2008, 3, 30, 2, 30);
    });

    describe('of(LocalDateTime, ZoneId)', function () {

        it('factory_of_LocalDateTime', () => {
            const base = LocalDateTime.of(2008, 6, 30, 11, 30, 10, 500);
            const test = ZonedDateTime.of(base, ZONE_BERLIN);
            check(test, 2008, 6, 30, 11, 30, 10, 500, OFFSET_0200, ZONE_BERLIN);
        });

        it('factory_of_LocalDateTime_nullDateTime', () => {
            expect(() => {
                ZonedDateTime.of(null, ZONE_BERLIN);
            }).to.throw(NullPointerException);
        });

        it('factory_of_LocalDateTime_nullZone', () => {
            expect(() => {
                const base = LocalDateTime.of(2008, 6, 30, 11, 30, 10, 500);
                ZonedDateTime.of(base, null);
            }).to.throw(NullPointerException);
        });
    });

    describe('ofInstant(Instant, ZoneId)', function () {

        it('factory_ofInstant_Instant_ZR', () => {
            const instant = LocalDateTime.of(2008, 6, 30, 11, 30, 10, 35).toInstant(OFFSET_0200);
            const test = ZonedDateTime.ofInstant(instant, ZONE_BERLIN);
            check(test, 2008, 6, 30, 11, 30, 10, 35, OFFSET_0200, ZONE_BERLIN);
        });

        it('factory_ofInstant_Instant_ZO', () => {
            const instant = LocalDateTime.of(2008, 6, 30, 11, 30, 10, 45).toInstant(OFFSET_0200);
            const test = ZonedDateTime.ofInstant(instant, OFFSET_0200);
            check(test, 2008, 6, 30, 11, 30, 10, 45, OFFSET_0200, OFFSET_0200);
        });

        it('factory_ofInstant_Instant_inGap', () => {
            const instant = TEST_PARIS_GAP_2008_03_30_02_30.toInstant(OFFSET_0100);
            const test = ZonedDateTime.ofInstant(instant, ZONE_BERLIN);
            check(test, 2008, 3, 30, 3, 30, 0, 0, OFFSET_0200, ZONE_BERLIN);  // one hour later in summer offset
        });

        it('factory_ofInstant_Instant_inOverlap_earlier', () => {
            const instant = TEST_PARIS_OVERLAP_2008_10_26_02_30.toInstant(OFFSET_0200);
            const test = ZonedDateTime.ofInstant(instant, ZONE_BERLIN);
            check(test, 2008, 10, 26, 2, 30, 0, 0, OFFSET_0200, ZONE_BERLIN);  // same time and offset
        });

        it('factory_ofInstant_Instant_inOverlap_later', () => {
            const instant = TEST_PARIS_OVERLAP_2008_10_26_02_30.toInstant(OFFSET_0100);
            const test = ZonedDateTime.ofInstant(instant, ZONE_BERLIN);
            check(test, 2008, 10, 26, 2, 30, 0, 0, OFFSET_0100, ZONE_BERLIN);  // same time and offset
        });

        it('factory_ofInstant_Instant_invalidOffset', () => {
            const instant = LocalDateTime.of(2008, 6, 30, 11, 30, 10, 500).toInstant(OFFSET_0130);
            const test = ZonedDateTime.ofInstant(instant, ZONE_BERLIN);
            check(test, 2008, 6, 30, 12, 0, 10, 500, OFFSET_0200, ZONE_BERLIN);  // corrected offset, thus altered time
        });

        describe('ofStrict(LocalDateTime, ZoneId, ZoneOffset)', function () {

            it('factory_ofStrict_LDT_ZI_ZO', () => {
                const normal = LocalDateTime.of(2008, 6, 30, 11, 30, 10, 500);
                const test = ZonedDateTime.ofStrict(normal, OFFSET_0200, ZONE_BERLIN);
                check(test, 2008, 6, 30, 11, 30, 10, 500, OFFSET_0200, ZONE_BERLIN);
            });

            it('factory_ofStrict_LDT_ZI_ZO_inGap()', () => {
                expect(() => {
                    try {
                        ZonedDateTime.ofStrict(TEST_PARIS_GAP_2008_03_30_02_30, OFFSET_0100, ZONE_BERLIN);
                    } catch (ex) {
                        expect(ex.message).contains(' gap');
                        throw ex;
                    }
                }).to.throw(DateTimeException);
            });

            it('factory_ofStrict_LDT_ZI_ZO_inOverlap_invalidOfset()', () => {
                expect(() => {
                    try {
                        ZonedDateTime.ofStrict(TEST_PARIS_OVERLAP_2008_10_26_02_30, OFFSET_0130, ZONE_BERLIN);
                    } catch (ex) {
                        expect(ex.message).contains(' is not valid for ');
                        throw ex;
                    }
                }).to.throw(DateTimeException);
            });

            it('factory_ofStrict_LDT_ZI_ZO_invalidOffset()', () => {
                expect(() => {
                    try {
                        ZonedDateTime.ofStrict(TEST_LOCAL_2008_06_30_11_30_59_500, OFFSET_0130, ZONE_BERLIN);
                    } catch (ex) {
                        expect(ex.message).contains(' is not valid for ');
                        throw ex;
                    }
                }).to.throw(DateTimeException);
            });

            it('factory_ofStrict_LDT_ZI_ZO_nullLDT', () => {
                expect(() => {
                    ZonedDateTime.ofStrict(null, OFFSET_0100, ZONE_BERLIN);
                }).to.throw(NullPointerException);
            });

            it('factory_ofStrict_LDT_ZI_ZO_nullZO', () => {
                expect(() => {
                    ZonedDateTime.ofStrict(TEST_LOCAL_2008_06_30_11_30_59_500, null, ZONE_BERLIN);
                }).to.throw(NullPointerException);
            });

            it('factory_ofStrict_LDT_ZI_ZO_nullZI', () => {
                expect(() => {
                    ZonedDateTime.ofStrict(TEST_LOCAL_2008_06_30_11_30_59_500, OFFSET_0100, null);
                }).to.throw(NullPointerException);
            });

        });

        describe('parse(DateTimeFormatter)', () => {

            it('factory_parse_formatter', function () {
                const f = DateTimeFormatter.ofPattern('u M d H m s VV');
                const test = ZonedDateTime.parse('2010 12 3 11 30 0 Europe/London', f);
                assertEquals(test, ZonedDateTime.of(LocalDateTime.of(2010, 12, 3, 11, 30), ZoneId.of('Europe/London')));
            });

            it('factory_parse_formatter_nullText', () => {
                expect(() => {
                    const f = DateTimeFormatter.ISO_ZONED_DATE_TIME;
                    ZonedDateTime.parse(null, f);
                }).to.throw(NullPointerException);
            });

            it('factory_parse_formatter_nullFormatter', () => {
                expect(() => {
                    ZonedDateTime.parse('ANY', null);
                }).to.throw(NullPointerException);
            });

            context('parse during dst', function () {
                const data_dst_samples = [
                    // overlap
                    ['2017-11-05T01:00:00-07:00[America/Los_Angeles]', '2017-11-05T08:00:00Z'],
                    ['2017-11-05T01:00:00-08:00[America/Los_Angeles]', '2017-11-05T09:00:00Z'],
                    ['2017-11-05T02:00:00-08:00[America/Los_Angeles]', '2017-11-05T10:00:00Z'],

                    ['2016-11-06T01:00-04:00[America/New_York]', '2016-11-06T05:00:00Z'],
                    ['2016-11-06T01:00-05:00[America/New_York]', '2016-11-06T06:00:00Z'],
                    ['2016-11-06T01:30-04:00[America/New_York]', '2016-11-06T05:30:00Z'],
                    ['2016-11-06T01:30-05:00[America/New_York]', '2016-11-06T06:30:00Z'],
                    ['2016-11-06T02:00-04:00[America/New_York]', '2016-11-06T06:00:00Z'],
                    ['2016-11-06T02:00-05:00[America/New_York]', '2016-11-06T07:00:00Z'],

                    ['2016-10-30T02:00+02:00[Europe/Berlin]', '2016-10-30T00:00:00Z'],
                    ['2016-10-30T02:00+03:00[Europe/Berlin]', '2016-10-29T23:00:00Z'],
                    ['2016-10-30T02:30+02:00[Europe/Berlin]', '2016-10-30T00:30:00Z'],
                    ['2016-10-30T02:30+03:00[Europe/Berlin]', '2016-10-29T23:30:00Z'],
                    ['2016-10-30T03:00+02:00[Europe/Berlin]', '2016-10-30T01:00:00Z'],
                    ['2016-10-30T03:00+03:00[Europe/Berlin]', '2016-10-30T00:00:00Z'],
                ];

                it('should parse dst situation to expected point in timeline', () => {
                    dataProviderTest(data_dst_samples, (zonedIsoString, instantIsoString) => {
                        const base = ZonedDateTime.parse(zonedIsoString);
                        assertEquals(base.toInstant(), Instant.parse(instantIsoString));
                    });
                });
            });

        });

        // @DataProvider(name="sampleTimes")
        function provider_sampleTimes() {
            return [
                [2008, 6, 30, 11, 30, 20, 500, ZONE_0100],
                [2008, 6, 30, 11, 0, 0, 0, ZONE_0100],
                [2008, 6, 30, 11, 30, 20, 500, ZONE_BERLIN],
                [2008, 6, 30, 11, 0, 0, 0, ZONE_BERLIN],
                [2008, 6, 30, 23, 59, 59, 999999999, ZONE_0100],
                [-1, 1, 1, 0, 0, 0, 0, ZONE_0100]
            ];
        }

        describe('basics', () => {

            // @Test(dataProvider="sampleTimes")
            it('test_get', () => {
                dataProviderTest(provider_sampleTimes, (y, o, d, h, m, s, n, zone) => {
                    const localDate = LocalDate.of(y, o, d);
                    const localTime = LocalTime.of(h, m, s, n);
                    const localDateTime = LocalDateTime.of(localDate, localTime);
                    const offset = zone.rules().offset(localDateTime);
                    const a = ZonedDateTime.of(localDateTime, zone);

                    assertEquals(a.year(), localDate.year());
                    assertEquals(a.month(), localDate.month());
                    assertEquals(a.dayOfMonth(), localDate.dayOfMonth());
                    assertEquals(a.dayOfYear(), localDate.dayOfYear());
                    assertEquals(a.dayOfWeek(), localDate.dayOfWeek());

                    assertEquals(a.hour(), localTime.hour());
                    assertEquals(a.minute(), localTime.minute());
                    assertEquals(a.second(), localTime.second());
                    assertEquals(a.nano(), localTime.nano());

                    assertEquals(a.toLocalDate(), localDate);
                    assertEquals(a.toLocalTime(), localTime);
                    assertEquals(a.toLocalDateTime(), localDateTime);
                    if (zone instanceof ZoneOffset) {
                        assertEquals(a.toString(), localDateTime.toString() + offset.toString());
                    } else {
                        assertEquals(a.toString(), localDateTime.toString() + offset.toString() + '[' + zone.toString() + ']');
                    }
                });

            });

        });

        describe('withEarlierOffsetAtOverlap()', () => {

            it('test_withEarlierOffsetAtOverlap_notAtOverlap', () => {
                const base = ZonedDateTime.ofStrict(TEST_LOCAL_2008_06_30_11_30_59_500, OFFSET_0200, ZONE_BERLIN);
                const test = base.withEarlierOffsetAtOverlap();
                assertEquals(test, base);  // not changed
            });

            it('test_withEarlierOffsetAtOverlap_atOverlap', () => {
                const base = ZonedDateTime.ofStrict(TEST_PARIS_OVERLAP_2008_10_26_02_30, OFFSET_0100, ZONE_BERLIN);
                const test = base.withEarlierOffsetAtOverlap();
                assertEquals(test.offset(), OFFSET_0200);  // offset changed to earlier
                assertEquals(test.toLocalDateTime(), base.toLocalDateTime());  // date-time not changed
            });

            it('test_withEarlierOffsetAtOverlap_atOverlap_noChange', () => {
                const base = ZonedDateTime.ofStrict(TEST_PARIS_OVERLAP_2008_10_26_02_30, OFFSET_0200, ZONE_BERLIN);
                const test = base.withEarlierOffsetAtOverlap();
                assertEquals(test, base);  // not changed
            });

        });

        describe('withLaterOffsetAtOverlap()', () => {

            it('test_withLaterOffsetAtOverlap_notAtOverlap', () => {
                const base = ZonedDateTime.ofStrict(TEST_LOCAL_2008_06_30_11_30_59_500, OFFSET_0200, ZONE_BERLIN);
                const test = base.withLaterOffsetAtOverlap();
                assertEquals(test, base);  // not changed
            });

            it('test_withLaterOffsetAtOverlap_atOverlap', () => {
                const base = ZonedDateTime.ofStrict(TEST_PARIS_OVERLAP_2008_10_26_02_30, OFFSET_0200, ZONE_BERLIN);
                const test = base.withLaterOffsetAtOverlap();
                assertEquals(test.offset(), OFFSET_0100);  // offset changed to later
                assertEquals(test.toLocalDateTime(), base.toLocalDateTime());  // date-time not changed
            });

            it('test_withLaterOffsetAtOverlap_atOverlap_noChange', () => {
                const base = ZonedDateTime.ofStrict(TEST_PARIS_OVERLAP_2008_10_26_02_30, OFFSET_0100, ZONE_BERLIN);
                const test = base.withLaterOffsetAtOverlap();
                assertEquals(test, base);  // not changed
            });

        });

        describe('withZoneSameLocal(ZoneId)', () => {

            it('test_withZoneSameLocal', () => {
                const ldt = LocalDateTime.of(2008, 6, 30, 23, 30, 59, 0);
                const base = ZonedDateTime.of(ldt, ZONE_0100);
                const test = base.withZoneSameLocal(ZONE_0200);
                assertEquals(test.toLocalDateTime(), base.toLocalDateTime());
            });

            it('test_withZoneSameLocal_noChange', () => {
                const ldt = LocalDateTime.of(2008, 6, 30, 23, 30, 59, 0);
                const base = ZonedDateTime.of(ldt, ZONE_0100);
                const test = base.withZoneSameLocal(ZONE_0100);
                assertEquals(test, base);
            });

            it('test_withZoneSameLocal_retainOffset1()', () => {
                const ldt = LocalDateTime.of(2008, 11, 2, 1, 30, 59, 0);  // overlap
                const base = ZonedDateTime.of(ldt, ZoneId.of('UTC-04:00'));
                const test = base.withZoneSameLocal(ZONE_NEW_YORK);
                assertEquals(base.offset(), ZoneOffset.ofHours(-4));
                assertEquals(test.offset(), ZoneOffset.ofHours(-4));
            });

            it('test_withZoneSameLocal_retainOffset2()', () => {
                const ldt = LocalDateTime.of(2008, 11, 2, 1, 30, 59, 0);  // overlap
                const base = ZonedDateTime.of(ldt, ZoneId.of('UTC-05:00'));
                const test = base.withZoneSameLocal(ZONE_NEW_YORK);
                assertEquals(base.offset(), ZoneOffset.ofHours(-5));
                assertEquals(test.offset(), ZoneOffset.ofHours(-5));
            });

            it('test_withZoneSameLocal_null', () => {
                expect(() => {
                    const ldt = LocalDateTime.of(2008, 6, 30, 23, 30, 59, 0);
                    const base = ZonedDateTime.of(ldt, ZONE_0100);
                    base.withZoneSameLocal(null);

                }).to.throw(NullPointerException);
            });

        });

        describe('withFixedOffsetZone()', () => {

            it('test_withZoneLocked', () => {
                const base = ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500, ZONE_BERLIN);
                const test = base.withFixedOffsetZone();
                const expected = ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500, ZONE_0200);
                assertEquals(test, expected);
            });

        });

        describe('with(WithAdjuster)', () => {

            it('test_with_WithAdjuster_LocalDateTime_sameOffset', () => {
                const base = ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500, ZONE_BERLIN);
                const test = base.with(LocalDateTime.of(2012, 7, 15, 14, 30));
                check(test, 2012, 7, 15, 14, 30, 0, 0, OFFSET_0200, ZONE_BERLIN);
            });

            it('test_with_WithAdjuster_LocalDateTime_adjustedOffset', () => {
                const base = ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500, ZONE_BERLIN);
                const test = base.with(LocalDateTime.of(2012, 1, 15, 14, 30));
                check(test, 2012, 1, 15, 14, 30, 0, 0, OFFSET_0100, ZONE_BERLIN);
            });

            it('test_with_WithAdjuster_LocalDate', () => {
                const base = ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500, ZONE_BERLIN);
                const test = base.with(LocalDate.of(2012, 7, 28));
                check(test, 2012, 7, 28, 11, 30, 59, 500, OFFSET_0200, ZONE_BERLIN);
            });

            it('test_with_WithAdjuster_LocalTime', () => {
                const base = ZonedDateTime.of(TEST_PARIS_OVERLAP_2008_10_26_02_30, ZONE_BERLIN);
                const test = base.with(LocalTime.of(2, 29));
                check(test, 2008, 10, 26, 2, 29, 0, 0, OFFSET_0200, ZONE_BERLIN);
            });

            it('test_with_WithAdjuster_Year', () => {
                const ldt = LocalDateTime.of(2008, 6, 30, 23, 30, 59, 0);
                const base = ZonedDateTime.of(ldt, ZONE_0100);
                const test = base.with(Year.of(2007));
                assertEquals(test, ZonedDateTime.of(ldt.withYear(2007), ZONE_0100));
            });

            it('test_with_WithAdjuster_Month_adjustedDayOfMonth', () => {
                const base = ZonedDateTime.of(LocalDateTime.of(2012, 7, 31, 0, 0), ZONE_BERLIN);
                const test = base.with(Month.JUNE);
                check(test, 2012, 6, 30, 0, 0, 0, 0, OFFSET_0200, ZONE_BERLIN);
            });

            it('test_with_WithAdjuster_Offset_same', () => {
                const base = ZonedDateTime.of(LocalDateTime.of(2012, 7, 31, 0, 0), ZONE_BERLIN);
                const test = base.with(ZoneOffset.ofHours(2));
                check(test, 2012, 7, 31, 0, 0, 0, 0, OFFSET_0200, ZONE_BERLIN);
            });

            it('test_with_WithAdjuster_Offset_ignored', () => {
                const base = ZonedDateTime.of(LocalDateTime.of(2012, 7, 31, 0, 0), ZONE_BERLIN);
                const test = base.with(ZoneOffset.ofHours(1));
                check(test, 2012, 7, 31, 0, 0, 0, 0, OFFSET_0200, ZONE_BERLIN);  // offset ignored
            });

            it('test_with_WithAdjuster_LocalDate_retainOffset1()', () => {
                const ldt = LocalDateTime.of(2008, 11, 1, 1, 30);
                const base = ZonedDateTime.of(ldt, ZONE_NEW_YORK);
                assertEquals(base.offset(), ZoneOffset.ofHours(-4));
                const test = base.with(LocalDate.of(2008, 11, 2));
                assertEquals(test.offset(), ZoneOffset.ofHours(-4));
            });

            it('test_with_WithAdjuster_LocalDate_retainOffset2()', () => {
                const newYork = ZONE_NEW_YORK;
                const ldt = LocalDateTime.of(2008, 11, 3, 1, 30);
                const base = ZonedDateTime.of(ldt, newYork);
                assertEquals(base.offset(), ZoneOffset.ofHours(-5));
                const test = base.with(LocalDate.of(2008, 11, 2));
                assertEquals(test.offset(), ZoneOffset.ofHours(-5));
            });

            it('test_with_WithAdjuster_null', () => {
                expect(() => {
                    const base = ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500, ZONE_0100);
                    base.with(null);
                }).to.throw(NullPointerException);
            });

        });

        describe('withDayOfMonth()', () => {

            it('test_withDayOfMonth_normal', () => {
                const base = ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500, ZONE_0100);
                const test = base.withDayOfMonth(15);
                assertEquals(test, ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500.withDayOfMonth(15), ZONE_0100));
            });

            it('test_withDayOfMonth_noChange', () => {
                const base = ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500, ZONE_0100);
                const test = base.withDayOfMonth(30);
                assertEquals(test, base);
            });

            it('test_withDayOfMonth_tooBig', () => {
                expect(() => {
                    LocalDateTime.of(2007, 7, 2, 11, 30).atZone(ZONE_BERLIN).withDayOfMonth(32);
                }).to.throw(DateTimeException);
            });

            it('test_withDayOfMonth_tooSmall', () => {
                expect(() => {
                    TEST_DATE_TIME.withDayOfMonth(0);
                }).to.throw(DateTimeException);
            });

            it('test_withDayOfMonth_invalid31', () => {
                expect(() => {
                    LocalDateTime.of(2007, 6, 2, 11, 30).atZone(ZONE_BERLIN).withDayOfMonth(31);
                }).to.throw(DateTimeException);
            });

        });

        describe('withDayOfYear()', () => {

            it('test_withdayOfYear_normal', () => {
                const base = ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500, ZONE_0100);
                const test = base.withDayOfYear(33);
                assertEquals(test, ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500.withDayOfYear(33), ZONE_0100));
            });

            it('test_withdayOfYear_noChange', () => {
                const ldt = LocalDateTime.of(2008, 2, 5, 23, 30, 59, 0);
                const base = ZonedDateTime.of(ldt, ZONE_0100);
                const test = base.withDayOfYear(36);
                assertEquals(test, base);
            });

            it('test_withdayOfYear_tooBig', () => {
                expect(() => {
                    TEST_DATE_TIME.withDayOfYear(367);
                }).to.throw(DateTimeException);
            });

            it('test_withdayOfYear_tooSmall', () => {
                expect(() => {
                    TEST_DATE_TIME.withDayOfYear(0);
                }).to.throw(DateTimeException);
            });

            it('test_withdayOfYear_invalid366', () => {
                expect(() => {
                    LocalDateTime.of(2007, 2, 2, 11, 30).atZone(ZONE_BERLIN).withDayOfYear(366);
                }).to.throw(DateTimeException);
            });

        });

        describe('withMinute()', () => {

            it('test_withMinute_normal', () => {
                const base = ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500, ZONE_0100);
                const test = base.withMinute(15);
                assertEquals(test, ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500.withMinute(15), ZONE_0100));
            });

            it('test_withMinute_noChange', () => {
                const base = ZonedDateTime.of(TEST_LOCAL_2008_06_30_11_30_59_500, ZONE_0100);
                const test = base.withMinute(30);
                assertEquals(test, base);
            });

        });

        describe('format(DateTimeFormatter)', () => {

            it('test_format_formatter', () => {
                const f = DateTimeFormatter.ofPattern('y M d H m s');
                const t = ZonedDateTime.of(dateTime5(2010, 12, 3, 11, 30), ZONE_BERLIN).format(f);
                assertEquals(t, '2010 12 3 11 30 0');
            });

            it('test_format_formatter_null', () => {
                expect(() => {
                    ZonedDateTime.of(dateTime5(2010, 12, 3, 11, 30), ZONE_BERLIN).format(null);
                }).to.throw(NullPointerException);
            });
        });
    });
});

function check(test, y, m, d, h, min, s, n, offset, zone) {
    assertEquals(test.year(), y);
    assertEquals(test.month().value(), m);
    assertEquals(test.dayOfMonth(), d);
    assertEquals(test.hour(), h);
    assertEquals(test.minute(), min);
    assertEquals(test.second(), s);
    assertEquals(test.nano(), n);
    assertEquals(test.offset(), offset);
    assertEquals(test.zone(), zone);
}

function dateTime5(year, month, dayOfMonth, hour, minute) {
    return LocalDateTime.of(year, month, dayOfMonth, hour, minute);
}

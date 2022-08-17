/*
 * @copyright (c) 2022, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {
    ArithmeticException,
    ChronoUnit,
    DateTimeException,
    DateTimeParseException,
    LocalDate,
    NullPointerException,
    Period,
    TemporalAdjuster,
} from '@js-joda/core';

import '../_init';

import { assertEquals, assertFalse, assertThrows, assertTrue } from '../testUtils';

import { LocalDateRange } from '../../src/LocalDateRange';

describe('org.threeten.extra.TestLocalDateRange', () => {
    const MINP1 = LocalDate.MIN.plusDays(1);
    const MINP2 = LocalDate.MIN.plusDays(2);
    const MINP3 = LocalDate.MIN.plusDays(3);
    const MAXM1 = LocalDate.MAX.minusDays(1);
    const MAXM2 = LocalDate.MAX.minusDays(2);
    const DATE_2012_07_01 = LocalDate.of(2012, 7, 1);
    const DATE_2012_07_27 = LocalDate.of(2012, 7, 27);
    const DATE_2012_07_28 = LocalDate.of(2012, 7, 28);
    const DATE_2012_07_29 = LocalDate.of(2012, 7, 29);
    const DATE_2012_07_30 = LocalDate.of(2012, 7, 30);
    const DATE_2012_07_31 = LocalDate.of(2012, 7, 31);
    const DATE_2012_08_01 = LocalDate.of(2012, 8, 1);
    const DATE_2012_08_31 = LocalDate.of(2012, 8, 31);

    //-----------------------------------------------------------------------
    it('test_ALL', () => {
        const test = LocalDateRange.ALL;
        assertEquals(LocalDate.MIN, test.start());
        assertEquals(LocalDate.MAX, test.endInclusive());
        assertEquals(LocalDate.MAX, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(true, test.isUnboundedStart());
        assertEquals(true, test.isUnboundedEnd());
        assertEquals('-999999-01-01/+999999-12-31', test.toString());
    });

    //-----------------------------------------------------------------------
    it('test_of', () => {
        const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
        assertEquals(DATE_2012_07_28, test.start());
        assertEquals(DATE_2012_07_30, test.endInclusive());
        assertEquals(DATE_2012_07_31, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(false, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals(3, test.lengthInDays());
        assertEquals('2012-07-28/2012-07-31', test.toString());
    });

    it('test_of_MIN', () => {
        const test = LocalDateRange.of(LocalDate.MIN, DATE_2012_07_31);
        assertEquals(LocalDate.MIN, test.start());
        assertEquals(DATE_2012_07_30, test.endInclusive());
        assertEquals(DATE_2012_07_31, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(true, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals(true, Number.isNaN(test.lengthInDays()));
        assertEquals('-999999-01-01/2012-07-31', test.toString());
    });

    it('test_of_MAX', () => {
        const test = LocalDateRange.of(DATE_2012_07_28, LocalDate.MAX);
        assertEquals(DATE_2012_07_28, test.start());
        assertEquals(LocalDate.MAX, test.endInclusive());
        assertEquals(LocalDate.MAX, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(false, test.isUnboundedStart());
        assertEquals(true, test.isUnboundedEnd());
        assertEquals(true, Number.isNaN(test.lengthInDays()));
        assertEquals('2012-07-28/+999999-12-31', test.toString());
    });

    it('test_of_MIN_MAX', () => {
        const test = LocalDateRange.of(LocalDate.MIN, LocalDate.MAX);
        assertEquals(LocalDate.MIN, test.start());
        assertEquals(LocalDate.MAX, test.endInclusive());
        assertEquals(LocalDate.MAX, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(true, test.isUnboundedStart());
        assertEquals(true, test.isUnboundedEnd());
        assertEquals(true, Number.isNaN(test.lengthInDays()));
        assertEquals('-999999-01-01/+999999-12-31', test.toString());
    });

    it('test_of_MIN_MIN', () => {
        assertThrows(DateTimeException, () => LocalDateRange.of(LocalDate.MIN, LocalDate.MIN));
    });

    it('test_of_MIN_MINP1', () => {
        assertThrows(DateTimeException, () => LocalDateRange.of(LocalDate.MIN, MINP1));
    });

    it('test_of_MINP1_MINP1', () => {
        assertThrows(DateTimeException, () => LocalDateRange.of(MINP1, MINP1));
    });

    it('test_of_MIN_MINP2', () => {
        const test = LocalDateRange.of(LocalDate.MIN, MINP2);
        assertEquals(LocalDate.MIN, test.start());
        assertEquals(MINP1, test.endInclusive());
        assertEquals(MINP2, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(true, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals(true, Number.isNaN(test.lengthInDays()));
        assertEquals('-999999-01-01/-999999-01-03', test.toString());
    });

    it('test_of_MINP1_MINP2', () => {
        const test = LocalDateRange.of(MINP1, MINP2);
        assertEquals(MINP1, test.start());
        assertEquals(MINP1, test.endInclusive());
        assertEquals(MINP2, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(false, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        //assertEquals(1, test.lengthInDays());
        assertEquals('-999999-01-02/-999999-01-03', test.toString());
    });

    it('test_of_MINP2_MINP2', () => {
        const test = LocalDateRange.of(MINP2, MINP2);
        assertEquals(MINP2, test.start());
        assertEquals(MINP1, test.endInclusive());
        assertEquals(MINP2, test.end());
        assertEquals(true, test.isEmpty());
        assertEquals(false, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals(0, test.lengthInDays());
        assertEquals('-999999-01-03/-999999-01-03', test.toString());
    });

    it('test_of_MAX_MAX', () => {
        assertThrows(DateTimeException, () => LocalDateRange.of(LocalDate.MAX, LocalDate.MAX));
    });

    it('test_of_MAXM1_MAX', () => {
        assertThrows(DateTimeException, () => LocalDateRange.of(MAXM1, LocalDate.MAX));
    });

    it('test_of_MAXM1_MAXM1', () => {
        assertThrows(DateTimeException, () => LocalDateRange.of(MAXM1, MAXM1));
    });

    it('test_of_empty', () => {
        const test = LocalDateRange.of(DATE_2012_07_30, DATE_2012_07_30);
        assertEquals(DATE_2012_07_30, test.start());
        assertEquals(DATE_2012_07_29, test.endInclusive());
        assertEquals(DATE_2012_07_30, test.end());
        assertEquals(true, test.isEmpty());
        assertEquals(false, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals(0, test.lengthInDays());
        assertEquals('2012-07-30/2012-07-30', test.toString());
    });

    it('test_of_badOrder', () => {
        assertThrows(DateTimeException, () => LocalDateRange.of(DATE_2012_07_31, DATE_2012_07_30));
    });

    //-----------------------------------------------------------------------
    it('test_ofClosed', () => {
        const test = LocalDateRange.ofClosed(DATE_2012_07_28, DATE_2012_07_30);
        assertEquals(DATE_2012_07_28, test.start());
        assertEquals(DATE_2012_07_30, test.endInclusive());
        assertEquals(DATE_2012_07_31, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(false, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals(3, test.lengthInDays());
        assertEquals('2012-07-28/2012-07-31', test.toString());
    });

    it('test_ofClosed_MIN', () => {
        const test = LocalDateRange.ofClosed(LocalDate.MIN, DATE_2012_07_30);
        assertEquals(LocalDate.MIN, test.start());
        assertEquals(DATE_2012_07_30, test.endInclusive());
        assertEquals(DATE_2012_07_31, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(true, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals(true, Number.isNaN(test.lengthInDays()));
        assertEquals('-999999-01-01/2012-07-31', test.toString());
    });

    it('test_ofClosed_MAX', () => {
        const test = LocalDateRange.ofClosed(DATE_2012_07_28, LocalDate.MAX);
        assertEquals(DATE_2012_07_28, test.start());
        assertEquals(LocalDate.MAX, test.endInclusive());
        assertEquals(LocalDate.MAX, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(false, test.isUnboundedStart());
        assertEquals(true, test.isUnboundedEnd());
        //assertEquals(Integer.MAX_VALUE, test.lengthInDays());
        assertEquals('2012-07-28/+999999-12-31', test.toString());
    });

    it('test_ofClosed_MIN_MAX', () => {
        const test = LocalDateRange.ofClosed(LocalDate.MIN, LocalDate.MAX);
        assertEquals(LocalDate.MIN, test.start());
        assertEquals(LocalDate.MAX, test.endInclusive());
        assertEquals(LocalDate.MAX, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(true, test.isUnboundedStart());
        assertEquals(true, test.isUnboundedEnd());
        assertEquals(true, Number.isNaN(test.lengthInDays()));
        assertEquals('-999999-01-01/+999999-12-31', test.toString());
    });

    it('test_ofClosed_MIN_MIN', () => {
        assertThrows(DateTimeException, () => LocalDateRange.ofClosed(LocalDate.MIN, LocalDate.MIN));
    });

    it('test_ofClosed_MIN_MINP1', () => {
        const test = LocalDateRange.ofClosed(LocalDate.MIN, MINP1);
        assertEquals(LocalDate.MIN, test.start());
        assertEquals(MINP1, test.endInclusive());
        assertEquals(MINP2, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(true, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals(true, Number.isNaN(test.lengthInDays()));
        assertEquals('-999999-01-01/-999999-01-03', test.toString());
    });

    it('test_ofClosed_MINP1_MINP1', () => {
        const test = LocalDateRange.ofClosed(MINP1, MINP1);
        assertEquals(MINP1, test.start());
        assertEquals(MINP1, test.endInclusive());
        assertEquals(MINP2, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(false, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals(1, test.lengthInDays());
        assertEquals('-999999-01-02/-999999-01-03', test.toString());
    });

    it('test_ofClosed_MIN_MINP2', () => {
        const test = LocalDateRange.ofClosed(LocalDate.MIN, MINP2);
        assertEquals(LocalDate.MIN, test.start());
        assertEquals(MINP2, test.endInclusive());
        assertEquals(MINP3, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(true, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals(true, Number.isNaN(test.lengthInDays()));
        assertEquals('-999999-01-01/-999999-01-04', test.toString());
    });

    it('test_ofClosed_MINP1_MINP2', () => {
        const test = LocalDateRange.ofClosed(MINP1, MINP2);
        assertEquals(MINP1, test.start());
        assertEquals(MINP2, test.endInclusive());
        assertEquals(MINP3, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(false, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals(2, test.lengthInDays());
        assertEquals('-999999-01-02/-999999-01-04', test.toString());
    });

    it('test_ofClosed_MINP2_MINP2', () => {
        const test = LocalDateRange.ofClosed(MINP2, MINP2);
        assertEquals(MINP2, test.start());
        assertEquals(MINP2, test.endInclusive());
        assertEquals(MINP3, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(false, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals(1, test.lengthInDays());
        assertEquals('-999999-01-03/-999999-01-04', test.toString());
    });

    it('test_ofClosed_MAX_MAX', () => {
        assertThrows(DateTimeException, () => LocalDateRange.ofClosed(LocalDate.MAX, LocalDate.MAX));
    });

    it('test_ofClosed_MAXM1_MAX', () => {
        assertThrows(DateTimeException, () => LocalDateRange.ofClosed(MAXM1, LocalDate.MAX));
    });

    it('test_ofClosed_MAXM1_MAXM1', () => {
        assertThrows(DateTimeException, () => LocalDateRange.ofClosed(MAXM1, MAXM1));
    });

    it('test_ofClosed_badOrder', () => {
        assertThrows(DateTimeException, () => LocalDateRange.ofClosed(DATE_2012_07_31, DATE_2012_07_30));
    });

    //-----------------------------------------------------------------------
    it('test_ofEmpty', () => {
        const test = LocalDateRange.ofEmpty(DATE_2012_07_30);
        assertEquals(DATE_2012_07_30, test.start());
        assertEquals(DATE_2012_07_29, test.endInclusive());
        assertEquals(DATE_2012_07_30, test.end());
        assertEquals(true, test.isEmpty());
        assertEquals(false, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals('2012-07-30/2012-07-30', test.toString());
    });

    it('test_ofEmpty_MIN', () => {
        assertThrows(DateTimeException, () => LocalDateRange.ofEmpty(LocalDate.MIN));
    });

    it('test_ofEmpty_MINP1', () => {
        assertThrows(DateTimeException, () => LocalDateRange.ofEmpty(MINP1));
    });

    it('test_ofEmpty_MAX', () => {
        assertThrows(DateTimeException, () => LocalDateRange.ofEmpty(LocalDate.MAX));
    });

    it('test_ofEmpty_MAXM1', () => {
        assertThrows(DateTimeException, () => LocalDateRange.ofEmpty(MAXM1));
    });

    //-----------------------------------------------------------------------
    it('test_ofUnbounded', () => {
        const test = LocalDateRange.ofUnbounded();
        assertEquals(LocalDate.MIN, test.start());
        assertEquals(LocalDate.MAX, test.endInclusive());
        assertEquals(LocalDate.MAX, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(true, test.isUnboundedStart());
        assertEquals(true, test.isUnboundedEnd());
        assertEquals('-999999-01-01/+999999-12-31', test.toString());
    });

    //-----------------------------------------------------------------------
    it('test_ofUnboundedStart', () => {
        const test = LocalDateRange.ofUnboundedStart(DATE_2012_07_30);
        assertEquals(LocalDate.MIN, test.start());
        assertEquals(DATE_2012_07_29, test.endInclusive());
        assertEquals(DATE_2012_07_30, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(true, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals('-999999-01-01/2012-07-30', test.toString());
    });

    it('test_ofUnboundedStart_MIN', () => {
        assertThrows(DateTimeException, () => LocalDateRange.ofUnboundedStart(LocalDate.MIN));
    });

    it('test_ofUnboundedStart_MINP1', () => {
        assertThrows(DateTimeException, () => LocalDateRange.ofUnboundedStart(MINP1));
    });

    //-----------------------------------------------------------------------
    it('test_ofUnboundedEnd', () => {
        const test = LocalDateRange.ofUnboundedEnd(DATE_2012_07_30);
        assertEquals(DATE_2012_07_30, test.start());
        assertEquals(LocalDate.MAX, test.endInclusive());
        assertEquals(LocalDate.MAX, test.end());
        assertEquals(false, test.isEmpty());
        assertEquals(false, test.isUnboundedStart());
        assertEquals(true, test.isUnboundedEnd());
        assertEquals('2012-07-30/+999999-12-31', test.toString());
    });

    it('test_ofUnboundedEnd_MAX', () => {
        assertThrows(DateTimeException, () => LocalDateRange.ofUnboundedEnd(LocalDate.MAX));
    });

    it('test_ofUnboundedEnd_MAXM1', () => {
        assertThrows(DateTimeException, () => LocalDateRange.ofUnboundedEnd(MAXM1));
    });

    //-----------------------------------------------------------------------
    it('test_of_period', () => {
        const test = LocalDateRange.of(DATE_2012_07_28, Period.ofDays(3));
        assertEquals(DATE_2012_07_28, test.start());
        assertEquals(DATE_2012_07_30, test.endInclusive());
        assertEquals(DATE_2012_07_31, test.end());
        assertEquals(false, test.isUnboundedStart());
        assertEquals(false, test.isUnboundedEnd());
        assertEquals('2012-07-28/2012-07-31', test.toString());
    });

    it('test_of_period_negative', () => {
        assertThrows(DateTimeException, () => LocalDateRange.of(DATE_2012_07_31, Period.ofDays(-1)));
    });

    it('test_of_period_atMIN', () => {
        assertThrows(DateTimeException, () => LocalDateRange.of(LocalDate.MIN, Period.ofDays(0)));
    });

    it('test_of_period_atMAX', () => {
        assertThrows(DateTimeException, () => LocalDateRange.of(LocalDate.MAX, Period.ofDays(0)));
    });

    it('test_of_period_atMAXM1_0D', () => {
        assertThrows(DateTimeException, () => LocalDateRange.of(MAXM1, Period.ofDays(0)));
    });

    it('test_of_period_atMAXM1_1D', () => {
        assertThrows(DateTimeException, () => LocalDateRange.of(MAXM1, Period.ofDays(1)));
    });

    //-----------------------------------------------------------------------
    it('test_parse_CharSequence', () => {
        const test = LocalDateRange.parse(`${DATE_2012_07_27}/${DATE_2012_07_29}`);
        assertEquals(DATE_2012_07_27, test.start());
        assertEquals(DATE_2012_07_29, test.end());
    });

    it('test_parse_CharSequence_PeriodLocalDate', () => {
        const test = LocalDateRange.parse(`P2D/${DATE_2012_07_29}`);
        assertEquals(DATE_2012_07_27, test.start());
        assertEquals(DATE_2012_07_29, test.end());
    });

    /*
    it('test_parse_CharSequence_PeriodLocalDate_case', () => {
        const test = LocalDateRange.parse(`p2d/${DATE_2012_07_29}`);
        assertEquals(DATE_2012_07_27, test.start());
        assertEquals(DATE_2012_07_29, test.end());
    });
    */

    it('test_parse_CharSequence_LocalDatePeriod', () => {
        const test = LocalDateRange.parse(`${DATE_2012_07_27}/P2D`);
        assertEquals(DATE_2012_07_27, test.start());
        assertEquals(DATE_2012_07_29, test.end());
    });

    /*
    it('test_parse_CharSequence_LocalDatePeriod_case', () => {
        const test = LocalDateRange.parse(`${DATE_2012_07_27}/p2d`);
        assertEquals(DATE_2012_07_27, test.start());
        assertEquals(DATE_2012_07_29, test.end());
    });
    */

    it('test_parse_CharSequence_empty', () => {
        const test = LocalDateRange.parse(`${DATE_2012_07_27}/${DATE_2012_07_27}`);
        assertEquals(DATE_2012_07_27, test.start());
        assertEquals(DATE_2012_07_27, test.end());
    });

    it('test_parse_CharSequence_badOrder', () => {
        assertThrows(DateTimeException, () => LocalDateRange.parse(`${DATE_2012_07_29}/${DATE_2012_07_27}`));
    });

    it('test_parse_CharSequence_badFormat', () => {
        assertThrows(DateTimeParseException, () => LocalDateRange.parse(`${DATE_2012_07_29}-${DATE_2012_07_27}`));
    });

    it('test_parse_CharSequence_null', () => {
        assertThrows(NullPointerException, () => LocalDateRange.parse(null));
    });

    //-----------------------------------------------------------------------
    it('test_withStart', () => {
        const base = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
        const test = base.withStart(DATE_2012_07_27);
        assertEquals(DATE_2012_07_27, test.start());
        assertEquals(DATE_2012_07_30, test.endInclusive());
        assertEquals(DATE_2012_07_31, test.end());
    });

    it('test_withStart_adjuster', () => {
        const base = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
        const test = base.withStart(createTemporalAdjuster(date => date.minus(1, ChronoUnit.WEEKS)));
        assertEquals(DATE_2012_07_28.minusWeeks(1), test.start());
        assertEquals(DATE_2012_07_30, test.endInclusive());
        assertEquals(DATE_2012_07_31, test.end());
    });

    it('test_withStart_min', () => {
        const base = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
        const test = base.withStart(LocalDate.MIN);
        assertEquals(LocalDate.MIN, test.start());
        assertEquals(DATE_2012_07_30, test.endInclusive());
        assertEquals(DATE_2012_07_31, test.end());
    });

    it('test_withStart_empty', () => {
        const base = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
        const test = base.withStart(DATE_2012_07_31);
        assertEquals(DATE_2012_07_31, test.start());
        assertEquals(DATE_2012_07_30, test.endInclusive());
        assertEquals(DATE_2012_07_31, test.end());
    });

    it('test_withStart_invalid', () => {
        const base = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_30);
        assertThrows(DateTimeException, () => base.withStart(DATE_2012_07_31));
    });

    //-----------------------------------------------------------------------
    it('test_withEnd', () => {
        const base = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
        const test = base.withEnd(DATE_2012_07_30);
        assertEquals(DATE_2012_07_28, test.start());
        assertEquals(DATE_2012_07_29, test.endInclusive());
        assertEquals(DATE_2012_07_30, test.end());
    });

    it('test_withEnd_adjuster', () => {
        const base = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
        const test = base.withEnd(createTemporalAdjuster(date => date.plus(1, ChronoUnit.WEEKS)));
        assertEquals(DATE_2012_07_28, test.start());
        assertEquals(DATE_2012_07_30.plusWeeks(1), test.endInclusive());
        assertEquals(DATE_2012_07_31.plusWeeks(1), test.end());
    });

    it('test_withEnd_max', () => {
        const base = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
        const test = base.withEnd(LocalDate.MAX);
        assertEquals(DATE_2012_07_28, test.start());
        assertEquals(LocalDate.MAX, test.endInclusive());
        assertEquals(LocalDate.MAX, test.end());
    });

    it('test_withEnd_empty', () => {
        const base = LocalDateRange.of(DATE_2012_07_30, DATE_2012_07_31);
        const test = base.withEnd(DATE_2012_07_30);
        assertEquals(DATE_2012_07_30, test.start());
        assertEquals(DATE_2012_07_29, test.endInclusive());
        assertEquals(DATE_2012_07_30, test.end());
    });

    it('test_withEnd_invalid', () => {
        const base = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
        assertThrows(DateTimeException, () => base.withEnd(DATE_2012_07_27));
    });

    //-----------------------------------------------------------------------
    it('test_contains', () => {
        const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
        assertEquals(false, test.contains(LocalDate.MIN));
        assertEquals(false, test.contains(DATE_2012_07_27));
        assertEquals(true, test.contains(DATE_2012_07_28));
        assertEquals(true, test.contains(DATE_2012_07_29));
        assertEquals(true, test.contains(DATE_2012_07_30));
        assertEquals(false, test.contains(DATE_2012_07_31));
        assertEquals(false, test.contains(DATE_2012_08_01));
        assertEquals(false, test.contains(LocalDate.MAX));
    });

    it('test_contains_baseEmpty', () => {
        const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_28);
        assertEquals(false, test.contains(LocalDate.MIN));
        assertEquals(false, test.contains(DATE_2012_07_27));
        assertEquals(false, test.contains(DATE_2012_07_28));
        assertEquals(false, test.contains(DATE_2012_07_29));
        assertEquals(false, test.contains(LocalDate.MAX));
    });

    it('test_contains_max', () => {
        const test = LocalDateRange.of(DATE_2012_07_28, LocalDate.MAX);
        assertEquals(false, test.contains(LocalDate.MIN));
        assertEquals(false, test.contains(DATE_2012_07_27));
        assertEquals(true, test.contains(DATE_2012_07_28));
        assertEquals(true, test.contains(DATE_2012_07_29));
        assertEquals(true, test.contains(DATE_2012_07_30));
        assertEquals(true, test.contains(DATE_2012_07_31));
        assertEquals(true, test.contains(DATE_2012_08_01));
        assertEquals(true, test.contains(LocalDate.MAX));
    });

    //-----------------------------------------------------------------------
    const data_queries = [
        // before start
        [DATE_2012_07_01, DATE_2012_07_27, false, false, false, false],
        [DATE_2012_07_01, DATE_2012_07_28, false, true, true, false],
        // before end
        [DATE_2012_07_27, DATE_2012_07_30, false, false, true, true],
        [DATE_2012_07_28, DATE_2012_07_30, true, false, true, true],
        [DATE_2012_07_29, DATE_2012_07_30, true, false, true, true],
        // same end
        [DATE_2012_07_27, DATE_2012_07_31, false, false, true, true],
        [DATE_2012_07_28, DATE_2012_07_31, true, false, true, true],
        [DATE_2012_07_29, DATE_2012_07_31, true, false, true, true],
        [DATE_2012_07_30, DATE_2012_07_31, true, false, true , true],
        // past end
        [DATE_2012_07_27, DATE_2012_08_01, false, false, true, true],
        [DATE_2012_07_28, DATE_2012_08_01, false, false, true, true],
        [DATE_2012_07_29, DATE_2012_08_01, false, false, true, true],
        [DATE_2012_07_30, DATE_2012_08_01, false, false, true, true],
        // start past end
        [DATE_2012_07_31, DATE_2012_08_01, false, true, true, false],
        [DATE_2012_07_31, DATE_2012_08_31, false, true, true, false],
        [DATE_2012_08_01, DATE_2012_08_31, false, false, false, false],
        // empty
        [DATE_2012_07_27, DATE_2012_07_27, false, false, false, false],
        [DATE_2012_07_28, DATE_2012_07_28, true, true, true, false],
        [DATE_2012_07_29, DATE_2012_07_29, true, false, true, true],
        [DATE_2012_07_30, DATE_2012_07_30, true, false, true, true],
        [DATE_2012_07_31, DATE_2012_07_31, true, true, true, false],
        [DATE_2012_08_31, DATE_2012_08_31, false, false, false, false],
        // min
        [LocalDate.MIN, DATE_2012_07_27, false, false, false, false],
        [LocalDate.MIN, DATE_2012_07_28, false, true, true, false],
        [LocalDate.MIN, DATE_2012_07_29, false, false, true, true],
        [LocalDate.MIN, DATE_2012_07_30, false, false, true, true],
        [LocalDate.MIN, DATE_2012_07_31, false, false, true, true],
        [LocalDate.MIN, DATE_2012_08_01, false, false, true, true],
        [LocalDate.MIN, LocalDate.MAX, false, false, true, true],
        // max
        [DATE_2012_07_27, LocalDate.MAX, false, false, true, true],
        [DATE_2012_07_28, LocalDate.MAX, false, false, true, true],
        [DATE_2012_07_29, LocalDate.MAX, false, false, true, true],
        [DATE_2012_07_30, LocalDate.MAX, false, false, true, true],
        [DATE_2012_07_31, LocalDate.MAX, false, true, true, false],
        [DATE_2012_08_01, LocalDate.MAX, false, false, false, false],
    ];

    it('test_encloses', () => {
        // eslint-disable-next-line no-unused-vars
        for (const [start, end, isEnclosedBy, abuts, isConnected, overlaps] of data_queries) {
            const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
            assertEquals(isEnclosedBy, test.encloses(LocalDateRange.of(start, end)));
        }
    });

    it('test_abuts', () => {
        // eslint-disable-next-line no-unused-vars
        for (const [start, end, isEnclosedBy, abuts, isConnected, overlaps] of data_queries) {
            const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
            assertEquals(abuts, test.abuts(LocalDateRange.of(start, end)));
        }
    });


    it('test_isConnected', () => {
        // eslint-disable-next-line no-unused-vars
        for (const [start, end, isEnclosedBy, abuts, isConnected, overlaps] of data_queries) {
            const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
            assertEquals(isConnected, test.isConnected(LocalDateRange.of(start, end)));
        }
    });


    it('test_overlaps', () => {
        // eslint-disable-next-line no-unused-vars
        for (const [start, end, isEnclosedBy, abuts, isConnected, overlaps] of data_queries) {
            const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
            assertEquals(overlaps, test.overlaps(LocalDateRange.of(start, end)));
        }
    });


    it('test_crossCheck', () => {
        // eslint-disable-next-line no-unused-vars
        for (const [start, end, isEnclosedBy, abuts, isConnected, overlaps] of data_queries) {
            const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
            const input = LocalDateRange.of(start, end);
            assertEquals(test.overlaps(input) || test.abuts(input), test.isConnected(input));
            assertEquals(test.isConnected(input) && !test.abuts(input), test.overlaps(input));
        }
    });

    it('test_encloses_max', () => {
        const test = LocalDateRange.of(DATE_2012_07_28, LocalDate.MAX);
        assertEquals(true, test.encloses(LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_28)));
        assertEquals(true, test.encloses(LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_29)));
        assertEquals(true, test.encloses(LocalDateRange.of(DATE_2012_07_28, LocalDate.MAX)));
        assertEquals(false, test.encloses(LocalDateRange.of(DATE_2012_07_01, DATE_2012_07_27)));
        assertEquals(false, test.encloses(LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_29)));
        assertEquals(false, test.encloses(LocalDateRange.of(DATE_2012_07_27, LocalDate.MAX)));
    });

    it('test_encloses_baseEmpty', () => {
        const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_28);
        assertEquals(false, test.encloses(LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_27)));
        assertEquals(true, test.encloses(LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_28)));
        assertEquals(false, test.encloses(LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_29)));
        assertEquals(false, test.encloses(LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_27)));
        assertEquals(false, test.encloses(LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_28)));
        assertEquals(false, test.encloses(LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_29)));
        assertEquals(false, test.encloses(LocalDateRange.of(DATE_2012_07_27, LocalDate.MAX)));
        assertEquals(false, test.encloses(LocalDateRange.of(DATE_2012_07_28, LocalDate.MAX)));
    });

    it('test_abuts_baseEmpty', () => {
        const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_28);
        assertEquals(false, test.abuts(LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_27)));
        assertEquals(false, test.abuts(LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_28)));
        assertEquals(false, test.abuts(LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_29)));
        assertEquals(true, test.abuts(LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_28)));
        assertEquals(true, test.abuts(LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_29)));
    });

    it('test_isConnected_baseEmpty', () => {
        const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_28);
        assertEquals(false, test.isConnected(LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_27)));
        assertEquals(true, test.isConnected(LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_28)));
        assertEquals(false, test.isConnected(LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_29)));
    });

    it('test_overlaps_baseEmpty', () => {
        const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_28);
        assertEquals(false, test.overlaps(LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_27)));
        assertEquals(true, test.overlaps(LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_28)));
        assertEquals(false, test.overlaps(LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_29)));
    });

    //-----------------------------------------------------------------------
    const data_intersection = [
        // adjacent
        [DATE_2012_07_01, DATE_2012_07_28, DATE_2012_07_28, DATE_2012_07_30, DATE_2012_07_28, DATE_2012_07_28],
        // adjacent empty
        [DATE_2012_07_01, DATE_2012_07_30, DATE_2012_07_30, DATE_2012_07_30, DATE_2012_07_30, DATE_2012_07_30],
        // overlap
        [DATE_2012_07_01, DATE_2012_07_29, DATE_2012_07_28, DATE_2012_07_30, DATE_2012_07_28, DATE_2012_07_29],
        // encloses
        [DATE_2012_07_01, DATE_2012_07_30, DATE_2012_07_28, DATE_2012_07_29, DATE_2012_07_28, DATE_2012_07_29],
        // encloses empty
        [DATE_2012_07_01, DATE_2012_07_30, DATE_2012_07_28, DATE_2012_07_28, DATE_2012_07_28, DATE_2012_07_28],
    ];

    it('test_intersection', () => {
        for (const [start1, end1, start2, end2, expStart, expEnd] of data_intersection) {
            const test1 = LocalDateRange.of(start1, end1);
            const test2 = LocalDateRange.of(start2, end2);
            const expected = LocalDateRange.of(expStart, expEnd);
            assertTrue(test1.isConnected(test2));
            assertEquals(expected, test1.intersection(test2));
        }
    });

    it('test_intersection_reverse', () => {
        for (const [start1, end1, start2, end2, expStart, expEnd] of data_intersection) {
            const test1 = LocalDateRange.of(start1, end1);
            const test2 = LocalDateRange.of(start2, end2);
            const expected = LocalDateRange.of(expStart, expEnd);
            assertTrue(test2.isConnected(test1));
            assertEquals(expected, test2.intersection(test1));
        }
    });

    it('test_intersectionBad', () => {
        const test1 = LocalDateRange.of(DATE_2012_07_01, DATE_2012_07_28);
        const test2 = LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_30);
        assertEquals(false, test1.isConnected(test2));
        assertThrows(DateTimeException, () => test1.intersection(test2));
    });

    it('test_intersection_same', () => {
        const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
        assertEquals(test, test.intersection(test));
    });

    //-----------------------------------------------------------------------
    const data_union = [
        // adjacent
        [DATE_2012_07_01, DATE_2012_07_28, DATE_2012_07_28, DATE_2012_07_30, DATE_2012_07_01, DATE_2012_07_30],
        // adjacent empty
        [DATE_2012_07_01, DATE_2012_07_30, DATE_2012_07_30, DATE_2012_07_30, DATE_2012_07_01, DATE_2012_07_30],
        // overlap
        [DATE_2012_07_01, DATE_2012_07_29, DATE_2012_07_28, DATE_2012_07_30, DATE_2012_07_01, DATE_2012_07_30],
        // encloses
        [DATE_2012_07_01, DATE_2012_07_30, DATE_2012_07_28, DATE_2012_07_29, DATE_2012_07_01, DATE_2012_07_30],
        // encloses empty
        [DATE_2012_07_01, DATE_2012_07_30, DATE_2012_07_28, DATE_2012_07_28, DATE_2012_07_01, DATE_2012_07_30],
    ];

    it('test_unionAndSpan', () => {
        for (const [start1, end1, start2, end2, expStart, expEnd] of data_union) {
            const test1 = LocalDateRange.of(start1, end1);
            const test2 = LocalDateRange.of(start2, end2);
            const expected = LocalDateRange.of(expStart, expEnd);
            assertTrue(test1.isConnected(test2));
            assertEquals(expected, test1.union(test2));
            assertEquals(expected, test1.span(test2));
        }
    });

    it('test_unionAndSpan_reverse', () => {
        for (const [start1, end1, start2, end2, expStart, expEnd] of data_union) {
            const test1 = LocalDateRange.of(start1, end1);
            const test2 = LocalDateRange.of(start2, end2);
            const expected = LocalDateRange.of(expStart, expEnd);
            assertTrue(test2.isConnected(test1));
            assertEquals(expected, test2.union(test1));
            assertEquals(expected, test2.span(test1));
        }
    });

    it('test_span_enclosesInputs', () => {
        for (const [start1, end1, start2, end2, expStart, expEnd] of data_union) {
            const test1 = LocalDateRange.of(start1, end1);
            const test2 = LocalDateRange.of(start2, end2);
            const expected = LocalDateRange.of(expStart, expEnd);
            assertEquals(true, expected.encloses(test1));
            assertEquals(true, expected.encloses(test2));
        }
    });

    it('test_union_disconnected', () => {
        const test1 = LocalDateRange.of(DATE_2012_07_01, DATE_2012_07_28);
        const test2 = LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_30);
        assertFalse(test1.isConnected(test2));
        assertThrows(DateTimeException, () => test1.union(test2));
    });

    it('test_span_disconnected', () => {
        const test1 = LocalDateRange.of(DATE_2012_07_01, DATE_2012_07_28);
        const test2 = LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_30);
        assertFalse(test1.isConnected(test2));
        assertEquals(LocalDateRange.of(DATE_2012_07_01, DATE_2012_07_30), test1.span(test2));
    });

    it('test_unionAndSpan_same', () => {
        const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
        assertEquals(test, test.union(test));
        assertEquals(test, test.span(test));
    });

    //-----------------------------------------------------------------------
    it('test_stream', () => {
        const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
        const result = [...test.stream()];
        assertEquals(3, result.length);
        assertEquals(DATE_2012_07_28, result[0]);
        assertEquals(DATE_2012_07_29, result[1]);
        assertEquals(DATE_2012_07_30, result[2]);
    });

    it('test_stream_MIN_MINP3', () => {
        const test = LocalDateRange.of(LocalDate.MIN, MINP3);
        const result = [...test.stream()];
        assertEquals(3, result.length);
        assertEquals(LocalDate.MIN, result[0]);
        assertEquals(MINP1, result[1]);
        assertEquals(MINP2, result[2]);
    });

    it('test_stream_MAXM2_MAX', () => {
        const test = LocalDateRange.of(MAXM2, LocalDate.MAX);
        const result = [...test.stream()];
        assertEquals(3, result.length);
        assertEquals(MAXM2, result[0]);
        assertEquals(MAXM1, result[1]);
        assertEquals(LocalDate.MAX, result[2]);
    });

    //-----------------------------------------------------------------------
    const data_isBefore = [
        // before start
        [DATE_2012_07_01, DATE_2012_07_27, false],
        // before end
        [DATE_2012_07_27, DATE_2012_07_30, false],
        [DATE_2012_07_28, DATE_2012_07_30, false],
        [DATE_2012_07_29, DATE_2012_07_30, false],
        // same end
        [DATE_2012_07_27, DATE_2012_07_31, false],
        [DATE_2012_07_28, DATE_2012_07_31, false],
        [DATE_2012_07_29, DATE_2012_07_31, false],
        [DATE_2012_07_30, DATE_2012_07_31, false],
        // past end
        [DATE_2012_07_27, DATE_2012_08_01, false],
        [DATE_2012_07_28, DATE_2012_08_01, false],
        [DATE_2012_07_29, DATE_2012_08_01, false],
        [DATE_2012_07_30, DATE_2012_08_01, false],
        // start past end
        [DATE_2012_07_31, DATE_2012_08_01, true],
        [DATE_2012_07_31, DATE_2012_08_31, true],
        // empty
        [DATE_2012_07_30, DATE_2012_07_30, false],
        [DATE_2012_07_31, DATE_2012_07_31, true],
        // min
        [LocalDate.MIN, DATE_2012_07_27, false],
        [LocalDate.MIN, DATE_2012_07_28, false],
        [LocalDate.MIN, DATE_2012_07_29, false],
        [LocalDate.MIN, DATE_2012_07_30, false],
        [LocalDate.MIN, DATE_2012_07_31, false],
        [LocalDate.MIN, DATE_2012_08_01, false],
        [LocalDate.MIN, LocalDate.MAX, false],
        // max
        [DATE_2012_07_27, LocalDate.MAX, false],
        [DATE_2012_07_28, LocalDate.MAX, false],
        [DATE_2012_07_29, LocalDate.MAX, false],
        [DATE_2012_07_30, LocalDate.MAX, false],
        [DATE_2012_07_31, LocalDate.MAX, true],
        [DATE_2012_08_01, LocalDate.MAX, true],
    ];

    it('test_isBefore_range', () => {
        for (const [start, end, before] of data_isBefore) {
            const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
            assertEquals(before, test.isBefore(LocalDateRange.of(start, end)));
        }
    });

    it('test_isBefore_date', () => {
        // eslint-disable-next-line no-unused-vars
        for (const [start, end, before] of data_isBefore) {
            const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
            assertEquals(before, test.isBefore(start));
        }
    });

    it('test_isBefore_range_empty', () => {
        const test = LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_29);
        assertEquals(false, test.isBefore(LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_28)));
        assertEquals(false, test.isBefore(LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_29)));
        assertEquals(false, test.isBefore(LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_29)));
        assertEquals(true, test.isBefore(LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_30)));
        assertEquals(true, test.isBefore(LocalDateRange.of(DATE_2012_07_30, DATE_2012_07_30)));
        assertEquals(true, test.isBefore(LocalDateRange.of(DATE_2012_07_30, DATE_2012_07_31)));
    });

    it('test_isBefore_date_empty', () => {
        const test = LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_29);
        assertEquals(false, test.isBefore(DATE_2012_07_28));
        assertEquals(false, test.isBefore(DATE_2012_07_29));
        assertEquals(true, test.isBefore(DATE_2012_07_30));
    });

    //-----------------------------------------------------------------------
    const data_isAfter = [
        // before start
        [DATE_2012_07_01, DATE_2012_07_27, true],
        // to start
        [DATE_2012_07_01, DATE_2012_07_28, true],
        // before end
        [DATE_2012_07_01, DATE_2012_07_29, false],
        [DATE_2012_07_27, DATE_2012_07_30, false],
        [DATE_2012_07_28, DATE_2012_07_30, false],
        [DATE_2012_07_29, DATE_2012_07_30, false],
        // same end
        [DATE_2012_07_27, DATE_2012_07_31, false],
        [DATE_2012_07_28, DATE_2012_07_31, false],
        [DATE_2012_07_29, DATE_2012_07_31, false],
        [DATE_2012_07_30, DATE_2012_07_31, false],
        // past end
        [DATE_2012_07_27, DATE_2012_08_01, false],
        [DATE_2012_07_28, DATE_2012_08_01, false],
        [DATE_2012_07_29, DATE_2012_08_01, false],
        [DATE_2012_07_30, DATE_2012_08_01, false],
        // start past end
        [DATE_2012_07_31, DATE_2012_08_01, false],
        [DATE_2012_07_31, DATE_2012_08_31, false],
        // empty
        [DATE_2012_07_28, DATE_2012_07_28, true],
        [DATE_2012_07_29, DATE_2012_07_29, false],
        // min
        [LocalDate.MIN, DATE_2012_07_27, true],
        [LocalDate.MIN, DATE_2012_07_28, true],
        [LocalDate.MIN, DATE_2012_07_29, false],
        [LocalDate.MIN, DATE_2012_07_30, false],
        [LocalDate.MIN, DATE_2012_07_31, false],
        [LocalDate.MIN, DATE_2012_08_01, false],
        [LocalDate.MIN, LocalDate.MAX, false],
        // max
        [DATE_2012_07_27, LocalDate.MAX, false],
        [DATE_2012_07_28, LocalDate.MAX, false],
        [DATE_2012_07_29, LocalDate.MAX, false],
        [DATE_2012_07_30, LocalDate.MAX, false],
        [DATE_2012_07_31, LocalDate.MAX, false],
        [DATE_2012_08_01, LocalDate.MAX, false],
    ];

    it('test_isAfter_range', () => {
        for (const [start, end, after] of data_isAfter) {
            const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
            assertEquals(after, test.isAfter(LocalDateRange.of(start, end)));
        }
    });

    it('test_isAfter_date', () => {
        // eslint-disable-next-line no-unused-vars
        for (const [start, end, after] of data_isAfter) {
            const test = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_31);
            assertEquals(after, test.isAfter(end.minusDays(1)));
        }
    });

    it('test_isAfter_range_empty', () => {
        const test = LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_29);
        assertEquals(true, test.isAfter(LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_28)));
        assertEquals(true, test.isAfter(LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_29)));
        assertEquals(true, test.isAfter(LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_28)));
        assertEquals(false, test.isAfter(LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_29)));
        assertEquals(false, test.isAfter(LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_30)));
        assertEquals(false, test.isAfter(LocalDateRange.of(DATE_2012_07_30, DATE_2012_07_30)));
        assertEquals(false, test.isAfter(LocalDateRange.of(DATE_2012_07_30, DATE_2012_07_31)));
    });

    it('test_isAfter_date_empty', () => {
        const test = LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_29);
        assertEquals(true, test.isAfter(DATE_2012_07_28));
        assertEquals(false, test.isAfter(DATE_2012_07_29));
        assertEquals(false, test.isAfter(DATE_2012_07_30));
    });

    //-----------------------------------------------------------------------
    it('test_lengthInDays', () => {
        assertEquals(2, LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_29).lengthInDays());
        assertEquals(1, LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_29).lengthInDays());
        assertEquals(0, LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_29).lengthInDays());
        assertEquals(true, Number.isNaN(LocalDateRange.of(LocalDate.MIN, DATE_2012_07_29).lengthInDays()));
        assertEquals(true, Number.isNaN(LocalDateRange.of(DATE_2012_07_29, LocalDate.MAX).lengthInDays()));
        assertEquals(false, Number.isNaN(LocalDateRange.of(MINP1, MAXM1).lengthInDays()));
    });

    it('test_toPeriod', () => {
        assertEquals(Period.ofDays(2), LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_29).toPeriod());
        assertEquals(Period.ofDays(1), LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_29).toPeriod());
        assertEquals(Period.ofDays(0), LocalDateRange.of(DATE_2012_07_29, DATE_2012_07_29).toPeriod());
    });

    it('test_toPeriod_unbounded_MIN', () => {
        assertThrows(ArithmeticException, () => LocalDateRange.of(LocalDate.MIN, DATE_2012_07_29).toPeriod());
    });

    it('test_toPeriod_unbounded_MAX', () => {
        assertThrows(ArithmeticException, () => LocalDateRange.of(DATE_2012_07_29, LocalDate.MAX).toPeriod());
    });

    //-----------------------------------------------------------------------
    it('test_equals', () => {
        const a = LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_29);
        const a2 = LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_29);
        const b = LocalDateRange.of(DATE_2012_07_27, DATE_2012_07_30);
        const c = LocalDateRange.of(DATE_2012_07_28, DATE_2012_07_29);
        assertEquals(true, a.equals(a));
        assertEquals(true, a.equals(a2));
        assertEquals(false, a.equals(b));
        assertEquals(false, a.equals(c));
        assertEquals(false, a.equals(null));
        assertEquals(false, a.equals(''));
        assertEquals(true, a.hashCode() === a2.hashCode());
    });
});

function createTemporalAdjuster(adjustIntoFunction) {
    class ExtendedTemporalAdjuster extends TemporalAdjuster {
    }

    ExtendedTemporalAdjuster.prototype.adjustInto = adjustIntoFunction;
    return new ExtendedTemporalAdjuster();
}

/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import {
    ChronoUnit,
    DateTimeException,
    DateTimeParseException,
    Duration,
    Instant,
    NullPointerException,
    ZonedDateTime,
    ZoneOffset,
} from '@js-joda/core';

import '../_init';

import { assertEquals, assertFalse, assertTrue, dataProviderTest } from '../testUtils';

import { Interval } from '../../src/Interval';

describe('org.threeten.extra.TestInterval', () => {
    const NOW1 = ZonedDateTime.of(2014, 12, 1, 1, 0, 0, 0, ZoneOffset.UTC).toInstant();
    const NOW2 = NOW1.plusSeconds(60);
    const NOW3 = NOW2.plusSeconds(60);
    const NOW4 = NOW3.plusSeconds(60);

    //-----------------------------------------------------------------------
    it('test_ALL', () => {
        const test = Interval.ALL;
        assertEquals(test.start(), Instant.MIN);
        assertEquals(test.end(), Instant.MAX);
        assertEquals(test.isEmpty(), false);
        assertEquals(test.isUnboundedStart(), true);
        assertEquals(test.isUnboundedEnd(), true);
    });

    describe('Interval.of', () => {
        //-----------------------------------------------------------------------
        it('test_of_Instant_Instant', () => {
            const test = Interval.of(NOW1, NOW2);
            assertEquals(test.start(), NOW1);
            assertEquals(test.end(), NOW2);
            assertEquals(test.isEmpty(), false);
            assertEquals(test.isUnboundedStart(), false);
            assertEquals(test.isUnboundedEnd(), false);
        });

        it('test_of_Instant_Instant_empty', () => {
            const test = Interval.of(NOW1, NOW1);
            assertEquals(test.start(), NOW1);
            assertEquals(test.end(), NOW1);
            assertEquals(test.isEmpty(), true);
            assertEquals(test.isUnboundedStart(), false);
            assertEquals(test.isUnboundedEnd(), false);
        });

        it('test_of_Instant_Instant_badOrder', () => {
            expect(() => {
                Interval.of(NOW2, NOW1);
            }).to.throw(DateTimeException);
        });

        it('test_of_Instant_Instant_nullStart', () => {
            expect(() => {
                Interval.of(null, NOW2);
            }).to.throw(NullPointerException);
        });

        it('test_of_Instant_Instant_nullEnd', () => {
            expect(() => {
                Interval.of(NOW1, null);
            }).to.throw(NullPointerException);
        });

        //-----------------------------------------------------------------------
        it('test_of_Instant_Duration', () => {
            const test = Interval.of(NOW1, Duration.ofSeconds(60));
            assertEquals(test.start(), NOW1);
            assertEquals(test.end(), NOW2);
        });

        it('test_of_Instant_Duration_zero', () => {
            const test = Interval.of(NOW1, Duration.ZERO);
            assertEquals(test.start(), NOW1);
            assertEquals(test.end(), NOW1);
        });

        it('test_of_Instant_Duration_negative', () => {
            expect(() => {
                Interval.of(NOW2, Duration.ofSeconds(-1));
            }).to.throw(DateTimeException);
        });

        it('test_of_Instant_Duration_nullInstant', () => {
            expect(() => {
                Interval.ofInstantDuration(null, Duration.ZERO);
            }).to.throw(NullPointerException);
        });

        it('test_of_Instant_Duration_nullDuration', () => {
            expect(() => {
                Interval.ofInstantDuration(NOW1, null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    describe('parse', () => {
        it('test_parse_CharSequence', () => {
            const test = Interval.parse(`${NOW1}/${NOW2}`);
            assertEquals(test.start(), NOW1);
            assertEquals(test.end(), NOW2);
        });

        it('test_parse_CharSequence_DurationInstant', () => {
            const test = Interval.parse(`${Duration.ofHours(6)}/${NOW2}`);
            assertEquals(test.start(), NOW2.minus(6, ChronoUnit.HOURS));
            assertEquals(test.end(), NOW2);
        });

        it('test_parse_CharSequence_DurationInstant_caseInsensitive', () => {
            const test = Interval.parse(`pt6h/${NOW2}`);
            assertEquals(test.start(), NOW2.minus(6, ChronoUnit.HOURS));
            assertEquals(test.end(), NOW2);
        });

        it('test_parse_CharSequence_InstantDuration', () => {
            const test = Interval.parse(`${NOW1}/${Duration.ofHours(6)}`);
            assertEquals(test.start(), NOW1);
            assertEquals(test.end(), NOW1.plus(6, ChronoUnit.HOURS));
        });

        it('test_parse_CharSequence_InstantDuration_caseInsensitive', () => {
            const test = Interval.parse(`${NOW1}/pt6h`);
            assertEquals(test.start(), NOW1);
            assertEquals(test.end(), NOW1.plus(6, ChronoUnit.HOURS));
        });

        it('test_parse_CharSequence_empty', () => {
            const test = Interval.parse(`${NOW1}/${NOW1}`);
            assertEquals(test.start(), NOW1);
            assertEquals(test.end(), NOW1);
        });

        it('test_parseCharSequence_InstantInstant_with_timezones', () => {
            const test = Interval.parse(`${ZonedDateTime.ofInstant(NOW1, ZoneOffset.ofHours(2)).toString()}/${ZonedDateTime.ofInstant(NOW2, ZoneOffset.ofHours(2)).toString()}`);
            // original test from threeten-extra, but we don't support `atOffset`:
            // const test = Interval.parse(`${NOW1.atOffset(ZoneOffset.ofHours(2)).toString()}/${NOW2.atOffset(ZoneOffset.ofHours(2)).toString()}`);
            assertEquals(test.start(), NOW1);
            assertEquals(test.end(), NOW2);
        });

        it('test_parse_CharSequence_badOrder', () => {
            expect(() => {
                Interval.parse(`${NOW2}/${NOW1}`);
            }).to.throw(DateTimeException);
        });

        it('test_parse_CharSequence_badFormat', () => {
            expect(() => {
                Interval.parse(`${NOW2}-${NOW1}`);
            }).to.throw(DateTimeParseException);
        });

        it('test_parse_CharSequence_null', () => {
            expect(() => {
                Interval.parse(null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    describe('withStart', () => {
        it('test_withStart', () => {
            const base = Interval.of(NOW1, NOW3);
            const test = base.withStart(NOW2);
            assertEquals(test.start(), NOW2);
            assertEquals(test.end(), NOW3);
        });

        it('test_withStart_badOrder', () => {
            expect(() => {
                const base = Interval.of(NOW1, NOW2);
                base.withStart(NOW3);
            }).to.throw(DateTimeException);
        });

        it('test_withStart_null', () => {
            expect(() => {
                const base = Interval.of(NOW1, NOW2);
                base.withStart(null);
            }).to.throw(NullPointerException);
        });
    });
    //-----------------------------------------------------------------------
    describe('withEnd', () => {
        it('test_withEnd', () => {
            const base = Interval.of(NOW1, NOW3);
            const test = base.withEnd(NOW2);
            assertEquals(test.start(), NOW1);
            assertEquals(test.end(), NOW2);
        });

        it('test_withEnd_badOrder', () => {
            expect(() => {
                const base = Interval.of(NOW2, NOW3);
                base.withEnd(NOW1);
            }).to.throw(DateTimeException);
        });

        it('test_withEnd_null', () => {
            expect(() => {
                const base = Interval.of(NOW1, NOW2);
                base.withEnd(null);
            }).to.throw(NullPointerException);
        });
    });
    //-----------------------------------------------------------------------
    describe('contains', () => {
        it('test_contains_Instant', () => {
            const test = Interval.of(NOW1, NOW2);
            assertEquals(test.contains(NOW1.minusSeconds(1)), false);
            assertEquals(test.contains(NOW1), true);
            assertEquals(test.contains(NOW1.plusSeconds(1)), true);
            assertEquals(test.contains(NOW2.minusSeconds(1)), true);
            assertEquals(test.contains(NOW2), false);
        });

        it('test_contains_Instant_baseEmpty', () => {
            const test = Interval.of(NOW1, NOW1);
            assertEquals(test.contains(NOW1.minusSeconds(1)), false);
            assertEquals(test.contains(NOW1), false);
            assertEquals(test.contains(NOW1.plusSeconds(1)), false);
        });

        it('test_contains_max', () => {
            const test = Interval.of(NOW2, Instant.MAX);
            assertEquals(test.contains(Instant.MIN), false);
            assertEquals(test.contains(NOW1), false);
            assertEquals(test.contains(NOW2), true);
            assertEquals(test.contains(NOW3), true);
            assertEquals(test.contains(Instant.MAX), true);
        });

        it('test_contains_Instant_null', () => {
            expect(() => {
                const base = Interval.of(NOW1, NOW2);
                base.contains(null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    describe('encloses', () => {
        it('test_encloses_Interval', () => {
            const test = Interval.of(NOW1, NOW2);
            // completely before
            assertEquals(test.encloses(Interval.of(NOW1.minusSeconds(2), NOW1.minusSeconds(1))), false);
            assertEquals(test.encloses(Interval.of(NOW1.minusSeconds(1), NOW1)), false);
            // partly before
            assertEquals(test.encloses(Interval.of(NOW1.minusSeconds(1), NOW2)), false);
            assertEquals(test.encloses(Interval.of(NOW1.minusSeconds(1), NOW2.minusSeconds(1))), false);
            // contained
            assertEquals(test.encloses(Interval.of(NOW1, NOW2.minusSeconds(1))), true);
            assertEquals(test.encloses(Interval.of(NOW1, NOW2)), true);
            assertEquals(test.encloses(Interval.of(NOW1.plusSeconds(1), NOW2)), true);
            // partly after
            assertEquals(test.encloses(Interval.of(NOW1, NOW2.plusSeconds(1))), false);
            assertEquals(test.encloses(Interval.of(NOW1.plusSeconds(1), NOW2.plusSeconds(1))), false);
            // completely after
            assertEquals(test.encloses(Interval.of(NOW2, NOW2.plusSeconds(1))), false);
            assertEquals(test.encloses(Interval.of(NOW2.plusSeconds(1), NOW2.plusSeconds(2))), false);
        });

        it('test_encloses_Interval_empty', () => {
            const test = Interval.of(NOW1, NOW1);
            // completely before
            assertEquals(test.encloses(Interval.of(NOW1.minusSeconds(2), NOW1.minusSeconds(1))), false);
            // partly before
            assertEquals(test.encloses(Interval.of(NOW1.minusSeconds(1), NOW1)), false);
            // equal
            assertEquals(test.encloses(Interval.of(NOW1, NOW1)), true);
            // completely after
            assertEquals(test.encloses(Interval.of(NOW1, NOW1.plusSeconds(1))), false);
            assertEquals(test.encloses(Interval.of(NOW1.plusSeconds(1), NOW1.plusSeconds(2))), false);
        });

        it('test_encloses_Interval_null', () => {
            expect(() => {
                const base = Interval.of(NOW1, NOW2);
                base.encloses(null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    describe('abuts', () => {
        it('test_abuts_Interval', () => {
            const test = Interval.of(NOW1, NOW2);
            // completely before
            assertEquals(test.abuts(Interval.of(NOW1.minusSeconds(2), NOW1.minusSeconds(1))), false);
            assertEquals(test.abuts(Interval.of(NOW1.minusSeconds(1), NOW1)), true);
            // partly before
            assertEquals(test.abuts(Interval.of(NOW1.minusSeconds(1), NOW2)), false);
            assertEquals(test.abuts(Interval.of(NOW1.minusSeconds(1), NOW2.minusSeconds(1))), false);
            // contained
            assertEquals(test.abuts(Interval.of(NOW1, NOW2.minusSeconds(1))), false);
            assertEquals(test.abuts(Interval.of(NOW1, NOW2)), false);
            assertEquals(test.abuts(Interval.of(NOW1.plusSeconds(1), NOW2)), false);
            // partly after
            assertEquals(test.abuts(Interval.of(NOW1, NOW2.plusSeconds(1))), false);
            assertEquals(test.abuts(Interval.of(NOW1.plusSeconds(1), NOW2.plusSeconds(1))), false);
            // completely after
            assertEquals(test.abuts(Interval.of(NOW2, NOW2.plusSeconds(1))), true);
            assertEquals(test.abuts(Interval.of(NOW2.plusSeconds(1), NOW2.plusSeconds(2))), false);
        });

        it('test_abuts_Interval_empty', () => {
            const test = Interval.of(NOW1, NOW1);
            // completely before
            assertEquals(test.abuts(Interval.of(NOW1.minusSeconds(2), NOW1.minusSeconds(1))), false);
            assertEquals(test.abuts(Interval.of(NOW1.minusSeconds(1), NOW1)), true);
            // equal
            assertEquals(test.abuts(Interval.of(NOW1, NOW1)), false);
            // completely after
            assertEquals(test.abuts(Interval.of(NOW1, NOW1.plusSeconds(1))), true);
            assertEquals(test.abuts(Interval.of(NOW1.plusSeconds(1), NOW1.plusSeconds(2))), false);
        });

        it('test_abuts_Interval_null', () => {
            expect(() => {
                const base = Interval.of(NOW1, NOW2);
                base.abuts(null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    describe('isConnected', () => {
        it('test_isConnected_Interval', () => {
            const test = Interval.of(NOW1, NOW2);
            // completely before
            assertEquals(test.isConnected(Interval.of(NOW1.minusSeconds(2), NOW1.minusSeconds(1))), false);
            assertEquals(test.isConnected(Interval.of(NOW1.minusSeconds(1), NOW1)), true);
            // partly before
            assertEquals(test.isConnected(Interval.of(NOW1.minusSeconds(1), NOW2)), true);
            assertEquals(test.isConnected(Interval.of(NOW1.minusSeconds(1), NOW2.minusSeconds(1))), true);
            // contained
            assertEquals(test.isConnected(Interval.of(NOW1, NOW2.minusSeconds(1))), true);
            assertEquals(test.isConnected(Interval.of(NOW1, NOW2)), true);
            assertEquals(test.isConnected(Interval.of(NOW1.plusSeconds(1), NOW2)), true);
            // partly after
            assertEquals(test.isConnected(Interval.of(NOW1, NOW2.plusSeconds(1))), true);
            assertEquals(test.isConnected(Interval.of(NOW1.plusSeconds(1), NOW2.plusSeconds(1))), true);
            // completely after
            assertEquals(test.isConnected(Interval.of(NOW2, NOW2.plusSeconds(1))), true);
            assertEquals(test.isConnected(Interval.of(NOW2.plusSeconds(1), NOW2.plusSeconds(2))), false);
        });

        it('test_isConnected_Interval_empty', () => {
            const test = Interval.of(NOW1, NOW1);
            // completely before
            assertEquals(test.isConnected(Interval.of(NOW1.minusSeconds(2), NOW1.minusSeconds(1))), false);
            assertEquals(test.isConnected(Interval.of(NOW1.minusSeconds(1), NOW1)), true);
            // equal
            assertEquals(test.isConnected(Interval.of(NOW1, NOW1)), true);
            // completely after
            assertEquals(test.isConnected(Interval.of(NOW1, NOW1.plusSeconds(1))), true);
            assertEquals(test.isConnected(Interval.of(NOW1.plusSeconds(1), NOW1.plusSeconds(2))), false);
        });

        it('test_isConnected_Interval_null', () => {
            expect(() => {
                const base = Interval.of(NOW1, NOW2);
                base.isConnected(null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    describe('overlaps', () => {
        it('test_overlaps_Interval', () => {
            const test = Interval.of(NOW1, NOW2);
            // completely before
            assertEquals(test.overlaps(Interval.of(NOW1.minusSeconds(2), NOW1.minusSeconds(1))), false);
            assertEquals(test.overlaps(Interval.of(NOW1.minusSeconds(1), NOW1)), false);
            // partly before
            assertEquals(test.overlaps(Interval.of(NOW1.minusSeconds(1), NOW2)), true);
            assertEquals(test.overlaps(Interval.of(NOW1.minusSeconds(1), NOW2.minusSeconds(1))), true);
            // contained
            assertEquals(test.overlaps(Interval.of(NOW1, NOW2.minusSeconds(1))), true);
            assertEquals(test.overlaps(Interval.of(NOW1, NOW2)), true);
            assertEquals(test.overlaps(Interval.of(NOW1.plusSeconds(1), NOW2)), true);
            // partly after
            assertEquals(test.overlaps(Interval.of(NOW1, NOW2.plusSeconds(1))), true);
            assertEquals(test.overlaps(Interval.of(NOW1.plusSeconds(1), NOW2.plusSeconds(1))), true);
            // completely after
            assertEquals(test.overlaps(Interval.of(NOW2, NOW2.plusSeconds(1))), false);
            assertEquals(test.overlaps(Interval.of(NOW2.plusSeconds(1), NOW2.plusSeconds(2))), false);
        });

        it('test_overlaps_Interval_empty', () => {
            const test = Interval.of(NOW1, NOW1);
            // completely before
            assertEquals(test.overlaps(Interval.of(NOW1.minusSeconds(2), NOW1.minusSeconds(1))), false);
            assertEquals(test.overlaps(Interval.of(NOW1.minusSeconds(1), NOW1)), false);
            // equal
            assertEquals(test.overlaps(Interval.of(NOW1, NOW1)), true);
            // completely after
            assertEquals(test.overlaps(Interval.of(NOW1, NOW1.plusSeconds(1))), false);
            assertEquals(test.overlaps(Interval.of(NOW1.plusSeconds(1), NOW1.plusSeconds(2))), false);
        });

        it('test_overlaps_Interval_null', () => {
            expect(() => {
                const base = Interval.of(NOW1, NOW2);
                base.overlaps(null);
            }).to.throw(NullPointerException);
        });
    });

    //-----------------------------------------------------------------------
    describe('intersection', () => {
        const dataIntersection = [
            // adjacent
            [NOW1, NOW2, NOW2, NOW4, NOW2, NOW2],
            // adjacent empty
            [NOW1, NOW4, NOW4, NOW4, NOW4, NOW4],
            // overlap
            [NOW1, NOW3, NOW2, NOW4, NOW2, NOW3],
            // encloses
            [NOW1, NOW4, NOW2, NOW3, NOW2, NOW3],
            // encloses empty
            [NOW1, NOW4, NOW2, NOW2, NOW2, NOW2],
        ];

        it('test_intersection', () => {
            dataProviderTest(dataIntersection, (start1, end1, start2, end2, expStart, expEnd) => {
                const test1 = Interval.of(start1, end1);
                const test2 = Interval.of(start2, end2);
                const expected = Interval.of(expStart, expEnd);
                assertTrue(test1.isConnected(test2));
                assertEquals(test1.intersection(test2), expected);
            });
        });

        it('test_intersection_reverse', () => {
            dataProviderTest(dataIntersection, (start1, end1, start2, end2, expStart, expEnd) => {
                const test1 = Interval.of(start1, end1);
                const test2 = Interval.of(start2, end2);
                const expected = Interval.of(expStart, expEnd);
                assertTrue(test2.isConnected(test1));
                assertEquals(test2.intersection(test1), expected);
            });
        });

        it('test_intersectionBad', () => {
            expect(() => {
                const test1 = Interval.of(NOW1, NOW2);
                const test2 = Interval.of(NOW3, NOW4);
                assertEquals(test1.isConnected(test2), false);
                test1.intersection(test2);
            }).to.throw(DateTimeException);
        });

        it('test_intersection_same', () => {
            const test = Interval.of(NOW2, NOW4);
            assertEquals(test.intersection(test), test);
        });
    });

    //-----------------------------------------------------------------------
    describe('union', () => {
        const data_union = [
            // adjacent
            [NOW1, NOW2, NOW2, NOW4, NOW1, NOW4],
            // adjacent empty
            [NOW1, NOW4, NOW4, NOW4, NOW1, NOW4],
            // overlap
            [NOW1, NOW3, NOW2, NOW4, NOW1, NOW4],
            // encloses
            [NOW1, NOW4, NOW2, NOW3, NOW1, NOW4],
            // encloses empty
            [NOW1, NOW4, NOW2, NOW2, NOW1, NOW4],
        ];

        it('test_unionAndSpan', () => {
            dataProviderTest(data_union, (start1, end1, start2, end2, expStart, expEnd) => {
                const test1 = Interval.of(start1, end1);
                const test2 = Interval.of(start2, end2);
                const expected = Interval.of(expStart, expEnd);
                assertTrue(test1.isConnected(test2));
                assertEquals(test1.union(test2), expected);
                assertEquals(test1.span(test2), expected);
            });
        });

        it('test_unionAndSpan_reverse', () => {
            dataProviderTest(data_union, (start1, end1, start2, end2, expStart, expEnd) => {
                const test1 = Interval.of(start1, end1);
                const test2 = Interval.of(start2, end2);
                const expected = Interval.of(expStart, expEnd);
                assertTrue(test2.isConnected(test1));
                assertEquals(test2.union(test1), expected);
                assertEquals(test2.span(test1), expected);
            });
        });

        it('test_span_enclosesInputs', () => {
            dataProviderTest(data_union, (start1, end1, start2, end2, expStart, expEnd) => {
                const test1 = Interval.of(start1, end1);
                const test2 = Interval.of(start2, end2);
                const expected = Interval.of(expStart, expEnd);
                assertEquals(expected.encloses(test1), true);
                assertEquals(expected.encloses(test2), true);
            });
        });

        it('test_union_disconnected', () => {
            expect(() => {
                const test1 = Interval.of(NOW1, NOW2);
                const test2 = Interval.of(NOW3, NOW4);
                assertFalse(test1.isConnected(test2));
                test1.union(test2);
            }).to.throw(DateTimeException);
        });

        it('test_span_disconnected', () => {
            const test1 = Interval.of(NOW1, NOW2);
            const test2 = Interval.of(NOW3, NOW4);
            assertFalse(test1.isConnected(test2));
            assertEquals(test1.span(test2), Interval.of(NOW1, NOW4));
        });

        it('test_unionAndSpan_same', () => {
            const test = Interval.of(NOW2, NOW4);
            assertEquals(test.union(test), test);
            assertEquals(test.span(test), test);
        });
    });

    //-----------------------------------------------------------------------
    describe('isAfter(Instant)', () => {
        it('test_isAfter_Instant', () => {
            const test = Interval.of(NOW1, NOW2);
            assertEquals(test.isAfter(NOW1.minusSeconds(2)), true);
            assertEquals(test.isAfter(NOW1.minusSeconds(1)), true);
            assertEquals(test.isAfter(NOW1), false);
            assertEquals(test.isAfter(NOW2), false);
            assertEquals(test.isAfter(NOW2.plusSeconds(1)), false);
        });

        it('test_isAfter_Instant_empty', () => {
            const test = Interval.of(NOW1, NOW1);
            assertEquals(test.isAfter(NOW1.minusSeconds(2)), true);
            assertEquals(test.isAfter(NOW1.minusSeconds(1)), true);
            assertEquals(test.isAfter(NOW1), false);
            assertEquals(test.isAfter(NOW1.plusSeconds(1)), false);
        });
    });

    //-----------------------------------------------------------------------
    describe('isBefore(Instant)', () => {
        it('test_isBefore_Instant', () => {
            const test = Interval.of(NOW1, NOW2);
            assertEquals(test.isBefore(NOW1.minusSeconds(1)), false);
            assertEquals(test.isBefore(NOW1), false);
            assertEquals(test.isBefore(NOW2), true);
            assertEquals(test.isBefore(NOW2.plusSeconds(1)), true);
        });

        it('test_isBefore_Instant_empty', () => {
            const test = Interval.of(NOW1, NOW1);
            assertEquals(test.isBefore(NOW1.minusSeconds(1)), false);
            assertEquals(test.isBefore(NOW1), false);
            assertEquals(test.isBefore(NOW1.plusSeconds(1)), true);
        });
    });

    //-----------------------------------------------------------------------
    describe('isAfter(Interval)', () => {
        it('test_isAfter_Interval', () => {
            const test = Interval.of(NOW1, NOW2);
            // completely before
            assertEquals(test.isAfter(Interval.of(NOW1.minusSeconds(2), NOW1.minusSeconds(1))), true);
            assertEquals(test.isAfter(Interval.of(NOW1.minusSeconds(1), NOW1)), true);
            // partly before
            assertEquals(test.isAfter(Interval.of(NOW1.minusSeconds(1), NOW2)), false);
            assertEquals(test.isAfter(Interval.of(NOW1.minusSeconds(1), NOW2.minusSeconds(1))), false);
            // contained
            assertEquals(test.isAfter(Interval.of(NOW1, NOW2.minusSeconds(1))), false);
            assertEquals(test.isAfter(Interval.of(NOW1, NOW2)), false);
            assertEquals(test.isAfter(Interval.of(NOW1.plusSeconds(1), NOW2)), false);
            // partly after
            assertEquals(test.isAfter(Interval.of(NOW1, NOW2.plusSeconds(1))), false);
            assertEquals(test.isAfter(Interval.of(NOW1.plusSeconds(1), NOW2.plusSeconds(1))), false);
            // completely after
            assertEquals(test.isAfter(Interval.of(NOW2, NOW2.plusSeconds(1))), false);
            assertEquals(test.isAfter(Interval.of(NOW2.plusSeconds(1), NOW2.plusSeconds(2))), false);
        });

        it('test_isAfter_Interval_empty', () => {
            const test = Interval.of(NOW1, NOW1);
            // completely before
            assertEquals(test.isAfter(Interval.of(NOW1.minusSeconds(2), NOW1.minusSeconds(1))), true);
            assertEquals(test.isAfter(Interval.of(NOW1.minusSeconds(1), NOW1)), true);
            // equal
            assertEquals(test.isAfter(Interval.of(NOW1, NOW1)), false);
            // completely after
            assertEquals(test.isAfter(Interval.of(NOW1, NOW1.plusSeconds(1))), false);
            assertEquals(test.isAfter(Interval.of(NOW1.plusSeconds(1), NOW1.plusSeconds(2))), false);
        });
    });

    //-----------------------------------------------------------------------
    describe('isBefore(Interval)', () => {
        it('test_isBefore_Interval', () => {
            const test = Interval.of(NOW1, NOW2);
            // completely before
            assertEquals(test.isBefore(Interval.of(NOW1.minusSeconds(2), NOW1.minusSeconds(1))), false);
            assertEquals(test.isBefore(Interval.of(NOW1.minusSeconds(1), NOW1)), false);
            // partly before
            assertEquals(test.isBefore(Interval.of(NOW1.minusSeconds(1), NOW2)), false);
            assertEquals(test.isBefore(Interval.of(NOW1.minusSeconds(1), NOW2.minusSeconds(1))), false);
            // contained
            assertEquals(test.isBefore(Interval.of(NOW1, NOW2.minusSeconds(1))), false);
            assertEquals(test.isBefore(Interval.of(NOW1, NOW2)), false);
            assertEquals(test.isBefore(Interval.of(NOW1.plusSeconds(1), NOW2)), false);
            // partly after
            assertEquals(test.isBefore(Interval.of(NOW1, NOW2.plusSeconds(1))), false);
            assertEquals(test.isBefore(Interval.of(NOW1.plusSeconds(1), NOW2.plusSeconds(1))), false);
            // completely after
            assertEquals(test.isBefore(Interval.of(NOW2, NOW2.plusSeconds(1))), true);
            assertEquals(test.isBefore(Interval.of(NOW2.plusSeconds(1), NOW2.plusSeconds(2))), true);
        });

        it('test_isBefore_Interval_empty', () => {
            const test = Interval.of(NOW1, NOW1);
            // completely before
            assertEquals(test.isBefore(Interval.of(NOW1.minusSeconds(2), NOW1.minusSeconds(1))), false);
            assertEquals(test.isBefore(Interval.of(NOW1.minusSeconds(1), NOW1)), false);
            // equal
            assertEquals(test.isBefore(Interval.of(NOW1, NOW1)), false);
            // completely after
            assertEquals(test.isBefore(Interval.of(NOW1, NOW1.plusSeconds(1))), true);
            assertEquals(test.isBefore(Interval.of(NOW1.plusSeconds(1), NOW1.plusSeconds(2))), true);
        });
    });

    //-----------------------------------------------------------------------
    describe('toDuration', () => {
        it('test_toDuration', () => {
            const test = Interval.of(NOW1, NOW2);
            assertEquals(test.toDuration(), Duration.between(NOW1, NOW2));
        });
    });

    //-----------------------------------------------------------------------
    describe('equals', () => {
        it('test_equals', () => {
            const a = Interval.of(NOW1, NOW2);
            const a2 = Interval.of(NOW1, NOW2);
            const b = Interval.of(NOW1, NOW3);
            const c = Interval.of(NOW2, NOW2);
            assertEquals(a.equals(a), true);
            assertEquals(a.equals(a2), true);
            assertEquals(a.equals(b), false);
            assertEquals(a.equals(c), false);
            assertEquals(a.equals(null), false);
            assertEquals(a.equals(''), false);
            assertEquals(a.hashCode() === a2.hashCode(), true);
        });
    });

    //-----------------------------------------------------------------------
    describe('toString', () => {
        it('test_toString', () => {
            const test = Interval.of(NOW1, NOW2);
            assertEquals(test.toString(), `${NOW1}/${NOW2}`);
        });
    });
});

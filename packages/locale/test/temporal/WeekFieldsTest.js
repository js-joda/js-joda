/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { expect } from 'chai';

import {
    _ as jodaInternal,
    ChronoField,
    ChronoUnit,
    DayOfWeek,
    IllegalArgumentException,
    IllegalStateException,
    IsoChronology,
    IsoFields,
    LocalDate,
    Month,
    ResolverStyle,
    ValueRange,
} from '@js-joda/core';

import '../_init';
import Locale from '../../src/Locale';
import { ComputedDayOfField, WeekFields } from '../../src/temporal/WeekFields';

import { assertEquals, dataProviderTest } from '../testUtils';

const {
    DateTimeBuilder,
} = jodaInternal;

describe('@js-joda/locale WeekFields', () => {
    const data = [
        [LocalDate.of(2016, 12, 31), DayOfWeek.MONDAY, 7, 6, 52, 4, 52, 2016],
        [LocalDate.of(2016, 12, 31), DayOfWeek.SATURDAY, 7, 1, 53, 5, 53, 2016],
        // test corner case of WOWBY/WBY :
        [LocalDate.of(2016, 12, 31), DayOfWeek.FRIDAY, 2, 2, 53, 5, 1, 2017],
        [LocalDate.of(2017, 1, 1), DayOfWeek.MONDAY, 7, 7, 0, 0, 52, 2016],
        [LocalDate.of(2017, 1, 2), DayOfWeek.MONDAY, 7, 1, 1, 1, 1, 2017],
        [LocalDate.of(2017, 1, 1), DayOfWeek.SUNDAY, 7, 1, 1, 1, 1, 2017],
        [LocalDate.of(2017, 1, 10), DayOfWeek.MONDAY, 7, 2, 2, 2, 2, 2017],
    ];

    it('of_firstDayOfWeek_minimalDaysInWeek', () => {
        dataProviderTest(data, (localDate, firstDayOfWeek, minimalDaysInFirstWeek, dayOfWeek, weekOfYear, weekOfMonth, weekOfWeekBasedYear, weekBasedYear) => {
            const wf = WeekFields.of(firstDayOfWeek, minimalDaysInFirstWeek);
            assertEquals(localDate.get(wf.dayOfWeek()), dayOfWeek);
            assertEquals(localDate.get(wf.weekOfMonth()), weekOfMonth);
            assertEquals(localDate.get(wf.weekOfYear()), weekOfYear);
            assertEquals(localDate.get(wf.weekOfWeekBasedYear()), weekOfWeekBasedYear);
            assertEquals(localDate.get(wf.weekBasedYear()), weekBasedYear);
        }, false);
    });

    it('throws exception for wrong rangeUnit', () => {
        const cdf = new ComputedDayOfField('Test', WeekFields.of(DayOfWeek.MONDAY, 7), ChronoUnit.WEEKS, ChronoUnit.HOURS, ChronoField.HOUR_OF_DAY.range());
        expect(() => {
            LocalDate.of(2017, 1, 1).get(cdf);
        }).to.throw(IllegalStateException);
    });

    it('throws exception for wrong minimalDaysInFirstWeek', () => {
        expect(() => {
            WeekFields.of(DayOfWeek.MONDAY, 0);
        }).to.throw(IllegalArgumentException);
        expect(() => {
            WeekFields.of(DayOfWeek.MONDAY, 8);
        }).to.throw(IllegalArgumentException);
    });

    it('equals', () => {
        expect(WeekFields.ISO.equals(WeekFields.of(DayOfWeek.MONDAY, 4))).to.be.true;
        expect(WeekFields.ISO.equals(WeekFields.of(DayOfWeek.MONDAY, 5))).to.be.false;
        expect(WeekFields.ISO.equals(null)).to.be.false;
    });

    describe('ComputedDayFields', () => {
        const data = [
            [WeekFields.ISO.dayOfWeek(), ChronoUnit.DAYS, ChronoUnit.WEEKS, ValueRange.of(1, 7), true, false, 'DayOfWeek[WeekFields[MONDAY,4]]', ValueRange.of(1, 7)],
            [WeekFields.ISO.weekOfMonth(), ChronoUnit.WEEKS, ChronoUnit.MONTHS, ValueRange.of(0, 1, 4, 6), true, false, 'WeekOfMonth[WeekFields[MONDAY,4]]', ValueRange.of(0, 5)],
            [WeekFields.ISO.weekOfYear(), ChronoUnit.WEEKS, ChronoUnit.YEARS, ValueRange.of(0, 1, 52, 54), true, false, 'Week', ValueRange.of(0, 52)],
            [WeekFields.ISO.weekOfWeekBasedYear(), ChronoUnit.WEEKS, IsoFields.WEEK_BASED_YEARS, ValueRange.of(1, 52, 53), true, false, 'WeekOfWeekBasedYear[WeekFields[MONDAY,4]]', ValueRange.of(1, 52)],
            [WeekFields.ISO.weekBasedYear(), IsoFields.WEEK_BASED_YEARS, ChronoUnit.FOREVER, ChronoField.YEAR.range(), true, false, 'WeekBasedYear[WeekFields[MONDAY,4]]', ChronoField.YEAR.range()],
        ];

        const date = LocalDate.of(2017, 1, 1);
        const month = Month.JANUARY;

        it('fields', () => {
            dataProviderTest(data, (field, baseUnit, rangeUnit, range, isDateBased, isTimeBased) => {
                assertEquals(field.baseUnit(), baseUnit);
                assertEquals(field.rangeUnit(), rangeUnit);
                assertEquals(field.range(), range);
                assertEquals(field.isDateBased(), isDateBased);
                assertEquals(field.isTimeBased(), isTimeBased);
            }, false);
        });

        it('displayName', () => {
            dataProviderTest(data, (field, baseUnit, rangeUnit, range, isDateBased, isTimeBased, displayName) => {
                assertEquals(field.displayName(Locale.US), displayName);
            }, false);
        });

        it('isSupportedBy', () => {
            dataProviderTest(data, (field) => {
                assertEquals(field.isSupportedBy(date), true);
                assertEquals(field.isSupportedBy(month), false);
            }, false);
        });

        it('rangeRefinedBy', () => {
            dataProviderTest(data, (field, baseUnit, rangeUnit, range, isDateBase, isTimeBased, displayName, rangeRefined) => {
                assertEquals(field.rangeRefinedBy(date), rangeRefined);
            }, false);
        });

        it('rangeRefinedBy throws for invalid rangeUnit', () => {
            const cdf = new ComputedDayOfField('Test', WeekFields.of(DayOfWeek.MONDAY, 7), ChronoUnit.WEEKS, ChronoUnit.HOURS, ChronoField.HOUR_OF_DAY.range());
            expect(() => {
                cdf.rangeRefinedBy(LocalDate.of(2017, 1, 1));
            }).to.throw(IllegalStateException);
        });

        describe('adjustInto', () => {
            const data = [
                [LocalDate.of(2017, 1, 1), WeekFields.ISO.dayOfWeek(), 1, LocalDate.of(2016, 12, 26)],
                [LocalDate.of(2017, 1, 2), WeekFields.ISO.dayOfWeek(), 1, LocalDate.of(2017, 1, 2)],
                [LocalDate.of(2017, 1, 2), WeekFields.ISO.dayOfWeek(), 7, LocalDate.of(2017, 1, 8)],
                [LocalDate.of(2017, 1, 1), WeekFields.ISO.weekOfMonth(), 1, LocalDate.of(2017, 1, 8)],
                [LocalDate.of(2017, 1, 2), WeekFields.ISO.weekOfMonth(), 1, LocalDate.of(2017, 1, 2)],
                [LocalDate.of(2017, 1, 2), WeekFields.ISO.weekOfMonth(), 4, LocalDate.of(2017, 1, 23)],
                [LocalDate.of(2017, 1, 1), WeekFields.ISO.weekOfYear(), 1, LocalDate.of(2017, 1, 8)],
                [LocalDate.of(2017, 1, 2), WeekFields.ISO.weekOfYear(), 1, LocalDate.of(2017, 1, 2)],
                [LocalDate.of(2017, 1, 2), WeekFields.ISO.weekOfYear(), 2, LocalDate.of(2017, 1, 9)],
                [LocalDate.of(2017, 1, 1), WeekFields.ISO.weekOfWeekBasedYear(), 1, LocalDate.of(2016, 1, 10)],
                [LocalDate.of(2017, 1, 2), WeekFields.ISO.weekOfWeekBasedYear(), 1, LocalDate.of(2017, 1, 2)],
                [LocalDate.of(2017, 1, 2), WeekFields.ISO.weekOfWeekBasedYear(), 2, LocalDate.of(2017, 1, 9)],
                [LocalDate.of(2017, 1, 1), WeekFields.ISO.weekBasedYear(), 2017, LocalDate.of(2017, 12, 31)],
                [LocalDate.of(2017, 1, 1), WeekFields.ISO.weekBasedYear(), 2016, LocalDate.of(2017, 1, 1)],
                [LocalDate.of(2017, 1, 2), WeekFields.ISO.weekBasedYear(), 2016, LocalDate.of(2016, 1, 4)],
                // corner cases of years (53 week years adjusted to other years)
                [LocalDate.of(2016, 1, 3), WeekFields.ISO.weekBasedYear(), 2016, LocalDate.of(2017, 1, 1)],
                [LocalDate.of(2004, 12, 31), WeekFields.ISO.weekBasedYear(), 2009, LocalDate.of(2010, 1, 1)],
            ];

            it('adjustInto', () => {
                dataProviderTest(data, (localDate, field, newValue, expectedValue) => {
                    assertEquals(field.adjustInto(localDate, newValue), expectedValue);
                }, false);
            });
        });

        describe('resolve', () => {
            const builder = () => {
                // create fieldValues from DateTimeBuilder
                const builder = new DateTimeBuilder();
                builder.chrono = IsoChronology.INSTANCE;
                builder._addFieldValue(WeekFields.ISO.weekBasedYear(), 2017);
                builder._addFieldValue(ChronoField.YEAR, 2017);
                builder._addFieldValue(ChronoField.MONTH_OF_YEAR, 1);
                builder._addFieldValue(ChronoField.DAY_OF_MONTH, 2);
                builder._addFieldValue(ChronoField.DAY_OF_WEEK, 1);
                builder._addFieldValue(WeekFields.ISO.dayOfWeek(), 1);
                builder._addFieldValue(WeekFields.ISO.weekOfMonth(), 1);
                builder._addFieldValue(WeekFields.ISO.weekOfYear(), 1);
                builder._addFieldValue(WeekFields.ISO.weekOfWeekBasedYear(), 1);
                builder._addFieldValue(WeekFields.ISO.weekBasedYear(), 2017);
                return builder;
            };

            const emptyBuilder = () => {
                const emptyBuilder = new DateTimeBuilder();
                emptyBuilder.chrono = IsoChronology.INSTANCE;
                return emptyBuilder;
            };

            const dayOfWeekBuilder = () => {
                const dayOfWeekBuilder = new DateTimeBuilder();
                dayOfWeekBuilder.chrono = IsoChronology.INSTANCE;
                dayOfWeekBuilder._addFieldValue(ChronoField.DAY_OF_WEEK, 1);
                return dayOfWeekBuilder;
            };

            const data = [
                [WeekFields.ISO.weekOfYear(), emptyBuilder().fieldValues, LocalDate.of(2017, 1, 1), ResolverStyle.STRICT, null],
                [WeekFields.ISO.weekBasedYear(), dayOfWeekBuilder().fieldValues, LocalDate.of(2017, 1, 1), ResolverStyle.STRICT, null],
                [WeekFields.ISO.dayOfWeek(), builder().fieldValues, LocalDate.of(2017, 1, 1), ResolverStyle.STRICT, 1],
                [WeekFields.ISO.weekOfMonth(), builder().fieldValues, LocalDate.of(2017, 1, 1), ResolverStyle.STRICT, null],
                [WeekFields.ISO.weekOfMonth(), builder().fieldValues, LocalDate.of(2017, 1, 1), ResolverStyle.LENIENT, null],
                [WeekFields.ISO.weekOfYear(), builder().fieldValues, LocalDate.of(2017, 1, 1), ResolverStyle.STRICT, null],
                [WeekFields.ISO.weekOfYear(), builder().fieldValues, LocalDate.of(2017, 1, 1), ResolverStyle.LENIENT, null],
                [WeekFields.ISO.weekBasedYear(), builder().fieldValues, LocalDate.of(2017, 1, 1), ResolverStyle.STRICT, null],
                [WeekFields.ISO.weekBasedYear(), builder().fieldValues, LocalDate.of(2017, 1, 1), ResolverStyle.LENIENT, null],
            ];

            const dataException = [
                [WeekFields.ISO.weekOfWeekBasedYear(), builder().fieldValues, LocalDate.of(2017, 1, 1), ResolverStyle.STRICT, 1],
            ];

            it('resolve', () => {
                dataProviderTest(data, (field, fieldValues, temporal, resolverStyle, expectedValue) => {
                    field.resolve(fieldValues, temporal, resolverStyle);
                    assertEquals(fieldValues.get(field), expectedValue);
                }, false);
            });

            it('resolve throws', () => {
                dataProviderTest(dataException, (field, fieldValues, temporal, resolverStyle) => {
                    expect(() => {
                        field.resolve(fieldValues, temporal, resolverStyle);
                    }).to.throw();
                }, false);
            });
        });
    });
});

/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import '../../_init';
import {assertEquals, dataProviderTest, isCoverageTestRunner, isBrowserTestRunner} from '../../testUtils';

import {DayOfWeek} from '../../../src/DayOfWeek';
import {LocalDate} from '../../../src/LocalDate';
import {ValueRange} from '../../../src/temporal/ValueRange';

import {ChronoField} from '../../../src/temporal/ChronoField';
import {IsoFields} from '../../../src/temporal/IsoFields';

describe('org.threeten.bp.temporal.TestIsoFields', ()=>{

    // @DataProvider(name='week')
    function data_week() {
        return [
            [LocalDate.of(1969, 12, 29), DayOfWeek.MONDAY, 1, 1970],
            [LocalDate.of(1998, 12, 27), DayOfWeek.SUNDAY, 52, 1998],
            [LocalDate.of(1998, 12, 28), DayOfWeek.MONDAY, 53, 1998],
            [LocalDate.of(1998, 12, 31), DayOfWeek.THURSDAY, 53, 1998],
            [LocalDate.of(1999, 1, 1), DayOfWeek.FRIDAY, 53, 1998],
            [LocalDate.of(1999, 1, 3), DayOfWeek.SUNDAY, 53, 1998],
            [LocalDate.of(1999, 1, 4), DayOfWeek.MONDAY, 1, 1999],
            [LocalDate.of(2012, 12, 23), DayOfWeek.SUNDAY, 51, 2012],
            [LocalDate.of(2012, 12, 24), DayOfWeek.MONDAY, 52, 2012],
            [LocalDate.of(2012, 12, 27), DayOfWeek.THURSDAY, 52, 2012],
            [LocalDate.of(2012, 12, 28), DayOfWeek.FRIDAY, 52, 2012],
            [LocalDate.of(2012, 12, 29), DayOfWeek.SATURDAY, 52, 2012],
            [LocalDate.of(2012, 12, 30), DayOfWeek.SUNDAY, 52, 2012],
            [LocalDate.of(2012, 12, 31), DayOfWeek.MONDAY, 1, 2013],
            [LocalDate.of(2013, 1, 1), DayOfWeek.TUESDAY, 1, 2013],
            [LocalDate.of(2013, 1, 2), DayOfWeek.WEDNESDAY, 1, 2013],
            [LocalDate.of(2013, 1, 6), DayOfWeek.SUNDAY, 1, 2013],
            [LocalDate.of(2013, 1, 7), DayOfWeek.MONDAY, 2, 2013]
        ];
    }

    describe('WEEK_OF_WEEK_BASED_YEAR', () => {

        // @Test(dataProvider='week')
        it('test_WOWBY', function () {
            dataProviderTest(data_week, (date, dow, week) => {
                assertEquals(date.dayOfWeek(), dow);
                assertEquals(IsoFields.WEEK_OF_WEEK_BASED_YEAR.getFrom(date), week);
                assertEquals(date.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR), week);
            });
        });

        // @Test(dataProvider='week')
        it('test_with_WOWBY', function () {
            dataProviderTest(data_week, (date, dow, week) => {
                assertEquals(
                    date.with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, week).with(ChronoField.DAY_OF_WEEK, dow.value()),
                    date);
            });
        });

    });


    describe('WEEK_BASED_YEAR', () => {

        // @Test(dataProvider='week')
        it('test_WBY', function () {
            dataProviderTest(data_week, (date, dow, week, wby) => {
                assertEquals(date.dayOfWeek(), dow);
                assertEquals(IsoFields.WEEK_BASED_YEAR.getFrom(date), wby);
                assertEquals(date.get(IsoFields.WEEK_BASED_YEAR), wby);
            });
        });

        // @Test(dataProvider='week')
        it('test_with_WBY', function () {
            dataProviderTest(data_week, (date, dow, week, wby) => {
                assertEquals(
                    date.with(IsoFields.WEEK_BASED_YEAR, wby),
                    date);
            });
        });

        it('test_week_overflow', function () {
            dataProviderTest([
                [LocalDate.of(1964, 12, 28), 1965, LocalDate.of(1965, 12, 27)],
                [LocalDate.of(2015, 12, 31), 2016, LocalDate.of(2016, 12, 29)]
            ], (date, wby, expected) => {
                assertEquals(date.with(IsoFields.WEEK_BASED_YEAR, wby), expected);
            });

        });

    });

    /* TODO weekday parser
    describe('parse weeks', () => {

        // @Test(dataProvider='week')
        it('test_parse_weeks', function () {
            dataProviderTest(data_week, (date, dow, week, wby) => {
                const f = new DateTimeFormatterBuilder()
                    .appendValue(IsoFields.WEEK_BASED_YEAR).appendLiteral('-')
                    .appendValue(IsoFields.WEEK_OF_WEEK_BASED_YEAR).appendLiteral('-')
                    .appendValue(ChronoField.DAY_OF_WEEK).toFormatter();
                const parsed = LocalDate.parse(wby + '-' + week + '-' + dow.value(), f);
                assertEquals(parsed, date);
            });
        });

    });
*/

    const yearsToLoop = isCoverageTestRunner() || isBrowserTestRunner() ? 2 : 23; // should be at least 400
    it('test_loop', function () {
        // yearsToLoop = 400; this.timeout(10000);
        // loop round at least one 400 year cycle, including before 1970
        let date = LocalDate.of(1960, 1, 5);  // Tuseday of week 1 1960
        let year = 1960;
        const endYear = year + yearsToLoop;
        let wby = 1960;
        let weekLen = 52;
        let week = 1;
        while (date.year() < endYear) {
            const loopDow = date.dayOfWeek();
            if (date.year() !== year) {
                year = date.year();
            }
            if (loopDow === DayOfWeek.MONDAY) {
                week++;
                if ((week === 53 && weekLen === 52) || week === 54) {
                    week = 1;
                    const firstDayOfWeekBasedYear = date.plusDays(14).withDayOfYear(1);
                    const firstDay = firstDayOfWeekBasedYear.dayOfWeek();
                    weekLen = (firstDay === DayOfWeek.THURSDAY || (firstDay === DayOfWeek.WEDNESDAY && firstDayOfWeekBasedYear.isLeapYear()) ? 53 : 52);
                    wby++;
                }
            }
            assertEquals(IsoFields.WEEK_OF_WEEK_BASED_YEAR.rangeRefinedBy(date), ValueRange.of(1, weekLen), 'Failed on ' + date + ' ' + date.dayOfWeek());
            assertEquals(IsoFields.WEEK_OF_WEEK_BASED_YEAR.getFrom(date), week, 'Failed on ' + date + ' ' + date.dayOfWeek());
            assertEquals(date.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR), week, 'Failed on ' + date + ' ' + date.dayOfWeek());
            assertEquals(date.isoWeekOfWeekyear(), week, 'Failed on ' + date + ' ' + date.dayOfWeek());
            assertEquals(IsoFields.WEEK_BASED_YEAR.getFrom(date), wby, 'Failed on ' + date + ' ' + date.dayOfWeek());
            assertEquals(date.get(IsoFields.WEEK_BASED_YEAR), wby, 'Failed on ' + date + ' ' + date.dayOfWeek());
            assertEquals(date.isoWeekyear(), wby, 'Failed on ' + date + ' ' + date.dayOfWeek());
            date = date.plusDays(1);
        }
    });

    describe('week years between / plus', function () {

        function data_weekYearsBetween() {
            return [
                [LocalDate.of(1969, 12, 28), LocalDate.of(1969, 12, 28), 0],
                [LocalDate.of(1969, 12, 28), LocalDate.of(1969, 12, 29), 1],

                [LocalDate.of(1998, 12, 28), LocalDate.of(1998, 12, 29), 0],
                [LocalDate.of(1998, 12, 28), LocalDate.of(1999, 1, 3), 0],
                [LocalDate.of(1998, 12, 28), LocalDate.of(1999, 1, 4), 1],
                [LocalDate.of(1998, 12, 28), LocalDate.of(2000, 1, 2), 1],
                [LocalDate.of(1998, 12, 28), LocalDate.of(2000, 1, 4), 2]
            ];
        }

        it('test_weak_years_between', function () {

            dataProviderTest(data_weekYearsBetween, (start, end, expected) => {
                assertEquals(IsoFields.WEEK_BASED_YEARS.between(start, end), expected);
                assertEquals(start.until(end, IsoFields.WEEK_BASED_YEARS), expected);
                assertEquals(IsoFields.WEEK_BASED_YEARS.between(end, start), expected !== 0 ? -expected : 0);
                assertEquals(end.until(start, IsoFields.WEEK_BASED_YEARS), expected !== 0 ? -expected : 0);
            });

        });

        it('test_weak_years_plus', function () {

            dataProviderTest([
                [LocalDate.of(1969, 12, 28), 0, LocalDate.of(1969, 12, 28)],
                [LocalDate.of(1969, 12, 28), 1, LocalDate.of(1970, 12, 27)],
                [LocalDate.of(1969, 12, 29), 0, LocalDate.of(1969, 12, 29)],
                [LocalDate.of(1969, 12, 29), 1, LocalDate.of(1971, 1, 4)]
            ], (date, weeks, expected) => {
                assertEquals(date.plus(weeks, IsoFields.WEEK_BASED_YEARS), expected);
                assertEquals(date.plus(weeks, IsoFields.WEEK_BASED_YEARS).dayOfWeek(), expected.dayOfWeek());

                assertEquals(IsoFields.WEEK_BASED_YEARS.addTo(date, weeks), expected);

                assertEquals(expected.minus(weeks, IsoFields.WEEK_BASED_YEARS), date);
            });

        });

    });

    describe('DAY_OF_QUARTER/ QUARTER_OF_YEAR', function () {

        function data_quarter() {
            return [
                [LocalDate.of(2015, 1, 1), 1, 1],
                [LocalDate.of(2015, 3, 31), 90, 1],
                [LocalDate.of(2015, 4, 1), 1, 2],
                [LocalDate.of(2015, 6, 30), 91, 2],
                [LocalDate.of(2015, 7, 1), 1, 3],
                [LocalDate.of(2015, 9, 30), 92, 3],
                [LocalDate.of(2015, 10, 1), 1, 4],
                [LocalDate.of(2015, 12, 31), 92, 4],
                // leap year
                [LocalDate.of(2016, 1, 1), 1, 1],
                [LocalDate.of(2016, 3, 31), 91, 1],
                [LocalDate.of(2016, 4, 1), 1, 2],
                [LocalDate.of(2016, 6, 30), 91, 2],
                [LocalDate.of(2016, 7, 1), 1, 3],
                [LocalDate.of(2016, 9, 30), 92, 3],
                [LocalDate.of(2016, 10, 1), 1, 4],
                [LocalDate.of(2016, 12, 31), 92, 4]
            ];
        }

        it('test_quarters', function () {
            dataProviderTest(data_quarter, (date, doq, q) => {
                assertEquals(date.get(IsoFields.DAY_OF_QUARTER), doq);
                assertEquals(date.get(IsoFields.QUARTER_OF_YEAR), q);
            });
        });

        it('test_with_quarters', function () {
            dataProviderTest(data_quarter, (date, doq, q) => {
                assertEquals(date.with(IsoFields.QUARTER_OF_YEAR, q), date);
            });
        });

        it('test_with_day_of_quarter', function () {
            dataProviderTest(data_quarter, (date, doq, q) => {
                assertEquals(
                    LocalDate.EPOCH_0
                        .withYear(date.year())
                        .with(IsoFields.QUARTER_OF_YEAR, q)
                        .with(IsoFields.DAY_OF_QUARTER, doq),
                    date);
            });
        });

    });

    describe('quarters between/ plus', function () {

        // @DataProvider(name='quartersBetween')
        function data_quartersBetween() {
            return [
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 1, 1), 0],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 1, 2), 0],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 2, 1), 0],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 3, 1), 0],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 3, 31), 0],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 4, 1), 1],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 4, 2), 1],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 6, 30), 1],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 7, 1), 2],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 10, 1), 3],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 12, 31), 3],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2001, 1, 1), 4],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2002, 1, 1), 8],

                [LocalDate.of(2000, 1, 1), LocalDate.of(1999, 12, 31), 0],
                [LocalDate.of(2000, 1, 1), LocalDate.of(1999, 10, 2), 0],
                [LocalDate.of(2000, 1, 1), LocalDate.of(1999, 10, 1), -1],
                [LocalDate.of(2000, 1, 1), LocalDate.of(1999, 7, 2), -1],
                [LocalDate.of(2000, 1, 1), LocalDate.of(1999, 7, 1), -2],
                [LocalDate.of(2000, 1, 1), LocalDate.of(1999, 4, 2), -2],
                [LocalDate.of(2000, 1, 1), LocalDate.of(1999, 4, 1), -3],
                [LocalDate.of(2000, 1, 1), LocalDate.of(1999, 1, 2), -3],
                [LocalDate.of(2000, 1, 1), LocalDate.of(1999, 1, 1), -4],
                [LocalDate.of(2000, 1, 1), LocalDate.of(1998, 12, 31), -4],
                [LocalDate.of(2000, 1, 1), LocalDate.of(1998, 10, 2), -4],
                [LocalDate.of(2000, 1, 1), LocalDate.of(1998, 10, 1), -5]
            ];
        }

        it('test_quarters_between', function () {

            dataProviderTest(data_quartersBetween, (start, end, expected) => {
                assertEquals(IsoFields.QUARTER_YEARS.between(start, end), expected);
                assertEquals(start.until(end, IsoFields.QUARTER_YEARS), expected);
            });

        });


        function data_quartersPlus() {
            return [
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 1, 1), 0],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 4, 1), 1],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 7, 1), 2],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2000, 10, 1), 3],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2001, 1, 1), 4],
                [LocalDate.of(2000, 1, 1), LocalDate.of(2001, 4, 1), 5],

                [LocalDate.of(2001, 1, 1), LocalDate.of(2001, 1, 1), 0],
                [LocalDate.of(2001, 1, 1), LocalDate.of(2001, 4, 1), 1],
                [LocalDate.of(2001, 1, 1), LocalDate.of(2001, 7, 1), 2],
                [LocalDate.of(2001, 1, 1), LocalDate.of(2001, 10, 1), 3],
                [LocalDate.of(2001, 1, 1), LocalDate.of(2002, 1, 1), 4],
                [LocalDate.of(2001, 1, 1), LocalDate.of(2002, 4, 1), 5],

                [LocalDate.of(2001, 3, 31), LocalDate.of(2001, 3, 31), 0],
                [LocalDate.of(2001, 3, 31), LocalDate.of(2001, 6, 30), 1],
                [LocalDate.of(2001, 3, 31), LocalDate.of(2001, 9, 30), 2],
                [LocalDate.of(2001, 3, 31), LocalDate.of(2001, 12, 31), 3],
                [LocalDate.of(2001, 3, 31), LocalDate.of(2002, 3, 31), 4],
                [LocalDate.of(2001, 3, 31), LocalDate.of(2002, 6, 30), 5]
            ];
        }


        it('test_quarters_plus', function () {

            dataProviderTest(data_quartersPlus, (date, expected, quartersToAdd) => {
                assertEquals(date.plus(quartersToAdd, IsoFields.QUARTER_YEARS), expected);
                assertEquals(IsoFields.QUARTER_YEARS.addTo(date, quartersToAdd), expected);

                assertEquals(expected.minus(quartersToAdd, IsoFields.QUARTER_YEARS), date.withDayOfMonth(expected.dayOfMonth()));
            });

        });

    });

});




import '../../_init';
import {assertEquals, dataProviderTest, isCoverageTestRunner} from '../../testUtils';

import {DayOfWeek} from '../../../src/DayOfWeek';
import {LocalDate} from '../../../src/LocalDate';
import {ValueRange} from '../../../src/temporal/ValueRange';

import {DateTimeFormatterBuilder} from '../../../src/format/DateTimeFormatterBuilder';
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

    });

/* TODO parser
    describe('parse weeks', () => {

        // @Test(dataProvider='week')
        it('test_parse_weeks', function () {
            dataProviderTest(data_week, (date, dow, week, wby) => {
                var f = new DateTimeFormatterBuilder()
                    .appendValue(IsoFields.WEEK_BASED_YEAR).appendLiteral('-')
                    .appendValue(IsoFields.WEEK_OF_WEEK_BASED_YEAR).appendLiteral('-')
                    .appendValue(ChronoField.DAY_OF_WEEK).toFormatter();
                var parsed = LocalDate.parse(wby + '-' + week + '-' + dow.value(), f);
                assertEquals(parsed, date);
            });
        });

    });
*/

    var yearsToLoop = isCoverageTestRunner() ? 2 : 40; // should be at least 400
    it('test_loop', function () {
        // yearsToLoop = 400; this.timeout(10000);
        // loop round at least one 400 year cycle, including before 1970
        var date = LocalDate.of(1960, 1, 5);  // Tuseday of week 1 1960
        var year = 1960;
        var endYear = year + yearsToLoop;
        var wby = 1960;
        var weekLen = 52;
        var week = 1;
        while (date.year() < endYear) {
            var loopDow = date.dayOfWeek();
            if (date.year() !== year) {
                year = date.year();
            }
            if (loopDow === DayOfWeek.MONDAY) {
                week++;
                if ((week === 53 && weekLen === 52) || week === 54) {
                    week = 1;
                    var firstDayOfWeekBasedYear = date.plusDays(14).withDayOfYear(1);
                    var firstDay = firstDayOfWeekBasedYear.dayOfWeek();
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


    describe('quarters between', function () {
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
            });

        });
    });

    // TODO more tests

});



/// <reference path="../../dist/js-joda.d.ts" />

import ChronoField = JSJoda.ChronoField;
import ChronoUnit = JSJoda.ChronoUnit;
import DayOfWeek = JSJoda.DayOfWeek;
import Duration = JSJoda.Duration;
import Instant = JSJoda.Instant;
import IsoFields = JSJoda.IsoFields;
import LocalDate = JSJoda.LocalDate;
import LocalDateTime = JSJoda.LocalDateTime;
import LocalTime = JSJoda.LocalTime;
import Month = JSJoda.Month;
import nativeJs = JSJoda.nativeJs;
import Period = JSJoda.Period;
import TemporalAdjusters = JSJoda.TemporalAdjusters;
import ZoneOffset = JSJoda.ZoneOffset;

// used below
declare function moment(): any;

/* - these test function don't actually *do* anything, they are also not meant to be run
 * - they are used to test the typescript definitions / typings that we provide
 * - they are mostly copied from the CheatSheet.md file and show usage of JSJoda and wether the usage complies
 *   with the typing definitions
 *
 *  We used the Contribution guide ideas from DefinitelyTyped for these "tests"
 *  For more information, see e.g. http:
 */

function test_LocalDate() {
    LocalDate.now();
    LocalDate.now(ZoneOffset.UTC);
    LocalDate.parse('2016-02-23');
    LocalDate.of(2016, 2, 23);
    LocalDate.of(2016, Month.FEBRUARY, 23);
    LocalDate.ofEpochDay(-1);
    LocalDate.ofYearDay(2016, 42);

    let d = LocalDate.parse('2016-12-24');

    d.toString();
    d.dayOfMonth();
    d.month();
    d.monthValue();
    d.year();
    d.dayOfWeek();
    d.dayOfWeek().value();
    d.dayOfYear();
    d.isLeapYear();
    d.plusYears(1).isLeapYear();
    d.toEpochDay();
    d.lengthOfMonth();
    d.range(ChronoField.DAY_OF_MONTH);
    d.lengthOfYear();
    d.range(ChronoField.DAY_OF_YEAR);
    d.get(ChronoField.ALIGNED_WEEK_OF_YEAR);
    d.get(ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH);
    d.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);

    d.isoWeekOfWeekyear();
    d.isoWeekyear();

    LocalDate.of(2017, 1, 1).isoWeekOfWeekyear();
    LocalDate.of(2017, 1, 1).isoWeekyear();
    d.with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, 52);
    d.get(IsoFields.QUARTER_OF_YEAR);
    d.get(IsoFields.DAY_OF_QUARTER);
    d.with(IsoFields.QUARTER_OF_YEAR, 3).with(IsoFields.DAY_OF_QUARTER, 15);

    d = LocalDate.parse('2016-02-23');
    d.plusDays(366);
    d.minusDays(366);
    d.plusMonths(12);
    d.minusMonths(12);
    d.plusWeeks(4);
    d.minusWeeks(4);
    d.plusYears(1);
    d.minusYears(1);
    d.plus(3, ChronoUnit.DECADES);
    d.minus(3, ChronoUnit.DECADES);
    d.plus(Period.ofMonths(3).plusDays(3));
    d.minus(Period.ofMonths(3).plusDays(3));

    d = LocalDate.parse('2016-12-24');
    d.withDayOfMonth(1);
    d.withMonth(1).withDayOfMonth(1);
    d.withMonth(Month.NOVEMBER).withDayOfMonth(1);
    d.withYear(1);
    LocalDate.now().plusMonths(1).withDayOfMonth(1).minusDays(1);
    d.withDayOfYear(42);
    d.with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, 52)

    let d1 = LocalDate.parse('2016-12-24');
    let d2 = d1.plusDays(2);

    d1.isAfter(d2);
    d1.isBefore(d2);

    d1.equals(d2);
    d1.equals(d1.plusDays(0));
    d1.equals(d1.plusDays(1));

    d1.compareTo(d1) === 0;
    d1.compareTo(d2) < 0;
    d2.compareTo(d1) > 0;

    d1.hashCode();
    d2.hashCode();
    d1.hashCode() !== d2.hashCode();

    d1 = LocalDate.parse('2016-12-24');
    d2 = d1.plusMonths(13).plusDays(42);
    d1.until(d2).toString();
    d1.until(d2).toTotalMonths();
    d1.until(d2, ChronoUnit.MONTHS);
    d1.until(d2, ChronoUnit.DAYS);

    LocalDate.from(LocalDateTime.now());
    LocalDateTime.now().toLocalDate();

    d1 = LocalDate.parse('2016-02-25');
    d1.atStartOfDay();
    d1.atTime(LocalTime.of(11, 55));
    d1.atTime(LocalTime.NOON);
    d = LocalDate.ofInstant(Instant.ofEpochMilli(new Date().getTime()));
    d = LocalDate.from(nativeJs(new Date()));
    d = LocalDate.from(nativeJs(moment()));

    d = LocalDate.parse('2016-12-24');
    d.with(TemporalAdjusters.firstDayOfMonth());
    d.with(TemporalAdjusters.lastDayOfMonth());
    d.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
    d.with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY));
    d.with(TemporalAdjusters.next(DayOfWeek.SATURDAY));
    d.with(TemporalAdjusters.lastInMonth(DayOfWeek.SATURDAY));
    d.with(TemporalAdjusters.firstInMonth(DayOfWeek.SATURDAY));
}

function test_LocalTime() {
    LocalTime.now();
    LocalTime.now(ZoneOffset.UTC);
    LocalTime.parse('09:42');
    LocalTime.parse('09:42:42');
    LocalTime.parse('09:42:42.123');
    LocalTime.parse('09:42:42.123456789');
    LocalTime.of(23, 55);
    LocalTime.of(23, 55, 42);
    LocalTime.of(23, 55, 42, 123000000);
    LocalTime.ofSecondOfDay(3666);

    let t = LocalTime.parse('23:55:42.123');

    t.toString();

    t.hour();
    t.minute();
    t.second();
    t.nano();
    t.get(ChronoField.SECOND_OF_DAY);
    t.get(ChronoField.MILLI_OF_SECOND);
    t.get(ChronoField.HOUR_OF_AMPM);

    t = LocalTime.parse('11:55:42');
    t.plusHours(12);
    t.minusHours(12);
    t.plusMinutes(30);
    t.minusMinutes(30);
    t.plusSeconds(30);
    t.minusSeconds(30);
    t.plusNanos(1000000);
    t.minusNanos(1000000);
    t.plus(1, ChronoUnit.MILLIS);
    t.plus(1, ChronoUnit.HALF_DAYS);
    t.plus(Duration.ofMinutes(15));
    t.minus(Duration.ofMinutes(15));

    t = LocalTime.parse('11:55:42');
    t.withHour(1);
    t.withMinute(1);
    t.withSecond(1);
    t.with(ChronoField.MILLI_OF_SECOND, 51);
    let nextEvenSecond = {
        adjustInto: function (t: LocalTime) {
            return t.second() % 2 === 0 ? t.plusSeconds(2) : t.plusSeconds(1);
        }
    };
    t.with(nextEvenSecond);
    t.plusSeconds(1).with(nextEvenSecond);

    t = LocalTime.parse('23:55:42.123');

    t.truncatedTo(ChronoUnit.SECONDS);
    t.truncatedTo(ChronoUnit.MINUTES);
    t.truncatedTo(ChronoUnit.HOURS);
    t.truncatedTo(ChronoUnit.HALF_DAYS);
    t.truncatedTo(ChronoUnit.DAYS);

    let t1 = LocalTime.parse('11:55:42');
    let t2 = t1.plusHours(2);

    t1.isAfter(t2);
    t1.isBefore(t2);

    t1.equals(t1.plusHours(0));
    t1.equals(t1.plusHours(1));

    t1.compareTo(t1) === 0;
    t1.compareTo(t2) < 0;
    t2.compareTo(t1) > 0;

    t1.hashCode();
    t2.hashCode();
    t1.hashCode() !== t2.hashCode();

    t1 = LocalTime.parse('11:00');
    t2 = t1.plusHours(2).plusMinutes(42).plusSeconds(12);
    t1.until(t2, ChronoUnit.HOURS);
    t1.until(t2, ChronoUnit.MINUTES);
    t1.until(t2, ChronoUnit.SECONDS);

    t = LocalTime.ofInstant(Instant.ofEpochMilli(new Date().getTime()));
    t = LocalTime.from(nativeJs(new Date()));
    t = LocalTime.from(nativeJs(moment()));
}
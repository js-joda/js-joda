import {
    ChronoField,
    ChronoUnit,
    Clock,
    DateTimeFormatter,
    DayOfWeek,
    Duration,
    Instant,
    IsoFields,
    LocalDate,
    LocalDateTime,
    LocalTime,
    Month,
    nativeJs,
    Period,
    Temporal,
    TemporalAdjusters,
    YearMonth,
    ZoneOffset,
    ZonedDateTime,
    ZoneId
} from '../../'

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
    d.with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, 52);

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
        adjustInto: function<T extends Temporal> (t: T): T {
            return t.plus(t.get(ChronoField.SECOND_OF_MINUTE) % 2 === 0 ? 2 : 1, ChronoUnit.SECONDS);
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

function test_LocalDateTime() {
    LocalDateTime.now();
    LocalDateTime.now(ZoneOffset.UTC);
    LocalDateTime.parse('2016-02-26T09:42');
    LocalDateTime.parse('2016-02-26T09:42:42.123');

    LocalDateTime.of(2016, 2, 29);
    LocalDateTime.of(2016, 2, 29, 12, 55, 42);
    LocalDateTime.of(2016, 2, 29, 12, 55, 42, 9);

    LocalDateTime.ofEpochSecond(0, ZoneOffset.UTC);
    LocalDateTime.ofInstant(Instant.now());
    LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC);

    let dt: LocalDateTime = LocalDateTime.parse('2016-02-26T23:55:42.123');

    dt.toString();

    dt.year();
    dt.month();
    dt.monthValue();
    dt.dayOfMonth();
    dt.hour();
    dt.minute();
    dt.second();
    dt.nano();

    dt.dayOfWeek();
    dt.dayOfWeek().value();
    dt.dayOfYear();
    dt.toLocalDate().isLeapYear();

    dt.toLocalDate();
    dt.toLocalTime();
    dt.toLocalDate().lengthOfMonth();
    dt.range(ChronoField.DAY_OF_MONTH);

    dt.toLocalDate().lengthOfYear();
    dt.range(ChronoField.DAY_OF_YEAR);

    dt.get(ChronoField.ALIGNED_WEEK_OF_YEAR);

    dt.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);
    dt.toLocalDate().isoWeekOfWeekyear();
    dt.get(ChronoField.SECOND_OF_DAY);
    dt.get(ChronoField.MILLI_OF_SECOND);
    dt.get(ChronoField.HOUR_OF_AMPM);


    dt = LocalDateTime.parse('2016-02-26T23:55:42.123');
    dt.plusDays(366);
    dt.minusDays(366);

    dt.plusMonths(12);
    dt.minusMonths(12);

    dt.plusWeeks(4);
    dt.minusWeeks(4);

    dt.plusYears(1);
    dt.minusYears(1);

    dt.plus(3, ChronoUnit.DECADES);
    dt.minus(3, ChronoUnit.DECADES);

    dt.plus(Period.ofMonths(3).plusDays(3));
    dt.minus(Period.ofMonths(3).plusDays(3));

    dt.plusHours(12);
    dt.minusHours(12);

    dt.plusMinutes(30);
    dt.minusMinutes(30);

    dt.plusSeconds(30);
    dt.minusSeconds(30);

    dt.plusNanos(1000000);
    dt.minusNanos(1000000);

    dt.plus(1, ChronoUnit.MILLIS);
    dt.plus(1, ChronoUnit.HALF_DAYS);

    dt.plus(Duration.ofHours(30).plusMinutes(45));
    dt.minus(Duration.ofHours(30).plusMinutes(45));

    dt = LocalDateTime.parse('2016-02-26T23:55:42.123');
    dt.withHour(1);

    dt.withMinute(1);

    dt.withSecond(1);

    dt.withNano(0);

    dt.with(ChronoField.MILLI_OF_SECOND, 51);


    var nextEvenSecond = {
        adjustInto: function<T extends Temporal> (t: T): T {
            return t.plus(t.get(ChronoField.SECOND_OF_MINUTE) % 2 === 0 ? 2 : 1, ChronoUnit.SECONDS);
        }
    };
    dt.with(nextEvenSecond);
    dt.plusSeconds(1).with(nextEvenSecond);

    dt = LocalDateTime.parse('2016-02-26T23:55:42.123');

    dt.truncatedTo(ChronoUnit.SECONDS);
    dt.truncatedTo(ChronoUnit.MINUTES);
    dt.truncatedTo(ChronoUnit.HOURS);
    dt.truncatedTo(ChronoUnit.HALF_DAYS);
    dt.truncatedTo(ChronoUnit.DAYS);

    var dt1 = LocalDateTime.parse('2016-02-26T23:55:42.123');
    var dt2 = dt1.plusHours(2);

    dt1.isAfter(dt2);
    dt1.isBefore(dt2);

    dt1.equals(dt1.plusHours(0));
    dt1.equals(dt1.plusHours(1));

    dt1.compareTo(dt1) === 0;
    dt1.compareTo(dt2) < 0;
    dt2.compareTo(dt1) > 0;

    dt1.hashCode();
    dt2.hashCode();
    dt1.hashCode() !== dt2.hashCode();

    dt1 = LocalDateTime.parse('2016-02-26T23:55:42.123');
    dt2 = dt1.plusYears(6).plusMonths(12).plusHours(2).plusMinutes(42).plusSeconds(12);
    dt1.until(dt2, ChronoUnit.YEARS);
    dt1.until(dt2, ChronoUnit.MONTHS);
    dt1.until(dt2, ChronoUnit.WEEKS);
    dt1.until(dt2, ChronoUnit.DAYS);
    dt1.until(dt2, ChronoUnit.HOURS);
    dt1.until(dt2, ChronoUnit.MINUTES);
    dt1.until(dt2, ChronoUnit.SECONDS);

    dt = LocalDateTime.ofInstant(Instant.ofEpochMilli(new Date().getTime()));
    dt = LocalDateTime.from(nativeJs(new Date()));
    dt = LocalDateTime.from(nativeJs(moment()));
}

function test_ZonedDateTime() {
    ZonedDateTime.now().toString();

    ZonedDateTime.now().withFixedOffsetZone().toString();
    ZonedDateTime.now().toString();

    ZonedDateTime.now(ZoneOffset.UTC).toString();

    ZonedDateTime.now(ZoneId.of('UTC-05:00')).toString();

    ZonedDateTime.parse('2016-03-18T12:38:23.561+01:00[SYSTEM]');
    ZonedDateTime.parse('2016-03-18T12:38:23.561+01:00');
    ZonedDateTime.parse('2016-03-18T11:38:23.561Z');
    ZonedDateTime.parse('2016-03-18T06:38:23.561-05:00[UTC-05:00]');
    LocalDate.parse('2012-06-06').atStartOfDay().atZone(ZoneId.SYSTEM);
    ZonedDateTime.of(LocalDateTime.parse('2012-06-06T00:00'), ZoneId.SYSTEM);
    ZonedDateTime.of(LocalDate.parse('2012-06-06'), LocalTime.MIDNIGHT, ZoneId.SYSTEM);

    ZonedDateTime.ofInstant(Instant.now(), ZoneId.SYSTEM);

    var d = LocalDate.of(2016, 3, 18);
    var zdt = d.atTime(LocalTime.NOON).atZone(ZoneId.of('UTC-05:00'));

    zdt.withZoneSameLocal(ZoneId.UTC);

    zdt.withZoneSameInstant(ZoneId.UTC);


    var zdt = ZonedDateTime.now();

    zdt.plusWeeks(2);

    zdt.plusHours(2 * 7 * 24);
}

function test_Period() {
    
    Period.parse('P1Y10M').toString();

    Period.of(10, 5, 30).toString();

    Period.ofYears(10).toString();

    Period.ofYears(10).plusDays(45).toString();

    Period.of(1, 37, 0).normalized().toString();

    Period.ofYears(10).plusMonths(10).minusDays(42).toString();

    var p = Period.ofMonths(1);
    LocalDate.parse('2012-12-12').plus(p);
    LocalDate.parse('2012-01-31').plus(p);
    LocalDateTime.parse('2012-05-31T12:00').plus(p);

    Period.between(LocalDate.parse('2012-06-30'), LocalDate.parse('2012-08-31'));
}

function test_Duration() {
    
    Duration.ofHours(10).toString();

    Duration.ofDays(10).toString();

    var dt = LocalDateTime.parse('2012-12-24T12:00');

    dt.plus(Duration.ofHours(10).plusMinutes(30)).toString();
    dt.minus(Duration.ofHours(12).multipliedBy(10)).toString();

    var dt1 = LocalDateTime.parse('2012-12-24T12:00');

    Duration.between(dt1, dt1.plusHours(10)).toString();
}

function test_YearMonth() {
    YearMonth.from(YearMonth.now());
    YearMonth.from(LocalDate.now());
    
    YearMonth.now();
    YearMonth.now(ZoneId.systemDefault());
    YearMonth.now(Clock.systemUTC());
    
    YearMonth.of(2017, 10);
    YearMonth.of(2017, Month.of(10));

    YearMonth.parse("2017-10");
    YearMonth.parse("2017-10", DateTimeFormatter.ofPattern("yyyy-MM"));

    var duration = Duration.of(10, ChronoUnit.MONTHS);
    var ym = YearMonth.of(2017, 10);

    ym.minus(duration);
    ym.minus(10, ChronoUnit.DAYS);
    ym.minusYears(10);
    ym.minusMonths(10);

    ym.plus(duration);
    ym.plus(10, ChronoUnit.DAYS);
    ym.plusYears(10);
    ym.plusMonths(10);

    ym.with(TemporalAdjusters.firstDayOfMonth());
    ym.with(ChronoField.YEAR, 2018);
    ym.withYearMonth(2018, 11);
    ym.withYear(2018);
    ym.withMonth(11);

    ym.isSupported(ChronoField.YEAR);
    ym.isSupported(ChronoUnit.YEARS);

    ym.year();

    ym.monthValue();

    ym.month()

    ym.isLeapYear();

    ym.isValidDay();

    ym.lengthOfMonth();

    ym.lengthOfYear();

    ym.atDay(10);

    ym.atEndOfMonth();

    ym.compareTo(YearMonth.of(2017, 20));

    ym.isAfter(YearMonth.of(2017, 20));

    ym.isBefore(YearMonth.of(2017, 20));

    ym.equals(YearMonth.of(2017, 20));

    ym.toJSON();

    ym.format(DateTimeFormatter.ofPattern("yyyy-MM"));
}

function test_DateTimeFormatter() {
    ZonedDateTime.parse("2017-01-01T00:00:00+0200[Europe/Amsterdam]", DateTimeFormatter.ISO_ZONED_DATE_TIME)

    ZonedDateTime.parse("2017-01-01T00:00:00+0200", DateTimeFormatter.ISO_OFFSET_DATE_TIME)

    ZonedDateTime.parse("2017-01-01T00:00:00.12345678", DateTimeFormatter.ISO_INSTANT)
}


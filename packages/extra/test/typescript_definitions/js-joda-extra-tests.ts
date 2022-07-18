import {
    Instant,
    Duration,
    LocalDate,
    Month,
    YearMonth,
    ChronoField,
    TemporalQueries,
    Temporal,
    MonthDay,
    IsoChronology,
    ValueRange,
    Year,
    DateTimeFormatter,
    DateTimeFormatterBuilder,
    IsoFields,
    DayOfWeek,
    ChronoUnit,
    TemporalAdjusters,
    TemporalAdjuster,
} from '@js-joda/core'
import { expect } from 'chai';
import {
    DayOfMonth,
    DayOfYear,
    Interval,
    YearWeek
} from '../../';

// See packages/core/test/typescript_definitions/js-joda-tests.ts for an explanation of these tests.

function test_DayOfMonth() {
    const localDate = LocalDate.now();

    expectType<DayOfMonth>(DayOfMonth.from(localDate));
    expectType<DayOfMonth>(DayOfMonth.now());
    expectType<DayOfMonth>(DayOfMonth.of(1));

    const dayOfMonth = DayOfMonth.of(28);
    expectType<Temporal>(dayOfMonth.adjustInto(localDate));
    expectType<MonthDay>(dayOfMonth.atMonth(Month.from(localDate)));
    expectType<MonthDay>(dayOfMonth.atMonth(1));
    expectType<LocalDate>(dayOfMonth.atYearMonth(YearMonth.from(localDate)));
    expectType<number>(dayOfMonth.compareTo(dayOfMonth));
    expectType<boolean>(dayOfMonth.equals(dayOfMonth));
    expectType<number>(dayOfMonth.get(ChronoField.DAY_OF_MONTH));
    expectType<number>(dayOfMonth.getLong(ChronoField.DAY_OF_MONTH));
    expectType<number>(dayOfMonth.value());
    expectType<number>(dayOfMonth.hashCode());
    expectType<boolean>(dayOfMonth.isSupported(ChronoField.DAY_OF_MONTH));
    expectType<boolean>(dayOfMonth.isValidYearMonth(YearMonth.from(localDate)));
    expectType<IsoChronology | null>(dayOfMonth.query(TemporalQueries.chronology()));
    expectType<ValueRange>(dayOfMonth.range(ChronoField.DAY_OF_MONTH));
    expectType<string>(dayOfMonth.toString());
}

function test_DayOfYear() {
    const localDate = LocalDate.now();

    expectType<DayOfYear>(DayOfYear.from(localDate));
    expectType<DayOfYear>(DayOfYear.now());
    expectType<DayOfYear>(DayOfYear.of(1));

    const dayOfYear = DayOfYear.of(28);

    expectType<Temporal>(dayOfYear.adjustInto(localDate));
    expectType<LocalDate>(dayOfYear.atYear(Year.from(localDate)));
    expectType<LocalDate>(dayOfYear.atYear(localDate.year()));
    expectType<number>(dayOfYear.compareTo(dayOfYear));
    expectType<boolean>(dayOfYear.equals(dayOfYear));
    expectType<number>(dayOfYear.get(ChronoField.DAY_OF_YEAR));
    expectType<number>(dayOfYear.getLong(ChronoField.DAY_OF_YEAR));
    expectType<number>(dayOfYear.value());
    expectType<number>(dayOfYear.hashCode());
    expectType<boolean>(dayOfYear.isSupported(ChronoField.DAY_OF_YEAR));
    expectType<boolean>(dayOfYear.isValidYear(localDate.year()));
    expectType<IsoChronology | null>(dayOfYear.query(TemporalQueries.chronology()));
    expectType<ValueRange>(dayOfYear.range(ChronoField.DAY_OF_YEAR));
    expectType<string>(dayOfYear.toString());
}

function test_Interval() {
    const instant = Instant.now();
    const duration = Duration.ofHours(1);

    Interval.of(instant, duration);

    Interval.parse('2019-08-09T20:38:43.298Z/2019-08-09T20:38:43.298Z');

    const interval = Interval.of(instant, instant);
    interval.start();
    interval.end();
    interval.isEmpty();
    interval.isUnboundedStart();
    interval.isUnboundedEnd();
    interval.withStart(instant);
    interval.withEnd(instant);
    interval.contains(instant);
    interval.encloses(interval);
    interval.abuts(interval);
    interval.isConnected(interval);
    interval.overlaps(interval);
    interval.intersection(interval);
    interval.union(interval);
    interval.span(interval);
    interval.isAfter(interval);
    interval.isAfter(instant);
    interval.isBefore(interval);
    interval.isBefore(instant);
    interval.isAfterInstant(instant);
    interval.isBeforeInstant(instant);
    interval.isAfterInterval(interval);
    interval.isBeforeInterval(interval);
    interval.toDuration();
    interval.equals({});
    interval.hashCode();
    interval.toString();

    LocalDate.ofInstant(interval.end());
}

function test_YearWeek() {
    const localDate = LocalDate.now();

    expectType<YearWeek>(YearWeek.from(localDate));
    expectType<YearWeek>(YearWeek.now());
    expectType<YearWeek>(YearWeek.of(Year.of(2001), 1));
    expectType<YearWeek>(YearWeek.of(2001, 1));
    expectType<YearWeek>(YearWeek.parse('2001-W01', DateTimeFormatter.ofPattern("YYYY-'W'ww")));

    const yearWeek = YearWeek.of(2001, 1);

    expectType<Temporal>(yearWeek.adjustInto(localDate));
    expectType<LocalDate>(yearWeek.atDay(DayOfWeek.MONDAY));
    expectType<number>(yearWeek.compareTo(yearWeek));
    expectType<boolean>(yearWeek.equals(yearWeek));
    expectType<string>(yearWeek.format(DateTimeFormatter.ofPattern("YYYY-'W'ww")));
    expectType<number>(yearWeek.get(IsoFields.WEEK_BASED_YEAR));
    expectType<number>(yearWeek.getLong(IsoFields.WEEK_BASED_YEAR));
    expectType<number>(yearWeek.week());
    expectType<number>(yearWeek.year());
    expectType<number>(yearWeek.hashCode());
    expectType<boolean>(yearWeek.is53WeekYear());
    expectType<boolean>(yearWeek.isAfter(yearWeek));
    expectType<boolean>(yearWeek.isBefore(yearWeek));
    expectType<boolean>(yearWeek.isSupported(IsoFields.WEEK_OF_WEEK_BASED_YEAR));
    expectType<boolean>(yearWeek.isSupported(ChronoUnit.WEEKS));
    expectType<number>(yearWeek.lengthOfYear());
    expectType<YearWeek>(yearWeek.minus(1, ChronoUnit.WEEKS));
    // TODO
    // expectType<YearWeek>(yearWeek.minus(Weeks.of(1)));
    expectType<YearWeek>(yearWeek.minusWeeks(1));
    expectType<YearWeek>(yearWeek.minusYears(1));
    expectType<YearWeek>(yearWeek.plus(1, ChronoUnit.WEEKS));
    // TODO
    // expectType<YearWeek>(yearWeek.plus(Weeks.of(1)));
    expectType<YearWeek>(yearWeek.plusWeeks(1));
    expectType<YearWeek>(yearWeek.plusYears(1));
    expectType<IsoChronology | null>(yearWeek.query(TemporalQueries.chronology()));
    expectType<ValueRange>(yearWeek.range(ChronoField.DAY_OF_YEAR));
    expectType<string>(yearWeek.toString());
    expectType<number>(yearWeek.until(localDate, ChronoUnit.WEEKS));
    // TODO
    // expectType<YearWeek>(yearWeek.with(<TemporalAdjuster>?));
    expectType<YearWeek>(yearWeek.with(IsoFields.WEEK_BASED_YEAR, 2001));
    expectType<YearWeek>(yearWeek.withWeek(1));
    expectType<YearWeek>(yearWeek.withYear(2001));

}

/**
 * Use this to check if an expression is of type T.
 * Don't let TypeScript infer the type, give it explicitly.
 */
 declare function expectType<T>(v: T): T;

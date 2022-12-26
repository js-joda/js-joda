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
    IsoFields,
    DayOfWeek,
    ChronoUnit,
    ZoneId,
    Clock,
    ZoneOffset,
    OffsetDateTime,
    LocalTime,
    Period,
} from '@js-joda/core'
import {
    DayOfMonth,
    DayOfYear,
    Interval,
    Quarter,
    OffsetDate,
    YearQuarter,
    YearWeek,
    LocalDateRange
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
    Interval.parse("2019-08-09T20:38:43.298Z/2019-08-09T20:38:43.298Z");

    const instant = Instant.now();
    const duration = Duration.ofHours(1);
    const endExclusiveOrDuration: Instant | Duration = duration;

    Interval.of(instant, duration);
    Interval.of(instant, endExclusiveOrDuration);
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

function test_LocalDateRange() {
    const localDate = LocalDate.EPOCH_0;

    expectType<LocalDateRange>(LocalDateRange.of(localDate, localDate));
    expectType<LocalDateRange>(LocalDateRange.of(localDate, Period.ZERO));
    expectType<LocalDateRange>(LocalDateRange.ofClosed(localDate, localDate));
    expectType<LocalDateRange>(LocalDateRange.ofEmpty(localDate));
    expectType<LocalDateRange>(LocalDateRange.ofUnbounded());
    expectType<LocalDateRange>(LocalDateRange.ofUnboundedEnd(localDate));
    expectType<LocalDateRange>(LocalDateRange.ofUnboundedStart(localDate));
    expectType<LocalDateRange>(LocalDateRange.parse('2001-01-01/2001-01-01'));

    const localDateRange = LocalDateRange.ofEmpty(localDate);

    expectType<boolean>(localDateRange.abuts(localDateRange));
    expectType<boolean>(localDateRange.contains(localDate));
    expectType<boolean>(localDateRange.encloses(localDateRange));
    expectType<boolean>(localDateRange.equals(localDateRange));
    expectType<LocalDate>(localDateRange.end());
    expectType<LocalDate>(localDateRange.endInclusive());
    expectType<LocalDate>(localDateRange.start());
    expectType<number>(localDateRange.hashCode());
    expectType<LocalDateRange>(localDateRange.intersection(localDateRange));
    expectType<boolean>(localDateRange.isAfter(localDate));
    expectType<boolean>(localDateRange.isAfter(localDateRange));
    expectType<boolean>(localDateRange.isBefore(localDate));
    expectType<boolean>(localDateRange.isBefore(localDateRange));
    expectType<boolean>(localDateRange.isConnected(localDateRange));
    expectType<boolean>(localDateRange.isEmpty());
    expectType<boolean>(localDateRange.isUnboundedEnd());
    expectType<boolean>(localDateRange.isUnboundedStart());
    expectType<number>(localDateRange.lengthInDays());
    expectType<boolean>(localDateRange.overlaps(localDateRange));
    expectType<LocalDateRange>(localDateRange.span(localDateRange));
    expectType<Period>(localDateRange.toPeriod());
    expectType<string>(localDateRange.toString());
    expectType<LocalDateRange>(localDateRange.union(localDateRange));
    // expectType<LocalDateRange>(localDateRange.withEnd(<TemporalAdjuster>?));
    // expectType<LocalDateRange>(localDateRange.withStart(<TemporalAdjuster>?));
}

function test_OffsetDate() {
    const instant = Instant.now();

    const localDate = LocalDate.ofInstant(instant, ZoneId.systemDefault());
    const offsetDate = OffsetDate.ofInstant(instant, ZoneId.systemDefault());
    const offsetDateTime = OffsetDateTime.ofInstant(instant, ZoneId.systemDefault());

    expectType<OffsetDate>(OffsetDate.from(localDate));
    expectType<OffsetDate>(OffsetDate.now());
    expectType<OffsetDate>(OffsetDate.now(ZoneId.UTC));
    expectType<OffsetDate>(OffsetDate.now(Clock.systemUTC()));
    expectType<OffsetDate>(OffsetDate.of(2001, 1, 1, ZoneOffset.UTC));
    expectType<OffsetDate>(OffsetDate.of(localDate, ZoneOffset.UTC));
    expectType<OffsetDate>(OffsetDate.ofInstant(Instant.EPOCH, ZoneId.UTC));
    expectType<OffsetDate>(OffsetDate.parse('2001-01-01Z'));

    expectType<Temporal>(offsetDate.adjustInto(offsetDateTime));
    expectType<OffsetDateTime>(offsetDate.atTime(LocalTime.MIDNIGHT));
    expectType<number>(offsetDate.compareTo(offsetDate));
    expectType<boolean>(offsetDate.equals(offsetDate));
    expectType<string>(offsetDate.format(DateTimeFormatter.ISO_LOCAL_DATE));
    expectType<number>(offsetDate.get(ChronoField.YEAR));
    expectType<number>(offsetDate.dayOfMonth());
    expectType<number>(offsetDate.dayOfWeek());
    expectType<number>(offsetDate.dayOfYear());
    expectType<number>(offsetDate.getLong(ChronoField.YEAR));
    expectType<Month>(offsetDate.month());
    expectType<number>(offsetDate.monthValue());
    expectType<ZoneOffset>(offsetDate.offset());
    expectType<number>(offsetDate.year());
    expectType<number>(offsetDate.hashCode());
    expectType<boolean>(offsetDate.isAfter(offsetDate));
    expectType<boolean>(offsetDate.isBefore(offsetDate));
    expectType<boolean>(offsetDate.isEqual(offsetDate));
    expectType<boolean>(offsetDate.isSupported(ChronoField.YEAR));
    expectType<boolean>(offsetDate.isSupported(ChronoField.YEAR));

    expectType<OffsetDate>(offsetDate.minus(0, ChronoUnit.YEARS));
    //expectType<OffsetDate>(offsetDate.minus(Years.of(0)));
    expectType<OffsetDate>(offsetDate.minusDays(0));
    expectType<OffsetDate>(offsetDate.minusMonths(0));
    expectType<OffsetDate>(offsetDate.minusWeeks(0));
    expectType<OffsetDate>(offsetDate.minusYears(0));
    expectType<OffsetDate>(offsetDate.plus(0, ChronoUnit.YEARS));
    //expectType<OffsetDate>(offsetDate.plus(Years.of(0)));
    expectType<OffsetDate>(offsetDate.plusDays(0));
    expectType<OffsetDate>(offsetDate.plusMonths(0));
    expectType<OffsetDate>(offsetDate.plusWeeks(0));
    expectType<OffsetDate>(offsetDate.plusYears(0));

    expectType<IsoChronology | null>(offsetDate.query(TemporalQueries.chronology()));
    expectType<ValueRange>(offsetDate.range(ChronoField.DAY_OF_YEAR));

    expectType<number>(offsetDate.toEpochSecond(LocalTime.MIDNIGHT));
    expectType<LocalDate>(offsetDate.toLocalDate());
    expectType<string>(offsetDate.toString());
    expectType<number>(offsetDate.until(offsetDate, ChronoUnit.YEARS));
    // expectType<YearQuarter>(offsetDate.with(<TemporalAdjuster>?));
    expectType<OffsetDate>(offsetDate.with(ChronoField.YEAR, 1));
    expectType<OffsetDate>(offsetDate.withDayOfMonth(1));
    expectType<OffsetDate>(offsetDate.withDayOfYear(1));
    expectType<OffsetDate>(offsetDate.withMonth(1));
    expectType<OffsetDate>(offsetDate.withOffsetSameLocal(ZoneOffset.UTC));
    expectType<OffsetDate>(offsetDate.withYear(1));
}

function test_Quarter() {
    const localDate = LocalDate.now();

    expectType<Quarter>(Quarter.from(localDate));
    expectType<Quarter>(Quarter.of(1));
    expectType<Quarter>(Quarter.ofMonth(1));
    expectType<Quarter>(Quarter.valueOf('Q1'));
    expectType<Quarter[]>(Quarter.values());

    const quarter = Quarter.Q1;

    expectType<Temporal>(quarter.adjustInto(localDate));
    expectType<number>(quarter.compareTo(quarter));
    expectType<boolean>(quarter.equals(quarter));
    expectType<Month>(quarter.firstMonth());
    expectType<number>(quarter.get(IsoFields.QUARTER_OF_YEAR));
    expectType<number>(quarter.getLong(IsoFields.QUARTER_OF_YEAR));
    expectType<boolean>(quarter.isSupported(IsoFields.QUARTER_OF_YEAR));
    expectType<number>(quarter.length(false));
    expectType<Quarter>(quarter.minus(1));
    expectType<string>(quarter.name());
    expectType<number>(quarter.ordinal());
    expectType<Quarter>(quarter.plus(1));
    expectType<IsoChronology | null>(quarter.query(TemporalQueries.chronology()));
    expectType<ValueRange>(quarter.range(IsoFields.QUARTER_OF_YEAR));
    expectType<string>(quarter.toString());
    expectType<number>(quarter.value());
}

function test_YearQuarter() {
    const localDate = LocalDate.now();

    expectType<YearQuarter>(YearQuarter.from(localDate));
    expectType<YearQuarter>(YearQuarter.now());
    expectType<YearQuarter>(YearQuarter.of(Year.of(2001), 1));
    expectType<YearQuarter>(YearQuarter.of(2001, 1));
    expectType<YearQuarter>(YearQuarter.parse('2001-Q1', DateTimeFormatter.ofPattern("YYYY-'Q'q")));

    const yearQuarter = YearQuarter.of(2001, 1);

    expectType<boolean>(yearQuarter.isSupported(IsoFields.QUARTER_OF_YEAR));
    expectType<boolean>(yearQuarter.isSupported(IsoFields.QUARTER_YEARS));
    expectType<ValueRange>(yearQuarter.range(IsoFields.QUARTER_OF_YEAR));
    expectType<number>(yearQuarter.get(IsoFields.QUARTER_OF_YEAR));
    expectType<number>(yearQuarter.getLong(IsoFields.QUARTER_OF_YEAR));
    expectType<number>(yearQuarter.year());
    expectType<number>(yearQuarter.quarterValue());
    expectType<Quarter>(yearQuarter.quarter());
    expectType<boolean>(yearQuarter.isLeapYear());
    expectType<boolean>(yearQuarter.isValidDay(1));
    expectType<number>(yearQuarter.lengthOfQuarter());
    expectType<number>(yearQuarter.lengthOfYear());
    // expectType<YearQuarter>(yearWeek.with(<TemporalAdjuster>?));
    expectType<YearQuarter>(yearQuarter.with(ChronoField.YEAR, 2001));
    expectType<YearQuarter>(yearQuarter.withYear(2001));
    expectType<YearQuarter>(yearQuarter.withQuarter(1));
    // TODO
    // expectType<YearQuarter>(yearWeek.minus(Years.of(1)));
    expectType<YearQuarter>(yearQuarter.plus(1, ChronoUnit.YEARS));
    expectType<YearQuarter>(yearQuarter.plusYears(1));
    expectType<YearQuarter>(yearQuarter.plusQuarters(1));
    // TODO
    // expectType<YearQuarter>(yearWeek.minus(Years.of(1)));
    expectType<YearQuarter>(yearQuarter.minus(1, ChronoUnit.YEARS));
    expectType<YearQuarter>(yearQuarter.minusYears(1));
    expectType<YearQuarter>(yearQuarter.minusQuarters(1));
    expectType<IsoChronology | null>(yearQuarter.query(TemporalQueries.chronology()));
    expectType<Temporal>(yearQuarter.adjustInto(localDate));
    expectType<number>(yearQuarter.until(localDate, ChronoUnit.YEARS));
    expectType<string>(yearQuarter.format(DateTimeFormatter.ofPattern("YYYY-'Q'q")));
    expectType<LocalDate>(yearQuarter.atDay(1));
    expectType<YearQuarter>(yearQuarter.atEndOfQuarter());
    expectType<number>(yearQuarter.compareTo(yearQuarter));
    expectType<boolean>(yearQuarter.isAfter(yearQuarter));
    expectType<boolean>(yearQuarter.isBefore(yearQuarter));
    expectType<boolean>(yearQuarter.equals(yearQuarter));
    expectType<number>(yearQuarter.hashCode());
    expectType<string>(yearQuarter.toString());
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

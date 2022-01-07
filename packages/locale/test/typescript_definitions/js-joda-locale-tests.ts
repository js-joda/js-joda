import {
  DateTimeFormatter,
  LocalDate,
  DateTimeFormatterBuilder,
  ChronoField,
  TextStyle,
  DayOfWeek,
  TemporalField,
} from '@js-joda/core';
import {Locale, WeekFields} from '../..';

function test_Locale() {
  const locale = new Locale('en');

  expectType<string>(locale.country());
  expectType<string>(locale.language());
  expectType<string>(locale.localeString());

  expectType<boolean>(locale.equals(Locale.ENGLISH));
  expectType<boolean>(locale.equals('also compiles, but probably false'));
}

function test_Locale_const() {
  expectType<Locale>(Locale.ENGLISH);
  expectType<Locale>(Locale.US);
  expectType<Locale>(Locale.UK);
  expectType<Locale>(Locale.CANADA);
  expectType<Locale>(Locale.FRENCH);
  expectType<Locale>(Locale.FRANCE);
  expectType<Locale>(Locale.GERMAN);
  expectType<Locale>(Locale.GERMANY);
  expectType<Locale>(Locale.KOREAN);
  expectType<Locale>(Locale.JAPANESE);
  expectType<Locale>(Locale.JAPAN);
  expectType<Locale>(Locale.ITALIAN);
  expectType<Locale>(Locale.ITALY);
  expectType<Locale>(Locale.CHINESE);
  expectType<Locale>(Locale.ROMANIAN);
  expectType<Locale>(Locale.SWEDISH);
  expectType<Locale>(Locale.SWEDEN);
  expectType<Locale>(Locale.HINDI);
  expectType<Locale>(Locale.RUSSIAN);
}

function test_DateTimeFormatter() {
  const formatter = DateTimeFormatter.ofPattern('MMM').withLocale(Locale.UK);

  expectType<string>(LocalDate.now().format(formatter));
  expectType<Locale | null>(formatter.locale());

  expectType<DateTimeFormatter>(DateTimeFormatter.RFC_1123_DATE_TIME);
}

function test_DateTimeFormatterBuilder() {
  const formatter = new DateTimeFormatterBuilder()
    .appendText(ChronoField.DAY_OF_WEEK, TextStyle.SHORT)
    .appendZoneText(TextStyle.FULL)
    .appendLocalizedOffset(TextStyle.FULL)
    .toFormatter(TextStyle.NARROW);

  expectType<DateTimeFormatter>(formatter);
}

function test_WeekFields() {

  expectType<WeekFields>(WeekFields.of(DayOfWeek.MONDAY, 7));
  expectType<WeekFields>(WeekFields.of(new Locale('en')));

  expectType<WeekFields>(WeekFields.SUNDAY_START);
  expectType<WeekFields>(WeekFields.ISO);
  expectType<DayOfWeek>(WeekFields.ISO.firstDayOfWeek());
  expectType<number>(WeekFields.ISO.minimalDaysInFirstWeek());
  expectType<TemporalField>(WeekFields.ISO.dayOfWeek());
  expectType<TemporalField>(WeekFields.ISO.weekOfMonth());
  expectType<TemporalField>(WeekFields.ISO.weekOfYear());
  expectType<TemporalField>(WeekFields.ISO.weekOfWeekBasedYear());
  expectType<TemporalField>(WeekFields.ISO.weekBasedYear());
  expectType<boolean>(WeekFields.ISO.equals("foo"));
  expectType<number>(WeekFields.ISO.hashCode());
  expectType<string>(WeekFields.ISO.toString());
}

/**
 * Use this to check if an expression is of type T.
 * Don't let TypeScript infer the type, give it explicitly.
 */
declare function expectType<T>(v: T): void;

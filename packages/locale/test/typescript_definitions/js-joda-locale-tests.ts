import {
  DateTimeFormatter,
  LocalDate,
  DateTimeFormatterBuilder,
  ChronoField,
  TextStyle
} from '@js-joda/core';
import { Locale } from '../..';

function test_Locale() {
  const locale = new Locale('en');

  expectType<string>(locale.country());
  expectType<string>(locale.language());
  expectType<string>(locale.localeString());

  expectType<boolean>(locale.equals(Locale.ENGLISH));
  expectType<boolean>(locale.equals('also compiles, but probably false'));
}

function test_DateTimeFormatter() {
  const formatter = DateTimeFormatter.ofPattern('MMM').withLocale(Locale.UK);

  expectType<string>(LocalDate.now().format(formatter));
  expectType<Locale | null>(formatter.locale());
}

function test_DateTimeFormatterBuilder() {
  const formatter = new DateTimeFormatterBuilder()
    .appendText(ChronoField.DAY_OF_WEEK, TextStyle.SHORT)
    .appendZoneText(TextStyle.FULL)
    .appendLocalizedOffset(TextStyle.FULL)
    .toFormatter(TextStyle.NARROW);

  expectType<DateTimeFormatter>(formatter);
}

/**
 * Use this to check if an expression is of type T.
 * Don't let TypeScript infer the type, give it explicitly.
 */
declare function expectType<T>(v: T): void;

/* eslint-disable no-console */
/**
 * Locale-aware formatting of LocalDate and LocalDateTime without @js-joda/timezone.
 *
 * @js-joda/timezone is only needed for ZonedDateTime or zone-text patterns ('z', 'zzzz').
 * For LocalDate and LocalDateTime, it is not required.
 *
 * Dependencies:
 *   npm install @js-joda/core @js-joda/locale @js-joda/locale_en-us
 */

import '@js-joda/locale_en-us';
import { DateTimeFormatter, LocalDate, LocalDateTime } from '@js-joda/core';
import { Locale } from '@js-joda/locale';

const LOCALE = Locale.ENGLISH;

// --- LocalDate formatting ---
const date = LocalDate.of(2024, 3, 15);
const dateFormatter = DateTimeFormatter.ofPattern('EEEE, MMMM d, yyyy').withLocale(LOCALE);
console.log('LocalDate formatted (en):', date.format(dateFormatter));

// --- LocalDate with US locale ---
const dateFormatterUS = DateTimeFormatter.ofPattern('MMM d, yyyy').withLocale(Locale.US);
console.log('LocalDate formatted (en-US):', date.format(dateFormatterUS));

// --- LocalDateTime formatting ---
const dateTime = LocalDateTime.of(2024, 6, 21, 14, 30, 0);
const dateTimeFormatter = DateTimeFormatter.ofPattern("EEEE, d MMMM yyyy, h:mm a").withLocale(LOCALE);
console.log('LocalDateTime formatted (en):', dateTime.format(dateTimeFormatter));

// --- Parsing with a locale-aware formatter ---
const parsed = LocalDate.parse('March 15, 2024', DateTimeFormatter.ofPattern('MMMM d, yyyy').withLocale(LOCALE));
console.log('Parsed LocalDate:', parsed.toString());

console.log('es6-locale-without-timezone done');
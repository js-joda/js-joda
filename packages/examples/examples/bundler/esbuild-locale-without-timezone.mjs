/* eslint-disable no-console */
/**
 * Source input for the esbuild bundler example (see build.mjs).
 *
 * Bundled by esbuild targeting browser (mimicking an Angular build) to verify
 * that @js-joda/locale_en-us works without cldr-data or @js-joda/timezone installed.
 *
 * Dependencies:
 *   npm install @js-joda/core @js-joda/locale @js-joda/locale_en-us
 */

import { Locale } from '@js-joda/locale';
import '@js-joda/locale_en-us';
import { DateTimeFormatter, LocalDate, LocalDateTime } from '@js-joda/core';

const LOCALE = Locale.ENGLISH;

// LocalDate formatting — no @js-joda/timezone needed
const date = LocalDate.of(2024, 3, 15);
const dateFormatter = DateTimeFormatter.ofPattern('EEEE, MMMM d, yyyy').withLocale(LOCALE);
console.log('LocalDate formatted:', date.format(dateFormatter));

// LocalDateTime formatting
const dateTime = LocalDateTime.of(2024, 6, 21, 14, 30, 0);
const dateTimeFormatter = DateTimeFormatter.ofPattern("MMMM d, yyyy 'at' h:mm a").withLocale(Locale.US);
console.log('LocalDateTime formatted:', dateTime.format(dateTimeFormatter));

// Parsing
const parsed = LocalDate.parse(
    'March 15, 2024',
    DateTimeFormatter.ofPattern('MMMM d, yyyy').withLocale(LOCALE)
);
console.log('Parsed LocalDate:', parsed.toString());

console.log('esbuild-locale-without-timezone done');
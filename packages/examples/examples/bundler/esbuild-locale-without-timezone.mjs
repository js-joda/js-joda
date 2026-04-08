/* eslint-disable no-console */
/**
 * Source input for the esbuild bundler example (issue #791).
 *
 * This file is bundled by esbuild (mimicking an Angular build) to verify that
 * @js-joda/locale_en-us works without cldr-data or @js-joda/timezone installed.
 *
 * The pattern below mirrors the reported Angular use case in issue #791:
 *
 *   import { Locale } from '@js-joda/locale';
 *   import '@js-joda/locale_en-us';
 *   export const LOCALE = Locale.ENGLISH;
 *
 * Previously, this caused the Angular/esbuild build to fail with errors like:
 *   - "Could not resolve 'cldr-data'"
 *   - Missing Node.js built-ins: "assert", "fs", "path"
 *
 * After marking cldr-data as an optional peerDependency, npm no longer
 * auto-installs it, so esbuild cannot find it and does not try to bundle it.
 */

import { Locale } from '@js-joda/locale';
import '@js-joda/locale_en-us';
import { DateTimeFormatter, LocalDate, LocalDateTime } from '@js-joda/core';

// Pattern from issue #791
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
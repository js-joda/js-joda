# Immutable date and time library for JavaScript

[![npm version](https://badge.fury.io/js/%40js-joda%2Fcore.svg)](https://badge.fury.io/js/%40js-joda%2Fcore)
[![Travis Build Status](https://app.travis-ci.com/js-joda/js-joda.svg?branch=master)](https://app.travis-ci.com/js-joda/js-joda)
[![Sauce Test Status](https://saucelabs.com/buildstatus/js-joda)](https://saucelabs.com/u/js-joda)
[![Coverage Status](https://coveralls.io/repos/js-joda/js-joda/badge.svg?branch=master&service=github)](https://coveralls.io/github/js-joda/js-joda?branch=master)
[![Downloads/Month](https://img.shields.io/npm/dm/%40js-joda%2Fcore.svg)](https://img.shields.io/npm/dm/%40js-joda%2Fcore.svg)

[![Sauce Browser Test Status](https://saucelabs.com/browser-matrix/js-joda.svg)](https://saucelabs.com/u/js-joda)

- **js-joda** is an **immutable date and time library** for JavaScript. It provides a **simple, domain-driven and clean API** based on the ISO calendar system, which is the de facto world calendar following the proleptic Gregorian rules.

- js-joda has a lightweight footprint, only **43 kB minified and compressed**, no third party dependencies.

- js-joda is **fast**. It is about 2 to 10 times faster than other JavaScript date libraries.

- js-joda comes with built-in parsers/ formatters for ISO 8601 as specified in RFC 3339, that can be easily customized.

- js-joda supports **ECMAScript 5** browsers down to IE11.

- js-joda is a **port of the threeten** backport, which is the base for JSR-310 implementation of the Java SE 8 java.time package. Threeten is inspired by **Joda-Time**, having similar concepts and the same author.

- js-joda is **robust and stable**. We ported more then 1700 test-cases with a lots of test-permutations from the threetenbp project. We run the automated karma test-suite against Firefox, Chrome, Node and phantomjs.

## Why yet another JavaScript date and time library?

- Popular JavaScript date libraries like [moment](https://momentjs.com/) or [date-utils](https://github.com/continuouscalendar/dateutils) are **wrappers** around the native JavaScript `Date` object, providing syntactic sugar. The native `Date` object always consist of a date, time and a timezone part. In contrast, js-joda is a **standalone** date and time implementation.

- The API has a **domain-driven design** with classes for each of the different use cases, like `LocalDate`, `ZonedDateTime` or `Period`. For example, `LocalDate` allows you to handle dates without times (like birthdays or holidays) in a clean and error-safe way, especially if these dates are persisted to an external server.

- js-joda is **immutable**. Immutability aligns well with pure functions and with the architecture of frameworks like React and Flux.

## The ThreeTen domain models

### Dates and Times

- **LocalDate** represents a date without a time and timezone in the ISO-8601 calendar system, such as 2007-12-24.

- **LocalTime** represents a time without timezone in the ISO-8601 calendar system such as '11:55:00'.

- **LocalDateTime** is a description of the date (LocalDate), as used for birthdays, combined with the local time (LocalTime) as seen on a wall clock.

- **ZonedDateTime** is a date-time with a timezone in the ISO-8601 calendar system, such as 2007-12-24T16:15:30+01:00 UTC+01:00.

- **Instant** is an instantaneous point on the time-line measured from the epoch of _1970-01-01T00:00:00Z_ in epoch-seconds and nanosecond-of-second.

### Duration and Period

- **Duration** is a time-based amount of time, such as '34.5 seconds'.

- **Period** is a date-based amount of time in the ISO-8601 calendar system, such as '2 years, 3 months and 4 days'.

### Additional value types

- **Year** represents a year in the ISO-8601 calendar system, such as '2016'.

- **YearMonth** represents a year and a month in the ISO-8601 calendar system, such as '2016-01'.

- **Month** represents a month-of-year in the ISO-8601 calendar system, such as 'July'.

- **MonthDay** represents a month-day in the ISO-8601 calendar system, such as '--12-03'. Could be used to represent e.g. Birthdays.

- **DayOfWeek** represents a day-of-week in the ISO-8601 calendar system, such as 'Tuesday'.

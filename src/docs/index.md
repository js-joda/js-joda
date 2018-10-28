# Immutable date and time library for javascript

[![npm version](https://badge.fury.io/js/js-joda.svg)](https://badge.fury.io/js/js-joda)
[![Build Status](https://travis-ci.org/js-joda/js-joda.svg?branch=master)](https://travis-ci.org/js-joda/js-joda)
[![Sauce Test Status](https://saucelabs.com/buildstatus/js-joda)](https://saucelabs.com/u/js-joda)
[![Coverage Status](https://coveralls.io/repos/js-joda/js-joda/badge.svg?branch=master&service=github)](https://coveralls.io/github/js-joda/js-joda?branch=master)
[![Tested node version](https://img.shields.io/badge/tested_with-current_node_LTS-blue.svg?style=flat)]()
[![Downloads/Month](https://img.shields.io/npm/dm/js-joda.svg)](https://img.shields.io/npm/dm/js-joda.svg)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/js-joda.svg)](https://saucelabs.com/u/js-joda)

- **js-joda** is an **immutable date and time library** for javascript. It provides a **simple, domain-driven and clean API** based on the **ISO8601** calendar.

- js-joda has a lightweight footprint, only **46 kB minified and compressed**, no third party dependencies.

- js-joda is **fast**. It is about 2 to 10 times faster than other javascript date libraries.

- js-joda supports **ECMAScript 5** browsers down to ie9.

- js-joda is a **port of the threeten** backport, that is the base for JSR-310 implementation of the Java SE 8 java.time package. Threeten is inspired by **Joda-Time**, having similar concepts and the same author.

- js-joda is **robust and stable**. We ported more then 1700 test-cases with a lots of test-permutations from the threetenbp project. We run the automated karma test-suite against Firefox, Chrome, Node and phantomjs.

## Why yet another javascript date and time library

- Popular javascript date libraries like moment or date-utils are wrappers around the native javascript Date object,
  providing syntactic sugar. The native Date object always consist of a date, time and a timezone part.
  In opposite to that, js-joda is a standalone date and time implementation.

- The API has a domain-driven design with classes for the different use cases, like LocalDate, ZonedDateTime or Period.
  For examples LocalDate allows to handle dates like birthdays or holidays in a clean and error-safe way,
  especially if these dates are persisted to an external server.

- js-joda is immutable. Immutability aligns well with pure functions and
  with the architecture of frameworks like React and Flux.

## The threeten domain models

### Dates and Times

- **LocalDate** represents a date without a time and time-zone in the ISO-8601 calendar system, such as 2007-12-24.

- **LocalTime** represents a time without time-zone in the ISO-8601 calendar system such as '11:55:00'.

- **LocalDateTime** is a description of the date (LocalDate), as used for birthdays, combined with the local time (LocalTime) as seen on a wall clock.

- **ZonedDateTime** is a date-time with a time-zone in the ISO-8601 calendar system, such as 2007-12-24T16:15:30+01:00 UTC+01:00.

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

Immutable date and time library for javascript
==============================================

[![npm version](https://badge.fury.io/js/js-joda.svg)](https://badge.fury.io/js/js-joda)
[![Build Status](https://travis-ci.org/js-joda/js-joda.svg)](https://travis-ci.org/js-joda/js-joda)
[![Coverage Status](https://coveralls.io/repos/js-joda/js-joda/badge.svg?branch=master&service=github)](https://coveralls.io/github/js-joda/js-joda?branch=master)

## Introduction

+ **js-joda** is an **immutable date and time library** for javascript. It provides a **simple, domain-driven and clean API** based on the **ISO8601** calendar.

+ js-joda has a lightweight footprint, only **43 kB minified and compressed**, no third party dependencies.
 
+ js-joda is **fast**. It is about 2 to 10 times faster than other javascript date libraries.
 
+ js-joda supports **ECMAScript 5** browsers down to ie9.          

+ js-joda is a **port of the threeten** backport **aka Joda-Time**, the predecessor project of threetenbp, that is the base for JSR-310 implementation of the Java SE 8 java.time package.

+ js-joda is **robust and stable**. We ported more then 1700 test-cases with a lots of test-permutations from the threetenbp project.
We run the automated karma test-suite against Firefox, Chrome, Node and phantomjs.
     

## Why yet another javascript date and time library

+ Popular javascript date libraries like moment or date-utils are wrappers around the native javascript Date object,
providing syntactic sugar. The native Date object always consist of a date, time and a timezone part.
In opposite to that, js-joda is a standalone date and time implementation.

+ The API has a domain-driven design with classes for the different use cases, like LocalDate, ZonedDateTime or Period.
For examples LocalDate allows to handle dates like birthdays or holidays in a clean and error-safe way,
especially if these dates are persisted to an external server.

+ js-joda is immutable. Immutability aligns well with pure functions and
with the architecture of frameworks like React and Flux.

## The threeten domain models

### Dates and Times

+ **LocalDate** represents a date without a time and time-zone in the ISO-8601 calendar system, such as 2007-12-24.

+ **LocalTime** represents a time without time-zone in the ISO-8601 calendar system such as '11:55:00'.

+ **LocalDateTime** is a description of the date (LocalDate), as used for birthdays, combined with the local time (LocalTime) as seen on a wall clock.

+ **ZonedDateTime** is a date-time with a time-zone in the ISO-8601 calendar system, such as 2007-12-24T16:15:30+01:00 UTC+01:00.

+ **Instant** is an instantaneous point on the time-line measured from the epoch of *1970-01-01T00:00:00Z* in epoch-seconds and nanosecond-of-second.

### Duration and Period

+ **Duration** is a time-based amount of time, such as '34.5 seconds'.

+ **Period**  is a date-based amount of time in the ISO-8601 calendar system, such as '2 years, 3 months and 4 days'.

### Additional value types

+ **Year**  represents a year in the ISO-8601 calendar system, such as '2016'.

+ **YearMonth**  represents a year and a month in the ISO-8601 calendar system, such as '2016-01'.

+ **Month**  represents a month-of-year in the ISO-8601 calendar system, such as 'July'.

+ **MonthDay**  represents a month-day in the ISO-8601 calendar system, such as '--12-03'. Could be used to represent e.g. Birthdays.

+ **DayOfWeek**  represents a day-of-week in the ISO-8601 calendar system, such as 'Tuesday'.

## Getting started

### Node

Install joda using npm

    npm install js-joda

Then require it to any module

    var LocalDate = require('js-joda').LocalDate;

    var d = LocalDate.parse('2012-12-24').atStartOfDay().plusMonths(2); // 2013-02-24T00:00:00

### Browser

To use js-joda from a browser, download either dist/js-joda.min.js or dist/js-joda.js (with sourcemaps for development)

Then add it as a script tag to your page

    <script src="js-joda.min.js"></script>
    <script>
        var LocalDate = JSJoda.LocalDate;
        var d = LocalDate.parse('2012-12-24').atStartOfDay().plusMonths(2); // 2013-02-24T00:00:00
    </script>

## Documentation

+ [Cheat Sheet](CheatSheet.md) Quick start guide
+ [API](//js-joda.github.io/js-joda/esdoc/) ESDoc generated API documentation
+ [js-joda Homepage](http://js-joda.github.io/js-joda/) Project homepage

## Roadmap

### Milestone 1

We reached milestone 1 with version v1.0.0 supporting the domain models LocalDate, LocalDateTime, ZonedDateTime, Instant, Duration 
and Period converting from and to ISO8601. ZonedDateTime (without support for loading iana time-zone databases) currently supports 
only fixed offsets like UTC or UTC+02:00 and the system default time zone.
 
### Milestone 2

Add iana timezone database support to js-joda. 

Implement handling of Daylight saving transitions where missing, mainly in ZonedDateTime. Provide ianna tzdb files that 
can be loaded dynamically. Probably we will use the iana tzdb files from moment-timezone. 
 
### Milestone 3

Add locale support.

Extend pattern parser/ formatter for text with locale support.
  
### Future Milestones

* Reduce library size be removing redundant code, especially by refactoring code for formatting/ parsing dates.
* Increase test coverage (ongoing task)
* Cleanup documentation (ongoing task)
* Improve static factory API design and make it more javascript style. 
One idea is to remove static factory methods like parse, from, of and unify it to one factory methods per domain. 
E.g. localDate(isoDate: string), localDate(year: number, month: number, dayOfMonth: number)
* ...

## Contributing

Contributions are always welcome. Before contributing please read the [code of conduct](http://contributor-covenant.org/version/1/4/) & 
search the issue tracker. We use GitHub issues.  Your issue may have already been discussed or fixed. 
To contribute, fork js-joda, commit your changes, & send a pull request.

By contributing to js-joda, you agree that your contributions will be licensed under its BSD license.

Note that pull requests and issues will only be considered so far as matching the threeten backport API. 
Additional requested features will be rejected.

## License

Joda time is the base for JSR-310 that became part of Java SE 8 in the java.time package.
JSR-310 is a new implementation with an API 'inspired by Joda-Time' but improvements on some design flaws (see 
http://blog.joda.org/2009/11/why-jsr-310-isn-joda-time_4941.html)

js-joda is using the ThreeTen-Backport implementation (http://www.threeten.org/threetenbp/) as a reference base for implementation.
This allows us to release js-joda under the BSD License while the OpenJDK java.time implementation is under GNU GPL+linking exception.
The API of the ThreeTen-Backport is mostly identical to the official Java SE 8 API from the view of our javascript port.

+ js-joda is released under the [BSD 3-clause license](LICENSE):

+ our implementation reference base ThreeTen-Backport (http://www.threeten.org/threetenbp/) is also released under the BSD 3-clause license

+ Joda-Time is under Apache 2.0 licence.

+ OpenJDK is under GNU GPL+linking exception.

+ The author of joda time and the lead architect of the JSR-310 is Stephen Colebourne.

The API of this project (as far as possible with javascript), a lot of implementation details and documentation
are just copied but never equalled.

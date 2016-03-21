Immutable data and time library for javascript
=============================================

[![npm version](https://badge.fury.io/js/js-joda.svg)](https://badge.fury.io/js/js-joda)
[![Build Status](https://travis-ci.org/pithu/js-joda.svg)](https://travis-ci.org/pithu/js-joda)
[![Coverage Status](https://coveralls.io/repos/pithu/js-joda/badge.svg?branch=master&service=github)](https://coveralls.io/github/pithu/js-joda?branch=master)

## Introduction

+ **js-joda** is an **immutable data and time library** for javascript. It provides a **simple, domain-driven and clean API** based on the **ISO8601** calendar.

+ js-joda is a **port of the threeten** backport **aka Joda-Time**, the predecessor project of threeten, that is the base for JSR-310 implementation of the Java SE 8 java.time package.

+ js-joda has a lightweight footprint, only **36 kB minified and compressed**, no third party dependencies.
 
+ js-joda is **fast**. It is about 2 to 10 times faster than other javascript date libraries.
 
+ js-joda is **robust and stable**. We ported more then 1500 test-cases with a lots of test-permutations from the threeten project. 
We run the automated karma test-suite against Firefox, Chrome, Node and phantomjs.
     
+ js-joda supports **ECMAScript 5** browsers down to ie9.          

## Why yet another javascript date and time library

+ Popular javascript date libraries like moment or date-utils are wrappers around the native javascript Date object,
providing syntactic sugar. The native Date object always consist of a date, time and a timezone part.
In opposite to that, js-joda is a standalone date and time implementation.

+ The API has a domain-driven design with classes for the different use cases, like LocalDate, ZonedDateTime or Period.
For examples LocalDate allows to handle dates like birthdays or holidays in a clean and error-safe way,
especially if these dates are persisted to an external server.

+ js-joda is immutable. Immutability aligns well with pure functions and
with the architecture of frameworks like React and Flux.

+ js-joda is a port of the sophisticated, robust and domain-driven API of Joda-Time (to be more precise of the ThreeTen-Backport of the Java SE 8 java.time package).

## The js-joda domain models

+ **LocalDate** represents a date without a time and time-zone in the ISO-8601 calendar system, such as 2007-12-24.

+ **LocalTime** represents a time without time-zone in the ISO-8601 calendar system such as '11:55:00'.

+ **LocalDateTime** is a description of the date, as used for birthdays, combined with the local time as seen on a wall clock.

+ **ZonedDateTime** is a date-time with a time-zone in the ISO-8601 calendar system, such as 2007-12-24T16:15:30+01:00 UTC+01:00.

+ **Instant** is an instantaneous point on the time-line measured from the epoch of *1970-01-01T00:00:00Z* in epoch-seconds and nanosecond-of-second.

+ **Duration** is a time-based amount of time, such as '34.5 seconds'.

+ **Period**  is a date-based amount of time in the ISO-8601 calendar system, such as '2 years, 3 months and 4 days'.

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

+ [Cheat Sheet](cheat-sheet.html) Quick start guide
+ [API](https://doc.esdoc.org/github.com/pithu/js-joda/) ESDoc generated API documentation hosted by the ESDoc Hosting Service

## Roadmap

### Milestone 1

We reached milestone 1 with version v1.0.0 supporting the domain models LocalDate, LocalDateTime, ZonedDateTime, Instant, Duration 
and Period converting from and to ISO8601. ZonedDateTime without the iana time-zone database loaded, supports only fixed offsets 
like UTC or GMT+02:00 and the system default time zone.
 
### Future Milestones

Any further timezone converting and localization is not part of the first milestone and will be saved for later.
This might also be an extra package to reduce library size if Timezone functionality is not needed.

## License

Joda time is the base for JSR-310 that became part of Java SE 8 in the java.time package.
JSR-310 is a new implementation with an API 'inspired by Joda-Time' but improvements on some design flaws (see http://blog.joda.org/2009/11/why-jsr-310-isn-joda-time_4941.html)

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

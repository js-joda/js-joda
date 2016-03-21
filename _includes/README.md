Immutable data and time library for javascript
=============================================

[![npm version](https://badge.fury.io/js/js-joda.svg)](https://badge.fury.io/js/js-joda)
[![Build Status](https://travis-ci.org/pithu/js-joda.svg)](https://travis-ci.org/pithu/js-joda)
[![Coverage Status](https://coveralls.io/repos/pithu/js-joda/badge.svg?branch=master&service=github)](https://coveralls.io/github/pithu/js-joda?branch=master)

## Introduction

js-joda, a port of the ThreeTen immutable data and time library to javascript. It provides a simple and clean API based on the ISO8601 calendar.
Joda-Time (the predecessor project) used to be the de facto standard date and time library for Java and is the base for JSR-310 that became part of Java SE 8 in the java.time package.

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

## Getting started

The library is in a very early state, far away from productive.
But you are very welcome to play around with js-joda and to give your feedback.
Please check the tests and the API Documentation for the current state of development.

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
+ [js-joda Homepage](http://pithu.github.io/js-joda/) Project homepage

## Roadmap

### Milestone 1
Our current plan is to have a first milestone with LocalDate, LocalDateTime, Instant, Duration and Period working.
The result of the first milestone will be a fully functional Date/Time library, converting from and to ISO8601, with UTC and system default timezone.

### Future Milestones

Any further timezone converting and localization is not part of the first milestone and will be saved for later. This might also be an extra package
 to reduce library size if Timezone functionality is not needed.

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

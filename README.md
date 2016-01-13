Immutable data and time library for javascript
=============================================

[![npm version](https://badge.fury.io/js/js-joda.svg)](https://badge.fury.io/js/js-joda)
[![Build Status](https://travis-ci.org/pithu/js-joda.svg)](https://travis-ci.org/pithu/js-joda)
[![Coverage Status](https://coveralls.io/repos/pithu/js-joda/badge.svg?branch=master&service=github)](https://coveralls.io/github/pithu/js-joda?branch=master)

## Introduction

**js-joda is a project that wants to bring joda time library API to the javascript world. 
The Project is in a very early state. 
Be aware that the most of the things written here are not ready yet** 

js-joda, a port of the Joda-Time immutable data and time library to javascript. 
It provides a simple and clean API based on the ISO8601 calendar.
Joda-Time is the de facto standard date and time library for Java. It is the base for JSR-310 that became part of Java SE 8 in the java.time package.
JSR-310 is a new implementation with an API 'inspired by Joda-Time' but improvements on some design flaws (see http://blog.joda.org/2009/11/why-jsr-310-isn-joda-time_4941.html)

js-joda is using the ThreeTen-Backport implementation (http://www.threeten.org/threetenbp/) as a reference base for implementation. 
This allows us to release js-joda under the BSD License while the OpenJDK java.time implementation is under GNU GPL+linking exception. 
The API of the ThreeTen-Backport is mostly identical to the official Java SE 8 API from the view of our javascript port.

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
        var LocalDate = jsjoda.LocalDate;
        var d = LocalDate.parse('2012-12-24').atStartOfDay().plusMonths(2); // 2013-02-24T00:00:00
    </script>
     
## Documentation

+ [Cheat Sheet](CheatSheet.md) Quick start guide 
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

+ js-joda is released under the BSD 3-clause license:

```
/*
 * Copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 *  
 * All rights reserved.
 *  
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *  
 *  * Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *  
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *  
 *  * Neither the name of js-joda nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *  
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
 ```

+ our implementation reference base ThreeTen-Backport (http://www.threeten.org/threetenbp/) is also released under the BSD 3-clause license

+ Joda-Time is under Apache 2.0 licence.

+ OpenJDK is under GNU GPL+linking exception.

+ The author of joda time and the lead architect of the JSR-310 is Stephen Colebourne. 

The API of this project (as far as possible with javascript), a lot of implementation details and documentation 
are just copied but never equalled ;)



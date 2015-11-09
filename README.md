Immutable data and time library for javascript
=============================================

[![npm version](https://badge.fury.io/js/joda.svg)](https://badge.fury.io/js/joda)
[![Build Status](https://travis-ci.org/pithu/joda-js.svg)](https://travis-ci.org/pithu/joda-js)
[![Coverage Status](https://coveralls.io/repos/pithu/joda-js/badge.svg?branch=master&service=github)](https://coveralls.io/github/pithu/joda-js?branch=master)

## Introduction

**JS-Joda-Time is a project that wants to bring joda time library to the javascript world. 
The Project is in a very early state. 
Be aware that the most of the things written here are not ready yet** 

JS-Joda-Time, a port of the Joda-Time immutable data and time library to javascript. 
It provides a simple and clean API based on the ISO8601 calendar.
Joda-Time is the de facto standard date and time library for Java. From Java SE 8 it is part of the jdk at java.time (JSR-310).

## Why yet another javascript date and time library

+ Popular javascript date libraries like moment or date-utils are wrappers around the native javascript Date object, 
providing syntactic sugar. The native Date object always consist of a date, time and a timezone part.

+ In opposite to that, Joda.js is a standalone date and time implementation. 
It brings concepts like a LocalDate that allows to handle dates like birthdays or holidays in a clean and error-safe way, 
especially if this dates are persisted to an external server.

+ Joda.js is immutable. Immutability aligns well with pure functions and
with the architecture of frameworks like React and Flux. 

+ Joda.js is a port of the sophisticated, robust and domain-driven API of Joda-Time (to be more precise of the jdk8 java.time package).

## Getting started

The library is in a very early state, far away from productive. 
But you are very welcome to play around with Joda.js and to give your feedback. 
Please check the tests and the API Documentation for the current state of development.

### Node

Install joda using npm

    npm install js-joda-time

Then require it to any module
 
    var LocalDate = require('js-joda-time').LocalDate;
    
    var d = LocalDate.parse('2012-12-24').atStartOfDay().plusMonths(2); // 2013-02-24T00:00:00
     
### Browser

To use Joda.js from a browser, download either dist/jsJodaTime.min.js or dist/jsJodaTime.js (with sourcemaps for development) 

Then add it as a script tag to your page

    <script src="jsJodaTime.min.js"></script>
    <script>
        var LocalDate = jsJodaTime.LocalDate;
        var d = LocalDate.parse('2012-12-24').atStartOfDay().plusMonths(2); // 2013-02-24T00:00:00
    </script>
     
## Documentation

+ [Cheat Sheet](CheatSheet.md) Quick start guide 
+ [API](https://doc.esdoc.org/github.com/pithu/js-joda-time/) ESDoc generated API documentation hosted by the ESDoc Hosting Service
+ [JS-Joda-Time Homepage](http://pithu.github.io/js-joda-time/) Project homepage


## License

+ The License model is still under consideration, but it will be an open source license.

+ Joda-Time is under Apache 2.0 licence.

+ OpenJdk is under GNU GPL+linking exception.

+ The author of joda time and the lead architect of the JSR-310 is Stephen Colebourne. 
The API of this project (as far as possible with javascript), a lot of implementation details and documentation 
are just copied but never equalled ;)



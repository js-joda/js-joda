Immutable data and time library for javascript
=============================================

[![Build Status](https://travis-ci.org/pithu/joda-js.svg)](https://travis-ci.org/pithu/joda-js)
[![Coverage Status](https://coveralls.io/repos/pithu/joda-js/badge.svg?branch=master&service=github)](https://coveralls.io/github/pithu/joda-js?branch=master)

## Introduction

**Joda.js is a project that wants to bring joda time library to the javascript world. 
The Project is in a very early state. 
Be aware that the most of the things written here are not ready yet** 

Joda.js, a port of the Joda-Time immutable data and time library to javascript. 
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

    npm install joda

Then require it to any module
 
    var LocalDate = require('joda').LocalDate;
    
    var d = LocalDate.parse('2012-12-24').atStartOfDay().plusMonths(2); // 2013-02-24T00:00:00
     
### Browser

To use Joda.js from a browser, download dist/joda.min.js

Then add it as a script tag to your page

    <script src="joda.min.js"></script>
    <script>
        var d = LocalDate.parse('2012-12-24').atStartOfDay().plusMonths(2); // 2013-02-24T00:00:00
    </script>
     
## Documentation

+ [Cheat Sheet](CheatSheet.md) Quick start guide 
+ [API](https://doc.esdoc.org/github.com/pithu/joda-js/) ESDoc generated API documentation hosted by the ESDoc Hosting Service
+ [Joda.js Homepage](http://pithu.github.io/joda-js/) Project homepage


## License

+ The License model is still under consideration, but it will be an open source license.

+ Joda-Time is under Apache 2.0 licence.

+ OpenJdk is under GNU GPL+linking exception.


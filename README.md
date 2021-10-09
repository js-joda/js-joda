# Immutable date and time library for JavaScript

[![npm version](https://badge.fury.io/js/%40js-joda%2Fcore.svg)](https://badge.fury.io/js/%40js-joda%2Fcore)
[![Travis Build Status](https://app.travis-ci.com/js-joda/js-joda.svg?branch=master)](https://app.travis-ci.com/js-joda/js-joda)
[![Sauce Test Status](https://saucelabs.com/buildstatus/js-joda)](https://saucelabs.com/u/js-joda)
[![Coverage Status](https://coveralls.io/repos/js-joda/js-joda/badge.svg?branch=master&service=github)](https://coveralls.io/github/js-joda/js-joda?branch=master)
[![Downloads/Month](https://img.shields.io/npm/dm/%40js-joda%2Fcore.svg)](https://img.shields.io/npm/dm/%40js-joda%2Fcore.svg)

[![Sauce Browser Test Status](https://saucelabs.com/browser-matrix/js-joda.svg)](https://saucelabs.com/u/js-joda)

## Introduction

**js-joda** is an **immutable date and time library** for JavaScript. It provides a **simple, domain-driven and clean API** based on the **ISO8601** calendar.

- js-joda supports **ECMAScript 5** browsers down to IE11.

- js-joda is a **port of the ThreeTen** backport, which is the base for JSR-310 implementation of the Java SE 8 java.time package. Threeten is inspired by **Joda-Time**, having similar concepts and the same author.

- js-joda is **robust and stable**. We ported more then 1700 test-cases with a lots of test-permutations from the ThreeTen Backport project. We run the automated karma test-suite against Firefox, Chrome, Node and phantomjs.

## js-joda packages

js-joda consist of four packages:

|  package name | description  |  path |
|---|---|---|
| `@js-joda/core` | Implementation of the ThreeTen Classes and API | [/packages/core](//github.com/js-joda/js-joda/tree/master/packages/core) |
| `@js-joda/timezone` | Implementation of timezone calculation based on the iana Time Zone Database | [/packages/timezone](//github.com/js-joda/js-joda/tree/master/packages/timezone) |
| `@js-joda/locale` | Implementation of locale specific functionality for js-joda, especially for formatting and parsing locale specific dates | [/packages/locale](//github.com/js-joda/js-joda/tree/master/packages/locale) |
| `@js-joda/extra` | Implementation of the ThreeTen-Extra Classes and API |[/packages/extra](//github.com/js-joda/js-joda/tree/master/packages/extra) |

The [@js-joda/examples](//github.com/js-joda/js-joda/tree/master/packages/examples) package is for testing the different build artifacts in different context, like webpack, browser node, etc.

## Links

- Documentation [https://js-joda.github.io/js-joda/](https://js-joda.github.io/js-joda/) 

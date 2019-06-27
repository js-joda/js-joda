# Immutable date and time library for JavaScript

[![Tested node version](https://img.shields.io/badge/tested_with-current_node_LTS-blue.svg?style=flat)]()
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)


## Introduction

**js-joda** is an **immutable date and time library** for JavaScript. It provides a **simple, domain-driven and clean API** based on the **ISO8601** calendar.

- js-joda supports **ECMAScript 5** browsers down to IE9.

- js-joda is a **port of the threeten** backport, which is the base for JSR-310 implementation of the Java SE 8 java.time package. Threeten is inspired by **Joda-Time**, having similar concepts and the same author.

- js-joda is **robust and stable**. We ported more then 1700 test-cases with a lots of test-permutations from the threetenbp project. We run the automated karma test-suite against Firefox, Chrome, Node and phantomjs.

## js-joda is now a mono repo

We moved all js-joda libraries into this repository as a monorepo and
put all js-joda npm modules under the @js-joda scope.

|  previous package name | last version  | new scoped package name  |  
|---|---|---|
| `js-joda` | `@1.11.0` |`@js-joda/core`| 
| `js-joda-timezone` | `@2.0.2` |`@js-joda/timezone` |
| `js-joda-extra` | `@0.2.2` |`@js-joda/extra` |
| `@js-joda/locale` | is already under `@js-joda` scope |


Except the monorepo, the old repositories are deprecated from now on.

| package | old repo | new path in monorepo |
|---|---|---|
| `js-joda` | https://github.com/js-joda/js-joda | `/packages/core` |
| `js-joda-timezone` | https://github.com/js-joda/js-joda-timezone | `/packages/timezone` | 
| `js-joda-locale` | https://github.com/js-joda/js-joda-locale | `/packages/locale` |
| `js-joda-extra` | https://github.com/js-joda/js-joda-extra | `/packages/extra` |
| `js-joda-examples` | https://github.com/js-joda/js-joda-examples | `/packages/examples` |

## Links

- Documentation [https://js-joda.github.io/js-joda/](https://js-joda.github.io/js-joda/) 
- Monorepo [https://github.com/js-joda/js-joda](https://github.com/js-joda/js-joda) 

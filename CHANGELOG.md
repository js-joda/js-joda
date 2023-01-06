Changelog
=========

## 2023-01-02

### Versions

- @js-joda/core@5.5.1
- @js-joda/extra@0.11.1
- @js-joda/locale@4.8.8
- @js-joda/timezone@2.17.1

#### :bug: Bug Fix
* `core`
  * [#665](https://github.com/js-joda/js-joda/pull/665) hot fix native js ([@pithu](https://github.com/pithu))

## 2022-12-28 / 2

### Versions

@js-joda/timezone@2.17.0

#### :rocket: Enhancement
* `timezone`
  * [#661](https://github.com/js-joda/js-joda/pull/661) update tzdb 2022g ([@pithu](https://github.com/pithu))

## 2022-12-28 / 1

### Versions

@js-joda/timezone@2.16.0

#### :rocket: Enhancement
* `timezone`
  * [#660](https://github.com/js-joda/js-joda/pull/660) update tzdb 2022f ([@pithu](https://github.com/pithu))

## 2022-12-27

### Versions

@js-joda/core@5.5.0, @js-joda/extra@0.11.0, @js-joda/locale@4.8.7, @js-joda/timezone@2.15.1

#### :rocket: Enhancement
* `core`, `extra`
  * [#648](https://github.com/js-joda/js-joda/pull/648) rewrite `NativeJsTemporal` to support all common `TemporalField`s ([@perceptron8](https://github.com/perceptron8))
  * [#657](https://github.com/js-joda/js-joda/pull/657) add extra/Temporals ([@perceptron8](https://github.com/perceptron8))
* `timezone`
  * [#646](https://github.com/js-joda/js-joda/pull/646) add iana tzdb 2022f data files ([@pithu](https://github.com/pithu))

#### :bug: Bug Fix
* `extra`
  * [#654](https://github.com/js-joda/js-joda/pull/654) fix README ([@pithu](https://github.com/pithu))

#### :house: Dependency update
* `core`, `extra`, `locale`, `timezone`
  * [#659](https://github.com/js-joda/js-joda/pull/659) upgrade npm packages (ncu -u) ([@pithu](https://github.com/pithu))


## 2022-10-18

### Versions

@js-joda/core@5.4.2, @js-joda/extra@0.10.2, @js-joda/locale@4.8.6, @js-joda/timezone@2.15.0

#### :rocket: Enhancement
* `locale`
  * [#637](https://github.com/js-joda/js-joda/pull/637) update urls in locale packages ([@Inok](https://github.com/Inok))
* `timezone`
  * [#636](https://github.com/js-joda/js-joda/pull/636) fix urls in timezone package ([@Inok](https://github.com/Inok))
  * [#634](https://github.com/js-joda/js-joda/pull/634) update tzdb to 2022e ([@pithu](https://github.com/pithu))
* `core`
  * [#635](https://github.com/js-joda/js-joda/pull/635) core - sync homepage in package.json and bower.json ([@Inok](https://github.com/Inok))


## 2022-09-30

### Versions

@js-joda/core@5.4.1, @js-joda/extra@0.10.1, @js-joda/locale@4.8.5, @js-joda/timezone@2.14.0

#### :rocket: Enhancement
* `timezone`
  * [#632](https://github.com/js-joda/js-joda/pull/632) update tzdb to 2022d ([@pithu](https://github.com/pithu))
* `core`, `extra`, `locale`, `timezone`
  * [#628](https://github.com/js-joda/js-joda/pull/628) Rename default branch from master to main ([@pithu](https://github.com/pithu))

#### :bug: Bug Fix
* `core`, `extra`
  * [#630](https://github.com/js-joda/js-joda/pull/630) lengthInDays(): POSITIVE_INFINITY instead of NaN if range is unbounded ([@perceptron8](https://github.com/perceptron8))

## 2022-09-22 / 2

### Versions

@js-joda/core@5.4.0, @js-joda/extra@0.10.0, @js-joda/locale@4.8.4, @js-joda/timezone@2.13.1

#### :rocket: Enhancement
* `core`, `extra`
  * [#622](https://github.com/js-joda/js-joda/pull/622) extra types ([@perceptron8](https://github.com/perceptron8))

#### :bug: Bug Fix
* `core`
  * [#621](https://github.com/js-joda/js-joda/pull/621) fix rounding in OffsetTime and YearMonth ([@perceptron8](https://github.com/perceptron8))

## 2022-09-22

### Versions

@js-joda/core@5.3.2, @js-joda/extra@0.9.1, @js-joda/locale@4.8.3, @js-joda/timezone@2.13.0, @js-joda/locale_da@4.8.3

#### :rocket: Enhancement
* `timezone`
  * [#626](https://github.com/js-joda/js-joda/pull/626) Upgrade tzdb to 2022c ([@pithu](https://github.com/pithu))


## 2022-08-18

### Versions

@js-joda/core@5.3.1, @js-joda/extra@0.9.0, @js-joda/locale@4.8.2, @js-joda/timezone@2.12.2

#### :rocket: Enhancement
* `core`, `extra`
  * [#614](https://github.com/js-joda/js-joda/pull/614) add DayOfMonth and DayOfYear ([@perceptron8](https://github.com/perceptron8))

## 2022-08-14 / 2

### Versions

@js-joda/core v5.3.0, @js-joda/extra v0.8.1, @js-joda/locale v4.8.1, @js-joda/timezone v2.12.1

#### :house: Dependency update
* Other
  * [#616](https://github.com/js-joda/js-joda/pull/616) Bump parse-url from 6.0.0 to 6.0.5 ([@dependabot[bot]](https://github.com/apps/dependabot))
  * [#615](https://github.com/js-joda/js-joda/pull/615) Bump terser from 5.10.0 to 5.14.2 ([@dependabot[bot]](https://github.com/apps/dependabot))
  * [#613](https://github.com/js-joda/js-joda/pull/613) Bump moment from 2.29.1 to 2.29.4 ([@dependabot[bot]](https://github.com/apps/dependabot))
  * [#607](https://github.com/js-joda/js-joda/pull/607) Bump ejs from 3.1.6 to 3.1.7 ([@dependabot[bot]](https://github.com/apps/dependabot))
* `examples`
  * [#612](https://github.com/js-joda/js-joda/pull/612) Bump moment from 2.29.1 to 2.29.4 in /packages/examples ([@dependabot[bot]](https://github.com/apps/dependabot))

## 2022-08-14

### Versions

@js-joda/core v5.3.0, @js-joda/extra v0.8.1, @js-joda/locale v4.8.0, @js-joda/timezone v2.12.1

#### :rocket: Enhancement
* `locale`
  * [#606](https://github.com/js-joda/js-joda/pull/606) Add a prebuilt en-gb locale ([@benlondon](https://github.com/benlondon))
  * [#599](https://github.com/js-joda/js-joda/pull/599) prebuilt packages for new locales (pl, da, el) ([@mstawick](https://github.com/mstawick))
* `core`
  * [#590](https://github.com/js-joda/js-joda/pull/590) Add Instant micro methods to Typescript definitions. ([@mattbishop](https://github.com/mattbishop))
* Other
  * [#591](https://github.com/js-joda/js-joda/pull/591) Fix formatting in simple parser example ([@kcsmnt0](https://github.com/kcsmnt0))

#### :house: Dependency update
* [#596](https://github.com/js-joda/js-joda/pull/596) Bump karma from 6.3.9 to 6.3.16 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#594](https://github.com/js-joda/js-joda/pull/594) Bump follow-redirects from 1.14.7 to 1.14.8 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#589](https://github.com/js-joda/js-joda/pull/589) Bump node-fetch from 2.6.5 to 2.6.7 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#587](https://github.com/js-joda/js-joda/pull/587) Bump log4js from 6.3.0 to 6.4.0 ([@dependabot[bot]](https://github.com/apps/dependabot))

## 2022-01-19

### Versions

@js-joda/core@5.2.0, @js-joda/extra@0.8.0, @js-joda/locale@4.7.0, @js-joda/timezone@2.12.0

### Changes

#### :rocket: Enhancement
* `core`
    * [#584](https://github.com/js-joda/js-joda/pull/584) Support for Instant micros -- ofEpochMicros, plus and minus micros. ([@mattbishop](https://github.com/mattbishop))
* `core`, `examples`, `extra`, `locale`, `timezone`
    * [#579](https://github.com/js-joda/js-joda/pull/579) Upgrade all dependencies and bundle all packages with `rollup.js` instead of `webpack` ([@pithu](https://github.com/pithu))
* Other
    * [#581](https://github.com/js-joda/js-joda/pull/581) Add github action for stale handling ([@pithu](https://github.com/pithu))


## Previous changes

For previous versions check the `CHANGELOG.md` files in the package directories:

- [@js-joda/core up to 5.1.0](packages/core/CHANGELOG.md) 
- [@js-joda/extra up to 0.7.0](packages/extra/CHANGELOG.md) 
- [@js-joda/locale up to 4.6.0](packages/locale/CHANGELOG.md)
- [@js-joda/timezone up to 2.11.0](packages/timezone/CHANGELOG.md) 

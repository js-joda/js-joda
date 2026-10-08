Changelog
=========

## Unreleased

#### :rocket: Enhancement
* `locale`
    * [#830](https://github.com/js-joda/js-joda/pull/830) Print the standard or daylight saving name of a time-zone with the `z` and `zzzz` patterns, e.g. `Central European Summer Time` instead of `Central European Time`, as in java.time; port of [ThreeTen/threetenbp@456f648](https://github.com/ThreeTen/threetenbp/commit/456f648b4) ([@pithu](https://github.com/pithu))
        This needs `@js-joda/timezone` 3.1.0 or later with tz data that has standard offsets (the default). If the value has no instant, or the zone rules don't support `isDaylightSavings()`, the generic name is printed as before. A daylight saving name no longer falls back to the standard name of the metazone, which denotes a different offset (e.g. `GMT` for `Europe/London` in summer with `Locale.ENGLISH` and `z`); the zone id is printed instead.

#### :bug: Bug Fix
* `locale`
    * [#830](https://github.com/js-joda/js-joda/pull/830) Parse fixed offsets with the `z` and `zzzz` patterns, e.g. `+01:00`, `Z`, `UT`, `UTC-01:00` or `GMT+02:00`, as in java.time; port of [ThreeTen/threetenbp@f0f09a6](https://github.com/ThreeTen/threetenbp/commit/f0f09a6fb) ([@pithu](https://github.com/pithu))
* `core`
    * [#830](https://github.com/js-joda/js-joda/pull/830) `LocalDate.ofEpochDay()` checks the epoch day against `ChronoField.EPOCH_DAY` and throws a `DateTimeException` naming that field, instead of a misleading year error or an int overflow; port of [ThreeTen/threetenbp@006216f](https://github.com/ThreeTen/threetenbp/commit/006216f27) ([@pithu](https://github.com/pithu))
* `timezone`
    * [#830](https://github.com/js-joda/js-joda/pull/830) Add a test that parses `ZonedDateTime.toString()` back for every available zone; port of [ThreeTen/threetenbp@5e9389c](https://github.com/ThreeTen/threetenbp/commit/5e9389cc8) ([@pithu](https://github.com/pithu))

## 2026-10-07

### Versions

- @js-joda/core@6.3.0
- @js-joda/timezone@3.1.0
- @js-joda/extra@0.13.2
- @js-joda/locale@5.3.2
- @js-joda/locale_* prebuilt locale packages (@5.3.2)

#### :rocket: Enhancement
* `core`
    * [#827](https://github.com/js-joda/js-joda/pull/827) Add `Duration.toDaysPart()` and `Duration.toNanosPart()`, port of [ThreeTen/threetenbp#137](https://github.com/ThreeTen/threetenbp/pull/137) ([@pithu](https://github.com/pithu))
* `timezone`
    * [#825](https://github.com/js-joda/js-joda/pull/825) Implement `ZoneRules.standardOffset()`, `daylightSavings()`, `isDaylightSavings()`, `nextTransition()` and `previousTransition()` with the same results as java.time; `transitions()` and `transitionRules()` remain unsupported ([@pithu](https://github.com/pithu))
        The packed data carries the standard offset per period type as a new 8th field (backward compatible: the offsets are unchanged and older readers ignore the field), taken from the STDOFF column of the tzdb Zone lines; unpacked zones get a `stdOffsets` array. With tz data without standard offsets, for example the versioned files `data/packed/2026d.json` and older, the three daylight saving methods throw. The internal classes `MomentZoneRules` and `MomentZoneRulesProvider` are renamed to `TzdbZoneRules` and `TzdbZoneRulesProvider`; they are not exported.

#### :bug: Bug Fix
* `core`
    * [#826](https://github.com/js-joda/js-joda/pull/826) Fix `Instant.toEpochMilli()` overflowing for epoch millis close to `Number.MIN_SAFE_INTEGER`, port of [ThreeTen/threetenbp#51](https://github.com/ThreeTen/threetenbp/pull/51) ([@pithu](https://github.com/pithu))
    * [#828](https://github.com/js-joda/js-joda/pull/828) Parse an instant-seconds field (`ChronoField.INSTANT_SECONDS`) together with an offset or zone, e.g. `86402 9000`, into a `ZonedDateTime`, `LocalDateTime` or `Instant`; port the missing resolve steps of ThreeTen-Backport's `DateTimeBuilder` (merge instant fields, cross check, fractional seconds) and its `TestDateTimeParsing`, which includes the tests of [ThreeTen/threetenbp#98](https://github.com/ThreeTen/threetenbp/pull/98) ([@pithu](https://github.com/pithu))
        Parsed fields that contradict the resolved date-time, such as a second-of-day that differs from the parsed hour, minute and second, now throw a `DateTimeException`, as in java.time.
    * [#829](https://github.com/js-joda/js-joda/pull/829) Add missing TypeScript declarations: `OffsetDateTime.toZonedDateTime()`, `Year.format()`, `ZoneOffset.query()`, `Duration.minusDuration()`, `IsoChronology.INSTANCE` and `IsoChronology.date()`, `DecimalStyle.STANDARD` and `DecimalStyle.withZeroDigit()`, `withPositiveSign()`, `withNegativeSign()`, `withDecimalSeparator()` ([@pithu](https://github.com/pithu))
* `extra`
    * [#829](https://github.com/js-joda/js-joda/pull/829) Add missing TypeScript declarations: `Interval.ALL`, `OffsetDate.MIN`, `OffsetDate.MAX`, `OffsetDate.FROM`, `Quarter.FROM`, `Quarter.hashCode()`, `YearQuarter.FROM` and `YearWeek.FROM` ([@pithu](https://github.com/pithu))

## 2026-10-02

### Versions

- @js-joda/locale@5.3.1
- @js-joda/timezone@3.0.0
- @js-joda/locale_* prebuilt locale packages (patch release)

#### :boom: Breaking Change
* `timezone`
    * [#821](https://github.com/js-joda/js-joda/pull/821) Remove the fixed-year bundles `js-joda-timezone-1970-2030`, `js-joda-timezone-2012-2022` and `js-joda-timezone-2017-2027`; use the full bundle or one of the `-4-year-range`, `-10-year-range`, `-60-year-range`, `-300-year-range` or `-lifetime-range` bundles instead ([@pithu](https://github.com/pithu))

#### :rocket: Enhancement
* `locale`
    * Allow `@js-joda/timezone` 3 as peer dependency of `@js-joda/locale` and the prebuilt `@js-joda/locale_*` packages (`^2.25.0 || ^3.0.0`) ([@pithu](https://github.com/pithu))
* `timezone`
    * [#821](https://github.com/js-joda/js-joda/pull/821) Add the `-300-year-range` bundle (current year ± 150, 1876 to 2176 for the 2026 data) and the `-lifetime-range` bundle for birth dates of living people (current year - 120 to + 15, 1906 to 2041), and document the size and range of all bundles ([@pithu](https://github.com/pithu))
    * [#817](https://github.com/js-joda/js-joda/pull/817) Generate the tzdb data in this repository with the new private package `@js-joda/tzdb-builder` instead of moment-timezone; add the `-4-year-range` and `-60-year-range` bundles; the packed data carries an isdst flag per period type (backward compatible) ([@pithu](https://github.com/pithu))
        The bundled zone data is unchanged. The raw data files in the repository (`data/packed/*.json`, `data/unpacked/*.json`, not part of the npm package) change their format: the `countries` key and the per-zone `population` and `countries` values are removed; packed zone strings get a 7th field with the isdst flags and an empty population field; unpacked zones get an `isdsts` array. The `transform-data` npm script is removed, use `npm run generate` in `packages/tzdb-builder` instead.
    * [#820](https://github.com/js-joda/js-joda/pull/820) update tzdb to version 2026e ([@pithu](https://github.com/pithu))

## 2026-10-02

### Versions

- @js-joda/core@6.2.0
- @js-joda/locale@5.3.0
- @js-joda/timezone@2.26.0

#### :bug: Bug Fix
* `core`
    * [#815](https://github.com/js-joda/js-joda/pull/815) fix(core): truncate Instant.until MICROS toward zero ([@youdie006](https://github.com/youdie006))
    * [#814](https://github.com/js-joda/js-joda/pull/814) fix(core): truncate signed duration division toward zero ([@agammann](https://github.com/agammann))
    * [#812](https://github.com/js-joda/js-joda/pull/812) fix(core): correct ISO_WEEK_DATE and enable ISO week/quarter parsing ([@binggao1230](https://github.com/binggao1230))
        `DateTimeFormatter.ISO_WEEK_DATE` now uses the ISO week-based year, e.g. `2013-12-30` formats as `2014-W01-1` and back. Before, the result was off by a week in most years. Dates with week-based-year or quarter fields (`YEAR` + `QUARTER_OF_YEAR` + `DAY_OF_QUARTER`) can now be parsed.

#### :house: Dependency update
* `locale`
    * [#813](https://github.com/js-joda/js-joda/pull/813) Bump brace-expansion from 2.0.2 to 2.1.4 in /packages/locale ([@dependabot[bot]](https://github.com/apps/dependabot))
    * [#811](https://github.com/js-joda/js-joda/pull/811) Bump axios from 1.17.0 to 1.18.1 in /packages/locale ([@dependabot[bot]](https://github.com/apps/dependabot))

## 2026-07-10

### Versions

- @js-joda/core@6.1.0
- @js-joda/locale@5.2.0
- @js-joda/timezone@2.25.2

#### :rocket: Enhancement
* Other
    * [#806](https://github.com/js-joda/js-joda/pull/806) docs: clarify contributions must derive from threeten-bp, not OpenJDK ([@pithu](https://github.com/pithu))

#### :bug: Bug Fix
* `locale`
    * [#810](https://github.com/js-joda/js-joda/pull/810) fix(locale): exclude non-uniquely-parsable text styles from parsing ([@CedricConday](https://github.com/CedricConday))
* `core`
    * [#805](https://github.com/js-joda/js-joda/pull/805) fix(core): correct Duration.toString for negative seconds on minute boundary ([@spokodev](https://github.com/spokodev))
    * [#804](https://github.com/js-joda/js-joda/pull/804) fix: Instant.parse should accept an offset and resolve to the UTC instant (#731) ([@CedricConday](https://github.com/CedricConday))
    * [#803](https://github.com/js-joda/js-joda/pull/803) Fix toSecondsPart typo in Duration Flow type definition ([@greymoth-jp](https://github.com/greymoth-jp))
    * [#809](https://github.com/js-joda/js-joda/pull/809) fix(core): initialize parsed excessDays to Period.ZERO ([@spokodev](https://github.com/spokodev))
    * [#808](https://github.com/js-joda/js-joda/pull/808) fix(core): truncate Instant toward negative infinity for pre-epoch values ([@spokodev](https://github.com/spokodev))
    * [#807](https://github.com/js-joda/js-joda/pull/807) fix: parse zone ids that share a prefix with a fixed id ([@apoorva-01](https://github.com/apoorva-01))
    * Instant.parse() doesn't work with ISO8601 timestamp with offset ([@fluidsonic](https://github.com/fluidsonic))

#### :house: Dependency update
* `locale`
    * [#802](https://github.com/js-joda/js-joda/pull/802) Bump form-data from 4.0.5 to 4.0.6 in /packages/locale ([@dependabot[bot]](https://github.com/apps/dependabot))
    * [#801](https://github.com/js-joda/js-joda/pull/801) Bump axios from 1.13.6 to 1.17.0 in /packages/locale ([@dependabot[bot]](https://github.com/apps/dependabot))
    * [#798](https://github.com/js-joda/js-joda/pull/798) Bump follow-redirects from 1.15.11 to 1.16.0 in /packages/locale ([@dependabot[bot]](https://github.com/apps/dependabot))

## 2026-04-08

### Versions

- @js-joda/locale@5.1.0

#### :bug: Bug Fix
* `locale`
    * [#796](https://github.com/js-joda/js-joda/pull/796) Make @js-joda/locale peer dependencies to cldr-data and @js-joda/timezone optional ([@pithu](https://github.com/pithu))
        This allows to use @js-joda/locale without @js-joda/timezone and makes it easier to bundle locale language packages without cldr-data.

## 2026-03-28

### Versions

- @js-joda/timezone@2.25.0

#### :rocket: Enhancement
* `timezone`
    * [#788](https://github.com/js-joda/js-joda/pull/788) update tzdb to version 2026a ([@pithu](https://github.com/pithu))

## 2026-03-27

### Versions

- @js-joda/core@6.0.0
- @js-joda/locale@5.0.0

#### :rocket: Enhancement
* `locale`
  * Enable Multi-locale import: importing multiple prebuilt locale packages (e.g. `@js-joda/locale_en` + `@js-joda/locale_de`) no longer breaks each other. 
      * Prebuilt packages now register CLDR data via `registerLocaleData()` into the single shared `@js-joda/locale` instance.
      * Prebuilt locale packages now declare `@js-joda/locale` as a peer dependency instead of bundling the locale implementation.
      * Import `Locale` from `@js-joda/locale` to access the `Locale` class. See below for an example.
  * [#775](https://github.com/js-joda/js-joda/pull/775) Add a prebuilt `ar` locale ([@Oussemasahbeni](https://github.com/Oussemasahbeni))
* `core`
  * Simplify `nativeJs` function ([@pithu](https://github.com/pithu))
  * [#749](https://github.com/js-joda/js-joda/pull/749) remove IE11 support

```js
// Previous versions (@js-joda/core@5.x)
const { Locale } = require('@js-joda/locale_en');

// New style (@js-joda/core@6.0.0 and @js-joda/locale@5.0.0)
const { Locale } = require('@js-joda/locale');  // always import Locale from here
require('@js-joda/locale_en');                  // side-effect: registers EN locale data

// Then, e.g., 
const formatter = DateTimeFormatter.ofPattern(x).withLocale(Locale.ENGLISH);
```

#### :house: Dependency update
* Other
    * [#779](https://github.com/js-joda/js-joda/pull/779) Bump lodash from 4.17.21 to 4.17.23 in /packages/examples ([@dependabot[bot]](https://github.com/apps/dependabot))
* `examples`
    * [#778](https://github.com/js-joda/js-joda/pull/778) Bump lodash from 4.17.21 to 4.17.23 ([@dependabot[bot]](https://github.com/apps/dependabot))

## 2026-01-22

### Versions

- @js-joda/core@5.7.0
- @js-joda/timezone@2.23.0

#### :rocket: Enhancement
* `core`
  * [#777](https://github.com/js-joda/js-joda/pull/777) Add support for Duration part methods ([@nehalem501](https://github.com/nehalem501))
* `core`, `timezone`
  * [#768](https://github.com/js-joda/js-joda/pull/768) Make it less easy to misuse the timezone module ([@jstasiak](https://github.com/jstasiak))

#### :house: Dependency update
* [#756](https://github.com/js-joda/js-joda/pull/756) npm audit fix ([@pithu](https://github.com/pithu))


## 2025-03-31

### Versions

- @js-joda/core@5.6.5
- @js-joda/timezone@2.22.0

#### :rocket: Enhancement
* `timezone`
  * [#755](https://github.com/js-joda/js-joda/pull/755) Update tzdb to 2025b ([@pithu](https://github.com/pithu))

#### :bug: Bug Fix
* `core`
  * [#751](https://github.com/js-joda/js-joda/pull/751) Correct typing for YearMonth.isValidDay() ([@ianparkinson](https://github.com/ianparkinson))

#### :house: Dependency update
* [#753](https://github.com/js-joda/js-joda/pull/753) Bump serialize-javascript and mocha ([@dependabot[bot]](https://github.com/apps/dependabot))

## 2025-01-09

### Versions

- @js-joda/core@5.6.4
- @js-joda/extra@0.12.2
- @js-joda/locale@4.4.15.0
- @js-joda/timezone@2.21.2

#### :rocket: Enhancement
* `core`
  * [#737](https://github.com/js-joda/js-joda/pull/737) Improve MathUtil.verifyInt performance ([@pithu](https://github.com/pithu))
* `locale`
  * [#747](https://github.com/js-joda/js-joda/pull/747) prebuilt packages for new locales: Ukrainian, Czech, Slovakian and Turkish (uk, cs, sk, tr) ([@marcinkozaczyk](https://github.com/marcinkozaczyk))
  * [#732](https://github.com/js-joda/js-joda/pull/732) prebuilt packages for new locales: Lithuania, Norway (lt, nb-no, nn-no) ([@mstawick](https://github.com/mstawick))

#### :bug: Bug Fix
* [#744](https://github.com/js-joda/js-joda/pull/744) docs: fix formatting documentation ([@janoma](https://github.com/janoma))

#### :house: Dependency update
* `core`, `extra`, `locale`, `timezone`
  * [#748](https://github.com/js-joda/js-joda/pull/748) upgrade github actions ([@pithu](https://github.com/pithu))
* Other
  * [#740](https://github.com/js-joda/js-joda/pull/740) Bump rollup from 3.8.1 to 3.29.5 ([@dependabot[bot]](https://github.com/apps/dependabot))
  * [#741](https://github.com/js-joda/js-joda/pull/741) Bump cookie and socket.io ([@dependabot[bot]](https://github.com/apps/dependabot))
  * [#738](https://github.com/js-joda/js-joda/pull/738) Bump body-parser from 1.20.1 to 1.20.3 ([@dependabot[bot]](https://github.com/apps/dependabot))
  * [#736](https://github.com/js-joda/js-joda/pull/736) Bump webpack from 5.76.1 to 5.94.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
  * [#730](https://github.com/js-joda/js-joda/pull/730) Bump ws, socket.io and webdriverio ([@dependabot[bot]](https://github.com/apps/dependabot))
* `locale`
  * [#735](https://github.com/js-joda/js-joda/pull/735) Bump requirejs from 2.3.6 to 2.3.7 in /packages/locale ([@dependabot[bot]](https://github.com/apps/dependabot))

## 2024-06-18

### Versions

- @js-joda/core@5.6.3

#### :bug: Bug Fix
* `core`
  * [#727](https://github.com/js-joda/js-joda/pull/727) Added toString in YearMonth type definition ([@SaichandChowdary](https://github.com/SaichandChowdary))

#### :house: Dependency update
* [#726](https://github.com/js-joda/js-joda/pull/726) Bump braces from 3.0.2 to 3.0.3 ([@dependabot[bot]](https://github.com/apps/dependabot))

## 2024-06-17

### Versions

- @js-joda/locale@4.14.0

#### :bug: Bug Fix
* `locale`
  * [#729](https://github.com/js-joda/js-joda/pull/729) Include source maps for ESM ([@joshkel](https://github.com/joshkel))

## 2024-06-11

### Versions

- @js-joda/locale@4.12.0

#### :rocket: Enhancement
* `locale`
  * [#722](https://github.com/js-joda/js-joda/pull/722) add module property for es builds to locale packages ([@cercatrice](https://github.com/cercatrice))

#### :bug: Bug Fix
* [#723](https://github.com/js-joda/js-joda/pull/723) Fix DateTimeFormatter ISO_DATE_TIME docs example ([@themichaellai](https://github.com/themichaellai))

#### :house: Dependency update
* [#721](https://github.com/js-joda/js-joda/pull/721) Bump ejs from 3.1.8 to 3.1.10 ([@dependabot[bot]](https://github.com/apps/dependabot))


## 2024-04-19-3

### Versions

- @js-joda/locale@4.11.0
- @js-joda/timezone@2.21.0

#### :rocket: Enhancement
* `locale`, `timezone`
  * update tzdb to 2024a

## 2024-04-19-2

### Versions

- @js-joda/locale@4.10.0
- @js-joda/timezone@2.20.0

#### :rocket: Enhancement
* `locale`, `timezone`
  * update tzdb to 2023d


## 2024-04-19

### Versions

- @js-joda/extra@0.12.0
- @js-joda/locale@4.9.0
- @js-joda/timezone@2.19.0

#### :rocket: Enhancement
* `extra`, `locale`, `timezone`
  * [#692](https://github.com/js-joda/js-joda/pull/692) add esm modules in package.json files ([@alisabzevari](https://github.com/alisabzevari))


## 2024-03-13

### Versions

- @js-joda/core@5.6.2
- @js-joda/extra@0.11.6
- @js-joda/locale@4.8.13
- @js-joda/timezone@2.18.3

#### :bug: Bug Fix
* `core`
  * [#714](https://github.com/js-joda/js-joda/pull/714) [core] Fix type definitions for DateTimeFormatterBuilder#appendValue ([@florian-h05](https://github.com/florian-h05))
  * [#713](https://github.com/js-joda/js-joda/pull/713) Add type definition for Duration#plusDuration ([@syxolk](https://github.com/syxolk))

#### :house: Dependency update
* Other
  * [#703](https://github.com/js-joda/js-joda/pull/703) Bump @babel/traverse from 7.20.10 to 7.23.2 ([@dependabot[bot]](https://github.com/apps/dependabot))
  * [#709](https://github.com/js-joda/js-joda/pull/709) Bump follow-redirects from 1.15.2 to 1.15.4 in /packages/locale ([@dependabot[bot]](https://github.com/apps/dependabot))
* `locale`
  * [#710](https://github.com/js-joda/js-joda/pull/710) Bump follow-redirects from 1.15.2 to 1.15.4 ([@dependabot[bot]](https://github.com/apps/dependabot))

## 2023-10-12

### Versions

- @js-joda/core@5.6.1
- @js-joda/extra@0.11.5
- @js-joda/locale@4.8.12
- @js-joda/timezone@2.18.2

#### :bug: Bug Fix
* `core`
  * [#701](https://github.com/js-joda/js-joda/pull/701) Removed duplicate declaration of the static ISO_OFFSET_TIME DateTimeF… ([@AndreasBrie](https://github.com/AndreasBrie))


## 2023-10-10

### Versions

- @js-joda/core@5.6.0
- @js-joda/extra@0.11.4
- @js-joda/locale@4.8.11
- @js-joda/timezone@2.18.1

#### :rocket: Enhancement
* `core`
    * [#699](https://github.com/js-joda/js-joda/pull/699) Add more built-in date-time formats to typings ([@adamschoenemann](https://github.com/adamschoenemann))
    * [#698](https://github.com/js-joda/js-joda/pull/698) Feature DateTimeFormatterBuilder.parseDefaulting() ([@m-jung](https://github.com/m-jung))
* Other
    * [#697](https://github.com/js-joda/js-joda/pull/697) fix broken link ([@takashima0411](https://github.com/takashima0411))

#### :house: Dependency update
* [#694](https://github.com/js-joda/js-joda/pull/694) Bump socket.io-parser from 4.2.1 to 4.2.4 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#687](https://github.com/js-joda/js-joda/pull/687) Bump word-wrap from 1.2.3 to 1.2.4 ([@dependabot[bot]](https://github.com/apps/dependabot))

## 2023-04-12

### Versions

- @js-joda/core@5.5.3
- @js-joda/extra@0.11.3
- @js-joda/locale@4.8.10
- @js-joda/timezone@2.18.0

#### :rocket: Enhancement
* `extra`, `timezone`
  * [#680](https://github.com/js-joda/js-joda/pull/680) update to ianna tzdb 2023c ([@pithu](https://github.com/pithu))

#### :bug: Bug Fix
* `core`
  * [#674](https://github.com/js-joda/js-joda/pull/674) Fix optional parameter type of appendInstant method ([@alisabzevari](https://github.com/alisabzevari))

#### :house: Dependency update
* [#672](https://github.com/js-joda/js-joda/pull/672) Bump ua-parser-js from 0.7.32 to 0.7.33 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#676](https://github.com/js-joda/js-joda/pull/676) Bump webpack from 5.75.0 to 5.76.1 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#669](https://github.com/js-joda/js-joda/pull/669) Bump json5 from 1.0.1 to 1.0.2 ([@dependabot[bot]](https://github.com/apps/dependabot))
 
## 2023-01-07

### Versions

- @js-joda/core@5.5.2
- @js-joda/extra@0.11.2
- @js-joda/locale@4.8.9
- @js-joda/timezone@2.17.2

#### :bug: Bug Fix
* `core`
  * [#668](https://github.com/js-joda/js-joda/pull/668) Revert native js to previous impl ([@pithu](https://github.com/pithu))

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

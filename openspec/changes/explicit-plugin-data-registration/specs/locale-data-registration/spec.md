# Spec Delta

## Purpose

Defines how CLDR data reaches `@js-joda/locale` in the major release: the root entry without any
reference to `cldr-data` and without registration on import, registering locale data objects, zone
data values and the Node.js `cldr-data` source with `registerLocaleData`, how repeated registrations
behave, and the error for a locale without data.

## ADDED Requirements

### Requirement: Root entry
`@js-joda/locale` SHALL export `Locale`, `WeekFields` and `registerLocaleData` and SHALL plug into
`@js-joda/core`. The builds SHALL NOT reference `cldr-data` and SHALL NOT register any data on import.
(Which supplemental data the root still bundles is specified by `reduce-locale-bundle-size`: only
`weekData` stays.)

#### Scenario: Browser bundle without cldr-data
- **WHEN** an application that imports `@js-joda/locale` and the root of `@js-joda/locale_en` is bundled with esbuild and webpack for the browser, with `cldr-data` installed and without bundler configuration for it
- **THEN** the bundles build without errors or warnings about `cldr-data` or `fs`, and contain no `cldr-data` module

#### Scenario: Importing the root alone registers nothing
- **WHEN** an application imports `@js-joda/locale` and formats with `MMMM` and `Locale.GERMAN` without registering anything
- **THEN** the missing-locale error of the "Locale without data" requirement is thrown

#### Scenario: Usage example
- **WHEN** an application runs
  ```js
  import { DateTimeFormatter, LocalDate } from '@js-joda/core';
  import { Locale, registerLocaleData } from '@js-joda/locale';
  import { localeData as en } from '@js-joda/locale_en';
  import { localeData as de } from '@js-joda/locale_de';
  registerLocaleData(en, de);
  LocalDate.of(2026, 10, 31).format(DateTimeFormatter.ofPattern('d. MMMM uuuu').withLocale(Locale.GERMAN));
  ```
- **THEN** the result is `31. Oktober 2026`

### Requirement: Registering locale data objects and zone data values
`registerLocaleData` SHALL accept one or more locale data objects, each mapping CLDR paths (e.g.
`main/de/ca-gregorian.json`) to CLDR JSON, and register every path they contain. It SHALL also accept
zone data values — the `zoneNames` of a prebuilt package and `metaZones` of `@js-joda/locale/meta-zones`
— several at once. The call with a path and data, `registerLocaleData(path, data)`, SHALL keep working.

#### Scenario: Several data objects in one call
- **WHEN** an application calls `registerLocaleData(en, de)` with the `localeData` of `@js-joda/locale_en` and `@js-joda/locale_de`
- **THEN** dates format with `Locale.ENGLISH`, `Locale.US` and `Locale.GERMANY`

#### Scenario: Path and data
- **WHEN** an application calls `registerLocaleData('supplemental/likelySubtags.json', thLikelySubtagsPart)` and `registerLocaleData('main/th/ca-gregorian.json', thData)`
- **THEN** month names format with `new Locale('th')`

#### Scenario: Custom path without likelySubtags throws
- **WHEN** an application calls only `registerLocaleData('main/th/ca-gregorian.json', thData)` and formats with `MMMM` and `new Locale('th', 'TH', 'th')`
- **THEN** a `DateTimeException` is thrown that names `th` and `supplemental/likelySubtags.json`, with `@js-joda/locale/likely-subtags` as the fix — the "Hand-registered locale without likelySubtags" scenario of `reduce-locale-bundle-size` (`locale-cldr-data`); registering `main/*` data alone never makes a locale work without a `likelySubtags` entry

#### Scenario: Zone names and meta zones
- **WHEN** an application registers the `en` data, and calls `registerLocaleData(enZones, metaZones)` with the `zoneNames` of `@js-joda/locale_en-us` and `metaZones` of `@js-joda/locale/meta-zones`
- **THEN** a `ZonedDateTime` in `Europe/Berlin` formats with `zzzz` and `Locale.US` with the localized zone name

### Requirement: Registration is order independent and idempotent
Registering locale data SHALL work in any order relative to importing `@js-joda/locale` and to
formatting with other locales. Each CLDR path SHALL be identified by the path itself: the first
registration wins, and registering a path again SHALL have no effect and SHALL NOT throw, even if the
data comes from a different module copy.

#### Scenario: Data registered after formatting with another locale
- **WHEN** an application formats a date with `Locale.ENGLISH`, then registers the `de` data object and formats with `Locale.GERMAN`
- **THEN** the German month name is printed

#### Scenario: Same data from two module copies
- **WHEN** the `localeData` of the CJS and of the ESM build of `@js-joda/locale_en` are both registered
- **THEN** the second registration has no effect and does not throw

### Requirement: cldr-data source for Node.js
`@js-joda/locale/cldr-data` SHALL export `cldrDataSource`. After `registerLocaleData(cldrDataSource)`,
the data of every locale in the installed `cldr-data` package SHALL be loaded on first use, and
`Locale.getAvailableLocales()` SHALL include the locales of `cldr-data`. The entry SHALL be the only
entry that references `cldr-data`. Registering the source again SHALL have no effect.

#### Scenario: All locales from cldr-data
- **WHEN** a Node.js application with `cldr-data` installed runs
  ```js
  const { Locale, registerLocaleData } = require('@js-joda/locale');
  const { cldrDataSource } = require('@js-joda/locale/cldr-data');
  registerLocaleData(cldrDataSource);
  ```
  and formats a date with `zzzz` and `new Locale('th', 'TH', 'th')`
- **THEN** the output is the same as with the old default entry of the previous major

#### Scenario: cldr-data not installed
- **WHEN** a Node.js application without `cldr-data` requires `@js-joda/locale/cldr-data`
- **THEN** an error is thrown that says `cldr-data` must be installed

#### Scenario: Root does not use cldr-data automatically
- **WHEN** a Node.js application with `cldr-data` installed imports only `@js-joda/locale` and formats with `MMMM` and `Locale.GERMAN` without registering anything
- **THEN** the missing-locale error is thrown (the root no longer loads `cldr-data` automatically)

### Requirement: Locale without data
With no `cldr-data` source registered and no registered data for the locale or its parent locales,
formatting or parsing text for that locale SHALL throw a `DateTimeException` that names the locale,
the registered locales and the root of a prebuilt package to register (for `<script>` tags: the
corresponding global, e.g. `JSJodaLocaleData_de.localeData`). The check SHALL NOT be cached, so
registering the data afterwards SHALL make the locale work — even if a previous format or parse for
any locale already threw (see the cldrjs bundle-queue guard in `reduce-locale-bundle-size`, design
decision 3). The check SHALL be active always — nothing turns it off. The variant of this error for
registered `main/*` data whose language has no `likelySubtags` entry (names the locale and
`supplemental/likelySubtags.json`, fix `@js-joda/locale/likely-subtags`) is also a `DateTimeException`
and is specified by `reduce-locale-bundle-size` (`locale-cldr-data`, "Locale without data") — both
changes use the same exception type and message shape for "Locale without data".

#### Scenario: Locale not registered
- **WHEN** an application registers only the `en` data object and formats a date with `MMMM` and `Locale.GERMAN`
- **THEN** a `DateTimeException` is thrown that names `de`, lists `en`, and mentions `@js-joda/locale_de`

#### Scenario: Parent locale registered
- **WHEN** only the `en` data object is registered and a date is formatted with `MMMM` and `Locale.US`
- **THEN** the English month name is printed

#### Scenario: Data registered after the error
- **WHEN** formatting with `Locale.GERMAN` threw because no `de` data was registered, and the `de` data object is registered afterwards
- **THEN** formatting with `Locale.GERMAN` prints the German month name

### Requirement: Entry resolution and types
The root, `cldr-data`, `meta-zones` and prebuilt root entries SHALL resolve with `require` and `import`
in Node.js and in bundlers through an `exports` map (conditions `types`, `react-native`, `module`,
`default` on every entry including `"."`; deliberately no `import` condition; plus
`"./package.json"` and `"./*": "./*"`), and SHALL have TypeScript declarations. Node.js SHALL get one
module for `require` and `import` of the root. The minified builds for `<script>` tags SHALL set the
globals `JSJodaLocale.registerLocaleData` and `JSJodaLocaleData_<locale>` (e.g. `JSJodaLocaleData_en_us`)
exposing `localeData` and `zoneNames`; the data scripts SHALL only set the global, and an inline script
SHALL call the register function.

#### Scenario: Node.js ES module
- **WHEN** a Node.js ES module imports `{ registerLocaleData }` from `@js-joda/locale` and `{ localeData }` from `@js-joda/locale_de`, and registers it
- **THEN** both resolve, and formatting with `MMMM` and `Locale.GERMAN` works

#### Scenario: require and import share one store in Node.js
- **WHEN** a Node.js application registers the `de` data object through `require('@js-joda/locale')` and then imports `@js-joda/locale` with `import`
- **THEN** both see the `de` data

#### Scenario: Node.js floors
- **WHEN** the resolution matrix of the README is checked against the Node.js documentation
- **THEN** named entries resolve from Node.js >= 12.16 for `require` and >= 12.17 for `import`, and the `"./*"` subpath pattern from >= 12.20

#### Scenario: TypeScript
- **WHEN** a TypeScript file imports `registerLocaleData` from `@js-joda/locale` and `localeData` from `@js-joda/locale_de` and calls `registerLocaleData(localeData)`
- **THEN** it compiles without errors under `strict`

#### Scenario: Script tags
- **WHEN** a page loads the minified `@js-joda/core`, then the minified `@js-joda/locale`, then the minified prebuilt data scripts, and then an inline script calling `JSJodaLocale.registerLocaleData(JSJodaLocaleData_de.localeData)`
- **THEN** formatting with `MMMM` and `Locale.GERMAN` works

#### Scenario: React Native
- **WHEN** a React Native bundle (Metro >= 0.79, package exports enabled with default conditions, which assert `react-native` but not `module`) imports `@js-joda/locale` and `@js-joda/locale_de`, with `cldr-data` installed and without bundler configuration for it
- **THEN** both resolve to the ES module builds via the `react-native` condition (the root included), the bundle builds without errors or warnings about `cldr-data` or `fs`, contains one copy of the code, and registering the data makes formatting with `MMMM` and `Locale.GERMAN` work

## REMOVED Requirements

### Requirement: /register entry
`@js-joda/locale/register` SHALL NOT exist anymore; the root entry exports the same API and shares one
store in Node.js and in bundles.

### Requirement: Automatic cldr-data in the root
The root entry of `@js-joda/locale` SHALL NOT load `cldr-data` automatically anymore (neither in
Node.js nor in bundles); `@js-joda/locale/cldr-data` + `registerLocaleData(cldrDataSource)` is the
opt-in.

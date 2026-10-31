# Spec Delta

## Purpose

Defines how CLDR data reaches `@js-joda/locale`: the register entry without any reference to
`cldr-data`, registering locale data objects and the Node.js `cldr-data` source with
`registerLocaleData`, how repeated registrations and missing data behave, and how the existing entries
stay compatible.

## ADDED Requirements

### Requirement: Register entry
`@js-joda/locale/register` SHALL export the same API as `@js-joda/locale` (`Locale`, `WeekFields`,
`registerLocaleData`), plug into `@js-joda/core` as `@js-joda/locale` does, and bundle the same
supplemental CLDR data. Neither its CommonJS nor its ES module build SHALL reference `cldr-data`.

#### Scenario: Browser bundle without cldr-data
- **WHEN** an application that imports `@js-joda/locale/register` and `@js-joda/locale_en/data` is bundled with esbuild and webpack for the browser, with `cldr-data` installed and without bundler configuration for it
- **THEN** the bundles build without errors or warnings about `cldr-data` or `fs`, and contain no `cldr-data` module

#### Scenario: Usage example
- **WHEN** an application runs
  ```js
  import { DateTimeFormatter, LocalDate } from '@js-joda/core';
  import { Locale, registerLocaleData } from '@js-joda/locale/register';
  import { localeData as en } from '@js-joda/locale_en/data';
  import { localeData as de } from '@js-joda/locale_de/data';
  registerLocaleData(en, de);
  LocalDate.of(2026, 10, 31).format(DateTimeFormatter.ofPattern('d. MMMM uuuu').withLocale(Locale.GERMAN));
  ```
- **THEN** the result is `31. Oktober 2026`

### Requirement: Registering locale data objects
`registerLocaleData` SHALL accept one or more locale data objects, each mapping CLDR paths (e.g.
`main/de/ca-gregorian.json`) to CLDR JSON, and register every path they contain. The call with a path
and data, `registerLocaleData(path, data)`, SHALL keep working as before this change.

#### Scenario: Several data objects in one call
- **WHEN** an application calls `registerLocaleData(en, de)` with the data objects of `@js-joda/locale_en/data` and `@js-joda/locale_de/data`
- **THEN** dates format with `Locale.ENGLISH`, `Locale.US` and `Locale.GERMANY`

#### Scenario: Path and data
- **WHEN** an application calls `registerLocaleData('main/th/ca-gregorian.json', thData)` with `@js-joda/locale/register`
- **THEN** month names format with `new Locale('th')` as with `@js-joda/locale` before this change

### Requirement: Registration is order independent and idempotent
Registering locale data SHALL work in any order relative to importing `@js-joda/locale` and to
formatting with other locales. Each CLDR path SHALL be identified by the path itself: the first
registration wins, and registering a path again SHALL have no effect and SHALL NOT throw, even if the
data comes from a different module copy.

#### Scenario: Data registered after formatting with another locale
- **WHEN** an application formats a date with `Locale.ENGLISH`, then registers the `de` data object and formats with `Locale.GERMAN`
- **THEN** the German month name is printed

#### Scenario: Same data from two module copies
- **WHEN** the `localeData` of the CJS and of the ESM build of `@js-joda/locale_en/data` are both registered
- **THEN** the second registration has no effect and does not throw

### Requirement: cldr-data source for Node.js
`@js-joda/locale/cldr-data` SHALL export `cldrDataSource`. After `registerLocaleData(cldrDataSource)`,
the data of every locale in the installed `cldr-data` package SHALL be loaded on first use, and
`Locale.getAvailableLocales()` SHALL include the locales of `cldr-data`. The entry SHALL be the only
explicit-mode entry that references `cldr-data`.

#### Scenario: All locales from cldr-data
- **WHEN** a Node.js application with `cldr-data` installed runs
  ```js
  const { Locale, registerLocaleData } = require('@js-joda/locale/register');
  const { cldrDataSource } = require('@js-joda/locale/cldr-data');
  registerLocaleData(cldrDataSource);
  ```
  and formats a date with `zzzz` and `new Locale('th', 'TH', 'th')`
- **THEN** the output is the same as with `@js-joda/locale` before this change

#### Scenario: cldr-data not installed
- **WHEN** a Node.js application without `cldr-data` requires `@js-joda/locale/cldr-data`
- **THEN** an error is thrown that says `cldr-data` must be installed

### Requirement: Locale without data in explicit mode
With `@js-joda/locale/register` and no `cldr-data` source registered, formatting or parsing text for a
locale with no registered data for the locale or its parent locales SHALL throw a `DateTimeException`
that names the locale, the registered locales and the `/data` entry of a prebuilt package. Registering
the data afterwards SHALL make the locale work.

#### Scenario: Locale not registered
- **WHEN** only the `en` data object is registered and a date is formatted with `MMMM` and `Locale.GERMAN`
- **THEN** a `DateTimeException` is thrown that names `de`, lists `en`, and mentions `@js-joda/locale_de/data`

#### Scenario: Parent locale registered
- **WHEN** only the `en` data object is registered and a date is formatted with `MMMM` and `Locale.US`
- **THEN** the English month name is printed

#### Scenario: Data registered after the error
- **WHEN** formatting with `Locale.GERMAN` threw because no `de` data was registered, and the `de` data object is registered afterwards
- **THEN** formatting with `Locale.GERMAN` prints the German month name

### Requirement: Compatible default entries
`@js-joda/locale` and the default entries of the prebuilt packages SHALL behave as before this change,
including loading from `cldr-data` in Node.js. When an application uses both `@js-joda/locale` and
`@js-joda/locale/register`, they SHALL share one copy of the code and one data store, in Node.js and
when bundled.

#### Scenario: Existing imports
- **WHEN** an application imports `{ Locale }` from `@js-joda/locale` and then `@js-joda/locale_en-us`, as before this change
- **THEN** formatting with `Locale.US` behaves as before this change

#### Scenario: Default and register entry together
- **WHEN** an application imports `registerLocaleData` from `@js-joda/locale/register` and registers the `de` data object, and a library it uses imports `Locale` from `@js-joda/locale`
- **THEN** the library formats with `Locale.GERMAN`, and the locale code is contained once in the bundle

#### Scenario: Node.js resolves one module
- **WHEN** Node.js runs `require('@js-joda/locale/register')` and `require('@js-joda/locale')`
- **THEN** data registered through one is visible through the other

### Requirement: Entry resolution and types
The register, `cldr-data` and prebuilt `/data` entries SHALL resolve with `require` and `import` in
Node.js and in bundlers, without an `exports` map, and SHALL have TypeScript declarations. The register
and prebuilt `/data` entries SHALL also ship minified builds for `<script>` tags.

#### Scenario: TypeScript
- **WHEN** a TypeScript file imports `registerLocaleData` from `@js-joda/locale/register` and `localeData` from `@js-joda/locale_de/data`, and calls `registerLocaleData(localeData)`
- **THEN** it compiles without errors under `strict`

#### Scenario: Script tags
- **WHEN** a page loads the minified `@js-joda/core`, the minified register entry of `@js-joda/locale` and the minified `/data` entry of `@js-joda/locale_de`, and registers the data with the exposed register function
- **THEN** formatting with `MMMM` and `Locale.GERMAN` works

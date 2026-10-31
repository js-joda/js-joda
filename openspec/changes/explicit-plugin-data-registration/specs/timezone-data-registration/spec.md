# Spec Delta

## Purpose

Defines how IANA tz data reaches `@js-joda/timezone`: the side-effect free data entries, explicit
registration with `registerTimeZoneData`, how repeated and conflicting registrations behave, and how
the existing side-effect entries stay compatible.

## ADDED Requirements

### Requirement: Side-effect free tz data entries
`@js-joda/timezone/data` SHALL export the latest tz data as `tzdbData`. `@js-joda/timezone/data/<range>`
SHALL export the reduced data of that range as `tzdbData`, for every range the package ships today
(`4-year-range`, `10-year-range`, `60-year-range`, `300-year-range`, `lifetime-range`). Importing a data
entry SHALL NOT register data, patch `@js-joda/core`, or import any other package.

#### Scenario: Importing data alone changes nothing
- **WHEN** an application imports `@js-joda/core` and `{ tzdbData }` from `@js-joda/timezone/data`, and calls `ZoneId.of('Europe/Berlin')`
- **THEN** the call fails as it does without `@js-joda/timezone`, and `tzdbData.version` is the tzdb version of the release, e.g. `2026f`

#### Scenario: Range data entry
- **WHEN** an application imports `{ tzdbData }` from `@js-joda/timezone/data/10-year-range`
- **THEN** it gets the same data as the `dist/js-joda-timezone-10-year-range` build contains

#### Scenario: Usage example
- **WHEN** an application runs
  ```js
  import { ZoneId } from '@js-joda/core';
  import { registerTimeZoneData } from '@js-joda/timezone/register';
  import { tzdbData } from '@js-joda/timezone/data';
  registerTimeZoneData(tzdbData);
  ZoneId.of('Europe/Berlin');
  ```
- **THEN** `ZoneId.of('Europe/Berlin')` returns the zone with the rules of the registered data

### Requirement: Register entry
`@js-joda/timezone/register` SHALL plug the tzdb zone rules into `@js-joda/core` as `@js-joda/timezone`
does, SHALL contain no tz data, and SHALL export `registerTimeZoneData(data)`. `data` SHALL be tz data
in the packed format, either from a data entry or a packed JSON file of the release.

#### Scenario: Register entry bundles no data
- **WHEN** an application that imports only `@js-joda/timezone/register` from `@js-joda/timezone` is bundled with esbuild for the browser
- **THEN** the bundle contains no zone entries of the packed tz data

#### Scenario: Register a packed JSON file
- **WHEN** an application calls `registerTimeZoneData(require('./tz/2026e.json'))` with a packed data file of the release
- **THEN** `ZoneId.of('Europe/Berlin')` uses the rules of `2026e`, and `ZoneId.getAvailableZoneIds()` lists the zones of that file

#### Scenario: System default zone after registration
- **WHEN** the process time zone is `Europe/Berlin`, an application imports `@js-joda/timezone/register`, and registers `tzdbData` afterwards
- **THEN** `ZoneId.systemDefault()` returns `Europe/Berlin`, as with `@js-joda/timezone`

### Requirement: Registration is idempotent by content key
A registration SHALL be identified by the tzdb version and the range of the data, not by object
identity. Registering data with the key that is already registered SHALL have no effect and SHALL NOT
throw, even if the data object comes from a different module copy. No zone ID SHALL be listed twice by
`ZoneId.getAvailableZoneIds()`.

#### Scenario: Same data registered twice
- **WHEN** an application calls `registerTimeZoneData(tzdbData)` twice
- **THEN** the second call has no effect, and every zone ID is listed once

#### Scenario: Same data from a CJS and an ESM copy
- **WHEN** the same `tzdbData` of the CJS build and of the ESM build of `@js-joda/timezone/data` are both registered
- **THEN** the second registration has no effect

#### Scenario: Data without range
- **WHEN** a packed JSON file with the version `2026e` and no range is registered twice from two separate parses
- **THEN** the second registration has no effect

### Requirement: Conflicting registration
Explicitly registering data whose key differs from the registered data SHALL throw a
`DateTimeException` that names both versions and ranges, and the registered data SHALL stay in use.

#### Scenario: Two ranges registered
- **WHEN** an application registers `tzdbData` of `@js-joda/timezone/data`, then `tzdbData` of `@js-joda/timezone/data/10-year-range`
- **THEN** the second call throws a `DateTimeException` naming `2026f` and `2026f (10-year-range)`, and `Europe/Berlin` in 1950 still uses the full data

#### Scenario: Two versions registered
- **WHEN** an application registers the packed files of `2026e` and then `2026f`
- **THEN** the second call throws, and the rules of `2026e` stay in use

### Requirement: Missing tz data
Using a region-based zone ID while `@js-joda/timezone/register` is imported but no data is registered SHALL
throw a `DateTimeException` that says no tz data is registered and names `registerTimeZoneData`.

#### Scenario: Register entry without data
- **WHEN** an application imports `@js-joda/timezone/register` without registering data and calls `ZoneId.of('Europe/Berlin')`
- **THEN** a `DateTimeException` is thrown whose message mentions `registerTimeZoneData`

### Requirement: Compatible side-effect entries
`@js-joda/timezone` and its `dist/js-joda-timezone*` builds SHALL behave as before this change when they
are the only tz data source. When data is already registered, their side effect SHALL be skipped
without throwing. `ZoneRulesProvider.loadTzdbData(data)` SHALL register like `registerTimeZoneData`.

#### Scenario: Existing import
- **WHEN** an application imports `@js-joda/core` and `@js-joda/timezone`, as before this change
- **THEN** `ZoneId.of('Europe/Berlin')` and `ZoneId.systemDefault()` behave as before this change

#### Scenario: Library imports the default entry after explicit registration
- **WHEN** an application registers the `10-year-range` data explicitly, and then a library it uses imports `@js-joda/timezone`
- **THEN** no error is thrown and the `10-year-range` data stays in use

#### Scenario: Explicit registration after the default entry
- **WHEN** a library imports `@js-joda/timezone` before the application calls `registerTimeZoneData` with the `10-year-range` data
- **THEN** the call throws a `DateTimeException` that names both data sets, and the full data stays in use

#### Scenario: Empty build with loadTzdbData
- **WHEN** an application imports `dist/js-joda-timezone-empty` and calls `ZoneRulesProvider.loadTzdbData(data)` twice with the same data
- **THEN** the zones of the data are available and every zone ID is listed once

### Requirement: Entry resolution and types
The register and data entries SHALL resolve with `require` and `import` in Node.js and in bundlers,
without an `exports` map, and SHALL have TypeScript declarations for `registerTimeZoneData` and
`tzdbData`. Each entry SHALL also ship a minified build for `<script>` tags.

#### Scenario: CommonJS and ES module
- **WHEN** Node.js runs `require('@js-joda/timezone/register')` and `import('@js-joda/timezone/data/10-year-range')`
- **THEN** both resolve, and registering the data makes `ZoneId.of('Europe/Berlin')` work

#### Scenario: TypeScript
- **WHEN** a TypeScript file imports `registerTimeZoneData` and `tzdbData` from the new entries and calls `registerTimeZoneData(tzdbData)`
- **THEN** it compiles without errors under `strict`

#### Scenario: Script tags
- **WHEN** a page loads the minified `@js-joda/core`, then the minified register and data entries of `@js-joda/timezone`, and calls the register function exposed by the register script with the data exposed by the data script
- **THEN** `ZoneId.of('Europe/Berlin')` works

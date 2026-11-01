# Spec Delta

## Purpose

Defines how IANA tz data reaches `@js-joda/timezone` in the major release: the side-effect free
data entries, explicit registration with `registerTimeZoneData` from the root entry, how repeated
and conflicting registrations behave, the error when no data is registered, and the
hoisting/setup-module rule.

## ADDED Requirements

### Requirement: Side-effect free tz data entries
`@js-joda/timezone/data` SHALL export the latest tz data as `tzdbData`. `@js-joda/timezone/data/<range>`
SHALL export the reduced data of that range as `tzdbData`, for every range the package ships
(`4-year-range`, `10-year-range`, `60-year-range`, `300-year-range`, `lifetime-range`). Importing a data
entry SHALL NOT register data, patch `@js-joda/core`, or import any other package.

#### Scenario: Importing data alone changes nothing
- **WHEN** an application imports `@js-joda/core` and `{ tzdbData }` from `@js-joda/timezone/data`, and calls `ZoneId.of('Europe/Berlin')`
- **THEN** the call throws the missing-data error of the "Missing tz data" requirement below, and `tzdbData.version` is the tzdb version of the release, e.g. `2026f`

#### Scenario: Range data entry
- **WHEN** an application imports `{ tzdbData }` from `@js-joda/timezone/data/10-year-range`
- **THEN** it gets the same data the former `dist/js-joda-timezone-10-year-range` build contained

#### Scenario: Usage example
- **WHEN** an application runs
  ```js
  import { ZoneId } from '@js-joda/core';
  import { registerTimeZoneData } from '@js-joda/timezone';
  import { tzdbData } from '@js-joda/timezone/data';
  registerTimeZoneData(tzdbData);
  ZoneId.of('Europe/Berlin');
  ```
- **THEN** `ZoneId.of('Europe/Berlin')` returns the zone with the rules of the registered data

### Requirement: Root entry plugs core and exports registerTimeZoneData
`@js-joda/timezone` SHALL plug the tzdb zone rules into `@js-joda/core` and SHALL export
`registerTimeZoneData(data)`. `data` SHALL be tz data in the packed format, either from a data entry
or a packed JSON file. The builds SHALL contain no tz data.

#### Scenario: Root bundles no data
- **WHEN** an application that imports only `@js-joda/timezone` is bundled with esbuild for the browser
- **THEN** the bundle contains no zone entries of the packed tz data

#### Scenario: Register a packed JSON file
- **WHEN** an application calls `registerTimeZoneData(require('./tz/2026e.json'))` with a packed data file of a release
- **THEN** `ZoneId.of('Europe/Berlin')` uses the rules of `2026e`, and `ZoneId.getAvailableZoneIds()` lists the zones of that file

#### Scenario: System default zone after registration
- **WHEN** the process time zone is `Europe/Berlin`, an application imports `@js-joda/timezone`, and registers `tzdbData` afterwards
- **THEN** `ZoneId.systemDefault()` returns `Europe/Berlin`

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

### Requirement: Conflicting registration throws and keeps the first data
Registering data whose key differs from the registered data SHALL throw a `DateTimeException` that
names both versions and ranges; the registered data SHALL stay in use.

#### Scenario: Two ranges registered
- **WHEN** an application registers `tzdbData` of `@js-joda/timezone/data`, then `tzdbData` of `@js-joda/timezone/data/10-year-range`
- **THEN** the second call throws a `DateTimeException` naming `2026f` and `2026f (10-year-range)`, and `Europe/Berlin` in 1950 still uses the full data

#### Scenario: Two versions registered
- **WHEN** an application registers the packed files of `2026e` and then `2026f`
- **THEN** the second call throws, and the rules of `2026e` stay in use

### Requirement: Missing tz data
Using a region-based zone ID while no data is registered SHALL throw a `DateTimeException` that says
no tz data is registered and names `registerTimeZoneData` — for `<script>` tags the global call
`JSJodaTimezone.registerTimeZoneData(JSJodaTimezoneData.tzdbData)`.

#### Scenario: Root entry without data
- **WHEN** an application imports `@js-joda/timezone` without registering data and calls `ZoneId.of('Europe/Berlin')`
- **THEN** a `DateTimeException` is thrown whose message mentions `registerTimeZoneData`

### Requirement: Register in a setup module (hoisting)
ESM evaluates imports before the importing module's body. An application SHALL register data in a
setup module that is imported before any module that resolves region-based zones at evaluation time.

#### Scenario: Zone resolved at module evaluation time before registration
- **WHEN** a module that is imported before the setup module runs `export const BERLIN = ZoneId.of('Europe/Berlin')`
- **THEN** the call throws the missing-data error of the "Missing tz data" requirement

#### Scenario: Setup module imported first
- **WHEN** an application imports a setup module first that calls `registerTimeZoneData(tzdbData)`, and another imported module then runs `export const BERLIN = ZoneId.of('Europe/Berlin')`
- **THEN** `BERLIN` is `Europe/Berlin` with the rules of the registered data

### Requirement: Entry resolution and types
The root and data entries SHALL resolve with `require` and `import` in Node.js and in bundlers through
an `exports` map (conditions `types`, `react-native`, `module`, `default` on every entry including
`"."`; deliberately no `import` condition; plus `"./package.json"` and `"./*": "./*"`), and SHALL have
TypeScript declarations for `registerTimeZoneData` and `tzdbData`. Node.js SHALL get one module for
`require` and `import`. Bundlers and Metro SHALL get the ES module builds, so a React Native bundle
contains one copy of the code and one data store. Each entry SHALL also ship a minified build for
`<script>` tags; the data scripts SHALL only set a global (`JSJodaTimezoneData.tzdbData`), and an
inline script SHALL call `JSJodaTimezone.registerTimeZoneData(...)`.

#### Scenario: CommonJS and ES module
- **WHEN** Node.js runs `require('@js-joda/timezone')` and `import('@js-joda/timezone/data/10-year-range')`
- **THEN** both resolve, and registering the data makes `ZoneId.of('Europe/Berlin')` work

#### Scenario: require and import share one store in Node.js
- **WHEN** a Node.js application registers the `10-year-range` data through `require('@js-joda/timezone')` and then imports `@js-joda/timezone` with `import`
- **THEN** both see the `10-year-range` data

#### Scenario: Node.js floors
- **WHEN** the resolution matrix of the README is checked against the Node.js documentation
- **THEN** named entries resolve from Node.js >= 12.16 for `require` and >= 12.17 for `import`, and the `"./*"` pattern from >= 12.20

#### Scenario: TypeScript
- **WHEN** a TypeScript file imports `registerTimeZoneData` from `@js-joda/timezone` and `tzdbData` from `@js-joda/timezone/data` and calls `registerTimeZoneData(tzdbData)`
- **THEN** it compiles without errors under `strict`

#### Scenario: Script tags
- **WHEN** a page loads the minified `@js-joda/core`, then the minified `@js-joda/timezone`, then the minified data script, and then an inline script calling `JSJodaTimezone.registerTimeZoneData(JSJodaTimezoneData.tzdbData)`
- **THEN** `ZoneId.of('Europe/Berlin')` works

#### Scenario: React Native
- **WHEN** a React Native bundle (Metro >= 0.79, package exports enabled with default conditions, which assert `react-native` but not `module`) imports `@js-joda/timezone` and `@js-joda/timezone/data`
- **THEN** both resolve to the ES module builds via the `react-native` condition (the root included), the bundle contains one copy of the code, the root contains no packed tz data, and `registerTimeZoneData(tzdbData)` makes `ZoneId.of('Europe/Berlin')` work

## REMOVED Requirements

### Requirement: ZoneRulesProvider.loadTzdbData
`ZoneRulesProvider.loadTzdbData(data)` SHALL NOT exist anymore; `registerTimeZoneData` SHALL be the
only way to register tz data. (`packages/core` never referenced `loadTzdbData`; the plugin added it
in `plug.js`.)

#### Scenario: loadTzdbData is gone
- **WHEN** an application imports `@js-joda/timezone` and calls `ZoneRulesProvider.loadTzdbData(data)`
- **THEN** the call fails with a `TypeError` (the method does not exist)

### Requirement: Side-effect entries
The side-effect entries — the data-carrying `dist/js-joda-timezone*` builds (including `-range` and
`-empty`), `@js-joda/timezone/register`, and deep imports of those builds without file extension —
SHALL NOT exist anymore.

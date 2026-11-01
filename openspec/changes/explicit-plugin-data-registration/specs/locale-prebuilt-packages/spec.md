# Spec Delta

## ADDED Requirements

### Requirement: Prebuilt root exports data values, no side effects
Each prebuilt package root (e.g. `@js-joda/locale_en-us`) SHALL export `localeData` — a locale data
object with the CLDR data of its locales, including the `likelySubtags` subset of its languages (see
`reduce-locale-bundle-size`) — and `zoneNames` (the `main/<locale>/timeZoneNames.json` data). The root
SHALL NOT import any package and SHALL NOT register data when imported. The root SHALL be generated
together with the other generated files of the prebuilt packages.

#### Scenario: Root has no imports
- **WHEN** the ES module and CommonJS builds of `@js-joda/locale_de` are inspected
- **THEN** they contain no `import` or `require` of another package

#### Scenario: Importing the root alone changes nothing
- **WHEN** an application imports `@js-joda/locale_de` and formats with `MMMM` and `Locale.GERMAN` without registering anything
- **THEN** the missing-locale error is thrown (nothing was registered)

#### Scenario: Usage example
- **WHEN** an application runs
  ```js
  import { Locale, registerLocaleData } from '@js-joda/locale';
  import { localeData as en } from '@js-joda/locale_en';
  registerLocaleData(en);
  ```
- **THEN** dates format with `Locale.ENGLISH`

#### Scenario: zoneNames is tree-shaken when unused
- **WHEN** an application imports only `localeData` from `@js-joda/locale_en-us` and is bundled with esbuild and with webpack
- **THEN** both bundles drop the `zoneNames` data (if this fails, `zoneNames` SHALL move to a `/zone-names` subpath instead)

### Requirement: Exports map and TypeScript declarations
Each prebuilt package manifest SHALL have an `exports` map with the entry `.` (conditions `types`,
`react-native`, `module` → ES module build, `default` → CommonJS/UMD build) plus `"./package.json"`
and `"./*": "./*"`, so that the root resolves with `import` in Node.js and every published file stays
importable. The `types` condition SHALL point to a generated `dist/index.d.ts` declaring `localeData`
and `zoneNames`, so `import { localeData } from '@js-joda/locale_de'` compiles under `strict` (the
repo's `shared/ts-test-config.json` SHALL use a `moduleResolution` that honors `exports`, i.e.
`node16`/`nodenext`/`bundler`, not the node10 default). The IIFE minified build SHALL use the unique
global `JSJodaLocaleData_<locale>` (e.g. `JSJodaLocaleData_en_us`) exposing `localeData` and
`zoneNames`.

#### Scenario: Node.js ES module import of the root
- **WHEN** a Node.js ES module runs `import { localeData } from '@js-joda/locale_de'`
- **THEN** the import resolves and `localeData` contains the `main/de/ca-gregorian.json` data

#### Scenario: Deep imports keep working
- **WHEN** an application imports `@js-joda/locale_de/dist/index.min.js` or `@js-joda/locale_de/package.json`
- **THEN** the import resolves as before this change

#### Scenario: React Native resolves the root to the ES module build
- **WHEN** a React Native bundle (Metro >= 0.79, package exports enabled with default conditions, which assert `react-native` but not `module`) imports `@js-joda/locale_de`
- **THEN** it resolves to the ES module build via the `react-native` condition, and the module contains no `import` or `require` of another package

## REMOVED Requirements

### Requirement: /data subpath and side-effect default entry
The `/data` subpath of a prebuilt package and the side-effect default entry (importing
`@js-joda/locale_<locale>` for its registration side effect) SHALL NOT exist anymore; the root
exports the data values instead.

## MODIFIED Requirements

### Requirement: Stable generated files
Generating the prebuilt packages SHALL leave the committed prebuilt package manifests unchanged, unless
the peer dependencies of `@js-joda/locale` or the list of entries changed. A version bump of
`@js-joda/locale` alone SHALL NOT change them.

#### Scenario: Regeneration without changes
- **WHEN** the prebuilt packages are generated twice without changes to `@js-joda/locale` in between
- **THEN** the second run produces no differences in the prebuilt package manifests

#### Scenario: Version bump of @js-joda/locale
- **WHEN** the release tooling bumps `@js-joda/locale` from 6.0.2 to 7.0.0 and the prebuilt packages are generated
- **THEN** the prebuilt package manifests are unchanged apart from the versions the release tooling set

#### Scenario: Test run leaves the working tree clean
- **WHEN** the full locale test suite, which builds the prebuilt packages, runs on a clean checkout
- **THEN** no committed prebuilt package manifest is modified

### Requirement: Generated peer dependencies
Each prebuilt package SHALL declare as peer dependencies: `@js-joda/core` and `@js-joda/timezone` with
the same ranges as the `@js-joda/locale` peer dependencies, `@js-joda/timezone` as optional, and
`@js-joda/locale` with the lower bound (`>=x.y.z`) configured next to the list of prebuilt packages,
now `>=7.0.0`, the new major, because the old default entry that registered via
`registerLocaleData(path, data)` is gone. In the major, `@js-joda/locale`'s peer range on
`@js-joda/timezone` is `^4.0.0`, so the prebuilt packages declare `^4.0.0` (optional) — an installed
optional peer is still enforced by npm, so `^3.1.0` would fail installs that have timezone 4.x with
`ERESOLVE`. The configuration SHALL also list every export the
prebuilt bundles import from `@js-joda/locale`. The `@js-joda/locale` range SHALL NOT be derived from
the current `@js-joda/locale` version, because the packages are generated after the release tooling
has chosen which packages to bump. The range SHALL be raised to `>=7.0.0` in the same PR that bumps
`@js-joda/locale` to 7.0.0 (task 0.1), never before: the test suite requires the configured range to
be satisfied by the current `@js-joda/locale` version. The test suite SHALL fail when the
configuration is out of date.

#### Scenario: Peer ranges follow @js-joda/locale
- **WHEN** `@js-joda/locale` declares the peer dependency `@js-joda/timezone` as `^2.25.0 || ^3.0.0`, and the prebuilt packages are generated
- **THEN** every prebuilt package declares `@js-joda/timezone` as `^2.25.0 || ^3.0.0` (optional)

#### Scenario: Configured lower bound on @js-joda/locale
- **WHEN** the configured range is `>=7.0.0`, `@js-joda/locale` is 7.0.0, and the prebuilt packages are generated
- **THEN** every prebuilt package declares `@js-joda/locale` as `>=7.0.0`

#### Scenario: Prebuilt bundles start to use another @js-joda/locale export
- **WHEN** the prebuilt bundle template imports an export from `@js-joda/locale` that the configuration doesn't list
- **THEN** the locale test suite fails and asks to check the configured range

#### Scenario: Range excludes the current version
- **WHEN** the configured range is not satisfied by the current `@js-joda/locale` version, or isn't of the form `>=x.y.z`
- **THEN** the locale test suite fails

#### Scenario: Range changed without regenerating
- **WHEN** the configured range was changed but the committed prebuilt manifests still declare the old one
- **THEN** the locale test suite fails and asks to run `npm run create-packages` and commit the manifests

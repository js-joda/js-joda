# Spec Delta

## ADDED Requirements

### Requirement: Prebuilt root contains the likelySubtags subset
The `localeData` exported by each prebuilt package root (e.g. `@js-joda/locale_en-us`) SHALL contain
the `likelySubtags` entries of its own languages (plus the `und` entry and the `und-*` entries whose
value has one of those languages), `ca-gregorian` of each locale, and `timeZoneNames` SHALL be exported
separately as `zoneNames`. The `localeData` SHALL NOT contain `likelySubtags` entries of other
languages, nor `metaZones`.

#### Scenario: likelySubtags subset
- **WHEN** the bundle of `@js-joda/locale_de` is inspected
- **THEN** its `localeData` contains the `likelySubtags` entries of `de` and `und`, no entry of another language such as `en` or `zh`, and no `metaZones` entries

#### Scenario: Subset gives the same result as the full data
- **WHEN** a locale of a prebuilt package is resolved with the `likelySubtags` subset of that package and with the complete `likelySubtags`
- **THEN** both give the same result, for every locale of every prebuilt package

#### Scenario: Packages without locales are noticed
- **WHEN** a prebuilt package's patterns expand to no locale of `cldr-data`
- **THEN** the subset test fails, unless the package is on the explicit list of known-empty packages (`no`, `nn-no`)

### Requirement: zoneNames as a separate value
Each prebuilt package root SHALL export `zoneNames` (the `main/<locale>/timeZoneNames.json` data of
its locales) next to `localeData`. Registering both plus `metaZones` of `@js-joda/locale/meta-zones`
SHALL enable the zone text pattern letters `z`, `zzzz` and `v`. Importing the root alone SHALL NOT
register anything (see `explicit-plugin-data-registration`).

#### Scenario: Zone names with several packages register metaZones once
- **WHEN** an application registers `localeData` + `zoneNames` of `@js-joda/locale_en-us` and `localeData` of `@js-joda/locale_de`, plus one `registerLocaleData(metaZones)`
- **THEN** `zzzz` formats for both `Locale.US` and `Locale.GERMANY`, and the `metaZones` data is registered once

### Requirement: Smaller bundles
The minified esbuild browser bundles of the new entries SHALL be smaller than the bundles of the
previous major's default entries, gzip compressed (KB = 1000 bytes; without `@js-joda/core` and
`@js-joda/timezone`; measured in task 7.2, numbers from prototype builds):

| Application imports | Previous major | This major, without zone names | This major, with zone names |
|---|---|---|---|
| `@js-joda/locale` + `@js-joda/locale_en-us` | 44.7 | ~15 | ~32 |
| `@js-joda/locale` + `@js-joda/locale_en-us` + `@js-joda/locale_de-de` | 53.6 | ~17 | ~41 |

#### Scenario: Smaller bundle without zone names
- **WHEN** an esbuild bundle of `@js-joda/locale` and `@js-joda/locale_en-us` (registering only `localeData`) is measured gzip compressed, minified, without `@js-joda/core`
- **THEN** it is at least 25 KB smaller than the same bundle of the previous major's default entries

#### Scenario: Smaller bundle with zone names
- **WHEN** the same is measured with `zoneNames` + `metaZones` registered
- **THEN** it is at least 10 KB smaller than the same bundle of the previous major's default entries

#### Scenario: Format with the new entries
- **WHEN** an application without `cldr-data` bundles `@js-joda/core`, `@js-joda/timezone`, `@js-joda/locale` and `@js-joda/locale_en-us`, registers `tzdbData` and the `en-us` `localeData` plus `zoneNames` and `metaZones`, and formats `2016-01-01T00:00+01:00[Europe/Berlin]` with `eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz` and `Locale.US`
- **THEN** the output is `Friday January 01 2016 Anno Domini, 12:00:00 AM Central European Standard Time`

#### Scenario: React Native resolves the prebuilt root to the ES module build
- **WHEN** a React Native bundle (Metro >= 0.79, package exports enabled with default conditions, which assert `react-native` but not `module`) imports `@js-joda/locale` and `@js-joda/locale_en-us`
- **THEN** both resolve via the `react-native` condition to the ES module builds, the bundle contains no full `likelySubtags` or `metaZones`, and registering the data makes formatting with `MMMM` and `zzzz` work

## MODIFIED Requirements

### Requirement: Stable generated files
Generating the prebuilt packages SHALL leave the committed prebuilt package manifests (including the
`exports` map of the root `.`) unchanged, unless the peer dependencies of `@js-joda/locale` or the
list of entries changed. A version bump of `@js-joda/locale` alone SHALL NOT change them.

#### Scenario: Regeneration without changes
- **WHEN** the prebuilt packages are generated twice without changes to `@js-joda/locale` in between
- **THEN** the second run produces no differences in the prebuilt package manifests

#### Scenario: Version bump of @js-joda/locale
- **WHEN** the release tooling bumps `@js-joda/locale` from 6.0.2 to 7.0.0 and the prebuilt packages are generated
- **THEN** the prebuilt package manifests are unchanged apart from the versions the release tooling set

#### Scenario: Test run leaves the working tree clean
- **WHEN** the full locale test suite, which builds the prebuilt packages, runs on a clean checkout
- **THEN** no committed prebuilt package manifest is modified

## REMOVED Requirements

### Requirement: Slim entries of a prebuilt package
The `/slim` and `/slim-no-zone-names` entries and the three build variants per prebuilt package
SHALL NOT exist anymore.

### Requirement: Default entry registers on import
The prebuilt default entry SHALL NOT register its data on import anymore (it exports values; see
`explicit-plugin-data-registration`).

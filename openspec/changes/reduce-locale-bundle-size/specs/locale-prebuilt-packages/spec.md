# Spec Delta

## ADDED Requirements

### Requirement: Default entry of a prebuilt package
The default entry of a prebuilt package (e.g. `@js-joda/locale_en-us`) SHALL register the same data
as before this change and import only `registerLocaleData` from `@js-joda/locale`, so that it works
with every `@js-joda/locale` from 5.0.0 on.

#### Scenario: New prebuilt package with older @js-joda/locale
- **WHEN** `@js-joda/locale` 5.3.2 and the new `@js-joda/locale_en-us` are installed, without `cldr-data`
- **THEN** formatting with `eeee MMMM zzzz` and `Locale.US` gives the same output as with `@js-joda/locale_en-us` 5.3.2

### Requirement: Slim entries of a prebuilt package
Every prebuilt package SHALL provide a `/slim` entry (e.g. `@js-joda/locale_en-us/slim`) that, for
use with `@js-joda/locale/slim`, registers the `likelySubtags` entries of its languages, imports
`@js-joda/locale/meta-zones`, and registers `ca-gregorian` and `timeZoneNames` of each locale. It
SHALL NOT contain `likelySubtags` entries of other languages, nor its own copy of `metaZones`. Every
prebuilt package SHALL also provide a `/slim-no-zone-names` entry with the same data without
`metaZones` and `timeZoneNames`. Both SHALL be usable with bundlers and as a minified `<script>`. In
Node.js, `require` of a slim entry SHALL load the default entry.

Sizes of the minified builds, gzip compressed (KB = 1000 bytes; today's builds of 5.3.2, the new
variants from prototype builds; without `@js-joda/core` and `@js-joda/timezone`). The default entries
stay as they are today.

| Package / entry | Today (default) | `/slim` | `/slim-no-zone-names` |
|---|---|---|---|
| `@js-joda/locale` | 36.2 | 13.1 | 13.1 |
| `@js-joda/locale/meta-zones` | – | 10.1 (once per bundle) | – |
| `@js-joda/locale_en-us` | 8.5 | 8.5 | 1.9 |
| `@js-joda/locale_de-de` | 8.9 | 8.9 | 1.9 |
| `@js-joda/locale_de` (all `de` locales) | 58.9 | 58.8 | 2.5 |
| `@js-joda/locale_en` (all `en` locales) | 832.0 | 831.9 | 11.5 |

Totals per application (sum of the files above):

| Application imports | Today | `/slim` | `/slim-no-zone-names` |
|---|---|---|---|
| `en-us` | 44.7 | 31.7 | 15.0 |
| `en-us` + `de-de` | 53.6 | 40.6 | 16.9 |

#### Scenario: Slim import
- **WHEN** an application without `cldr-data` bundles `@js-joda/core`, `@js-joda/timezone`, `@js-joda/locale/slim` and `@js-joda/locale_en-us/slim`, and formats `2016-01-01T00:00+01:00[Europe/Berlin]` with `eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz` and `Locale.US`
- **THEN** the output is `Friday January 01 2016 Anno Domini, 12:00:00 AM Central European Standard Time`

#### Scenario: likelySubtags subset
- **WHEN** the slim bundle of `@js-joda/locale_de` is inspected
- **THEN** it contains the `likelySubtags` entries of `de`, no entry of another language such as `en` or `zh`, and no `metaZones` entries

#### Scenario: Subset gives the same result as the full data
- **WHEN** a locale of a prebuilt package is resolved with the `likelySubtags` subset of that package and with the complete `likelySubtags`
- **THEN** both give the same result, for every locale of every prebuilt package

#### Scenario: Packages without locales are noticed
- **WHEN** a prebuilt package's patterns expand to no locale of `cldr-data`
- **THEN** the subset test fails, unless the package is on the explicit list of known-empty packages (`no`, `nn-no`)

#### Scenario: metaZones once with several packages
- **WHEN** `@js-joda/locale/slim`, `@js-joda/locale_en-us/slim` and `@js-joda/locale_de/slim` are bundled together with esbuild
- **THEN** the bundle contains the `metaZones` data once

#### Scenario: Smaller slim import
- **WHEN** an esbuild bundle of `@js-joda/locale/slim` and `@js-joda/locale_en-us/slim` is measured gzip compressed, minified, without `@js-joda/core`
- **THEN** it is at least 10 KB smaller than the same bundle of `@js-joda/locale` and `@js-joda/locale_en-us`

#### Scenario: Smaller slim import without zone names
- **WHEN** the same is measured with `@js-joda/locale_en-us/slim-no-zone-names`
- **THEN** it is at least 25 KB smaller than the same bundle of `@js-joda/locale` and `@js-joda/locale_en-us`

#### Scenario: Slim entry in Node.js
- **WHEN** Node.js runs `require('@js-joda/locale_en-us/slim')` and formats with `zzzz` and `Locale.US`
- **THEN** the output is the same as with `require('@js-joda/locale_en-us')`

#### Scenario: Slim entry with an older @js-joda/locale
- **WHEN** an application with `@js-joda/locale` 5.3.2 bundles `@js-joda/locale_en-us/slim`
- **THEN** the bundler fails with an error that `@js-joda/locale/slim` can't be resolved

## MODIFIED Requirements

### Requirement: Stable generated files
Generating the prebuilt packages SHALL leave the committed prebuilt package manifests and the
committed `package.json` files of their entry directories (`slim/`, `slim-no-zone-names/`) unchanged,
unless the peer dependencies of `@js-joda/locale` or the list of entries changed. A version bump of
`@js-joda/locale` alone SHALL NOT change them.

#### Scenario: Regeneration without changes
- **WHEN** the prebuilt packages are generated twice without changes to `@js-joda/locale` in between
- **THEN** the second run produces no differences in the prebuilt package manifests and entry directories

#### Scenario: Version bump of @js-joda/locale
- **WHEN** the release tooling bumps `@js-joda/locale` from 5.3.1 to 5.4.0 and the prebuilt packages are generated
- **THEN** the prebuilt package manifests and entry directories are unchanged apart from the versions the release tooling set

#### Scenario: Test run leaves the working tree clean
- **WHEN** the full locale test suite, which builds the prebuilt packages, runs on a clean checkout
- **THEN** no committed prebuilt package manifest or entry directory file is modified

# Spec Delta

## Purpose

Defines which CLDR data `@js-joda/locale` provides by itself, how applications and prebuilt locale
packages add data with `registerLocaleData`, and how missing data is reported.

## ADDED Requirements

### Requirement: Supplemental data of the base package
`@js-joda/locale` SHALL bundle and register `supplemental/weekData.json`. It SHALL NOT bundle
`supplemental/likelySubtags.json` or `supplemental/metaZones.json`. When `cldr-data` is installed, it
SHALL load all three files from `cldr-data`, so that every CLDR locale keeps working there without
registration.

#### Scenario: Node.js with cldr-data
- **WHEN** an application imports `@js-joda/locale` with `cldr-data` installed and formats a date with `zzzz` for `new Locale('th', 'TH', 'th')`
- **THEN** the output is the same as before this change

#### Scenario: Bundle without cldr-data
- **WHEN** the browser build of `@js-joda/locale` is inspected
- **THEN** it contains the `weekData` entries and no `likelySubtags` or `metaZones` entries

### Requirement: Merging registered data
`registerLocaleData(path, data)` SHALL merge `data` into the data already registered for `path`, so
that several callers can each register a part of a file. Registering the same data object for the
same path again SHALL have no effect. Registered data SHALL take precedence over loading the same path
from `cldr-data`.

#### Scenario: Two prebuilt packages add likelySubtags
- **WHEN** `@js-joda/locale_en-us` and `@js-joda/locale_de` are both imported, without `cldr-data`
- **THEN** dates format with `Locale.US` and `Locale.GERMANY` as with the complete `likelySubtags`, in either import order

#### Scenario: Same data registered twice
- **WHEN** an application registers the same data object for `main/th/ca-gregorian.json` twice
- **THEN** the second call has no effect and does not throw

#### Scenario: Already registered path is not reloaded from cldr-data
- **WHEN** an application registered `main/en/ca-gregorian.json` and `cldr-data` is installed
- **THEN** formatting with an English locale uses the registered data and does not load the file from `cldr-data` again

### Requirement: Missing likelySubtags data
When the `likelySubtags` entries for a locale are neither registered nor available from `cldr-data`,
using that locale for locale-specific formatting or parsing SHALL throw an error that names the
locale and explains how to register `supplemental/likelySubtags.json` or which prebuilt package to
import.

#### Scenario: Hand-registered locale without likelySubtags
- **WHEN** an application without `cldr-data` registers only `main/th/ca-gregorian.json` and formats with `MMMM` and `new Locale('th', 'TH', 'th')`
- **THEN** an error is thrown that names `th` and `supplemental/likelySubtags.json`

#### Scenario: Hand-registered locale with likelySubtags
- **WHEN** the application additionally registers `supplemental/likelySubtags.json` from `cldr-data`
- **THEN** the date formats with the Thai month name

### Requirement: Missing time-zone names
Formatting or parsing with the zone text pattern letters `z`, `zzzz` or `v` SHALL throw an error when
`metaZones` or the time-zone names of the locale are neither registered nor available from
`cldr-data`. The message SHALL name the pattern letters and the fix: the full prebuilt package import
instead of its `no-zone-names` entry, or registering `supplemental/metaZones.json` and
`main/<locale>/timeZoneNames.json`.

#### Scenario: Format with z without zone names
- **WHEN** only `@js-joda/locale_en-us/no-zone-names` is imported, without `cldr-data`, and a `ZonedDateTime` is formatted with `zzzz` and `Locale.US`
- **THEN** an error is thrown that mentions `zzzz`, `@js-joda/locale_en-us` and `no-zone-names`

#### Scenario: Parse with z without zone names
- **WHEN** only `@js-joda/locale_en-us/no-zone-names` is imported, without `cldr-data`, and text is parsed with a pattern containing `z` and `Locale.US`
- **THEN** the same error is thrown

#### Scenario: Patterns without zone text
- **WHEN** only `@js-joda/locale_en-us/no-zone-names` is imported and a `ZonedDateTime` is formatted and parsed with `eeee MMMM dd yyyy GGGG, hh:mm:ss a VV xxx, 'Week' ww, QQQ` and `Locale.US`
- **THEN** the result is the same as with `@js-joda/locale_en-us`

#### Scenario: Zone without a CLDR name
- **WHEN** time-zone names are available for the locale, but CLDR has no name for the zone of the date
- **THEN** the zone ID is printed, as before this change

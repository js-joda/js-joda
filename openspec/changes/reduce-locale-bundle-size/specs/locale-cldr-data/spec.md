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

#### Scenario: Node.js with cldr-data and prebuilt packages
- **WHEN** an application with `cldr-data` installed imports `@js-joda/locale_en-us` and formats with `zzzz` for `Locale.US` and for `new Locale('th', 'TH', 'th')`
- **THEN** both outputs are the same as before this change

#### Scenario: Bundle without cldr-data
- **WHEN** the browser build of `@js-joda/locale` is inspected
- **THEN** it contains the `weekData` entries and no `likelySubtags` or `metaZones` entries

#### Scenario: WeekFields without locale data
- **WHEN** an application without `cldr-data` imports only `@js-joda/locale` and calls `WeekFields.ofLocale(Locale.GERMANY)`
- **THEN** it returns the German week definition (Monday, 4 days) as before this change

### Requirement: Registering data
`registerLocaleData(path, data)` SHALL merge `data` into the registered
`supplemental/likelySubtags.json` key by key, so that several callers can each register a part of it.
For every other path, the first registration SHALL win, as before this change. Data loaded from
`cldr-data` SHALL NOT be changed by a later `registerLocaleData`. Registering the same data object
again SHALL have no visible effect. Data registered for a path SHALL take precedence over loading
that path from `cldr-data` later.

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
`main/*` data registered for a locale whose `likelySubtags` entries are neither registered nor
available from `cldr-data` SHALL NOT affect other locales. Formatting or parsing with text for that
locale's language SHALL throw an error that names that data's locale and explains how to register
`supplemental/likelySubtags.json` or to update all prebuilt packages to the release of
`@js-joda/locale`. Registering the missing `likelySubtags` afterwards SHALL make that locale work in
the same process. `likelySubtags` and `main/*` data SHALL work in either registration order.

#### Scenario: Hand-registered locale without likelySubtags
- **WHEN** an application without `cldr-data` registers only `main/th/ca-gregorian.json` and formats with `MMMM` and `new Locale('th', 'TH', 'th')`
- **THEN** an error is thrown that names `th` and `supplemental/likelySubtags.json`

#### Scenario: Registering likelySubtags after the error
- **WHEN** the application then registers `supplemental/likelySubtags.json` from `cldr-data` and formats again, in the same process
- **THEN** the date formats with the Thai month name

#### Scenario: Data without entries does not break other locales
- **WHEN** an application without `cldr-data` imports `@js-joda/locale_en-us`, registers `main/th/ca-gregorian.json` without `likelySubtags` for `th`, and formats with `MMMM`
- **THEN** formatting with `Locale.US` works as before, and formatting with `new Locale('th', 'TH', 'th')` throws the error naming `th`

### Requirement: Locale without registered data
Formatting or parsing with text for a locale whose language has no registered data and no
`likelySubtags` entry SHALL throw an error naming that locale. It SHALL NOT use the data of another
language.

#### Scenario: Language of no imported prebuilt package
- **WHEN** an application without `cldr-data` imports only `@js-joda/locale_en-us` and formats with `MMMM` and `Locale.KOREAN`
- **THEN** an error is thrown that names `ko`, and no English month name is printed

### Requirement: Missing time-zone names
When `metaZones` or the time-zone names of the locale are neither registered nor available from
`cldr-data`, formatting a region-based zone with the zone text pattern letters `z`, `zzzz` and `v`
SHALL throw an error. The message SHALL name the pattern letters, the locale and the fix: the default
import of a prebuilt package instead of its `no-zone-names` entry, or registering
`supplemental/metaZones.json` and `main/<locale>/timeZoneNames.json`. Parsing SHALL NOT throw: text
that is neither a fixed offset (`+hh:mm`, `GMT…`, `UTC…`, `UT…`), nor a zone ID, nor `Z` SHALL fail
to parse as unknown text does today. Fixed-offset zones and these parse inputs SHALL work as before
this change. Registering the names later SHALL make name parsing work in the same process.

#### Scenario: Format with z without zone names
- **WHEN** only `@js-joda/locale_en-us/no-zone-names` is imported, without `cldr-data`, and `2016-01-01T00:00+01:00[Europe/Berlin]` is formatted with `zzzz` and `Locale.US`
- **THEN** an error is thrown that mentions `zzzz`, `en-US` and `no-zone-names`

#### Scenario: Parse a zone name without zone names
- **WHEN** only `@js-joda/locale_en-us/no-zone-names` is imported, without `cldr-data`, and `Central European Standard Time` is parsed with `zzzz` and `Locale.US`
- **THEN** a `DateTimeParseException` is thrown, as for any text that is not a zone

#### Scenario: Optional zone name without zone names
- **WHEN** only `@js-joda/locale_en-us/no-zone-names` is imported and `2016-01-01 foo` is parsed with `yyyy-MM-dd[ zzzz]` and `parseUnresolved`
- **THEN** the optional section is skipped as before this change and the parse stops at the position of ` foo`

#### Scenario: Registering zone names after parsing
- **WHEN** after the parse above, in the same process and with the same formatter, `@js-joda/locale_en-us` is imported and `Central European Standard Time` is parsed with `zzzz` and `Locale.US`
- **THEN** it parses to the same zone as with `@js-joda/locale_en-us` imported from the start

#### Scenario: Fixed offsets and zone IDs without zone names
- **WHEN** only `@js-joda/locale_en-us/no-zone-names` is imported, without `cldr-data`, a `ZonedDateTime` in `ZoneOffset.UTC` is formatted with `zzzz`, and `UTC`, `+01:00`, `Europe/Berlin` and `Z` are parsed with `z`, all with `Locale.US`
- **THEN** the results are the same as before this change and no error is thrown

#### Scenario: Patterns without zone text
- **WHEN** only `@js-joda/locale_en-us/no-zone-names` is imported and a `ZonedDateTime` is formatted and parsed with `eeee MMMM dd yyyy GGGG, hh:mm:ss a VV xxx, 'Week' ww, QQQ` and `Locale.US`
- **THEN** the result is the same as with `@js-joda/locale_en-us`

#### Scenario: Zone without a CLDR name
- **WHEN** time-zone names are available for the locale, but CLDR has no name for the zone of the date
- **THEN** the zone ID is printed, as before this change

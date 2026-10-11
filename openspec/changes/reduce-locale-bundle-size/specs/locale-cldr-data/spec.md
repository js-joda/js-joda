# Spec Delta

## Purpose

Defines which CLDR data the entries of `@js-joda/locale` provide by themselves, how applications and
prebuilt locale packages add data with `registerLocaleData`, and how missing data is reported in slim
mode.

## ADDED Requirements

### Requirement: Default entry unchanged
The default entry `@js-joda/locale` SHALL bundle and register `supplemental/likelySubtags.json`,
`supplemental/metaZones.json` and `supplemental/weekData.json` as before this change, and SHALL format
and parse as before this change, with prebuilt packages of any release from 5.0.0 on and with
`cldr-data`.

#### Scenario: Old prebuilt package with the new base
- **WHEN** an application without `cldr-data` imports the new `@js-joda/locale` and `@js-joda/locale_en-us` 5.3.2 and formats `2016-01-01T00:00+01:00[Europe/Berlin]` with `eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz` and `Locale.US`
- **THEN** the output is the same as with `@js-joda/locale` 5.3.2

#### Scenario: Node.js with cldr-data
- **WHEN** an application imports `@js-joda/locale` with `cldr-data` installed and formats a date with `zzzz` for `new Locale('th', 'TH', 'th')`
- **THEN** the output is the same as before this change

#### Scenario: Existing deep imports
- **WHEN** an application imports `@js-joda/locale/dist/js-joda-locale.js`, `@js-joda/locale/dist/js-joda-locale.min.js` or a file under `@js-joda/locale/src/`
- **THEN** the import resolves as before this change

### Requirement: Slim entry
`@js-joda/locale/slim` SHALL export the same API as `@js-joda/locale` and SHALL bundle only
`supplemental/weekData.json` of the supplemental data. `@js-joda/locale/meta-zones` SHALL register
`supplemental/metaZones.json`. When an application bundles any of `@js-joda/locale`,
`@js-joda/locale/slim` and `@js-joda/locale/meta-zones` together, they SHALL share one copy of the
code and one data store. In Node.js, `require` of `@js-joda/locale/slim` SHALL give the same module
as `require('@js-joda/locale')`.

#### Scenario: Slim bundle contents
- **WHEN** an application that imports only `@js-joda/locale/slim` is bundled with esbuild for the browser
- **THEN** the bundle contains the `weekData` entries and no `likelySubtags` or `metaZones` entries

#### Scenario: Default and slim in one bundle
- **WHEN** an application imports `Locale` from `@js-joda/locale/slim`, and `@js-joda/locale_de` (default entry, which imports `@js-joda/locale`), and is bundled with esbuild
- **THEN** the bundle contains the locale code once, and formatting with `MMMM` and `Locale.GERMANY` works

#### Scenario: Slim in Node.js
- **WHEN** Node.js runs `require('@js-joda/locale/slim')`
- **THEN** it returns the same module object as `require('@js-joda/locale')`

#### Scenario: Script tags
- **WHEN** a page loads the minified `@js-joda/core` and `@js-joda/timezone`, then `@js-joda/locale/dist/slim.min.js`, `@js-joda/locale/dist/meta-zones.min.js` and `@js-joda/locale_en-us/dist/slim.min.js` with `<script>` tags
- **THEN** formatting with `MMMM` and `zzzz` and `Locale.US` works

### Requirement: Registering data
`registerLocaleData(path, data)` SHALL merge `data` key by key into a registered
`supplemental/likelySubtags.json` that is not the full file, so that several slim prebuilt entries can
each register their part. Once the full `likelySubtags` is registered by `@js-joda/locale` or loaded
from `cldr-data`, parts registered later SHALL be ignored. For every other path, the first
registration SHALL win, as before this change. Registering the same data object again SHALL have no
visible effect. Registering data SHALL take effect for `Cldr` instances created before.

#### Scenario: Two slim prebuilt entries add likelySubtags
- **WHEN** `@js-joda/locale/slim`, `@js-joda/locale_en-us/slim` and `@js-joda/locale_de/slim` are bundled together, without `cldr-data`
- **THEN** dates format with `Locale.US` and `Locale.GERMANY` as with the default entries, in either import order

#### Scenario: Same data registered twice
- **WHEN** an application registers the same data object for `main/th/ca-gregorian.json` twice
- **THEN** the second call has no effect and does not throw

#### Scenario: Full likelySubtags is not changed by parts
- **WHEN** `@js-joda/locale` (default entry) and `@js-joda/locale_en-us/slim` are bundled together
- **THEN** every `likelySubtags` value is the one of the default entry

#### Scenario: Locale data registered after a Cldr instance was created
- **WHEN** in slim mode `WeekFields.ofLocale(Locale.KOREA)` is called, then `@js-joda/locale_ko/slim` is imported, and a date is formatted with `MMMM` and `Locale.KOREAN`
- **THEN** the Korean month name is printed

### Requirement: Locale without data in slim mode
When the full `likelySubtags` is neither registered nor available from `cldr-data`, formatting or
parsing with text for a locale whose language has no registered `likelySubtags` entry SHALL throw an
error that names the locale and the `/slim` import of a prebuilt package. It SHALL NOT use the data
of another language. `WeekFields` SHALL keep working for every locale. When registered `main/*` data
has no `likelySubtags` entry, the error SHALL name that data's locale and
`supplemental/likelySubtags.json`.

#### Scenario: Language of no imported prebuilt package
- **WHEN** an application bundles `@js-joda/locale/slim` and `@js-joda/locale_en-us/slim` only, and formats with `MMMM` and `Locale.KOREAN`
- **THEN** an error is thrown that names `ko`, and no English month name is printed

#### Scenario: WeekFields in slim mode
- **WHEN** an application bundles only `@js-joda/locale/slim` and calls `WeekFields.ofLocale(Locale.GERMANY)`
- **THEN** it returns the German week definition (Monday, 4 days) as with the default entry

#### Scenario: Hand-registered locale without likelySubtags
- **WHEN** an application bundles `@js-joda/locale/slim`, registers only `main/th/ca-gregorian.json` and formats with `MMMM` and `new Locale('th', 'TH', 'th')`
- **THEN** an error is thrown that names `th` and `supplemental/likelySubtags.json`

### Requirement: Missing time-zone names in slim mode
When `metaZones` is neither registered nor available from `cldr-data`, formatting a region-based zone
with the zone text pattern letters `z`, `zzzz` and `v` SHALL throw an error that names the pattern
letters, the locale and the `/slim` entry of a prebuilt package (instead of `/slim-no-zone-names`) as
the fix. Parsing SHALL NOT throw: text that is neither a fixed offset, nor a zone ID, nor `Z` SHALL
fail to parse as unknown text does today. Fixed-offset zones and these parse inputs SHALL work as
before this change.

#### Scenario: Format with z without zone names
- **WHEN** `@js-joda/locale/slim` and `@js-joda/locale_en-us/slim-no-zone-names` are bundled, and `2016-01-01T00:00+01:00[Europe/Berlin]` is formatted with `zzzz` and `Locale.US`
- **THEN** an error is thrown that mentions `zzzz`, `en-US` and `/slim`

#### Scenario: Parse a zone name without zone names
- **WHEN** in the same setup `Central European Standard Time` is parsed with `zzzz` and `Locale.US`
- **THEN** a `DateTimeParseException` is thrown, as for any text that is not a zone

#### Scenario: Optional zone name without zone names
- **WHEN** in the same setup `2016-01-01 foo` is parsed with `yyyy-MM-dd[ zzzz]` and `parseUnresolved`
- **THEN** the optional section is skipped as with the default entry and the parse stops at the position of ` foo`

#### Scenario: Fixed offsets and zone IDs without zone names
- **WHEN** in the same setup a `ZonedDateTime` in `ZoneOffset.UTC` is formatted with `zzzz`, and `UTC`, `+01:00`, `Europe/Berlin` and `Z` are parsed with `z`, all with `Locale.US`
- **THEN** the results are the same as with the default entries and no error is thrown

#### Scenario: Patterns without zone text
- **WHEN** in the same setup a `ZonedDateTime` is formatted and parsed with `eeee MMMM dd yyyy GGGG, hh:mm:ss a VV xxx, 'Week' ww, QQQ` and `Locale.US`
- **THEN** the result is the same as with the default entries

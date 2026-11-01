# Spec Delta

## Purpose

Defines which CLDR data the entries of `@js-joda/locale` provide by themselves in the major release,
how applications and prebuilt locale packages add data with `registerLocaleData` (including merging
of `likelySubtags` parts), and how missing data is reported.

## ADDED Requirements

### Requirement: Root entry bundles only weekData
The root entry `@js-joda/locale` SHALL bundle and register only `supplemental/weekData.json` of the
supplemental data. It SHALL NOT bundle or register the full `likelySubtags` or `metaZones`. The full
`likelySubtags` SHALL be available as a plain value from `@js-joda/locale/likely-subtags`, and
`metaZones` from `@js-joda/locale/meta-zones`.

#### Scenario: Root bundle contents
- **WHEN** an application that imports only `@js-joda/locale` is bundled with esbuild for the browser
- **THEN** the bundle contains the `weekData` entries and no `likelySubtags` or `metaZones` entries

#### Scenario: Node.js with cldr-data
- **WHEN** a Node.js application with `cldr-data` installed registers `cldrDataSource` (see
  `explicit-plugin-data-registration`) and formats a date with `zzzz` and `new Locale('th', 'TH', 'th')`
- **THEN** the output is the same as with the old default entry of the previous major

### Requirement: Registering data merges likelySubtags parts
`registerLocaleData` SHALL merge `data` key by key into a registered
`supplemental/likelySubtags.json` that is not the full file, so that several prebuilt packages can
each register their part. Once the full `likelySubtags` is registered (via
`@js-joda/locale/likely-subtags` or loaded from `cldr-data`), parts registered later SHALL be ignored.
For every other path, the first registration SHALL win. Registering the same data object again SHALL
have no visible effect. Registering data SHALL take effect for `Cldr` instances created before.

#### Scenario: Two prebuilt packages add likelySubtags
- **WHEN** an application registers the `localeData` of `@js-joda/locale_en-us` and of `@js-joda/locale_de`
- **THEN** dates format with `Locale.US` and `Locale.GERMANY` as with the old default entries, in either registration order

#### Scenario: Same data registered twice
- **WHEN** an application registers the same data object for `main/th/ca-gregorian.json` twice
- **THEN** the second call has no effect and does not throw

#### Scenario: Full likelySubtags is not changed by parts
- **WHEN** an application registers the full file via `@js-joda/locale/likely-subtags` and then the `localeData` of `@js-joda/locale_en-us`
- **THEN** every `likelySubtags` value is the one of the full file

#### Scenario: Locale data registered after a Cldr instance was created
- **WHEN** `WeekFields.ofLocale(Locale.KOREA)` is called, then the `ko` data is registered, and a date is formatted with `MMMM` and `Locale.KOREAN`
- **THEN** the Korean month name is printed

### Requirement: Locale without data
Formatting or parsing with text for a locale whose language has no registered `likelySubtags` entry
SHALL throw an error that names the locale and the root of a prebuilt package to register (for
`<script>` tags: the corresponding global). It SHALL NOT use the data of another language — there
SHALL be no silent fallback to English. Registering the data afterwards SHALL make the locale work.
`WeekFields` SHALL keep working for every locale (it only reads `weekData`). When registered `main/*`
data has no `likelySubtags` entry, the error SHALL name that data's locale and
`supplemental/likelySubtags.json`, with `@js-joda/locale/likely-subtags` as the fix. The checks SHALL
rest on registered data, never on root contents, and SHALL be active always.

#### Scenario: Language of no registered package
- **WHEN** an application registers only the `en-us` `localeData` and formats with `MMMM` and `Locale.KOREAN`
- **THEN** an error is thrown that names `ko` and `@js-joda/locale_ko`, and no English month name is printed

#### Scenario: Data registered after the error
- **WHEN** formatting with `Locale.KOREAN` threw because no `ko` data was registered, and the `ko` data is registered afterwards
- **THEN** formatting with `Locale.KOREAN` prints the Korean month name

#### Scenario: WeekFields without locale data
- **WHEN** an application registers no locale data at all and calls `WeekFields.ofLocale(Locale.GERMANY)`
- **THEN** it returns the German week definition (Monday, 4 days), as with the old default entry

#### Scenario: Hand-registered locale without likelySubtags
- **WHEN** an application registers only `main/th/ca-gregorian.json` and formats with `MMMM` and `new Locale('th', 'TH', 'th')`
- **THEN** an error is thrown that names `th` and `supplemental/likelySubtags.json` (fix: register the full file via `@js-joda/locale/likely-subtags`)

### Requirement: Missing time-zone names
When `metaZones` or the locale's `timeZoneNames` is not registered, formatting a region-based zone
with the zone text pattern letters `z`, `zzzz` and `v` SHALL throw an error that names the pattern
letters, the locale and the fix (`registerLocaleData(zoneNames, metaZones)` with the `zoneNames` of
a prebuilt package and `metaZones` of `@js-joda/locale/meta-zones`). Parsing SHALL NOT throw: text
that is neither a fixed offset, nor a zone ID, nor `Z` SHALL fail to parse as unknown text does today.
Fixed-offset zones, zone IDs and patterns without zone text SHALL work as before this change.

#### Scenario: Format with z without zone names
- **WHEN** an application registered only the `en-us` `localeData`, and `2016-01-01T00:00+01:00[Europe/Berlin]` is formatted with `zzzz` and `Locale.US`
- **THEN** an error is thrown that mentions `zzzz`, `en-US` and the zone-names registration

#### Scenario: Parse a zone name without zone names
- **WHEN** in the same setup `Central European Standard Time` is parsed with `zzzz` and `Locale.US`
- **THEN** a `DateTimeParseException` is thrown, as for any text that is not a zone

#### Scenario: Optional zone name without zone names
- **WHEN** in the same setup `2016-01-01 foo` is parsed with `yyyy-MM-dd[ zzzz]` and `parseUnresolved`
- **THEN** the optional section is skipped as before, and the parse stops at the position of ` foo`

#### Scenario: Fixed offsets and zone IDs without zone names
- **WHEN** in the same setup a `ZonedDateTime` in `ZoneOffset.UTC` is formatted with `zzzz`, and `UTC`, `+01:00`, `Europe/Berlin` and `Z` are parsed with `z`, all with `Locale.US`
- **THEN** the results are the same as with the old default entries and no error is thrown

#### Scenario: Zone names registered
- **WHEN** an application registers `localeData` of `@js-joda/locale_en-us` plus `registerLocaleData(enZones, metaZones)`
- **THEN** `2016-01-01T00:00+01:00[Europe/Berlin]` formats with `zzzz` and `Locale.US` as `Central European Standard Time`

#### Scenario: Patterns without zone text
- **WHEN** a `ZonedDateTime` is formatted and parsed with `eeee MMMM dd yyyy GGGG, hh:mm:ss a VV xxx, 'Week' ww, QQQ` and `Locale.US`, without zone names registered
- **THEN** the result is the same as with the old default entries

### Requirement: Entry resolution
`./likely-subtags` and `./meta-zones` SHALL resolve with `require` and `import` in Node.js and in
bundlers through the `exports` map of `explicit-plugin-data-registration` (conditions
`types`/`react-native`/`module`/`default`), and SHALL ship minified builds for `<script>` tags that
only set a global; an inline script SHALL call `JSJodaLocale.registerLocaleData(...)`.

#### Scenario: Script tags
- **WHEN** a page loads the minified `@js-joda/core`, `@js-joda/timezone`, the minified
  `@js-joda/locale`, then the minified `@js-joda/locale/dist/meta-zones.min.js` and the minified
  prebuilt data script, and then an inline script calling
  `JSJodaLocale.registerLocaleData(JSJodaLocaleData_en_us.localeData, JSJodaLocaleData_en_us.zoneNames, JSJodaLocaleMetaZones.metaZones)`
- **THEN** formatting with `MMMM` and `zzzz` and `Locale.US` works

## REMOVED Requirements

### Requirement: Slim entries
`@js-joda/locale/slim`, `@js-joda/locale/slim` of the prebuilt packages and `/slim-no-zone-names`
SHALL NOT exist anymore; the size reduction comes from the data layout of the major (decision 1), not
from an opt-in mode.

### Requirement: Default entry bundles the full supplemental data
The root entry SHALL NOT bundle `supplemental/likelySubtags.json` or `supplemental/metaZones.json`
anymore.

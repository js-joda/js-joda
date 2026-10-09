# Spec Delta

## ADDED Requirements

### Requirement: CLDR data of a prebuilt package
The default entry of a prebuilt package SHALL register everything its locales need for formatting
and parsing without `cldr-data`: `ca-gregorian` and `timeZoneNames` of each locale,
`supplemental/metaZones.json`, and the `likelySubtags` entries of its languages. It SHALL NOT contain
`likelySubtags` entries of other languages.

#### Scenario: Default import without cldr-data
- **WHEN** an application without `cldr-data` imports `@js-joda/core`, `@js-joda/timezone` and `@js-joda/locale_en-us`, and formats `2016-01-01T00:00+01:00[Europe/Berlin]` with `eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz` and `Locale.US`
- **THEN** the output is `Friday January 01 2016 Anno Domini, 12:00:00 AM Central European Standard Time`

#### Scenario: likelySubtags subset
- **WHEN** the bundle of `@js-joda/locale_de` is inspected
- **THEN** it contains the `likelySubtags` entries of `de`, and no entry of another language such as `en` or `zh`

#### Scenario: Subset gives the same result as the full data
- **WHEN** a locale of a prebuilt package is resolved with the `likelySubtags` subset of that package and with the complete `likelySubtags`
- **THEN** both give the same result, for every locale of every prebuilt package

#### Scenario: Smaller default import
- **WHEN** `@js-joda/locale` and the minified `@js-joda/locale_en-us` are measured gzip compressed
- **THEN** together they are at least 10 KB smaller than with `@js-joda/locale` 5.3.2 and `@js-joda/locale_en-us` 5.3.2

### Requirement: no-zone-names entry
Every prebuilt package SHALL provide a `no-zone-names` entry (e.g. `@js-joda/locale_en-us/no-zone-names`)
that registers the same data as the default entry without `metaZones` and `timeZoneNames`. It SHALL be
usable with `require`, `import`, bundlers and as a minified `<script>`. The existing entries and files
SHALL stay available under their current paths.

#### Scenario: CommonJS and ES module import
- **WHEN** Node.js loads `@js-joda/locale_en-us/no-zone-names` with `require` and with `import`
- **THEN** both register the English locale data and formatting with `MMMM` and `Locale.US` works

#### Scenario: Browser script
- **WHEN** a page loads `@js-joda/locale/dist/js-joda-locale.min.js` and `@js-joda/locale_en-us/dist/no-zone-names.min.js` with `<script>` tags
- **THEN** formatting with `MMMM` and `Locale.US` works

#### Scenario: Smaller bundle
- **WHEN** `@js-joda/locale` and the minified `no-zone-names` entry of `@js-joda/locale_en-us` are measured gzip compressed
- **THEN** together they are at least 25 KB smaller than with `@js-joda/locale` 5.3.2 and `@js-joda/locale_en-us` 5.3.2

#### Scenario: Existing deep imports
- **WHEN** an application imports `@js-joda/locale_en-us/dist/index.js` or `@js-joda/locale_en-us/dist/index.esm.js`
- **THEN** the import resolves as before this change

#### Scenario: Mixed with a full entry
- **WHEN** an application imports `@js-joda/locale_en-us/no-zone-names` and `@js-joda/locale_de`
- **THEN** `zzzz` works with `Locale.GERMANY`, and throws the missing time-zone names error with `Locale.US`

### Requirement: Compatibility with older @js-joda/locale
A prebuilt package SHALL work with every `@js-joda/locale` in its peer range (`>=5.0.0`). With an
`@js-joda/locale` from before this change, the default entry SHALL format and parse as before.

#### Scenario: New prebuilt package with older @js-joda/locale
- **WHEN** `@js-joda/locale` 5.3.2 and the new `@js-joda/locale_en-us` are installed, without `cldr-data`
- **THEN** formatting with `eeee MMMM zzzz` and `Locale.US` gives the same output as with `@js-joda/locale_en-us` 5.3.2

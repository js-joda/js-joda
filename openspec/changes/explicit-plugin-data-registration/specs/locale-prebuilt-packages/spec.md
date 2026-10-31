# Spec Delta

## ADDED Requirements

### Requirement: Side-effect free data entry
Each prebuilt package SHALL have a `/data` entry that exports `localeData`: a locale data object with
the same CLDR data the default entry registers. The `/data` entry SHALL NOT import any package and
SHALL NOT register data when imported. The `/data` entry SHALL be generated together with the other
generated files of the prebuilt packages.

#### Scenario: Data entry has no imports
- **WHEN** the ES module and CommonJS builds of `@js-joda/locale_de/data` are inspected
- **THEN** they contain no `import` or `require` of another package

#### Scenario: Same data as the default entry
- **WHEN** `@js-joda/locale_en-us/data` is registered with `@js-joda/locale/register`, and in a second run `@js-joda/locale_en-us` is imported with `@js-joda/locale`
- **THEN** formatting `2016-01-01T00:00+01:00[Europe/Berlin]` with `eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz` and `Locale.US` gives the same output in both runs

#### Scenario: Usage example
- **WHEN** an application runs
  ```js
  import { Locale, registerLocaleData } from '@js-joda/locale/register';
  import { localeData as en } from '@js-joda/locale_en/data';
  registerLocaleData(en);
  ```
- **THEN** dates format with `Locale.ENGLISH`, and importing `@js-joda/locale_en/data` alone has no effect

### Requirement: Default entry stays compatible with older @js-joda/locale
The default entry of a prebuilt package SHALL register its data with `registerLocaleData(path, data)`,
so that it works with every `@js-joda/locale` release in its peer range (`>=5.0.0`).

#### Scenario: New prebuilt package with an older base
- **WHEN** an application imports `@js-joda/locale` 5.3.2 and the new `@js-joda/locale_de`
- **THEN** formatting with `Locale.GERMAN` works as with `@js-joda/locale_de` 5.3.2

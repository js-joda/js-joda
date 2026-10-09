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

Usage compared to today (informative):

The format and parse code is the same in every variant; only the imports differ. In the examples:

```js
import { DateTimeFormatter, LocalDate, ZonedDateTime, ZoneId } from '@js-joda/core';
const zdt = ZonedDateTime.of(2016, 1, 1, 0, 0, 0, 0, ZoneId.of('Europe/Berlin'));
const full = DateTimeFormatter.ofPattern('eeee MMMM dd yyyy, hh:mm a zzzz');
```

**One locale, with zone names**

```js
// today (unchanged, keeps working)
import '@js-joda/timezone';
import { Locale } from '@js-joda/locale';
import '@js-joda/locale_en-us';

// slim
import '@js-joda/timezone';
import { Locale } from '@js-joda/locale/slim';
import '@js-joda/locale_en-us/slim';

zdt.format(full.withLocale(Locale.US));
// 'Friday January 01 2016, 12:00 AM Central European Standard Time'
```

**One locale, without zone names**

```js
// slim, no zone names
import '@js-joda/timezone';   // only needed here for ZoneId.of('Europe/Berlin')
import { Locale } from '@js-joda/locale/slim';
import '@js-joda/locale_en-us/slim-no-zone-names';

LocalDate.of(2016, 1, 1).format(DateTimeFormatter.ofPattern('eeee MMMM dd yyyy').withLocale(Locale.US));
// 'Friday January 01 2016'
zdt.format(full.withLocale(Locale.US));
// throws IllegalStateException: zone names (zzzz) for en-US are missing,
// import '@js-joda/locale_en-us/slim' instead of '/slim-no-zone-names'
```

**Several locales**

```js
// today
import '@js-joda/timezone';
import { Locale } from '@js-joda/locale';
import '@js-joda/locale_en-us';
import '@js-joda/locale_de-de';

// slim: metaZones is bundled once, each package adds only its own likelySubtags entries
import '@js-joda/timezone';
import { Locale } from '@js-joda/locale/slim';
import '@js-joda/locale_en-us/slim';
import '@js-joda/locale_de-de/slim';

// slim, zone names only for one of them
import '@js-joda/timezone';
import { Locale } from '@js-joda/locale/slim';
import '@js-joda/locale_en-us/slim';
import '@js-joda/locale_de-de/slim-no-zone-names';

zdt.format(DateTimeFormatter.ofPattern('MMMM zzzz').withLocale(Locale.GERMANY));
// 'Januar Europe/Berlin' (no German zone names: the zone ID is printed, as today)
```

**A locale that wasn't imported**

```js
import { Locale } from '@js-joda/locale/slim';
import '@js-joda/locale_en-us/slim';

LocalDate.of(2016, 1, 1).format(DateTimeFormatter.ofPattern('MMMM').withLocale(Locale.KOREAN));
// throws IllegalStateException: no locale data for ko, import '@js-joda/locale_ko/slim'
// (instead of silently printing English)
```

**Mixing slim and default imports**

```js
import { Locale } from '@js-joda/locale/slim';
import '@js-joda/locale_en-us/slim';
import '@js-joda/locale_de';   // default entry, imports '@js-joda/locale'
// works, code and data exist once, but the bundle contains the full data again (no saving)
```

**Script tags**

```html
<!-- today (unchanged) -->
<script src="node_modules/@js-joda/core/dist/js-joda.min.js"></script>
<script src="node_modules/@js-joda/timezone/dist/js-joda-timezone.min.js"></script>
<script src="node_modules/@js-joda/locale/dist/js-joda-locale.min.js"></script>
<script src="node_modules/@js-joda/locale_en-us/dist/index.min.js"></script>

<!-- slim -->
<script src="node_modules/@js-joda/core/dist/js-joda.min.js"></script>
<script src="node_modules/@js-joda/timezone/dist/js-joda-timezone.min.js"></script>
<script src="node_modules/@js-joda/locale/dist/slim.min.js"></script>
<script src="node_modules/@js-joda/locale/dist/meta-zones.min.js"></script> <!-- omit without zone names -->
<script src="node_modules/@js-joda/locale_en-us/dist/slim.min.js"></script> <!-- or slim-no-zone-names.min.js -->
```

**Node.js**

```js
// unchanged; slim entries resolve to the full builds, size doesn't matter here
const { Locale } = require('@js-joda/locale');
require('@js-joda/locale_en-us');
// require('@js-joda/locale/slim') and require('@js-joda/locale_en-us/slim') give the same result
```

Which entry contains which data (informative):

Example values from `cldr-data`:

| Data | Example values |
|---|---|
| code: `Locale`, formatter support, `cldrjs` | – |
| `weekData` (all territories) | `firstDay: { DE: "mon", US: "sun" }`, `minDays: { DE: "4" }` |
| `likelySubtags`, full (~1850 entries, all languages) | `"en": "en-Latn-US"`, `"de": "de-Latn-DE"`, `"zh-TW": "zh-Hant-TW"`, `"und": "en-Latn-US"`, … |
| `likelySubtags`, subset of one package (e.g. `en`: ~19 entries) | `"en": "en-Latn-US"`, `"en-Shaw": "en-Shaw-GB"`, `"und": "en-Latn-US"`, `"und-009": "en-Latn-AU"`, … |
| `metaZones` (all zones, all languages) | `Europe/Berlin` → `Europe_Central`, `Europe/Paris` → `Europe_Central`; golden zone of `Europe_Central`: `Europe/Paris` |
| `ca-gregorian` (per locale) | `en`: `January`, `Friday`; `de`: `Januar`, `Freitag` |
| `timeZoneNames` (per locale) | `en`: `Europe_Central` → `Central European Standard Time`; `de`: `Europe_Central` → `Mitteleuropäische Normalzeit` |

Contents of each entry (✓ = contained in the entry's bundle):

| Data | `@js-joda/locale` | `@js-joda/locale/slim` | `@js-joda/locale/meta-zones` | `locale_en-us` | `locale_en-us/slim` | `locale_en-us/slim-no-zone-names` |
|---|---|---|---|---|---|---|
| code, `cldrjs` | ✓ | ✓ (shared) | – | – | – | – |
| `weekData` | ✓ | ✓ | – | – | – | – |
| `likelySubtags`, full | ✓ | – | – | – | – | – |
| `likelySubtags`, `en` subset | – | – | – | – | ✓ | ✓ |
| `metaZones` | ✓ | – | ✓ | – | imports `meta-zones` | – |
| `ca-gregorian` `en`, `en-US` | – | – | – | ✓ | ✓ | ✓ |
| `timeZoneNames` `en`, `en-US` | – | – | – | ✓ | ✓ | – |

So today `@js-joda/locale` + `locale_en-us` contain every row. `/slim` + `locale_en-us/slim` contain the
same except the full `likelySubtags` (replaced by the `en` subset). `/slim` +
`locale_en-us/slim-no-zone-names` contain only code, `weekData`, the `en` subset and `ca-gregorian`.

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

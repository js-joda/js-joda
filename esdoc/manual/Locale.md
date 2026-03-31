# Using locale package

## Motivation

Implementation of locale specific functionality for js-joda, providing functionality not implemented in js-joda core.

Especially this implements pattern elements to print and parse locale specific dates.

## Installation

There are two ways to use locale support, depending on your use case.

### Option 1 — Full locale support (Node, server-side)

Install `@js-joda/locale` together with its peer dependency, the full `cldr-data` package. 
This gives you support for all locales defined in the CLDR project.

```shell
npm install @js-joda/core
npm install @js-joda/timezone
npm install @js-joda/locale
npm install cldr-data // peer dependency of @js-joda/locale
npm install cldrjs // peer dependency of @js-joda/locale
```

### Option 2 — Prebuilt locale packages (browser, size-constrained environments)

Install `@js-joda/locale` and one or more prebuilt locale packages. Each prebuilt package contains only the CLDR data for its specific locale(s), keeping bundle sizes small.

```shell
npm install @js-joda/core
npm install @js-joda/timezone
npm install @js-joda/locale
npm install @js-joda/locale_en
npm install @js-joda/locale_de   # add as many as needed
```

> **Important:** `@js-joda/locale` is always required. Prebuilt packages only register locale data — the implementation lives in `@js-joda/locale`. 
> Always import `Locale` and `WeekFields` from `@js-joda/locale`, not from a prebuilt package.

## Usage

### With a single locale

```javascript
const {
    DateTimeFormatter,
    ZonedDateTime,
    ZoneId,
} = require('@js-joda/core');
require('@js-joda/timezone');

const { Locale } = require('@js-joda/locale');  // always import Locale from here
require('@js-joda/locale_en');                  // side-effect: registers EN locale data

const zdt = ZonedDateTime.of(2016, 1, 1, 0, 0, 0, 0, ZoneId.of('Europe/Berlin'));
console.log('en formatted string:',
    zdt.format(
        DateTimeFormatter
            .ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, \'Week \' ww, \'Quarter \' QQQ')
            .withLocale(Locale.ENGLISH)));
```

Output: `en formatted string: Friday January 01 2016 Anno Domini, 12:00:00 AM Central European Time, Week  01, Quarter  Q1`

### With multiple locales

Multiple prebuilt packages can be imported in the same project. Each registers its locale data independently without affecting the others.

```javascript
const {
    DateTimeFormatter,
    ZonedDateTime,
    ZoneId,
} = require('@js-joda/core');
require('@js-joda/timezone');

const { Locale } = require('@js-joda/locale');  // single source of Locale
require('@js-joda/locale_en');                  // side-effect: registers EN locale data
require('@js-joda/locale_de');                  // side-effect: registers DE locale data

const zdt = ZonedDateTime.of(2016, 1, 1, 0, 0, 0, 0, ZoneId.of('Europe/Berlin'));
const pattern = 'eeee MMMM dd yyyy';

console.log('en:', zdt.format(DateTimeFormatter.ofPattern(pattern).withLocale(Locale.ENGLISH)));
console.log('de:', zdt.format(DateTimeFormatter.ofPattern(pattern).withLocale(Locale.GERMAN)));
```

### With server-side locales

On the server, with the cldrjs and cldr-data packages installed, you can load any locale supported by the [Unicode CLDR project](https://cldr.unicode.org/) as shown in the example below. Find the full list of supported locales at the [CLDR repo](https://github.com/unicode-org/cldr/tree/main/common/main).

```javascript
const { DateTimeFormatter, ZonedDateTime, ZoneId } = require('@js-joda/core');
require('@js-joda/timezone');
const { Locale, registerLocaleData } = require('@js-joda/locale');

// Register per-locale CLDR data for the locales you need
registerLocaleData('main/th/ca-gregorian.json', require('cldr-data/main/th/ca-gregorian.json'));
registerLocaleData('main/th/timeZoneNames.json', require('cldr-data/main/th/timeZoneNames.json'));

const zdt = ZonedDateTime.of(2016, 1, 1, 0, 0, 0, 0, ZoneId.of('Europe/Berlin'));
const localeThai = new Locale('th', 'TH', 'th');

console.log('th_TH formatted string:',
    zdt.format(DateTimeFormatter
            .ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, \'Week \' ww, \'Quarter \' QQQ')
            .withLocale(localeThai)));
```

## Available prebuilt packages

Each prebuilt package covers one language or a specific regional variant.

| Package | Locales | `Locale` constant |
|---------|---------|-------------------|
| `@js-joda/locale_ar` | all `ar-*` variants | `Locale.ARABIC` |
| `@js-joda/locale_cs` | all `cs-*` variants | `Locale.CZECH` |
| `@js-joda/locale_da` | all `da-*` variants | `Locale.DANISH` |
| `@js-joda/locale_de` | all `de-*` variants | `Locale.GERMAN` |
| `@js-joda/locale_de-de` | `de`, `de-DE` | `Locale.GERMANY` |
| `@js-joda/locale_el` | all `el-*` variants | `Locale.GREEK` |
| `@js-joda/locale_en` | all `en-*` variants | `Locale.ENGLISH` |
| `@js-joda/locale_en-gb` | `en`, `en-GB` | `Locale.UK` |
| `@js-joda/locale_en-us` | `en`, `en-US` | `Locale.US` |
| `@js-joda/locale_es` | all `es-*` variants | `Locale.SPANISH` |
| `@js-joda/locale_fi` | all `fi-*` variants | `Locale.FINNISH` |
| `@js-joda/locale_fi-fi` | `fi`, `fi-FI` | — |
| `@js-joda/locale_fr` | all `fr-*` variants | `Locale.FRENCH` |
| `@js-joda/locale_fr-fr` | `fr`, `fr-FR` | `Locale.FRANCE` |
| `@js-joda/locale_hi` | all `hi-*` variants | `Locale.HINDI` |
| `@js-joda/locale_it` | all `it-*` variants | `Locale.ITALIAN` |
| `@js-joda/locale_it-it` | `it`, `it-IT` | `Locale.ITALY` |
| `@js-joda/locale_ja` | all `ja-*` variants | — |
| `@js-joda/locale_ja-jp` | `ja`, `ja-JP` | `Locale.JAPANESE`, `Locale.JAPAN` |
| `@js-joda/locale_ko` | all `ko-*` variants | `Locale.KOREAN` |
| `@js-joda/locale_lt` | all `lt-*` variants | `Locale.LITHUANIAN` |
| `@js-joda/locale_nb-no` | `nb`, `nb-NO` | `Locale.NORWEGIAN_BOKMAL` |
| `@js-joda/locale_nn-no` | `nn`, `nn-NO` | `Locale.NORWEGIAN_NYNORSK` |
| `@js-joda/locale_no` | all `no-*` variants | `Locale.NORWEGIAN` |
| `@js-joda/locale_pl` | all `pl-*` variants | `Locale.POLISH` |
| `@js-joda/locale_ro` | all `ro-*` variants | `Locale.ROMANIAN` |
| `@js-joda/locale_ru` | all `ru-*` variants | `Locale.RUSSIAN` |
| `@js-joda/locale_sk` | all `sk-*` variants | `Locale.SLOVAK` |
| `@js-joda/locale_sv` | all `sv-*` variants | `Locale.SWEDISH` |
| `@js-joda/locale_sv-se` | `sv`, `sv-SE` | `Locale.SWEDEN` |
| `@js-joda/locale_tr` | all `tr-*` variants | `Locale.TURKISH` |
| `@js-joda/locale_uk` | all `uk-*` variants | `Locale.UKRAINIAN` |
| `@js-joda/locale_zh` | all `zh-*` variants | `Locale.CHINESE` |

For the full list see [prebuilt-packages.json](https://github.com/js-joda/js-joda/blob/main/packages/locale/prebuilt-packages.json).

## Links

For more information check the [README.md](https://github.com/js-joda/js-joda/blob/main/packages/locale/README.md)
in the locale package.
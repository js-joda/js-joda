# @js-joda/locale

# additional date-time classes that complement those in js-joda

[![npm version](https://badge.fury.io/js/%40js-joda%2Flocale.svg)](https://badge.fury.io/js/%40js-joda%2Flocale)
[![GH Actions Build Status](https://github.com/js-joda/js-joda/actions/workflows/tests.yaml/badge.svg?branch=main)](https://github.com/js-joda/js-joda/actions)
[![Sauce Test Status](https://saucelabs.com/buildstatus/js-joda)](https://saucelabs.com/u/js-joda)
[![Coverage Status](https://coveralls.io/repos/js-joda/js-joda/badge.svg?branch=main&service=github)](https://coveralls.io/github/js-joda/js-joda?branch=main)
[![Downloads/Month](https://img.shields.io/npm/dm/%40js-joda%2Flocale.svg)](https://img.shields.io/npm/dm/%40js-joda%2Flocale.svg)

[![Sauce Browser Matrix](https://saucelabs.com/browser-matrix/js-joda.svg?branch=main&42)](https://saucelabs.com/u/js-joda)

## Motivation

Implementation of locale specific funtionality for js-joda, providing function not implemented in js-joda core

Especially this implements patterns elements to print and parse locale specific dates

### Usage ###

also see examples in  [examples folder](examples/)

### Use prebuilt locale packages

Since the process described [below](#without-prebuilt-locale-packages) requires a lot of setup and internal knowledge,
we provide prebuilt sets of locales as separate npm packages.
So for ease of use you may want to install the corresponding `@js-joda/locale_<locale>` package.
The current list of available prebuilt locales is:
- [ar (i.e. ar-*)](https://www.npmjs.com/package/@js-joda/locale_ar)
- [cs (i.e. cs-*)](https://www.npmjs.com/package/@js-joda/locale_cs)
- [da (i.e. da-*)](https://www.npmjs.com/package/@js-joda/locale_da)
- [de (i.e. de-*)](https://www.npmjs.com/package/@js-joda/locale_de)
- [de-DE](https://www.npmjs.com/package/@js-joda/locale_de-de)
- [el (i.e. el-*)](https://www.npmjs.com/package/@js-joda/locale_el)
- [en (i.e. en-*)](https://www.npmjs.com/package/@js-joda/locale_en)
- [en-GB](https://www.npmjs.com/package/@js-joda/locale_en-gb)
- [en-US](https://www.npmjs.com/package/@js-joda/locale_en-us)
- [es (i.e. es-*)](https://www.npmjs.com/package/@js-joda/locale_es)
- [fi (i.e. fi-*)](https://www.npmjs.com/package/@js-joda/locale_fi)
- [fi-FI](https://www.npmjs.com/package/@js-joda/locale_fi-fi)
- [fr (i.e. fr-*)](https://www.npmjs.com/package/@js-joda/locale_fr)
- [fr-FR](https://www.npmjs.com/package/@js-joda/locale_fr-fr)
- [hi (i.e. hi-*)](https://www.npmjs.com/package/@js-joda/locale_hi)
- [it (i.e. it-*)](https://www.npmjs.com/package/@js-joda/locale_it)
- [it-IT](https://www.npmjs.com/package/@js-joda/locale_it-it)
- [ja (i.e. ja-*)](https://www.npmjs.com/package/@js-joda/locale_ja)
- [ja-JP](https://www.npmjs.com/package/@js-joda/locale_ja-jp)
- [ko (i.e. ko-*)](https://www.npmjs.com/package/@js-joda/locale_ko)
- [lt (i.e. lt-*)](https://www.npmjs.com/package/@js-joda/locale_lt)
- [nb-NO](https://www.npmjs.com/package/@js-joda/locale_nb-no)
- [nn-NO](https://www.npmjs.com/package/@js-joda/locale_nn-no)
- [no (i.e. no-*)](https://www.npmjs.com/package/@js-joda/locale_no)
- [pl (i.e. pl-*)](https://www.npmjs.com/package/@js-joda/locale_pl)
- [ro (i.e. ro-*)](https://www.npmjs.com/package/@js-joda/locale_ro)
- [ru (i.e. ru-*)](https://www.npmjs.com/package/@js-joda/locale_ru)
- [sk (i.e. sk-*)](https://www.npmjs.com/package/@js-joda/locale_sk)
- [sv (i.e. sv-*)](https://www.npmjs.com/package/@js-joda/locale_sv)
- [sv-SE](https://www.npmjs.com/package/@js-joda/locale_sv-se)
- [tr (i.e. tr-*)](https://www.npmjs.com/package/@js-joda/locale_tr)
- [uk (i.e. uk-*)](https://www.npmjs.com/package/@js-joda/locale_uk)
- [zh (i.e. zh-*)](https://www.npmjs.com/package/@js-joda/locale_zh)

this list could be extended relatively easily if needed, as long as data is available in cldr-data

with these packages, no further steps are needed to build the cldr-data.

### Node with prebuilt locales

Install required packages using npm

```shell
    npm install @js-joda/core
    npm install @js-joda/timezone
    npm install @js-joda/locale_en-us
```

To enable @js-joda/locale you will only need to require it, requiring it automatically registers the locale extensions in the base `js-joda`.
Importing `@js-joda/locale` (or any prebuilt locale package) also automatically registers the required supplemental CLDR data
(likelySubtags, metaZones, weekData) as a side effect — no manual registration is needed.

Note: the `Locale` class is exported by `@js-joda/locale_<locale>` so in order to use it, you will need to extract it from there.

Since `@js-joda/locale` requires `@js-joda/timezone` it will also need to be provided, as shown
in the following examples

```javascript
const { DateTimeFormatter, ZonedDateTime, ZoneId } = require('@js-joda/core');
require('@js-joda/timezone');
const { Locale } = require('@js-joda/locale');
require('@js-joda/locale_en-us');

const zdt = ZonedDateTime.of(2016, 1, 1, 0, 0, 0, 0, ZoneId.of('Europe/Berlin'));
console.log('en_US formatted string:',
    zdt.format(DateTimeFormatter
            .ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, \'Week \' ww, \'Quarter \' QQQ')
            .withLocale(Locale.US)));
```
this will output `en_US formatted string: Friday January 01 2016 Anno Domini, 12:00:00 AM Central European Time, Week  01, Quarter  Q1`

also see [examples/usage_node.js](examples/usage_node.js) or [examples/usage_node_build.js](examples/usage_node_build.js)

### Node without prebuilt locale packages

It is also possible to not use the prebuilt packages by using `@js-joda/locale` directly.

#### Dependencies

The implementation requires cldr data provided by the [cldr-data](https://github.com/rxaviers/cldr-data-npm) package
and uses [cldrjs](https://github.com/rxaviers/cldrjs) to load the data.
This is necessary to display and parse locale specific data, e.g DayOfWeek or Month Names.

The cldr data is a peer dependency of this package, meaning it must be provided/`npm install`ed by users of `@js-joda/locale`

Since the complete cldr-data package can be quite large, the examples and documentation further below show ways to dynamically
load or reduce the amount of data needed.

The implementation of `@js-joda/locale` also requires `@js-joda/timezone` package e.g. to parse and output timezone names and offsets

When `cldr-data` is installed alongside `@js-joda/locale`, the supplemental data (likelySubtags, metaZones, weekData) is loaded
automatically from `cldr-data` at startup. You only need to additionally register the per-locale files you need using `registerLocaleData`.

#### Example

```shell
    npm install @js-joda/core
    npm install @js-joda/timezone
    npm install cldr-data # peer dependency of @js-joda/locale
    npm install cldrjs # peer dependency of @js-joda/locale
    npm install @js-joda/locale
```

With `cldr-data` installed, you can use any custom Locale supported by the [https://cldr.unicode.org/](https://cldr.unicode.org/) project as shown in the example below.
Find the full list of supported locales here [https://github.com/unicode-org/cldr/tree/main/common/main](https://github.com/unicode-org/cldr/tree/main/common/main)

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

This will output `th_TH formatted string: วันศุกร์ มกราคม 01 2016 คริสต์ศักราช, 12:00:00 ก่อนเที่ยง เวลายุโรปกลาง, Week  01, Quarter  ไตรมาส 1`

### es6

```javascript
import { DateTimeFormatter, ZonedDateTime, ZoneId } from '@js-joda/core';
import '@js-joda/timezone';
const { Locale } = require('@js-joda/locale');
require('@js-joda/locale_en-us');

const zdt = ZonedDateTime.of(2016, 1, 1, 0, 0, 0, 0, ZoneId.of('Europe/Berlin'));
console.log('en_US formatted string:', zdt.format(DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, \'Week \' ww, \'Quarter \' QQQ').withLocale(Locale.US)));
```

also see the [example](examples/usage_es6.mjs)

### Browser

Load `@js-joda/core`, `@js-joda/timezone`, and `@js-joda/locale` via `<script>` tags (UMD/IIFE builds).
`@js-joda/locale` automatically registers the supplemental CLDR data (likelySubtags, metaZones, weekData) as a side effect.
Then load the prebuilt locale packages for the locales you need — each one registers its per-locale CLDR data.

```html
<script src="node_modules/@js-joda/core/dist/js-joda.js"></script>
<script src="node_modules/@js-joda/timezone/dist/js-joda-timezone.js"></script>
<script src="node_modules/@js-joda/locale/dist/js-joda-locale.min.js"></script>
<!-- Load prebuilt locale packages for the locales you need -->
<script src="node_modules/@js-joda/locale_en/dist/index.min.js"></script>
<script src="node_modules/@js-joda/locale_de/dist/index.min.js"></script>
```

see the [browser example](examples/usage_browser.html) and [custom build example](examples/usage_browser_build.html)

### Bundling with rollup, minimizing package size

[rollup-examples.config.js](rollup-examples.config.js) is a good starting point to see how we bundle packages
and minimize package size with rollup. It shows how to build a self-contained bundle that includes only the
locale data you need by importing specific prebuilt locale packages.

## Implementation details

provides methods for the following pattern letters of the [DateTimeFormatterBuilder](https://js-joda.github.io/js-joda/esdoc/class/src/format/DateTimeFormatterBuilder.js~DateTimeFormatterBuilder.html#instance-method-appendPattern~DateTimeFormatter.html#static-method-ofPattern)
and [DateTimeFormatter](https://js-joda.github.io/js-joda/esdoc/class/src/format/DateTimeFormatter.js~DateTimeFormatter.html#static-method-ofPattern)
classes of js-joda

Localized Text
- `a` for am/pm of day
- `G` for era
- `q`/`Q` for localized quarter of year

Zone Text
- `z` for time zone name
- `Z` for localized ZoneOffsets
- `O` for localized ZoneOffsets

Week Information
- `w` for week-of-year
- `W` for week-of-month
- `Y` for week-based-year
- `e` for localized day-of-week
- `c` for localized day-of-week

some of these are only partially localized, e.g. `Q` only if three or more `Q` are used, one or two `Q` also
work with plain `@js-joda/core` without using `@js-joda/locale`

## License

* @js-joda/locale is released under the [BSD 3-clause license](LICENSE)
* The author of joda time and the lead architect of the JSR-310 is Stephen Colebourne.

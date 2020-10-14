# @js-joda/locale

# additional date-time classes that complement those in js-joda

[![npm version](https://badge.fury.io/js/%40js-joda%2Flocale.svg)](https://badge.fury.io/js/%40js-joda%2Flocale)
[![Travis Build Status](https://travis-ci.org/js-joda/js-joda.svg)](https://travis-ci.org/js-joda/js-joda)
[![Sauce Test Status](https://saucelabs.com/buildstatus/js-joda)](https://saucelabs.com/u/js-joda)
[![Coverage Status](https://coveralls.io/repos/js-joda/js-joda/badge.svg?branch=master&service=github)](https://coveralls.io/github/js-joda/js-joda?branch=master)
[![Tested node version](https://img.shields.io/badge/tested_with-current_node_LTS-blue.svg?style=flat)]()
[![Sauce Test Status](https://saucelabs.com/browser-matrix/js-joda.svg)](https://saucelabs.com/u/js-joda)

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
- [de (i.e. de-*)](https://www.npmjs.com/package/@js-joda/locale_de)
- [de-DE](https://www.npmjs.com/package/@js-joda/locale_de-de)
- [en (i.e. en-*)](https://www.npmjs.com/package/@js-joda/locale_en)
- [en-US](https://www.npmjs.com/package/@js-joda/locale_en-us)
- [es (i.e. es-*)](https://www.npmjs.com/package/@js-joda/locale_es)
- [fr (i.e. fr-*)](https://www.npmjs.com/package/@js-joda/locale_fr)
- [fr-FR](https://www.npmjs.com/package/@js-joda/locale_fr-fr)
- [hi (i.e. hi-*)](https://www.npmjs.com/package/@js-joda/locale_hi)
- [it (i.e. it-*)](https://www.npmjs.com/package/@js-joda/locale_it)
- [it-IT](https://www.npmjs.com/package/@js-joda/locale_it-it)
- [sv (i.e. sv-*)](https://www.npmjs.com/package/@js-joda/locale_sv)
- [sv-SE](https://www.npmjs.com/package/@js-joda/locale_sv-se)
- [zh (i.e. zh-*)](https://www.npmjs.com/package/@js-joda/locale_zh)

this list could be extended relatively easily if needed, as long as data is available in cldr-data

with these packages, no further steps are needed to build the cldr-data.

### Without prebuilt locale packages

It is also possible to not use the prebuilt packages. 
This results in a more complex setup, but also more control over the complete process. 

#### Dependencies

The implementation requires cldr data provided by the [cldr-data](https://github.com/rxaviers/cldr-data-npm) package 
and uses [cldrjs](https://github.com/rxaviers/cldrjs) to load the data.
This is necessary to display and parse locale specific data, e.g DayOfWeek or Month Names.

The cldr data is a peer dependency of this package, meaning it must be provided/`npm install`ed by users of `@js-joda/locale`

Since the complete cldr-data package can be quite large, the examples and documentation below show ways to dynamically
load or reduce the amount of data needed.

The implementation of `@js-joda/locale` also requires `js-joda-timezone` package e.g. to parse and output timezone names and offsets

### Node

Install joda using npm

```shell
    npm install @js-joda/core
    npm install @js-joda/timezone
    npm install cldr-data
    npm install cldrjs
    npm install @js-joda/locale
```

To enable js-joda-locale you will only need to require it, requiring it automatically registers the locale extensions in the base `js-joda`
Note: the `Locale` class is exported by `@js-joda/locale` so in order to use it, you will need to extract it from there.

```javascript
require('@js-joda/locale_<locale>')
```
since `js-joda-locale` requires `js-joda-timezone` it will also need to be provided, as shown 
in the following examples

### es5

```javascript
const {
    DateTimeFormatter,
    ZonedDateTime,
    ZoneId,
} = require('@js-joda/core');
require('@js-joda/timezone');

const {
    Locale,
} = require('@js-joda/locale_en-us');

var zdt = ZonedDateTime.of(2016, 1, 1, 0, 0, 0, 0, ZoneId.of('Europe/Berlin'));
console.log('en_US formatted string:', zdt.format(DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, \'Week \' ww, \'Quarter \' QQQ').withLocale(Locale.US)));
```
this will output `en_US formatted string: Friday January 01 2016 Anno Domini, 12:00:00 AM Central European Time, Week  01, Quarter  Q1`

also see [examples/usage_node.js](examples/usage_node.js) or [examples/usage_node_build.js](examples/usage_node_build.js) 

### es6

```ecmascript 6
import { DateTimeFormatter, ZonedDateTime, ZoneId } from '@js-joda/core';
import '@js-joda/timezone';
import { Locale } from '.@js-joda/locale_en-us';

const zdt = ZonedDateTime.of(2016, 1, 1, 0, 0, 0, 0, ZoneId.of('Europe/Berlin'));
console.log('en_US formatted string:', zdt.format(DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, \'Week \' ww, \'Quarter \' QQQ').withLocale(Locale.US)));
```

also see the [example](examples/usage_es6.js)

### using prebuilt locale files from core `@js-joda/locale`

If you prefer to download `@js-joda/locale` as a single dependency (albeit a rather large one in terms of download size), all prebuilt locale packages are also included.
You still need to load the separate locale packages, this can be done e.g. 
```javascript
require('@js-joda/locale/dist/prebuilt/en-us');
```

### Browser
- using requirejs to load
- might also be possible with the bower version of cldr-data
 
see the [example](examples/usage_browser.html)

### Packaging with webpack, minimizing package size
 
Since the cldr-data files can still be quite large, it is possible to only load the files needed for your application

Also possible would be to use webpack to reduce the overall size of the cldr-data (similar approaches should work with 
different packaging tools than webpack). 

So the following tips are just one way to get the general idea on how to reduce the size of needed cldr-data, we use this
for our karma testing setup in [karma.conf.js](karma.conf.js) and to build the prebuilt locale packages

In `package.json` file define which parts of cldr-data to download and install

(for more information see the [cldr-data-npm docs](https://github.com/rxaviers/cldr-data-npm#locale-coverage))
```
...
"cldr-data-coverage": "core",
"cldr-data-urls-filter": "(cldr-core|cldr-numbers-modern|cldr-dates-modern)"
...
```
(data-coverage `core` only downloads data for the most popular languages / locales, while the urls-filter defines 
which parts of cldr-data are required for `js-joda-locale` to work)

In e.g. webpack.config.js, define which parts/locales of the cldr-data files should end up in the final package

You can for example use the `null-loader` to disable loading cldr-data except for the absolutely required parts/locales

```js
use: [{ loader: 'null-loader' }],
resource: {
    // don't load everything in cldr-data
    test: path.resolve(__dirname, 'node_modules/cldr-data'),
    // except the actual data we need (supplemental and de, en, fr locales from main)
    exclude: [
        path.resolve(__dirname, 'node_modules/cldr-data/main/de'),
        path.resolve(__dirname, 'node_modules/cldr-data/main/en'),
        path.resolve(__dirname, 'node_modules/cldr-data/main/fr'),
        path.resolve(__dirname, 'node_modules/cldr-data/supplemental'),
    ],
}
``` 
or (as we do for our prebuilt packages) use the CldrDataIgnorePlugin, provided in `utils/CldrDataIgnorePlugin.js`
```json
    "plugins": [
        new CldrDataIgnorePlugin(modulesDir, locales)),
    ]

```
where modulesDir is the absolute path to `node_modules` and `locales` is an array of locales to use as they can be defined 
for the prebuilt packages. This will only load the absolutely required files for js-joda-locale, it is what we use internally
for the prebuilt packages and to build packages for our karma tests as well.

Depending on your usecase it might also be necessary to define a  "faked" cldr-data module that loads 
the cldr-data files, this is necessary at least if the code needs to run in the browser since the 
cldr-data load uses modules not available in browser (e.g. `fs`)

```js
    // add cldr-data load workaround
    resolve = {
        alias: {
            'cldr-data$': path.resolve(__dirname, 'test/utils/karma_cldrData.js'),
        }
    };

``` 

These should be the minimum required parts for js-joda-locale 

see the [karma.conf.js](karma.conf.js)

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
work with plain `js-joda` without using `js-joda-locale`

## License

* js-joda-locale is released under the [BSD 3-clause license](LICENSE)
* The author of joda time and the lead architect of the JSR-310 is Stephen Colebourne.


# Using locale package

## Motivation

Implementation of locale specific functionality for js-joda, providing function not implemented in js-joda core

Especially this implements patterns elements to print and parse locale specific dates.

## Node

In a node environment, the best choice is to install `@js-joda/locale` and 
the cldr data `cldr-data` separately. With that you have support for all locales defined in the cldr project.
The timezone package is required as soon as timezone locales come into play.

```shell
    npm install @js-joda/core
    npm install @js-joda/timezone
    npm install cldr-data
    npm install cldrjs
    npm install @js-joda/locale
```

## Browser

In a browser environment, to save space, the better choice is to install one of the pre-built packages
for a certain language. 
The pre-built packages contain the implementation and all cldr data required for that specific locale.

For more information check the [README.md](https://github.com/js-joda/js-joda/blob/main/packages/locale/README.md)
in the locale package.

```shell
    npm install @js-joda/locale_en
    npm install @js-joda/timezone
```

## Usage

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
console.log('en_US formatted string:', 
    zdt.format(
        DateTimeFormatter
            .ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, \'Week \' ww, \'Quarter \' QQQ')
            .withLocale(Locale.US)));
```

this will output `en_US formatted string: Friday January 01 2016 Anno Domini, 12:00:00 AM Central European Time, Week  01, Quarter  Q1`

## Links

For more information check the [README.md](https://github.com/js-joda/js-joda/blob/main/packages/locale/README.md)
in the locale package.

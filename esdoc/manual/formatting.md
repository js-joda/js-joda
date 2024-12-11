# Formatting / Parsing

## Formatting

To format a date and/or time, create a [`DateTimeFormatter`](https://js-joda.github.io/js-joda/class/packages/core/src/format/DateTimeFormatter.js~DateTimeFormatter.html) and pass it to the `.format` method of a `LocalDate`, `LocalTime`, `LocalDateTime`, or `ZonedDateTime` instance.

js-joda built-in DateTimeFormatter parses and formats dates and times from /to ISO 8601 as specified in RFC 3339.


```javascript
const d = LocalDateTime.parse('2018-04-28T12:34')

d.format(DateTimeFormatter.ofPattern('M/d/yyyy')) // 4/28/2018
d.format(DateTimeFormatter.ofPattern('HH:mm')) // 12:34
```

### Formatting with locales

Non-numeric date and time formats need to know what language to use, for things like names of months and days of the week. For example, the format `eeee (d MMMM)` might return `Saturday (28 April)` in English, and `samedi (28 avril)` in French. If you try to use a locale-dependent format pattern without specifying the locale, you'll get this error message: 

```
ERROR: Pattern using (localized) text not implemented, use @js-joda/locale plugin!
```

To specify a locale, you'll need to import the [`@js-joda/timezone`](//github.com/js-joda/js-joda/tree/main/packages/timezone) and [`@js-joda/locale`](//github.com/js-joda/js-joda/tree/main/packages/locale) plugins. The simplest way to use `@js-joda/locale` is to install one of the locale-specific builds from npm:

- [@js-joda/locale_de](https://www.npmjs.com/package/@js-joda/locale_de)
- [@js-joda/locale_de-de](https://www.npmjs.com/package/@js-joda/locale_de-de)
- [@js-joda/locale_en](https://www.npmjs.com/package/@js-joda/locale_en)
- [@js-joda/locale_en-us](https://www.npmjs.com/package/@js-joda/locale_en-us)
- [@js-joda/locale_es](https://www.npmjs.com/package/@js-joda/locale_es)
- [@js-joda/locale_fi](https://www.npmjs.com/package/@js-joda/locale_fi)
- [@js-joda/locale_fi-fi](https://www.npmjs.com/package/@js-joda/locale_fi-fi)
- [@js-joda/locale_fr](https://www.npmjs.com/package/@js-joda/locale_fr)
- [@js-joda/locale_hi](https://www.npmjs.com/package/@js-joda/locale_hi)
- [@js-joda/locale_it](https://www.npmjs.com/package/@js-joda/locale_it)
- [@js-joda/locale_it-it](https://www.npmjs.com/package/@js-joda/locale_it-it)
- [@js-joda/locale_zh](https://www.npmjs.com/package/@js-joda/locale_zh)

You can then use localized format strings as follows.

```javascript
import '@js-joda/timezone' // Just needs to be imported; registers itself automatically
import { Locale } from '@js-joda/locale_fr' // Get `Locale` from the prebuilt package of your choice
import { DateTimeFormatter, LocalDateTime } from 'js-joda'

const d = LocalDateTime.parse('2018-04-28T12:34')
const formatter = DateTimeFormatter
  .ofPattern('eeee (d MMMM)')
  .withLocale(Locale.FRANCE)
d.format(formatter) // samedi (28 avril)
```

**Note:** If internationalization is an important aspect of your application, you might consider using the standard [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) API instead. It is built into modern browsers, supports a comprehensive set of locales, and handles a lot of internationalization subtleties that go beyond the scope of this library. To do this, you would need to convert your `js-joda` dates and times to JavaScript `Date` objects just before outputting them:

```javascript
const ldt = LocalDateTime.parse('2018-04-28T12:34')

const jsDate = convert(ldt).toDate() // Convert to JavaScript `Date` object

var options = { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric', 
  hour: 'numeric', 
  minute: '2-digit' 
}

jsDate.toLocaleDateString('en-US', options) // Saturday, April 28, 2018, 12:34 PM 
jsDate.toLocaleDateString('de-DE', options) // Samstag, 28. April 2018, 12:34
jsDate.toLocaleDateString('ar-EG', options) // السبت، ٢٨ أبريل ٢٠١٨ ١٢:٣٤ م
jsDate.toLocaleDateString('ko-KR', options) // 2018년 4월 28일 토요일 오후 12:34
```


### Format patterns


Date and time formats are based on the pattern strings from [Java SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html), though js-joda uses more symbols and it interprets a few symbols differently.

| Symbol | Meaning                    | Presentation | Examples                                       |
| ------ | -------------------------- | ------------ | ---------------------------------------------- |
| G      | era                        | number/text  | 1; 01; AD; Anno Domini                         |
| u      | year                       | year         | 2004; 04                                       |
| y      | year-of-era                | year         | 2004; 04                                       |
| D      | day-of-year                | number       | 189                                            |
| M      | month-of-year              | number/text  | 7; 07; Jul; July; J                            |
| d      | day-of-month               | number       | 10                                             |
| Q      | quarter-of-year            | number/text  | 3; 03; Q3; 3rd quarter; 3                      |
| Y      | week-based-year            | year         | 1996; 96                                       |
| w      | week-of-year               | number       | 27                                             |
| W      | week-of-month              | number       | 27                                             |
| e      | localized day-of-week      | number       | 2; Tue; Tuesday; T                             |
| E      | day-of-week                | number/text  | 2; Tue; Tuesday; T                             |
| F      | week-of-month              | number       | 3                                              |
| a      | am-pm-of-day               | text         | PM                                             |
| h      | clock-hour-of-am-pm (1-12) | number       | 12                                             |
| K      | hour-of-am-pm (0-11)       | number       | 0                                              |
| k      | clock-hour-of-am-pm (1-24) | number       | 0                                              |
| H      | hour-of-day (0-23)         | number       | 0                                              |
| m      | minute-of-hour             | number       | 30                                             |
| s      | second-of-minute           | number       | 55                                             |
| S      | fraction-of-second         | fraction     | 978                                            |
| A      | milli-of-day               | number       | 1234                                           |
| n      | nano-of-second             | number       | 987654321                                      |
| N      | nano-of-day                | number       | 1234000000                                     |
| V      | time-zone ID               | zone-id      | America/Los_Angeles; Z; -08:30                 |
| z      | time-zone name             | zone-name    | Pacific Standard Time; PST                     |
| X      | zone-offset 'Z' for zero   | offset-X     | Z; -08; -0830; -08:30; -083015; -08:30:15;     |
| x      | zone-offset                | offset-x     | +0000; -08; -0830; -08:30; -083015; -08:30:15; |
| Z      | zone-offset                | offset-Z     | +0000; -0800; -08:00;                          |
| p      | pad next                   | pad modifier | 1                                              |
| '      | escape for text            | delimiter    |
| ''     | single quote               | literal      | '                                              |
| [      | optional section start     |              |
| ]      | optional section end       |              |
| {}     | reserved for future use    |              |

#### Differences with SimpleDateFormat

- `u` is for year in js-joda, whereas SimpleDateFormat uses `u` for day number of week (1 to 7).
- `E` and `EE` have a numeric presentation in js-joda while the have a string presentation in SimpleDateFormat.
- Pattern `EEEEE` produces the initial for the day of the week in js-joda, while it produces the full name in SimpleDateFormat.
- Pattern `MMMMM` produces the initial for the month of the year in js-joda, while it produces the full name in SimpleDateFormat.
- Long patterns of presentation type _string_ throw `IllegalArgumentException` in js-joda but are supported in SimpleDateFormat. These include 6 or more `E` (for day), 6 or more `M` (for month), 3 or more `s` (for seconds), 3 or more `H` (for hour), etc.

#### Examples of differences

| Pattern | js-joda  | SimpleDateFormat |
| ------- | -------- | ---------------- |
| E       | 2        | Tue              |
| EE      | 02       | Tue              |
| EEE     | Tue      | Tue              |
| EEEE    | Tuesday  | Tuesday          |
| EEEEE   | T        | Tuesday          |
| EEEEEE  | _throws_ | Tuesday          |
| M       | 7        | 7                |
| MM      | 02       | 07               |
| MMM     | Jul      | Jul              |
| MMMM    | July     | July             |
| MMMMM   | J        | July             |
| MMMMMM  | _throws_ | July             |
| s       | 9        | 9                |
| ss      | 09       | 09               |
| sss     | _throws_ | 09               |
| H       | 20       | 20               |
| HH      | 20       | 20               |
| HHH     | _throws_ | 20               |

## Parsing

Parsing is similar to formatting, the same DateTimeFormatter pattern are used as for formatting.

Customized parser can be build with the `DateTimeFormatter`.

### Simple parser example

```javascript
import { DateTimeFormatter, LocalDate } from '@js-joda/core';

const formatter = DateTimeFormatter.ofPattern('M/d/yyyy');
const date = LocalDate.parse('4/28/2018', formatter);
console.log(date.toString()); // 2018-04-28
```

### http date parser example

Example for an HTTP dates formatter as specified in RFC 7321, 
like returned by javascript native `Date` `toUTCString` method.

This formatter requires the `@js-joda/locale` package.
This formatter is built-in since @js-joda/locale@4.2.0 -> RFC_1123_DATE_TIME

```javascript
import { DateTimeFormatter, ZonedDateTime } from '@js-joda/core';
import '@js-joda/timezone'
import { Locale } from '@js-joda/locale';

const df = DateTimeFormatter.ofPattern('EEE, dd MMM yyyy HH:mm:ss z').withLocale(Locale.ENGLISH);
const z = ZonedDateTime.parse('Tue, 05 Oct 2021 17:08:24 GMT', df);
console.log(z.toString()); // 2021-10-05T17:08:24+01:00[GMT]
```

## Built-in DateTimeFormatter

| Formatter             | Example                                   |
| --------------------- |------------------------------------------ |
| ISO_LOCAL_DATE        |  '2011-12-03' |
| ISO_LOCAL_TIME        | '10:15:30' |
| ISO_LOCAL_DATE_TIME   | '2011-12-03T10:15:30' |
| ISO_INSTANT           | '2011-12-03T10:15:30Z' |
| ISO_OFFSET_DATE_TIME  | '2011-12-03T10:15:30+01:00' |
| ISO_ZONED_DATE_TIME   | '2011-12-03T10:15:30+01:00[Europe/Paris]' |
| BASIC_ISO_DATE        | '20111203' |
| ISO_OFFSET_DATE       | '2011-12-03+01:00' |
| ISO_OFFSET_TIME       | '10:15:30+01:00' |
| ISO_ORDINAL_DATE      | '2012-337' |   
| ISO_WEEK_DATE         | '2012-W48-6' |
| ISO_DATE              | '2011-12-03+01:00', '2011-12-03' |
| ISO_TIME              | '10:15:30+01:00', '10:15:30' |
| ISO_DATE_TIME         | '2011-12-03T10:15:30+01:00' |
| RFC_1123_DATE_TIME    | 'Tue, 05 Oct 2021 17:08:24 GMT'<br />requires @js-joda/locale |

Usage example for a built-in DateTimeFormatter

````javascript
const localDate = LocalDate.parse('2012-12-12', DateTimeFormatter.ISO_LOCAL_DATE);
const dateAsString = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
````

## Hint

Whenever you stumble over a `Cannot read property 'localeString' of null` error, 
its probably because the locale of the formatter is not set. 

In that case add the `@js-joda/locale` package to your project and set the locale
of the formatter, eg `DateTimeFormatter.ofPattern('eeee (d MMMM)').withLocale(Locale.FRANCE)`.

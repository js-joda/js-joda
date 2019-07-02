# Formatting

To format a date and/or time, create a [`DateTimeFormatter`](../../class/src/format/DateTimeFormatter.js~DateTimeFormatter.html) and pass it to the `.format` method of a `LocalDate`, `LocalTime`, `LocalDateTime`, or `ZonedDateTime` instance.

```javascript
const d = LocalDateTime.parse('2018-04-28T12:34')

d.format(DateTimeFormatter.ofPattern('M/d/yyyy')) // 4/28/2018
d.format(DateTimeFormatter.ofPattern('HH:mm')) // 12:34
```

## Formatting with locales

Non-numeric date and time formats need to know what language to use, for things like names of months and days of the week. For example, the format `eeee (d MMMM)` might return `Saturday (28 April)` in English, and `samedi (28 avril)` in French. If you try to use a locale-dependent format pattern without specifying the locale, you'll get this error message: 

```
ERROR: Pattern using (localized) text not implemented, use js-joda-locale plugin!
```

To specify a locale, you'll need to import the [`js-joda-timezone`](/js-joda/js-joda-timezone) and [`js-joda-locale`](/js-joda/js-joda-locale) plugins. The simplest way to use `js-joda-locale` is to install one of the locale-specific builds from npm:

- [@js-joda/locale_de](https://www.npmjs.com/package/@js-joda/locale_de)
- [@js-joda/locale_de-de](https://www.npmjs.com/package/@js-joda/locale_de-de)
- [@js-joda/locale_en](https://www.npmjs.com/package/@js-joda/locale_en)
- [@js-joda/locale_en-us](https://www.npmjs.com/package/@js-joda/locale_en-us)
- [@js-joda/locale_es](https://www.npmjs.com/package/@js-joda/locale_es)
- [@js-joda/locale_fr](https://www.npmjs.com/package/@js-joda/locale_fr)
- [@js-joda/locale_hi](https://www.npmjs.com/package/@js-joda/locale_hi)
- [@js-joda/locale_it](https://www.npmjs.com/package/@js-joda/locale_it)
- [@js-joda/locale_it-it](https://www.npmjs.com/package/@js-joda/locale_it-it)
- [@js-joda/locale_zh](https://www.npmjs.com/package/@js-joda/locale_zh)

You can then use localized format strings as follows.

```javascript
import 'js-joda-timezone' // Just needs to be imported; registers itself automatically
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


## Format patterns


Date and time formats are specified by date and time pattern strings using [Java SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html) codes.

| Symbol | Meaning                    | Presentation | Examples                                       |
| ------ | -------------------------- | ------------ | ---------------------------------------------- |
| G      | era                        | number/text  | 1; 01; AD; Anno Domini                         |
| u      | year                       | year         | 2004; 04                                       |
| y      | year-of-era                | year         | 2004; 04                                       |
| D      | day-of-year                | number       | 189                                            |
| M      | month-of-year              | number/text  | 7; 07; Jul; July; J                            |
| d      | day-of-month               | number       | 10                                             |
| Q      | quarter-of-year            | number/text  | 3; 03; Q3                                      |
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

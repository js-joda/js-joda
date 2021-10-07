# Parsing

Parsing is similar to formatting, the same DateTimeFormatter pattern are used as for formatting.

Check [Formatting page](./formatting.html) for a list of available patterns

js-joda build-in DateTimeFormatter parses and formats dates and times from /to ISO 8601 as specified in RFC 3339.

Customized parser can be build with the `DateTimeFormatter`.

## Simple parser example

```javascript
import { DateTimeFormatter, LocalDate } from '@js-joda/core';

const formatter = DateTimeFormatter.ofPattern('M/d/yyyy');
const date = LocalDate.parse('4/28/2018');
console.log(date.toString()); // 2018-04-28
```

## http date parser example

HTTP dates as specified in RFC 7321 and return by javascript native `Date` `toUTCString` method, 
requires the local package.

```javascript
import { DateTimeFormatter, ZonedDateTime } from '@js-joda/core';
import '@js-joda/timezone'
import { Locale } from '@js-joda/locale';

const df = DateTimeFormatter.ofPattern('EEE, dd MMM yyyy HH:mm:ss z').withLocale(Locale.ENGLISH);
const z = ZonedDateTime.parse('Tue, 05 Oct 2021 17:08:24 GMT', df);
console.log(z.toString()); // 2021-10-05T17:08:24+01:00[GMT]
```

## Hint

Whenever you stumble over a `Cannot read property 'localeString' of null` error, its probably because
the local for formatter is not set.
In that case add the locale package to your project and set the locale
for the formatter, eg `DateTimeFormatter.ofPattern('eeee (d MMMM)').withLocale(Locale.FRANCE)`.

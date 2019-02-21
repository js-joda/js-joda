# LocalDateTime

A LocalDateTime represents a date-time with **no time zone** in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) calendar system, such as '2007-12-03T10:15:30'.

### Create a `LocalDateTime` instance

```javascript
// obtain the current date and time in the system default time zone, e.g. '2016-02-26T10:29:05.743'
LocalDateTime.now();

// obtain the current date and time in the UTC time zone
LocalDateTime.now(ZoneOffset.UTC);

// obtain an instance of LocalDateTime from an ISO 8601 formatted text string
LocalDateTime.parse("2016-02-26T09:42"); // '2016-02-26T09:42'
LocalDateTime.parse("2016-02-26T09:42:42.123"); // '2016-02-26T09:42:42.123'

// obtain an instance of LocalDateTime from year, month, dayOfMonth, hour, minute, second and nanosecond values
LocalDateTime.of(2016, 2, 29); // '2016-02-29T00:00'
LocalDateTime.of(2016, 2, 29, 12, 55, 42); // '2016-02-29T12:55:42'
LocalDateTime.of(2016, 2, 29, 12, 55, 42, 9); // '2016-02-29T12:55:42.000000009'

// obtain an instance of LocalDateTime from epoch seconds and a ZoneOffset
LocalDateTime.ofEpochSecond(0, ZoneOffset.UTC); // '1970-01-01T00:00'
LocalDateTime.ofInstant(Instant.now()); // current local date-time
LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC); // current local UTC date-time
```

### Get values from `LocalDateTime`

```javascript
var dt = LocalDateTime.parse("2016-02-26T23:55:42.123");

dt.toString(); // '2016-02-26T23:55:42.123' ISO 8601 format

dt.year(); // 2016
dt.month(); // Month.FEBRUARY
dt.monthValue(); // 2
dt.dayOfMonth(); // 26
dt.hour(); // 23
dt.minute(); // 55
dt.second(); // 42
dt.nano(); // 123000000

dt.dayOfWeek(); // DayOfWeek.FRIDAY
dt.dayOfWeek().value(); // 5
dt.dayOfYear(); // 57

dt.toLocalDate().isLeapYear(); // true 2016 is a leap year

// obtain the date and time components of the LocalDateTime
dt.toLocalDate();
dt.toLocalTime();

// get range of month
dt.toLocalDate().lengthOfMonth(); // 29
dt.range(ChronoField.DAY_OF_MONTH); // ValueRange(1 - 29)

// get range of year
dt.toLocalDate().lengthOfYear(); // 366
dt.range(ChronoField.DAY_OF_YEAR); // ValueRange(1 - 366)

// get other date-based fields like the aligned week of year
dt.get(ChronoField.ALIGNED_WEEK_OF_YEAR); // 9

// get week of week-based year
dt.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR); // 8
dt.toLocalDate().isoWeekOfWeekyear();

// get other time-based fields
dt.get(ChronoField.SECOND_OF_DAY); // 86142
dt.get(ChronoField.MILLI_OF_SECOND); // 123
dt.get(ChronoField.HOUR_OF_AMPM); // 11
// any other date or time-based ChronoField can be passed to `get`
```

### Adding to and subtracting from a `LocalDateTime` instance

```javascript
var dt = LocalDateTime.parse("2016-02-26T23:55:42.123");

// add/subtract 366 days
dt.plusDays(366); // '2017-02-26T23:55:42.123'
dt.minusDays(366); // '2015-02-25T23:55:42.123'

// add/subtract 12 months
dt.plusMonths(12); // '2017-02-26'
dt.minusMonths(12); // '2015-02-26'

// add/subtract 4 weeks
dt.plusWeeks(4); // '2016-03-25T23:55:42.123'
dt.minusWeeks(4); // '2016-01-29T23:55:42.123'

// add/subtract 1 year to the parsed LocalDate and returns a new instance
dt.plusYears(1); // '2017-02-26T23:55:42.123'
dt.minusYears(1); // '2015-02-26T23:55:42.123'

// add/subtract 30 years
dt.plus(3, ChronoUnit.DECADES); // '2046-02-26T23:55:42.123'
dt.minus(3, ChronoUnit.DECADES); // '1986-02-26T23:55:42.123'

// add subtract a Period of 3 Months and 3 Days
dt.plus(Period.ofMonths(3).plusDays(3)); // '2016-05-29T23:55:42.123'
dt.minus(Period.ofMonths(3).plusDays(3)); // '2015-11-23T23:55:42.123'

// add/subtract 12 hours
dt.plusHours(12); // '2016-02-27T11:55:42.123'
dt.minusHours(12); // '2016-02-26T11:55:42.123'

// add/subtract 30 minutes
dt.plusMinutes(30); // '2016-02-27T00:25:42.123'
dt.minusMinutes(30); // '2016-02-26T23:25:42.123'

// add/subtract 30 seconds
dt.plusSeconds(30); // '2016-02-26T23:56:12.123'
dt.minusSeconds(30); // '2016-02-26T23:55:12.123'

// add/subtract 1 million nanoseconds (1 millisecond)
dt.plusNanos(1000000); // '2016-02-26T23:55:42.124'
dt.minusNanos(1000000); // '2016-02-26T23:55:42.122'

// add/subtract a time-based unit
dt.plus(1, ChronoUnit.MILLIS); // '2016-02-26T23:55:42.124'
dt.plus(1, ChronoUnit.HALF_DAYS); // '2016-02-26T11:55:42.123'

// add/subtract a duration of 30 hours and 45 minutes
dt.plus(Duration.ofHours(30).plusMinutes(45)); // '2016-02-28T06:40:42.123'
dt.minus(Duration.ofHours(30).plusMinutes(45)); // '2016-02-25T17:10:42.123'
```

### Alter specific fields of a `LocalDateTime` instance

```javascript
var dt = LocalDateTime.parse("2016-02-26T23:55:42.123");

// set the hour of day to 1
dt.withHour(1); // '2016-02-26T01:55:42.123'

// set the minute of hour to 1
dt.withMinute(1); // '2016-02-26T23:01:42.123'

// set the second of minute to 1
dt.withSecond(1); // '2016-02-26T23:55:01.123'

// set the nanosecond of second to 1
dt.withNano(0); // '2016-02-26T23:55:42'

// set the millisecond of second to 51
dt.with(ChronoField.MILLI_OF_SECOND, 51); // '2016-02-26T23:55:42.051'

// set by a custom TemporalAdjuster that adjusts to the next even second
var nextEvenSecond = {
  adjustInto: function(t) {
    return t.second() % 2 === 0 ? t.plusSeconds(2) : t.plusSeconds(1);
  }
};
dt.with(nextEvenSecond); // '2016-02-26T23:55:44.123'
dt.plusSeconds(1).with(nextEvenSecond); // '2016-02-26T23:55:44.123'
```

### Truncate a `LocalDateTime` instance

```javascript
var dt = LocalDateTime.parse("2016-02-26T23:55:42.123");

dt.truncatedTo(ChronoUnit.SECONDS); // '2016-02-26T23:55:42'
dt.truncatedTo(ChronoUnit.MINUTES); // '2016-02-26T23:55:00'
dt.truncatedTo(ChronoUnit.HOURS); // '2016-02-26T23:00'
dt.truncatedTo(ChronoUnit.HALF_DAYS); // '2016-02-26T12:00'
dt.truncatedTo(ChronoUnit.DAYS); // '2016-02-26T00:00'
```

### Compare `LocalDateTime` instances

```javascript
var dt1 = LocalDateTime.parse("2016-02-26T23:55:42.123");
var dt2 = dt1.plusHours(2);

dt1.isAfter(dt2); // false
dt1.isBefore(dt2); // true

dt1.equals(dt1.plusHours(0)); // true
dt1.equals(dt1.plusHours(1)); // false

dt1.compareTo(dt1) === 0; // true
dt1.compareTo(dt2) < 0; // true
dt2.compareTo(dt1) > 0; // true

// Warn! hashCode is equal if in instances are equal, but might be equal for unequal instances as well
dt1.hashCode(); // -2036645668
dt2.hashCode(); // 1459191821
dt1.hashCode() !== dt2.hashCode(); // true
```

### Distance between two `LocalDateTime` instances

```javascript
var dt1 = LocalDateTime.parse("2016-02-26T23:55:42.123");
var dt2 = dt1
  .plusYears(6)
  .plusMonths(12)
  .plusHours(2)
  .plusMinutes(42)
  .plusSeconds(12);

// obtain the duration between the two dates
dt1.until(dt2, ChronoUnit.YEARS); // 7
dt1.until(dt2, ChronoUnit.MONTHS); // 84
dt1.until(dt2, ChronoUnit.WEEKS); // 356
dt1.until(dt2, ChronoUnit.DAYS); // 2557
dt1.until(dt2, ChronoUnit.HOURS); // 61370
dt1.until(dt2, ChronoUnit.MINUTES); // 3682242
dt1.until(dt2, ChronoUnit.SECONDS); // 220934532
```

### Convert from a `moment` or JavaScript `Date`

```javascript
// obtain a LocalDateTime instance from a JavaScript Date

// the manual way
var t = LocalDateTime.ofInstant(Instant.ofEpochMilli(new Date().getTime()));
// the recommended way with the JavaScript temporal
t = LocalDateTime.from(nativeJs(new Date()));
// converting from a moment works the same way
d = LocalDateTime.from(nativeJs(moment()));
```

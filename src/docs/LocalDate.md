# LocalDate

A `LocalDate` represents a date with **no time** and **no time zone** in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) calendar system, such as 2007-12-24.

### Create a `LocalDate`

```javascript
// obtain the current date in the system default time zone, e.g. 2016-02-23
LocalDate.now();

// obtain the current date in the UTC time zone, e.g. 2016-02-23
LocalDate.now(ZoneOffset.UTC);

// obtain an instance of LocalDate from an ISO 8601 formatted text string
LocalDate.parse("2016-02-23");

// obtain an instance of LocalDate from a year, month, and dayOfMonth value
LocalDate.of(2016, 2, 23); // 2016-02-23

// obtain an instance of LocalDate from a year, month, and dayOfMonth value
LocalDate.of(2016, Month.FEBRUARY, 23); // 2016-02-23

// obtain an instance of LocalDate from an epochDay where day 0 is 1970-01-01
LocalDate.ofEpochDay(-1); // 1969-12-31

// obtain an instance of LocalDate from an epochDay where day 0 is 1970-01-01
LocalDate.ofYearDay(2016, 42); // 2016-02-11
```

### Get values from `LocalDate`

```javascript
var d = LocalDate.parse("2016-12-24");

d.toString(); // '2016-12-24' ISO 8601 format

d.dayOfMonth(); // 24
d.month(); // Month.DECEMBER
d.monthValue(); // 12
d.year(); // 2016

d.dayOfWeek(); // DayOfWeek.SATURDAY
d.dayOfWeek().value(); // 6
d.dayOfYear(); // 359

d.isLeapYear(); // true - 2016 is a leap year
d.plusYears(1).isLeapYear(); // false

// get the epoch day where 0 is 1970-01-01
d.toEpochDay(); // 17159

// get range of month
d.lengthOfMonth(); // 31
d.range(ChronoField.DAY_OF_MONTH); // ValueRange(1 - 31)

// get range of year
d.lengthOfYear(); // 366
d.range(ChronoField.DAY_OF_YEAR); // ValueRange(1 - 366)

// get other date-based field like the aligned week of year
d.get(ChronoField.ALIGNED_WEEK_OF_YEAR); // 52

// or the day of week aligned to the first day of month
d.get(ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH); // 3
```

### Get week of week-based year, quarter of year, day of quarter

```javascript
// get week of week-based year as defined by ISO 8601, with a Monday-based week
d.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR); // 51

d.isoWeekOfWeekyear(); // 51, equivalent to the above
d.isoWeekyear(); // 2016

LocalDate.of(2017, 1, 1).isoWeekOfWeekyear(); // 52
LocalDate.of(2017, 1, 1).isoWeekyear(); // 2016

// set the date to week 52 of week-based year with the same day of week
d.with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, 52); // 2016-12-31

// get the quarter of the year
d.get(IsoFields.QUARTER_OF_YEAR); // 4
d.get(IsoFields.DAY_OF_QUARTER); // 85

// set the date to the 15th day of the third quarter
d.with(IsoFields.QUARTER_OF_YEAR, 3).with(IsoFields.DAY_OF_QUARTER, 15); // 2016-07-15
```

### Adding to and subtracting from a `LocalDate`

Note that each of these methods returns a new `LocalDate` instance.

```javascript
var d = LocalDate.parse("2016-02-23");

// add/subtract 366 days
d.plusDays(366); // '2017-02-23'
d.minusDays(366); // '2015-02-22'

// add/subtract 12 months
d.plusMonths(12); // '2017-02-23'
d.minusMonths(12); // '2015-02-23'

// add/subtract 4 weeks
d.plusWeeks(4); // '2016-03-22'
d.minusWeeks(4); // '2016-01-26'

// add/subtract 1 year
d.plusYears(1); // '2017-02-23'
d.minusYears(1); // '2015-02-23'

// add/subtract 30 years
d.plus(3, ChronoUnit.DECADES); // '2046-02-23'
d.minus(3, ChronoUnit.DECADES); // '1986-02-23'

// add/subtract a Period of 3 Months and 3 Days
d.plus(Period.ofMonths(3).plusDays(3)); // '2016-05-26'
d.minus(Period.ofMonths(3).plusDays(3)); // '2015-11-20'
```

### Alter specific fields of a LocalDate

```javascript
var d = LocalDate.parse("2016-12-24");

// set the day of month to 1
d.withDayOfMonth(1); // '2016-12-01'

// set month and the day of month to 1
d.withMonth(1).withDayOfMonth(1); // '2016-01-01'

// set month to November and the day of month to 1
d.withMonth(Month.NOVEMBER).withDayOfMonth(1); // '2016-11-01'

// set the year to beginning of era
d.withYear(1); // '0001-12-24'

// get the last day of the current month
LocalDate.now()
  .plusMonths(1)
  .withDayOfMonth(1)
  .minusDays(1);

// set the day of year
d.withDayOfYear(42); // 2016-02-11

// set the week of week-based year to 52
d.with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, 52); // 2016-12-31
```

### Compare one `LocalDate` with another

```javascript
var d1 = LocalDate.parse("2016-12-24");
var d2 = d1.plusDays(2);

d1.isAfter(d2); // false
d1.isBefore(d2); // true

d1.equals(d2); // false
d1.equals(d1.plusDays(0)); // true
d1.equals(d1.plusDays(1)); // false

d1.compareTo(d1) === 0; // true
d1.compareTo(d2) < 0; // true
d2.compareTo(d1) > 0; // true

d1.hashCode(); // 4129560
d2.hashCode(); // 4129562
d1.hashCode() !== d2.hashCode(); // true
```

### Distance on the timeline

```javascript
var d1 = LocalDate.parse("2016-12-24");
var d2 = d1.plusMonths(13).plusDays(42);

// obtain the Period between the two dates
d1.until(d2).toString(); // 'P1Y2M11D' (1 year, 2 months, 11 days in ISO-8601 period format)
d1.until(d2).toTotalMonths(); // 14

// obtain the distance between the two dates with a specific precision
d1.until(d2, ChronoUnit.MONTHS); // 14, returns the distance in total months
d1.until(d2, ChronoUnit.DAYS); // 438, returns the distance in total days
```

### Converting from and to other temporals

```javascript
// obtain a LocalDate from a LocalDateTime instance
var dt = LocalDateTime.now();
LocalDate.from(dt); // LocalDate from LocalDateTime
dt.toLocalDate(); // LocalDateTime to LocalDate (equivalent to the above)

var d1 = LocalDate.parse("2016-02-25");

// obtain a LocalDateTime at a certain LocalTime
d1.atStartOfDay(); // '2016-02-25T00:00'
d1.atTime(LocalTime.of(11, 55)); // '2016-02-25T11:55'
d1.atTime(LocalTime.NOON); // '2016-02-25T12:00'

// obtain a LocalDate from a JavaScript Date

// the manual way
var d = LocalDate.ofInstant(Instant.ofEpochMilli(new Date().getTime()));
// the recommended way with the JavaScript temporal
d = LocalDate.from(nativeJs(new Date()));
// converting from a moment works the same way
d = LocalDate.from(nativeJs(moment()));
```

### Adjust a date to another date

`TemporalAdjusters` provide compact business logic for date-based temporals such as `LocalDate`, `LocalDateTime` or `ZonedDateTime`.

```javascript
var d = LocalDate.parse("2016-12-24");

// get first/ last day of month
d.with(TemporalAdjusters.firstDayOfMonth()); // 2016-12-01
d.with(TemporalAdjusters.lastDayOfMonth()); // 2016-12-31

// get the next specified weekday
d.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)); // 2016-12-25
d.with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY)); // 2016-12-24
d.with(TemporalAdjusters.next(DayOfWeek.SATURDAY)); // 2016-12-31

// get the first/last weekday of month
d.with(TemporalAdjusters.lastInMonth(DayOfWeek.SATURDAY)); // 2016-12-31
d.with(TemporalAdjusters.firstInMonth(DayOfWeek.SATURDAY)); // 2016-12-03
```

Find more adjusters in the TemporalAdjusters API documentation.

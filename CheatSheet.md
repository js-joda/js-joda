js-joda Cheat sheet
=============================================

[For a detailed API Reference refer to the ESDoc generated docs](https://doc.esdoc.org/github.com/pithu/js-joda/)  

## Consistent method prefixes

The API is using a consistent method prefixes.

- of - static factory method
- parse - static factory method focused on parsing
- is - checks if something is true
- with - the immutable equivalent of a setter
- plus - adds an amount to an object
- minus - subtracts an amount from an object
- to - converts this object to another type
- at - combines this object with another, such as date.atTime(time)
- instance variables getter omitting the get keyword  

## Basic concepts

- The API is immutable, an existing instance is never changed, all manipulating methods as parse/ with/ plus/ minus/ to/ at are returning new instances.
- An existing instance is always valid. instead of returning null or invalid values, exceptions are thrown. 

## LocalDate

A LocalDate represents a date without a time and time-zone in the ISO-8601 calendar system, such as 2007-12-24.

### Create a LocalDate

```javascript

// obtain the current date in the system default timezone, e.g. 2016-02-23
LocalDate.now();

// obtain the current date in the utc timezone, e.g. 2016-02-23
LocalDate.now(Clock.systemUTC()); 

// obtain an instance of LocalDate from an ISO8601 formatted text string
LocalDate.parse('2016-02-23');

// obtain an instance of LocalDate from a year, month, and dayOfMonth value
LocalDate.of(2016, 2, 23) // 2016-02-23

// obtain an instance of LocalDate from a year, month, and dayOfMonth value
LocalDate.of(2016, Month.FEBRUARY, 23) // 2016-02-23

// obtain an instance of LocalDate from am epochDay where day 0 is 1970-01-01
LocalDate.ofEpochDay(-1) // 1969-12-31

// obtain an instance of LocalDate from am epochDay where day 0 is 1970-01-01
LocalDate.ofYearDay(2016, 54) // 2016-02-23

```

### Print a LocalDate

```javascript

LocalDate.parse('2016-02-23').toString(); // '2016-02-23'
// returns a String in ISO8601 format

```

### Adding to/ subtracting from a LocalDate
 
```javascript

// add/ subtract 366 days 
LocalDate.parse('2016-02-23').plusDays(366); // '2017-02-23'
LocalDate.parse('2016-02-23').minusDays(366); // '2015-02-22'

// add/ subtract 12 months 
LocalDate.parse('2016-02-23').plusMonths(12); // '2017-02-23'
LocalDate.parse('2016-02-23').minusMonths(12); // '2015-02-23'

// add/ subtract 4 weeks 
LocalDate.parse('2016-02-23').plusWeeks(4); // '2016-03-22'
LocalDate.parse('2016-02-23').minusWeeks(4); // '2016-01-26'

// add/ subtract 1 year to the parsed LocalDate and returns a new instance
LocalDate.parse('2016-02-23').plusYears(1); // '2017-02-23'
LocalDate.parse('2016-02-23').minusYears(1); // '2015-02-23'
 
// add/ subtract 30 years  
LocalDate.parse('2016-02-23').plus(3, ChronoUnit.DECADES); // '2046-02-23'
LocalDate.parse('2016-02-23').minus(3, ChronoUnit.DECADES); // '1986-02-23'

// add subtract a Period of 3 Months and 3 Days
LocalDate.parse('2016-02-23').plus(Period.ofMonths(3).plusDays(3))  // '2016-05-26'
LocalDate.parse('2016-02-23').minus(Period.ofMonths(3).plusDays(3)) // '2015-11-20'

```

### Alter certain fields of a LocalDate

```javascript

var d = LocalDate.parse('2016-12-24');

// set the day of month to 1
d.withDayOfMonth(1); // '2016-12-01'

// set month and the day of month to 1
d.withMonth(1).withDayOfMonth(1); // '2016-01-01'

// set month to November and the day of month to 1
d.withMonth(Month.NOVEMBER).withDayOfMonth(1); // '2016-11-01'

// set the year to beginning of era 
d.withYear(1); // '0001-12-24'

// get the last day of the current month
LocalDate.now().plusMonths(1).withDayOfMonth(1).minusDays(1);

// set the day of year
d.withDayOfYear(42); // 2016-02-11

// set the ALIGNED_WEEK_OF_YEAR to 51
d.with(ChronoField.ALIGNED_WEEK_OF_YEAR, 51) // 2016-12-17

// set by a TemporalAdjuster lastDayOfMonth
d.with(TemporalAdjusters.lastDayOfMonth()) // 2016-12-31

// set by a TemporalAdjuster lastDayOfMonth
d.with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY)) // 2016-12-31

// set by a TemporalAdjuster next or same weekday
d.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)) // 2016-12-25

```
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
- the API is immutable, all manipulating methods as parse/ with/ plus/ minus/ to/ at are returning new instances.

## LocalDate

A LocalDate represents a date without a time and time-zone in the ISO-8601 calendar system, such as 2007-12-24.

### create a LocalDate

```javascript

LocalDate.now();
// returns the current date in the system default timezone, e.g. 2016-02-23

LocalDate.now(Clock.systemUTC()); 
// returns the current date in the utc timezone, e.g. 2016-02-23

LocalDate.parse('2016-02-23');
// obtains an instance of LocalDate from an ISO8601 formatted text string

LocalDate.of(2016, 2, 23) // 2016-02-23
// obtains an instance of LocalDate from a year, month, and dayOfMonth value

LocalDate.of(2016, Month.FEBRUARY, 23) // 2016-02-23
// obtains an instance of LocalDate from a year, month, and dayOfMonth value

LocalDate.ofEpochDay(-1) // 1969-12-31
// obtains an instance of LocalDate from am epochDay where day 0 is 1970-01-01

LocalDate.ofYearDay(2016, 54) // 2016-02-23
// obtains an instance of LocalDate from am epochDay where day 0 is 1970-01-01

```

### print a LocalDate

```javascript

LocalDate.parse('2016-02-23').toString(); // '2016-02-23'
// returns a String in ISO8601 format

```

### adding to/ subtracting from a LocalDate
 
```javascript

LocalDate.parse('2016-02-23').plusDays(366); // '2017-02-23'
LocalDate.parse('2016-02-23').minusDays(366); // '2015-02-22'
// adds/ subtracts 366 days 

LocalDate.parse('2016-02-23').plusMonths(12); // '2017-02-23'
LocalDate.parse('2016-02-23').minusMonths(12); // '2015-02-23'
// adds/ subtracts 12 months 

LocalDate.parse('2016-02-23').plusWeeks(4); // '2016-03-22'
LocalDate.parse('2016-02-23').minusWeeks(4); // '2016-01-26'
// adds/ subtracts 4 weeks 

LocalDate.parse('2016-02-23').plusYears(1); // '2017-02-23'
LocalDate.parse('2016-02-23').minusYears(1); // '2015-02-23'
// add/ subtract 1 year to the parsed LocalDate and returns a new instance
 
LocalDate.parse('2016-02-23').plus(ChronoUnit.DECADES, 3); // '2036-02-23'
LocalDate.parse('2016-02-23').minus(ChronoUnit.DECADES, 3); // '2086-02-23'
// add/ subtract 30 years  

```

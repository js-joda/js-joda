# Period

`Period` is a **date-based** amount of time in the ISO-8601 calendar system, such as '2 years, 3 months and 4 days'.

```javascript
// parse and format ISO 8601 period strings
Period.parse("P1Y10M").toString(); // 'P1Y10M'

// obtain a Period of 10 years, 5 month and 30 days
Period.of(10, 5, 30).toString(); // 'P10Y5M30D'

// 10 years
Period.ofYears(10).toString(); // 'P10Y'

// add 45 days to a Period
Period.ofYears(10)
  .plusDays(45)
  .toString(); // 'P10Y45D'

// normalize a Period of years and month
Period.of(1, 37, 0)
  .normalized()
  .toString(); // 'P4Y1M'

// add/subtract from a Period
Period.ofYears(10)
  .plusMonths(10)
  .minusDays(42)
  .toString(); // 'P10Y10M-42D'

// add a Period to LocalDate
var p = Period.ofMonths(1);
LocalDate.parse("2012-12-12").plus(p); // '2013-01-12';
LocalDate.parse("2012-01-31").plus(p); // '2012-02-29';
LocalDateTime.parse("2012-05-31T12:00").plus(p); // '2012-06-30T12:00';

// calculate the Period between two Dates
Period.between(LocalDate.parse("2012-06-30"), LocalDate.parse("2012-08-31")); // 'P2M1D'
```

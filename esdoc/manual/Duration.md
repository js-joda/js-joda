# Duration

`Duration` is a **time-based** amount of time, such as '34.5 seconds'.

```javascript
// obtain a Duration of 10 hours
Duration.ofHours(10).toString(); // 'PT10H'

// obtain a Duration of 10 days (10 x 24 hours)
Duration.ofDays(10).toString(); // 'PT240H'

// add/subtract a duration from a LocalDateTime
var dt = LocalDateTime.parse("2012-12-24T12:00");

dt.plus(Duration.ofHours(10).plusMinutes(30)).toString(); // '2012-12-24T22:30'
dt.minus(Duration.ofHours(12).multipliedBy(10)).toString(); // '2012-12-19T12:00'

// calculate the duration between two time-based values
var dt1 = LocalDateTime.parse("2012-12-24T12:00");

Duration.between(dt1, dt1.plusHours(10)).toString(); // 'PT10H'
```

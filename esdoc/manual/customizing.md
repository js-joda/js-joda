# Customizing js-joda

This package is extensible, allowing you to create your own custom temporal calculations. See the [temporal interface documentation](https://js-joda.github.io/js-joda/esdoc/class/src/temporal/Temporal.js~Temporal.html) for more information.

### Custom temporal adjuster

```javascript
// implement a TemporalAdjuster that the next or same even day of month
var nextOrSameEvenDay = {
  adjustInto: function(t) {
    return t.dayOfMonth() % 2 === 0 ? t : t.plusDays(1);
  }
};

LocalDateTime.parse("2012-12-23T12:00").with(nextOrSameEvenDay); // '2012-12-24T12:00'
LocalDate.parse("2012-12-24").with(nextOrSameEvenDay); // '2012-12-24'
```

### Custom temporal fields and temporal units

See the source for [temporal/IsoFields](https://github.com/js-joda/js-joda/blob/master/src/temporal/IsoFields.js) as an example how to implement custom fields and units. `IsoFields` implements fields and units for an ISO week-based year.

### Custom formatter and queries

The following example implements a parser for a local date with an optional local time. It returns either a `LocalDate` or a `LocalDateTime`, depending on the parsed fields.

```javascript
// build a custom date time formatter where the time field is optional
var OPTIONAL_FORMATTER = DateTimeFormatter.ofPattern(
  'yyyy-MM-dd['T'HH:mm[:ss]]'
);

// create a temporal query that create a new Temporal depending on the existing fields
dateOrDateTimeQuery = {
  queryFrom: function(temporal) {
    var date = temporal.query(TemporalQueries.localDate());
    var time = temporal.query(TemporalQueries.localTime());
    if (time == null) return date;
    else return date.atTime(time);
  }
};

localDate = OPTIONAL_FORMATTER.parse('2012-12-24', dateOrDateTimeQuery);
localDateTime = OPTIONAL_FORMATTER.parse(
  '2012-12-24T23:59',
  dateOrDateTimeQuery
);
```

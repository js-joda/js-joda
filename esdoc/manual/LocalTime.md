# LocalTime

A `LocalTime` represents a time with **no date** and **no time zone** in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) calendar system, such as '10:15:30'

### Create a `LocalTime` instance

```javascript
// obtain the current time in the system default time zone, e.g. '10:29:05.743'
LocalTime.now();

// obtain the current time in the UTC time zone, e.g. '09:29:05.743'
LocalTime.now(ZoneOffset.UTC);

// obtain an instance of LocalTime from an ISO 8601 formatted text string
LocalTime.parse("09:42"); // '09:42'
LocalTime.parse("09:42:42"); // '09:42:42'
LocalTime.parse("09:42:42.123"); // '09:42:42.123'
LocalTime.parse("09:42:42.123456789"); // '09:42:42.123456789'

// obtain an instance of LocalTime from hour, minute, second, and nanosecond values
LocalTime.of(23, 55); // '23:55'
LocalTime.of(23, 55, 42); // '23:55:42'
LocalTime.of(23, 55, 42, 123000000); // '23:55:42.123'

// obtain an instance of LocalTime from second of day
LocalTime.ofSecondOfDay(3666); // '01:01:06'
```

### Get values from `LocalTime`

```javascript
var t = LocalTime.parse("23:55:42.123");

t.toString(); // '23:55:42.123' ISO 8601 format

t.hour(); // 23
t.minute(); // 55
t.second(); // 42
t.nano(); // 123000000

// get other time-based fields
t.get(ChronoField.SECOND_OF_DAY); // 86142
t.get(ChronoField.MILLI_OF_SECOND); // 123
t.get(ChronoField.HOUR_OF_AMPM); // 11
// any other time-based ChronoField is allowed as param for get
```

### Adding to/ subtracting from a `LocalTime` instance

```javascript
var t = LocalTime.parse("11:55:42");

// add/subtract 12 hours
t.plusHours(12); // '23:55:42'
t.minusHours(12); // '23:55:42'

// add/subtract 30 minutes
t.plusMinutes(30); // '12:25:42'
t.minusMinutes(30); // '11:25:42'

// add/subtract 30 seconds
t.plusSeconds(30); // '11:56:12'
t.minusSeconds(30); // '11:55:12'

// add/subtract 1 million nanoseconds (1 millisecond)
t.plusNanos(1000000); // '11:56:42.001'
t.minusNanos(1000000); // '11:55:41.999'

// add/subtract a time-based unit
t.plus(1, ChronoUnit.MILLIS); // '11:55:42.001'
t.plus(1, ChronoUnit.HALF_DAYS); // '23:55:42'

// add/subtract a duration of 15 minutes
t.plus(Duration.ofMinutes(15)); // '12:10:42'
t.minus(Duration.ofMinutes(15)); // '11:40:42'
```

### Alter specific fields of a `LocalTime` instance

```javascript
var t = LocalTime.parse("11:55:42");

// set the hour of day to 1
t.withHour(1); // '01:55:42'

// set the minute of hour to 1
t.withMinute(1); // '11:01:42'

// set the second of minute to 1
t.withSecond(1); // '11:55:01'

// set the MILLI_OF_SECOND to 51
t.with(ChronoField.MILLI_OF_SECOND, 51); // '11:55:42.051'

// set by a custom  TemporalAdjusters
// sample of a custom adjuster that adjust to the next even second
nextEvenSecond = {
  adjustInto: function(t) {
    return t.second() % 2 === 0 ? t.plusSeconds(2) : t.plusSeconds(1);
  }
};
t.with(nextEvenSecond); // '11:55:44'
t.plusSeconds(1).with(nextEvenSecond); // '11:55:44'
```

### Truncate a `LocalTime` instance

```javascript
var t = LocalTime.parse("23:55:42.123");

t.truncatedTo(ChronoUnit.SECONDS); // '23:55:42'
t.truncatedTo(ChronoUnit.MINUTES); // '23:55:00'
t.truncatedTo(ChronoUnit.HOURS); // '23:00'
t.truncatedTo(ChronoUnit.HALF_DAYS); // '12:00'
t.truncatedTo(ChronoUnit.DAYS); // '00:00'
```

### Compare `LocalTime` instances

```javascript
var t1 = LocalTime.parse("11:55:42");
var t2 = t1.plusHours(2);

t1.isAfter(t2); // false
t1.isBefore(t2); // true

t1.equals(t1.plusHours(0)); // true
t1.equals(t1.plusHours(1)); // false

t1.compareTo(t1) === 0; // true
t1.compareTo(t2) < 0; // true
t2.compareTo(t1) > 0; // true

t1.hashCode(); // 916974646
t2.hashCode(); // -1743180648
t1.hashCode() !== t2.hashCode(); // true
```

### Distance between times

```javascript
var t1 = LocalTime.parse("11:00");
var t2 = t1
  .plusHours(2)
  .plusMinutes(42)
  .plusSeconds(12);

// obtain the duration between the two dates
t1.until(t2, ChronoUnit.HOURS); // 2
t1.until(t2, ChronoUnit.MINUTES); // 162
t1.until(t2, ChronoUnit.SECONDS); // 9732
```

### Convert a `LocalTime` from a `moment` or JavaScript `Date`

```javascript
// obtain a LocalTime instance from a JavaScript Date

// the manual way
var t = LocalTime.ofInstant(Instant.ofEpochMilli(new Date().getTime()));
// the recommended way with the JavaScript temporal
t = LocalTime.from(nativeJs(new Date()));
// converting from a `moment` instance works the same way
d = LocalTime.from(nativeJs(moment()));
```

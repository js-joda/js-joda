# Instant

An `Instant` is an instantaneous point on the time-line measured from the epoch of 1970-01-01T00:00:00Z in epoch-seconds and nanosecond-of-second.

### Create an `Instant`

```javascript
// Obtain the current instant from the system clock
Instant.now();

// Obtain the current instant from the UTC clock
Instant.now(Clock.systemUTC());

// Obtain an instance of Instant using microseconds from the epoch of 1970-01-01T00:00:00Z. In this example, the Saturday, August 12, 2023 2:57:21 PM GMT
Instant.ofEpochMicro(1691852241000000);

// Obtain an instance of Instant using milliseconds from the epoch of 1970-01-01T00:00:00Z. In this example, the Saturday, August 12, 2023 2:57:21 PM GMT
Instant.ofEpochMilli(1691852241000);

// Obtain an instance of Instant using milliseconds from a JavaScript Date object
Instant.ofEpochMilli(new Date());

// Obtain an instance of Instant using milliseconds from the epoch of 1970-01-01T00:00:00Z
Instant.ofEpochSecond(1691926326);

// Obtain an instance of Instant from a text string such as 2007-12-03T10:15:30.000Z.
Instant.parse('2007-12-03T10:15:30.000Z');
```

### Get values from `Instant`

```javascript
var ins = Instant.parse('2007-12-03T10:15:30.000Z')

ins.toString(); // '2007-12-03T10:15:30Z'
ins.epochSecond();  // 1196676930
ins.toEpochMilli(); // 1196676930000

ins.atOffset(ZoneOffset.ofHours(1)); // '2007-12-03T11:15:30+01:00' returns an OffsetDateTime instance 
ins.atZone(ZoneId.UTC); // '2007-12-03T10:15:30Z' returns a ZonedDateTime instance
```

### Adding to and subtracting from an `Instant`

Note that each of these methods returns a new `Instant` instance.

```javascript
var ins = Instant.parse('2007-12-03T10:15:30.000Z') // 1196676930 in epoch seconds

// add/subtract seconds
ins.plusSeconds(1);  // 1196676931 or '2007-12-03T10:15:31.000Z'
ins.minusSeconds(1); // 1196676929 or '2007-12-03T10:15:29.000Z'

// add/subtract milliseconds
ins.plusMillis(1);  // '2007-12-03T10:15:30.001Z'
ins.minusMillis(1); // '2007-12-03T10:15:29.999Z' 

// add/subtract microseconds
ins.plusMicros(1);  // '2007-12-03T10:15:30.000001Z'
ins.minusMicros(1); // '2007-12-03T10:15:29.999999Z'
```


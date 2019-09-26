# ZonedDateTime

A `ZonedDateTime` represents a date-time with a [time offset](https://en.wikipedia.org/wiki/UTC_offset) and/or a [time zone](https://en.wikipedia.org/wiki/Time_zone) in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) calendar system.

On its own, `ZonedDateTime` only supports specifying **time offsets** such as `UTC` or `UTC+02:00`, plus the `SYSTEM` time zone ID.

### The `SYSTEM` zone ID

The `SYSTEM` zone ID is a non-standard ID that is specific to `js-joda`. It represents the default time zone of the current JavaScript runtime. The JavaScript spec does not provide an API this; it only provides the system default time offset for a point in the timeline (`Date.prototype.getTimezoneOffset()`).

You should not exchange `ZonedDateTime` instances using the `SYSTEM` zone ID between JavaScript environments (e.g. between server and client, or between two servers). The time offset on another machine won't necessarily be the same as yours. Before sending a `ZonedDateTime` to someone else, convert it to a fixed offset:

```javascript
// current time with default `SYSTEM`
ZonedDateTime.now().toString(); // e.g. 2016-03-18T12:38:23.561+01:00[SYSTEM]

// converted to a fixed time offset
ZonedDateTime.now()
  .withFixedOffsetZone()
  .toString(); // e.g. 2016-03-18T12:38:23.561+01:00
```

### Working with time zones

A **time zone** and a **time offset** are [not the same thing](https://en.wikipedia.org/wiki/UTC_offset#Time_zones_and_time_offsets). Some timezones change from standard time to [daylight savings time](https://en.wikipedia.org/wiki/Daylight_saving_time) and back every year:

- In the `Europe/Berlin` _time zone_, the _time offset_ is `UTC+2` during the summer, and `UTC+1` during the rest of the year.
- In the `Africa/Lagos` _time zone_, on the other hand, the _time offset_ is `UTC+1` all year round.

Calculations that might span time zones or daylight savings transitions need to reference the time zone, not just the offset.

The [js-joda-timezone](https://github.com/js-joda/js-joda-timezone) package provides bindings to the the [IANA tz database](https://www.iana.org/time-zones), making `joda-js`'s calculations time zone aware. The `tz` database uses zone names like `Africa/Bujumbura`, `America/New_York`, and `Europe/Lisbon` (see the [full list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)).

To specify time zones using these names, you just need to `require` [js-joda-timezone](https://github.com/js-joda/js-joda-timezone).

```javascript
var jsJoda = require("@js-joda/core");
require("@js-joda/timezone");

var zdt = ZonedDateTime.now(ZoneId.of("Europe/Paris"));
```

### Create a ZonedDateTime

```javascript
// get now with the default system time zone
ZonedDateTime.now().toString(); // e.g. 2016-03-18T12:38:23.561+01:00[SYSTEM]

// get now with the UTC time zone
ZonedDateTime.now(ZoneOffset.UTC).toString(); // e.g. 2016-03-18T11:38:23.561Z

// get now with a fixed offset time zone
ZonedDateTime.now(ZoneId.of("UTC-05:00")).toString(); // e.g. 2016-03-18T06:38:23.561-05:00[UTC-05:00]

// get now with a ZoneRegion (requires `js-joda-timezone`)
ZonedDateTime.now(ZoneId.of("Europe/Paris")).toString(); // e.g. 2017-02-04T17:01:15.846+01:00[Europe/Paris]

// parse a date time with a time zone ISO String
ZonedDateTime.parse("2016-03-18T12:38:23.561+01:00[SYSTEM]");
ZonedDateTime.parse("2016-03-18T12:38:23.561+01:00");
ZonedDateTime.parse("2016-03-18T11:38:23.561Z");
ZonedDateTime.parse("2016-03-18T06:38:23.561-05:00[UTC-05:00]");
ZonedDateTime.parse("2017-02-04T17:01:15.846+01:00[Europe/Paris]");

// create from a LocalDate(Time) (requires `js-joda-timezone`)
LocalDate.parse("2012-06-06")
  .atStartOfDay()
  .atZone(ZoneId.of("Europe/Paris")); // 2012-06-06T00:00+02:00[Europe/Paris]
ZonedDateTime.of(
  LocalDateTime.parse("2012-06-06T00:00"),
  ZoneId.of("Europe/Paris")
); // 2012-06-06T00:00+02:00[Europe/Paris]
ZonedDateTime.of(
  LocalDate.parse("2012-06-06"),
  LocalTime.MIDNIGHT,
  ZoneId.of("Europe/Paris")
); // 2012-06-06T00:00+02:00[Europe/Paris]

// create from an Instant
ZonedDateTime.ofInstant(Instant.now(), ZoneId.SYSTEM); // current system time
```

### Switch time zones

> These examples require `js-joda-timezone`.

```javascript
var d = LocalDate.of(2016, 3, 18);
var zdt = d.atTime(LocalTime.NOON).atZone(ZoneId.of("America/New_York")); //2016-03-18T12:00-04:00[America/New_York]

// switch time zone retaining the local date-time if possible
zdt.withZoneSameLocal(ZoneId.of("Europe/Berlin")); // 2016-03-18T12:00+01:00[Europe/Berlin]

// switch time zone and retain the instant
zdt.withZoneSameInstant(ZoneId.of("Europe/Berlin")); // 2016-03-18T17:00+01:00[Europe/Berlin]
```

### Get and manipulate values from a `ZonedDateTime`

`ZonedDateTime` implements the same methods as `LocalDateTime` for getting or setting values. See [the examples above](#get-values-from-localdatetime) for `LocalDateTime`.

### Calculate values across daylight savings transitions

When adding to or subtracting from a `ZonedDateTime` instance, the calculation is different depending on whether date or time units are passed.

- Addition/subtraction of **date units** are made on the **local** timeline.
- Addition/subtraction of **time units** are made on the **instant** timeline.

This example shows the difference for a daylight saving transition.

```javascript
// assume the system default time zone is CET; we define a time as 2016-03-18 at 17:00 local time
var zdt = ZonedDateTime.parse("2016-03-18T17:00+01:00[Europe/Berlin]");

// adding a date unit of 2 weeks, crossing a daylight saving transition
zdt.plusWeeks(2); // 2016-04-01T17:00+02:00[Europe/Berlin] (still 17:00)

// adding a time unit of 2 weeks (2 * 7 * 24)
zdt.plusHours(2 * 7 * 24); // 2016-04-01T18:00+02:00[Europe/Berlin] (now 18:00)
```

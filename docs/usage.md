# Usage

The API is **immutable**. An existing instance is never changed. All manipulating methods (`plus`, `at`, etc.) return new instances.

**An existing instance is always valid**. If you try to create an invalid value, you'll get an exception instead of a `null` or `undefined` value.

### Method naming conventions

The API uses consistently named methods.

| method name or prefix | usage                                        | examples                                                        |
| --------------------- | -------------------------------------------- | --------------------------------------------------------------- |
| `.of`                 | static factory method for building by parts  | `LocalDate.of(2016, 2, 23)` <br> `LocalDate.ofInstant(i)`       |
| `.parse`              | static factory method for parsing strings    | `LocalDate.parse('2016-02-23')` <br> `LocalTime.parse('12:34')` |
| `.is`                 | checks for certain conditions                | `t1.isAfter(t2)` <br> `d1.isLeapYear()`                         |
| `.equals`             | checks for equivalence between two instances | `t1.equals(t2)`                                                 |
| `.with`               | the immutable equivalent of a setter         | `d.withDayOfMonth(1)` <br> `t.withHour(9)`                      |
| `.plus`               | adds an amount to an object                  | `t.plusMinutes(5)` <br> `d.plus(3, ChronoUnit.YEARS)`           |
| `.minus`              | subtracts an amount from an object           | `t.minusHours(1)` <br> `d.minus(1, ChronoUnit.DAYS)`            |
| `.to`                 | converts this object to another type         | `dt.toLocalDate()` <br> `d1.until(d2).toTotalMonths()`          |
| `.at`                 | combines one object with another             | `date.atTime(time)` <br> `localDate.atZone(tz)`                 |

Note that getter methods for instance properties omit the get keyword: `d.year()`, not ~~`d.getYear()`~~.

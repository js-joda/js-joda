# Proposal

## Why

Since `@js-joda/core` 5.0.0 ([#548](https://github.com/js-joda/js-joda/pull/548)), `Temporal` and
`TemporalAmount` instances throw a `TypeError` when converted to a number, so `<`, `>`, `<=`, `>=` and
`-` can't silently do the wrong thing. Classes that only extend `TemporalAccessor` or `ZoneId` were left
out. For them JavaScript compares the `toString()` results alphabetically, which gives wrong answers
without any error ([#833](https://github.com/js-joda/js-joda/issues/833)):

```js
Month.DECEMBER < Month.FEBRUARY                  // true, "DECEMBER" < "FEBRUARY"
ZoneOffset.ofHours(2) < ZoneOffset.ofHours(1)    // false, but compareTo() orders +02:00 first
DayOfMonth.of(10) < DayOfMonth.of(9)             // true, "10" < "9" (@js-joda/extra)
Month.MARCH - Month.JANUARY                      // NaN
```

Some comparisons happen to be right (e.g. `MonthDay`, whose ISO strings sort correctly), which makes
the wrong ones harder to spot.

## What Changes

- **BREAKING** The `Symbol.toPrimitive` guard moves from `Temporal` to `TemporalAccessor`, so every
  date-time type throws a `TypeError` on conversion to a number. Newly covered:
  - `@js-joda/core`: `Month`, `DayOfWeek`, `MonthDay`
  - `@js-joda/extra`: `Quarter`, `DayOfMonth`, `DayOfYear` (inherited from core's `TemporalAccessor`)
- **BREAKING** `ZoneId` gets the same guard, covering `ZoneOffset`, `ZoneRegion` and the system default
  zone.
- Conversion to a string is unchanged: `String(x)`, template literals, `+` with a string and `==`
  still use `toString()`.
- The error message names the methods to use instead, depending on the base class:
  - `TemporalAccessor`: `.equals()`, `.compareTo()`, `.isBefore()`, `.isAfter()`, and `.value()` for
    the enum-like classes
  - `ZoneId`: `.equals()`, and for `ZoneOffset` `.compareTo()` or `.totalSeconds()`
  - `TemporalAmount`: `.equals()`, and for `Duration` `.compareTo()`. The current message also
    suggests `.isBefore()`, which neither `Duration` nor `Period` has, and `.compareTo()`, which
    `Period` lacks; it is corrected.
- **BREAKING** The message for `Temporal` types names `TemporalAccessor` instead of `Temporal`
  (`A conversion from TemporalAccessor to a number is not allowed. ...`).
- **BREAKING** Any API that takes a number and is passed one of the newly guarded instances by
  mistake throws the guard's `TypeError` instead of the exception it throws today. This covers every
  path that converts its argument to a number: the `<`/`<=` range checks in `Month.of`,
  `DayOfWeek.of` and, in `@js-joda/extra`, `DayOfMonth.of`, `DayOfYear.of` (today a
  `DateTimeException`), and `MathUtil.verifyInt`/`safeToInt` and `ValueRange.isValidValue` behind
  `LocalDate.of`, `LocalTime.of`, `with*()`, `plus*()` and others (today mostly an
  `ArithmeticException`). Examples: `Month.of(Month.MARCH)`, `LocalDate.of(2020, 1, DayOfMonth.of(5))`,
  `date.plusDays(DayOfMonth.of(3))`. `Quarter.of(Quarter.Q1)` keeps throwing a `DateTimeException`,
  since it checks its argument with a `switch`. The exception type in these cases is not part of the
  spec; adding argument type checks is out of scope.
- Code that runs without error today now throws, so this ships in a major release of `@js-joda/core`.

Out of scope: `Interval` and `LocalDateRange` in `@js-joda/extra` extend no core base class and are
not changed here.

## Capabilities

### New Capabilities
- `primitive-conversion`: how js-joda value objects behave when JavaScript converts them to a
  primitive (number or string), which covers the use of relational and arithmetic operators.

### Modified Capabilities
<!-- none -->

## Impact

- `packages/core/src/temporal/TemporalAccessor.js`, `Temporal.js`, `packages/core/src/ZoneId.js`
- Tests in `packages/core/test` and `packages/extra/test`
- `CHANGELOG.md`: breaking change entry for `core` (and a note for `extra`)
- `@js-joda/extra` gets the guard only together with the new `@js-joda/core` major; its peer range is
  not raised by this change.
- TypeScript typings are unchanged. `tsc --strict` already rejects arithmetic on these objects
  (`Month.MARCH - Month.JANUARY`) and `<`, `>`, `<=`, `>=` between unrelated types or with a number
  (`Month.DECEMBER < ZoneOffset.UTC`, `Month.DECEMBER < 3`). It accepts the relational operators
  between comparable object types, e.g. two `Month`s or two `ZoneOffset`s, and typings can't forbid
  that, since TypeScript doesn't consult `Symbol.toPrimitive` for operators. TypeScript users hit the
  new `TypeError` for those comparisons only at runtime, like JavaScript users.

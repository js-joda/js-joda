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
- The error message names the methods to use instead: `.compareTo()`, `.isBefore()`, `.isAfter()`,
  `.equals()`, and `.value()` for the enum-like classes.
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
- TypeScript typings are unaffected: TypeScript already rejects `<` between these object types.

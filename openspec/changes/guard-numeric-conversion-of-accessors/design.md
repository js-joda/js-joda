# Design

## Context

The guard from #548 is a `Symbol.toPrimitive` method assigned to the prototypes of `Temporal`
(`packages/core/src/temporal/Temporal.js`) and `TemporalAmount`
(`packages/core/src/temporal/TemporalAmount.js`), each behind
`typeof Symbol !== 'undefined' && Symbol.toPrimitive`. For the `number` hint it throws a `TypeError`;
otherwise it returns `this.toString()`.

The class hierarchy that matters:

- `TemporalAccessor` ← `Temporal` ← all `Temporal` types, including the internal `Parsed`
- `TemporalAccessor` ← `Month`, `DayOfWeek`, `MonthDay`, `DateTimeBuilder` (core);
  `Quarter`, `DayOfMonth`, `DayOfYear` (extra)
- `ZoneId` ← `ZoneOffset`, `ZoneRegion`, `SystemDefaultZoneId`

The plugin classes extend core's `TemporalAccessor` at runtime (core is a peer dependency), so they
get whatever guard the installed core puts on that prototype.

## Goals / Non-Goals

**Goals:**
- One guard per base class (`TemporalAccessor`, `ZoneId`, `TemporalAmount`), inherited by every
  subclass, including those of plugins and third-party code.

**Non-Goals:**
- `Interval` and `LocalDateRange` in `@js-joda/extra`, which extend no core base class.
- `Array.prototype.sort()` without a comparator: it converts to strings, so it's not affected and
  still sorts by `toString()`.
- Giving the enum-like classes a numeric `valueOf()`; that would make `<` work but diverge from
  java.time and make `==`/`+` behave surprisingly.

## Decisions

**Move the guard from `Temporal` to `TemporalAccessor`.** `Temporal` extends `TemporalAccessor`, so
the guard on `Temporal.prototype` becomes redundant and is removed rather than kept in two places.
Alternative: add the guard to each affected class. Rejected: it misses future classes and third-party
`TemporalAccessor` implementations, and the issue proposes the base class.

**Add a separate guard on `ZoneId.prototype`.** `ZoneId` doesn't extend `TemporalAccessor`, and
shouldn't for this.

**Share one helper for the three guards.** A small module-level function (e.g.
`installNumericConversionGuard(prototype, typeName)`) in a module without imports of its own, so it can
be used from `TemporalAccessor.js`, `TemporalAmount.js` and `ZoneId.js` without adding import cycles.
It keeps the `Symbol.toPrimitive` feature check in one place. Alternative: copy the function three
times, as today for two. Either is fine; the helper is preferred to keep the message consistent.

**Error message.** Keep the existing wording, with the type named by its base class as a reader would
know it, and add `.value()`:

> A conversion from TemporalAccessor to a number is not allowed. To compare use the methods
> .equals(), .compareTo(), .isBefore() or one that is more suitable to your use case; enum-like
> types such as Month offer .value().

The exact text is not part of the spec beyond the method names (see spec). Using the subclass name
(`this.constructor.name`) was rejected: the minified UMD build mangles class names.

**Keep `TemporalAmount` as it is**, apart from using the shared helper.

## Risks / Trade-offs

- [Code that "works" today throws after upgrading, e.g. `MonthDay` comparisons that happen to be
  right, or `Math.max(...months)`] → Release in a new major of `@js-joda/core`, with a
  `:boom: Breaking Change` entry in `CHANGELOG.md` listing the newly guarded classes and the
  replacement methods.
- [`@js-joda/extra` users get the new behavior only with the new core major, and with an older core
  the extra classes stay unguarded] → Acceptable; no extra code changes. Note it in the CHANGELOG
  entry. Extra's peer range stays as is because extra doesn't depend on the guard to work.
- [`DateTimeBuilder` has no `toString()`, so the string hint returns `[object Object]`] → Same as
  today; it's internal.

## Migration Plan

Users replace operators with methods: `a.compareTo(b) < 0`, `a.isBefore(b)`, `a.equals(b)`, or for
`Month`, `DayOfWeek`, `Quarter`, `DayOfMonth`, `DayOfYear`: `a.value() < b.value()`. For `ZoneOffset`,
`compareTo()` (descending by offset, as in java.time) or `totalSeconds()`.

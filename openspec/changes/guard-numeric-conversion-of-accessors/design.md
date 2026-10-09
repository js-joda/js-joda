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

**Share one helper for the three guards.** A small module-level function
`installNumericConversionGuard(prototype, typeName, hint)` in a module without imports of its own, so
it can be used from `TemporalAccessor.js`, `TemporalAmount.js` and `ZoneId.js` without adding import
cycles. It keeps the `Symbol.toPrimitive` feature check and the common message prefix in one place;
the `hint` names the methods that the classes under that base actually have. Alternative: copy the
function three times, as today for two. Rejected: the messages would drift.

**Error message.** Keep the existing wording, with the type named by its base class as a reader would
know it, and a hint per base class. A single shared hint was rejected: it would point `ZoneId` users
to `.isBefore()`/`.value()` and `Duration` users to `.value()`, which those classes don't have.

- `TemporalAccessor`:
  > A conversion from TemporalAccessor to a number is not allowed. To compare use the methods
  > .equals(), .compareTo(), .isBefore(), .isAfter() or one that is more suitable to your use case;
  > enum-like types such as Month offer .value().
- `ZoneId`:
  > A conversion from ZoneId to a number is not allowed. To compare use the method .equals(); a
  > ZoneOffset can be ordered with .compareTo() or .totalSeconds().
- `TemporalAmount`: the existing message, unchanged.

Not every `TemporalAccessor` has every method listed (`Month` has no `.isBefore()`), so its hint stays
phrased as a list of options. The exact text is not part of the spec beyond the method names (see
spec). Using the subclass name (`this.constructor.name`) was rejected: the minified UMD build mangles
class names.

**Keep `TemporalAmount` as it is**, apart from using the shared helper.

## Risks / Trade-offs

- [Code that "works" today throws after upgrading, e.g. `MonthDay` comparisons that happen to be
  right, or `Math.max(...months)`] → Release in a new major of `@js-joda/core`, with a
  `:boom: Breaking Change` entry in `CHANGELOG.md` listing the newly guarded classes and the
  replacement methods.
- [The message of every `Temporal` type changes from `A conversion from Temporal ...` to
  `A conversion from TemporalAccessor ...`; code or tests matching the text break] → No test in this
  repo matches the text. List it in the breaking change entry.
- [`Month.of`, `DayOfWeek.of`, `DayOfMonth.of` and `DayOfYear.of` compare their argument with
  `<`/`<=`. Passed an instance by mistake (`Month.of(Month.MARCH)`), they throw the guard's
  `TypeError` instead of a `DateTimeException`] → Accepted: it is still an error at the same call, and
  the argument is documented as a number. Adding `typeof` checks to the factories is out of scope. Pin
  the behavior with tests and list it in the breaking change entry.
- [TypeScript doesn't flag `<` between objects, so TypeScript users get no compile-time warning] →
  Nothing to do in the typings; TypeScript ignores `Symbol.toPrimitive` for operators. Say so in the
  breaking change entry.
- [`@js-joda/extra` users get the new behavior only with the new core major, and with an older core
  the extra classes stay unguarded] → Acceptable; no extra code changes. The spec makes the plugin
  behavior conditional on the core version. Note it in the CHANGELOG entry. Extra's peer range stays
  as is because extra doesn't depend on the guard to work.
- [`DateTimeBuilder` has no `toString()`, so the string hint returns `[object Object]`] → Same as
  today; it's internal.

## Migration Plan

Users replace operators with methods: `a.compareTo(b) < 0`, `a.isBefore(b)`, `a.equals(b)`, or for
`Month`, `DayOfWeek`, `Quarter`, `DayOfMonth`, `DayOfYear`: `a.value() < b.value()`. For `ZoneOffset`,
`compareTo()` (descending by offset, as in java.time) or `totalSeconds()`.

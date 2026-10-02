# Proposal

## Why

`@js-joda/timezone` throws `not supported` for most of the `java.time.zone.ZoneRules` API:
`standardOffset`, `daylightSavings`, `isDaylightSavings`, `nextTransition`, `previousTransition`,
`transitions` and `transitionRules`. The reason was that the moment-timezone data had no daylight
saving information. Since `add-tzdb-builder`, the packed data carries an isdst flag per period type
(spec `tzdb-packed-format`, "isdst flag encoding"), so these methods can now be implemented with the
same semantics as ThreeTen-Backport.

## What Changes

- The unpacker reads field 6 (the isdst flags) of a packed zone. Data without field 6 still loads.
- `MomentZoneRules` implements the following methods with java.time semantics:
  - `standardOffset(instant)`: the offset without daylight saving
  - `daylightSavings(instant)`: actual offset minus standard offset
  - `isDaylightSavings(instant)`: true when the standard and actual offsets differ
  - `nextTransition(instant)` and `previousTransition(instant)`: the nearest offset change after
    or before an instant
  - `transitions()`: all offset changes in the loaded data
  - `transitionRules()`: always an empty list, because the data is expanded into explicit
    transitions through the year 2499
- Period boundaries where only the abbreviation or the isdst flag changes, and not the offset, are
  not reported as transitions, as in java.time.
- With data that has no isdst flags, `standardOffset`, `daylightSavings` and `isDaylightSavings`
  keep throwing, with a message that names the missing data. The transition methods work with any
  data, because they only need offsets.
- No changes to `@js-joda/core`. Its `ZoneRules` base class and TypeScript typings already declare
  all of these methods.
- Not breaking: the methods threw before and return values now.

## Capabilities

### New Capabilities
- `timezone-zone-rules`: how `@js-joda/timezone` answers `ZoneRules` queries from the tzdb data:
  standard offset, daylight saving amount and offset transitions.

### Modified Capabilities

## Impact

- `packages/timezone/src/unpack.js`, `packages/timezone/src/MomentZoneRules.js`
- New tests in `packages/timezone/test`
- `packages/timezone/README.md` drops "not implemented" from *Implementation details*, CHANGELOG
- The reduced range bundles answer these queries correctly only inside their year range, the same
  limitation that offsets have today.

## Open questions

1. **Deriving the standard offset.** tzdb compiled data (TZif) has no standard offset, only the
   actual offset and the isdst flag. The design derives the standard offset of a daylight saving
   period from the nearest period before it that is not daylight saving (design D2), which matches
   java.time for the rearguard data used here. The alternative is to have the generator emit the
   standard offset per period type, which is exact but changes the packed format. Is the derivation
   good enough?
2. **`transitionRules()`.** java.time returns two rules for zones with ongoing daylight saving.
   `@js-joda/core` has only a TypeScript interface for `ZoneOffsetTransitionRule` and no class. This
   proposal returns an empty list and documents why, rather than adding the class to core. Fine?
3. **Reference values.** The tests use values cross-checked against java.time, for a fixed sample of
   zones and dates that are stable across recent tzdb releases (design D6). A generated Java parity
   fixture would cover more ground, but needs a JDK with the same tzdb version. Is the hand-picked
   sample enough?

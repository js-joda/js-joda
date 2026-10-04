# Proposal

## Why

`@js-joda/timezone` throws `not supported` for most of the `java.time.zone.ZoneRules` API:
`standardOffset`, `daylightSavings`, `isDaylightSavings`, `nextTransition`, `previousTransition`,
`transitions` and `transitionRules`. The reason was that the moment-timezone data had no daylight
saving information. Since `add-tzdb-builder`, the packed data carries an isdst flag per period type
(spec `tzdb-packed-format`, "isdst flag encoding"). The isdst flag alone is not enough for the
standard offset: a one-off check against java.time (JDK 21, tzdb 2026b) found that deriving it from
the flags gives a different result than java.time in 191 periods of 122 zone IDs, for example
Europe/Moscow in 1991 and America/Scoresbysund in 2024 (see `open-questions.md`). ThreeTen-Backport
stores the standard offset, which it takes from the STDOFF column of the tzdb Zone lines. This change
does the same, so that these methods can be implemented with the same results as ThreeTen-Backport.

## What Changes

- `@js-joda/tzdb-builder` takes the standard offset of every period from the STDOFF of the rearguard
  tzdb Zone lines and writes it as a new field 7 of the packed zone string, one entry per period type.
  The change is backward compatible: released unpackers read only fields 0–5 and resolve the same
  offsets. The data is regenerated for the current release.
- `MomentZoneRules` and `MomentZoneRulesProvider` in `@js-joda/timezone` are renamed to
  `TzdbZoneRules` and `TzdbZoneRulesProvider`. The data no longer comes from moment-timezone but from
  the IANA tzdb via `@js-joda/tzdb-builder`, and `TzdbZoneRulesProvider` is the name of the matching
  provider in ThreeTen-Backport. Neither class is part of the public API (the package exports only the
  plug function, and the typings don't name them), so the rename is not breaking. It is done first, as
  a separate commit.
- The unpacker reads field 7 (the standard offsets) of a packed zone. Data without field 7 still loads.
- `TzdbZoneRules` implements the following methods with java.time semantics:
  - `standardOffset(instant)`: the offset without daylight saving
  - `daylightSavings(instant)`: actual offset minus standard offset
  - `isDaylightSavings(instant)`: true when the standard and actual offsets differ
  - `nextTransition(instant)` and `previousTransition(instant)`: the nearest offset change after
    or before an instant
- `transitions()` and `transitionRules()` stay unsupported and keep throwing `not supported`.
  java.time returns an explicit historic list plus recurring rules for later years. Our data has only
  explicit transitions through 2499, so we can't give the same answer, and a different split would
  silently behave differently from java.time. Callers iterate with `nextTransition` instead.
- Period boundaries where only the abbreviation or the isdst flag changes, and not the offset, are
  not reported as transitions, as in java.time.
- With data that has no standard offsets (older packed files, custom data), `standardOffset`,
  `daylightSavings` and `isDaylightSavings` keep throwing, with a message that names the zone and the
  missing standard offsets. They don't fall back to deriving the standard offset from the isdst flags.
  `nextTransition` and `previousTransition` work with any data, because they only need offsets.
- No changes to `@js-joda/core`. Its `ZoneRules` base class and TypeScript typings already declare
  all of these methods.
- Not breaking: the five methods threw before and return values now. The other two throw as before.

## Capabilities

### New Capabilities
- `timezone-zone-rules`: how `@js-joda/timezone` answers `ZoneRules` queries from the tzdb data:
  standard offset, daylight saving amount and the nearest offset transitions.

### Modified Capabilities
- `tzdb-packed-format`: new field 7 with the standard offset per period type, which also becomes part
  of the period type key.
- `tzdb-data-generation`: every period carries a standard offset from the Zone lines, periods are
  split where only the standard offset changes, and a check compares the standard offsets with
  java.time.

## Impact

- `packages/tzdb-builder`: Zone line parsing (`src/zi.js`), period collection (`src/collect.js`),
  packing, range filtering and link grouping (`src/pack.js`), a java.time check script, and tests
- Regenerated `packages/timezone/data/packed/` and `data/unpacked/` files for the current release
  (`latest*.json` and the release's versioned copy). Older versioned files keep their format.
- Renamed in `packages/timezone`: `src/MomentZoneRules.js` → `src/TzdbZoneRules.js`,
  `src/MomentZoneRulesProvider.js` → `src/TzdbZoneRulesProvider.js`, and the tests
  `test/MomentZoneRulesTest.js`, `test/MomentZoneRulesProviderTest.js`, `test/useMomentZoneRules.js`.
  Imports in `src/js-joda-timezone.js`, `src/plug.js` and `test/ZonedDateTimeTest.js`.
- `packages/timezone/src/unpack.js`, `packages/timezone/src/TzdbZoneRules.js`
- New tests in `packages/timezone/test`, including a port of ThreeTen-Backport's
  `TestStandardZoneRules` under `test/reference/`
- `packages/timezone/HowToUpdateTZDB.md`: checklist for data updates
- `packages/timezone/README.md` *Implementation details*: the five methods become supported,
  `transitions` and `transitionRules` stay listed as not implemented, with the reason. CHANGELOG
- The reduced range bundles answer these queries correctly only inside their year range, the same
  limitation that offsets have today.

## Open questions

1. ~~**Deriving the standard offset.**~~ Decided: the generator writes the standard offset into the
   data (option B in `open-questions.md`, design D2 and D7). Data without it makes the three
   daylight saving methods throw.
2. ~~**`transitionRules()`.**~~ Decided: `transitions()` and `transitionRules()` stay unsupported
   and keep throwing (design D5).
3. ~~**Reference values.**~~ Decided: CI runs ThreeTen-Backport's ported `TestStandardZoneRules`,
   own tests for the cases it doesn't cover, and builder tests with synthetic zones modeled on
   `TestZoneRulesBuilder`. The java.time check of all zones and a comparison with the previous data
   run by hand for each data update (design D6).

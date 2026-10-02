# Design

## Context

- `packages/timezone/src/unpack.js` (from moment-timezone) turns a packed zone into
  `{name, abbrs, offsets, untils, population}` with one entry per period. `untils[i]` is the end of
  period `i` in epoch milliseconds, and the last entry is `Infinity`. Offsets are in minutes with the
  sign inverted, as in moment. Field 6 of the packed string, the isdst flag per period type, is ignored
  today.
- `packages/timezone/src/MomentZoneRules.js` implements the offset queries with a binary search over
  `untils`, and throws `not supported` for the seven methods in this change.
- `@js-joda/core` already has `ZoneOffsetTransition` and declares all of the methods on `ZoneRules`
  and in `typings/js-joda.d.ts`. `ZoneOffsetTransitionRule` exists only as a TypeScript interface.
- The data comes from the rearguard tzdb format (spec `tzdb-data-generation`, "Rearguard
  daylight-saving semantics"), so daylight saving amounts are never negative. This matches the data
  that java.time ships.
- The full data has explicit transitions through 2499. The range bundles cover only their year range.
- Consecutive periods can have equal offsets: there are 458 such boundaries in 2026e, for example
  Africa/Algiers 1977 from WEST to CET, both at `+01:00`. `ZoneOffsetTransition.of` rejects equal
  offsets (see the archived `add-tzdb-builder` design, Risks).

## Goals / Non-Goals

**Goals:**
- Results identical to java.time for the zones and dates in the spec scenarios.
- No extra cost for applications that never call these methods: no work at data load time or in
  `getRules`.

**Non-Goals:**
- A `ZoneOffsetTransitionRule` class in `@js-joda/core`.
- Changing the packed data format or the generator.
- `SystemDefaultZoneRules` in core, which still has no daylight saving information.
- Correct answers outside the year range of a reduced bundle.

## Decisions

### D1. Unpack isdst as booleans per period
`unpack` maps field 6 through the same indices as `abbrs` and `offsets` and adds
`isdsts: boolean[]`. It omits `isdsts` when field 6 is missing or empty (old format, or custom data
loaded with `loadTzdbData`).
*Alternative:* keep the per-type string and look up types at query time. Rejected: the per-period
array is what `offsets` and `abbrs` already do, and it costs one array per loaded zone.

### D2. Standard offset from the nearest non-daylight-saving period
For period `i`: if `isdsts[i]` is false, the standard offset is `offsets[i]`. Otherwise, go back to
the nearest period with `isdsts` false and use its offset. If there is none, go forward. No zone in
2026e starts with a daylight saving period, so the forward case only protects against unusual data.
This gives the expected values for summer time, double summer time (Berlin 1945, London 1941),
Lord Howe's 30 minutes, and zones that changed their standard offset (Moscow 2011, Algiers 1977).
*Alternative:* have the generator emit the standard offset per period type from the Zone line's
STDOFF, which is exact by construction. Rejected for now because it changes the packed format and
the generator, and TZif doesn't carry STDOFF, so it would need to come from the zic source. If D6
finds a mismatch with java.time, this becomes the fallback (proposal, open question 1).

### D3. Transitions are lazily computed offset changes
A transition exists at `untils[i]` when `offsets[i] !== offsets[i + 1]`. On first use, the rules
compute and cache a sorted array of transition indices for the zone. `ZoneOffsetTransition` objects
are created on demand. `nextTransition` and `previousTransition` binary search `untils` (the existing
`binarySearch` helper) and then walk to the nearest index in the transition set. Because there are
few equal-offset boundaries, a linear step is enough. The `Infinity` sentinel never counts as a
transition.
*Alternative:* prebuild all `ZoneOffsetTransition` objects at load time. Rejected because of the
load-time cost: about 600 zones, many with more than 1,000 transitions through 2499.

### D4. Strict bounds as in java.time
`nextTransition` returns the first transition at an instant strictly greater than the query. The
query is compared in epoch milliseconds, and the data has minute resolution. `previousTransition`
returns the last transition strictly before the query. This matches ThreeTen-Backport's
`StandardZoneRules`, including an instant exactly at a transition.

### D5. Empty `transitionRules()` and a fresh `transitions()` array
`transitions()` builds a new array of `ZoneOffsetTransition` on each call, so callers can't change
cached state. A zone has at most a few thousand entries, so this is acceptable for a rarely used method.
`transitionRules()` returns `[]`, documented in the JSDoc and the README: with explicit transitions
through 2499, the list is complete without rules.

### D6. Tests with values checked against java.time
A new `packages/timezone/test/MomentZoneRulesDaylightSavingTest.js` covers every spec scenario. The
expected values are checked once against java.time (`jshell` with `ZoneId.of(..).getRules()`) and
the JDK version is recorded in the test header. The samples avoid zones and dates that changed in
recent tzdb releases. A further test loads a zone in the old packed format (without field 6) and
checks the error and that the transitions still work.

## Risks / Trade-offs

- [D2 can differ from java.time where a zone changes its standard offset during daylight saving.]
  → The java.time check in D6 includes such cases (Algiers 1977, Moscow 2011). The fallback is to
  emit the standard offset from the generator (D2 alternative).
- [Reduced bundles give wrong transitions and standard offsets outside their range without an
  error.] → This is the same documented limitation as for offsets. The README states that it also
  applies to the new methods.
- [`transitions()` on the full bundle is large, more than 1,000 entries for European zones through
  2499.] → Documented in the JSDoc. Users who need a window use `nextTransition` in a loop.

## Migration Plan

Not breaking: these methods threw before. The CHANGELOG gets an enhancement entry for
`@js-joda/timezone`, which can ship in a minor release.

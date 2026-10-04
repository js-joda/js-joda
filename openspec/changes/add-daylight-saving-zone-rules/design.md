# Design

## Context

- `packages/timezone/src/unpack.js` (from moment-timezone) turns a packed zone into
  `{name, abbrs, offsets, untils, population}` with one entry per period. `untils[i]` is the end of
  period `i` in epoch milliseconds, and the last entry is `Infinity`. Offsets are in minutes with the
  sign inverted, as in moment. Field 6 of the packed string, the isdst flag per period type, is ignored
  today.
- `packages/tzdb-builder` compiles `rearguard.zi` with zic from the matching tzcode, reads the TZif
  files (`src/tzif.js`) and the POSIX footer (`src/posixTz.js`), and collects periods keyed by
  (abbr, offset, isdst) (`src/collect.js`). `src/zi.js` reads only the Zone and Link names from
  `rearguard.zi`. TZif has no standard offset.
- ThreeTen-Backport's `TzdbZoneRulesCompiler` reads the tzdb source files, not TZif.
  `parseZoneLine` takes the standard offset from the STDOFF column of each Zone line, and Rule lines
  give the SAVE amount. `ZoneRulesBuilder` makes one window per Zone line and adds a standard
  transition wherever STDOFF changes between windows. It computes the window end with
  `TimeDefinition.createDateTime` (UNTIL suffix `u` UTC, `s` standard, `w` wall) and converts it with
  the wall offset at the end of the window. `StandardZoneRules` serializes the standard transitions
  and offsets separately from the wall transitions, and `getStandardOffset` searches them.
- A one-off java.time check (JDK 21.0.12, tzdb 2026b, all 604 IDs) showed that deriving the standard
  offset from the isdst flags differs from java.time in 191 periods of 122 zone IDs. The latest is
  2024 (America/Scoresbysund). See `open-questions.md`, question 1.
- `packages/timezone/src/MomentZoneRules.js` (renamed to `TzdbZoneRules.js` in D8) implements the offset queries with a binary search over
  `untils`, and throws `not supported` for `standardOffset`, `daylightSavings`, `isDaylightSavings`,
  `nextTransition`, `previousTransition`, `transitions` and `transitionRules`. This change implements
  the first five.
- `@js-joda/core` already has `ZoneOffsetTransition` and declares all of the methods on `ZoneRules`
  and in `typings/js-joda.d.ts`. `ZoneOffsetTransitionRule` exists only as a TypeScript interface.
- The data comes from the rearguard tzdb format (spec `tzdb-data-generation`, "Rearguard
  daylight-saving semantics"), so daylight saving amounts are never negative. ThreeTen-Backport uses
  rearguard data too. The JDK converts the vanguard negative daylight saving itself, which gives other
  standard offsets for Europe/Dublin 1968–1971 and Africa/Windhoek since 1990 (found by the check in
  D7 step 5); everywhere else the standard offsets of tzdb 2026b agree with java.time 21.
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
- `transitions()` and `transitionRules()` (D5), and a `ZoneOffsetTransitionRule` class in `@js-joda/core`.
- Regenerating older versioned data files (`data/packed/2018c.json` … `2026d.json`).
- `SystemDefaultZoneRules` in core, which still has no daylight saving information.
- Correct answers outside the year range of a reduced bundle.

## Decisions

### D1. Unpack standard offsets as numbers per period
`unpack` maps field 7 through the same indices as `abbrs` and `offsets` and adds
`stdOffsets: number[]` (minutes, sign inverted like `offsets`), using the existing `arrayToInt` and
`mapIndices`. It omits `stdOffsets` when field 7 is missing or empty (older packed files, or custom
data loaded with `loadTzdbData`). Field 6 (isdst) is not needed by the zone rules: with rearguard
data, isdst is true exactly when the offset differs from the standard offset. `unpack` keeps ignoring
it.
*Alternative:* also unpack isdst. Rejected: no method needs it, and it costs one array per loaded zone.

### D2. Standard offset read from the data, never derived
`standardOffset` returns `stdOffsets[i]` for the period `i` that contains the instant (the same binary
search as for offsets). `daylightSavings` is the offset minus the standard offset, and
`isDaylightSavings` is true when they differ, as in ThreeTen-Backport's `StandardZoneRules`. Without
`stdOffsets`, the three methods throw an error that names the zone and the missing standard offsets.
*Alternative:* derive the standard offset of a daylight saving period from the nearest earlier period
that is not daylight saving. Rejected because it differs from java.time in 122 zone IDs: it fails
wherever a zone changes its standard offset and starts daylight saving at the same moment (Moscow and
most ex-USSR zones in 1991, Samara 2010, Grand_Turk 2018, Scoresbysund 2024, Paris 1944). No heuristic
based on offset and isdst alone reaches zero differences, because TZif doesn't carry STDOFF. A
fallback to this derivation for data without field 7 was also rejected: it would return values that
silently differ from java.time.

### D3. Transitions are lazily computed offset changes
A transition exists at `untils[i]` when `offsets[i] !== offsets[i + 1]`. On first use, the rules
compute and cache a sorted array of transition indices for the zone. `ZoneOffsetTransition` objects
are created on demand. `nextTransition` and `previousTransition` binary search this index array,
comparing `untils[index]` with the query. The `Infinity` sentinel never counts as a transition.
*Alternative:* prebuild all `ZoneOffsetTransition` objects at load time. Rejected because of the
load-time cost: about 600 zones, many with more than 1,000 transitions through 2499.

### D4. Strict bounds as in java.time
`nextTransition` returns the first transition at an instant strictly greater than the query. The
query is compared in epoch milliseconds, and the data has minute resolution. `previousTransition`
returns the last transition strictly before the query. This matches ThreeTen-Backport's
`StandardZoneRules`, including an instant exactly at a transition.

### D5. `transitions()` and `transitionRules()` stay unsupported
Both keep calling `notSupported` as today. In ThreeTen-Backport, `getTransitions()` returns only the
explicit historic part (Europe/Berlin: 63 transitions up to 1997-10-26), and `getTransitionRules()`
returns the recurring rules for later years (Berlin: 2). Our data is expanded into explicit transitions
through 2499 and doesn't say where java.time's historic part ends. A list through 2499 plus empty rules
would give the same transitions in total, but `transitions().length` and the "last listed transition,
then rules" pattern would silently behave differently from java.time. Real rules would need a
`ZoneOffsetTransitionRule` class in core and the split from the generator. The JSDoc of both methods
and the README say why they are not supported and point to `nextTransition` / `previousTransition`.
*Alternative:* the full list through 2499 and `transitionRules()` returning `[]`. Rejected for the
silent differences above, and because the list is large (more than 1,000 entries for Berlin).
*Alternative:* real rules (generator field plus a core class). Deferred: a separate change if needed.

### D6. Tests: ThreeTen-Backport's tests in CI, own additions, java.time check by hand
**In CI** (`tests.yaml`, every push and PR):
- ThreeTen-Backport's `TestStandardZoneRules` is ported to
  `packages/timezone/test/reference/TzdbZoneRulesTest.js`, next to the other ports there. It covers
  Europe/London, Europe/Dublin, Europe/Paris, America/New_York, Asia/Kathmandu and Etc/GMT.

  | ThreeTen-Backport tests | Port |
  |---|---|
  | `getOffset*`, `getOffsetInfo*` (incl. gap/overlap), `preTimeZones`, `equals`, `toString` | as is (existing methods, mapped to `offsetOfInstant`, `validOffsets`, `transition`, …) |
  | `getStandardOffset` (London, Dublin, Paris, New York), `Dublin_dst`, `EtcGmt_next/previousTransition` | as is |
  | `*_nextTransition_historic`, `*_previousTransition_historic` (London, Kathmandu) | iterate over an expected list generated once with `jshell` from `getTransitions()` and written into the test, instead of calling `transitions()` |
  | `London_*_rulesBased` (1998–2009) | a helper in the test computes "last Sunday in March/October, 01:00 UTC" instead of `rules.createTransition(year)` |
  | `Kathmandu_nextTransition_noRules` | the last transition comes from `previousTransition` instead of the list |
  | `London_nextTransition_lastYear` (`Year.MAX_VALUE`) | replaced: `nextTransition` after the last transition in 2499 returns null |
  | `getTransitions`, `getTransitionRules`, `*_immutable` | replaced: both throw `not supported` |
  | `serialization`, `rulesWithoutTransitions` | dropped (Java and builder specific) |

  The test header records the ThreeTen-Backport version and commit the port is based on.
- Own tests in `packages/timezone/test` cover what ThreeTen-Backport doesn't: the spec scenarios
  Moscow 1991, Lord Howe, Algiers 1977 and Abidjan, data without field 7, the reduced bundle, `unpack`
  with field 7, and `transitions` / `transitionRules` throwing. Expected values are checked once with
  `jshell`, and the JDK and tzdb versions are recorded in the test header.
- Builder tests in `packages/tzdb-builder/test` use synthetic zones modeled on ThreeTen-Backport's
  `TestZoneRulesBuilder` (`test_combined_windowChangeDuringDST`, `…WithinDST`, `…endsInSavings`) and a
  standard-offset-only change that requires a split. They feed `collectZone` with periods and windows
  directly, so no zic is needed. These cases don't occur in today's data, so they are tested only
  this way.

**By hand, for each data update** (checklist in `packages/timezone/HowToUpdateTZDB.md`): the java.time
standard offset check (D7 step 5), the moment-timezone parity check (`scripts/parity.js`), and a
comparison with the previously committed data that lists every zone whose offsets, abbreviations or
isdst flags changed. That list is compared with the IANA release notes.

*Alternative:* Java-generated expected values for all zones, committed and run in CI. Rejected: the
JDK's tzdb version usually differs from ours (now 2026b vs 2026e), which causes false failures, and
the fixture would need regenerating for every release with a JDK that often isn't there yet.
ThreeTen-Backport doesn't do this either.

### D7. Generator: standard offset from the Zone lines (field 7)
The builder follows ThreeTen-Backport, but keeps TZif as the source of offsets and untils:
1. `zi.js` parses each Zone of `rearguard.zi` into windows `(stdoff, untilLocal, suffix)`, accepting
   the abbreviated keywords that `zishrink.awk` writes. A line it can't parse fails the build, naming
   the zone.
2. Each window end is converted to an instant like `TimeDefinition.createDateTime`: `u`/`g`/`z` →
   `untilLocal` as UTC; `s` → `untilLocal − stdoff`; `w` or no suffix → the instant `x` with
   `x = untilLocal − offset`, where offset is that of the compiled period ending at or containing `x`
   (the wall offset in effect at the end of the window).
3. `collectZone` assigns each period the stdoff of the window that contains its start, and merges
   consecutive periods only when (abbr, offset, isdst, stdoff) are equal. If a window ends inside a
   period, the period is split there. That adds an until with an equal offset, which old readers
   resolve the same way. With 2026b in Java this case doesn't occur: of 1,690 standard offset changes,
   only Paris and Monaco on 1944-08-25 keep both offset and isdst, and there the abbreviation changes.
   For periods expanded from the POSIX footer, the stdoff comes from the last window and must equal the
   standard offset in the TZ string. The build fails otherwise.
4. `pack.js` adds stdoff to the period type key and writes field 7 in the encoding of field 2.
   `filterYears` slices `stdOffsets` along with the other arrays. `createLinks` includes `stdOffsets`
   in its comparison key, so zones that differ only in the standard offset are not grouped into one
   link. The unpacked JSON gains `stdOffsets` per zone.
5. A script, like `scripts/parity.js`, runs a small Java program that compares
   `ZoneRules.getStandardOffset` at the start of every period with the generated data and prints both
   tzdb versions. It is run by hand, because CI has no JDK with a matching tzdb. Known differences are
   listed with their reason in `scripts/standard-offsets-expected.json` (Africa/Windhoek, Europe/Dublin
   and its link Eire, see Context), as `scripts/parity-expected.json` does for the parity check. Zones
   the JDK doesn't know (EST, HST, MST, GMT+0, GMT-0, ROC) are only listed. With 2026b data and a JDK
   with tzdb 2026b, all other 223,609 periods agree.
*Alternative:* compile `rearguard.zi` a second time with every SAVE set to 0 and read the standard
offsets from that TZif. Rejected: window ends in wall time then move by the saving amount, which is
exactly where the cases above happen.
*Alternative:* store the daylight saving amount instead of the standard offset. Equivalent, but the
standard offset is what `standardOffset` returns and matches `StandardZoneRules`.

### D8. Rename to `TzdbZoneRules` and `TzdbZoneRulesProvider`
`MomentZoneRules` → `TzdbZoneRules` and `MomentZoneRulesProvider` → `TzdbZoneRulesProvider`, with
their files and tests (`MomentZoneRulesTest.js` → `TzdbZoneRulesTest.js`,
`MomentZoneRulesProviderTest.js` → `TzdbZoneRulesProviderTest.js`, `useMomentZoneRules.js` →
`useTzdbZoneRules.js`). The data comes from the IANA tzdb through `@js-joda/tzdb-builder`, not from
moment-timezone. `TzdbZoneRulesProvider` matches ThreeTen-Backport's and the JDK's provider of the same
role. The rename is a separate first commit with `git mv` and no behavior change, so the daylight
saving diff stays readable and `git log --follow` keeps the file history. It is not breaking: neither
class is exported or named in `typings/`. `unpack.js` keeps its name and its moment-timezone
copyright header, because fields 0–5 of the packed format still are moment-timezone's encoding.
*Alternative:* `StandardZoneRules` as in java.time. Rejected: java.time's class has a different
structure (standard and wall transition tables plus recurring rules), and the same name would suggest
the same behavior, for example for `transitionRules()`.
*Alternative:* keep the old names. Rejected: they wrongly suggest a dependency on moment-timezone.

## Risks / Trade-offs

- [ThreeTen-Backport's tests were written against global-tz data (`2026egtz`), ours is IANA (`2026e`).
  A ported expectation can differ for a reason in the data, not in our code.] → The six zones are
  canonical in both. Each difference is checked against both data sets and commented in the test,
  never just changed to the value we return.

- [The Zone line parser in D7 misreads a tzdb construct (for example a new UNTIL form), and the
  standard offsets come out wrong without the offsets being affected.] → Unparseable lines fail the
  build. The footer cross-check in D7 step 3 and the java.time check in D7 step 5 catch wrong values.
- [The java.time check needs a JDK with the same tzdb version, and a JDK usually lags behind.] → Run
  it with the closest version and treat differences in zones that changed between the two releases as
  expected. A newer JDK tzdb can be installed with Oracle's `tzupdater`.
- [Older versioned data files have no field 7, so `loadTzdbData` with them makes the three methods
  throw.] → This is the documented behavior for data without standard offsets. The README says which
  data has them.
- [Field 7 makes the packed files bigger.] → It is about as big as field 2: about 6 KB of 720 KB in
  `latest.json` and less than 1 KB in the 10-year range.
- [Reduced bundles give wrong transitions and standard offsets outside their range without an
  error.] → This is the same documented limitation as for offsets. The README states that it also
  applies to the new methods.
- [Code ported from Java that calls `transitions()` or `transitionRules()` still gets an error.] → The
  error and the docs name `nextTransition` / `previousTransition` as the way to iterate. Real support
  can follow in a separate change.

## Migration Plan

Not breaking: the five methods threw before, `transitions` and `transitionRules` throw as before, and released versions of `@js-joda/timezone` read the new
data files unchanged. The data is regenerated with the extended builder for the current release
(`latest*.json` and its versioned copy in `data/packed` and `data/unpacked`), with a check that
offset, abbreviation and isdst stay the same at every instant compared with the previous data. The CHANGELOG gets an
enhancement entry for `@js-joda/timezone`, which can ship in a minor release.

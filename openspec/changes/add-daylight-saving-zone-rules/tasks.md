# Tasks

All open questions in `proposal.md` are decided: the standard offset comes from the data (design D2,
D7), `transitions()` and `transitionRules()` stay unsupported (D5), and CI runs ThreeTen-Backport's
ported tests plus own additions, with the java.time check run by hand for data updates (D6).

## 0. Rename (separate commit, no behavior change)

- [x] 0.1 Rename with `git mv` in `packages/timezone`: `src/MomentZoneRules.js` → `src/TzdbZoneRules.js` (class `TzdbZoneRules`, including the `instanceof` in `equals`), `src/MomentZoneRulesProvider.js` → `src/TzdbZoneRulesProvider.js` (class `TzdbZoneRulesProvider`), `test/MomentZoneRulesTest.js` → `test/TzdbZoneRulesTest.js`, `test/MomentZoneRulesProviderTest.js` → `test/TzdbZoneRulesProviderTest.js`, `test/useMomentZoneRules.js` → `test/useTzdbZoneRules.js`, `test/MomentZoneRulesIsdstSplitTest.js` → `test/TzdbZoneRulesIsdstSplitTest.js`. Update the imports in `src/js-joda-timezone.js`, `src/plug.js` and `test/ZonedDateTimeTest.js`, the `describe` names, and the outdated `MomentZoneRulesTest.js` link in `README.md` (design D8). Verify that `grep -rn "MomentZoneRules" packages/` (outside `node_modules`, `dist` and generated `docs`) finds nothing, that `npm test` in `packages/timezone` passes unchanged, and that `git log --follow` shows the history of the renamed files

## 1. Reference values

- [ ] 1.1 Check every spec scenario against java.time with `jshell` (`ZoneId.of(..).getRules()`: `getStandardOffset`, `getDaylightSavings`, `isDaylightSavings`, `nextTransition`, `previousTransition`). Record the JDK and tzdb version, and replace any sample that differs because of tzdb version differences. Verify that all scenario values in `specs/timezone-zone-rules/spec.md` and `specs/tzdb-data-generation/spec.md` agree with java.time

## 2. Generator (`packages/tzdb-builder`)

- [ ] 2.1 Extend `src/zi.js` to parse each Zone of `rearguard.zi` into windows (STDOFF, UNTIL, suffix), including continuation lines and abbreviated keywords, and to fail with the zone name on a line it can't parse (design D7 step 1). Verify with unit tests for Europe/Moscow, Europe/Paris, Africa/Algiers and an UNTIL with each suffix (`u`, `s`, `w`, none)
- [ ] 2.2 Convert window ends to instants and assign each collected period its standard offset in `src/collect.js`: merge only on equal (abbr, offset, isdst, stdoff), split a period where a window ends inside it, and cross-check footer-expanded periods against the POSIX TZ standard offset (design D7 steps 2–3). Verify with tests for the "Standard offset from the tzdb Zone lines" and "Merge only identical consecutive periods" scenarios, using synthetic zones fed directly to `collectZone` and modeled on ThreeTen-Backport's `TestZoneRulesBuilder` (`test_combined_windowChangeDuringDST`, `…WithinDST`, `…endsInSavings`), plus a standard-offset-only change that requires a split (design D6)
- [ ] 2.3 Write field 7 and extend the type key in `src/pack.js`, slice `stdOffsets` in `filterYears`, include it in the `createLinks` key, and add `stdOffsets` to the unpacked JSON (design D7 step 4). Verify with tests for the "Standard offset encoding", "isdst flag encoding" and "Eight fields" scenarios, and that two zones differing only in standard offset are not linked
- [ ] 2.4 Add a script that compares the generated standard offsets with java.time for every zone at the start of every period through 2499 and prints both tzdb versions (design D7 step 5). Verify by running it with the local JDK: no differences outside zones that changed between the JDK's tzdb and the generated release
- [ ] 2.5 Regenerate the data for the current release (`latest*.json` and the versioned copy in `packages/timezone/data/packed` and `data/unpacked`). Verify that the moment-timezone parity check still passes, and that the unpacker of the latest released `@js-joda/timezone` resolves the same offset at every period boundary from the new and the previous `latest.json`

## 3. Unpacking

- [ ] 3.1 Extend `packages/timezone/src/unpack.js` to map field 7 to a per-period `stdOffsets` array, and to omit it when field 7 is missing or empty (design D1). Verify with a test that Europe/Berlin unpacks a standard offset of `-60` for its CET and CEST periods, and that zone strings without field 7 (with and without field 6) unpack without `stdOffsets`

## 4. Zone rules

- [ ] 4.1 Implement `standardOffset`, `daylightSavings` and `isDaylightSavings` in `packages/timezone/src/TzdbZoneRules.js` from `stdOffsets` (design D2), throwing an error that names the zone and the missing standard offsets when `stdOffsets` is absent. Verify with tests for the "Standard offset", "Daylight saving amount" and "Data without standard offsets" requirement scenarios
- [ ] 4.2 Implement the lazy transition index and `nextTransition` / `previousTransition`, skipping equal-offset boundaries and the `Infinity` sentinel (design D3, D4). Verify with tests for the "Next and previous transition" and "Offset transitions only" scenarios, including the instant exactly at a transition and Africa/Algiers 1977
- [ ] 4.3 Keep `transitions()` and `transitionRules()` throwing `not supported`, and update their JSDoc in `TzdbZoneRules.js` with the reason and a pointer to `nextTransition` / `previousTransition` (design D5). Verify with tests for the "Transition list and transition rules not supported" scenarios, including iterating Berlin 2026 with `nextTransition`
- [ ] 4.4 Check a reduced bundle: build a `TzdbZoneRules` directly from `unpack` of the Europe/Berlin entry in `data/packed/latest-10-year-range.json`. (`test/useTzdbZoneRules.js` loads the full data into the global provider, so it can't be used here.) Verify with a test that the Berlin 2026 scenario results equal the full data's results

- [ ] 4.5 Port ThreeTen-Backport's `TestStandardZoneRules` to `packages/timezone/test/reference/TzdbZoneRulesTest.js` as listed in design D6. Generate the expected transition lists for Europe/London and Asia/Kathmandu once with `jshell` from `getTransitions()`, and record the ThreeTen-Backport version and commit in the header. Check every expectation that fails against both global-tz and IANA data, and comment it in the test. Verify with tests for the "Conformance with ThreeTen-Backport's zone rules tests" scenarios and that the whole ported suite passes

## 5. Documentation

- [ ] 5.1 Update `packages/timezone/README.md` *Implementation details*: list the five newly supported methods, keep `transitions` and `transitionRules` as not implemented with the reason and the `nextTransition` alternative, say that reduced bundles answer only inside their range, and that data without standard offsets (older versioned files, custom data) makes the three daylight saving methods throw. Document field 7 in `packages/tzdb-builder/README.md`. Add a CHANGELOG enhancement entry. Verify the README example by running it against the built bundle

- [ ] 5.2 Add the data update checklist to `packages/timezone/HowToUpdateTZDB.md`: java.time standard offset check (task 2.4), moment-timezone parity check, and a comparison with the previous data. Add the comparison as a builder script that lists every zone whose offsets, abbreviations or isdst flags changed (design D6). Verify with a test for the "Data update checks" scenario and by running the checklist once for the current release

## 6. Integration

- [ ] 6.1 Run `cd packages/tzdb-builder && npm test`, `cd packages/timezone && npm run test-ci` and `npm run test-ts-definitions`, then the examples suite (`npx lerna run --stream build-dist`, `cd packages/examples && npm test`). Verify that all pass

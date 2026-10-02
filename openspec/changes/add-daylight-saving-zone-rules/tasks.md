# Tasks

Resolve the open questions in `proposal.md` first. These tasks assume the standard offset is derived
from the data (design D2), `transitionRules()` returns an empty list (D5), and the tests use
hand-picked values checked against java.time (D6).

## 1. Reference values

- [ ] 1.1 Check every spec scenario against java.time with `jshell` (`ZoneId.of(..).getRules()`: `getStandardOffset`, `getDaylightSavings`, `isDaylightSavings`, `nextTransition`, `previousTransition`, `getTransitions`). Record the JDK and tzdb version, and replace any sample that differs because of tzdb version differences. Verify that all scenario values in `specs/timezone-zone-rules/spec.md` agree with java.time

## 2. Unpacking

- [ ] 2.1 Extend `packages/timezone/src/unpack.js` to map field 6 to a per-period `isdsts` boolean array, and to omit it when field 6 is missing or empty (design D1). Verify with a test that Europe/Berlin unpacks `isdsts` that are true exactly for CEST and CEMT periods, and that a zone string without field 6 unpacks without `isdsts`

## 3. Zone rules

- [ ] 3.1 Implement `standardOffset`, `daylightSavings` and `isDaylightSavings` in `packages/timezone/src/MomentZoneRules.js` (design D2), throwing an error that names the missing daylight saving data when `isdsts` is absent. Verify with tests for the "Standard offset", "Daylight saving amount" and "Data without daylight saving flags" requirement scenarios
- [ ] 3.2 Implement the lazy transition index and `nextTransition` / `previousTransition`, skipping equal-offset boundaries and the `Infinity` sentinel (design D3, D4). Verify with tests for the "Next and previous transition" and "Offset transitions only" scenarios, including the instant exactly at a transition and Africa/Algiers 1977
- [ ] 3.3 Implement `transitions()`, which returns a new array on each call, and `transitionRules()`, which returns `[]` (design D5). Update their JSDoc. Verify with tests for the "Transition list" scenarios, including the consistency check against `nextTransition` over all Europe/Berlin transitions
- [ ] 3.4 Check a reduced bundle: build a `MomentZoneRules` directly from `unpack` of the Europe/Berlin entry in `data/packed/latest-10-year-range.json`. (`test/useMomentZoneRules.js` loads the full data into the global provider, so it can't be used here.) Verify with a test that the Berlin 2026 scenario results equal the full data's results

## 4. Documentation

- [ ] 4.1 Update `packages/timezone/README.md` *Implementation details*: list the supported methods, say that `transitionRules()` is empty and why, and that reduced bundles answer only inside their range. Add a CHANGELOG enhancement entry. Verify the README example by running it against the built bundle

## 5. Integration

- [ ] 5.1 Run `cd packages/timezone && npm run test-ci` and `npm run test-ts-definitions`, then the examples suite (`npx lerna run --stream build-dist`, `cd packages/examples && npm test`). Verify that all pass

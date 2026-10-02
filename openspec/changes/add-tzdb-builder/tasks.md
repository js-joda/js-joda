# Tasks

## 1. Package scaffold

- [ ] 1.1 Create `packages/tzdb-builder/` (`package.json`: private, `"type": "module"`, `engines.node >=20`, devDependency `zx`, scripts `generate` = `node src/cli.js`, `parity`, `test`, `lint`; `.gitignore` with `.cache/`; README stub) and verify that `npm install` at the root links it as a workspace and `npm test -w packages/tzdb-builder` runs (0 tests)
- [ ] 1.2 Add the ESLint config to match the repo and verify that `npm run lint -w packages/tzdb-builder` passes
- [ ] 1.3 Implement the step runner in `src/cli.js` (zx `argv`; positional `<latest|version>`; `--step`, `--from` and `--force`; an ordered step registry of `(ctx) => ctx` functions, empty for now; non-zero exit with a message on error). Verify with a unit test that `--step` runs only the named step, `--from` runs the remaining steps in order, and an unknown step name fails

## 2. Fetch and compile

- [ ] 2.1 Implement the `fetch` step in `src/fetch.js`: resolve `latest` via `data.iana.org/time-zones/tzdb/version`, download tzcode+tzdata with global `fetch` into `.cache/<ver>/` (reused when present unless `--force`), extract with `tar` via zx `$`, reject unknown versions with a clear error. Verify with unit tests that stub `fetch` and `$` (latest resolution, explicit version, cache reuse, 404 → error)
- [ ] 2.2 Implement the `compile` step in `src/compile.js` using zx `$`: check up front for `make`, `cc` and `tar` with `which` (named error if one is missing), run `make zic rearguard.zi` and `zic -b fat -d <out> rearguard.zi`, and put the output dir plus the Zone and Link names parsed from `rearguard.zi` into `ctx`. Verify manually with `npm run generate -- 2026a --step compile` (after `--step fetch`) that TZif files exist for Europe/Berlin and Europe/Kiev

## 3. TZif parsing and expansion

- [ ] 3.1 Implement `src/tzif.js` (RFC 8536 v2+ 64-bit section: transitions, ttinfo utoff/isdst/abbr, footer). Verify with unit tests on small committed TZif fixtures (Europe/Berlin, Etc/GMT-2, Europe/Dublin from rearguard)
- [ ] 3.2 Implement `src/posixTz.js` (parse the TZ string, `Mm.w.d`/`Jn`/`n` rules, time offsets incl. >24h and negative, expand transitions per year up to 2499). Verify with unit tests for the northern and southern hemisphere, fixed-only strings, and the year 2499 boundary
- [ ] 3.3 Add a cross-check test that compares the expanded 2038–2040 offsets with Node `Intl` for all zones in a compiled fixture set and verify it passes

## 4. Collect and unpacked output

- [ ] 4.1 Implement `src/collect.js`: TZif + expansion → periods `{abbrs, untils, offsets, isdsts}` (minutes west, last until `null`), merge on (abbr, offset, isdst), one entry per Zone and Link name. Verify with unit tests for the Berlin 2026 periods, Etc/GMT-2 single period, Dublin summer isdst=1, and an isdst-only change kept separate
- [ ] 4.2 Implement the unpacked writer (`data/unpacked/latest.json` + `<ver>.json`, stable key order, no countries/population). Verify that a test asserts the shape and that two runs produce byte-identical output

## 5. Packing, links and ranges

- [ ] 5.1 Port the moment-timezone-utils pack/filterYears/createLinks into `src/pack.js` with an MIT attribution header. Type key (abbr, offset, isdst), field 5 empty, field 6 isdst flags. Verify with unit tests: the Berlin field 6 is `0011`, and `packages/timezone/src/unpack.js` on the output yields the same abbrs/offsets/untils as the input
- [ ] 5.2 Implement the link leader rule (Zone-line name first, then lexicographic) and sorted links. Verify with a test that `Europe/Kyiv|Europe/Kiev` is produced
- [ ] 5.3 Implement `src/ranges.js` (all, -4-year-range, -10-year-range, -60-year-range, -1970-2030, -2012-2022, -2017-2027 relative to the UTC year) and write `data/packed/latest*.json` + `<ver>.json`. Verify with a test that, for each variant, the offset at sampled instants inside the range equals the full data
- [ ] 5.4 Register all steps (`fetch → compile → collect → write-unpacked → pack`) in the CLI and verify that `npm run generate -- 2026a` writes all files listed in the spec, that a second run leaves `git status` clean, and that `npm run generate -- 2026a --step pack` reruns only the packing from the cached data

## 6. Parity and migration of @js-joda/timezone

- [ ] 6.1 Implement `scripts/parity.js` (offset diff at all transitions up to 2037, with an expected-differences list for rearguard zones). Verify that it exits 0 against a moment-timezone checkout's `data/unpacked/2026a.json` for the 2026a data generated in 5.4, and record the expected-difference report in the PR
- [ ] 6.2 Add a test in `packages/timezone/test` for `validOffsets`/`transition` around an isdst-only (equal offset) transition and verify that it passes against the new data
- [ ] 6.3 Delete `packages/timezone/transform-data.js` and the `transform-data` script, remove `moment-timezone` from the root devDependencies, and verify that `grep -r moment-timezone --exclude-dir=node_modules packages/*/package.json package.json` finds nothing and `npm install` succeeds
- [ ] 6.4 Rebuild the timezone bundles and verify that `cd packages/timezone && npm run test-ci` passes and that `dist/` contains the `-4-year-range` and `-60-year-range` bundle sets
- [ ] 6.5 Update `packages/timezone/README.md` (bundle list with the new ranges and the exact year spans), rewrite `packages/timezone/HowToUpdateTZDB.md` (prerequisites, `npm run generate`, parity, build, test), add a CHANGELOG entry, and verify that the documented commands run as written

## 7. Release monitoring

- [ ] 7.1 Add `.github/workflows/tzdb-release-check.yaml` (weekly schedule + `workflow_dispatch`, `issues: write`, compare IANA version vs `packages/timezone/data/packed/latest.json`, open `Update tzdb to <ver>` unless an open issue exists). Verify with `actionlint` (if available) and a manual `workflow_dispatch` run after merge

## 8. Integration

- [ ] 8.1 Run the full pipeline (`npx lerna run --stream build-dist`, `npx lerna run --stream build-locale-dist`, `cd packages/examples && npm test`) and verify that all integration scenarios pass

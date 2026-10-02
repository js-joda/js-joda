# Tasks

Organized as independently mergeable slices. Slice 1 checks the riskiest assumption first: that
rearguard zic + JS TZif parsing reproduces moment's offsets. It does not touch `packages/timezone`.

## 1. Slice 1 — Scaffold and step runner

- [x] 1.1 Create `packages/tzdb-builder/` (`package.json`: private, `"type": "module"`, `engines.node >=20`, devDependency `zx`, scripts `generate` = `node src/cli.js`, `parity`, `test`, `lint`; `.gitignore` with `.cache/`; README stub) and verify that `npm install` and `npm test` run inside `packages/tzdb-builder` (the repo uses per-package installs, and lerna skips private packages because `lerna.json` sets `"private": false`, as for `@js-joda/examples`)
- [x] 1.2 Add the ESLint config to match the repo and verify that `npm run lint` passes in `packages/tzdb-builder`
- [x] 1.3 Implement the step runner in `src/cli.js` (zx `argv`; positional `<latest|version>`; `--step`, `--from` and `--force`; an ordered step registry of `(ctx) => ctx` functions, empty for now; non-zero exit with a message on error). Verify with a unit test that `--step` runs only the named step, `--from` runs the remaining steps in order, and an unknown step name fails

- [x] 1.4 Add a step to `.github/workflows/tests.yaml` that runs `npm ci`, `npm run lint` and `npm test` in `packages/tzdb-builder` (lerna skips the private package). Verify that the workflow file is valid YAML and that the same commands pass locally without network access to IANA or a C compiler

## 2. Slice 1 — Fetch and compile

- [x] 2.1 Implement the `fetch` step in `src/fetch.js`: resolve `latest` via `data.iana.org/time-zones/tzdb/version`, download tzcode+tzdata with global `fetch` into `.cache/<ver>/` (reused when present unless `--force`), extract with `tar` via zx `$`, reject unknown versions with a clear error. Verify with unit tests that stub `fetch` and `$` (latest resolution, explicit version, cache reuse, 404 → error)
- [x] 2.2 Implement the `compile` step in `src/compile.js` using zx `$`: check up front for `make`, `cc` and `tar` with `which` (named error if one is missing), run `make NDATA= zic rearguard.zi` (ThreeTen-Backport's file list, no `factory`) and `zic -b fat -d <out> rearguard.zi`, and put the output dir plus the Zone and Link names parsed from `rearguard.zi` into `ctx`. Verify manually with `npm run generate -- 2026a --step compile` (after `--step fetch`) that TZif files exist for Europe/Berlin and Europe/Kiev

## 3. Slice 1 — TZif parsing and collection (explicit transitions up to 2037)

- [x] 3.1 Implement `src/tzif.js` (RFC 8536 v2+ 64-bit section: transitions, ttinfo utoff/isdst/abbr, footer string returned raw). Verify with unit tests on small committed TZif fixtures (Europe/Berlin, Etc/GMT-2, Europe/Dublin from rearguard)
- [x] 3.2 Implement the `collect` step in `src/collect.js`: TZif transitions → periods `{abbrs, untils, offsets, isdsts}` (minutes west, last until `null`), merge on (abbr, offset, isdst), one entry per Zone and Link name. In this slice it covers only the explicit transitions (up to 2037) and writes `.cache/<ver>/unpacked.json`. Verify with unit tests for the Berlin 2026 periods, Etc/GMT-2 single period, Dublin summer isdst=1, and an isdst-only change kept separate

## 4. Slice 1 — Parity with moment-timezone

- [x] 4.1 Implement `scripts/parity.js <moment-unpacked.json> <ours-unpacked.json> [--until <year>]` (offset diff at every transition instant of both sides up to `--until`, default 2037; differences in a documented list of rearguard zones are reported as expected). Verify with a unit test on two small hand-made inputs (equal, expected diff, unexpected diff → non-zero exit)
- [x] 4.2 Run `npm run generate -- 2026a --from fetch` and then `npm run parity -- <moment-timezone>/data/unpacked/2026a.json .cache/2026a/unpacked.json`. Verify that it exits 0 and record the expected-difference report in the slice's PR. If there are unexpected differences, stop and revisit design D2/D3 before continuing

## 5. Slice 2 — Transitions up to 2499 and unpacked output

- [ ] 5.1 Implement `src/posixTz.js` (parse the TZ string, `Mm.w.d`/`Jn`/`n` rules, time offsets incl. >24h and negative, expand transitions per year up to 2499). Verify with unit tests for the northern and southern hemisphere, fixed-only strings, and the year 2499 boundary
- [ ] 5.2 Use the expansion in `collect` after the last explicit transition. Verify with a cross-check test against Node `Intl` for 2038–2040 over a compiled fixture set, and by running the parity script with `--until 2499` against moment `2026a.json` (moment's zdump data reaches 2499)
- [ ] 5.3 Implement the `write-unpacked` step (`packages/timezone/data/unpacked/latest.json` + `<ver>.json`, stable key order, no countries/population). Verify that a test asserts the shape and that two runs produce byte-identical output

## 6. Slice 3 — Packing, links and ranges

- [ ] 6.1 Port the moment-timezone-utils pack/filterYears/createLinks into `src/pack.js` with an MIT attribution header. Type key (abbr, offset, isdst), field 5 empty, field 6 isdst flags. Verify with unit tests: the Berlin field 6 is `0011`, and `packages/timezone/src/unpack.js` on the output yields the same abbrs/offsets/untils as the input
- [ ] 6.2 Implement the link leader rule (Zone-line name first, then lexicographic) and sorted links. Verify with a test that `Europe/Kyiv|Europe/Kiev` is produced
- [ ] 6.3 Implement `src/ranges.js` and the `pack` step (all, -4-year-range, -10-year-range, -60-year-range, -1970-2030, -2012-2022, -2017-2027 relative to the UTC year), writing `data/packed/latest*.json` + `<ver>.json`. Verify with a test that, for each variant, the offset at sampled instants inside the range equals the full data
- [ ] 6.4 Register all steps (`fetch → compile → collect → write-unpacked → pack`) and verify that `npm run generate -- 2026a` writes all files listed in the spec, that a second run leaves `git status` clean, and that `npm run generate -- 2026a --step pack` reruns only the packing from the cached data

## 7. Slice 3 — Migration of @js-joda/timezone

- [ ] 7.1 Add a test in `packages/timezone/test` for `validOffsets`/`transition` around an isdst-only (equal offset) transition and verify that it passes against the new data
- [ ] 7.2 Delete `packages/timezone/transform-data.js` and the `transform-data` script, remove `moment-timezone` from the root devDependencies, and verify that `grep -r moment-timezone --exclude-dir=node_modules packages/*/package.json package.json` finds nothing and `npm install` succeeds
- [ ] 7.3 Rebuild the timezone bundles and verify that `cd packages/timezone && npm run test-ci` passes and that `dist/` contains the `-4-year-range` and `-60-year-range` bundle sets
- [ ] 7.4 Update `packages/timezone/README.md` (bundle list with the new ranges and the exact year spans), rewrite `packages/timezone/HowToUpdateTZDB.md` (prerequisites, `npm run generate`, parity, build, test), add a CHANGELOG entry, and verify that the documented commands run as written

## 8. Slice 4 — Release monitoring and integration

- [ ] 8.1 Add `.github/workflows/tzdb-release-check.yaml` (weekly schedule + `workflow_dispatch`, `issues: write`, compare IANA version vs `packages/timezone/data/packed/latest.json`, open `Update tzdb to <ver>` unless an open issue exists). Verify with `actionlint` (if available) and a manual `workflow_dispatch` run after merge
- [ ] 8.2 Run the full pipeline (`npx lerna run --stream build-dist`, `npx lerna run --stream build-locale-dist`, `cd packages/examples && npm test`) and verify that all integration scenarios pass

# Tasks

Decisions (see `design.md`): base bundles only `weekData`, `registerLocaleData` merges, prebuilt
packages ship a `likelySubtags` subset and `metaZones`, `no-zone-names` entry via an `exports` map,
peer range stays `>=5.0.0`. All paths below are relative to `packages/locale` unless noted.

## 1. Baseline

- [ ] 1.1 Record the current gzip sizes of `dist/js-joda-locale.min.js` and `packages/en-us/dist/index.min.js` (after `npm run build-dist && npm run build-locale-dist` on this branch before any change) in a comment on the PR draft; they are the reference for the size scenarios. Verify the numbers match roughly the ~44 KB total from #421

## 2. Merging in registerLocaleData

- [ ] 2.1 In `src/format/cldr/CldrCache.js`, keep the `Set` of registered paths and add a `WeakMap<data, Set<path>>` (design decision 2); pass a new object for an already registered path to `Cldr.load` (merge); skip an object already registered for that path; keep `loadCldrData` skipping every registered path. Verify with new tests in `test/format/cldr/CldrCacheTest.js`: two partial `likelySubtags` objects for the same path are both resolvable, the same object twice is a no-op, and a registered path is not reloaded from `cldr-data`
- [ ] 2.2 Update the doc comment of `registerLocaleData` in `src/format/cldr/CldrCache.js` and `typings/js-joda-locale.d.ts` to describe merging, including that arrays are replaced, not merged. Verify `npm run test-ts-definitions` passes

## 3. Missing-data errors

- [ ] 3.1 In `getOrCreateCldrInstance`, when `cldrjs` reports `Could not find likelySubtags for <bundle>`, push `<bundle>` back onto `Cldr._availableBundleMapQueue` and throw an `IllegalStateException` naming `<bundle>`, the requested locale, `registerLocaleData('supplemental/likelySubtags.json', …)` and updating all prebuilt packages; throw the same kind of error naming the requested locale when `supplemental/likelySubtags` is absent; cache nothing on error (design decision 6). Verify with a test that runs without `cldr-data` data for `likelySubtags` (stub `loadCldrData`/use a fresh `cldrjs` state) and covers all three spec scenarios of "Missing likelySubtags data", including the recovery in the same process
- [ ] 3.2 In `CldrZoneTextPrinterParser`, throw an `IllegalStateException` when `supplemental/metaZones` or `dates/timeZoneNames` of the locale is missing, only where a name is needed (design decision 6): in `print` after the `ZoneOffset` branch, in `parse` only instead of the final `return ~position`. Verify with tests in `test/format/ZoneTextPrinterParserTest.js` for `z`, `zzzz`, `v` in print and parse, that a fixed-offset zone still prints and `UTC`, `+01:00`, a zone ID and `Z` still parse without names, and that a zone without a CLDR name still prints its ID

## 4. Base package without likelySubtags and metaZones

- [ ] 4.1 In `src/supplemental-data.js`, keep the three `loadCldrData` calls and bundle/register only `weekData`. Verify with `npm run build-dist` that `dist/js-joda-locale.min.js` contains no `likelySubtags` / `metazoneInfo` keys (`grep -c`) and that `npm test` passes (Node.js with `cldr-data`)
- [ ] 4.2 Add a test that imports the built `dist/js-joda-locale.js` in a child process with `cldr-data` made unresolvable, registers only `main/th/ca-gregorian.json`, and expects the likelySubtags error; then, in the same process, also registers `supplemental/likelySubtags.json` and expects the Thai month name (relies on the queue restore from 3.1). Verify it passes

## 5. Prebuilt bundles

- [ ] 5.1 In `utils/clrdr-data-render.js`, compute the `likelySubtags` subset of the expanded locales with the rule from design decision 3 and render it, plus a `zoneNames` flag, through `utils/cldr-data.ejs` (subset first, then `metaZones` and `timeZoneNames` only when `zoneNames` is set). Verify the rendered entry for `en-us` with and without `zoneNames` by a unit test of `renderCldrDataLoader`
- [ ] 5.2 Add a test that, for every package in `prebuilt-packages.json` and every expanded locale, resolves the locale with `cldrjs` against the subset and the full `likelySubtags` (maximized and minimized language id, and the bundle of each `main/*` file) and expects equal results. Also require every package to expand to at least one locale, except the known-empty `no` and `nn-no` (design decision 3). Verify it passes; widen the rule if it doesn't
- [ ] 5.3 In `rollup-build-packages-config.js`, build `no-zone-names.js` (UMD), `no-zone-names.esm.js` and `no-zone-names.min.js` (IIFE) next to the existing outputs. Verify `npm run build-prebuilt` produces six bundles per package in `dist/prebuilt/<pkg>/`
- [ ] 5.4 Check that `rollup-examples.config.js` and `test/cldr-browser-setup.js` still register everything they need (the examples bundle aliases `@js-joda/locale` to source, so it now needs the subset and `metaZones` from the rendered entry). Verify `npm run build-examples` and `npm run test-browser` pass
- [ ] 5.5 Keep `test/prebuiltPackagesTest_mochaOnly.js` passing: the template still imports only `registerLocaleData`. Verify `npm test`

## 6. Prebuilt package manifests

- [ ] 6.1 In `utils/create_packages.js`, copy the six bundles plus maps and add the `exports` map from design decision 5 to the generated manifest (keep `main` and `module`). Regenerate with `npm run create-packages` and commit the 33 manifests. Verify a second run leaves `git status` clean (spec "Stable generated files")
- [ ] 6.2 Extend `test/prebuiltPackagesTest_mochaOnly.js`: every committed manifest has the `exports` map, and every file it points to is produced by the build config. Verify the test fails when an entry is removed from one manifest
- [ ] 6.3 Update `utils/README_package.template.md` with the default and `no-zone-names` imports and the `<script>` paths. Verify the regenerated `packages/en-us/README.md` shows them

## 7. Documentation

- [ ] 7.1 Update `packages/locale/README.md`: which supplemental data the base registers, the `no-zone-names` entry with sizes, the zone-names error, the extra `registerLocaleData` calls for hand registration without `cldr-data`, and that `@js-joda/locale` and the prebuilt packages should be updated together. Verify the code samples run (`node` with the built packages)
- [ ] 7.2 Add a `locale` entry to the root `CHANGELOG.md` with the size numbers from task 8.2, the new entry point, and a **BREAKING** note for hand registration without `cldr-data`. Verify it follows the format of the existing entries

## 8. Integration

- [ ] 8.1 In `packages/examples`, add `examples/node/node-locale-no-zone-names.js` and `examples/node/es6-locale-no-zone-names.mjs`. Both check that formatting with `MMMM` works. The ESM sample also expects `zzzz` to throw the zone-names error (the ESM build can't `require('cldr-data')`). The CJS sample does not check `zzzz`: in the monorepo `cldr-data` resolves from the real path of `@js-joda/locale` (root and `packages/locale/node_modules`), so the names load; the CJS path without `cldr-data` is covered by the child-process test of 4.2. Wire both into `test/run-node-samples.sh`. Verify after `npx lerna run --stream build-dist && npx lerna run --stream build-locale-dist` that `cd packages/examples && npm test` passes
- [ ] 8.2 Measure gzip sizes of `@js-joda/locale` + `locale_en-us` default and `no-zone-names` (min builds) and compare with task 1.1. Verify the savings meet the spec scenarios (≥10 KB and ≥25 KB)
- [ ] 8.3 Check compatibility with the released base: install `@js-joda/locale@5.3.2` into a scratch project without `cldr-data`, load the new `packages/en-us` bundle, and format with `eeee MMMM zzzz` and `Locale.US`. Verify the output equals the one with `@js-joda/locale_en-us@5.3.2`
- [ ] 8.4 Run `cd packages/locale && npm run test-ci` and verify it passes and leaves `git status` clean

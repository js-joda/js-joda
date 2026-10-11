# Tasks

Decisions (see `design.md`): the default entries stay unchanged; new opt-in entries
`@js-joda/locale/slim` and `@js-joda/locale/meta-zones`, and per prebuilt package `/slim` and
`/slim-no-zone-names`; entry directories with `package.json` instead of `exports` maps; in Node.js the
slim entries resolve to the full builds; `registerLocaleData` merges `likelySubtags` parts until the
full file is registered; clear errors only in slim mode. Minor release. All paths below are relative
to `packages/locale` unless noted.

## 1. Baseline

- [ ] 1.1 Record the gzip sizes of `dist/js-joda-locale.min.js`, `packages/en-us/dist/index.min.js`, and of an esbuild browser bundle (minified, `@js-joda/core` external) of `@js-joda/locale` + `@js-joda/locale_en-us`, after `npm run build-dist && npm run build-locale-dist` before any change, in a comment on the PR. Verify the numbers match roughly the ~44 KB total from #421

## 2. Entries of @js-joda/locale

- [ ] 2.1 Add `src/slim.js` (plugin, exports, `weekData`, the three `loadCldrData` calls), make `src/js-joda-locale.js` re-export it and register the bundled `likelySubtags` and `metaZones`, and add `src/meta-zones.js` (design decision 1). Verify `npm test` passes unchanged
- [ ] 2.2 In `rollup.config.js`, build the ES modules from the three inputs with a shared chunk under `dist/chunks/`, keep `dist/js-joda-locale.js` (UMD) and `dist/js-joda-locale.min.js` as they are, and add IIFE builds `dist/slim.min.js` and `dist/meta-zones.min.js` (design decision 2). Verify `npm run build-dist` produces these files and that `dist/js-joda-locale.js` is unchanged apart from the banner
- [ ] 2.3 Add `slim/package.json` and `meta-zones/package.json` (design decision 3) and add both directories to `files` in `package.json`. Verify with `npm pack --dry-run` that they are included, and with a test that `require('@js-joda/locale/slim')` returns the same module as `require('@js-joda/locale')`
- [ ] 2.4 Check that `typings/js-joda-locale.d.ts` serves `@js-joda/locale/slim` through `types`. Verify with a test in `test/typescript_definitions` that imports `Locale` from `@js-joda/locale/slim`

## 3. Registering data in CldrCache

- [ ] 3.1 In `src/format/cldr/CldrCache.js`, add the internal registration of the full `likelySubtags` (used by the default entry and `loadCldrData`), merge parts of `supplemental/likelySubtags.json` until the full file is registered and ignore them afterwards, keep first-wins for every other path, and clear the cached `Cldr` instances on every `Cldr.load` (design decision 6). Verify with tests in `test/format/cldr/CldrCacheTest.js`: two parts are both resolvable, the same object twice has no effect, a part after the full file changes no value, a second `metaZones` or `main/*` registration is skipped, and data registered after `WeekFields.ofLocale(Locale.KOREA)` is used for `Locale.KOREAN`
- [ ] 3.2 Update the doc comment of `registerLocaleData` in `src/format/cldr/CldrCache.js` and `typings/js-joda-locale.d.ts` (merging of `likelySubtags` parts, first-wins for other paths). Verify `npm run test-ts-definitions` passes

## 4. Errors in slim mode

- [ ] 4.1 In `CldrDateTimeTextProvider` and `CldrZoneTextPrinterParser`, when the full `likelySubtags` isn't registered, throw an `IllegalStateException` for a requested language without a `likelySubtags` entry; in `getOrCreateCldrInstance`, turn `Could not find likelySubtags for <bundle>` into an `IllegalStateException` (design decision 7). Verify with tests on the slim source entry, without `cldr-data` (stub `loadCldrData`), for the scenarios of "Locale without data in slim mode", and that the default entry behaves as before for `new Locale('xx')`
- [ ] 4.2 In `CldrZoneTextPrinterParser.print`, throw an `IllegalStateException` for a region zone when `supplemental/metaZones` is missing; keep `parse` returning `~position`; in `_resolveZoneIds`, don't cache the ID-only map while `metaZones` is missing. Verify with tests in `test/format/ZoneTextPrinterParserTest.js` for the scenarios of "Missing time-zone names in slim mode", including `yyyy-MM-dd[ zzzz]` with `parseUnresolved`, and that with `metaZones` but without `timeZoneNames` the zone ID is printed as before

## 5. Prebuilt bundles

- [ ] 5.1 In `utils/clrdr-data-render.js`, compute the `likelySubtags` subset with the rule from design decision 5 and render the three variants through `utils/cldr-data.ejs` (design decision 4); the default variant must render exactly as today. Verify with a unit test of `renderCldrDataLoader` for `en-us`, including that the default variant equals today's output
- [ ] 5.2 Add a test that, for every package in `prebuilt-packages.json` and every expanded locale, resolves the locale with `cldrjs` against the subset and the full `likelySubtags` (maximized and minimized language id, and the bundle of each `main/*` file) and expects equal results. Also require every package to expand to at least one locale, except the known-empty `no` and `nn-no`. Verify it passes; widen the rule if it doesn't
- [ ] 5.3 In `rollup-build-packages-config.js`, build `slim` and `slim-no-zone-names` as `.js` (UMD), `.esm.js` and `.min.js` (IIFE, `@js-joda/locale/slim` → global `JSJodaLocale`) next to the default outputs. Verify `npm run build-prebuilt` produces nine bundles per package and that `index.*` are unchanged apart from the banner
- [ ] 5.4 Run the prebuilt build in parallel: split the rollup configs of `rollup-prebuilt.config.js` into groups of packages and build the groups in parallel processes (one per available CPU, at most the number of packages), failing the script when any group fails. The three variants triple the number of bundles; this keeps `npm run build-prebuilt` from taking about three times as long. Verify the output in `dist/prebuilt/` is the same as with the sequential build, that a broken package makes the script fail, and compare the duration before and after in the PR
- [ ] 5.5 In `utils/create_packages.js`, copy the new bundles plus maps and write `slim/package.json` and `slim-no-zone-names/package.json` (`main` → `../dist/index.js`, `module` → the slim ES module); leave the manifests unchanged. Regenerate with `npm run create-packages` and commit the 66 entry directories. Verify a second run leaves `git status` clean (spec "Stable generated files")
- [ ] 5.6 Extend `test/prebuiltPackagesTest_mochaOnly.js`: every package has both entry directories, every file they point to is produced by the build config, and the slim templates import only `registerLocaleData` from `@js-joda/locale/slim` and `@js-joda/locale/meta-zones`. Verify the test fails when one entry directory is removed
- [ ] 5.7 Check that `rollup-examples.config.js` and `test/cldr-browser-setup.js` still work, and add a browser test with the slim IIFE builds (spec "Script tags"). Verify `npm run build-examples` and `npm run test-browser` pass
- [ ] 5.8 Update `utils/README_package.template.md` with the slim imports and `<script>` paths. Verify the regenerated `packages/en-us/README.md` shows them

## 6. Documentation

- [ ] 6.1 Update `packages/locale/README.md`: slim mode with the imports for one and several locales, `/slim-no-zone-names`, sizes, the errors, that slim entries need `@js-joda/locale` 5.4.0 or later and a bundler (Node.js uses the full builds, Node.js ESM can't import the slim directories), and that mixing slim and default imports works but bundles the full data. Verify the code samples bundle and run
- [ ] 6.2 Add a `locale` entry to the root `CHANGELOG.md` with the new entries and the size numbers from task 7.2. Verify it follows the format of the existing entries

## 7. Integration

- [ ] 7.1 In `packages/examples/examples/bundler`, add esbuild samples for `@js-joda/locale/slim` with `@js-joda/locale_en-us/slim` and `@js-joda/locale_de/slim`, and with `@js-joda/locale_en-us/slim-no-zone-names`; check the formatted output, that `zzzz` throws in the no-zone-names sample, and that the bundles contain no full `likelySubtags` and `metaZones` once (search for data-only markers, e.g. the `"und-Arab"` key and a `metazoneInfo` zone entry, not for code identifiers). Wire them into `test/run-node-samples.sh`. Verify after `npx lerna run --stream build-dist && npx lerna run --stream build-locale-dist` that `cd packages/examples && npm test` passes
- [ ] 7.2 Measure the gzip sizes of the esbuild bundles (default, `/slim`, `/slim-no-zone-names` with `en-us`) and compare with task 1.1. Verify the savings meet the spec scenarios (≥10 KB and ≥25 KB)
- [ ] 7.3 Check compatibility: with `@js-joda/locale@5.3.2` the new default `packages/en-us` gives the same output as `@js-joda/locale_en-us@5.3.2` (`eeee MMMM zzzz`, `Locale.US`), and the new `@js-joda/locale` with `@js-joda/locale_en-us@5.3.2` gives the same output as today. Verify both
- [ ] 7.4 Run `cd packages/locale && npm run test-ci` and verify it passes and leaves `git status` clean

# Tasks

Decisions (see `design.md`): base bundles only `weekData`, `registerLocaleData` merges only
`likelySubtags` and never changes data from `cldr-data`, `main/*` data waits for its `likelySubtags`,
prebuilt packages ship a `likelySubtags` subset and `metaZones`, `no-zone-names` entry via an
`exports` map with `.mjs` targets, peer range stays `>=5.0.0`. All paths below are relative to
`packages/locale` unless noted.

Tests "without `cldr-data`" run in a child process in a temporary directory that has copies (not
symlinks: Node.js resolves from the real path, which would find `cldr-data` in the monorepo) of
`@js-joda/core`, `@js-joda/timezone`, `cldrjs`, the built `@js-joda/locale` (`package.json` + `dist`)
and the needed built prebuilt packages, and no `cldr-data`. Call this the "isolated setup".

## 1. Baseline

- [ ] 1.1 Record the current gzip sizes of `dist/js-joda-locale.min.js` and `packages/en-us/dist/index.min.js` (after `npm run build-dist && npm run build-locale-dist` on this branch before any change) in a comment on the PR draft; they are the reference for the size scenarios. Verify the numbers match roughly the ~44 KB total from #421

## 2. Registering data in CldrCache

- [ ] 2.1 In `src/format/cldr/CldrCache.js`, keep the `Set` of registered paths and add a `Set` of paths loaded by `loadCldrData` (design decision 2): skip any path loaded from `cldr-data`; pass `supplemental/likelySubtags.json` registered again to `Cldr.load` (merge); keep first-wins for every other path; keep `loadCldrData` skipping every registered path. Verify with new tests in `test/format/cldr/CldrCacheTest.js`: two partial `likelySubtags` objects are both resolvable, the same object twice has no effect, a second `metaZones` or `main/*` registration is skipped, a registration after a `cldr-data` load of the same path changes nothing, and a registered path is not reloaded from `cldr-data`
- [ ] 2.2 In `CldrCache`, keep `main/<bundle>/…` data pending while `<bundle>` can't be resolved with the registered `likelySubtags` keys (tracked by `CldrCache`, design decision 6), and load every pending bundle that became resolvable when `likelySubtags` is registered or loaded. Verify with tests: `main/th` registered before and after `likelySubtags` both work; and a test that compares the resolution of `CldrCache` with `cldrjs` for every locale in `cldr-data/availableLocales.json`, with the full `likelySubtags` and with each prebuilt subset
- [ ] 2.3 Update the doc comment of `registerLocaleData` in `src/format/cldr/CldrCache.js` and `typings/js-joda-locale.d.ts` to describe merging of `likelySubtags`, first-wins for other paths, that `cldr-data` data is never changed, and that `main/*` data waits for its `likelySubtags`. Verify `npm run test-ts-definitions` passes

## 3. Missing-data errors

- [ ] 3.1 Add the check used by `CldrDateTimeTextProvider` and `CldrZoneTextPrinterParser` to get their `Cldr` (design decision 6): throw an `IllegalStateException` when the requested language has pending data (naming the pending bundles, the requested locale, `registerLocaleData('supplemental/likelySubtags.json', …)` and updating all prebuilt packages), or when the instance fell back to `und` for another language; cache nothing on error. Verify with tests covering the spec scenarios of "Missing likelySubtags data" (including recovery in the same process and that `Locale.US` still works next to pending `th`) and "Locale without registered data" (`Locale.KOREAN` with only the `en` subset throws and prints no English)
- [ ] 3.2 Make `WeekFields.ofLocale` read `supplemental/weekData` without that check. Verify with a test that `WeekFields.ofLocale(Locale.GERMANY)` works with only the base data and with pending `main/th` data (spec "WeekFields without locale data")
- [ ] 3.3 In `CldrZoneTextPrinterParser.print`, throw an `IllegalStateException` after the `ZoneOffset` branch when `supplemental/metaZones` or `dates/timeZoneNames` of the locale is missing. Leave `parse` returning `~position`. In `_resolveZoneIds`, return a shared ID-only map without caching it per locale while names are missing; cache the per-locale map only once names are present. Verify with tests in `test/format/ZoneTextPrinterParserTest.js` for `z`, `zzzz`, `v` in print; that parsing a zone name without names throws a `DateTimeParseException`; that `yyyy-MM-dd[ zzzz]` with `parseUnresolved` on `2016-01-01 foo` behaves as before; that registering names later makes name parsing work with the same formatter; that a fixed-offset zone still prints and `UTC`, `+01:00`, a zone ID and `Z` still parse without names; and that a zone without a CLDR name still prints its ID

## 4. Base package without likelySubtags and metaZones

- [ ] 4.1 In `src/supplemental-data.js`, keep the three `loadCldrData` calls and bundle/register only `weekData`. Verify with `npm run build-dist` that `dist/js-joda-locale.min.js` contains no `likelySubtags` / `metazoneInfo` keys (`grep -c`) and that `npm test` passes (Node.js with `cldr-data`)
- [ ] 4.2 Add a test in the isolated setup that loads the built `dist/js-joda-locale.js`, registers only `main/th/ca-gregorian.json`, checks that `WeekFields.ofLocale(Locale.GERMANY)` works and that `MMMM` with Thai throws the likelySubtags error; then, in the same process, registers `supplemental/likelySubtags.json` and expects the Thai month name. Verify it passes
- [ ] 4.3 Add a test with `cldr-data` installed that imports the built `@js-joda/locale_en-us` and formats `zzzz` with `Locale.US` and Thai, and compares with the output of the base alone (spec "Node.js with cldr-data and prebuilt packages"). Verify it passes

## 5. Prebuilt bundles

- [ ] 5.1 In `utils/clrdr-data-render.js`, compute the `likelySubtags` subset of the expanded locales with the rule from design decision 3 and render it, plus a `zoneNames` flag, through `utils/cldr-data.ejs` (subset first, then `metaZones` and `timeZoneNames` only when `zoneNames` is set). Verify the rendered entry for `en-us` with and without `zoneNames` by a unit test of `renderCldrDataLoader`
- [ ] 5.2 Add a test that, for every package in `prebuilt-packages.json` and every expanded locale, resolves the locale with `cldrjs` against the subset and the full `likelySubtags` (maximized and minimized language id, and the bundle of each `main/*` file) and expects equal results. Also require every package to expand to at least one locale, except the known-empty `no` and `nn-no` (design decision 3). Verify it passes; widen the rule if it doesn't
- [ ] 5.3 In `rollup-build-packages-config.js`, build `index` and `no-zone-names` each as `.js` (UMD), `.esm.js`, `.mjs` (same ES module output) and `.min.js` (IIFE). Verify `npm run build-prebuilt` produces eight bundles per package in `dist/prebuilt/<pkg>/`
- [ ] 5.4 Check that `rollup-examples.config.js` and `test/cldr-browser-setup.js` still register everything they need (the examples bundle aliases `@js-joda/locale` to source, so it now needs the subset and `metaZones` from the rendered entry). Verify `npm run build-examples` and `npm run test-browser` pass
- [ ] 5.5 Keep `test/prebuiltPackagesTest_mochaOnly.js` passing: the template still imports only `registerLocaleData`. Verify `npm test`

## 6. Prebuilt package manifests

- [ ] 6.1 In `utils/create_packages.js`, copy the eight bundles plus maps and add the `exports` map from design decision 5 to the generated manifest (keep `main` and `module`, no `"type"`). Regenerate with `npm run create-packages` and commit the 33 manifests. Verify a second run leaves `git status` clean (spec "Stable generated files")
- [ ] 6.2 Extend `test/prebuiltPackagesTest_mochaOnly.js`: every committed manifest has the `exports` map, every `import` target ends in `.mjs`, and every file it points to is produced by the build config. Verify the test fails when an entry is removed from one manifest
- [ ] 6.3 Update `utils/README_package.template.md` with the default and `no-zone-names` imports and the `<script>` paths. Verify the regenerated `packages/en-us/README.md` shows them

## 7. Documentation

- [ ] 7.1 Update `packages/locale/README.md`: which supplemental data the base registers, the `no-zone-names` entry with sizes, the zone-names error, the extra `registerLocaleData` calls for hand registration without `cldr-data`, that `@js-joda/locale` and the prebuilt packages should be updated together, and the `metaZones` duplication when importing several full prebuilt packages. Verify the code samples run (`node` with the built packages)
- [ ] 7.2 Add a `locale` entry to the root `CHANGELOG.md` with the size numbers from task 8.2, the new entry point, a **BREAKING** note for hand registration without `cldr-data`, and the new error for a locale without registered data. Verify it follows the format of the existing entries

## 8. Integration

- [ ] 8.1 In `packages/examples`, add `examples/node/node-locale-no-zone-names.js` and `examples/node/es6-locale-no-zone-names.mjs`. Both check that formatting with `MMMM` works and do not check `zzzz`: in the monorepo `cldr-data` resolves from the real path of `@js-joda/locale`, and `import '@js-joda/locale'` resolves to its CJS `main`, so both can load zone names from `cldr-data`. The zone-names error without `cldr-data` is covered by task 8.5. Wire both into `test/run-node-samples.sh`, and run the ESM samples with `--no-experimental-detect-module` where the Node.js version supports it, so a `.js` ES module fails the run. Verify after `npx lerna run --stream build-dist && npx lerna run --stream build-locale-dist` that `cd packages/examples && npm test` passes and prints no `MODULE_TYPELESS_PACKAGE_JSON` warning
- [ ] 8.2 Measure gzip sizes of `@js-joda/locale` + `locale_en-us` default and `no-zone-names` (min builds) and compare with task 1.1. Verify the savings meet the spec scenarios (≥10 KB and ≥25 KB)
- [ ] 8.3 Check compatibility with the released base: install `@js-joda/locale@5.3.2` into a scratch project without `cldr-data`, load the new `packages/en-us` bundle, and format with `eeee MMMM zzzz` and `Locale.US`. Verify the output equals the one with `@js-joda/locale_en-us@5.3.2`
- [ ] 8.4 Check mixing with an old prebuilt package: in the isolated setup, load the new `packages/en-us` and `@js-joda/locale_de@5.3.2`. Verify `Locale.US` formats and `Locale.GERMANY` throws the error naming `de`
- [ ] 8.5 In the isolated setup, `require` and `import` `@js-joda/locale_en-us/no-zone-names`. Verify `MMMM` works, `zzzz` with `Europe/Berlin` throws the zone-names error, and parsing `Central European Standard Time` with `zzzz` throws a `DateTimeParseException`
- [ ] 8.6 Run `cd packages/locale && npm run test-ci` and verify it passes and leaves `git status` clean

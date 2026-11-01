# Tasks

Decisions (see `design.md`): shipped in the same major as `explicit-plugin-data-registration` (Q7,
2026-11-01: no second stage, no separate minor); no `/slim` or `/slim-no-zone-names` entries; the root
of `@js-joda/locale` bundles only `weekData`; the prebuilt `localeData` includes the `likelySubtags`
subset of its languages; `zoneNames` and `metaZones` are separate values to register;
`@js-joda/locale/likely-subtags` exports the full file; `registerLocaleData` merges `likelySubtags`
parts until the full file is registered and clears cached `Cldr` instances; the clear errors are
always on and rest on registered data. All paths below are relative to `packages/locale` unless
noted.

## 1. Baseline

- [ ] 1.1 Record the gzip sizes of `dist/js-joda-locale.min.js`, `packages/en-us/dist/index.min.js`, and of an esbuild browser bundle (minified, `@js-joda/core` external) of the old `@js-joda/locale` + `@js-joda/locale_en-us`, after `npm run build-dist && npm run build-locale-dist` before any change, in a comment on the PR. Verify the numbers match roughly the ~44 KB total from #421

## 2. Root entry data layout

- [ ] 2.1 Reduce `src/supplemental-data.js` to `weekData` only (remove the `likelySubtags` and `metaZones` imports and registrations from the root), and add value entries `src/likely-subtags.js` (exports the full `supplemental/likelySubtags.json`) and `src/meta-zones.js` (exports `metaZones`, no registration), with `./likely-subtags` and `./meta-zones` in the `exports` map (conditions `types`/`react-native`/`module`/`default`, as in `explicit-plugin-data-registration`) and typings. Verify `npm run build-dist` produces them and that the root ES module build contains no `likelySubtags`/`metaZones` data markers
- [ ] 2.2 Update the tests that relied on the bundled supplemental data: register fixtures explicitly (the `und` `likelySubtags` entry plus the test locales) in a root hook. Verify `npm test` passes unchanged otherwise

## 3. Registering data in CldrCache

- [ ] 3.1 In `src/format/cldr/CldrCache.js`, add the internal registration of the full `likelySubtags` (used by the `/likely-subtags` entry and the `cldr-data` source), merge parts of `supplemental/likelySubtags.json` until the full file is registered and ignore them afterwards, keep first-wins for every other path, and clear the cached `Cldr` instances on every `Cldr.load` (design decisions 3). Verify with tests in `test/format/cldr/CldrCacheTest.js`: two parts are both resolvable, the same object twice has no effect, a part after the full file changes no value, a second `metaZones` or `main/*` registration is skipped, and data registered after `WeekFields.ofLocale(Locale.KOREA)` is used for `Locale.KOREAN`
- [ ] 3.2 Update the doc comment of `registerLocaleData` in `src/format/cldr/CldrCache.js` and `typings/js-joda-locale.d.ts` (merging of `likelySubtags` parts, first-wins for other paths). Verify `npm run test-ts-definitions` passes

## 4. Errors, always on

- [ ] 4.1 In `CldrDateTimeTextProvider` and `CldrZoneTextPrinterParser`, throw an `IllegalStateException` for a requested language without a registered `likelySubtags` entry, naming the locale and the prebuilt root to register; in `getOrCreateCldrInstance`, turn `Could not find likelySubtags for <bundle>` into an `IllegalStateException` naming the bundle and the `/likely-subtags` fix (design decision 4). Verify with tests for the scenarios of "Locale without data", and that there is no silent fallback to English
- [ ] 4.2 Add a test that `WeekFields.ofLocale` works for any locale without locale data registered (the root `weekData` plus the `und` entry), e.g. `WeekFields.ofLocale(Locale.GERMANY)` returns Monday/4-days
- [ ] 4.3 In `CldrZoneTextPrinterParser.print`, throw an `IllegalStateException` for a region zone when `metaZones` or the locale's `timeZoneNames` is missing, naming the pattern letters, the locale and the fix (`registerLocaleData(zoneNames, metaZones)`); keep `parse` returning `~position`; in `_resolveZoneIds`, don't cache the ID-only map while `metaZones` is missing. Verify with tests for the scenarios of "Missing time-zone names", including `yyyy-MM-dd[ zzzz]` with `parseUnresolved`, and that fixed offsets, zone IDs and patterns without zone text work as before

## 5. Prebuilt packages

- [ ] 5.1 In `utils/clrdr-data-render.js`, compute the `likelySubtags` subset with the rule from design decision 2 and render it into the prebuilt `localeData` (plus `ca-gregorian` and `timeZoneNames`); render `zoneNames` as a separate export of the prebuilt root. Verify with a unit test of `renderCldrDataLoader` for `en-us`
- [ ] 5.2 Add a test that, for every package in `prebuilt-packages.json` and every expanded locale, resolves the locale with `cldrjs` against the subset and the full `likelySubtags` (maximized and minimized language id, and the bundle of each `main/*` file) and expects equal results. Also require every package to expand to at least one locale, except the known-empty `no` and `nn-no`. Verify it passes; widen the rule if it doesn't
- [ ] 5.3 In `rollup-build-packages-config.js`, build the prebuilt root as `.js` (UMD), `.esm.js` and `.min.js` (IIFE, unique global `JSJodaLocaleData_<locale>`), with no `import`/`require` of another package in the data parts. Verify `npm run build-prebuilt` produces them
- [ ] 5.4 Tree-shaking test (with `explicit-plugin-data-registration` task 5.2): esbuild and webpack bundles importing only `localeData` from the prebuilt root SHALL drop `zoneNames`; if not, move `zoneNames` to a `/zone-names` subpath and update the specs
- [ ] 5.5 In `utils/create_packages.js`, write the manifests with the `exports` map (`"."` with `types`/`react-native`/`module`/`default`, `./package.json`, `./*`) and the peer range `>=7.0.0`. Regenerate with `npm run create-packages` and commit. Verify a second run leaves `git status` clean (spec "Stable generated files")
- [ ] 5.6 Extend `test/prebuiltPackagesTest_mochaOnly.js`: every package root exports `localeData` and `zoneNames`, the builds contain no `import`/`require` of another package, and the manifests have the `exports` map. Verify the test fails when an export is removed
- [ ] 5.7 Update `utils/README_package.template.md` with the root usage; verify the regenerated `packages/en-us/README.md` shows it

## 6. Documentation

- [ ] 6.1 Update `packages/locale/README.md`: the new imports, `zoneNames`/`metaZones` registration for `z`/`zzzz`/`v`, `/likely-subtags` for custom CLDR paths, the sizes (today vs the major, from task 7.2), and the always-on errors. Verify the code samples bundle and run
- [ ] 6.2 Add a `locale` entry to the root `CHANGELOG.md` (major entry, together with `explicit-plugin-data-registration`) with the size numbers from task 7.2 and a link to the migration guide. Verify it follows the format of the existing entries

## 7. Integration

- [ ] 7.1 Update the `packages/examples` samples per the `repo-documentation-and-migration` spec of `explicit-plugin-data-registration` (shared tasks 6.1–6.6 there), including an esbuild sample that registers `localeData` and checks the formatted output and that the bundle contains no full `likelySubtags`/`metaZones` (search for data-only markers, e.g. the `"und-Arab"` key and a `metazoneInfo` zone entry). Verify after `npx lerna run --stream build-dist && npx lerna run --stream build-locale-dist` that `cd packages/examples && npm test` passes
- [ ] 7.2 Measure the gzip sizes of the esbuild bundles (minified, `@js-joda/core` external) of the new root + `@js-joda/locale_en-us` with and without zone names, and compare with task 1.1. Verify the savings are roughly 44.7 KB → ~15 KB (without zone names) and → ~32 KB (with zone names); put the real numbers in the README and CHANGELOG
- [ ] 7.3 Run `cd packages/locale && npm run test-ci` and verify it passes and leaves `git status` clean
- [x] 7.4 Record the Q7 decision (single major, no second stage) in the `locale-size-reduction-plan` memory note (updated 2026-11-01). The #421 issue update was NOT posted — the user decided on 2026-11-01 to leave issue #421 unchanged

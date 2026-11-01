# Tasks

Decisions (see `design.md`): explicit registration is the only mode, in a major release; the root
entries of `@js-joda/timezone` and `@js-joda/locale` load no data and no longer use `cldr-data`
automatically; `/register`, the side-effect `dist` builds (incl. `-range`, `-empty`) and the prebuilt
`/data` subpath are removed; `registerTimeZoneData` is exported from the root of
`@js-joda/timezone`; `ZoneRulesProvider.loadTzdbData` is removed; prebuilt roots export `localeData`
and `zoneNames`; `@js-joda/locale/meta-zones` exports a value to register; every entry of the
`exports` map (including `"."`) has the conditions `types`/`react-native`/`module`/`default`;
Node.js floors 12.16 (require) / 12.17 (import) / 12.20 (`"./*"` pattern); register in a setup
module (hoisting, decision 9). Released as one major together with `reduce-locale-bundle-size`.

## 1. Timezone: registration by content key

- [ ] 1.1 Replace the appending `TzdbZoneRulesProvider.loadTzdbData` with an internal `register(data)` keyed by `version` + `range`: same key is a no-op, a different key throws a `DateTimeException` naming both keys while the first data stays in use (design decisions 2–3). Verify with new mocha tests: same data twice is a no-op with no duplicate zone IDs; two different data sets throw and the first stays in use
- [ ] 1.2 Remove `ZoneRulesProvider.loadTzdbData`: delete the static method from `TzdbZoneRulesProvider` and the assignment in `plug.js` (`packages/core` never referenced it — verified by grep). Verify that no reference remains outside the specs/docs, and that `npm test` in `packages/timezone` passes after the test fixtures register explicitly
- [ ] 1.3 Throw a `DateTimeException` mentioning `registerTimeZoneData` (and for script tags the global call `JSJodaTimezone.registerTimeZoneData(JSJodaTimezoneData.tzdbData)`) from `getRules` when no data is registered, and verify with a test on the root entry
- [ ] 1.4 Re-run `extendSystemDefaultZoneId` after each registration that stores data (decision 4), and verify with a test that stubs `Intl…timeZone` to `Europe/Berlin` and registers after plugging

## 2. Timezone: root and data entries

- [ ] 2.1 Turn `src/js-joda-timezone.js` into the side-effect free root (plug plus the `registerTimeZoneData` export, no data import); remove the side-effect `dist` builds from `rollup.config.js` (the data-carrying `js-joda-timezone.js`, the `-range` and `-empty` builds) and add data entry modules that export `tzdbData` with `range` added at build time, as pure values with no `import`/`require`. Verify that `npm run build-dist` produces the root builds (UMD default, ES module, min IIFE) and the data builds, that the root builds contain no zone data, and that the data builds import nothing
- [ ] 2.2 Add the `exports` map (`"."` with `types`/`react-native`/`module`/`default`, `./data`, `./data/*`, `./package.json`, `./*`) and update `files`. Verify with `npm pack --dry-run`; from a scratch project, that every entry resolves via `require`, Node.js `import` and an esbuild bundle (which must pick the ES module builds); that Metro with default conditions (React Native >= 0.79, package exports enabled) resolves `"."` and `./data*` to the ES module builds — one copy, no UMD/ESM mix; that `require` and `import` of the root share one store in Node.js; that deep imports naming the file with extension still resolve; and that the README resolution matrix states the floors 12.16/12.17/12.20
- [ ] 2.3 Add TypeScript declarations for `registerTimeZoneData` and `tzdbData` (entry-level `types`), and verify with a strict-mode compile test in `test-ts-definitions`
- [ ] 2.4 Add tests for the spec scenarios of timezone-data-registration (usage example, range entry, CJS + ESM copies sharing one store, setup-module/hoisting, conflicting registrations, missing-data error, script tags), and verify that `npm run test-ci` passes in `packages/timezone`
- [ ] 2.5 Document the new API in `packages/timezone/README.md` and `esdoc/manual`: the usage examples from the proposal, the setup module (hoisting, decision 9), the resolution matrix (named entries from Node.js >= 12.16 for `require` and >= 12.17 for `import`, the `"./*"` pattern >= 12.20, bundlers via `module`, React Native via `react-native`, script tags via the minified builds; no `engines` field; `js-joda-timezone.min.js` keeps its file name but contains no data, so unpinned CDN URLs break), and verify that the README snippets run as written

## 3. Locale: data sources behind one seam; root without cldr-data

- [ ] 3.1 Add sources to `CldrCache` (`load(path)`, `availableLocales()`), make `loadCldrData` and `getAvailableLocales` use them, and remove both `require('cldr-data')` calls from `CldrCache` and `CldrDateTimeTextProvider` (design decision 5). The root entry does NOT register a `cldr-data` source anymore. Verify that the existing locale tests pass with a test-only in-memory source registered in a root hook
- [ ] 3.2 Extend `registerLocaleData` to accept several data objects and sources (deduplicated by source `id`) and zone data values (`zoneNames`, `metaZones`) next to `(path, data)`, and verify with tests for each form, for a repeated registration from a copied object, and for registering the `cldr-data` source twice
- [ ] 3.3 Add `src/cldr-data.js` exporting `cldrDataSource` (with a clear error when `cldr-data` is missing) as the `./cldr-data` entry (only `default` condition, Node.js only). Verify that the Node.js tests with `cldr-data` produce the same output as before once the source is registered explicitly
- [ ] 3.4 Add the missing-locale `DateTimeException` (decision 6: always on, not cached), naming the locale, the registered locales and the prebuilt root to register (script-tag variant names the global). Verify with tests: `Locale.GERMAN` with only `en` throws and names `@js-joda/locale_de`; `Locale.US` with `en` works; registering `de` afterwards works

## 4. Locale: root entry and entries

- [ ] 4.1 Restructure `rollup.config.js`: ES module inputs (root, `meta-zones`) with a shared chunk, a CommonJS build of `cldr-data`, the UMD `dist/js-joda-locale.js` as `default`, and self-contained IIFE min builds (decision 7). The root bundles only `weekData` of the supplemental data — the `likelySubtags`/`metaZones` removal lands with `reduce-locale-bundle-size` in the same major. Verify that the root ES module build contains no `cldr-data` reference, and that `dist/js-joda-locale.js` is still UMD
- [ ] 4.2 Add the `exports` map (`"."` with `types`/`react-native`/`module`/`default`, `./cldr-data` default-only, `./meta-zones`, `./package.json`, `./*`) and the typings. Verify with `npm pack --dry-run`; from a scratch project, that every entry resolves via `require`, Node.js `import` and an esbuild bundle; that Metro with default conditions (React Native >= 0.79, package exports enabled) resolves `"."` and `./meta-zones` to the ES module builds; that `require('@js-joda/locale')` and `import('@js-joda/locale')` share one store in Node.js; and a strict TypeScript compile test
- [ ] 4.3 Add `src/meta-zones.js` exporting `metaZones` as a plain value (no registration on import). Verify that importing the entry alone changes nothing and that `registerLocaleData(enZones, metaZones)` enables `z`/`zzzz`/`v`
- [ ] 4.4 Add tests for the locale-data-registration spec scenarios (usage example, order independence, cldr-data source, missing-locale error always on, script tags), and verify that `npm run test-ci` passes in `packages/locale`
- [ ] 4.5 Document the new API in `packages/locale/README.md` and `esdoc/manual/Locale`: the usage examples, the Node.js `cldr-data` source (`registerLocaleData(cldrDataSource)`), the library guidance (import the root, let the app register), that `@js-joda/timezone` is needed to print or parse localized time zone names (#791), the setup module, and the resolution matrix (same floors as the timezone README). Verify that the snippets run as written

## 5. Prebuilt packages: root exports

- [ ] 5.1 Render the prebuilt root module exporting `localeData` and `zoneNames` with no imports (`utils/cldr-data.ejs` or a second template), and build it in `rollup-build-packages-config.js` (UMD default, ES module, IIFE min with the unique global `JSJodaLocaleData_<locale>`, e.g. `JSJodaLocaleData_en_us`). Verify that the builds contain no `import`/`require` of another package
- [ ] 5.2 Tree-shaking test: esbuild and webpack bundles that import only `localeData` from the root SHALL drop `zoneNames` (decision 10). If the test fails, move `zoneNames` to a `/zone-names` subpath and update the specs accordingly
- [ ] 5.3 Make `utils/create_packages.js` write the manifests with the `exports` map (`"."` with `types`/`react-native`/`module`/`default`, `./package.json`, `./*`) and the peer range `>=7.0.0`. Run `npm run build-locale-dist` and verify that regenerating twice leaves the committed manifests unchanged (stable generated files), that `import('@js-joda/locale_de')` resolves in Node.js, and that Metro with default conditions resolves `"."` to the ES module build
- [ ] 5.4 Add tests: importing the prebuilt root alone registers nothing (missing-locale error on format), and `registerLocaleData(localeData)` formats the same as before. Verify that the locale test suite passes
- [ ] 5.5 Update `utils/README_package.template.md` with the root usage, and verify the regenerated READMEs

## 6. Repo-wide docs, examples, tests, migration guide (spec repo-documentation-and-migration)

- [ ] 6.1 Update `packages/examples`: all existing samples (node, html, bundler, typescript) to the new API, plus explicit-registration samples (CommonJS, ES module, TypeScript, an esbuild browser bundle with `cldr-data` installed that must not contain it, and script tags). Verify with `npm test` in `packages/examples` after a full build
- [ ] 6.2 Update `packages/locale/examples` (`usage_node.js`, `usage_node_build.js`, `usage_es6.mjs`, `usage_browser.html`, `usage_browser_build.html`)
- [ ] 6.3 Update docs that show plugin imports: root `README.md`, `packages/core/README.md`, `packages/core/CheatSheet.md`, `esdoc/manual` (`ZonedDateTime.md`, `formatting.md`, `packages.md`, `Locale`), `utils/README_package.template.md` and the regenerated prebuilt READMEs
- [ ] 6.4 Check build and tooling files that reference plugin imports or removed builds: `packages/locale/karma.conf.js`, `packages/timezone/bower.json`, `esdoc/yato.js`, `esdoc.json`, `packages/tzdb-builder` (README, manifest), `packages/timezone/HowToUpdateTZDB.md`, `.github/scripts/tzdb-release-check.sh`, `ReleaseHowTo.md`, `AGENTS.md`
- [ ] 6.5 Update tests in every package that relied on side-effect imports: register fixtures explicitly in a root hook (a second call with the same data is a no-op)
- [ ] 6.6 Write the migration guide with before/after snippets for ESM, CommonJS, `<script>` tags, Node.js with `cldr-data`, and React Native; link it from the root README and the CHANGELOG
- [ ] 6.7 Add the root `CHANGELOG.md` major entry: removed side-effect entries and `loadTzdbData`, new `exports` maps, new prebuilt roots, always-on error messages, `js-joda-timezone.min.js` without data (unpinned CDN URLs break), `@js-joda/timezone` needed for localized time zone names, links to #791 and #793, link to the migration guide; verify it renders
- [ ] 6.8 Peer ranges: `@js-joda/locale` and all prebuilt packages to the new major; note in the changelog that two majors side by side mean two copies again
- [ ] 6.9 Verify the error messages cover `<script>` tags as well as `import`
- [x] 6.10 Record the Q7 decision (single major, no second stage) in the `locale-size-reduction-plan` memory note (updated 2026-11-01). The #421 issue update was NOT posted — the user decided on 2026-11-01 to leave issue #421 unchanged

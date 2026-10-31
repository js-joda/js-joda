# Tasks

## 1. Timezone: registration by content key

- [ ] 1.1 Replace the appending `TzdbZoneRulesProvider.loadTzdbData` with an internal `register(data, { lenient })` keyed by `version` + `range` (design decisions 2–3); `loadTzdbData` registers strictly. Verify with new mocha tests: same data twice is a no-op with no duplicate zone IDs, a different key throws a `DateTimeException` naming both keys while the first data stays in use, and lenient calls never throw
- [ ] 1.2 Throw a `DateTimeException` mentioning `registerTimeZoneData` from `getRules` when no data is registered, and verify with a test on the empty build
- [ ] 1.3 Re-run `extendSystemDefaultZoneId` after each successful registration (decision 4), and verify with a test that stubs `Intl…timeZone` to `Europe/Berlin` and registers after plugging
- [ ] 1.4 Switch `src/js-joda-timezone.js` and the range builds to lenient registration, and verify that `npm test` in `packages/timezone` passes unchanged

## 2. Timezone: register and data entries

- [ ] 2.1 Add `src/register.js` (plug plus the `registerTimeZoneData` export) and data entry modules that export `tzdbData` with `range` added at build time. Extend `rollup.config.js` with ES module, CommonJS and IIFE outputs and a shared chunk for the default and register entries. Verify that `npm run build-dist` produces them and that the data builds contain no `import`/`require`
- [ ] 2.2 Add `register/package.json`, `data/package.json` and `data/<range>/package.json`, and update `files` so it lists only those manifests under `data/`. Verify with `npm pack --dry-run` that no `data/packed/*.json` is included and every entry resolves via `require` and `import` from a scratch project
- [ ] 2.3 Add TypeScript declarations for `registerTimeZoneData` and `tzdbData` (entry-level `types`), and verify with a strict-mode compile test in `test-ts-definitions`
- [ ] 2.4 Add tests for the spec scenarios of timezone-data-registration (usage example, range entry, CJS + ESM copies, a library importing the default entry after explicit registration and before it), and verify that `npm run test-ci` passes in `packages/timezone`
- [ ] 2.5 Document explicit mode in `packages/timezone/README.md` and `esdoc/manual`, with the usage examples from the proposal, and verify that the README snippets run as written

## 3. Locale: data sources behind one seam

- [ ] 3.1 Add sources to `CldrCache` (`load(path)`, `availableLocales()`), make `loadCldrData` and `getAvailableLocales` use them, and remove both `require('cldr-data')` calls from `CldrCache` and `CldrDateTimeTextProvider` (design decision 5). Verify that the existing locale tests pass with a test-only in-memory source
- [ ] 3.2 Extend `registerLocaleData` to accept several data objects and sources next to `(path, data)`, and verify with tests for each form and for a repeated registration from a copied object
- [ ] 3.3 Add `src/cldr-data.js` exporting `cldrDataSource` (with a clear error when `cldr-data` is missing), and register it from the default entry when `cldr-data` can be required. Verify that the Node.js tests with `cldr-data` produce the same output as before
- [ ] 3.4 Add the missing-locale `DateTimeException` (decision 6, not cached, inactive with the default entry), and verify with tests: `Locale.GERMAN` with only `en` throws and names `@js-joda/locale_de/data`, `Locale.US` with `en` works, and registering `de` afterwards works

## 4. Locale: register and cldr-data entries

- [ ] 4.1 Restructure `rollup.config.js` into several inputs (`register`, `js-joda-locale`, `cldr-data`) with a shared chunk for ES module and CommonJS, plus self-contained IIFE builds (decision 7). Verify that `dist/js-joda-locale.esm.js` and the register outputs contain no `cldr-data`, and that `require('@js-joda/locale')` and `require('@js-joda/locale/register')` share one store
- [ ] 4.2 Add `register/package.json` and `cldr-data/package.json`, update `files`, and add the typings. Verify with `npm pack --dry-run`, resolution from a scratch project, and a strict TypeScript compile test
- [ ] 4.3 Add tests for the locale-data-registration spec scenarios (usage example, order independence, default and register entry together, cldr-data source), and verify that `npm run test-ci` passes in `packages/locale`
- [ ] 4.4 Document explicit mode in `packages/locale/README.md` and `esdoc/manual/Locale`, including the Node.js `cldr-data` source and the library guidance (import `/register`, let the app register), and verify that the snippets run as written

## 5. Prebuilt packages: data entry

- [ ] 5.1 Render a side-effect free `/data` module exporting `localeData` next to the default entry (`utils/cldr-data.ejs` or a second template), and build it in `rollup-build-packages-config.js`. Verify that the `data` builds of `@js-joda/locale_de` contain no `import`/`require`
- [ ] 5.2 Make `utils/create_packages.js` write `data/package.json` per prebuilt package and the `JSJodaLocaleData_<locale>` IIFE global. Run `npm run build-locale-dist` and verify that regenerating twice leaves the committed files unchanged (stable generated files)
- [ ] 5.3 Add tests: the default entry still uses `registerLocaleData(path, data)` (peer range `>=5.0.0` unchanged), and `/data` registered with `/register` formats the same as the default entry with `Locale.US`. Verify that the locale test suite passes
- [ ] 5.4 Update `utils/README_package.template.md` with the `/data` usage, and verify the regenerated READMEs

## 6. Integration and release

- [ ] 6.1 Add explicit-mode samples to `packages/examples` (CommonJS, ES module, TypeScript, an esbuild browser bundle with `cldr-data` installed that must not contain it, and script tags), and verify with `npm test` in `packages/examples` after a full build
- [ ] 6.2 Add the root `CHANGELOG.md` entry (new entries, the `loadTzdbData` dedupe/conflict behaviour, `dist/js-joda-locale.js` becoming CommonJS) with links to #791 and #793, and verify it renders
- [ ] 6.3 Check with the `reduce-locale-bundle-size` change which build setup lands first (design decision 7), and update the other change's design and tasks to reuse it

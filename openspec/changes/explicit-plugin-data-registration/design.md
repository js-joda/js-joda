# Design

## Context

See proposal.md for the motivation and the references. Relevant current state:

**`@js-joda/timezone`**
- `src/js-joda-timezone.js` calls `TzdbZoneRulesProvider.loadTzdbData(latest)` and then `autoPlug()`,
  which runs `use(plug)` on the `@js-joda/core` copy the package resolves. `plug` overwrites
  `ZoneRulesProvider.getRules`, `getAvailableZoneIds`, `getTzdbData` and `loadTzdbData`, and calls
  `extendSystemDefaultZoneId(ZoneId)`. That resolves `Intl…timeZone` with `ZoneId.of()` **once, at
  plug time**, and only replaces `ZoneId.systemDefault` if that succeeds.
- `src/js-joda-timezone-empty.js` only plugs. Users load data with `ZoneRulesProvider.loadTzdbData()`.
- `loadTzdbData()` appends to `AVAILABLE_ZONE_IDS` and overwrites `zones`/`links` per name. Loading
  twice lists every ID twice; loading two data sets mixes them.
- `rollup.config.js` builds `dist/js-joda-timezone[-<range>|-empty].{js,esm.js,min.js}` from
  `data/packed/latest[-<range>].json`. The packed data has `version`, `zones` and `links`, and the range
  files carry the same `version` as the full file (`2026f`). `data/` (the packed files of every release)
  is not published, because `files` is `dist`, `src`, `typings`, `bower.json`.
- `typings/js-joda-timezone.d.ts` is `export {}`.

**`@js-joda/locale`**
- `src/js-joda-locale.js` runs `use(plug)`, imports `src/supplemental-data.js` (bundles
  `likelySubtags`, `metaZones` and `weekData`), and exports `Locale`, `WeekFields` and
  `registerLocaleData`.
- `src/format/cldr/CldrCache.js` holds the data store: `registerLocaleData(path, data)` (first one per
  path wins, then `Cldr.load`), and `loadCldrData(path)`, which tries `require('cldr-data')(path)` and
  swallows errors. It is called on demand from `WeekFields`, `CldrDateTimeTextProvider` and
  `CldrZoneTextPrinterParser`. `CldrDateTimeTextProvider.getAvailableLocales()` has its own
  `require('cldr-data')`. Both `require`s are left as is in `dist/js-joda-locale.esm.js`.
- `rollup.config.js` builds `dist/js-joda-locale.esm.js` (`module`), `dist/js-joda-locale.js` (UMD,
  `main`) and `dist/js-joda-locale.min.js` (IIFE, global `JSJodaLocale`).
- Prebuilt packages: `utils/cldr-data.ejs` renders an entry that imports `registerLocaleData` from
  `@js-joda/locale` and calls it per path. `rollup-build-packages-config.js` builds
  `index.{js,esm.js,min.js}`, and `utils/create_packages.js` writes `packages/<pkg>/` (`main`, `module`, no
  `exports`).

## Goals / Non-Goals

**Goals:**
- An explicit mode with exported data values and register functions, opt-in and in a minor release.
- One data store per package, shared by its old and new entries, in Node.js and in bundles.
- Deduplication by content key, so module copies and repeated imports don't matter.

**Non-Goals:**
- Changing how the **code** of a plugin reaches core. `use(plug)` keeps patching the core copy the
  plugin resolves. A named extension point in core is a separate change (candidate 3 of the
  architecture review).
- Sharing data stores between two copies of the same package (dual package hazard of the plugin code
  itself). It is detected nowhere today and stays that way.
- Smaller locale data. That is the pending change `reduce-locale-bundle-size`.
- Dual CJS/ESM builds in Node.js. Node.js keeps getting the existing UMD builds, for `require` and
  `import` alike (decision 8).
- Removing or deprecating the side-effect entries.

## Decisions

### 1. `registerTimeZoneData` lives in `@js-joda/timezone`, not in core
Turning packed data into `ZoneRules` needs `TzdbZoneRules` and the unpacker, which live in
`@js-joda/timezone`. Moving them into core (the sketch in #791) would grow core for every user and
would make core own the tz data format. `@js-joda/timezone/register` is today's empty build plus the
export of `registerTimeZoneData`.
*Alternative:* register in core, with `@js-joda/timezone` as data only. Rejected for the reasons above.
This can be revisited together with candidate 3.

### 2. Content keys
- **tz data:** `version` plus `range`. The data entries add `range` (e.g. `'10-year-range'`) to the
  object they export. They do this when the entry is built, so the packed format and tzdb-builder stay
  as they are. Data without `range` (the full file, or a user's packed JSON) has the key `version`.
- **locale data:** the CLDR path, as today.

*Alternative:* object identity, or a `WeakSet` of registered objects. Rejected, because the CJS and ESM
copies of the same data are different objects.

### 3. Conflicts: explicit data wins over side-effect data
`TzdbZoneRulesProvider` gets one internal `register(data, { lenient })` and remembers the key and
whether the current data came from a lenient (side-effect) registration:
- nothing registered → unpack and store;
- same key → no-op;
- other key, lenient call → no-op;
- other key, explicit call, current data lenient → replace the data (zone IDs, zones, links) and
  remember it as explicit;
- other key, explicit call, current data explicit → throw a `DateTimeException` naming both keys.

`registerTimeZoneData` and `ZoneRulesProvider.loadTzdbData` register explicitly. The side-effect
entries (`@js-joda/timezone`, the `-range` builds) register leniently. So a library that imports the
default entry never breaks the app, before or after the app's own registration, and the app's data is
the one in use. Merging two data sets is gone; it produced inconsistent results (duplicate IDs, mixed
zones).

For `loadTzdbData` this is a behaviour change. Today `import '@js-joda/timezone'` followed by
`loadTzdbData(custom)` merges `custom` over the bundled data; now `custom` replaces it. For the packed
files of a release, which contain every zone, the result differs only in zones added or removed
between the versions. Two `loadTzdbData` calls with different data used to merge and now throw.
*Alternatives:* the last registration wins: rejected, because the result would depend on import order
again. Strict for every explicit call, even over side-effect data: rejected, because it breaks
`loadTzdbData` after `@js-joda/timezone`, and an app whose library imports the default entry first.

### 4. `ZoneId.systemDefault()` is resolved after registration
With explicit registration the data comes after the plug, so resolving the system zone at plug time
would fail and leave the fixed-offset default in place. `extendSystemDefaultZoneId` is run again after
every registration that stores or replaces data. Alternatively it could resolve lazily on the first call and cache the
result. The re-run is simpler and keeps the current semantics for the default entry.

### 5. Locale data sources behind one seam in `CldrCache`
`CldrCache` keeps the path store and gains a list of **sources**. A source has `load(path)` (returns
the CLDR JSON or `undefined`) and `availableLocales()`. `loadCldrData(path)` asks the registered sources
instead of calling `require('cldr-data')`. `getAvailableLocales()` merges the registered locales with
the locales of the sources. `registerLocaleData` dispatches on its arguments:
- `(string, object)` → path and data, as today;
- objects with a `load` function → sources;
- other objects → locale data objects (CLDR path → JSON); every entry is registered by path.

Sources carry an `id` (`'cldr-data'` for `cldrDataSource`); registering a source whose `id` is already
registered is a no-op, so the source of the default entry and the one of `@js-joda/locale/cldr-data`
are not asked twice.

`src/cldr-data.js` (entry `@js-joda/locale/cldr-data`) is the only module that `require`s `cldr-data`
in explicit mode. It throws a clear error at import time when `cldr-data` is missing. The default entry
registers that source if `cldr-data` can be required, which keeps today's Node.js behaviour.
*Alternative:* keep `require('cldr-data')` in `CldrCache` behind a flag. Rejected, because bundlers
still see the `require`.

### 6. Missing-locale check
In `CldrDateTimeTextProvider` and `CldrZoneTextPrinterParser`, when no data for the locale or its
parents is found, throw a `DateTimeException` (spec: locale-data-registration). The check is not
cached, so registering the data later works. It is active only while no code has loaded the default
entry: importing `@js-joda/locale` anywhere in the app (for example from a library) sets a flag on the
shared store and turns the check off for the whole app, so the default entry's behaviour doesn't change.
In Node.js, `/register` resolves to the default build (decision 7), so the check is off there too. The
check is therefore a bundler feature: it helps when nothing pulls in the default entry.

### 7. One store in Node.js and in bundles
- **Bundlers (ES modules):** the locale rollup build gets several inputs with a shared chunk:
  `register` (plug + supplemental data + store) and `js-joda-locale` (= `register` + the `cldr-data`
  source if available + the same exports). `dist/js-joda-locale.esm.js` and `dist/register.esm.js`
  import the shared chunk, so a bundle that contains both has one store. Timezone does the same for
  `register` and the default entry, so `loadTzdbData` and `registerTimeZoneData` reach one store.
- **Node.js:** `dist/js-joda-locale.js` and `dist/js-joda-timezone.js` stay UMD, and the `exports`
  map (decision 8) resolves the default entry *and* `/register` to them for `require` and `import`.
  One file means one store. The UMD timezone build additionally exports `registerTimeZoneData`. The
  cost: in Node.js, `/register` behaves like the default entry: it loads the full tz data leniently
  (explicit registration replaces it, decision 3), registers the `cldr-data` source when `cldr-data`
  is installed, and has no missing-locale check (decision 6). None of this affects bundles, where the
  problems of #789/#791/#793 occur.
- **Script tags:** the IIFE builds stay self-contained; new `dist/register.min.js` builds in both
  packages.

*Alternative:* CommonJS outputs with a shared chunk, replacing the UMD `main` builds. Rejected, because
it breaks AMD and `<script>` users of `dist/*.js` in a minor release, and contradicts the
`reduce-locale-bundle-size` design, which keeps the UMD build.
This overlaps with the `reduce-locale-bundle-size` design (ES module inputs with a shared chunk, UMD
kept). Whichever change lands second reuses that build setup, and `/slim` becomes the `register` input
without the bundled supplemental data.

### 8. Subpath entries: permissive `exports` map plus entry directories
Node.js ES modules can't import a subpath directory with its own `package.json`
(`ERR_UNSUPPORTED_DIR_IMPORT`), so `import '@js-joda/timezone/register'` needs an `exports` map. Each
package gets one of this shape:

```json
"exports": {
  ".":          { "types": "./typings/js-joda-locale.d.ts", "module": "./dist/js-joda-locale.esm.js", "default": "./dist/js-joda-locale.js" },
  "./register": { "types": "./typings/register.d.ts", "react-native": "./dist/register.esm.js", "module": "./dist/register.esm.js", "default": "./dist/js-joda-locale.js" },
  "./package.json": "./package.json",
  "./*": "./*"
}
```

- The `module` condition (webpack, esbuild, rollup, Vite) gives bundlers the ES module builds. Node.js
  doesn't know `module` and takes `default`, the UMD build, for `require` and `import`. There is
  deliberately no `import` condition, which would give Node.js an ES module copy next to the CJS one.
- The `react-native` condition points at the same ES module build as `module`. Metro (React Native
  >= 0.79 enables package exports by default) asserts `react-native` but not `module`, so without
  this condition it falls through to `default` and bundles the UMD build — for `@js-joda/locale/register`
  that puts the default build's `require('cldr-data')` back into the bundle (#789). No other resolver
  asserts `react-native`, so Node.js and the bundlers are unaffected. Key order is `types`,
  `react-native`, `module`, `default` (most specific first).
- `"./*": "./*"` keeps every existing deep import (`dist/js-joda-timezone-10-year-range`, `dist/*.min.js`,
  …) working.
- The entry directories (`register/package.json` etc. with `main`, `module`, `types`) stay for tools
  that ignore `exports` (webpack 4, TypeScript `moduleResolution: node`, Metro with package exports
  disabled, CDNs).
- `@js-joda/timezone`: `./register`, `./data`, `./data/<range>`. `data/` already holds `data/packed/`
  for tzdb-builder, so `files` lists the entry manifests explicitly (`data/package.json`,
  `data/*-range/package.json`) and keeps publishing no packed files. `./data*` entries have no
  shared state, so `default` points at their CommonJS builds (`react-native`/`module` at the ES
  module builds).
- `@js-joda/locale`: `./register` (with `react-native`/`module` pointing at the ES module build) and
  `./cldr-data` (only `default`, Node.js only).
- prebuilt packages: `.` and `./data`, with `dist/data.{js,esm.js,min.js}` (`react-native`/`module`
  point at the ES module build). The generated `/data`
  module exports `localeData` and has no imports. The default prebuilt entry keeps calling
  `registerLocaleData(path, data)`, so it works with `@js-joda/locale` from 5.0.0 on.
- Script-tag globals: `JSJodaTimezone.registerTimeZoneData`, `JSJodaTimezoneData.tzdbData`,
  `JSJodaLocale.registerLocaleData` and `JSJodaLocaleData_<locale>.localeData` (e.g.
  `JSJodaLocaleData_en_us`), so that several locales can be loaded on one page.
- Resolution summary, documented in the READMEs (no `engines` field is set): Node.js >= 12.7 resolves
  the named entries for `require` and `import`, both to `default`; the `"./*"` pattern needs Node.js
  >= 12.20 (patterns landed in 12.20/14.13), below that deep imports throw
  `ERR_PACKAGE_PATH_NOT_EXPORTED` (EOL versions, documented as unsupported). Node.js < 12.7 ignores
  `exports`: `require` of a subpath works through the entry directories, `import` of a subpath
  directory fails with `ERR_UNSUPPORTED_DIR_IMPORT`. Bundlers resolve via `module`, Metro via
  `react-native`, Node.js via `default`, script tags via the minified builds and globals.

## Risks / Trade-offs

- [Adding an `exports` map can break consumers that import a path it doesn't cover] → `"./*": "./*"`
  and `"./package.json"` cover every published file. Verify the existing samples and deep imports in
  `packages/examples` resolve unchanged.
- [Bundlers that don't know the `module` condition get the UMD build: it works, but `/register` then
  brings back `cldr-data` and the full tz data] → The common bundlers support `module`; the
  `react-native` condition covers Metro (which asserts `react-native`, not `module`); the entry
  directories also give older tools the ES module build through `module`.
- [Node.js 12.7–12.19 does not support the `"./*"` pattern, so deep imports of published files throw
  `ERR_PACKAGE_PATH_NOT_EXPORTED` there; Node.js < 12.7 ESM can't import subpath directories at all]
  → Both are EOL; documented in the READMEs' resolution matrix. `require` keeps working on old Node.js
  through the entry directories. No `engines` field is set, so nothing fails at install time.
- [A library that imports the default `@js-joda/locale` brings `require('cldr-data')` back into a
  browser bundle, and turns off the missing-locale check for the whole app] → Document it. Libraries
  should import `/register` and leave registration to the app.
- [Explicit tz data replaces side-effect data after `ZoneId`s were already resolved, e.g. a library
  that imports `@js-joda/timezone` and resolves a zone at import time] → Those objects keep the rules
  they resolved; zones resolved later use the new data. Document: register at startup, before using
  zones.
- [`loadTzdbData` no longer merges] → Called out in the changelog (decision 3).
- [The dual package hazard of the plugin code remains: two `@js-joda/core` copies, one of them never
  plugged] → Out of scope (Non-Goals), unchanged from today.
- [More entries to keep in sync between the slim change and this one] → Decision 7: one shared build
  setup.

## Migration Plan

Nothing is required: every existing import keeps working; only `loadTzdbData` callers that relied on
merging see a difference (decision 3). Apps that want explicit mode switch their imports as in the
usage examples of the proposal. The READMEs and `esdoc/manual` show both modes side by side, plus a
test setup that registers a fixture once (a second call with the same data is a no-op):

```js
registerTimeZoneData(require('./fixtures/2026e.json'));  // e.g. in a mocha root hook
```

 The new entries need the new minor versions of `@js-joda/timezone`,
`@js-joda/locale` and the prebuilt packages. Rollback means reverting the new entries; the default
entries are unchanged in behaviour.

## Open Questions

- Should the side-effect entries be deprecated in a later major? This change doesn't decide it.

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
- Explicit registration as the only mode, in a major release: data packages export values, the app
  registers them, and the root entries load no data.
- One data store per package, in Node.js, in bundles and under React Native.
- Deduplication by content key, so module copies and repeated imports don't matter.
- Errors that say exactly what to register, for `import` and for `<script>` tags alike.

**Non-Goals:**
- Changing how the **code** of a plugin reaches core. `use(plug)` keeps patching the core copy the
  plugin resolves. A named extension point in core is a separate change (candidate 3 of the
  architecture review).
- Sharing data stores between two copies of the same package (dual package hazard of the plugin code
  itself). It is detected nowhere today and stays that way.
- Smaller locale data in the root entry. That is `reduce-locale-bundle-size`, released in the same
  major.
- Dual CJS/ESM builds in Node.js. Node.js keeps getting one build for `require` and `import` alike
  (decision 7).
- Moving to a newer CLDR or replacing `cldr-data`. Out of scope and a todo for later (see
  `reduce-locale-bundle-size`, Non-Goals).

## Decisions

### 1. `registerTimeZoneData` lives in the root of `@js-joda/timezone`, not in core
Turning packed data into `ZoneRules` needs `TzdbZoneRules` and the unpacker, which live in
`@js-joda/timezone`. Moving them into core (the sketch in #791) would grow core for every user and
would make core own the tz data format. The root entry is today's empty build plus the export of
`registerTimeZoneData` — and in this major it *is* the default entry, so there is no `/register`
subpath anymore.
*Alternative:* register in core, with `@js-joda/timezone` as data only. Rejected for the reasons above.
This can be revisited together with candidate 3.

### 2. Content keys
- **tz data:** `version` plus `range`. The data entries add `range` (e.g. `'10-year-range'`) to the
  object they export. They do this when the entry is built, so the packed format and tzdb-builder stay
  as they are. Data without `range` (the full file, or a user's packed JSON) has the key `version`.
- **locale data:** the CLDR path, as today.

*Alternative:* object identity, or a `WeakSet` of registered objects. Rejected, because the CJS and ESM
copies of the same data are different objects.

### 3. Conflicts: first registration wins, a conflicting one throws
`TzdbZoneRulesProvider` gets one internal `register(data)` keyed by `version` + `range`:
- nothing registered → unpack and store;
- same key → no-op;
- different key → throw a `DateTimeException` naming both keys; the registered data stays in use.

There is no lenient mode anymore: the side-effect entries that used lenient registration are removed
in this major. Merging two data sets is gone; it produced inconsistent results (duplicate IDs, mixed
zones). `ZoneRulesProvider.loadTzdbData()` is removed with them — `packages/core` never referenced it
(the plugin's `plug.js` added it), so core is unchanged; `registerTimeZoneData` is the only way to
register tz data.
*Alternative:* the last registration wins. Rejected, because the result would depend on import order
again.

### 4. `ZoneId.systemDefault()` is resolved after registration
With explicit registration the data comes after the plug, so resolving the system zone at plug time
would fail and leave the fixed-offset default in place. `extendSystemDefaultZoneId` is run again after
every registration that stores data. Alternatively it could resolve lazily on the first call and cache
the result. The re-run is simpler and keeps the current semantics.

### 5. Locale data sources behind one seam in `CldrCache`; the root no longer touches `cldr-data`
`CldrCache` keeps the path store and gains a list of **sources**. A source has `load(path)` (returns
the CLDR JSON or `undefined`) and `availableLocales()`. `loadCldrData(path)` asks the registered sources
instead of calling `require('cldr-data')`. `getAvailableLocales()` merges the registered locales with
the locales of the sources. `registerLocaleData` dispatches on its arguments:
- `(string, object)` → path and data, as today;
- objects with a `load` function → sources;
- objects mapping CLDR paths to JSON → locale data objects; every entry is registered by path;
- `zoneNames`/`metaZones` values → registered like locale data objects.

Sources carry an `id` (`'cldr-data'` for `cldrDataSource`); registering a source whose `id` is already
registered is a no-op.

`src/cldr-data.js` (entry `@js-joda/locale/cldr-data`) is the only module that `require`s `cldr-data`.
It throws a clear error at import time when `cldr-data` is missing. The root entry does **not**
register that source automatically anymore — Node.js users who want all locales opt in with
`registerLocaleData(cldrDataSource)`.
*Alternative:* keep `require('cldr-data')` in `CldrCache` behind a flag. Rejected, because bundlers
still see the `require`.

### 6. Missing-locale check is always on
In `CldrDateTimeTextProvider` and `CldrZoneTextPrinterParser`, when no data for the locale or its
parents is found, throw a `DateTimeException` that names the locale, the registered locales and what to
register. If the locale's language has a prebuilt package, that is its root, e.g. `@js-joda/locale_de`
(for `<script>` tags the corresponding global, e.g. `JSJodaLocaleData_de.localeData`). Otherwise it is
registering the CLDR files by path, or in Node.js `cldrDataSource` if `cldr-data` has that locale. The
language-to-package list is generated at build time from `prebuilt-packages.json`, so the error never
names a package that doesn't exist. The check is not cached, so registering
the data later works. There is no flag that turns the check off: the root entry no longer loads any
data, so nothing can silently disable it. The missing-`likelySubtags` errors of
`reduce-locale-bundle-size` rest on registered data the same way and are `DateTimeException`s too
(same type and message shape, so both main-spec "Locale without data" requirements agree): when
registered `main/*` data has no `likelySubtags` entry for its language, the error names that locale
and `supplemental/likelySubtags.json` with `@js-joda/locale/likely-subtags` as the fix — so a language
without registered data never silently falls back to English.
- All caches that rest on registered data SHALL be invalidated on registration: the cached `Cldr`
  instances (reduce-locale-bundle-size decision 3) and the zone-ID parse cache `_zoneIdsLocales` of
  `CldrZoneTextPrinterParser`. The latter is cleared by `registerLocaleData` for zone names/`metaZones`
  and by `registerTimeZoneData` through a core-level notification hook (the provider plug installs it),
  so a parse that ran before the data was registered does not stay failed afterwards (the cache would
  otherwise keep an IDs-only or empty map).

### 7. One store in Node.js, in bundles and under React Native
- **Single code entry per package.** The root entry is the only code entry (`/register` is removed),
  so there is no root-vs-register split. The `exports` map gives `.` the same conditions as every
  other entry — `types`, `react-native`, `module`, `default` — so Metro resolves the root to the
  same ES module build as the bundlers instead of falling through to the UMD build. (Before, a
  React Native bundle could get the UMD root plus the ESM `/register`: two copies of the code, and
  the data registered into the empty one.)
- **Bundlers (ES modules):** the rollup build keeps several inputs with a shared chunk where they
  contain code (root, `meta-zones`), so a bundle that contains several entries has one store. Pure
  data entries have no shared state.
- **Node.js:** the root stays UMD for `default`, and there is deliberately no `import` condition, so
  `require` and `import` of the root share one module and one store.
- **Script tags:** the IIFE builds stay self-contained; the data scripts only set a global, and an
  inline script calls the register functions. There is no hoisting with script tags: the inline
  script runs after all data scripts.

*Alternative:* CommonJS outputs with a shared chunk, replacing the UMD `main` builds. Rejected, because
it breaks AMD and `<script>` users of `dist/*.js`.

### 8. Subpath entries: permissive `exports` map
Node.js ES modules can't import a subpath directory with its own `package.json`
(`ERR_UNSUPPORTED_DIR_IMPORT`), so `import '@js-joda/timezone/data'` needs an `exports` map. Each
package gets one of this shape:

```json
"exports": {
  ".":          { "types": "./typings/js-joda-timezone.d.ts", "react-native": "./dist/js-joda-timezone.esm.js", "module": "./dist/js-joda-timezone.esm.js", "default": "./dist/js-joda-timezone.js" },
  "./data":     { "types": "./typings/data.d.ts", "react-native": "./dist/data.esm.js", "module": "./dist/data.esm.js", "default": "./dist/data.js" },
  "./data/*":   { "types": "./typings/data.d.ts", "react-native": "./dist/data-*.esm.js", "module": "./dist/data-*.esm.js", "default": "./dist/data-*.js" },
  "./package.json": "./package.json",
  "./*": "./*"
}
```

- The `module` condition (webpack, esbuild, rollup, Vite) gives bundlers the ES module builds. Node.js
  doesn't know `module` and takes `default`, the UMD build, for `require` and `import`. There is
  deliberately no `import` condition, which would give Node.js an ES module copy next to the CJS one.
- The `react-native` condition on **every** entry including `.` points at the same ES module build as
  `module`. Metro (React Native >= 0.79 enables package exports by default) asserts `react-native` but
  not `module`, so without this condition on `.` it falls through to `default` and bundles the UMD
  build — a second copy of the code next to the ESM entries. No other resolver asserts
  `react-native`, so Node.js and the bundlers are unaffected. Key order is `types`, `react-native`,
  `module`, `default` (most specific first).
- `"./*": "./*"` keeps direct file imports of published files working. Note: no extension probing
  happens, so deep imports must name the file with its extension; the side-effect range builds they
  used to refer to are removed in this major anyway.
- `@js-joda/locale`: `.`, `./cldr-data` (only `default`, Node.js only) and `./meta-zones`.
- prebuilt packages: `.` only (plus `./package.json` and `./*`) with a `types` condition pointing to
  a generated `dist/index.d.ts`; the root exports `localeData` and `zoneNames`.
- Subpath patterns substitute `*` only — there is no `$1` — so `"./data/*"` maps to
  `"./dist/data-*.js"` etc. (`@js-joda/timezone/data/10-year-range` → `dist/data-10-year-range.js`).
- Resolution summary, documented in the READMEs (no `engines` field is set): conditional exports
  need Node.js >= 12.16 and unflagged ESM >= 12.17, so named entries (`.`, `./data`, `./meta-zones`,
  …) resolve for `require` from 12.16 and for `import` from 12.17; subpath **patterns** (`"./*"`,
  `"./data/*"`) need Node.js >= 12.20 (patterns landed in 12.20/14.13), so
  `@js-joda/timezone/data/<range>` resolves from 12.20 for both `require` and `import`. Below that,
  those entries throw `ERR_PACKAGE_PATH_NOT_EXPORTED` (EOL versions, documented as unsupported).
  Bundlers resolve via `module`, Metro via `react-native`, Node.js via `default`, script tags via
  the minified builds and globals.
- TypeScript only honors `exports` with `moduleResolution` `node16`/`nodenext`/`bundler`; the repo's
  own `shared/ts-test-config.json` SHALL set one of these (task 2.3), and every entry SHALL ship
  declarations (the `types` condition) so subpath imports compile under `strict`.

### 9. Hoisting: register in a setup module
ESM evaluates imports before the importing module's body, so
`export const BERLIN = ZoneId.of('Europe/Berlin')` in an imported module runs before any
`registerTimeZoneData()` call in the app and throws the missing-data error. There is no `/auto`
convenience entry; the docs show a small setup module imported first:

```js
// setup.js
import { registerTimeZoneData } from '@js-joda/timezone';
import { tzdbData } from '@js-joda/timezone/data';
registerTimeZoneData(tzdbData);
```

```js
// app.js
import './setup.js'; // first import
import { ZoneId } from '@js-joda/core';
export const BERLIN = ZoneId.of('Europe/Berlin');
```

### 10. Prebuilt packages and `meta-zones`
- Each prebuilt package root exports `localeData` and `zoneNames` and imports nothing. A
  tree-shaking test (esbuild and webpack) verifies that a bundle importing only `localeData` from
  the root drops `zoneNames`; if the test fails, `zoneNames` moves to a `/zone-names` subpath instead
  and the specs are updated accordingly.
- `@js-joda/locale/meta-zones` exports `metaZones` as a plain value; the app registers it together
  with zone names: `registerLocaleData(enZones, metaZones)` (only for `z`, `zzzz`, `v`).
- Script-tag globals: `JSJodaTimezone.registerTimeZoneData`, `JSJodaTimezoneData.tzdbData`,
  `JSJodaLocale.registerLocaleData`, and per prebuilt package a unique global `JSJodaLocaleData_<locale>`
  (e.g. `JSJodaLocaleData_en_us`) exposing `localeData` and `zoneNames`, so several locales can be
  loaded on one page. The minified `js-joda-timezone.min.js` keeps its file name but contains no data
  anymore; unpinned CDN URLs break and this is called out in the changelog and migration guide.

## Risks / Trade-offs

- [Adding an `exports` map can break consumers that import a path it doesn't cover] → `"./*": "./*"`
  and `"./package.json"` cover every published file; deep imports need the file extension (no
  probing). Verify the samples in `packages/examples` resolve unchanged.
- [Bundlers that don't know the `module` condition get the UMD build] → The common bundlers support
  `module`; the `react-native` condition covers Metro — now on every entry including `.`, so there is
  no UMD/ESM mix in React Native anymore.
- [Node.js 12.16–12.19 does not support subpath patterns, so `"./*"` deep imports and
  `@js-joda/timezone/data/<range>` throw `ERR_PACKAGE_PATH_NOT_EXPORTED` there] → EOL; documented in
  the READMEs' resolution matrix (12.16 / 12.17 / 12.20 floors; patterns from 12.20). No `engines`
  field is set, so nothing fails at install time.
- [Explicit tz data is registered after `ZoneId`s were already resolved, e.g. a library that resolves
  a zone at import time] → Those objects keep the rules they resolved; zones resolved later use the
  new data. Decision 9: register at startup in a setup module. Documented in the migration guide.
- [The dual package hazard of the plugin code remains: two `@js-joda/core` copies, one of them never
  plugged] → Out of scope (Non-Goals), unchanged from today.
- [`js-joda-timezone.min.js` keeps its file name but has no data; unpinned CDN URLs break] → Called
  out in the changelog and the migration guide.
- [Two majors installed side by side means two copies again] → Peer ranges move to the new major
  (`@js-joda/locale` `>=7.0.0` for the prebuilt packages).

## Migration Plan

A migration guide with before/after snippets is part of the release (spec
`repo-documentation-and-migration`): ESM, CommonJS, `<script>` tags, Node.js with `cldr-data`, React
Native. The core moves:

| Before | After |
|---|---|
| `import '@js-joda/timezone';` | `import { registerTimeZoneData } from '@js-joda/timezone';` + `import { tzdbData } from '@js-joda/timezone/data';` + `registerTimeZoneData(tzdbData);` |
| `ZoneRulesProvider.loadTzdbData(data)` | `registerTimeZoneData(data)` |
| `import '@js-joda/locale'; import '@js-joda/locale_de';` | `import { registerLocaleData } from '@js-joda/locale';` + `import { localeData as de } from '@js-joda/locale_de';` + `registerLocaleData(de);` |
| `import { localeData } from '@js-joda/locale_de/data'` | `import { localeData } from '@js-joda/locale_de'` |
| `import '@js-joda/timezone/dist/js-joda-timezone-10-year-range'` | `import { tzdbData } from '@js-joda/timezone/data/10-year-range'` + `registerTimeZoneData(tzdbData)` |

Rollback means staying on the previous major.

## Open Questions

- Exact wording of the error messages; to be settled in code review. They must cover `<script>` tags
  as well as `import`.

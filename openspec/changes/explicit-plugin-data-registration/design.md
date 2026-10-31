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
- `exports` maps (#793). Subpath entries use directories with their own `package.json`.
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

### 3. Conflicts: strict for explicit calls, lenient for side-effect entries
`TzdbZoneRulesProvider` gets one internal `register(data, { lenient })`:
- nothing registered → unpack and store, and remember the key;
- same key → no-op;
- other key → `lenient` returns silently, otherwise throw a `DateTimeException` naming both keys.

`registerTimeZoneData` and `ZoneRulesProvider.loadTzdbData` call it strictly. The side-effect entries
(`@js-joda/timezone`, the `-range` builds) call it leniently, so a library importing the default entry
never breaks an app that registered other data first. Merging two data sets is gone. It produced
inconsistent results (duplicate IDs, mixed zones).
*Alternative:* the last registration wins. Rejected, because the result would then depend on import
order again.

### 4. `ZoneId.systemDefault()` is resolved after registration
With explicit registration the data comes after the plug, so resolving the system zone at plug time
would fail and leave the fixed-offset default in place. `extendSystemDefaultZoneId` is run again after
every successful registration. Alternatively it could resolve lazily on the first call and cache the
result. The re-run is simpler and keeps the current semantics for the default entry.

### 5. Locale data sources behind one seam in `CldrCache`
`CldrCache` keeps the path store and gains a list of **sources**. A source has `load(path)` (returns
the CLDR JSON or `undefined`) and `availableLocales()`. `loadCldrData(path)` asks the registered sources
instead of calling `require('cldr-data')`. `getAvailableLocales()` merges the registered locales with
the locales of the sources. `registerLocaleData` dispatches on its arguments:
- `(string, object)` → path and data, as today;
- objects with a `load` function → sources;
- other objects → locale data objects (CLDR path → JSON); every entry is registered by path.

`src/cldr-data.js` (entry `@js-joda/locale/cldr-data`) is the only module that `require`s `cldr-data`
in explicit mode. It throws a clear error at import time when `cldr-data` is missing. The default entry
registers that source if `cldr-data` can be required, which keeps today's Node.js behaviour.
*Alternative:* keep `require('cldr-data')` in `CldrCache` behind a flag. Rejected, because bundlers
still see the `require`.

### 6. Missing-locale check
In `CldrDateTimeTextProvider` and `CldrZoneTextPrinterParser`, when no data for the locale or its
parents is found, throw a `DateTimeException` (spec: locale-data-registration). The check is not
cached, so registering the data later works. It is active unless the default entry was imported, so the
behaviour of the default entry doesn't change.

### 7. One store in Node.js and in bundles: shared module plus thin entries
The locale rollup build gets several inputs with a shared chunk: `register` (plug + supplemental data +
store), and `js-joda-locale` (= `register` + the `cldr-data` source if available + the same exports).
ES module and CommonJS outputs go to `dist/`. `dist/js-joda-locale.js` changes from UMD to CommonJS that
requires the shared chunk, so `require('@js-joda/locale')` and `require('@js-joda/locale/register')`
share one store. The IIFE builds (`dist/js-joda-locale.min.js`, `dist/register.min.js`) stay
self-contained for `<script>` tags. Timezone does the same for `register` and the default entry, so
`loadTzdbData` and `registerTimeZoneData` reach one store.
This overlaps with the `reduce-locale-bundle-size` design (several inputs, a shared chunk). Whichever
change lands second reuses that build setup, and `/slim` becomes the `register` input without the
bundled supplemental data.

### 8. Subpath entries without `exports`
- `@js-joda/timezone`: `register/package.json`, `data/package.json`, `data/<range>/package.json`, each
  with `main`, `module` and `types` pointing into `dist/` and `typings/`. `data/` already holds
  `data/packed/` for tzdb-builder, so `files` lists the entry manifests explicitly
  (`data/package.json`, `data/*-range/package.json`) and keeps publishing no packed files.
- `@js-joda/locale`: `register/` and `cldr-data/`.
- prebuilt packages: `data/` with `dist/data.{js,esm.js,min.js}`. The generated `/data` module exports
  `localeData` and has no imports. The default prebuilt entry keeps calling
  `registerLocaleData(path, data)`, so it works with `@js-joda/locale` from 5.0.0 on.
- Script-tag globals: `JSJodaTimezone.registerTimeZoneData`, `JSJodaTimezoneData.tzdbData`,
  `JSJodaLocale.registerLocaleData` and `JSJodaLocaleData_<locale>.localeData` (e.g.
  `JSJodaLocaleData_en_us`), so that several locales can be loaded on one page.

### Usage in the docs
The READMEs and `esdoc/manual` show both modes side by side:

```js
// explicit mode, browser
import { ZoneId, DateTimeFormatter } from '@js-joda/core';
import { registerTimeZoneData } from '@js-joda/timezone/register';
import { tzdbData } from '@js-joda/timezone/data/10-year-range';
import { Locale, registerLocaleData } from '@js-joda/locale/register';
import { localeData as en } from '@js-joda/locale_en/data';
import { localeData as de } from '@js-joda/locale_de/data';

registerTimeZoneData(tzdbData);
registerLocaleData(en, de);
```

```js
// explicit mode, Node.js with every locale
const { registerTimeZoneData } = require('@js-joda/timezone/register');
const { tzdbData } = require('@js-joda/timezone/data');
const { registerLocaleData } = require('@js-joda/locale/register');
const { cldrDataSource } = require('@js-joda/locale/cldr-data');

registerTimeZoneData(tzdbData);
registerLocaleData(cldrDataSource);
```

```js
// tests: register a fixture once in a mocha root hook; a second call with the same data is a no-op
registerTimeZoneData(require('./fixtures/2026e.json'));
```

## Risks / Trade-offs

- [`dist/js-joda-locale.js` changes from UMD to CommonJS, so AMD loaders or `<script>` tags that load
  that file break] → Script tags are documented with `.min.js`, which stays an IIFE. Mention it in the
  changelog. If it matters, keep a UMD copy under a new name.
- [A library that imports the default `@js-joda/locale` brings `require('cldr-data')` back into a
  browser bundle] → Document it. Libraries should import `/register` and leave registration to the app.
- [In explicit mode, a library that imports `@js-joda/timezone` before the app registers a range makes
  the app's call throw] → The error names both data sets and the fix: register the range before that
  import, or drop the range. Silently replacing data would be worse.
- [The dual package hazard of the plugin code remains: two `@js-joda/core` copies, one of them never
  plugged] → Out of scope (Non-Goals), unchanged from today.
- [More entries to keep in sync between the slim change and this one] → Decision 7: one shared build
  setup.

## Migration Plan

Nothing is required: every existing import keeps working. Apps that want explicit mode switch their
imports as in the usage examples. The new entries need the new minor versions of `@js-joda/timezone`,
`@js-joda/locale` and the prebuilt packages. Rollback means reverting the new entries; the default
entries are unchanged in behaviour.

## Open Questions

- Should the side-effect entries be deprecated in a later major? This change doesn't decide it.

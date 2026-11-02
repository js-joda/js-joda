# Proposal

## Why

`@js-joda/timezone` and the prebuilt `@js-joda/locale_<locale>` packages add their data as a side
effect of being imported. That makes import order and module resolution part of the interface, with
nothing to check either. Since core 6.0 / locale 5.0 this has caused the problems reported in #789,
#791 and #793:

- A prebuilt package registers into whichever `@js-joda/locale` copy *it* resolves. With a CJS and an
  ESM copy in one app, the data lands in the other copy and formatting fails with `E_MISSING_BUNDLE`.
- `@js-joda/locale` must be imported before the prebuilt packages.
- The hidden `require('cldr-data')` in the `@js-joda/locale` builds makes browser bundlers pull in
  `cldr-data` (or fail on `fs`) unless the app adds bundler workarounds.
- Calling `ZoneRulesProvider.loadTzdbData()` twice appends the zone IDs again and mixes the zones of
  both data sets.

In #791 we agreed to make loading explicit: data packages export values, and the app registers them.
This change implements that as the **only** mode, in a **major release** (decided 2026-11-01): the
side-effect entries are removed, `ZoneRulesProvider.loadTzdbData()` is removed, and the root entries
of `@js-joda/timezone` and `@js-joda/locale` load no data and no longer use `cldr-data`
automatically.

## What Changes

- **Major release, explicit mode only.** The root of `@js-joda/timezone` and `@js-joda/locale` loads
  no data; `@js-joda/timezone/register`, the side-effect `dist` builds of `@js-joda/timezone`
  (including the `-range` and `-empty` builds) and the `/data` subpath of the prebuilt packages are
  removed.
- `@js-joda/timezone` (root): plugs the tzdb zone rules into `@js-joda/core` as today and exports
  `registerTimeZoneData(data)`. Its builds contain no tz data.
- `@js-joda/timezone/data` and `@js-joda/timezone/data/<range>` (`4-year-range`, `10-year-range`,
  `60-year-range`, `300-year-range`, `lifetime-range`): export `tzdbData` as a plain value and have
  no side effects.
- `@js-joda/locale` (root): exports `Locale`, `WeekFields` and `registerLocaleData` and plugs into
  core as today. Its builds have no reference to `cldr-data` and register nothing on import. Which
  supplemental data the root still bundles is specified by `reduce-locale-bundle-size` (only
  `weekData` stays), released in the same major.
- `registerLocaleData()` accepts locale data objects (CLDR path → JSON), zone data values (the
  `zoneNames` of a prebuilt package, `metaZones` of `@js-joda/locale/meta-zones`) and sources, several
  at once. The existing `registerLocaleData(path, data)` stays.
- `@js-joda/locale/cldr-data` (Node.js only): exports `cldrDataSource`, which an app registers to
  load all locales from the installed `cldr-data` package on first use.
- `@js-joda/locale/meta-zones`: exports `metaZones` as a plain value that the app registers together
  with the zone names of a prebuilt package (only needed for `z`, `zzzz`, `v`).
- Each prebuilt package root exports `localeData` and `zoneNames` and imports nothing, so importing
  it never registers anything. If the tree-shaking test with esbuild and webpack shows that
  `zoneNames` is not dropped when unused, `zoneNames` moves to a `/zone-names` subpath instead.
- `ZoneRulesProvider.loadTzdbData()` is removed; `registerTimeZoneData` is the only way to register
  tz data. `packages/core` never referenced `loadTzdbData` (the plugin added it in `plug.js`), so
  core is unchanged.
- Script tags use the same explicit model: the data scripts only set a global, and an inline script
  calls the register functions (`JSJodaTimezone.registerTimeZoneData(JSJodaTimezoneData.tzdbData)`,
  `JSJodaLocale.registerLocaleData(JSJodaLocaleData_de.localeData, …)`). Each prebuilt IIFE build
  gets a unique global (e.g. `JSJodaLocaleData_en_us`).
- Registration is idempotent by content key, not by object or function reference: tz data by its
  version and range, locale data by its CLDR path. A second registration with the same key is a
  no-op; a second registration with a different key throws a `DateTimeException` that names both
  data sets, and the first data stays in use.
- Missing data throws errors that name exactly what to register, for `import` and for `<script>`
  tags alike.
- Packages get an `exports` map (conditions `types`, `react-native`, `module`, `default` on every
  entry including `.`, deliberately no `import` condition, plus `"./package.json"` and
  `"./*": "./*"`), because Node.js ES modules can't import subpath directories without one. Node.js
  gets one module for `require` and `import` alike; bundlers and Metro get the ES module builds, so
  there is one copy of the code and one data store even under React Native. No `engines` field is
  set; the READMEs document the resolution matrix (named entries from Node.js >= 12.16 for
  `require` and >= 12.17 for `import`, subpath patterns such as `"./*"` and `"./data/*"` from
  >= 12.20 — so `@js-joda/timezone/data/<range>` resolves from 12.20 for both `require` and
  `import`).
- **Hoisting:** ES modules evaluate imports before the importing module's body, so an app registers
  in a setup module that is imported first. Resolving a region-based zone at module evaluation time
  before registration throws the missing-data error. The docs show the setup-module pattern; there
  is no `/auto` convenience entry.
- Docs, examples and tests: every doc, sample and example in the repo uses the new API,
  `packages/examples` passes against it, and a migration guide with before/after snippets (ESM,
  CommonJS, script tags, Node.js with `cldr-data`, React Native) is added. See the spec delta
  `repo-documentation-and-migration`.

### Usage

```js
// Time zones
import { ZoneId } from '@js-joda/core';
import { registerTimeZoneData } from '@js-joda/timezone';
import { tzdbData } from '@js-joda/timezone/data';  // or '@js-joda/timezone/data/10-year-range'

registerTimeZoneData(tzdbData);
ZoneId.of('Europe/Berlin');
```

```js
// Locales in a browser, bundler or Node.js
import { Locale, registerLocaleData } from '@js-joda/locale';
import { localeData as en, zoneNames as enZones } from '@js-joda/locale_en-us';
import { metaZones } from '@js-joda/locale/meta-zones';

registerLocaleData(en);                    // order doesn't matter, duplicates are ignored
registerLocaleData(enZones, metaZones);    // only needed for z, zzzz, v
```

```js
// Node.js with all locales from cldr-data
import { registerLocaleData } from '@js-joda/locale';
import { cldrDataSource } from '@js-joda/locale/cldr-data';

registerLocaleData(cldrDataSource);
```

Script tags: load core, then the plugin code, then the data scripts in any order, then an inline
script that calls the register functions:

```html
<script src="js-joda.min.js"></script>
<script src="js-joda-timezone.min.js"></script>       <!-- code only, no data -->
<script src="js-joda-timezone-data.min.js"></script>  <!-- sets JSJodaTimezoneData only -->
<script>
  JSJodaTimezone.registerTimeZoneData(JSJodaTimezoneData.tzdbData);
</script>
```

## Capabilities

### New Capabilities
- `timezone-data-registration`: how tz data reaches `@js-joda/timezone` — the data entries, the
  `registerTimeZoneData` export of the root entry, idempotency and conflicts, the error when no
  data is registered, and the hoisting/setup-module rule.
- `locale-data-registration`: how CLDR data reaches `@js-joda/locale` — the `registerLocaleData`
  export of the root entry, data objects, zone data values and the `cldr-data` source, idempotency,
  and the error for a locale without data.
- `repo-documentation-and-migration`: every doc, sample, example and test in the repo uses the new
  API, `packages/examples` passes against it, and a migration guide exists.

### Modified Capabilities
- `locale-prebuilt-packages`: each prebuilt package root exports `localeData` and `zoneNames` with
  no imports and no registration, and gets an `exports` map. The peer range on `@js-joda/locale`
  becomes `>=7.0.0`.

## Impact

- `packages/timezone`: `src/js-joda-timezone.js` becomes the side-effect free root (plug plus the
  `registerTimeZoneData` export); `TzdbZoneRulesProvider` registers by key instead of appending and
  `loadTzdbData` is removed; the side-effect `dist` builds (the data-carrying `js-joda-timezone.js`,
  the `-range` and `-empty` builds) are removed; new data entry modules export `tzdbData`;
  `rollup.config.js`, the `exports` map and `files` list, and the typings.
- `packages/locale`: the root entry has no `cldr-data` reference and registers nothing on import;
  new `src/cldr-data.js` and `src/meta-zones.js`; `format/cldr/CldrCache.js` gains the data source
  seam; `CldrDateTimeTextProvider.js` (`getAvailableLocales`); `rollup.config.js`, the typings,
  `utils/cldr-data.ejs` plus `utils/create_packages.js` for the prebuilt root exports, and the
  `exports` map.
- `packages/examples`: all existing samples are updated to the new API, plus new samples for
  explicit registration (CommonJS, ES module, TypeScript, an esbuild browser bundle that must not
  contain `cldr-data`, and script tags).
- Docs: every doc that shows plugin imports — root `README.md`, `packages/core/README.md`,
  `packages/core/CheatSheet.md`, `packages/timezone/README.md`, `packages/locale/README.md`,
  `esdoc/manual` (`ZonedDateTime.md`, `formatting.md`, `packages.md`, `Locale`), the
  `utils/README_package.template.md` and the regenerated prebuilt READMEs — plus a migration
  guide; root `CHANGELOG.md`.
- Build and tooling: `packages/locale/karma.conf.js`, `packages/timezone/bower.json`, the `esdoc`
  configs, `packages/tzdb-builder`, `packages/timezone/HowToUpdateTZDB.md`,
  `.github/scripts/tzdb-release-check.sh`, `ReleaseHowTo.md`, `AGENTS.md`.
- Tests in each package that relied on side-effect imports register fixtures explicitly (a second
  call with the same data is a no-op).
- Release: major versions of `@js-joda/timezone` (4.0.0), `@js-joda/locale` (7.0.0) and the prebuilt
  packages; core is unchanged (6.x). `reduce-locale-bundle-size` ships in the same major release.
  The version bumps land in this same PR, before the peer-range and prebuilt-manifest tasks run
  (task 0.1): the committed test `prebuiltPackagesTest_mochaOnly.js` requires the configured
  `>=7.0.0` range to be satisfied by the current `@js-joda/locale` version, so the range may only be
  raised together with the 7.0.0 bump.
- Peer ranges: `@js-joda/locale` and the prebuilt packages move to the new major (`>=7.0.0`);
  two majors installed side by side mean two copies again. `@js-joda/locale`'s peer range on
  `@js-joda/timezone` becomes `^4.0.0` in the same PR and is copied into the prebuilt manifests — an
  installed optional peer is still enforced, so leaving `^3.1.0` would fail installs that have
  timezone 4.x (npm `ERESOLVE`), and would also permit timezone 3.x, whose side-effect model this
  major removes.

## References

Origin of the current plugin and registration design:
- [#786](https://github.com/js-joda/js-joda/pull/786) Enable multi-locale import (core 6.0 / locale 5.0): prebuilt packages register into one shared `@js-joda/locale` via `registerLocaleData()`
- [#768](https://github.com/js-joda/js-joda/pull/768) Make it less easy to misuse the timezone module: a clearer error when `@js-joda/timezone` wasn't imported
- [#774](https://github.com/js-joda/js-joda/issues/774) How to use multiple locales in an Angular project (from before #786)

Problems reported after #786, and the fixes that followed:
- [#789](https://github.com/js-joda/js-joda/issues/789) TypeScript error when importing locales in js-joda 6: bundlers pull in `cldr-data`, and the CJS/ESM dual package hazard gives `E_MISSING_BUNDLE`
- [#790](https://github.com/js-joda/js-joda/pull/790) Add an example of the breaking change to the changelog
- [#791](https://github.com/js-joda/js-joda/issues/791) Build failure on upgrade to 5.0.1 locales: import order, the Angular `cldr-data` workaround, and the **proposal for explicit registration** (`registerTimeZoneData` / `registerLocaleData`) that this change implements
- [#792](https://github.com/js-joda/js-joda/pull/792) Updates to cldr docs and dependency handling (closed): optional, lazily imported `cldr-data`
- [#793](https://github.com/js-joda/js-joda/issues/793) Dependencies, builds, and bundlers in the latest version: `cldrjs` peer dependency, optional peers, the dynamic `require('cldr-data')`, ESM/CJS and `exports` maps
- [#794](https://github.com/js-joda/js-joda/pull/794) Fix the HTML examples
- [#796](https://github.com/js-joda/js-joda/pull/796) Make the locale peer dependencies optional (fixes #789, #791)

Related size work:
- [#421](https://github.com/js-joda/js-joda/issues/421) Reduce prebuilt locale package sizes, and [#835](https://github.com/js-joda/js-joda/pull/835) / the OpenSpec change `reduce-locale-bundle-size`

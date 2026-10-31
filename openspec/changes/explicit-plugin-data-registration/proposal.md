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

## What Changes

- New opt-in **explicit mode**. Existing imports keep working unchanged, so the change can be a minor
  release.
- `@js-joda/timezone/register`: plugs the tzdb zone rules into core like today, contains no tz data,
  and exports `registerTimeZoneData(data)`.
- `@js-joda/timezone/data` and `@js-joda/timezone/data/<range>` (`4-year-range`, `10-year-range`,
  `60-year-range`, `300-year-range`, `lifetime-range`): export `tzdbData` as a plain value and have no
  side effects.
- `@js-joda/locale/register`: the same API as `@js-joda/locale`, also exporting `registerLocaleData`,
  with no reference to `cldr-data`.
- `registerLocaleData()` also accepts locale data objects (CLDR path → JSON), several at once. The
  existing `registerLocaleData(path, data)` stays.
- `@js-joda/locale/cldr-data` (Node.js only): exports `cldrDataSource`, which an app registers to
  load all locales from the installed `cldr-data` package on first use.
- Each prebuilt package gets a `/data` entry that exports `localeData` and imports nothing.
- Registration is idempotent by content key, not by object or function reference: tz data by its
  version and range, locale data by its CLDR path. A conflicting tz registration throws a
  `DateTimeException` that names both data sets.
- Missing data in explicit mode throws errors that name what to register.
- The existing side-effect entries (`@js-joda/timezone`, its `dist/*-range` files, `@js-joda/locale`,
  `@js-joda/locale_<locale>`) keep their behaviour. Internally they become small adapters over the
  same registration.

### Usage

```js
// Time zones: today
import { ZoneId } from '@js-joda/core';
import '@js-joda/timezone';                         // side effect: loads data, patches core

// Time zones: explicit
import { ZoneId } from '@js-joda/core';
import { registerTimeZoneData } from '@js-joda/timezone/register';
import { tzdbData } from '@js-joda/timezone/data';  // or '@js-joda/timezone/data/10-year-range'

registerTimeZoneData(tzdbData);
ZoneId.of('Europe/Berlin');
```

```js
// Locales in a browser: today (import order matters, the copies must match)
import { Locale } from '@js-joda/locale';
import '@js-joda/locale_en';
import '@js-joda/locale_de';

// Locales in a browser: explicit
import { Locale, registerLocaleData } from '@js-joda/locale/register';
import { localeData as en } from '@js-joda/locale_en/data';
import { localeData as de } from '@js-joda/locale_de/data';

registerLocaleData(en, de);                         // order doesn't matter, duplicates are ignored
```

```js
// Node.js with all locales from cldr-data: explicit
import { registerLocaleData } from '@js-joda/locale/register';
import { cldrDataSource } from '@js-joda/locale/cldr-data';

registerLocaleData(cldrDataSource);
```

## Capabilities

### New Capabilities
- `timezone-data-registration`: how tz data reaches `@js-joda/timezone` — the data entries, the
  register entry, idempotency and conflicts, the error when no data is registered, and the
  compatibility of the side-effect entries.
- `locale-data-registration`: how CLDR data reaches `@js-joda/locale` — the register entry, data
  objects and the `cldr-data` source, idempotency, the error for a locale without data, and the
  compatibility of the default entry.

### Modified Capabilities
- `locale-prebuilt-packages`: every prebuilt package gets a side-effect free `/data` entry. The
  default entry keeps registering through `registerLocaleData(path, data)`, so the peer range on
  `@js-joda/locale` stays `>=5.0.0`.

## Impact

- `packages/timezone`: new `src/register.js` and data entry modules, `TzdbZoneRulesProvider`
  (registration by key instead of appending), `rollup.config.js`, new `register/` and `data/`
  entry directories, the `files` list, and `typings/js-joda-timezone.d.ts` (which exports nothing today).
- `packages/locale`: new `src/register.js` and `src/cldr-data.js`. `format/cldr/CldrCache.js` gains a
  data source seam, so `require('cldr-data')` only exists behind the Node-only entry and the default
  entry. Also `CldrDateTimeTextProvider.js` (`getAvailableLocales`), `rollup.config.js`, the typings, and
  `utils/cldr-data.ejs` plus `utils/create_packages.js` for the prebuilt `/data` entries. The 33 prebuilt
  packages get a `data/` directory.
- `packages/examples`: samples for explicit mode (CJS, ESM, TypeScript, and a browser bundle that
  checks no `cldr-data` is included).
- Docs: the timezone and locale READMEs, `esdoc/manual`, root `CHANGELOG.md`.
- Release: minor versions of `@js-joda/timezone`, `@js-joda/locale` and the prebuilt packages; core
  is unchanged.
- Related: the pending change `reduce-locale-bundle-size` stays separate. It adds `/slim` entries
  next to the ones added here; see design.md for how the two fit together.

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

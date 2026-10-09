# Design

## Context

See proposal.md for the motivation. Relevant current state in `packages/locale`:

- `src/supplemental-data.js` imports `likelySubtags`, `metaZones` and `weekData` from `cldr-data`, so
  rollup inlines them into every build of `@js-joda/locale`. It first calls `loadCldrData` for each
  path (works in Node.js with `cldr-data`), then `registerLocaleData` with the bundled copies.
- `src/format/cldr/CldrCache.js`: `registerLocaleData(path, data)` returns early when `path` was
  registered before (`cldrDataLoaded`), otherwise it calls `Cldr.load(data)`. `cldrjs` merges every
  `Cldr.load` into one shared data tree (`jsonMerge`: objects are merged key by key, arrays and other
  values are replaced). `loadCldrData(path)` skips registered paths and otherwise tries
  `require('cldr-data')(path)`; where `require` is undefined it loads nothing.
- `cldrjs` uses `supplemental/likelySubtags` when a `Cldr` instance is created and when it maps the
  bundle of a loaded `main/*` file. `Cldr.load` of a `main/*` file pushes its bundle onto
  `Cldr._availableBundleMapQueue`; the next `new Cldr(…)` (for any locale) maps every queued bundle and,
  for the first bundle without a `likelySubtags` entry, removes it from the queue and throws
  `Could not find likelySubtags for <bundle>`. This also happens when no `likelySubtags` is loaded at
  all. The bundle is then lost for the life of the process, even if `likelySubtags` is registered
  later. Only the requested locale itself is resolved without `likelySubtags` (its subtags are used
  as they are). When a requested language has no `likelySubtags` entry, `cldrjs` falls back to the
  `und` entry (`en-Latn-US`), so the instance silently gets the `en` bundle if one is loaded.
- `WeekFields.ofLocale` calls `getOrCreateCldrInstance` but only reads `supplemental/weekData` and
  `locale.country()`; it needs neither `likelySubtags` nor `main/*` data.
- `CldrZoneTextPrinterParser.print` appends the ID of a fixed-offset zone without any CLDR lookup;
  `parse` handles `+hh:mm`, `GMT…`, `UTC…`, `UT…` before the name lookup, matches zone IDs as well as
  names, accepts `Z` as a last resort, and returns `~position` when nothing matches (optional sections
  and `parseUnresolved` rely on this). `_resolveZoneIds` caches the map of IDs and names per locale
  for the life of the formatter. For region zones it loads `metaZones` and
  `main/<locale>/timeZoneNames.json`; when no name is found it prints the zone ID.
- `@js-joda/locale` has no `exports` map; Node.js ESM `import '@js-joda/locale'` resolves to the CJS
  `main`, so ESM samples in the monorepo can still `require('cldr-data')` through it.
- `cldr-data/availableLocales.json` has no `no*` or `nn*` locales, so the prebuilt packages `no` and
  `nn-no` expand to no locale and are empty today (359-byte bundles).
- Prebuilt packages are generated from `prebuilt-packages.json`: `utils/clrdr-data-render.js` expands
  the locale patterns against `cldr-data/availableLocales.json` and renders `utils/cldr-data.ejs` into a
  virtual rollup entry; `rollup-build-packages-config.js` builds `index.js` (UMD), `index.esm.js`,
  `index.min.js` (IIFE) per package into `dist/prebuilt/<pkg>/`; `utils/create_packages.js` copies
  them to `packages/<pkg>/dist/` and writes the manifest. Manifests have `main` and `module`, no
  `exports` and no `"type"`, so Node.js treats every `.js` file in them as CommonJS.
- Measured gzip sizes: full `likelySubtags` 12.3 KB (1846 entries); subset for `en` 0.16 KB (19
  entries), `zh` 0.23 KB, `de` 0.1 KB; `metaZones` 10.5 KB; `en/timeZoneNames` 6.7 KB.

## Goals / Non-Goals

**Goals:**
- Cut the size of the default prebuilt import without code changes for its users.
- Offer an opt-in entry without time-zone names.
- Keep new prebuilt packages working with older `@js-joda/locale` releases.
- Without `cldr-data`, report missing data with a clear error instead of wrong output.

**Non-Goals:**
- Removing `weekData` from the base package (~1 KB gzip, needed by `WeekFields` for every locale).
- Trimming `ca-gregorian` or `timeZoneNames` content, or splitting the `.*` packages (e.g. `en` with
  ~100 regional locales) into smaller ones.
- Sharing data between `@js-joda/timezone` and the CLDR zone names.
- Fixing the empty `no` and `nn-no` prebuilt packages (wrong patterns in `prebuilt-packages.json`);
  a separate issue.
- Any use of the `Intl` API.

## Decisions

1. **The base package bundles only `weekData`.** `supplemental-data.js` keeps the eager
   `loadCldrData` calls for all three files, but registers only the bundled `weekData` copy.
   In Node.js with `cldr-data` nothing changes. `likelySubtags` and `metaZones` move to the prebuilt
   packages, which are the supported way to use locales without `cldr-data`.
   Alternative: a separate slim entry of `@js-joda/locale` (`@js-joda/locale/slim`). Rejected: the
   default import of a prebuilt package would not get smaller, and every prebuilt package would need
   to import the slim base, which breaks with older bases.

2. **`registerLocaleData` merges `likelySubtags` only; `cldr-data` always wins.** `CldrCache` keeps the
   `Set` of registered paths and adds a `Set` of paths loaded by `loadCldrData`. Rules:
   - A path loaded from `cldr-data` is never changed by a later `registerLocaleData`. In Node.js with
     `cldr-data`, the base loads `likelySubtags` and `metaZones` at import, before any prebuilt
     package registers its copy, so the prebuilt copies are skipped and output stays exactly as
     today, even when the installed `cldr-data` has another CLDR version than the prebuilt bundles.
   - `supplemental/likelySubtags.json` registered again (not from `cldr-data`) is passed to
     `Cldr.load`, which merges it key by key. `likelySubtags` is one flat object, so the subsets of
     several prebuilt packages add up. Registering the same object again merges identical values and
     has no visible effect, so no bookkeeping per data object is needed.
   - Every other path keeps today's rule: the first registration wins. This covers `metaZones`
     (mostly arrays, which `jsonMerge` would replace, and registered whole by every full prebuilt
     package, so a later copy is skipped instead of merged again) and `main/*` (two prebuilt packages
     of different releases can't mix values of one locale).
   `loadCldrData` still skips every registered path, so a prebuilt bundle is never reloaded from
   `cldr-data`.
   Alternatives: merging every path (rejected: mixes CLDR versions in `main/*` and `metaZones` and
   re-merges `metaZones` at every import); registering each subset under its own path, e.g.
   `supplemental/likelySubtags-en.json` (rejected: a path that doesn't exist in CLDR in the public
   API, and `cldrjs` would need the data merged anyway).

3. **likelySubtags subset rule.** For a prebuilt package with languages `L` (the language subtags of
   its expanded locales, e.g. `en` for `en`, `en-US`; `zh` for `zh`, `zh-Hant-TW`), keep the entries
   whose key has a language subtag in `L`, the `und` entry, and `und-*` entries whose value has a
   language in `L`. The `und` entry is needed: `cldrjs` reads it unconditionally when a requested
   language has no entry and would throw a `TypeError` without it. The wrong fallback to `und` is
   caught by decision 6. `utils/clrdr-data-render.js` computes the subset at build time and inlines
   it into the rendered entry as a JSON literal. A test resolves every locale of every prebuilt
   package with `cldrjs` against the subset and against the full file and requires equal results
   (spec scenario "Subset gives the same result as the full data"). If the test finds a gap, the
   rule is widened, not special-cased. The test also requires every package to expand to at least
   one locale, with `no` and `nn-no` as an explicit list of known-empty packages, so that the
   equality check can't pass on an empty package without anyone noticing.

4. **Entry layout.** `cldr-data.ejs` renders one entry with a `zoneNames` flag. Registration order in
   both entries: `likelySubtags` subset first (so that the `main/*` data that follows can be loaded
   at once, decision 6), then `metaZones` (full entry only), then per locale `ca-gregorian` and
   `timeZoneNames` (full entry only). `buildRollupConfigs` builds two entry variants per package,
   each as UMD (`.js`), ES module (`.esm.js` for bundlers via `module`, and the same output as `.mjs`
   for Node.js) and IIFE (`.min.js`): `index.*` and `no-zone-names.*`. `metaZones` is in every full
   prebuilt package; the first registration wins (decision 2), so a second package costs bundle size
   but no merge at import.
   Alternative: a shared `metaZones` entry, e.g. `@js-joda/locale/meta-zones`, imported by the
   prebuilt packages. Rejected: older bases (peer range `>=5.0.0`, decision 7) don't have that entry.

5. **Subpath export.** The generated manifests get an `exports` map:
   ```json
   "exports": {
     ".": { "import": "./dist/index.mjs", "require": "./dist/index.js" },
     "./no-zone-names": { "import": "./dist/no-zone-names.mjs", "require": "./dist/no-zone-names.js" },
     "./dist/*": "./dist/*",
     "./package.json": "./package.json"
   }
   ```
   The `import` targets are `.mjs`, because the manifests have no `"type": "module"` and Node.js would
   load `index.esm.js` as CommonJS (an error, or a `MODULE_TYPELESS_PACKAGE_JSON` warning and a
   reparse where module detection is on). Adding `"type": "module"` instead is rejected: it would turn
   the UMD `index.js` into an ES module for `require`. The `.mjs` files import `registerLocaleData`
   from `@js-joda/locale`, which resolves to its CJS `main` in Node.js, so `require` and `import` of a
   prebuilt package share one `CldrCache`. `main` and `module` stay for older tools. `./dist/*` keeps
   existing deep imports and `<script>` paths working. Alternative: a `no-zone-names/package.json`
   stub directory without `exports`. Rejected: Node.js ESM does not resolve directory imports.

6. **Missing-data errors.**
   - **likelySubtags.** `registerLocaleData` does not pass `main/<bundle>/…` data to `Cldr.load` while
     `<bundle>` can't be resolved with the `likelySubtags` loaded so far. It keeps that data pending.
     `CldrCache` resolves a bundle as `cldrjs` does: the bundle names language, script and territory,
     or `likelySubtags` has an entry for one of `lang-script-territory`, `lang-territory`,
     `lang-script`, `lang`, `und-script`. It tracks the registered `likelySubtags` keys itself, so it
     needs no private `cldrjs` state. Registering `likelySubtags` (or loading it from `cldr-data`)
     loads every pending bundle that can now be resolved, so hand registration in any order works
     and recovers in the same process. A bundle without entries is never loaded into `cldrjs`, so it
     never makes `new Cldr` throw for other locales: with a new `locale_en-us` and an old
     `locale_de` 5.3.2, `Locale.US` keeps working.
     The text providers (`CldrDateTimeTextProvider`, `CldrZoneTextPrinterParser`) get their `Cldr`
     through a check that throws an `IllegalStateException` when the requested language has pending
     data, naming the pending bundles, the requested locale, and the fix: register
     `supplemental/likelySubtags.json`, or update all prebuilt packages to the release of
     `@js-joda/locale`. The same check throws when the instance fell back to `und`, i.e. its language
     differs from the requested one (requested language not `und`): no data is registered for that
     language, e.g. `Locale.KOREAN` with only `locale_en-us`. Today that case fails in `cldrjs` with
     `E_MISSING_BUNDLE`; with a subset it would silently print English. Nothing is cached on error.
   - **WeekFields.** `WeekFields.ofLocale` reads `supplemental/weekData` without that check, through a
     `Cldr` instance that needs no `main/*` data. It keeps working with only the base package and
     with pending data.
   - **Zone names.** In `CldrZoneTextPrinterParser.print`, after the `ZoneOffset` branch (a
     fixed-offset zone still prints its ID) and after the `loadCldrData` calls, throw an
     `IllegalStateException` if `cldr.get('supplemental/metaZones')` or
     `cldr.main('dates/timeZoneNames')` is missing. The message names the pattern letters, the locale,
     that the default import of a prebuilt package (not its `no-zone-names` entry) includes zone
     names, and the two `registerLocaleData` paths. It does not name a specific prebuilt package: the
     base can't know which package (`locale_en`, `locale_en-us`, `locale_en-gb`, or none) registered a
     locale.
     `parse` does not throw: it keeps returning `~position` when nothing matches, so optional
     sections, alternative parsers and `parseUnresolved` behave as today, and a failed `parse` ends
     in the usual `DateTimeParseException`. When names are missing, `_resolveZoneIds` returns a map
     of zone IDs only, which is not cached per locale (one ID-only map is shared and cached on its
     own). The per-locale map is cached only once names are present, so registering zone names later
     makes name parsing work in the same process.

7. **Peer range stays `>=5.0.0`.** The bundles still import only `registerLocaleData`. With an older
   base, the base has registered the full `likelySubtags` and `metaZones` first, the prebuilt
   registrations of the same paths are skipped by the old `registerLocaleData`, and the result is the
   same as today. The `no-zone-names` entry then falls back to printing zone IDs instead of throwing,
   which is acceptable.

## Risks / Trade-offs

- [New `@js-joda/locale` with prebuilt packages from before this change: no `likelySubtags` or
  `metaZones` are registered] → Their `main/*` data stays pending and the new errors name the fix
  (update the prebuilt packages). The release bumps all prebuilt packages together with
  `@js-joda/locale` since their bundles change. CHANGELOG and README say to update them together.
- [Mixing one old prebuilt package with new ones, e.g. new `locale_en-us` + old `locale_de` 5.3.2]
  → Only the old package's locales fail, with an error naming them (`de`) and telling to update all
  prebuilt packages; `Locale.US` keeps working (decision 6). The peer range can't express this (old
  packages declare `>=5.0.0`); CHANGELOG and README call out this case.
- [Applications registering CLDR data by hand without `cldr-data` break] → Marked **BREAKING** in the
  CHANGELOG with the two extra `registerLocaleData` calls. Most such applications use a bundler and
  `cldr-data` JSON imports, so the fix is two lines.
- [A locale without registered data now throws an `IllegalStateException` instead of the `cldrjs`
  `E_MISSING_BUNDLE` error] → Both are errors; the new one names the locale and the fix. Mentioned in
  the CHANGELOG.
- [An `exports` map blocks deep imports not covered by it, e.g. `@js-joda/locale_en-us/README.md`] →
  `./dist/*` and `./package.json` cover the documented paths; the examples package tests the default,
  `dist` and `no-zone-names` imports in CJS and ESM.
- [`metaZones` is duplicated in every full prebuilt package; an application importing several
  prebuilt packages downloads it several times (~10.5 KB gzip each)] → Per package size is what users
  measure on bundlephobia and the common case is one package. Applications with several locales can
  use a `.*` package, or the `no-zone-names` entries plus one full entry, or register data
  themselves. Documented in the README.
- [The subset rule misses an entry `cldrjs` needs] → The equality test over all prebuilt locales.
- [The bundle resolution in `CldrCache` differs from `cldrjs`] → A test compares it with `cldrjs` for
  every locale in `cldr-data/availableLocales.json`, with the full and with each prebuilt subset.

## Migration Plan

1. Implement and release `@js-joda/locale` and all prebuilt packages in one lerna release (minor
   version for `@js-joda/locale`, as decided when the plan was announced on #421; the breaking part
   only affects hand registration without `cldr-data`).
2. Rollback: revert the change and release again; prebuilt packages from this change keep working with
   the reverted base (decision 7).

## Open Questions

- Exact wording of the error messages; to be settled in code review.

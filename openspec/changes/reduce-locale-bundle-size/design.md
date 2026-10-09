# Design

## Context

See proposal.md for the motivation. Relevant current state in `packages/locale`:

- `src/supplemental-data.js` imports `likelySubtags`, `metaZones` and `weekData` from `cldr-data`, so
  rollup inlines them into every build of `@js-joda/locale`. It first calls `loadCldrData` for each
  path (works in Node.js with `cldr-data`), then `registerLocaleData` with the bundled copies.
- `src/format/cldr/CldrCache.js`: `registerLocaleData(path, data)` returns early when `path` was
  registered before (`cldrDataLoaded`), otherwise it calls `Cldr.load(data)`. `cldrjs` already
  deep-merges every `Cldr.load` into one shared data tree. `loadCldrData(path)` skips registered
  paths and otherwise tries `require('cldr-data')(path)`.
- `cldrjs` uses `supplemental/likelySubtags` when a `Cldr` instance is created and when it maps the
  bundle of a loaded `main/*` file; a missing entry for a loaded bundle throws
  `Could not find likelySubtags for <bundle>`. Without any `likelySubtags` it silently skips the lookup.
- `CldrZoneTextPrinterParser` loads `metaZones` and `main/<locale>/timeZoneNames.json`; when no name
  is found it prints the zone ID.
- Prebuilt packages are generated from `prebuilt-packages.json`: `utils/clrdr-data-render.js` expands
  the locale patterns against `cldr-data/availableLocales.json` and renders `utils/cldr-data.ejs` into a
  virtual rollup entry; `rollup-build-packages-config.js` builds `index.js` (UMD), `index.esm.js`,
  `index.min.js` (IIFE) per package into `dist/prebuilt/<pkg>/`; `utils/create_packages.js` copies
  them to `packages/<pkg>/dist/` and writes the manifest. Manifests have `main` and `module`, no
  `exports`.
- Measured gzip sizes: full `likelySubtags` 12.3 KB (1846 entries); subset for `en` 0.16 KB (19
  entries), `zh` 0.23 KB, `de` 0.1 KB; `metaZones` 10.5 KB; `en/timeZoneNames` 6.7 KB.

## Goals / Non-Goals

**Goals:**
- Cut the size of the default prebuilt import without code changes for its users.
- Offer an opt-in entry without time-zone names.
- Keep new prebuilt packages working with older `@js-joda/locale` releases.

**Non-Goals:**
- Removing `weekData` from the base package (~1 KB gzip, needed by `WeekFields` for every locale).
- Trimming `ca-gregorian` or `timeZoneNames` content, or splitting the `.*` packages (e.g. `en` with
  ~100 regional locales) into smaller ones.
- Sharing data between `@js-joda/timezone` and the CLDR zone names.
- Any use of the `Intl` API.

## Decisions

1. **The base package bundles only `weekData`.** `supplemental-data.js` keeps the eager
   `loadCldrData` calls for all three files, but registers only the bundled `weekData` copy.
   In Node.js with `cldr-data` nothing changes. `likelySubtags` and `metaZones` move to the prebuilt
   packages, which are the supported way to use locales without `cldr-data`.
   Alternative: a separate slim entry of `@js-joda/locale` (`@js-joda/locale/slim`). Rejected: the
   default import of a prebuilt package would not get smaller, and every prebuilt package would need
   to import the slim base, which breaks with older bases.

2. **`registerLocaleData` merges.** Track the registered data objects per path (`Map<path, Set<data>>`)
   instead of a `Set` of paths. A new object for a known path is passed to `Cldr.load`, which
   deep-merges it; an object already registered for that path is skipped. `loadCldrData` still skips
   every path that has registered data, so a prebuilt bundle is never reloaded from `cldr-data`.
   This is safe for `likelySubtags`: in Node.js the base loads the full file from `cldr-data` at
   import, before any prebuilt package (which imports the base) registers its subset, and every subset
   is a subset of the same file, so merges never change a value.
   Alternative: register each package's subset under its own path, e.g.
   `supplemental/likelySubtags-en.json`. Rejected: works without changing `registerLocaleData`, but
   with an older base the paths are distinct anyway, so this gains nothing, and a path that doesn't
   exist in CLDR is confusing in the public API.

3. **likelySubtags subset rule.** For a prebuilt package with languages `L` (the language subtags of
   its expanded locales, e.g. `en` for `en`, `en-US`; `nb`, `nn`, `no` for `no.*`), keep the entries
   whose key has a language subtag in `L`, the `und` entry, and `und-*` entries whose value has a
   language in `L`. `utils/clrdr-data-render.js` computes the subset at build time and inlines it
   into the rendered entry as a JSON literal. A test resolves every locale of every prebuilt package
   with `cldrjs` against the subset and against the full file and requires equal results (spec
   scenario "Subset gives the same result as the full data"). If the test finds a gap, the rule is
   widened, not special-cased.

4. **Entry layout.** `cldr-data.ejs` renders one entry with a `zoneNames` flag. Registration order in
   both entries: `likelySubtags` subset first (so that `cldrjs` can map the bundles), then
   `metaZones` (full entry only), then per locale `ca-gregorian` and `timeZoneNames` (full entry only).
   `buildRollupConfigs` builds two entry variants per package: the existing `index.js`, `index.esm.js`,
   `index.min.js` and new `no-zone-names.js` (UMD), `no-zone-names.esm.js`, `no-zone-names.min.js`
   (IIFE). `metaZones` is registered by every full prebuilt package; registering it twice merges
   identical data. That costs only time at import, not bundle size per package.

5. **Subpath export.** The generated manifests get an `exports` map:
   ```json
   "exports": {
     ".": { "import": "./dist/index.esm.js", "require": "./dist/index.js" },
     "./no-zone-names": { "import": "./dist/no-zone-names.esm.js", "require": "./dist/no-zone-names.js" },
     "./dist/*": "./dist/*",
     "./package.json": "./package.json"
   }
   ```
   `main` and `module` stay for older tools. `./dist/*` keeps existing deep imports and `<script>` paths
   working. Alternative: a `no-zone-names/package.json` stub directory without `exports`. Rejected:
   Node.js ESM does not resolve directory imports, so `import '@js-joda/locale_en-us/no-zone-names'`
   would fail.

6. **Missing-data errors.** In `CldrZoneTextPrinterParser`, after the `loadCldrData` calls, check
   `cldr.get('supplemental/metaZones')` and `cldr.main('dates/timeZoneNames')`; if either is missing,
   throw an `IllegalStateException` (from `@js-joda/core`) that names the pattern letters, the locale,
   `@js-joda/locale_<pkg>` vs. `…/no-zone-names` and the two `registerLocaleData` paths. Done in
   `print` and `parse` at first use per locale, so formatting without zone text is unaffected.
   For `likelySubtags`, wrap the `Cldr` instance creation in `getOrCreateCldrInstance` and the
   `cldrjs` `Could not find likelySubtags` error in an `IllegalStateException` with the registration
   hint; additionally throw it when `supplemental/likelySubtags` is absent altogether, since `cldrjs`
   then silently resolves nothing.

7. **Peer range stays `>=5.0.0`.** The bundles still import only `registerLocaleData`. With an older
   base, the base has registered the full `likelySubtags` and `metaZones` first, the prebuilt
   registrations of the same paths are skipped by the old `registerLocaleData`, and the result is the
   same as today. The `no-zone-names` entry then falls back to printing zone IDs instead of throwing,
   which is acceptable.

## Risks / Trade-offs

- [New `@js-joda/locale` with prebuilt packages from before this change: no `likelySubtags` or
  `metaZones` are registered] → The new errors name the fix (update the prebuilt packages). The
  release bumps all prebuilt packages together with `@js-joda/locale` since their bundles change.
  CHANGELOG and README say to update them together.
- [Applications registering CLDR data by hand without `cldr-data` break] → Marked **BREAKING** in the
  CHANGELOG with the two extra `registerLocaleData` calls. Most such applications use a bundler and
  `cldr-data` JSON imports, so the fix is two lines.
- [An `exports` map blocks deep imports not covered by it, e.g. `@js-joda/locale_en-us/README.md`] →
  `./dist/*` and `./package.json` cover the documented paths; the examples package tests the default,
  `dist` and `no-zone-names` imports in CJS and ESM.
- [`metaZones` is now duplicated in every full prebuilt package; an application importing several
  prebuilt packages downloads it several times] → Per package size is what users measure on
  bundlephobia and the common case is one package. Applications with several locales can import
  `@js-joda/locale` with their own registrations, or use the `.*` packages. Documented in the README.
- [The subset rule misses an entry `cldrjs` needs] → The equality test over all prebuilt locales.

## Migration Plan

1. Implement and release `@js-joda/locale` and all prebuilt packages in one lerna release (minor
   version for `@js-joda/locale`, as decided when the plan was announced on #421; the breaking part
   only affects hand registration without `cldr-data`).
2. Rollback: revert the change and release again; prebuilt packages from this change keep working with
   the reverted base (decision 7).

## Open Questions

- Exact wording of the error messages; to be settled in code review.

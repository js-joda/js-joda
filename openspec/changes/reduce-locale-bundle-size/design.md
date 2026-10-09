# Design

## Context

See proposal.md for the motivation. Relevant current state in `packages/locale`:

- `src/supplemental-data.js` imports `likelySubtags`, `metaZones` and `weekData` from `cldr-data`, so
  rollup inlines them into every build of `@js-joda/locale`. It first calls `loadCldrData` for each
  path (works in Node.js with `cldr-data`), then `registerLocaleData` with the bundled copies.
- `src/format/cldr/CldrCache.js`: `registerLocaleData(path, data)` returns early when `path` was
  registered before (`cldrDataLoaded`), otherwise it calls `Cldr.load(data)`. `cldrjs` already
  merges every `Cldr.load` into one shared data tree (`jsonMerge`: objects are merged key by key,
  arrays and other values are replaced). `loadCldrData(path)` skips registered paths and otherwise
  tries `require('cldr-data')(path)`; in the ESM build `require` is undefined, so it loads nothing.
- `cldrjs` uses `supplemental/likelySubtags` when a `Cldr` instance is created and when it maps the
  bundle of a loaded `main/*` file. `Cldr.load` of a `main/*` file pushes its bundle onto
  `Cldr._availableBundleMapQueue`; the next `new Cldr(…)` (for any locale) maps every queued bundle and,
  for the first bundle without a `likelySubtags` entry, removes it from the queue and throws
  `Could not find likelySubtags for <bundle>`. That bundle is then lost for the life of the process,
  even if `likelySubtags` is registered later. Without any `likelySubtags` it silently skips the
  lookup.
- `CldrZoneTextPrinterParser.print` appends the ID of a fixed-offset zone without any CLDR lookup;
  `parse` handles `+hh:mm`, `GMT…`, `UTC…`, `UT…` before the name lookup, matches zone IDs as well as
  names, and accepts `Z` as a last resort. For region zones it loads `metaZones` and
  `main/<locale>/timeZoneNames.json`; when no name is found it prints the zone ID.
- `cldr-data/availableLocales.json` has no `no*` or `nn*` locales, so the prebuilt packages `no` and
  `nn-no` expand to no locale and are empty today (359-byte bundles).
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

2. **`registerLocaleData` merges.** Keep the `Set` of registered paths (for `loadCldrData`) and add a
   `WeakMap<data, Set<path>>` of registered data objects. A new object for a known path is passed to
   `Cldr.load`, which merges it; an object already registered for that path is skipped. The `WeakMap`
   does not keep registered data alive after `cldrjs` has replaced it. `loadCldrData` still skips
   every path that has registered data, so a prebuilt bundle is never reloaded from `cldr-data`.
   The merge is `cldrjs`'s `jsonMerge`: objects merge key by key, arrays are replaced. So a file can
   only be split between callers at object keys. That holds for `likelySubtags` (one flat object).
   `metaZones` is mostly arrays and is never split: every full prebuilt package registers the whole
   file, so a later registration replaces arrays with identical ones.
   This is safe for `likelySubtags`: in Node.js the base loads the full file from `cldr-data` at
   import, before any prebuilt package (which imports the base) registers its subset, and every subset
   is a subset of the same file, so merges never change a value.
   Alternative: register each package's subset under its own path, e.g.
   `supplemental/likelySubtags-en.json`. Rejected: works without changing `registerLocaleData`, but
   with an older base the paths are distinct anyway, so this gains nothing, and a path that doesn't
   exist in CLDR is confusing in the public API.

3. **likelySubtags subset rule.** For a prebuilt package with languages `L` (the language subtags of
   its expanded locales, e.g. `en` for `en`, `en-US`; `zh` for `zh`, `zh-Hant-TW`), keep the entries
   whose key has a language subtag in `L`, the `und` entry, and `und-*` entries whose value has a
   language in `L`. `utils/clrdr-data-render.js` computes the subset at build time and inlines it
   into the rendered entry as a JSON literal. A test resolves every locale of every prebuilt package
   with `cldrjs` against the subset and against the full file and requires equal results (spec
   scenario "Subset gives the same result as the full data"). If the test finds a gap, the rule is
   widened, not special-cased. The test also requires every package to expand to at least one
   locale, with `no` and `nn-no` as an explicit list of known-empty packages, so that the equality
   check can't pass on an empty package without anyone noticing.

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

6. **Missing-data errors.** In `CldrZoneTextPrinterParser`, check
   `cldr.get('supplemental/metaZones')` and `cldr.main('dates/timeZoneNames')` only where names are
   actually needed, so fixed offsets and zone IDs behave as today:
   - `print`: after the `ZoneOffset` branch (a fixed-offset zone still prints its ID) and after the
     `loadCldrData` calls; if either is missing, throw.
   - `parse`: the `+hh:mm`, `GMT`/`UTC`/`UT` prefixes, zone IDs and the trailing `Z` keep working
     without names. Only when none of them matches and the names are missing, throw instead of
     returning the error position. `_resolveZoneIds` still builds the ID map when names are missing.
   The `IllegalStateException` (from `@js-joda/core`) names the pattern letters, the locale, that the
   default import of a prebuilt package (not its `no-zone-names` entry) includes zone names, and the
   two `registerLocaleData` paths. It does not name a specific prebuilt package: the base can't know
   which package (`locale_en`, `locale_en-us`, `locale_en-gb`, or none) registered a locale.
   For `likelySubtags`, `getOrCreateCldrInstance` catches the `cldrjs` `Could not find likelySubtags
   for <bundle>` error, pushes `<bundle>` back onto `Cldr._availableBundleMapQueue` (so that
   registering `likelySubtags` later recovers it in the same process), and throws an
   `IllegalStateException` that names `<bundle>` (the registered `main/*` data without entries, which
   may differ from the requested locale), the requested locale, and the fix: register
   `supplemental/likelySubtags.json`, or update all prebuilt packages to the release of
   `@js-joda/locale`. It also throws, naming the requested locale, when `supplemental/likelySubtags`
   is absent altogether, since `cldrjs` then silently resolves nothing. Nothing is cached on error.
   `_availableBundleMapQueue` is private `cldrjs` state; `cldrjs` is at `^0.5.5` and a test covers
   the recovery, so a change there fails the build.

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
- [Mixing one old prebuilt package with new ones, e.g. new `locale_en-us` + old `locale_de` 5.3.2:
  the queued `de` bundles have no `likelySubtags` entries, and `cldrjs` throws on the next `new Cldr`
  for any locale, so `Locale.US` fails too] → The peer range can't express this (old packages
  declare `>=5.0.0`). The error names the bundle without entries (`de`), not the requested locale,
  and tells to update all prebuilt packages; CHANGELOG and README call out this case.
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

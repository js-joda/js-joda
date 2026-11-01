# Design

## Context

See proposal.md for the motivation. Relevant current state in `packages/locale`:

- `src/js-joda-locale.js` installs the plugin (`use(plug)`), exports `Locale`, `WeekFields` and
  `registerLocaleData`, and imports `src/supplemental-data.js`. That file imports `likelySubtags`,
  `metaZones` and `weekData` from `cldr-data`, so rollup inlines them into every build. It first
  calls `loadCldrData` for each path (works in Node.js with `cldr-data`), then `registerLocaleData`
  with the bundled copies.
- `rollup.config.js` builds `dist/js-joda-locale.esm.js` (ES module, `module`),
  `dist/js-joda-locale.js` (UMD, `main`) and `dist/js-joda-locale.min.js` (IIFE). `cldrjs` is
  bundled; `@js-joda/core`, `@js-joda/timezone` and `cldr-data` are external. The manifest has no
  `exports` map; its `files` are `dist`, `src`, `typings`.
- `src/format/cldr/CldrCache.js`: `registerLocaleData(path, data)` returns early when `path` was
  registered before, otherwise it calls `Cldr.load(data)`. `cldrjs` merges every `Cldr.load` into one
  shared data tree (objects key by key, arrays replaced). `loadCldrData(path)` skips registered paths
  and otherwise tries `require('cldr-data')(path)`. `getOrCreateCldrInstance` caches one `Cldr`
  instance per locale for the life of the process.
- `cldrjs` uses `supplemental/likelySubtags` when a `Cldr` instance is created and when it maps the
  bundle of a loaded `main/*` file (on the next `new Cldr`, for any locale). A queued bundle without a
  `likelySubtags` entry makes that `new Cldr` throw `Could not find likelySubtags for <bundle>`. When a
  requested language has no entry, `cldrjs` falls back to the `und` entry (`en-Latn-US`). A `Cldr`
  instance keeps the bundle and language it resolved when it was created.
- `CldrZoneTextPrinterParser.print` appends the ID of a fixed-offset zone without any CLDR lookup;
  for region zones it loads `metaZones` and `main/<locale>/timeZoneNames.json` and prints the zone ID
  when no name is found. `parse` handles offsets, matches zone IDs and names, accepts `Z`, and returns
  `~position` when nothing matches. `_resolveZoneIds` caches the map of IDs and names per locale.
- Prebuilt packages are generated from `prebuilt-packages.json`: `utils/clrdr-data-render.js` renders
  `utils/cldr-data.ejs` into a virtual rollup entry that imports `registerLocaleData` from
  `@js-joda/locale` and registers `ca-gregorian` and `timeZoneNames` per locale;
  `rollup-build-packages-config.js` builds `index.js` (UMD), `index.esm.js`, `index.min.js` (IIFE);
  `utils/create_packages.js` copies them to `packages/<pkg>/dist/` and writes the committed
  `package.json` (`main`, `module`, no `exports`, no `files`) and `README.md`.
- `packages/examples/examples/bundler/build.mjs` bundles a sample with esbuild for the browser.
- Measured gzip sizes: full `likelySubtags` 12.3 KB (1846 entries); subset for `en` 0.16 KB (19
  entries), `zh` 0.23 KB, `de` 0.1 KB; `metaZones` 10.5 KB; `en/timeZoneNames` 6.7 KB.

## Goals / Non-Goals

**Goals:**
- A minor release: every existing import, and every mix of old and new packages, works as today.
- An opt-in slim mode for bundlers that drops the unused data, without duplicating shared data when
  several prebuilt packages are used.
- In slim mode, report missing data with a clear error instead of wrong output.

**Non-Goals:**
- Making the default imports smaller.
- Slim mode in Node.js (size doesn't matter there; the slim entries resolve to the full builds for
  `require` and ES module `import` alike, via the `default` condition of the `exports` map).
- Removing `weekData` (~1 KB gzip, needed by `WeekFields` for every locale).
- Trimming `ca-gregorian` or `timeZoneNames` content, or splitting the `.*` packages.
- Fixing the empty `no` and `nn-no` prebuilt packages (wrong patterns in `prebuilt-packages.json`).
- Any use of the `Intl` API.

## Decisions

1. **Entries of `@js-joda/locale`.**
   - `src/slim.js`: built on `src/register.js` of `explicit-plugin-data-registration` (plug, exports,
     data store) plus `weekData` (bundled copy plus `loadCldrData` for all three supplemental files,
     so Node.js with `cldr-data` gets everything); it bundles no `likelySubtags` and no `metaZones`.
   - `src/js-joda-locale.js`: re-exports `src/slim.js` and registers the bundled `likelySubtags`
     and `metaZones`, as today.
   - `src/meta-zones.js`: registers the bundled `metaZones` through `registerLocaleData`.
   The default entry is therefore the slim entry plus data, and behaves exactly as today.

2. **One shared module instance.** The ES module build uses one rollup run with the inputs of
   `explicit-plugin-data-registration` plus `slim` and `meta-zones` (`register`, `js-joda-locale`,
   `slim`, `meta-zones`): `dist/register.esm.js`, `dist/js-joda-locale.esm.js`, `dist/slim.esm.js`,
   `dist/meta-zones.esm.js`, and a shared chunk under `dist/chunks/` with the code, `cldrjs` and
   `CldrCache`. `/slim` is the `register` input without the bundled supplemental data (only
   `weekData`). A bundler that sees any of `@js-joda/locale`, `@js-joda/locale/register`,
   `@js-joda/locale/slim` and `@js-joda/locale/meta-zones` in one application includes the code once,
   installs the plugin once and registers into one data store. The UMD `dist/js-joda-locale.js` and IIFE
   `dist/js-joda-locale.min.js` stay as they are; new IIFE builds `dist/slim.min.js` (global
   `JSJodaLocale`, like the full build) and `dist/meta-zones.min.js` (registers through the global
   `JSJodaLocale`) serve `<script>` tags.

3. **Explicit `exports` entries plus entry directories.** `explicit-plugin-data-registration` adds a
   permissive `exports` map (including `"./*": "./*"`) to the manifest, so the new entries are listed
   explicitly with the same condition shape as the `/register` entries — key order `types`,
   `react-native`, `module`, `default`:
   ```json
   "./slim":       { "types": "../typings/js-joda-locale.d.ts", "react-native": "../dist/slim.esm.js",
                     "module": "../dist/slim.esm.js", "default": "../dist/js-joda-locale.js" },
   "./meta-zones": { "types": "../typings/js-joda-locale.d.ts", "react-native": "../dist/meta-zones.esm.js",
                     "module": "../dist/meta-zones.esm.js", "default": "../dist/js-joda-locale.js" }
   ```
   Bundlers (webpack, Vite, esbuild, rollup) resolve `module` and Metro resolves `react-native`, so
   they get the slim ES module builds; Node.js resolves `default` for `require` and `import` alike —
   the full UMD build, so in Node.js the slim entries are the full one: same instance, same behaviour
   as today, and Node.js ES modules can import `@js-joda/locale/slim`. The entry directories
   (`slim/package.json` with `main`, `module`, `types`, and `meta-zones/package.json` likewise) stay
   for tools that ignore `exports` (webpack 4, TypeScript `moduleResolution: node`, Metro with package
   exports disabled, CDNs); both are added to `files`. The `"./*": "./*"` pattern keeps every
   existing deep import resolving.

4. **Prebuilt package entries.** `cldr-data.ejs` renders three variants per package:
   - default (`index.*`): unchanged, imports `registerLocaleData` from `@js-joda/locale`, registers
     `ca-gregorian` and `timeZoneNames` per locale. Works with every `@js-joda/locale` from 5.0.0.
   - `slim.*`: imports `registerLocaleData` from `@js-joda/locale/slim`, registers the `likelySubtags`
     subset first, imports `@js-joda/locale/meta-zones`, then `ca-gregorian` and `timeZoneNames`.
   - `slim-no-zone-names.*`: like `slim.*`, without `meta-zones` and `timeZoneNames`.
   Each variant is built as `.js` (UMD), `.esm.js` and `.min.js` (IIFE; `@js-joda/locale/slim` maps to
   the global `JSJodaLocale`, the `meta-zones` import is left to a `<script>` tag of
   `@js-joda/locale/dist/meta-zones.min.js`). `utils/create_packages.js` writes `slim/package.json`
   and `slim-no-zone-names/package.json` into every package, with `main` pointing to `../dist/index.js`
   (Node.js uses the full default entry, as in decision 3) and `module` to the slim ES module, and adds
   `"./slim"` and `"./slim-no-zone-names"` to the `exports` map of each manifest with the same
   condition shape as decision 3 (`react-native`/`module` → slim ES module build, `default` →
   `../dist/index.js`). The entry directories are generated and committed like the manifests.
   The slim entries need `@js-joda/locale` 6.1.0 or later (the version that lands
   `explicit-plugin-data-registration`); with an older base the bundler fails to resolve
   `@js-joda/locale/slim`, a clear build error. The peer range stays `>=5.0.0` for the default
   entry; the README states the requirement of the slim entries. Combining explicit registration
   (`@js-joda/locale/register` + `/data` entries) with slim data-only entries is not part of this
   change: slim stays a side-effect mode on `/slim`, explicit mode uses the full `/data` entries.

5. **likelySubtags subset rule.** For a prebuilt package with languages `L` (the language subtags of
   its expanded locales, e.g. `en` for `en`, `en-US`; `zh` for `zh`, `zh-Hant-TW`), keep the entries
   whose key has a language subtag in `L`, the `und` entry, and `und-*` entries whose value has a
   language in `L`. The `und` entry is needed: `cldrjs` reads it when a requested language has no
   entry, and would throw a `TypeError` without it (the fallback itself is caught by decision 7).
   `utils/clrdr-data-render.js` computes the subset at build time. A test resolves every locale of
   every prebuilt package with `cldrjs` against the subset and against the full file and requires
   equal results; if it finds a gap, the rule is widened, not special-cased. The test also requires
   every package to expand to at least one locale, except the known-empty `no` and `nn-no`.

6. **`registerLocaleData` merges `likelySubtags` parts.** `CldrCache` tracks whether the full
   `likelySubtags` is registered: the default entry and `loadCldrData` register it through an internal
   function that marks it as full. Then:
   - `supplemental/likelySubtags.json` registered through `registerLocaleData` before the full file
     is passed to `Cldr.load`, which merges it key by key; the parts of several slim entries add up.
     Registering the same object again merges identical values and has no visible effect.
   - Once the full file is registered, parts are ignored, so data from the default entry or from
     `cldr-data` is never changed by a part from a prebuilt package of another CLDR version.
   - Every other path keeps today's rule: the first registration wins.
   - Every registration that reaches `Cldr.load` clears the cached `Cldr` instances, because an
     instance keeps the bundle it resolved when it was created. Instances are cheap to create.

7. **Errors in slim mode.** All three can only happen when the full `likelySubtags` or `metaZones`
   isn't registered, i.e. in slim mode without `cldr-data`; with the default entry nothing changes.
   - **Locale without data.** `CldrDateTimeTextProvider` and `CldrZoneTextPrinterParser` check, when
     the full `likelySubtags` isn't registered, that the requested language has a `likelySubtags`
     entry; otherwise they throw an `IllegalStateException` naming the locale and the `/slim` import of
     a prebuilt package. This replaces the silent fallback to `und` (English). `WeekFields` does not
     check; it only reads `weekData`.
   - **Data without likelySubtags.** `getOrCreateCldrInstance` turns the `cldrjs` error
     `Could not find likelySubtags for <bundle>` into an `IllegalStateException` naming `<bundle>` and
     the fix (register `supplemental/likelySubtags.json` before `main/*` data). There is no recovery
     in the same process; the slim prebuilt entries always register the subset first.
   - **Zone names.** `CldrZoneTextPrinterParser.print`, for a region zone, throws an
     `IllegalStateException` when `supplemental/metaZones` is missing, naming the pattern letters, the
     locale and the `/slim` entry (instead of `/slim-no-zone-names`) as the fix. `parse` does not
     throw; it returns `~position` as today, so optional sections keep working. While `metaZones` is
     missing, `_resolveZoneIds` returns a map of zone IDs only and does not cache it.
   When `metaZones` is registered but a locale's `timeZoneNames` isn't (a `/slim-no-zone-names` entry
   next to a `/slim` entry of another package), the zone ID is printed, as today when names are
   missing.

   Precedence against the missing-data checks of `explicit-plugin-data-registration` (its decision 6):
   the slim errors above are active only while neither the default entry nor
   `@js-joda/locale/register` is loaded (`/register` registers the full supplemental data, which
   turns them off); the explicit-mode missing-locale check names the `/data` entry of a prebuilt
   package and is active only while the default entry is loaded nowhere; loading the default entry
   anywhere turns both regimes off for the whole application.

## Risks / Trade-offs

- [The default imports don't get smaller] → Intended for a minor release. README and CHANGELOG show
  the slim imports and the sizes; the follow-up on #421 explains it.
- [Slim mode needs a bundler that reads `module` or `react-native`] → webpack, Vite, esbuild, rollup
  and Parcel read `module`, Metro reads `react-native` (decision 3), and the entry directories cover
  older tools. `<script>` users get the IIFE builds; Node.js uses the full builds for `require` and
  ES module `import` alike.
- [Mixing slim and default imports, e.g. `@js-joda/locale/slim` with an old `@js-joda/locale_de`
  whose default entry imports `@js-joda/locale`] → Works, through the shared chunk, but bundles the
  full data. Documented.
- [The ES module build of `@js-joda/locale` is now split into entry files and a chunk] → Bundlers
  handle relative imports; the examples package bundles the default and slim imports with esbuild.
- [TypeScript with `node10` resolution resolves `@js-joda/locale/slim` through `slim/package.json`
  `types`; `node16`/`nodenext`/`bundler` resolve it through the `types` condition of the `exports`
  map] → Both work; Node.js ES module imports of `/slim` resolve to the full build via `default`
  (decision 3), and the resolution matrix of `explicit-plugin-data-registration` documents the floors.
- [Three variants per prebuilt package triple the number of bundles the release build produces] →
  `build-prebuilt` builds groups of packages in parallel processes instead of one sequential rollup
  run, so the build doesn't take about three times as long.
- [The subset rule misses an entry `cldrjs` needs] → The equality test over all prebuilt locales.

## Migration Plan

1. Implement and release `@js-joda/locale` and all prebuilt packages in one lerna release, as a minor
   version of `@js-joda/locale`.
2. Rollback: revert and release again. The default entries never changed; applications that switched
   to slim imports switch back to the default imports.

## Open Questions

- Exact wording of the error messages; to be settled in code review.

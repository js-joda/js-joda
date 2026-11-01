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
  `package.json` and `README.md`.
- `packages/examples/examples/bundler/build.mjs` bundles a sample with esbuild for the browser.
- Measured gzip sizes: full `likelySubtags` 12.3 KB (1846 entries); subset for `en` 0.16 KB (19
  entries), `zh` 0.23 KB, `de` 0.1 KB; `metaZones` 10.5 KB; `en/timeZoneNames` 6.7 KB.

## Goals / Non-Goals

**Goals:**
- Ship in the same major as `explicit-plugin-data-registration` (decision of 2026-11-01: no second
  stage). The size reduction is not an opt-in mode: the root bundles only `weekData`, and the prebuilt
  data values carry what an application needs.
- Report missing data with a clear error instead of wrong output — always on, based on registered
  data, never on root contents.
- No silent fallback to English for a language without registered data.

**Non-Goals:**
- An opt-in slim mode (`/slim`, `/slim-no-zone-names`) — dropped with the major.
- Node.js-specific size handling — size doesn't matter there; the root is one module for `require`
  and `import` alike (see `explicit-plugin-data-registration`, decision 7).
- Removing `weekData` (~1 KB gzip, needed by `WeekFields` for every locale). It stays in the root.
- Trimming `ca-gregorian` or `timeZoneNames` content, or splitting the `.*` packages.
- Fixing the empty `no` and `nn-no` prebuilt packages (wrong patterns in `prebuilt-packages.json`).
- Any use of the `Intl` API.

## Decisions

1. **Data layout in the major.**
   - `src/js-joda-locale.js` (root) bundles only `weekData` of the supplemental data; the full
     `likelySubtags` and `metaZones` imports are removed from the root.
   - `src/likely-subtags.js` (entry `@js-joda/locale/likely-subtags`): exports the full
     `supplemental/likelySubtags.json` as a plain value, for apps that register custom CLDR paths.
   - `src/meta-zones.js` (entry `@js-joda/locale/meta-zones`): exports `metaZones` as a plain value;
     the app registers it with the zone names: `registerLocaleData(enZones, metaZones)`.
   - Prebuilt package roots export `localeData` (with the subset of decision 2 computed into it) and
     `zoneNames` as a separate value; entry shape per `explicit-plugin-data-registration` decision 10,
     including the tree-shaking test (fallback: `/zone-names` subpath).
   - Script tags: `dist/meta-zones.min.js` and the prebuilt data scripts only set their globals
     (`JSJodaLocaleData_<locale>`, …); an inline script calls `JSJodaLocale.registerLocaleData(...)`.

2. **likelySubtags subset rule.** For a prebuilt package with languages `L` (the language subtags of
   its expanded locales, e.g. `en` for `en`, `en-US`; `zh` for `zh`, `zh-Hant-TW`), keep the entries
   whose key has a language subtag in `L`, the `und` entry, and `und-*` entries whose value has a
   language in `L`. The `und` entry is needed: `cldrjs` reads it when a requested language has no
   entry, and would throw a `TypeError` without it. `utils/clrdr-data-render.js` computes the subset
   at build time and puts it into the prebuilt `localeData`. A test resolves every locale of every
   prebuilt package with `cldrjs` against the subset and against the full file and requires equal
   results; if it finds a gap, the rule is widened, not special-cased. The test also requires every
   package to expand to at least one locale, except the known-empty `no` and `nn-no`.

3. **`registerLocaleData` merges `likelySubtags` parts.** `CldrCache` tracks whether the full
   `likelySubtags` is registered: the `@js-joda/locale/likely-subtags` entry and the `cldr-data`
   source register it through an internal function that marks it as full. Then:
   - `supplemental/likelySubtags.json` registered through `registerLocaleData` before the full file
     is passed to `Cldr.load`, which merges it key by key; the parts of several prebuilt packages
     add up. Registering the same object again merges identical values and has no visible effect.
   - Once the full file is registered, parts are ignored, so data from `cldr-data` is never changed
     by a part from a prebuilt package of another CLDR version.
   - Every other path keeps the rule that the first registration wins.
   - Every registration that reaches `Cldr.load` clears the cached `Cldr` instances, because an
     instance keeps the bundle it resolved when it was created. Instances are cheap to create.
   - **cldrjs bundle-queue guard (recovery after an error).** cldrjs drops a `main/*` bundle from its
     internal available-bundle queue when a bundle lookup throws (`Could not find likelySubtags for
     <bundle>`), and the throw surfaces on the next `new Cldr` for *any* locale. So that a thrown
     error never poisons later lookups — and "registering the data afterwards makes the locale work"
     keeps holding — the registration/instance path SHALL re-feed every registered `main/*` bundle
     into the cldrjs queue (or reset the queue and reload) before creating a `Cldr` instance, and
     SHALL NOT rely on first-wins-by-path to skip a `Cldr.load` whose queue entry was dropped. This
     guard applies to every `new Cldr`, including the one `WeekFields.ofLocale` creates, so
     `WeekFields` keeps working for every locale even when a `main/*` bundle without a
     `likelySubtags` entry is registered.

4. **Errors, always on.** There is no mode flag anymore — the root loads no data, so the checks
   cannot be silently disabled. All errors of this decision are `DateTimeException`s — the same type
   and message shape as the "Locale without data" requirement of `explicit-plugin-data-registration`
   (design decision 6), so both changes' "Locale without data" land in the main specs identically:
   - **Locale without data.** `CldrDateTimeTextProvider` and `CldrZoneTextPrinterParser` check that
     the requested language has a registered `likelySubtags` entry; otherwise they throw an
     `DateTimeException` naming the locale, the registered locales and the prebuilt root to register (e.g.
     `@js-joda/locale_ko`; script-tag variant names the global). This replaces the silent fallback to
      `und` (English). The check rests
     on registered data, never on root contents, so a language without data never silently falls
     back to English. `WeekFields` does not check; it only reads `weekData` (in the root) — verified
     by a test for `WeekFields.ofLocale` without any locale data registered.
   - **Data without likelySubtags.** `getOrCreateCldrInstance` turns the `cldrjs` error
     `Could not find likelySubtags for <bundle>` into a `DateTimeException` naming `<bundle>`
     and the fix (register the full file via `@js-joda/locale/likely-subtags` together with the `main/*` data — registering `main/*` data alone never makes a locale work).
   - **Zone names.** `CldrZoneTextPrinterParser.print`, for a region zone, throws an
     `DateTimeException` when `metaZones` or the locale's `timeZoneNames` is missing, naming the
     pattern letters, the locale and the fix (`registerLocaleData(zoneNames, metaZones)`).
     `parse` does not throw; it returns `~position` as today, so optional sections keep working.
     While `metaZones` is missing or no tz data is registered (`getAvailableZoneIds()` empty),
     `_resolveZoneIds` returns a map of zone IDs only and does not cache it; registration of zone
     names/`metaZones` (`registerLocaleData`) and of tz data (`registerTimeZoneData`, via the
     core-level notification hook of `explicit-plugin-data-registration` task 1.5) SHALL invalidate
     the `_zoneIdsLocales` cache, so a parse that ran before registration does not stay failed
     afterwards. Fixed-offset zones and zone IDs work without any zone names, as today.

5. **Sizes.** `@js-joda/locale` root + `en-us` (gzip, minified bundle without `@js-joda/core` and
   `@js-joda/timezone`, re-measured during implementation): today ~44.7 KB; the major ~15 KB without
   zone names (root `weekData` + code + `en` subset + `ca-gregorian`), ~32 KB with `zoneNames` +
   `metaZones`.

6. **Resolution.** Entries resolve per the `exports` maps of `explicit-plugin-data-registration`
   (conditions `types`/`react-native`/`module`/`default` on every entry including `.`, Node.js
   floors 12.16/12.17/12.20). No slim entries, no extra build variants, no shared chunk beyond what
   that change needs. The prebuilt builds stay one variant per package (`index.{js,esm.js,min.js}`)
   plus the data-carrying root.

## Risks / Trade-offs

- [Removing the full `likelySubtags`/`metaZones` from the root breaks apps that registered custom
  CLDR paths] → `@js-joda/locale/likely-subtags` exports the full file for exactly that case; the
  missing-data errors name it.
- [The subset rule misses an entry `cldrjs` needs] → The equality test over all prebuilt locales
  against the full file.
- [Zone names now require an explicit registration] → `z`/`zzzz`/`v` throw a clear error naming the
  fix; fixed offsets, zone IDs and `parse` are unaffected.
- [Two majors installed side by side] → Peer ranges move to the new major; documented in the
  changelog.
- [Sizes are estimates from prototype builds] → Re-measure with esbuild bundles in the integration
  tasks and put the real numbers in the README and CHANGELOG.

## Migration Plan

Part of the migration guide of the major (spec `repo-documentation-and-migration` of
`explicit-plugin-data-registration`), with a size table: before ~44.7 KB gzip (`en-us`), after ~15 KB
without zone names / ~32 KB with, and the new imports:

```js
// before
import '@js-joda/timezone';
import { Locale } from '@js-joda/locale';
import '@js-joda/locale_en-us';

// after
import { registerTimeZoneData } from '@js-joda/timezone';
import { tzdbData } from '@js-joda/timezone/data';
import { Locale, registerLocaleData } from '@js-joda/locale';
import { localeData as en, zoneNames as enZones } from '@js-joda/locale_en-us';
import { metaZones } from '@js-joda/locale/meta-zones';
registerTimeZoneData(tzdbData);
registerLocaleData(en);
registerLocaleData(enZones, metaZones);   // only for z, zzzz, v
```

## Open Questions

- Exact wording of the error messages; to be settled in code review. They must cover `<script>` tags
  as well as `import`.

# Proposal

## Why

Bundle size is the main reason users give in issue #421 for not using `@js-joda/locale` in web
applications. Today `@js-joda/locale` + `@js-joda/locale_en-us` are about 44 KB gzip together. About
two thirds of that is CLDR data most applications never use:

- `supplemental/likelySubtags.json` for all CLDR languages (~12.3 KB gzip), bundled by the base
  package (`src/supplemental-data.js`). An application using English only needs the ~19 English
  entries (~0.2 KB gzip).
- Time-zone names: `supplemental/metaZones.json` (~10.5 KB gzip, base package) and
  `main/<locale>/timeZoneNames.json` (~6.7 KB gzip for `en`, prebuilt package). They are only needed
  for the zone text pattern letters `z`, `zzzz` and `v`.

We announced the plan on #421 on 2026-10-08.

## What Changes

- `@js-joda/locale` no longer bundles `supplemental/likelySubtags.json` and
  `supplemental/metaZones.json`. In Node.js with `cldr-data` installed, it still loads them from
  `cldr-data`, as today. `weekData` (~1 KB gzip) stays bundled.
- Each prebuilt `@js-joda/locale_<pkg>` package registers only the `likelySubtags` entries of its own
  languages, and, in its default entry, `metaZones` together with its `timeZoneNames`. The default
  import `import '@js-joda/locale_en-us'` keeps working without code changes and gets smaller
  (~32 KB instead of ~44 KB together with `@js-joda/locale`).
- `registerLocaleData` merges `supplemental/likelySubtags.json` registered again, instead of ignoring
  it, so that several prebuilt packages each add their part. Every other path keeps the rule that the
  first registration wins, and data loaded from `cldr-data` is never changed by a registration.
  `main/*` data waits until `likelySubtags` can resolve its locale, so the registration order doesn't
  matter and a locale without entries can't break other locales.
- New opt-in entry point in every prebuilt package, e.g. `@js-joda/locale_en-us/no-zone-names`. It
  registers the same data as the default entry, without `metaZones` and `timeZoneNames` (~15 KB
  together with `@js-joda/locale`). It works with `require`, `import` (an `.mjs` file), bundlers and a
  `<script>` tag.
- Formatting a region-based zone with `z`, `zzzz` or `v` throws a clear error when the time-zone names
  for the locale aren't available, naming the full import (or the `registerLocaleData` calls) as the
  fix, instead of silently printing the zone ID. Parsing a zone name then fails like any unknown text,
  so optional sections keep working. Fixed offsets, zone IDs and `Z` keep working without names.
- Registered locale data whose `likelySubtags` entries are missing fails, for that locale only, with a
  clear error naming that locale and `registerLocaleData('supplemental/likelySubtags.json', …)`;
  registering them afterwards recovers in the same process. A locale whose language has no data at all
  (e.g. `Locale.KOREAN` with only `locale_en-us`) throws a clear error instead of falling back to
  English. `WeekFields` keeps working without any locale data.
- **BREAKING** for applications that use `@js-joda/locale` without `cldr-data` and without prebuilt
  packages, registering `main/*` data by hand (e.g. in a browser bundle): they now also have to
  register `supplemental/likelySubtags.json`, and for `z`/`zzzz`/`v` also
  `supplemental/metaZones.json`. The same applies when a new `@js-joda/locale` is combined with
  prebuilt packages from before this change. Both are documented in the CHANGELOG and README.
- New prebuilt packages keep working with every `@js-joda/locale` from 5.0.0 on; the peer range stays
  `>=5.0.0`.

Rejected: taking the locale data from the browser's `Intl` API (output would depend on the browser and
its CLDR version, parse/format round-trips would break, and Node.js and browsers would differ).

## Capabilities

### New Capabilities
- `locale-cldr-data`: which CLDR data `@js-joda/locale` provides by itself, how data is registered
  and merged via `registerLocaleData`, and how missing data is reported.

### Modified Capabilities
- `locale-prebuilt-packages`: the prebuilt packages ship the CLDR data their locales need, including a
  per-package subset of `likelySubtags` and `metaZones`, and offer a `no-zone-names` entry point.

## Impact

- `packages/locale/src/supplemental-data.js`, `src/format/cldr/CldrCache.js`,
  `src/format/cldr/CldrZoneTextPrinterParser.js`, `src/format/cldr/CldrDateTimeTextProvider.js`,
  `src/temporal/WeekFields.js`
- `packages/locale/utils/cldr-data.ejs`, `utils/clrdr-data-render.js`,
  `rollup-build-packages-config.js`, `utils/create_packages.js`, `utils/README_package.template.md`
- The 33 prebuilt `packages/locale/packages/*/package.json` (new `exports` map with the
  `./no-zone-names` subpath and `.mjs` targets for `import`) and their `dist/` contents
- Tests: `test/cldr-setup.cjs`, `test/cldr-browser-setup.js`, new tests for merging, the subset and
  the errors; `packages/examples` gets CJS and ESM samples for the `no-zone-names` entry
- Docs: `packages/locale/README.md`, root `CHANGELOG.md`, `typings/js-joda-locale.d.ts` (doc comment
  of `registerLocaleData`)
- Release: `@js-joda/locale` and all prebuilt packages must be released together

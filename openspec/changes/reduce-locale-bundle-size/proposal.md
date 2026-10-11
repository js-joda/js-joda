# Proposal

## Why

Bundle size is the main reason users give in issue #421 for not using `@js-joda/locale` in web
applications. Today `@js-joda/locale` + `@js-joda/locale_en-us` are about 44 KB gzip together. About
half of that is CLDR data most applications never use:

- `supplemental/likelySubtags.json` for all CLDR languages (~12.3 KB gzip), bundled by the base
  package (`src/supplemental-data.js`). An application using English only needs the ~19 English
  entries (~0.2 KB gzip).
- Time-zone names: `supplemental/metaZones.json` (~10.5 KB gzip, base package) and
  `main/<locale>/timeZoneNames.json` (~6.7 KB gzip for `en`, prebuilt package). They are only needed
  for the zone text pattern letters `z`, `zzzz` and `v`.

The change must be a minor release: every existing import and every combination of old and new
packages keeps working unchanged.

## What Changes

- New opt-in **slim** mode for bundlers. Nothing changes for existing imports:
  ```js
  import { Locale } from '@js-joda/locale/slim';
  import '@js-joda/locale_en/slim';
  import '@js-joda/locale_de/slim';
  ```
- `@js-joda/locale/slim`: the same API as `@js-joda/locale`, without `likelySubtags` and `metaZones`
  (`weekData` stays). It shares code and registered data with `@js-joda/locale`, so mixing both
  imports in one application works (without the size saving).
- `@js-joda/locale/meta-zones`: registers `metaZones`. One shared module, so a bundle contains it once,
  however many prebuilt packages import it.
- Each prebuilt package gets two new entries:
  - `/slim`: the `likelySubtags` entries of its own languages, `metaZones` (by importing
    `@js-joda/locale/meta-zones`), and per locale `ca-gregorian` and `timeZoneNames`.
  - `/slim-no-zone-names`: the same without `metaZones` and `timeZoneNames`.
- Sizes, `@js-joda/locale/slim` with `en-us` (gzip): ~32 KB with `/slim`, ~15 KB with
  `/slim-no-zone-names`, instead of ~44 KB.
- `registerLocaleData` merges `supplemental/likelySubtags.json` parts registered by several slim
  prebuilt entries. Once the full file is registered (by `@js-joda/locale` or from `cldr-data`),
  parts are ignored. Every other path keeps the rule that the first registration wins.
- Clear errors, in slim mode only: `z`/`zzzz`/`v` without `metaZones` names the `/slim` entry as the
  fix; a locale whose language has no registered data throws instead of falling back to English.
- In Node.js, the slim entries resolve to the full builds (size doesn't matter there), so Node.js
  behaviour does not change.
- No `exports` maps: the new entries are small directories with a `package.json` (`main`, `module`,
  `types`), so existing deep imports keep resolving exactly as today.

Rejected: moving `likelySubtags` and `metaZones` out of the default `@js-joda/locale` entry (breaks
older prebuilt packages, would need a major release), and taking the locale data from the browser's
`Intl` API (output would depend on the browser, parse/format round-trips would break).

## Capabilities

### New Capabilities
- `locale-cldr-data`: which CLDR data the `@js-joda/locale` entries provide, how data is registered
  and merged via `registerLocaleData`, and how missing data is reported in slim mode.

### Modified Capabilities
- `locale-prebuilt-packages`: the prebuilt packages get `/slim` and `/slim-no-zone-names` entries
  with the CLDR data their locales need; the generated files now include the entry directories.

## Impact

- `packages/locale/src`: new `slim.js` and `meta-zones.js` entries, `js-joda-locale.js` becomes the
  slim entry plus the full supplemental data, `supplemental-data.js`, `format/cldr/CldrCache.js`,
  `format/cldr/CldrZoneTextPrinterParser.js`, `format/cldr/CldrDateTimeTextProvider.js`
- `packages/locale/rollup.config.js` (ESM build with several inputs and a shared chunk, IIFE builds of
  the new entries), new `slim/` and `meta-zones/` directories and the `files` list in
  `packages/locale/package.json`, `typings`
- `utils/cldr-data.ejs`, `utils/clrdr-data-render.js`, `rollup-build-packages-config.js`,
  `utils/create_packages.js`, `utils/README_package.template.md`; the 33 prebuilt packages get
  `slim/` and `slim-no-zone-names/` directories; their manifests stay unchanged
- Tests: new tests for merging, the subset, the errors and the slim build; `packages/examples` gets an
  esbuild sample for slim mode
- Docs: `packages/locale/README.md`, root `CHANGELOG.md`, `typings/js-joda-locale.d.ts`
- Release: minor version of `@js-joda/locale` and the prebuilt packages; the slim entries of the
  prebuilt packages need `@js-joda/locale` 5.4.0 or later

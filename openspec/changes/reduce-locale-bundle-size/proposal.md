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

## Ordering / Release

Decision of 2026-11-01 (Q7: no second stage): this change ships in the **same major release** as
`explicit-plugin-data-registration`. There is no separate minor release and no opt-in slim mode — in
the major, the root entry of `@js-joda/locale` loads no data, and the size reduction comes from the
data contract itself: the root bundles only `weekData`, and each prebuilt `localeData` carries the
`likelySubtags` subset of its own languages. The `/slim` and `/slim-no-zone-names` entries, the three
build variants per prebuilt package and the old-prebuilt compatibility of the default entries are
dropped with the major.

## What Changes

- The root entry of `@js-joda/locale` bundles only `supplemental/weekData.json` of the supplemental
  data; the full `likelySubtags` and `metaZones` are removed from the root in the major.
- Each prebuilt package root exports `localeData`, which includes the `likelySubtags` subset of its
  own languages (plus the `und` entries), and `zoneNames` as a separate value (see
  `explicit-plugin-data-registration` for the entry shape).
- `@js-joda/locale/meta-zones` exports `metaZones` as a plain value; the app registers it together
  with the zone names of a prebuilt package — `registerLocaleData(enZones, metaZones)` — only needed
  for `z`, `zzzz`, `v`.
- `@js-joda/locale/likely-subtags` exports the full `supplemental/likelySubtags.json` as a plain
  value, for apps that register custom CLDR paths (e.g.
  `registerLocaleData('main/th/ca-gregorian.json', data)`).
- `registerLocaleData` merges `supplemental/likelySubtags.json` parts registered by several prebuilt
  packages. Once the full file is registered (via `@js-joda/locale/likely-subtags` or from
  `cldr-data`), parts are ignored. Every other path keeps the rule that the first registration wins.
  Every registration that reaches `Cldr.load` clears the cached `Cldr` instances.
- Clear errors, always on: a locale whose language has no registered `likelySubtags` entry throws
  instead of silently falling back to English; `z`/`zzzz`/`v` without registered zone names throws and
  names the fix; both errors rest on registered data, never on root contents.
- Sizes, `@js-joda/locale` root with `en-us` (gzip, to be re-measured during implementation): ~15 KB
  without zone names, ~32 KB with `zoneNames` + `metaZones`, instead of ~44 KB today.
- Script tags follow the explicit model: `@js-joda/locale/dist/meta-zones.min.js` and the prebuilt
  data scripts only set their globals; an inline script calls `JSJodaLocale.registerLocaleData(...)`.

## Capabilities

### Modified Capabilities
- `locale-cldr-data`: which CLDR data the entries provide by themselves, how `registerLocaleData`
  merges `likelySubtags` parts, and how missing data is reported (always on).
- `locale-prebuilt-packages`: the prebuilt roots export `localeData` (with the subset) and
  `zoneNames`.

## Impact

- `packages/locale/src`: `supplemental-data.js` reduced to `weekData`; new value entries
  `src/likely-subtags.js` and `src/meta-zones.js`; `format/cldr/CldrCache.js` (merging of parts,
  full-file marker, cache clearing), `format/cldr/CldrDateTimeTextProvider.js`,
  `format/cldr/CldrZoneTextPrinterParser.js`; `rollup.config.js`, the `exports` map, the typings
- `utils/cldr-data.ejs`, `utils/clrdr-data-render.js` (subset computed into `localeData`),
  `rollup-build-packages-config.js`, `utils/create_packages.js`, `utils/README_package.template.md`
- Tests: the subset equality test over all prebuilt locales, merging tests, error tests, a
  `WeekFields.ofLocale` test without locale data (the `und` entry), and the repo-wide docs/examples
  tasks of `explicit-plugin-data-registration` (spec `repo-documentation-and-migration`)
- Release: major version of `@js-joda/locale` (7.0.0) and the prebuilt packages, together with
  `explicit-plugin-data-registration`

## References

- [#421](https://github.com/js-joda/js-joda/issues/421) Reduce prebuilt locale package sizes. The
  announcement of 2026-10-08 becomes roughly accurate again with this major — an update on the issue
  is due, but only after asking.
- [#835](https://github.com/js-joda/js-joda/pull/835)

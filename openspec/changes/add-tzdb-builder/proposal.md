# Proposal

## Why

`@js-joda/timezone` depends on a manual, undocumented process to get IANA tz data: a maintainer
clones moment-timezone and runs its grunt pipeline, which only works with whatever `zic`/`zdump` is
installed on the machine (often too old on macOS). Then the JSON files are copied by hand. moment's
pipeline also discards the `isdst` flag, so js-joda cannot support the ThreeTen daylight-saving API.
It also only offers moment's fixed set of year-range bundles. Owning the generator in this repo makes
tzdb updates reproducible, removes the moment-timezone dependency, and enables both improvements.

## What Changes

- New private workspace package `packages/tzdb-builder/` (not published). With a single npm
  command it downloads a given IANA tzdb release (`latest` or an explicit version such as `2026a`),
  compiles it, and writes the unpacked and packed data files into `packages/timezone/data/`.
- Modern tooling: plain Node.js scripts, with zx for the shell steps, run through npm scripts. No grunt, and no reliance on the
  `zic`/`zdump` installed on the system (the builder compiles `zic` from the matching IANA tzcode
  release).
- The data uses the tzdb **rearguard** format, so the daylight-saving semantics match Java's
  `java.time` (for example, Europe/Dublin summer time is DST).
- The generated data keeps the **isdst flag** for every offset period. The packed zone format gets an
  optional trailing field. Existing `@js-joda/timezone` readers ignore it, so the format stays backward
  compatible. Runtime support for `ZoneRules.isDaylightSavings` / `standardOffset` / `daylightSavings`
  is **not** part of this change.
- New year-range bundles, using moment-timezone's naming scheme (current year ± N):
  `-4-year-range` (±2) and `-60-year-range` (±30). The existing bundles (full, `-10-year-range`,
  `-1970-2030`, `-2012-2022`, `-2017-2027`) are kept. This is non-breaking.
- Country and population metadata are no longer generated. Link-group leaders are chosen by a
  deterministic rule instead of population.
- `packages/timezone/transform-data.js` and the `moment-timezone` devDependency are removed. The
  moment pack/filter/link logic is ported, with MIT attribution.
- A parity check compares the generated data with moment-timezone data for the same tzdb version.
- A scheduled GitHub workflow detects new IANA tzdb releases and opens an issue.
- `packages/timezone/HowToUpdateTZDB.md` is rewritten for the new workflow.

## Capabilities

### New Capabilities
- `tzdb-data-generation`: generating js-joda timezone data from an IANA tzdb release. This covers
  version selection, compilation in rearguard format, the transitions with offset, abbreviation and
  isdst, deduplication, link detection, year-range variants, and the output locations.
- `tzdb-packed-format`: the packed JSON data format consumed by `@js-joda/timezone`, including the
  backward-compatible isdst extension.
- `tzdb-release-monitoring`: automated detection of new IANA tzdb releases that need a data update.

### Modified Capabilities
<!-- none: no existing specs in openspec/specs -->

## Impact

- New: `packages/tzdb-builder/` (workspace package), `.github/workflows/tzdb-release-check.yaml`.
- Changed: `packages/timezone/data/**` (regenerated, new `latest-4-year-range.json` and
  `latest-60-year-range.json`), `packages/timezone/dist/**` (two new bundle sets, picked up
  automatically by `rollup.config.js`), `packages/timezone/README.md`, `HowToUpdateTZDB.md`,
  `packages/timezone/package.json` (`transform-data` script removed).
- Removed: `packages/timezone/transform-data.js` and the root `moment-timezone` devDependency.
- Build requirements for maintainers running the builder: Node ≥ 20, `make`, a C compiler, `tar`,
  and network access to `data.iana.org`. CI test runs do not need any of these, because the data stays committed.
- The runtime code in `@js-joda/timezone` (`unpack.js`, `MomentZoneRules`) is unchanged.

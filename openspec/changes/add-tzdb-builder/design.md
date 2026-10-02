# Design

## Context

Today's flow is: moment-timezone grunt tasks (`tasks/data-*.js`: download → meta → zic → zdump -V →
collect → dedupe → pack) → copy by hand → `packages/timezone/transform-data.js`
(`moment-timezone-utils.filterLinkPack` per year range) → `rollup.config.js`, which builds one bundle
set per `data/packed/latest*.json` file it finds. The runtime reads the packed format through
`packages/timezone/src/unpack.js` (fields 0–5) and `MomentZoneRulesProvider.js` (zones + links).
The data in `data/unpacked/latest.json` reaches the year 2499 and has `links: []`. All link grouping
comes from comparing data in the pack step, where the leader is picked by population.

See proposal.md for the motivation and specs/ for the required behavior.

## Goals / Non-Goals

**Goals:**
- One command, `npm run generate -- <version|latest>` in `packages/tzdb-builder`, regenerates all
  committed data files.
- All data processing after compilation (TZif parsing, POSIX expansion, packing) is pure JS, with no
  zx and no shell. It can be unit-tested without network access or a compiler.
- Output that stays compatible with the unchanged runtime in `@js-joda/timezone`.

**Non-Goals:**
- Runtime use of the isdst data (`standardOffset`, `daylightSavings`, `isDaylightSavings`,
  `nextTransition`, …). That comes in a follow-up change.
- Changing the bundle layout or the rollup build of `@js-joda/timezone`.
- Running the generator in CI, beyond the release check.

## Decisions

### D1. Package layout and orchestration
`packages/tzdb-builder/` is a private workspace package (`"private": true`, ESM, `"type": "module"`,
`engines.node >= 20`) with one devDependency, **zx**, used only for orchestration. Tests use mocha,
like the rest of the repo.
- `src/cli.js` is the entry point:
  `npm run generate -- <latest|version> [--step <name>] [--from <name>] [--force]`. It reads its
  arguments with zx's `argv` (minimist).
- The pipeline is a list of named, ordered steps. Each step is an exported async function
  `(ctx) => ctx` in its own module: `fetch → compile → collect → write-unpacked → pack`. `--step` runs
  a single step and `--from` resumes from a step (this replaces `grunt data-zic:<ver>`). `ctx` holds
  the version, the paths, and the Zone and Link names.
- zx `$` is used only for the shell steps: `tar`, `make zic rearguard.zi`, `zic -b fat …`, and the
  `which` checks for prerequisites. Downloads use global `fetch`. `.cache/<ver>/` is reused when it
  already exists, and `--force` downloads again.
- The data modules (`tzif.js`, `posixTz.js`, `collect.js`, `pack.js`, `ranges.js`) do not import zx and
  stay pure, so their unit tests need no shell, network or compiler. `scripts/parity.js` is a separate
  entry point.

*Alternatives:* grunt (rejected, unmaintained); a plain Node CLI (no dependency, but more boilerplate
for the shell steps); gulp (grunt-like, but built around file streams, which does not fit);
Wireit/Turborepo (their caching is keyed on files, not on a version argument); a Makefile (the logic
would be split across two languages).

### D2. Build zic from tzcode, read TZif in JS (no zdump)
The builder downloads `tzcode<ver>.tar.gz` and `tzdata<ver>.tar.gz` from
`https://data.iana.org/time-zones/releases/` into `packages/tzdb-builder/.cache/<ver>/` (gitignored).
`latest` is resolved through `https://data.iana.org/time-zones/tzdb/version`, or through the
`version` file in the latest tarball. It then runs `make zic` and compiles with
`./zic -b fat -d <out> <rearguard sources>`. A pure-JS TZif v2+ parser (64-bit section) reads each
output file and returns the transition times plus the ttinfo `{utoff, isdst, abbrind}` and the footer
POSIX TZ string.
*Why:* TZif carries isdst natively, avoids zdump's text format and its version quirks (`-V`/`-v`,
32-bit), and is a stable format defined by RFC 8536. Building zic from the same release avoids
host-version mismatches.
*Alternatives:* system zic + zdump (fragile, the moment status quo); a pure-JS tz source compiler
(large effort and a correctness risk: the Rule/Zone semantics are subtle).

### D3. Rearguard sources
The builder runs `make rearguard.zi` (or the equivalent `ziguard.awk` invocation) in the tzcode+tzdata
tree and feeds the resulting rearguard `.zi` file to zic. This gives non-negative DST (for example
Europe/Dublin, Africa/Windhoek, Africa/Casablanca), as Java has.

### D4. Expanding to 2499
`-b fat` emits explicit transitions only up to 2037. After the last explicit transition, `posixTz.js`
expands the footer TZ string (`std offset dst [offset],start[/time],end[/time]` with the `Mm.w.d`,
`Jn` and `n` forms, plus the RFC 8536 extensions of hour values over 24 and negative hours) year by
year through 2499. Expanded periods get their abbreviation, offset and isdst from the TZ string.
*Check:* for every zone the expanded transitions are compared with Node's `Intl` (ICU) for the years
2038–2040 in a unit test, and the parity script compares them against moment data (which zdump
produced up to 2499).

### D5. Collecting periods and the unpacked format
The unpacked format is moment's format plus `isdsts`:
`{version, zones:[{name, abbrs, untils, offsets, isdsts}], links:[]}`.
`offsets` are in minutes west (`-utoff/60`, rounded to 4 decimals like moment). The last `until` is
`null` (JSON for Infinity, as moment writes it). Consecutive periods merge only when
(abbr, offset, isdst) are equal (spec: Merge only identical consecutive periods). The LMT and pre-1900
periods are kept, as they are today.
Zone names come from the `Zone` lines and links from the `Link` lines of the rearguard `.zi` file. The
unpacked file lists every Zone and Link name as a zone (as today, so `links: []`), but the builder
remembers the set of Zone-line names for D7.

### D6. Packing (ported from moment-timezone-utils)
The builder ports `packBase60`, `packUntils`, `packAbbrsAndOffsets`, `filterYears`, `createLinks`
and `pack` into `pack.js` with an MIT attribution header. There are two changes:
- Period types are keyed by (abbr, offset, isdst) instead of (abbr, offset). Field 6 is the
  concatenated `0`/`1` flag per type. Field 5 (population) is written empty.
- `zonesAreEqual` also compares isdst. The leader rule is "Zone-line name first, then lexicographic"
  (D7).
Keeping fields 0–5 byte-compatible means `src/unpack.js` needs no change.
*Alternative considered:* one isdst char per period. Rejected because it adds about 1 byte per
transition (hundreds of KB for the full bundle), whereas per type it adds a few bytes per zone.

### D7. Link leader
Among zones with equal data, the leader is the name defined by a Zone line, and among those the
lexicographically smallest one. This replaces moment's population/group-leaders heuristic, which
needs the metadata we are dropping. The result: `Europe/Kyiv` leads `Europe/Kiev`, where moment's
current data has the reverse. The runtime resolves links symmetrically, so users see no difference.

### D8. Ranges
`ranges.js` holds one table (suffix → `[startYear, endYear]`), computed from
`new Date().getUTCFullYear()` at generation time, and uses moment's `filterYears` semantics. The new
suffixes `-4-year-range` and `-60-year-range` follow moment's "±N/2" naming, where the name counts
the span between endpoints, not the number of calendar years. `rollup.config.js` already discovers
`latest*.json`, so the new bundles appear without build changes.

### D9. Parity check
`scripts/parity.js <moment-unpacked.json> <ours-unpacked.json> [--until <year>]`. For every zone in
both files it resolves the offset at every transition instant from both sides up to `--until`
(default 2037; 2499 once the POSIX expansion exists) and diffs them. Differences in zones
known to differ under rearguard (Dublin, Windhoek, Casablanca, Prague 1946/47, …) are classified as
"expected". It runs first in slice 1, on explicit transitions only, to check the toolchain before anything
else is built (see tasks.md). It is used during migration and documented in HowToUpdateTZDB.md for later updates.

### D10. Release monitoring
`.github/workflows/tzdb-release-check.yaml` uses `schedule` (weekly) plus `workflow_dispatch`, curls
`https://data.iana.org/time-zones/tzdb/version`, reads the committed version with `jq`, and uses
`gh issue list --search` / `gh issue create` with the built-in `GITHUB_TOKEN` (`issues: write`).
The issue title is `Update tzdb to <ver>`, which also serves as the dedupe key.

## Risks / Trade-offs

- [isdst-only splits add transitions where the offset does not change. `MomentZoneRules._offsetInfo`
  builds local-time untils pairs, and a transition with an equal offset produces an empty gap or
  overlap.] → A dedicated test runs `validOffsets` and `transition` around such a transition. The
  moment data already contains abbreviation-only splits, so the path is exercised today.
- [Errors in the POSIX TZ expansion would corrupt future dates.] → The Intl cross-check (D4) and the
  parity script up to 2037, plus unit tests for each rule form and for the southern hemisphere.
- [Maintainers need a C compiler and make.] → This is documented. CI does not need them because the
  data is committed. The CLI checks for the tools up front with a clear error (spec: Missing build
  prerequisites).
- [Rearguard output differs from moment's (vanguard/main) data for a few zones, so the offsets users
  see could change.] → The offsets only change where rearguard differs in *wall offset*, which it
  normally does not. Rearguard changes only which period counts as DST. The parity check makes any
  real offset change visible before release.
- [Switching the leader name changes `links` in the packed files and the bundle diff will be large
  once.] → This is a one-time diff. It is noted in the CHANGELOG.
- [The "current year" makes the range files depend on the generation date.] → Same as today. Spec:
  Deterministic output is scoped to the same calendar year.

## Migration Plan

1. Land the builder and regenerate the data for the currently committed version (`2026a`). Run the
   parity check against moment's `2026a.json` and review the expected differences.
2. Remove `transform-data.js`, the `transform-data` npm script and the root `moment-timezone`
   devDependency.
3. Build the timezone bundles, then run the timezone tests and the examples integration tests.
4. Update the README and HowToUpdateTZDB.md. Add the CHANGELOG entry (new bundles, isdst field).
Rollback: revert the commit. The old data files are in git history and the runtime is unchanged.

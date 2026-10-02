# Spec Delta

## Purpose

Generates the timezone data that `@js-joda/timezone` ships from an official IANA tzdb release. The
process is reproducible and runs from inside the js-joda repository, with no external project or
system timezone tools involved.

## ADDED Requirements

### Requirement: Generate data for a selected tzdb release
The generator SHALL accept a tzdb release identifier, either `latest` or an explicit version such as
`2026a`, and SHALL produce data for that release. The resolved version SHALL be recorded in every
output file's `version` field.

#### Scenario: Latest release
- **WHEN** the maintainer runs the generator with `latest`
- **THEN** the data is generated from the newest IANA release, and the outputs carry that release's version (for example `2026b`)

#### Scenario: Explicit release
- **WHEN** the maintainer runs the generator with `2025b`
- **THEN** the data is generated from release `2025b`, and the outputs carry version `2025b`

#### Scenario: Unknown release
- **WHEN** the maintainer runs the generator with a version that IANA does not publish
- **THEN** the generator exits with a non-zero status and an error naming the version, and no file under `packages/timezone/data/` is changed

### Requirement: Independent of system timezone tools
The generator SHALL NOT use the `zic` or `zdump` binaries installed on the host. It SHALL use only
tools built from the IANA tzcode release that matches the selected data release.

#### Scenario: Old host zic
- **WHEN** the host has an outdated or 32-bit `zic`/`zdump` on its PATH
- **THEN** the generated data is identical to the data generated on a host without them

#### Scenario: Missing build prerequisites
- **WHEN** a required build tool (for example a C compiler or `make`) is not available
- **THEN** the generator exits with a non-zero status and a message that names the missing tool

### Requirement: Rearguard daylight-saving semantics
The generator SHALL compile the tzdb in rearguard format, so that the daylight-saving amount is never
negative. This matches the semantics of Java's `java.time` tzdb.

#### Scenario: Europe/Dublin
- **WHEN** data is generated for any release since 2018
- **THEN** Europe/Dublin periods in summer (IST, +01:00) have isdst set to true, and winter periods (GMT, +00:00) have isdst set to false

### Requirement: Offset periods per zone
For each zone the generator SHALL produce an ordered list of offset periods. Each period SHALL have
a UTC offset, an abbreviation, an isdst flag and an end instant (`until`). The last period's
`until` SHALL be open-ended. Offsets and untils SHALL use the units and sign convention of the existing
data (minutes west of UTC, epoch milliseconds).

#### Scenario: DST zone period
- **WHEN** data is generated for Europe/Berlin
- **THEN** the period that ends at the switch to summer time on 2026-03-29T01:00:00Z has offset -60, abbreviation `CET` and isdst false, and the following period has offset -120, abbreviation `CEST` and isdst true

#### Scenario: Fixed offset zone
- **WHEN** data is generated for `Etc/GMT-2`
- **THEN** the zone has a single period with offset -120, isdst false and an open-ended until

### Requirement: Transition horizon
The generator SHALL include every transition up to and including the year 2499. Transitions defined by
recurring rules SHALL be expanded through that year.

#### Scenario: Far future transition
- **WHEN** data is generated for America/New_York
- **THEN** the full data contains the DST transitions of the year 2499 and none after it

### Requirement: Merge only identical consecutive periods
The generator SHALL merge consecutive periods only when their offset, abbreviation and isdst flag are
all equal. A change in any one of the three SHALL keep a separate period.

#### Scenario: isdst-only change
- **WHEN** two consecutive periods have the same offset and abbreviation but different isdst flags
- **THEN** both periods are kept in the output

### Requirement: Complete zone identifiers
The generated data SHALL make every Zone and Link identifier of the selected tzdb release available,
including the identifiers from the `backward` file.

#### Scenario: Backward link available
- **WHEN** data is generated
- **THEN** both `Europe/Kyiv` and the legacy alias `Europe/Kiev` are available in every packed output

### Requirement: Deterministic link leaders
When zones with identical data are grouped in the packed outputs, the generator SHALL pick the group
leader deterministically. A name defined by a tzdb `Zone` line SHALL be preferred over a name defined
by a `Link` line. Ties SHALL be broken by lexicographic order.

#### Scenario: Canonical zone leads
- **WHEN** `Europe/Kyiv` (Zone) and `Europe/Kiev` (Link) have identical data
- **THEN** the packed output contains zone `Europe/Kyiv` and link `Europe/Kyiv|Europe/Kiev`

### Requirement: Year-range variants
The generator SHALL write the packed variants listed below. "Current year" SHALL be the UTC year at
generation time. A variant SHALL contain every period that overlaps its year range.

| Suffix | Years |
|---|---|
| (none) | all |
| `-4-year-range` | current-2 … current+2 |
| `-10-year-range` | current-5 … current+5 |
| `-60-year-range` | current-30 … current+30 |
| `-1970-2030` | 1970 … 2030 |
| `-2012-2022` | 2012 … 2022 |
| `-2017-2027` | 2017 … 2027 |

#### Scenario: All variants written
- **WHEN** data is generated in 2026
- **THEN** `packages/timezone/data/packed/` contains `latest.json`, `latest-4-year-range.json` (2024–2028), `latest-10-year-range.json` (2021–2031), `latest-60-year-range.json` (1996–2056), `latest-1970-2030.json`, `latest-2012-2022.json` and `latest-2017-2027.json`

#### Scenario: Offset correct within range
- **WHEN** any instant inside a variant's year range is resolved with that variant
- **THEN** the offset equals the offset that the full data gives for that instant

### Requirement: Output files
The generator SHALL write `data/unpacked/latest.json`, `data/unpacked/<version>.json`,
`data/packed/latest.json`, `data/packed/<version>.json` and the range variants under
`packages/timezone/data/`. The outputs SHALL NOT contain country or population metadata.

#### Scenario: Versioned copies
- **WHEN** data is generated for release `2026b`
- **THEN** `data/unpacked/2026b.json` and `data/packed/2026b.json` exist, with the same content as the matching `latest.json` files

#### Scenario: No country data
- **WHEN** any generated output file is read
- **THEN** it has no `countries` key, and no zone carries population or country information

### Requirement: Deterministic output
Running the generator twice for the same release in the same calendar year SHALL produce
byte-identical files.

#### Scenario: Re-run
- **WHEN** the generator runs twice for `2026a` on the same day
- **THEN** `git diff` shows no change after the second run

### Requirement: Parity with moment-timezone data
The project SHALL provide a check that compares the generated unpacked data with moment-timezone
unpacked data for the same release. It SHALL report every zone whose resolved offset differs at any
transition instant up to 2037. Differences that come only from rearguard semantics or isdst-only
splits SHALL be reported separately as expected.

#### Scenario: Parity run
- **WHEN** the parity check runs against moment-timezone's `2026a.json`
- **THEN** it exits with status 0 if there are no unexpected offset differences, and otherwise lists each differing zone and instant and exits non-zero

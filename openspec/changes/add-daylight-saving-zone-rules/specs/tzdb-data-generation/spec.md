# Spec Delta

## MODIFIED Requirements

### Requirement: Offset periods per zone
For each zone the generator SHALL produce an ordered list of offset periods. Each period SHALL have
a UTC offset, an abbreviation, an isdst flag, a standard offset and an end instant (`until`). The last
period's `until` SHALL be open-ended. Offsets, standard offsets and untils SHALL use the units and sign
convention of the existing data (minutes west of UTC, epoch milliseconds).

#### Scenario: DST zone period
- **WHEN** data is generated for Europe/Berlin
- **THEN** the period that ends at the switch to summer time on 2026-03-29T01:00:00Z has offset -60, abbreviation `CET`, isdst false and standard offset -60, and the following period has offset -120, abbreviation `CEST`, isdst true and standard offset -60

#### Scenario: Fixed offset zone
- **WHEN** data is generated for `Etc/GMT-2`
- **THEN** the zone has a single period with offset -120, isdst false, standard offset -120 and an open-ended until

### Requirement: Merge only identical consecutive periods
The generator SHALL merge consecutive periods only when their offset, abbreviation, isdst flag and
standard offset are all equal. A change in any one of the four SHALL keep a separate period.

#### Scenario: isdst-only change
- **WHEN** two consecutive periods have the same offset and abbreviation but different isdst flags
- **THEN** both periods are kept in the output

#### Scenario: Standard-offset-only change
- **WHEN** two consecutive periods have the same offset, abbreviation and isdst flag but different standard offsets
- **THEN** both periods are kept in the output

## ADDED Requirements

### Requirement: Standard offset from the tzdb Zone lines
The standard offset of each period SHALL be the STDOFF of the rearguard tzdb Zone line in effect at the
start of the period. A Zone line's end (UNTIL) SHALL be converted to an instant with its time suffix
(`u`/`g`/`z` UTC, `s` standard time, `w` or none wall time), as ThreeTen-Backport does. Where a Zone
line ends inside a compiled period, the generator SHALL split that period at the Zone line's end.

#### Scenario: Standard offset changed together with the start of daylight saving
- **WHEN** data is generated for Europe/Moscow
- **THEN** the period that contains 1991-06-01T00:00:00Z has offset -180, isdst true and standard offset -120

#### Scenario: Standard offset changed during double summer time
- **WHEN** data is generated for Europe/Paris
- **THEN** the period that contains 1944-09-01T00:00:00Z has offset -120, isdst true and standard offset 0

#### Scenario: Standard offset changed without a change of offset or isdst
- **WHEN** a Zone line changes STDOFF and the daylight saving amount at the same instant, so that offset, abbreviation and isdst stay the same
- **THEN** the output has a period boundary at that instant, with the old standard offset before it and the new one after it

#### Scenario: Unparseable Zone line
- **WHEN** a Zone line in the tzdb source cannot be parsed
- **THEN** the generator exits with a non-zero status and an error naming the zone, and no file under `packages/timezone/data/` is changed

### Requirement: Data update checks
The project SHALL document, in the tzdb update guide, the checks to run for each data update: the
java.time standard offset check, the moment-timezone parity check, and a comparison with the previous
data. The comparison SHALL list every zone whose offsets, abbreviations or isdst flags changed.

#### Scenario: Comparison with the previous data
- **WHEN** the comparison runs for a new release against the previously committed `latest.json`
- **THEN** it lists each zone whose offsets, abbreviations or isdst flags differ, and nothing for unchanged zones

### Requirement: Standard offsets match java.time
The project SHALL provide a check that compares the standard offset of every generated zone with
java.time's `ZoneRules.getStandardOffset` at the start of every period up to 2499. It SHALL report each
differing zone and instant, and SHALL report the JDK's tzdb version next to the generated version.
Differences of zones in a list of known differences, each with a reason, SHALL be reported separately
as expected. Zones that java.time doesn't know SHALL be listed without failing the check.

#### Scenario: Standard offset check
- **WHEN** the check runs with a JDK whose tzdb version equals the generated data's version
- **THEN** it exits with status 0 if no standard offset differs outside the known differences, and otherwise lists each differing zone and instant and exits non-zero

#### Scenario: Known difference of the JDK
- **WHEN** the check runs for Europe/Dublin, whose standard offset in 1968–1971 is `+01:00` in the rearguard data and `Z` in the JDK
- **THEN** the difference is reported as expected, with its reason, and does not fail the check

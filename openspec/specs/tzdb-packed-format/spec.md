# tzdb-packed-format Specification

## Purpose

Defines the packed JSON format in which `@js-joda/timezone` bundles its tz data. This covers the
backward-compatible extension that carries the daylight-saving flag.

## Requirements

### Requirement: Packed file structure
A packed data file SHALL be a JSON object with the keys `version` (tzdb release string), `zones`
(an array of packed zone strings) and `links` (an array of `"<target>|<alias>"` strings, sorted
lexicographically).

#### Scenario: Link resolution
- **WHEN** a packed file contains link `Europe/Kyiv|Europe/Kiev`
- **THEN** a reader resolves `Europe/Kiev` to the zone data of `Europe/Kyiv`

### Requirement: Packed zone string fields
A packed zone string SHALL consist of `|`-separated fields: 0 name, 1 space-separated abbreviations,
2 space-separated base-60 offsets, 3 base-60 index digits (one per period), 4 space-separated base-60
until deltas, 5 population (always empty), and 6 isdst flags. Fields 0–4 SHALL keep the existing
moment-timezone encoding.

#### Scenario: Population field empty
- **WHEN** any packed zone string is split on `|`
- **THEN** field 5 is the empty string

### Requirement: isdst flag encoding
Field 6 SHALL be a string of `0`/`1` characters with exactly one character per entry of fields 1 and
2. Character i SHALL be the isdst flag of the period type that abbreviation i and offset i describe.
Period types SHALL be distinct over (abbreviation, offset, isdst).

#### Scenario: Berlin flags
- **WHEN** the packed Europe/Berlin zone has abbreviations `LMT CET CEST CEMT`
- **THEN** field 6 is `0011`

#### Scenario: Same abbreviation and offset with different isdst
- **WHEN** a zone has two period types with equal abbreviation and offset but different isdst
- **THEN** both appear as separate entries in fields 1, 2 and 6

### Requirement: Backward compatibility
The current `@js-joda/timezone` unpacker, which reads only fields 0–5, SHALL produce the same offsets
and untils from the new packed files as it produces from data that contains no field 6.

#### Scenario: Existing test suite
- **WHEN** the existing `@js-joda/timezone` tests run against bundles built from the new data
- **THEN** all tests pass without any source change in `packages/timezone/src`

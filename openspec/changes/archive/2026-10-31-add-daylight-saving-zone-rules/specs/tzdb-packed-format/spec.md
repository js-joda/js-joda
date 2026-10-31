# Spec Delta

## MODIFIED Requirements

### Requirement: Packed zone string fields
A packed zone string SHALL consist of `|`-separated fields: 0 name, 1 space-separated abbreviations,
2 space-separated base-60 offsets, 3 base-60 index digits (one per period), 4 space-separated base-60
until deltas, 5 population (always empty), 6 isdst flags, and 7 space-separated base-60 standard
offsets. Fields 0–4 SHALL keep the existing moment-timezone encoding.

#### Scenario: Population field empty
- **WHEN** any packed zone string is split on `|`
- **THEN** field 5 is the empty string

#### Scenario: Eight fields
- **WHEN** any packed zone string of the generated data is split on `|`
- **THEN** it has exactly eight fields

### Requirement: isdst flag encoding
Field 6 SHALL be a string of `0`/`1` characters with exactly one character per entry of fields 1 and
2. Character i SHALL be the isdst flag of the period type that abbreviation i and offset i describe.
Period types SHALL be distinct over (abbreviation, offset, isdst, standard offset).

#### Scenario: Berlin flags
- **WHEN** the packed Europe/Berlin zone has abbreviations `LMT CET CEST CEMT`
- **THEN** field 6 is `0011`

#### Scenario: Same abbreviation and offset with different isdst
- **WHEN** a zone has two period types with equal abbreviation and offset but different isdst
- **THEN** both appear as separate entries in fields 1, 2 and 6

### Requirement: Backward compatibility
An unpacker that reads only fields 0–5, as released versions of `@js-joda/timezone` do, SHALL resolve
the same offset for every instant from the new packed files as from the same data without fields 6
and 7.

#### Scenario: Existing test suite
- **WHEN** the tests of the latest released `@js-joda/timezone` run against bundles built from the new data
- **THEN** all tests pass without any source change to that release

#### Scenario: Released unpacker reads new data
- **WHEN** a packed zone string with fields 6 and 7 is unpacked with the unpacker of the latest released `@js-joda/timezone`
- **THEN** it resolves the same offset at every instant as from the same data without fields 6 and 7

## ADDED Requirements

### Requirement: Standard offset encoding
Field 7 SHALL contain exactly one entry per entry of fields 1 and 2. Entry i SHALL be the standard
offset of the period type that abbreviation i and offset i describe, encoded like field 2 (base-60
minutes, sign inverted as in moment-timezone).

#### Scenario: Berlin standard offsets
- **WHEN** the packed Europe/Berlin zone has abbreviations `LMT CET CEST CEMT` and offsets `-R.s -10 -20 -30`
- **THEN** field 7 is `-R.s -10 -10 -10`

#### Scenario: Same abbreviation, offset and isdst with different standard offset
- **WHEN** a zone has two period types that differ only in their standard offset
- **THEN** both appear as separate entries in fields 1, 2, 6 and 7

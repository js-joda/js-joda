# Spec Delta

## Purpose

Defines how `@js-joda/timezone` answers `ZoneRules` queries for IANA zones from its bundled tzdb data,
with the semantics of `java.time.zone.ZoneRules` in ThreeTen-Backport: standard offset, daylight saving
amount and the nearest offset transitions.

## ADDED Requirements

### Requirement: Standard offset
`standardOffset(instant)` SHALL return the standard offset of the zone at that instant: the offset
without daylight saving that the tzdb defines for the zone at that time (rearguard semantics). The
result SHALL equal what java.time returns for the same zone and instant with the same tzdb release,
including periods in which the zone changed its standard offset and started daylight saving at the
same moment.

#### Scenario: Summer time
- **WHEN** `standardOffset` is called for Europe/Berlin at `2026-07-01T00:00:00Z`
- **THEN** it returns `+01:00`

#### Scenario: Winter time
- **WHEN** `standardOffset` is called for Europe/Berlin at `2026-01-15T00:00:00Z`
- **THEN** it returns `+01:00`

#### Scenario: Double summer time
- **WHEN** `standardOffset` is called for Europe/London at `1941-06-01T00:00:00Z`, when the offset was `+02:00`
- **THEN** it returns `Z`

#### Scenario: Standard offset changed together with the start of daylight saving
- **WHEN** `standardOffset` is called for Europe/Moscow at `1991-06-01T00:00:00Z`, when the offset was `+03:00` both before and after the switch to EEST on 1991-03-31
- **THEN** it returns `+02:00`

#### Scenario: Standard offset changed during double summer time
- **WHEN** `standardOffset` is called for Europe/Paris at `1944-09-01T00:00:00Z`, when the offset was `+02:00`
- **THEN** it returns `Z`

#### Scenario: Standard offset changed without daylight saving
- **WHEN** `standardOffset` is called for Europe/Moscow at `2012-07-01T00:00:00Z`
- **THEN** it returns `+04:00`

### Requirement: Daylight saving amount
`daylightSavings(instant)` SHALL return the actual offset minus the standard offset at that instant as
a `Duration`, and `isDaylightSavings(instant)` SHALL return true exactly when that duration is not zero.

#### Scenario: One hour in summer
- **WHEN** `daylightSavings` and `isDaylightSavings` are called for Europe/Berlin at `2026-07-01T00:00:00Z`
- **THEN** they return `PT1H` and `true`

#### Scenario: Zero in winter
- **WHEN** `daylightSavings` and `isDaylightSavings` are called for Europe/Berlin at `2026-01-15T00:00:00Z`
- **THEN** they return `PT0S` and `false`

#### Scenario: Two hours of double summer time
- **WHEN** `daylightSavings` is called for Europe/Berlin at `1945-06-01T00:00:00Z`
- **THEN** it returns `PT2H`

#### Scenario: Daylight saving after a standard offset change
- **WHEN** `daylightSavings` and `isDaylightSavings` are called for Europe/Moscow at `1991-06-01T00:00:00Z`
- **THEN** they return `PT1H` and `true`

#### Scenario: Half an hour
- **WHEN** `daylightSavings` is called for Australia/Lord_Howe at `2026-01-15T00:00:00Z`
- **THEN** it returns `PT30M`

#### Scenario: Zone without current daylight saving
- **WHEN** `isDaylightSavings` is called for Asia/Tokyo at `2026-07-01T00:00:00Z`
- **THEN** it returns `false`

### Requirement: Offset transitions only
The transition methods SHALL report a transition only where the offset changes. A period boundary
where only the abbreviation or the daylight saving flag changes SHALL NOT be reported as a transition.

#### Scenario: Boundary without offset change
- **WHEN** a zone has two consecutive periods with the same offset and different abbreviations or daylight saving flags
- **THEN** `nextTransition` and `previousTransition` report no transition at their boundary

#### Scenario: Summer time becomes standard time
- **WHEN** Africa/Algiers, which went from WEST (`+01:00`, daylight saving) to CET (`+01:00`, standard) at `1977-10-20T23:00:00Z`, is queried
- **THEN** `nextTransition` at `1977-06-01T00:00:00Z` returns the transition at `1978-03-24T00:00:00Z` from `+01:00` to `+02:00`, and `standardOffset` returns `Z` at `1977-06-01T00:00:00Z` and `+01:00` at `1977-12-01T00:00:00Z`

### Requirement: Next and previous transition
`nextTransition(instant)` SHALL return the first transition strictly after the instant, and
`previousTransition(instant)` the last transition strictly before it. Each SHALL return null when no
such transition exists in the data. The returned transition SHALL carry the transition instant and the
offsets before and after it.

#### Scenario: Next spring transition
- **WHEN** `nextTransition` is called for Europe/Berlin at `2026-01-01T00:00:00Z`
- **THEN** it returns the transition at `2026-03-29T01:00:00Z` from `+01:00` to `+02:00`

#### Scenario: Previous autumn transition
- **WHEN** `previousTransition` is called for Europe/Berlin at `2026-01-01T00:00:00Z`
- **THEN** it returns the transition at `2025-10-26T01:00:00Z` from `+02:00` to `+01:00`

#### Scenario: Instant exactly at a transition
- **WHEN** `nextTransition` and `previousTransition` are called for Europe/Berlin at `2026-03-29T01:00:00Z`
- **THEN** `nextTransition` returns the transition at `2026-10-25T01:00:00Z` and `previousTransition` returns the one at `2025-10-26T01:00:00Z`

#### Scenario: No later transition
- **WHEN** `nextTransition` is called for Africa/Abidjan at `2026-01-01T00:00:00Z`
- **THEN** it returns null

#### Scenario: No earlier transition
- **WHEN** `previousTransition` is called for Africa/Abidjan at `1900-01-01T00:00:00Z`
- **THEN** it returns null

### Requirement: Transition list and transition rules not supported
`transitions()` and `transitionRules()` SHALL keep throwing a `not supported` error for every zone.
java.time splits the transitions into an explicit historic list and recurring rules for the later
years. The data contains only explicit transitions through the year 2499, so neither method can return
what java.time returns.

#### Scenario: Transition list
- **WHEN** `transitions` is called for Europe/Berlin
- **THEN** an error is thrown that states that `ZoneRules.transitions` is not supported

#### Scenario: Transition rules
- **WHEN** `transitionRules` is called for America/New_York
- **THEN** an error is thrown that states that `ZoneRules.transitionRules` is not supported

#### Scenario: Iterating transitions instead
- **WHEN** `nextTransition` is called for Europe/Berlin at `2026-01-01T00:00:00Z`, and again at the instant of each returned transition, until a transition after `2027-01-01T00:00:00Z` is returned
- **THEN** the transitions at `2026-03-29T01:00:00Z`, `2026-10-25T01:00:00Z` and `2027-03-28T01:00:00Z` are returned in this order

### Requirement: Conformance with ThreeTen-Backport's zone rules tests
For the zones that ThreeTen-Backport's `TestStandardZoneRules` covers (Europe/London, Europe/Dublin,
Europe/Paris, America/New_York, Asia/Kathmandu, Etc/GMT), the offset, standard offset, daylight saving
and next/previous transition results SHALL match the expectations of those tests. The exceptions are
the parts that rely on `transitions()`, `transitionRules()`, serialization or transitions after 2499.

#### Scenario: London standard offset
- **WHEN** `standardOffset` is called for Europe/London every six months from 1840 to 2009
- **THEN** it returns `-00:01:15` before 1848, `+01:00` from 1969 to 1971, and `Z` otherwise

#### Scenario: Paris standard offset
- **WHEN** `standardOffset` is called for Europe/Paris every six months from 1840 to 2009
- **THEN** it returns `+00:09:21` before 1911-03-11, `Z` until 1940-06-14, `+01:00` until 1944-08-25, `Z` until 1945-09-16, and `+01:00` after that

#### Scenario: Dublin daylight saving
- **WHEN** `isDaylightSavings` and `daylightSavings` are called for Europe/Dublin at `2016-01-01T00:00:00Z` and `2016-07-01T00:00:00Z`
- **THEN** they return `false` and `PT0S` in January, and `true` and `PT1H` in July

#### Scenario: London transitions after 1997
- **WHEN** `nextTransition` is called for Europe/London at each transition from 1998 to 2009
- **THEN** it returns the next one, alternating between the last Sunday in March and the last Sunday in October at 01:00 UTC

#### Scenario: Kathmandu after its last transition
- **WHEN** `nextTransition` is called for Asia/Kathmandu at the instant of its last transition
- **THEN** it returns null

### Requirement: Data without standard offsets
Zone data without standard offsets SHALL still load and resolve offsets and transitions. This covers
the packed format before this change, with or without daylight saving flags, and custom data loaded
with `loadTzdbData`. For such data, `standardOffset`, `daylightSavings` and `isDaylightSavings` SHALL
throw an error that names the zone and states that the data has no standard offsets. They SHALL NOT
derive a standard offset from the daylight saving flags.

#### Scenario: Data with daylight saving flags but without standard offsets
- **WHEN** tz data whose packed zones have daylight saving flags but no standard offsets is loaded, and `standardOffset`, `daylightSavings` or `isDaylightSavings` is called for Europe/Berlin
- **THEN** an error is thrown that names Europe/Berlin and the missing standard offsets, and `offsetOfInstant` and `nextTransition` still return their usual results

#### Scenario: Data in the moment-timezone packed format
- **WHEN** tz data whose packed zones have neither daylight saving flags nor standard offsets is loaded, and `isDaylightSavings` is called
- **THEN** an error is thrown that names the missing standard offsets, and `nextTransition` still returns a transition

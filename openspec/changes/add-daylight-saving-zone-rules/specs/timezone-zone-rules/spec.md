# Spec Delta

## Purpose

Defines how `@js-joda/timezone` answers `ZoneRules` queries for IANA zones from its bundled tzdb data,
with the semantics of `java.time.zone.ZoneRules` in ThreeTen-Backport: standard offset, daylight saving
amount and offset transitions.

## ADDED Requirements

### Requirement: Standard offset
`standardOffset(instant)` SHALL return the offset of the zone without daylight saving at that instant.
For a period that is not daylight saving, this is the period's offset. For a daylight saving period, it
is the offset of the nearest earlier period that is not daylight saving, or the nearest later one if no
earlier one exists.

#### Scenario: Summer time
- **WHEN** `standardOffset` is called for Europe/Berlin at `2026-07-01T00:00:00Z`
- **THEN** it returns `+01:00`

#### Scenario: Winter time
- **WHEN** `standardOffset` is called for Europe/Berlin at `2026-01-15T00:00:00Z`
- **THEN** it returns `+01:00`

#### Scenario: Double summer time
- **WHEN** `standardOffset` is called for Europe/London at `1941-06-01T00:00:00Z`, when the offset was `+02:00`
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
- **THEN** `transitions`, `nextTransition` and `previousTransition` report no transition at their boundary

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

### Requirement: Transition list
`transitions()` SHALL return every offset transition in the loaded data of the zone in ascending
order, and SHALL return a list that changes made by the caller cannot affect. `transitionRules()` SHALL
return an empty list, because the data contains explicit transitions through the year 2499.

#### Scenario: Zone with a single offset change
- **WHEN** `transitions` is called for Africa/Abidjan
- **THEN** it returns one transition, from the local mean time offset to `Z` in 1912

#### Scenario: Consistent with next transition
- **WHEN** `transitions` is called for Europe/Berlin
- **THEN** each transition in the list after the first equals `nextTransition` called at the instant of the transition before it

#### Scenario: Caller modifies the list
- **WHEN** a caller modifies the list returned by `transitions` for Europe/Berlin and calls `transitions` again
- **THEN** the second call returns the unmodified list

#### Scenario: No transition rules
- **WHEN** `transitionRules` is called for America/New_York
- **THEN** it returns an empty list

### Requirement: Data without daylight saving flags
Zone data without daylight saving flags SHALL still load and resolve offsets and transitions.
`standardOffset`, `daylightSavings` and `isDaylightSavings` SHALL throw an error for such data that
states that the data has no daylight saving information.

#### Scenario: Data in the old packed format
- **WHEN** tz data whose packed zones have no daylight saving field is loaded, and `isDaylightSavings` is called
- **THEN** an error is thrown that names the missing daylight saving data, and `nextTransition` still returns a transition

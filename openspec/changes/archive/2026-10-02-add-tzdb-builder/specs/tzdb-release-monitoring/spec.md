# Spec Delta

## Purpose

Makes sure maintainers learn about a new IANA tzdb release soon after it is published, so that the
`@js-joda/timezone` data does not silently fall behind.

## ADDED Requirements

### Requirement: Scheduled release check
A scheduled CI workflow SHALL run at least weekly and SHALL also be triggerable manually. It SHALL
compare the latest published IANA tzdb version with the `version` in
`packages/timezone/data/packed/latest.json`.

#### Scenario: Up to date
- **WHEN** the IANA latest version equals the committed version
- **THEN** the workflow succeeds and creates nothing

#### Scenario: Manual trigger
- **WHEN** a maintainer triggers the workflow manually
- **THEN** it performs the same comparison immediately

### Requirement: Issue for a new release
When a newer IANA release exists, the workflow SHALL open a GitHub issue that names the new version
and links to the update instructions. It SHALL NOT open a second issue for a version that already has
an open issue.

#### Scenario: New release
- **WHEN** IANA publishes `2026c` and the committed version is `2026b`
- **THEN** an issue titled with `2026c` is opened that references `packages/timezone/HowToUpdateTZDB.md`

#### Scenario: Issue already exists
- **WHEN** the workflow runs again while the `2026c` issue is still open
- **THEN** no additional issue is created

# Spec Delta

## Purpose

Generates the prebuilt per-locale npm packages (`@js-joda/locale_<locale>`) from `@js-joda/locale`, so
that a release can publish them together with `@js-joda/locale` without version conflicts.

## ADDED Requirements

### Requirement: Prebuilt package version
Generating the prebuilt packages SHALL NOT change the version of a package that already exists. The
version of an existing prebuilt package is set only by the release tooling. A prebuilt package created
for the first time SHALL get the version of `@js-joda/locale`.

#### Scenario: Existing package keeps the release version
- **WHEN** the release tooling has set `@js-joda/locale_de` to 5.3.2 and `@js-joda/locale` to 5.4.0, and the prebuilt packages are generated
- **THEN** `@js-joda/locale_de` still has version 5.3.2

#### Scenario: Publish after a release bump
- **WHEN** a release bumps `@js-joda/locale` and the prebuilt packages to different versions and publishes them
- **THEN** every prebuilt package is published with the version the release tooling chose, and the registry accepts it

#### Scenario: New prebuilt package
- **WHEN** a locale is added to the prebuilt package list and the packages are generated while `@js-joda/locale` is 5.4.0
- **THEN** the new package is created with version 5.4.0

### Requirement: Generated peer dependencies
Each prebuilt package SHALL declare as peer dependencies: `@js-joda/core` and `@js-joda/timezone` with
the same ranges as the `@js-joda/locale` peer dependencies, `@js-joda/timezone` as optional, and
`@js-joda/locale` as `>=` the current `@js-joda/locale` version.

#### Scenario: Peer ranges follow @js-joda/locale
- **WHEN** `@js-joda/locale` is 5.3.1 and declares the peer dependency `@js-joda/timezone` as `^2.25.0 || ^3.0.0`, and the prebuilt packages are generated
- **THEN** every prebuilt package declares `@js-joda/timezone` as `^2.25.0 || ^3.0.0` (optional) and `@js-joda/locale` as `>=5.3.1`

### Requirement: Stable generated files
Generating the prebuilt packages from an unchanged `@js-joda/locale` SHALL leave the committed
prebuilt package manifests unchanged.

#### Scenario: Regeneration without changes
- **WHEN** the prebuilt packages are generated twice without changes to `@js-joda/locale` in between
- **THEN** the second run produces no differences in the prebuilt package manifests

#### Scenario: Test run leaves the working tree clean
- **WHEN** the full locale test suite, which builds the prebuilt packages, runs on a clean checkout
- **THEN** no committed prebuilt package manifest is modified

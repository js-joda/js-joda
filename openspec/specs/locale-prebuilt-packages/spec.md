# locale-prebuilt-packages Specification

## Purpose

Generates the prebuilt per-locale npm packages (`@js-joda/locale_<locale>`) from `@js-joda/locale`, so
that a release can publish them together with `@js-joda/locale` without version conflicts.

## Requirements

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
`@js-joda/locale` with the lower bound (`>=x.y.z`) configured next to the list of prebuilt packages,
currently `>=5.0.0`, the first `@js-joda/locale` release with `registerLocaleData`. The configuration
SHALL also list every export the prebuilt bundles import from `@js-joda/locale`. The `@js-joda/locale`
range SHALL NOT be derived from the current `@js-joda/locale` version, because the packages are generated
after the release tooling has chosen which packages to bump. The test suite SHALL fail when the
configuration is out of date.

#### Scenario: Peer ranges follow @js-joda/locale
- **WHEN** `@js-joda/locale` declares the peer dependency `@js-joda/timezone` as `^2.25.0 || ^3.0.0`, and the prebuilt packages are generated
- **THEN** every prebuilt package declares `@js-joda/timezone` as `^2.25.0 || ^3.0.0` (optional)

#### Scenario: Configured lower bound on @js-joda/locale
- **WHEN** the configured range is `>=5.0.0`, `@js-joda/locale` is 5.4.0, and the prebuilt packages are generated
- **THEN** every prebuilt package declares `@js-joda/locale` as `>=5.0.0`

#### Scenario: Prebuilt bundles start to use another @js-joda/locale export
- **WHEN** the prebuilt bundle template imports an export from `@js-joda/locale` that the configuration doesn't list
- **THEN** the locale test suite fails and asks to check the configured range

#### Scenario: Range excludes the current version
- **WHEN** the configured range is not satisfied by the current `@js-joda/locale` version, or isn't of the form `>=x.y.z`
- **THEN** the locale test suite fails

#### Scenario: Range changed without regenerating
- **WHEN** the configured range was changed but the committed prebuilt manifests still declare the old one
- **THEN** the locale test suite fails and asks to run `npm run create-packages` and commit the manifests

### Requirement: Stable generated files
Generating the prebuilt packages SHALL leave the committed prebuilt package manifests unchanged, unless
the peer dependencies of `@js-joda/locale` changed. A version bump of `@js-joda/locale` alone SHALL NOT
change them.

#### Scenario: Regeneration without changes
- **WHEN** the prebuilt packages are generated twice without changes to `@js-joda/locale` in between
- **THEN** the second run produces no differences in the prebuilt package manifests

#### Scenario: Version bump of @js-joda/locale
- **WHEN** the release tooling bumps `@js-joda/locale` from 5.3.1 to 5.4.0 and the prebuilt packages are generated
- **THEN** the prebuilt package manifests are unchanged apart from the versions the release tooling set

#### Scenario: Test run leaves the working tree clean
- **WHEN** the full locale test suite, which builds the prebuilt packages, runs on a clean checkout
- **THEN** no committed prebuilt package manifest is modified

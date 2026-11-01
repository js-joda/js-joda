# Spec Delta

## Purpose

In a major release every doc, sample, example and test in the repo must use the new explicit API,
`packages/examples` must pass against it, and a migration guide must exist.

## ADDED Requirements

### Requirement: All docs, samples and examples use the new API
Every document, sample and example in the repo that imports `@js-joda/timezone`, `@js-joda/locale` or
a prebuilt package SHALL use the new explicit API (register functions + data values) and SHALL NOT use
the removed side-effect entries, `/register`, the prebuilt `/data` subpaths, deep imports of removed
`dist/js-joda-timezone*` builds, or `ZoneRulesProvider.loadTzdbData`. This covers:
`packages/examples/examples` (node, html, bundler, typescript samples), `packages/locale/examples`,
the root `README.md`, `packages/core/README.md`, `packages/core/CheatSheet.md`,
`packages/timezone/README.md`, `packages/locale/README.md`, `esdoc/manual` (incl. `ZonedDateTime.md`,
`formatting.md`, `packages.md`, `Locale`), and `utils/README_package.template.md` with the
regenerated prebuilt READMEs.

#### Scenario: Grep finds no old-style usage
- **WHEN** the repo is grepped for side-effect imports (`import '@js-joda/timezone'`,
  `import '@js-joda/locale_en'`), `/register`, `/data` subpaths, deep imports of
  `dist/js-joda-timezone*` range builds and `loadTzdbData` outside this change's specs and the
  migration guide
- **THEN** no matches remain in docs, samples, examples or tests

#### Scenario: packages/examples passes against the new API
- **WHEN** all packages are built (`npx lerna run --stream build-dist && npx lerna run --stream build-locale-dist`) and `npm test` runs in `packages/examples`
- **THEN** all samples pass

### Requirement: Tests register fixtures explicitly
Tests in every package that relied on side-effect imports SHALL register their fixtures explicitly
(e.g. in a mocha root hook); a second call with the same data is a no-op.

#### Scenario: Test suite passes with explicit fixtures
- **WHEN** `npm run test-ci` runs in `packages/core`, `packages/timezone`, `packages/locale` and `packages/extra` with fixtures registered in a root hook
- **THEN** all tests pass

### Requirement: Migration guide
A migration guide SHALL exist (linked from the root README and the CHANGELOG) with before/after
snippets for ESM, CommonJS, `<script>` tags, Node.js with `cldr-data`, and React Native, covering at
least: `@js-joda/timezone` side-effect import → `registerTimeZoneData(tzdbData)`;
`ZoneRulesProvider.loadTzdbData` → `registerTimeZoneData`; `@js-joda/locale` + prebuilt side-effect
imports → root `localeData` + `registerLocaleData`; prebuilt `/data` → root; range deep import →
`@js-joda/timezone/data/<range>`; the note that `js-joda-timezone.min.js` keeps its file name but
contains no data (unpinned CDN URLs break); the peer-range bump; `@js-joda/locale_no` removed and
deprecated in favour of `@js-joda/locale_nb-no`; `@js-joda/locale_nn-no` now containing data; and the
full `cldr-data` coverage (`cldr-data-coverage` or `CLDR_COVERAGE`) that `cldrDataSource` users need for
`nn`.

#### Scenario: Migration guide exists and is linked
- **WHEN** the root README and the root CHANGELOG are inspected
- **THEN** both link to the migration guide, and the guide contains before/after snippets for all five setups

#### Scenario: Norwegian changes are covered
- **WHEN** the migration guide, the root CHANGELOG and the docs are inspected
- **THEN** the guide and the CHANGELOG cover the `@js-joda/locale_no` removal and `@js-joda/locale_nn-no`, and no doc tells users to install `@js-joda/locale_no`

### Requirement: Build and tooling files are checked
Files that reference plugin imports or removed builds — `packages/locale/karma.conf.js`,
`packages/timezone/bower.json`, `esdoc/yato.js`, `esdoc.json`, `packages/tzdb-builder` (README,
manifest), `packages/timezone/HowToUpdateTZDB.md`, `.github/scripts/tzdb-release-check.sh`,
`ReleaseHowTo.md`, `AGENTS.md` — SHALL be checked and updated where they are now wrong.

#### Scenario: Tooling still works after the change
- **WHEN** the karma browser tests, the esdoc build and the tzdb release check run
- **THEN** they pass or are updated so that they pass

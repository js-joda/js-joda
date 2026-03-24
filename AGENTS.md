# js-joda — Agent Overview

## What is this project?

**js-joda** is an immutable date and time library for JavaScript, ported from the [ThreeTen-Backport](http://www.threeten.org/threetenbp/) project (the reference implementation for Java's `java.time` package / JSR-310). It provides a domain-driven API with classes for each use case (`LocalDate`, `ZonedDateTime`, `Duration`, etc.), no third-party dependencies, and supports ECMAScript 5+.

## Repository structure

This is an **npm workspaces / Lerna monorepo** (`lerna.json` at root). All packages live under `packages/`. The `shared/` directory contains shared tooling (TypeScript test config, build scripts).

```
packages/
  core/        → @js-joda/core      (main library)
  timezone/    → @js-joda/timezone  (IANA tz database plugin)
  locale/      → @js-joda/locale    (locale/i18n plugin)
  extra/       → @js-joda/extra     (extra date-time types plugin)
  examples/    → @js-joda/examples  (build artifact integration tests)
shared/        → shared build/test tooling
esdoc/         → documentation sources (manual pages)
```

## The four packages

### `@js-joda/core` — `packages/core/`

The foundation. Implements the ThreeTen domain model:

- **Date/Time types**: `LocalDate`, `LocalTime`, `LocalDateTime`, `ZonedDateTime`, `Instant`, `OffsetDateTime`, `OffsetTime`
- **Amount types**: `Duration`, `Period`
- **Value types**: `Year`, `YearMonth`, `Month`, `MonthDay`, `DayOfWeek`
- **Formatting/Parsing**: `DateTimeFormatter` with full ISO 8601 / RFC 3339 support
- **Zone types**: `ZoneId`, `ZoneOffset` (fixed offsets only without `@js-joda/timezone`)

All other packages depend on `@js-joda/core` as a peer dependency and extend it via its plugin system.

### `@js-joda/timezone` — `packages/timezone/`

Provides IANA timezone database support. Required for `ZonedDateTime` with real-world timezone names (e.g., `"Europe/Berlin"`). Without this plugin, only fixed offsets (`UTC`, `UTC+02:00`) work. The package ships the full IANA tzdata as a `ZoneRulesProvider` implementation. Also has locale-specific sub-packages under `packages/locale/packages/`.

### `@js-joda/locale` — `packages/locale/`

Locale-aware formatting and parsing. Extends `DateTimeFormatter` with locale-specific text patterns (day names, month names, etc.). Comes in two flavours:
- **Full build** (`dist/js-joda-locale.js`) — bundles all locales (large)
- **Prebuilt locale packages** (`packages/locale/packages/<locale>/`) — individual per-locale packages (e.g., `@js-joda/locale_en`, `@js-joda/locale_de`) for tree-shaking

The `build-locale-dist` script regenerates these per-locale packages via `utils/create_packages.js`.

### `@js-joda/extra` — `packages/extra/`

Additional date-time types that complement core, mirroring the [ThreeTen-Extra](https://www.threeten.org/threeten-extra/) project:

- `Interval`, `LocalDateRange`
- `DayOfMonth`, `DayOfYear`
- `Quarter`, `YearQuarter`, `YearWeek`
- `OffsetDate`
- `Temporals` (utility helpers)

## Build system

Each package uses **Rollup** for bundling. Each produces:
- `dist/<name>.js` — CommonJS
- `dist/<name>.esm.js` — ES module
- `dist/<name>.min.js` — minified UMD (browser)

Build a package: `npm run build-dist` inside the package directory.

## Testing

Each package uses **Mocha** (Node) + **Karma** (browser) + **nyc** (coverage). TypeScript definitions are tested separately.

```bash
# Run Node tests for a package
cd packages/core && npm test

# Run all tests including browser
cd packages/core && npm run test-ci

# Run TypeScript definition tests
cd packages/core && npm run test-ts-definitions
```

Test files live under `packages/<name>/test/` and follow the pattern `*Test.js`.

## Key conventions

- All public types are **immutable** — methods return new instances, never mutate.
- The API closely mirrors `java.time` — method names and semantics intentionally match Java's JSR-310 API.
- Only features from the ThreeTen-Backport API are accepted upstream — additional features beyond the reference API are rejected by policy.
- Contributions must be BSD-licensed compatible.

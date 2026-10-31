# Packages

js-joda is a monorepo of several npm packages. The public packages:

| Package | Description |
| ------- | ----------- |
| [`@js-joda/core`](https://github.com/js-joda/js-joda/blob/main/packages/core/README.md) | The core date and time library: immutable classes like `LocalDate`, `LocalDateTime`, `ZonedDateTime`, `Instant`, `Duration`, `Period`, plus ISO-8601 formatting and parsing. |
| [`@js-joda/timezone`](https://github.com/js-joda/js-joda/blob/main/packages/timezone/README.md) | Plugin with bindings to the IANA tz database, enabling zone names like `Europe/Berlin`. Import it for side effects. |
| [`@js-joda/locale`](https://github.com/js-joda/js-joda/blob/main/packages/locale/README.md) | Plugin for locale-aware formatting and parsing (day and month names), as a full build or as per-locale prebuilt packages. |
| [`@js-joda/extra`](https://github.com/js-joda/js-joda/blob/main/packages/extra/README.md) | Additional date-time types that complement the core, e.g. `Interval`, `YearQuarter`, `YearWeek`. |

And the private packages, not published to npm:

| Package | Description |
| ------- | ----------- |
| [`@js-joda/examples`](https://github.com/js-joda/js-joda/blob/main/packages/examples/README.md) | End-to-end integration tests that run code samples against the built `dist` artifacts of the other packages. |
| [`@js-joda/tzdb-builder`](https://github.com/js-joda/js-joda/blob/main/packages/tzdb-builder/README.md) | Build tool that generates the IANA tzdb data files shipped in `@js-joda/timezone`. |

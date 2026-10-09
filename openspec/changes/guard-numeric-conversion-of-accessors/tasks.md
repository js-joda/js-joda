# Tasks

## 1. Core guard

- [ ] 1.1 Add a shared helper module in `packages/core/src` (no imports of its own) that installs a `Symbol.toPrimitive` guard on a prototype for a given type name and hint text, with the feature check and the messages from design.md; verify `npm run lint` passes in `packages/core`
- [ ] 1.2 Install the guard on `TemporalAccessor.prototype` and remove it from `Temporal.js`; verify the existing `TemporalTest.js` toPrimitive tests still pass
- [ ] 1.3 Switch `TemporalAmount.js` to the helper with the corrected hint from design.md (no `.isBefore()`); verify existing `Duration`/`Period` tests still pass
- [ ] 1.4 Install the guard on `ZoneId.prototype`; verify `ZoneIdTest.js` still passes
- [ ] 1.5 Add a test file (e.g. `packages/core/test/PrimitiveConversionTest.js`) covering the spec scenarios: `TypeError` for `<`, `-`, `Number()` and unary `+` on `Month`, `DayOfWeek`, `MonthDay`, `ZoneOffset`, `ZoneId.of('UTC+01:00')`, `ZoneId.systemDefault()`, a `LocalDate` and a `Duration`; `Month.of(Month.MARCH)`, `DayOfWeek.of(DayOfWeek.MONDAY)` and `LocalDate.of(2020, 1, Month.MARCH)` (a Month as the day) throw (assert only that an error is thrown, not its class, as the spec leaves the type open); the `Month` message mentions `.compareTo()`, `.equals()` and `.value()`, the `ZoneOffset` and `Duration` messages mention `.equals()` and `.compareTo()` but not `.isBefore()` or `.value()`; template literal, `'x' + obj` and `== string` still return `toString()`. Skip the throwing cases with the same feature check as the helper (`typeof Symbol === 'undefined' || !Symbol.toPrimitive`), not only `typeof Symbol === 'undefined'` as in `TemporalTest.js`. Verify with `npm test` in `packages/core`
- [ ] 1.6 Run `npm run test-ci` in `packages/core` and verify the Karma browser run passes too

## 2. Extra

- [ ] 2.1 Build core (`npm run build-dist` in `packages/core`) so extra's tests resolve the new guard through `@js-joda/core`'s `dist`, then add a new `packages/extra/test/PrimitiveConversionTest.js` (not under `test/reference/`, which holds the ported ThreeTen-Extra tests) covering `Quarter`, `DayOfMonth` and `DayOfYear`: `<` throws a `TypeError`; `Quarter.of(Quarter.Q1)`, `DayOfMonth.of(DayOfMonth.of(1))`, `DayOfYear.of(DayOfYear.of(1))` and `LocalDate.of(2020, 1, DayOfMonth.of(5))` throw (class not asserted); string conversion returns `toString()` (skip condition as in 1.5); verify with `npm test` in `packages/extra`, which picks up `test/*Test.js`

## 3. Documentation and release notes

- [ ] 3.1 Add a `:boom: Breaking Change` entry for `core` under `## Unreleased` in `CHANGELOG.md`, listing the newly guarded classes (`Month`, `DayOfWeek`, `MonthDay`, `ZoneOffset`, `ZoneRegion`/`ZoneId`) and the replacements (`.compareTo()`, `.isBefore()`, `.isAfter()`, `.equals()`, `.value()`), noting that `Quarter`, `DayOfMonth` and `DayOfYear` of `@js-joda/extra` are covered with this core release, that the message of `Temporal` types now reads `TemporalAccessor`, that the `TemporalAmount` message no longer suggests `.isBefore()`, that any API taking a number throws a `TypeError` instead of today's `DateTimeException` or `ArithmeticException` when passed one of the guarded instances (e.g. `Month.of(Month.MARCH)`, `LocalDate.of(2020, 1, DayOfMonth.of(5))`), and that TypeScript rejects arithmetic and comparisons with numbers or unrelated types at compile time but not `<`/`>` between two values of the same class; verify the entry links #833
- [ ] 3.2 Check `esdoc/manual` for operator-based comparisons of the affected classes and replace them with method calls; verify `grep` finds no `<`/`>` comparison of `Month`, `DayOfWeek`, `MonthDay` or `ZoneOffset` instances in the manual

## 4. Integration

- [ ] 4.1 Build all dist artifacts (`npx lerna run --stream build-dist` and `build-locale-dist`) and run `npm test` in `packages/examples`; verify all scenarios pass
- [ ] 4.2 Add a test in `packages/timezone` that `ZoneId.of('Europe/Berlin') < ZoneId.of('Europe/Paris')` throws a `TypeError` (skip condition as in 1.5)
- [ ] 4.3 Run `npm test` in `packages/timezone` and `packages/locale`; verify no test relied on numeric conversion of a `ZoneId` or `Month`/`DayOfWeek`

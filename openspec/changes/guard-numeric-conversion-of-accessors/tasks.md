# Tasks

## 1. Core guard

- [ ] 1.1 Add a shared helper module in `packages/core/src` (no imports of its own) that installs a `Symbol.toPrimitive` guard on a prototype for a given type name and hint text, with the feature check and the messages from design.md; verify `npm run lint` passes in `packages/core`
- [ ] 1.2 Install the guard on `TemporalAccessor.prototype` and remove it from `Temporal.js`; verify the existing `TemporalTest.js` toPrimitive tests still pass
- [ ] 1.3 Switch `TemporalAmount.js` to the helper; verify existing `Duration`/`Period` tests still pass
- [ ] 1.4 Install the guard on `ZoneId.prototype`; verify `ZoneIdTest.js` still passes
- [ ] 1.5 Add a test file (e.g. `packages/core/test/PrimitiveConversionTest.js`) covering the spec scenarios: `TypeError` for `<`, `-`, `Number()` and unary `+` on `Month`, `DayOfWeek`, `MonthDay`, `ZoneOffset`, `ZoneId.of('UTC+01:00')`, `ZoneId.systemDefault()`, a `LocalDate` and a `Duration`; `Month.of(Month.MARCH)` and `DayOfWeek.of(DayOfWeek.MONDAY)` throw a `TypeError`; the `Month` message mentions `.compareTo()`, `.equals()` and `.value()`, the `ZoneOffset` message mentions `.equals()` and `.compareTo()` but not `.isBefore()` or `.value()`; template literal, `'x' + obj` and `== string` still return `toString()`. Skip the throwing cases with the same feature check as the helper (`typeof Symbol === 'undefined' || !Symbol.toPrimitive`), not only `typeof Symbol === 'undefined'` as in `TemporalTest.js`. Verify with `npm test` in `packages/core`
- [ ] 1.6 Run `npm run test-ci` in `packages/core` and verify the Karma browser run passes too

## 2. Extra

- [ ] 2.1 Build core (`npm run build-dist` in `packages/core`) so extra's tests resolve the new guard through `@js-joda/core`'s `dist`, then add tests to `QuarterTest.js`, `DayOfMonthTest.js` and `DayOfYearTest.js` that `<` throws a `TypeError`, `DayOfMonth.of(DayOfMonth.of(1))` and `DayOfYear.of(DayOfYear.of(1))` throw a `TypeError`, and string conversion returns `toString()` (skip condition as in 1.5); verify with `npm test` in `packages/extra`

## 3. Documentation and release notes

- [ ] 3.1 Add a `:boom: Breaking Change` entry for `core` under `## Unreleased` in `CHANGELOG.md`, listing the newly guarded classes (`Month`, `DayOfWeek`, `MonthDay`, `ZoneOffset`, `ZoneRegion`/`ZoneId`) and the replacements (`.compareTo()`, `.isBefore()`, `.isAfter()`, `.equals()`, `.value()`), noting that `Quarter`, `DayOfMonth` and `DayOfYear` of `@js-joda/extra` are covered with this core release, that the message of `Temporal` types now reads `TemporalAccessor`, that `Month.of`/`DayOfWeek.of` (and extra's `DayOfMonth.of`/`DayOfYear.of`) throw a `TypeError` instead of a `DateTimeException` when passed an instance, and that TypeScript doesn't flag these operators at compile time; verify the entry links #833
- [ ] 3.2 Check `esdoc/manual` for operator-based comparisons of the affected classes and replace them with method calls; verify `grep` finds no `<`/`>` comparison of `Month`, `DayOfWeek`, `MonthDay` or `ZoneOffset` instances in the manual

## 4. Integration

- [ ] 4.1 Build all dist artifacts (`npx lerna run --stream build-dist` and `build-locale-dist`) and run `npm test` in `packages/examples`; verify all scenarios pass
- [ ] 4.2 Add a test in `packages/timezone` that `ZoneId.of('Europe/Berlin') < ZoneId.of('Europe/Paris')` throws a `TypeError` (skip condition as in 1.5)
- [ ] 4.3 Run `npm test` in `packages/timezone` and `packages/locale`; verify no test relied on numeric conversion of a `ZoneId` or `Month`/`DayOfWeek`

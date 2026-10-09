# Tasks

## 1. Core guard

- [ ] 1.1 Add a shared helper module in `packages/core/src` (no imports of its own) that installs a `Symbol.toPrimitive` guard on a prototype for a given type name, with the feature check and the message from design.md; verify `npm run lint` passes in `packages/core`
- [ ] 1.2 Install the guard on `TemporalAccessor.prototype` and remove it from `Temporal.js`; verify the existing `TemporalTest.js` toPrimitive tests still pass
- [ ] 1.3 Switch `TemporalAmount.js` to the helper; verify existing `Duration`/`Period` tests still pass
- [ ] 1.4 Install the guard on `ZoneId.prototype`; verify `ZoneIdTest.js` still passes
- [ ] 1.5 Add a test file (e.g. `packages/core/test/PrimitiveConversionTest.js`) covering the spec scenarios: `TypeError` for `<`, `-`, `Number()` and unary `+` on `Month`, `DayOfWeek`, `MonthDay`, `ZoneOffset`, `ZoneId.of('UTC+01:00')`, `ZoneId.systemDefault()`, a `LocalDate` and a `Duration`; the message mentions `.compareTo()`, `.equals()` and `.value()`; template literal, `'x' + obj` and `== string` still return `toString()`. Skip the throwing cases where `Symbol` is undefined, like `TemporalTest.js`. Verify with `npm test` in `packages/core`
- [ ] 1.6 Run `npm run test-ci` in `packages/core` and verify the Karma browser run passes too

## 2. Extra

- [ ] 2.1 Build core (`npm run build-dist` in `packages/core`) so extra's tests resolve the new guard through `@js-joda/core`'s `dist`, then add tests to `QuarterTest.js`, `DayOfMonthTest.js` and `DayOfYearTest.js` that `<` throws a `TypeError` and string conversion returns `toString()`; verify with `npm test` in `packages/extra`

## 3. Documentation and release notes

- [ ] 3.1 Add a `:boom: Breaking Change` entry for `core` under `## Unreleased` in `CHANGELOG.md`, listing the newly guarded classes (`Month`, `DayOfWeek`, `MonthDay`, `ZoneOffset`, `ZoneRegion`/`ZoneId`) and the replacements (`.compareTo()`, `.isBefore()`, `.isAfter()`, `.equals()`, `.value()`), and noting that `Quarter`, `DayOfMonth` and `DayOfYear` of `@js-joda/extra` are covered with this core release; verify the entry links #833
- [ ] 3.2 Check `esdoc/manual` for operator-based comparisons of the affected classes and replace them with method calls; verify `grep` finds no `<`/`>` comparison of `Month`, `DayOfWeek`, `MonthDay` or `ZoneOffset` instances in the manual

## 4. Integration

- [ ] 4.1 Build all dist artifacts (`npx lerna run --stream build-dist` and `build-locale-dist`) and run `npm test` in `packages/examples`; verify all scenarios pass
- [ ] 4.2 Run `npm test` in `packages/timezone` and `packages/locale`; verify no test relied on numeric conversion of a `ZoneId` or `Month`/`DayOfWeek`

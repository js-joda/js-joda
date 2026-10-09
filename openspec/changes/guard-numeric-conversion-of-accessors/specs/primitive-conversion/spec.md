# Spec Delta

## Purpose

Defines how js-joda value objects behave when JavaScript converts them to a primitive, so that
relational and arithmetic operators never silently compare or compute on string representations.

## ADDED Requirements

### Requirement: Numeric conversion of date-time objects is rejected
Converting any date-time object (every class implementing `TemporalAccessor`, in `@js-joda/core` and
in plugins built on it) to a number SHALL throw a `TypeError`. This covers `Number(x)`, unary `+x`,
the relational operators `<`, `>`, `<=`, `>=` and the arithmetic operators other than `+`.

#### Scenario: Comparing months with an operator
- **WHEN** `Month.DECEMBER < Month.FEBRUARY` is evaluated
- **THEN** a `TypeError` is thrown

#### Scenario: Subtracting months
- **WHEN** `Month.MARCH - Month.JANUARY` is evaluated
- **THEN** a `TypeError` is thrown

#### Scenario: Other non-Temporal date-time types
- **WHEN** `Number(x)` is evaluated for `x` being a `DayOfWeek`, a `MonthDay`, or a `Quarter`, `DayOfMonth` or `DayOfYear` from `@js-joda/extra`
- **THEN** a `TypeError` is thrown

#### Scenario: Temporal types keep throwing
- **WHEN** `LocalDate.of(2020, 1, 1) < LocalDate.of(2021, 1, 1)` is evaluated
- **THEN** a `TypeError` is thrown, as before this change

### Requirement: Numeric conversion of zone ids is rejected
Converting any `ZoneId`, including `ZoneOffset`, a region id such as `Europe/Berlin` and the system
default zone, to a number SHALL throw a `TypeError`.

#### Scenario: Comparing offsets with an operator
- **WHEN** `ZoneOffset.ofHours(2) < ZoneOffset.ofHours(1)` is evaluated
- **THEN** a `TypeError` is thrown

#### Scenario: Region id
- **WHEN** `Number(ZoneId.of('UTC+01:00'))` or `Number(ZoneId.systemDefault())` is evaluated
- **THEN** a `TypeError` is thrown

### Requirement: Numeric conversion of temporal amounts is rejected
Converting a `Duration` or `Period` to a number SHALL keep throwing a `TypeError`.

#### Scenario: Comparing durations with an operator
- **WHEN** `Duration.ofHours(1) < Duration.ofHours(2)` is evaluated
- **THEN** a `TypeError` is thrown

### Requirement: The error names the alternatives
The `TypeError` message SHALL say that the conversion to a number is not allowed and name methods to
use instead, at least `.compareTo()`, `.isBefore()`/`.isAfter()` and `.equals()`, and `.value()` for
the enum-like classes.

#### Scenario: Message of a rejected comparison
- **WHEN** `Month.DECEMBER < Month.FEBRUARY` throws
- **THEN** the message mentions `.compareTo()`, `.equals()` and `.value()`

### Requirement: String conversion is unchanged
Converting a date-time object, temporal amount or zone id to a string, or with the `default` hint,
SHALL return its `toString()`. This covers `String(x)`, template literals, `+` with a string, and
loose equality `==` with a string.

#### Scenario: Template literal
- **WHEN** `` `${Month.MARCH}` `` is evaluated
- **THEN** the result is `MARCH`

#### Scenario: Concatenation and loose equality
- **WHEN** `'offset ' + ZoneOffset.ofHours(2)` and `ZoneOffset.ofHours(2) == '+02:00'` are evaluated
- **THEN** the results are `offset +02:00` and `true`

### Requirement: Environments without Symbol.toPrimitive
In environments without `Symbol.toPrimitive` (ECMAScript 5), loading the library SHALL NOT fail, and
conversions SHALL behave as before this change.

#### Scenario: ES5 environment
- **WHEN** the library is loaded where `Symbol` or `Symbol.toPrimitive` is undefined
- **THEN** no error is thrown at load time

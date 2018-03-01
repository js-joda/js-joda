Changelog
=========

### 1.6.3 (next)

#### public API

 * improve typescript definition (see PR #196)
 
#### dependency updates

### etc

 * Remove usage of call on constructors

### 1.6.2

#### public API

 * improve typescript definition (see PR #188)

#### internal API

 * add `DateTimeBuilder` to internal API

#### dependency updates

### 1.6.1

#### dependency updates

#### bugs

 * fix issue #166, bug from upstream project, parse zoned date time during overlap

### 1.6.0

#### public API

 * update API: export all public classes/interfaces
 * add `IsoChronology#date(temporal)` function
 * add export of "internal" APIs needed e.g. for plugins, these should *not* be used by users of the `js-joda` library.
   Since we do not consider these a public APIs, they may change without warning!
   These internal APIs are exported as the `_` object

### 1.5.5

#### bugs

 * fix Period.ofDays() if called with none number string values
 
#### public API

 * improve typescript definition

### 1.5.4

#### public API

 * fail if temporals ar created with float values 
 * fix typescript definition and esdoc 

#### dependency updates

### 1.5.2

#### public API

 * fix LocalDate.now in typescript definition and esdoc 
 * fix LocalTime static properties in typescript definition

### 1.5.1

#### public API

 * Add `use` function to typescript definition
 * Add `convert` function to typescript definition

### 1.5.0

#### public API

* Add toJSON methods where missing and useful
* Remove protected class DateTimeBuilder from esdoc and typescript definition

#### lint

* add linter rules `no-var`, `prefer-const`

#### dependency updates

### 1.4.0

#### public API

 * Remove private constructors, functions and classes from  typescript definition (see #134)

### 1.3.1

#### public API

 * Add `DateTimeFormatter.withResolverStyle` function

#### etc
 
 * Fix DateTimeFormatterBuilder.constructor esdoc/ typescript definition
 * Fix esdoc/ typescript definition for ZoneId
 * Remove private functions, classses and constructors from esdoc
 * unify the format pattern esdoc in `DateTimeFormatter.ofPattern` 
   and `DateTimeFormatterBuilder.appendPattern`, and add `u` Symbol to documentation
 
### 1.3.0

#### public API

 * export zone/ZoneOffsetTransition

### 1.2.0

#### iana tzdb

 * Complete parsing of ZoneRegions

#### etc

 * Fix bower.json
 * Fix LocalTime.parse esdoc/ typescript definition

#### dependency updates

### 1.1.17

#### Bugfixes

 * Improve LocalDateTime.toInstant error handling
 * Improve validation of LocalDate parameter values when passed as Strings
 
#### iana tzdb

 * First quick approach for parsing ZoneRegions
 
### 1.1.14

#### Add more classes to public export

 * add all error classes
 * add zone/ZoneRules
 
#### code cleanup

 * fix lint issues
 * fix ESDoc tags
 * Replace var by let/ const declaration

#### dependency updates

### 1.1.13

#### Add ZoneRulesProvider stub

Add the ZoneRulesProvider. This should be the last step to enable js-joda for an external js-joda-timezone plugin.

#### Provide a way to extend js-joda

[Implement a use function](https://github.com/js-joda/js-joda/pull/100#issuecomment-252425196)

### Bugfixes

 * Fix SystemDefaultZoneRules transition (fix a bug in convert and LocalDate.startOfDay)

### 1.1.12 

#### Implement daylight saving transition functionality

Complete / implement methods/ interfaces
- LocalDate.atStartOfDayWithZone
- ZonedDateTime.ofLocal
- ZonedDateTime.ofStrict
- ZonedDateTime.withEarlierOffsetAtOverlap
- ZonedDateTime.withLaterOffsetAtOverlap
- ZonedDateTime.until
- ZoneRules
- Pseudo zones for testing purpose

Increased test coverage for zone related classes

#### Test Coverage and more threetenbp Features

increased Test Coverage by adding/extending more tests from threetenbp 
but also adding own tests that increase the coverage. 

This also led to missing features implemented, e.g. more Fields in `DateTimeBuilder` being handled

#### Bugfixes

fixes found by extended Tests in
- `Duration`
- `DateTimeBuilder`
- `DateTimeFormatterBuilder`
- `YearMonth`

#### dependency updates

### 1.1.11

#### Typescript typings

make typescript definitions to be module definitions (see PR #86)

#### ESDoc Updates

fixed some warnings in esdoc build regarding signature mismatches (see PR #87)

#### Bugfixes

#### dependency updates

### 1.1.9

#### Typescript typings

added initial typescript typings (`.d.ts`) provided by [@spencerwi](https://github.com/spencerwi) and test based on the code from [CheatSheet](CheatSheet.md) to verify the typings 

#### Bugfixes

#### dependency updates
 * several dev dependency updates
  
### 1.1.8

last release without a CHANGELOG.md 

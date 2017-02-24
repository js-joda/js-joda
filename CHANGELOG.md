Changelog
=========

### 1.4.1 (next)

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

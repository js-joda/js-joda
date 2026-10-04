# @js-joda/timezone

[![npm version](https://badge.fury.io/js/%40js-joda%2Ftimezone.svg)](https://badge.fury.io/js/%40js-joda%2Ftimezone)
[![GH Actions Build Status](https://github.com/js-joda/js-joda/actions/workflows/tests.yaml/badge.svg?branch=main)](https://github.com/js-joda/js-joda/actions)
[![Coverage Status](https://coveralls.io/repos/js-joda/js-joda/badge.svg?branch=main&service=github)](https://coveralls.io/github/js-joda/js-joda?branch=main)
[![Downloads/Month](https://img.shields.io/npm/dm/%40js-joda%2Ftimezone.svg)](https://img.shields.io/npm/dm/%40js-joda%2Ftimezone.svg)


## Motivation

Implementation of the js-joda ZoneRulesProvider, providing the 
bindings to the iana tzdb. The zone data is generated from the official IANA releases by
[@js-joda/tzdb-builder](../tzdb-builder) in this repository.

The package doesn't export anything but it still has to be imported for side effects.

## Usage

### Node

Install joda using npm

    npm install @js-joda
    npm install @js-joda/timezone

### es5

    var jsJoda = require('@js-joda/core')
    require('@js-joda/timezone')
    
    var { LocalDateTime, ZoneId, ZonedDateTime } = jsJoda;
         
    LocalDateTime
        .parse('2016-06-30T11:30')
        .atZone(ZoneId.of('Europe/Berlin'))
        .toString()  // 2016-06-30T11:30+02:00[Europe/Berlin]
         
    ZonedDateTime
        .parse('2016-06-30T11:30+02:00[Europe/Berlin]') 
        .withZoneSameInstant(ZoneId.of('America/New_York'))
        .toString() // 2016-06-30T05:30-04:00[America/New_York]

    ZonedDateTime
        .parse('2016-06-30T11:30+02:00[Europe/Berlin]')
        .withZoneSameLocal(ZoneId.of('America/New_York'))
        .toString() // 2016-06-30T11:30-04:00[America/New_York]

### es6 / typescript

    import { ZonedDateTime, ZoneId } from '@js-joda/core'
    import '@js-joda/timezone'
    
    const zdt = ZonedDateTime.now(ZoneId.of('America/New_York'))

### Browser

    <script src="./packages/core/dist/js-joda.js"></script>
    <script src="./packages/timezone/dist/js-joda-timezone.js"></script>
    <script>
        // copy all js-joda classes to the global scope
        for(let key in JSJoda) { this[key] = JSJoda[key]; }
            
        LocalDateTime
            .parse('2016-06-30T11:30')
            .atZone(ZoneId.of('Europe/Berlin'))
            .toString()  // 2016-06-30T11:30+02:00[Europe/Berlin]
             
        ZonedDateTime
            .parse('2016-06-30T11:30+02:00[Europe/Berlin]') 
            .withZoneSameInstant(ZoneId.of('America/New_York'))
            .toString() // 2016-06-30T05:30-04:00[America/New_York]
    
        ZonedDateTime
            .parse('2016-06-30T11:30+02:00[Europe/Berlin]')
            .withZoneSameLocal(ZoneId.of('America/New_York'))
            .toString() // 2016-06-30T11:30-04:00[America/New_York]
    </script>

## Reducing js-joda-timezone file size
If you don't need all the historical data that @js-joda/timezone provides, you can instead use one of the reduced file size builds.
Each one contains the data for a range of years relative to the year the data was generated.
The years below are for the data generated in 2026; the sizes are of the minified browser build.

| Bundle | Covers | Years (2026 data) | Size (min / gzip) |
|---|---|---|---|
| `js-joda-timezone` | all years | all | 715 KB / 37 KB |
| `js-joda-timezone-300-year-range` | ± 150 years | 1876 to 2176 | 339 KB / 31 KB |
| `js-joda-timezone-lifetime-range` | - 120 / + 15 years | 1906 to 2041 | 177 KB / 25 KB |
| `js-joda-timezone-60-year-range` | ± 30 years | 1996 to 2056 | 87 KB / 13 KB |
| `js-joda-timezone-10-year-range` | ± 5 years | 2021 to 2031 | 32 KB / 9 KB |
| `js-joda-timezone-4-year-range` | ± 2 years | 2024 to 2028 | 29 KB / 8 KB |

The `-lifetime-range` bundle covers the birth dates of all living people plus 15 years ahead, e.g. for websites that
handle birth dates. Note that a birth date stored as a `LocalDate` needs no time zone data at all; the bundle is only
needed when you convert birth date-times between zones or determine today's date in a zone.

Every bundle comes as CommonJS (`.js`), ES module (`.esm.js`) and minified UMD for the browser (`.min.js`).
To use one of them, change the import path, e.g.:

    import '@js-joda/timezone/dist/js-joda-timezone-10-year-range'

or in the browser:

    <script src="./packages/timezone/dist/js-joda-timezone-10-year-range.min.js"></script>

Things to keep in mind when you pick a range:

* Outside its range, a reduced bundle gives **wrong offsets without any error**: before the range it uses the
  zone's first offset in the range, after it the zone's last one. For example, with the 4-year bundle,
  `Europe/Berlin` in July 2035 resolves to `+01:00` instead of `+02:00`. Choose a range that covers every
  date your application converts, including stored historical dates and future dates.
* The ranges move with the data: they are relative to the year a release's data was generated, not to the
  year your application runs. An older `@js-joda/timezone` version covers fewer years into the future.
* All bundles contain the same zone IDs; zones whose rules are identical within the range are shared as links.

The fixed-year bundles `js-joda-timezone-1970-2030`, `-2012-2022` and `-2017-2027` have been removed,
use the `-lifetime-range` or `-300-year-range` bundle (with the 2026 data, both cover 1970 onwards; see the table above), the `-60-year-range` bundle or the full bundle instead.

## Implementation details

* This ZoneRulesProvider implementation supplies all functionality that is required by the js-joda package.
* The [ZoneRules](https://js-joda.github.io/js-joda/esdoc/class/src/zone/ZoneRules.js~ZoneRules.html) of a zone also
  answer `standardOffset()`, `daylightSavings()`, `isDaylightSavings()`, `nextTransition()` and
  `previousTransition()` with the same results as java.time. The data uses the rearguard tzdb format, as
  ThreeTen-Backport does, so daylight saving is never negative:

      const rules = ZoneId.of('Europe/Berlin').rules();
      const summer = Instant.parse('2026-07-01T00:00:00Z');
      rules.standardOffset(summer).toString();   // '+01:00'
      rules.daylightSavings(summer).toString();  // 'PT1H'
      rules.isDaylightSavings(summer);           // true
      rules.nextTransition(summer).toString();   // 'Transition[Overlap at 2026-10-25T03:00+02:00 to +01:00]'

* `transitions()` and `transitionRules()` are not implemented and throw. In java.time they return the historic
  transitions and the recurring rules for the later years; the data of this package has explicit transitions
  through 2499 instead. Iterate with `nextTransition()` or `previousTransition()`.
* A reduced bundle answers these methods correctly only inside its range, like the offsets.
* `standardOffset()`, `daylightSavings()` and `isDaylightSavings()` need tz data with standard offsets, which the
  bundled data has. With older or custom data loaded with `ZoneRulesProvider.loadTzdbData()`, for example the
  versioned files `data/packed/2026d.json` and older, they throw; offsets and transitions still work.

## License

* @js-joda/timezone is released under the [BSD 3-clause license](LICENSE):

* The author of joda time and the lead architect of the JSR-310 is Stephen Colebourne.

* The json versions of the iana tzdb are generated with [@js-joda/tzdb-builder](../tzdb-builder) from the [IANA time zone database](https://www.iana.org/time-zones).
  The packed data format and its unpacking code originate from [moment-timezone](https://github.com/moment/moment-timezone) (MIT license).



# Convert from/ to native js

## Convert from Date to a js-joda temporal

use method `nativeJs` to convert from native javascript `Date` to a js-joda `Temporal`.

Hint: `nativeJs` accepts `moment` objects as well.

Be aware of that a moment and Date always represent a timestamp (a certain point in time with a timezone). 
Therefore, the most reasonable convert is to an `Instant` or `ZonedDateTime`.

```javascript
import { Instant, nativeJs } from '@js-joda/core';

const instant = Instant.from(nativeJs(new Date()))

// or with momentjs object
const instant = Instant.from(nativeJs(moment()))
```

## Convert from js-joda temporal to a Date

use method `convert` to convert a `LocalDate` | `LocalDateTime` | `ZonedDateTime` | `Instant` 
to javascript `Date`.

```javascript
const date = convert(ZonedDateTime.now()).toDate();
```

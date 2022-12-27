# Convert from/ to native js

## Convert from Date to a js-joda temporal

use method `nativeJs` to convert from native javascript `Date` to a js-joda `ZonedDateTime`.

Hint: `nativeJs` accepts `moment` objects as well.

Be aware of that a Date always represent a certain point in time _without_ a timezone.
You can provide one by passing it as a second argument.
Otherwise, `ZoneId.systemDefault()` will be used.

```javascript
import { ZonedDateTime, nativeJs } from '@js-joda/core';

const zonedDateTime = nativeJs(new Date());

// or with momentjs object
const zonedDateTime = nativeJs(moment());
```

## Convert from js-joda temporal to a Date

Use method `convert` to convert a `LocalDate` | `LocalDateTime` | `ZonedDateTime` | `Instant` 
to javascript `Date`.

```javascript
const date = convert(Instant.now()).toDate();
```

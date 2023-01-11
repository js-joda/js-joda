# Convert from/to Date

## Date -> Instant

To convert `Date` to `Instant`, use `date.toInstant()`.

```javascript
const date = new Date();
const instant = date.toInstant();
```

Add `ZoneId` and you will be able to easily obtain any other `Temporal`.

```javascript
const zonedDateTime = instant.atZone(ZoneId.systemDefault());
```

## Instant -> Date

To convert `Instant` to `Date`, use `Date.from(instant)`.

```javascript
const instant = Instant.now();
const date = Date.from(instant);
```

Note that most of `Temporal`s  can be converted to `Instant` in a single step.

```javascript
const zonedDateTime = ZonedDateTime.now();
const instant = zonedDateTime.toInstant();
```

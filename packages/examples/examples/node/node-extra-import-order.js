/* eslint-disable no-console */
/**
 * Demonstrates that the import order of @js-joda packages does not matter.
 * Both orderings below produce the same result.
 */

// --- Order A: timezone first, then extra, then core ---
{
    require('@js-joda/timezone');
    const { Interval } = require('@js-joda/extra');
    const { Duration, Instant, LocalDateTime, ZonedDateTime, ZoneId } = require('@js-joda/core');

    console.log('Order A (timezone → extra → core):');
    console.log(LocalDateTime.now().toString());
    console.log(ZonedDateTime.now(ZoneId.of('America/New_York')).toString());
    console.log(Interval.of(Instant.now(), Duration.ofMinutes(1)).toString());
}

// --- Order B: core first, then timezone, then extra ---
{
    const { Duration, Instant, LocalDateTime, ZonedDateTime, ZoneId } = require('@js-joda/core');
    require('@js-joda/timezone');
    const { Interval } = require('@js-joda/extra');

    console.log('Order B (core → timezone → extra):');
    console.log(LocalDateTime.now().toString());
    console.log(ZonedDateTime.now(ZoneId.of('America/New_York')).toString());
    console.log(Interval.of(Instant.now(), Duration.ofMinutes(1)).toString());
}

console.log('node-extra-import-order done');

import {Instant} from './Instant';
import {ZoneOffset} from './ZoneOffset';

/**
 * A clock providing access to the current instant, date and time using a time-zone.
 * <p>
 * Instances of this class are used to find the current instant, which can be
 * interpreted using the stored time-zone to find the current date and time.
 * As such, a clock can be used instead of {@link System#currentTimeMillis()}
 * and {@link TimeZone#getDefault()}.
 * <p>
 * Use of a {@code Clock} is optional. All key date-time classes also have a
 * {@code now()} factory method that uses the system clock in the default time zone.
 * The primary purpose of this abstraction is to allow alternate clocks to be
 * plugged in as and when required. Applications use an object to obtain the
 * current time rather than a static method. This can simplify testing.
 * <p>
 * Best practice for applications is to pass a {@code Clock} into any method
 * that requires the current instant.
 *
 * This approach allows an alternate clock, such as {@link #fixed(Instant, ZoneId) fixed}
 * or {@link #offset(Clock, Duration) offset} to be used during testing.
 * <p>
 * The {@code system} factory methods provide clocks based on the best available
 * system clock This may use {@link System#currentTimeMillis()}, or a higher
 * resolution clock if one is available.
 */

/**
 * The javascript Clock implementation differs from the openjdk.
 *
 * Javascript only provides the UTC millis of epoch and the ZoneOffset in minutes of the system default time.
 * Javascript do not provide the system default ZoneId.
 *
 * the system default ZoneId is only guessable by the ZoneOffset, like moment-timezone does by returning one ZoneId
 * with the same ZoneOffset.
 *
 * Therefore we are doing a shortcut here, by defining a SystemUTCClock and a SystemDefaultClock, the Clock itself
 * is returning the ZoneOffset and not the ZoneRules as in the jdk. We should change it, when introducing the iana
 * timezone database and implementing the timezone domains.
 *
 */

export class Clock {
    /**
     * Obtains a clock that returns the current instant using the
     * system clock, converting to date and time using the Date.getTime() UTC millis.
     * <p>
     * This clock, rather than {@link #systemDefaultZone()}, should be used when
     * you need the current instant without the date or time.
     * <p>
     * @return a clock that uses the system clock in the UTC zone, not null
     */
    static systemUTC() {
        return new SystemUTCClock();
    }

    /**
     * Obtains a clock that returns the current instant using the best available
     * system clock, converting to date and time using the default time-zone.
     * <p>
     * This clock is based on the available system clock using the Date.getTime() UTC millis
     * <p>
     * Using this method hard codes a dependency to the default time-zone into your application.
     *
     * The {@link #systemUTC() UTC clock} should be used when you need the current instant
     * without the date or time.
     * <p>
     *
     * @return a clock that uses the system clock in the default zone, not null
     * @see ZoneId#systemDefault()
     */
    static systemDefaultZone() {
        return new SystemDefaultClock();
    }

    /**
     * Obtains a clock that always returns the same instant.
     * <p>
     * This clock simply returns the specified instant.
     * As such, it is not a clock in the conventional sense.
     * The main use case for this is in testing, where the fixed clock ensures
     * tests are not dependent on the current clock.
     *
     * @param fixedInstant  the instant to use as the clock, not null
     * @param zoneOffset  the zoneOffset to use as zone Offset, not null
     * @return a clock that always returns the same instant, not null
     */
    static fixed(fixedInstant, zoneOffset) {
        return new FixedClock(fixedInstant, zoneOffset);
    }

    /**
      * Gets the current millisecond instant of the clock.
      * <p>
      * This returns the millisecond-based instant, measured from 1970-01-01T00:00Z (UTC).
      * This is equivalent to the definition of {@link Date#getTime()}.
      * <p>
      * Most applications should avoid this method and use {@link Instant} to represent
      * an instant on the time-line rather than a raw millisecond value.
      * This method is provided to allow the use of the clock in high performance use cases
      * where the creation of an object would be unacceptable.
      * <p>
      * The default implementation currently calls {@link #instant}.
      *
      * @return the current millisecond instant from this clock, measured from
      *  the Java epoch of 1970-01-01T00:00Z (UTC), not null
      */
    millis(){
        throw new TypeError('millis() function is not implemented');
    }

    /**
     * Gets the current instant of the clock.
     * <p>
     * This returns an instant representing the current instant as defined by the clock.
     *
     * @return the current instant from this clock, not null
     */
    instant(){
        throw new TypeError('instant() function is not implemented');
    }

    /**
     * in opposite to the jdk implementation the Clock itself returns the offset, that is because
     * javascript provides only the UTC and the "local" (system default time zone.
     * it is not possible the get the system default ZoneId without guessing. If we would define ZoneRules, we had to
     * define something like a virtual, not standard ZoneId like "SystemDefault".
     * Until we to not have a tzdb, we leave this question open
     */
    offset(){
        throw new TypeError('offset() function is not implemented');
    }
}

class SystemClock extends Clock {
    millis() {
        return new Date().getTime();
    }

    instant() {
        return Instant.ofEpochMilli(this.millis());
    }

    offset() {
        return ZoneOffset.ofTotalSeconds(0);
    }
}

/**
 * Implementation of a clock that always returns the latest time from
 * {@link Date#getTime()}.
 */
class SystemUTCClock extends SystemClock{
    toString(){
        return 'SystemClock[UTC]';
    }
}

/**
 * Implementation of a clock that always returns the latest time from
 * sytem default Zone {@link Date#getTime()} and {@link Date#getTimeZoneOffset()}.
 */
class SystemDefaultClock extends SystemClock{
    offset(instant) {
        var offsetInMinutes = new Date().getTimezoneOffset(instant.epochMilli());
        return ZoneOffset.ofTotalMinutes(offsetInMinutes);
    }

    toString(){
        return 'SystemClock[default]';
    }
}

/**
 * Implementation of a clock that always returns the same instant.
 * This is typically used for testing.
 */
class FixedClock extends Clock{
    constructor(fixedInstant, zoneOffset) {
        super();
        this._instant = fixedInstant;
        this._zoneOffset = zoneOffset;
    }

    instant() {
        return this._instant;
    }

    offset() {
        return this._zoneOffset;
    }

    toString(){
        return 'FixedClock[]';
    }
}


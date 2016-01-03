import {DateTimeException} from './errors'
import {MathUtil} from './MathUtil'
import {Clock} from './Clock'
import {LocalTime} from './LocalTime'

// TODO verify the arbitrary values for min/ max seconds, set to 999_999 Years for now
const MIN_SECONDS = -31619087596800; // -999999-01-01
const MAX_SECONDS = 31494784694400; // 999999-12-31

/**
 * An instantaneous point on the time-line.
 * 
 * This class models a single instantaneous point on the time-line.
 * This might be used to record event time-stamps in the application.
 * 
 * Time-scale
 * 
 * The length of the solar day is the standard way that humans measure time.
 * This has traditionally been subdivided into 24 hours of 60 minutes of 60 seconds,
 * forming a 86400 second day.
 * 
 * Modern timekeeping is based on atomic clocks which precisely define an SI second
 * relative to the transitions of a Caesium atom. The length of an SI second was defined
 * to be very close to the 86400th fraction of a day.
 * 
 * Unfortunately, as the Earth rotates the length of the day varies.
 * In addition, over time the average length of the day is getting longer as the Earth slows.
 * As a result, the length of a solar day in 2012 is slightly longer than 86400 SI seconds.
 * The actual length of any given day and the amount by which the Earth is slowing
 * are not predictable and can only be determined by measurement.
 * The UT1 time-scale captures the accurate length of day, but is only available some
 * time after the day has completed.
 * 
 * The UTC time-scale is a standard approach to bundle up all the additional fractions
 * of a second from UT1 into whole seconds, known as <i>leap-seconds</i>.
 * A leap-second may be added or removed depending on the Earth's rotational changes.
 * As such, UTC permits a day to have 86399 SI seconds or 86401 SI seconds where
 * necessary in order to keep the day aligned with the Sun.
 * 
 * The modern UTC time-scale was introduced in 1972, introducing the concept of whole leap-seconds.
 * Between 1958 and 1972, the definition of UTC was complex, with minor sub-second leaps and
 * alterations to the length of the notional second. As of 2012, discussions are underway
 * to change the definition of UTC again, with the potential to remove leap seconds or
 * introduce other changes.
 * 
 * Given the complexity of accurate timekeeping described above, this Java API defines
 * its own time-scale, the <i>Java Time-Scale</i>.
 * 
 * The Java Time-Scale divides each calendar day into exactly 86400
 * subdivisions, known as seconds.  These seconds may differ from the
 * SI second.  It closely matches the de facto international civil time
 * scale, the definition of which changes from time to time.
 * 
 * The Java Time-Scale has slightly different definitions for different
 * segments of the time-line, each based on the consensus international
 * time scale that is used as the basis for civil time. Whenever the
 * internationally-agreed time scale is modified or replaced, a new
 * segment of the Java Time-Scale must be defined for it.  Each segment
 * must meet these requirements:
 * <ul>
 * <li>the Java Time-Scale shall closely match the underlying international
 *  civil time scale;</li>
 * <li>the Java Time-Scale shall exactly match the international civil
 *  time scale at noon each day;</li>
 * <li>the Java Time-Scale shall have a precisely-defined relationship to
 *  the international civil time scale.</li>
 * </ul>
 * There are currently, as of 2013, two segments in the Java time-scale.
 * 
 * For the segment from 1972-11-03 (exact boundary discussed below) until
 * further notice, the consensus international time scale is UTC (with
 * leap seconds).  In this segment, the Java Time-Scale is identical to
 * <a href="http://www.cl.cam.ac.uk/~mgk25/time/utc-sls/">UTC-SLS</a>.
 * This is identical to UTC on days that do not have a leap second.
 * On days that do have a leap second, the leap second is spread equally
 * over the last 1000 seconds of the day, maintaining the appearance of
 * exactly 86400 seconds per day.
 * 
 * For the segment prior to 1972-11-03, extending back arbitrarily far,
 * the consensus international time scale is defined to be UT1, applied
 * proleptically, which is equivalent to the (mean) solar time on the
 * prime meridian (Greenwich). In this segment, the Java Time-Scale is
 * identical to the consensus international time scale. The exact
 * boundary between the two segments is the instant where UT1 = UTC
 * between 1972-11-03T00:00 and 1972-11-04T12:00.
 * 
 * Implementations of the Java time-scale using the JSR-310 API are not
 * required to provide any clock that is sub-second accurate, or that
 * progresses monotonically or smoothly. Implementations are therefore
 * not required to actually perform the UTC-SLS slew or to otherwise be
 * aware of leap seconds. JSR-310 does, however, require that
 * implementations must document the approach they use when defining a
 * clock representing the current instant.
 * See {@link Clock} for details on the available clocks.
 * 
 * The Java time-scale is used for all date-time classes.
 * This includes {@code Instant}, {@code LocalDate}, {@code LocalTime}, {@code OffsetDateTime},
 * {@code ZonedDateTime} and {@code Duration}.
 *
 */
export class Instant {

    constructor(seconds, nanoOfSecond){
        Instant.validate(seconds, nanoOfSecond);
        this._seconds = seconds;
        this._nanos = nanoOfSecond;
    }

    /**
     * Gets the number of seconds from the Java epoch of 1970-01-01T00:00:00Z.
     * 
     * The epoch second count is a simple incrementing count of seconds where
     * second 0 is 1970-01-01T00:00:00Z.
     * The nanosecond part of the day is returned by {@code getNanosOfSecond}.
     *
     * @return the seconds from the epoch of 1970-01-01T00:00:00Z
     */
    epochSecond(){
        return this._seconds
    }

    /**
     * Gets the number of milli seconds from the Java epoch of 1970-01-01T00:00:00Z.
     * 
     * The epoch milli second count is a simple incrementing count of milli seconds where
     * milli second 0 is 1970-01-01T00:00:00Z.
     *
     * @return the milli seconds from the epoch of 1970-01-01T00:00:00Z
     */
    epochMilli(){
        return this._seconds * 1000 + this._nanos / 1000000;
    }

    /**
     * Gets the number of nanoseconds, later along the time-line, from the start
     * of the second.
     * 
     * The nanosecond-of-second value measures the total number of nanoseconds from
     * the second returned by {@code getEpochSecond}.
     *
     * @return the nanoseconds within the second, always positive, never exceeds 999,999,999
     */
    nano(){
        return this._nanos
    }

    /**
     * Obtains the current instant from the system clock, or if specified
     * the current instant from the specified clock.
     *
     * This will query the specified clock to obtain the current time.
     *
     * @param clock  the clock to use, defaults to the system clock
     * @return the current instant, not null
     */
    static now(clock = Clock.systemUTC()){
        return clock.instant();
    }

    /**
     * Returns a copy of this instant with the specified duration in seconds added.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param secondsToAdd  the seconds to add, positive or negative
     * @return an {@code Instant} based on this instant with the specified seconds added, not null
     * @throws DateTimeException if the result exceeds the maximum or minimum instant
     */
    plusSeconds(secondsToAdd) {
        return this._plus(secondsToAdd, 0);
    }

    /**
     * Returns a copy of this instant with the specified duration in seconds subtracted.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param secondsToSubtract  the seconds to subtract, positive or negative
     * @return an {@code Instant} based on this instant with the specified seconds subtracted, not null
     * @throws DateTimeException if the result exceeds the maximum or minimum instant
     */
    minusSeconds(secondsToSubtract) {
        return this.plusSeconds(secondsToSubtract * -1);
    }

    /**
     * Returns a copy of this instant with the specified duration in nanoseconds added.
     * 
     * This instance is immutable and unaffected by this method call.
     *
     * @param nanosToAdd  the nanoseconds to add, positive or negative
     * @return an {@code Instant} based on this instant with the specified nanoseconds added, not null
     * @throws DateTimeException if the result exceeds the maximum or minimum instant
     */
    plusNanos(nanosToAdd) {
        return this._plus(0, nanosToAdd);
    }

    /**
     * Returns a copy of this instant with the specified duration added.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param secondsToAdd  the seconds to add, positive or negative
     * @param nanosToAdd  the nanos to add, positive or negative
     * @return an {@code Instant} based on this instant with the specified seconds added, not null
     * @throws DateTimeException if the result exceeds the maximum or minimum instant
     */
    _plus(secondsToAdd, nanosToAdd) {
        if ((secondsToAdd | nanosToAdd) == 0) {
            return this;
        }
        var epochSec = this._seconds + secondsToAdd;
        epochSec = epochSec + MathUtil.intDiv(nanosToAdd, LocalTime.NANOS_PER_SECOND);
        var _nanosToAdd = nanosToAdd % LocalTime.NANOS_PER_SECOND;
        var nanoAdjustment = this._nanos + _nanosToAdd;
        return Instant.ofEpochSecond(epochSec, nanoAdjustment);
    }

    /**
     * Checks if this instant is equal to the specified instant.
     * <p>
     * The comparison is based on the time-line position of the instants.
     *
     * @param otherInstant  the other instant, null/ undefined returns false
     * @return true if the other instant is equal to this one
     */
    equals(otherInstant) {
        if(this === otherInstant){
            return true;
        }
        if(otherInstant instanceof Instant){
            return this.epochSecond() === otherInstant.epochSecond() &&
                this.nano() === otherInstant.nano()
        }
        return false;
    }

    /**
     * Obtains an instance of {@code Instant} using seconds from the
     * epoch of 1970-01-01T00:00:00Z.
     *
     * @param epochSecond  the number of seconds from 1970-01-01T00:00:00Z
     * @param nanoAdjustment nanoseconds start from the start of epochSecond, if null the nanosecond field is set to zero.
     * @return an instant, not null
     * @throws DateTimeException if the instant exceeds the maximum or minimum instant
     */
    static ofEpochSecond(epochSecond, nanoAdjustment=0){
        var secs = epochSecond + MathUtil.floorDiv(nanoAdjustment, LocalTime.NANOS_PER_SECOND);
        var nos = MathUtil.floorMod(nanoAdjustment, LocalTime.NANOS_PER_SECOND);
        return Instant._create(secs, nos);
    }

    /**
     * Obtains an instance of {@code Instant} using milliseconds from the
     * epoch of 1970-01-01T00:00:00Z.
     * <p>
     * The seconds and nanoseconds are extracted from the specified milliseconds.
     *
     * @param epochMilli  the number of milliseconds from 1970-01-01T00:00:00Z
     * @return an instant, not null
     * @throws DateTimeException if the instant exceeds the maximum or minimum instant
     */
    static ofEpochMilli(epochMilli) {
        var secs = MathUtil.floorDiv(epochMilli, 1000);
        var mos = MathUtil.floorMod(epochMilli, 1000);
        return Instant._create(secs, mos * 1000000);
    }

    static _create(seconds, nanoOfSecond){
        if(seconds === 0 && nanoOfSecond === 0){
            return Instant.EPOCH;
        }
        return new Instant(seconds, nanoOfSecond);
    }

    static validate(seconds, nanoOfSecond){
        if (seconds < MIN_SECONDS || seconds > MAX_SECONDS) {
            throw new DateTimeException("Instant exceeds minimum or maximum instant")
        }
    }
}

Instant.EPOCH = new Instant(0,0);
Instant.MIN = Instant.ofEpochSecond(MIN_SECONDS, 0);
Instant.MAX = Instant.ofEpochSecond(MAX_SECONDS, 999999999);

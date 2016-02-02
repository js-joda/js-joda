/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {ChronoField} from './temporal/ChronoField';
import {ChronoUnit} from './temporal/ChronoUnit';
import {Clock} from './Clock';
import {DateTimeException, UnsupportedTemporalTypeException} from './errors';
import {LocalTime} from './LocalTime';
import {MathUtil} from './MathUtil';
import {TemporalAccessor} from './temporal/TemporalAccessor';

// TODO verify the arbitrary values for min/ max seconds, set to 999_999 Years for now
const MIN_SECONDS = -31619087596800; // -999999-01-01
const MAX_SECONDS = 31494784694400; // 999999-12-31
const NANOS_PER_MILLI = 1000000;

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
export class Instant extends TemporalAccessor {
    
    constructor(seconds, nanoOfSecond){
        super();
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
        return this._seconds;
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
        return this._nanos;
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
                this.nano() === otherInstant.nano();
        }
        return false;
    }
    
    /**
     * Calculates the period between this instant and another instant in
     * terms of the specified unit.
     * <p>
     * This calculates the period between two instants in terms of a single unit.
     * The start and end points are {@code this} and the specified instant.
     * The result will be negative if the end is before the start.
     * The calculation returns a whole number, representing the number of
     * complete units between the two instants.
     * The {@code Temporal} passed to this method is converted to a
     * {@code Instant} using {@link #from(TemporalAccessor)}.
     * For example, the period in days between two dates can be calculated
     * using {@code startInstant.until(endInstant, SECONDS)}.
     * <p>
     * This method operates in association with {@link TemporalUnit#between}.
     * The result of this method is a {@code long} representing the amount of
     * the specified unit. By contrast, the result of {@code between} is an
     * object that can be used directly in addition/subtraction:
     * <pre>
     *   long period = start.until(end, SECONDS);   // this method
     *   dateTime.plus(SECONDS.between(start, end));      // use in plus/minus
     * </pre>
     * <p>
     * The calculation is implemented in this method for {@link ChronoUnit}.
     * The units {@code NANOS}, {@code MICROS}, {@code MILLIS}, {@code SECONDS},
     * {@code MINUTES}, {@code HOURS}, {@code HALF_DAYS} and {@code DAYS}
     * are supported. Other {@code ChronoUnit} values will throw an exception.
     * <p>
     * If the unit is not a {@code ChronoUnit}, then the result of this method
     * is obtained by invoking {@code TemporalUnit.between(Temporal, Temporal)}
     * passing {@code this} as the first argument and the input temporal as
     * the second argument.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Temporal} endExclusive  the end date, which is converted to an {@code Instant}, not null
     * @param {TemporalUnit} unit  the unit to measure the period in, not null
     * @return {Number} the amount of the period between this date and the end date
     * @throws DateTimeException if the period cannot be calculated
     * @throws ArithmeticException if numeric overflow occurs
     */
    until(endExclusive, unit) {
        let end = Instant.from(endExclusive);
        if (unit instanceof ChronoUnit) {
            switch (unit) {
                case ChronoUnit.NANOS: return this._nanosUntil(end);
                case ChronoUnit.MICROS: return this._nanosUntil(end) / 1000;
                case ChronoUnit.MILLIS: return MathUtil.safeSubtract(end.toEpochMilli(), this.toEpochMilli());
                case ChronoUnit.SECONDS: return this._secondsUntil(end);
                case ChronoUnit.MINUTES: return MathUtil.intDiv(this._secondsUntil(end), LocalTime.SECONDS_PER_MINUTE);
                case ChronoUnit.HOURS: return MathUtil.intDiv(this._secondsUntil(end), LocalTime.SECONDS_PER_HOUR);
                case ChronoUnit.HALF_DAYS: return MathUtil.intDiv(this._secondsUntil(end), (12 * LocalTime.SECONDS_PER_HOUR));
                case ChronoUnit.DAYS: return MathUtil.intDiv(this._secondsUntil(end), LocalTime.SECONDS_PER_DAY);
            }
            throw new UnsupportedTemporalTypeException('Unsupported unit: ' + unit);
        }
        return unit.between(this, end);
    }

    _nanosUntil(end) {
        let secsDiff = MathUtil.safeSubtract(end.epochSecond(), this.epochSecond());
        let totalNanos = MathUtil.safeMultiply(secsDiff, LocalTime.NANOS_PER_SECOND);
        return MathUtil.safeAdd(totalNanos, end.nano() - this.nano());
    }

    _secondsUntil(end) {
        let secsDiff = MathUtil.safeSubtract(end.epochSecond(), this.epochSecond());
        let nanosDiff = end.nano() - this.nano();
        if (secsDiff > 0 && nanosDiff < 0) {
            secsDiff--;
        } else if (secsDiff < 0 && nanosDiff > 0) {
            secsDiff++;
        }
        return secsDiff;
    }

    /**
     * Gets the value of the specified field from this instant as an {@code int}.
     * <p>
     * This queries this instant for the value for the specified field.
     * The returned value will always be within the valid range of values for the field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * <p>
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link #isSupported(TemporalField) supported fields} will return valid
     * values based on this date-time, except {@code INSTANT_SECONDS} which is too
     * large to fit in an {@code int} and throws a {@code DateTimeException}.
     * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
     * passing {@code this} as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param {TemporalField} field  the field to get, not null
     * @return {Number} the value for the field
     * @throws DateTimeException if a value for the field cannot be obtained
     * @throws ArithmeticException if numeric overflow occurs
     */
    get(field) {
        if (field instanceof ChronoField) {
            switch (field) {
                case ChronoField.NANO_OF_SECOND: return this._nanos;
                case ChronoField.MICRO_OF_SECOND: return MathUtil.intDiv(this._nanos, 1000);
                case ChronoField.MILLI_OF_SECOND: return MathUtil.intDiv(this._nanos, NANOS_PER_MILLI);
                case ChronoField.INSTANT_SECONDS:
                    ChronoField.INSTANT_SECONDS.checkValidIntValue(this._seconds);
            }
            throw new UnsupportedTemporalTypeException('Unsupported field: ' + field);
        }
        return this.range(field).checkValidIntValue(field.getFrom(this), field);
    }

    /**
     * Gets the value of the specified field from this instant as a {@code long}.
     * <p>
     * This queries this instant for the value for the specified field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * <p>
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link #isSupported(TemporalField) supported fields} will return valid
     * values based on this date-time.
     * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
     * passing {@code this} as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param {TemporalField} field  the field to get, not null
     * @return {Number} the value for the field
     * @throws DateTimeException if a value for the field cannot be obtained
     * @throws ArithmeticException if numeric overflow occurs
     */
    getLong(field) {
        if (field instanceof ChronoField) {
            switch (field) {
                case ChronoField.NANO_OF_SECOND: return this._nanos;
                case ChronoField.MICRO_OF_SECOND: return MathUtil.intDiv(this._nanos, 1000);
                case ChronoField.MILLI_OF_SECOND: return MathUtil.intDiv(this._nanos, NANOS_PER_MILLI);
                case ChronoField.INSTANT_SECONDS: return this._seconds;
            }
            throw new UnsupportedTemporalTypeException('Unsupported field: ' + field);
        }
        return field.getFrom(this);
    }
    
    /**
     * Checks if the specified field is supported.
     * <p>
     * This checks if this instant can be queried for the specified field.
     * If false, then calling the {@link #range(TemporalField) range} and
     * {@link #get(TemporalField) get} methods will throw an exception.
     * <p>
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The supported fields are:
     * <ul>
     * <li>{@code NANO_OF_SECOND}
     * <li>{@code MICRO_OF_SECOND}
     * <li>{@code MILLI_OF_SECOND}
     * <li>{@code INSTANT_SECONDS}
     * </ul>
     * All other {@code ChronoField} instances will return false.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.isSupportedBy(TemporalAccessor)}
     * passing {@code this} as the argument.
     * Whether the field is supported is determined by the field.
     *
     * @param {TemporalField, TemporalUnit} fieldOrUnit  the field to check, null returns false
     * @return true if the field is supported on this instant, false if not
     */
    isSupported(fieldOrUnit) {
        if (fieldOrUnit instanceof ChronoField) {
            return fieldOrUnit === ChronoField.INSTANT_SECONDS || fieldOrUnit === ChronoField.NANO_OF_SECOND || fieldOrUnit === ChronoField.MICRO_OF_SECOND || fieldOrUnit === ChronoField.MILLI_OF_SECOND;
        }
        if (fieldOrUnit instanceof ChronoUnit) {
            return fieldOrUnit.isTimeBased() || fieldOrUnit === ChronoUnit.DAYS;
        }
        return fieldOrUnit != null && fieldOrUnit.isSupportedBy(this);
    }

    /**
     * Obtains an instance of {@code Instant} from a temporal object.
     * <p>
     * A {@code TemporalAccessor} represents some form of date and time information.
     * This factory converts the arbitrary temporal object to an instance of {@code Instant}.
     * <p>
     * The conversion extracts the {@link ChronoField#INSTANT_SECONDS INSTANT_SECONDS}
     * and {@link ChronoField#NANO_OF_SECOND NANO_OF_SECOND} fields.
     * <p>
     * This method matches the signature of the functional interface {@link TemporalQuery}
     * allowing it to be used as a query via method reference, {@code Instant::from}.
     *
     * @param {TemporalAccessor} temporal  the temporal object to convert, not null
     * @return {Instant} the instant, not null
     * @throws DateTimeException if unable to convert to an {@code Instant}
     */
    static from(temporal) {
        try {
            let instantSecs = temporal.getLong(ChronoField.INSTANT_SECONDS);
            let nanoOfSecond = temporal.get(ChronoField.NANO_OF_SECOND);
            return Instant.ofEpochSecond(instantSecs, nanoOfSecond);
        } catch (ex) {
            throw new DateTimeException('Unable to obtain Instant from TemporalAccessor: ' +
                    temporal + ', type ' + typeof temporal, ex);
        }
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
            throw new DateTimeException('Instant exceeds minimum or maximum instant');
        }
    }
}

Instant.EPOCH = new Instant(0,0);
Instant.MIN = Instant.ofEpochSecond(MIN_SECONDS, 0);
Instant.MAX = Instant.ofEpochSecond(MAX_SECONDS, 999999999);

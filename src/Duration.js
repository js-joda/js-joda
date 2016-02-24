/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {requireNonNull, requireInstance} from './assert';
import {ArithmeticException, DateTimeParseException, UnsupportedTemporalTypeException} from './errors';
import {MathUtil, MAX_SAFE_INTEGER, MIN_SAFE_INTEGER} from './MathUtil';

import {ChronoField} from './temporal/ChronoField';
import {ChronoUnit} from './temporal/ChronoUnit';
import {TemporalAmount} from './temporal/TemporalAmount';

import {LocalTime} from './LocalTime';

/**
 * A time-based amount of time, such as '34.5 seconds'.
 * <p>
 * This class models a quantity or amount of time in terms of seconds and nanoseconds.
 * It can be accessed using other duration-based units, such as minutes and hours.
 * In addition, the {@link ChronoUnit#DAYS DAYS} unit can be used and is treated as
 * exactly equal to 24 hours, thus ignoring daylight savings effects.
 * See {@link Period} for the date-based equivalent to this class.
 * <p>
 * A physical duration could be of infinite length.
 * For practicality, the duration is stored with constraints similar to {@link Instant}.
 * The duration uses nanosecond resolution with a maximum value of the seconds that can
 * be held in a {@code long}. This is greater than the current estimated age of the universe.
 * <p>
 * The range of a duration requires the storage of a number larger than a {@code long}.
 * To achieve this, the class stores a {@code long} representing seconds and an {@code int}
 * representing nanosecond-of-second, which will always be between 0 and 999,999,999.
 * <p>
 * The duration is measured in "seconds", but these are not necessarily identical to
 * the scientific "SI second" definition based on atomic clocks.
 * This difference only impacts durations measured near a leap-second and should not affect
 * most applications.
 * See {@link Instant} for a discussion as to the meaning of the second and time-scales.
 *
 * <h3>Static properties of Class {@link Duration}</h3>
 *
 * Duration.ZERO
 *
 * Constant for a duration of zero.
 *
 */
export class Duration extends TemporalAmount
        /*implements TemporalAmount, Comparable<Duration>, Serializable */ {

    /**
     * Constructs an instance of {@code Duration} using seconds and nanoseconds.
     *
     * @param {Number} seconds  the length of the duration in seconds, positive or negative
     * @param {Number} nanos  the nanoseconds within the second, from 0 to 999,999,999
     */
    //TODO: private ? 
    constructor(seconds, nanos) {
        super();
        this._seconds = seconds;
        this._nanos = nanos;
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@code Duration} from a number of standard 24 hour days.
     * <p>
     * The seconds are calculated based on the standard definition of a day,
     * where each day is 86400 seconds which implies a 24 hour day.
     * The nanosecond in second field is set to zero.
     *
     * @param {Number} days  the number of days, positive or negative
     * @return {@code Duration}, not null
     * @throws ArithmeticException if the input days exceeds the capacity of {@code Duration}
     */
    static ofDays(days) {
        return Duration.create(MathUtil.safeMultiply(days, LocalTime.SECONDS_PER_DAY), 0);
    }

    /**
     * Obtains an instance of {@code Duration} from a number of standard hours.
     * <p>
     * The seconds are calculated based on the standard definition of an hour,
     * where each hour is 3600 seconds.
     * The nanosecond in second field is set to zero.
     *
     * @param {Number} hours  the number of hours, positive or negative
     * @return {@code Duration}, not null
     * @throws ArithmeticException if the input hours exceeds the capacity of {@code Duration}
     */
    static ofHours(hours) {
        return Duration.create(MathUtil.safeMultiply(hours, LocalTime.SECONDS_PER_HOUR), 0);
    }

    /**
     * Obtains an instance of {@code Duration} from a number of standard minutes.
     * <p>
     * The seconds are calculated based on the standard definition of a minute,
     * where each minute is 60 seconds.
     * The nanosecond in second field is set to zero.
     *
     * @param {Number} minutes  the number of minutes, positive or negative
     * @return {@code Duration}, not null
     * @throws ArithmeticException if the input minutes exceeds the capacity of {@code Duration}
     */
    static ofMinutes(minutes) {
        return Duration.create(MathUtil.safeMultiply(minutes, LocalTime.SECONDS_PER_MINUTE), 0);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@code Duration} from a number of seconds
     * and an adjustment in nanoseconds.
     * <p>
     * This method allows an arbitrary number of nanoseconds to be passed in.
     * The factory will alter the values of the second and nanosecond in order
     * to ensure that the stored nanosecond is in the range 0 to 999,999,999.
     * For example, the following will result in the exactly the same duration:
     * <pre>
     *  Duration.ofSeconds(3, 1);
     *  Duration.ofSeconds(4, -999_999_999);
     *  Duration.ofSeconds(2, 1000_000_001);
     * </pre>
     *
     * @param {Number} seconds  the number of seconds, positive or negative
     * @param {Number} nanoAdjustment  the nanosecond adjustment to the number of seconds, positive or negative
     * @return {@code Duration}, not null
     * @throws ArithmeticException if the adjustment causes the seconds to exceed the capacity of {@code Duration}
     */
    static ofSeconds(seconds, nanoAdjustment = 0) {
        var secs = MathUtil.safeAdd(seconds, MathUtil.floorDiv(nanoAdjustment, LocalTime.NANOS_PER_SECOND));
        var nos = MathUtil.floorMod(nanoAdjustment, LocalTime.NANOS_PER_SECOND);
        return Duration.create(secs, nos);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@code Duration} from a number of milliseconds.
     * <p>
     * The seconds and nanoseconds are extracted from the specified milliseconds.
     *
     * @param {Number} millis  the number of milliseconds, positive or negative
     * @return {@code Duration}, not null
     */
    static ofMillis(millis) {
        var secs = MathUtil.intDiv(millis, 1000);
        var mos = MathUtil.intMod(millis, 1000);
        if (mos < 0) {
            mos += 1000;
            secs--;
        }
        return Duration.create(secs, mos * 1000000);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@code Duration} from a number of nanoseconds.
     * <p>
     * The seconds and nanoseconds are extracted from the specified nanoseconds.
     *
     * @param {Number} nanos  the number of nanoseconds, positive or negative
     * @return {@code Duration}, not null
     */
    static ofNanos(nanos) {
        var secs = MathUtil.intDiv(nanos, LocalTime.NANOS_PER_SECOND);
        var nos = MathUtil.intMod(nanos, LocalTime.NANOS_PER_SECOND);
        if (nos < 0) {
            nos += LocalTime.NANOS_PER_SECOND;
            secs--;
        }
        return this.create(secs, nos);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@code Duration} from a duration in the specified unit.
     * <p>
     * The parameters represent the two parts of a phrase like '6 Hours'. For example:
     * <pre>
     *  Duration.of(3, SECONDS);
     *  Duration.of(465, HOURS);
     * </pre>
     * Only a subset of units are accepted by this method.
     * The unit must either have an {@link TemporalUnit#isDurationEstimated() exact duration} or
     * be {@link ChronoUnit#DAYS} which is treated as 24 hours. Other units throw an exception.
     *
     * @param {Number} amount  the amount of the duration, measured in terms of the unit, positive or negative
     * @param {TemporalUnit} unit  the unit that the duration is measured in, must have an exact duration, not null
     * @return {@code Duration}, not null
     * @throws DateTimeException if the period unit has an estimated duration
     * @throws ArithmeticException if a numeric overflow occurs
     */
    static of(amount, unit) {
        return Duration.ZERO.plus(amount, unit);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@code Duration} from an amount.
     * <p>
     * This obtains a duration based on the specified amount.
     * A TemporalAmount represents an amount of time, which may be date-based
     * or time-based, which this factory extracts to a duration.
     * <p>
     * The conversion loops around the set of units from the amount and uses
     * the duration of the unit to calculate the total Duration.
     * Only a subset of units are accepted by this method.
     * The unit must either have an exact duration or be ChronoUnit.DAYS which
     * is treated as 24 hours. If any other units are found then an exception is thrown.
     *
     * @param {Number} amount  the temporal amount to convert, not null
     * @return {Duration} the resulting duration, not null
     * @throws DateTimeException if the amount cannot be converted
     * @throws ArithmeticException if a numeric overflow occurs
     */
    static from(amount) {
        requireNonNull(amount, 'amount');
        var duration = Duration.ZERO;
        amount.units().forEach((unit) => {
            duration = duration.plus(amount.get(unit), unit);
        });
        return duration;
    }
    
    /**
     * Obtains an instance of {@code Duration} representing the duration between two instants.
     * <p>
     * Obtains a {@code Duration} representing the duration between two instants.
     * This calculates the duration between two temporal objects of the same type.
     * The difference in seconds is calculated using {@link Temporal#until(Temporal, TemporalUnit)}.
     * The difference in nanoseconds is calculated using by querying the
     * {@link ChronoField#NANO_OF_SECOND NANO_OF_SECOND} field.
     * <p>
     * The result of this method can be a negative period if the end is before the start.
     * To guarantee to obtain a positive duration call abs() on the result.
     *
     * @param {Temporal} startInclusive  the start instant, inclusive, not null
     * @param {Temporal} endExclusive  the end instant, exclusive, not null
     * @return {@code Duration}, not null
     * @throws DateTimeException if the seconds between the temporals cannot be obtained
     * @throws ArithmeticException if the calculation exceeds the capacity of {@code Duration}
     */
    static between(startInclusive, endExclusive) {
        requireNonNull(startInclusive, 'startInclusive');
        requireNonNull(endExclusive, 'endExclusive');
        var secs = startInclusive.until(endExclusive, ChronoUnit.SECONDS);
        var nanos = 0;
        if (startInclusive.isSupported(ChronoField.NANO_OF_SECOND) && endExclusive.isSupported(ChronoField.NANO_OF_SECOND)) {
            try {
                let startNos = startInclusive.getLong(ChronoField.NANO_OF_SECOND);
                nanos = endExclusive.getLong(ChronoField.NANO_OF_SECOND) - startNos;
                if (secs > 0 && nanos < 0) {
                    nanos += LocalTime.NANOS_PER_SECOND;
                } else if (secs < 0 && nanos > 0) {
                    nanos -= LocalTime.NANOS_PER_SECOND;
                } else if (secs === 0 && nanos !== 0) {
                    // two possible meanings for result, so recalculate secs
                    let adjustedEnd = endExclusive.with(ChronoField.NANO_OF_SECOND, startNos);
                    secs = startInclusive.until(adjustedEnd, ChronoUnit.SECONDS);
                }
            } catch (e) {
                // ignore and only use seconds
            }
        }
        return this.ofSeconds(secs, nanos);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains a {@code Duration} from a text string such as {@code PnDTnHnMn.nS}.
     * <p>
     * This will parse a textual representation of a duration, including the
     * string produced by {@code toString()}. The formats accepted are based
     * on the ISO-8601 duration format {@code PnDTnHnMn.nS} with days
     * considered to be exactly 24 hours.
     * <p>
     * The string starts with an optional sign, denoted by the ASCII negative
     * or positive symbol. If negative, the whole period is negated.
     * The ASCII letter "P" is next in upper or lower case.
     * There are then four sections, each consisting of a number and a suffix.
     * The sections have suffixes in ASCII of "D", "H", "M" and "S" for
     * days, hours, minutes and seconds, accepted in upper or lower case.
     * The suffixes must occur in order. The ASCII letter "T" must occur before
     * the first occurrence, if any, of an hour, minute or second section.
     * At least one of the four sections must be present, and if "T" is present
     * there must be at least one section after the "T".
     * The number part of each section must consist of one or more ASCII digits.
     * The number may be prefixed by the ASCII negative or positive symbol.
     * The number of days, hours and minutes must parse to a {@code long}.
     * The number of seconds must parse to a {@code long} with optional fraction.
     * The decimal point may be either a dot or a comma.
     * The fractional part may have from zero to 9 digits.
     * <p>
     * The leading plus/minus sign, and negative values for other units are
     * not part of the ISO-8601 standard.
     * <p>
     * Examples:
     * <pre>
     *    "PT20.345S" -> parses as "20.345 seconds"
     *    "PT15M"     -> parses as "15 minutes" (where a minute is 60 seconds)
     *    "PT10H"     -> parses as "10 hours" (where an hour is 3600 seconds)
     *    "P2D"       -> parses as "2 days" (where a day is 24 hours or 86400 seconds)
     *    "P2DT3H4M"  -> parses as "2 days, 3 hours and 4 minutes"
     *    "P-6H3M"    -> parses as "-6 hours and +3 minutes"
     *    "-P6H3M"    -> parses as "-6 hours and -3 minutes"
     *    "-P-6H+3M"  -> parses as "+6 hours and -3 minutes"
     * </pre>
     *
     * @param {String} text  the text to parse, not null
     * @return {Duration} the parsed duration, not null
     * @throws DateTimeParseException if the text cannot be parsed to a duration
     */
    static parse(text) {
        requireNonNull(text, 'text');
        /**
         * The pattern for parsing.
         */
        const PATTERN = new RegExp('([-+]?)P(?:([-+]?[0-9]+)D)?(T(?:([-+]?[0-9]+)H)?(?:([-+]?[0-9]+)M)?(?:([-+]?[0-9]+)(?:[.,]([0-9]{0,9}))?S)?)?', 'i');
        var matches = PATTERN.exec(text);
        if (matches !== null) {
            // check for letter T but no time sections
            if ('T' === matches[3] === false) {
                var negate = '-' === matches[1];
                var dayMatch = matches[2];
                var hourMatch = matches[4];
                var minuteMatch = matches[5];
                var secondMatch = matches[6];
                var fractionMatch = matches[7];
                if (dayMatch != null || hourMatch != null || minuteMatch != null || secondMatch != null) {
                    var daysAsSecs = Duration._parseNumber(text, dayMatch, LocalTime.SECONDS_PER_DAY, 'days');
                    var hoursAsSecs = Duration._parseNumber(text, hourMatch, LocalTime.SECONDS_PER_HOUR, 'hours');
                    var minsAsSecs = Duration._parseNumber(text, minuteMatch, LocalTime.SECONDS_PER_MINUTE, 'minutes');
                    var seconds = Duration._parseNumber(text, secondMatch, 1, 'seconds');
                    var negativeSecs = secondMatch != null && secondMatch.charAt(0) === '-';
                    var nanos = Duration._parseFraction(text,  fractionMatch, negativeSecs ? -1 : 1);
                    try {
                        return Duration.create(negate, daysAsSecs, hoursAsSecs, minsAsSecs, seconds, nanos);
                    } catch (ex) {
                        throw new DateTimeParseException('Text cannot be parsed to a Duration: overflow', text, 0, ex);
                    }
                }
            }
        }
        throw new DateTimeParseException('Text cannot be parsed to a Duration', text, 0);
    }

    static _parseNumber(text, parsed, multiplier, errorText) {
        // regex limits to [-+]?[0-9]+
        if (parsed == null) {
            return 0;
        }
        try {
            if (parsed[0] === '+') {
                parsed = parsed.substring(1);
            }
            var val = parseFloat(parsed);
            return MathUtil.safeMultiply(val, multiplier);
        } catch (ex) {
            throw new DateTimeParseException('Text cannot be parsed to a Duration: ' + errorText, text, 0, ex);
        }
    }

    static _parseFraction(text, parsed, negate) {
        // regex limits to [0-9]{0,9}
        if (parsed == null || parsed.length === 0) {
            return 0;
        }
        try {
            parsed = (parsed + '000000000').substring(0, 9);
            return parseFloat(parsed) * negate;
        } catch (ex) {
            throw new DateTimeParseException('Text cannot be parsed to a Duration: fraction', text, 0, ex);
        }
    }

    //-----------------------------------------------------------------------
    /**
     * to handle function overriding this function accepts any number of arguments, checks their type and delegates to the appropriate function
     *
     * @return {Duration}
     */
    static create() {
        if (arguments.length === 1) {
            return Duration.createSeconds(arguments[0]);
        } else if (arguments.length === 2) {
            return Duration.createSecondsNanos(arguments[0], arguments[1]);
        } else {
            return Duration.createNegateDaysHoursMinutesSecondsNanos(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
    }

    static createNegateDaysHoursMinutesSecondsNanos(negate, daysAsSecs, hoursAsSecs, minsAsSecs, secs, nanos) {
        var seconds = MathUtil.safeAdd(daysAsSecs, MathUtil.safeAdd(hoursAsSecs, MathUtil.safeAdd(minsAsSecs, secs)));
        if (negate) {
            return Duration.ofSeconds(seconds, nanos).negated();
        }
        return Duration.ofSeconds(seconds, nanos);
    }

    /**
     * Obtains an instance of {@code Duration} using seconds and nanoseconds.
     *
     * @param {Number} seconds  the length of the duration in seconds, positive or negative
     * @param {Number} nanoAdjustment  the nanosecond adjustment within the second, from 0 to 999,999,999
     */
    static createSecondsNanos(seconds = 0, nanoAdjustment = 0) {
        if ((seconds | nanoAdjustment) === 0) {
            return Duration.ZERO;
        }
        // if seconds is a float, we need to adjust the nanos from it as well
        if (seconds >= 0) {
            nanoAdjustment += seconds % 1 * LocalTime.NANOS_PER_SECOND;
        } else {
            nanoAdjustment -= seconds % 1 * LocalTime.NANOS_PER_SECOND;
        }
        seconds = Math.floor(seconds);
        nanoAdjustment = Math.round(nanoAdjustment);

        return new Duration(seconds, nanoAdjustment);
    }
    
    /**
     * Creates an instance of {@code Duration} from a number of seconds.
     *
     * @param {Number} seconds  the number of seconds, up to scale 9, positive or negative
     * @return {Duration}, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    static createSeconds(seconds) {
        let nanos = Math.round(seconds * Math.pow(10, 9));
        let div = MathUtil.intDiv(nanos, LocalTime.NANOS_PER_SECOND);
        let rem = MathUtil.intMod(nanos, LocalTime.NANOS_PER_SECOND);
        return Duration.ofSeconds(div, rem);
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the value of the requested unit.
     * <p>
     * This returns a value for each of the two supported units,
     * {@link ChronoUnit#SECONDS SECONDS} and {@link ChronoUnit#NANOS NANOS}.
     * All other units throw an exception.
     *
     * @param {TemporalUnit} unit the {@code TemporalUnit} for which to return the value
     * @return {Number} the var value of the unit
     * @throws DateTimeException if the unit is not supported
     * @throws UnsupportedTemporalTypeException if the unit is not supported
     */
    get(unit) {
        if (unit === ChronoUnit.SECONDS) {
            return this._seconds;
        } else if (unit === ChronoUnit.NANOS) {
            return this._nanos;
        } else {
            throw new UnsupportedTemporalTypeException('Unsupported unit: ' + unit);
        }
    }

    units() {
        return [ChronoUnit.SECONDS, ChronoUnit.NANOS];
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this duration is zero length.
     * <p>
     * A {@code Duration} represents a directed distance between two points on
     * the time-line and can therefore be positive, zero or negative.
     * This method checks whether the length is zero.
     *
     * @return {boolean} true if this duration has a total length equal to zero
     */
    isZero() {
        return (this._seconds | this._nanos) === 0;
    }

    /**
     * Checks if this duration is negative, excluding zero.
     * <p>
     * A {@code Duration} represents a directed distance between two points on
     * the time-line and can therefore be positive, zero or negative.
     * This method checks whether the length is less than zero.
     *
     * @return {boolean} true if this duration has a total length less than zero
     */
    isNegative() {
        return this._seconds < 0;
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the number of seconds in this duration.
     * <p>
     * The length of the duration is stored using two fields - seconds and nanoseconds.
     * The nanoseconds part is a value from 0 to 999,999,999 that is an adjustment to
     * the length in seconds.
     * The total duration is defined by calling this method and {@link #getNano()}.
     * <p>
     * A {@code Duration} represents a directed distance between two points on the time-line.
     * A negative duration is expressed by the negative sign of the seconds part.
     * A duration of -1 nanosecond is stored as -1 seconds plus 999,999,999 nanoseconds.
     *
     * @return {Number} the whole seconds part of the length of the duration, positive or negative
     */
    seconds() {
        return this._seconds;
    }

    /**
     * Gets the number of nanoseconds within the second in this duration.
     * <p>
     * The length of the duration is stored using two fields - seconds and nanoseconds.
     * The nanoseconds part is a value from 0 to 999,999,999 that is an adjustment to
     * the length in seconds.
     * The total duration is defined by calling this method and {@link #getSeconds()}.
     * <p>
     * A {@code Duration} represents a directed distance between two points on the time-line.
     * A negative duration is expressed by the negative sign of the seconds part.
     * A duration of -1 nanosecond is stored as -1 seconds plus 999,999,999 nanoseconds.
     *
     * @return {Number} the nanoseconds within the second part of the length of the duration, from 0 to 999,999,999
     */
    nano() {
        return this._nanos;
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this duration with the specified amount of seconds.
     * <p>
     * This returns a duration with the specified seconds, retaining the
     * nano-of-second part of this duration.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} seconds  the seconds to represent, may be negative
     * @return {@code Duration} based on this period with the requested seconds, not null
     */
    withSeconds(seconds) {
        return Duration.create(seconds, this._nanos);
    }

    /**
     * Returns a copy of this duration with the specified nano-of-second.
     * <p>
     * This returns a duration with the specified nano-of-second, retaining the
     * seconds part of this duration.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} nanoOfSecond  the nano-of-second to represent, from 0 to 999,999,999
     * @return {@code Duration} based on this period with the requested nano-of-second, not null
     * @throws DateTimeException if the nano-of-second is invalid
     */
    withNanos(nanoOfSecond) {
        ChronoField.NANO_OF_SECOND.checkValidIntValue(nanoOfSecond);
        return Duration.create(this._seconds, nanoOfSecond);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this duration with the specified duration added.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Duration} duration  the duration to add, positive or negative, not null
     * @return {@code Duration} based on this duration with the specified duration added, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    plusDuration(duration) {
        return this.plus(duration.seconds(), duration.nano());
    }


    /**
     * to handle function overriding this function accepts two arguments, checks their type and delegates to the appropriate function
     * 
     * @param a
     * @param b
     */
    plus(a, b){
        if (a instanceof Duration) {
            requireNonNull(a, 'duration');
            return this.plusDuration(a);
        }
        if (b instanceof ChronoUnit) {
            requireNonNull(a, 'amount');
            requireNonNull(b, 'unit');
            return this.plusAmountUnit(a, b);
        }
        requireNonNull(a, 'seconds');
        requireNonNull(b, 'nanos');
        return this.plusSecondsNanos(a, b);
    }
    
    /**
     * Returns a copy of this duration with the specified duration added.
     * <p>
     * The duration amount is measured in terms of the specified unit.
     * Only a subset of units are accepted by this method.
     * The unit must either have an {@link TemporalUnit#isDurationEstimated() exact duration} or
     * be {@link ChronoUnit#DAYS} which is treated as 24 hours. Other units throw an exception.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} amountToAdd  the amount to add, measured in terms of the unit, positive or negative
     * @param {TemporalUnit} unit  the unit that the amount is measured in, must have an exact duration, not null
     * @return {@code Duration} based on this duration with the specified duration added, not null
     * @throws UnsupportedTemporalTypeException if the unit is not supported
     * @throws ArithmeticException if numeric overflow occurs
     */
    plusAmountUnit(amountToAdd, unit) {
        requireNonNull(unit, 'unit');
        if (unit === ChronoUnit.DAYS) {
            return this.plusSecondsNanos(MathUtil.safeMultiply(amountToAdd, LocalTime.SECONDS_PER_DAY), 0);
        }
        if (unit.isDurationEstimated()) {
            throw new UnsupportedTemporalTypeException('Unit must not have an estimated duration');
        }
        if (amountToAdd === 0) {
            return this;
        }
        if (unit instanceof ChronoUnit) {
            switch (unit) {
                case ChronoUnit.NANOS: return this.plusNanos(amountToAdd);
                case ChronoUnit.MICROS: return this.plusSecondsNanos(MathUtil.intDiv(amountToAdd, (1000000 * 1000)) * 1000, MathUtil.intMod(amountToAdd, (1000000 * 1000)) * 1000);
                case ChronoUnit.MILLIS: return this.plusMillis(amountToAdd);
                case ChronoUnit.SECONDS: return this.plusSeconds(amountToAdd);
            }
            return this.plusSecondsNanos(MathUtil.safeMultiply(unit.duration().seconds(), amountToAdd), 0);
        }
        var duration = unit.duration().multipliedBy(amountToAdd);
        return this.plusSecondsNanos(duration.seconds(), duration.nano());
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this duration with the specified duration in 24 hour days added.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} daysToAdd  the days to add, positive or negative
     * @return {@code Duration} based on this duration with the specified days added, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    plusDays(daysToAdd) {
        return this.plusSecondsNanos(MathUtil.safeMultiply(daysToAdd, LocalTime.SECONDS_PER_DAY), 0);
    }

    /**
     * Returns a copy of this duration with the specified duration in hours added.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} hoursToAdd  the hours to add, positive or negative
     * @return {@code Duration} based on this duration with the specified hours added, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    plusHours(hoursToAdd) {
        return this.plusSecondsNanos(MathUtil.safeMultiply(hoursToAdd, LocalTime.SECONDS_PER_HOUR), 0);
    }

    /**
     * Returns a copy of this duration with the specified duration in minutes added.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} minutesToAdd  the minutes to add, positive or negative
     * @return {@code Duration} based on this duration with the specified minutes added, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    plusMinutes(minutesToAdd) {
        return this.plusSecondsNanos(MathUtil.safeMultiply(minutesToAdd, LocalTime.SECONDS_PER_MINUTE), 0);
    }

    /**
     * Returns a copy of this duration with the specified duration in seconds added.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} secondsToAdd  the seconds to add, positive or negative
     * @return {@code Duration} based on this duration with the specified seconds added, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    plusSeconds(secondsToAdd) {
        return this.plusSecondsNanos(secondsToAdd, 0);
    }

    /**
     * Returns a copy of this duration with the specified duration in milliseconds added.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} millisToAdd  the milliseconds to add, positive or negative
     * @return {@code Duration} based on this duration with the specified milliseconds added, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    plusMillis(millisToAdd) {
        return this.plusSecondsNanos(MathUtil.intDiv(millisToAdd, 1000), MathUtil.intMod(millisToAdd, 1000) * 1000000);
    }

    /**
     * Returns a copy of this duration with the specified duration in nanoseconds added.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} nanosToAdd  the nanoseconds to add, positive or negative
     * @return {@code Duration} based on this duration with the specified nanoseconds added, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    plusNanos(nanosToAdd) {
        return this.plusSecondsNanos(0, nanosToAdd);
    }

    /**
     * Returns a copy of this duration with the specified duration added.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} secondsToAdd  the seconds to add, positive or negative
     * @param {Number} nanosToAdd  the nanos to add, positive or negative
     * @return {@code Duration} based on this duration with the specified seconds added, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    plusSecondsNanos(secondsToAdd, nanosToAdd) {
        if ((secondsToAdd | nanosToAdd) === 0) {
            return this;
        }
        var epochSec = MathUtil.safeAdd(this._seconds, secondsToAdd);
        epochSec = MathUtil.safeAdd(epochSec, MathUtil.intDiv(nanosToAdd, LocalTime.NANOS_PER_SECOND));
        nanosToAdd = MathUtil.intMod(nanosToAdd, LocalTime.NANOS_PER_SECOND);
        var nanoAdjustment = MathUtil.safeAdd(this._nanos, nanosToAdd);  // safe int+LocalTime.NANOS_PER_SECOND
        return Duration.ofSeconds(epochSec, nanoAdjustment);
    }

    //-----------------------------------------------------------------------
    /**
     * to handle function overriding this function accepts two arguments, checks their type and delegates to the appropriate function
     *
     * @param a
     * @param b
     */
    minus(a, b) {
        if (a instanceof Duration) {
            requireNonNull(a, 'duration');
            return this.minusDuration(a);
        }
        if (b instanceof ChronoUnit) {
            requireNonNull(a, 'amount');
            requireNonNull(b, 'unit');
            return this.minusAmountUnit(a, b);
        }
        requireNonNull(a, 'seconds');
        requireNonNull(b, 'nanos');
        return this.minusSecondsNanos(a, b);
    }

    /**
     * Returns a copy of this duration with the specified duration subtracted.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Duration} duration  the duration to subtract, positive or negative, not null
     * @return {@code Duration} based on this duration with the specified duration subtracted, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    minusDuration(duration) {
        var secsToSubtract = duration.seconds();
        var nanosToSubtract = duration.nano();
        if (secsToSubtract === MIN_SAFE_INTEGER) {
            return this.plus(MAX_SAFE_INTEGER, -nanosToSubtract).plus(1, 0);
        }
        return this.plus(-secsToSubtract, -nanosToSubtract);
    }

    /**
     * Returns a copy of this duration with the specified duration subtracted.
     * <p>
     * The duration amount is measured in terms of the specified unit.
     * Only a subset of units are accepted by this method.
     * The unit must either have an {@link TemporalUnit#isDurationEstimated() exact duration} or
     * be {@link ChronoUnit#DAYS} which is treated as 24 hours. Other units throw an exception.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} amountToSubtract  the amount to subtract, measured in terms of the unit, positive or negative
     * @param {TemporalUnit} unit  the unit that the amount is measured in, must have an exact duration, not null
     * @return {@code Duration} based on this duration with the specified duration subtracted, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    minusAmountUnit(amountToSubtract, unit) {
        return (amountToSubtract === MIN_SAFE_INTEGER ? this.plusAmountUnit(MAX_SAFE_INTEGER, unit).plus(1, unit) : this.plusAmountUnit(-amountToSubtract, unit));
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this duration with the specified duration in 24 hour days subtracted.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} daysToSubtract  the days to subtract, positive or negative
     * @return {@code Duration} based on this duration with the specified days subtracted, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    minusDays(daysToSubtract) {
        return (daysToSubtract === MIN_SAFE_INTEGER ? this.plusDays(MAX_SAFE_INTEGER).plusDays(1) : this.plusDays(-daysToSubtract));
    }

    /**
     * Returns a copy of this duration with the specified duration in hours subtracted.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} hoursToSubtract  the hours to subtract, positive or negative
     * @return {@code Duration} based on this duration with the specified hours subtracted, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    minusHours(hoursToSubtract) {
        return (hoursToSubtract === MIN_SAFE_INTEGER ? this.plusHours(MAX_SAFE_INTEGER).plusHours(1) : this.plusHours(-hoursToSubtract));
    }

    /**
     * Returns a copy of this duration with the specified duration in minutes subtracted.
     * <p>
     * The number of hours is multiplied by 60 to obtain the number of seconds to subtract.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} minutesToSubtract  the minutes to subtract, positive or negative
     * @return {@code Duration} based on this duration with the specified minutes subtracted, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    minusMinutes(minutesToSubtract) {
        return (minutesToSubtract === MIN_SAFE_INTEGER ? this.plusMinutes(MAX_SAFE_INTEGER).plusMinutes(1) : this.plusMinutes(-minutesToSubtract));
    }

    /**
     * Returns a copy of this duration with the specified duration in seconds subtracted.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} secondsToSubtract  the seconds to subtract, positive or negative
     * @return {@code Duration} based on this duration with the specified seconds subtracted, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    minusSeconds(secondsToSubtract) {
        return (secondsToSubtract === MIN_SAFE_INTEGER ? this.plusSeconds(MAX_SAFE_INTEGER).plusSeconds(1) : this.plusSeconds(-secondsToSubtract));
    }

    /**
     * Returns a copy of this duration with the specified duration in milliseconds subtracted.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} millisToSubtract  the milliseconds to subtract, positive or negative
     * @return {@code Duration} based on this duration with the specified milliseconds subtracted, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    minusMillis(millisToSubtract) {
        return (millisToSubtract === MIN_SAFE_INTEGER ? this.plusMillis(MAX_SAFE_INTEGER).plusMillis(1) : this.plusMillis(-millisToSubtract));
    }

    /**
     * Returns a copy of this duration with the specified duration in nanoseconds subtracted.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} nanosToSubtract  the nanoseconds to subtract, positive or negative
     * @return {@code Duration} based on this duration with the specified nanoseconds subtracted, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    minusNanos(nanosToSubtract) {
        return (nanosToSubtract === MIN_SAFE_INTEGER ? this.plusNanos(MAX_SAFE_INTEGER).plusNanos(1) : this.plusNanos(-nanosToSubtract));
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this duration multiplied by the scalar.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} multiplicand  the value to multiply the duration by, positive or negative
     * @return {@code Duration} based on this duration multiplied by the specified scalar, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    multipliedBy(multiplicand) {
        if (multiplicand === 0) {
            return Duration.ZERO;
        }
        if (multiplicand === 1) {
            return this;
        }
        return Duration.create(MathUtil.safeMultiply(this.toSeconds(), multiplicand));
    }

    /**
     * Returns a copy of this duration divided by the specified value.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Number} divisor  the value to divide the duration by, positive or negative, not zero
     * @return {@code Duration} based on this duration divided by the specified divisor, not null
     * @throws ArithmeticException if the divisor is zero or if numeric overflow occurs
     */
    dividedBy(divisor) {
        if (divisor === 0) {
            throw new ArithmeticException('Cannot divide by zero');
        }
        if (divisor === 1) {
            return this;
        }
        return Duration.create(this.toSeconds() / divisor);
    }

    /**
     * Converts this duration to the total length in seconds and
     * fractional nanoseconds expressed as a {@code BigDecimal}.
     *
     * @return {Number} the total length of the duration in seconds, with a scale of 9, not null
     */
    toSeconds() {
        var nanoFloat = MathUtil.safeMultiply(this._nanos, Math.pow(10, -9));
        return MathUtil.safeAdd(this._seconds, nanoFloat);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this duration with the length negated.
     * <p>
     * This method swaps the sign of the total length of this duration.
     * For example, {@code PT1.3S} will be returned as {@code PT-1.3S}.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @return {@code Duration} based on this duration with the amount negated, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    negated() {
        return this.multipliedBy(-1);
    }

    /**
     * Returns a copy of this duration with a positive length.
     * <p>
     * This method returns a positive duration by effectively removing the sign from any negative total length.
     * For example, {@code PT-1.3S} will be returned as {@code PT1.3S}.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @return {@code Duration} based on this duration with an absolute length, not null
     * @throws ArithmeticException if numeric overflow occurs
     */
    abs() {
        return this.isNegative() ? this.negated() : this;
    }

    //-------------------------------------------------------------------------
    /**
     * Adds this duration to the specified temporal object.
     * <p>
     * This returns a temporal object of the same observable type as the input
     * with this duration added.
     * <p>
     * In most cases, it is clearer to reverse the calling pattern by using
     * {@link Temporal#plus(TemporalAmount)}.
     * <pre>
     *   // these two lines are equivalent, but the second approach is recommended
     *   dateTime = thisDuration.addTo(dateTime);
     *   dateTime = dateTime.plus(thisDuration);
     * </pre>
     * <p>
     * The calculation will add the seconds, then nanos.
     * Only non-zero amounts will be added.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Temporal} temporal  the temporal object to adjust, not null
     * @return {Temporal} an object of the same type with the adjustment made, not null
     * @throws DateTimeException if unable to add
     * @throws ArithmeticException if numeric overflow occurs
     */
    addTo(temporal) {
        requireNonNull(temporal, 'temporal');
        if (this._seconds !== 0) {
            temporal = temporal.plus(this._seconds, ChronoUnit.SECONDS);
        }
        if (this._nanos !== 0) {
            temporal = temporal.plus(this._nanos, ChronoUnit.NANOS);
        }
        return temporal;
    }

    /**
     * Subtracts this duration from the specified temporal object.
     * <p>
     * This returns a temporal object of the same observable type as the input
     * with this duration subtracted.
     * <p>
     * In most cases, it is clearer to reverse the calling pattern by using
     * {@link Temporal#minus(TemporalAmount)}.
     * <pre>
     *   // these two lines are equivalent, but the second approach is recommended
     *   dateTime = thisDuration.subtractFrom(dateTime);
     *   dateTime = dateTime.minus(thisDuration);
     * </pre>
     * <p>
     * The calculation will subtract the seconds, then nanos.
     * Only non-zero amounts will be added.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {Temporal} temporal  the temporal object to adjust, not null
     * @return {Temporal} an object of the same type with the adjustment made, not null
     * @throws DateTimeException if unable to subtract
     * @throws ArithmeticException if numeric overflow occurs
     */
    subtractFrom(temporal) {
        requireNonNull(temporal, 'temporal');
        if (this._seconds !== 0) {
            temporal = temporal.minus(this._seconds, ChronoUnit.SECONDS);
        }
        if (this._nanos !== 0) {
            temporal = temporal.minus(this._nanos, ChronoUnit.NANOS);
        }
        return temporal;
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the number of days in this duration.
     * <p>
     * This returns the total number of days in the duration by dividing the
     * number of seconds by 86400.
     * This is based on the standard definition of a day as 24 hours.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @return the number of days in the duration, may be negative
     */
    toDays() {
        return this._seconds / LocalTime.SECONDS_PER_DAY;
    }

    /**
     * Gets the number of hours in this duration.
     * <p>
     * This returns the total number of hours in the duration by dividing the
     * number of seconds by 3600.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @return {Number} the number of hours in the duration, may be negative
     */
    toHours() {
        return this._seconds / LocalTime.SECONDS_PER_HOUR;
    }

    /**
     * Gets the number of minutes in this duration.
     * <p>
     * This returns the total number of minutes in the duration by dividing the
     * number of seconds by 60.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @return {Number} the number of minutes in the duration, may be negative
     */
    toMinutes() {
        return this._seconds / LocalTime.SECONDS_PER_MINUTE;
    }

    /**
     * Converts this duration to the total length in milliseconds.
     * <p>
     * If this duration is too large to fit in a {@code long} milliseconds, then an
     * exception is thrown.
     * <p>
     * If this duration has greater than millisecond precision, then the conversion
     * will drop any excess precision information as though the amount in nanoseconds
     * was subject to integer division by one million.
     *
     * @return {Number} the total length of the duration in milliseconds
     * @throws ArithmeticException if numeric overflow occurs
     */
    toMillis() {
        var millis = Math.round(MathUtil.safeMultiply(this._seconds, 1000));
        millis = MathUtil.safeAdd(millis, MathUtil.intDiv(this._nanos, 1000000));
        return millis;
    }

    /**
     * Converts this duration to the total length in nanoseconds expressed as a {@code long}.
     * <p>
     * If this duration is too large to fit in a {@code long} nanoseconds, then an
     * exception is thrown.
     *
     * @return {Number} the total length of the duration in nanoseconds
     * @throws ArithmeticException if numeric overflow occurs
     */
    toNanos() {
        var totalNanos = MathUtil.safeMultiply(this._seconds, LocalTime.NANOS_PER_SECOND);
        totalNanos = MathUtil.safeAdd(totalNanos, this._nanos);
        return totalNanos;
    }

    //-----------------------------------------------------------------------
    /**
     * Compares this duration to the specified {@code Duration}.
     * <p>
     * The comparison is based on the total length of the durations.
     *
     * @param {Duration} otherDuration  the other duration to compare to, not null
     * @return {Number} the comparator value, negative if less, positive if greater
     */
    compareTo(otherDuration) {
        requireNonNull(otherDuration, 'otherDuration');
        requireInstance(otherDuration, Duration, 'otherDuration');
        var cmp = MathUtil.compareNumbers(this._seconds, otherDuration.seconds());
        if (cmp !== 0) {
            return cmp;
        }
        return this._nanos - otherDuration.nano();
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this duration is equal to the specified {@code Duration}.
     * <p>
     * The comparison is based on the total length of the durations.
     *
     * @param {Duration} otherDuration  the other duration, null returns false
     * @return {boolean} true if the other duration is equal to this one
     */
    equals(otherDuration) {
        if (this === otherDuration) {
            return true;
        }
        if (otherDuration instanceof Duration) {
            return this.seconds() === otherDuration.seconds() &&
                   this.nano() === otherDuration.nano();
        }
        return false;
    }

    //-----------------------------------------------------------------------
    /**
     * A string representation of this duration using ISO-8601 seconds
     * based representation, such as {@code PT8H6M12.345S}.
     * <p>
     * The format of the returned string will be {@code PTnHnMnS}, where n is
     * the relevant hours, minutes or seconds part of the duration.
     * Any fractional seconds are placed after a decimal povar i the seconds section.
     * If a section has a zero value, it is omitted.
     * The hours, minutes and seconds will all have the same sign.
     * <p>
     * Examples:
     * <pre>
     *    "20.345 seconds"                 -> "PT20.345S
     *    "15 minutes" (15 * 60 seconds)   -> "PT15M"
     *    "10 hours" (10 * 3600 seconds)   -> "PT10H"
     *    "2 days" (2 * 86400 seconds)     -> "PT48H"
     * </pre>
     * Note that multiples of 24 hours are not output as days to avoid confusion
     * with {@code Period}.
     *
     * @return an ISO-8601 representation of this duration, not null
     */
    toString() {
        if (this === Duration.ZERO) {
            return 'PT0S';
        }
        var hours = MathUtil.intDiv(this._seconds, LocalTime.SECONDS_PER_HOUR);
        var minutes = MathUtil.intDiv(MathUtil.intMod(this._seconds, LocalTime.SECONDS_PER_HOUR), LocalTime.SECONDS_PER_MINUTE);
        var secs = MathUtil.intMod(this._seconds, LocalTime.SECONDS_PER_MINUTE);
        var rval = 'PT';
        if (hours !== 0) {
            rval += hours + 'H';
        }
        if (minutes !== 0) {
            rval += minutes + 'M';
        }
        if (secs === 0 && this._nanos === 0 && rval.length > 2) {
            return rval;
        }
        if (secs < 0 && this._nanos > 0) {
            if (secs === -1) {
                rval += '-0';
            } else {
                rval += secs + 1;
            }
        } else {
            rval += secs;
        }
        if (this._nanos > 0) {
            rval += '.';
            let nanoString;
            if (secs < 0) {
                nanoString = '' + (2 * LocalTime.NANOS_PER_SECOND - this._nanos);
            } else {
                nanoString = '' + (LocalTime.NANOS_PER_SECOND + this._nanos);
            }
            // remove the leading '1'
            nanoString = nanoString.slice(1, nanoString.length);
            rval += nanoString;
            while (rval.charAt(rval.length - 1) === '0') {
                rval = rval.slice(0, rval.length - 1);
            }
        }
        rval += 'S';
        return rval;
    }

}

export function _init() {
    /**
     * Constant for a duration of zero.
     */
    Duration.ZERO = new Duration(0, 0);
}
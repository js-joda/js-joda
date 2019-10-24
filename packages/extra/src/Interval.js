/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/* eslint-disable no-else-return */
import { DateTimeException, DateTimeParseException, Duration, IllegalArgumentException, Instant, ZonedDateTime } from '@js-joda/core';

// TODO: hm... is this a good idea?? copied from joda currently, could we add a js-joda-utils module??
import { requireNonNull, requireInstance } from './assert';

/**
 * An immutable interval of time between two instants.
 * <p>
 * An interval represents the time on the time-line between two {@link Instant}s.
 * The class stores the start and end instants, with the start inclusive and the end exclusive.
 * The end instant is always greater than or equal to the start instant.
 * <p>
 * The {@link Duration} of an interval can be obtained, but is a separate concept.
 * An interval is connected to the time-line, whereas a duration is not.
 * <p>
 * Intervals are not comparable. To compare the length of two intervals, it is
 * generally recommended to compare their durations.
 *
 */
export class Interval {
    //-----------------------------------------------------------------------
    /**
     * function overloading for {@link Interval.of}
     *
     * if called without arguments, then {@link Interval.ofInstantInstant} is executed.

     * if called with 1 arguments and first argument is an instance of ZoneId, then {@link Interval.ofInstantDuration} is executed.
     *
     * Otherwise {@link Interval.ofInstantDuration} is executed.
     *
     * @param {!(Instant)} startInstant
     * @param {!(Instant|Duration)} endInstantOrDuration
     * @returns {Interval}
     */
    static of(startInstant, endInstantOrDuration) {
        if (endInstantOrDuration instanceof Duration) {
            return Interval.ofInstantDuration(startInstant, endInstantOrDuration);
        } else {
            return Interval.ofInstantInstant(startInstant, endInstantOrDuration);
        }
    }

    /**
     * Obtains an instance of {@code Interval} from the start and end instant.
     * <p>
     * The end instant must not be before the start instant.
     *
     * @param {Instant} startInclusive  the start instant, inclusive, MIN_DATE treated as unbounded, not null
     * @param {Instant} endExclusive  the end instant, exclusive, MAX_DATE treated as unbounded, not null
     * @return {Interval} the half-open interval, not null
     * @throws DateTimeException if the end is before the start
     */
    static ofInstantInstant(startInclusive, endExclusive) {
        requireNonNull(startInclusive, 'startInclusive');
        requireNonNull(endExclusive, 'endExclusive');
        requireInstance(startInclusive, Instant, 'startInclusive');
        requireInstance(endExclusive, Instant, 'endExclusive');
        if (endExclusive.isBefore(startInclusive)) {
            throw new DateTimeException('End instant must on or after start instant');
        }
        return new Interval(startInclusive, endExclusive);
    }

    /**
     * Obtains an instance of {@code Interval} from the start and a duration.
     * <p>
     * The end instant is calculated as the start plus the duration.
     * The duration must not be negative.
     *
     * @param {Instant} startInclusive  the start instant, inclusive, not null
     * @param {Duration} duration  the duration from the start to the end, not null
     * @return {Interval} the interval, not null
     * @throws DateTimeException if the end is before the start,
     *  or if the duration addition cannot be made
     * @throws ArithmeticException if numeric overflow occurs when adding the duration
     */
    static ofInstantDuration(startInclusive, duration) {
        requireNonNull(startInclusive, 'startInclusive');
        requireNonNull(duration, 'duration');
        requireInstance(startInclusive, Instant, 'startInclusive');
        requireInstance(duration, Duration, 'duration');
        if (duration.isNegative()) {
            throw new DateTimeException('Duration must not be zero or negative');
        }
        return new Interval(startInclusive, startInclusive.plus(duration));
    }

    //-----------------------------------------------------------------------

    /**
     * Obtains an instance of {@code Interval} from a text string such as
     * {@code 2007-12-03T10:15:30Z/2007-12-04T10:15:30Z}, where the end instant is exclusive.
     * <p>
     * The string must consist of one of the following three formats:
     * <ul>
     * <li>a representations of an {@link ZonedDateTime}, followed by a forward slash,
     *  followed by a representation of a {@link ZonedDateTime}
     * <li>a representation of an {@link ZonedDateTime}, followed by a forward slash,
     *  followed by a representation of a {@link Duration}
     * <li>a representation of a {@link Duration}, followed by a forward slash,
     *  followed by a representation of an {@link ZonedDateTime}
     * </ul>
     *
     * NOTE: in contrast to the threeten-extra base we are not using `OffsetDateTime` but `ZonedDateTime` to parse
     * the string, this does not change the format but adds the possibility to optionally specify a zone
     *
     * @param {string} text  the text to parse, not null
     * @return {Interval} the parsed interval, not null
     * @throws DateTimeParseException if the text cannot be parsed
     */
    static parse(text) {
        requireNonNull(text, 'text');
        if (!(typeof text === 'string')) {
            throw new IllegalArgumentException(`text must be a string, but is ${text.constructor.name}`);
        }
        for (let i = 0; i < text.length; i += 1) {
            if (text.charAt(i) === '/') {
                const firstChar = text.charAt(0);
                if (firstChar === 'P' || firstChar === 'p') {
                    // duration followed by instant
                    const duration = Duration.parse(text.substring(0, i));
                    const end = ZonedDateTime.parse(text.substring(i + 1, text.length)).toInstant();
                    return Interval.of(end.minus(duration), end);
                } else {
                    // instant followed by instant or duration
                    const start = ZonedDateTime.parse(text.substring(0, i)).toInstant();
                    if (i + 1 < text.length) {
                        const c = text.charAt(i + 1);
                        if (c === 'P' || c === 'p') {
                            const duration = Duration.parse(text.substring(i + 1, text.length));
                            return Interval.of(start, start.plus(duration));
                        }
                    }
                    const end = ZonedDateTime.parse(text.substring(i + 1, text.length)).toInstant();
                    return Interval.of(start, end);
                }
            }
        }
        throw new DateTimeParseException('Interval cannot be parsed, no forward slash found', text, 0);
    }
    //-----------------------------------------------------------------------
    /**
     * Constructor.
     *
     * @param {Instant} startInclusive  the start instant, inclusive, validated not null
     * @param {Instant} endExclusive  the end instant, exclusive, validated not null
     */
    constructor(startInclusive, endExclusive) {
        this._start = startInclusive;
        this._end = endExclusive;
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the start of this time interval, inclusive.
     * <p>
     * This will return {@link Instant#MIN} if the range is unbounded at the start.
     * In this case, the range includes all dates into the far-past.
     *
     * @return {Instant} the start of the time interval
     */
    start() {
        return this._start;
    }

    /**
     * Gets the end of this time interval, exclusive.
     * <p>
     * This will return {@link Instant#MAX} if the range is unbounded at the end.
     * In this case, the range includes all dates into the far-future.
     *
     * @return {Instant} the end of the time interval, exclusive
     */
    end() {
        return this._end;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if the range is empty.
     * <p>
     * An empty range occurs when the start date equals the inclusive end date.
     *
     * @return {boolean} true if the range is empty
     */
    isEmpty() {
        return this._start.equals(this._end);
    }

    /**
     * Checks if the start of the interval is unbounded.
     *
     * @return {boolean} true if start is unbounded
     */
    isUnboundedStart() {
        return this._start.equals(Instant.MIN);
    }

    /**
     * Checks if the end of the interval is unbounded.
     *
     * @return {boolean} true if end is unbounded
     */
    isUnboundedEnd() {
        return this._end.equals(Instant.MAX);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this range with the specified start instant.
     *
     * @param {Instant} start  the start instant for the new interval, not null
     * @return {Interval} an interval with the end from this interval and the specified start
     * @throws DateTimeException if the resulting interval has end before start
     */
    withStart(start) {
        return Interval.of(start, this._end);
    }

    /**
     * Returns a copy of this range with the specified end instant.
     *
     * @param {Instant} end  the end instant for the new interval, not null
     * @return {Interval} an interval with the start from this interval and the specified end
     * @throws DateTimeException if the resulting interval has end before start
     */
    withEnd(end) {
        return Interval.of(this._start, end);
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this interval contains the specified instant.
     * <p>
     * This checks if the specified instant is within the bounds of this interval.
     * If this range has an unbounded start then {@code contains(Instant#MIN)} returns true.
     * If this range has an unbounded end then {@code contains(Instant#MAX)} returns true.
     * If this range is empty then this method always returns false.
     *
     * @param {Instant} instant  the instant, not null
     * @return {boolean} true if this interval contains the instant
     */
    contains(instant) {
        requireNonNull(instant, 'instant');
        requireInstance(instant, Instant, 'instant');
        return this._start.compareTo(instant) <= 0 && (instant.compareTo(this._end) < 0 || this.isUnboundedEnd());
    }

    /**
     * Checks if this interval encloses the specified interval.
     * <p>
     * This checks if the bounds of the specified interval are within the bounds of this interval.
     * An empty interval encloses itself.
     *
     * @param {Interval} other  the other interval, not null
     * @return {boolean} true if this interval contains the other interval
     */
    encloses(other) {
        requireNonNull(other, 'other');
        requireInstance(other, Interval, 'other');
        return this._start.compareTo(other.start()) <= 0 && other.end().compareTo(this._end) <= 0;
    }

    /**
     * Checks if this interval abuts the specified interval.
     * <p>
     * The result is true if the end of this interval is the start of the other, or vice versa.
     * An empty interval does not abut itself.
     *
     * @param {Interval} other  the other interval, not null
     * @return {boolean} true if this interval abuts the other interval
     */
    abuts(other) {
        requireNonNull(other, 'other');
        requireInstance(other, Interval, 'other');
        return !this._end.equals(other.start()) !== !this._start.equals(other.end());
    }

    /**
     * Checks if this interval is connected to the specified interval.
     * <p>
     * The result is true if the two intervals have an enclosed interval in common, even if that interval is empty.
     * An empty interval is connected to itself.
     * <p>
     * This is equivalent to {@code (overlaps(other) || abuts(other))}.
     *
     * @param {Interval} other  the other interval, not null
     * @return {boolean} true if this interval is connected to the other interval
     */
    isConnected(other) {
        requireNonNull(other, 'other');
        requireInstance(other, Interval, 'other');
        return this.equals(other) || (this._start.compareTo(other.end()) <= 0 && other.start().compareTo(this._end) <= 0);
    }

    /**
     * Checks if this interval overlaps the specified interval.
     * <p>
     * The result is true if the the two intervals share some part of the time-line.
     * An empty interval overlaps itself.
     * <p>
     * This is equivalent to {@code (isConnected(other) && !abuts(other))}.
     *
     * @param {Interval} other  the time interval to compare to, null means a zero length interval now
     * @return {boolean} true if the time intervals overlap
     */
    overlaps(other) {
        requireNonNull(other, 'other');
        requireInstance(other, Interval, 'other');
        return other.equals(this) || (this._start.compareTo(other.end()) < 0 && other.start().compareTo(this._end) < 0);
    }

    //-----------------------------------------------------------------------
    /**
     * Calculates the interval that is the intersection of this interval and the specified interval.
     * <p>
     * This finds the intersection of two intervals.
     * This throws an exception if the two intervals are not {@linkplain #isConnected(Interval) connected}.
     *
     * @param {Interval} other  the other interval to check for, not null
     * @return {Interval} the interval that is the intersection of the two intervals
     * @throws DateTimeException if the intervals do not connect
     */
    intersection(other) {
        requireNonNull(other, 'other');
        requireInstance(other, Interval, 'other');
        if (this.isConnected(other) === false) {
            throw new DateTimeException(`Intervals do not connect: ${this} and ${other}`);
        }
        const cmpStart = this._start.compareTo(other.start());
        const cmpEnd = this._end.compareTo(other.end());
        if (cmpStart >= 0 && cmpEnd <= 0) {
            return this;
        } else if (cmpStart <= 0 && cmpEnd >= 0) {
            return other;
        } else {
            const newStart = (cmpStart >= 0 ? this._start : other.start());
            const newEnd = (cmpEnd <= 0 ? this._end : other.end());
            return Interval.of(newStart, newEnd);
        }
    }

    /**
     * Calculates the interval that is the union of this interval and the specified interval.
     * <p>
     * This finds the union of two intervals.
     * This throws an exception if the two intervals are not {@linkplain #isConnected(Interval) connected}.
     *
     * @param {Interval} other  the other interval to check for, not null
     * @return {Interval} the interval that is the union of the two intervals
     * @throws DateTimeException if the intervals do not connect
     */
    union(other) {
        requireNonNull(other, 'other');
        requireInstance(other, Interval, 'other');
        if (this.isConnected(other) === false) {
            throw new DateTimeException(`Intervals do not connect: ${this} and ${other}`);
        }
        const cmpStart = this._start.compareTo(other.start());
        const cmpEnd = this._end.compareTo(other.end());
        if (cmpStart >= 0 && cmpEnd <= 0) {
            return other;
        } else if (cmpStart <= 0 && cmpEnd >= 0) {
            return this;
        } else {
            const newStart = (cmpStart >= 0 ? other.start() : this._start);
            const newEnd = (cmpEnd <= 0 ? other.end() : this._end);
            return Interval.of(newStart, newEnd);
        }
    }

    /**
     * Calculates the smallest interval that encloses this interval and the specified interval.
     * <p>
     * The result of this method will {@linkplain #encloses(Interval) enclose}
     * this interval and the specified interval.
     *
     * @param {Interval} other  the other interval to check for, not null
     * @return {Interval} the interval that spans the two intervals
     */
    span(other) {
        requireNonNull(other, 'other');
        requireInstance(other, Interval, 'other');
        const cmpStart = this._start.compareTo(other.start());
        const cmpEnd = this._end.compareTo(other.end());
        const newStart = (cmpStart >= 0 ? other.start() : this._start);
        const newEnd = (cmpEnd <= 0 ? other.end() : this._end);
        return Interval.of(newStart, newEnd);
    }

    //-------------------------------------------------------------------------
    /**
     * function overloading for {@link Interval#isAfter}
     *
     * if called with an Instant, then {@link Interval#isAfterInstant} is executed.
     *
     * Otherwise {@link Interval#isAfterInterval} is executed.
     *
     * @param {!(Instant|Interval)} instantOrInterval
     * @returns {boolean}
     */
    isAfter(instantOrInterval) {
        if (instantOrInterval instanceof Instant) {
            return this.isAfterInstant(instantOrInterval);
        } else {
            return this.isAfterInterval(instantOrInterval);
        }
    }

    /**
     * function overloading for {@link Interval#isBefore}
     *
     * if called with an Instant, then {@link Interval#isBeforeInstant} is executed.
     *
     * Otherwise {@link Interval#isBeforeInterval} is executed.
     *
     * @param {!(Instant|Interval)} instantOrInterval
     * @returns {boolean}
     */
    isBefore(instantOrInterval) {
        if (instantOrInterval instanceof Instant) {
            return this.isBeforeInstant(instantOrInterval);
        } else {
            return this.isBeforeInterval(instantOrInterval);
        }
    }

    /**
     * Checks if this interval is after the specified instant.
     * <p>
     * The result is true if the this instant starts after the specified instant.
     * An empty interval behaves as though it is an instant for comparison purposes.
     *
     * @param {Instant} instant  the other instant to compare to, not null
     * @return {boolean} true if the start of this interval is after the specified instant
     */
    isAfterInstant(instant) {
        return this._start.compareTo(instant) > 0;
    }

    /**
     * Checks if this interval is before the specified instant.
     * <p>
     * The result is true if the this instant ends before the specified instant.
     * Since intervals do not include their end points, this will return true if the
     * instant equals the end of the interval.
     * An empty interval behaves as though it is an instant for comparison purposes.
     *
     * @param {Instant} instant  the other instant to compare to, not null
     * @return {boolean} true if the start of this interval is before the specified instant
     */
    isBeforeInstant(instant) {
        return this._end.compareTo(instant) <= 0 && this._start.compareTo(instant) < 0;
    }

    //-------------------------------------------------------------------------
    /**
     * Checks if this interval is after the specified interval.
     * <p>
     * The result is true if the this instant starts after the end of the specified interval.
     * Since intervals do not include their end points, this will return true if the
     * instant equals the end of the interval.
     * An empty interval behaves as though it is an instant for comparison purposes.
     *
     * @param {Interval} interval  the other interval to compare to, not null
     * @return {boolean} true if this instant is after the specified instant
     */
    isAfterInterval(interval) {
        return this._start.compareTo(interval.end()) >= 0 && !interval.equals(this);
    }

    /**
     * Checks if this interval is before the specified interval.
     * <p>
     * The result is true if the this instant ends before the start of the specified interval.
     * Since intervals do not include their end points, this will return true if the
     * two intervals abut.
     * An empty interval behaves as though it is an instant for comparison purposes.
     *
     * @param {Interval} interval  the other interval to compare to, not null
     * @return {boolean} true if this instant is before the specified instant
     */
    isBeforeInterval(interval) {
        return this._end.compareTo(interval.start()) <= 0 && !interval.equals(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains the duration of this interval.
     * <p>
     * An {@code Interval} is associated with two specific instants on the time-line.
     * A {@code Duration} is simply an amount of time, separate from the time-line.
     *
     * @return {Duration} the duration of the time interval
     * @throws ArithmeticException if the calculation exceeds the capacity of {@code Duration}
     */
    toDuration() {
        return Duration.between(this._start, this._end);
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this interval is equal to another interval.
     * <p>
     * Compares this {@code Interval} with another ensuring that the two instants are the same.
     * Only objects of type {@code Interval} are compared, other types return false.
     *
     * @param {*} obj  the object to check, null returns false
     * @return {boolean} true if this is equal to the other interval
     */
    equals(obj) {
        if (this === obj) {
            return true;
        }
        if (obj instanceof Interval) {
            return this._start.equals(obj.start()) && this._end.equals(obj.end());
        }
        return false;
    }

    /**
     * A hash code for this interval.
     *
     * @return {number} a suitable hash code
     */
    hashCode() {
        // eslint-disable-next-line no-bitwise
        return this._start.hashCode() ^ this._end.hashCode();
    }

    //-----------------------------------------------------------------------
    /**
     * Outputs this interval as a {@code String}, such as {@code 2007-12-03T10:15:30/2007-12-04T10:15:30}.
     * <p>
     * The output will be the ISO-8601 format formed by combining the
     * {@code toString()} methods of the two instants, separated by a forward slash.
     *
     * @return {string} a string representation of this instant, not null
     */
    toString() {
        return `${this._start.toString()}/${this._end.toString()}`;
    }
}

export function _init() {
    Interval.ALL = Interval.of(Instant.MIN, Instant.MAX);
}

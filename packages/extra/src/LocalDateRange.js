/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { ArithmeticException, DateTimeException, DateTimeParseException, IllegalArgumentException, LocalDate, Period } from '@js-joda/core';

// TODO: hm... is this a good idea?? copied from joda currently, could we add a js-joda-utils module??
import { requireInstance, requireNonNull } from './assert';

/**
 * The day after the MIN date.
 */
const MINP1 = LocalDate.MIN.plusDays(1);
/**
 * The day before the MAX date.
 */
const MAXM1 = LocalDate.MAX.minusDays(1);

/**
 * A range of local dates.
 *
 * A `LocalDateRange` represents a range of dates, from a start date to an end date.
 * Instances can be constructed from either a half-open or a closed range of dates.
 * Internally, the class stores the start and end dates, with the start inclusive and the end exclusive.
 * The end date is always greater than or equal to the start date.
 *
 * The constants `LocalDate.MIN` and `LocalDate.MAX` can be used
 * to indicate an unbounded far-past or far-future. Note that there is no difference
 * between a half-open and a closed range when the end is `LocalDate.MAX`.
 * Empty ranges are allowed.
 *
 * No range can end at `LocalDate.MIN` or `LocalDate.MIN.plusDays(1)`.
 * No range can start at `LocalDate.MAX` or `LocalDate.MAX.minusDays(1)`.
 * No empty range can exist at `LocalDate.MIN` or `LocalDate.MAX`.
 *
 * Date ranges are not comparable. To compare the length of two ranges, it is
 * generally recommended to compare the number of days they contain.
 *
 */
export class LocalDateRange {
    /**
     * function overloading for {@link LocalDateRange.of}
     * - if called with `LocalDate` and `LocalDate`, {@link LocalDateRange._ofLocalDateLocalDate} is executed,
     * - if called with `LocalDate` and `Period`, {@link LocalDateRange._ofLocalDatePeriod} is executed,
     * - otherwise throws IllegalArgumentException.
     *
     * @param {LocalDate} startInclusive
     * @param {LocalDate|Period} endExclusiveOrPeriod
     * @return {LocalDateRange}
     */
    static of(startInclusive, endExclusiveOrPeriod) {
        if (startInclusive instanceof LocalDate && endExclusiveOrPeriod instanceof LocalDate) {
            return LocalDateRange._ofLocalDateLocalDate(startInclusive, endExclusiveOrPeriod);
        }
        if (startInclusive instanceof LocalDate && endExclusiveOrPeriod instanceof Period) {
            return LocalDateRange._ofLocalDatePeriod(startInclusive, endExclusiveOrPeriod);
        }
        const messageParts = [];
        if (!(startInclusive instanceof LocalDate)) {
            messageParts.push(`startInclusive must be an instance of LocalDate but is ${startInclusive.constructor.name}`);
        }
        if (!(endExclusiveOrPeriod instanceof LocalDate || endExclusiveOrPeriod instanceof Period)) {
            messageParts.push(`endExclusiveOrPeriod must be an instance of LocalDate or Period but is ${endExclusiveOrPeriod.constructor.name}`);
        }
        throw new IllegalArgumentException(messageParts.join(' and '));
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains a half-open range of dates, including the start and excluding the end.
     *
     * The range includes the start date and excludes the end date, unless the end is `LocalDate.MAX`.
     * The end date must be equal to or after the start date.
     * This definition permits an empty range located at a specific date.
     *
     * The constants `LocalDate.MIN` and `LocalDate.MAX` can be used
     * to indicate an unbounded far-past or far-future.
     *
     * The start inclusive date must not be `LocalDate.MAX` or `LocalDate.MAX.minusDays(1)`.
     * The end inclusive date must not be `LocalDate.MIN` or `LocalDate.MIN.plusDays(1)`.
     * No empty range can exist at `LocalDate.MIN` or `LocalDate.MAX`.
     *
     * @param {LocalDate} startInclusive - the inclusive start date, not null
     * @param {LocalDate} endExclusive - the exclusive end date, not null
     * @return {LocalDateRange} the half-open range, not null
     * @throws {DateTimeException} if the end is before the start,
     *   or the start date is `LocalDate.MAX` or `LocalDate.MAX.minusDays(1)`,
     *   or the end date is `LocalDate.MIN` or `LocalDate.MIN.plusDays(1)`
     * @protected
     */
    static _ofLocalDateLocalDate(startInclusive, endExclusive) {
        requireNonNull(startInclusive, 'startInclusive');
        requireNonNull(endExclusive, 'endExclusive');
        requireInstance(startInclusive, LocalDate, 'startInclusive');
        requireInstance(endExclusive, LocalDate, 'endExclusive');
        return new LocalDateRange(startInclusive, endExclusive);
    }

    /**
     * Obtains an instance of `LocalDateRange` from the start and a period.
     *
     * The end date is calculated as the start plus the duration.
     * The period must not be negative.
     *
     * The constant `LocalDate.MIN` can be used to indicate an unbounded far-past.
     *
     * The period must not be zero or one day when the start date is `LocalDate.MIN`.
     *
     * @param {LocalDate} startInclusive - the inclusive start date, not null
     * @param {Period} period - the period from the start to the end, not null
     * @return {LocalDateRange} the range, not null
     * @throws {DateTimeException} if the end is before the start,
     *  or if the period addition cannot be made
     * @throws {ArithmeticException} if numeric overflow occurs when adding the period
     * @protected
     */
    static _ofLocalDatePeriod(startInclusive, period) {
        requireNonNull(startInclusive, 'startInclusive');
        requireNonNull(period, 'period');
        requireInstance(startInclusive, LocalDate, 'startInclusive');
        requireInstance(period, Period, 'period');
        if (period.isNegative()) {
            throw new DateTimeException('Period must not be zero or negative');
        }
        return new LocalDateRange(startInclusive, startInclusive.plus(period));
    }

    /**
     * Obtains a closed range of dates, including the start and end.
     *
     * The range includes the start date and the end date.
     * The end date must be equal to or after the start date.
     *
     * The constants `LocalDate.MIN` and `LocalDate.MAX` can be used
     * to indicate an unbounded far-past or far-future. In addition, an end date of
     * `LocalDate.MAX.minusDays(1)` will also create an unbounded far-future range.
     *
     * The start inclusive date must not be `LocalDate.MAX` or `LocalDate.MAX.minusDays(1)`.
     * The end inclusive date must not be `LocalDate.MIN`.
     *
     * @param {LocalDate} startInclusive - the inclusive start date, not null
     * @param {LocalDate} endInclusive - the inclusive end date, not null
     * @return {LocalDateRange} the closed range
     * @throws {DateTimeException} if the end is before the start,
     *   or the start date is `LocalDate.MAX` or `LocalDate.MAX.minusDays(1)`,
     *   or the end date is `LocalDate.MIN`
     */
    static ofClosed(startInclusive, endInclusive) {
        requireNonNull(startInclusive, 'startInclusive');
        requireNonNull(endInclusive, 'endInclusive');
        requireInstance(startInclusive, LocalDate, 'startInclusive');
        requireInstance(endInclusive, LocalDate, 'endInclusive');
        if (endInclusive.isBefore(startInclusive)) {
            throw new DateTimeException('Start date must be on or before end date');
        }
        const end = (endInclusive.equals(LocalDate.MAX) ? LocalDate.MAX : endInclusive.plusDays(1));
        return new LocalDateRange(startInclusive, end);
    }

    /**
     * Obtains an empty date range located at the specified date.
     *
     * The empty range has zero length and contains no other dates or ranges.
     * An empty range cannot be located at `LocalDate.MIN`, `LocalDate.MIN.plusDays(1)`,
     * `LocalDate.MAX` or `LocalDate.MAX.minusDays(1)`.
     *
     * @param {LocalDate} date - the date where the empty range is located, not null
     * @return {LocalDateRange} the empty range, not null
     * @throws {DateTimeException} if the date is `LocalDate.MIN`, `LocalDate.MIN.plusDays(1)`,
     *   `LocalDate.MAX` or `LocalDate.MAX.minusDays(1)`
     */
    static ofEmpty(date) {
        requireNonNull(date, 'date');
        requireInstance(date, LocalDate, 'date');
        return new LocalDateRange(date, date);
    }

    /**
     * Obtains a range that is unbounded at the start and end.
     *
     * @return {LocalDateRange} the range, with an unbounded start and unbounded end
     */
    static ofUnbounded() {
        return LocalDateRange.ALL;
    }

    /**
     * Obtains a range up to, but not including, the specified end date.
     *
     * The range includes all dates from the unbounded start, denoted by `LocalDate.MIN`, to the end date.
     * The end date is exclusive and cannot be `LocalDate.MIN` or `LocalDate.MIN.plusDays(1)`.
     *
     * @param {LocalDate} endExclusive - the exclusive end date, `LocalDate.MAX` treated as unbounded, not null
     * @return {LocalDateRange} the range, with an unbounded start
     * @throws {DateTimeException} if the end date is `LocalDate.MIN` or  `LocalDate.MIN.plusDays(1)`
     */
    static ofUnboundedStart(endExclusive) {
        requireNonNull(endExclusive, 'endExclusive');
        requireInstance(endExclusive, LocalDate, 'endExclusive');
        return LocalDateRange.of(LocalDate.MIN, endExclusive);
    }

    /**
     * Obtains a range from and including the specified start date.
     *
     * The range includes all dates from the start date to the unbounded end, denoted by `LocalDate.MAX`.
     * The start date is inclusive and cannot be `LocalDate.MAX` or `LocalDate.MAX.minusDays(1)`.
     *
     * @param {LocalDate} startInclusive - the inclusive start date, `LocalDate.MIN` treated as unbounded, not null
     * @return {LocalDateRange} the range, with an unbounded end
     * @throws {DateTimeException} if the start date is `LocalDate.MAX` or `LocalDate.MAX.minusDays(1)`
     */
    static ofUnboundedEnd(startInclusive) {
        return LocalDateRange.of(startInclusive, LocalDate.MAX);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of `LocalDateRange` from a text string such as
     * `2007-12-03/2007-12-04`, where the end date is exclusive.
     *
     * The string must consist of one of the following three formats:
     * <ul>
     * <li>a representations of an {@link LocalDate}, followed by a forward slash,
     *  followed by a representation of a {@link LocalDate}
     * <li>a representation of an {@link LocalDate}, followed by a forward slash,
     *  followed by a representation of a {@link Period}
     * <li>a representation of a {@link Period}, followed by a forward slash,
     *  followed by a representation of an {@link LocalDate}
     * </ul>
     *
     * @param {string} text - the text to parse, not null
     * @return {LocalDateRange} the parsed range, not null
     * @throws {DateTimeParseException} if the text cannot be parsed
     */
    static parse(text) {
        requireNonNull(text, 'text');
        for (let i = 0; i < text.length; i++) {
            if (text[i] === '/') {
                const firstChar = text.charAt(0);
                if (firstChar === 'P' || firstChar === 'p') {
                    // period followed by date
                    const duration = Period.parse(text.slice(0, i));
                    const end = LocalDate.parse(text.slice(i + 1, text.length));
                    return LocalDateRange.of(end.minus(duration), end);
                } else {
                    // date followed by date or period
                    const start = LocalDate.parse(text.slice(0, i));
                    if (i + 1 < text.length) {
                        const c = text[i + 1];
                        if (c === 'P' || c === 'p') {
                            const duration = Period.parse(text.slice(i + 1, text.length));
                            return LocalDateRange.of(start, start.plus(duration));
                        }
                    }
                    const end = LocalDate.parse(text.slice(i + 1, text.length));
                    return LocalDateRange.of(start, end);
                }
            }
        }
        throw new DateTimeParseException('LocalDateRange cannot be parsed, no forward slash found', text, 0);
    }

    //-----------------------------------------------------------------------
    /**
     * Constructor.
     *
     * @param {LocalDate} startInclusive - the start date, inclusive, validated not null
     * @param {LocalDate} endExclusive - the end date, exclusive, validated not null
     * @private
     */
    constructor(startInclusive, endExclusive) {
        requireNonNull(startInclusive, 'startInclusive');
        requireNonNull(endExclusive, 'endExclusive');
        requireInstance(startInclusive, LocalDate, 'startInclusive');
        requireInstance(endExclusive, LocalDate, 'endExclusive');
        if (endExclusive.isBefore(startInclusive)) {
            throw new DateTimeException('End date must be on or after start date');
        }
        if (startInclusive.equals(MAXM1)) {
            throw new DateTimeException('Range must not start at LocalDate.MAX.minusDays(1)');
        }
        if (endExclusive.equals(MINP1)) {
            throw new DateTimeException('Range must not end at LocalDate.MIN.plusDays(1)');
        }
        if (endExclusive.equals(LocalDate.MIN) || startInclusive.equals(LocalDate.MAX)) {
            throw new DateTimeException('Empty range must not be at LocalDate.MIN or LocalDate.MAX');
        }
        this._start = startInclusive;
        this._end = endExclusive;
    }

    get [Symbol.toStringTag]() {
        return 'LocalDateRange';
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the start date of this range, inclusive.
     *
     * This will return `LocalDate#MIN` if the range is unbounded at the start.
     * In this case, the range includes all dates into the far-past.
     *
     * This never returns `LocalDate.MAX` or `LocalDate.MAX.minusDays(1)`.
     *
     * @return {LocalDate} the start date
     */
    start() {
        return this._start;
    }

    /**
     * Gets the end date of this range, exclusive.
     *
     * This will return `LocalDate.MAX` if the range is unbounded at the end.
     * In this case, the range includes all dates into the far-future.
     *
     * This never returns `LocalDate.MIN` or `LocalDate.MIN.plusDays(1)`.
     *
     * @return {LocalDate} the end date, exclusive
     */
    end() {
        return this._end;
    }

    /**
     * Gets the end date of this range, inclusive.
     *
     * This will return `LocalDate.MAX` if the range is unbounded at the end.
     * In this case, the range includes all dates into the far-future.
     *
     * This returns the date before the end date.
     *
     * This never returns `LocalDate.MIN`.
     *
     * @return {LocalDate} the end date, inclusive
     */
    endInclusive() {
        if (this.isUnboundedEnd()) {
            return LocalDate.MAX;
        }
        return this._end.minusDays(1);
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if the range is empty.
     *
     * An empty range occurs when the start date equals the end date.
     *
     * An empty range is never unbounded.
     *
     * @return {boolean} true if the range is empty
     */
    isEmpty() {
        return this._start.equals(this._end);
    }

    /**
     * Checks if the start of the range is unbounded.
     *
     * An unbounded range is never empty.
     *
     * @return {boolean} true if start is unbounded
     */
    isUnboundedStart() {
        return this._start.equals(LocalDate.MIN);
    }

    /**
     * Checks if the end of the range is unbounded.
     *
     * An unbounded range is never empty.
     *
     * @return {boolean} true if end is unbounded
     */
    isUnboundedEnd() {
        return this._end.equals(LocalDate.MAX);
    }

    //-----------------------------------------------------------------------
    /**
     * Returns a copy of this range with the start date adjusted.
     *
     * This returns a new instance with the start date altered.
     * Since `LocalDate` implements `TemporalAdjuster` any
     * local date can simply be passed in.
     *
     * For example, to adjust the start to one week earlier:
     * <pre>
     *  range = range.withStart(date -&gt; date.minus(1, ChronoUnit.WEEKS));
     * </pre>
     *
     * @param {TemporalAdjuster} adjuster - the adjuster to use, not null
     * @return {LocalDateRange} a copy of this range with the start date adjusted
     * @throws {DateTimeException} if the new start date is after the current end date
     */
    withStart(adjuster) {
        return LocalDateRange.of(this._start.with(adjuster), this._end);
    }

    /**
     * Returns a copy of this range with the end date adjusted.
     *
     * This returns a new instance with the exclusive end date altered.
     * Since `LocalDate` implements `TemporalAdjuster` any
     * local date can simply be passed in.
     *
     * For example, to adjust the end to one week later:
     * <pre>
     *  range = range.withEnd(date -&gt; date.plus(1, ChronoUnit.WEEKS));
     * </pre>
     *
     * @param {TemporalAdjuster} adjuster - the adjuster to use, not null
     * @return {LocalDateRange} a copy of this range with the end date adjusted
     * @throws {DateTimeException} if the new end date is before the current start date
     */
    withEnd(adjuster) {
        return LocalDateRange.of(this._start, this._end.with(adjuster));
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this range contains the specified date.
     *
     * This checks if the specified date is within the bounds of this range.
     * If this range is empty then this method always returns false.
     * Else if this range has an unbounded start then `contains(LocalDate#MIN)` returns true.
     * Else if this range has an unbounded end then `contains(LocalDate#MAX)` returns true.
     *
     * @param {LocalDate} date - the date to check for, not null
     * @return {boolean} true if this range contains the date
     */
    contains(date) {
        requireNonNull(date, 'date');
        return this._start.compareTo(date) <= 0 && (date.compareTo(this._end) < 0 || this.isUnboundedEnd());
    }

    /**
     * Checks if this range encloses the specified range.
     *
     * This checks if the bounds of the specified range are within the bounds of this range.
     * An empty range encloses itself.
     *
     * @param {LocalDateRange} other - the other range to check for, not null
     * @return {boolean} true if this range contains all dates in the other range
     */
    encloses(other) {
        requireNonNull(other, 'other');
        return this._start.compareTo(other._start) <= 0 && other._end.compareTo(this._end) <= 0;
    }

    /**
     * Checks if this range abuts the specified range.
     *
     * The result is true if the end of this range is the start of the other, or vice versa.
     * An empty range does not abut itself.
     *
     * @param {LocalDateRange} other - the other range, not null
     * @return {boolean} true if this range abuts the other range
     */
    abuts(other) {
        requireNonNull(other, 'other');
        return this._end.equals(other._start) !== this._start.equals(other._end);
    }

    /**
     * Checks if this range is connected to the specified range.
     *
     * The result is true if the two ranges have an enclosed range in common, even if that range is empty.
     * An empty range is connected to itself.
     *
     * This is equivalent to `(overlaps(other) || abuts(other))`.
     *
     * @param {LocalDateRange} other - the other range, not null
     * @return {boolean} true if this range is connected to the other range
     */
    isConnected(other) {
        requireNonNull(other, 'other');
        return this.equals(other) || (this._start.compareTo(other._end) <= 0 && other._start.compareTo(this._end) <= 0);
    }

    /**
     * Checks if this range overlaps the specified range.
     *
     * The result is true if the two ranges share some part of the time-line.
     * An empty range overlaps itself.
     *
     * This is equivalent to `(isConnected(other) && !abuts(other))`.
     *
     * @param {LocalDateRange} other - the time range to compare to, null means a zero length range now
     * @return {boolean} true if the time ranges overlap
     */
    overlaps(other) {
        requireNonNull(other, 'other');
        return other.equals(this) || (this._start.compareTo(other._end) < 0 && other._start.compareTo(this._end) < 0);
    }

    //-----------------------------------------------------------------------
    /**
     * Calculates the range that is the intersection of this range and the specified range.
     *
     * This finds the intersection of two ranges.
     * This throws an exception if the two ranges are not {@linkplain #isConnected(LocalDateRange) connected}.
     *
     * @param {LocalDateRange} other - the other range to check for, not null
     * @return {LocalDateRange} the range that is the intersection of the two ranges
     * @throws {DateTimeException} if the ranges do not connect
     */
    intersection(other) {
        requireNonNull(other, 'other');
        if (this.isConnected(other) === false) {
            throw new DateTimeException(`Ranges do not connect: ${this} and ${other}`);
        }
        const cmpStart = this._start.compareTo(other._start);
        const cmpEnd = this._end.compareTo(other._end);
        if (cmpStart >= 0 && cmpEnd <= 0) {
            return this;
        } else if (cmpStart <= 0 && cmpEnd >= 0) {
            return other;
        } else {
            const newStart = (cmpStart >= 0 ? this._start : other._start);
            const newEnd = (cmpEnd <= 0 ? this._end : other._end);
            return LocalDateRange.of(newStart, newEnd);
        }
    }

    /**
     * Calculates the range that is the union of this range and the specified range.
     *
     * This finds the union of two ranges.
     * This throws an exception if the two ranges are not {@linkplain #isConnected(LocalDateRange) connected}.
     *
     * @param {LocalDateRange} other - the other range to check for, not null
     * @return {LocalDateRange} the range that is the union of the two ranges
     * @throws {DateTimeException} if the ranges do not connect
     */
    union(other) {
        requireNonNull(other, 'other');
        if (this.isConnected(other) === false) {
            throw new DateTimeException(`Ranges do not connect: ${this} and ${other}`);
        }
        const cmpStart = this._start.compareTo(other._start);
        const cmpEnd = this._end.compareTo(other._end);
        if (cmpStart >= 0 && cmpEnd <= 0) {
            return other;
        } else if (cmpStart <= 0 && cmpEnd >= 0) {
            return this;
        } else {
            const newStart = (cmpStart >= 0 ? other._start : this._start);
            const newEnd = (cmpEnd <= 0 ? other._end : this._end);
            return LocalDateRange.of(newStart, newEnd);
        }
    }

    /**
     * Calculates the smallest range that encloses this range and the specified range.
     *
     * The result of this method will {@linkplain #encloses(LocalDateRange) enclose}
     * this range and the specified range.
     *
     * @param {LocalDateRange} other - the other range to check for, not null
     * @return {LocalDateRange} the range that spans the two ranges
     */
    span(other) {
        requireNonNull(other, 'other');
        const cmpStart = this._start.compareTo(other._start);
        const cmpEnd = this._end.compareTo(other._end);
        const newStart = (cmpStart >= 0 ? other._start : this._start);
        const newEnd = (cmpEnd <= 0 ? other._end : this._end);
        return LocalDateRange.of(newStart, newEnd);
    }

    /**
     * Function overloading for {@link LocalDateRange.isAfter}
     * - if called with `LocalDate`, {@link LocalDateRange._isAfterLocalDate} is executed,
     * - if called with `LocalDateRange`, {@link LocalDateRange._isAfterLocalDateRange} is executed,
     * - otherwise throws IllegalArgumentException.
     *
     * @param {LocalDate|LocalDateRange} localDateOrLocalDateRange
     * @return {boolean}
     */
    isAfter(localDateOrLocalDateRange) {
        if (localDateOrLocalDateRange instanceof LocalDate) {
            return this._isAfterLocalDate(localDateOrLocalDateRange);
        }
        if (localDateOrLocalDateRange instanceof LocalDateRange) {
            return this._isAfterLocalDateRange(localDateOrLocalDateRange);
        }
        throw new IllegalArgumentException(`localDateOrLocalDateRange must be an instance of LocalDate or LocalDateRange but is ${localDateOrLocalDateRange.constructor.name}`);
    }

    /**
     * Function overloading for {@link LocalDateRange.isBefore}
     * - if called with `LocalDate`, {@link LocalDateRange._isBeforeLocalDate} is executed,
     * - if called with `LocalDateRange`, {@link LocalDateRange._isBeforeLocalDateRange} is executed,
     * - otherwise throws IllegalArgumentException.
     *
     * @param {LocalDate|LocalDateRange} localDateOrLocalDateRange
     * @return {boolean}
     */
    isBefore(localDateOrLocalDateRange) {
        if (localDateOrLocalDateRange instanceof LocalDate) {
            return this._isBeforeLocalDate(localDateOrLocalDateRange);
        }
        if (localDateOrLocalDateRange instanceof LocalDateRange) {
            return this._isBeforeLocalDateRange(localDateOrLocalDateRange);
        }
        throw new IllegalArgumentException(`localDateOrLocalDateRange must be an instance of LocalDate or LocalDateRange but is ${localDateOrLocalDateRange.constructor.name}`);
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this range is after the specified date.
     *
     * The result is true if every date in this range is after the specified date.
     * An empty range behaves as though it is a date for comparison purposes.
     *
     * @param {LocalDate} date - the other date to compare to, not null
     * @return {boolean} true if the start of this range is after the specified date
     * @protected
     */
    _isAfterLocalDate(date) {
        return this._start.compareTo(date) > 0;
    }

    /**
     * Checks if this range is before the specified date.
     *
     * The result is true if every date in this range is before the specified date.
     * An empty range behaves as though it is a date for comparison purposes.
     *
     * @param {LocalDate} date - the other date to compare to, not null
     * @return {boolean} true if the start of this range is before the specified date
     * @protected
     */
    _isBeforeLocalDate(date) {
        return this._end.compareTo(date) <= 0 && this._start.compareTo(date) < 0;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this range is after the specified range.
     *
     * The result is true if every date in this range is after every date in the specified range.
     * An empty range behaves as though it is a date for comparison purposes.
     *
     * @param {LocalDateRange} other - the other range to compare to, not null
     * @return {boolean} true if every date in this range is after every date in the other range
     * @protected
     */
    _isAfterLocalDateRange(other) {
        return this._start.compareTo(other._end) >= 0 && !other.equals(this);
    }

    /**
     * Checks if this range is before the specified range.
     *
     * The result is true if every date in this range is before every date in the specified range.
     * An empty range behaves as though it is a date for comparison purposes.
     *
     * @param {LocalDateRange} range - the other range to compare to, not null
     * @return {boolean} true if every date in this range is before every date in the other range
     * @protected
     */
    _isBeforeLocalDateRange(range) {
        return this._end.compareTo(range._start) <= 0 && !range.equals(this);
    }

    //-----------------------------------------------------------------------
    /**
     * Obtains the length of this range in days.
     *
     * This returns the number of days between the start and end dates.
     * Unbounded ranges return `Number.POSITIVE_INFINITY`.
     *
     * @return {number} the length in days, `Number.POSITIVE_INFINITY` if unbounded
     */
    lengthInDays() {
        if (this.isUnboundedStart() || this.isUnboundedEnd()) {
            return Number.POSITIVE_INFINITY;
        }
        return this._end.toEpochDay() - this._start.toEpochDay();
    }

    /**
     * Obtains the length of this range as a period.
     *
     * This returns the {@link Period} between the start and end dates.
     * Unbounded ranges throw {@link ArithmeticException}.
     *
     * @return {Period} the period of the range
     * @throws {ArithmeticException} if the calculation exceeds the capacity of `Period`,
     *   or the range is unbounded
     */
    toPeriod() {
        if (this.isUnboundedStart() || this.isUnboundedEnd()) {
            throw new ArithmeticException('Unbounded range cannot be converted to a Period');
        }
        return Period.between(this._start, this._end);
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this range is equal to another range.
     *
     * Compares this `LocalDateRange` with another ensuring that the two dates are the same.
     * Only objects of type `LocalDateRange` are compared, other types return false.
     *
     * @param {*} obj - the object to check, null returns false
     * @return {boolean} true if this is equal to the other range
     */
    equals(obj) {
        if (this === obj) {
            return true;
        }
        if (obj instanceof LocalDateRange) {
            const other = obj;
            return this._start.equals(other._start) && this._end.equals(other._end);
        }
        return false;
    }

    /**
     * A hash code for this range.
     *
     * @return {number} a suitable hash code
     */
    hashCode() {
        return this._start.hashCode() ^ this._end.hashCode();
    }

    //-----------------------------------------------------------------------
    /**
     * Outputs this range as a `String`, such as `2007-12-03/2007-12-04`.
     *
     * The output will be the ISO-8601 format formed by combining the
     * `toString()` methods of the two dates, separated by a forward slash.
     *
     * @return {string} a string representation of this date, not null
     */
    toString() {
        return `${this._start.toString()}/${this._end.toString()}`;
    }
}

export function _init() {
    /**
     * A range over the whole time-line.
     */
    LocalDateRange.ALL = new LocalDateRange(LocalDate.MIN, LocalDate.MAX);
}

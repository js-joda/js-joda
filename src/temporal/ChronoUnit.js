/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {MathUtil} from '../MathUtil';

import {Duration} from '../Duration';
import {YearConstants} from '../YearConstants';
import {TemporalUnit} from './TemporalUnit';

/**
 * A standard set of date periods units.
 *
 * This set of units provide unit-based access to manipulate a date, time or date-time.
 * The standard set of units can be extended by implementing {@link TemporalUnit}.
 *
 * These units are intended to be applicable in multiple calendar systems.
 * For example, most non-ISO calendar systems define units of years, months and days,
 * just with slightly different rules.
 * The documentation of each unit explains how it operates.
 *
 * ### Static properties of Class {@link ChronoUnit}
 *
 * ChronoUnit.NANOS
 *
 * Unit that represents the concept of a nanosecond, the smallest supported unit of time.
 * For the ISO calendar system, it is equal to the 1,000,000,000th part of the second unit.
 *
 * ChronoUnit.MICROS
 *
 * Unit that represents the concept of a microsecond.
 * For the ISO calendar system, it is equal to the 1,000,000th part of the second unit.
 *
 * ChronoUnit.MILLIS
 *
 * Unit that represents the concept of a millisecond.
 * For the ISO calendar system, it is equal to the 1000th part of the second unit.
 *
 * ChronoUnit.SECONDS
 *
 * Unit that represents the concept of a second.
 * For the ISO calendar system, it is equal to the second in the SI system
 * of units, except around a leap-second.
 *
 * ChronoUnit.MINUTES
 *
 * Unit that represents the concept of a minute.
 * For the ISO calendar system, it is equal to 60 seconds.
 *
 * ChronoUnit.HOURS
 *
 * Unit that represents the concept of an hour.
 * For the ISO calendar system, it is equal to 60 minutes.
 *
 * ChronoUnit.HALF_DAYS
 *
 * Unit that represents the concept of half a day, as used in AM/PM.
 * For the ISO calendar system, it is equal to 12 hours.
 *
 * ChronoUnit.DAYS
 *
 * Unit that represents the concept of a day.
 * For the ISO calendar system, it is the standard day from midnight to midnight.
 * The estimated duration of a day is 24 hours.
 *
 * When used with other calendar systems it must correspond to the day defined by
 * the rising and setting of the Sun on Earth. It is not required that days begin
 * at midnight - when converting between calendar systems, the date should be
 * equivalent at midday.
 *
 * ChronoUnit.WEEKS
 *
 * Unit that represents the concept of a week.
 * For the ISO calendar system, it is equal to 7 days.
 *
 * When used with other calendar systems it must correspond to an integral number of days.
 *
 * ChronoUnit.MONTHS
 *
 * Unit that represents the concept of a month.
 * For the ISO calendar system, the length of the month varies by month-of-year.
 * The estimated duration of a month is one twelfth of 365.2425 days.
 *
 * When used with other calendar systems it must correspond to an integral number of days.
 *
 * ChronoUnit.YEARS
 *
 * Unit that represents the concept of a year.
 * For the ISO calendar system, it is equal to 12 months.
 * The estimated duration of a year is 365.2425 days.
 *
 * When used with other calendar systems it must correspond to an integral number of days
 * or months roughly equal to a year defined by the passage of the Earth around the Sun.
 *
 * ChronoUnit.DECADES
 *
 * Unit that represents the concept of a decade.
 * For the ISO calendar system, it is equal to 10 years.
 *
 * When used with other calendar systems it must correspond to an integral number of days
 * and is normally an integral number of years.
 *
 * ChronoUnit.CENTURIES
 *
 * Unit that represents the concept of a century.
 * For the ISO calendar system, it is equal to 100 years.
 *
 * When used with other calendar systems it must correspond to an integral number of days
 * and is normally an integral number of years.
 *
 * ChronoUnit.MILLENNIA
 *
 * Unit that represents the concept of a millennium.
 * For the ISO calendar system, it is equal to 1000 years.
 *
 * When used with other calendar systems it must correspond to an integral number of days
 * and is normally an integral number of years.
 *
 * ChronoUnit.ERAS
 *
 * Unit that represents the concept of an era.
 * The ISO calendar system doesn't have eras thus it is impossible to add
 * an era to a date or date-time.
 * The estimated duration of the era is artificially defined as {Year.MAX_VALUE} + 1.
 *
 * When used with other calendar systems there are no restrictions on the unit.
 *
 * ChronoUnit.FOREVER
 *
 * Artificial unit that represents the concept of forever.
 * This is primarily used with {@link TemporalField} to represent unbounded fields
 * such as the year or era.
 * The estimated duration of the era is artificially defined as the largest duration
 * supported by {@link Duration}.
 *
 */
export class ChronoUnit extends TemporalUnit {

    /**
     *
     * @param {String} name
     * @param {Duration} estimatedDuration
     * @private
     */
    constructor (name, estimatedDuration) {
        super();
        this._name = name;
        this._duration = estimatedDuration;
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the estimated duration of this unit in the ISO calendar system.
     *
     * All of the units in this class have an estimated duration.
     * Days vary due to daylight saving time, while months have different lengths.
     *
     * @return {Duration} the estimated duration of this unit, not null
     */
    duration() {
        return this._duration;
    }

    /**
     * Checks if the duration of the unit is an estimate.
     *
     * All time units in this class are considered to be accurate, while all date
     * units in this class are considered to be estimated.
     *
     * This definition ignores leap seconds, but considers that Days vary due to
     * daylight saving time and months have different lengths.
     *
     * @return {boolean} true if the duration is estimated, false if accurate
     */
    isDurationEstimated() {
        return this.isDateBased() || this === ChronoUnit.FOREVER;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this unit is a date unit.
     *
     * @return true if a date unit, false if a time unit
     */
    isDateBased() {
        return this.compareTo(ChronoUnit.DAYS) >= 0 && this !== ChronoUnit.FOREVER;
    }

    /**
     * Checks if this unit is a time unit.
     *
     * @return true if a time unit, false if a date unit
     */
    isTimeBased() {
        return this.compareTo(ChronoUnit.DAYS) < 0;
    }

    //-----------------------------------------------------------------------
    /**
     * Checks if this unit is supported by the specified temporal object.
     *
     * This checks that the implementing date-time can add/subtract this unit.
     * This can be used to avoid throwing an exception.
     *
     * This default implementation derives the value using
     * {@link Temporal#plus}.
     *
     * @param {Temporal} temporal  the temporal object to check, not null
     * @return {boolean} true if the unit is supported
     */
    isSupportedBy(temporal) {
        if (this === ChronoUnit.FOREVER) {
            return false;
        }
        /* TODO: classes not implemented yet */
        /*
        if (temporal instanceof ChronoLocalDate) {
            return isDateBased();
        }
        if (temporal instanceof ChronoLocalDateTime || temporal instanceof ChronoZonedDateTime) {
            return true;
        }
*/
        try {
            temporal.plus(1, this);
            return true;
        } catch (e) {
            try {
                temporal.plus(-1, this);
                return true;
            } catch (e2) {
                return false;
            }
        }
    }

    /**
     * Returns a copy of the specified temporal object with the specified period added.
     *
     * The period added is a multiple of this unit. For example, this method
     * could be used to add "3 days" to a date by calling this method on the
     * instance representing "days", passing the date and the period "3".
     * The period to be added may be negative, which is equivalent to subtraction.
     *
     * There are two equivalent ways of using this method.
     * The first is to invoke this method directly.
     * The second is to use {@link Temporal#plus}:
     * <pre>
     *   // these two lines are equivalent, but the second approach is recommended
     *   temporal = thisUnit.addTo(temporal);
     *   temporal = temporal.plus(thisUnit);
     * </pre>
     * It is recommended to use the second approach, {@link plus},
     * as it is a lot clearer to read in code.
     *
     * Implementations should perform any queries or calculations using the units
     * available in {@link ChronoUnit} or the fields available in {@link ChronoField}.
     * If the unit is not supported an {@link UnsupportedTemporalTypeException} must be thrown.
     *
     * Implementations must not alter the specified temporal object.
     * Instead, an adjusted copy of the original must be returned.
     * This provides equivalent, safe behavior for immutable and mutable implementations.
     *
     * @param {Temporal} temporal  the temporal object to adjust, not null
     * @param {Number} amount  the amount of this unit to add, positive or negative
     * @return {Temporal} the adjusted temporal object, not null
     * @throws DateTimeException if the amount cannot be added
     * @throws UnsupportedTemporalTypeException if the unit is not supported by the temporal
     */
    addTo(temporal, amount) {
        return temporal.plus(amount, this);
    }

    //-----------------------------------------------------------------------
    /**
     * Calculates the amount of time between two temporal objects.
     *
     * This calculates the amount in terms of this unit. The start and end
     * points are supplied as temporal objects and must be of compatible types.
     * The implementation will convert the second type to be an instance of the
     * first type before the calculating the amount.
     * The result will be negative if the end is before the start.
     * For example, the amount in hours between two temporal objects can be
     * calculated using {@link HOURS.between}.
     *
     * The calculation returns a whole number, representing the number of
     * complete units between the two temporals.
     * For example, the amount in hours between the times 11:30 and 13:29
     * will only be one hour as it is one minute short of two hours.
     *
     * There are two equivalent ways of using this method.
     * The first is to invoke this method directly.
     * The second is to use {@link Temporal#until}:
     * <pre>
     *   // these two lines are equivalent
     *   between = thisUnit.between(start, end);
     *   between = start.until(end, thisUnit);
     * </pre>
     * The choice should be made based on which makes the code more readable.
     *
     * For example, this method allows the number of days between two dates to
     * be calculated:
     * <pre>
     *  daysBetween = DAYS.between(start, end);
     *  // or alternatively
     *  daysBetween = start.until(end, DAYS);
     * </pre>
     *
     * Implementations should perform any queries or calculations using the units
     * available in {@link ChronoUnit} or the fields available in {@link ChronoField}.
     * If the unit is not supported an {@link UnsupportedTemporalTypeException} must be thrown.
     * Implementations must not alter the specified temporal objects.
     *
     * @implSpec
     * Implementations must begin by checking to if the two temporals have the
     * same type using `.constructor.name`. If they do not, then the result must be
     * obtained by calling `temporal1.until`.
     *
     * @param {Temporal} temporal1  the base temporal object, not null
     * @param {Temporal} temporal2  the other temporal object, exclusive, not null
     * @return {Number} the amount of time between temporal1 and temporal2
     *  in terms of this unit; positive if temporal2 is later than
     *  temporal1, negative if earlier
     * @throws DateTimeException if the amount cannot be calculated, or the end
     *  temporal cannot be converted to the same type as the start temporal
     * @throws UnsupportedTemporalTypeException if the unit is not supported by the temporal
     * @throws ArithmeticException if numeric overflow occurs
     */
    between(temporal1, temporal2) {
        return temporal1.until(temporal2, this);
    }

    //-----------------------------------------------------------------------
    toString() {
        return this._name;
    }

    /**
     * Compares this ChronoUnit to the specified {TemporalUnit}.
     *
     * The comparison is based on the total length of the durations.
     *
     * @param {TemporalUnit} other  the other unit to compare to, not null
     * @return the comparator value, negative if less, positive if greater
     */
    compareTo(other) {
        return this.duration().compareTo(other.duration());
    }

}

export function _init() {
    /**
     * Unit that represents the concept of a nanosecond, the smallest supported unit of time.
     * For the ISO calendar system, it is equal to the 1,000,000,000th part of the second unit.
     */
    ChronoUnit.NANOS = new ChronoUnit('Nanos', Duration.ofNanos(1));
    /**
     * Unit that represents the concept of a microsecond.
     * For the ISO calendar system, it is equal to the 1,000,000th part of the second unit.
     */
    ChronoUnit.MICROS = new ChronoUnit('Micros', Duration.ofNanos(1000));
    /**
     * Unit that represents the concept of a millisecond.
     * For the ISO calendar system, it is equal to the 1000th part of the second unit.
     */
    ChronoUnit.MILLIS = new ChronoUnit('Millis', Duration.ofNanos(1000000));
    /**
     * Unit that represents the concept of a second.
     * For the ISO calendar system, it is equal to the second in the SI system
     * of units, except around a leap-second.
     */
    ChronoUnit.SECONDS = new ChronoUnit('Seconds', Duration.ofSeconds(1));
    /**
     * Unit that represents the concept of a minute.
     * For the ISO calendar system, it is equal to 60 seconds.
     */
    ChronoUnit.MINUTES = new ChronoUnit('Minutes', Duration.ofSeconds(60));
    /**
     * Unit that represents the concept of an hour.
     * For the ISO calendar system, it is equal to 60 minutes.
     */
    ChronoUnit.HOURS = new ChronoUnit('Hours', Duration.ofSeconds(3600));
    /**
     * Unit that represents the concept of half a day, as used in AM/PM.
     * For the ISO calendar system, it is equal to 12 hours.
     */
    ChronoUnit.HALF_DAYS = new ChronoUnit('HalfDays', Duration.ofSeconds(43200));
    /**
     * Unit that represents the concept of a day.
     * For the ISO calendar system, it is the standard day from midnight to midnight.
     * The estimated duration of a day is 24 hours.
     *
     * When used with other calendar systems it must correspond to the day defined by
     * the rising and setting of the Sun on Earth. It is not required that days begin
     * at midnight - when converting between calendar systems, the date should be
     * equivalent at midday.
     */
    ChronoUnit.DAYS = new ChronoUnit('Days', Duration.ofSeconds(86400));
    /**
     * Unit that represents the concept of a week.
     * For the ISO calendar system, it is equal to 7 days.
     *
     * When used with other calendar systems it must correspond to an integral number of days.
     */
    ChronoUnit.WEEKS = new ChronoUnit('Weeks', Duration.ofSeconds(7 * 86400));
    /**
     * Unit that represents the concept of a month.
     * For the ISO calendar system, the length of the month varies by month-of-year.
     * The estimated duration of a month is one twelfth of 365.2425 days.
     *
     * When used with other calendar systems it must correspond to an integral number of days.
     */
    ChronoUnit.MONTHS = new ChronoUnit('Months', Duration.ofSeconds(31556952 / 12));
    /**
     * Unit that represents the concept of a year.
     * For the ISO calendar system, it is equal to 12 months.
     * The estimated duration of a year is 365.2425 days.
     *
     * When used with other calendar systems it must correspond to an integral number of days
     * or months roughly equal to a year defined by the passage of the Earth around the Sun.
     */
    ChronoUnit.YEARS = new ChronoUnit('Years', Duration.ofSeconds(31556952));
    /**
     * Unit that represents the concept of a decade.
     * For the ISO calendar system, it is equal to 10 years.
     *
     * When used with other calendar systems it must correspond to an integral number of days
     * and is normally an integral number of years.
     */
    ChronoUnit.DECADES = new ChronoUnit('Decades', Duration.ofSeconds(31556952 * 10));
    /**
     * Unit that represents the concept of a century.
     * For the ISO calendar system, it is equal to 100 years.
     *
     * When used with other calendar systems it must correspond to an integral number of days
     * and is normally an integral number of years.
     */
    ChronoUnit.CENTURIES = new ChronoUnit('Centuries', Duration.ofSeconds(31556952 * 100));
    /**
     * Unit that represents the concept of a millennium.
     * For the ISO calendar system, it is equal to 1000 years.
     *
     * When used with other calendar systems it must correspond to an integral number of days
     * and is normally an integral number of years.
     */
    ChronoUnit.MILLENNIA = new ChronoUnit('Millennia', Duration.ofSeconds(31556952 * 1000));
    /**
     * Unit that represents the concept of an era.
     * The ISO calendar system doesn't have eras thus it is impossible to add
     * an era to a date or date-time.
     * The estimated duration of the era is artificially defined as {Year.MAX_VALUE} + 1.
     *
     * When used with other calendar systems there are no restrictions on the unit.
     */
    ChronoUnit.ERAS = new ChronoUnit('Eras', Duration.ofSeconds(31556952 * (YearConstants.MAX_VALUE + 1)));
    /**
     * Artificial unit that represents the concept of forever.
     * This is primarily used with {@link TemporalField} to represent unbounded fields
     * such as the year or era.
     * The estimated duration of the era is artificially defined as the largest duration
     * supported by {@link Duration}.
     */
    ChronoUnit.FOREVER = new ChronoUnit('Forever', Duration.ofSeconds(MathUtil.MAX_SAFE_INTEGER, 999999999));
}

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
 * ### Static properties:
 * 
 * - `ChronoUnit.CENTURIES`: Unit that represents the concept of a century. For the ISO calendar
 * system, it is equal to 100 years.
 * 
 * - `ChronoUnit.DAYS`: Unit that represents the concept of a day. For the ISO calendar system, it
 * is the standard day from midnight to midnight. The estimated duration of a day is 24 Hours.
 * 
 * - `ChronoUnit.DECADES`: Unit that represents the concept of a decade. For the ISO calendar system,
 * it is equal to 10 years.
 * 
 * - `ChronoUnit.ERAS`: Unit that represents the concept of an era. The ISO calendar system doesn't
 * have eras thus it is impossible to add an era to a date or date-time. The estimated duration of the
 * era is artificially defined as 1,000,000,000 Years.
 * 
 * - `ChronoUnit.FOREVER`: Artificial unit that represents the concept of forever. This is primarily
 * used with {@link TemporalField} to represent unbounded fields such as the year or era. The
 * estimated duration of the era is artificially defined as the largest duration supported by
 * {@link Duration}.
 * 
 * - `ChronoUnit.HALF_DAYS`: Unit that represents the concept of half a day, as used in AM/PM. For
 * the ISO calendar system, it is equal to 12 hours.
 *
 * - `ChronoUnit.HOURS`: Unit that represents the concept of an hour. For the ISO calendar system,
 * it is equal to 60 minutes.
 * 
 * - `ChronoUnit.MICROS`: Unit that represents the concept of a microsecond. For the ISO calendar
 * system, it is equal to the 1,000,000th part of the second unit.
 * 
 * - `ChronoUnit.MILLENNIA`: Unit that represents the concept of a millennium. For the ISO calendar
 * system, it is equal to 1,000 years.
 * 
 * - `ChronoUnit.MILLIS`: Unit that represents the concept of a millisecond. For the ISO calendar
 * system, it is equal to the 1000th part of the second unit.
 * 
 * - `ChronoUnit.MINUTES`: Unit that represents the concept of a minute. For the ISO calendar system,
 * it is equal to 60 seconds.
 * 
 * - `ChronoUnit.MONTHS`: Unit that represents the concept of a month. For the ISO calendar system,
 * the length of the month varies by month-of-year. The estimated duration of a month is one twelfth
 * of 365.2425 Days.
 * 
 * - `ChronoUnit.NANOS`: Unit that represents the concept of a nanosecond, the smallest supported unit
 * of time. For the ISO calendar system, it is equal to the 1,000,000,000th part of the second unit.
 * 
 * - `ChronoUnit.SECONDS`: Unit that represents the concept of a second. For the ISO calendar system,
 * it is equal to the second in the SI system of units, except around a leap-second.
 * 
 * - `ChronoUnit.WEEKS`: Unit that represents the concept of a week. For the ISO calendar system,
 * it is equal to 7 Days.
 * 
 * - `ChronoUnit.YEARS`: Unit that represents the concept of a year. For the ISO calendar system, it
 * is equal to 12 months. The estimated duration of a year is 365.2425 Days.
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
     * @return {Duration} the duration of this unit, which may be an estimate.
     */
    duration() {
        return this._duration;
    }

    /**
     * @return {boolean} `true` if the duration is estimated, `false` if accurate.
     */
    isDurationEstimated() {
        return this.isDateBased() || this === ChronoUnit.FOREVER;
    }

    //-----------------------------------------------------------------------
    /**
     * @return {boolean} `true` if date unit, `false` if a time unit.
     */
    isDateBased() {
        return this.compareTo(ChronoUnit.DAYS) >= 0 && this !== ChronoUnit.FOREVER;
    }

    /**
     * Checks if this unit is a time unit.
     *
     * @return {boolean} `true` if time unit, `false` if a date unit.
     */
    isTimeBased() {
        return this.compareTo(ChronoUnit.DAYS) < 0;
    }

    //-----------------------------------------------------------------------
    /**
     * @param {!Temporal} temporal the temporal object to check.
     * @return {boolean} `true` if the unit is supported.
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
     * @param {!Temporal} dateTime the temporal object to adjust.
     * @param {number} periodToAdd the period of this unit to add, positive or negative.
     * @return {Temporal} the adjusted temporal object.
     * @throws DateTimeException if the period cannot be added.
     */
    addTo(temporal, amount) {
        return temporal.plus(amount, this);
    }

    //-----------------------------------------------------------------------
    /**
     * @param {!Temporal} temporal1 the base temporal object.
     * @param {!Temporal} temporal2 the other temporal object.
     * @return {number} the period between temporal1 and temporal2 in terms of this unit;
     *  positive if temporal2 is later than temporal1, negative if earlier.
     * @throws DateTimeException if the period cannot be calculated.
     * @throws ArithmeticException if numeric overflow occurs.
     */
    between(temporal1, temporal2) {
        return temporal1.until(temporal2, this);
    }

    //-----------------------------------------------------------------------
    toString() {
        return this._name;
    }

    /**
     * Compares this ChronoUnit to the specified {@link TemporalUnit}.
     *
     * The comparison is based on the total length of the durations.
     *
     * @param {!TemporalUnit} other the other unit to compare to.
     * @return the comparator value, negative if less, positive if greater.
     */
    compareTo(other) {
        return this.duration().compareTo(other.duration());
    }

    /**
     * Unit that represents the concept of a nanosecond, the smallest supported unit of time.
     * For the ISO calendar system, it is equal to the 1,000,000,000th part of the second unit.
     */
    static get NANOS()  { delete ChronoUnit.NANOS; ChronoUnit.NANOS = new ChronoUnit('Nanos', Duration.ofNanos(1));; return ChronoUnit.NANOS;} 
    /**
     * Unit that represents the concept of a microsecond.
     * For the ISO calendar system, it is equal to the 1,000,000th part of the second unit.
     */
    static get MICROS()  { delete ChronoUnit.MICROS; ChronoUnit.MICROS = new ChronoUnit('Micros', Duration.ofNanos(1000));; return ChronoUnit.MICROS;} 
    /**
     * Unit that represents the concept of a millisecond.
     * For the ISO calendar system, it is equal to the 1000th part of the second unit.
     */
    static get MILLIS()  { delete ChronoUnit.MILLIS; ChronoUnit.MILLIS = new ChronoUnit('Millis', Duration.ofNanos(1000000));; return ChronoUnit.MILLIS;} 
    /**
     * Unit that represents the concept of a second.
     * For the ISO calendar system, it is equal to the second in the SI system
     * of units, except around a leap-second.
     */
    static get SECONDS()  { delete ChronoUnit.SECONDS; ChronoUnit.SECONDS = new ChronoUnit('Seconds', Duration.ofSeconds(1));; return ChronoUnit.SECONDS;} 
    /**
     * Unit that represents the concept of a minute.
     * For the ISO calendar system, it is equal to 60 seconds.
     */
    static get MINUTES()  { delete ChronoUnit.MINUTES; ChronoUnit.MINUTES = new ChronoUnit('Minutes', Duration.ofSeconds(60));; return ChronoUnit.MINUTES;} 
    /**
     * Unit that represents the concept of an hour.
     * For the ISO calendar system, it is equal to 60 minutes.
     */
    static get HOURS()  { delete ChronoUnit.HOURS; ChronoUnit.HOURS = new ChronoUnit('Hours', Duration.ofSeconds(3600));; return ChronoUnit.HOURS;} 
    /**
     * Unit that represents the concept of half a day, as used in AM/PM.
     * For the ISO calendar system, it is equal to 12 hours.
     */
    static get HALF_DAYS() {delete ChronoUnit.HALF_DAYS; ChronoUnit.HALF_DAYS = new ChronoUnit('HalfDays', Duration.ofSeconds(43200)); return ChronoUnit.HALF_DAYS; }
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
    static get DAYS()  { delete ChronoUnit.DAYS; ChronoUnit.DAYS = new ChronoUnit('Days', Duration.ofSeconds(86400));; return ChronoUnit.DAYS;} 
    /**
     * Unit that represents the concept of a week.
     * For the ISO calendar system, it is equal to 7 days.
     *
     * When used with other calendar systems it must correspond to an integral number of days.
     */
    static get WEEKS()  { delete ChronoUnit.WEEKS; ChronoUnit.WEEKS = new ChronoUnit('Weeks', Duration.ofSeconds(7 * 86400));; return ChronoUnit.WEEKS;} 
    /**
     * Unit that represents the concept of a month.
     * For the ISO calendar system, the length of the month varies by month-of-year.
     * The estimated duration of a month is one twelfth of 365.2425 days.
     *
     * When used with other calendar systems it must correspond to an integral number of days.
     */
    static get MONTHS()  { delete ChronoUnit.MONTHS; ChronoUnit.MONTHS = new ChronoUnit('Months', Duration.ofSeconds(31556952 / 12));; return ChronoUnit.MONTHS;} 
    /**
     * Unit that represents the concept of a year.
     * For the ISO calendar system, it is equal to 12 months.
     * The estimated duration of a year is 365.2425 days.
     *
     * When used with other calendar systems it must correspond to an integral number of days
     * or months roughly equal to a year defined by the passage of the Earth around the Sun.
     */
    static get YEARS()  { delete ChronoUnit.YEARS; ChronoUnit.YEARS = new ChronoUnit('Years', Duration.ofSeconds(31556952));; return ChronoUnit.YEARS;} 
    /**
     * Unit that represents the concept of a decade.
     * For the ISO calendar system, it is equal to 10 years.
     *
     * When used with other calendar systems it must correspond to an integral number of days
     * and is normally an integral number of years.
     */
    static get DECADES()  { delete ChronoUnit.DECADES; ChronoUnit.DECADES = new ChronoUnit('Decades', Duration.ofSeconds(31556952 * 10));; return ChronoUnit.DECADES;} 
    /**
     * Unit that represents the concept of a century.
     * For the ISO calendar system, it is equal to 100 years.
     *
     * When used with other calendar systems it must correspond to an integral number of days
     * and is normally an integral number of years.
     */
    static get CENTURIES()  { delete ChronoUnit.CENTURIES; ChronoUnit.CENTURIES = new ChronoUnit('Centuries', Duration.ofSeconds(31556952 * 100));; return ChronoUnit.CENTURIES;} 
    /**
     * Unit that represents the concept of a millennium.
     * For the ISO calendar system, it is equal to 1000 years.
     *
     * When used with other calendar systems it must correspond to an integral number of days
     * and is normally an integral number of years.
     */
    static get MILLENNIA()  { delete ChronoUnit.MILLENNIA; ChronoUnit.MILLENNIA = new ChronoUnit('Millennia', Duration.ofSeconds(31556952 * 1000));; return ChronoUnit.MILLENNIA;} 
    /**
     * Unit that represents the concept of an era.
     * The ISO calendar system doesn't have eras thus it is impossible to add
     * an era to a date or date-time.
     * The estimated duration of the era is artificially defined as {Year.MAX_VALUE} + 1.
     *
     * When used with other calendar systems there are no restrictions on the unit.
     */
    static get ERAS()  { delete ChronoUnit.ERAS; ChronoUnit.ERAS = new ChronoUnit('Eras', Duration.ofSeconds(31556952 * (YearConstants.MAX_VALUE + 1)));; return ChronoUnit.ERAS;} 
    /**
     * Artificial unit that represents the concept of forever.
     * This is primarily used with {@link TemporalField} to represent unbounded fields
     * such as the year or era.
     * The estimated duration of the era is artificially defined as the largest duration
     * supported by {@link Duration}.
     */
    static get FOREVER()  { delete ChronoUnit.FOREVER; ChronoUnit.FOREVER = new ChronoUnit('Forever', Duration.ofSeconds(MathUtil.MAX_SAFE_INTEGER, 999999999));; return ChronoUnit.FOREVER;} 
}

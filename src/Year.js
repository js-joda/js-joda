/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {requireNonNull, requireInstance} from './assert';

import {ChronoField} from './temporal/ChronoField';
import {Clock} from './Clock';
import {DateTimeException} from './errors';
import {LocalDate} from './LocalDate';
import {Temporal} from './temporal/Temporal';
import {TemporalAccessor} from './temporal/TemporalAccessor';
import {ZoneId} from './ZoneId';

/**
 * A year in the ISO-8601 calendar system, such as {@code 2007}.
 * <p>
 * {@code Year} is an immutable date-time object that represents a year.
 * Any field that can be derived from a year can be obtained.
 * <p>
 * <b>Note that years in the ISO chronology only align with years in the
 * Gregorian-Julian system for modern years. Parts of Russia did not switch to the
 * modern Gregorian/ISO rules until 1920.
 * As such, historical years must be treated with caution.</b>
 * <p>
 * This class does not store or represent a month, day, time or time-zone.
 * For example, the value "2007" can be stored in a {@code Year}.
 * <p>
 * Years represented by this class follow the ISO-8601 standard and use
 * the proleptic numbering system. Year 1 is preceded by year 0, then by year -1.
 * <p>
 * The ISO-8601 calendar system is the modern civil calendar system used today
 * in most of the world. It is equivalent to the proleptic Gregorian calendar
 * system, in which today's rules for leap years are applied for all time.
 * For most applications written today, the ISO-8601 rules are entirely suitable.
 * However, any application that makes use of historical dates, and requires them
 * to be accurate will find the ISO-8601 approach unsuitable.
 *
 * <h3>Static properties of Class {@link LocalDate}</h3>
 *
 * YearConstants.MIN_VALUE = -999.999;
 *
 * The minimum supported year. Theoretically the minimum could be -28.542.4812 years in javascript.
 * approx LocalDateTime.ofEpochSecond(Number.MIN_SAFE_INTEGER, 0, ZoneOffset.UTC).year()
 *
 * YearConstants.MAX_VALUE = 999.999;
 *
 * The maximum supported year. Theoretically the maximum could be 285.428.751 years in javascript.
 * approx LocalDateTime.ofEpochSecond(Number.MAX_SAFE_INTEGER, 0, ZoneOffset.UTC).year()
 *
 */
export class Year extends Temporal {

    /**
     *
     * @param {number} value
     */
    constructor(value) {
        super();
        this._value = value;
    }

    /**
     *
     * @return {number} gets the value
     */
    value() {
        return this._value;
    }

    /**
     * to handle function overriding this function accepts zero or one arguments, checks their type and delegates to the appropriate function
     *
     * @return {Year}
     */
    static now(arg = undefined) {
        if (arg === undefined) {
            return Year._now();
        } else if (arg instanceof ZoneId) {
            return Year._nowZoneId(arg);
        } else {
            return Year._nowClock(arg);
        }
    }
    
    /**
     * Obtains the current year from the system clock in the default time-zone.
     * <p>
     * This will query the {@link Clock#systemDefaultZone() system clock} in the default
     * time-zone to obtain the current year.
     * <p>
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @return {Year} the current year using the system clock and default time-zone, not null
     */
    static _now() {
        return Year._nowClock(Clock.systemDefaultZone());
    }

    /**
     * Obtains the current year from the system clock in the specified time-zone.
     * <p>
     * This will query the {@link Clock#system(ZoneId) system clock} to obtain the current year.
     * Specifying the time-zone avoids dependence on the default time-zone.
     * <p>
     * Using this method will prevent the ability to use an alternate clock for testing
     * because the clock is hard-coded.
     *
     * @param {ZoneId} zone  the zone ID to use, not null
     * @return {Year} the current year using the system clock, not null
     */
    static _nowZoneId(zone) {
        requireNonNull(zone, 'zone');
        requireInstance(zone, ZoneId, 'zone');
        return Year._nowClock(Clock.system(zone));
    }

    /**
     * Obtains the current year from the specified clock.
     * <p>
     * This will query the specified clock to obtain the current year.
     * Using this method allows the use of an alternate clock for testing.
     * The alternate clock may be introduced using {@link Clock dependency injection}.
     *
     * @param {Clock} clock  the clock to use, not null
     * @return {Year} the current year, not null
     */
    static _nowClock(clock) {
        requireNonNull(clock, 'clock');
        requireInstance(clock, Clock, 'clock');
        let now = LocalDate.now(clock);  // called once
        return Year.of(now.year());
    }
    /**
     * Obtains an instance of {@code Year}.
     * <p>
     * This method accepts a year value from the proleptic ISO calendar system.
     * <p>
     * The year 2AD/CE is represented by 2.<br>
     * The year 1AD/CE is represented by 1.<br>
     * The year 1BC/BCE is represented by 0.<br>
     * The year 2BC/BCE is represented by -1.<br>
     *
     * @param {Number} isoYear  the ISO proleptic year to represent, from {@code MIN_VALUE} to {@code MAX_VALUE}
     * @return {Year} the year, not null
     * @throws DateTimeException if the field is invalid
     */
    static of(isoYear) {
        requireNonNull(isoYear, 'isoYear');
        ChronoField.YEAR.checkValidValue(isoYear);
        return new Year(isoYear);
    }
    
    //-----------------------------------------------------------------------
    /**
     * Obtains an instance of {@code Year} from a temporal object.
     * <p>
     * A {@code TemporalAccessor} represents some form of date and time information.
     * This factory converts the arbitrary temporal object to an instance of {@code Year}.
     * <p>
     * The conversion extracts the {@link ChronoField#YEAR year} field.
     * The extraction is only permitted if the temporal object has an ISO
     * chronology, or can be converted to a {@code LocalDate}.
     * <p>
     * This method matches the signature of the functional interface {@link TemporalQuery}
     * allowing it to be used in queries via method reference, {@code Year::from}.
     *
     * @param {TemporalAccessor} temporal  the temporal object to convert, not null
     * @return {Year} the year, not null
     * @throws DateTimeException if unable to convert to a {@code Year}
     */
    static from(temporal) {
        requireNonNull(temporal, 'temporal');
        requireInstance(temporal, TemporalAccessor, 'temporal');
        if (temporal instanceof Year) {
            return temporal;
        }
        try {
            /* we support only ISO for now
            if (IsoChronology.INSTANCE.equals(Chronology.from(temporal)) == false) {
                temporal = LocalDate.from(temporal);
            }*/
            return Year.of(temporal.get(ChronoField.YEAR));
        } catch (ex) {
            throw new DateTimeException('Unable to obtain Year from TemporalAccessor: ' +
                    temporal + ', type ' + (temporal && temporal.constructor != null ? temporal.constructor.name : ''));
        }
    }

    /**
     * Checks if this year is equal to the specified {@link Year}.
     * <p>
     * The comparison is based on the value
     *
     * @param {*} otherYear - the other year, null returns false
     * @return {boolean} true if the other duration is equal to this one
     */
    equals(otherYear) {
        if (this === otherYear) {
            return true;
        }
        if (otherYear instanceof Year) {
            return this.value() === otherYear.value();
        }
        return false;
    }
}

export function _init() {
    /* NOTE: MIN_VALUE/MAX_VALUE moved to YearConstants */
}
/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {DateTimeException, UnsupportedTemporalTypeException} from './errors';
import {requireNonNull, requireInstance} from './assert';

import {ChronoField} from './temporal/ChronoField';
import {ChronoUnit} from './temporal/ChronoUnit';
import {Clock} from './Clock';
import {DateTimeFormatter} from './format/DateTimeFormatter';
import {DateTimeFormatterBuilder} from './format/DateTimeFormatterBuilder';
import {LocalDate} from './LocalDate';
import {MathUtil} from './MathUtil';
import {SignStyle} from './format/SignStyle';
import {Temporal} from './temporal/Temporal';
import {TemporalAccessor} from './temporal/TemporalAccessor';
import {TemporalAmount} from './temporal/TemporalAmount';
import {TemporalUnit} from './temporal/TemporalUnit';
import {createTemporalQuery} from './temporal/TemporalQuery';
import {ValueRange} from './temporal/ValueRange';
import {YearConstants} from './YearConstants';
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
 * Year.MIN_VALUE = -999.999;
 *
 * The minimum supported year. Theoretically the minimum could be -28.542.4812 years in javascript.
 * approx LocalDateTime.ofEpochSecond(Number.MIN_SAFE_INTEGER, 0, ZoneOffset.UTC).year()
 *
 * Year.MAX_VALUE = 999.999;
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
        this._year = value;
    }

    /**
     *
     * @return {number} gets the value
     */
    value() {
        return this._year;
    }

    /**
     * to handle function overriding this function accepts zero or one arguments, checks their type and delegates to the appropriate
     * function
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
            /* TODO: we support only ISO for now
            if (IsoChronology.INSTANCE.equals(Chronology.from(temporal)) == false) {
                temporal = LocalDate.from(temporal);
            }*/
            return Year.of(temporal.get(ChronoField.YEAR));
        } catch (ex) {
            throw new DateTimeException('Unable to obtain Year from TemporalAccessor: ' +
                    temporal + ', type ' + (temporal && temporal.constructor != null ? temporal.constructor.name : ''));
        }
    }
    //-----------------------------------------------------------------------
    /**
     * to handle function overriding this function accepts one or two arguments, checks their type and delegates to the appropriate function
     *
     * @return {Year}
     */
    static parse() {
        if (arguments.length <= 1) {
            return Year._parseText(arguments[0]);
        } else {
            return Year._parseTextFormatter(arguments[0], arguments[1]);
        }
    }
    
    /**
     * Obtains an instance of {@code Year} from a text string such as {@code 2007}.
     * <p>
     * The string must represent a valid year.
     * Years outside the range 0000 to 9999 must be prefixed by the plus or minus symbol.
     *
     * @param {String} text  the text to parse such as "2007", not null
     * @return {Year} the parsed year, not null
     * @throws DateTimeParseException if the text cannot be parsed
     */
    static _parseText(text) {
        requireNonNull(text, 'text');
        return Year.parse(text, PARSER);
    }

    /**
     * Obtains an instance of {@code Year} from a text string using a specific formatter.
     * <p>
     * The text is parsed using the formatter, returning a year.
     *
     * @param {String} text  the text to parse, not null
     * @param {DateTimeFormatter} formatter  the formatter to use, not null
     * @return {Year} the parsed year, not null
     * @throws DateTimeParseException if the text cannot be parsed
     */
    static _parseTextFormatter(text, formatter) {
        requireNonNull(text, 'text');
        requireNonNull(formatter, 'formatter');
        requireInstance(formatter, DateTimeFormatter, 'formatter');
        return formatter.parse(text, Year.FROM);
    }
    
    //-------------------------------------------------------------------------
    /**
     * Checks if the year is a leap year, according to the ISO proleptic
     * calendar system rules.
     * <p>
     * This method applies the current rules for leap years across the whole time-line.
     * In general, a year is a leap year if it is divisible by four without
     * remainder. However, years divisible by 100, are not leap years, with
     * the exception of years divisible by 400 which are.
     * <p>
     * For example, 1904 is a leap year it is divisible by 4.
     * 1900 was not a leap year as it is divisible by 100, however 2000 was a
     * leap year as it is divisible by 400.
     * <p>
     * The calculation is proleptic - applying the same rules into the far future and far past.
     * This is historically inaccurate, but is correct for the ISO-8601 standard.
     *
     * @param {number} year  the year to check
     * @return {boolean} true if the year is leap, false otherwise
     */
    static isLeap(year) {
        return ((MathUtil.intMod(year, 4) === 0) && ((MathUtil.intMod(year, 100) !== 0) || (MathUtil.intMod(year, 400) === 0)));
    }
    
    /**
     * Gets the range of valid values for the specified field.
     * <p>
     * The range object expresses the minimum and maximum valid values for a field.
     * This year is used to enhance the accuracy of the returned range.
     * If it is not possible to return the range, because the field is not supported
     * or for some other reason, an exception is thrown.
     * <p>
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link #isSupported(TemporalField) supported fields} will return
     * appropriate range instances.
     * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.rangeRefinedBy(TemporalAccessor)}
     * passing {@code this} as the argument.
     * Whether the range can be obtained is determined by the field.
     *
     * @param {TemporalField} field  the field to query the range for, not null
     * @return {ValueRange} the range of valid values for the field, not null
     * @throws DateTimeException if the range for the field cannot be obtained
     */
    range(field) {
        if (field === ChronoField.YEAR_OF_ERA) {
            return (this._year <= 0 ? ValueRange.of(1, Year.MAX_VALUE + 1) : ValueRange.of(1, Year.MAX_VALUE));
        }
        return super.range(field);
    }

    /**
     * Gets the value of the specified field from this year as an {@code int}.
     * <p>
     * This queries this year for the value for the specified field.
     * The returned value will always be within the valid range of values for the field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * <p>
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link #isSupported(TemporalField) supported fields} will return valid
     * values based on this year.
     * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
     * passing {@code this} as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param {TemporalField} field  the field to get, not null
     * @return {number} the value for the field
     * @throws DateTimeException if a value for the field cannot be obtained
     * @throws ArithmeticException if numeric overflow occurs
     */
    get(field) {
        return this.range(field).checkValidIntValue(this.getLong(field), field);
    }

    /**
     * Gets the value of the specified field from this year as a {@code long}.
     * <p>
     * This queries this year for the value for the specified field.
     * If it is not possible to return the value, because the field is not supported
     * or for some other reason, an exception is thrown.
     * <p>
     * If the field is a {@link ChronoField} then the query is implemented here.
     * The {@link #isSupported(TemporalField) supported fields} will return valid
     * values based on this year.
     * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
     * <p>
     * If the field is not a {@code ChronoField}, then the result of this method
     * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
     * passing {@code this} as the argument. Whether the value can be obtained,
     * and what the value represents, is determined by the field.
     *
     * @param {TemporalField} field  the field to get, not null
     * @return {number} the value for the field
     * @throws DateTimeException if a value for the field cannot be obtained
     * @throws ArithmeticException if numeric overflow occurs
     */
    getLong(field) {
        requireNonNull(field, 'field');
        if (field instanceof ChronoField) {
            switch (field) {
                case ChronoField.YEAR_OF_ERA: return (this._year < 1 ? 1 - this._year : this._year);
                case ChronoField.YEAR: return this._year;
                case ChronoField.ERA: return (this._year < 1 ? 0 : 1);
            }
            throw new UnsupportedTemporalTypeException('Unsupported field: ' + field);
        }
        return field.getFrom(this);
    }
    
    //-----------------------------------------------------------------------
    /**
     * Checks if the year is a leap year, according to the ISO proleptic
     * calendar system rules.
     * <p>
     * This method applies the current rules for leap years across the whole time-line.
     * In general, a year is a leap year if it is divisible by four without
     * remainder. However, years divisible by 100, are not leap years, with
     * the exception of years divisible by 400 which are.
     * <p>
     * For example, 1904 is a leap year it is divisible by 4.
     * 1900 was not a leap year as it is divisible by 100, however 2000 was a
     * leap year as it is divisible by 400.
     * <p>
     * The calculation is proleptic - applying the same rules into the far future and far past.
     * This is historically inaccurate, but is correct for the ISO-8601 standard.
     *
     * @return {boolean} true if the year is leap, false otherwise
     */
    isLeap() {
        return Year.isLeap(this._year);
    }

    //-----------------------------------------------------------------------
    /**
     * plus function overloading
     */
    plus() {
        if (arguments.length === 1) {
            return this.plusAmount.apply(this, arguments);
        } else {
            return this.plusAmountToAddUnit.apply(this, arguments);
        }
    }

    /**
     * Returns a copy of this year with the specified period added.
     * <p>
     * This method returns a new year based on this year with the specified period added.
     * The adder is typically {@link Period} but may be any other type implementing
     * the {@link TemporalAmount} interface.
     * The calculation is delegated to the specified adjuster, which typically calls
     * back to {@link #plus(long, TemporalUnit)}.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {TemporalAmount} amount  the amount to add, not null
     * @return {Year} based on this year with the addition made, not null
     * @throws DateTimeException if the addition cannot be made
     * @throws ArithmeticException if numeric overflow occurs
     */
    plusAmount(amount) {
        requireNonNull(amount, 'amount');
        requireInstance(amount, TemporalAmount, 'amount');
        return amount.addTo(this);
    }

    /**
     * @param {number} amountToAdd
     * @param {TemporalUnit} unit
     * @return {Year} based on this year with the addition made, not null
     * @throws DateTimeException if the addition cannot be made
     * @throws ArithmeticException if numeric overflow occurs
     */
    plusAmountToAddUnit(amountToAdd, unit) {
        requireNonNull(amountToAdd, 'amountToAdd');
        requireNonNull(unit, 'unit');
        requireInstance(unit, TemporalUnit, 'unit');
        if (unit instanceof ChronoUnit) {
            switch (unit) {
                case ChronoUnit.YEARS: return this.plusYears(amountToAdd);
                case ChronoUnit.DECADES: return this.plusYears(MathUtil.safeMultiply(amountToAdd, 10));
                case ChronoUnit.CENTURIES: return this.plusYears(MathUtil.safeMultiply(amountToAdd, 100));
                case ChronoUnit.MILLENNIA: return this.plusYears(MathUtil.safeMultiply(amountToAdd, 1000));
                case ChronoUnit.ERAS: return this.with(ChronoField.ERA, MathUtil.safeAdd(this.getLong(ChronoField.ERA), amountToAdd));
            }
            throw new UnsupportedTemporalTypeException('Unsupported unit: ' + unit);
        }
        return unit.addTo(this, amountToAdd);
    }

    /**
     * Returns a copy of this year with the specified number of years added.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} yearsToAdd  the years to add, may be negative
     * @return {Year} based on this year with the period added, not null
     * @throws DateTimeException if the result exceeds the supported year range
     */
    plusYears(yearsToAdd) {
        if (yearsToAdd === 0) {
            return this;
        }
        return Year.of(ChronoField.YEAR.checkValidIntValue(MathUtil.safeAdd(this._year, yearsToAdd)));
    }

    //-----------------------------------------------------------------------
    /**
     * minus function overloading
     */
    minus() {
        if (arguments.length === 1) {
            return this.minusAmount.apply(this, arguments);
        } else {
            return this.minusAmountToSubtractUnit.apply(this, arguments);
        }
    }

    /**
     * Returns a copy of this year with the specified period subtracted.
     * <p>
     * This method returns a new year based on this year with the specified period subtracted.
     * The subtractor is typically {@link Period} but may be any other type implementing
     * the {@link TemporalAmount} interface.
     * The calculation is delegated to the specified adjuster, which typically calls
     * back to {@link #minus(long, TemporalUnit)}.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {TemporalAmount} amount  the amount to subtract, not null
     * @return {Year} based on this year with the subtraction made, not null
     * @throws DateTimeException if the subtraction cannot be made
     * @throws ArithmeticException if numeric overflow occurs
     */
    minusAmount(amount) {
        return amount.subtractFrom(this);
    }

    /**
     * @param {number} amountToSubtract  the amount to subtract, not null
     * @param {TemporalUnit} unit
     * @return {Year} based on this year with the subtraction made, not null
     * @throws DateTimeException {@inheritDoc}
     * @throws ArithmeticException {@inheritDoc}
     */
    minusAmountToSubtractUnit(amountToSubtract, unit) {
        return (amountToSubtract === MathUtil.MIN_SAFE_INTEGER ? this.plus(MathUtil.MAX_SAFE_INTEGER, unit).plus(1, unit) : this.plus(-amountToSubtract, unit));
    }

    /**
     * Returns a copy of this year with the specified number of years subtracted.
     * <p>
     * This instance is immutable and unaffected by this method call.
     *
     * @param {number} yearsToSubtract  the years to subtract, may be negative
     * @return {Year} based on this year with the period subtracted, not null
     * @throws DateTimeException if the result exceeds the supported year range
     */
    minusYears(yearsToSubtract) {
        return (yearsToSubtract === MathUtil.MIN_SAFE_INTEGER ? this.plusYears(MathUtil.MAX_SAFE_INTEGER).plusYears(1) : this.plusYears(-yearsToSubtract));
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

var PARSER;

export function _init() {
    
    Year.MIN_VALUE = YearConstants.MIN_VALUE;
    Year.MAX_VALUE = YearConstants.MAX_VALUE;
    
    PARSER = new DateTimeFormatterBuilder()
        .appendValue(ChronoField.YEAR, 4, 10, SignStyle.EXCEEDS_PAD)
        .toFormatter();

    Year.FROM = createTemporalQuery('Year.FROM', (temporal) => {
        return Year.from(temporal);
    });
}
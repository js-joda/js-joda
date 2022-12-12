/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper & Michał Sobkiewicz
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { requireNonNull } from './assert';
import { ChronoField, ChronoUnit, DateTimeException, DateTimeParseException, IsoFields, ParsePosition, TemporalAdjuster, UnsupportedTemporalTypeException } from '@js-joda/core';

import { _ as jodaInternal } from '@js-joda/core';

const MathUtil = jodaInternal.MathUtil;

/**
 * Additional utilities for working with temporal classes.
 * 
 * This includes:
 * - adjusters that ignore Saturday/Sunday weekends
 * - conversion between `TimeUnit` and `ChronoUnit`
 * - converting an amount to another unit
 *
 */
export class Temporals {
    //-------------------------------------------------------------------------
    /**
     * Returns an adjuster that returns the next working day, ignoring Saturday and Sunday.
     * 
     * Some territories have weekends that do not consist of Saturday and Sunday.
     * No implementation is supplied to support this, however an adjuster
     * can be easily written to do so.
     *
     * @return {TemporalAdjuster} the next working day adjuster, not null
     */
    static nextWorkingDay() {
        return Adjuster.NEXT_WORKING;
    }

    /**
     * Returns an adjuster that returns the next working day or same day if already working day, ignoring Saturday and Sunday.
     * 
     * Some territories have weekends that do not consist of Saturday and Sunday.
     * No implementation is supplied to support this, however an adjuster
     * can be easily written to do so.
     * 
     * @return {TemporalAdjuster} the next working day or same adjuster, not null
     */
    static nextWorkingDayOrSame() {
        return Adjuster.NEXT_WORKING_OR_SAME;
    }

    /**
     * Returns an adjuster that returns the previous working day, ignoring Saturday and Sunday.
     * 
     * Some territories have weekends that do not consist of Saturday and Sunday.
     * No implementation is supplied to support this, however an adjuster
     * can be easily written to do so.
     *
     * @return {TemporalAdjuster} the previous working day adjuster, not null
     */
    static previousWorkingDay() {
        return Adjuster.PREVIOUS_WORKING;
    }

    /**
     * Returns an adjuster that returns the previous working day or same day if already working day, ignoring Saturday and Sunday.
     * 
     * Some territories have weekends that do not consist of Saturday and Sunday.
     * No implementation is supplied to support this, however an adjuster
     * can be easily written to do so.
     * 
     * @return {TemporalAdjuster} the previous working day or same adjuster, not null
     */
    static previousWorkingDayOrSame() {
        return Adjuster.PREVIOUS_WORKING_OR_SAME;
    }

    //-------------------------------------------------------------------------
    /**
     * Parses the text using one of the formatters.
     * 
     * This will try each formatter in turn, attempting to fully parse the specified text.
     * The temporal query is typically a method reference to a `from(TemporalAccessor)` method.
     * For example:
     * ```
     *  LocalDateTime dt = Temporals.parseFirstMatching(str, LocalDateTime.FROM, fm1, fm2, fm3);
     * ```
     * If the parse completes without reading the entire length of the text,
     * or a problem occurs during parsing or merging, then an exception is thrown.
     *
     * @param {string} text  the text to parse, not null
     * @param {TemporalQuery} query  the query defining the type to parse to, not null
     * @param {DateTimeFormatter[]} formatters  the formatters to try, not null
     * @return {*} the parsed date-time, not null
     * @throws {DateTimeParseException} if unable to parse the requested result
     */
    static parseFirstMatching(text, query, ...formatters) {
        requireNonNull(text, 'text');
        requireNonNull(query, 'query');
        requireNonNull(formatters, 'formatters');
        if (formatters.length === 0) {
            throw new DateTimeParseException('No formatters specified', text, 0);
        }
        if (formatters.length === 1) {
            return formatters[0].parse(text, query);
        }
        for (const formatter of formatters) {
            try {
                const pp = new ParsePosition(0);
                formatter.parseUnresolved(text, pp);
                const len = text.length;
                if (pp.getErrorIndex() === -1 && pp.getIndex() === len) {
                    return formatter.parse(text, query);
                }
            } catch (ignored) {
                // should not happen, but ignore if it does
            }
        }
        throw new DateTimeParseException(`Text '${text}' could not be parsed`, text, 0);
    }

    //-------------------------------------------------------------------------
    /**
     * Converts an amount from one unit to another.
     * 
     * This works on the units in `ChronoUnit` and `IsoFields`.
     * The `DAYS` and `WEEKS` units are handled as exact multiple of 24 hours.
     * The `ERAS` and `FOREVER` units are not supported.
     *
     * @param {long} amount  the input amount in terms of the `fromUnit`
     * @param {TemporalUnit} fromUnit  the unit to convert from, not null
     * @param {TemporalUnit} toUnit  the unit to convert to, not null
     * @return {long[]} the conversion array,
     *  element 0 is the signed whole number,
     *  element 1 is the signed remainder in terms of the input unit,
     *  not null
     * @throws DateTimeException if the units cannot be converted
     * @throws UnsupportedTemporalTypeException if the units are not supported
     * @throws ArithmeticException if numeric overflow occurs
     */
    static convertAmount(amount, fromUnit, toUnit) {
        requireNonNull(fromUnit, 'fromUnit');
        requireNonNull(toUnit, 'toUnit');
        Temporals._validateUnit(fromUnit);
        Temporals._validateUnit(toUnit);
        if (fromUnit === toUnit) {
            return [amount, 0];
        }
        // precise-based
        if (Temporals._isPrecise(fromUnit) && Temporals._isPrecise(toUnit)) {
            const fromNanos = fromUnit.duration().toNanos();
            const toNanos = toUnit.duration().toNanos();
            if (fromNanos > toNanos) {
                const multiple = MathUtil.intDiv(fromNanos, toNanos);
                return [MathUtil.safeMultiply(amount, multiple), 0];
            } else {
                const multiple = MathUtil.intDiv(toNanos, fromNanos);
                return [MathUtil.intDiv(amount, multiple), MathUtil.intMod(amount, multiple)];
            }
        }
        // month-based
        const fromMonthFactor = Temporals._monthMonthFactor(fromUnit, fromUnit, toUnit);
        const toMonthFactor = Temporals._monthMonthFactor(toUnit, fromUnit, toUnit);
        if (fromMonthFactor > toMonthFactor) {
            const multiple = MathUtil.intDiv(fromMonthFactor, toMonthFactor);
            return [MathUtil.safeMultiply(amount, multiple), 0];
        } else {
            const multiple = MathUtil.intDiv(toMonthFactor, fromMonthFactor);
            return [MathUtil.intDiv(amount, multiple), MathUtil.intMod(amount, multiple)];
        }
    }

    /**
     * 
     * @param {TemporalUnit} unit
     * @private
     */
    static _validateUnit(unit) {
        if (unit instanceof ChronoUnit) {
            if (unit === ChronoUnit.ERAS || unit === ChronoUnit.FOREVER) {
                throw new UnsupportedTemporalTypeException(`Unsupported TemporalUnit: ${unit}`);
            }
        } else if (unit !== IsoFields.QUARTER_YEARS) {
            throw new UnsupportedTemporalTypeException(`Unsupported TemporalUnit: ${unit}`);
        }
    }

    /**
     * 
     * @param {TemporalUnit} unit
     * @return {boolean}
     * @private
     */
    static _isPrecise(unit) {
        return unit instanceof ChronoUnit && unit.compareTo(ChronoUnit.WEEKS) <= 0;
    }

    /**
     * 
     * @param {TemporalUnit} unit
     * @param {TemporalUnit} fromUnit
     * @param {TemporalUnit} toUnit
     * @return {int}
     * @private
     */
    static _monthMonthFactor(unit, fromUnit, toUnit) {
        if (unit instanceof ChronoUnit) {
            switch (unit) {
                case ChronoUnit.MONTHS:
                    return 1;
                case ChronoUnit.YEARS:
                    return 12;
                case ChronoUnit.DECADES:
                    return 120;
                case ChronoUnit.CENTURIES:
                    return 1200;
                case ChronoUnit.MILLENNIA:
                    return 12000;
                default:
                    throw new DateTimeException(`Unable to convert between units: ${fromUnit} to ${toUnit}`);
            }
        }
        return 3; // quarters
    }

    /**
     * Restricted constructor.
     * 
     * @private
     */
    constructor() {
    }
}

const Adjuster = {};

export function _init() {
    /** Next working day adjuster. */
    Adjuster.NEXT_WORKING = new class extends TemporalAdjuster {
        adjustInto(temporal) {
            const dow = temporal.get(ChronoField.DAY_OF_WEEK);
            switch (dow) {
                case 6:  // Saturday
                    return temporal.plus(2, ChronoUnit.DAYS);
                case 5:  // Friday
                    return temporal.plus(3, ChronoUnit.DAYS);
                default:
                    return temporal.plus(1, ChronoUnit.DAYS);
            }
        }
    };

    /** Previous working day adjuster. */
    Adjuster.PREVIOUS_WORKING = new class extends TemporalAdjuster {
        adjustInto(temporal) {
            const dow = temporal.get(ChronoField.DAY_OF_WEEK);
            switch (dow) {
                case 1:  // Monday
                    return temporal.minus(3, ChronoUnit.DAYS);
                case 7:  // Sunday
                    return temporal.minus(2, ChronoUnit.DAYS);
                default:
                    return temporal.minus(1, ChronoUnit.DAYS);
            }
        }
    };

    /** Next working day or same adjuster. */
    Adjuster.NEXT_WORKING_OR_SAME = new class extends TemporalAdjuster {
        adjustInto(temporal) {
            const dow = temporal.get(ChronoField.DAY_OF_WEEK);
            switch (dow) {
                case 6: // Saturday
                    return temporal.plus(2, ChronoUnit.DAYS);
                case 7: // Sunday
                    return temporal.plus(1, ChronoUnit.DAYS);
                default:
                    return temporal;
            }
        }
    };

    /** Previous working day or same adjuster. */
    Adjuster.PREVIOUS_WORKING_OR_SAME = new class extends TemporalAdjuster {
        adjustInto(temporal) {
            const dow = temporal.get(ChronoField.DAY_OF_WEEK);
            switch (dow) {
                case 6: //Saturday
                    return temporal.minus(1, ChronoUnit.DAYS);
                case 7:  // Sunday
                    return temporal.minus(2, ChronoUnit.DAYS);
                default:
                    return temporal;
            }
        }
    };
}

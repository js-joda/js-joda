/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {LocalDate} from '../../src/LocalDate';
import {DayOfWeek} from '../../src/DayOfWeek';
import {Month} from '../../src/Month';
import {ZoneId} from '../../src/ZoneId';
import {ZoneOffset} from '../../src/ZoneOffset';
import {Instant} from '../../src/Instant';
import {TemporalAdjusters} from '../../src/temporal/TemporalAdjusters';
import {ZoneOffsetTransition} from '../../src/zone/ZoneOffsetTransition';
import {ZoneRules} from '../../src/zone/ZoneRules';

class CurrentStandardZone extends ZoneId {

    constructor(winterOffset, summerOffset, localDateOfwinterSummerTransition, localDateOfSummerWinterTransition){
        super();
        this._rules = new CurrentStandardZoneRules(winterOffset, summerOffset, localDateOfwinterSummerTransition, localDateOfSummerWinterTransition);
    }

    rules(){
        return this._rules;
    }

    equals(other){
        if(this === other){
            return true;
        }
        return false;
    }

    toString(){
        return 'CurrentStandardZone:' + this._rules.toString();
    }
}

class CurrentStandardZoneRules extends ZoneRules {

    constructor(winterOffset, summerOffset, localDateOfwinterSummerTransition, localDateOfSummerWinterTransition){
        super();
        this._winterOffset = winterOffset;
        this._summerOffset = summerOffset;
        this._localDateOfwinterSummerTransition = localDateOfwinterSummerTransition;
        this._localDateOfSummerWinterTransition  = localDateOfSummerWinterTransition;
    }

    isFixedOffset(){
        return false;
    }

    /**
     *
     * @param {Instant} instant
     * @returns {ZoneOffset}
     */
    offsetOfInstant(instant){
        var year = yearOfInstant(instant);
        var winterSummerTransition = this._localDateOfwinterSummerTransition(year).withHour(1).toInstant(ZoneOffset.UTC);
        var summerWinterTransition = this._localDateOfSummerWinterTransition (year).withHour(1).toInstant(ZoneOffset.UTC);

        if (instant.isBefore(winterSummerTransition) || ! instant.isBefore(summerWinterTransition)){
            return this._winterOffset;
        } else {
            return this._summerOffset;
        }
    }

    /**
     *
     * @param {number} epochMilli
     * @returns {ZoneOffset}
     */
    offsetOfEpochMilli(epochMilli){
        return this.offsetOfInstant(Instant.ofEpochMilli(epochMilli));
    }

    /**
     * see {@link ZoneRules.offsetOfLocalDateTime}
     * @param {LocalDateTime} localDateTime
     * @returns {ZoneOffset}
     */
    offsetOfLocalDateTime(localDateTime){
        var year = localDateTime.year();
        var winterSummerTransition = this._localDateOfwinterSummerTransition(year).withHour(2);
        var summerWinterTransition = this._localDateOfSummerWinterTransition (year).withHour(2);
        if (localDateTime.compareTo(winterSummerTransition) <= 0 || localDateTime.isAfter(summerWinterTransition.withHour(3))){
            return this._winterOffset;
        } else if (localDateTime.compareTo(winterSummerTransition.withHour(3)) >= 0 && localDateTime.isBefore(summerWinterTransition)){
            return this._summerOffset;
        } else if (localDateTime.compareTo(summerWinterTransition) >= 0 && localDateTime.compareTo(summerWinterTransition.withHour(3)) <= 0){
            // overlap! best value is SUMMER_OFFSET
            return this._summerOffset;
        } else {
            // gap! best value is WINTER_OFFSET
            return this._winterOffset;
        }
    }

    /**
     *
     * @param {LocalDateTime} localDateTime
     * @return {ZoneOffsetTransition}
     */
    transition(localDateTime){
        var year = localDateTime.year();
        let winterSummerTransition = this._localDateOfwinterSummerTransition(year).withHour(2);
        let summerWinterTransition = this._localDateOfSummerWinterTransition (year).withHour(2);
        if(localDateTime.isAfter(winterSummerTransition) &&
                localDateTime.isBefore(winterSummerTransition.plusHours(1))) {
            // gap
            return ZoneOffsetTransition.of(winterSummerTransition, this._winterOffset, this._summerOffset);
        } else if (localDateTime.compareTo(summerWinterTransition) >= 0 &&
                localDateTime.compareTo(summerWinterTransition.plusHours(1)) <= 0) {
            // overlap
            return ZoneOffsetTransition.of(summerWinterTransition, this._summerOffset, this._winterOffset);
        }
        return null;
    }

    /**
     *
     * @param localDateTime
     * @return {[ZoneOffset]}
     */
    validOffsets(localDateTime){
        let transition = this.transition(localDateTime);
        if(transition != null) {
            return transition.validOffsets();
        } else {
            return [this.offsetOfLocalDateTime(localDateTime)];
        }
    }

    /**
     *
     * @param {LocalDateTime} dateTime
     * @param {ZoneOffset} offset
     * @return {boolean}
     */
    isValidOffset(dateTime, offset) {
        return this.validOffsets(dateTime).some((validOffset) => {
            return validOffset.equals(offset);
        });
    }

    //-----------------------------------------------------------------------
    /**
     *
     * @param other
     * @returns {boolean}
     */
    equals(other) {
        if (this === other || other instanceof CurrentStandardZoneRules) {
            return true;
        } else {
            return false;
        }
    }

    /**
     *
     * @returns {string}
     */
    toString() {
        return 'CurrentStandardZoneRules[' +
            this._winterOffset.toString() + ':' +
            this._summerOffset.toString() + ']';
    }

}

function yearOfInstant(instant){
    return LocalDate.ofInstant(instant, ZoneOffset.UTC).year();
}

function lastSundayOfMonthAtMidnight(year, month){
    return LocalDate
        .of(year, 1, 1)
        .withMonth(month)
        .with(TemporalAdjusters.lastInMonth(DayOfWeek.SUNDAY))
        .atStartOfDay();
}

export class CurrentStandardZoneCEST extends CurrentStandardZone{
    constructor(){
        super(
            ZoneOffset.ofHours(1),
            ZoneOffset.ofHours(2),
            (year) => {
                return lastSundayOfMonthAtMidnight(year, Month.MARCH);
            },
            (year) => {
                return lastSundayOfMonthAtMidnight(year, Month.OCTOBER);
            }
        );
    }
}

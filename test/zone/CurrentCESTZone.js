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

export class CurrentCESTZone extends ZoneId {

    constructor(){
        super();
        this._rules = new CurrentCESTZoneRules();
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
        return 'CurrentCESTZone';
    }
}

var WINTER_OFFSET = null;
var SUMMER_OFFSET = null;

class CurrentCESTZoneRules extends ZoneRules {

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
        var winterSummerTransition = lastSundayOfMarchAtMidnight(year).withHour(1).toInstant(ZoneOffset.UTC);
        var summerWinterTransition = lastSundayOfOctoberAtMidnight(year).withHour(1).toInstant(ZoneOffset.UTC);

        if (instant.isBefore(winterSummerTransition) || ! instant.isBefore(summerWinterTransition)){
            return WINTER_OFFSET;
        } else {
            return SUMMER_OFFSET;
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
        var winterSummerTransition = lastSundayOfMarchAtMidnight(year).withHour(2);
        var summerWinterTransition = lastSundayOfOctoberAtMidnight(year).withHour(2);
        if (localDateTime.compareTo(winterSummerTransition) <= 0 || localDateTime.isAfter(summerWinterTransition.withHour(3))){
            return WINTER_OFFSET;
        } else if (localDateTime.compareTo(winterSummerTransition.withHour(3)) >= 0 && localDateTime.isBefore(summerWinterTransition)){
            return SUMMER_OFFSET;
        } else if (localDateTime.compareTo(summerWinterTransition) >= 0 && localDateTime.compareTo(summerWinterTransition.withHour(3)) <= 0){
            // overlap! best value is SUMMER_OFFSET
            return SUMMER_OFFSET;
        } else {
            // gap! best value is WINTER_OFFSET
            return WINTER_OFFSET;
        }
    }

    /**
     *
     * @param {LocalDateTime} localDateTime
     * @return {ZoneOffsetTransition}
     */
    transition(localDateTime){
        var year = localDateTime.year();
        let winterSummerTransition = lastSundayOfMarchAtMidnight(year).withHour(2);
        let summerWinterTransition = lastSundayOfOctoberAtMidnight(year).withHour(2);
        if(localDateTime.isAfter(winterSummerTransition) &&
                localDateTime.isBefore(winterSummerTransition.plusHours(1))) {
            // gap
            return ZoneOffsetTransition.of(winterSummerTransition, WINTER_OFFSET, SUMMER_OFFSET);
        } else if (localDateTime.compareTo(summerWinterTransition) >= 0 &&
                localDateTime.compareTo(summerWinterTransition.plusHours(1)) <= 0) {
            // overlap
            return ZoneOffsetTransition.of(summerWinterTransition, SUMMER_OFFSET, WINTER_OFFSET);
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
        if (this === other || other instanceof CurrentCESTZoneRules) {
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
        return 'CurrentCESTZoneRules()';
    }

}

function yearOfInstant(instant){
    return LocalDate.ofInstant(instant, ZoneOffset.UTC).year();
}

function lastSundayOfMarchAtMidnight(year){
    return lastSundayOfMonthAtMidnight(year, Month.MARCH);
}

function lastSundayOfOctoberAtMidnight(year){
    return lastSundayOfMonthAtMidnight(year, Month.OCTOBER);
}

function lastSundayOfMonthAtMidnight(year, month){
    return LocalDate
        .of(year, 1, 1)
        .withMonth(month)
        .with(TemporalAdjusters.lastInMonth(DayOfWeek.SUNDAY))
        .atStartOfDay();
}

export function _init(){
    WINTER_OFFSET = ZoneOffset.ofHours(1);
    SUMMER_OFFSET = ZoneOffset.ofHours(2);
}
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

export class CurrentEasternTimeZone extends ZoneId {

    constructor(){
        super();
        this._rules = new CurrentEasternTimeZoneRules();
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
        return 'CurrentEasternTimeZone';
    }
}

var WINTER_OFFSET = null;
var SUMMER_OFFSET = null;

class CurrentEasternTimeZoneRules extends ZoneRules {

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
        var winterSummerTransition = secondSundayOfMarchAtMidnight(year).withHour(7).toInstant(ZoneOffset.UTC);
        var summerWinterTransition = firstSundayOfNovemberAtMidnight(year).withHour(7).toInstant(ZoneOffset.UTC);

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
        var winterSummerTransition = secondSundayOfMarchAtMidnight(year).withHour(2);
        var summerWinterTransition = firstSundayOfNovemberAtMidnight(year).withHour(2);
        if (localDateTime.isBefore(winterSummerTransition) || localDateTime.isAfter(summerWinterTransition.withHour(3))){
            return WINTER_OFFSET;
        } else if (localDateTime.isAfter(winterSummerTransition.withHour(3)) && localDateTime.isBefore(summerWinterTransition)){
            return SUMMER_OFFSET;
        } else if (localDateTime.compareTo(winterSummerTransition) >= 0 && localDateTime.compareTo(winterSummerTransition.withHour(3)) <= 0){
            // gap! best value is WINTER_OFFSET
            return WINTER_OFFSET;
        } else {
            // overlap! best value is SUMMER_OFFSET
            return SUMMER_OFFSET;
        }
    }

    /**
     *
     * @param {LocalDateTime} localDateTime
     * @return {ZoneOffsetTransition}
     */
    transition(localDateTime){
        var year = localDateTime.year();
        let winterSummerTransition = secondSundayOfMarchAtMidnight(year).withHour(2);
        let summerWinterTransition = firstSundayOfNovemberAtMidnight(year).withHour(2);
        if(localDateTime.isAfter(winterSummerTransition) &&
                localDateTime.isBefore(winterSummerTransition.plusHours(1))) {
            return ZoneOffsetTransition.of(winterSummerTransition, WINTER_OFFSET, SUMMER_OFFSET);
        } else if (localDateTime.isAfter(summerWinterTransition) &&
                localDateTime.isBefore(summerWinterTransition.plusHours(1))) {
            return ZoneOffsetTransition.of(summerWinterTransition, SUMMER_OFFSET, WINTER_OFFSET);
        }
        return null;
    }

    /**
     *
     * @param {LocalDateTime} dateTime
     * @param {ZoneOffset} offset
     * @return {boolean}
     */
    isValidOffset(dateTime, offset) {
        return this.offsetOfLocalDateTime(dateTime).equals(offset);
    }

    //-----------------------------------------------------------------------
    /**
     *
     * @param other
     * @returns {boolean}
     */
    equals(other) {
        if (this === other || other instanceof CurrentEasternTimeZoneRules) {
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
        return 'CurrentEasternTimeZoneRules()';
    }

}

function yearOfInstant(instant){
    return LocalDate.ofInstant(instant, ZoneOffset.UTC).year();
}

function secondSundayOfMarchAtMidnight(year){
    return LocalDate
        .of(year, 1, 1)
        .withMonth(Month.MARCH)
        .with(TemporalAdjusters.firstInMonth(DayOfWeek.SUNDAY))
        .with(TemporalAdjusters.next(DayOfWeek.SUNDAY))
        .atStartOfDay();

}

function firstSundayOfNovemberAtMidnight(year){
    return LocalDate
        .of(year, 1, 1)
        .withMonth(Month.NOVEMBER)
        .with(TemporalAdjusters.firstInMonth(DayOfWeek.SUNDAY))
        .atStartOfDay();
}

export function _init(){
    WINTER_OFFSET = ZoneOffset.ofHours(-5);
    SUMMER_OFFSET = ZoneOffset.ofHours(-4);
}
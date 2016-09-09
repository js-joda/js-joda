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
import {ZoneRules} from '../../src/zone/ZoneRules';

export class CurrentAtlanticTimeZone extends ZoneId {

    constructor(){
        super();
        this._rules = new CurrentAtlanticTimeZoneRules();
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
        return 'CurrentAtlanticTimeZone';
    }
}

var WINTER_OFFSET = null;
var SUMMER_OFFSET = null;

class CurrentAtlanticTimeZoneRules extends ZoneRules {

    isFixedOffset(){
        return false;
    }

    /**
     *
     * @param {Instant} instant
     * @returns {ZoneOffset}
     */
    offsetOfInstant(instant){
        return WINTER_OFFSET;
    }

    /**
     *
     * @param {number} epochMilli
     * @returns {ZoneOffset}
     */
    offsetOfEpochMilli(epochMilli){
        return WINTER_OFFSET;
    }

    /**
     * see {@link ZoneRules.offsetOfLocalDateTime}
     * @param {LocalDateTime} localDateTime
     * @returns {ZoneOffset}
     */
    offsetOfLocalDateTime(localDateTime){
        return WINTER_OFFSET;
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
        if (this === other || other instanceof CurrentAtlanticTimeZoneRules) {
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
        return 'CurrentAtlanticTimeZoneRules()';
    }

}


export function _init(){
    WINTER_OFFSET = ZoneOffset.ofHours(-3);
    SUMMER_OFFSET = ZoneOffset.ofHours(-4);
}
/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {ZoneRules} from './ZoneRules';
import {ZoneOffset} from '../ZoneOffset';

export class SystemDefaultZoneRules extends ZoneRules {

    isFixedOffset(){
        return false;
    }

    /**
     *
     * @param {Instant} instant
     * @returns {ZoneOffset}
     */
    offsetOfInstant(instant){
        var offsetInMinutes = new Date().getTimezoneOffset(instant.toEpochMilli());
        return ZoneOffset.ofTotalMinutes(offsetInMinutes * -1);
    }

    /**
     *
     * @param {LocalDateTime} localDateTime
     * @returns {ZoneOffset}
     */
    offsetOfLocalDateTime(localDateTime){
        var epochMilli = localDateTime.toEpochSecond(ZoneOffset.UTC) * 1000;
        var offsetInMinutes = new Date().getTimezoneOffset(epochMilli);
        return ZoneOffset.ofTotalMinutes(offsetInMinutes * -1);
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
        if (this === other || other instanceof SystemDefaultZoneRules) {
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
        return 'SystemDefaultZoneRules()';
    }

}

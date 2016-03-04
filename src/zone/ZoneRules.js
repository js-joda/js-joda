/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {requireNonNull, abstractMethodFail} from '../assert';

import {Instant} from '../Instant';

export class ZoneRules {

    /**
     * Obtains an instance of {@code ZoneRules} that always uses the same offset.
     * <p>
     * The returned rules always have the same offset.
     *
     * @param {ZoneOffset} offset - the offset, not null
     * @return {ZoneRules} the zone rules, not null
     */
    static of(offset) {
        requireNonNull(offset, 'offset');
        return new Fixed(offset);
    }


    //-----------------------------------------------------------------------
    /**
     * Checks of the zone rules are fixed, such that the offset never varies.
     *
     * @return {boolean} true if the time-zone is fixed and the offset never changes
     */
    isFixedOffset(){
        abstractMethodFail('ZoneRules.isFixedOffset');
    }

    //-----------------------------------------------------------------------

    /**
     *
     * @param instantOrLocalDateTime
     * @returns {ZoneOffset}
     */
    offset(instantOrLocalDateTime){
        if(instantOrLocalDateTime instanceof Instant){
            return this.offsetOfInstant(instantOrLocalDateTime);
        } else {
            return this.offsetOfLocalDateTime(instantOrLocalDateTime);
        }
    }
    /**
     * Gets the offset applicable at the specified instant in these rules.
     * <p>
     * The mapping from an instant to an offset is simple, there is only
     * one valid offset for each instant.
     * This method returns that offset.
     *
     * @param {Instant} instant  the instant to find the offset for, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffset} the offset, not null
     */
    offsetOfInstant(instant){
        abstractMethodFail('ZoneRules.offsetInstant');
    }

    /**
     * Gets a suitable offset for the specified local date-time in these rules.
     * <p>
     * The mapping from a local date-time to an offset is not straightforward.
     * There are three cases:
     * <p><ul>
     * <li>Normal, with one valid offset. For the vast majority of the year, the normal
     *  case applies, where there is a single valid offset for the local date-time.</li>
     * <li>Gap, with zero valid offsets. This is when clocks jump forward typically
     *  due to the spring daylight savings change from "winter" to "summer".
     *  In a gap there are local date-time values with no valid offset.</li>
     * <li>Overlap, with two valid offsets. This is when clocks are set back typically
     *  due to the autumn daylight savings change from "summer" to "winter".
     *  In an overlap there are local date-time values with two valid offsets.</li>
     * </ul><p>
     * Thus, for any given local date-time there can be zero, one or two valid offsets.
     * This method returns the single offset in the Normal case, and in the Gap or Overlap
     * case it returns the offset before the transition.
     * <p>
     * Since, in the case of Gap and Overlap, the offset returned is a "best" value, rather
     * than the "correct" value, it should be treated with care. Applications that care
     * about the correct offset should use a combination of this method,
     * {@link #getValidOffsets(LocalDateTime)} and {@link #getTransition(LocalDateTime)}.
     *
     * @param {LocalDateTime} localDateTime - the local date-time to query, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffset} the best available offset for the local date-time, not null
     */
    offsetOfLocalDateTime(localDateTime){
        abstractMethodFail('ZoneRules.offsetLocalDateTime');
    }

}


class Fixed extends ZoneRules{
    /**
     *
     * @param {ZoneOffset} offset
     */
    constructor(offset){
        super();
        this._offset = offset;
    }

    isFixedOffset(){
        return true;
    }

    offsetOfInstant(){
        return this._offset;
    }

    offsetOfLocalDateTime(){
        return this._offset;
    }

    //-----------------------------------------------------------------------
    /**
     *
     * @param other
     * @returns {boolean}
     */
    equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof Fixed) {
            return this._offset.equals(other._offset);
        }
        return false;
    }

    /**
     *
     * @returns {string}
     */
    toString() {
        return 'FixedRules:' + this._offset.toString();
    }

}
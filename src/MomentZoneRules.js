import { ZoneOffset, ZoneRules } from 'js-joda';

export class MomentZoneRules extends ZoneRules{
    constructor(tzdbInfo){
        super();
        this._tzdbInfo = tzdbInfo;
    }
    /**
     * Checks of the zone rules are fixed, such that the offset never varies.
     *
     * @return {boolean} true if the time-zone is fixed and the offset never changes
     */
    isFixedOffset(){
        return this._tzdbInfo.offsets.length === 1;
    }

    //-----------------------------------------------------------------------

    /**
     * Gets the offset applicable at the specified instant in these rules.
     * <p>
     * The mapping from an instant to an offset is simple, there is only
     * one valid offset for each instant.
     * This method returns that offset.
     *
     * @param {Instant} instant - the instant to find the offset for, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffset} the offset, not null
     */
    offsetOfInstant(instant){
        let epochMilli = instant.toEpochMilli();

        let index  = binarySearch(this._tzdbInfo.untils, epochMilli);
        return ZoneOffset.ofTotalSeconds(roundDown(this._tzdbInfo.offsets[index]*-60));
    }

    /**
     * Gets the offset applicable at the specified epochMilli in these rules.
     *
     * The method is for javascript performance optimisation.
     *
     * @param {number} epochMilli - the epoch millisecond to find the offset for, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffset} the offset, not null
     */
    offsetOfEpochMilli(epochMilli){
        tbc('ZoneRules.offsetOfEpochMilli');
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
        tbc('ZoneRules.offsetLocalDateTime');
    }

    /**
     * Gets the offset applicable at the specified local date-time in these rules.
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
     * This method returns that list of valid offsets, which is a list of size 0, 1 or 2.
     * In the case where there are two offsets, the earlier offset is returned at index 0
     * and the later offset at index 1.
     * <p>
     * There are various ways to handle the conversion from a {@code LocalDateTime}.
     * One technique, using this method, would be:
     * <pre>
     *  List<ZoneOffset> validOffsets = rules.getOffset(localDT);
     *  if (validOffsets.size() == 1) {
     *    // Normal case: only one valid offset
     *    zoneOffset = validOffsets.get(0);
     *  } else {
     *    // Gap or Overlap: determine what to do from transition (which will be non-null)
     *    ZoneOffsetTransition trans = rules.getTransition(localDT);
     *  }
     * </pre>
     * <p>
     * In theory, it is possible for there to be more than two valid offsets.
     * This would happen if clocks to be put back more than once in quick succession.
     * This has never happened in the history of time-zones and thus has no special handling.
     * However, if it were to happen, then the list would return more than 2 entries.
     *
     * @param {LocalDateTime} localDateTime - the local date-time to query for valid offsets, not null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffset[]} the list of valid offsets, may be immutable, not null
     */
    validOffsets(localDateTime){
        tbc('ZoneRules.validOffsets');
    }

    /**
     * Gets the offset transition applicable at the specified local date-time in these rules.
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
     * A transition is used to model the cases of a Gap or Overlap.
     * The Normal case will return null.
     * <p>
     * There are various ways to handle the conversion from a {@code LocalDateTime}.
     * One technique, using this method, would be:
     * <pre>
     *  ZoneOffsetTransition trans = rules.getTransition(localDT);
     *  if (trans != null) {
     *    // Gap or Overlap: determine what to do from transition
     *  } else {
     *    // Normal case: only one valid offset
     *    zoneOffset = rule.getOffset(localDT);
     *  }
     * </pre>
     *
     * @param {LocalDateTime} localDateTime  the local date-time to query for offset transition, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffsetTransition} the offset transition, null if the local date-time is not in transition
     */
    transition(localDateTime){
        tbc('ZoneRules.transition');
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the standard offset for the specified instant in this zone.
     * <p>
     * This provides access to historic information on how the standard offset
     * has changed over time.
     * The standard offset is the offset before any daylight saving time is applied.
     * This is typically the offset applicable during winter.
     *
     * @param {Instant} instant - the instant to find the offset information for, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffset} the standard offset, not null
     */
    standardOffset(instant){
        tbc('ZoneRules.standardOffset');
    }

    /**
     * Gets the amount of daylight savings in use for the specified instant in this zone.
     * <p>
     * This provides access to historic information on how the amount of daylight
     * savings has changed over time.
     * This is the difference between the standard offset and the actual offset.
     * Typically the amount is zero during winter and one hour during summer.
     * Time-zones are second-based, so the nanosecond part of the duration will be zero.
     *
     * @param {Instant} instant - the instant to find the daylight savings for, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {Duration} the difference between the standard and actual offset, not null
     */
    daylightSavings(instant){
        tbc('ZoneRules.daylightSavings');
        //    default {
        //        ZoneOffset standardOffset = getStandardOffset(instant);
        //        ZoneOffset actualOffset = getOffset(instant);
        //        return actualOffset.toDuration().minus(standardOffset.toDuration()).normalized();
        //    }
    }

    /**
     * Checks if the specified instant is in daylight savings.
     * <p>
     * This checks if the standard and actual offsets are the same at the specified instant.
     *
     * @param {Instant} instant - the instant to find the offset information for, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {boolean} the standard offset, not null
     */
    isDaylightSavings(instant) {
        tbc('ZoneRules.isDaylightSavings');
        //    default {
        //        return (getStandardOffset(instant).equals(getOffset(instant)) == false);
        //    }
    }

    /**
     * Checks if the offset date-time is valid for these rules.
     * <p>
     * To be valid, the local date-time must not be in a gap and the offset
     * must match the valid offsets.
     *
     * @param {LocalDateTime} localDateTime - the date-time to check, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @param {ZoneOffset} offset - the offset to check, null returns false
     * @return {boolean} true if the offset date-time is valid for these rules
     */
    isValidOffset(localDateTime, offset){
        tbc('ZoneRules.isValidOffset');
    }

    //-----------------------------------------------------------------------
    /**
     * Gets the next transition after the specified instant.
     * <p>
     * This returns details of the next transition after the specified instant.
     * For example, if the instant represents a point where "Summer" daylight savings time
     * applies, then the method will return the transition to the next "Winter" time.
     *
     * @param {Instant} instant - the instant to get the next transition after, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffsetTransition} the next transition after the specified instant, null if this is after the last transition
     */
    nextTransition(instant){
        tbc('ZoneRules.nextTransition');
    }

    /**
     * Gets the previous transition before the specified instant.
     * <p>
     * This returns details of the previous transition after the specified instant.
     * For example, if the instant represents a point where "summer" daylight saving time
     * applies, then the method will return the transition from the previous "winter" time.
     *
     * @param {Instant} instant - the instant to get the previous transition after, not null, but null
     *  may be ignored if the rules have a single offset for all instants
     * @return {ZoneOffsetTransition} the previous transition after the specified instant, null if this is before the first transition
     */
    previousTransition(instant){
        tbc('ZoneRules.previousTransition');
    }

    /**
     * Gets the complete list of fully defined transitions.
     * <p>
     * The complete set of transitions for this rules instance is defined by this method
     * and {@link #getTransitionRules()}. This method returns those transitions that have
     * been fully defined. These are typically historical, but may be in the future.
     * <p>
     * The list will be empty for fixed offset rules and for any time-zone where there has
     * only ever been a single offset. The list will also be empty if the transition rules are unknown.
     *
     * @return {ZoneOffsetTransition[]} an immutable list of fully defined transitions, not null
     */
    transitions(){
        tbc('ZoneRules.transitions');
    }

    /**
     * Gets the list of transition rules for years beyond those defined in the transition list.
     * <p>
     * The complete set of transitions for this rules instance is defined by this method
     * and {@link #getTransitions()}. This method returns instances of {@link ZoneOffsetTransitionRule}
     * that define an algorithm for when transitions will occur.
     * <p>
     * For any given {@code ZoneRules}, this list contains the transition rules for years
     * beyond those years that have been fully defined. These rules typically refer to future
     * daylight saving time rule changes.
     * <p>
     * If the zone defines daylight savings into the future, then the list will normally
     * be of size two and hold information about entering and exiting daylight savings.
     * If the zone does not have daylight savings, or information about future changes
     * is uncertain, then the list will be empty.
     * <p>
     * The list will be empty for fixed offset rules and for any time-zone where there is no
     * daylight saving time. The list will also be empty if the transition rules are unknown.
     *
     * @return {ZoneOffsetTransitionRule[]} an immutable list of transition rules, not null
     */
    transitionRules(){
        tbc('ZoneRules.transitionRules');
    }

    /**
     *
     * @param other
     * @returns {boolean}
     */
    equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof MomentZoneRules) {
            return this._tzdbInfo === other._tzdbInfo;
        }
        return false;
    }

    /**
     *
     * @returns {string}
     */
    toString() {
        return this._tzdbInfo.name;
    }
}

function roundDown(r){
    if (r < 0) {
        return Math.ceil(r);
    } else {
        return Math.floor(r);
    }
}

// modified bin-search, to always find existing indices for non-empty arrays
// value in array at index is larger than input value (or last index of array)
function binarySearch(array, value) {
    let hi = array.length - 1, lo = -1, mid;
    while (hi - lo > 1) {
        if (array[mid = hi + lo >> 1] <= value) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    return hi;
}

function tbc(msg){
    throw new Error('not yet implemented: ' + msg);    
}
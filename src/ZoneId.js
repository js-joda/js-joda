/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {abstractMethodFail, requireNonNull} from './assert';

import {DateTimeException} from './errors';
import {TemporalQueries} from './temporal/TemporalQueries';

import {SystemDefaultZoneRules} from './zone/SystemDefaultZoneRules';

export class ZoneId {

    //-----------------------------------------------------------------------
    /**
     * Gets the system default time-zone.
     * <p>
     *
     * @return {ZoneId} the zone ID, not null
     */
    static systemDefault() {
        return zoneSystemDefaultInstance;
    }


    //-----------------------------------------------------------------------
    /**
     * Gets the time-zone rules for this ID allowing calculations to be performed.
     * <p>
     * The rules provide the functionality associated with a time-zone,
     * such as finding the offset for a given instant or local date-time.
     * <p>
     * A time-zone can be invalid if it is deserialized in a Java Runtime which
     * does not have the same rules loaded as the Java Runtime that stored it.
     * In this case, calling this method will throw a {@code ZoneRulesException}.
     * <p>
     * The rules are supplied by {@link ZoneRulesProvider}. An advanced provider may
     * support dynamic updates to the rules without restarting the Java Runtime.
     * If so, then the result of this method may change over time.
     * Each individual call will be still remain thread-safe.
     * <p>
     * {@link ZoneOffset} will always return a set of rules where the offset never changes.
     *
     * @return {!ZoneRules} the rules, not null
     * @throws ZoneRulesException if no rules are available for this ID
     */
    rules(){
        abstractMethodFail('ZoneId.rules');
    }

    id(){
        return this.toString();
    }

    /**
     * Obtains an instance of {@code ZoneId} from a temporal object.
     * <p>
     * A {@code TemporalAccessor} represents some form of date and time information.
     * This factory converts the arbitrary temporal object to an instance of {@code ZoneId}.
     * <p>
     * The conversion will try to obtain the zone in a way that favours region-based
     * zones over offset-based zones using {@link TemporalQueries#zone()}.
     * <p>
     * This method matches the signature of the functional interface {@link TemporalQuery}
     * allowing it to be used in queries via method reference, {@code ZoneId::from}.
     *
     * @param {!TemporalAccessor} temporal - the temporal object to convert, not null
     * @return {ZoneId} the zone ID, not null
     * @throws DateTimeException if unable to convert to a {@code ZoneId}
     */
    static from(temporal) {
        requireNonNull(temporal, 'temporal');
        var obj = temporal.query(TemporalQueries.zone());
        if (obj == null) {
            throw new DateTimeException('Unable to obtain ZoneId from TemporalAccessor: ' +
                    temporal + ', type ' + (temporal.constructor != null ? temporal.constructor.name : ''));
        }
        return obj;
    }

}

class ZoneIdSystemDefault extends ZoneId {

    constructor(){
        super();
        this._rules = new SystemDefaultZoneRules();
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
        return 'SYSTEM';
    }
}

var zoneSystemDefaultInstance = null;

export function _init(){
    zoneSystemDefaultInstance = new ZoneIdSystemDefault();
}


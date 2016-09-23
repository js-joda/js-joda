/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {DateTimeException} from './errors';

import {ZoneId} from './ZoneId';
import {ZoneOffset} from './ZoneOffset';

/**
 * A geographical region where the same time-zone rules apply.
 * <p>
 * Time-zone information is categorized as a set of rules defining when and
 * how the offset from UTC/Greenwich changes. These rules are accessed using
 * identifiers based on geographical regions, such as countries or states.
 * The most common region classification is the Time Zone Database (TZDB),
 * which defines regions such as 'Europe/Paris' and 'Asia/Tokyo'.
 * <p>
 * The region identifier, modeled by this class, is distinct from the
 * underlying rules, modeled by {@link ZoneRules}.
 * The rules are defined by governments and change frequently.
 * By contrast, the region identifier is well-defined and long-lived.
 * This separation also allows rules to be shared between regions if appropriate.
 *
 * <h3>Specification for implementors</h3>
 * This class is immutable and thread-safe.
 */
export class ZoneRegion extends ZoneId {
    /**
     * not yet implemented
     * @params {string} zoneId
     * @return {ZoneId}
     */
    static ofId(zoneId){
        // special case as removed from data file
        if (zoneId === 'GMT0') {
            var rules = ZoneOffset.UTC.rules();
            return new ZoneRegion(zoneId, rules);
        }
        throw new DateTimeException('ZoneRegion.ofId() is not yet implemented');
    }
    
     //-------------------------------------------------------------------------
    /**
     * Constructor.
     *
     * @param {string} id  the time-zone ID, not null
     * @param {ZoneRules} rules  the rules, null for lazy lookup
     */
    constructor(id, rules) {
        super();
        this._id = id;
        this._rules = rules;
    }

    //-----------------------------------------------------------------------
    /**
     *
     * @returns {string}
     */
    id() {
        return this._id;
    }

    /**
     *
     * @returns {ZoneRules}
     */
    rules() {
        return this._rules;
    }

}

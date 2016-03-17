/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {requireNonNull} from './assert';
import {DateTimeException, IllegalArgumentException} from './errors';
import {StringUtil} from './StringUtil';

import {ZoneId} from './ZoneId';
import {ZoneOffset} from './ZoneOffset';
import {ZoneRegion} from './ZoneRegion';

import {TemporalQueries} from './temporal/TemporalQueries';
import {SystemDefaultZoneId} from './zone/SystemDefaultZoneId';

/**
 * 
 * @returns {*}
 */
function systemDefault() {
    return SYSTEM_DEFAULT_ZONE_ID_INSTANCE;
}

function of(zoneId){
    requireNonNull(zoneId, 'zoneId');
    if (zoneId === 'Z') {
        return ZoneOffset.UTC;
    }
    if (zoneId.length === 1) {
        throw new DateTimeException('Invalid zone: ' + zoneId);
    }
    if (StringUtil.startsWith(zoneId, '+') || StringUtil.startsWith(zoneId, '-')) {
        return ZoneOffset.of(zoneId);
    }
    if (zoneId === 'UTC' || zoneId === 'GMT' || zoneId === 'UT') {
        return new ZoneRegion(zoneId, ZoneOffset.UTC.rules());
    }
    if (StringUtil.startsWith(zoneId, 'UTC+') || StringUtil.startsWith(zoneId, 'GMT+') ||
            StringUtil.startsWith(zoneId, 'UTC-') || StringUtil.startsWith(zoneId, 'GMT-')) {
        let offset = ZoneOffset.of(zoneId.substring(3));
        if (offset.totalSeconds() === 0) {
            return new ZoneRegion(zoneId.substring(0, 3), offset.rules());
        }
        return new ZoneRegion(zoneId.substring(0, 3) + offset.id(), offset.rules());
    }
    if (StringUtil.startsWith(zoneId, 'UT+') || StringUtil.startsWith(zoneId, 'UT-')) {
        let offset = ZoneOffset.of(zoneId.substring(2));
        if (offset.totalSeconds() === 0) {
            return new ZoneRegion('UT', offset.rules());
        }
        return new ZoneRegion('UT' + offset.id(), offset.rules());
    }
    return ZoneRegion.ofId(zoneId, true);
}

function ofOffset(prefix, offset){
    requireNonNull(prefix, 'prefix');
    requireNonNull(offset, 'offset');
    if (prefix.length === 0) {
        return offset;
    }
    if (prefix === 'GMT' || prefix === 'UTC' || prefix === 'UT') {
        if (offset.totalSeconds() === 0) {
            return new ZoneRegion(prefix, offset.rules());
        }
        return new ZoneRegion(prefix + offset.id(), offset.rules());
    }
    throw new IllegalArgumentException('Invalid prefix, must be GMT, UTC or UT: ' + prefix);
}


function from(temporal){
    requireNonNull(temporal, 'temporal');
    var obj = temporal.query(TemporalQueries.zone());
    if (obj == null) {
        throw new DateTimeException('Unable to obtain ZoneId from TemporalAccessor: ' +
                temporal + ', type ' + (temporal.constructor != null ? temporal.constructor.name : ''));
    }
    return obj;
}

ZoneId.systemDefault = systemDefault;
ZoneId.of = of;
ZoneId.ofOffset = ofOffset;
ZoneId.from = from;

// bad hack for ie9, we need a better way to get rid of the dependency cycles
ZoneOffset.from = from;
ZoneRegion.from = from;

var SYSTEM_DEFAULT_ZONE_ID_INSTANCE = null;

export function _init(){
    SYSTEM_DEFAULT_ZONE_ID_INSTANCE = new SystemDefaultZoneId();
}


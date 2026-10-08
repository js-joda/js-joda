/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {
    _ as jodaInternal,
    ChronoField,
    DateTimeException,
    DateTimeFormatterBuilder,
    Instant,
    TextStyle,
    TemporalQueries,
    ZoneId,
    ZoneOffset,
    ZoneRulesProvider,
} from '@js-joda/core';

import { getOrCreateCldrInstance, getOrCreateMapZones, loadCldrData } from './CldrCache';

const { assert: { requireNonNull, requireInstance } } = jodaInternal;

//-----------------------------------------------------------------------
const LENGTH_COMPARATOR = (str1, str2) => {
    let cmp = str2.length - str1.length;
    if (cmp === 0) {
        cmp = str1.localeCompare(str2);
    }
    return cmp;
};

/**
 * Cache for `_cachedResolveZoneIdText`.
 *
 * Its basic structure is:
 * Obj { locale: zoneId }
 * Obj { zoneId: style}
 * Obj { style: type}
 * Obj { type: metazone}
 * Obj { metazone: resolvedZoneIdText}
 *
 * A resolved text may be undefined, if there is no text for the zone.
 */
const resolveZoneIdTextCache = {};

/**
 * Parses the offset after a UT/UTC/GMT prefix, or a plain offset.
 * Uses '0' as no offset text, so that a trailing 'Z' is not consumed.
 */
const OFFSET_ID_PARSER = new DateTimeFormatterBuilder.OffsetIdPrinterParser('0', '+HH:MM:ss');

/**
 * Parses a metazone date of the cldr supplemental data, e.g. '1991-10-27 07:00', as UTC.
 *
 * @param {String} text
 * @return {number} the epoch milli
 */
const parseMetazoneDate = (text) => {
    const [date, time] = text.split(' ');
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    return Date.UTC(year, month - 1, day, hour, minute);
};

/**
 * Checks if the error tells that the zone rules don't support `isDaylightSavings()`:
 * - `ZoneRules` that don't implement it (TypeError: abstract method ... is not implemented)
 * - `@js-joda/timezone` before 3.1 (Error: not supported: ...)
 * - `@js-joda/timezone` 3.1 or later with tz data without standard offsets
 *
 * @param {*} ex
 * @return {boolean}
 */
const isDaylightSavingsUnsupported = (ex) => {
    const message = ex != null && typeof ex.message === 'string' ? ex.message : '';
    return message.indexOf('abstract method') >= 0 ||
        message.indexOf('not supported') >= 0 ||
        message.indexOf('has no standard offsets') >= 0;
};

/**
 * Prints or parses a zone ID.
 */
export default class CldrZoneTextPrinterParser {
    /** The text style to output. */

    constructor(textStyle) {
        requireNonNull(textStyle, 'textStyle');
        requireInstance(textStyle, TextStyle, 'textStyle');
        this._textStyle = textStyle;
        this._zoneIdsLocales = {};
        loadCldrData('supplemental/likelySubtags.json');
        loadCldrData('supplemental/metaZones.json');
    }

    /**
     * @param {Cldr} cldr
     * @param {String} zoneId
     * @param {String} style - 'long' or 'short'
     * @param {String} type - 'generic', 'standard' or 'daylight'
     * @param {String} [metazone] - the metazone of the zone, defaults to its current metazone
     * @return {String|undefined} the zone text
     */
    _cachedResolveZoneIdText(cldr, zoneId, style, type, metazone) {
        if (resolveZoneIdTextCache[cldr.locale] == null) {
            resolveZoneIdTextCache[cldr.locale] = {};
        }

        const zoneIdToStyle = resolveZoneIdTextCache[cldr.locale];
        if (zoneIdToStyle[zoneId] == null) {
            zoneIdToStyle[zoneId] = {};
        }

        const styleToType = zoneIdToStyle[zoneId];
        if (styleToType[style] == null) {
            styleToType[style] = {};
        }

        const typeToMetazone = styleToType[style];
        if (typeToMetazone[type] == null) {
            typeToMetazone[type] = {};
        }

        const metazoneToResolvedZoneIdText = typeToMetazone[type];
        const metazoneKey = metazone == null ? '' : metazone;
        // a resolved text may be undefined, so check the key, to cache misses as well
        if (!Object.prototype.hasOwnProperty.call(metazoneToResolvedZoneIdText, metazoneKey)) {
            metazoneToResolvedZoneIdText[metazoneKey] = this._resolveZoneIdText(cldr, zoneId, style, type, metazone);
        }

        return metazoneToResolvedZoneIdText[metazoneKey];
    }

    /**
     * Gets the metazone that the zone uses at the instant.
     *
     * @param {Cldr} cldr
     * @param {String} zoneId
     * @param {number} [epochMilli] - the instant, defaults to the current metazone
     * @return {String|undefined} the metazone, undefined if the zone has none at the instant
     */
    _metazone(cldr, zoneId, epochMilli) {
        const metazoneInfo = cldr.get(`supplemental/metaZones/metazoneInfo/timezone/${zoneId}`);
        if (!metazoneInfo) {
            return undefined;
        }
        if (epochMilli == null) {
            return metazoneInfo[metazoneInfo.length - 1]['usesMetazone']['_mzone'];
        }
        for (const info of metazoneInfo) {
            const { _mzone, _from, _to } = info['usesMetazone'];
            if ((_from == null || parseMetazoneDate(_from) <= epochMilli) &&
                (_to == null || epochMilli < parseMetazoneDate(_to))) {
                return _mzone;
            }
        }
        return undefined;
    }

    _resolveZoneIdText(cldr, zoneId, style, type, metazone) {
        const zoneData = cldr.main(`dates/timeZoneNames/zone/${zoneId}/${style}/${type}`);
        if (zoneData) {
            return zoneData;
        } else {
            if (metazone == null) {
                metazone = this._metazone(cldr, zoneId);
            }
            if (metazone) {
                let metaZoneData = cldr.main(`dates/timeZoneNames/metazone/${metazone}/${style}/${type}`);
                if (metaZoneData) {
                    return metaZoneData;
                } else {
                    // type fallback, first generic, then standard; a daylight name never falls
                    // back to the standard name, which would denote a different offset
                    metaZoneData = cldr.main(`dates/timeZoneNames/metazone/${metazone}/${style}/generic`);
                    if (!metaZoneData && type !== 'daylight') {
                        metaZoneData = cldr.main(`dates/timeZoneNames/metazone/${metazone}/${style}/standard`);
                    }
                    if (metaZoneData) {
                        return metaZoneData;
                    } else {
                        const mapZones = getOrCreateMapZones(cldr);
                        // find preferred Zone and resolve again
                        const preferredZone = mapZones[metazone][cldr.attributes.territory];
                        if (preferredZone) {
                            if (preferredZone !== zoneId) {
                                return this._cachedResolveZoneIdText(cldr, preferredZone, style, type, metazone);
                            }
                        } else {
                            // find golden Zone and resolve again
                            const goldenZone = mapZones[metazone]['001'];
                            if (goldenZone !== zoneId) {
                                return this._cachedResolveZoneIdText(cldr, goldenZone, style, type, metazone);
                            }
                        }
                    }
                }
            }
        }
    }

    //-----------------------------------------------------------------------
    print(context, buf) {

        //see http://www.unicode.org/reports/tr35/tr35-dates.html#Time_Zone_Names

        const zone = context.getValueQuery(TemporalQueries.zoneId());
        /* istanbul ignore if */ // shouldn't happen... getValueQuery throws before returning null
        if (zone == null) {
            return false;
        }
        if (zone.normalized() instanceof ZoneOffset) {
            buf.append(zone.id());
            return true;
        }
        let instant = null;
        let daylight = false;
        let hasDaylightSupport = false;
        const temporal = context.temporal();
        if (temporal.isSupported(ChronoField.INSTANT_SECONDS)) {
            instant = Instant.ofEpochSecond(temporal.getLong(ChronoField.INSTANT_SECONDS));
            try {
                daylight = zone.rules().isDaylightSavings(instant);
                hasDaylightSupport = true;
            } catch (ex) {
                if (!isDaylightSavingsUnsupported(ex)) {
                    throw ex;
                }
                // the rules have no daylight savings information, fall back to the generic name
            }
        }
        const tzType = hasDaylightSupport ? (daylight ? 'daylight' : 'standard') : 'generic';
        const tzstyle = (this._textStyle.asNormal() === TextStyle.FULL ? 'long' : 'short');
        loadCldrData(`main/${context.locale().localeString()}/timeZoneNames.json`);
        const cldr = getOrCreateCldrInstance(context.locale().localeString());

        // the metazone at the instant, so that a historic date gets the name of the offset in use then
        const metazone = instant == null ? undefined : this._metazone(cldr, zone.id(), instant.toEpochMilli());
        const text = this._cachedResolveZoneIdText(cldr, zone.id(), tzstyle, tzType, metazone);
        if (text) {
            buf.append(text);
        } else {
            // fallback, print zoneId
            buf.append(zone.id());
        }
        return true;
    }

    _resolveZoneIds(localString) {
        if(this._zoneIdsLocales[localString] != null) {
            return this._zoneIdsLocales[localString];
        }
        const ids = {};
        loadCldrData(`main/${localString}/timeZoneNames.json`);
        const cldr = getOrCreateCldrInstance(localString);

        for (const id of ZoneRulesProvider.getAvailableZoneIds()) {
            ids[id] = id;
            const tzstyle = (this._textStyle.asNormal() === TextStyle.FULL ? 'long' : 'short');

            const genericText = this._cachedResolveZoneIdText(cldr, id, tzstyle, 'generic');
            if (genericText) {
                ids[genericText] = id;
            }
            const standardText = this._cachedResolveZoneIdText(cldr, id, tzstyle, 'standard');
            if (standardText) {
                ids[standardText] = id;
            }
            const daylightText = this._cachedResolveZoneIdText(cldr, id, tzstyle, 'daylight');
            if (daylightText) {
                ids[daylightText] = id;
            }
        }
        // threeten is using a (sorted) TreeMap... so we need to sort the keys
        const sortedKeys = Object.keys(ids).sort(LENGTH_COMPARATOR);

        this._zoneIdsLocales[localString] = { ids, sortedKeys };
        return this._zoneIdsLocales[localString];
    }

    parse(context, text, position) {
        // handle fixed offsets
        const length = text.length;
        if (position >= length) {
            return ~position;
        }
        const first = text.charAt(position);
        if (first === '+' || first === '-') {
            if (position + 6 > length) {
                return ~position;
            }
            return this._parseOffset(context, text, position, '');
        }
        for (const prefix of ['GMT', 'UTC', 'UT']) {
            if (context.subSequenceEquals(text, position, prefix, 0, prefix.length)) {
                return this._parseOffset(context, text, position, prefix);
            }
        }

        // this is a poor implementation that handles some but not all of the spec
        const { ids, sortedKeys } = this._resolveZoneIds(context.locale().localeString());
        for (const name of sortedKeys) {
            if (context.subSequenceEquals(text, position, name, 0, name.length)) {
                context.setParsedZone(ZoneId.of(ids[name]));
                return position + name.length;
            }
        }
        if (context.charEquals(first, 'Z')) {
            context.setParsedZone(ZoneOffset.UTC);
            return position + 1;
        }
        return ~position;
    }

    /**
     * Parses an optional offset after a UT/UTC/GMT prefix, or a plain offset if the prefix is empty.
     *
     * @param {DateTimeParseContext} context
     * @param {String} text
     * @param {number} position
     * @param {String} prefix
     * @return {number}
     */
    _parseOffset(context, text, position, prefix) {
        const searchPos = position + prefix.length;
        if (searchPos >= text.length) {
            context.setParsedZone(ZoneId.of(prefix));
            return searchPos;
        }
        const first = text.charAt(searchPos);
        if (first !== '+' && first !== '-') {
            context.setParsedZone(ZoneId.of(prefix));
            return searchPos;
        }
        const contextCopy = context.copy();
        try {
            const endPos = OFFSET_ID_PARSER.parse(contextCopy, text, searchPos);
            if (endPos < 0) {
                if (prefix.length === 0) {
                    return ~position;
                }
                context.setParsedZone(ZoneId.of(prefix));
                return searchPos;
            }
            const offset = ZoneOffset.ofTotalSeconds(contextCopy.getParsed(ChronoField.OFFSET_SECONDS));
            context.setParsedZone(prefix.length === 0 ? offset : ZoneId.ofOffset(prefix, offset));
            return endPos;
        } catch (ex) {
            if (ex instanceof DateTimeException) {
                return ~position;
            }
            throw ex;
        }
    }

    toString() {
        return `ZoneText(${this._textStyle})`;
    }
}

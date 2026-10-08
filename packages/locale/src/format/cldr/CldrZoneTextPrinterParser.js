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
 * Obj { type: resolvedZoneIdText}
 */
const resolveZoneIdTextCache = {};

/**
 * Parses the offset after a UT/UTC/GMT prefix, or a plain offset.
 * Uses '0' as no offset text, so that a trailing 'Z' is not consumed.
 */
const OFFSET_ID_PARSER = new DateTimeFormatterBuilder.OffsetIdPrinterParser('0', '+HH:MM:ss');

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

    _cachedResolveZoneIdText(cldr, zoneId, style, type) {
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

        const typeToResolvedZoneIdText = styleToType[style];
        if (typeToResolvedZoneIdText[type] == null) {
            typeToResolvedZoneIdText[type] = this._resolveZoneIdText(cldr, zoneId, style, type);
        }

        return typeToResolvedZoneIdText[type];
    }

    _resolveZoneIdText(cldr, zoneId, style, type) {
        const zoneData = cldr.main(`dates/timeZoneNames/zone/${zoneId}/${style}/${type}`);
        if (zoneData) {
            return zoneData;
        } else {
            const metazoneInfo = cldr.get(`supplemental/metaZones/metazoneInfo/timezone/${zoneId}`);
            if (metazoneInfo) {
                // const zoneData = cldr.main(`dates/timeZoneNames/metazone/Acre`);
                // TODO: determine metaZone for current temporal, for now, we use the last one :/
                const metazone = metazoneInfo[metazoneInfo.length - 1]['usesMetazone']['_mzone'];
                let metaZoneData = cldr.main(`dates/timeZoneNames/metazone/${metazone}/${style}/${type}`);
                if (metaZoneData) {
                    return metaZoneData;
                } else {
                    // type fallback, first generic, then standard
                    metaZoneData = cldr.main(`dates/timeZoneNames/metazone/${metazone}/${style}/generic`);
                    if (!metaZoneData) {
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
                                return this._cachedResolveZoneIdText(cldr, preferredZone, style, type);
                            }
                        } else {
                            // find golden Zone and resolve again
                            const goldenZone = mapZones[metazone]['001'];
                            if (goldenZone !== zoneId) {
                                return this._cachedResolveZoneIdText(cldr, goldenZone, style, type);
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
        let daylight = false;
        let hasDaylightSupport = false;
        const temporal = context.temporal();
        if (temporal.isSupported(ChronoField.INSTANT_SECONDS)) {
            try {
                const instant = Instant.ofEpochSecond(temporal.getLong(ChronoField.INSTANT_SECONDS));
                daylight = zone.rules().isDaylightSavings(instant);
                hasDaylightSupport = true;
            } catch (ex) {
                // the rules have no daylight savings information (e.g. tz data without
                // standard offsets), fall back to the generic name
            }
        }
        const tzType = hasDaylightSupport ? (daylight ? 'daylight' : 'standard') : 'generic';
        const tzstyle = (this._textStyle.asNormal() === TextStyle.FULL ? 'long' : 'short');
        loadCldrData(`main/${context.locale().localeString()}/timeZoneNames.json`);
        const cldr = getOrCreateCldrInstance(context.locale().localeString());

        const text = this._cachedResolveZoneIdText(cldr, zone.id(), tzstyle, tzType);
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

/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {
    _ as jodaInternal,
    TextStyle,
    TemporalQueries,
    ZoneId,
    ZoneOffset,
    ZoneRulesProvider,
} from '@js-joda/core';

import {getOrCreateCldrInstance, getOrCreateMapZones, loadCldrData} from './CldrCache';

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
 * Prints or parses a zone ID.
 */
export default class CldrZoneTextPrinterParser {
    /** The text style to output. */

    constructor(textStyle) {
        requireNonNull(textStyle, 'textStyle');
        requireInstance(textStyle, TextStyle, 'textStyle');
        this._textStyle = textStyle;
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
        const daylight = false;
        const hasDaylightSupport = false;
        /* TODO: currently js-joda-timezone does not support ZoneRules.isDaylightSavings() ... uncomment if it does
         const temporal = context.temporal();
         if (temporal.isSupported(ChronoField.INSTANT_SECONDS)) {
            hasDaylightSupport = true;
            const instant = Instant.ofEpochSecond(temporal.getLong(ChronoField.INSTANT_SECONDS));
            daylight = zone.rules().isDaylightSavings(instant);
        }*/
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

    parse(context, text, position) {
        const ids = {};
        loadCldrData(`main/${context.locale().localeString()}/timeZoneNames.json`);
        const cldr = getOrCreateCldrInstance(context.locale().localeString());

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
        for (const name of sortedKeys) {
            if (context.subSequenceEquals(text, position, name, 0, name.length)) {
                context.setParsedZone(ZoneId.of(ids[name]));
                return position + name.length;
            }
        }
        return ~position;
    }

    toString() {
        return `ZoneText(${this._textStyle})`;
    }
}

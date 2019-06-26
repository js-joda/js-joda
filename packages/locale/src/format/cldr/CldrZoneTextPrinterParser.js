/*
 * @copyright (c) 2017, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import cldrData from 'cldr-data';
import Cldr from 'cldrjs';

import {
    _ as jodaInternal,
    TextStyle,
    TemporalQueries,
    ZoneId,
    ZoneOffset,
    ZoneRulesProvider,
} from 'js-joda';

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
 * Prints or parses a zone ID.
 */
export default class CldrZoneTextPrinterParser {
    /** The text style to output. */

    constructor(textStyle) {
        requireNonNull(textStyle, 'textStyle');
        requireInstance(textStyle, TextStyle, 'textStyle');
        this._textStyle = textStyle;
        Cldr.load(cldrData('supplemental/likelySubtags.json'));
        Cldr.load(cldrData('supplemental/metaZones.json'));
    }

    _resolveZoneIdText(cldr, zoneId, style, type, mapZones) {
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
                        // find preferred Zone and resolve again
                        const preferredZone = mapZones[metazone][cldr.attributes.territory];
                        if (preferredZone) {
                            if (preferredZone !== zoneId) {
                                return this._resolveZoneIdText(cldr, preferredZone, style, type, mapZones);
                            }
                        } else {
                            // find golden Zone and resolve again
                            const goldenZone = mapZones[metazone]['001'];
                            if (goldenZone !== zoneId) {
                                return this._resolveZoneIdText(cldr, goldenZone, style, type, mapZones);
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
        Cldr.load(cldrData(`main/${context.locale().localeString()}/timeZoneNames.json`));
        const cldr = new Cldr(context.locale().localeString());
        const mapZones = {};

        cldr.get('supplemental/metaZones/metazones').forEach((metaZone) => {
            if (metaZone.mapZone) {
                if (!mapZones[metaZone.mapZone._other]) {
                    mapZones[metaZone.mapZone._other] = {};
                }
                mapZones[metaZone.mapZone._other][metaZone.mapZone._territory] = metaZone.mapZone._type;
            }
        });

        const text = this._resolveZoneIdText(cldr, zone.id(), tzstyle, tzType, mapZones);
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
        Cldr.load(cldrData(`main/${context.locale().localeString()}/timeZoneNames.json`));
        const cldr = new Cldr(context.locale().localeString());
        const mapZones = {};

        cldr.get('supplemental/metaZones/metazones').forEach((metaZone) => {
            if (metaZone.mapZone) {
                if (!mapZones[metaZone.mapZone._other]) {
                    mapZones[metaZone.mapZone._other] = {};
                }
                mapZones[metaZone.mapZone._other][metaZone.mapZone._territory] = metaZone.mapZone._type;
            }
        });
        for (const id of ZoneRulesProvider.getAvailableZoneIds()) {
            ids[id] = id;
            const tzstyle = (this._textStyle.asNormal() === TextStyle.FULL ? 'long' : 'short');

            const genericText = this._resolveZoneIdText(cldr, id, tzstyle, 'generic', mapZones);
            if (genericText) {
                ids[genericText] = id;
            }
            const standardText = this._resolveZoneIdText(cldr, id, tzstyle, 'standard', mapZones);
            if (standardText) {
                ids[standardText] = id;
            }
            const daylightText = this._resolveZoneIdText(cldr, id, tzstyle, 'daylight', mapZones);
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

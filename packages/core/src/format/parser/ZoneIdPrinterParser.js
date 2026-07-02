/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { ZoneOffset } from '../../ZoneOffset';
import { ZoneId } from '../../ZoneId';
import { ZoneRegion } from '../../ZoneRegion';

import { ChronoField } from '../../temporal/ChronoField';

import { ZoneRulesProvider } from '../../zone/ZoneRulesProvider';

import { OffsetIdPrinterParser } from './OffsetIdPrinterParser';

/**
 * Prints or parses a zone ID.
 * @private
 */
export class ZoneIdPrinterParser {

    /**
     *
     * @param {TemporalQuery} query
     * @param {string} description
     */
    constructor(query, description) {
        this.query = query;
        this.description = description;
    }

    //-----------------------------------------------------------------------
    /**
     *
     * @param {DateTimePrintContext } context
     * @param {StringBuilder} buf
     * @returns {boolean}
     */
    print(context, buf) {
        const zone = context.getValueQuery(this.query);
        if (zone == null) {
            return false;
        }
        buf.append(zone.id());
        return true;
    }

    //-----------------------------------------------------------------------
    /**
     * This implementation looks for the longest matching string.
     * For example, parsing Etc/GMT-2 will return Etc/GMC-2 rather than just
     * Etc/GMC although both are valid.
     *
     * This implementation uses a tree to search for valid time-zone names in
     * the parseText. The top level node of the tree has a length equal to the
     * length of the shortest time-zone as well as the beginning characters of
     * all other time-zones.
     *
     * @param {DateTimeParseContext} context
     * @param {String} text
     * @param {number} position
     * @return {number}
     */
    parse(context, text, position) {
        const length = text.length;
        if (position > length) {
            return ~position;
        }
        if (position === length) {
            return ~position;
        }

        // A fixed ID prefix (UT, UTC, GMT, Z) can also begin a longer region id
        // such as GMT0 or Zulu. Find the longest matching region up front so the
        // fixed-ID branches below can defer to it when it wins.
        const region = this._parseRegion(text, position);

        // handle fixed time-zone IDs
        const nextChar = text.charAt(position);
        if (nextChar === '+' || nextChar === '-') {
            const newContext = context.copy();
            const endPos = OffsetIdPrinterParser.INSTANCE_ID.parse(newContext, text, position);
            if (endPos < 0) {
                return endPos;
            }
            const offset = newContext.getParsed(ChronoField.OFFSET_SECONDS);
            const zone = ZoneOffset.ofTotalSeconds(offset);
            context.setParsedZone(zone);
            return endPos;
        } else if (length >= position + 2) {
            const nextNextChar = text.charAt(position + 1);
            if (context.charEquals(nextChar, 'U') &&
                context.charEquals(nextNextChar, 'T')) {
                if (length >= position + 3 &&
                    context.charEquals(text.charAt(position + 2), 'C')) {
                    return this._preferRegionIfLonger(context, region, position,
                        this._parsePrefixedOffset(context, text, position, position + 3));
                }
                return this._preferRegionIfLonger(context, region, position,
                    this._parsePrefixedOffset(context, text, position, position + 2));
            } else if (context.charEquals(nextChar, 'G') &&
                length >= position + 3 &&
                context.charEquals(nextNextChar, 'M') &&
                context.charEquals(text.charAt(position + 2), 'T')) {
                return this._preferRegionIfLonger(context, region, position,
                    this._parsePrefixedOffset(context, text, position, position + 3));
            }
        }
        // javascript special case
        if(text.substr(position, 6) === 'SYSTEM'){
            context.setParsedZone(ZoneId.systemDefault());
            return position + 6;
        }

        // ...
        if (context.charEquals(nextChar, 'Z')) {
            context.setParsedZone(ZoneOffset.UTC);
            return this._preferRegionIfLonger(context, region, position, position + 1);
        }

        if (region != null) {
            context.setParsedZone(ZoneRegion.ofId(region.parsedZoneId));
            return position + region.parseLength;
        }

        return ~position;
    }

    /**
     * Finds the longest available zone region id matching text at position,
     * without touching the parse context.
     *
     * @param {String} text
     * @param {number} position
     * @return {?{parsedZoneId: string, parseLength: number}}
     */
    _parseRegion(text, position) {
        const availableZoneIds = ZoneRulesProvider.getAvailableZoneIds();
        if (availableZoneIds.length === 0) {
            return null;
        }
        if (zoneIdTree.size !== availableZoneIds.length) {
            zoneIdTree = ZoneIdTree.createTreeMap(availableZoneIds);
        }

        const maxParseLength = text.length - position;
        let treeMap = zoneIdTree.treeMap;
        let parsedZoneId = null;
        let parseLength = 0;
        while(treeMap != null) {
            const parsedSubZoneId = text.substr(position, Math.min(treeMap.length, maxParseLength));
            treeMap = treeMap.get(parsedSubZoneId);
            if (treeMap != null && treeMap.isLeaf) {
                parsedZoneId = parsedSubZoneId;
                parseLength = treeMap.length;
            }
        }
        if (parsedZoneId == null) {
            return null;
        }
        return { parsedZoneId, parseLength };
    }

    /**
     * Prefers a region id over a fixed-ID parse when the region consumes more
     * characters, so the longest match wins (e.g. GMT0 over GMT, Zulu over Z).
     *
     * @param {DateTimeParseContext} context
     * @param {?{parsedZoneId: string, parseLength: number}} region
     * @param {number} position
     * @param {number} endPos  end position of the fixed-ID parse
     * @return {number}
     */
    _preferRegionIfLonger(context, region, position, endPos) {
        if (region != null && region.parseLength > endPos - position) {
            context.setParsedZone(ZoneRegion.ofId(region.parsedZoneId));
            return position + region.parseLength;
        }
        return endPos;
    }

    /**
     *
     * @param {DateTimeParseContext} context
     * @param {String} text
     * @param {number} prefixPos
     * @param {number} position
     * @return {number}
     */
    _parsePrefixedOffset(context, text, prefixPos, position) {
        const prefix = text.substring(prefixPos, position).toUpperCase();
        const newContext = context.copy();
        if (position < text.length && context.charEquals(text.charAt(position), 'Z')) {
            context.setParsedZone(ZoneId.ofOffset(prefix, ZoneOffset.UTC));
            return position;
        }
        const endPos = OffsetIdPrinterParser.INSTANCE_ID.parse(newContext, text, position);
        if (endPos < 0) {
            context.setParsedZone(ZoneId.ofOffset(prefix, ZoneOffset.UTC));
            return position;
        }
        const offsetSecs = newContext.getParsed(ChronoField.OFFSET_SECONDS);
        const offset = ZoneOffset.ofTotalSeconds(offsetSecs);
        context.setParsedZone(ZoneId.ofOffset(prefix, offset));
        return endPos;
    }

    /**
     *
     * @returns {string}
     */
    toString() {
        return this.description;
    }
}

class ZoneIdTree {

    static createTreeMap(availableZoneIds) {
        const sortedZoneIds =  availableZoneIds.sort((a, b) => a.length - b.length);
        const treeMap = new ZoneIdTreeMap(sortedZoneIds[0].length, false);
        for (let i=0; i<sortedZoneIds.length; i++){
            treeMap.add(sortedZoneIds[i]);
        }
        return new ZoneIdTree(sortedZoneIds.length, treeMap);
    }

    constructor(size, treeMap) {
        this.size = size;
        this.treeMap = treeMap;
    }
}

class ZoneIdTreeMap {
    constructor(length = 0, isLeaf = false){
        this.length = length;
        this.isLeaf = isLeaf;
        this._treeMap = {};
    }

    add(zoneId){
        const idLength = zoneId.length;
        if(idLength === this.length) {
            this._treeMap[zoneId] = new ZoneIdTreeMap(idLength, true);
        } else if (idLength > this.length) {
            const subZoneId = zoneId.substr(0, this.length);
            let subTreeMap = this._treeMap[subZoneId];
            if (subTreeMap == null) {
                subTreeMap = new ZoneIdTreeMap(idLength, false);
                this._treeMap[subZoneId] = subTreeMap;
            }
            subTreeMap.add(zoneId);
        }
    }

    get(zoneId){
        return this._treeMap[zoneId];
    }
}

let zoneIdTree = new ZoneIdTree([]);
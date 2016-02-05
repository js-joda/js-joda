import {assert} from '../assert';
import {TemporalAccessor} from '../temporal/TemporalAccessor';
import {TemporalQueries} from '../temporal/TemporalQueries';

export class DateTimeParseContext{

    constructor(locale, symbols, chronology){
        this._locale = locale;
        this._symbols = symbols;
        this._chronology = chronology;

        this._caseSensitive = true;
        this._strict = true;
        this._parsed = [new Parsed()];
    }

    symbols(){
        return this._symbols;
    }

    isStrict(){
        return this._strict;
    }

    setStrict(strict){
        this._strict = strict;
    }

    /**
     * Checks if parsing is case sensitive.
     *
     * @return true if parsing is case sensitive, false if case insensitive
     */
    isCaseSensitive() {
        return this._caseSensitive;
    }

    /**
     * Sets whether the parsing is case sensitive or not.
     *
     * @param caseSensitive  changes the parsing to be case sensitive or not from now on
     */
    setCaseSensitive(caseSensitive) {
        this._caseSensitive = caseSensitive;
    }

    /**
     * Helper to compare two {@code CharSequence} instances.
     * This uses {@link #isCaseSensitive()}.
     *
     * @param cs1  the first character sequence, not null
     * @param offset1  the offset into the first sequence, valid
     * @param cs2  the second character sequence, not null
     * @param offset2  the offset into the second sequence, valid
     * @param length  the length to check, valid
     * @return true if equal
     */
    subSequenceEquals(cs1, offset1, cs2, offset2, length) {
        if (offset1 + length > cs1.length || offset2 + length > cs2.length) {
            return false;
        }
        if (! this.isCaseSensitive()) {
            cs1 = cs1.toLowerCase();
            cs2 = cs2.toLowerCase();
        }
        for (let i = 0; i < length; i++) {
            let ch1 = cs1[offset1 + i];
            let ch2 = cs2[offset2 + i];
            if (ch1 !== ch2) {
                return false;
            }
        }
        return true;
    }

    /**
     * Helper to compare two {@code char}.
     * This uses {@link #isCaseSensitive()}.
     *
     * @param ch1  the first character
     * @param ch2  the second character
     * @return true if equal
     */
    charEquals(ch1, ch2) {
        if (this.isCaseSensitive()) {
            return ch1 === ch2;
        }
        return this.charEqualsIgnoreCase(ch1, ch2);
    }

    /**
     * Compares two characters ignoring case.
     *
     * @param c1  the first
     * @param c2  the second
     * @return true if equal
     */
    charEqualsIgnoreCase(c1, c2) {
        return c1 === c2 ||
                c1.toLowerCase() === c2.toLowerCase();
    }

    setParsedField(field, value, errorPos, successPos){
        var currentParsedFieldValues = this.currentParsed().fieldValues;
        var old = currentParsedFieldValues[field];
        currentParsedFieldValues[field] = value;
        return (old != null && old !== value) ? ~errorPos : successPos;
    }

    getParsed(field) {
        return this.currentParsed().fieldValues[field];
    }

    toParsed() {
        return this.currentParsed();
    }

    currentParsed() {
        return this._parsed[this._parsed.length - 1];
    }

}

class Parsed extends TemporalAccessor {
    constructor(){
        super();
        this.chrono = null;
        this.zone = null;
        this.fieldValues = {};
        this.leapSecond = false;
    }

    copy() {
        var cloned = new Parsed();
        cloned.chrono = this.chrono;
        cloned.zone = this.zone;
        for(let field in this.fieldValues) {
            cloned.fieldValues[field] = this.fieldValues[field];
        }
        cloned.leapSecond = this.leapSecond;
        return cloned;
    }

    toString() {
        return `${this.fieldValues}, ${this.chrono}, ${this.zone}`;
    }

    isSupported(field) {
        return this.fieldValues[field] == null;
    }

    get(field) {
        var val = this.fieldValues[field];
        assert(val != null);
        return val;
    }

    query(query) {
        if (query === TemporalQueries.chronology()) {
            return this.chrono;
        }
        if (query === TemporalQueries.zoneId() || query === TemporalQueries.zone()) {
            return this.zone;
        }
        return super.query(query);
    }

}

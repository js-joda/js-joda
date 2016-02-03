import {assert} from '../assert';
import {TemporalAccessor} from '../temporal/TemporalAccessor';
import {TemporalQueries} from '../temporal/TemporalQueries';

export class DateTimeParseContext{

    constructor(locale, symbols, chronology){
        this._locale = locale;
        this._symbols = symbols;
        this._chronology = chronology;
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

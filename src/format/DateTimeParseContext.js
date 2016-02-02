export class DateTimeParseContext{

    constructor(locale, symbols, chronology){
        this._locale = locale;
        this._symbols = symbols;
        this._chronology = chronology;
        this._strict = true;
        this._parsed = [];
    }

    symbols(){
        return this._symbols;
    }

    isStrict(){
        return this._strict;
    }

    setParsedField(){

    }
}
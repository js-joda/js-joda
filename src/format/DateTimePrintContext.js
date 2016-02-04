import {DateTimeException} from '../errors';


export class DateTimePrintContext{
    constructor(temporal, locale, symbols) {
        this._temporal = temporal;
        this._locale = locale;
        this._symbols = symbols;
        this._optional = 0;
    }

    symbols(){
        return this._symbols;
    }

    /**
     * Starts the printing of an optional segment of the input.
     */
    startOptional() {
        this._optional++;
    }

    /**
     * Ends the printing of an optional segment of the input.
     */
    endOptional() {
        this._optional--;
    }

    /**
     * Gets the value of the specified field.
     *
     * This will return the value for the specified field.
     *
     * @param field  the field to find, not null
     * @return the value, null if not found and optional is true
     * @throws DateTimeException if the field is not available and the section is not optional
     */
    getValue(field) {
        try {
            return this._temporal.getLong(field);
        } catch (ex) {
            if ((ex instanceof DateTimeException) && this._optional > 0) {
                return null;
            }
            throw ex;
        }
    }

    //-------------------------------------------------------------------------
    // for testing
    /**
     * Sets the date-time being output.
     *
     * @param temporal  the date-time object, not null
     */
    setDateTime(temporal) {
        this._temporal = temporal;
    }


}
/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

export class JsJodaException extends Error {
    constructor(message, cause = null) {
        super(arguments);
        if (!Error.captureStackTrace) {
            this.stack = (new Error()).stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
        
        this.message = message;
    }

    toString () {
        return `${this.name}: ${this.message}`;
    }
}

export class DateTimeException extends JsJodaException {
    constructor(message, cause = null) {
        super(arguments);
        
        let msg = message || this.name;
        if (cause !== null && cause instanceof Error) {
            msg += '\n-------\nCaused by: ' + cause.stack + '\n-------\n';
        }
        this.message = msg;
    }

    toString () {
        return `${this.name}: ${this.message}`;
    }
} 

export class DateTimeParseException extends JsJodaException {
    constructor(message, cause = null) {
        super(arguments);
        this.messageForDateTimeParseException(arguments);
    }

    messageForDateTimeParseException(message, text = '', index = 0, cause = null) {
        let msg = message || this.name;
        msg += ': ' + text + ', at index: ' + index;
        if (cause !== null && cause instanceof Error) {
            msg += '\n-------\nCaused by: ' + cause.stack + '\n-------\n';
        }
        this.message = msg;
        this.parsedString = () => {
            return text;
        };
        this.errorIndex = () => {
            return index;
        };
    }
    
}

export class UnsupportedTemporalTypeException extends DateTimeException {
    constructor(message,cause = null) {
        super(arguments);
    }
}

export class NullPointerException extends JsJodaException {
    constructor(message,cause = null) {
        super(arguments);
    }
}
export class IllegalStateException extends JsJodaException {
    constructor(message,cause = null) {
        super(arguments);
    }
}
export class IllegalArgumentException extends JsJodaException {
    constructor(message,cause = null) {
        super(arguments);
    }
}
export class ArithmeticException extends JsJodaException {
    constructor(message,cause = null) {
        super(arguments);
    }
}



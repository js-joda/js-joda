import ExtendableError from 'es6-error';

export class DateTimeException extends ExtendableError {
    constructor(message = 'DateTimeException') {
        super(message);
    }
}

export class DateTimeParseException extends ExtendableError {
    constructor(message = 'DateTimeParseException', text = '', index = 0) {
        super(message + ': ' + text + ', at index: ' + index);
    }
    
    initCause(exception) {
        // TODO: can we add the cause to the stacktrace??
        this._cause = exception;
    }
}

export class UnsupportedTemporalTypeException extends ExtendableError {
    constructor(message = 'UnsupportedTemporalTypeException') {
        super(message);
    }
}

export class ArithmeticException extends ExtendableError {
    constructor(message = 'ArithmeticException') {
        super(message);
    }
}
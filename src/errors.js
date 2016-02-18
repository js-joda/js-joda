/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import ExtendableError from 'es6-error';

export class DateTimeException extends ExtendableError {
    constructor(message = 'DateTimeException', cause = null) {
        let msg = message;
        if (cause !== null && cause instanceof Error) {
            msg += '\n-------\nCaused by: ' + cause.stack + '\n-------\n';
        }
        super(msg);
    }
}

export class DateTimeParseException extends ExtendableError {
    constructor(message = 'DateTimeParseException', text = '', index = 0, cause = null) {
        let msg = message + ': ' + text + ', at index: ' + index;
        if (cause !== null && cause instanceof Error) {
            msg += '\n-------\nCaused by: ' + cause.stack + '\n-------\n';
        }
        super(msg);
    }
}

export class UnsupportedTemporalTypeException extends DateTimeException {
    constructor(message = 'UnsupportedTemporalTypeException') {
        super(message);
    }
}

export class ArithmeticException extends ExtendableError {
    constructor(message = 'ArithmeticException') {
        super(message);
    }
}

export class IllegalArgumentException extends ExtendableError {
    constructor(message = 'IllegalArgumentException') {
        super(message);
    }
}

export class IllegalStateException extends ExtendableError {
    constructor(message = 'IllegalStateException') {
        super(message);
    }
}

export class NullPointerException extends ExtendableError {
    constructor(message = 'NullPointerException') {
        super(message);
    }
}
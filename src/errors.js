/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
function createErrorType(name, init, superErrorClass = Error) {
    function E(message) {
        if (!Error.captureStackTrace) {
            this.stack = (new Error()).stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
        this.message = message;
        // eslint-disable-next-line no-unused-expressions, prefer-rest-params
        init && init.apply(this, arguments);
    }
    // eslint-disable-next-line new-cap
    E.prototype = new superErrorClass();
    E.prototype.name = name;
    E.prototype.constructor = E;
    return E;
}

export const DateTimeException = createErrorType('DateTimeException', messageWithCause);
export const DateTimeParseException = createErrorType('DateTimeParseException', messageForDateTimeParseException);
export const UnsupportedTemporalTypeException = createErrorType('UnsupportedTemporalTypeException', null, DateTimeException);
export const ArithmeticException = createErrorType('ArithmeticException');
export const IllegalArgumentException = createErrorType('IllegalArgumentException');
export const IllegalStateException = createErrorType('IllegalStateException');
export const NullPointerException = createErrorType('NullPointerException');

function messageWithCause(message, cause = null) {
    let msg = message || this.name;
    if (cause !== null && cause instanceof Error) {
        msg += `\n-------\nCaused by: ${cause.stack}\n-------\n`;
    }
    this.message = msg;
}

function messageForDateTimeParseException(message, text = '', index = 0, cause = null) {
    let msg = message || this.name;
    msg += `: ${text}, at index: ${index}`;
    if (cause !== null && cause instanceof Error) {
        msg += `\n-------\nCaused by: ${cause.stack}\n-------\n`;
    }
    this.message = msg;
    this.parsedString = () => text;
    this.errorIndex = () => index;
}

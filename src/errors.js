import ExtendableError from 'es6-error'

export class DateTimeException extends ExtendableError {
    constructor(message = 'DateTimeException') {
        super(message)
    }
}
import {NullPointerException} from './errors';

export function assert(assertion, msg, error) {
    if(!assertion){
        if (error) {
            throw new error(msg);
        } else {
            throw new Error(msg);
        }
    }
}

export function requireNonNull(value, parameterName) {
    if (value == null) {
        throw new NullPointerException(parameterName + ' must not be null');
    }
    return value;
}

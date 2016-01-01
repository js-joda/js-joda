import {Instant} from './Instant'
import {ZoneOffset} from './ZoneOffset'

/**
 * Clock implementation differs from the jdk.
 *
 * javascript only provides the UTC millis of epoch and the ZoneOffset in minutes of the system default time.
 *
 * the system default ZoneId is only guessable by the ZoneOffset, like moment-timezone does by returning one ZoneId
 * with the same ZoneOffset.
 *
 * Therefore we are doing a shortcut here, by defining a SystemUTCClock and a SystemDefaultClock, the Clock itself
 * is returning the ZoneOffset and not the ZoneRules as in the jdk. We should change it, when introducing the iana
 * timezone database and implementing the timezone domains.
 *
 */

export class Clock {
    static systemUTC() {
        return new SystemUTCClock();
    }

    static systemDefaultZone() {
        return new SystemDefaultClock();
    }

    static fixed(fixedInstant, zoneOffset) {
        return new FixedClock(fixedInstant, zoneOffset);
    }

    millis(){
        throw new TypeError('millis() function is not implemented')
    }

    instant(){
        throw new TypeError('instant() function is not implemented')
    }

    /**
     * in opposite to the jdk implementation the Clock itself returns the offset, that is because
     * javascript provides only the UTC and the "local" (system default time zone.
     * it is not possible the get the system default ZoneId without guessing. If we would define ZoneRules, we had to
     * define something like a virtual, not standard ZoneId like "SystemDefault".
     * Until we to not have a tzdb, we leave this question open
     */
    offset(){
        throw new TypeError('offset() function is not implemented')
    }
}

class SystemClock extends Clock {
    millis() {
        return new Date().getTime();
    }

    instant() {
        return Instant.ofEpochMilli(this.millis());
    }

    offset() {
        return ZoneOffset.ofTotalSeconds(0);
    }
}

class SystemUTCClock extends SystemClock{
    toString(){
        return "SystemClock[UTC]";
    }
}

class SystemDefaultClock extends SystemClock{
    offset(instant) {
        var offsetInMinutes = new Date().getTimezoneOffset(instant.epochMilli());
        return ZoneOffset.ofTotalMinutes(offsetInMinutes);
    }

    toString(){
        return "SystemClock[default]";
    }
}

class FixedClock extends Clock{
    constructor(fixedInstant, zoneOffset) {
        super();
        this._instant = fixedInstant;
        this._zoneOffset = zoneOffset;
    }

    instant() {
        return this._instant;
    }

    offset() {
        return this._zoneOffset;
    }

    toString(){
        return "FixedClock[]";
    }
}


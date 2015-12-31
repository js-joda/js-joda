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

export class SystemUTCClock extends SystemClock{
    toString(){
        return "SystemClock[UTC]";
    }
}

export class SystemDefaultClock extends SystemClock{
    offset(instant) {
        var offsetInMinutes = new Date().getTimezoneOffset(instant.epochMilli());
        return ZoneOffset.ofTotalMinutes(offsetInMinutes);
    }

    toString(){
        return "SystemClock[default]";
    }
}

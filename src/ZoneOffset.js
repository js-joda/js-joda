import {DateTimeException} from './errors';
import {LocalTime} from './LocalTime';

const MAX_SECONDS = 18 * LocalTime.SECONDS_PER_HOUR;
var SECONDS_CACHE = {};

export class ZoneOffset {
    constructor(totalSeconds){
        ZoneOffset.validateTotalSeconds(totalSeconds);
        this._totalSeconds = totalSeconds;
    }

    totalSeconds() {
        return this._totalSeconds;
    }

    /**
     * Checks if this offset is equal to another offset.
     *
     * The comparison is based on the amount of the offset in seconds.
     * This is equivalent to a comparison by ID.
     *
     * @param obj  the object to check, null returns false
     * @return true if this is equal to the other offset
     */
    equals(obj) {
        if (this === obj) {
            return true;
        }
        if (obj instanceof ZoneOffset) {
            return this._totalSeconds === obj._totalSeconds;
        }
        return false;
    }

    static validateTotalSeconds(totalSeconds){
        if (Math.abs(totalSeconds) > MAX_SECONDS) {
            throw new DateTimeException('Zone offset not in valid range: -18:00 to +18:00');
        }
    }

    static validate(hours, minutes, seconds) {
        if (hours < -18 || hours > 18) {
            throw new DateTimeException('Zone offset hours not in valid range: value ' + hours +
                    ' is not in the range -18 to 18');
        }
        if (hours > 0) {
            if (minutes < 0 || seconds < 0) {
                throw new DateTimeException('Zone offset minutes and seconds must be positive because hours is positive');
            }
        } else if (hours < 0) {
            if (minutes > 0 || seconds > 0) {
                throw new DateTimeException('Zone offset minutes and seconds must be negative because hours is negative');
            }
        } else if ((minutes > 0 && seconds < 0) || (minutes < 0 && seconds > 0)) {
            throw new DateTimeException('Zone offset minutes and seconds must have the same sign');
        }
        if (Math.abs(minutes) > 59) {
            throw new DateTimeException('Zone offset minutes not in valid range: abs(value) ' +
                    Math.abs(minutes) + ' is not in the range 0 to 59');
        }
        if (Math.abs(seconds) > 59) {
            throw new DateTimeException('Zone offset seconds not in valid range: abs(value) ' +
                    Math.abs(seconds) + ' is not in the range 0 to 59');
        }
        if (Math.abs(hours) == 18 && (Math.abs(minutes) > 0 || Math.abs(seconds) > 0)) {
            throw new DateTimeException('Zone offset not in valid range: -18:00 to +18:00');
        }
    }

    static ofHours(hours) {
        return ZoneOffset.ofHoursMinutesSeconds(hours, 0, 0);
    }

    static ofHoursMinutes(hours, minutes) {
        return ZoneOffset.ofHoursMinutesSeconds(hours, minutes, 0);
    }

    static ofHoursMinutesSeconds(hours, minutes, seconds) {
        ZoneOffset.validate(hours, minutes, seconds);
        var totalSeconds = hours * LocalTime.SECONDS_PER_HOUR + minutes * LocalTime.SECONDS_PER_MINUTE + seconds;
        return ZoneOffset.ofTotalSeconds(totalSeconds);
    }

    static ofTotalMinutes(totalMinutes) {
        var totalSeconds = totalMinutes * LocalTime.SECONDS_PER_MINUTE;
        return ZoneOffset.ofTotalSeconds(totalSeconds);
    }

    static ofTotalSeconds(totalSeconds) {
        if (totalSeconds % (15 * LocalTime.SECONDS_PER_MINUTE) === 0) {
            var totalSecs = totalSeconds;
            var result = SECONDS_CACHE[totalSecs];
            if (result == null) {
                result = new ZoneOffset(totalSeconds);
                SECONDS_CACHE[totalSecs] = result;
            }
            return result;
        } else {
            return new ZoneOffset(totalSeconds);
        }
    }

}

ZoneOffset.UTC = ZoneOffset.ofTotalSeconds(0);
ZoneOffset.MIN = ZoneOffset.ofTotalSeconds(-MAX_SECONDS);
ZoneOffset.MAX = ZoneOffset.ofTotalSeconds(MAX_SECONDS);

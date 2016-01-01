import {DateTimeException} from './errors'
import {MathUtil} from './MathUtil'
import {LocalTime} from './LocalTime'

// TODO verify the arbitrary values for min/ max seconds, set to about 999_999 Years for now
const MIN_SECONDS = -30818963289600;
const MAX_SECONDS = 30697775193600;

export class Instant {

    constructor(seconds, nanoOfSecond){
        Instant.validate(seconds, nanoOfSecond);
        this._seconds = seconds;
        this._nanos = nanoOfSecond;
    }

    epochSecond(){
        return this._seconds
    }

    epochMilli(){
        return this._seconds * 1000 + this._nanos / 1000000;
    }

    nano(){
        return this._nanos
    }

    plusSeconds(secondsToAdd) {
        return this._plus(secondsToAdd, 0);
    }

    minusSeconds(secondsToSubtract) {
        return this.plusSeconds(secondsToSubtract * -1);
    }

    _plus(secondsToAdd, nanosToAdd) {
        if ((secondsToAdd | nanosToAdd) == 0) {
            return this;
        }
        var epochSec = this._seconds + secondsToAdd;
        epochSec = epochSec + MathUtil.div(nanosToAdd, LocalTime.NANOS_PER_SECOND);
        var nanosToAdd = nanosToAdd % LocalTime.NANOS_PER_SECOND;
        var nanoAdjustment = this._nanos + nanosToAdd;
        return Instant.ofEpochSecond(epochSec, nanoAdjustment);
    }

    equals(otherInstant) {
        if(this === otherInstant){
            return true;
        }
        if(otherInstant instanceof Instant){
            return this.epochSecond() === otherInstant.epochSecond() &&
                this.nano() === otherInstant.nano()
        }
        return false;
    }

    static ofEpochSecond(epochSeconds, nanoAdjustment=0){
        return Instant._create(epochSeconds, nanoAdjustment);
    }

    static ofEpochMilli(epochMilli) {
        var secs = MathUtil.floorDiv(epochMilli, 1000);
        var mos = MathUtil.floorMod(epochMilli, 1000);
        return Instant._create(secs, mos * 1000000);
    }

    static _create(seconds, nanoOfSecond){
        if(seconds === 0 && nanoOfSecond === 0){
            return Instant.EPOCH;
        }
        return new Instant(seconds, nanoOfSecond);
    }

    static validate(seconds, nanoOfSecond){
        if (seconds < MIN_SECONDS || seconds > MAX_SECONDS) {
            throw new DateTimeException("Instant exceeds minimum or maximum instant")
        }
    }
}

Instant.EPOCH = new Instant(0,0);
Instant.MIN = Instant.ofEpochSecond(MIN_SECONDS, 0);
Instant.MAX = Instant.ofEpochSecond(MAX_SECONDS, 999999999);

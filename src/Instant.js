import {DateTimeException} from './errors'
import {MathUtil} from './MathUtil'

// TODO verify the arbitrary values for min/ max seconds, set to about 999_999 Years for now
const MIN_SECONDS = -30818963289600;
const MAX_SECONDS = 30697775193600;

export class Instant {

    constructor(seconds, nanoOfSecond){
        Instant.validate(seconds, nanoOfSecond);
        this._seconds = seconds;
        this._nano = nanoOfSecond;
    }

    epochSecond(){
        return this._seconds
    }

    epochMilli(){
        return this._seconds * 1000 + this._nano / 1000000;
    }

    nano(){
        return this._nano
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

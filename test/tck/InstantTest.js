import {expect} from 'chai';
import {Instant} from '../../src/Instant';

describe('tck.java.time.TCKInstant', () => {
    function check(instant, epochSecs, nos) {
        expect(instant.epochSecond()).to.equal(epochSecs);
        expect(instant.nano()).to.equal(nos);
        expect(instant.equals(instant));
        expect(instant.equals(Instant.ofEpochSecond(epochSecs, nos)));
    }

    describe('constant', () => {
      it('EPOCH', () => {
          check(Instant.EPOCH, 0, 0);
      })
      it('MIN', () => {
          check(Instant.MIN, -30818963289600, 0);
      })
      it('MAX', () => {
          check(Instant.MAX, 30697775193600, 999999999);
      })
    })
});


import {expect} from 'chai';

import {Duration} from '../../src/Duration';

describe('tck.java.time.TCKDuration', () => {
    const CYCLE_SECS = 146097 * 86400;

    describe('constants', () => {
        it('test_zero', () => {
            expect(Duration.ZERO.getSeconds()).to.eql(0);
            expect(Duration.ZERO.getNano()).to.eql(0);
        });
    });

    describe.skip('ofSeconds(long)', () => {
        it('factory_seconds_long', () => {
            for (let i = -2; i <= 2; i++) {
                var t = Duration.ofSeconds(i);
                expect(t.getSeconds()).to.eql(i);
                expect(t.getNano()).to.eql(0);
            }
        });
    });
});
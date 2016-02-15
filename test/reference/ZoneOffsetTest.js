/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
import {expect} from 'chai';

import '../_init';

import {DateTimeException} from '../../src/errors';
import {ZoneOffset} from '../../src/ZoneOffset';

describe('org.threeten.bp.TestZoneOffset', () => {
    describe('constant', () => {
        it('test_constant_UTC', () => {
            var test = ZoneOffset.UTC;
            doTestOffset(test, 0, 0, 0);
        });

        it('test_constant_MIN', () => {
            var test = ZoneOffset.MIN;
            doTestOffset(test, -18, 0, 0);
        });

        it('test_constant_MAX', () => {
            var test = ZoneOffset.MAX;
            doTestOffset(test, 18, 0, 0);
        });
    });

    describe('ofHours', () => {
        it('test_factory_int_hours', () => {
            for (let i = -18; i <= 18; i++) {
                var test = ZoneOffset.ofHours(i);
                doTestOffset(test, i, 0, 0);
            }
        });

        it('test_factory_int_hours_tooBig', () => {
            expect(() => {
                ZoneOffset.ofHours(19);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_tooSmall', () => {
            expect(() => {
                ZoneOffset.ofHours(-19);
            }).to.throw(DateTimeException);
        });
    });

    describe('ofHoursMinutes', () => {
        it('test_factory_int_hours_minutes', () => {
            for (let i = -17; i <= 17; i++) {
                for (let j = -59; j <= 59; j++) {
                    if ((i < 0 && j <= 0) || (i > 0 && j >= 0) || i == 0) {
                        var test = ZoneOffset.ofHoursMinutes(i, j);
                        doTestOffset(test, i, j, 0);
                    }
                }
            }
            var test1 = ZoneOffset.ofHoursMinutes(-18, 0);
            doTestOffset(test1, -18, 0, 0);
            var test2 = ZoneOffset.ofHoursMinutes(18, 0);
            doTestOffset(test2, 18, 0, 0);
        });

        it('test_factory_int_hours_minutes_tooBig', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutes(19, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_tooBig', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutes(18, 1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_tooSmall', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutes(-19, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_tooSmall', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutes(-18, -1);
            }).to.throw(DateTimeException);
        });
    });

    describe('ofHoursMinutesSeconds', () => {
        var step = 10; // isCoverageTestRunner() ? 10 : 1;
        it('test_factory_int_hours_minutes_seconds', () => {
            for (let i = -17; i <= 17; i++) {
                for (let j = -59; j <= 59; j+= step) {
                    for (let k = -59; k <= 59; k+= step) {
                        if ((i < 0 && j <= 0 && k <= 0) || (i > 0 && j >= 0 && k >= 0) ||
                                (i == 0 && ((j < 0 && k <= 0) || (j > 0 && k >= 0) || j == 0))) {
                            var test = ZoneOffset.ofHoursMinutesSeconds(i, j, k);
                            doTestOffset(test, i, j, k);
                        }
                    }
                }
            }
            var test1 = ZoneOffset.ofHoursMinutesSeconds(-18, 0, 0);
            doTestOffset(test1, -18, 0, 0);
            var test2 = ZoneOffset.ofHoursMinutesSeconds(18, 0, 0);
            doTestOffset(test2, 18, 0, 0);
        });

        it('test_factory_int_hours_minutes_seconds_plusHoursMinusMinutes', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(1, -1, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_plusHoursMinusSeconds', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(1, 0, -1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_minusHoursPlusMinutes', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(-1, 1, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_minusHoursPlusSeconds', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(-1, 0, 1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_zeroHoursMinusMinutesPlusSeconds', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(0, -1, 1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_zeroHoursPlusMinutesMinusSeconds', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(0, 1, -1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_minutesTooLarge', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(0, 60, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_minutesTooSmall', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(0, -60, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_secondsTooLarge', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(0, 0, 60);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_hoursTooBig', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(19, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_hoursTooBig', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(18, 0, 1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_hoursTooSmall', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(-19, 0, 0);
            }).to.throw(DateTimeException);
        });

        it('test_factory_int_hours_minutes_seconds_hoursTooSmall', () => {
            expect(() => {
                ZoneOffset.ofHoursMinutesSeconds(-18, 0, 1);
            }).to.throw(DateTimeException);
        });
    });

    describe('ofTotalSeconds', () => {
        it('test_factory_ofTotalSeconds', () => {
            expect(ZoneOffset.ofTotalSeconds(60 * 60 + 1).equals(ZoneOffset.ofHoursMinutesSeconds(1, 0, 1))).to.be.true;
            expect(ZoneOffset.ofTotalSeconds(18 * 60 * 60).equals(ZoneOffset.ofHours(18))).to.be.true;
            expect(ZoneOffset.ofTotalSeconds(-18 * 60 * 60).equals(ZoneOffset.ofHours(-18))).to.be.true;
        });

        it('test_factory_ofTotalSeconds_tooLarge', () => {
            expect(() => {
                ZoneOffset.ofTotalSeconds(18 * 60 * 60 + 1);
            }).to.throw(DateTimeException);
        });

        it('test_factory_ofTotalSeconds_tooSmall', () => {
            expect(() => {
                ZoneOffset.ofTotalSeconds(-18 * 60 * 60 - 1);
            }).to.throw(DateTimeException);
        });
    });

    describe('equals', () => {
        it('test_equals', () => {
            var offset1 = ZoneOffset.ofHoursMinutesSeconds(1, 2, 3);
            var offset2 = ZoneOffset.ofHoursMinutesSeconds(2, 3, 4);
            var offset2b = ZoneOffset.ofHoursMinutesSeconds(2, 3, 4);

            expect(offset1.equals(offset2)).to.equal(false);
            expect(offset2.equals(offset1)).to.equal(false);

            expect(offset2.equals({})).to.equal(false);

            expect(offset1.equals(offset1)).to.equal(true);
            expect(offset2.equals(offset2)).to.equal(true);
            expect(offset2.equals(offset2b)).to.equal(true);

            // assertEquals(offset1.hashCode() == offset1.hashCode(), true);
            // assertEquals(offset2.hashCode() == offset2.hashCode(), true);
            // assertEquals(offset2.hashCode() == offset2b.hashCode(), true);
        });

    });
});

function doTestOffset(offset, hours, minutes, seconds) {
    expect(offset.totalSeconds()).to.equal(hours * 60 * 60 + minutes * 60 + seconds);

    /**
    var id;
    if (hours == 0 && minutes == 0 && seconds == 0) {
        id = "Z";
    } else {
        String str = (hours < 0 || minutes < 0 || seconds < 0) ? "-" : "+";
        str += Integer.toString(Math.abs(hours) + 100).substring(1);
        str += ":";
        str += Integer.toString(Math.abs(minutes) + 100).substring(1);
        if (seconds != 0) {
            str += ":";
            str += Integer.toString(Math.abs(seconds) + 100).substring(1);
        }
        id = str;
    }
    assertEquals(offset.getId(), id);
     */

    expect(offset.equals(ZoneOffset.ofHoursMinutesSeconds(hours, minutes, seconds)));
    if (seconds == 0) {
        expect(offset.equals(ZoneOffset.ofHoursMinutes(hours, minutes)));
        if (minutes == 0) {
            expect(offset.equals(ZoneOffset.ofHours(hours)));
        }
    }
    //assertEquals(ZoneOffset.of(id), offset);
    //assertEquals(offset.toString(), id);
}

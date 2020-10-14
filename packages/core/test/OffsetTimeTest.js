/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {expect} from 'chai';

import {ChronoField} from '../src/temporal/ChronoField';
import {ChronoUnit} from '../src/temporal/ChronoUnit';
import {DateTimeException,NullPointerException, UnsupportedTemporalTypeException} from '../src/errors';
import {IsoFields} from '../src/temporal/IsoFields';
import {LocalDate} from '../src/LocalDate';
import {LocalTime} from '../src/LocalTime';
import {OffsetDateTime} from '../src/OffsetDateTime';
import {OffsetTime} from '../src/OffsetTime';
import {TemporalField} from '../src/js-joda';
import {TemporalUnit} from '../src/temporal/TemporalUnit';
import {ZoneOffset} from '../src/ZoneOffset';

import {createTemporalQuery} from '../src/temporal/TemporalQuery';
import './_init';

/* these are not covered by the threetenbp ported tests */
describe('js-joda OffsetTime', () => {
    describe('from', () => {
        it('should optimize if OffsetDateTime given', () => {
            const odt = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(11, 30), ZoneOffset.ofHours(1));
            const ot = OffsetTime.from(odt);
            expect(ot).to.eql(OffsetTime.parse('11:30+01:00'));
        });

        it('should throw if illegal type given given', () => {
            expect(() => {
                OffsetTime.from('11:30+01:00');
            }).to.throw(DateTimeException);
        });
    });

    describe('atDate', () => {
        it('should create OffsetDateTime', () => {
            const ot = OffsetTime.parse('11:30+01:00');
            const odt = ot.atDate(LocalDate.parse('2020-07-13'));
            expect(odt).to.eql(OffsetDateTime.parse('2020-07-13T11:30+01:00'));
        });
    });

    describe('getLong', () => {
        it('should work if IsoField (non-ChronoField) given', () => {
            expect(() => {
                const ot = OffsetTime.parse('11:30+01:00');
                ot.getLong(IsoFields.DAY_OF_QUARTER);
            }).to.throw(UnsupportedTemporalTypeException);
        });
    });

    describe('isSupported', () => {
        it('should support time-based field', () => {
            const ot = OffsetTime.parse('11:30+01:00');
            expect(ot.isSupported(ChronoField.HOUR_OF_AMPM)).to.equal(true);
            expect(ot.isSupported(ChronoField.DAY_OF_MONTH)).to.equal(false);
            expect(ot.isSupported(IsoFields.HOUR_OF_AMPM)).to.equal(false);
        });

        it('should support time-based unit', () => {
            const ot = OffsetTime.parse('11:30+01:00');
            expect(ot.isSupported(ChronoUnit.HOURS)).to.equal(true);
            expect(ot.isSupported(ChronoUnit.DAYS)).to.equal(false);
        });

        it('should return false if null', () => {
            const ot = OffsetTime.parse('11:30+01:00');
            expect(ot.isSupported(null)).to.equal(false);
        });
    });

    describe('plusAmountUnit', () => {
        it('should support custom unit', () => {
            class CustomUnit extends TemporalUnit{
                isSupportedBy(){
                    return true;
                }
                addTo(dateTime, periodToAdd) {
                    return dateTime.plusSeconds(periodToAdd);
                }
            }
            const ot = OffsetTime.parse('11:30+01:00');
            expect(ot.plus(1, new CustomUnit())).to.eql(ot.plusSeconds(1));
        });
    });

    describe('query', () => {
        it('should support custom query', () => {
            const ot = OffsetTime.parse('11:30+01:00');
            const customQuery = createTemporalQuery('custom', (temporal) => {
                return LocalTime.from(temporal);
            });
            expect(ot.query(customQuery)).to.be.an.instanceOf(LocalTime);
        });
    });

    describe('range', () => {
        it('should work if non-ChronoField field', () => {
            expect(() => {
                const ot = OffsetTime.parse('11:30+01:00');
                expect(ot.range(IsoFields.DAY_OF_QUARTER)).to.be.an.instanceOf(LocalTime);
            }).to.throw(UnsupportedTemporalTypeException);
        });
    });

    describe('until', () => {
        const ot = OffsetTime.parse('11:30+01:00');
        const odt = OffsetDateTime.of(LocalDate.of(2008, 6, 30), LocalTime.of(20, 12, 34, 56), ZoneOffset.ofHours(3));

        it('should throw if null endExclusive', () => {
            expect(() => {
                ot.until(null, ChronoUnit.NANOS);
            }).to.throw(NullPointerException);
        });

        it('should throw if null unit', () => {
            expect(() => {
                ot.until(ot, null);
            }).to.throw(NullPointerException);
        });

        it('should support if time-based ChronoUnit', () => {
            expect(ot.until(odt, ChronoUnit.NANOS)).to.equal(24154000000056);
            expect(ot.until(odt, ChronoUnit.MICROS)).to.equal(24154000000);
            expect(ot.until(odt, ChronoUnit.MILLIS)).to.equal(24154000);
            expect(ot.until(odt, ChronoUnit.SECONDS)).to.equal(24154);
            expect(ot.until(odt, ChronoUnit.MINUTES)).to.equal(402);
            expect(ot.until(odt, ChronoUnit.MINUTES)).to.equal(402);
            expect(ot.until(odt, ChronoUnit.HOURS)).to.equal(6);
            expect(ot.until(odt, ChronoUnit.HALF_DAYS)).to.equal(0);
        });

        it('should thow if not-time-based ChronoUnit', () => {
            expect(() => {
                ot.until(odt, ChronoUnit.YEARS);
            }).to.throw(UnsupportedTemporalTypeException);
        });

        it('should support custom unit', () => {
            class CustomUnit extends TemporalUnit{
                isSupportedBy(){
                    return true;
                }
                between() {
                    return 42;
                }
            }
            expect(ot.until(odt, new CustomUnit())).to.equal(42);
        });
    });

    describe('with', () => {
        describe('with(field, value)', () => {
            it('should support non-ChronoField', () => {
                class CustomField extends TemporalField {
                    adjustInto(temporal, newValue) {
                        return temporal.withSecond(newValue);
                    }
                }
                const ot = OffsetTime.parse('11:30+01:00');
                expect(ot.with(new CustomField(), 12)).to.eql(OffsetTime.parse('11:30:12+01:00'));
            });
        });
    });
});
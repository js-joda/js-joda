/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import { expect } from 'chai';

import './_init';

import { IllegalArgumentException } from '../src/errors';

import { LocalDate } from '../src/LocalDate';
import { LocalDateTime } from '../src/LocalDateTime';
import { ZoneId } from '../src/ZoneId';
import { Instant } from '../src/Instant';

import { convert } from '../src/convert';
import { LocalTime } from '../src/js-joda';

describe('convert', () => {

    it('should convert an Instant to a javascript Date', () => {
        const instant = Instant.parse('2021-10-07T07:05:17.335Z');
        const javascriptDate = convert(instant).toDate();
        expect(javascriptDate).to.instanceof(Date);
        expect(javascriptDate.getTime()).to.equal(new Date('2021-10-07T07:05:17.335Z').getTime());
    });

    it('should convert a LocalDate to a javascript Date', () => {
        const localDate = LocalDate.parse('2016-05-26');
        const javascriptDate = convert(localDate).toDate();
        expect(javascriptDate).to.instanceof(Date);
        expect(javascriptDate.getTime()).to.be.greaterThan(new Date('2016-05-25T00:00:00Z').getTime());
        expect(javascriptDate.getTime()).to.be.lessThan(new Date('2016-05-27T00:00:00Z').getTime());
    });

    it('should convert a LocalDate at Zone.UTC to a javascript Date', () => {
        const localDate = LocalDate.parse('2016-05-26');
        const javascriptDate = convert(localDate, ZoneId.UTC).toDate();
        expect(javascriptDate).to.instanceof(Date);
        expect(javascriptDate.getTime()).to.equal(new Date('2016-05-26T00:00:00Z').getTime());
        expect(javascriptDate.getTime()).to.equal(convert(localDate, ZoneId.UTC).toEpochMilli());
    });

    it('should convert a LocalDateTime to a javascript Date', () => {
        const localDateTime = LocalDateTime.parse('2016-05-26T01:42');
        const javascriptDate = convert(localDateTime).toDate();
        expect(javascriptDate).to.instanceof(Date);
        expect(javascriptDate.getTime()).to.be.greaterThan(new Date('2016-05-25T01:42:00Z').getTime());
        expect(javascriptDate.getTime()).to.be.lessThan(new Date('2016-05-27T01:42:00Z').getTime());
    });

    it('should convert a LocalDateTime at Zone.UTC to a javascript Date', () => {
        const localDateTime = LocalDateTime.parse('2016-05-26T01:42');
        const javascriptDate = convert(localDateTime, ZoneId.UTC).toDate();
        expect(javascriptDate).to.instanceof(Date);
        expect(javascriptDate.getTime()).to.equal(new Date('2016-05-26T01:42:00Z').getTime());
        expect(javascriptDate.getTime()).to.equal(convert(localDateTime, ZoneId.UTC).toEpochMilli());
    });

    it('should convert a OffsetDateTime to a javascript Date', () => {
        const offsetDateTime = LocalDateTime.parse('2016-05-26T01:42').atOffset(ZoneId.UTC);
        const javascriptDate = convert(offsetDateTime).toDate();
        expect(javascriptDate).to.instanceof(Date);
        expect(javascriptDate.getTime()).to.equal(new Date('2016-05-26T01:42:00Z').getTime());
        expect(javascriptDate.getTime()).to.equal(convert(offsetDateTime).toEpochMilli());
    });

    it('should convert a ZonedDateTime to a javascript Date', () => {
        const zonedDateTime = LocalDateTime.parse('2016-05-26T01:42').atZone(ZoneId.UTC);
        const javascriptDate = convert(zonedDateTime).toDate();
        expect(javascriptDate).to.instanceof(Date);
        expect(javascriptDate.getTime()).to.equal(new Date('2016-05-26T01:42:00Z').getTime());
        expect(javascriptDate.getTime()).to.equal(convert(zonedDateTime).toEpochMilli());
    });

    it('should fail if temporal is not convertible to Instant', () => {
        expect(() => convert(LocalTime.MIDNIGHT).toDate()).to.throw(IllegalArgumentException);
    });

    it('should fail if temporal is not an instance of Temporal', () => {
        expect(() => convert(new Date()).toDate()).to.throw(IllegalArgumentException);
    });

});

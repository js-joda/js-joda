import {expect} from 'chai';
import {Month} from '../src/Month';

describe('Month', () => {

    describe('JANUARY', () =>{
        it('should have the correct value', () => {
            expect(Month.JANUARY.value()).to.eql(1);
        });

        it('should show the correct toString() value', () => {
            expect(Month.JANUARY.toString()).to.eql('01');
        });
    });

    describe('FEBRUARY', () =>{
        it('should have the correct value', () => {
            expect(Month.FEBRUARY.value()).to.eql(2);
        });

        it('should show the correct toString() value', () => {
            expect(Month.FEBRUARY.toString()).to.eql('02');
        });
    });

    describe('MARCH', () =>{
        it('should have the correct value', () => {
            expect(Month.MARCH.value()).to.eql(3);
        });

        it('should show the correct toString() value', () => {
            expect(Month.MARCH.toString()).to.eql('03');
        });
    });

    describe('APRIL', () =>{
        it('should have the correct value', () => {
            expect(Month.APRIL.value()).to.eql(4);
        });

        it('should show the correct toString() value', () => {
            expect(Month.APRIL.toString()).to.eql('04');
        });
    });

    describe('MAY', () =>{
        it('should have the correct value', () => {
            expect(Month.MAY.value()).to.eql(5);
        });

        it('should show the correct toString() value', () => {
            expect(Month.MAY.toString()).to.eql('05');
        });
    });

    describe('JUNE', () =>{
        it('should have the correct value', () => {
            expect(Month.JUNE.value()).to.eql(6);
        });

        it('should show the correct toString() value', () => {
            expect(Month.JUNE.toString()).to.eql('06');
        });
    });

    describe('JULY', () =>{
        it('should have the correct value', () => {
            expect(Month.JULY.value()).to.eql(7);
        });

        it('should show the correct toString() value', () => {
            expect(Month.JULY.toString()).to.eql('07');
        });
    });

    describe('AUGUST', () =>{
        it('should have the correct value', () => {
            expect(Month.AUGUST.value()).to.eql(8);
        });

        it('should show the correct toString() value', () => {
            expect(Month.AUGUST.toString()).to.eql('08');
        });
    });

    describe('SEPTEMBER', () =>{
        it('should have the correct value', () => {
            expect(Month.SEPTEMBER.value()).to.eql(9);
        });

        it('should show the correct toString() value', () => {
            expect(Month.SEPTEMBER.toString()).to.eql('09');
        });
    });

    describe('OCTOBER', () =>{
        it('should have the correct value', () => {
            expect(Month.OCTOBER.value()).to.eql(10);
        });

        it('should show the correct toString() value', () => {
            expect(Month.OCTOBER.toString()).to.eql('10');
        });
    });

    describe('NOVEMBER', () =>{
        it('should have the correct value', () => {
            expect(Month.NOVEMBER.value()).to.eql(11);
        });

        it('should show the correct toString() value', () => {
            expect(Month.NOVEMBER.toString()).to.eql('11');
        });
    });

    describe('DECEMBER', () =>{
        it('should have the correct value', () => {
            expect(Month.DECEMBER.value()).to.eql(12);
        });

        it('should show the correct toString() value', () => {
            expect(Month.DECEMBER.toString()).to.eql('12');
        });
    });

});

import {expect} from 'chai';
import {Month} from '../src/Month';

describe('Month', () => {

    describe('JANUARY', () =>{
        it('should have the correct value', () => {
            expect(Month.JANUARY.value()).to.eql(1);
        });
    });

    describe('FEBRUARY', () =>{
        it('should have the correct value', () => {
            expect(Month.FEBRUARY.value()).to.eql(2);
        });
    });

    describe('MARCH', () =>{
        it('should have the correct value', () => {
            expect(Month.MARCH.value()).to.eql(3);
        });
    });

    describe('APRIL', () =>{
        it('should have the correct value', () => {
            expect(Month.APRIL.value()).to.eql(4);
        });
    });

    describe('MAY', () =>{
        it('should have the correct value', () => {
            expect(Month.MAY.value()).to.eql(5);
        });
    });

    describe('JUNE', () =>{
        it('should have the correct value', () => {
            expect(Month.JUNE.value()).to.eql(6);
        });
    });

    describe('JULY', () =>{
        it('should have the correct value', () => {
            expect(Month.JULY.value()).to.eql(7);
        });
    });

    describe('AUGUST', () =>{
        it('should have the correct value', () => {
            expect(Month.AUGUST.value()).to.eql(8);
        });
    });

    describe('SEPTEMBER', () =>{
        it('should have the correct value', () => {
            expect(Month.SEPTEMBER.value()).to.eql(9);
        });
    });

    describe('OCTOBER', () =>{
        it('should have the correct value', () => {
            expect(Month.OCTOBER.value()).to.eql(10);
        });
    });

    describe('NOVEMBER', () =>{
        it('should have the correct value', () => {
            expect(Month.NOVEMBER.value()).to.eql(11);
        });
    });

    describe('DECEMBER', () =>{
        it('should have the correct value', () => {
            expect(Month.DECEMBER.value()).to.eql(12);
        });
    });
});

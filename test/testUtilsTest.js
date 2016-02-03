import {expect, AssertionError} from 'chai';

import {assertEquals} from './testUtils';

describe('testUtils', () =>{
    class A {
        constructor(val) {
            this.val = val;
        }
        equals(other){
            if (this === other) {
                return true;
            }
            if (other instanceof A) {
                return this.val === other.val;
            }
            return false;
        }
    }
    it('assertEquals', () =>{
        let a = new A('a');
        let testData = [
            [null, 1, false],
            [1, null, false],
            [undefined, 1, false],
            [1, undefined, false],
            [null, undefined, true],
            [undefined, null, true],
            [1, 1, true],
            [1, 2, false],
            [[1,2], [1,2], true],
            [[1,2], [2,1], false],
            [new A(1), new A(1), true],
            [new A(1), new A(2), false],
            [new A(1), null, false],
            [null, new A(1), false],
            [{}, new A(1), false],
            [a, a, true]
        ];
        for(let i=0; i < testData.length; i++){
            testAssertEquals.apply(this, testData[i]);
        }
    });

    function testAssertEquals(expected, actual, isEqual){
        if(isEqual){
            assertEquals(expected, actual);
        } else {
            expect(() => {
                assertEquals(expected, actual);
            }).to.throw(AssertionError);
        }
    }
});
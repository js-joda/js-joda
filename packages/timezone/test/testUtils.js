/**
 * @copyright (c) 2016-present, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {expect, assert} from 'chai';

export function dataProviderTest(dataProvider, test, log){
    const data = typeof dataProvider === 'function' ? dataProvider() : dataProvider;
    data.forEach((data)=>{
        // eslint-disable-next-line no-console
        if(log) console.log(data);
        test.apply(this, [].concat(data));
    });
}

export function assertEquals(expected, actual, message){
    if(expected != null || actual != null) {
        if(expected != null) {
            if(typeof expected.equals === 'function'){
                expect(expected.equals(actual), message != null ? message : `${expected} not equals ${actual}`).to.be.true;
            } else {
                expect(expected, message).to.eql(actual);
            }
        } else {
            expect(actual).to.be.null;
        }
    }
}

export function assertSame(expected, actual, message){
    expect(expected === actual, message != null ? message : `${expected} !== ${actual}`).to.be.true;
}

export function assertNotNull(object, message=''){
    expect(object==null, message).to.be.false;
}

export function assertTrue(condition, message='') {
    if(!condition) {
        fail(`assertTrue: ${condition} not true, ${message}`);
    }
}

export function assertFalse(condition, message='') {
    if(condition) {
        fail(`assertFalse: ${condition} not true, ${message}`);
    }
}

export function fail(message=''){
    assert(false, message);
}

export function isCoverageTestRunner(){
    return (process.env.COVERAGE != null) && process.env.COVERAGE !== 0 && process.env.COVERAGE !== '';
}

export function isBrowserTestRunner(){
    return typeof window !== 'undefined' && window.document != null;
}



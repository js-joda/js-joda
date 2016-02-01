/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */
export function isCoverageTestRunner(){
    return (process.env.COVERAGE != null) && process.env.COVERAGE !== 0 && process.env.COVERAGE !== '';
}



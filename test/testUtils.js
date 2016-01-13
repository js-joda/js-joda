export function isCoverageTestRunner(){
    return (process.env.COVERAGE != null) && process.env.COVERAGE !== 0 && process.env.COVERAGE !== '';
}

export const MAX_VALUE = Math.pow(2, 53) - 1; // Number.MAX_SAFE_INTEGER not defined in #@#$%! PhantomJS
export const MIN_VALUE = -(Math.pow(2, 53) - 1); // Number.MIN_SAFE_INTEGER not defined in #@#$%! PhantomJS



export function isCoverageTestRunner(){
    return (process.env.COVERAGE != null) && process.env.COVERAGE !== 0 && process.env.COVERAGE !== '';
}



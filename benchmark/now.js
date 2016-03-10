if(typeof require === 'function') { require('./node-init'); }

runTest(
    new Benchmark.Suite('now()')
        .add('js-joda', function() {
            JSJoda.LocalDateTime.now();
        })
        .add('moment', function() {
            moment();
        })
);
if(typeof require === 'function') { require('./node-init'); }

addSuite(
    new Benchmark.Suite('now()')
        .add('js-joda', function() {
            JSJoda.LocalDateTime.now();
        })
        .add('moment', function() {
            moment();
        })
);
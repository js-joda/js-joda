if(typeof require === 'function') { require('../node-init'); }

addSuite(
    new Benchmark.Suite('now()')
        .add('js-joda Instant', function() {
            JSJoda.Instant.now();
        })
        .add('js-joda LocalDateTime ', function() {
            JSJoda.LocalDateTime.now();
        })
        .add('moment', function() {
            moment();
        })
);
if(typeof require === 'function') { require('./node-init'); }

var dateStr = '2015-12-24T16:30:00Z';

runTest(
    new Benchmark.Suite('parse ' + dateStr)
        .add('native Date', function() {
             var d = new Date(dateStr);
        })
        .add('js-joda', function() {
            var i = JSJoda.Instant.parse(dateStr);
        })
        .add('moment', function() {
            var m = moment(dateStr);
        })
);
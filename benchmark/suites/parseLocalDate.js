if(typeof require === 'function') { require('../node-init'); }

(function() {
    var dateStr = '2015-12-24';

    addSuite(
        new Benchmark.Suite('parse ' + dateStr)
            .add('native Date', function () {
                var d = new Date(dateStr);
            })
            .add('js-joda', function () {
                var i = JSJoda.LocalDate.parse(dateStr);
            })
            .add('moment', function () {
                var m = moment(dateStr);
            })
    );
})();
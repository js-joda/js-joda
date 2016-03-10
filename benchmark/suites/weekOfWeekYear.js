if(typeof require === 'function') { require('../node-init'); }

(function() {
    var dateStr = '2015-12-24T12:00';
    var dt = JSJoda.LocalDateTime.parse(dateStr);
    var m = moment(dateStr);

    addSuite(
        new Benchmark.Suite('week of week year')
            .add('js-joda', function () {
                dt.toLocalDate().isoWeekOfWeekyear();
            })
            .add('moment', function () {
                m.isoWeek();
            })
    );
})();
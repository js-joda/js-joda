if(typeof require === 'function') { require('../node-init'); }
/* eslint-disable no-undef */
(function() {
    var dateStr = '2015-12-24T12:00';
    var dt = JSJoda.LocalDateTime.parse(dateStr);
    var m = moment(dateStr);

    addSuite(
        new Benchmark.Suite('plus 1 day')
            .add('js-joda', function () {
                dt.plusDays(1);
            })
            .add('moment', function () {
                m.add(1, 'days');
            })
    );
})();
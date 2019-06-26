if(typeof require === 'function') { require('../node-init'); }
/* eslint-disable no-undef */
(function() {
    const dateStr = '2015-12-24T12:00';
    const dt = JSJoda.LocalDateTime.parse(dateStr);
    const m = moment(dateStr);

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
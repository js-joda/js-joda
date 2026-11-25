if(typeof require === 'function') { require('../node-init'); }
/* eslint-disable no-undef */
(function() {
    const dateStr = '2015-12-24T12:00';
    const dt = JSJoda.LocalDateTime.parse(dateStr);

    addSuite(
        new Benchmark.Suite('plusMinusDaysAndHours')
            .add('js-joda', function () {
                dt.plusDays(1).minusDays(2).plusHours(24);
            })
    );
})();
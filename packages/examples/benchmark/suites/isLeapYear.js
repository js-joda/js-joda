if(typeof require === 'function') { require('../node-init'); }
/* eslint-disable no-undef */
(function() {
    const d1 = '2015-12-24';
    const d2 = '2016-12-24';
    const dt1 = JSJoda.LocalDate.parse(d1);
    const dt2 = JSJoda.LocalDate.parse(d2);

    addSuite(
        new Benchmark.Suite('is leap year')
            .add('js-joda', function () {
                dt1.isLeapYear();
                dt2.isLeapYear();
            })
    );
})();
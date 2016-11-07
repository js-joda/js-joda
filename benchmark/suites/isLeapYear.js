if(typeof require === 'function') { require('../node-init'); }
/* eslint-disable no-undef */
(function() {
    var d1 = '2015-12-24';
    var d2 = '2016-12-24';
    var dt1 = JSJoda.LocalDate.parse(d1);
    var dt2 = JSJoda.LocalDate.parse(d2);
    var m1 = moment(d1);
    var m2 = moment(d2);

    addSuite(
        new Benchmark.Suite('is leap year')
            .add('js-joda', function () {
                dt1.isLeapYear();
                dt2.isLeapYear();
            })
            .add('moment', function () {
                m1.isLeapYear();
                m2.isLeapYear();
            })
    );
})();
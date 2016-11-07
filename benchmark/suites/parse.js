if(typeof require === 'function') { require('../node-init'); }
/* eslint-disable no-undef, no-unused-vars */
(function() {
    var instantDateStr = '2015-12-24T16:30:00Z';
    var dateStr = '2015-12-24';
    var dateTimeStr = '2015-12-24T16:30:00';
    var timeStr = '16:30:00';
    var zonedDateTimeStr = '2015-12-24T16:30:00+01:00[UTC+01:00]';

    addSuite(
        new Benchmark.Suite('parse')
            .add('native Date ' + instantDateStr, function () {
                var d = new Date(instantDateStr);
            })
            .add('moment ' + instantDateStr, function () {
                var m = moment(instantDateStr);
            })
            .add('js-joda ' + instantDateStr, function () {
                var i = JSJoda.Instant.parse(instantDateStr);
            })
            .add('native Date ' + dateStr, function () {
                var d = new Date(dateStr);
            })
            .add('moment ' + dateStr, function () {
                var m = moment(dateStr);
            })
            .add('js-joda ' + dateStr, function () {
                var i = JSJoda.LocalDate.parse(dateStr);
            })
            .add('moment ' + zonedDateTimeStr, function () {
                var m = moment(zonedDateTimeStr);
            })
            .add('js-joda ' + zonedDateTimeStr, function () {
                var i = JSJoda.ZonedDateTime.parse(zonedDateTimeStr);
            })
            .add('js-joda ' + timeStr, function () {
                var i = JSJoda.LocalTime.parse(timeStr);
            })
            .add('js-joda ' + dateTimeStr, function () {
                var i = JSJoda.LocalDateTime.parse(dateTimeStr);
            })
    );
})();
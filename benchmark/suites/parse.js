if(typeof require === 'function') { require('../node-init'); }
/* eslint-disable no-undef, no-unused-vars */
(function() {
    const instantDateStr = '2015-12-24T16:30:00Z';
    const dateStr = '2015-12-24';
    const dateTimeStr = '2015-12-24T16:30:00';
    const timeStr = '16:30:00';
    const zonedDateTimeStr = '2015-12-24T16:30:00+01:00[UTC+01:00]';

    addSuite(
        new Benchmark.Suite('parse')
            .add('native Date ' + instantDateStr, function () {
                const d = new Date(instantDateStr);
            })
            .add('moment ' + instantDateStr, function () {
                const m = moment(instantDateStr);
            })
            .add('js-joda ' + instantDateStr, function () {
                const i = JSJoda.Instant.parse(instantDateStr);
            })
            .add('native Date ' + dateStr, function () {
                const d = new Date(dateStr);
            })
            .add('moment ' + dateStr, function () {
                const m = moment(dateStr);
            })
            .add('js-joda ' + dateStr, function () {
                const i = JSJoda.LocalDate.parse(dateStr);
            })
            .add('moment ' + zonedDateTimeStr, function () {
                const m = moment(zonedDateTimeStr);
            })
            .add('js-joda ' + zonedDateTimeStr, function () {
                const i = JSJoda.ZonedDateTime.parse(zonedDateTimeStr);
            })
            .add('js-joda ' + timeStr, function () {
                const i = JSJoda.LocalTime.parse(timeStr);
            })
            .add('js-joda ' + dateTimeStr, function () {
                const i = JSJoda.LocalDateTime.parse(dateTimeStr);
            })
    );
})();
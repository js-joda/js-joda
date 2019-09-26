if(typeof require === 'function') { require('../node-init'); }
/* eslint-disable no-undef */
addSuite(
    new Benchmark.Suite('now()')
        .add('js-joda Instant', function() {
            JSJoda.Instant.now();
        })
        // check the code at LocalDateTime.now. there is a strategy for optimizing .now()
        .add('js-joda LocalDateTime ', function() {
            JSJoda.LocalDateTime.now();
        })
        .add('js-joda LocalTime ', function() {
            JSJoda.LocalTime.now();
        })
        .add('js-joda LocalDate ', function() {
            JSJoda.LocalDate.now();
        })
        .add('js-joda ZonedDateTime ', function() {
            JSJoda.ZonedDateTime.now();
        })
        .add('moment', function() {
            moment();
        })
);
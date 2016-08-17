/// <reference path="../../dist/js-joda.d.ts" />

function test_LocalDate() {
    let now = JSJoda.LocalDate.now();
    let nowUTC = JSJoda.LocalDate.now(JSJoda.ZoneOffset.UTC);
}
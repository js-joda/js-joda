/* eslint-disable */

for(var prop in JSJoda) { window[prop] = JSJoda[prop]; }
for(var prop in JSJodaLocale) { window[prop] = JSJodaLocale[prop]; }

console.log("Welcome to js-joda at '"+ LocalDateTime.now().toString() + "' local time.");
console.log("An example with @js-joda/timezone: Its '"+ LocalDateTime.now().atZone(ZoneId.systemDefault()).toString() + "' system default timezone.");
console.log("An example with @js-joda/extra: Interval of 1 minute '"+ JSJodaExtra.Interval.of(Instant.now(), Duration.ofMinutes(1)).toString() + ".");
console.log("An example with @js-joda/local: ZonedDateTime with locale format en-us '"+ JSJoda.ZonedDateTime.of(2017, 1, 1, 0, 0, 0, 0, JSJoda.ZoneId.of('Europe/Berlin')).format(JSJoda.DateTimeFormatter.ofPattern('eeee MMMM dd yyyy GGGG, hh:mm:ss a zzzz, zz, OOOO \'Week: \' ww, \'Quarter: \' QQQ').withLocale(Locale.US)) + ".");

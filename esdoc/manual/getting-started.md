# Getting started

### Node

Install joda using npm

```bash
npm install @js-joda/core
```

Then require it to any module

```javascript
var LocalDate = require("@js-joda/core").LocalDate;

var d = LocalDate.parse("2012-12-24")
  .atStartOfDay()
  .plusMonths(2); // 2013-02-24T00:00:00
```

### Browser

To use js-joda from a browser, download either dist/js-joda.min.js or dist/js-joda.js (with sourcemaps for development)

Then add it as a script tag to your page

```html
<script src="js-joda.min.js"></script>
<script>
    var LocalDate = JSJoda.LocalDate;
    var d = LocalDate.parse('2012-12-24').atStartOfDay().plusMonths(2); // 2013-02-24T00:00:00
</script>
```

### Fiddle around

Fiddle around with js-joda, here on this page in the browser developer console, 
the latest js-joda code of all packages is always injected into this documentation.

Or find a simple example setup at JSFiddle [https://jsfiddle.net/shto0ze6/](https://jsfiddle.net/shto0ze6/),
but don't forget to update the cdnjs resources to the desired versions. 

# Getting started

### Node

Install joda using npm

```bash
npm install js-joda
```

Then require it to any module

```javascript
var LocalDate = require("js-joda").LocalDate;

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

### JSFiddle

Fiddle around with jsjoda, find a simple example setup at [https://jsfiddle.net/bo7yuk34/4/](https://jsfiddle.net/bo7yuk34/4/)
Changelog
=========

### next

### 2.3.0

 * updated to iana tzdb 2020a 

### 2.2.1

 * Update js-joda peer dependency

### 2.2.0

 * updated to iana tzdb 2019c #362
 * npm audit fix

### 2.1.1

 * Update js-joda peer dependency

### 2.1.0

 * produce smaller builds containing a more limited set of timezone data #73
 * updated to iana tzdb 2019a #73

### 2.0.2

 * updated to iana tzdb 2018g

### 2.0.1 

 * iana tzdb 2018e 

### 2.0.0

#### public API

(re) introduced new plugin concept
 * Hide `use(plug)` concept from public api.
   The function for extending js-joda is not exported anymore (the default export of this module is removed).
   The code for extending js-joda `use(plug)` is not required anymore, because js-joda-timezone automaticaly extends
   js-joda when imported.

#### dependendency updates

### 1.3.1

revert previous (breaking) public API change (see https://github.com/js-joda/js-joda-timezone/issues/48)

### 1.3.0

#### public api

 * Hide `use(plug)` concept from public api.
   The function for extending js-joda is not exported anymore (the default export of this module is removed).
   The code for extending js-joda `use(plug)` is not required anymore, because js-joda-timezone automaticaly extends
   js-joda when imported.

### 1.2.1

#### bug

 * fix umd build

#### dependendency updates

### 1.2.0

#### public api
 
 * remove private export of tzdb data, instead 
 * add loadTzdbData() and getTzdbData() static methods to the class ZoneRulesProvider,
   that allows to provide/share tzdb data.
 * provide empty dist versions of js-joda-timezone without preconfigured tzdb data.
 
#### iana tzdb

 * manually updated iana tzdb to 2018c 
 
#### dependendency updates

### 1.1.6

#### dependendency updates

#### etc

 * private export of tzdb data

### 1.1.5

#### etc
 
 * add bower.json

#### dependendency updates

### 1.1.3

#### dependendency updates

* incliuding moment-timezone@0.5.13 iana tzdb 2017b

### 1.1.2

#### add typescript definition

#### dependency updates
  
### 1.1.1

last release without a CHANGELOG.md 

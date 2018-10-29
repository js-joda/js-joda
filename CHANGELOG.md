Changelog
=========

### next (2.0.0)

#### public API

introduced new plugin concept
 * Hide `use(plug)` concept from public api.
   The function for extending js-joda is not exported anymore.
   The code for extending js-joda `use(plug)` is not required anymore, because js-joda-locale automaticaly extends
   js-joda when imported.
   However, using `Locale` now requires extracting it from the `@js-joda/locale` module instead of `js-joda`

* get rid of postinstall build

* add possibility to publish locale specific packages (e.g. @js-joda/locale_de, @js-joda/locale_en-US, ...)

* add prebuilt packages to main js-joda-locale package (e.g. @js-joda/locale/dist/prebuilt/de/js-joda-locale, ...)

### 1.0.0

just bump the version

### 0.8.2

get rid of dependencies for postinstall package build, use `postinstall_build` to install the needed
dependencies only for the actual build

### 0.8.1

update package builder, use a webpack plugin to ignore unnecessary cldr-data files instead of `null-loader`

### 0.8.0

- update dependencies
- fix repository location in `package.json`
- increase testcoverage
- small bugfixes
- add build_package script and postinstall run to be able to build locale specific packages that 
  can be used directly

### 0.1.0

initial release 

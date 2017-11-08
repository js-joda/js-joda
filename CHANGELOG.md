Changelog
=========

### next

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

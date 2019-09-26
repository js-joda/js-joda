Release how-to
==============

1) sync your master branch with the remote branch, stash or revert all uncommitted local changes
2) execute `npm run test-ci` to verify that the current state of the master branch is green
3) bump the @js-joda/core package version in the package.json
4) execute `npm run build-dist`
5) commit your changes
6) tag this commit with the current version and a preceeding 'v' e.g. `git tag -m "v1.1.1" v1.1.1`
7) `git push && git push --tags` and wait until travis reports a successful build 
8) publish the package `npm publish`
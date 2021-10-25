Release HowTo
==============

Automatically bump version in package.json, build distributions,
build esdoc with the latest distributions (for browser dev console debugging),
set git tags, git add/ commit and push to remote.

Update to changelogs have to be done manually.

```shell

# wait for a green build on master

$ checkout master
$ git pull
$ git add . && git reset --hard origin/master # ensure that local repo is in same state as origin
$ lerna run --stream test-ci # verify that the current state of the master branch is green
# Update and commit CHANGELOG'S manually, 'npx lerna-changelog' can help
$ lerna version [major | minor | patch] 
$ lerna publish from-package
```

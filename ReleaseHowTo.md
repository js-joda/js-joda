Release HowTo
==============

Automatically bump version in package.json, build distributions,
build esdoc with the latest distributions (for browser dev console debugging),
set git tags, git add/ commit and push to remote.

Update to changelogs have to be done manually.

```shell

# wait for a green build on main

$ git checkout main
$ git pull
$ git add . && git reset --hard origin/main # ensure that local repo is in same state as origin
$ lerna run --stream test-ci # verify that the current state of the main branch is green
# Update and commit CHANGELOG'S manually, 'npx lerna-changelog' is your friend
# make sure you are logged in to npmjs.org -> npm whoami; -> npm config get registry; -> npm login if needed
$ lerna publish --concurrency 1 [major | minor | patch] 
```

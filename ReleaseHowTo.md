Release HowTo
==============

1) Sync your master branch with the remote branch, stash or revert all uncommitted local changes
2) Create and checkout a release branch
3) Execute `lerna run --stream test-ci` to verify that the current state of the master branch is green
4) Execute `lerna version`, this will create a release commit and tags and push to remote.
5) Wait for a green build 
6) Execute `lerna publish`

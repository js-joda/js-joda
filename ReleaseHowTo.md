Release HowTo
==============

Automatically bump version in package.json, build distributions,
build esdoc with the latest distributions (for browser dev console debugging),
set git tags, git add/ commit and push to remote.

Update Changelogs manually.

1) Sync your master branch with the remote branch, 
   stash or revert all uncommitted local changes and unstaged files,
   Be aware that the `--no-granular-pathspec` option is required and therefore lerna do a `git add .`
2) Create and checkout a release branch
3) Execute `lerna run --stream test-ci` to verify that the current state of the master branch is green
4) Update Changelogs manually
5) Execute `lerna version --no-granular-pathspec [major | minor | patch]`, 
   this will create a release commit and set all tags and then push to remote,
   including the new build distributions. 
6) Wait for a green build 
7) Merge the release branch.
8) Execute `lerna publish`

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

## Troubleshooting: publish fails after versions/tags were already pushed

`lerna publish` first bumps versions, commits ("Publish") and pushes the git tags, and
*then* publishes to npm. If the npm step fails, the versions and tags are already on
`origin/main` but nothing reached npm. Do **not** re-run `lerna publish minor/patch` — that
double-bumps the versions. Instead publish the already-tagged versions:

```shell
$ npx lerna publish from-git --concurrency 1
```

`from-git` reads the tags at HEAD and publishes exactly those versions (no new commit, no
re-bump). It is safe to re-run — it skips packages already on npm and publishes the rest.

Common failure with 2FA enabled on npm:
- `lerna ERR! E404 Not found` (misleading, from lerna's old bundled npm client) or
  `lerna ERR! EOTP You must provide a one-time pass` both mean npm wants a 2FA one-time code.
- Re-run `npx lerna publish from-git --concurrency 1` and enter the OTP when prompted. The
  code can expire before all packages are published; if so, just run it again with a fresh
  code — `from-git` resumes where it left off. (An npm automation token avoids OTP entirely
  since it bypasses 2FA.)

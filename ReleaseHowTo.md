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

## Prebuilt locale packages (`@js-joda/locale_*`)

- In `lerna publish`, accept the versions lerna proposes for `locale_*`; don't enter "Custom"
  versions.
- When `npm test` in `packages/locale` fails with "check localePeerDependency in
  prebuilt-packages.json", update `localePeerDependency` (`imports` and `range`) there.
- After adding or removing a locale package, or changing `localePeerDependency`, in
  `packages/locale/prebuilt-packages.json`: run `npm run build-locale-dist` in `packages/locale` and
  commit `packages/locale/packages/` before the release.

## Troubleshooting

### Publish fails after versions/tags were already pushed

Don't re-run `lerna publish minor/patch`. Publish the versions in the `package.json` files:

```shell
$ npx lerna publish from-package --concurrency 1
```

### Publish fails with `E404 Not found` or `EOTP` (npm 2FA)

Run `npx lerna publish from-package --concurrency 1` and enter the one-time code when prompted.
If the code expires before all packages are published, run it again with a new code.

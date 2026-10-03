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

The 33 prebuilt locale packages in `packages/locale/packages/*` are versioned by lerna like any
other package. Accept the versions lerna proposes for them; do **not** enter "Custom" versions to
match `@js-joda/locale`. Their versions may differ from `@js-joda/locale`'s (e.g. `locale_de`
5.3.2 next to `locale` 5.4.0).

`@js-joda/locale`'s `prepublishOnly` regenerates these packages (`build-locale-dist`). The generator
(`packages/locale/utils/create_packages.js`) keeps the version lerna wrote and only fills in the
bundles, README and peer dependencies.

Their peer dependency on `@js-joda/locale` is maintained by hand in
`packages/locale/prebuilt-packages.json` (`localePeerDependency`), next to the list of
`@js-joda/locale` exports the prebuilt bundles import. When the bundles start to import more,
`npm test` in `packages/locale` fails until you raise the range there. Then run
`npm run create-packages` in `packages/locale` and commit the prebuilt manifests **before** the
release, so lerna sees the change and bumps the `locale_*` packages.

## Troubleshooting: publish fails after versions/tags were already pushed

`lerna publish` first bumps versions, commits ("Publish") and pushes the git tags, and
*then* publishes to npm. If the npm step fails, the versions and tags are already on
`origin/main` but nothing reached npm. Do **not** re-run `lerna publish minor/patch` — that
double-bumps the versions. Instead publish the versions that are in the `package.json` files:

```shell
$ npx lerna publish from-package --concurrency 1
```

`from-package` compares each package's `package.json` version with npm and publishes every
version that isn't on npm yet (no new commit, no re-bump, no tags). It is safe to re-run — it
skips packages already on npm and publishes the rest.

Prefer it over `npx lerna publish from-git`: `from-git` only publishes packages whose tags point
at HEAD. After versions or tags were fixed by hand in a follow-up commit, the tags no longer all
point at HEAD and `from-git` skips those packages.

Common failure with 2FA enabled on npm:
- `lerna ERR! E404 Not found` (misleading, from lerna's old bundled npm client) or
  `lerna ERR! EOTP You must provide a one-time pass` both mean npm wants a 2FA one-time code.
- Re-run `npx lerna publish from-package --concurrency 1` and enter the OTP when prompted. The
  code can expire before all packages are published; if so, just run it again with a fresh
  code — `from-package` resumes where it left off. (An npm automation token avoids OTP entirely
  since it bypasses 2FA.)

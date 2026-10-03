# Tasks

Decisions (see `proposal.md`): approach A, `@js-joda/locale` peer range `>=5.0.0` configured in
`prebuilt-packages.json` and guarded by a test, generated format matches the committed files.

## 1. Generator

- [x] 1.1 In `packages/locale/utils/create_packages.js`, keep the `version` of an existing `packages/<locale>/package.json` and use the `@js-joda/locale` version only when the file doesn't exist yet. Verify that `cd packages/locale && npm run build-locale-dist` leaves every existing prebuilt `version` unchanged. Note: the `create-packages` npm script ran `rm -rf packages/*` before the generator, so the cleanup moved into the generator, after it has read the existing versions
- [x] 1.2 Replace the `@js-joda/locale` peer range `>=${version}` with `>=5.0.0`, and update the 33 prebuilt manifests accordingly
- [x] 1.2.1 Move the range out of the generator into `prebuilt-packages.json` (`localePeerDependency`: `range`, `imports`, `comment`); the generator fails with a clear message when it's missing
- [x] 1.2.2 Add `test/prebuiltPackagesTest.js`: the `@js-joda/locale` imports in `utils/cldr-data.ejs` equal `imports`, `range` is `>=x.y.z` and satisfied by the current locale version, and every committed prebuilt manifest uses `range`. Verify each check fails on a matching broken input
- [x] 1.3 Write the generated `package.json` in the committed format: 4-space indentation, a trailing newline, no empty `dependencies`/`devDependencies`, and `peerDependencies` sorted by name (core, locale, timezone). Commit any one-time reformatting of the prebuilt manifests. Verify that on a clean checkout both `npm run build-locale-dist` and `npx lerna run --stream test-ci` leave `git status` clean
- [x] 1.4 Verify the new-package path: temporarily remove `packages/locale/packages/uk`, run `npm run build-locale-dist`, check that the regenerated `package.json` has the `@js-joda/locale` version and the peer ranges from the spec (`@js-joda/locale` `>=5.0.0`), then restore the directory with `git checkout`

## 2. Release documentation

- [x] 2.1 Update `ReleaseHowTo.md`: lerna versions the `@js-joda/locale_*` packages like any other package (no "Custom" versions), and when a publish fails after the push, run `npx lerna publish from-package --concurrency 1`, because `from-git` needs every tag on HEAD. Verify that the documented commands run as written (`npx lerna publish from-package --help`)

## 3. Integration

- [x] 3.1 Dry-run a release: `npx lerna version patch --no-git-tag-version --no-push --yes`, then `cd packages/locale && npm run build-locale-dist`, and check that every `locale_*` version still equals the one lerna wrote and that `git diff` of the prebuilt manifests shows only lerna's version bumps (no peer range changes). Revert with `git checkout .`
- [x] 3.2 Run `cd packages/locale && npm test`, then `npx lerna run --stream build-dist`, `npx lerna run --stream build-locale-dist` and `cd packages/examples && npm test`, and verify that all pass

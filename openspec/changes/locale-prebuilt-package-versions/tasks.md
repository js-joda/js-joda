# Tasks

Resolve the open questions in `proposal.md` first. These tasks assume approach A and an unchanged
`@js-joda/locale` peer range. Open question 3 (generated format) is decided: match the committed files.

## 1. Generator

- [ ] 1.1 In `packages/locale/utils/create_packages.js`, keep the `version` of an existing `packages/<locale>/package.json` and use the `@js-joda/locale` version only when the file doesn't exist yet. Verify that `cd packages/locale && npm run build-locale-dist` leaves every existing prebuilt `version` unchanged
- [ ] 1.2 Write the generated `package.json` in the committed format: 4-space indentation, a trailing newline, no empty `dependencies`/`devDependencies`, and `peerDependencies` sorted by name (core, locale, timezone). Commit any one-time reformatting of the prebuilt manifests. Verify that on a clean checkout both `npm run build-locale-dist` and `npx lerna run --stream test-ci` leave `git status` clean
- [ ] 1.3 Verify the new-package path: temporarily remove `packages/locale/packages/uk`, run `npm run build-locale-dist`, check that the regenerated `package.json` has the `@js-joda/locale` version and the peer ranges from the spec, then restore the directory with `git checkout`

## 2. Release documentation

- [ ] 2.1 Update `ReleaseHowTo.md`: lerna versions the `@js-joda/locale_*` packages like any other package (no "Custom" versions), and when a publish fails after the push, run `npx lerna publish from-package --concurrency 1`, because `from-git` needs every tag on HEAD. Verify that the documented commands run as written (`npx lerna publish from-package --help`)

## 3. Integration

- [ ] 3.1 Dry-run a release: `npx lerna version patch --no-git-tag-version --no-push --yes`, then `cd packages/locale && npm run build-locale-dist`, and check that every `locale_*` version still equals the one lerna wrote (`git diff` shows only lerna's bumps). Revert with `git checkout .`
- [ ] 3.2 Run `cd packages/locale && npm test`, then `npx lerna run --stream build-dist`, `npx lerna run --stream build-locale-dist` and `cd packages/examples && npm test`, and verify that all pass

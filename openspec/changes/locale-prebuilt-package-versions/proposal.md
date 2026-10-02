# Proposal

## Why

The 2026-10-02 release (`@js-joda/timezone` 3.0.0) failed with npm `E400`. Lerna had bumped
`@js-joda/locale` to 5.3.1 and the prebuilt `@js-joda/locale_*` packages to 5.2.1. During locale's
`prepublishOnly`, `packages/locale/utils/create_packages.js` then regenerated every prebuilt
`package.json` with locale's version, 5.3.1. npm rejected each tarball because its version didn't match
the one lerna sent. By then lerna had already pushed the "Publish" commit and tags, so the versions and
tags had to be fixed by hand.

Lerna and the generator both write the `version` field of the prebuilt packages, and nothing makes
them agree.

## What Changes

- The generator of the prebuilt locale packages keeps the version that an existing package's
  `package.json` already has. Lerna owns that version. Locale's version is used only for a newly
  created package.
- The generated peer dependencies stay as they are today: `@js-joda/core` and `@js-joda/timezone`
  ranges come from locale's peer dependencies, and `@js-joda/locale` is `>=` locale's version. They
  are specified so a later rewrite of the generator keeps them.
- The generator writes the manifests in the committed format, so `build-locale-dist`, and with it
  `test-ci`, no longer leaves changes to the 33 prebuilt `package.json` files in the working tree.
- `ReleaseHowTo.md` explains that lerna versions the `locale_*` packages like any other package, and
  that `lerna publish from-package` is the recovery when a publish fails after the push.
- Nothing changes for users of the published packages. The prebuilt packages' versions can differ
  from `@js-joda/locale`'s (e.g. `locale_de` 5.3.2 next to `locale` 5.4.0).

## Capabilities

### New Capabilities
- `locale-prebuilt-packages`: how the prebuilt `@js-joda/locale_*` packages get their version and
  peer dependencies when they are generated for a release.

### Modified Capabilities

## Impact

- `packages/locale/utils/create_packages.js` (version handling, output format)
- `ReleaseHowTo.md`
- Release process: no more "Custom" versions in the lerna prompt for `locale_*`

## Open questions

1. **Approach.** This proposal is written for A.
   - **A. The generator keeps the version (this proposal).** Lerna and the generator can no longer
     disagree. The downside is that `locale_*` versions drift from locale's.
   - **B. Enforce the same version.** Keep "`locale_*` version equals `@js-joda/locale` version", and
     add a root `version` lifecycle script. Lerna runs it after bumping and before commit, tag and
     push; it fails on a mismatch. The release manager still has to pick "Custom" versions in the
     lerna prompt, but a mistake aborts before anything is pushed. The "Prebuilt package version"
     requirement would change to match.
   - **C. Docs only.** Add a warning to `ReleaseHowTo.md` and drop this change.
2. **Peer range on `@js-joda/locale`.** `>=${locale version}` makes every locale release raise the
   minimum that `locale_*` requires. Should it become a fixed lower bound such as `>=5.0.0`, the
   release that introduced `registerLocaleData`? This proposal keeps it unchanged.
3. ~~**Generated format.**~~ Decided: yes. Today every `build-locale-dist`, and so every
   `lerna run test-ci`, rewrites all 33 prebuilt manifests: it reorders the peer dependencies,
   adds empty `dependencies` and `devDependencies`, and drops the trailing newline. The generator
   will write the committed format so that these runs leave `git status` clean (task 1.2).

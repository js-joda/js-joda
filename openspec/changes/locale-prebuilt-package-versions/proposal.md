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
- The `@js-joda/core` and `@js-joda/timezone` peer ranges still come from locale's peer dependencies.
- The `@js-joda/locale` peer range becomes `>=5.0.0`, configured in `prebuilt-packages.json` and
  checked by a test, instead of `>=` locale's current version.
  5.0.0 introduced `registerLocaleData`, the only locale API the prebuilt bundles import, and it hasn't
  changed since. Today every locale release raises the minimum, even when nothing in the API changed.
  That causes needless `ERESOLVE` peer conflicts for users, and it makes every version bump of locale
  rewrite all 33 prebuilt manifests, both in the working tree and in the published tarballs.
  The range only gets wider, so no install that works today breaks.
- The generator writes the manifests in the committed format, so `build-locale-dist`, and with it
  `test-ci`, no longer leaves changes to the 33 prebuilt `package.json` files in the working tree.
- `ReleaseHowTo.md` explains that lerna versions the `locale_*` packages like any other package, and
  that `lerna publish from-package` is the recovery when a publish fails after the push.
- For users of the published packages, the prebuilt packages' versions can differ from
  `@js-joda/locale`'s (e.g. `locale_de` 5.3.2 next to `locale` 5.4.0), and they accept any
  `@js-joda/locale` from 5.0.0 on.

## Capabilities

### New Capabilities
- `locale-prebuilt-packages`: how the prebuilt `@js-joda/locale_*` packages get their version and
  peer dependencies when they are generated for a release.

### Modified Capabilities

## Impact

- `packages/locale/utils/create_packages.js` (version handling, `@js-joda/locale` peer range, output format)
- `packages/locale/prebuilt-packages.json` (`localePeerDependency`)
- `packages/locale/test/prebuiltPackagesTest_mochaOnly.js` (new)
- The 33 prebuilt `packages/locale/packages/*/package.json` (peer range, one-time reformat)
- `ReleaseHowTo.md`
- Release process: no more "Custom" versions in the lerna prompt for `locale_*`

## Decisions

1. **Approach: A.** The generator keeps the version of an existing prebuilt package; lerna owns it.
   Rejected: B (enforce the same version with a `version` lifecycle check) keeps the 33 "Custom"
   versions in the lerna prompt and only makes a mistake fail earlier. C (docs only) leaves the
   failure in place.
2. **Peer range on `@js-joda/locale`: `>=5.0.0`, configured in `prebuilt-packages.json`, guarded by a
   test.** A range derived from locale's version (`>=${version}`, or `^${major}.0.0`) doesn't work:
   the generator runs in `prepublishOnly`, after lerna has chosen which packages to bump. Whatever it
   changes then is neither committed nor bumped, so the published manifests differ from the repo,
   and on a major release unchanged `locale_*` packages wouldn't be republished with the new range.
   The range must be a committed decision. It lives in `prebuilt-packages.json`
   (`localePeerDependency`), not as a constant in the generator, together with the list of exports
   the prebuilt bundles import from `@js-joda/locale`. `test/prebuiltPackagesTest_mochaOnly.js` fails when the
   bundle template imports something not listed, when the range isn't `>=x.y.z` or excludes the
   current version, or when the committed manifests don't use it. An upper bound (`^5.0.0`) is out of
   scope; it belongs to the next major release of locale.
3. **Generated format: match the committed files.** Today every `build-locale-dist`, and so every
   `lerna run test-ci`, rewrites all 33 prebuilt manifests: it reorders the peer dependencies, adds
   empty `dependencies` and `devDependencies`, and drops the trailing newline. The generator will
   write the committed format so that these runs leave `git status` clean (task 1.2).

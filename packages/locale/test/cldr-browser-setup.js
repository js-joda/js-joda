/*
 * Pre-loads CLDR data for browser tests using the prebuilt locale packages.
 * @js-joda/locale is aliased to the source in karma.conf.js so all imports
 * share the same CldrCache instance as the test source code.
 */

import '../packages/en/dist/index.esm.js';
import '../packages/de/dist/index.esm.js';
import '../packages/fr/dist/index.esm.js';
import '../packages/ko/dist/index.esm.js';
import '../packages/ja/dist/index.esm.js';
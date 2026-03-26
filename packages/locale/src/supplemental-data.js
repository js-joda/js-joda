/*
 * @copyright (c) 2026, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import { registerLocaleData, loadCldrData } from './format/cldr/CldrCache';
import likelySubtags from 'cldr-data/supplemental/likelySubtags.json';
import metaZones from 'cldr-data/supplemental/metaZones.json';
import weekData from 'cldr-data/supplemental/weekData.json';

// In Node.js with cldr-data installed, load from the installed package.
// In a browser (cldr-data unavailable), these are silent no-ops.
loadCldrData('supplemental/likelySubtags.json');
loadCldrData('supplemental/metaZones.json');
loadCldrData('supplemental/weekData.json');

// Register the bundled copies as a fallback for environments without cldr-data (e.g. browser).
// registerLocaleData skips any path already present in cldrDataLoaded, so in Node.js
// where loadCldrData succeeded above, these calls are no-ops.
registerLocaleData('supplemental/likelySubtags.json', likelySubtags);
registerLocaleData('supplemental/metaZones.json', metaZones);
registerLocaleData('supplemental/weekData.json', weekData);
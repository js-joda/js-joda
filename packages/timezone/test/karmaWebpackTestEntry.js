/*
 * @copyright (c) 2016-present, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

// see https://github.com/webpack/karma-webpack/issues/23,
// we have so many *Test.js files, that just serving them to something like saucelabs
// causes timeouts :/ ... so we  use webpack to handle this file, and in this file we
// require *all* *Test.js files ... then we can just serve a single bundle to the browser
// to execute our tests
// Downside to this is, that we need to manage any exclusions here as well :/

// require all *Test.js files expect test/plugTest
const testsContext = require.context('.', true, /Test.js$/);
testsContext.keys().forEach(testsContext);

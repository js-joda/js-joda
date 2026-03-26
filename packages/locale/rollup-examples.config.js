const path = require('path');
const { flatten, mergeDeepRight } = require('ramda');
const virtual = require('@rollup/plugin-virtual');
const { buildRollupConfig } = require('./rollup-build-packages-config');
const { plugins } = require('./rollup.config');
const renderCldrDataLoader = require('./utils/clrdr-data-render');

// Redirect @js-joda/locale to source so the examples bundle is fully self-contained.
const localeSourceAlias = {
    name: 'locale-source-alias',
    resolveId(id) {
        if (id === '@js-joda/locale') {
            return path.resolve(__dirname, 'src/js-joda-locale.js');
        }
        return null;
    },
};

const sampleLocales = [
    'de.*',
    'en',
    'en-US',
    'en-GB',
    'en-CA',
    'es',
    'es-ES',
    'fr',
    'fr-FR',
    'ru',
    'ru-RU',
    'zh',
    'zh-CN',
    'hi',
    'hi-IN',
];

// Build a locale data config and override with an example-specific entry that
// registers all locale data AND re-exports Locale, WeekFields, registerLocaleData.
// This makes examples/dist/sample a fully self-contained, dependency-free bundle.
function buildExampleConfig() {
    const cldrDataJs = renderCldrDataLoader(sampleLocales);

    // Wrapper entry: registers all locale data as side effect, then re-exports
    // the public API so that require('./dist/sample').Locale works.
    const exampleEntryJs = `
import '${path.resolve(__dirname, 'src/supplemental-data.js')}';
import 'cldr-data-entry';
export { Locale, WeekFields, registerLocaleData } from '@js-joda/locale';
`;

    const baseConfig = buildRollupConfig({ locales: sampleLocales });

    return mergeDeepRight(baseConfig, {
        plugins: [
            localeSourceAlias,
            virtual({
                'example-entry': exampleEntryJs,
                'cldr-data-entry': cldrDataJs,
            }),
            ...baseConfig.plugins,
        ],
        input: 'example-entry',
        external: ['@js-joda/core', '@js-joda/timezone'],
        output: {
            name: 'JSJodaLocale',
            globals: {
                '@js-joda/core': 'JSJoda',
                '@js-joda/timezone': 'JSJodaTimezone',
            },
        },
    });
}

const config = buildExampleConfig();

module.exports = flatten([
    mergeDeepRight(config, {
        output: { file: 'examples/dist/sample/index.js', format: 'umd', sourcemap: true },
    }),
    mergeDeepRight(config, {
        output: { file: 'examples/dist/sample/index.esm.js', format: 'es', sourcemap: true },
    }),
    mergeDeepRight(config, {
        plugins: config.plugins.concat(plugins.terser),
        output: { file: 'examples/dist/sample/index.min.js', format: 'iife', sourcemap: false },
    }),
]);
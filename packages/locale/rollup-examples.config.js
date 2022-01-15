const { buildRollupConfigs } = require('./rollup-build-packages-config');

module.exports = buildRollupConfigs({
    destDir: 'examples/dist',
    packages: {
        'sample': [
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
        ],
    },
});

const { buildRollupConfigs } = require('./rollup-build-packages-config');

module.exports = buildRollupConfigs('examples/dist', {
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
    ]
});

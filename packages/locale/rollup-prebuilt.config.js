const { packages } = require('./prebuilt-packages.json');
const { buildRollupConfigs } = require('./rollup-build-packages-config');

module.exports = buildRollupConfigs({
    destDir: 'dist/prebuilt',
    packages,
});

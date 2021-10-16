const sauceLabsLaunchers = {
    sl_ie: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 10',
        version: 'latest'
    },
    sl_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Windows 10',
        version: 'latest'
    },
    sl_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 10',
        version: 'latest'
    },
    sl_android_simulator: {
        base: 'SauceLabs',
        browserName: 'Chrome',
        deviceName: 'Android Emulator',
        platformName: 'Android',
        platformVersion: 'latest'
    },
    sl_ios_simulator: {
        base: 'SauceLabs',
        browserName: 'Safari',
        deviceName: 'iPhone Simulator',
        platformName: 'iOS',
        platformVersion: 'latest'
    },
    // these don't work yet :(
    sl_safari: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.11',
        version: 'latest'
    },
    sl_ios: {
        base: 'SauceLabs',
        browserName: 'safari',
        device: 'iPhone 6 Device',
        platform: 'iOS',
        version: 'latest'
    },
};

const sauceLabsMetaData = (packageName) => ({
    testName: `${packageName} karma tests`,
    tags: [
        packageName,
        process.env.GITHUB_REF,
        process.env.GITHUB_HEAD_REF,
        process.env.GITHUB_ACTOR,
    ],
    build: `Build #${process.env.GITHUB_RUN_NUMBER}`,
    recordVideo: false,
    recordScreenshots: false,
    // don't connect to saucelabs, let sauce-connect start a sauce connect proxy
    startConnect: false,
    // needed for sauce-connect connection to work
    tunnelIdentifier: 'github-action-tunnel',
    connectOptions: {
        logfile: 'sauce_connect.log'
    }
});

module.exports = {
    sauceLabsLaunchers,
    sauceLabsMetaData,
};

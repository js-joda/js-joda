const fs = require('fs');
const path = require('path');

function createBanner({ name, version }){
    const versionHeader = `//! @version ${name} - ${version}\n`;
    const preamble = fs.readFileSync(path.resolve(__dirname, './license-preamble.js'), 'utf8');
    return versionHeader + preamble;
}

module.exports.createBanner = createBanner;

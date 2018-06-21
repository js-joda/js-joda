import fs from 'fs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

function createBanner(){
    const packageJson = require('./package.json');
    const version = '//! @version ' + packageJson.name + ' - ' + packageJson.version + '\n';
    const preamble = fs.readFileSync('./src/license-preamble.js', 'utf8');
    return version + preamble;
}

const banner = createBanner();

export default [{
    input: './src/js-joda.js',
    plugins: [
        babel()
    ],
    output: {
        banner,
        file: 'dist/js-joda.esm.js',
        format: 'es'
    }
}, {
    input: './src/js-joda.js',
    plugins: [
        babel()
    ],
    output: {
        banner,
        file: 'dist/js-joda.js',
        format: 'umd',
        name: 'JSJoda',
        sourcemap: true,
    }
}, {
    input: './src/js-joda.js',
    plugins: [
        babel(),
        uglify({ output: { comments: /^!/ } }),
    ],
    output: {
        banner,
        file: 'dist/js-joda.min.js',
        format: 'iife',
        name: 'JSJoda'
    }
}];
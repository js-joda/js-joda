import babel from 'rollup-plugin-babel';

export default {
    input: './src/js-joda.js',
    plugins: [
        babel()
    ],
    output: {
        file: 'dist/js-joda.esm.js',
        format: 'es'
    }
};

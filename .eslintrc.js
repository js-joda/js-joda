module.exports = {
    'extends': 'airbnb',
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module',
        'forOf': false
    },
    'rules': {
        'indent': [
            2,
            4,
            {
                'SwitchCase': 1
            }
        ],
        'quotes': [
            2,
            'single',
            'avoid-escape'
        ],
        'linebreak-style': [
            2,
            'unix'
        ],
        'semi': [
            2,
            'always'
        ],
        'eqeqeq': [
            2,
            'smart'
        ],
        'no-underscore-dangle': 'off',
        'no-use-before-define': 'off',
        // max-len would be nice, but too many of the ported lines are too long and
        // we don't want to be too far away from threeten
        'max-len': 'off',
    },
    'env': {
        'es6': false,
        'browser': true,
        'node': true,
    }
};
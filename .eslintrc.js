module.exports = {
    'extends': 'eslint:recommended',
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
        ]
    },
    'env': {
        'es6': false,
        'browser': true,
        'node': true,
        'mocha': true
    }
};
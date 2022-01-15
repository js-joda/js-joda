module.exports = {
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
        'forOf': false
    },
    'rules': {
        'eqeqeq': ['error', 'smart'],
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single', 'avoid-escape'],
        'semi': ['error', 'always'],
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-template': 'error',
        'array-bracket-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'template-curly-spacing': ['error', 'never']
    },
    'env': {
        'es6': true,
        'browser': true,
        'node': true,
        'mocha': true
    }
};

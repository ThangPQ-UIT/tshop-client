module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        'react-hooks'
    ],
    'rules': {
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'quotes': [2, 'single', 'avoid-escape'],
        'no-unused-vars': [1, { 'vars': 'all', 'args': 'after-used' }],
        semi: ['error', 'never', { 'beforeStatementContinuationChars': 'never' }]
    }
};

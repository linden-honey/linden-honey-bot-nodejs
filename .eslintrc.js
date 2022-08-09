module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            babelrc: false,
            configFile: false,
        },
    },
    env: {
        commonjs: true,
        es2022: true,
        node: true,
        mocha: true,
    },
    extends: [
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    rules: {
        semi: 'off',
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'object-curly-newline': 'off',
        'no-console': 'off',
        'class-methods-use-this': 'off',
    },
    overrides: [
        {
            files: '*.spec.js',
            rules: {
                'no-unused-expressions': 'off',
                'one-var': 'off',
                'one-var-declaration-per-line': 'off',
            },
        },
    ],
}

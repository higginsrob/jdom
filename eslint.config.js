const js = require('@eslint/js');

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                // Browser globals
                window: 'readonly',
                document: 'readonly',
                HTMLElement: 'readonly',
                SVGElement: 'readonly',
                DOMParser: 'readonly',
                URLSearchParams: 'readonly',
                Event: 'readonly',
                // Node.js globals
                global: 'readonly',
                module: 'readonly',
                exports: 'readonly',
                require: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                process: 'readonly',
                console: 'readonly',
                Buffer: 'readonly',
            },
        },
        rules: {
            'no-loop-func': 'warn',
            'no-undef': 'warn',
            'no-unused-vars': 'warn',
            curly: 'warn',
            quotes: ['warn', 'single'],
            eqeqeq: 'warn',
            semi: ['warn'],
            'keyword-spacing': [
                'warn',
                {
                    before: true,
                },
            ],
        },
    },
];

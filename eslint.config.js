// Add structuredClone polyfill for older Node.js versions
if (typeof globalThis.structuredClone === 'undefined') {
    globalThis.structuredClone = obj => {
        return JSON.parse(JSON.stringify(obj));
    };
}

module.exports = [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script', // Changed from 'module' to 'script' for better compatibility
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
            // Essential rules only to avoid any compatibility issues
            'no-undef': 'warn',
            'no-unused-vars': 'warn',
            'no-debugger': 'error',
            'no-dupe-keys': 'error',
            'no-duplicate-case': 'error',
            'no-empty': 'error',
            'no-func-assign': 'error',
            'no-unreachable': 'error',
            'valid-typeof': 'error',

            // Custom project rules
            'no-loop-func': 'warn',
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

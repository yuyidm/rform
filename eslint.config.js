import antfu from '@antfu/eslint-config'

export default antfu({
    stylistic: {
        indent: 4,
    },
    typescript: true,
    react: true,
    rules: {
        'web/dynamic-import': 'off',
        'no-unused-vars': 'off',
        'no-console': 'warn',
        'n/prefer-global/process': ['error', 'always'],
        'react-hooks/exhaustive-deps': 'off',
        'style/jsx-one-expression-per-line': ['warn', { allow: 'single-line' }],
        // 'import-x/order': [
        //     'error',
        //     {
        //         pathGroups: [
        //             {
        //                 pattern: '@/**',
        //                 group: 'external',
        //                 position: 'after',
        //             },
        //         ],
        //     },
        // ],
    },
    ignores: [
        '**/umd',
        '**/es',
    ],
})

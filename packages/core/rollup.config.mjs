import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import alias from '@rollup/plugin-alias'

import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'
import peerDepsExternalPlugin from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import swc from 'rollup-plugin-swc3'

const isProd = process.env.NODE_ENV !== 'production'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import("rollup").RollupOptions} */
export default [
    // js
    {
        input: 'src/index.withStyle.ts',
        output: [
            {
                file: 'es/index.js',
                format: 'es',
            },
        ],
        jsx: 'react-jsx',
        plugins: [
            alias({
                entries: [
                    {
                        find: '@formily/path',
                        replacement: resolve(__dirname, 'node_modules/@formily/path/lib/index.js'),
                    },
                ],
            }),
            peerDepsExternalPlugin({
                includeDependencies: false,
            }),
            nodeResolve({
                extensions: ['js', '.jsx', '.ts', '.tsx'],
                moduleDirectories: ['node_modules'],
                preferBuiltins: false,
                exportConditions: ['default', 'module', 'import', 'require'],
            }),
            commonjs(),
            postcss({
                extensions: ['.less'],
                extract: true,
                minimize: true,
                use: {
                    less: {
                        javascriptEnabled: true,
                    },
                },
                modules: {
                    generateScopedName: isProd ? '[hash:base64:5]' : '[name]__[local]',
                },
            }),
            swc({
                tsconfig: 'tsconfig.json',
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        tsx: true,
                    },
                    transform: {
                        react: {
                            runtime: 'automatic',
                        },
                    },
                    target: 'es2020',
                },
            }),
            isProd && terser(),
        ].filter(Boolean),
    },
    // dts
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'es/index.d.ts',
                format: 'es',
            },
        ],
        plugins: [
            alias({
                entries: [
                    {
                        find: '@formily/path',
                        replacement: resolve(__dirname, 'node_modules/@formily/path/lib/index.js'),
                    },
                ],
            }),
            dts({
                tsconfig: 'tsconfig.json',
                compilerOptions: {
                    skipLibCheck: true,
                },
                exclude: [
                    '**/*.less',
                ],
            }),
        ],
    },
]

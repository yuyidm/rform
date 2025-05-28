import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import { dts } from 'rollup-plugin-dts'
import peerDepsExternalPlugin from 'rollup-plugin-peer-deps-external'
import swc from 'rollup-plugin-swc3'

const isProd = process.env.NODE_ENV !== 'production'

/** @type {import("rollup").RollupOptions} */
export default [
    {
        input: 'src/index.ts',

        output: [
            {
                file: 'es/index.js',
                format: 'es',
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternalPlugin(),
            nodeResolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            }),
            commonjs(),
            swc({
                sourceMaps: true,
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
            dts(),
        ],
    },
]

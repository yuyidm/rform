import { resolve } from 'node:path'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'

import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: 'dist/stats.html',
        }),
    ],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    server: {
        host: '0.0.0.0',
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'RForm',
            fileName: 'r-form',
        },
        cssCodeSplit: false,
        rollupOptions: {
            treeshake: true,
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                'classnames',
                'antd',
            ],
            output: {
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'React',
                    'classnames': 'classnames',
                    'antd': 'antd',
                },
            },
        },
    },
})

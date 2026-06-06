import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
        plugins: [react({ jsxRuntime: 'classic' })],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            },
        },
        define: {
            'process.env.NODE_ENV': JSON.stringify('production'),
        },
        build: {
            manifest: true,
            sourcemap: true,
            minify: true,
            lib: {
                entry: path.resolve(__dirname, 'blocks/index.ts'),
                name: 'GoogleMapsEmbedding',
                formats: ['iife'],
                fileName: () => `index.js`,
            },
            outDir: 'dist',
            emptyOutDir: true,
            rollupOptions: {
                external: [
                    'react',
                    'react-dom',
                    '@wordpress/blocks',
                    '@wordpress/block-editor',
                    '@wordpress/components',
                    '@wordpress/data',
                    '@wordpress/element',
                    '@wordpress/i18n'
                ],
                output: {
                    globals: {
                        react: 'wp.element',
                        'react-dom': 'wp.element',
                        '@wordpress/blocks': 'wp.blocks',
                        '@wordpress/block-editor': 'wp.blockEditor',
                        '@wordpress/components': 'wp.components',
                        '@wordpress/data': 'wp.data',
                        '@wordpress/element': 'wp.element',
                        '@wordpress/i18n': 'wp.i18n',
                    },
                },
            },
        },
    };
});

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: "globalThis", // added for Buffer
            },
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                }),
            ],
        },
    },
    resolve: {
        alias: [
            { find: "buffer", replacement: "buffer/" }, //  added for Buffer
        ],
    },
})

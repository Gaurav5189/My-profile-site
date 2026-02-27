import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscator from 'vite-plugin-javascript-obfuscator'

export default defineConfig({
    plugins: [
        react(),
        // Only obfuscate during the production build to keep development fast
        {
            ...obfuscator({
                options: {
                    compact: true,
                    controlFlowFlattening: true, // Scrambles how the code executes
                    controlFlowFlatteningThreshold: 0.75,
                    numbersToExpressions: true,
                    simplify: true,
                    stringArray: true,
                    stringArrayEncoding: ['base64'],
                    splitStrings: true,
                    unicodeEscapeSequence: true,
                },
            }),
            apply: 'build'
        }
    ],
    esbuild: {
        target: 'esnext',
    },
    optimizeDeps: {
        noDiscovery: true,
        include: [
            'react',
            'react/jsx-runtime',
            'react/jsx-dev-runtime',
            'react-dom',
            'react-dom/client',
            'framer-motion',
            'react-scroll',
            'react-icons/hi',
            'react-icons/hi2',
            'react-icons/fi',
            'three',
            '@react-three/fiber',
            '@react-three/drei',
        ],
        esbuildOptions: {
            target: 'esnext',
        },
    },
    build: {
        target: 'esnext',
        // 1. Critical: Disable sourcemaps so the original code isn't reconstructible
        sourcemap: false,
        // 2. Use Terser for more aggressive minification than the default Esbuild
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // Removes console.logs
                drop_debugger: true, // Removes debugger statements
                pure_funcs: ['console.info', 'console.warn', 'console.error'],
            },
            format: {
                comments: false, // Removes all code comments
            },
        },
        rollupOptions: {
            output: {
                // Splits vendor chunks to make it harder to map your local logic
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                },
            },
        },
    },
    server: {
        port: 5173,
        open: false,
    },
})
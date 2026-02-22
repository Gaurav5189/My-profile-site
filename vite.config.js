import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    esbuild: {
        target: 'esnext',
    },
    // Workaround: esbuild crashes auto-scanning on Windows paths with spaces.
    // noDiscovery skips the scan; include lists every package explicitly instead.
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
    },
    server: {
        port: 5173,
        open: false,
    },
})

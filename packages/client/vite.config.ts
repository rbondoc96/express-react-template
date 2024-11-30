import { resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@common': resolve(__dirname, '..', 'common', 'src'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
            },
        },
    },
});

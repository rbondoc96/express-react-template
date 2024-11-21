import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@mocks': resolve(__dirname, '__mocks__'),
            '@tests': resolve(__dirname, '__tests__'),
        },
    },
    test: {
        env: loadEnv('test', process.cwd(), ''),
        environment: 'node',
        include: ['__tests__/**/*.spec.ts'],
        setupFiles: [resolve(__dirname, '__tests__/setup.ts')],
    },
});

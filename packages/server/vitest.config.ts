import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@common': resolve(__dirname, '..', 'common', 'src'),
            '@mocks': resolve(__dirname, '__mocks__'),
            '@tests': resolve(__dirname, '__tests__'),
        },
    },
    test: {
        env: loadEnv('test', process.cwd(), ''),
        environment: 'node',
        // Set to false due to database having to be created and destroyed
        // for each file
        fileParallelism: false,
        include: ['__tests__/**/*.spec.ts'],
        setupFiles: [resolve(__dirname, '__tests__/setup.ts')],
    },
});

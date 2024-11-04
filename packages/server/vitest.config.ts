import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@mocks': resolve(__dirname, '__mocks__'),
        },
    },
    test: {
        environment: 'node',
        include: ['__tests__/**/*.spec.ts'],
        setupFiles: [resolve(__dirname, '__tests__/setup.ts')],
    },
});

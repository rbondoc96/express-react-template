import eslintJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsEsLint from 'typescript-eslint';

/**
 * @typedef {import('eslint').Linter.Config} Config
 */

/** @type {Config[]} */
const config = [
    {
        ignores: ['**/*.gen.*', '**/build/', '**/dist/', '**/node_modules/'],
    },
    {
        name: 'base',
        languageOptions: {
            ecmaVersion: 'latest',
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
    },
    {
        name: 'typescript',
        files: ['**/*.cts', '**/*.mts', '**/*.ts', '**/*.tsx'],
        languageOptions: {
            globals: {
                // Used for NodeJS.Timeout, NodeJS.Interval types
                NodeJS: true,
            },
            parser: tsEsLint.parser,
        },
        plugins: {
            '@typescript-eslint': tsEsLint.plugin,
        },
        rules: {
            ...eslintJs.configs.recommended.rules,
            // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
            ...tsEsLint.configs.recommended.rules,
            'no-redeclare': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        name: 'esm',
        files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.mts', '**/*.ts', '**/*.tsx'],
        languageOptions: {
            sourceType: 'module',
        },
        plugins: {
            'import': importPlugin,
            'simple-import-sort': simpleImportPlugin,
        },
        rules: {
            'sort-imports': 'off',
            'import/first': 'error',
            'import/newline-after-import': 'error',
            'import/no-duplicates': 'error',
            'import/no-nodejs-modules': 'error',
            'import/order': 'off',
            'simple-import-sort/exports': 'warn',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^\\u0000'],
                        [
                            '^node:',
                            '^@?\\w',
                            '^~(/.*|$)',
                            '^!(/.*|$)',
                            '^@tests(/.*|$)\\w',
                            '^@mocks(/.*|$)\\w',
                            '^@(/.*|$)',
                        ],
                        ['^', '^\\.'],
                    ],
                },
            ],
        },
    },
    {
        name: 'node/commonjs',
        files: ['**/*.cjs', '**/*.cts'],
        languageOptions: {
            globals: globals.node,
            sourceType: 'commonjs',
        },
        rules: {
            ...eslintJs.configs.recommended.rules,
        },
    },
    {
        name: 'node/esm',
        files: [
            '**/vitest.config.ts',
            'packages/client/vite.config.ts',
            'packages/server/**/*.mts',
            'packages/server/**/*.ts',
            'scripts/**/*.mts',
        ],
        languageOptions: {
            globals: globals.node,
            sourceType: 'module',
        },
        rules: {
            'import/no-nodejs-modules': 'off',
        },
    },
    {
        name: 'typescript/react-web',
        files: [
            'packages/client/__tests__/**/*.ts',
            'packages/client/__tests__/**/*.tsx',
            'packages/client/src/**/*.ts',
            'packages/client/src/**/*.tsx',
        ],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                jsxPragma: null,
            },
        },
        plugins: {
            'jsx-a11y': jsxA11y,
            'react': react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...jsxA11y.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];

export default config;

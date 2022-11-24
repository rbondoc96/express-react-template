import type {JestConfigWithTsJest} from 'ts-jest';
import {pathsToModuleNameMapper} from 'ts-jest';
import {compilerOptions} from './tsconfig.json';

const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
});

const config: JestConfigWithTsJest = {
  testEnvironment: 'jsdom',
  verbose: true,
  roots: ['<rootDir>/test/'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
  setupFiles: ['<rootDir>/test/setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    /* Handles statements where the below files are imported */
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/asset-mock.cjs',
  },
  modulePaths: [compilerOptions.baseUrl],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    ...paths,

    /* Handles statements where the below files are imported */
    '\\.(css|scss|less)$': 'identity-obj-proxy',
  },
};

export default config;

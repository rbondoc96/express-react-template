# Client 

## Table of Contents
- [Working Dependencies](#working-dependencies)
- [Development Dependencies](#dev-dependencies)

## Working Dependencies <a name="working-dependencies"></a>
- [`react`](https://reactjs.org): JavaScript UI library
- [`react-dom`](https://www.npmjs.com/package/react-dom): Serves as the entry point to the DOM and server renderers for React.

## Development Dependencies <a name="dev-dependencies"></a>

### Utilities
- [`@vitejs/plugin-react`](https://www.npmjs.com/package/@vitejs/plugin-react): All-in-one Vite plugin for React projects.
    - Enables Fash Refresh in development (components will not lose their state on refresh)
    - Avoid manual `import React` in `.jsx` and `.tsx` modules. (Default after React v17)
- [`autoprefixer`](https://www.npmjs.com/package/autoprefixer): A PostCSS plugin to parse CSS and add vendor prefixes using values from [Can I Use](https://caniuse.com/).
- [`postcss`](https://www.npmjs.com/package/postcss): Automate routine CSS operations, such as vendor prefixing
- [`prettier`](https://www.npmjs.com/package/prettier): Automatic code formatter
- [`tailwindcss`](https://www.npmjs.com/package/tailwindcss): CSS utility framework
- [`typescript`](https://www.typescriptlang.org/)
- [`vite`](https://vitejs.dev/): Development tool and module bundler

### Testing
- [`@testing-library/jest-dom`](https://testing-library.com/docs/ecosystem-jest-dom/): Provides custom DOM element matchers for Jest
- [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro/): Provides testing APIs for working with React components
- [`identity-obj-proxy`](https://www.npmjs.com/package/identity-obj-proxy): Mocks style file imports (`.(css, .sccs, .less)`,) in JSX
- [`jest`](https://jestjs.io/): Test framework
- [`jest-environment-jsdom`](https://www.npmjs.com/package/jest-environment-jsdom): Allows use of `testEnvironment: 'jsdom'` after removal from Jest v28+
- [`ts-jest`](https://www.npmjs.com/package/ts-jest): Used to transform `.tsx` files for use in Jest

### Types for TypeScript
- [`@types/jest`](https://www.npmjs.com/package/@types/jest): Type definitions for Jest
- [`@types/node`](https://www.npmjs.com/package/@types/node): Type definitions for Node.js
- [`@types/react`](https://www.npmjs.com/package/@types/react): Type definitions for React
- [`@types/react-dom`](https://www.npmjs.com/package/@types/react-dom): Type definitions for React (`react-dom`)

### ESLint
- [`eslint`](https://www.npmjs.com/package/eslint): Static code analysis tool
- [`@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser): ESLint parser which leverages [TypeScript ESTree](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/typescript-estree) to allow for ESLint to lint TypeScript source code

#### Plugins
- [`@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin): Provides lint rules for TypeScript code bases
- [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import): Adds support for linting ES6+ `import`/`export` syntax
- [`eslint-plugin-jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y): Checks accessibility (a11y) rules on JSX elements
- [`eslint-plugin-n`](https://www.npmjs.com/package/eslint-plugin-n): Additional ESLint rules for Node.js
- [`eslint-plugin-promise`](https://www.npmjs.com/package/eslint-plugin-promise): Enforce best practices when using Promises
- [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react): React specific linting rules
- [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks): Enforces the [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)

#### Configs
- [`eslint-config-google`](https://www.npmjs.com/package/eslint-config-google): Provides rules that align with the [Google ES6+ JS style guide](https://google.github.io/styleguide/jsguide.html)
- [`eslint-config-prettier`](https://www.npmjs.com/package/eslint-config-prettier): Turns off all rules that are unnecessary or might conflict with Prettier
- [`eslint-config-standard-with-typescript`](https://www.npmjs.com/package/eslint-config-standard-with-typescript): Creates TypeScript rules based on [JS Standard Styles](https://standardjs.com/) with specific rules from `@typescript-eslint/eslint-plugin`
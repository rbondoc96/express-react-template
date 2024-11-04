# Express Server

## Working Dependencies <a name="working-dependencies"></a>
- [`dotenv`](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file into `process.env`
- [`express`](http://expressjs.com/): Node.js web framework

## Development Dependencies <a name="dev-dependencies"></a>

### Utilities
- [`concurrently`](https://www.npmjs.com/package/concurrently): Run multiple commands concurrently.
- [`nodemon`](https://www.npmjs.com/package/nodemon): Automatically restart a `node` application when file changes are detected
- [`prettier`](https://www.npmjs.com/package/prettier): Automatic code formatter
- [`typescript`](https://www.typescriptlang.org/)

### Testing
- [`chai`](https://www.npmjs.com/package/chai): Assertion library
- [`mocha`](https://www.npmjs.com/package/mocha): Test framework
- [`ts-mocha`](https://github.com/piotrwitek/ts-mocha): Wrapper on top of `mocha` to run tests written in TypeScript

### TypeScript
- [`@types/chai`](https://www.npmjs.com/package/@types/chai): Type definitions for Chai
- [`@types/express`](https://www.npmjs.com/package/@types/express): Type definitions for Express
- [`@types/mocha`](https://www.npmjs.com/package/@types/mocha): Type definitions for Mocha
- [`@types/node`](https://www.npmjs.com/package/@types/node): Type definitions for Node.js

### ESLint
- [`eslint`](https://www.npmjs.com/package/eslint): Static code analysis tool
- [`@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser): ESLint parser which leverages [TypeScript ESTree](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/typescript-estree) to allow for ESLint to lint TypeScript source code

#### Plugins
- [`@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin): Provides lint rules for TypeScript code bases
- [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import): Adds support for linting ES6+ `import`/`export` syntax
- [`eslint-plugin-n`](https://www.npmjs.com/package/eslint-plugin-n): Additional ESLint rules for Node.js
- [`eslint-plugin-promise`](https://www.npmjs.com/package/eslint-plugin-promise): Enforce best practices when using Promises

#### Configs
- [`eslint-config-google`](https://www.npmjs.com/package/eslint-config-google): Provides rules that align with the [Google ES6+ JS style guide](https://google.github.io/styleguide/jsguide.html)
- [`eslint-config-prettier`](https://www.npmjs.com/package/eslint-config-prettier): Turns off all rules that are unnecessary or might conflict with Prettier
- [`eslint-config-standard-with-typescript`](https://www.npmjs.com/package/eslint-config-standard-with-typescript): Creates TypeScript rules based on [JS Standard Styles](https://standardjs.com/) with specific rules from `@typescript-eslint/eslint-plugin`
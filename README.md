# Express React Template

## Environments
* `main`
    * Frontend: [`https://gleaming-figolla-6c5720.netlify.app/`](https://gleaming-figolla-6c5720.netlify.app/)
    * API URL: `https://express-react-template-ms0u.onrender.com`

## Features <a name="features"></a>
This monorepo acts as boilerplate for a full stack project written using TypeScript. 

The project as a whole uses a single Prettier configuration, while `client` and `server` each have their own ESLint rules.

### Technologies Used in `client` <a name="tech-client"></a>
- [Vite](https://vitejs.dev/) development tool
- [React](https://reactjs.org/) as a frontend library
- [TailwindCSS](https://tailwindcss.com/) as a CSS utility framework
- [Jest](https://jestjs.io/) as a test framework

### Technologies Used in `server` <a name="tech-server"></a>
- [Node.js](https://nodejs.org/en/) runtime environment
- [Express.js](https://expressjs.com/) as a backend framework
- [Mocha](https://mochajs.org/) as a test framework
- [Chai](https://www.chaijs.com/) as an assertion library for testing


## Getting Started <a name="getting-started"></a>

Scripts are named in `package.json` in a way that makes running `npm` commands targeting a specific package directory easier. It involves prepending either `run <my_directory>` or `run <my_directory>:run` depending on the command we want to run, rather than having to add `-w packages/<my_directory>` to each command.

To install dependencies for the project:
```
# `i` or `install` doesn't need the `run` keyword in order to execute
npm run client i            # installs `client` packages
npm run server i            # installs `server` packages
```

After the dependencies are installed, the dev servers can be started using:
```
# `dev` DOES need the `run` keyword in order to execute
npm run client:run dev      # starts the frontend dev server
npm run server:run dev      # starts the backend dev server
```

## Common Commands

### Project Root
* `npm run client:<name>` - Runs the `<name>` script defined in `packages/client`
* `npm run format` - Runs Prettier code style checks
* `npm run server:<name>` - Runs the `<name>` script defined in `packages/server`

### Client
* `npm run build` - Build frontend for production
* `npm run checks` - Runs type, linting, and formatting checks concurrently
* `npm run deploy` - Used by Netlify to build and deploy the frontend
* `npm run dev` - Run the frontend in DEV mode
* `npm run format` - Runs Prettier code style checks
* `npm run lint` - Runs ESLint checks
* `npm run stan` - Runs the TypeScript compiler as a type checker
* `npm test` - Run tests

### Server
* `npm run build` - Build backend for production
* `npm run checks` - Runs type, linting, and formatting checks concurrently
* `npm run deploy` - Used by Render to build and deploy the backend
* `npm run dev` - Run the backend in DEV mode
* `npm run format` - Runs Prettier code style checks
* `npm run lint` - Runs ESLint checks
* `npm run stan` - Runs the TypeScript compiler as a type checker
* `npm test` - Run tests

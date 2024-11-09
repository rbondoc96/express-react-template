# Express React Template
_A monorepo template for full-stack projects built on React and Express_

## Environments
* `main`
    * Frontend: [`https://gleaming-figolla-6c5720.netlify.app`](https://gleaming-figolla-6c5720.netlify.app)
    * API: `https://express-react-template-ms0u.onrender.com`

## Tech Stack

### Client
- [Vite](https://vitejs.dev/) development tool
- [React](https://reactjs.org/) as a frontend library
- [TailwindCSS](https://tailwindcss.com/) as a CSS utility framework
- [Jest](https://jestjs.io/) as a test framework

### Server
- [Node.js](https://nodejs.org/en/) runtime environment
- [Express.js](https://expressjs.com/) as a backend framework
- [Mocha](https://mochajs.org/) as a test framework
- [Chai](https://www.chaijs.com/) as an assertion library for testing


## Setup

1. Install dependencies: `npm ci`
2. `cp packages/client/.env.example packages/client/.env`
3. `cp packages/server/.env.example packages/server/.env`
4. Run frontend and backend dev servers: `npm run dev`

## Common Commands

### Project Root
* `npm run client:<name>` - Runs the `<name>` script defined in `packages/client`
* `npm run format` - Runs Prettier code style checks
* `npm run lint` - Runs ESLint checks
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
* `npm start` - Used by Render to start the server
* `npm test` - Run tests

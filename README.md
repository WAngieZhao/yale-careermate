# Apartmate

### Project Structure

- 3 modules, `frontend`, `backend`, and `shared`. Names self explanatory

### Developing

- Make sure you [install Yarn globally](https://classic.yarnpkg.com/lang/en/docs/install).
- CD to the root directory, run `yarn dev`. This will start up a single process that continually watches the typescript in all three modules for changes, auto recompiles, and auto starts a development server.

### Typescript vs. CommonJS

- You CANNOT use `require('x')` or `module.exports` (almost) anywhere in this project. You must use the `es2020/es6` standard. [Read more here](https://blog.logrocket.com/commonjs-vs-es-modules-node-js/).

### Apollo GraphQL 

- [Read the documentation](https://www.apollographql.com/docs/react/).
- We're using `graphql-tools` to help modularize our definitions. Read more about combining various type definitions and resolvers [at this link](https://www.graphql-tools.com/docs/schema-merging).

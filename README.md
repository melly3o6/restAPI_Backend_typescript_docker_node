# restAPI MyCode backend from scratch

---

## How does it work?

### Configuration

- #### introduction

For our backend we will use following packages:
(This is also how the dependencies in your package.json should look like for this project)

- **brypt:** This package is used for hashing passwords securely. It's commonly employed to store hashed passwords in databases to enhance security.
- **bryptjs:** A JavaScript implementation of bcrypt. It is often used in Node.js environments.
- **body-parser:** This middleware parses the incoming request bodies in a middleware before your handlers, available under req.body. It's commonly used to parse JSON and URL-encoded data.
- **cookie-session:** This middleware provides cookie-based session management. It allows you to store session data on the client side within cookies.
- **cors:** CORS stands for Cross-Origin Resource Sharing. This package enables the server to handle cross-origin requests and define who can access the server's resources.
- **dotenv:** Loads environment variables from a .env file into process.env, making it easy to manage configuration settings.
- **express:** A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **express-jwt:** Middleware for handling JSON Web Token (JWT) authentication in Express applications.
- **helmet:** A middleware that helps secure Express apps by setting various HTTP headers, adding a layer of protection against common web vulnerabilities.
- **http-status-codes:** A library that provides a set of HTTP status codes for more readable code when dealing with HTTP responses.
- **jotai:** A state management library for React applications.
- **jsonwebtoken:** Used for creating and verifying JSON Web Tokens (JWT), which are often used for authentication and information exchange between parties.
- **jwt-decode:** A library for decoding JWTs on the client side, useful for extracting information from the token.
- **morgan:** HTTP request logger middleware for Node.js. It logs requests to the console, which can be helpful for debugging and monitoring.
- **mysql2:** A MySQL driver for Node.js. It allows Node.js applications to connect to and interact with MySQL databases.
- **nanoid:** A small, secure, and URL-friendly unique ID generator. Useful for generating unique identifiers.
- **nodemon:** A development utility that monitors for changes in files and automatically restarts the server when changes are detected.
- **uuid:** A library for generating universally unique identifiers (UUIDs).
- **yup:** A schema validation library for JavaScript and TypeScript. It's often used for validating and sanitizing user input.

(These are the devDependencies -> We only need them in development and not for production)

- @types/bcryptjs
- @types/cors
- @types/dotenv
- @types/eslint
- @types/express
- @types/helmet
- @types/http-status-codes
- @types/nodemon

**These are TypeScript type definitions for the respective packages, providing TypeScript support and autocompletion.**

- ts-node-dev: A development tool for running TypeScript applications. It provides fast incremental compilation and automatic restarting.
- typescript: The TypeScript compiler. TypeScript is a superset of JavaScript that adds static typing to the language. It is used to enhance code maintainability and catch potential errors during development.

---

### Project setup

The project structure should look like this now:

---

### app.ts

---

### server.ts

---

### Users.src

- #### user.interface.ts

- #### user.routes.ts

---

### Products.src

- #### products.interface.ts

- #### products.routes.ts

---

### API.src

- #### EHttpMethods.ts

---

## services

- #### API.service.ts

---

## Docker 

---

## nodemon

# Backend To-Do & Authentication API (Node.js/Express)

This repository contains the backend service for managing to-do lists and user authentication, built with Node.js and Express.js. It is a core component of the Full Stack Developer Coding Test, providing a RESTful API that serves the frontend application. All data is stored in-memory, meaning it will be reset every time the server restarts.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Core Features](#core-features)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication-endpoints)
  - [To-Do Management](#to-do-endpoints)
- [Architectural Overview](#architectural-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Service](#running-the-service)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)

## Tech Stack

- **Node.js**: A JavaScript runtime environment that executes JavaScript code outside a web browser.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **JSON Web Token (JWT)**: Used for creating access tokens to secure API endpoints, ensuring that only authenticated users can access their data.
- **bcrypt.js**: A library for hashing user passwords, providing a critical layer of security for user credentials.
- **Swagger (OpenAPI)**: The API is documented using the OpenAPI specification, with `swagger-jsdoc` to generate the spec from JSDoc comments and `swagger-ui-express` to serve interactive API documentation.
- **CORS**: A Node.js package for providing a Connect/Express middleware that can be used to enable Cross-Origin Resource Sharing with various options.

## Core Features

-   **Full User Authentication Lifecycle**: Complete endpoints for user registration, login, and profile management.
-   **Secure Password Handling**: Passwords are never stored in plain text. They are salted and hashed using `bcrypt.js` before being stored.
-   **JWT-Protected Routes**: All sensitive endpoints, including profile management and to-do list operations, are protected using a JWT-based authentication middleware.
-   **CRUD Operations for To-Dos**: The API provides full Create, Read, Update, and Delete functionality for user-specific to-do lists.
-   **In-Memory Database**: For simplicity and rapid development, the application uses in-memory arrays to store users and to-dos. This means no external database is required, but data is not persisted.
-   **Interactive API Documentation**: A user-friendly Swagger UI is available for exploring and testing the API endpoints directly from the browser.

## API Endpoints

### Authentication Endpoints

-   `POST /auth/register`: Register a new user. Requires `name`, `email`, and `password`.
-   `POST /auth/login`: Log in a user. Requires `email` and `password`. Returns a JWT upon success.
-   `GET /auth/profile`: Retrieve the profile of the currently logged-in user. Requires a valid JWT.
-   `PATCH /auth/profile`: Update the profile of the currently logged-in user. Requires a valid JWT.

### To-Do Endpoints

*All to-do endpoints require a valid JWT.*

-   `POST /todos`: Create a new to-do item. Requires a `title`.
-   `GET /todos`: Retrieve all to-do items for the authenticated user.
-   `PATCH /todos/:id`: Update a specific to-do item (e.g., mark as complete, change title).
-   `DELETE /todos/:id`: Delete a specific to-do item.

## Architectural Overview

The API follows a standard Model-View-Controller (MVC) pattern, adapted for a RESTful service:

-   **Routes**: Define the API endpoints and map them to the appropriate controller functions.
-   **Controllers**: Contain the core application logic. They process incoming requests, interact with the data store, and send back a response.
-   **Middleware**: Functions that have access to the request and response objects. Used for tasks like authentication (`auth.js`), request logging, and error handling.
-   **In-Memory Store**: Simple JavaScript arrays are used in place of a traditional database model, located directly within the relevant controllers.

## Project Structure

```
backend-todos/
├── controllers/        # Request handling and business logic
│   ├── authController.js
│   └── todoController.js
├── middleware/         # Express middleware (e.g., for authentication)
│   └── auth.js
├── routes/             # API route definitions
│   ├── authRoutes.js
│   └── todoRoutes.js
├── .dockerignore
├── .gitignore
├── Dockerfile
├── index.js            # Application entry point and server setup
├── package.json
├── pnpm-lock.yaml
└── swagger.js          # Swagger/OpenAPI configuration
```

## Getting Started

### Installation

This service is designed to be run within a Docker container, managed by the `docker-compose.yml` file in the project root.

### Running the Service

To run the entire application stack, including this service, use the following command from the project root directory:

```bash
docker-compose up -d --build
```

This command will build the Docker image for the service and start the container. The API will be available at **[http://localhost:3000](http://localhost:3000)**.

## API Documentation

Once the server is running, you can access the interactive Swagger UI documentation in your browser at:

**[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

This interface allows you to view all available endpoints, see their required parameters, and even try them out live.

## Error Handling

The API provides meaningful error messages and appropriate HTTP status codes:

-   `400 Bad Request`: For invalid input, such as missing required fields.
-   `401 Unauthorized`: When trying to access a protected endpoint without a valid JWT.
-   `404 Not Found`: When an item (like a to-do) is not found.
-   `500 Internal Server Error`: For any unexpected server-side errors.
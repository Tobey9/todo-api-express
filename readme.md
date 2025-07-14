# 📝 To-Do List API

This is a secure and fully-tested RESTful To-Do List API built using **Node.js**, **Express**, **Sequelize**, and **MySQL**. It supports user registration and login using **JWT authentication**, as well as full **CRUD operations** for todo items. Authentication tokens are securely stored in HTTP-only cookies, and input fields are sanitized to prevent cross-site scripting (XSS).

https://roadmap.sh/projects/todo-list-api

---

## 🚀 Features

This project includes user registration and login with encrypted passwords using `bcrypt`, and issues JWT tokens upon successful authentication. Logged-in users can create, read, update, and delete their own todos. The API also supports searching todos by title, pagination for large lists, and includes full test coverage using **Jest** and **Supertest**. Passwords are hashed and stored securely, and all user input is sanitized using `sanitize-html`.

---

## 📁 Project Structure

All the route handlers are placed under the `controllers/` folder, and the Sequelize models are in `models/`. Routes are organized inside the `routes/` folder. Middlewares for authentication and error handling are in `middlewares/`, and tests are in the `tests/` directory. The main Express setup is in `app.js`, and `server.js` starts the server.

---

## ⚙️ Technology Stack

This project uses **Express.js** for the HTTP server, **Sequelize** for interacting with a **MySQL** database, **JWT** for authentication, and **Jest + Supertest** for testing. Input is sanitized to prevent malicious injection, and cookies are used to store authentication tokens securely.

---

## 📦 Getting Started

To get started, first clone the repository:

```bash
git clone https://github.com/your-username/todo-api.git
cd todo-api
```

Install the dependencies:

```bash
npm install
```

Create a .env file using the .env.example as a template:

```bash
cp .env.example .env
```

Fill in the required environment variables like database credentials and a JWT secret key:

```ini
PORT=3000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
DB_NAME=todo_api
DB_USER=root
DB_PASS=your_password
DB_HOST=localhost
```

To create and migrate your database:

```bash
npm start
```

---

## API Overview

- `POST /users/register`: Registers a new user and returns a token
- `POST /users/login`: Logs in an existing user and returns a token
- `POST /users/logout`: Logs out the user by clearing the cookie
- `POST /todos`: Returns a list of todos (with optional search and pagination)
- `GET /todos`: Creates a new todo
- `PUT /todos/:id`: Updates a todo
- `DELETE /todos/:id`: Deletes a todo

Example request with query parameters:

```postman
GET /todos?page=1&limit=10&search=homework
```

Authentication is required for all /todos routes. JWT tokens are stored in secure HTTP-only cookies, and the middleware ensures the user is logged in before accessing protected routes.

---

## 🧪 Running Tests

Tests are written using Jest and Supertest and run in a separate test database. To execute all tests, simply

```bash
npm test
```

Tests include authentication, todo creation, reading, updating, and deletion, and ensure unauthorized access is blocked.

## 🛡️ Security Notes

This API uses sanitize-html to strip any dangerous HTML tags or attributes from user inputs. Passwords are hashed using bcrypt before being stored in the database. Authentication tokens are stored in cookies using the httpOnly, secure, and sameSite options for better protection.

## 🌱 Environment Example

Here is a sample .env file:

```ini
PORT=3000
JWT_SECRET=your_jwt_secret
DB_NAME=todo_api
DB_USER=root
DB_PASS=your_db_password
DB_HOST=localhost
```

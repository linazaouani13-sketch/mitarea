# MiTarea — Todo API

A backend REST API for managing personal to-do tasks, organized into categories.
Built as a learning project to practice authentication, authorization, and
relational database design.

Each user can register, log in, and manage their own tasks and categories.
Every request is scoped to the logged-in user — no user can ever see or modify
another user's data.

## Features

- User registration and login with hashed passwords (bcrypt)
- JWT-based authentication
- Full CRUD for Tasks (create, read, update, delete)
- Full CRUD for Categories (create, read, update, delete)
- Tasks can optionally belong to a Category
- Per-user data isolation enforced on every route

## Tech stack

- **Runtime:** Node.js, Express
- **Database:** PostgreSQL (hosted on [Neon](https://neon.tech))
- **ORM:** Prisma
- **Auth:** JSON Web Tokens (jsonwebtoken), bcrypt for password hashing

## Getting started

### Prerequisites

- Node.js installed
- A PostgreSQL database (e.g. a free Neon project)

### Setup

1. Clone the repository
   ```
   git clone https://github.com/linazaouani13-sketch/mitarea.git
   cd mitarea
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in your own values
   ```
   DATABASE_URL="your-postgres-connection-string"
   JWT_SECRET="a-long-random-string"
   ```

4. Run the database migrations (creates the tables in your database)
   ```
   npx prisma migrate dev
   ```

5. Start the server
   ```
   node src/server.js
   ```

The server runs on `http://localhost:3000` by default.

## API Endpoints

### Auth

| Method | Endpoint         | Description              | Auth required |
|--------|------------------|---------------------------|:---:|
| POST   | `/auth/register` | Create a new account      | No |
| POST   | `/auth/login`     | Log in, receive a JWT     | No |

### Tasks

All task routes require an `Authorization: Bearer <token>` header.

| Method | Endpoint      | Description                     |
|--------|---------------|----------------------------------|
| POST   | `/task`       | Create a new task               |
| GET    | `/task`       | List all of your tasks          |
| GET    | `/task/:id`   | Get one task by id              |
| PATCH  | `/task/:id`   | Update a task                   |
| DELETE | `/task/:id`   | Delete a task                   |

### Categories

All category routes require an `Authorization: Bearer <token>` header.

| Method | Endpoint          | Description                     |
|--------|-------------------|----------------------------------|
| POST   | `/category`       | Create a new category           |
| GET    | `/category`       | List all of your categories     |
| PATCH  | `/category/:id`   | Update a category               |
| DELETE | `/category/:id`   | Delete a category                |

## Example requests

**Register**
```
POST /auth/register
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Login**
```
POST /auth/login
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
Response includes a `token` — pass it as `Authorization: Bearer <token>` on every task/category request.

**Create a task**
```
POST /task
{
  "title": "Finish report",
  "description": "Q3 summary",
  "categoryId": 1
}
```

## Project structure

```
src/
├── server.js              # starts the server
├── app.js                 # Express app setup, middleware, routes
├── routes/                # URL → controller mappings
├── controllers/           # route logic
├── middleware/             # JWT auth middleware
└── lib/
    └── prisma.js           # shared Prisma client instance
prisma/
└── schema.prisma           # database models
```

## Status

This project was built step by step as a learning exercise in backend
development — authentication, relational data modeling, and building a
secured REST API from scratch.
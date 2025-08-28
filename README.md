# User & Task Management Service

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)** for managing users and tasks with **JWT authentication**.  
This project was developed as a coding assessment.

---

## ✨ Features

- User registration and authentication
- JWT-based authorization
- CRUD operations for tasks
- Task filtering (by status) and pagination
- Input validation and error handling
- Security best practices implemented (helmet, CORS, password hashing)
- Swagger API documentation
- Bonus: User search endpoint (`/api/users/search?name=abc`)

---

## 📦 Prerequisites

- **Node.js** (v14 or higher recommended)
- **MongoDB** (v4.4 or higher, local or cloud instance like MongoDB Atlas)
- **npm** or **yarn**

---

## 🚀 Installation

1. Clone the repository
```bash
git clone https://github.com/Tobi-Archademy/task-management-service.git
cd task-management-service
```

2. Install dependencies
```bash
npm install
```

---

## ⚙️ Environment Variables

The app requires the following environment variables:

- **`PORT`** – server port (default: 3000)
- **`MONGODB_URI`** – MongoDB connection string
- **`NODE_ENV`** – environment (development | production)
- **`JWT_SECRET`** – secret key for signing JWT tokens
- **`JWT_EXPIRES_IN`** – access token expiry (e.g., 1h)
- **`JWT_REFRESH_SECRET`** – secret key for refresh tokens
- **`JWT_REFRESH_EXPIRES_IN`** – refresh token expiry (e.g., 7d)

---

## ▶️ Running the App

Development
```bash
npm run dev
```

Production
```bash
npm start
```

The server will start on:
**`http://localhost:3000`**

---

## 📖 API Documentation

Interactive Swagger UI is available at:
**`http://localhost:3000/api-docs`**

This includes:

- All available endpoints
- Request/response schemas
- Authentication setup

---

## 🔑 Authentication

This project uses JWT (Bearer tokens).

1. Register or login to get a token.
2. Send the token in the **`Authorization`** header:
```bash
Authorization: Bearer <your_token>
```

---

## 📌 Endpoints Summary

### Auth
- **`POST /api/auth/register`** – Register a new user
- **`POST /api/auth/login`** – Authenticate and receive JWT tokens

### Users
- **`GET /api/users/me`** – Get logged-in user profile
- **`GET /api/users/search?name=abc`** – Search users by name

### Tasks
- **`POST /api/tasks`** – Create a new task
- **`GET /api/tasks?status=done&page=1&limit=10`** – List tasks with filtering & pagination
- **`PUT /api/tasks/:id`** – Update a task (only if owned by user)
- **`DELETE /api/tasks/:id`** – Delete a task (only if owned by user)

### System
- **`GET /api/health`** – Health check endpoint

---

## 🧪 Testing with Curl (Example)

1. Register a user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"Password123"}'
```

2. Login to get token
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Password123"}'
```

3. Use token in protected routes
```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer <your_token>"
```

---

## 🌐 Deployment

- API Base URL: **`https://task-management-service-jxcs.onrender.com/api`**
- Swagger Docs: **`https://task-management-service-jxcs.onrender.com/api-docs/`**
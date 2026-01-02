# Scalable Web App with Authentication & Dashboard

## Overview
This project is a full-stack web application built as part of a **Frontend Developer Intern assignment**.  
It focuses on building a modern, responsive frontend with a lightweight backend to support authentication and dashboard features.

---

## Tech Stack

### Frontend
- React.js
- Bootstrap
- Axios
- React Router DOM

### Backend
- Python (FastAPI)
- JWT Authentication
- bcrypt (password hashing)
- SQLite Database

---

## Features

### Authentication
- User registration
- User login with JWT
- Secure password hashing
- Logout functionality

### Dashboard
- Protected dashboard (login required)
- User profile fetched from backend
- Task management (Create, Read, Update, Delete)
- Search tasks
- Filter tasks by status

### Security
- JWT authentication middleware
- Protected routes
- Input validation
- Proper error handling

---

## Project Structure

my-app/
│
├── backend/
│ ├── routes/
│   ├── auth.py
│   ├── profile.py
│   ├── tasks.py
│ ├── utils/
│   ├── jwt.utils.py
│   ├── secuirty.py
│ ├── main.py
│ ├── database.py
│ ├── models.py
│ ├── schemas.py
│
├── frontend_app/
│ ├── public/
│   ├── index.html
│ ├── src/
│   ├── api/
│     ├── axios.js
│   ├── components/
│     ├── Navbar.js
│     ├── ProtectedRoute.js
│   ├── context/
│     ├── AuthContext.js
│   ├── pages/
│     ├── Auth.css
│     ├── Dashboard.css
│     ├── Dashboard.js
│     ├── Login.js
│     ├── Profile.js
│     ├── Profile.css
│     ├── Register.js
│     ├── Tasks.css
│     ├── Tasks.js
│   ├── routes/
│     ├──ProtectedRoute.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│
└── README.md

- - -

## How to Run

### Backend Setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs on:
http://localhost:8000

### Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:
http://localhost:3000

- - -
## API Documentation

### Authentication

POST /register  
Registers a new user.

POST /login  
Logs in a user and returns a JWT token.

### Profile

GET /profile  
Fetches logged-in user profile. Requires authentication.

### Tasks

GET /tasks  
Fetch all tasks for the logged-in user.

POST /tasks  
Create a new task.

PUT /tasks/{id}  
Update an existing task.

DELETE /tasks/{id}  
Delete a task.

- - -

### Authorization

All protected routes require a JWT token to be sent in the request header:
Authorization: Bearer <token>

- - -

## Search & Filter

- Search tasks by title  
- Filter tasks by status (Completed / Pending)  

Both search and filter functionalities are implemented on the frontend to provide faster user interaction and better performance.

- - - 

## Scalability Notes

To scale this application for production use:

- Deploy frontend and backend as separate services
- Use environment variables for managing secrets and configurations
- Replace SQLite with a production-ready database like PostgreSQL or MongoDB
- Implement pagination for handling large datasets
- Introduce API versioning (e.g., /api/v1)
- Use cloud hosting platforms and caching mechanisms to improve performance and reliability

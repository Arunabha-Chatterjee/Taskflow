# TaskFlow

A full-stack task management system built with React, Node.js, Express.js, and MongoDB. TaskFlow allows users to securely manage their tasks and break them down into smaller subtasks.

## Features

### Authentication
- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Automatic logout when the authentication token expires or becomes invalid

### Task Management
- Create tasks
- View all personal tasks
- View individual task details
- Update tasks
- Delete tasks
- Set task priority
- Set task status
- Add due dates

### Subtask Management
- Add subtasks to a task
- View subtasks belonging to a task
- Update subtasks
- Delete subtasks
- Track subtask status

### Frontend
- Responsive React interface
- React Router for navigation
- React Hook Form for form handling
- Client-side validation
- Toast notifications
- Reusable components and custom hooks
- Dark-themed UI

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- Axios
- React Hot Toast
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Express Validator

## Project Structure

```text
TaskFlow/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    │
    └── package.json
```

## API Overview

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/task/add` | Create a task |
| GET | `/api/task/get` | Get all tasks |
| GET | `/api/task/get/:id` | Get a single task |
| PUT | `/api/task/update/:id` | Update a task |
| DELETE | `/api/task/delete/:id` | Delete a task |

### Subtasks

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/subtask/add/:taskId` | Create a subtask |
| GET | `/api/subtask/get/:taskId` | Get subtasks for a task |
| PUT | `/api/subtask/update/:taskId/:subtaskId` | Update a subtask |
| DELETE | `/api/subtask/delete/:taskId/:subtaskId` | Delete a subtask |

All task and subtask operations require authentication.

## Task Status

Tasks support the following statuses:

```text
TODO
IN_PROGRESS
COMPLETED
```

Tasks also support different priority levels:

```text
LOW
MEDIUM
HIGH
```

Subtasks support:

```text
TODO
COMPLETED
```

## Authentication Flow

1. User registers an account.
2. Password is securely hashed before being stored.
3. User logs in with their credentials.
4. The backend generates a JWT.
5. The frontend stores the authentication token.
6. Axios automatically attaches the token to protected requests.
7. Protected backend routes verify the token before processing requests.

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- MongoDB
- npm

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd TaskFlow
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Setup the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on the Vite development server.

## Screenshots

Add screenshots of the application here.

Example:

```text
screenshots/
├── login.png
├── register.png
├── tasks.png
├── task-details.png
└── subtask.png
```

## Future Improvements

- Search and filter tasks
- Sort tasks by priority or due date
- Improved task statistics
- Better mobile experience
- Pagination for large task lists
- Refresh-token based authentication
- Deployment

## What I Learned

This project helped me practice and understand:

- Building REST APIs with Express.js
- MongoDB data modeling with Mongoose
- JWT authentication and authorization
- Password hashing
- API validation
- React component design
- React Router
- Custom React hooks
- Axios interceptors
- Form handling and validation
- Connecting a React frontend with a Node.js backend
- Managing relationships between tasks and subtasks

## License

This project is for learning and portfolio purposes.

## Project Overview

**Productivity Management System** is a full-stack web application that allows users to organize their work into smaller subtasks.

The project uses a separate frontend and backend architecture, with RESTful APIs handling communication between the client and server.

# Express Backend + React Frontend

This project is a simple character management application with an **Express.js** backend and a **React** frontend using **Vite**.

## Prerequisites

- **Node.js**
- **npm**

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/express-backend.git
   ```

2. **Install backend dependencies and start the server**:
   ```sh
   cd backend
   npm install
   node server.js
   ```

3. **In a new terminal, install frontend dependencies and start the React app**:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

The backend API runs on `port 3001`, and the frontend runs on `port 5173`.

## Features

### 1. Backend API Endpoints

The Express.js backend provides the following API endpoints, with data stored in `user.json`:

- **GET /characters**: Retrieve all characters.
- **GET /characters/:id**: Retrieve a character by ID.
- **GET /characters/search?name=**: Search characters by name (case-insensitive).
- **POST /characters**: Add a new character.
- **PUT /characters/:id**: Update a character by ID.
- **DELETE /characters/:id**: Delete a character by ID.

### 2. Frontend

The React frontend includes the following features:

- Displays a list of characters with their **name**, **real name**, and **universe**.
- A **search bar** to filter characters by name.
- A **form** to add new characters.
- **Buttons** to edit and delete existing characters.

# Express Backend + React Frontend

This project is a simple character management app with an Express.js backend and a React frontend using Vite.

### Prerequisites

* Node.js
* npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/express-backend.git
   ```
2. Install backend dependencies and start the server:
   ```sh
   cd backend
   npm install
   node server.js
   ```
3. In a new terminal, install frontend dependencies and start the React app:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```
   
The backend API runs on port 3001 and the frontend on port 5173.

### Features
Backend API Endpoints

    GET /characters: Get all characters

    GET /characters/:id: Get a character by ID

    GET /characters/search?name=: Search characters by name (case-insensitive)

    POST /characters: Add a new character

    PUT /characters/:id: Update a character by ID

    DELETE /characters/:id: Delete a character by ID

The backend reads and writes data to user.json and uses CORS to allow frontend requests.
Frontend

    Displays a list of characters with name, real name, and universe

    Search bar to filter characters by name

    Form to add new characters

    Buttons to edit and delete existing characters



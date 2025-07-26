# Express Backend for Characters API

This project is a simple Express.js backend server that provides a REST API to manage a list of characters. The data is stored in a JSON file (`user.json`).

## Features

- Get all characters
- Get a character by ID
- Create a new character
- Update a character by ID
- Delete a character by ID

## Installation

1. Clone the repository or download the project files.
2. Navigate to the `express-backend` directory.
3. Install dependencies:

```bash
npm install
```

## Usage

Start the server:

```bash
node server.js
```

The server will run on [http://localhost:3001](http://localhost:3001).

## API Endpoints

- `GET /characters` - Retrieve all characters
- `GET /characters/:id` - Retrieve a character by ID
- `POST /characters` - Create a new character  
  Request body should be JSON with fields: `name`, `realName`, `universe`
- `PUT /characters/:id` - Update a character by ID  
  Request body can contain any of the character fields to update
- `DELETE /characters/:id` - Delete a character by ID

## Testing

You can test the API endpoints using `curl` commands in a separate terminal while the server is running. For example:

```bash
curl -X GET http://localhost:3001/characters
curl -X GET http://localhost:3001/characters/1
curl -X POST -H "Content-Type: application/json" -d '{"name":"New Hero","realName":"Real Name","universe":"Earth-616"}' http://localhost:3001/characters
curl -X PUT -H "Content-Type: application/json" -d '{"name":"Updated Hero"}' http://localhost:3001/characters/1
curl -X DELETE http://localhost:3001/characters/1
```

## .gitignore

The project includes a `.gitignore` file to exclude `node_modules` and other unnecessary files.

## License

This project is open source and free to use.

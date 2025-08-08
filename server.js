const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 3001;

app.use(express.json());

const dataFilePath = path.join(__dirname, "user.json");

async function readData() {
  try {
    const jsonData = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading JSON:", error);
    return { characters: [] };
  }
}

async function writeData(data) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing JSON:", error);
  }
}

app.get("/characters", (req, res) => {
  const data = readData();
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(data.characters, null, 2));
});

app.get("/characters/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const character = data.characters.find((c) => c.id === id);
  if (character) {
    res.json(character);
  } else {
    res.status(404).json({ error: "Character not found" });
  }
});

app.post("/characters", (req, res) => {
  const data = readData();
  const newCharacter = req.body;
  if (!newCharacter.name || !newCharacter.realName || !newCharacter.universe) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const maxId = data.characters.reduce((max, c) => (c.id > max ? c.id : max), 0);
  newCharacter.id = maxId + 1;
  data.characters.push(newCharacter);
  writeData(data);
  res.status(201).json(newCharacter);
});

app.put("/characters/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const index = data.characters.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Character not found" });
  }
  const updatedCharacter = { ...data.characters[index], ...req.body, id };
  data.characters[index] = updatedCharacter;
  writeData(data);
  res.json(updatedCharacter);
});

app.delete("/characters/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const index = data.characters.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Character not found" });
  }
  data.characters.splice(index, 1);
  writeData(data);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
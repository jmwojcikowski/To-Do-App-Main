const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ToDoItem = require('./src/models/toDoList.model')

const app = express();
const PORT = process.env.PORT || 5000;

const MONGODB_URI="mongodb+srv://jakubwojcikowski:ofw8Crs6cR0VUD1B@cluster0.w6kqbyi.mongodb.net/ToDoList"

app.use(cors());
app.use(express.json());

// Połączenie z bazą danych MongoDB Atlas test .env
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Connection to MongoDB failed:', error.message);
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Błąd połączenia z MongoDB:'));
db.once('open', () => {
  console.log('Pomyślnie połączono z MongoDB Atlas!');
});

const todoItemsPath = '/api/todolist/todoItems';

app.get(`${todoItemsPath}/get`, async (req, res) => {
  try {
    const todoItems = await ToDoItem.find();
    res.json(todoItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

app.post(`${todoItemsPath}/add`, async (req, res) => {
  try {
    const item = req.body;
    const newItem = new ToDoItem(item);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
  }
});

app.delete(`${todoItemsPath}/:itemId`, async (req, res) => {
  try {
    const itemId = req.params.itemId;
    
    await ToDoItem.deleteOne({_id:itemId});
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

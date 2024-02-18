const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
  name: String,
  // Dodaj inne pola zgodnie z rzeczywistą strukturą danych w bazie
});

const ToDoItem = mongoose.model('ToDoItem', todoItemSchema);

module.exports = ToDoItem;

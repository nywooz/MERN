const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  todo_description: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  todo_responsible: {
    type: String
  },
  todo_priority: {
    type: String
  },
  todo_completed: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("todos", ToDoSchema);

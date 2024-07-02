const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: { type: String},
    description: { type: String},
    isCompleted: { type: Boolean, default: false },
    completedOn: { type: Date, default: null }
});

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
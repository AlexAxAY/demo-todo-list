const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Todo = require('./models/modelSchema');


mongoose.connect('mongodb://localhost:27017/todo-list')
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



app.use(express.json());

app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching todos" });
    }
});


app.post('/api/todos', async (req, res) => {
    try {
        const newTodo = new Todo({ text: req.body.text });
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding list" });
    }

})

app.put('/api/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating list" });
    }

});

app.delete('/api/todos/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting list" });
    }

});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});


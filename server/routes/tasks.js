const express = require('express');
const app = express();

// const { verifyAdmin } = require('../middlewares/verifyAdmin');
const taskController = require('../controllers/taskController');

//===================
// Get all tasks
//===================
app.get('/get/tasks', (req, res) => {
    taskController.getTasks(res);
});

//===================
// Get all tasks finished
//===================
app.get('/get/tasks/finished', (req, res) => {
    taskController.getTasksFinished(res);
});

//===================
// Create task
//===================
app.post('/create/task', (req, res) => {
    taskController.createTask(req.body, res);
});

//===================
// Update task
//===================
app.put('/update/task/:id', (req, res) => {
    let id_task = req.params.id;

    taskController.updateTask(id_task, req.body, res);
});

module.exports = app;
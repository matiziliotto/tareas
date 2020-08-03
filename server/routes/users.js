const express = require('express');
const app = express();

// const { verifyAdmin } = require('../middlewares/verifyAdmin');
const userController = require('../controllers/userController');

//===================
// Get all users
//===================
app.get('/get/users', (req, res) => {
    userController.getUsers(res);
});

//===================
// Get all deleted users
//===================
app.get('/get/deleted/users', (req, res) => {
    userController.getDeletedUsers(res);
});

//===================
// Get user by ID
//===================
app.get('/get/user/:id', (req, res) => {
    let user_id = req.params.id;

    userController.getUser(user_id, res);
});

//===================
// Create user
//===================
app.post('/create/user', (req, res) => {
    userController.createUser(req.body, res);
});

//===================
// Delete user
//===================
app.delete('/delete/user/:id', (req, res) => {
    let user_id = req.params.id;

    userController.deleteUser(user_id, res);
});

//===================
// Update user
//===================
app.put('/update/user/:id', (req, res) => {
    let user_id = req.params.id;

    userController.updateUser(user_id, req.body, res);
});


module.exports = app;
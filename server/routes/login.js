const express = require('express');
const app = express();

// const { verifyAdmin } = require('../middlewares/verifyAdmin');
const loginController = require('../controllers/loginController');

//===================
// Login
//===================
app.post('/login', (req, res) => {
    loginController.login(req.body, res);
});

module.exports = app;
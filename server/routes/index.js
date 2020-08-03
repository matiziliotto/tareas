const express = require('express');
const app = express();

//===================
// Routes
//===================
app.use(require('./users'));
app.use(require('./login'));
app.use(require('./tasks'));



module.exports = app;
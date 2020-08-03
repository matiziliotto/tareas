//===================
// Config of the server
//===================
require('./config/config');

const express = require('express');
let app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//===================
// All routes
//===================
app.use(require('./routes/index'));


//===================
// DataBase connection
//===================
let conectarDB = async() => {
    await mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    });
}
conectarDB();


//===================
// Server start on port...
//===================
app.listen(process.env.PORT, () => {
    console.log("Listen port: ", process.env.PORT);
});
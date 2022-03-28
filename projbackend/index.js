require('dotenv').config()
const express = require("express");
const app = express();
const port = 8000;

const db = require('./config/mongoose');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/uploads', express.static('uploads'))
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is up and running on port: ${port}`);
});

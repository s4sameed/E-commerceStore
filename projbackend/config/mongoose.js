const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(()=>{
    console.log("DATABASE CONNECTED");
});

const db = mongoose.connection;


module.exports = db;
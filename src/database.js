const mongoose = require('mongoose');

const URI = "mongodb://localhost/archivos";

const uri = "mongodb+srv://archivos:58385772david@cluster0-va3kg.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(URI, {
        useNewUrlParser: true
    })
    .then(db => console.log("db conectada"))
    .catch(err => console.log('error'));
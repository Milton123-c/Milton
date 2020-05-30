const mongoose = require('mongoose');

const URI = "mongodb://localhost/archivos";

mongoose.connect(URI, {
        useNewUrlParser: true
    })
    .then(db => console.log("db conectada"))
    .catch(err => console.log('error'));
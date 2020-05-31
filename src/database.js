const mongoose = require('mongoose');

const URI = "mongodb://localhost/archivos";

const uri = "mongodb+srv://archivos:58385772david@cluster0-va3kg.mongodb.net/test?retryWrites=true&w=majority";

const con = "mongodb://ulh7uxwmzgh9karxrdsf:5MaHW9DpBN7IXOrmhX1R@bxybxtj8smatat5-mongodb.services.clever-cloud.com:27017/bxybxtj8smatat5";

mongoose.connect(con, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log("db conectada"))
    .catch(err => console.log('error'));
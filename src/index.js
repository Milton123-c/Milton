//importando modulos
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');

const app = express();
require('./database');

//importando rutas
const routes = require('./routes/routes');

//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(multer({ dest: path.join(__dirname, '/public/upload/temp') }).single('archivo'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//rutas
app.use('/', routes);

//static file
app.use(express.static(path.join(__dirname, '/public/')));

//servidor
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});
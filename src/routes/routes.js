const express = require('express');
const archivos = require('../models/archivos');
const { randomName } = require('../random/random');
const fs = require('fs-extra');
const path = require('path');

const direccion = path.join(__dirname, '../models/datos.json');
const datas = require('../models/datos.json');

const routes = express.Router();

//page index
routes.get('/', (req, res) => {

    res.render('index');

});

//pagina mantenimiento
routes.get('/mantenimiento', (req, res) => {

    var datos = [];

    for (let i = 0; i < datas.length; i++) {
        if (datas[i].tipo == "mantenimiento") {
            datos.push(datas[i]);
        }
    }

    res.render('mantenimiento', { datos });

});

//pagina programacion
routes.get('/programacion', (req, res) => {

    var datos = [];

    for (let i = 0; i < datas.length; i++) {
        if (datas[i].tipo == "programacion") {
            datos.push(datas[i]);
        }
    }

    res.render('programacion', { datos });
});

//pagina entorno
routes.get('/entorno', (req, res) => {

    var datos = [];

    for (let i = 0; i < datas.length; i++) {
        if (datas[i].tipo == "entorno") {
            datos.push(datas[i]);
        }
    }

    res.render('entorno', { datos });
});

//pagina tic
routes.get('/tic', (req, res) => {

    var datos = [];

    for (let i = 0; i < datas.length; i++) {
        if (datas[i].tipo == "tic") {
            datos.push(datas[i]);
        }
    }

    res.render('tic', { datos });
});

//formulario 
routes.get('/formulario', (req, res) => {
    res.render('form');
});


//subiendo archivos
routes.post('/datos', (req, res) => {
    const saveDate = async() => {
        var nombreNuevo = randomName();

        const nombreOriginal = req.file.originalname;
        const FileTempPath = req.file.path;
        const ext = path.extname(nombreOriginal);
        const targetPath = path.resolve(`src/public/upload/${nombreNuevo}${ext}`);

        //convalidar nombre
        var bandera = false;
        for (let i = 0; i < datas.length; i++) {
            if (nombreNuevo == datas[i].nombreArchivo) {
                bandera = true;
                break;
            } else {
                bandera = false;
            }
        }
        if (bandera) {
            saveDate();
        } else {
            if (ext == ".pdf" || ext == ".png") {
                await fs.rename(FileTempPath, targetPath);
                const { tipo, nombre, descripsion } = req.body;
                const nuevoDatos = {
                    tipo,
                    nombre,
                    descripsion,
                    nombreArchivo: nombreNuevo + ext
                };
                var dbjson = datas;
                dbjson.push(nuevoDatos);


                fs.writeJSON(direccion, dbjson, (err) => {
                    if (err) return console.log(err)
                    console.log("db modify");
                });

                var datos = [];
                const buscar = nombreNuevo + ext;
                for (let i = 0; i < datas.length; i++) {
                    if (buscar == datas[i].nombreArchivo) {
                        datos.push(datas[i]);
                    }
                }

                res.render('salvados', { datos });
            } else {
                fs.unlink(FileTempPath);
                const nombre = nombreOriginal;
                res.render('error', { nombre });
            }
        }

    };
    saveDate();
});

module.exports = routes;
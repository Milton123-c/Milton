const express = require('express');
const archivos = require('../models/archivos');
const { randomName } = require('../random/random');
const fs = require('fs-extra');
const path = require('path');

const routes = express.Router();

//plantilla de inicio
routes.get('/', (req, res) => {
    res.render('index');
});

//mantenimiento
routes.get('/mantenimiento', async(req, res) => {

    const datos = await archivos.find({
        tipo: "mantenimiento"
    });


    res.render('mantenimiento', {
        datos
    });
});

//programacion
routes.get('/programacion', async(req, res) => {
    const datos = await archivos.find({
        tipo: 'programacion'
    });
    res.render('programacion', { datos });
});

//entorno
routes.get('/entorno', async(req, res) => {
    const datos = await archivos.find({ tipo: "entorno" });
    res.render('entorno', {
        datos
    })
});;

//tic
routes.get('/tic', async(req, res) => {
    const datos = await archivos.find({ tipo: 'tic' });
    res.render('tic', { datos });
});

//formulario
routes.get('/formulario', (req, res) => {
    res.render('form');
})

//obteniendo datos 
routes.post('/datos', (req, res) => {

    //configuracion para subir archivos
    const saveFile = async() => {
        const nombreArchivo1 = randomName();
        const datos = await archivos.find({ nombreArchivo: nombreArchivo1 });

        if (datos.length > 0) {
            saveFile();
        } else {

            //cambiando de direccion el archivo
            const fileTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${nombreArchivo1}${ext}`);

            //convalidando extension
            if (ext == '.pdf') {
                await fs.rename(fileTempPath, targetPath);
                const { tipo, nombre, descripsion } = req.body;
                const data = new archivos({
                    tipo,
                    nombre,
                    descripsion,
                    nombreArchivo: nombreArchivo1 + ext
                });
                await data.save();

                const datos = await archivos.find({ nombreArchivo: nombreArchivo1 + ext });

                res.render('salvados', {
                    datos
                });
            } else {
                await fs.unlink(fileTempPath);
                res.render('error', {
                    nombre: req.file.originalname
                });
            }
        }

    };
    saveFile();

});


//eliminar
routes.get('/eliminar/:id', async(req, res) => {
    const { id } = req.params;
    const { tipo, nombreArchivo } = await archivos.findById(id);

    await fs.unlink(path.resolve(`src/public/upload/${nombreArchivo}`));

    await archivos.remove({ _id: id });

    res.redirect(`/${tipo}`);
});

module.exports = routes;
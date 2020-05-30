const mongoose = require('mongoose');
const { Schema } = mongoose;

const Archivos = new Schema({
    tipo: { type: String, required: true },
    nombre: { type: String, required: true },
    descripsion: { type: String, required: true },
    nombreArchivo: { type: String, required: true }
})

module.exports = mongoose.model('archivos', Archivos);
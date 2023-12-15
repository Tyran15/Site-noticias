const mongoose = require('mongoose');

const noticiasSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    texto: {
        type: String,
        required: true,
    },
    genero_noticia: {
        type: String,
        required: true,
    },
    capa_noticia: {
        type: String,
    },
    data_noticia: {
        type: Date,
        required: true,
    },
    nome_publicador: {
        type: String,
        required: true
    },
    avatar_publicador: {
        type: String,
    }
});

const Noticias = mongoose.model('news', noticiasSchema, 'news');

module.exports = Noticias;
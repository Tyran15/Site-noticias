const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
    },
    data_nascimento: {
        type: String,
        required: true,
    },
    imagem_name: {
        type: String,
    },
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;

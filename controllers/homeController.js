const User = require('../models/userModel');
const mongoose = require('mongoose');
const dataFormat = require('../core/dataFormat');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', () => {
    console.log('Conectado ao banco de dados MongoDB');
});

const HomeController = {
    get_index: (req, res) => {
        res.render('index');
    },
    get_login: (req, res) => {
        res.render('login');
    },
    get_cadastro: (req, res) => {
        res.render('cadastro');
    },

    post_login: async (req, res) => {
        try {
            const { email, senha } = req.body;
        
            User.findOne({ email: email, senha: senha })
                .then((login) => {
                    if (login !== null) {
                        console.log('Login efetuado com sucesso');
                        res.render('index');
                    } else {
                        console.log('Conta não cadastrada')
                        res.render('login');
                    }
                }).catch((err) => {
                    console.error(err);
                    res.status(500).send('Erro interno do servidor');
                });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno do servidor.');
        }
    },
    post_cadastro: async (req, res) => {
        try {
            const { nome, email, senha, dataNasc } = req.body;

            User.find({ email })
                .then((logins) => {
                    if (logins.length > 0) {
                        console.log('Email já existente');
                        res.render('cadastro');
                    } else {
                        const newUser = new User({
                            nome: nome,
                            email: email,
                            senha: senha,
                            data_nascimento: dataNasc,
                        });

                        newUser.save()
                            .then(() => {
                                console.log('Usuário cadastrado com sucesso');
                                res.render('login');
                            })
                            .catch((err) => {
                                console.error(err);
                                res.status(500).send('Erro interno do servidor');
                            });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send('Erro interno do servidor');
                });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno do servidor.');
        }
    },
};

module.exports = HomeController;
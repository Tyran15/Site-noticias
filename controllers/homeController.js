const User = require('../models/userModel');
const mongoose = require('mongoose');
const session = require('express-session');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', () => {
    console.log('Conectado ao banco de dados MongoDB');
});

const HomeController = {
    get_index: (req, res) => {
        const user = req.session.user;

        res.render('index', { user });
    },
    get_login: (req, res) => {
        const user = req.session.user;

        res.render('login', { user });
    },
    get_cadastro: (req, res) => {
        const user = req.session.user;

        res.render('cadastro', { user });
    },

    post_login: async (req, res) => {
        try {
            const { email, senha, } = req.body;

            User.findOne({ email: email, senha: senha })
                .then((login) => {
                    if (login !== null) {
                        req.session.user = { username: login.nome, email: login.email, avatar: login.imagem_name, isLogin: true }
                        res.render('index', { user: req.session.user });
                    } else {
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
            const file = req.file.filename;

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
                            imagem_name: file,
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

    get_logout: (req, res) => {
        req.session.destroy(err => {
            if (err) {
              console.error('Erro ao fazer logout:', err);
              res.redirect('/');
            } else {
              res.redirect('/login');
            }
          });
    },
};

module.exports = HomeController;
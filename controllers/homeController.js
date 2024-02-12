const User = require('../models/userModel');
const Noticias = require('../models/noticiasModel');
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
        if(user){
            res.redirect('/');
        } else{
            res.render('login');
        }
    },
    get_cadastro: (req, res) => {
        const user = req.session.user;
        if(user){
            res.redirect('/');
        } else{
            res.render('cadastro');
        }
    },
    get_dashborad: async (req, res) => {
        const user = req.session.user;
        const contUsers = await User.countDocuments({});
        const contNoticias = await Noticias.countDocuments({});

        if(user){
            res.render('homeDashbord', { user: user, contUsers: contUsers, contNoticias: contNoticias });
        } else{
            res.redirect('/');
        }
    },
    get_perfil: (req, res) => {
        const user = req.session.user;
        if(user){
            res.redirect('/');
        } else{
            res.render('cadastro');
        }
    },

    post_login: async (req, res) => {
        try {
            const { email, senha, lembrar_de_mim } = req.body;
    
            User.findOne({ email: email, senha: senha })
                .then((login) => {
                    if (login !== null) {
                        req.session.user = { id:login._id, username: login.nome, email: login.email, avatar: login.imagem_name, isLogin: true }
    
                        if (lembrar_de_mim) {
                            const oneWeek = 7 * 24 * 60 * 60 * 1000;
                            const options = { maxAge: oneWeek, httpOnly: true, signed: true };
                            res.cookie('remember_me', '1', options);
                            res.render('index', { user: req.session.user });
                        } else {
                            res.render('index', { user: req.session.user });
                        }
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
            const file = req.file ? req.file.filename : null;
    
            User.find({ email })
                .then((logins) => {
                    if (logins.length > 0) {
                        console.log('Email já existente');
                        res.render('cadastro');
                    } else {
                        let newUser;
                        if (file) {
                            newUser = new User({
                                nome: nome,
                                email: email,
                                senha: senha,
                                data_nascimento: dataNasc,
                                imagem_name: file,
                            });
                        } else {
                            newUser = new User({
                                nome: nome,
                                email: email,
                                senha: senha,
                                data_nascimento: dataNasc,
                            });
                        }
    
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
    post_perfil: async (req, res) => {
        try {
            const { nome, email, senha, dataNasc } = req.body;
            const file = req.file ? req.file.filename : null;
    
            User.find({ email })
                .then((logins) => {
                    if (logins.length > 0) {
                        console.log('Email já existente');
                        res.render('cadastro');
                    } else {
                        let newUser;
                        if (file) {
                            newUser = new User({
                                nome: nome,
                                email: email,
                                imagem_name: file,
                            });

                            newUser.updateOne({ _id: userId}, {
                                $set: {
                                    nome: nome,
                                    email: email,
                                    imagem_name: file,
                                },
                            });

                            if (newUser) {
                                
                            }
                        } else {
                            newUser = new User({
                                nome: nome,
                                email: email,
                            });

                            newUser.updateOne({ _id: userId}, {
                                $set: {
                                    nome: nome,
                                    email: email,
                                },
                            });
                        }

                        res.redirect('/perfil');
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

    get_noticias: async (req, res) => {
        const user = req.session.user;
        const noticias = await Noticias.find({});

        if(user){
            res.render('noticias', { noticias: noticias, user: user });
        } else{
            res.redirect('/');
        }
    },
    get_users: async (req, res) => {
        const user = req.session.user;
        const users = await User.find({});

        if(user){
            res.render('users', { user: user, users: users });
        } else{
            res.redirect('/');
        } 2
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
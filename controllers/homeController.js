const HomeController = {
    index: (req, res) => {
        res.render('index');
    },
    login: (req, res) => {
        res.render('login');
    },
    cadastro: (req, res) => {
        res.render('cadastro');
    },
};

module.exports = HomeController;
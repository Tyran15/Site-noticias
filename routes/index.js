const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController');

router.get('/', HomeController.get_index);
router.get('/login', HomeController.get_login);
router.get('/cadastro', HomeController.get_cadastro);
router.get('/dashboard', HomeController.get_dashborad);

router.post('/cadastro', HomeController.post_cadastro);
router.post('/login', HomeController.post_login);

router.get('/logout', HomeController.get_logout);

module.exports = router;
const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/homeController');

router.get('/', HomeController.index);
router.get('/login', HomeController.login);
router.get('/cadastro', HomeController.cadastro)

module.exports = router;
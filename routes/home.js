const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const homeCtrl = require('../controllers/home');

// Route protégée pour récupérer le nom d'utilisateur de la personne connectée
router.get('/', auth, homeCtrl.getUsername);

module.exports = router;

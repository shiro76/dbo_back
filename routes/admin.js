const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const adminCtrl = require('../controllers/admin');

// Route protégée pour les administrateurs
router.get('/dashboard', auth, admin, adminCtrl.welcome);

module.exports = router;

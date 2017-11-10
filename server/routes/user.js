const express = require('express');
const router = express.Router();
const user = require('../controllers/userCtrl');


router.post('/login', user.signin)
router.post('/register', user.signup)
router.get('/beranda', user.validate, user.findAll)
router.get('/profile', user.validate, user.profile)

module.exports = router;

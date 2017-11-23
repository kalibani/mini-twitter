const express = require('express');
const router = express.Router();
const user = require('../controllers/userCtrl');

router.get('/profile', user.validate, user.getProfile)
router.get('/profile/:id', user.validate, user.getUserbyId)
router.put('/updateProfile/:id', user.validate, user.updateProfile)

module.exports = router;

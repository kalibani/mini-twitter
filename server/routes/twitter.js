const express = require('express');
const router = express.Router();
const twitter = require('../controllers/twitCtrl');

router.get('/home', twitter.validate, twitter.findAll)
router.get('/home/:id', twitter.validate, twitter.findById)
router.post('/post', twitter.validate, twitter.postTwitt)

module.exports = router;

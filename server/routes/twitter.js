const express = require('express');
const router = express.Router();
const twitter = require('../controllers/twitCtrl');

router.get('/home', twitter.validate, twitter.findAll)
router.get('/home/:id', twitter.validate, twitter.findById)
router.post('/post', twitter.validate, twitter.postTwitt)
router.put('/edit/:id', twitter.validate, twitter.updateTwitt)
router.delete('/delete/:id', twitter.validate, twitter.deleteTwitt)

module.exports = router;

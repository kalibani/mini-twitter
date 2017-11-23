const Twitt = require('../models/twitter');
const jwt = require('jsonwebtoken');

class TwitterApi {

  static validate(req, res, next){
    var token = req.headers['authorization'];
    if (token) {
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if(err){
          return res.json({success: false, message: 'Problem With Token'})
        }else {
          req.decoded = decoded
          next()
        }
      })
    } else {
      return res.status(403).send({
        message: 'Access Denied!'
      })
    }
  }

  static findAll(req, res){
    Twitt.find()
    .populate('posted_by')
    .then((dataUser) => {
      res.status(200).json(dataUser)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  }

  static findById(req, res){
    Twitt.findById(req.params.id).then((dataUser) => {
      res.status(200).json(dataUser)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  }

  static postTwitt(req, res){
    console.log('=====', req.decoded.dataUser._id);
    var newTwitt = new Twitt({
      twit: req.body.twit,
      posted_by: req.decoded.dataUser._id
    })
    newTwitt.save().then((dataTwitt) => {
      console.log(dataTwitt);
      res.status(200).json({ message: 'Success Posting Twitt!', dataTwitt })
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  }

  static updateTwitt(req, res) {
    Twitt.findById(req.params.id)
    .then((data) => {
      return Object.assign(data, req.body)
    })
    .then((data) => {
      return data.save()
    })
    .then((updatedUser) => {
      res.json({message: 'Succesfully Updated Twitt', updatedUser})
    }).catch((err) => {
      res.send(err);
    })
  }

  static deleteTwitt(req, res){
    Twitt.remove({_id : req.params.id})
      .then((result) => {
      res.json({ message: "Twitt successfully deleted!", result });
    })
    .catch((err) => {
      res.send(err)
    })
  }

}

module.exports = TwitterApi;

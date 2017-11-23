const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserAPI {

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

  static getProfile(req, res){
    res.json(req.decoded.dataUser)
  }

  static getUserbyId(req, res){
    User.findById(req.params.id).then((dataUser) => {
      res.status(200).json(dataUser)
    })
    .catch((err) => { res.status(404).send(err)})
  }

  static updateProfile(req, res) {
    User.findById(req.params.id)
    .then((data) => {
      return Object.assign(data, req.body)
    })
    .then((data) => {
      var salt = bcrypt.genSaltSync(8)
      data.password = bcrypt.hashSync(req.body.password, salt)
      return data.save()
    })
    .then((updatedUser) => {
      res.json({message: 'Succesfully Updated User', updatedUser})
    }).catch((err) => {
      res.send(err);
    })
  }

}

module.exports = UserAPI;

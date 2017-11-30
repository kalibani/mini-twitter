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
    let id = {
      _id : req.params.id
    }
    if (req.body.password!=='') {
      var salt = bcrypt.genSaltSync(8)
      req.body.password = bcrypt.hashSync(req.body.password, salt)
      User.findByIdAndUpdate(id, req.body).then((dataUser) => {
        res.json({message: 'Update Profile Success!', dataUser})
      }).catch((err) => {
        res.send(err);
      })
    }else {
      let update = {
        'email': req.body.email,
        'name': req.body.name
      }
      User.findByIdAndUpdate(id, update)
      .then((dataUser) => {
        res.json({message: 'Update Profile tanpa ganti password Success!', dataUser})
      }).catch((err) => {
        res.send(err);
      })
    }

  }

}

module.exports = UserAPI;

const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Data {

  static signup(req, res){
    models.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      createdAt: new Date(),
      updatedAt: new Date()
    })
   .then(()=>{
    //  console.log(dataUsers);
     res.send('Berhasil Registrasi')
   })
   .catch(err=>{
     res.json(err)
   })
  }

  static signin(req, res){
    models.User.findOne({
      where:{
        email: req.body.email
      }
    })
    .then((dataUsers)=>{
      if(!dataUsers){
        res.send('Email Tidak Terdaftar Silakan Registrasi Dulu')
      } else if (bcrypt.hashSync(req.body.password, dataUsers.secret)===dataUsers.password) {
        let token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          dataUsers
        }, 'Pixel Studio Secret')
        res.json({
          message:"Berhasil Login",
          token: token
        })
      }else if (bcrypt.hashSync(req.body.password, dataUsers.secret)!==dataUsers.password) {
        res.send('Password Salah!')
      }
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static validate(req, res, next){
    var token = req.headers['authorization'];
    if (token) {
      jwt.verify(token, 'Pixel Studio Secret', function (err, decoded) {
        if(err){
          return res.json({success: false, message: 'Problem With Token'})
        }else {
          req.decoded = decoded
          next()
        }
      });

    } else {
      return res.status(403).send({
        message: 'Token tidak tersedia'
      })
    }
  }

  static findAll(req, res){
    models.User.findAll()
    .then(dataUsers=>{
      res.json(dataUsers)
    })
    .catch(err=>{
      res.json(err)
    })
  }

  static profile(req, res){
    res.json(req.decoded.dataUsers)
  }

}

module.exports = Data;

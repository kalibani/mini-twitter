const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let userSchema = new Schema({
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  image:{
    type: String
  },
  created:{
    type: Date,
    default: Date.now
  }
})

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);

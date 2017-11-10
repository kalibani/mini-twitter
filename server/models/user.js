'use strict';
var bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    secret: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.hook('beforeSave', (user)=>{
    var secret = bcrypt.genSaltSync(8);
    user.secret = secret
    var hash = bcrypt.hashSync(user.password, secret);
    user.password = hash
  })

  User.associate = function (models) {
    User.hasMany(models.Twitt)

  };
  return User;
};

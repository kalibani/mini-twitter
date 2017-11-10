'use strict';
module.exports = (sequelize, DataTypes) => {
  var Usernew = sequelize.define('Usernew', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    secret: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Usernew;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Twittnew = sequelize.define('Twittnew', {
    twitt: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Twittnew;
};
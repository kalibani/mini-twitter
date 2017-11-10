'use strict';
module.exports = (sequelize, DataTypes) => {
  var Twitt = sequelize.define('Twitt', {
    twitt: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Twitt.associate = function (models) {
    Twitt.belongsTo(models.User);
  };
  return Twitt;
};

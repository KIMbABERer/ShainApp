'use strict';
module.exports = function(sequelize, DataTypes) {
  var naming = sequelize.define('naming', {
    photo_id: DataTypes.INTEGER,
    photo_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return naming;
};
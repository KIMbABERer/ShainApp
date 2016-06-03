'use strict';
module.exports = function(sequelize, DataTypes) {
  var userspic = sequelize.define('userspic', {
    pic_link: DataTypes.TEXT,
    friend_1: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userspic;
};
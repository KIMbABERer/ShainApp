'use strict';
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    pic_id: DataTypes.INTEGER,
    post_comment: DataTypes.INTEGER,
    received_comment: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return post;
};
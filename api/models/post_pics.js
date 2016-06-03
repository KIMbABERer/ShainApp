'use strict';
module.exports = function(sequelize, DataTypes) {
  var post_pics = sequelize.define('post_pics', {
    pic_id: DataTypes.INTEGER,
    post_comment_name: DataTypes.STRING,
    received_comment_name: DataTypes.STRING,
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
  return post_pics;
};
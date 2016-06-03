'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('post_pics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pic_id: {
        type: Sequelize.INTEGER
      },
      post_comment_name: {
        type: Sequelize.STRING
      },
      received_comment_name: {
        type: Sequelize.STRING
      },
      post_comment: {
        type: Sequelize.INTEGER
      },
      received_comment: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('post_pics');
  }
};
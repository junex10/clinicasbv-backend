'use strict';

const constants = require("../seeders/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('permissions', {
      id: constants.PRIMARY_KEY,
      action_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'actions',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'users',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('permissions');
  }
};

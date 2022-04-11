'use strict';

const constants = require("../seeders/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('actions', {
      id: constants.PRIMARY_KEY,
      module_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'modules',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ...constants.DATES_CONTROL
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('actions');
  }
};

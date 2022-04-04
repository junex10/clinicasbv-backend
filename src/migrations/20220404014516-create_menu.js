'use strict';

const constants = require("../seeders/constants");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('menu', {
      id: constants.PRIMARY_KEY,
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mainMenu: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      main_menu_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'menu',
          key: 'id'
        }
      },
      status: constants.STATUS
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('menu');
  }
};

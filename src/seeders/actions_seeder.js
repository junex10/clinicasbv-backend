'use strict';

const Constants = require('./constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('actions');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    const items = [
      {
        id: 1,
        module_id: Constants.SEEDERS.MODULES.PROFILE,
        name: 'Ver perfil',
        code: 'auth/show-profile'
      },
      {
        id: 2,
        module_id: Constants.SEEDERS.MODULES.PROFILE,
        name: 'Editar perfil',
        code: 'auth/edit-profile'
      },
      {
        id: 3,
        module_id: Constants.SEEDERS.MODULES.PROFILE,
        name: 'Crear perfil',
        code: 'auth/edit-profile'
      },
      {
        id: 4,
        module_id: Constants.SEEDERS.MODULES.PROFILE,
        name: 'Exportar perfil',
        code: 'auth/edit-profile'
      }
    ];
    return queryInterface.bulkInsert('actions',items);
  },

  down: async (queryInterface, Sequelize) => {}
};

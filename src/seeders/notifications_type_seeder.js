'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('notification_types');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    const items = [
      {
        id: 1,
        name: 'Nuevo mensaje',
        code: 'chat/new-message'
      },
      {
        id: 2,
        name: 'Nueva cita',
        code: 'appointment/new-appointment'
      }
    ];
    return queryInterface.bulkInsert('notification_types',items);
  },

  down: async (queryInterface, Sequelize) => {}
};

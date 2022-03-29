'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('company_information');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    const items = [
        {
            id: 1,
            name: 'Aldana Laser',
            email: "prueba@mail.com",
            client: 'Carlo Pérez',
            document: 'J - 3652148',
            phone: '0424-3625143',
            account: '0321-2541-6985-1452',
            bank: 'Mercantil',
            account_type: 'Corriente'
        }
    ];

    return queryInterface.bulkInsert('company_information',items);
  },

  down: async (queryInterface, Sequelize) => {}
};

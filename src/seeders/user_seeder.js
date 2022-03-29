'use strict';

const bcrypt = require('bcryptjs');
const Constants = require('./constants');
const salt = bcrypt.genSaltSync(10);
const ADMIN = 1;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const items = [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@mail.com',
        password: bcrypt.hashSync('123456', salt),
        level_id: ADMIN,
        verified: Constants.SEEDERS.USER_VERIFIED.VERIFIED,
        phone: '04128966754',
        lastname: 'Admin',
        confirmUrl: ''
      }
    ];
    return queryInterface.bulkInsert('users',items);
  },

  down: async (queryInterface, Sequelize) => {}
};

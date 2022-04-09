'use strict';

const bcrypt = require('bcryptjs');
const Constants = require('./constants');
const salt = bcrypt.genSaltSync(10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const items = [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@mail.com',
        password: bcrypt.hashSync('123456', salt),
        level_id: Constants.USERS.LEVELS.ADMIN,
        verified: Constants.SEEDERS.USER_VERIFIED.VERIFIED,
        status: Constants.USERS.STATUS.ACTIVATED
      },
      {
        id: 2,
        name: 'Jefa',
        email: 'boss@mail.com',
        password: bcrypt.hashSync('123456', salt),
        level_id: Constants.USERS.LEVELS.BOSS,
        verified: Constants.SEEDERS.USER_VERIFIED.VERIFIED,
        status: Constants.USERS.STATUS.ACTIVATED
      },
      {
        id: 3,
        name: 'Secretaria',
        email: 'secretary@mail.com',
        password: bcrypt.hashSync('123456', salt),
        level_id: Constants.USERS.LEVELS.SECRETARY,
        verified: Constants.SEEDERS.USER_VERIFIED.VERIFIED,
        status: Constants.USERS.STATUS.ACTIVATED
      },
      {
        id: 4,
        name: 'Doctor',
        email: 'doctor@mail.com',
        password: bcrypt.hashSync('123456', salt),
        level_id: Constants.USERS.LEVELS.DOCTOR,
        verified: Constants.SEEDERS.USER_VERIFIED.VERIFIED,
        status: Constants.USERS.STATUS.ACTIVATED
      },
      {
        id: 5,
        name: 'Paciente',
        email: 'patient@mail.com',
        password: bcrypt.hashSync('123456', salt),
        level_id: Constants.USERS.LEVELS.PATIENT,
        verified: Constants.SEEDERS.USER_VERIFIED.VERIFIED,
        status: Constants.USERS.STATUS.ACTIVATED
      }
    ];
    return queryInterface.bulkInsert('users',items);
  },

  down: async (queryInterface, Sequelize) => {}
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('permissions');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    let items = [];

    items = [
      {
        id: 1,
        action_id: 1,
        user_id: 1
      },
      {
        id: 2,
        action_id: 2,
        user_id: 1
      },
      {
        id: 3,
        action_id: 3,
        user_id: 1
      },
      {
        id: 4,
        action_id: 4,
        user_id: 1
      }
    ];
    queryInterface.bulkInsert('permissions',items);

    items = [
        {
          id: 5,
          action_id: 1,
          user_id: 2
        },
        {
          id: 6,
          action_id: 2,
          user_id: 2
        },
        {
          id: 7,
          action_id: 3,
          user_id: 2
        },
        {
          id: 8,
          action_id: 4,
          user_id: 2
        }
      ];
      queryInterface.bulkInsert('permissions',items);

      items = [
        {
          id: 9,
          action_id: 1,
          user_id: 3
        },
        {
          id: 10,
          action_id: 2,
          user_id: 3
        },
        {
          id: 11,
          action_id: 3,
          user_id: 3
        },
        {
          id: 12,
          action_id: 4,
          user_id: 3
        }
      ];
       queryInterface.bulkInsert('permissions',items);

      items = [
        {
          id: 13,
          action_id: 1,
          user_id: 4
        },
        {
          id: 14,
          action_id: 2,
          user_id: 4
        },
        {
          id: 15,
          action_id: 3,
          user_id: 4
        },
        {
          id: 15,
          action_id: 4,
          user_id: 4
        }
      ];
      queryInterface.bulkInsert('permissions',items);

      items = [
        {
          id: 16,
          action_id: 1,
          user_id: 5
        },
        {
          id: 17,
          action_id: 2,
          user_id: 5
        },
        {
          id: 18,
          action_id: 3,
          user_id: 5
        },
        {
          id: 19,
          action_id: 4,
          user_id: 5
        }
      ];
      return queryInterface.bulkInsert('permissions',items);
  },

  down: async (queryInterface, Sequelize) => {}
};

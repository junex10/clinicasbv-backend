'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('modules');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    const items = [
      {
        id: 1,
        name: 'Consulta Presencial',
        icon: 'calendar',
        code: 'ConsultationsClient'
      },
      {
        id: 2,
        name: 'Código QR',
        icon: 'qr',
        code: 'QRCODE'
      },
      {
        id: 3,
        name: 'Historial médico',
        icon: 'history',
        code: 'MedicalHistory'
      },
      {
        id: 4,
        name: 'Fidelización',
        icon: 'loyalty',
        code: 'Loyalty'
      },
      {
        id: 5,
        name: 'Chat',
        icon: 'chat',
        code: 'Chat'
      },
      {
        id: 6,
        name: 'Tratamientos',
        icon: 'treatments',
        code: 'Treatments'
      },
      {
        id: 7,
        name: 'Paciente',
        icon: 'patient',
        code: 'Patient'
      },
      {
        id: 8,
        name: 'Reporte de ingresos',
        icon: 'statistics',
        code: 'Statistics'
      }
    ];
    return queryInterface.bulkInsert('modules',items);
  },

  down: async (queryInterface, Sequelize) => {}
};

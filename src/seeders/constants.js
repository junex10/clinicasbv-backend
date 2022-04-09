const Sequelize = require('sequelize');

module.exports = {
  PRIMARY_KEY: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  DATES_CONTROL: {
    created_at: {
      allowNull: true,
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: true,
      type: Sequelize.DATE
    },
    deleted_at: {
      allowNull: true,
      type: Sequelize.DATE
    }
  },
  STATUS: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  SEEDERS: {
    COMMISSIONS_STATUS: {
      AVAILABLE: 1,
      DISABLED: 0
    },
    USER_VERIFIED: {
      VERIFIED: 1,
      NO_VERIFIED: 0
    },
    TREATMENTS_STATUS: {
      AVAILABLE: 1,
      DISABLED: 0
    },
    INDICATIONS_TYPE: {
      AVAILABLE: 1,
      DISABLED: 0
    },
    CHAT_SESSION: {
      READED: 1,
      UNREAD: 0
    }
  },
  USERS: {
    FACEBOOK: {
      ACCESS: 1,
      NOT_ACCESS: 0
    },
    GOOGLE: {
      ACCESS: 1,
      NOT_ACCESS: 0
    },
    LEVELS: {
      ADMIN: 1,
      BOSS: 2,
      SECRETARY: 3,
      DOCTOR: 4,
      PATIENT: 5,
    },
    STATUS: {
      ACTIVATED: 1,
      DISABLED: 0
    }
  }
}
'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profileCards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      handle: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      avatarUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      caption: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      genStatus: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      triviaTotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profileCards')
  }
}

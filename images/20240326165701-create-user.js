'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      handle: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      passwordDigest: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      avatarUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
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
    await queryInterface.dropTable('users')
  }
}

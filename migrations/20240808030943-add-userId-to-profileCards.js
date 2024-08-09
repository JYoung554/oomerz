'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return (
      queryInterface.addColumn('profileCards', 'id', {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('profileCards', 'userId', {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
        allowNull: true
      }),
      queryInterface.addColumn('profileCards', 'genStatus', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      }),
      queryInterface.addColumn('profileCards', 'triviaTotal', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      })
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('profileCards, id'),
      queryInterface.removeColumn('profileCards, userId'),
      queryInterface.removeColumn('profileCards, caption'),
      queryInterface.removeColumn('profileCards, genStatus'),
      queryInterface.removeColumn('profileCards, triviaTotal')
  }
}

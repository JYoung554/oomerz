'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.ProfileCard, {
        foreignKey: 'userId'
      })
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: true
      },
      handle: {
        type: DataTypes.STRING
      },
      email: DataTypes.STRING,
      passwordDigest: {
        type: DataTypes.STRING
      },
      avatarUrl: {
        type: DataTypes.STRING,
        defaultValue: 'https://i.imgur.com/31zf8dy.png'
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User
}

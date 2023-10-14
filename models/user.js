'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.TriviaCard, {
        foreignKey: 'userId'
      })
      User.hasMany(models.ProfileCard, {
        foreignKey: 'userId'
      })
    }
  };
  User.init(
    {
      username: DataTypes.STRING,
      handle: DataTypes.STRING,
      email: DataTypes.STRING,
      passwordDigest: DataTypes.STRING,
      avatarUrl: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User;
};
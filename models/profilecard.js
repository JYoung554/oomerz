'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfileCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProfileCard.init(
    {
      handle: DataTypes.STRING,
      avatarUrl: DataTypes.STRING,
      caption: DataTypes.STRING,
      genStatus: DataTypes.STRING,
      triviaTotal: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'ProfileCard',
      tableName: 'profileCard'
    }
  )
  return ProfileCard;
};
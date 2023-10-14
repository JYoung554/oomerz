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
      ProfileCard.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  };
  ProfileCard.init(
    {
      caption: DataTypes.STRING,
      genStatus: DataTypes.STRING,
      triviaTotal: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'ProfileCard',
      tableName: 'profileCards'
    }
  )
  return ProfileCard;
};
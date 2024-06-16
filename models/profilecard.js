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
      ProfileCard.hasMany(models.TriviaCard, {
        foreignKey: 'profileCardId'
      })
      ProfileCard.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  ProfileCard.init(
    {
      caption: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: true
      },
      genStatus: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: true
      },
      triviaTotal: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
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
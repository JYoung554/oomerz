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
      caption: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
      },
      genStatus: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
      },
      triviaTotal: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
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
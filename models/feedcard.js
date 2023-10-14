'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeedCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  FeedCard.init(
    {
      comment: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'FeedCard',
      tableName: 'feedCards'
    }
  )
  return FeedCard;
};
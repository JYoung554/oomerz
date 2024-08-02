'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TriviaCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  TriviaCard.init(
    {
      genStatus: DataTypes.STRING,
      triviaTotal: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'TriviaCard'
    }
  )
  return TriviaCard;
};
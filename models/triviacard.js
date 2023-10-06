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
    static associate(models) {
      // define association here
    }
  };
  TriviaCard.init(
    {
      triviaQuestion: DataTypes.STRING,
      questionNumber: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'TriviaCard',
      tableName: 'triviaCards'
    }
  )
  return TriviaCard;
};
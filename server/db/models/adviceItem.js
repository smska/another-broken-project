'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdviceItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'authorId' });
    }

    static validate(adviceItem) {
      const { title, desc } = adviceItem;
      if (!title || typeof title !== 'string' || title.trim() === '')
        return { isValid: false, error: 'Title is required' };
      if (!desc || typeof desc !== 'string' || desc.trim() === '')
        return { isValid: false, error: 'Description is required' };
      return { isValid: true, error: null };
    }
  }
  AdviceItem.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'AdviceItem',
    },
  );
  return AdviceItem;
};

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Article = require('./Article');

const Stock = sequelize.define('Stock', {
   articleId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Article,
      key: 'id',
    },
  },
   stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'stock',
  timestamps: true,
});

Stock.belongsTo(Article, {
  foreignKey: 'articleId',
  as: 'article',
});

module.exports = Stock;
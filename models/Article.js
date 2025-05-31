const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const TypeArticle = require('./TypeArticle');

const Article = sequelize.define('Article', {
  article: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prixUnitaire: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TypeArticle,
      key: 'id',
    },
  }
}, {
  tableName: 'article',
  timestamps: true,
});

Article.belongsTo(TypeArticle, {
  foreignKey: 'typeId',
  as: 'type',
});

module.exports = Article;
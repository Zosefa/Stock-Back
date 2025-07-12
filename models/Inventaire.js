const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Article = require('./Article');
const User = require('./User');

const Inventaire = sequelize.define('Inventaire', {
  Qte: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  articleId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Article,
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: User,
        key: 'id'
    }
  }
}, {
  tableName: 'inventaire',
  timestamps: true,
});

Inventaire.belongsTo(Article, {
  foreignKey: 'articleId',
  as: 'article',
});

module.exports = Inventaire;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Article = require('./Article');
const Client = require('./Client');

const Vente = sequelize.define('Vente', {
   articleId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Article,
      key: 'id',
    },
  },
  clientId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Client,
      key: 'id',
    },
  },
  qte: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'vente',
  timestamps: true,
});

Vente.belongsTo(Article, {
  foreignKey: 'articleId',
  as: 'article',
});

Vente.belongsTo(Client, {
  foreignKey: 'clientId',
  as: 'client',
});

module.exports = Vente;